var app = app || {};

app.header = {
  init(){
    this.header = $('.LyHead');
    this.logo = $('.mdLogo');
    this.logoWidth = 90;
    this.logoHeight = 70;

    this.header.addClass('FncStart');

    this.eventSet();
  },
  headerControl(scrollTop){
    
    var size = ( 100 - (scrollTop / 90 * 100) ) / 100,
        mgb = 20 * ( 100 - (scrollTop / 90 * 100) ) / 100,
        width = this.logoWidth * ( 100 - (scrollTop / 90 * 100) ) / 100,
        height = this.logoHeight * ( 100 - (scrollTop / 90 * 100) ) / 100,
        bgsize = ( 100 - (scrollTop / 90 * 100) );

    if( scrollTop < 45 ){
      TweenMax.set(this.logo , {
        'width': width,
        'height': height,
        'margin-bottom': mgb,
        '-webkit-transform': 'scale('+size+')'
      });
      
      TweenMax.set(this.header , {
        'height': 130 - scrollTop
      });
    }



    if( scrollTop > 45 ){
      this.header.addClass('ExFixed');
      TweenMax.set(this.header , {
        'height': 'auto'
      });
      this.logo.removeAttr('style');
    }else if( scrollTop < 45 ){
      this.header.removeClass('ExFixed');
    }

  },
  eventSet(){
    $(window).on('scroll', ()=>{
      this.headerControl( $(window).scrollTop() );
    });
  }
}

module.exports = app.header;