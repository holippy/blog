var Store = require('./store-article');
var ArticleList = require('./comp-articleList.jsx');
var Mainvisual = require('./comp-mainvisual.jsx');
var Single = require('./comp-single.jsx');

var Page = React.createClass({
  getDefaultProps(){
    return {
    }
  },
  getInitialState(){
    return {
      pageType: 'top'
    }
  },
  componentWillMount(){

  },
  articleID: null,
  actionCreator( article, comps ){

  },
  thumbClick( ID ){

    this.articleID = ID;

    this.replaceState({
      pageType: 'single'
    });
  },
  render(){
    console.log(this.state.pageType);
      if( this.state.pageType == 'top' ){
        return (
          <div>
          <Mainvisual />
          <ArticleList thumbClick={this.thumbClick}/>
          <Pager pagerClick={this.pagerClick} num={index} key={index} stay={this.state.nowPage} />
          </div>
        )
      }else if( this.state.pageType == 'single' ){
        return (
           <Single articleID={this.articleID} />
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