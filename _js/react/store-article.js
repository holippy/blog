var Dispatcher = require('flux').Dispatcher;

var Store = {};

Store.dispatcher = new Dispatcher();

//sortData定義
Store.article = {
  data: null,
  subscriber: []
};

//sortData定義
Store.navi = {
  data: null,
  subscriber: []
};

//subscriber用配列定義
Store.dispatcher.subscriber = [];


Store.dispatcher.action = {
  create(payload){

    if( payload.actionType === 'latest' ){
      var xhr = $.ajax({
          url: 'http://beautifulday.sakura.tv/wp/',
          type: 'GET',
          crossDomain: true,
          cache: false,
          dataType: 'json',
        statusCode: {
        }
      });

      xhr.done( ( data )=>{
        Store.dispatcher.dispatch( {
          payload: payload,
          data: data
        });
      });
    }else if( payload.actionType === 'gnav' ){
      var xhr = $.ajax({
          url: 'http://beautifulday.sakura.tv/wp/catlist/',
          type: 'GET',
          crossDomain: true,
          cache: false,
          dataType: 'json',
        statusCode: {
        }
      });

      xhr.done( ( data )=>{
        Store.dispatcher.dispatch( {
          payload: payload,
          data: data
        });
      });
    }
  }
}

Store.addSubscribe = function( callback ){
  Store.article.subscriber.push( callback.callback );
}

Store.publish = function( ){
  for (var i = 0; i < Store.article.subscriber.length; i++) {
    Store.article.subscriber[i]();
  };
}


Store.article.dispatchToken = Store.dispatcher.register(function( res ) {

  if( res.payload.actionType === 'latest' ){

    Store.article.data = res.data;

    console.log( res.payload.actionType );

  }
});

Store.navi.dispatchToken = Store.dispatcher.register(function( res ) {

  if( res.payload.actionType === 'gnav' ){

    
    Store.dispatcher.waitFor([Store.article.dispatchToken]);
    Store.navi.data = res.data;

    console.log( res.payload.actionType );
    Store.publish();

  }
});



module.exports = Store;