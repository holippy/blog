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
    //console.log('GNcomponentWillMount');
    this.loadAction();
  },
  loadAction(){
    //console.log('GNloadAction');

    if( this.props.pageType === 'single' ){
      if( Store.gnav.data === null ){
        this.actionCreator( [ this.props.actionType, 'single'] );
      }else if( Store.gnav.data !== null ){
        this.actionCreator( ['single'] );
      }
    }else if( this.props.pageType === 'index' ){
      if( Store.mainvisual.data === null && Store.gnav.data === null ){
        this.actionCreator( [ this.props.actionType, 'list', 'mainvisual'] );
      }else if( Store.mainvisual.data == null && Store.gnav.data !== null ){
        this.actionCreator( [ 'mainvisual', 'list'] );
      }else{
        this.actionCreator( ['list'] );
      }
    }else if( this.props.pageType === 'category' ){
      if( Store.gnav.data === null ){
        this.actionCreator( [ this.props.actionType, 'category'] );
      }else if( Store.gnav.data !== null ){
        this.actionCreator( ['category'] );
      }
    }

  },
  componentDidUpdate(){
    if( $('.LyHead.FncStart').length === 0 ){
      console.log('headerinit');
      Header.init();
    }

    $('#Gnav li').on('click', (e)=>{
      e.preventDefault();
    });
  },
  componentDidMount(){

  },
  actionCreator( comps ){
    Store.addSubscribe({
      actionType: this.props.actionType,
      callback: this.dataloaded
    });

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
  navClick(cat){
    //console.log(cat);

    this.props.navClick(cat);

  },
  render(){

    //console.log('rendar gnav');
    //console.log(Store.gnav.data);

    if( Store.gnav.data === null ){
      return false;
    }else{

      let lists = this.state.gnav.map((res)=>{
      
      return <li key={res.ID}><span className="icon-icon05"></span><a onClick={this.navClick.bind(this, res.slug)} href={res.slug}>{res.catName}</a></li>;

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