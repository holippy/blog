(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var ModArticle = require('./_store-article');

var Article = React.createClass({
  displayName: 'Article',


  componentWillMount: function componentWillMount() {
    ModArticle.storeData.addSubscribe({ callback: this.dataloaded });
  },
  actionCreator: function actionCreator() {
    ModArticle.dispatcher.action.create({
      actionType: 'latest',
      page: 1,
      callback: this.dataloaded
    });
  },
  dataloaded: function dataloaded(data) {
    console.log('article' + data);
  },
  render: function render() {
    return React.createElement(
      'p',
      { onClick: this.actionCreator },
      'text text'
    );
  }
});

ReactDOM.render(React.createElement(Article, null), document.getElementById('example'));

// var Article = React.createClass({

//   mixins: [mixin],

//   componentWillMount: function(){
//     var self = this;

//     //ブラウザの戻る進むボタンクリック時のイベントを設定
//     $(window).on('popstate.Article', function(){
//       console.log("");
//       self.dataSet();
//     });

//     self.dataSet();

//   },

//   dataSet: function(){
//     var self = this,
//         location = this.getLocation(),
//         params;

//     if( location === 'is-home'){
//       params = {};
//     }

//     self.getData(location);
//   },

//   getInitialState: function(){
//     return {
//       data: []
//     };
//   },

//   getData: function( params ){
//     var self = this,
//         xhr = $.ajax({
//         url: 'http://beautifulday.sakura.tv/wp/',
//         type: 'GET',
//         crossDomain: true,
//         cache: false,
//         data: params,
//         dataType: 'json',
//       statusCode: {
//       }
//     });

//     xhr.done(this.successHandler);
//     xhr.fail(this.failureHandler);
//   },

//   successHandler: function(data){

//     //self.xhrArticleにjsonデータをキャッシュ
//     self.xhrArticle = data.article;
//     self.xhrArticleLength = data.article.length;

//     this.setState({ data: data.article});

//   },

//   failureHandler: function(data){

//   },

//   clickEvnt: function(i){
//     var self = this;
//     history.pushState('', '', '?paged='+ (i+1) );
//     self.componentWillMount();
//   },

//   render: function() {

//     var self = this;

//     return (
//       <ul>
//         {self.state.data.map(function(data, i) {
//           return <li key={i} onClick={self.clickEvnt.bind(self, i)}>{data.title}</li>;
//         })}
//       </ul>
//     );
//   }
// });

// //記事をレンダリング
// ReactDOM.render(
//   <Article/>,
//   document.getElementById('example')
// );

module.exports = Article;

},{"./_store-article":4}],2:[function(require,module,exports){
'use strict';

var BgAnime = function BgAnime(data) {
  /*
  svgData 読み込むsvgデータのパスを配列で取得
  svgDataLength svnDataのlengthをキャッシュ
  loadCounter svgデータ読み込み用カウンター初期値は0
  */

  this.svgData = data;
  this.svgDataLength = data.length;
  this.loadCounter = 0;
  this.bgLayers = $('#bgLayers');
};

BgAnime.prototype = {

  /*
  svgデータを先読み
  先読みが済んだらsetItemsへ
  */

  svgLoad: function svgLoad() {

    var that = this;

    for (var i = 0; i < that.svgDataLength; i++) {
      (function () {
        var item = new Image();
        item.src = that.svgData[i];

        $(item).on('load', function () {
          that.loadCounter = that.loadCounter + 1;

          if (that.loadCounter === that.svgDataLength) {
            setTimeout(function () {
              that.setItems();
            }, 1000);
          }
        });
      })();
    };
  },

  /*
  loadingを非表示にしてからsvgをdomに追加
  */

  setItems: function setItems() {

    var that = this;

    $('#loading').remove();

    for (var i = 0; i < that.svgDataLength; i++) {

      if (i !== 6) {
        that.bgLayers.append('<figure class="svg' + (i + 1) + '"><img src="' + that.svgData[i] + '"></figure>');
      } else {
        that.bgLayers.append('<figure class="svg' + (i + 1) + '"></figure>');
      }
    };
  }
};

module.exports = BgAnime;

},{}],3:[function(require,module,exports){
'use strict';

var ModArticle = require('./_store-article');

var Menu = React.createClass({
  displayName: 'Menu',

  componentWillMount: function componentWillMount() {
    ModArticle.storeData.addSubscribe({ callback: this.dataloaded });
  },
  actionCreator: function actionCreator() {
    ModArticle.dispatcher.action.create({
      actionType: 'navi',
      page: 0,
      callback: this.dataloaded
    });
  },
  dataloaded: function dataloaded(data) {
    console.log('menu' + data);
  },
  render: function render() {
    return React.createElement(
      'p',
      { onClick: this.actionCreator },
      'menu menu'
    );
  }
});

ReactDOM.render(React.createElement(Menu, null), document.getElementById('nav__global'));

// var Menu = React.createClass({

//   mixins: [mixin],

//   componentWillMount: function(){
//     var self = this;

//     self.getData();

//   },

//   dataSet: function(){

//   },

//   getInitialState: function(){
//     return {
//       data: []
//     };
//   },

//   getData: function( params ){
//     var self = this,
//         xhr = $.ajax({
//         url: 'http://beautifulday.sakura.tv/wp/?page_id=37',
//         type: 'GET',
//         crossDomain: true,
//         cache: false,
//         data: params,
//         dataType: 'json',
//       statusCode: {
//       }
//     });

//     xhr.done(this.successHandler);
//     xhr.fail(this.failureHandler);
//   },

//   successHandler: function(data){

//     //self.xhrArticleにjsonデータをキャッシュ
//     self.xhrArticle = data;
//     self.xhrArticleLength = data.length;

//     this.setState({ data: data});

//   },

//   failureHandler: function(data){

//   },

//   clickEvnt: function(id){
//     var self = this;
//     history.pushState('', '', '?cat='+ id );
//   },

//   render: function() {

//     var self = this;

//     return (
//       <ul>
//         {self.state.data.map(function(data, i) {
//           return <li key={i} onClick={self.clickEvnt.bind(self, data.ID)}>{data.catName}</li>;
//         })}
//       </ul>
//     );
//   }
// });

// //記事をレンダリング
// ReactDOM.render(
//   <Menu/>,
//   document.getElementById('nav__global')
// );

module.exports = Menu;

},{"./_store-article":4}],4:[function(require,module,exports){
'use strict';

var Dispatcher = require('flux').Dispatcher;

var ModArticle = {};

ModArticle.dispatcher = new Dispatcher();
ModArticle.storeData = {
  data: null,
  subscriber: []
};
ModArticle.storePager = { data: null };

ModArticle.dispatcher.action = {
  dispatch: function dispatch(payload, data) {
    ModArticle.dispatcher.dispatch({
      actionType: payload.actionType,
      page: payload.page,
      data: data,
      callback: payload.callback
    });
  },
  create: function create(payload) {
    var that = this;
    if (payload.actionType === 'latest') {
      var xhr = $.ajax({
        url: 'http://beautifulday.sakura.tv/wp/',
        type: 'GET',
        crossDomain: true,
        cache: false,
        dataType: 'json',
        statusCode: {}
      });

      xhr.done(function (data) {
        that.dispatch(payload, data);
      });
    } else if (payload.actionType === 'navi') {
      var xhr = $.ajax({
        url: 'http://beautifulday.sakura.tv/wp/?page_id=37',
        type: 'GET',
        crossDomain: true,
        cache: false,
        dataType: 'json',
        statusCode: {}
      });

      xhr.done(function (data) {
        that.dispatch(payload, data);
      });
    }
  }
};

// ModArticle.dispatcher.register(function(payload) {
//   console.log(payload);
// });

ModArticle.storeData.addSubscribe = function (callback) {
  ModArticle.storeData.subscriber.push(callback.callback);
};

ModArticle.storeData.publish = function () {
  for (var i = 0; i < ModArticle.storeData.subscriber.length; i++) {
    ModArticle.storeData.subscriber[i]();
  };
};

ModArticle.storeData.dispatchToken = ModArticle.dispatcher.register(function (payload) {
  //ModArticle.dispatcher.waitFor([ModArticle.storePager.dispatchToken]);
  console.log('article' + ':' + payload.data);
  //ModArticle.storeData.update();
});

ModArticle.storePager.dispatchToken = ModArticle.dispatcher.register(function (payload) {
  ModArticle.dispatcher.waitFor([ModArticle.storeData.dispatchToken]);
  console.log('pager' + ':' + payload.data);
});

module.exports = ModArticle;

},{"flux":7}],5:[function(require,module,exports){
'use strict';

/*===========================

background

===========================*/

var bg = require('./_bg.js');

var bgAnime = new bg(['/assets/svg/layer1.svg', '/assets/svg/layer2.svg', '/assets/svg/layer3.svg', '/assets/svg/layer4.svg', '/assets/svg/layer5.svg', '/assets/svg/layer6.svg', '/assets/svg/layer7.svg']);

//bgAnime.svgLoad();

/*===========================

contents

===========================*/

//window.mixin = require('./_mixin.js');
var articleJSX = require('./_article.jsx');
var menuJSX = require('./_menu.jsx');

var aa = function aa() {
  var num = 0;
  var string = 'aa';
  var numnum = 10;
};

//var Userbox= require('./demo/userbox.jsx');

// var Dispatcher = require('flux').Dispatcher;
// var EventEmitter = require('events').EventEmitter;
// var assign = require('object-assign');

// var flightDispatcher = new Dispatcher();

// var articleDispatcher = new Dispatcher();

// // Keeps track of which country is selected
// // どの国が選択されたか記録する
// var CountryStore = {country: null};

// // Keeps track of which city is selected
// // どの都市が選択されたか記録する
// var CityStore = {city: null};

// // Keeps track of the base flight price of the selected city
// // 選択された都市の基本飛行料金を記録する
// var FlightPriceStore = {price: null};

// flightDispatcher.dispatch({
//   actionType: 'city-update',
//   selectedCity: 'paris'
// });

// var ArticleStore = {data: null};
// var PagerStore = {data: null};

// // articleDispatcher.dispatch({
// //   actionType: 'latest',
// //   page: 1
// // });

// flightDispatcher.register(function(payload) {
//   if (payload.actionType === 'city-update') {
//     CityStore.city = payload.selectedCity;
//   }
// });

// articleDispatcher.register(function(payload) {
//   if (payload.actionType === 'latest') {
//     ArticleStore.pager = payload.page;
//   }
// });

// flightDispatcher.dispatch({
//   actionType: 'country-update',
//   selectedCountry: 'australia'
// });

// // articleDispatcher.dispatch({
// //   actionType: 'category',
// //   page: 1
// // });

// CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
//   if (payload.actionType === 'country-update') {
//     CountryStore.country = payload.selectedCountry;
//   }
// });

// CityStore.dispatchToken = flightDispatcher.register(function(payload) {
//   if (payload.actionType === 'country-update') {
//     // `CountryStore.country` may not be updated.
// 　　// `CountryStore.country`はアップデートされないかもしれない
//     flightDispatcher.waitFor([CountryStore.dispatchToken]);
//     // `CountryStore.country` is now guaranteed to be updated.
// 　　// `CountryStore.country`は今アップデートされることを保証される

//     // Select the default city for the new country
// 　　// 新しい国のためのデフォルトの都市を選択する
//     CityStore.city = getDefaultCityForCountry(CountryStore.country);
//   }
// });

// ArticleStore.dispatchToken = articleDispatcher.register(function(payload) {

//   payload.callback('loaded1')

//   if (payload.actionType === 'latest') {
//     ArticleStore.data = payload.page;
//   }
// });

// PagerStore.dispatchToken = articleDispatcher.register(function(payload) {

//   payload.callback('loaded2')

//   if (payload.actionType === 'latest') {
//     ArticleStore.data = payload.page;
//   }
// });

// FlightPriceStore.dispatchToken =
//   flightDispatcher.register(function(payload) {
//     switch (payload.actionType) {
//       case 'country-update':
//       case 'city-update':
//         flightDispatcher.waitFor([CityStore.dispatchToken]);
//         FlightPriceStore.price =
//           getFlightPriceStore(CountryStore.country, CityStore.city);
//         break;
//   }
// });

// //view
// var Article = React.createClass({

//   getInitialState: function(){
//     return {
//       data: 1
//     };
//   },

//   componentWillUpdate: function(){

//   },

//   dataloaded: function(data){
//     console.log(data);

//   },

//   actionCreator: function(){
//     articleDispatcher.dispatch({
//       actionType: 'latest',
//       page: 1,
//       callback: this.dataloaded
//     });
//   },

//   render:function(){
//     return(
//       <p onClick={this.actionCreator}>text text</p>
//     );
//   }
// });

// ReactDOM.render(
//   <Article/>,
//   document.getElementById('example')
// );

// //Dispatcher
// var appDispatcher = assign(new Dispatcher(), {
//     handleServerAction: function (action) {
//         this.dispatch({
//             source: 'server',
//             action: action
//         })
//     }
// });

},{"./_article.jsx":1,"./_bg.js":2,"./_menu.jsx":3}],6:[function(require,module,exports){
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
},{"_process":9}],7:[function(require,module,exports){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Dispatcher = require('./lib/Dispatcher');

},{"./lib/Dispatcher":8}],8:[function(require,module,exports){
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
},{"_process":9,"fbjs/lib/invariant":6}],9:[function(require,module,exports){
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

},{}]},{},[5]);
