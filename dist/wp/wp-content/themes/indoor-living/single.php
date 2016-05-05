<?php 
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
?>

<?php
if (have_posts()) :
  while (have_posts()) :
    the_post();
?>

<?php 

//投稿日
$date = get_the_date("Y/n/j/");

//タイトル
$title = get_the_title();

//カテゴリ
$category = get_the_category();

//カテゴリ名
$catName = $category[0] -> name;

//スラッグ
$catSlug = $category[0] -> slug;

//アイキャッチ画像
$imgPath = '';

if (has_post_thumbnail() )  {

  //アイキャッチ IDを取得して画像の「URL,横幅,高さ」を取得。
  //画像サイズは medium で出力しています。
  $image_url = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'large');

  
  //URLを返す
  $imgPath = $image_url[0];
  
}

//コンテンツ
$contents = get_the_content();

//コンテンツからh2を抽出
preg_match_all('/<h2>(.+?)<\/h2>/', $contents, $match);

//h2タグを除去
strip_tags($match);

$hdg2 = '';

//h2のテキストを配列に
for ($i=0; $i < count($match[1]); $i++) {
  if( $i != count($match[1]) - 1 ){
    $hdg2 = $hdg2.json_encode($match[1][$i]).',';
  }else{
    $hdg2 = $hdg2.json_encode($match[1][$i]);
  }
}

?>

<?php endwhile;endif;?>

{
  "title": "<?php echo $title; ?>",
  "date": "<?php echo $date; ?>",
  "catName": "<?php echo $catName; ?>",
  "catSlug": "<?php echo $catSlug; ?>",
  "visual": "<?php echo $imgPath; ?>",
  "contents": <?php echo json_encode( get_the_content() ) ; ?>,
  "hdg2": [<?php echo $hdg2; ?>],
  "related": [

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
?>

<?php

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

  {
    "ID": "<?php echo ($post->ID); ?>",
    "title": <?php echo json_encode($post->post_title); ?>,
    "content": <?php echo json_encode(textCut(strip_tags( $post->post_content ))); ?>,
    "category": "<?php echo $cat[0]->name; ?>",
    "url": "<?php echo get_permalink(); ?>",
    "date": "<?php the_time('Y.m.d'); ?>",
    "thumb": "<?php echo $imgPath; ?>"

  <?php if($num < $articleCount): ?>
  },
  <?php else: ?>
  }
  <?php endif; ?>

<?php 
  endforeach;
  wp_reset_postdata();
?>

  ]
}

