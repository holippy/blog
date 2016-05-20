var Store = require('./store-article');
var Pager = require('./comp-pager.jsx');
var CntsThumb = require('../pageFncs/cntsThumb.js');

var ArticleList = React.createClass({
  loadFlag: true,


  getDefaultProps(){
    return {
      actionType:"list"
    }
  },
  getInitialState(){
    return {
      nowPage: 0,
      maxPage: [],
      article: []
    }
  },
  componentWillMount(){
    //console.log('LIcomponentWillMount');
    this.loadAction();
  },
  loadAction(){
    //console.log('LIloadAction');

    this.loadFlag = false;

    console.log(Store.PageControl.paramObjs.paged);
    if( Store.mainvisual.data === null && Store.gnav.data === null ){
      console.log('list first load');
      this.actionCreator( Store.PageControl.paramObjs.paged, [ this.props.actionType, 'mainvisual', 'gnav'] );
    }else if( Store.mainvisual.data === null && Store.gnav.data !== null ){
      console.log('list un load');
      this.actionCreator( Store.PageControl.paramObjs.paged, [ this.props.actionType, 'mainvisual'] );
    }else{
      console.log('list secound');
      this.actionCreator( Store.PageControl.paramObjs.paged, ['list'] );
    }

  },
  componentWillReceiveProps(){
    //console.log('LIcomponentWillReceiveProps');
  },
  actionCreator( page, comps ){
    //onsole.log('LIactionCreator');

    Store.addSubscribe({
      actionType: this.props.actionType,
      callback: this.dataloaded
    });

    Store.dispatcher.action.create({
      actionType: this.props.actionType,
      page: page,
      callback: this.dataloaded,
      requireComps: comps
    });
  },
  dataloaded(){
    console.log('LIdataloaded');

    console.log(Store.list.data);

    this.loadFlag = true;

    var _countArray = [];

    Store.removeSubscribe({
      actionType: this.props.actionType
    });

    for (var i = 0; i < Store.list.data.page.maxPage; i++) {
      _countArray.push(i);
    }

    this.imgLoading( Store.list.data.article ).then((e)=>{
      if( this.isMounted() ){
        this.replaceState({
          nowPage: Store.list.data.page.nowPage,
          maxPage: _countArray,
          article: Store.list.data.article
        });
      }
    });

  },
  componentDidMount(){
    console.log('article mounted');
    
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
    //console.log('LIcomponentDidUpdate');

    if( !this.loadFlag ){
      return false;
    }

    //アップデート完了後にローディングを非表示
    Store.LoadControl.hidden();

    this.loadFlag = false;

    CntsThumb.init();
    $('.MdCntsThumb01 a').on('click', (e)=>{
      e.preventDefault();
    });

    $('.MdPager01 li').each(( i, elm)=>{
      $(elm).hover(
        ()=>{
          if( !$(elm).hasClass('ExStay') ){
            $(elm).addClass('ExHover01');
            $(elm).removeClass('ExHover02');
          }
        },
        ()=>{
          if( !$(elm).hasClass('ExStay') ){
            $(elm).addClass('ExHover02');
            $(elm).removeClass('ExHover01');
          }
        }
      );
    });

    if( Store.PageControl.paramObjs.pager ){
      $(window).scrollTop( $('#FncListTtl').position().top - 200 );
    }
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
      history.pushState(null,null,'/?type=' + Store.PageControl.paramObjs.type + '&paged=' + e.target.dataset.num + '&pager=true');
      Store.PageControl.getParam();
      this.actionCreator( _num, [ this.props.actionType ]);
    }

  },

  imgLoading( data ){
    var counter = 0,
        d = new $.Deferred;

    data.map((res, index)=>{
      let img = new Image();

      $(img).on('load', ()=>{
        counter = counter + 1;
        if( counter == data.length ){
          d.resolve(counter);
        }
      });

      $(img).attr('src', res.thumb);

    });

    return d.promise();

  },

  thumbClick( ID ){
    this.props.thumbClick(ID);
  },
  render(){

    //console.log('LIrender');

    if( !this.loadFlag ){
      return false;
    }else{
      
      var article = this.state.article.map((res, i)=>{
        return (
            <section key={i} className="MdCntsThumb01"><a onClick={this.thumbClick.bind(this, res.ID)} href={'?type=single&paged='+res.ID}>
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
        <h2 id="FncListTtl" className="MdHdgCmn01"><span>All Contents</span></h2>
        <div className="LyCntsList">
        {article}
        </div>
        <Pager pagerClick={this.pagerClick} max={this.state.maxPage} stay={this.state.nowPage} />
        </section>
      );
    }
  }
});

module.exports = ArticleList;