var ajaxtest = function(){
  function gethtml(){
    return new Promise(function (resolve, reject) {
        $.ajax({
          url: "test.html",
          cache: false,
          success: function(html){
            resolve( html );
          }
        });
    });
  }

  console.log("a");


  gethtml().then( function(html){
    $('#loaded').append(html);
  } );

}

module.exports = ajaxtest;