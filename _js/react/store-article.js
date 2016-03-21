var Dispatcher = require('flux').Dispatcher;

var Store = {};

Store.PageControl = {
  paramObjs: {},
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
  getData( num ){


    return new Promise( (resolve, reject )=> {



      var payload = this.queue[ this.counter ],
          url,
          data,
          xhr;

      switch ( payload.actionType ){
        case 'gnav':
          url = 'http://beautifulday.sakura.tv/wp/catlist/';
          data = {};
          break;
        case 'list':
          url = 'http://beautifulday.sakura.tv/wp/page/' + payload.page + '/';
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

      xhr = $.ajax({
          url: url,
          //data: data,
          type: 'GET',
          crossDomain: true,
          cache: false,
          dataType: 'json'
      });

      xhr.done( ( data )=>{

        this.counter = this.counter + 1;
        this.resData[payload.actionType] = data;

        if( this.counter === this.compArray.length ){
          Store.dispatcher.dispatch(this.resData);
          this.reset();
        }else{
          resolve( this.counter );
        }
      });
    });
  },
  create(payload){
    _.each(payload.requireComps, ( compName )=>{
      this.compArray.push(compName);
      this.compArray = _.uniq(this.compArray);
      this.compArray = _.sortBy(this.compArray);
    });

    this.queue.push( payload );

    

    if( this.queue.length === this.compArray.length ){



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