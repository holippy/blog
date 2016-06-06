var Store = require('./store-article');
var Pager = require('./comp-pager.jsx');
var CntsThumb = require('../pageFncs/cntsThumb.js');

var CategolyList = React.createClass({
  loadFlag: true,



  getDefaultProps(){
    return {
      actionType:"category"
    }
  },
  getInitialState(){
    return {
      nowPage: 0,
      maxPage: [],
      name: Store.PageControl.paramObjs.name,
      article: [],
      catSlug: '',
      catName: ''
    }
  },
  componentWillMount(){
    console.log('CATcomponentWillMount');

    this.loadAction();
  },
  loadAction(){
    console.log('CATloadAction');
    console.log(Store.PageControl.paramObjs.name);

    this.loadFlag = false;

    if( Store.gnav.data === null ){
      console.log('CAT first load');
      this.actionCreator( Store.PageControl.paramObjs.paged, Store.PageControl.paramObjs.name, [ this.props.actionType, 'gnav'] );
    }else{
      console.log('CAT secound');
      this.actionCreator( Store.PageControl.paramObjs.paged, Store.PageControl.paramObjs.name, [ this.props.actionType ] );
    }

  },
  componentWillReceiveProps(){
    console.log('CATcomponentWillReceiveProps');
    this.loadAction();
  },
  actionCreator( page, name, comps ){
    console.log('CATactionCreator');

    Store.addSubscribe({
      actionType: this.props.actionType,
      callback: this.dataloaded
    });

    Store.dispatcher.action.create({
      actionType: this.props.actionType,
      page: page,
      name: name,
      callback: this.dataloaded,
      requireComps: comps
    });
  },
  dataloaded(){
    console.log('CATdataloaded');

    console.log(Store.category.data);

    this.loadFlag = true;

    var _countArray = [];

    Store.removeSubscribe({
      actionType: this.props.actionType
    });

    
    for (var i = 0; i < Store.category.data.page.maxPage; i++) {
      _countArray.push(i);
    }

    this.imgLoading( Store.category.data.article ).then((e)=>{
      if( this.isMounted() ){
        this.replaceState({
          nowPage: Store.category.data.page.nowPage,
          maxPage: _countArray,
          article: Store.category.data.article,
          catSlug: Store.category.data.slug,
          catName: Store.category.data.name
        });
      }
    });

  },

  shouldComponentUpdate(){
    console.log('shouldComponentUpdate');

    if( this.loadFlag ){
      return true;
    }else{
      return false;
    }

  },

  componentDidUpdate(){
    console.log('LIcomponentDidUpdate');

    if( !this.loadFlag ){
      return false;
    }

    //GAにpageviewを送信
    ga('send', {
      hitType: 'pageview',
      page: location.href.split('?')[1],
      title: this.state.catName + 'カテゴリ一覧'
    });

    //アップデート完了後にローディングを非表示
    Store.LoadControl.hidden();

    this.loadFlag = false;

    console.log($('.MdHdgCmn01').text());

    this.changeMeta();

    this.first = false;

    CntsThumb.init(Store.Layout);

    $('.MdCntsThumb01 a').on('click', (e)=>{
      e.preventDefault();
    });
  },
  changeMeta(){
    $('meta[name=description]').attr("content", this.state.catName + 'カテゴリの記事一覧です');
    $("title").text(this.state.catName + ' | Indoor Linving');
  },
  pagerClick( e ){

    e.preventDefault();

    var _num = e.target.dataset.num;

    if( _num === '1'){
      _num = 0;
    }

    if( this.state.nowPage === _num ) {
      return false;
    }else{
      this.actionCreator( _num, Store.PageControl.paramObjs.name, [ this.props.actionType ]);
      history.pushState(null,null,'/?type=' + Store.PageControl.paramObjs.type + '&paged=' + e.target.dataset.num + '&name=' + Store.PageControl.paramObjs.name);
      Store.PageControl.getParam();
    }

  },

  imgLoading( data ){
    var counter = 0;

    return new Promise( (resolve, reject )=> {

      data.map((res, index)=>{
        let img = new Image();

        $(img).on('load', ()=>{
          counter = counter + 1;
          if( counter == data.length ){
            resolve( counter );
          }
        });

        $(img).attr('src', res.thumb);

      });
    });
  },

  thumbClick( ID ){
    this.props.thumbClick(ID);
  },
  render(){

    console.log('LIrender');

    if( !this.loadFlag ){
      return false;
    }else{
      
      var article = this.state.article.map((res, i)=>{
        return (
            <section key={i} className="MdCntsThumb01"><a onClick={this.thumbClick.bind(this, res.ID)} href={'?type=single&paged=' + res.ID}>
                <p className="mdCntsThumb01Img"><img src={res.thumb} /></p>
                <div className="mdCntsThumb01InfoClm">
                  <div className="mdCntsThumb01Clm01">
                    <p className="mdCntsThumb01Cat">{res.category}</p>
                  </div>
                  <div className="mdCntsThumb01Clm02">
                    <p className="mdCntsThumb01Date">{res.date}</p>
                  </div>
                </div>
                <div className="mdCntsThumb01InfoInBox">
                  <h2 className="mdCntsThumb01Ttl">{res.title}</h2>
                  <p className="mdCntsThumb01Txt">{res.content}</p>
                </div>
                <p className="mdCntsThumb01Icn"><span className="icon-icon04"></span></p>
                <div className="mdCntsThumb01Cover">
                  <p className="mdCntsThumb01Txt">Read More</p>
                </div></a>
            </section>
          );
      });

      return (
        <section>
        <div className="MdCatImg01">
          <p className={"mdImg Ex" + this.state.catName}>{this.state.catName}</p>
        </div>
        <h1 className="MdHdgCmn01"><span>{this.state.catName}</span></h1>
        <div className="LyCntsList">
        {article}
        </div>
        <Pager pagerClick={this.pagerClick} max={this.state.maxPage} stay={this.state.nowPage} />
        </section>
      );
    }
  }
});

module.exports = CategolyList;