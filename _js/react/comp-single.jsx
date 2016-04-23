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

    this.actionCreator( this.props.articleID, [ this.props.actionType ]);
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
    console.log('loaded');
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
      return(
        <section className="MdMainSingle01">
          <div className="mdContainer">
            <main className="mdMain">
              <div className="MdCntsData01">
                <p className="mdDate">2016/4/20</p>
                <p className="mdCat"> <a>camera</a></p>
              </div>
              <h1 className="MdTtlSingle01">Focusing ZEISS DSLR Lenses For Peak Performance PART ONE: The Challenges</h1>
              <div className="mdCms">
                <h2>Challenge #2: DSLR focus assist (“green dot”) is prone to error</h2>
                <p>Alignment: there are two light paths and two sensors in a DSLR: the light path straight to the imaging sensor, and the twist and turns of the light path to the focusing sensor along the path to the optical viewfinder. If the two light paths are not exactly the same distance (more than 0.02 mm is a significant error), then focus will be skewed even if the user has perfect vision and focuses the image perfectly (as perceived). The camera manufacturer may be able to adjust the camera to fix such alignment issues.</p>
                <p>Focusing screen: even with a perfectly adjusted viewfinder, the surface structure of modern focusing screens makes it difficult for the eye to distinguish between in-focus and out-of-focus, particularly off-center. In effect, the focusing screen doesn’t allow focus discrimination much better than f/2.8, so f/1.4 and f/2 lenses tend to be hit and miss for focus. Also, f/1.4 and f/2 lenses are generally not much brighter than f/2.8 lenses with these modern screens. The traditional split image and microprism focusing aids have disappeared from Canon and Nikon DSLRs. There may also be markings that overlay the screen and obstruct the view for manual focus, though some camera models have options to hide these markings.</p>
                <h2>Make the project kick-off the first iteration</h2>
                <p>Alignment: there are two light paths and two sensors in a DSLR: the light path straight to the imaging sensor, and the twist and turns of the light path to the focusing sensor along the path to the optical viewfinder. If the two light paths are not exactly the same distance (more than 0.02 mm is a significant error), then focus will be skewed even if the user has perfect vision and focuses the image perfectly (as perceived). The camera manufacturer may be able to adjust the camera to fix such alignment issues.</p>
                <h2>Challenge #2: DSLR focus assist (“green dot”) is prone to error</h2>
                <p>Alignment: there are two light paths and two sensors in a DSLR: the light path straight to the imaging sensor, and the twist and turns of the light path to the focusing sensor along the path to the optical viewfinder. If the two light paths are not exactly the same distance (more than 0.02 mm is a significant error), then focus will be skewed even if the user has perfect vision and focuses the image perfectly (as perceived). The camera manufacturer may be able to adjust the camera to fix such alignment issues.</p>
                <p>Focusing screen: even with a perfectly adjusted viewfinder, the surface structure of modern focusing screens makes it difficult for the eye to distinguish between in-focus and out-of-focus, particularly off-center. In effect, the focusing screen doesn’t allow focus discrimination much better than f/2.8, so f/1.4 and f/2 lenses tend to be hit and miss for focus. Also, f/1.4 and f/2 lenses are generally not much brighter than f/2.8 lenses with these modern screens. The traditional split image and microprism focusing aids have disappeared from Canon and Nikon DSLRs. There may also be markings that overlay the screen and obstruct the view for manual focus, though some camera models have options to hide these markings.</p>
              </div>
            </main>
            <aside className="mdAside">
              <p className="MdTtlOutline">Outline</p>
              <ul className="MdListAnc01">
                <li className="icon-icon04"><a href="#">Challenge #2: DSLR focus assist (“green dot”) is prone to error</a></li>
                <li className="icon-icon04"><a href="#">Make the project kick-off the first iteration</a></li>
              </ul>
            </aside>
          </div>
        </section>
      )

    }

  }
});


module.exports = Single;