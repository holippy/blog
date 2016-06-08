(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/*!
 * VERSION: 1.7.6
 * DATE: 2015-12-10
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : undefined || window;(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";
  var a = document.documentElement,
      b = window,
      c = function c(_c, d) {
    var e = "x" === d ? "Width" : "Height",
        f = "scroll" + e,
        g = "client" + e,
        h = document.body;return _c === b || _c === a || _c === h ? Math.max(a[f], h[f]) - (b["inner" + e] || a[g] || h[g]) : _c[f] - _c["offset" + e];
  },
      d = _gsScope._gsDefine.plugin({ propName: "scrollTo", API: 2, version: "1.7.6", init: function init(a, d, e) {
      return this._wdw = a === b, this._target = a, this._tween = e, "object" != (typeof d === "undefined" ? "undefined" : _typeof(d)) && (d = { y: d }), this.vars = d, this._autoKill = d.autoKill !== !1, this.x = this.xPrev = this.getX(), this.y = this.yPrev = this.getY(), null != d.x ? (this._addTween(this, "x", this.x, "max" === d.x ? c(a, "x") : d.x, "scrollTo_x", !0), this._overwriteProps.push("scrollTo_x")) : this.skipX = !0, null != d.y ? (this._addTween(this, "y", this.y, "max" === d.y ? c(a, "y") : d.y, "scrollTo_y", !0), this._overwriteProps.push("scrollTo_y")) : this.skipY = !0, !0;
    }, set: function set(a) {
      this._super.setRatio.call(this, a);var d = this._wdw || !this.skipX ? this.getX() : this.xPrev,
          e = this._wdw || !this.skipY ? this.getY() : this.yPrev,
          f = e - this.yPrev,
          g = d - this.xPrev;this.x < 0 && (this.x = 0), this.y < 0 && (this.y = 0), this._autoKill && (!this.skipX && (g > 7 || -7 > g) && d < c(this._target, "x") && (this.skipX = !0), !this.skipY && (f > 7 || -7 > f) && e < c(this._target, "y") && (this.skipY = !0), this.skipX && this.skipY && (this._tween.kill(), this.vars.onAutoKill && this.vars.onAutoKill.apply(this.vars.onAutoKillScope || this._tween, this.vars.onAutoKillParams || []))), this._wdw ? b.scrollTo(this.skipX ? d : this.x, this.skipY ? e : this.y) : (this.skipY || (this._target.scrollTop = this.y), this.skipX || (this._target.scrollLeft = this.x)), this.xPrev = this.x, this.yPrev = this.y;
    } }),
      e = d.prototype;d.max = c, e.getX = function () {
    return this._wdw ? null != b.pageXOffset ? b.pageXOffset : null != a.scrollLeft ? a.scrollLeft : document.body.scrollLeft : this._target.scrollLeft;
  }, e.getY = function () {
    return this._wdw ? null != b.pageYOffset ? b.pageYOffset : null != a.scrollTop ? a.scrollTop : document.body.scrollTop : this._target.scrollTop;
  }, e._kill = function (a) {
    return a.scrollTo_x && (this.skipX = !0), a.scrollTo_y && (this.skipY = !0), this._super._kill.call(this, a);
  };
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()();

var app = app || {};

/*===========================

react

===========================*/

//var storeArticle = require('./react/store-article.js');
//var page = require('./react/comp-page.jsx');
var music = require('./react/comp-music.jsx');

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./react/comp-music.jsx":3}],2:[function(require,module,exports){
'use strict';

var Dispatcher = require('flux').Dispatcher;

var StoreMusic = {};
var API = 'http://indoor-living.sakuraweb.com/wp/music/';

StoreMusic.dispatcher = new Dispatcher();

//musics定義
StoreMusic.musics = {
  data: null,
  subscriber: []
};

//subscriber用配列定義
StoreMusic.dispatcher.subscriber = [];

StoreMusic.dispatcher.action = {
  counter: 0,
  queue: [],
  compArray: [],
  resData: {},
  xhr: null,
  loadStatus: false,
  getData: function getData(num) {
    var _this = this;

    this.loadStatus = true;

    var d = new $.Deferred(),
        payload = this.queue[this.counter],
        url,
        data;

    //loadStatusをtrueにする
    //loadStatus = true;
    this.xhr = $.ajax({
      url: API,
      //data: data,
      type: 'GET',
      crossDomain: true,
      cache: true,
      dataType: 'json'
    });

    this.xhr.done(function (data) {

      _this.counter = _this.counter + 1;

      if (_this.counter === _this.compArray.length) {

        StoreMusic.dispatcher.dispatch(_this.resData);
        _this.loadStatus = false;

        //console.log('load end');

        _this.reset();
      } else {
        d.resolve(_this.counter);
      }
    });

    return d.promise();
  },
  create: function create(payload) {
    var _this2 = this;

    console.log(payload);

    //すでにajaxが実行中だった場合はabortして各パラメータをリセット
    if (this.loadStatus) {
      console.log('abort');
      this.xhr.abort();
      this.reset();
    }

    this.requestArray = payload.length;

    var doPromise = this.getData();
    for (var i = 0; i < this.requestArray.length - 1; i++) {
      doPromise = doPromise.then(function (data) {
        return _this2.getData();
      });
    }
  },
  reset: function reset() {
    this.counter = 0;
    this.queue = [];
    this.compArray = [];
    this.resData = {};
    this.xhr = null;
    this.loadStatus = false;
  }
};

/*===========================

subscriberにコールバックを追加

===========================*/

StoreMusic.addSubscribe = function (options) {
  StoreMusic.dispatcher.subscriber.push({
    actionType: options.actionType,
    callback: options.callback
  });
};

/*===========================

subscriberを実行

===========================*/

StoreMusic.publish = function () {
  _.each(StoreMusic.dispatcher.subscriber, function (obj, key) {
    obj.callback();
  });
};

/*===========================

subscriberから削除

===========================*/

StoreMusic.removeSubscribe = function (options) {
  StoreMusic.dispatcher.subscriber = _.reject(StoreMusic.dispatcher.subscriber, function (obj, index) {
    return obj.actionType == options.actionType;
  });
};

/*===========================

musicsのdispatchToken

===========================*/

StoreMusic.musics.dispatchToken = StoreMusic.dispatcher.register(function (res) {
  if (res['musics']) {

    StoreMusic.dispatcher.waitFor([StoreMusic.mainvisual.dispatchToken]);
    StoreMusic.musics.data = res['musics'];
    StoreMusic.publish();
  } else {
    StoreMusic.musics.data = null;
  }
});

module.exports = StoreMusic;

},{"flux":5}],3:[function(require,module,exports){
'use strict';

var StoreMusic = require('./Store-music');

var Music = React.createClass({
  displayName: 'Music',

  loadFlag: true,
  getDefaultProps: function getDefaultProps() {
    return {
      actionType: "music"
    };
  },
  getInitialState: function getInitialState() {
    return {
      data: null
    };
  },
  componentWillMount: function componentWillMount() {
    console.log('componentWillMount');
    this.loadAction();
  },
  loadAction: function loadAction() {
    this.actionCreator(['ID']);
  },
  actionCreator: function actionCreator(items) {
    //console.log('actionCreator');
    StoreMusic.addSubscribe({
      actionType: this.props.actionType,
      callback: this.dataloaded
    });

    StoreMusic.dispatcher.action.create({
      requireItem: items
    });
  },
  dataloaded: function dataloaded() {},
  shouldComponentUpdate: function shouldComponentUpdate() {},
  componentDidUpdate: function componentDidUpdate() {},
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {},
  render: function render() {

    if (this.loadFlag) {
      return React.createElement(
        'div',
        { className: 'LyPlayer' },
        React.createElement(
          'div',
          { className: 'MdPlayer' },
          React.createElement(
            'div',
            { className: 'mdPlayerInner' },
            React.createElement(
              'p',
              { className: 'mdPlayerTtl' },
              React.createElement(
                'span',
                null,
                'Movie Player'
              )
            )
          )
        )
      );
    } else {
      return false;
    }
  }
});

ReactDOM.render(React.createElement(Music, null), document.getElementById('Music'));

/*<div className="mdPlayerItem">
  <p className="mdPlayerName">来来来チーム東洋一</p>
  <p className="mdPlayerIframe">
    <iframe src="https://www.youtube.com/embed/C1DmxDNwbRg" width="600" height="300" frameborder="0" allowfullscreen="allowfullscreen" /></iframe></p>
    
  </p>
</div>*/

module.exports = Music;

},{"./Store-music":2}],4:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

