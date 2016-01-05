var ModArticle = require('./_store-article');

var Menu = React.createClass({
  componentWillMount: function(){
    ModArticle.storeData.addSubscribe({callback: this.dataloaded});
  },
  actionCreator: function(){
    ModArticle.dispatcher.action.create({
      actionType: 'navi',
      page: 0,
      callback: this.dataloaded
    });
  },
  dataloaded: function(data){
    console.log('menu'+data);

  },
  render:function(){
    return(
      <p onClick={this.actionCreator}>menu menu</p>
    );
  }
});

ReactDOM.render(
  <Menu/>,
  document.getElementById('nav__global')
);

// var Menu = React.createClass({

//   mixins: [mixin],

//   componentWillMount: function(){
//     var self = this;

//     self.getData();


//   },

//   dataSet: function(){

//   },

//   getInitialState: function(){
//     return {
//       data: []
//     };
//   },

//   getData: function( params ){
//     var self = this,
//         xhr = $.ajax({
//         url: 'http://beautifulday.sakura.tv/wp/?page_id=37',
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
//     self.xhrArticle = data;
//     self.xhrArticleLength = data.length;

//     this.setState({ data: data});

//   },

//   failureHandler: function(data){

//   },

//   clickEvnt: function(id){
//     var self = this;
//     history.pushState('', '', '?cat='+ id );
//   },

//   render: function() {

//     var self = this;

//     return (
//       <ul>
//         {self.state.data.map(function(data, i) {
//           return <li key={i} onClick={self.clickEvnt.bind(self, data.ID)}>{data.catName}</li>;
//         })}
//       </ul>
//     );
//   }
// });

// //記事をレンダリング
// ReactDOM.render(
//   <Menu/>,
//   document.getElementById('nav__global')
// );

module.exports = Menu;