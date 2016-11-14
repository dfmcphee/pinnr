let _authenticated = false;
let _user = null;
let _initCalled = false;
let _changeListeners = [];

const AuthenticationStore = {
  init: function() {
    if (_initCalled) {
      return;
    }

    _initCalled = true;

    getJSON('/authenticated', function (err, res) {
      _authenticated = res.authenticated;
      _user = res.user;
      AuthenticationStore.notifyChange();
    })
  },

  isAuthenticated: function() {
    return _authenticated;
  },

  getUser: function() {
    return _user;
  },

  login: function (data, cb) {
    postJSON('/login', data, function (res) {
      _authenticated = res.authenticated;
      _user = res.user;
      AuthenticationStore.notifyChange();
      if (cb){
        cb(res.authenticated, user);
      }
    });
  },

  signup: function (data, cb) {
    postJSON('/signup', data, function (res) {
      _authenticated = res.authenticated;
      _user = res.user;
      AuthenticationStore.notifyChange();
      if (cb){
        cb(res.authenticated, user);
      }
    });
  },

  logout: function (id, cb) {
    postJSON('/logout', data, function (res) {
      _authenticated = res.authenticated;
      _user = res.user;
      AuthenticationStore.notifyChange();
      if (cb){
        cb(res.authenticated);
      }
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

localStorage.token = localStorage.token || (Date.now()*Math.random())

function getJSON(url, cb) {
  const req = new XMLHttpRequest();
  req.onload = function () {
    if (req.status === 404) {
      cb(new Error('not found'));
    } else {
      cb(null, JSON.parse(req.response));
    }
  }
  req.open('GET', url);
  req.setRequestHeader('authorization', localStorage.token);
  req.send();
}

function postJSON(url, obj, cb) {
  const req = new XMLHttpRequest();
  req.onload = function () {
    cb(JSON.parse(req.response));
  }
  req.open('POST', url);
  req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  req.setRequestHeader('authorization', localStorage.token);
  req.send(JSON.stringify(obj));
}

function deleteJSON(url, cb) {
  const req = new XMLHttpRequest();
  req.onload = cb;
  req.open('DELETE', url);
  req.setRequestHeader('authorization', localStorage.token);
  req.send();
}

export default AuthenticationStore;