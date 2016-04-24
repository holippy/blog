var Store = require('./store-article');
var ArticleList = require('./comp-articleList.jsx');
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
      pageType: 'index'
    }
  },
  componentWillMount(){
    if( Store.PageControl.paramObjs.type === 'single' ){

      this.articleID = Store.PageControl.paramObjs.paged;

      this.replaceState({
        pageType: 'single'
      });
    }

    this.event();
  },
  articleID: null,
  actionCreator( article, comps ){

  },
  event(){
    $(window).on('popstate', ()=>{



      if( Store.PageControl.paramObjs.type === 'single' ){

        this.articleID = Store.PageControl.paramObjs.paged;

        this.replaceState({
          pageType: 'single'
        });
      }else if( Store.PageControl.paramObjs.type === 'index' ){
        
        this.replaceState({
          pageType: 'index'
        });
      }
    });
  },
  thumbClick( ID ){

    this.articleID = ID;

    history.pushState(null,null,'/index_react.html?type=' + 'single' + '&paged=' + ID);
    Store.PageControl.getParam();

    this.replaceState({
      pageType: 'single'
    });


  },
  backTop(){
    this.replaceState({
      pageType: 'index'
    });
    history.pushState(null,null,'/index_react.html');
    Store.PageControl.getParam();
  },
  render(){
      if( this.state.pageType == 'index' ){
        return (
          <div>
          <Gnav pageType={this.state.pageType} backTop={this.backTop} />
          <Mainvisual />
          <ArticleList thumbClick={this.thumbClick}/>
          </div>
        )
      }else if( this.state.pageType == 'single' ){
        return (
          <div>
          <Gnav pageType={this.state.pageType} backTop={this.backTop} />
          <Single articleID={this.articleID} />
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

module.exports = ArticleList;