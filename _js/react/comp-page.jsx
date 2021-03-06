var Store = require('./store-article');
var ArticleList = require('./comp-articleList.jsx');
var CategoryList = require('./comp-categoryList.jsx');
var Mainvisual = require('./comp-mainvisual.jsx');
var Gnav = require('./comp-gnav.jsx');
var Single = require('./comp-single.jsx');


var Page = React.createClass({
  getDefaultProps(){
    return {
    }
  },
  getInitialState(){
    return {
      pageType: 'index',
      pageID: null,
      update: false
    }
  },
  componentWillMount(){

    if( Store.PageControl.paramObjs.type === 'single' ){

      this.articleID = Store.PageControl.paramObjs.paged;

      this.setState({
        pageType: 'single',
        pageID: Store.PageControl.paramObjs.paged,
        update: false
      });
    }else if( Store.PageControl.paramObjs.type === 'category' ){
      this.articleID = Store.PageControl.paramObjs.paged;

      this.setState({
        pageType: 'category',
        pageID: Store.PageControl.paramObjs.paged,
        update: false
      });
    }

    this.event();
  },
  articleID: null,
  actionCreator( article, comps ){

  },
  event(){
    $(window).on('popstate', ()=>{

      Store.PageControl.getParam();

      if( Store.PageControl.paramObjs.type === 'single' ){

        this.articleID = Store.PageControl.paramObjs.paged;

        this.replaceState({
          pageType: 'single',
          pageID: this.articleID
        });
      }else if( Store.PageControl.paramObjs.type === 'category' ){

        console.log('category');

        this.articleID = Store.PageControl.paramObjs.paged;

        this.replaceState({
          pageType: 'category',
          pageID: this.articleID
        });
      }else if( Store.PageControl.paramObjs.type === 'index' ){
        this.replaceState({
          pageType: 'index'
        });
      }
    });
  },
  thumbClick( ID ){
    console.log('page' +ID);

    $('.LyHead').css({opacity:0});
    $('.LyFtr').css({opacity:0});

    this.articleID = ID;

    history.pushState(null,null,'/?type=' + 'single' + '&paged=' + ID);
    Store.PageControl.getParam();

    this.replaceState({
      pageType: 'single',
      pageID: this.articleID
    });

  },
  navClick( cat ){
    history.pushState(null,null,'/?type=' + 'category' + '&paged=' + cat);
    Store.PageControl.getParam();

    this.replaceState({
      pageType: 'category',
      pageID: cat
    });
  },
  backTop(){
    this.replaceState({
      pageType: 'index'
    });
    history.pushState(null,null,'/');
    Store.PageControl.getParam();
  },
  componentDidUpdate(){
    console.log("update!!!");
  },
  changeMeta(){
    $('meta[name=description]').attr("content", 'Indoor LinvingではArtek、広松木工、VitraなどのインテリアからFUJIFILM X-E1で撮影した写真までライフスタイルにスポットを当てたブログです');
    $("title").text('Indoor Linving');
  },
  render(){
    

      if( this.state.pageType == 'index' ){
        console.log('render');
        this.changeMeta();
        return (
          <div>

          <Gnav pageType={this.state.pageType} backTop={this.backTop} navClick={this.navClick} />
          <Mainvisual thumbClick={this.thumbClick} />
          <ArticleList thumbClick={this.thumbClick}/>
          </div>
        )
      }else if( this.state.pageType == 'single' ){
        //console.log('rendar single');
        return (
          <div>
          <Gnav pageType={this.state.pageType} backTop={this.backTop} navClick={this.navClick} />
          <Single update={this.state.update} articleID={this.state.pageID} thumbClick={this.thumbClick} />
          </div>
        )
      }else if( this.state.pageType == 'category' ){
        //console.log('rendar category');
        return (
          <div>
          <Gnav pageType={this.state.pageType} backTop={this.backTop} navClick={this.navClick} />
          <CategoryList thumbClick={this.thumbClick}/>
          </div>
        )
      }else{
        return false;
      }

  }
});



ReactDOM.render(
  <Page />,
  document.getElementById('Main')
);

module.exports = Page;