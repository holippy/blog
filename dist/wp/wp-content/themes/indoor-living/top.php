<?php
header("HTTP/1.1 200");
require_once "ua.class.php";
?>

<?php 

$ua = new UserAgent();
$uaType = $ua->set();

//パラメータ取得
$type = $_GET["type"];
$paged = $_GET["paged"];
$pager = $_GET["pager"];

if( $type == '' ){
  $type = 'index';
}

if( $paged == '' ){
  $paged = 1;
}

//ぺージ分割
$perPage = 8;

//meta

if( $type == 'index' ){
  
  $description = 'Indoor LinvingではArtek、広松木工、VitraなどのインテリアからFUJIFILM X-E1で撮影した写真までライフスタイルにスポットを当てたブログです';
  $pageName = 'Indoor Living';

} else if( $type == 'single' ) {

  $post = get_post( $paged );

  if( $post == '' ){
    header('Location: /');
  }

  //投稿日
  $date = get_the_date("Y/n/j", $paged);

  //タイトル
  $title = get_the_title($paged);

  //カテゴリ
  $category = get_the_category($paged);

  //カテゴリ名
  $catName = $category[0] -> name;

  //スラッグ
  $catSlug = $category[0] -> slug;

  //アイキャッチ画像
  $imgPath = '';

  if (has_post_thumbnail($paged) )  {

    //アイキャッチ IDを取得して画像の「URL,横幅,高さ」を取得。
    //画像サイズは medium で出力しています。
    $image_url = wp_get_attachment_image_src(get_post_thumbnail_id($paged), 'large');
    
    //URLを返す
    $imgPath = $image_url[0];
    
  }

  //コンテンツ
  $contents = $post -> post_content;

  //コンテンツからh2を抽出
  preg_match_all('/<h2>(.+?)<\/h2>/', $contents, $match);

  //h2タグを除去
  strip_tags($match);

  $hdg2 = array();

  //h2のテキストを配列に
  for ($i=0; $i < count($match[1]); $i++) {
    array_push($hdg2, $match[1][$i]);
  }

  $description = get_the_excerpt($paged);
  $pageName = $title.' | Indoor Living';

} else if( $type == 'category' ) {

  $cat_all = get_terms( "category", "hide_empty=true" );
  $length = count($cat_all);

  for ($i = 1; $i < $length+1; $i++){
    if( $cat_all[$i]->slug == $paged ){
      $pageName = $cat_all[$i]->name.' | Indoor Living';
      $categoryName = $cat_all[$i]->name;
      $categoryID = $cat_all[$i]->term_id;
    }
  }


}else{
  header('Location: /');
}

?>

