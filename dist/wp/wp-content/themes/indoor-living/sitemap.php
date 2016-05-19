<?php header('Content-Type: text/xml; charset='.get_option('blog_charset'), true); ?>
<?php echo '<?xml version="1.0" encoding="UTF-8"?>' ?>
<?php
/*
 * Template Name: Site Map
 */
?>



<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

<?php $paged = get_query_var('paged'); ?>
<?php query_posts("posts_per_page=-1"); ?>

<?php if (have_posts()) : while(have_posts()) : the_post(); ?>


<url>
<loc><?php echo 'http://indoor-living.sakuraweb.com/?type=single&amp;paged='.($post->ID); ?></loc>
<lastmod><?php the_time('Y-m-d'); ?></lastmod>
<changefreq>daily</changefreq>
<priority>0.8</priority>
</url>


<?php endwhile; ?>
<?php else: ?>
<?php endif; ?>

</urlset>