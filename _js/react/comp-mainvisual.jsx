var Store = require('./store-article');
var Slider = require('../pageFncs/slider.js');

var Mainvisual = React.createClass({
  getDefaultProps(){
    return {
      actionType:"mainvisual"
    }
  },
  getInitialState(){
    return {
      page: 1,
      mainvisual: []
    }
  },
  componentWillMount(){
    Store.addSubscribe({
      actionType: this.props.actionType,
      callback: this.dataloaded
    });
    this.actionCreator( [ this.props.actionType, 'list', 'mainvisual'] );
  },
  actionCreator( comps ){
    console.log("mv");
    Store.dispatcher.action.create({
      actionType: this.props.actionType,
      callback: this.dataloaded,
      requireComps: comps
    });
  },
  dataloaded(){
    
    Store.removeSubscribe({
      actionType: this.props.actionType
    });

    if(Store.mainvisual.data){
      this.imgLoading( Store.mainvisual.data ).then((e)=>{
        this.replaceState({ mainvisual: Store.mainvisual.data });
      });
    }
  },
  imgLoading( data ){
    var counter = 0;

    return new Promise( (resolve, reject )=> {

      data.map((res, index)=>{
        let img = new Image();

        $(img).on('load', ()=>{
          counter = counter + 1;
          if( counter == data.length ){
            resolve( counter );
          }
        });

        $(img).attr('src', res.thumb);

      });
    });
  },
  componentDidUpdate(){
    Slider.init();
  },
  render(){
    if(this.state.mainvisual.length === 0){
      return false;
    }else{
      var imgs = this.state.mainvisual.map((res, index)=>{
        return (
          <li key={index}>
            <a href={res.url}>
              <p className="mdSlideCat">{res.category}</p>
              <p className="mdSlideTtl"><span>{res.title}</span></p>
              <p className="mdSlideImg"><img src={res.thumb} /></p>
            </a>
          </li>
          );
      });

      var pager = this.state.mainvisual.map((res, index)=>{
        return (
          <li key={index}><a href="#" className="icon-icon01"></a></li>
          );
      });

      return (
        <div className="MdSlideContianer">
          <ul className="mdSlideListImg">
          {imgs}
          </ul>
          <ul className="mdSlideListPager">
          {pager}
          </ul>
          <ul className="mdSlideListBtn">
            <li className="mdSlideListBtnBack"><a href="#" className="icon-icon02"></a></li>
            <li className="mdSlideListBtnNext"><a href="#" className="icon-icon04"></a></li>
          </ul>
        </div>
      );
    }
  }
});

// ReactDOM.render(
//   <Mainvisual />,
//   document.getElementById('Mainvisual')
// );

module.exports = Mainvisual;