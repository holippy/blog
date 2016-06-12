<?php 
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
?>

<?php
/*
 * Template Name: music
 */
?>

<?php 
  query_posts('posts_per_page=-1');

  $IDArray = array();

  if (have_posts()) :
  while (have_posts()) : the_post();
  
    //コンテンツ
    $contents = get_the_content();

    //コンテンツからyoutubeIDを抽出
    preg_match_all('/https:\/\/www.youtube.com\/embed\/(.+?)"/', $contents, $match);

    //IDを配列に
    for ($i=0; $i < count($match[1]); $i++) {
      array_push($IDArray, $match[1][$i]);
    }

  endwhile;
  endif;
  wp_reset_query();

 ?>

[
<?php for ($j=0; $j < count($IDArray); $j++): ?>
  <?php if( $j != count($IDArray) - 1 ): ?>
    <?php echo '"'.$IDArray[$j].'",'; ?>
  <?php else: ?>
    <?php echo '"'.$IDArray[$j].'"'; ?>
  <?php endif; ?>
<?php endfor; ?>
]
