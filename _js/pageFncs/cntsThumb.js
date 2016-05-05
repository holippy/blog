var SetHeight = require('./setHeight.js');
var app = app || {};

app.cntsThumb = {
  init(){
    this.thumb = $('.MdCntsThumb01');

    for (var i = 0; i < this.thumb.length; i++) {
      this.thumbShow(this.thumb[i], i);
    }

    SetHeight.init({
      Elem: '.mdCntsThumb01InfoInBox .mdCntsThumb01Ttl',
      group: 4
    });

    SetHeight.init({
      Elem: '.mdCntsThumb01InfoInBox .mdCntsThumb01Txt',
      group: 4
    });

    SetHeight.init({
      Elem: '.MdCntsThumb01',
      group: 4
    });

    this.setEvnt();
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