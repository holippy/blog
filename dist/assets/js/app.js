(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

/*===========================

background

===========================*/

var bg = require('./_bg.js');

var bgAnime = new bg(['/assets/svg/layer1.svg', '/assets/svg/layer2.svg', '/assets/svg/layer3.svg', '/assets/svg/layer4.svg', '/assets/svg/layer5.svg', '/assets/svg/layer6.svg', '/assets/svg/layer7.svg']);

//bgAnime.svgLoad();

/*===========================

app

===========================*/

var app = app || {};

/*===========================

react

===========================*/

var compArticleList = require('./react/comp-articleList.jsx');
var storeArticleList = require('./react/store-articleList.js');

/*===========================

slider

===========================*/

var slider = require('./pageFncs/slider.js');

slider.init();

/*===========================

header

===========================*/

var header = require('./pageFncs/header.js');

header.init();

/*===========================

cntsThumb

===========================*/

var cntsThumb = require('./pageFncs/cntsThumb.js');

cntsThumb.init();

},{"./_bg.js":1,"./pageFncs/cntsThumb.js":3,"./pageFncs/header.js":4,"./pageFncs/slider.js":5,"./react/comp-articleList.jsx":6,"./react/store-articleList.js":7}],3:[function(require,module,exports){
'use strict';

var app = app || {};

app.cntsThumb = {
  init: function init() {
    this.thumb = $('.MdCntsThumb01');
    this.setEvnt();
  },
  setEvnt: function setEvnt() {
    this.thumb.each(function (i, elm) {
      $(elm).hover(function () {
        $(elm).addClass('ExHover01');
        $(elm).removeClass('ExHover02');
      }, function () {
        $(elm).addClass('ExHover02');
        $(elm).removeClass('ExHover01');
      });
    });
  }
};

module.exports = app.cntsThumb;

},{}],4:[function(require,module,exports){
'use strict';

var app = app || {};

app.header = {
  init: function init() {
    this.header = $('.LyHead');
    this.logo = $('.mdLogo');
    this.logoWidth = 90;
    this.logoHeight = 70;

    this.eventSet();
  },
  headerControl: function headerControl(scrollTop) {

    var size = (100 - scrollTop / 90 * 100) / 100,
        mgb = 20 * (100 - scrollTop / 90 * 100) / 100,
        width = this.logoWidth * (100 - scrollTop / 90 * 100) / 100,
        height = this.logoHeight * (100 - scrollTop / 90 * 100) / 100,
        bgsize = 100 - scrollTop / 90 * 100;

    if (scrollTop < 45) {
      TweenMax.set(this.logo, {
        'width': width,
        'height': height,
        'margin-bottom': mgb,
        '-webkit-transform': 'scale(' + size + ')'
      });

      TweenMax.set(this.header, {
        'height': 130 - scrollTop
      });
    }

    if (scrollTop > 45) {
      this.header.addClass('ExFixed');
      TweenMax.set(this.header, {
        'height': 'auto'
      });
      this.logo.removeAttr('style');
    } else if (scrollTop < 45) {
      this.header.removeClass('ExFixed');
    }
  },
  eventSet: function eventSet() {
    var _this = this;

    $(window).on('scroll', function () {
      _this.headerControl($(window).scrollTop());
    });
  }
};

module.exports = app.header;

},{}],5:[function(require,module,exports){
'use strict';

var app = app || {};

app.slider = {
  init: function init() {
    var _this = this;

    this.slideCurrent = 0;
    this.targetPos = 0;

    this.slideList = $('.mdSlideListImg');
    this.slideImgs = $('.mdSlideListImg li');
    this.slideSet = this.slideList.children().length;
    this.slideImgWidth = this.slideList.children().eq(0).outerWidth();
    this.slideBtnBack = $('.mdSlideListBtnBack');
    this.slideBtnNext = $('.mdSlideListBtnNext');
    this.slidePager = $('.mdSlideListPager li');
    this.startPos;

    for (var i = 0; i < 3; i++) {
      this.slideImgs.each(function (i, elm) {
        _this.slideList.append($(elm).clone());
      });
    }

    this.slideImgs = $('.mdSlideListImg li');
    this.slideImgsLength = this.slideImgs.length;
    this.slideCurrentIndex = this.slideSet * 2;
    this.slidePager.eq(this.slideCurrent).addClass('ExCurrent');

    this.slideImgs.eq(this.slideCurrentIndex).addClass('ExCurrent');

    this.slideList.css({
      width: this.slideImgsLength * this.slideImgWidth
    });

    this.posSet();
    this.evntSet();
    this.autoPlay();
  },
  posSet: function posSet() {
    this.slideList.css({
      left: -this.slideImgWidth * this.slideSet * 2 + ($(window).width() / 2 - this.slideImgWidth / 2)
    });

    this.startPos = -this.slideImgWidth * this.slideSet * 2 + ($(window).width() / 2 - this.slideImgWidth / 2);
  },
  reset: function reset() {
    this.slideList.css({ left: this.startPos });
    this.slideCurrent = 0;
    this.slideCurrentIndex = this.slideSet * 2;
    this.slideImgs.removeAttr('class');
    this.slideImgs.eq(this.slideCurrentIndex).addClass('ExCurrent');
  },
  infoShow: function infoShow() {
    this.slideImgs.eq(this.slideCurrentIndex).removeClass('ExHide');
    this.slideImgs.eq(this.slideCurrentIndex).addClass('ExCurrent');
  },
  slideBack: function slideBack() {
    var _this2 = this;

    this.targetPos = this.startPos - this.slideImgWidth * this.slideCurrent;

    TweenMax.to(this.slideList, 1, {
      left: this.targetPos,
      ease: Power3.easeOut,
      onUpdate: function onUpdate(tween) {
        if (_this2.slideList.position().left >= _this2.startPos + _this2.slideImgWidth * _this2.slideSet) {

          _this2.reset();

          if (_this2.targetPos > _this2.startPos + _this2.slideImgWidth * _this2.slideSet) {
            TweenMax.killTweensOf(_this2.slideList);
            clearTimeout(_this2.timeoutTimer);
            _this2.btnBackControl();
          }
        }
      },
      onComplete: function onComplete() {
        _this2.infoShow();
      }
    });
  },
  slideNext: function slideNext() {
    var _this3 = this;

    this.targetPos = this.startPos - this.slideImgWidth * this.slideCurrent;

    TweenMax.to(this.slideList, 1, {
      left: this.targetPos,
      ease: Power3.easeOut,
      onUpdate: function onUpdate(tween) {
        if (_this3.slideList.position().left <= _this3.startPos - _this3.slideImgWidth * _this3.slideSet) {

          _this3.reset();

          if (_this3.targetPos < _this3.startPos - _this3.slideImgWidth * _this3.slideSet) {
            TweenMax.killTweensOf(_this3.slideList);
            clearTimeout(_this3.timeoutTimer);
            _this3.btnNextControl();
          }
        }
      },
      onComplete: function onComplete() {
        _this3.infoShow();
      }
    });
  },
  autoPlay: function autoPlay() {
    var _this4 = this;

    this.timer;

    this.intervalTimer = setInterval(function () {
      if (_this4.slideCurrent + 1 === _this4.slidePager.length) {
        _this4.pagerControl(_this4.slideCurrent + 1, _this4.slidePager.eq(0));
      } else {
        _this4.pagerControl(_this4.slideCurrent + 1, _this4.slidePager.eq(_this4.slideCurrent + 1));
      }
    }, 5000);
  },
  pagerControl: function pagerControl(i, elm) {
    var _this5 = this;

    clearInterval(this.intervalTimer);
    clearTimeout(this.timeoutTimer);
    this.slidePager.removeClass('ExCurrent');
    $(elm).addClass('ExCurrent');
    this.slideCurrent = i;
    this.slideImgs.eq(this.slideCurrentIndex).removeClass('ExCurrent');
    this.slideImgs.eq(this.slideCurrentIndex).addClass('ExHide');
    this.slideCurrentIndex = this.slideSet * 2 + i;
    this.slideNext();

    this.timeoutTimer = setTimeout(function () {
      _this5.autoPlay();
    }, 5000);
  },
  btnNextControl: function btnNextControl() {
    var _this6 = this;

    clearInterval(this.intervalTimer);
    clearTimeout(this.timeoutTimer);
    this.slideCurrent = this.slideCurrent + 1;
    this.slidePager.removeClass('ExCurrent');

    if (this.slideCurrent === this.slidePager.length) {
      this.slidePager.eq(0).addClass('ExCurrent');
    } else {
      this.slidePager.eq(this.slideCurrent).addClass('ExCurrent');
    }

    if (this.slideImgs.eq(this.slideCurrentIndex).hasClass('ExCurrent')) {
      this.slideImgs.eq(this.slideCurrentIndex).addClass('ExHide');
    }

    this.slideImgs.eq(this.slideCurrentIndex).removeClass('ExCurrent');
    this.slideNext();
    this.slideCurrentIndex = this.slideCurrentIndex + 1;

    this.timeoutTimer = setTimeout(function () {
      _this6.autoPlay();
    }, 5000);
  },
  btnBackControl: function btnBackControl() {
    var _this7 = this;

    clearInterval(this.intervalTimer);
    clearTimeout(this.timeoutTimer);
    this.slideCurrent = this.slideCurrent - 1;
    this.slidePager.removeClass('ExCurrent');

    if (this.slideCurrent === -this.slidePager.length - 1) {
      this.slidePager.eq(-1).addClass('ExCurrent');
    } else {
      this.slidePager.eq(this.slideCurrent).addClass('ExCurrent');
    }

    if (this.slideImgs.eq(this.slideCurrentIndex).hasClass('ExCurrent')) {
      this.slideImgs.eq(this.slideCurrentIndex).addClass('ExHide');
    }

    this.slideImgs.eq(this.slideCurrentIndex).removeClass('ExCurrent');
    this.slideBack();
    this.slideCurrentIndex = this.slideCurrentIndex - 1;

    this.timeoutTimer = setTimeout(function () {
      _this7.autoPlay();
    }, 5000);
  },
  evntSet: function evntSet() {
    var _this8 = this;

    $(window).on('resize', function () {
      _this8.posSet();
      _this8.reset();
    });

    this.slidePager.each(function (i, elm) {
      $(elm).on('click', function (e) {
        e.preventDefault();
        if (!$(elm).hasClass('ExCurrent')) {
          clearInterval(_this8.intervalTimer);
          clearTimeout(_this8.timeoutTimer);
          _this8.pagerControl(i, elm);
        }
      });
    });

    this.slideBtnBack.on('click', function (e) {
      e.preventDefault();
      _this8.btnBackControl();
    });

    this.slideBtnNext.on('click', function (e) {
      e.preventDefault();
      _this8.btnNextControl();
    });

    this.slideBtnNext.hover(function () {
      _this8.slideBtnNext.addClass('ExHover01');
      _this8.slideBtnNext.removeClass('ExHover02');
    }, function () {
      _this8.slideBtnNext.addClass('ExHover02');
      _this8.slideBtnNext.removeClass('ExHover01');
    });

    this.slideBtnBack.hover(function () {
      _this8.slideBtnBack.addClass('ExHover01');
      _this8.slideBtnBack.removeClass('ExHover02');
    }, function () {
      _this8.slideBtnBack.addClass('ExHover02');
      _this8.slideBtnBack.removeClass('ExHover01');
    });
  }
};

module.exports = app.slider;

},{}],6:[function(require,module,exports){
'use strict';

var ModArticle = require('./store-articleList');

var Article = React.createClass({
  displayName: 'Article',


  componentWillMount: function componentWillMount() {
    ModArticle.storeData.addSubscribe({ callback: undefined.dataloaded });
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

module.exports = Article;

},{"./store-articleList":7}],7:[function(require,module,exports){
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

},{"flux":9}],8:[function(require,module,exports){
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
},{"_process":11}],9:[function(require,module,exports){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Dispatcher = require('./lib/Dispatcher');

},{"./lib/Dispatcher":10}],10:[function(require,module,exports){
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
},{"_process":11,"fbjs/lib/invariant":8}],11:[function(require,module,exports){
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

},{}]},{},[2]);
