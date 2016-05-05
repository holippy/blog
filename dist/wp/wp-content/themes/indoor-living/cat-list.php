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
    //foreach($cat_all as $i => $value):

    for ($i = 1; $i < $length+1; $i++):
 ?>
  {

    "catName": "<?php echo $cat_all[$i]->name;?>",
    "ID": "<?php echo $cat_all[$i]->term_id;?>",
    "slug": "<?php echo $cat_all[$i]->slug; ?>"

  <?php if ($i != $length): ?>
    },
  <?php else: ?>
    }
  <?php endif; ?>

<?php endfor; ?>
]
