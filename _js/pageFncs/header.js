var app = app || {};

app.header = {
  init( type ){


    if( type == 'PC' ){
      this.header = $('.LyHead');
      this.logo = $('.mdLogo');
      this.LyPlayer = $('.LyPlayer');
      this.logoWidth = 90;
      this.logoHeight = 70;
      this.timer;

      this.header.addClass('FncStart');

      this.eventSetPC();
    }else if( type == 'SP' ){

      this.menuBtnOpen = $('#BtnMenu');
      this.menuBtnClose = $('#BtnMenuClose');
      this.menuBody = $('.MdMenu');
      this.mdListCat = $('.mdListCat li');

      this.menuContainer = $('.LyMenu');

      this.eventSetSP();
    }

  },
  headerControl(scrollTop){
    
    var size = ( 100 - (scrollTop / 90 * 100) ) / 100,
        mgb = 20 * ( 100 - (scrollTop / 90 * 100) ) / 100,
        width = this.logoWidth * ( 100 - (scrollTop / 90 * 100) ) / 100,
        height = this.logoHeight * ( 100 - (scrollTop / 90 * 100) ) / 100,
        bgsize = ( 100 - (scrollTop / 90 * 100) );


    //プレーヤー表示時はヘッダーはそのまま
    if( this.LyPlayer.hasClass('FncView')){
      return false;
    }

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
  spMenuControl(type){

    if(type == 'open'){

      this.menuContainer.addClass('ExView');
    }

    if(type == 'close'){
      this.menuContainer.removeClass('ExView');
    }
  },
  eventSetPC(){
    $(window).on('scroll', ()=>{
      clearTimeout(this.timer);
      this.timer = setTimeout(()=>{
        this.headerControl( $(window).scrollTop() );
      }, 10);
      
    });
  },
  eventSetSP(){
    this.menuBtnOpen.on('click', (e)=>{
      e.preventDefault();
      this.spMenuControl('open');
    });

    this.menuBtnClose.on('click', (e)=>{
      e.preventDefault();
      this.spMenuControl('close');
    });

    this.mdListCat.on('click', (e)=>{
      e.preventDefault();
      this.spMenuControl('close');
    });
  }
}

module.exports = app.header;