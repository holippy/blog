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

var storeArticle = require('./react/store-article.js');

var compArticleList = require('./react/comp-mainvisual.jsx');
var compArticleList = require('./react/comp-articleList.jsx');
var compGnav = require('./react/comp-gnav.jsx');

/*===========================

slider

===========================*/

//var slider = require('./pageFncs/slider.js');
//slider.init();

/*===========================

header

===========================*/

var header = require('./pageFncs/header.js');

header.init();

/*===========================

cntsThumb

===========================*/

var cntsThumb = require('./pageFncs/cntsThumb.js');

},{"./_bg.js":1,"./pageFncs/cntsThumb.js":3,"./pageFncs/header.js":4,"./react/comp-articleList.jsx":6,"./react/comp-gnav.jsx":7,"./react/comp-mainvisual.jsx":8,"./react/store-article.js":10}],3:[function(require,module,exports){
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
      left: -this.slideImgWidth * this.slideSet * 2 + ($(window).width() / 2 - this.slideImgWidth / 2) - 5
    });

    this.startPos = -this.slideImgWidth * this.slideSet * 2 + ($(window).width() / 2 - this.slideImgWidth / 2) - 5;
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

var Store = require('./store-article');
var Pager = require('./comp-pager.jsx');
var CntsThumb = require('../pageFncs/cntsThumb.js');

var ArticleList = React.createClass({
  displayName: 'ArticleList',
  getDefaultProps: function getDefaultProps() {
    return {
      actionType: "list"
    };
  },
  getInitialState: function getInitialState() {
    return {
      nowPage: 0,
      maxPage: [],
      article: []
    };
  },
  componentWillMount: function componentWillMount() {

    if (Store.PageControl.paramObjs.type === 'index') {
      Store.addSubscribe({
        actionType: this.props.actionType,
        callback: this.dataloaded
      });

      this.actionCreator(Store.PageControl.paramObjs.paged, [this.props.actionType, 'gnav', 'mainvisual']);
    }

    this.events();
  },
  events: function events() {
    var _this = this;

    $(window).on('popstate', function () {
      _this.actionCreator(Store.PageControl.paramObjs.paged, [_this.props.actionType]);
    });
  },
  actionCreator: function actionCreator(page, comps) {

    Store.dispatcher.action.create({
      actionType: this.props.actionType,
      page: page,
      callback: this.dataloaded,
      requireComps: comps
    });
  },
  dataloaded: function dataloaded() {
    var _this2 = this;

    var _countArray = [];

    if (Store.list.data) {

      for (var i = 0; i < Store.list.data.page.maxPage; i++) {
        _countArray.push(i);
      }

      this.imgLoading(Store.list.data.article).then(function (e) {

        _this2.replaceState({
          nowPage: Store.list.data.page.nowPage,
          maxPage: _countArray,
          article: Store.list.data.article
        });
      });
    }
  },
  componentDidUpdate: function componentDidUpdate() {
    CntsThumb.init();
  },
  pagerClick: function pagerClick(e) {

    e.preventDefault();
    var _num = e.target.dataset.num;

    if (_num === '1') {
      _num = 0;
    }

    if (this.state.nowPage === _num) {
      return false;
    } else {
      this.actionCreator(_num, [this.props.actionType]);

      history.pushState(null, null, '/index_react.html?type=' + Store.PageControl.paramObjs.type + '&paged=' + e.target.dataset.num);
      Store.PageControl.getParam();
    }
  },
  imgLoading: function imgLoading(data) {
    var counter = 0;

    return new Promise(function (resolve, reject) {

      data.map(function (res, index) {
        var img = new Image();

        $(img).on('load', function () {
          counter = counter + 1;
          if (counter == data.length) {
            resolve(counter);
          }
        });

        $(img).attr('src', res.thumb);
      });
    });
  },
  render: function render() {
    var _this3 = this;

    if (this.state.article.length === 0) {
      return false;
    } else {
      var article = this.state.article.map(function (res, index) {
        return React.createElement(
          'section',
          { key: index, className: 'MdCntsThumb01' },
          React.createElement(
            'a',
            { href: res.url },
            React.createElement(
              'p',
              { className: 'mdCntsThumb01Img' },
              React.createElement('img', { src: res.thumb })
            ),
            React.createElement(
              'div',
              { className: 'mdCntsThumb01InfoClm' },
              React.createElement(
                'div',
                { className: 'mdCntsThumb01Clm01' },
                React.createElement(
                  'p',
                  { className: 'mdCntsThumb01Cat' },
                  res.category
                )
              ),
              React.createElement(
                'div',
                { className: 'mdCntsThumb01Clm02' },
                React.createElement(
                  'p',
                  { className: 'mdCntsThumb01Date' },
                  res.date
                )
              )
            ),
            React.createElement(
              'div',
              { className: 'mdCntsThumb01InfoInBox' },
              React.createElement(
                'h2',
                { className: 'mdCntsThumb01Ttl' },
                'タイトルタイトルタイトルタイトルタイトル'
              ),
              React.createElement(
                'p',
                { className: 'mdCntsThumb01Txt' },
                'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト'
              )
            ),
            React.createElement(
              'p',
              { className: 'mdCntsThumb01Icn' },
              React.createElement('span', { className: 'icon-icon04' })
            ),
            React.createElement(
              'div',
              { className: 'mdCntsThumb01Cover' },
              React.createElement(
                'p',
                { className: 'mdCntsThumb01Txt' },
                'Read More'
              )
            )
          )
        );
      });

      var pager = this.state.maxPage.map(function (index) {
        return React.createElement(Pager, { pagerClick: _this3.pagerClick, num: index, key: index, stay: _this3.state.nowPage });
      });
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: 'LyCntsList' },
          article
        ),
        React.createElement(
          'ul',
          { className: 'MdPager01' },
          pager
        )
      );
    }
  }
});

