import 'whatwg-fetch';

let _authenticated = false;
let _user = null;
let _changeListeners = [];

const AuthenticationStore = {
  init: function() {
    fetch('/authenticated')
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      _authenticated = json.authenticated;
      _user = json.user;
      AuthenticationStore.notifyChange();
    }).catch(function(exception) {
      throw exception;
    });
  },

  isAuthenticated: function() {
    return _authenticated;
  },

  getUser: function() {
    return _user;
  },

  login: function (data, cb) {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      _authenticated = json.authenticated;
      _user = json.user;
      AuthenticationStore.notifyChange();
      if (cb){
        cb(_authenticated, _user);
      }
    }).catch(function(exception) {
      throw exception;
    });
  },

  signup: function (data, cb) {
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      _authenticated = json.authenticated;
      _user = json.user;
      AuthenticationStore.notifyChange();
      if (cb){
        cb(_authenticated, _user);
      }
    }).catch(function(exception) {
      throw exception;
    });
  },

  logout: function (cb) {
    fetch('/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      _authenticated = json.authenticated;
      _user = json.user;
      AuthenticationStore.notifyChange();
      if (cb){
        cb(_authenticated, _user);
      }
    }).catch(function(err) {
      throw err;
    });
  },

  notifyChange: function () {
    _changeListeners.forEach(function (listener) {
      listener();
    })
  },

  addChangeListener: function (listener) {
    _changeListeners.push(listener);
  },

  removeChangeListener: function (listener) {
    _changeListeners = _changeListeners.filter(function (l) {
      return listener !== l;
    })
  }
}

export default AuthenticationStore;