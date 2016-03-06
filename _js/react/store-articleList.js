var Dispatcher = require('flux').Dispatcher;

var ModArticle = {};

ModArticle.dispatcher = new Dispatcher();
ModArticle.storeData = {
  data: null,
  subscriber: []
};
ModArticle.storePager = {data: null};

ModArticle.dispatcher.action = {
  dispatch: function(payload, data){
    ModArticle.dispatcher.dispatch({
      actionType: payload.actionType,
      page: payload.page,
      data: data,
      callback: payload.callback
    });
  },
  create: function(payload){
    var that = this;
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

      xhr.done(function(data ){
        that.dispatch(payload, data);
      });
    }else if( payload.actionType === 'navi' ){
      var xhr = $.ajax({
          url: 'http://beautifulday.sakura.tv/wp/?page_id=37',
          type: 'GET',
          crossDomain: true,
          cache: false,
          dataType: 'json',
        statusCode: {
        }
      });

      xhr.done(function(data ){
        that.dispatch(payload, data);
      });
    }
  }
}

// ModArticle.dispatcher.register(function(payload) {
//   console.log(payload);
// });

ModArticle.storeData.addSubscribe = function( callback ){
  ModArticle.storeData.subscriber.push( callback.callback );
}

ModArticle.storeData.publish = function( ){
  for (var i = 0; i < ModArticle.storeData.subscriber.length; i++) {
    ModArticle.storeData.subscriber[i]();
  };
}


ModArticle.storeData.dispatchToken = ModArticle.dispatcher.register(function(payload) {
  //ModArticle.dispatcher.waitFor([ModArticle.storePager.dispatchToken]);
  console.log('article'+':'+payload.data );
  //ModArticle.storeData.update();
});

ModArticle.storePager.dispatchToken = ModArticle.dispatcher.register(function(payload) {
  ModArticle.dispatcher.waitFor([ModArticle.storeData.dispatchToken]);
  console.log('pager'+':'+payload.data );
});

module.exports = ModArticle;