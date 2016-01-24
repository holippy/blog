(function() {
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

}).call(this);
