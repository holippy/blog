var StoreMusic = require('./Store-music');

var Music = React.createClass({
  loadFlag: true,
  getDefaultProps(){
    return {
      actionType:"music"
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

  loadAction(){
    this.actionCreator( ['ID'] );
  },

  actionCreator( items ){
    //console.log('actionCreator');
    StoreMusic.addSubscribe({
      actionType: this.props.actionType,
      callback: this.dataloaded
    });

    StoreMusic.dispatcher.action.create({
      requireItem: items
    });
  },
  dataloaded(){


  },
  shouldComponentUpdate(){


  },
  componentDidUpdate(){

  },
  componentWillReceiveProps(nextProps){

  },
  render(){


      if( this.loadFlag ){
        return(
        <div className="LyPlayer">
          <div className="MdPlayer">
            <div className="mdPlayerInner">
              <p className="mdPlayerTtl"><span>Movie Player</span></p>
            </div>
          </div>
        </div>
        )
      }else{
        return false;
      }
    


  }
});

ReactDOM.render(
  <Music />,
  document.getElementById('Music')
);

            /*<div className="mdPlayerItem">
              <p className="mdPlayerName">来来来チーム東洋一</p>
              <p className="mdPlayerIframe">
                <iframe src="https://www.youtube.com/embed/C1DmxDNwbRg" width="600" height="300" frameborder="0" allowfullscreen="allowfullscreen" /></iframe></p>
                
              </p>
            </div>*/


module.exports = Music;