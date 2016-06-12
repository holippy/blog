const Dispatcher = require('flux').Dispatcher;

const Store = {};
const domain = 'http://indoor-living.sakuraweb.com/wp/';

//PC or SP判定

if( $('body').hasClass('LySP') ){
  Store.Layout = 'SP';
}else{
  Store.Layout = 'PC';
}

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

/*===========================

loading管理

===========================*/

Store.LoadControl = {
  loading: $('#MdLoading'),
  show(){

    $(window).scrollTop(0);

    this.loading.css({display: 'block'});

    TweenMax.to($('.LyHead'), 1, 
      {
        opacity: 0, 
        ease: Power3.easeOut,
      }
    );

    // $('.LyFtr').css({
    //   position: 'fixed',
    //   bottom: 0
    // });
    
    TweenMax.to($('.LyFtr'), 1, 
      {
        opacity: 0, 
        ease: Power3.easeOut,
      }
    );
  },
  hidden(){
    this.loading.css({display: 'none'});

    TweenMax.to($('.LyHead'), 1, 
      {
        opacity: 1, 
        ease: Power3.easeOut,
      }
    );

    // $('.LyFtr').css({
    //   position: 'relative',
    //   bottom: 0
    // });

    TweenMax.to($('.LyFtr'), 1, 
      {
        opacity: 1, 
        ease: Power3.easeOut,
      }
    );
  }
}

Store.dispatcher = new Dispatcher();

//list定義
Store.list = {
  data: null,
  subscriber: []
};

//gnav定義
Store.gnav = {
  data: null,
  subscriber: []
};

//mainvisual定義
Store.mainvisual = {
  data: null,
  subscriber: []
};

//single定義
Store.single = {
  data: null,
  subscriber: []
};

//category定義
Store.category = {
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

    var d = new $.Deferred,
        payload = this.queue[ this.counter ],
        url,
        data;

    switch ( payload.actionType ){
      case 'gnav':
        url = domain + 'catlist/';
        data = {};
        break;
      case 'list':
        url = domain + 'page/' + payload.page + '/';
        data = { paged: payload.page };
        break;
      case 'pager':
        url = domain + 'dummy/';
        data = {};
        break;
      case 'mainvisual':
        url = domain + 'mainvisual/';
        data = {};
        break;
      case 'single':
        url = domain + '' + payload.page + '/';
        data = {};
        break;
      case 'category':
        url = domain + 'category/' + payload.name + '/page/' + payload.page  + '/';
        data = {};
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
      this.resData[payload.actionType] = data;

      if( this.counter === this.compArray.length ){

        Store.dispatcher.dispatch(this.resData);
        this.loadStatus = false;

        //console.log('load end');
        
        this.reset();
      }else{
        console.log(d);
        d.resolve(this.counter);
      }
    });

    return d.promise();
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
  }else{
    Store.single.data = null;
  }
});

/*===========================

gnavのdispatchToken

===========================*/

Store.gnav.dispatchToken = Store.dispatcher.register(function( res ) {

  if( res['gnav'] ){
    console.log(res);
    Store.gnav.data = res['gnav'];
    
  }else{
    Store.single.data = null;
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
    Store.single.data = null;
    return true;
  }
});

/*===========================

singleのdispatchToken

===========================*/

Store.single.dispatchToken = Store.dispatcher.register(function( res ) {
  if( res['single'] ){
    Store.single.data = res['single'];
    Store.publish();
  }else{
    Store.single.data = null;
    return true;
  }
});

/*===========================

categoryのdispatchToken

===========================*/

Store.category.dispatchToken = Store.dispatcher.register(function( res ) {
  if( res['category'] ){
    Store.category.data = res['category'];
    Store.publish();
  }else{
    Store.category.data = null;
    return true;
  }
});

module.exports = Store;