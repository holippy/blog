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

    return (<li key={this.props.num + 1}><a href="#" data-num={this.props.num + 1} onClick={this.props.pagerClick}>{this.props.num + 1}</a></li>);
    // if(this.state.data.length === 0){
    //   return false;
    // }else{
    //   var lists = this.state.data.map((res, index)=>{
      
    //     return (<li><a href="#" class="stay">1</a></li>);
    //   });
    //   return (
    //     <ul className="MdPager01">
    //     {lists}
    //     </ul>
    //   );
    // }
  }
});

// ReactDOM.render(
//   <Pager />,
//   document.getElementById('Gnav')
// );


module.exports = Pager;