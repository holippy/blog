(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.BgAnime = (function() {
  function BgAnime(data) {

    /*
    		svgData 読み込むsvgデータのパスを配列で取得
    		svgDataLength svnDataのlengthをキャッシュ
    		loadCounter svgデータ読み込み用カウンター初期値は0
     */
    this.svgData = data;
    this.svgDataLength = data.length;
    this.loadCounter = 0;
  }


  /*
  	svgデータを先読み
  	先読みが済んだらsetItemsへ
   */

  BgAnime.prototype.svgLoad = function() {
    var i, j, len, ref, results, that, val;
    that = this;
    ref = this.svgData;
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      val = ref[i];
      results.push((function() {
        var item;
        item = new Image;
        item.src = val;
        return $(item).on('load', (function(_this) {
          return function() {
            that.loadCounter = that.loadCounter + 1;
            console.log(that.loadCounter);
            if (that.loadCounter === that.svgDataLength) {
              return that.setItems();
            }
          };
        })(this));
      })());
    }
    return results;
  };


  /*
   */

  BgAnime.prototype.setItems = function() {
    var i, j, len, ref, results, that, val;
    that = this;
    ref = this.svgData;
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      val = ref[i];
      results.push($('body').append("<figure class=\"svg" + (i + 1) + "\"><img src=\"" + val + "\"></figure>"));
    }
    return results;
  };

  return BgAnime;

})();


},{}],2:[function(require,module,exports){
var bgAnime;

require('./_bg.coffee');

bgAnime = new window.BgAnime(['/assets/svg/layer1.svg', '/assets/svg/layer2.svg', '/assets/svg/layer3.svg', '/assets/svg/layer4.svg', '/assets/svg/layer5.svg', '/assets/svg/layer6.svg', '/assets/svg/layer7.svg']);


},{"./_bg.coffee":1}]},{},[2,1]);
