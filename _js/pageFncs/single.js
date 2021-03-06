var app = app || {};

app.single = {
  init(){
    this.hdg = $('.mdCms h2');
    this.aside = $('.mdAside');
    this.asideHeight = this.aside.height();
    this.asideLink = $('.MdListAnc01 li');
    this.mv = $('.MdMvSingle01');
    this.cntsBody = $('.MdMainSingle01');
    this.cntsBodyHeight;
    this.mvTop;
    this.hdgPos = [];
    this.mainImgs = $('.mdMain img');
    this.mainImgsLength = this.mainImgs.length;
    this.imgCount = 0;
    this.imgLoadFlag = false;

    if( this.mainImgs.length > 0 ){
      this.imgLoading();
    }else{
      this.setEvnt();
    }

  },
  headerControl(scrollTop){


  },
  imgLoading(){

    this.mainImgs.each((i, elm)=>{
        let _img = $('<img>');

        _img.load(()=>{
          this.imgCount = this.imgCount + 1;

          if( this.imgCount === this.mainImgsLength ){



            this.setEvnt();
          }
        });

        _img.attr('src',$(elm).attr('src'));
    });

  },
  setEvnt(){

    this.cntsBodyHeight = this.cntsBody.height();
    this.mvTop = this.mv.height() - 40;

    this.hdg.each(( i, elm )=>{
      $(elm).attr('id', 'hdg' + ( i + 1) );
      this.hdgPos.push($(elm).position().top - 200);
    });

    this.asideLink.each(( i, elm )=>{

      $(elm).on('click', (e)=>{
        e.preventDefault();
        TweenLite.to( window, 1,
          {scrollTo:{y: this.hdgPos[i]}, ease:Power2.easeOut});
      });
    });

    $(window).on('scroll', ()=>{

      if( $(window).scrollTop() > this.mvTop + this.cntsBodyHeight - this.asideHeight ){
        this.aside.css({
          position: 'absolute',
          top: this.mvTop + 40 + this.cntsBodyHeight - this.asideHeight
        });

        this.aside.removeClass('FncFixed');

        return true;
      }

      if( $(window).scrollTop() >= this.mvTop && !this.aside.hasClass('FncFixed') ){
        this.aside.css({
          position: 'fixed',
          top: 80
        });
        this.aside.addClass('FncFixed');
      }else if( $(window).scrollTop() <= this.mvTop && this.aside.hasClass('FncFixed') ){
        this.aside.css({
          position: 'static',
          top: 'auto'
        });
        this.aside.removeClass('FncFixed');
      }

    });
  }
}

module.exports = app.single;