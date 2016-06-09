const Dispatcher = require('flux').Dispatcher;

const StoreMusic = {};
const API = 'http://indoor-living.sakuraweb.com/wp/music/';



StoreMusic.dispatcher = new Dispatcher();

//musics定義
StoreMusic.musics = {
  data: null,
  subscriber: []
};


//subscriber用配列定義
StoreMusic.dispatcher.subscriber = [];

StoreMusic.dispatcher.action = {
  counter: 0,
  queue: [],
  compArray: [],
  resData: {},
  xhr: null,
  loadStatus: false,
  getData( num ){

    this.loadStatus = true;

    var d = new $.Deferred,
        url,
        data;

    //loadStatusをtrueにする
    //loadStatus = true;
    this.xhr = $.ajax({
        url: API,
        //data: data,
        type: 'GET',
        crossDomain: true,
        cache: true,
        dataType: 'json'
    });

    this.xhr.done( ( data )=>{

          console.log(data);

      this.counter = this.counter + 1;

      if( this.counter === this.compArray.length ){

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

    //すでにajaxが実行中だった場合はabortして各パラメータをリセット
    if( this.loadStatus ){
      console.log('abort');
      this.xhr.abort();
      this.reset();
    }

    this.requestArray = payload.requireItem;



    var doPromise = this.getData();
    for (var i = 0; i < this.requestArray.length - 1; i++) {
      doPromise = doPromise.then( (data)=>{
        return this.getData();
      } );
    }

  },
  reset(){
    this.counter =  0;
    this.queue = [];
    this.compArray = [];
    this.resData = {};
    this.xhr = null;
    this.loadStatus = false;
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
  if( res['musics'] ){

    StoreMusic.dispatcher.waitFor([StoreMusic.mainvisual.dispatchToken]);
    StoreMusic.musics.data = res['musics'];
    StoreMusic.publish();
  }else{
    StoreMusic.musics.data = null;
  }
});



module.exports = StoreMusic;