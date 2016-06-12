var app = app || {};

app.music = {
  init( callback ){
    this.LyPlayer = $('.LyPlayer');
    this.MdPlayer = $('.MdPlayer');
    this.Ttl = $('.mdPlayerTtlInner');
    this.BtnOpen = $('#FncPlayerOpen');
    this.BtnClose = $('#FncPlayerClose');
    this.BtnMore = $('#FncPlayMore');
    this.Header = $('.LyHead');
    this.Footer = $('.LyFtr');
    this.callback = callback;
    this.scrollTopOrigin;
    this.Timer;


    this.viewControl();
    this.btnPosition();
  },
  viewPlayer(){
    var d = new $.Deferred;

    TweenMax.set(this.MdPlayer, {opacity:0, display:'block', y: $(window).height()});

    TweenMax.to(this.MdPlayer, 0.5, 
      {
        opacity: 1,
        y: 0,
        ease: Power3.easeOut,
        onComplete: ()=>{
          d.resolve();
        }
      }
    );

    return d.promise();
  },
  hidePlayer(){
    var d = new $.Deferred;

    TweenMax.to(this.MdPlayer, 0.5, 
      {
        opacity: 0,
        y: $(window).height(),
        ease: Power3.easeOut,
        onComplete: ()=>{
          TweenMax.set(this.MdPlayer, {opacity:0, display:'none'});
          d.resolve();
        }
      }
    );

    return d.promise();
  },
  viewBg(){
    var d = new $.Deferred;

    TweenMax.set(this.LyPlayer, {opacity:0, display:'block'});

    TweenMax.to(this.LyPlayer, 0.5, 
      {
        opacity: 1, 
        ease: Power3.easeOut,
        onComplete: ()=>{
          d.resolve();
        }
      }
    );

    return d.promise();
  },
  hideBg(){
    var d = new $.Deferred;

    TweenMax.to(this.LyPlayer, 0.5, 
      {
        opacity: 0, 
        ease: Power3.easeOut,
        onComplete: ()=>{
          TweenMax.set(this.LyPlayer, {display:'none'});
          d.resolve();
        }
      }
    );

    return d.promise();
  },
  setBtnPosition(){
      if( $(window).scrollTop() +$(window).height() > this.Footer.offset().top){
        TweenMax.set(this.BtnOpen, {position:'absolute',top: -60, bottom: 'auto'});
      }else{
        TweenMax.set(this.BtnOpen, {position:'fixed',top: 'auto', bottom: -10});
      }
  },
  btnPosition(){
    $(window).on('scroll', ()=>{
      clearTimeout( this.Timer );
      this.Timer = setTimeout(()=>{
        this.setBtnPosition();
      },10);
    });
  },
  viewControl(){
    
    this.BtnOpen.on('click',(e)=>{
      e.preventDefault();

      this.LyPlayer.addClass('FncView');

      this.scrollTopOrigin = $(window).scrollTop();

      TweenMax.set($('#Wrapper'), { top: -$(window).scrollTop(), position:'fixed',width:'100%' });

      this.viewBg()
      .then(()=>{
        return this.viewPlayer();
      })
      .then(()=>{

        this.MdPlayer.removeAttr('style');
        this.MdPlayer.addClass('FncView');

        if( $('.mdPlayerIframe').length == 0 ){
          this.callback();
        }
      });
    });

    this.BtnMore.on('click', (e)=>{
      e.preventDefault();
    });

    this.BtnClose.on('click', (e)=>{
      e.preventDefault();

      this.hidePlayer()
      .then(()=>{
        return this.hideBg();
      })
      .then(()=>{

        TweenMax.set($('#Wrapper'), { top: 'auto', position:'static',width:'100%' });
        $(window).scrollTop( this.scrollTopOrigin );

        if( $(window).scrollTop() > 45 ) {
          this.Header.addClass('ExFixed');
        }

        this.LyPlayer.removeClass('FncView');
        
        this.setBtnPosition();

      });
    });

    this.BtnOpen.hover(
      ()=>{
        this.BtnOpen.addClass('FncHover');
        this.BtnOpen.removeClass('FncOut');
      },
      ()=>{
        this.BtnOpen.addClass('FncOut');
        this.BtnOpen.removeClass('FncHover');
      }
    );
  },

}

module.exports = app.music;