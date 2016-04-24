var Store = require('./store-article');
var Pager = require('./comp-pager.jsx');
var CntsThumb = require('../pageFncs/cntsThumb.js');

var ArticleList = React.createClass({
  first: true,
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

    if( Store.gnav.data === null && Store.mainvisual.data == null ){
      this.actionCreator( Store.PageControl.paramObjs.paged, [ this.props.actionType, 'gnav', 'mainvisual' ]);
    }else{
      this.actionCreator( Store.PageControl.paramObjs.paged, [ this.props.actionType, 'mainvisual']);
    }

  },
  componentWillReceiveProps(){

    if( !this.first ){
    
      if( Store.gnav.data === null && Store.mainvisual.data == null ){
        this.actionCreator( Store.PageControl.paramObjs.paged, [ this.props.actionType, 'gnav', 'mainvisual' ]);
      }else{
        console.log('re');
        this.actionCreator( Store.PageControl.paramObjs.paged, [ this.props.actionType, 'mainvisual']);
      }
    }
  },
  actionCreator( page, comps ){

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

    var _countArray = [];

    Store.removeSubscribe({
      actionType: this.props.actionType
    });

    if(Store.list.data){

      for (var i = 0; i < Store.list.data.page.maxPage; i++) {
        _countArray.push(i);
      }

      this.imgLoading( Store.list.data.article ).then((e)=>{

        this.replaceState({
          nowPage: Store.list.data.page.nowPage,
          maxPage: _countArray,
          article: Store.list.data.article
        });
        
      });
    }
  },

  componentDidUpdate(){

    this.first = false;

    CntsThumb.init();
    $('.MdCntsThumb01 a').on('click', (e)=>{
      e.preventDefault();
    });
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
      this.actionCreator( _num, [ this.props.actionType ]);
      history.pushState(null,null,'/index_react.html?type=' + Store.PageControl.paramObjs.type + '&paged=' + e.target.dataset.num);
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

    if(this.state.article.length === 0){
      return false;
    }else{
      
      var article = this.state.article.map((res, i)=>{
        return (
            <section key={i} className="MdCntsThumb01"><a onClick={this.thumbClick.bind(this, res.ID)} href={res.ID}>
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
                  <h2 className="mdCntsThumb01Ttl">タイトルタイトルタイトルタイトルタイトル</h2>
                  <p className="mdCntsThumb01Txt">テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</p>
                </div>
                <p className="mdCntsThumb01Icn"><span className="icon-icon04"></span></p>
                <div className="mdCntsThumb01Cover">
                  <p className="mdCntsThumb01Txt">Read More</p>
                </div></a>
            </section>
          );
      });

      // var pager = this.state.maxPage.map((index)=>{
      //   return (
      //       <Pager pagerClick={this.pagerClick} num={index} key={index} stay={this.state.nowPage} />
      //     );
      // });

      return (
        <section>
        <h2 className="MdHdgCmn01"><span>All Contents</span></h2>
        <div className="LyCntsList">
        {article}
        </div>
        <Pager pagerClick={this.pagerClick} max={this.state.maxPage} stay={this.state.nowPage} />
        </section>
      );
    }
  }
});



// ReactDOM.render(
//   <ArticleList />,
//   document.getElementById('Main')
// );

module.exports = ArticleList;