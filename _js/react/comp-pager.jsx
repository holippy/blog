var Pager = React.createClass({
  render(){
    var stay = this.props.stay

    if( stay != 0 ){
      stay = stay - 1;
    }

    var pager = this.props.max.map((index)=>{
      if( index === stay ){
        return (<li key={index}><a href="#" data-num={index + 1} onClick={this.props.pagerClick} className="stay">{index + 1}</a></li>);

      }else{
        return (<li key={index}><a href="#" data-num={index + 1} onClick={this.props.pagerClick}>{index + 1}</a></li>);
      }
    });

    return (
      <ul className="MdPager01">
      {pager}
      </ul>
    );
  }
});

// ReactDOM.render(
//   <Pager />,
//   document.getElementById('Gnav')
// );


module.exports = Pager;