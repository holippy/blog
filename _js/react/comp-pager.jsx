var Store = require('./store-article');

var Pager = React.createClass({
  getDefaultProps(){
    return {
      actionType:"pager"
    }
  },
  getInitialState(){
    return {
      page: 1,
      data: []
    }
  },
  componentWillMount(){
    Store.addSubscribe({
      actionType: this.props.actionType,
      callback: this.dataloaded
    });
    //this.actionCreator([ this.props.actionType, 'gnav', 'list' ]);
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
    if(Store.list.data){
      this.replaceState({ data: Store.list.data.article });
    }
  },
  render(){
    var stay = this.props.stay;

    if( stay != 0 ){
      stay = stay - 1;
    }

    if( this.props.num === stay ){
      return (<li key={this.props.num}><a href="#" data-num={this.props.num + 1} onClick={this.props.pagerClick} className="stay">{this.props.num + 1}</a></li>);

    }else{
      return (<li key={this.props.num}><a href="#" data-num={this.props.num + 1} onClick={this.props.pagerClick}>{this.props.num + 1}</a></li>);
    }

  }
});

// ReactDOM.render(
//   <Pager />,
//   document.getElementById('Gnav')
// );


module.exports = Pager;