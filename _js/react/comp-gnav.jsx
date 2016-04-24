var Store = require('./store-article');
var Header = require('../pageFncs/header.js');

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

    if( this.props.pageType === 'index' && Store.gnav.data === null ){
      this.actionCreator( [ this.props.actionType, 'list', 'mainvisual'] );
    }else if( this.props.pageType === 'single' && Store.gnav.data === null ){
      this.actionCreator( [ this.props.actionType, 'single'] );
    }
  },
  componentDidUpdate(){
    //update後にグロナビとフッターを表示
    $('.LyHead').css({display: 'block'});
    $('.LyFtr').css({display: 'block'});
    
    if( $('.LyHead.FncStart').length === 0 ){
      console.log('headerinit');
      Header.init();
    }
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
  backTop(e){
    e.preventDefault();
    this.props.backTop();
  },
  render(){

    if(this.state.gnav.length === 0){
      return false;
    }else{

      let lists = this.state.gnav.map((res)=>{
      
      return <li key={res.ID}><span className="icon-icon05"></span><a href={res.slug}>{res.catName}</a></li>;

      });
      
      return (
        <div className="LyHead">
          <header className="MdHead">
            <p className="mdLogo"><a href="#" onClick={this.backTop}>Indoor Living</a></p>
            <nav id="Gnav" className="MdGNV"><ul>{lists}</ul></nav>
            <form method="post" action="#" className="MdSearch">
              <input type="text" />
              <button type="submit" className="icon-icon_search"></button>
            </form>
          </header>
        </div>
      );
    }
  }
});

module.exports = Gnav;