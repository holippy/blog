
var BgAnime = function(data){
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

BgAnime.prototype = {

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

module.exports = BgAnime;