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

//コンテンツ
$contents = get_the_content();

//コンテンツからh2を抽出
preg_match_all('/<h2>(.+)<\/h2>/', $contents, $match);

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
  "contents": <?php echo json_encode( get_the_content() ) ; ?>,
  "hdg2": [<?php echo $hdg2; ?>]

}