var app = app || {};

app.SetHeight = {
  init: function( options ){

    var self = this;

    console.log(options);

    self.items = $(options.Elem);
    self.heights = [];
    self.group = options.group;

    self.items.css({
        height: ''
    });

    for (var i = 0; i < self.items.length; i++) {

      self.heights.push(self.items.eq(i).height());

      if( (i+1) % self.group === 0 ){
        self.action({
          start: (i+1) - this.group,
          end: i+1
        });
      } else if( i === self.items.length - 1 ){
       self.action({
          start: self.items.length - self.items.length % self.group,
          end: self.items.length
        });
      }
    }
  },
  action: function( options ){

    var self = this;

    self.sort();

    self.setHeight({
        start: options.start,
        end: options.end,
        height: self.heights[0]
    });

    self.heights = [];
  },
  sort: function(){
    var self = this;

    this.heights.sort(
      function(a,b){
        if( a > b ) return -1;
        if( a < b ) return 1;
        return 0;
      }
    );
  },
  setHeight: function( options ){
    var self = this;

    for (var i = options.start; i < options.end; i++){
      self.items.eq(i).css({
          height: options.height
      });
    }
  }
};

module.exports = app.SetHeight;