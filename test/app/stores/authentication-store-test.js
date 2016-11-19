import assert from 'assert';
import fetchMock from 'fetch-mock';
import AuthenticationStore from '../../../app/stores/authentication-store.js';

describe('Authentication store', function() {
  before('setup', function() {

  });

  after('teardown', function() {
    fetchMock.restore();
  });

  it('init should set authentication', function(done) {
    fetchMock.get('/authenticated', {
      authenticated: true,
      user: {
        name: 'Bob'
      }
    });

    AuthenticationStore.init();
    done();

    assert(AuthenticationStore.isAuthenticated() === true);
    assert(AuthenticationStore.getUser().name === 'Bob');
  });

  it('login should send post and set user', function(done) {
    fetchMock.post('/login', {
      authenticated: true,
      user: {
        name: 'Jim'
      }
    });

    AuthenticationStore.login({});
    done();

    assert(AuthenticationStore.isAuthenticated() === true);
    assert(AuthenticationStore.getUser().name === 'Jim');
  });

  it('logout should clear user', function(done) {
    fetchMock.post('/logout', {
      authenticated: false,
      user: null
    });

    AuthenticationStore.logout();
    done();

    assert(AuthenticationStore.isAuthenticated() === false);
    assert(AuthenticationStore.getUser() === null);
  });
});
