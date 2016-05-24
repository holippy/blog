<?php 

//パラメータ取得
$type = get_query_var( 'type', index );
$paged = get_query_var( 'paged', 0 );
$pager = get_query_var( 'pager', false );

?>

<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Indoor Living</title>
    <meta name="description" content="">
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
  </head>
  <body>

  <div class="LyHead" style="opacity:1;">
    <header class="MdHead">
      <h1 class="mdLogo">Indoor Living</h1>
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

  <script src="/assets/js/lib.js"></script>
  <script src="/assets/js/app.js"></script>
  </body>
</html>