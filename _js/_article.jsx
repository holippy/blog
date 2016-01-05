var ModArticle = require('./_store-article');

var Article = React.createClass({

  componentWillMount: function(){
    ModArticle.storeData.addSubscribe({callback: this.dataloaded});
  },
  actionCreator: function(){
    ModArticle.dispatcher.action.create({
      actionType: 'latest',
      page: 1,
      callback: this.dataloaded
    });

  },
  dataloaded: function(data){
    console.log('article'+data);
  },
  render:function(){
    return(
      <p onClick={this.actionCreator}>text text</p>
    );
  }
});

ReactDOM.render(
  <Article/>,
  document.getElementById('example')
);

// var Article = React.createClass({

//   mixins: [mixin],

//   componentWillMount: function(){
//     var self = this;

//     //ブラウザの戻る進むボタンクリック時のイベントを設定
//     $(window).on('popstate.Article', function(){
//       console.log("");
//       self.dataSet();
//     });

//     self.dataSet();

//   },

//   dataSet: function(){
//     var self = this,
//         location = this.getLocation(),
//         params;

//     if( location === 'is-home'){
//       params = {};
//     }

//     self.getData(location);
//   },

//   getInitialState: function(){
//     return {
//       data: []
//     };
//   },

//   getData: function( params ){
//     var self = this,
//         xhr = $.ajax({
//         url: 'http://beautifulday.sakura.tv/wp/',
//         type: 'GET',
//         crossDomain: true,
//         cache: false,
//         data: params, 
//         dataType: 'json',
//       statusCode: {
//       }
//     });

//     xhr.done(this.successHandler);
//     xhr.fail(this.failureHandler);
//   },

//   successHandler: function(data){

//     //self.xhrArticleにjsonデータをキャッシュ
//     self.xhrArticle = data.article;
//     self.xhrArticleLength = data.article.length;

//     this.setState({ data: data.article});

//   },

//   failureHandler: function(data){

//   },

//   clickEvnt: function(i){
//     var self = this;
//     history.pushState('', '', '?paged='+ (i+1) );
//     self.componentWillMount();
//   },

//   render: function() {

//     var self = this;

//     return (
//       <ul>
//         {self.state.data.map(function(data, i) {
//           return <li key={i} onClick={self.clickEvnt.bind(self, i)}>{data.title}</li>;
//         })}
//       </ul>
//     );
//   }
// });

// //記事をレンダリング
// ReactDOM.render(
//   <Article/>,
//   document.getElementById('example')
// );

module.exports = Article;