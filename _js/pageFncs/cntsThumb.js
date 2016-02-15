var app = app || {};

app.cntsThumb = {
  init(){
    this.thumb = $('.MdCntsThumb01');
    this.setEvnt();
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