

var TEST = React.createClass({
  loaded: false,
  data: '',
  getDefaultProps(){
    return {
      actionType:"gnav"
    }
  },
  getInitialState(){
    return {
      data: ""
    }
  },
  componentWillMount(){
      this.replaceState({
        data: '!'
      });
  },
  loadAction(){


  },
  shouldComponentUpdate(){
    console.log('shouldComponentUpdate');

    return true;

  },
  componentDidUpdate(){
    console.log("did");

    // var self = this;

    // function gethtml(){
    //   return new Promise(function (resolve, reject) {
    //       $.ajax({
    //         url: "test.html",
    //         cache: false,
    //         success: function(html){
    //           resolve( html );
    //         }
    //       });
    //   });
    // }

    // gethtml().then( function(html){
    //   console.log(html);
    //   $('#loaded').append(html);
    //   self.data = html;
    //   self.loaded = true;
    //   self.replaceState({
    //     data: '!'
    //   });
    // } );
  },
  componentDidMount(){
    console.log("componentDidMount");

    var self = this;

    var gethtml = function (){
      var d = new $.Deferred;


      $.ajax({
        url: "test.html",
        cache: false,
        success: function(html){
          console.log("load");
          d.resolve(html);
        }
      });

      return d.promise();
    }

    gethtml().then( function(html){
      $('#loaded').append(html);
      
      return gethtml();
    }).then( function(html){
      console.log(html);
      $('#loaded2').append(html);
    });

    // function gethtml(){
    //   return new Promise(function (resolve, reject) {
    //       $.ajax({
    //         url: "test.html",
    //         cache: false,
    //         success: function(html){
    //           resolve( html );
    //         }
    //       });
    //   });
    // }

    // gethtml().then( function(html){
    //   console.log(html);
    //   $('#loaded').append(html);
    //   self.data = html;
    //   self.loaded = true;
    //   // self.replaceState({
    //   //   data: '!'
    //   // });
    // } );
  },
  render(){
    console.log("render");

    
    // return (
    //   <div>!!!reacts!!!</div>
    // );

    if(!this.loaded){
      return false;
    }else{
      return (
        <div>reacts</div>
      );
    }


  }
});

ReactDOM.render(
  <TEST />,
  document.getElementById('loaded')
);


module.exports = TEST;