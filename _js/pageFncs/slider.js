var app = app || {};

app.slider = {
  init(){

    this.slideCurrent = 0;
    this.targetPos = 0;
    
    this.slide = $('.MdSlideContianer');
    this.slideList = $('.mdSlideListImg');
    this.slideImgs = $('.mdSlideListImg li');
    this.slideSet = this.slideList.children().length / 3;
    this.slideImgWidth = this.slideList.children().eq(0).outerWidth();
    this.slideBtnBack = $('.mdSlideListBtnBack');
    this.slideBtnNext = $('.mdSlideListBtnNext');
    this.slidePager = $('.mdSlideListPager li');

    this.startPos;

    this.slide.addClass("FncStart");
    this.slide.css({display: 'block'});

    this.slideImgs = $('.mdSlideListImg li');
    this.slideImgsLength = this.slideImgs.length;
    this.slideCurrentIndex = this.slideSet;
    this.slidePager.eq( this.slideCurrent ).addClass('ExCurrent');

    this.slideImgs.eq( this.slideCurrentIndex ).addClass('ExCurrent');

    this.slideList.css({
      width: this.slideImgsLength * this.slideImgWidth
    });

    this.posSet();
    this.evntSet();
    this.autoPlay();

  },
  unmount(){
    clearInterval(this.intervalTimer);

    $(window).off('resize');

    if( this.slidePager === undefined ){
      return false;
    }

    this.slidePager.each((i, elm)=>{
      $(elm).off('click');
    });

    this.slideBtnBack.off('click');

    this.slideBtnNext.off('click');

  },
  posSet(){
    this.slideList.css({
      left: (- this.slideImgWidth * this.slideSet) + ( $(window).width() / 2 - this.slideImgWidth / 2 ) - 5
    });

    this.startPos = (- this.slideImgWidth * this.slideSet) + ( $(window).width() / 2 - this.slideImgWidth / 2 ) - 5;
  },
  reset(){
    this.slideList.css({left: this.startPos});
    this.slideCurrent = 0;
    this.slideCurrentIndex = this.slideSet;
    this.slideImgs.removeAttr('class');
    this.slideImgs.eq( this.slideCurrentIndex ).addClass('ExCurrent');
    this.slidePager.removeClass('ExCurrent');
    this.slidePager.eq( 0 ).addClass('ExCurrent');
  },
  infoShow(){
    this.slideImgs.eq( this.slideCurrentIndex ).removeClass('ExHide');
    this.slideImgs.eq( this.slideCurrentIndex ).addClass('ExCurrent');
  },
  slideBack(){

    this.targetPos = this.startPos - this.slideImgWidth * this.slideCurrent;

    TweenMax.to(this.slideList, 1, 
      {
        left: this.targetPos, 
        ease: Power3.easeOut,
        onUpdate: (tween)=>{
          if( this.slideList.position().left >= this.startPos + this.slideImgWidth * this.slideSet ){

            this.reset();

            if( this.targetPos > this.startPos + this.slideImgWidth * this.slideSet ){
              TweenMax.killTweensOf(this.slideList);
              clearTimeout(this.timeoutTimer);
              this.btnBackControl();
            }
          }
        },
        onComplete: ()=>{
          this.infoShow();
        }
      }
    );
  },
  slideNext(){

    this.targetPos = this.startPos - this.slideImgWidth * this.slideCurrent;
    
    TweenMax.to(this.slideList, 1, 
      {
        left: this.targetPos, 
        ease: Power3.easeOut,
        onUpdate: (tween)=>{
          if( this.slideList.position().left <= this.startPos - this.slideImgWidth * this.slideSet ){

            
            this.reset();

            if( this.targetPos < this.startPos - this.slideImgWidth * this.slideSet ){
              TweenMax.killTweensOf(this.slideList);
              clearTimeout(this.timeoutTimer);
              this.btnNextControl();
            }
          }
        },
        onComplete: ()=>{
          this.infoShow();
        }
      }
    );
  },
  autoPlay(){
    this.timer;

    this.intervalTimer = setInterval(()=>{
      if( this.slideCurrent + 1 === this.slidePager.length ){
        this.pagerControl( this.slideCurrent + 1, this.slidePager.eq(0) )
      }else{
        this.pagerControl( this.slideCurrent + 1, this.slidePager.eq( this.slideCurrent + 1 ) );
      }
      
    }, 5000);

  },
  pagerControl(i, elm){
    clearInterval(this.intervalTimer);
    clearTimeout(this.timeoutTimer);
    this.slidePager.removeClass('ExCurrent');
    $(elm).addClass('ExCurrent');
    this.slideCurrent = i;
    this.slideImgs.eq( this.slideCurrentIndex ).removeClass('ExCurrent');
    this.slideImgs.eq( this.slideCurrentIndex ).addClass('ExHide');
    this.slideCurrentIndex = this.slideSet + i;
    this.slideNext();

    this.timeoutTimer = setTimeout(()=>{
      this.autoPlay();
    },5000);
  },
  btnNextControl(){
    clearInterval(this.intervalTimer);
    clearTimeout(this.timeoutTimer);
    this.slideCurrent = this.slideCurrent + 1;
    this.slidePager.removeClass('ExCurrent');

    if( this.slideCurrent === this.slidePager.length ){
      this.slidePager.eq( 0 ).addClass('ExCurrent');
    }else{
      this.slidePager.eq( this.slideCurrent ).addClass('ExCurrent');
    }

    if( this.slideImgs.eq( this.slideCurrentIndex ).hasClass('ExCurrent') ){
      this.slideImgs.eq( this.slideCurrentIndex ).addClass('ExHide');
    }

    this.slideImgs.eq( this.slideCurrentIndex ).removeClass('ExCurrent');
    this.slideNext();
    this.slideCurrentIndex = this.slideCurrentIndex + 1;

    this.timeoutTimer = setTimeout(()=>{
      this.autoPlay();
    },5000);
  },
  btnBackControl(){
    clearInterval(this.intervalTimer);
    clearTimeout(this.timeoutTimer);
    this.slideCurrent = this.slideCurrent - 1;
    this.slidePager.removeClass('ExCurrent');

    if( this.slideCurrent === - this.slidePager.length - 1 ){
      this.slidePager.eq( -1 ).addClass('ExCurrent');
    }else{
      this.slidePager.eq( this.slideCurrent ).addClass('ExCurrent');
    }
    
    if( this.slideImgs.eq( this.slideCurrentIndex ).hasClass('ExCurrent') ){
      this.slideImgs.eq( this.slideCurrentIndex ).addClass('ExHide');
    }

    this.slideImgs.eq( this.slideCurrentIndex ).removeClass('ExCurrent');
    this.slideBack();
    this.slideCurrentIndex = this.slideCurrentIndex - 1;

    this.timeoutTimer = setTimeout(()=>{
      this.autoPlay();
    },5000);
  },
  evntSet(){

    $(window).on('resize', ()=>{
      this.posSet();
      this.reset();
    });

    this.slidePager.each((i, elm)=>{
      $(elm).on('click', (e)=>{
        e.preventDefault();
        if( !$(elm).hasClass('ExCurrent') ){
          clearInterval(this.intervalTimer);
          clearTimeout(this.timeoutTimer);
          this.pagerControl(i, elm);
        }
      });
    });

    this.slideBtnBack.on('click', (e)=>{
      e.preventDefault();
      this.btnBackControl();
    });

    this.slideBtnNext.on('click', (e)=>{
      e.preventDefault();
      this.btnNextControl();
    });

    this.slideBtnNext.hover(
      ()=>{
        this.slideBtnNext.addClass('ExHover01');
        this.slideBtnNext.removeClass('ExHover02');
      },
      ()=>{
        this.slideBtnNext.addClass('ExHover02');
        this.slideBtnNext.removeClass('ExHover01');
      }
    );

    this.slideBtnBack.hover(
      ()=>{
        this.slideBtnBack.addClass('ExHover01');
        this.slideBtnBack.removeClass('ExHover02');
      },
      ()=>{
        this.slideBtnBack.addClass('ExHover02');
        this.slideBtnBack.removeClass('ExHover01');
      }
    );
  }
}

module.exports = app.slider;