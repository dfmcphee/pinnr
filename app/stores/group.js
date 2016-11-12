const API = '/groups.json'

let _groups = {};
let _initCalled = false;
let _changeListeners = [];

const GroupStore = {

  init: function () {
    if (_initCalled) {
      return;
    }

    _initCalled = true;

    getJSON(API, function (err, res) {
      res.groups.forEach(function (group) {
        _groups[group.id] = group;
      })

      GroupStore.notifyChange();
    })
  },

  addGroup: function (group, cb) {
    postJSON(API, { group: group }, function (res) {
      _groups[res.group.id] = res.group;
      GroupStore.notifyChange();
      if (cb){
        cb(res.group);
      }
    })
  },

  removeGroup: function (id, cb) {
    deleteJSON(API + '/' + id, cb);
    delete _groups[id];
    GroupStore.notifyChange();
  },

  getGroups: function () {
    const array = [];

    for (const id in _groups) {
      array.push(_groups[id]);
    }

    return array;
  },

  getGroup: function (id) {
    return _groups[id];
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

export default GroupStore;