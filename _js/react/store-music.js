const Dispatcher = require('flux').Dispatcher;

const StoreMusic = {};
const API = '';



StoreMusic.dispatcher = new Dispatcher();

//musics定義
StoreMusic.musics = {
  dataID: null,
  dataDetail: [],
  subscriber: []
};


//subscriber用配列定義
StoreMusic.dispatcher.subscriber = [];

StoreMusic.dispatcher.action = {
  counter: 0,
  payload: null,
  loadStatus: false,
  resData: {},
  requestArray: null,
  getData( num ){

    this.loadStatus = true;

    var d = new $.Deferred,
        url,
        data;

    console.log(this.payload);

    switch ( this.payload.actionType ){
      case 'ID':
        url = 'http://indoor-living.sakuraweb.com/wp/music/';
        break;
      case 'list':
        url = domain + 'page/' + payload.page + '/';
        data = { paged: payload.page };
        break;
    }

    //loadStatusをtrueにする
    //loadStatus = true;
    this.xhr = $.ajax({
        url: url,
        //data: data,
        type: 'GET',
        crossDomain: true,
        cache: true,
        dataType: 'json'
    });

    this.xhr.done( ( data )=>{

      this.counter = this.counter + 1;
      this.resData[this.payload.actionType] = data;

      if( this.counter === this.requestArray.length ){

        StoreMusic.dispatcher.dispatch(this.resData);
        this.loadStatus = false;

        //console.log('load end');
        
        this.reset();
      }else{
        d.resolve(this.counter);
      }
    });

    return d.promise();
  },
  create(payload){

    this.payload = payload;

    //すでにajaxが実行中だった場合はabortして各パラメータをリセット
    if( this.loadStatus ){
      console.log('abort');
      this.xhr.abort();
      this.reset();
    }

    this.requestArray = this.payload.requestItem;

    var doPromise = this.getData();
    for (var i = 0; i < this.requestArray.length - 1; i++) {
      
      doPromise = doPromise.then( (data)=>{
        return this.getData();
      } );
    }

  },
  reset(){
    this.counter = 0;
    this.counter = 0;
    this.payload = null;
    this.resData = {};
    this.loadStatus = false;
    this.requestArray = null;
  }
}


/*===========================

subscriberにコールバックを追加

===========================*/

StoreMusic.addSubscribe = ( options )=>{
  StoreMusic.dispatcher.subscriber.push({
    actionType: options.actionType,
    callback: options.callback
  });
}

/*===========================

subscriberを実行

===========================*/

StoreMusic.publish = ()=>{
  _.each(StoreMusic.dispatcher.subscriber, ( obj, key )=>{
    obj.callback();
  });
}

/*===========================

subscriberから削除

===========================*/

StoreMusic.removeSubscribe = ( options )=>{
  StoreMusic.dispatcher.subscriber = _.reject( StoreMusic.dispatcher.subscriber, ( obj, index )=>{
    return obj.actionType == options.actionType;
  });
}


/*===========================

musicsのdispatchToken

===========================*/

StoreMusic.musics.dispatchToken = StoreMusic.dispatcher.register(function( res ) {
  console.log(res); 
  if( res['ID'] ){
    StoreMusic.musics.dataID = res['ID'];
    StoreMusic.publish();
  }else{
    StoreMusic.musics.data = null;
  }
});



module.exports = StoreMusic;