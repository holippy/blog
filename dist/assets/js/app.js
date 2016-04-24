(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var app = app || {};

/*===========================

react

===========================*/

var storeArticle = require('./react/store-article.js');

var page = require('./react/comp-page.jsx');

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

},{"./pageFncs/cntsThumb.js":2,"./pageFncs/header.js":3,"./react/comp-page.jsx":8,"./react/store-article.js":11}],2:[function(require,module,exports){
'use strict';

var app = app || {};

app.cntsThumb = {
  init: function init() {
    this.thumb = $('.MdCntsThumb01');

    for (var i = 0; i < this.thumb.length; i++) {
      this.thumbShow(this.thumb[i], i);
    }

    this.setEvnt();
  },
  thumbShow: function thumbShow(elm, index) {
    TweenMax.set(elm, { display: 'block', opacity: 0 });

    setTimeout(function () {

      TweenMax.to(elm, 1, {
        opacity: 1,
        ease: Power3.easeOut
      });
    }, index * 200);
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

},{}],3:[function(require,module,exports){
'use strict';

var app = app || {};

app.header = {
  init: function init() {
    this.header = $('.LyHead');
    this.logo = $('.mdLogo');
    this.logoWidth = 90;
    this.logoHeight = 70;

    this.header.addClass('FncStart');

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

},{}],4:[function(require,module,exports){
'use strict';

var app = app || {};

app.slider = {
  init: function init() {
    var _this = this;

    this.slideCurrent = 0;
    this.targetPos = 0;

    this.slide = $('.MdSlideContianer');
    this.slideList = $('.mdSlideListImg');
    this.slideImgs = $('.mdSlideListImg li');
    this.slideSet = this.slideList.children().length;
    this.slideImgWidth = this.slideList.children().eq(0).outerWidth();
    this.slideBtnBack = $('.mdSlideListBtnBack');
    this.slideBtnNext = $('.mdSlideListBtnNext');
    this.slidePager = $('.mdSlideListPager li');

    this.startPos;

    this.slide.addClass("FncStart");
    this.slide.css({ display: 'block' });

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
  unmount: function unmount() {
    clearInterval(this.intervalTimer);

    $(window).off('resize');

    this.slidePager.each(function (i, elm) {
      $(elm).off('click');
    });

    this.slideBtnBack.off('click');

    this.slideBtnNext.off('click');
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

},{}],5:[function(require,module,exports){
'use strict';

var Store = require('./store-article');
var Pager = require('./comp-pager.jsx');
var CntsThumb = require('../pageFncs/cntsThumb.js');

var ArticleList = React.createClass({
  displayName: 'ArticleList',

  first: true,
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

    if (Store.gnav.data === null && Store.mainvisual.data == null) {
      this.actionCreator(Store.PageControl.paramObjs.paged, [this.props.actionType, 'gnav', 'mainvisual']);
    } else {
      this.actionCreator(Store.PageControl.paramObjs.paged, [this.props.actionType, 'mainvisual']);
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps() {

    if (!this.first) {

      if (Store.gnav.data === null && Store.mainvisual.data == null) {
        this.actionCreator(Store.PageControl.paramObjs.paged, [this.props.actionType, 'gnav', 'mainvisual']);
      } else {
        console.log('re');
        this.actionCreator(Store.PageControl.paramObjs.paged, [this.props.actionType, 'mainvisual']);
      }
    }
  },
  actionCreator: function actionCreator(page, comps) {

    Store.addSubscribe({
      actionType: this.props.actionType,
      callback: this.dataloaded
    });

    Store.dispatcher.action.create({
      actionType: this.props.actionType,
      page: page,
      callback: this.dataloaded,
      requireComps: comps
    });
  },
  dataloaded: function dataloaded() {
    var _this = this;

    var _countArray = [];

    Store.removeSubscribe({
      actionType: this.props.actionType
    });

    if (Store.list.data) {

      for (var i = 0; i < Store.list.data.page.maxPage; i++) {
        _countArray.push(i);
      }

      this.imgLoading(Store.list.data.article).then(function (e) {

        _this.replaceState({
          nowPage: Store.list.data.page.nowPage,
          maxPage: _countArray,
          article: Store.list.data.article
        });
      });
    }
  },
  componentDidUpdate: function componentDidUpdate() {

    this.first = false;

    CntsThumb.init();
    $('.MdCntsThumb01 a').on('click', function (e) {
      e.preventDefault();
    });
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
  thumbClick: function thumbClick(ID) {
    this.props.thumbClick(ID);
  },
  render: function render() {
    var _this2 = this;

    if (this.state.article.length === 0) {
      return false;
    } else {

      var article = this.state.article.map(function (res, i) {
        return React.createElement(
          'section',
          { key: i, className: 'MdCntsThumb01' },
          React.createElement(
            'a',
            { onClick: _this2.thumbClick.bind(_this2, res.ID), href: res.ID },
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

      // var pager = this.state.maxPage.map((index)=>{
      //   return (
      //       <Pager pagerClick={this.pagerClick} num={index} key={index} stay={this.state.nowPage} />
      //     );
      // });

      return React.createElement(
        'section',
        null,
        React.createElement(
          'h2',
          { className: 'MdHdgCmn01' },
          React.createElement(
            'span',
            null,
            'All Contents'
          )
        ),
        React.createElement(
          'div',
          { className: 'LyCntsList' },
          article
        ),
        React.createElement(Pager, { pagerClick: this.pagerClick, max: this.state.maxPage, stay: this.state.nowPage })
      );
    }
  }
});

// ReactDOM.render(
//   <ArticleList />,
//   document.getElementById('Main')
// );

module.exports = ArticleList;

},{"../pageFncs/cntsThumb.js":2,"./comp-pager.jsx":9,"./store-article":11}],6:[function(require,module,exports){
'use strict';

var Store = require('./store-article');
var Header = require('../pageFncs/header.js');

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

    if (this.props.pageType === 'index' && Store.gnav.data === null) {
      this.actionCreator([this.props.actionType, 'list', 'mainvisual']);
    } else if (this.props.pageType === 'single' && Store.gnav.data === null) {
      this.actionCreator([this.props.actionType, 'single']);
    }
  },
  componentDidUpdate: function componentDidUpdate() {
    //update後にグロナビとフッターを表示
    $('.LyHead').css({ display: 'block' });
    $('.LyFtr').css({ display: 'block' });

    if ($('.LyHead.FncStart').length === 0) {
      console.log('headerinit');
      Header.init();
    }
  },
  componentDidMount: function componentDidMount() {},
  actionCreator: function actionCreator(comps) {
    Store.dispatcher.action.create({
      actionType: this.props.actionType,
      page: 1,
      callback: this.dataloaded,
      requireComps: comps
    });
  },
  dataloaded: function dataloaded() {

    this.replaceState({
      gnav: Store.gnav.data
    });

    Store.removeSubscribe({
      actionType: this.props.actionType
    });
  },
  backTop: function backTop(e) {
    e.preventDefault();
    this.props.backTop();
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
        'div',
        { className: 'LyHead' },
        React.createElement(
          'header',
          { className: 'MdHead' },
          React.createElement(
            'p',
            { className: 'mdLogo' },
            React.createElement(
              'a',
              { href: '#', onClick: this.backTop },
              'Indoor Living'
            )
          ),
          React.createElement(
            'nav',
            { id: 'Gnav', className: 'MdGNV' },
            React.createElement(
              'ul',
              null,
              lists
            )
          ),
          React.createElement(
            'form',
            { method: 'post', action: '#', className: 'MdSearch' },
            React.createElement('input', { type: 'text' }),
            React.createElement('button', { type: 'submit', className: 'icon-icon_search' })
          )
        )
      );
    }
  }
});

module.exports = Gnav;

},{"../pageFncs/header.js":3,"./store-article":11}],7:[function(require,module,exports){
'use strict';

var Store = require('./store-article');
var Slider = require('../pageFncs/slider.js');

var Mainvisual = React.createClass({
  displayName: 'Mainvisual',

  first: true,
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

    if (Store.mainvisual.data === null) {
      this.actionCreator([this.props.actionType, 'list', 'gnav']);
    } else if (Store.mainvisual.data !== null) {
      this.actionCreator([this.props.actionType, 'list']);
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps() {

    if (!this.first) {
      if (Store.mainvisual.data === null) {
        console.log('re');
        this.actionCreator([this.props.actionType, 'list', 'gnav']);
      } else if (Store.mainvisual.data !== null) {
        this.actionCreator([this.props.actionType, 'list']);
      }
    }
  },
  actionCreator: function actionCreator(comps) {

    Store.addSubscribe({
      actionType: this.props.actionType,
      callback: this.dataloaded
    });

    Store.dispatcher.action.create({
      actionType: this.props.actionType,
      callback: this.dataloaded,
      requireComps: comps
    });
  },
  dataloaded: function dataloaded() {

    Store.removeSubscribe({
      actionType: this.props.actionType
    });

    this.replaceState({ mainvisual: Store.mainvisual.data });

    if (Store.mainvisual.data) {
      this.imgLoading(Store.mainvisual.data).then(function (e) {});
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

    this.first = false;

    if ($('.MdSlideContianer.FncStart').length === 0) {
      console.log('start');
      Slider.init();
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    console.log('unmount');
    Slider.unmount();
  },
  componentDidMount: function componentDidMount() {},
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
        { key: this.mainvisualID, className: 'MdSlideContianer' },
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

module.exports = Mainvisual;

},{"../pageFncs/slider.js":4,"./store-article":11}],8:[function(require,module,exports){
'use strict';

var Store = require('./store-article');
var ArticleList = require('./comp-articleList.jsx');
var Mainvisual = require('./comp-mainvisual.jsx');
var Gnav = require('./comp-gnav.jsx');
var Single = require('./comp-single.jsx');

var Page = React.createClass({
  displayName: 'Page',
  getDefaultProps: function getDefaultProps() {
    return {};
  },
  getInitialState: function getInitialState() {
    return {
      pageType: 'index'
    };
  },
  componentWillMount: function componentWillMount() {
    if (Store.PageControl.paramObjs.type === 'single') {

      this.articleID = Store.PageControl.paramObjs.paged;

      this.replaceState({
        pageType: 'single'
      });
    }

    this.event();
  },

  articleID: null,
  actionCreator: function actionCreator(article, comps) {},
  event: function event() {
    var _this = this;

    $(window).on('popstate', function () {

      if (Store.PageControl.paramObjs.type === 'single') {

        _this.articleID = Store.PageControl.paramObjs.paged;

        _this.replaceState({
          pageType: 'single'
        });
      } else if (Store.PageControl.paramObjs.type === 'index') {

        _this.replaceState({
          pageType: 'index'
        });
      }
    });
  },
  thumbClick: function thumbClick(ID) {

    this.articleID = ID;

    history.pushState(null, null, '/index_react.html?type=' + 'single' + '&paged=' + ID);
    Store.PageControl.getParam();

    this.replaceState({
      pageType: 'single'
    });
  },
  backTop: function backTop() {
    this.replaceState({
      pageType: 'index'
    });
    history.pushState(null, null, '/index_react.html');
    Store.PageControl.getParam();
  },
  render: function render() {
    if (this.state.pageType == 'index') {
      return React.createElement(
        'div',
        null,
        React.createElement(Gnav, { pageType: this.state.pageType, backTop: this.backTop }),
        React.createElement(Mainvisual, null),
        React.createElement(ArticleList, { thumbClick: this.thumbClick })
      );
    } else if (this.state.pageType == 'single') {
      return React.createElement(
        'div',
        null,
        React.createElement(Gnav, { pageType: this.state.pageType, backTop: this.backTop }),
        React.createElement(Single, { articleID: this.articleID })
      );
    } else {
      return false;
    }
  }
});

ReactDOM.render(React.createElement(Page, null), document.getElementById('Main'));

module.exports = ArticleList;

},{"./comp-articleList.jsx":5,"./comp-gnav.jsx":6,"./comp-mainvisual.jsx":7,"./comp-single.jsx":10,"./store-article":11}],9:[function(require,module,exports){
"use strict";

var Pager = React.createClass({
  displayName: "Pager",
  render: function render() {
    var _this = this;

    var stay = this.props.stay;

    if (stay != 0) {
      stay = stay - 1;
    }

    var pager = this.props.max.map(function (index) {
      if (index === stay) {
        return React.createElement(
          "li",
          { key: index },
          React.createElement(
            "a",
            { href: "#", "data-num": index + 1, onClick: _this.props.pagerClick, className: "stay" },
            index + 1
          )
        );
      } else {
        return React.createElement(
          "li",
          { key: index },
          React.createElement(
            "a",
            { href: "#", "data-num": index + 1, onClick: _this.props.pagerClick },
            index + 1
          )
        );
      }
    });

    return React.createElement(
      "ul",
      { className: "MdPager01" },
      pager
    );
  }
});

// ReactDOM.render(
//   <Pager />,
//   document.getElementById('Gnav')
// );

module.exports = Pager;

},{}],10:[function(require,module,exports){
'use strict';

var Store = require('./store-article');

var Single = React.createClass({
  displayName: 'Single',
  getDefaultProps: function getDefaultProps() {
    return {
      actionType: "single"
    };
  },
  getInitialState: function getInitialState() {
    return {
      data: null
    };
  },
  componentWillMount: function componentWillMount() {
    console.log(this.props.articleID);

    Store.addSubscribe({
      actionType: this.props.actionType,
      callback: this.dataloaded
    });

    if (Store.gnav.data === null) {
      this.actionCreator(this.props.articleID, [this.props.actionType, 'gnav']);
    } else {
      this.actionCreator(this.props.articleID, [this.props.actionType]);
    }
  },
  events: function events() {},
  actionCreator: function actionCreator(page, comps) {
    Store.dispatcher.action.create({
      actionType: this.props.actionType,
      page: page,
      callback: this.dataloaded,
      requireComps: comps
    });
  },
  dataloaded: function dataloaded() {

    Store.removeSubscribe({
      actionType: this.props.actionType
    });

    this.replaceState({
      data: Store.single.data
    });
  },
  componentDidUpdate: function componentDidUpdate() {},
  render: function render() {
    if (this.state.data === null) {
      return false;
    } else {

      var heading2 = this.state.data.hdg2.map(function (res, i) {
        return React.createElement(
          'li',
          { className: 'icon-icon04', key: i },
          React.createElement(
            'a',
            { href: '#' },
            res
          )
        );
      });

      return React.createElement(
        'div',
        { key: this.props.articleID },
        React.createElement(
          'div',
          { className: 'MdMvSingle01' },
          React.createElement('img', { src: this.state.data.visual })
        ),
        React.createElement(
          'section',
          { className: 'MdMainSingle01' },
          React.createElement(
            'div',
            { className: 'mdContainer' },
            React.createElement(
              'main',
              { className: 'mdMain' },
              React.createElement(
                'div',
                { className: 'MdCntsData01' },
                React.createElement(
                  'p',
                  { className: 'mdDate' },
                  this.state.data.date
                ),
                React.createElement(
                  'p',
                  { className: 'mdCat' },
                  ' ',
                  React.createElement(
                    'a',
                    null,
                    this.state.data.catName
                  )
                )
              ),
              React.createElement(
                'h1',
                { className: 'MdTtlSingle01' },
                this.state.data.title
              ),
              React.createElement('div', { className: 'mdCms', dangerouslySetInnerHTML: { __html: this.state.data.contents } })
            ),
            React.createElement(
              'aside',
              { className: 'mdAside' },
              React.createElement(
                'p',
                { className: 'MdTtlOutline' },
                'Outline'
              ),
              React.createElement(
                'ul',
                { className: 'MdListAnc01' },
                heading2
              )
            )
          )
        )
      );
    }
  }
});

module.exports = Single;

},{"./store-article":11}],11:[function(require,module,exports){
'use strict';

var Dispatcher = require('flux').Dispatcher;

var Store = {};

/*===========================

push state管理

===========================*/

Store.PageControl = {
  paramObjs: {},
  loadStatus: false,
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
});

/*===========================

loading管理

===========================*/

Store.LoadControl = {
  loading: $('#MdLoading'),
  show: function show() {
    this.loading.css({ display: 'block' });
  },
  hidden: function hidden() {
    this.loading.css({ display: 'none' });
  }
};

Store.dispatcher = new Dispatcher();

//list定義
Store.list = {
  data: null,
  subscriber: []
};

//gnav定義
Store.gnav = {
  data: null,
  subscriber: []
};

//mainvisual定義
Store.mainvisual = {
  data: null,
  subscriber: []
};

//single定義
Store.single = {
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
  xhr: null,
  loadStatus: false,
  getData: function getData(num) {
    var _this = this;

    this.loadStatus = true;

    return new Promise(function (resolve, reject) {

      var payload = _this.queue[_this.counter],
          url,
          data;

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
        case 'single':
          url = 'http://beautifulday.sakura.tv/wp/' + payload.page + '/';
          data = {};
          break;
      }

      //loadStatusをtrueにする
      //loadStatus = true;
      _this.xhr = $.ajax({
        url: url,
        //data: data,
        type: 'GET',
        crossDomain: true,
        cache: true,
        dataType: 'json'
      });

      _this.xhr.done(function (data) {

        console.log(data);

        _this.counter = _this.counter + 1;
        _this.resData[payload.actionType] = data;

        if (_this.counter === _this.compArray.length) {
          Store.dispatcher.dispatch(_this.resData);
          _this.loadStatus = false;
          Store.LoadControl.hidden();
          _this.reset();
        } else {
          resolve(_this.counter);
        }
      });
    });
  },
  create: function create(payload) {
    var _this2 = this;

    Store.LoadControl.show();

    //すでにajaxが実行中だった場合はabortして各パラメータをリセット
    if (this.loadStatus) {
      console.log('abort');
      this.xhr.abort();
      this.reset();
    }

    _.each(payload.requireComps, function (compName) {
      _this2.compArray.push(compName);
      _this2.compArray = _.uniq(_this2.compArray);
      _this2.compArray = _.sortBy(_this2.compArray);
    });

    this.queue.push(payload);

    console.log(payload.requireComps);

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
    this.xhr = null;
    this.loadStatus = false;
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
    return true;
  }
});

/*===========================

singleのdispatchToken

===========================*/

Store.single.dispatchToken = Store.dispatcher.register(function (res) {
  if (res['single']) {
    Store.single.data = res['single'];
    Store.publish();
  } else {
    Store.single.data = false;
    return true;
  }
});

module.exports = Store;

},{"flux":13}],12:[function(require,module,exports){
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
},{"_process":15}],13:[function(require,module,exports){
/**
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports.Dispatcher = require('./lib/Dispatcher');

},{"./lib/Dispatcher":14}],14:[function(require,module,exports){
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
},{"_process":15,"fbjs/lib/invariant":12}],15:[function(require,module,exports){
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
