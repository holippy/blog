/*
?paged=n 一覧分割ページ
?p=n 個別ページ
?m=yyyynn 月別一覧ページ
?paged=2&m=201512 月別一覧分割ページ
?cat=n カテゴリ一覧ページ
?paged=2&cat=3 カテゴリ一覧分割ページ
*/

var mixins = {

  wpParams : ['p', 'paged', 'm', 'cat', 'paged'],

  checkParams: function( param ){

    /*
    パラメータがwordpress用のものかどうかチェックする
    */

    var self = this,
        wpParamsLength = this.wpParams.length,
        wpParam = false;

    for( var i = 0; i < wpParamsLength; i++ ) {
      if( param === self.wpParams[i] ){
        wpParam = true;
      }
    }

    return wpParam;

  },
  getLocation: function(){

    /*
    パラメータをオブジェクトに格納
    */

    var self = this,
        locations = window.location.search,
        params = {};

    if( locations === ''){
      return 'is-home'
    }else{
      locations = locations.substring(1).split('&');
    }

    /*
    パラメータがwordpress用のものかチェックしてからオブジェクトに格納
    */

    for(var i = 0; i < locations.length; i++) {

        var kv = locations[i].split('=');

        if( self.checkParams( kv[0] ) ){
          params[kv[0]] = kv[1];
        }
    }

    return params;
  },
  setLocation: function(){

  },
  checkLocation: function(){


  }
}

module.exports = mixins;