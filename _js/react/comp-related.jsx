var Related = React.createClass({
  thumbClick( ID ){
    console.log('related' + ID);
    this.props.thumbClick(ID);
  },

  render(){

    var article = this.props.article.map((res, i)=>{
      return (
          <section key={i} className="MdCntsThumb01"><a onClick={this.thumbClick.bind(this, res.ID)} href={'?type=single&paged=' + res.ID}>
              <p className="mdCntsThumb01Img"><img src={res.thumb} /></p>
              <div className="mdCntsThumb01InfoClm">
                <div className="mdCntsThumb01Clm01">
                  <p className="mdCntsThumb01Cat">{res.category}</p>
                </div>
                <div className="mdCntsThumb01Clm02">
                  <p className="mdCntsThumb01Date">{res.date}</p>
                </div>
              </div>
              <div className="mdCntsThumb01InfoInBox">
                <h2 className="mdCntsThumb01Ttl">{res.title}</h2>
                <p className="mdCntsThumb01Txt">{res.content}</p>
              </div>
              <p className="mdCntsThumb01Icn"><span className="icon-icon04"></span></p>
              <div className="mdCntsThumb01Cover">
                <p className="mdCntsThumb01Txt">Read More</p>
              </div></a>
          </section>
        );
    });

    return (
      <section>
      <h2 className="MdHdgCmn01"><span>Related Contents</span></h2>
      <div className="LyCntsList">
      {article}
      </div>
      </section>
    );

  }
});


module.exports = Related;