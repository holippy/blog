var Store = require('./store-article');

var Gnav = React.createClass({
  getDefaultProps(){
    return {
      actionType:"gnav"
    }
  },
  getInitialState(){
    return {
      gnav: [],
      view: false
    }
  },
  componentWillMount(){
    Store.addSubscribe({
      actionType: this.props.actionType,
      callback: this.dataloaded
    });
    this.actionCreator( [ this.props.actionType, 'list', 'mainvisual'] );
  },
  componentDidUpdate(){
    //rupdate後にグロナビとフッターを表示
    $('.LyHead').css({display: 'block'});
    $('.LyFtr').css({display: 'block'});
  },
  componentDidMount(){
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
      gnav: Store.gnav.data
    });

    Store.removeSubscribe({
      actionType: this.props.actionType
    });
  },
  render(){
    if(this.state.gnav.length === 0){
      return false;
    }else{
      let lists = this.state.gnav.map((res)=>{
      
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