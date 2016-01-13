(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

window.BgAnime = function(data){
  /*
  svgData 読み込むsvgデータのパスを配列で取得
  svgDataLength svnDataのlengthをキャッシュ
  loadCounter svgデータ読み込み用カウンター初期値は0
  */

  this.svgData = data;
  this.svgDataLength = data.length;
  this.loadCounter = 0;
  this.bgLayers = $('#bgLayers');
}

window.BgAnime.prototype = {

  /*
  svgデータを先読み
  先読みが済んだらsetItemsへ
  */

  svgLoad : function(){

    var that = this;

    for ( var i = 0; i < that.svgDataLength; i++ ) {
      (function(){
        var item = new Image;
        item.src = that.svgData[i];

        $(item).on('load', function(){
          that.loadCounter = that.loadCounter + 1;

          if( that.loadCounter === that.svgDataLength ){
            setTimeout(function(){
              that.setItems();
            }, 1000);
          }
        })
      })()
    };
  },

  /*
  loadingを非表示にしてからsvgをdomに追加
  */

  setItems : function(){

    var that = this;

    $('#loading').remove();

    for ( var i = 0; i < that.svgDataLength; i++ ) {

      if( i !== 6 ){
        that.bgLayers.append('<figure class="svg'+( i + 1 )+'"><img src="'+ that.svgData[i] +'"></figure>');
      }else{
        that.bgLayers.append('<figure class="svg'+( i + 1 )+'"></figure>');
      }
      

    };
  }
}
},{}],2:[function(require,module,exports){
var bg = require('./_bg.js');

var bgAnime = new window.BgAnime([
  '/assets/svg/layer1.svg',
  '/assets/svg/layer2.svg',
  '/assets/svg/layer3.svg',
  '/assets/svg/layer4.svg',
  '/assets/svg/layer5.svg',
  '/assets/svg/layer6.svg',
  '/assets/svg/layer7.svg'
  ]);

bgAnime.svgLoad();
},{"./_bg.js":1}]},{},[2]);
