const API = '/api/posts';

let _posts = {};
let _initCalled = false;
let _changeListeners = [];

const PostStore = {

  init: function () {
    if (_initCalled) {
      return;
    }

    _initCalled = true;

    getJSON(API, function (err, res) {
      res.posts.forEach(function (post) {
        _posts[post.id] = post;
      })

      PostStore.notifyChange();
    })
  },

  addPost: function (post, cb) {
    postJSON(API, { post: post }, function (res) {
      _posts[res.post.id] = res.post;
      PostStore.notifyChange();
      if (cb){
        cb(res.post);
      }
    })
  },

  removePost: function (id, cb) {
    deleteJSON(API + '/' + id, cb);
    delete _posts[id];
    PostStore.notifyChange();
  },

  getPosts: function(groupId) {
    const array = [];

    for (const id in _posts) {
      if (_posts[id].GroupId === groupId) {
        array.push(_posts[id]);
      }
    }

    return array;
  },

  getPost: function (id) {
    return _posts[id];
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

export default PostStore;