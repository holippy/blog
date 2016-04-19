var Dispatcher = require('flux').Dispatcher;

var Store = {};


/*===========================

push state管理

===========================*/

Store.PageControl = {
  paramObjs: {},
  loadStatus: false,
  getParam(){
    var _url = location.href.split('?'),
        _params;

    if( _url[1] ){
      _params = _url[1].split('&');

      for (let i = 0; i < _params.length; i++) {
        let split = _params[i].split('='),
            key = split[0],
            value = split[1];

        if( key === 'paged' && value === '1' ){
          value = '0';
        }

        this.paramObjs[key] = value;

      }
    }else{
      this.paramObjs = { 'type': 'index', 'paged': '0' };
    }
  }
}

Store.PageControl.getParam();
$(window).on('popstate', ()=>{
  
  Store.PageControl.getParam();
  console.log(Store.PageControl.paramObjs);
});

/*===========================

loading管理

===========================*/

Store.LoadControl = {
  loading: $('#MdLoading'),
  show(){
    this.loading.css({display: 'block'});
  },
  hidden(){
    this.loading.css({display: 'none'});
  }
}

Store.dispatcher = new Dispatcher();

//sortData定義
Store.list = {
  data: null,
  subscriber: []
};

//sortData定義
Store.gnav = {
  data: null,
  subscriber: []
};

//sortData定義
Store.mainvisual = {
  data: null,
  subscriber: []
};

//subscriber用配列定義
Store.dispatcher.subscriber = [];

Store.dispatcher.action = {
  counter: 0,
  queue: [],
  compArray: [],
  resData: {},
  xhr: null,
  loadStatus: false,
  getData( num ){

    this.loadStatus = true;

    return new Promise( (resolve, reject )=> {

      var payload = this.queue[ this.counter ],
          url,
          data;

      switch ( payload.actionType ){
        case 'gnav':
          url = 'http://beautifulday.sakura.tv/wp/catlist/';
          data = {};
          break;
        case 'list':
          url = 'http://beautifulday.sakura.tv/wp/page/' + payload.page + '/';
          console.log(payload.page);
          data = { paged: payload.page };
          break;
        case 'pager':
          url = 'http://beautifulday.sakura.tv/wp/dummy/';
          data = {};
          break;
        case 'mainvisual':
          url = 'http://beautifulday.sakura.tv/wp/mainvisual/';
          data = {};
          break;
      }


      //loadStatusをtrueにする
      //loadStatus = true;

      console.log(this.xhr);

      this.xhr = $.ajax({
          url: url,
          //data: data,
          type: 'GET',
          crossDomain: true,
          cache: false,
          dataType: 'json'
      });

      this.xhr.done( ( data )=>{

        this.counter = this.counter + 1;
        this.resData[payload.actionType] = data;

        if( this.counter === this.compArray.length ){
          Store.dispatcher.dispatch(this.resData);
          this.loadStatus = false;
          Store.LoadControl.hidden();
          this.reset();
        }else{
          resolve( this.counter );
        }
      });
    });
  },
  create(payload){

    Store.LoadControl.show();

    //すでにajaxが実行中だった場合はabortして各パラメータをリセット
    if( this.loadStatus ){
      console.log('abort');
      this.xhr.abort();
      this.reset();
    }

    _.each(payload.requireComps, ( compName )=>{
      this.compArray.push(compName);
      this.compArray = _.uniq(this.compArray);
      this.compArray = _.sortBy(this.compArray);
    });

    this.queue.push( payload );

    if( this.queue.length === this.compArray.length ){
      console.log('getDAta');
      var doPromise = this.getData();
      for (var i = 0; i < this.queue.length - 1; i++) {
        doPromise = doPromise.then( (data)=>{
          return this.getData();
        } );
      }
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

Store.addSubscribe = ( options )=>{
  Store.dispatcher.subscriber.push({
    actionType: options.actionType,
    callback: options.callback
  });
}

/*===========================

subscriberを実行

===========================*/

Store.publish = ()=>{
  _.each(Store.dispatcher.subscriber, ( obj, key )=>{
    obj.callback();
  });
}

/*===========================

subscriberから削除

===========================*/

Store.removeSubscribe = ( options )=>{
  Store.dispatcher.subscriber = _.reject( Store.dispatcher.subscriber, ( obj, index )=>{
    return obj.actionType == options.actionType;
  });
}


/*===========================

listのdispatchToken

===========================*/

Store.list.dispatchToken = Store.dispatcher.register(function( res ) {
  if( res['list'] ){
    Store.dispatcher.waitFor([Store.mainvisual.dispatchToken]);
    Store.list.data = res['list'];
    Store.publish();
  }
});

/*===========================

gnavのdispatchToken

===========================*/

Store.gnav.dispatchToken = Store.dispatcher.register(function( res ) {
  if( res['gnav'] ){
    Store.gnav.data = res['gnav'];
  }else{
    Store.gnav.data = false;
    return true;
  }
});

/*===========================

mainvisualのdispatchToken

===========================*/

Store.mainvisual.dispatchToken = Store.dispatcher.register(function( res ) {
  
  if( res['mainvisual'] ){
    Store.dispatcher.waitFor([Store.gnav.dispatchToken]);
    Store.mainvisual.data = res['mainvisual'];
  }else{
    Store.mainvisual.data = false;
    return true;
  }
});


module.exports = Store;