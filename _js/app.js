/*===========================

background

===========================*/

var bg = require('./_bg.js');

var bgAnime = new bg([
  '/assets/svg/layer1.svg',
  '/assets/svg/layer2.svg',
  '/assets/svg/layer3.svg',
  '/assets/svg/layer4.svg',
  '/assets/svg/layer5.svg',
  '/assets/svg/layer6.svg',
  '/assets/svg/layer7.svg'
  ]);

//bgAnime.svgLoad();

/*===========================

app

===========================*/

var app = app || {};


/*===========================

react

===========================*/

var storeArticle = require('./react/store-article.js');

var compArticleList = require('./react/comp-articleList.jsx');
var compGnav = require('./react/comp-gnav.jsx');


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