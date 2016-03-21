<?php 
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
?>

<?php
/*
 * Template Name: メインビジュアル
 */
?>

[
<?php $args = array(
  'posts_per_page'   => 6
);
$posts = get_posts( $args );
$counter = 0;
foreach ( $posts as $post ) :

?>

<?php
  

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

  <?php $counter = $counter + 1; ?>

  {
    "ID": "<?php echo ($post->ID); ?>",
    "title": <?php echo json_encode($post->post_title); ?>,
    "content": <?php echo json_encode(strip_tags( $post->post_content )); ?>,
    "category": "<?php echo $cat[0]->name; ?>",
    "url": "<?php echo get_permalink(); ?>",
    "date": "<?php the_time('Y.m.d'); ?>",
    "thumb": "<?php echo $imgPath; ?>",
    "counter": "<?php echo  $counter; ?>"
  <?php 

  if( $counter != 6 ){
    echo '},';
  }else{
    echo '}';
  }
   ?>
<?php endforeach; ?>
]
