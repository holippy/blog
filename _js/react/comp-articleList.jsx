var ModArticle = require('./store-articleList');

var Article = React.createClass({

  componentWillMount: ()=>{
    ModArticle.storeData.addSubscribe({callback: this.dataloaded});
  },
  actionCreator(){
    ModArticle.dispatcher.action.create({
      actionType: 'latest',
      page: 1,
      callback: this.dataloaded
    });

  },
  dataloaded(data){
    console.log('article'+data);
  },
  render(){
    return(
      <p onClick={this.actionCreator}>text text</p>
    );
  }
});

ReactDOM.render(
  <Article/>,
  document.getElementById('example')
);


module.exports = Article;