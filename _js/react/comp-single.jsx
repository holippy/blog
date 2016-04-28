var Store = require('./store-article');
var Related = require('./comp-related.jsx');

var Single = React.createClass({
  first: false,
  loading: false,
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
    this.loadAction();
  },
  events(){
    

  },
  loadAction(){
    console.log('loadAction');
    this.loading = true;
    Store.addSubscribe({
      actionType: this.props.actionType,
      callback: this.dataloaded
    });

    if( Store.gnav.data === null ){
      this.actionCreator( this.props.articleID, [ this.props.actionType, 'gnav' ]);
    }else{
      this.actionCreator( this.props.articleID, [ this.props.actionType ]);
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

    this.loading = false;

    Store.removeSubscribe({
      actionType: this.props.actionType
    });

    console.log(this.store.data);

    this.replaceState({
      data: Store.single.data
    });
     
  },
  shouldComponentUpdate(){
    console.log('shouldComponentUpdate');
    //console.log(Store.single.data);

    if( this.state.data === null ){
      console.log('null');
      this.loadAction();
      return false;
    }else if( !this.loading ){
      console.log('this.loading');
      return true;
    }else{
      console.log('else');
      return true;
    }
    

  },
  componentDidUpdate(){

    console.log('componentDidUpdate');

    if( !this.first ){

      this.first = true;

      $('.MdCntsThumb01 a').on('click', (e)=>{
        e.preventDefault();
      });

      return false;
    }

  },
  thumbClick( ID ){
    this.props.thumbClick(ID);
  },
  render(){
    console.log('single render');

    if( this.state.data !== null ){

      var heading2 = this.state.data.hdg2.map( (res, i)=>{
        return(
          <li className="icon-icon04" key={i}><a href="#">{res}</a></li>
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