var Store = require('./store-article');

var Article = React.createClass({

  getInitialState(){
    return {
      page: 1,
      data: []
    }
  },
  componentWillMount(){
    Store.addSubscribe({callback: this.dataloaded});
    this.actionCreator();
  },
  actionCreator(){
    Store.dispatcher.action.create({
      actionType: 'latest',
      page: 1,
      callback: this.dataloaded
    });

  },
  dataloaded(data){
    if(Store.article.data){
      this.replaceState({ data: Store.article.data });
    }
  },
  render(){

    if(this.state.data.length === 0){
      return false;
    }else{
      return(
        <p onClick={this.actionCreator}>text text</p>
      );
    }
  }
});

ReactDOM.render(
  <Article/>,
  document.getElementById('example')
);


module.exports = Article;