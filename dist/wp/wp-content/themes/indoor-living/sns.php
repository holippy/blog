<?php
/*
 * Template Name: SNS
 */
?>


<?php 
//ページ番号取得
$ID = get_query_var( 'paged', 1 );

$imgPath = '';



  //アイキャッチ IDを取得して画像の「URL,横幅,高さ」を取得。
  //画像サイズは medium で出力しています。
  $image_url = wp_get_attachment_image_src(get_post_thumbnail_id($ID), 'large');

  
  //URLを返す
  $imgPath = $image_url[0];
  


$post = get_post( $ID );
$title = $post->post_title;
$description = textCut(strip_tags( $post->post_content ));
$image = $imgPath;

?>


<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?php echo $title; ?></title>
<meta name="description" content="<?php echo $description; ?>">
<meta name="keywords" content="">
<meta name="author" content="">
<meta property="og:title" content="<?php echo $title; ?>">
<meta property="og:type" content="blog">
<meta property="og:url" content="http://indoor-living.sakuraweb.com/wp/sns/page/<?php echo $ID; ?>/">
<meta property="og:image" content="<?php echo $image; ?>">
<meta property="og:site_name" content="Indoor Living">
<meta property="og:description" content="<?php echo $description; ?>">
<meta property="fb:app_id" content="">
<link rel="stylesheet" href="/assets/css/layout.css">
</head>

<body>

<script>
  setTimeout(function(){
    window.location = 'http://localhost:8080/?type=single&paged=<?php echo $ID; ?>';
  },3000);
</script>

</body>

</html>
