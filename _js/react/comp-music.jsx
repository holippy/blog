var StoreMusic = require('./Store-music');
var MusicFnc = require('../pageFncs/music.js');

var Music = React.createClass({
  loadFlag: true,
  first: true,
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
    }else if( StoreMusic.musics.actionType == 'Movie' ){
        this.replaceState({
          ids: StoreMusic.musics.dataID,
          videos: StoreMusic.musics.dataMovie
        });
    }

  },
  shouldComponentUpdate(){
    return true;
  },
  componentDidUpdate(){

    if( this.first ){

      MusicFnc.init( this.iconClick );

      this.first = false;
    }
  },
  componentWillReceiveProps(nextProps){

  },
  requestItems(){
    var itemList = [],
        itemLength = this.offset + 4;

    if( itemLength > StoreMusic.musics.dataID.length ){
      itemLength = StoreMusic.musics.dataID.length

    }
    for (var i = this.offset - 1; i < itemLength; i++) {
      itemList.push( StoreMusic.musics.dataID[i] );
    }

    this.offset = itemLength + 1;

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
  viewMore(){
      this.actionCreator({
        actionType: 'Movie',
        requestItem: this.requestItems()
      });
    },
  render(){

    if( this.loadFlag ){

      if( this.offset > 0 ){
        var videos = this.state.videos.map((elm, i)=>{
          return(
            <div className="mdPlayerItem">
            <p className="mdPlayerName">{elm.items[0].snippet.title}</p>
            <p className="mdPlayerIframe">
              <iframe src={'https://www.youtube.com/embed/' + elm.items[0].id + '?rel=0'} width="550" height="300" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
            </p>
            </div>
          );
        });
      };

      return(
        <div className="LyPlayer">
          <div className="MdPlayer">
            <div className="mdPlayerTtlInner">
              <p className="mdPlayerIcon"><span><img src="/assets/svg/player.svg" alt="Music Player" /></span></p>
              <p className="MdHdgCmn01"><span>Music Player</span></p>
              <p id="FncPlayerClose" className="mdPlayerClose"><a href="#">CLOSE</a></p>
            </div>

            <div className="mdPlayerInner">
              {videos}
              {(() => {
                if ( this.offset > 1 && this.offset <= StoreMusic.musics.dataID.length) {
                  return <p id="FncPlayMore" className="mdPlayerMore"><a href="javascript:void(0)" onClick={this.viewMore}>さらに見る</a></p>;
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

module.exports = Music;