"use strict";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function (condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;
}).call(this,require('_process'))
},{"_process":7}],5:[function(require,module,exports){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Dispatcher = require('./lib/Dispatcher');

},{"./lib/Dispatcher":6}],6:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Dispatcher
 * 
 * @preventMunge
 */

'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var invariant = require('fbjs/lib/invariant');

var _prefix = 'ID_';

/**
 * Dispatcher is used to broadcast payloads to registered callbacks. This is
 * different from generic pub-sub systems in two ways:
 *
 *   1) Callbacks are not subscribed to particular events. Every payload is
 *      dispatched to every registered callback.
 *   2) Callbacks can be deferred in whole or part until other callbacks have
 *      been executed.
 *
 * For example, consider this hypothetical flight destination form, which
 * selects a default city when a country is selected:
 *
 *   var flightDispatcher = new Dispatcher();
 *
 *   // Keeps track of which country is selected
 *   var CountryStore = {country: null};
 *
 *   // Keeps track of which city is selected
 *   var CityStore = {city: null};
 *
 *   // Keeps track of the base flight price of the selected city
 *   var FlightPriceStore = {price: null}
 *
 * When a user changes the selected city, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'city-update',
 *     selectedCity: 'paris'
 *   });
 *
 * This payload is digested by `CityStore`:
 *
 *   flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'city-update') {
 *       CityStore.city = payload.selectedCity;
 *     }
 *   });
 *
 * When the user selects a country, we dispatch the payload:
 *
 *   flightDispatcher.dispatch({
 *     actionType: 'country-update',
 *     selectedCountry: 'australia'
 *   });
 *
 * This payload is digested by both stores:
 *
 *   CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       CountryStore.country = payload.selectedCountry;
 *     }
 *   });
 *
 * When the callback to update `CountryStore` is registered, we save a reference
 * to the returned token. Using this token with `waitFor()`, we can guarantee
 * that `CountryStore` is updated before the callback that updates `CityStore`
 * needs to query its data.
 *
 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
 *     if (payload.actionType === 'country-update') {
 *       // `CountryStore.country` may not be updated.
 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
 *       // `CountryStore.country` is now guaranteed to be updated.
 *
 *       // Select the default city for the new country
 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
 *     }
 *   });
 *
 * The usage of `waitFor()` can be chained, for example:
 *
 *   FlightPriceStore.dispatchToken =
 *     flightDispatcher.register(function(payload) {
 *       switch (payload.actionType) {
 *         case 'country-update':
 *         case 'city-update':
 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
 *           FlightPriceStore.price =
 *             getFlightPriceStore(CountryStore.country, CityStore.city);
 *           break;
 *     }
 *   });
 *
 * The `country-update` payload will be guaranteed to invoke the stores'
 * registered callbacks in order: `CountryStore`, `CityStore`, then
 * `FlightPriceStore`.
 */

