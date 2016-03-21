<?php

//アイキャッチを有効化
add_theme_support( 'post-thumbnails' );

//総ページ数を返す
function max_show_page_number() {
  global $wp_query;

  $max_page = $wp_query->max_num_pages;
  return $max_page;  
}

//各アーカイブでの取得記事件数
function change_posts_per_page($query) {
 if( is_admin() || ! $query->is_main_query() ){
     return;
 }
 
  if ( $query->is_home() ) {
     $query->set( 'posts_per_page', '6' );
     return;
 }

 if ( $query->is_category() ) {
     $query->set( 'posts_per_page', '6' );
     return;
 }
 
}

add_action( 'pre_get_posts', 'change_posts_per_page' );

?>