ReactDOM.render(React.createElement(ArticleList, null), document.getElementById('Main'));

module.exports = ArticleList;

},{"../pageFncs/cntsThumb.js":3,"./comp-pager.jsx":9,"./store-article":10}],7:[function(require,module,exports){
'use strict';

var Store = require('./store-article');

var Gnav = React.createClass({
  displayName: 'Gnav',
  getDefaultProps: function getDefaultProps() {
    return {
      actionType: "gnav"
    };
  },
  getInitialState: function getInitialState() {
    return {
      gnav: [],
      view: false
    };
  },
  componentWillMount: function componentWillMount() {
    Store.addSubscribe({
      actionType: this.props.actionType,
      callback: this.dataloaded
    });
    this.actionCreator([this.props.actionType, 'list', 'mainvisual']);
  },
  actionCreator: function actionCreator(comps) {
    Store.dispatcher.action.create({
      actionType: this.props.actionType,
      page: 1,
      callback: this.dataloaded,
      requireComps: comps
    });
  },
  dataloaded: function dataloaded() {
    console.log(Store.gnav.data);
    this.replaceState({
      gnav: Store.gnav.data
    });

    Store.removeSubscribe({
      actionType: this.props.actionType
    });
  },
  render: function render() {
    if (this.state.gnav.length === 0) {
      return false;
    } else {
      var lists = this.state.gnav.map(function (res) {

        return React.createElement(
          'li',
          { key: res.ID },
          React.createElement('span', { className: 'icon-icon05' }),
          React.createElement(
            'a',
            { href: res.slug },
            res.catName
          )
        );
      });
      return React.createElement(
        'ul',
        null,
        lists
      );
    }
  }
});

ReactDOM.render(React.createElement(Gnav, { actionType: 'gnav' }), document.getElementById('Gnav'));

module.exports = Gnav;

},{"./store-article":10}],8:[function(require,module,exports){
'use strict';

var Store = require('./store-article');
var Slider = require('../pageFncs/slider.js');

var Mainvisual = React.createClass({
  displayName: 'Mainvisual',
  getDefaultProps: function getDefaultProps() {
    return {
      actionType: "mainvisual"
    };
  },
  getInitialState: function getInitialState() {
    return {
      page: 1,
      mainvisual: []
    };
  },
  componentWillMount: function componentWillMount() {
    Store.addSubscribe({
      actionType: this.props.actionType,
      callback: this.dataloaded
    });
    this.actionCreator([this.props.actionType, 'list', 'mainvisual']);
  },
  actionCreator: function actionCreator(comps) {
    Store.dispatcher.action.create({
      actionType: this.props.actionType,
      callback: this.dataloaded,
      requireComps: comps
    });
  },
  dataloaded: function dataloaded() {
    var _this = this;

    if (Store.mainvisual.data) {
      this.imgLoading(Store.mainvisual.data).then(function (e) {
        _this.replaceState({ mainvisual: Store.mainvisual.data });
      });
    }
  },
  imgLoading: function imgLoading(data) {
    var counter = 0;

    return new Promise(function (resolve, reject) {

      data.map(function (res, index) {
        var img = new Image();

        $(img).on('load', function () {
          counter = counter + 1;
          if (counter == data.length) {
            resolve(counter);
          }
        });

        $(img).attr('src', res.thumb);
      });
    });
  },
  componentDidUpdate: function componentDidUpdate() {
    Slider.init();
  },
  render: function render() {
    if (this.state.mainvisual.length === 0) {
      return false;
    } else {
      var imgs = this.state.mainvisual.map(function (res, index) {
        return React.createElement(
          'li',
          { key: index },
          React.createElement(
            'a',
            { href: res.url },
            React.createElement(
              'p',
              { className: 'mdSlideCat' },
              res.category
            ),
            React.createElement(
              'p',
              { className: 'mdSlideTtl' },
              React.createElement(
                'span',
                null,
                res.title
              )
            ),
            React.createElement(
              'p',
              { className: 'mdSlideImg' },
              React.createElement('img', { src: res.thumb })
            )
          )
        );
      });

      var pager = this.state.mainvisual.map(function (res, index) {
        return React.createElement(
          'li',
          { key: index },
          React.createElement('a', { href: '#', className: 'icon-icon01' })
        );
      });

      return React.createElement(
        'div',
        null,
        React.createElement(
          'ul',
          { className: 'mdSlideListImg' },
          imgs
        ),
        React.createElement(
          'ul',
          { className: 'mdSlideListPager' },
          pager
        ),
        React.createElement(
          'ul',
          { className: 'mdSlideListBtn' },
          React.createElement(
            'li',
            { className: 'mdSlideListBtnBack' },
            React.createElement('a', { href: '#', className: 'icon-icon02' })
          ),
          React.createElement(
            'li',
            { className: 'mdSlideListBtnNext' },
            React.createElement('a', { href: '#', className: 'icon-icon04' })
          )
        )
      );
    }
  }
});

ReactDOM.render(React.createElement(Mainvisual, null), document.getElementById('Mainvisual'));

module.exports = Mainvisual;

},{"../pageFncs/slider.js":5,"./store-article":10}],9:[function(require,module,exports){
"use strict";

var Store = require('./store-article');

var Pager = React.createClass({
  displayName: "Pager",
  getDefaultProps: function getDefaultProps() {
    return {
      actionType: "pager"
    };
  },
  getInitialState: function getInitialState() {
    return {
      page: 1,
      data: []
    };
  },
  componentWillMount: function componentWillMount() {
    Store.addSubscribe({
      actionType: this.props.actionType,
      callback: this.dataloaded
    });
    //this.actionCreator([ this.props.actionType, 'gnav', 'list' ]);
  },
  actionCreator: function actionCreator(comps) {

    Store.dispatcher.action.create({
      actionType: this.props.actionType,
      page: 1,
      callback: this.dataloaded,
      requireComps: comps
    });
  },
  dataloaded: function dataloaded() {
    if (Store.list.data) {
      this.replaceState({ data: Store.list.data.article });
    }
  },
  render: function render() {
    var stay = this.props.stay;

    if (stay != 0) {
      stay = stay - 1;
    }

    if (this.props.num === stay) {
      return React.createElement(
        "li",
        { key: this.props.num },
        React.createElement(
          "a",
          { href: "#", "data-num": this.props.num + 1, onClick: this.props.pagerClick, className: "stay" },
          this.props.num + 1
        )
      );
    } else {
      return React.createElement(
        "li",
        { key: this.props.num },
        React.createElement(
          "a",
          { href: "#", "data-num": this.props.num + 1, onClick: this.props.pagerClick },
          this.props.num + 1
        )
      );
    }
  }
});

// ReactDOM.render(
//   <Pager />,
//   document.getElementById('Gnav')
// );

module.exports = Pager;

},{"./store-article":10}],10:[function(require,module,exports){
'use strict';

var Dispatcher = require('flux').Dispatcher;

var Store = {};

Store.PageControl = {
  paramObjs: {},
  getParam: function getParam() {
    var _url = location.href.split('?'),
        _params;

    if (_url[1]) {
      _params = _url[1].split('&');

      for (var i = 0; i < _params.length; i++) {
        var split = _params[i].split('='),
            key = split[0],
            value = split[1];

        if (key === 'paged' && value === '1') {
          value = '0';
        }

        this.paramObjs[key] = value;
      }
    } else {
      this.paramObjs = { 'type': 'index', 'paged': '0' };
    }
  }
};

Store.PageControl.getParam();
$(window).on('popstate', function () {

  Store.PageControl.getParam();
  console.log(Store.PageControl.paramObjs);
});

Store.dispatcher = new Dispatcher();

//sortData定義
Store.list = {
  data: null,
  subscriber: []
};

//sortData定義
Store.gnav = {
  data: null,
  subscriber: []
};

//sortData定義
Store.mainvisual = {
  data: null,
  subscriber: []
};

//subscriber用配列定義
Store.dispatcher.subscriber = [];

Store.dispatcher.action = {
  counter: 0,
  queue: [],
  compArray: [],
  resData: {},
  getData: function getData(num) {
    var _this = this;

    return new Promise(function (resolve, reject) {

      var payload = _this.queue[_this.counter],
          url,
          data,
          xhr;

      switch (payload.actionType) {
        case 'gnav':
          url = 'http://beautifulday.sakura.tv/wp/catlist/';
          data = {};
          break;
        case 'list':
          url = 'http://beautifulday.sakura.tv/wp/page/' + payload.page + '/';
          data = { paged: payload.page };
          break;
        case 'pager':
          url = 'http://beautifulday.sakura.tv/wp/dummy/';
          data = {};
          break;
        case 'mainvisual':
          url = 'http://beautifulday.sakura.tv/wp/mainvisual/';
          data = {};
          break;
      }

      xhr = $.ajax({
        url: url,
        //data: data,
        type: 'GET',
        crossDomain: true,
        cache: false,
        dataType: 'json'
      });

      xhr.done(function (data) {

        _this.counter = _this.counter + 1;
        _this.resData[payload.actionType] = data;

        if (_this.counter === _this.compArray.length) {
          Store.dispatcher.dispatch(_this.resData);
          _this.reset();
        } else {
          resolve(_this.counter);
        }
      });
    });
  },
  create: function create(payload) {
    var _this2 = this;

    _.each(payload.requireComps, function (compName) {
      _this2.compArray.push(compName);
      _this2.compArray = _.uniq(_this2.compArray);
      _this2.compArray = _.sortBy(_this2.compArray);
    });

    this.queue.push(payload);

    if (this.queue.length === this.compArray.length) {

      var doPromise = this.getData();
      for (var i = 0; i < this.queue.length - 1; i++) {
        doPromise = doPromise.then(function (data) {
          return _this2.getData();
        });
      }
    }
  },
  reset: function reset() {
    this.counter = 0;
    this.queue = [];
    this.compArray = [];
    this.resData = {};
  }
};

/*===========================

subscriberにコールバックを追加

===========================*/

Store.addSubscribe = function (options) {
  Store.dispatcher.subscriber.push({
    actionType: options.actionType,
    callback: options.callback
  });
};

/*===========================

subscriberを実行

===========================*/

Store.publish = function () {
  _.each(Store.dispatcher.subscriber, function (obj, key) {
    obj.callback();
  });
};

/*===========================

subscriberから削除

===========================*/

Store.removeSubscribe = function (options) {
  Store.dispatcher.subscriber = _.reject(Store.dispatcher.subscriber, function (obj, index) {
    return obj.actionType == options.actionType;
  });
};

/*===========================

listのdispatchToken

===========================*/

Store.list.dispatchToken = Store.dispatcher.register(function (res) {
  if (res['list']) {
    Store.dispatcher.waitFor([Store.mainvisual.dispatchToken]);
    Store.list.data = res['list'];
    Store.publish();
  }
});

/*===========================

gnavのdispatchToken

===========================*/

Store.gnav.dispatchToken = Store.dispatcher.register(function (res) {
  if (res['gnav']) {
    Store.gnav.data = res['gnav'];
  } else {
    Store.gnav.data = false;
    return true;
  }
});

/*===========================

mainvisualのdispatchToken

===========================*/

Store.mainvisual.dispatchToken = Store.dispatcher.register(function (res) {

  if (res['mainvisual']) {
    Store.dispatcher.waitFor([Store.gnav.dispatchToken]);
    Store.mainvisual.data = res['mainvisual'];
  } else {
    Store.mainvisual.data = false;
    return true;
  }
});

module.exports = Store;

},{"flux":12}],11:[function(require,module,exports){
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
},{"_process":14}],12:[function(require,module,exports){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Dispatcher = require('./lib/Dispatcher');

},{"./lib/Dispatcher":13}],13:[function(require,module,exports){
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
},{"_process":14,"fbjs/lib/invariant":11}],14:[function(require,module,exports){
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
