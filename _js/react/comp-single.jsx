var Store = require('./store-article');
var Related = require('./comp-related.jsx');
var CntsThumb = require('../pageFncs/cntsThumb.js');
var SingleFnc = require('../pageFncs/single.js');

var Single = React.createClass({
  update: false,
  getDefaultProps(){
    return {
      actionType:"single"
    }
  },
  getInitialState(){
    return {
      data: null
    }
  },
  componentWillMount(){
    console.log('componentWillMount');
    this.loadAction( this.props.articleID );
  },
  loadAction( articleID ){
    console.log('loadAction');

    Store.addSubscribe({
      actionType: this.props.actionType,
      callback: this.dataloaded
    });

    if( Store.gnav.data === null ){
      this.actionCreator( articleID, [ this.props.actionType, 'gnav' ]);
    }else{
      this.actionCreator( articleID, [ this.props.actionType ]);
    }
  },
  actionCreator( page, comps ){
    console.log('actionCreator');

    Store.dispatcher.action.create({
      actionType: this.props.actionType,
      page: page,
      callback: this.dataloaded,
      requireComps: comps
    });
  },
  dataloaded(){
    console.log('single loaded');

    Store.removeSubscribe({
      actionType: this.props.actionType
    });

    console.log(this.isMounted());

    if( this.isMounted() ){
      this.setState({
        data: Store.single.data
      });
    }

  },
  shouldComponentUpdate(){
    console.log('shouldComponentUpdate');

    return true;
  },
  componentDidUpdate(){

    console.log('componentDidUpdate');

    SingleFnc.init();
    CntsThumb.init();

    $('.MdCntsThumb01 a').on('click', (e)=>{
      e.preventDefault();
    });

  },
  thumbClick( ID ){
    this.props.thumbClick(ID);
  },
  componentWillReceiveProps(nextProps){
    console.log('componentWillReceiveProps');

    this.first = true;

    if( this.props.articleID === nextProps.articleID ){
      this.update = false;
    }else{
      this.update = true;
      this.loadAction( nextProps.articleID );
    }

  },
  render(){
    console.log('single render');
    console.log(this.state.data);

    if( this.state.data !== null ){

      var heading2 = this.state.data.hdg2.map( (res, i)=>{
        return(
          <li key={i}><span className="icon-icon04"></span><a href="#">{res}</a></li>
        );
      });

      return(
        <div key={this.props.articleID}>
        <div className="MdMvSingle01"><img src={this.state.data.visual} /></div>
        <section className="MdMainSingle01">
          <div className="mdContainer">
            <main className="mdMain">
              <div className="MdCntsData01">
                <p className="mdDate">{this.state.data.date}</p>
                <p className="mdCat"> <a>{this.state.data.catName}</a></p>
              </div>
              <h1 className="MdTtlSingle01">{this.state.data.title}</h1>
              <div className="mdCms" dangerouslySetInnerHTML={{__html: this.state.data.contents}}>

              </div>
            </main>
            <aside className="mdAside">
              <p className="MdTtlOutline">Outline</p>
              <ul className="MdListAnc01">
                {heading2}
              </ul>
            </aside>
          </div>
        </section>
        <Related article={this.state.data.related} thumbClick={this.thumbClick} />

        </div>
      )
    }else{
      return false;
    }

  }
});


module.exports = Single;