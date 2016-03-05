<?php
/*
 * Template Name: トップページ
 */
?>


<?php if (have_posts()):
while(have_posts()): the_post(); ?>

<?php echo $post->post_title; ?>

<?php endwhile; endif; ?>