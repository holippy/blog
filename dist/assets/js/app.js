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

/*===========================

contents

===========================*/

//window.mixin = require('./_mixin.js');
// var articleJSX = require('./_article.jsx');
// var menuJSX = require('./_menu.jsx');

// var aa = ()=>{
//   const num = 0;
//   let string = 'aa';
//   var numnum = 10;
// }

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

},{"./_bg.js":1,"./pageFncs/cntsThumb.js":3,"./pageFncs/header.js":4,"./pageFncs/slider.js":5}],3:[function(require,module,exports){
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
    console.log(scrollTop);

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

},{}]},{},[2]);