<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" type="image/x-icon" href="/assets/img/favicon.ico">
    <title><?php echo $pageName; ?></title>
    <meta name="description" content="<?php echo $description; ?>">
    <meta name="keywords" content="">
    <meta name="author" content="">
    <meta property="og:title" content="">
    <meta property="og:type" content="website">
    <meta property="og:url" content="">
    <meta property="og:image" content="">
    <meta property="og:site_name" content="">
    <meta property="og:description" content="">
    <meta property="fb:app_id" content="">
    <link rel="stylesheet" href="/assets/css/layout.css">

    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      
      ga('create', 'UA-77747096-1', 'auto');
      ga('send', 'pageview');
      
    </script> 
  </head>
  <?php 
    /*=============================

    UA判定
    
    =============================*/
    if( $uaType !== 'others' ):
  ?>
  <body class="LySP">
  <?php else: ?>
  <body>
  <?php endif; ?>

  <div id="MdLoading">
    <div>
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>

  <div id="Main" >

  <?php 
    /*=============================

    ナビゲーション
    
    =============================*/

    if( $uaType !== 'others' ):
  ?>

    <?php 
      /*=============================

      SP用ナビゲーション
      
      =============================*/
    ?>
    <div class="LyHead" style="opacity: 1;">
      <header class="MdHead">
        <p class="mdLogo"><a href="#">Indoor Living</a></p>
        <p id="BtnMenu" class="mdBtnMenu"><a href="#"></a></p>
      </header>
    </div>

    <div class="LyMenu">
    <div class="MdMenu">
    <p id="BtnMenuClose" class="mdBtnClose"><a href="#">CLOSE</a></p>
    <p class="MdHdgCmn01"><span>Categories</span></p>
    <ul class="mdListCat">
    <?php
      $cat_all = get_terms( "category", "hide_empty=true" );
      $length = count($cat_all);

      for ($i = 1; $i < $length+1; $i++):
    ?>
      <li><a href="?type=category&amp;paged=<?php echo $cat_all[$i]->slug; ?>"><?php echo $cat_all[$i]->name;?><span class="icon-icon04"></span></a></li>
    <?php endfor; ?>
    </ul>
    </div>
    </div>
  <?php else: ?>

    <?php 
      /*=============================

      用ナビゲーション
      
      =============================*/
    ?>

    <div class="LyHead" style="opacity:1;">
      <header class="MdHead">
        <p class="mdLogo">Indoor Living</p>
        <nav id="Gnav" class="MdGNV">
          <ul>
          <?php
            $cat_all = get_terms( "category", "hide_empty=true" );
            $length = count($cat_all);

            for ($i = 1; $i < $length+1; $i++):
          ?>
            <li><span class="icon-icon05"></span><a href="?type=category&amp;paged=<?php echo $cat_all[$i]->slug; ?>"><?php echo $cat_all[$i]->name;?></a></li>
          <?php endfor; ?>
          </ul>
        </nav>
        <form method="post" action="#" class="MdSearch">
          <input type="text">
          <button type="submit" class="icon-icon_search"></button>
        </form>
      </header>
    </div>

  <?php endif; ?>



    
    <?php
      /*=============================

      トップページ
      
      =============================*/
      if( $type == 'index' ):
    ?>
    <div class="MdSlideContianer">
      <ul class="mdSlideListImg">
        <?php 

        $args = array(
          'posts_per_page'   => 6
        );

        $posts = get_posts( $args );
        $counter = 0;
        foreach ( $posts as $post ) :

          //カテゴリ情報
          $cat = get_the_category( $post->ID);

          $imgPath = '';

          //カテゴリ情報
          $cat = get_the_category( $post->ID);

          $imgPath = '';

          if (has_post_thumbnail() )  {

            //アイキャッチ IDを取得して画像の「URL,横幅,高さ」を取得。
            //画像サイズは medium で出力しています。
            $image_url = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'large');

            
            //URLを返す
            $imgPath = $image_url[0];
            
          }

        ?>
        <?php

        ?>
        <li><a href="/?type=single&amp;paged=<?php echo ($post->ID); ?>">
            <p class="mdSlideCat"><?php echo $cat[0]->name; ?></p>
            <p class="mdSlideTtl"><span><?php echo $post->post_title; ?></span></p>
            <p class="mdSlideImg"><img src="<?php echo ($imgPath); ?>"></p></a>
        </li>
        <?php endforeach; ?>
      </ul>
      <ul class="mdSlideListPager">
        <?php
          foreach ( $posts as $post ) :
        ?>
        <li><a href="#" class="icon-icon01"></a></li>
       <?php endforeach; ?>
      </ul>
      <ul class="mdSlideListBtn">
        <li class="mdSlideListBtnBack"><a href="#" class="icon-icon02"></a></li>
        <li class="mdSlideListBtnNext"><a href="#" class="icon-icon04"></a></li>
      </ul>
    </div>

    <?php 

      //ぺージ数取得

      $numposts = $wpdb->get_var("SELECT count(*) FROM $wpdb->posts WHERE post_status = 'publish' AND post_type = 'post'");

      if (0 < $numposts){
        $numposts = number_format($numposts);
      }

      define('C_PAGE_IN_COUNT', $perPage); // 1ページ辺りの表示件数
      $TotalItemCount = $numposts;  // 全商品数
       
      $TotalPageCount = (int)ceil($TotalItemCount / C_PAGE_IN_COUNT); // 全ページ数

    ?>


    <div class="LyCntsList">
    <?php 

      $args = array(
        'posts_per_page' => $perPage,
        'offset'=> ($perPage * ( $paged -1 ) )
      );
      $posts = get_posts( $args );
      $counter = 0;

      foreach ( $posts as $post ) :

        //カテゴリ情報
        $cat = get_the_category( $post->ID);

        $imgPath = '';

        if (has_post_thumbnail() )  {

          //アイキャッチ IDを取得して画像の「URL,横幅,高さ」を取得。
          //画像サイズは medium で出力しています。
          $image_url = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'medium');

          
          //URLを返す
          $imgPath = $image_url[0];
          
        }
    ?>


    <section class="MdCntsThumb01 ExHover02">
    <a href="?type=single&amp;paged=<?php echo ($post->ID); ?>">
    <p class="mdCntsThumb01Img"><img src="<?php echo $imgPath; ?>" alt=""></p>
    <div class="mdCntsThumb01InfoClm"><div class="mdCntsThumb01Clm01"><p class="mdCntsThumb01Cat"><?php echo $cat[0]->name; ?></p>
    </div>
    <div class="mdCntsThumb01Clm02"><p class="mdCntsThumb01Date"><?php the_time('Y.m.d'); ?></p></div>
    </div>
    <div class="mdCntsThumb01InfoInBox">
    <h2 class="mdCntsThumb01Ttl"><?php echo $post->post_title ?></h2>
    <p class="mdCntsThumb01Txt"><?php echo textCut(strip_tags( $post->post_content )); ?></p>
    </div>
    <p class="mdCntsThumb01Icn"><span class="icon-icon04"></span></p>
    <div class="mdCntsThumb01Cover"><p class="mdCntsThumb01Txt">Read More</p></div>
    </a>
    </section>

    <?php endforeach; ?>

    </div>

    <?php if( $TotalPageCount > $perPage ): ?>
    <ul class="MdPager01">
    <?php for ($i=0; $i < $TotalPageCount; $i++): ?>

    <li <?php if( $i == $paged - 1 ){ echo 'class="ExStay"'; } ?> ><a href="?type=index&amp;paged=<?php echo ($i + 1); ?>&amp;pager=true"><?php echo ($i + 1); ?></a></li>
     
    <?php endfor; ?>
    </ul>
    <?php endif; ?>


  <?php
    /*=============================

    トップページおわり
    
    =============================*/
    endif;
  ?>

  <?php
    /*=============================

    詳細ぺージ
    
    =============================*/
    if( $type == 'single' ):
  ?>

    <div class="MdMvSingle01"><img src="<?php echo $imgPath; ?>" alt="<?php echo $title; ?>"></div>

    <section class="MdMainSingle01">
      <div class="mdContainer">
        <main class="mdMain">
          <div class="MdCntsData01">
            <p class="mdDate"><?php echo $date; ?></p>
            <p class="mdCat"><a><?php echo $catName; ?></a></p>
          </div>
          <h1 class="MdTtlSingle01"><?php echo $title; ?></h1>
          <div class="mdCms" >
            <?php echo $contents; ?>
          </div>
        </main>

        <aside class="mdAside">
          <p class="MdTtlOutline">Outline</p>

          <ul class="MdListAnc01">
            <?php for ($j=0; $j < count($hdg2); $j++): ?>
              <li>
              <span class="icon-icon04"></span>
              <a href="#"><?php echo $hdg2[$j]; ?></a>
              </li>
            <?php endfor; ?>

          </ul>
        </aside>
      </div>
    </section>

    <section>
      <h2 class="MdHdgCmn01"><span>Related Contents</span></h2>

      <div class="LyCntsList">
      <?php
        $args = array(
          'category_name' => $catName,
          'posts_per_page' => 8,
          'post__not_in'=> array(get_the_ID())
        );
        $the_query = get_posts( $args );

        $articleCount = count($the_query);
        $num = 0;


        foreach ( $the_query as $post ) : setup_postdata( $post );

          $num = $num + 1;

          //カテゴリ情報
          $cat = get_the_category( $post->ID);

          $imgPath = '';

          if (has_post_thumbnail() )  {

            //アイキャッチ IDを取得して画像の「URL,横幅,高さ」を取得。
            //画像サイズは medium で出力しています。
            $image_url = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'medium');

            
            //URLを返す
            $imgPath = $image_url[0];
            
          }
      ?>

      <section class="MdCntsThumb01 ExHover02">
      <a href="?type=single&amp;paged=<?php echo ($post->ID); ?>">
      <p class="mdCntsThumb01Img"><img src="<?php echo $imgPath; ?>"></p>
      <div class="mdCntsThumb01InfoClm"><div class="mdCntsThumb01Clm01"><p class="mdCntsThumb01Cat"><?php echo $cat[0]->name; ?></p>
      </div>
      <div class="mdCntsThumb01Clm02"><p class="mdCntsThumb01Date"><?php the_time('Y.m.d'); ?></p></div>
      </div>
      <div class="mdCntsThumb01InfoInBox">
      <h2 class="mdCntsThumb01Ttl"><?php echo $post->post_title ?></h2>
      <p class="mdCntsThumb01Txt"><?php echo textCut(strip_tags( $post->post_content )); ?></p>
      </div>
      <p class="mdCntsThumb01Icn"><span class="icon-icon04"></span></p>
      <div class="mdCntsThumb01Cover"><p class="mdCntsThumb01Txt">Read More</p></div>
      </a>
      </section>


      <?php 
        endforeach;
        wp_reset_postdata();
      ?>

      </div>
    </section>

  <?php
    /*=============================

    詳細ぺージおわり
    
    =============================*/
    endif;
  ?>

  <?php
    /*=============================

    カテゴリぺージ
    
    =============================*/
    if( $type == 'category' ):
  ?>

  <section data-reactid=".0.1">
  <div class="MdCatImg01">
  <p class="mdImg Ex<?php echo $categoryName; ?>"><?php echo $categoryName; ?></p>
  </div>

  <h1 class="MdHdgCmn01"><span><?php echo $categoryName; ?></span></h1>

  <div class="LyCntsList">
  <?php 

    $args = array(
      'posts_per_page' => $perPage,
      'category' => $categoryID
    );
    $posts = get_posts( $args );
    $counter = 0;
    foreach ( $posts as $post ) :

      $num = $num + 1;

      //カテゴリ情報
      $cat = get_the_category( $post->ID);

      $imgPath = '';

      if (has_post_thumbnail() )  {

        //アイキャッチ IDを取得して画像の「URL,横幅,高さ」を取得。
        //画像サイズは medium で出力しています。
        $image_url = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'medium');

        
        //URLを返す
        $imgPath = $image_url[0];
        
      }
  ?>

    <section class="MdCntsThumb01 ExHover02">
    <a href="?type=single&amp;paged=<?php echo ($post->ID); ?>">
    <p class="mdCntsThumb01Img"><img src="<?php echo $imgPath; ?>"></p>
    <div class="mdCntsThumb01InfoClm"><div class="mdCntsThumb01Clm01"><p class="mdCntsThumb01Cat"><?php echo $cat[0]->name; ?></p>
    </div>
    <div class="mdCntsThumb01Clm02"><p class="mdCntsThumb01Date"><?php the_time('Y.m.d'); ?></p></div>
    </div>
    <div class="mdCntsThumb01InfoInBox">
    <h2 class="mdCntsThumb01Ttl"><?php echo $post->post_title ?></h2>
    <p class="mdCntsThumb01Txt"><?php echo textCut(strip_tags( $post->post_content )); ?></p>
    </div>
    <p class="mdCntsThumb01Icn"><span class="icon-icon04"></span></p>
    <div class="mdCntsThumb01Cover"><p class="mdCntsThumb01Txt">Read More</p></div>
    </a>
    </section>

  <?php endforeach; ?>

  </div>

  <ul class="MdPager01">
    <li><a href="#">1</a></li>
  </ul>

  </section>

  <?php
    /*=============================

    カテゴリぺージおわり
    
    =============================*/
    endif;
  ?>

  </div>

  <div class="LyFtr" style="position: static; bottom: 0px; opacity: 1;">
    <footer class="MdFtr">
      <p class="mdFtrCopyright">Copyright © 2016 Indoor Living All right reserved.</p>
    </footer>
  </div>

  <script src="/assets/js/lib.js"></script>
  <script src="/assets/js/slick.js"></script>
  <script src="/assets/js/app.js"></script>

  </body>
</html>