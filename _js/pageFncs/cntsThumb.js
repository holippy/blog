var SetHeight = require('./setHeight.js');
var app = app || {};

app.cntsThumb = {
  init(type){
    this.thumb = $('.MdCntsThumb01');
    this.thumbImgs = $('.MdCntsThumb01 img');
    this.thumbImgsLength = this.thumbImgs.length;
    this.layoutType = type;
    this.perSet = 0;
    this.imgCount  = 0;

    if( this.layoutType == 'PC' ){
      this.perSet = 4;
    }else if( this.layoutType == 'SP' ){
      this.perSet = 2;
    }

    this.imgLoading();

  },
  imgLoaded(){
    SetHeight.init({
      Elem: '.mdCntsThumb01InfoInBox .mdCntsThumb01Ttl',
      group: this.perSet
    });

    SetHeight.init({
      Elem: '.mdCntsThumb01InfoInBox .mdCntsThumb01Txt',
      group: this.perSet
    });

    SetHeight.init({
      Elem: '.MdCntsThumb01',
      group: this.perSet
    });

    for (var i = 0; i < this.thumb.length; i++) {
      this.thumbShow(this.thumb[i], i);
    }


    this.setEvnt();

  },
  imgLoading(){

    this.thumbImgs.each((i, elm)=>{
        let _img = $('<img>');

        _img.load(()=>{
          this.imgCount = this.imgCount + 1;

          if( this.imgCount === this.thumbImgsLength ){
            this.imgLoaded();
          }
        });

        _img.attr('src',$(elm).attr('src'));
    });

  },
  thumbShow( elm, index ){
    TweenMax.set(elm , {display: 'block', opacity: 0});

    setTimeout(()=>{

      TweenMax.to(elm, 1,
        {
          opacity: 1,
          ease: Power3.easeOut,
        }
      );

    },index * 200);
  },
  setEvnt(){
    this.thumb.each((i, elm)=>{
      $(elm).hover(
        ()=>{
          $(elm).addClass('ExHover01');
          $(elm).removeClass('ExHover02');
        },
        ()=>{
          $(elm).addClass('ExHover02');
          $(elm).removeClass('ExHover01');
        }
      );
    });
  }
}

module.exports = app.cntsThumb;