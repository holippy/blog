var Store = require('./store-article');

var Single = React.createClass({
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
    console.log(this.props.articleID);

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
  events(){
    

  },
  actionCreator( page, comps ){
    Store.dispatcher.action.create({
      actionType: this.props.actionType,
      page: page,
      callback: this.dataloaded,
      requireComps: comps
    });
  },
  dataloaded(){

    Store.removeSubscribe({
      actionType: this.props.actionType
    });

    this.replaceState({
      data: Store.single.data
    });
  },
  componentDidUpdate(){

  },

  render(){
    if( this.state.data === null ){
      return false;
    }else{

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
        </div>
      )

    }

  }
});


module.exports = Single;