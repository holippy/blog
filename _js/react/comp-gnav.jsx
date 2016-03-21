var Store = require('./store-article');

var Gnav = React.createClass({
  getDefaultProps(){
    return {
      actionType:"gnav"
    }
  },
  getInitialState(){
    return {
      data: [],
      view: false
    }
  },
  componentWillMount(){
    Store.addSubscribe({
      actionType: this.props.actionType,
      callback: this.dataloaded
    });
    this.actionCreator( [ this.props.actionType, 'list'] );
  },
  actionCreator( comps ){
    Store.dispatcher.action.create({
      actionType: this.props.actionType,
      page: 1,
      callback: this.dataloaded,
      requireComps: comps
    });
  },
  dataloaded(){
    this.replaceState({ 
      data: Store.gnav.data,
      view: true
    });

    Store.removeSubscribe({
      actionType: this.props.actionType
    });
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
  <Gnav actionType="gnav" />,
  document.getElementById('Gnav')
);


module.exports = Gnav;