var Store = require('./store-article');

var Gnav = React.createClass({

  getInitialState(){
    return {
      data: [],
      view: false
    }
  },
  componentWillMount(){
    Store.addSubscribe({callback: this.dataloaded});
    this.actionCreator();
  },
  actionCreator(){
    Store.dispatcher.action.create({
      actionType: 'gnav',
      callback: this.dataloaded
    });

  },
  dataloaded(data){
    if( !this.state.view ){
      this.replaceState({ 
        data: Store.navi.data,
        view: true
      });
    }
  },
  render(){

    if( !this.state.view ){
      return false;
    }else{
      let lists = this.state.data.map((res)=>{
      
      return <li key={res.ID}><span className="icon-icon05"></span><a href={res.slug}>{res.catName}</a></li>;
                  
      });
      return (
        <ul>
          {lists}
        </ul>
      );
    }
  }
});

ReactDOM.render(
  <Gnav/>,
  document.getElementById('Gnav')
);


module.exports = Gnav;