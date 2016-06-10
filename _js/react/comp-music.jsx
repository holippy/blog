var StoreMusic = require('./Store-music');

var Music = React.createClass({
  loadFlag: true,
  offset: 0,
  getDefaultProps(){
    return {
      actionType:"music"
    }
  },
  getInitialState(){
    return {
      ids: [],
      videos: []
    }
  },
  componentWillMount(){
    console.log('componentWillMount');
    
    this.loadAction();
  },

  loadAction(){
    this.actionCreator({
      actionType: 'ID',
      requestItem: ['ID']
    });
  },

  actionCreator( options ){
    this.loadFlag = false;

    StoreMusic.addSubscribe({
      actionType: this.props.actionType,
      callback: this.dataloaded
    });

    StoreMusic.dispatcher.action.create({
      actionType: options.actionType,
      requestItem: options.requestItem
    });
  },
  dataloaded(){
    StoreMusic.removeSubscribe({
      actionType: this.props.actionType
    });
    this.loadFlag = true;
    if( StoreMusic.musics.actionType == 'ID' ){
        this.replaceState({
          ids: StoreMusic.musics.dataID
        });
    }
  },
  shouldComponentUpdate(){
    return true;
  },
  componentDidUpdate(){

  },
  componentWillReceiveProps(nextProps){

  },
  requestItems(){
    var itemList = [];
    for (var i = this.offset - 1; i < this.offset + 5; i++) {
      itemList.push( StoreMusic.musics.dataID[i] );
    }

    return itemList;
  },
  iconClick(){
    if( this.offset == 0 ){
      this.offset = 1;
      this.actionCreator({
        actionType: 'Movie',
        requestItem: this.requestItems()
      });
    }
  },
  render(){

      if( this.loadFlag ){
        return(
        <div className="LyPlayer">
          <div className="MdPlayer">
            <div className="mdPlayerInner">
              <p className="mdPlayerTtl" onClick={this.iconClick} ><span>Movie Player</span></p>
              {(() => {
                if (this.loadFlag) {
                  return <p>さらに見る</p>;
                }
              })()}
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