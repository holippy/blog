<?php 
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
?>

<?php 
//ページ番号取得
$paged = get_query_var( 'paged', 1 );
?>

{

"data": {
  "page": <?php echo $paged; ?>

},

"article": [
<?php if (have_posts()):
while(have_posts()): the_post(); ?>

<?php
  global $wp_query;
?>

  {
    "title": <?php echo json_encode($post->post_title); ?>,
    "content": <?php echo json_encode( wpautop( $post->post_content ) ) ; ?>,
    "url": "<?php echo get_permalink();?>",
    "date": "<?php the_time('Y.m.d'); ?>"


  <?php if($wp_query->current_post+1 != $wp_query->post_count): ?>
  },
  <?php else: ?>
  }
  <?php endif; ?>

  <?php endwhile; endif; ?>
]


}

