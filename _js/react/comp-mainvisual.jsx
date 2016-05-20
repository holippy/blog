var Store = require('./store-article');
var Slider = require('../pageFncs/slider.js');

var Mainvisual = React.createClass({
  first: true,
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
    console.log('MVcomponentWillMount');
    this.loadAction();
    
  },

  loadAction(){
    console.log('MVloadAction');
    if( Store.mainvisual.data === null && Store.gnav.data === null ){
      console.log('mainvisual first load');
      this.actionCreator( [ this.props.actionType, 'list', 'gnav'] );
    }else if( Store.mainvisual.data === null && Store.gnav.data !== null ){
      console.log('mainvisual un load');
      this.actionCreator( [ this.props.actionType, 'list'] );
    }else{
      console.log('secound');
      this.actionCreator( ['list'] );
    }
  },

  // componentWillReceiveProps(){
  //   console.log('MVcomponentWillReceiveProps');
  // },
  actionCreator( comps ){
    console.log('MVactionCreator');

    Store.addSubscribe({
      actionType: this.props.actionType,
      callback: this.dataloaded
    });

    Store.dispatcher.action.create({
      actionType: this.props.actionType,
      callback: this.dataloaded,
      requireComps: comps
    });
  },
  dataloaded(){
    console.log('MVdataloaded');
    Store.removeSubscribe({
      actionType: this.props.actionType
    });

    if( this.isMounted() ){
      this.replaceState({ mainvisual: Store.mainvisual.data });
    }

    if(Store.mainvisual.data){
      this.imgLoading( Store.mainvisual.data ).then((e)=>{
      });
    }
  },
  imgLoading( data ){
    var counter = 0,
        d = new $.Deferred;;

    data.map((res, index)=>{
      let img = new Image();

      $(img).on('load', ()=>{
        counter = counter + 1;
        if( counter == data.length ){
          d.resolve(counter);
        }
      });

      $(img).attr('src', res.thumb);

    });

    return d.promise();

  },

  componentDidUpdate(){
    console.log('MVcomponentDidUpdate');
    Slider.unmount();
    Slider.init();
    $('.mdSlideListImg li').each((i, elm)=>{
      $(elm).find('a').eq(0).on('click', (e)=>{
        e.preventDefault();
      });
    });
  },
  componentWillUnmount(){
    console.log('unmount');
    Slider.unmount();
  },
  shouldComponentUpdate(){

    if( $('.MdSlideContianer').length === 0 ){
      return true;
    }else{
      return false;
    }
    
  },
  componentDidMount(){
    console.log('MVcomponentDidMount');
    console.log('MVcomponentDidUpdate');
    Slider.unmount();
    Slider.init();
    $('.mdSlideListImg li').each((i, elm)=>{
      $(elm).find('a').eq(0).on('click', (e)=>{
        e.preventDefault();
      });
    });
  },
  thumbClick( ID ){
    console.log(ID);
    this.props.thumbClick(ID);
  },
  render(){
    console.log('MVrendar');
    if(this.state.mainvisual.length === 0){
      return false;
    }else{
      Slider.unmount();
      var mvArray = [];
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < this.state.mainvisual.length; j++) {
          mvArray.push(this.state.mainvisual[j]);
        }
      }
      var imgs = mvArray.map((res, index)=>{
        return (
          <li key={'thumb'+index}>
            <a onClick={this.thumbClick.bind(this, res.ID)} href={res.ID}>
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
        <div key={this.mainvisualID} className="MdSlideContianer">
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

module.exports = Mainvisual;