var Dispatcher = (function () {
  function Dispatcher() {
    _classCallCheck(this, Dispatcher);

    this._callbacks = {};
    this._isDispatching = false;
    this._isHandled = {};
    this._isPending = {};
    this._lastID = 1;
  }

  /**
   * Registers a callback to be invoked with every dispatched payload. Returns
   * a token that can be used with `waitFor()`.
   */

  Dispatcher.prototype.register = function register(callback) {
    var id = _prefix + this._lastID++;
    this._callbacks[id] = callback;
    return id;
  };

  /**
   * Removes a callback based on its token.
   */

  Dispatcher.prototype.unregister = function unregister(id) {
    !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
    delete this._callbacks[id];
  };

  /**
   * Waits for the callbacks specified to be invoked before continuing execution
   * of the current callback. This method should only be used by a callback in
   * response to a dispatched payload.
   */

  Dispatcher.prototype.waitFor = function waitFor(ids) {
    !this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Must be invoked while dispatching.') : invariant(false) : undefined;
    for (var ii = 0; ii < ids.length; ii++) {
      var id = ids[ii];
      if (this._isPending[id]) {
        !this._isHandled[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Circular dependency detected while ' + 'waiting for `%s`.', id) : invariant(false) : undefined;
        continue;
      }
      !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
      this._invokeCallback(id);
    }
  };

  /**
   * Dispatches a payload to all registered callbacks.
   */

  Dispatcher.prototype.dispatch = function dispatch(payload) {
    !!this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.') : invariant(false) : undefined;
    this._startDispatching(payload);
    try {
      for (var id in this._callbacks) {
        if (this._isPending[id]) {
          continue;
        }
        this._invokeCallback(id);
      }
    } finally {
      this._stopDispatching();
    }
  };

  /**
   * Is this Dispatcher currently dispatching.
   */

  Dispatcher.prototype.isDispatching = function isDispatching() {
    return this._isDispatching;
  };

  /**
   * Call the callback stored with the given id. Also do some internal
   * bookkeeping.
   *
   * @internal
   */

  Dispatcher.prototype._invokeCallback = function _invokeCallback(id) {
    this._isPending[id] = true;
    this._callbacks[id](this._pendingPayload);
    this._isHandled[id] = true;
  };

  /**
   * Set up bookkeeping needed when dispatching.
   *
   * @internal
   */

  Dispatcher.prototype._startDispatching = function _startDispatching(payload) {
    for (var id in this._callbacks) {
      this._isPending[id] = false;
      this._isHandled[id] = false;
    }
    this._pendingPayload = payload;
    this._isDispatching = true;
  };

  /**
   * Clear bookkeeping used for dispatching.
   *
   * @internal
   */

  Dispatcher.prototype._stopDispatching = function _stopDispatching() {
    delete this._pendingPayload;
    this._isDispatching = false;
  };

  return Dispatcher;
})();

module.exports = Dispatcher;
}).call(this,require('_process'))
},{"_process":7,"fbjs/lib/invariant":4}],7:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[1]);
