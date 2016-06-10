const Dispatcher = require('flux').Dispatcher;

const StoreMusic = {};
const API = '';



StoreMusic.dispatcher = new Dispatcher();

//musics定義
StoreMusic.musics = {
  actionType: null,
  dataID: [],
  dataMovie: [],
  subscriber: []
};


//subscriber用配列定義
StoreMusic.dispatcher.subscriber = [];

StoreMusic.dispatcher.action = {
  counter: 0,
  payload: null,
  loadStatus: false,
  resData: [],
  requestArray: null,
  getData( num ){

    this.loadStatus = true;

    var d = new $.Deferred,
        url,
        data;

    switch ( this.payload.actionType ){
      case 'ID':
        url = 'http://indoor-living.sakuraweb.com/wp/music/';
        break;
      case 'Movie':
        url = 'https://www.googleapis.com/youtube/v3/videos';
        data = {
          id: this.requestArray[this.counter],
          key: 'AIzaSyBYXH8zTsm40Kz9JvpOvFyZLNXGV0Ju31A',
          fields: 'items(id,snippet(channelTitle,title,thumbnails),statistics)',
          part: 'snippet,contentDetails,statistics'
        };
        break;
    }

    //loadStatusをtrueにする
    //loadStatus = true;
    this.xhr = $.ajax({
        url: url,
        data: data,
        type: 'GET',
        crossDomain: true,
        cache: true,
        dataType: 'json'
    });

    this.xhr.done( ( data )=>{




      this.counter = this.counter + 1;

      if( this.requestArray.length === 1 ){
        this.resData = {}
        this.resData[this.payload.actionType] = data;
      }else{
        this.resData.push(data);
      }
      

      

      if( this.counter === this.requestArray.length ){

        this.loadStatus = false;

        StoreMusic.dispatcher.dispatch({
          actionType: this.payload.actionType,
          resData: this.resData
        });
        

        //console.log('load end');
        
        this.reset();
      }else{
        d.resolve(this.counter);
      }
    });

    return d.promise();
  },
  create(payload){

    console.log(payload);

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
    this.resData = [];
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

StoreMusic.musics.dispatchToken = StoreMusic.dispatcher.register(function( options ) {

  console.log(options);
  
  StoreMusic.musics.actionType = options.actionType;

  if( options.actionType == 'ID' ){
    StoreMusic.musics.dataID = options.resData['ID'];
    StoreMusic.publish();
  }else if( options.actionType == 'Movie' ){
    StoreMusic.musics.dataMovie.push();
    _.each(options.resData,(elm, i)=>{
      StoreMusic.musics.dataMovie.push(elm);
    });
    
    console.log(StoreMusic.musics.dataMovie);

    StoreMusic.publish();
  }
  else{
    StoreMusic.musics.data = null;
  }
});



module.exports = StoreMusic;