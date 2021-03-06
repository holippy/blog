<?php 
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
?>

<?php 
//ページ番号取得
$paged = get_query_var( 'paged', 1 );
$catInfo = get_category( $cat );
$catSlug = $catInfo->slug;
$catName = $catInfo->name;
?>

{
"slug": "<?php echo $catSlug; ?>",
"name": "<?php echo $catName; ?>",
"page": {
  "nowPage": <?php echo $paged; ?>,
  "maxPage": <?php echo max_show_page_number(); ?>
},

"article": [
<?php if (have_posts()):
while(have_posts()): the_post(); ?>

<?php
  global $wp_query;

  //カテゴリ情報
  $cat = get_the_category( $post->ID);

  $imgPath = '';

  if( get_field('thumbImg') ){
    $imgPath = get_field('thumbImg');

  }else if ( has_post_thumbnail() ) {

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

  <?php if($wp_query->current_post+1 != $wp_query->post_count): ?>
  },
  <?php else: ?>
  }
  <?php endif; ?>

  <?php endwhile; endif; ?>
]


}