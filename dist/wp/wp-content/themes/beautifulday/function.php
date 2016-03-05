<?php

function change_posts_per_page($query) {
 if( is_admin() || ! $query->is_main_query() ){
     return;
 }
 
  if ( $query->is_home() ) {
     $query->set( 'posts_per_page', '5' );
     return;
 }

 if ( $query->is_category() ) {
     $query->set( 'posts_per_page', '5' );
     return;
 }

 //  if ( $query->is_page() ) {
 //     $query->set( 'posts_per_page', '5' );
 //     return;
 // }
 
}


add_action( 'pre_get_posts', 'change_posts_per_page' );


?>