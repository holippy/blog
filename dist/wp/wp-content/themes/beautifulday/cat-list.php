<?php 
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
?>

<?php
/*
 * Template Name: カテゴリリスト
 */
?>




[
<?php
    $cat_all = get_terms( "category", "hide_empty=true" );
    $length = count($cat_all);
    foreach($cat_all as $i => $value):
 ?>
  {
    "catName": "<?php echo $value->name;?>",
    "ID": "<?php echo $value->term_id;?>",
    "slug": "<?php echo $value->slug; ?>"

  <?php if ($i != $length - 1): ?>
    },
  <?php else: ?>
    }
  <?php endif; ?>

<?php endforeach; ?>
]
