var Store = require('./store-article');
var Pager = require('./comp-pager.jsx');

var ArticleList = React.createClass({
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
    Store.addSubscribe({
      actionType: this.props.actionType,
      callback: this.dataloaded
    });
    this.actionCreator( this.state.nowPage, [ this.props.actionType, 'gnav' ]);
  },
  actionCreator( page, comps ){
    Store.dispatcher.action.create({
      actionType: this.props.actionType,
      page: page,
      callback: this.dataloaded,
      requireComps: comps
    });
  },
  dataloaded(){

    var _countArray = [];

    if(Store.list.data){
      for (var i = 0; i < Store.list.data.page.maxPage; i++) {
        _countArray.push(i);
      }

      this.replaceState({
        nowPage: Store.list.data.page.nowPage,
        maxPage: _countArray,
        article: Store.list.data.article
      });
    }
  },

  pagerClick( e ){
    e.preventDefault();
    console.log(e.target.dataset.num);
    if( e.target.dataset.num === '1' ){
      
      this.actionCreator( 0, [ this.props.actionType ]);
    }else{
      this.actionCreator( e.target.dataset.num, [ this.props.actionType ]);
    }
    
  },
  render(){
    if(this.state.article.length === 0){
      return false;
    }else{
      
      var article = this.state.article.map((res, index)=>{
        return (
            <section key={index} className="MdCntsThumb01"><a href={res.url}>
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

      var pager = this.state.maxPage.map((index)=>{
        return (
            <Pager pagerClick={this.pagerClick} num={index} key={index} />
          );
      });

      //var pager = this.state.data.map()
      return (
        <div>
        <div className="LyCntsList">
        {article}
        </div>
        <ul className="MdPager01">
        {pager}
        </ul>
        </div>
      );
    }
  }
});



ReactDOM.render(
  <ArticleList />,
  document.getElementById('Main')
);

module.exports = ArticleList;