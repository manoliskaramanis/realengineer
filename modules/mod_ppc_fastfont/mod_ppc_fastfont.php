<?php 
//Fast Font//
/**
* Fast Font Resizer
* @package Joomla 1.5 & 1.6
* @copyright Copyright (C) 2010 Pixel Point Creative LLC. All rights reserved.
* @License: http://www.gnu.org/copyleft/gpl.html
* 
* This program is distributed WITHOUT ANY WARRANTY.
*/
// no direct access
defined('_JEXEC') or die('Restricted access');
$defaultSize = $params->get( 'defaultSize', '100' );
$useImg = $params->get( 'useImg', '1' );
$color = $params->get('color');
$useGrad = $params->get('useGrad');
$size = $params->get('size');
$border= $params->get('border');
$margin= $params->get('margin');
echo "
<script language='javascript' type='text/javascript'>
<!--
defaultSize = $defaultSize;
//-->
</script>"
;
?>
<script type="text/javascript" src="modules/mod_ppc_fastfont/js/fastfont.js"></script>

<div id="fontsize" style="font-size:16px;line-height:110%;text-align:center;">

<div style="border:<?php echo $border; ?>;margin:<?php echo $margin; ?>;background:<?php echo $color; ?> url(modules/mod_ppc_fastfont/img/<?php echo $size; ?><?php echo $useGrad; ?>.png);float:left;height:<?php echo $size; ?>px;width:<?php echo $size; ?>px;">
<a style="text-decoration: none" href="index.php" title="Increase size" onclick="changeFontSize(1); return false;" class="larger">
<?php if ($params->get('useImg', 1))
		{
		echo '<img style="margin:0; padding:0;" src="modules/mod_ppc_fastfont/img/';
                echo $size;
                echo 'fontincrease.png" alt="Increase size" />';
		}
		else{
		echo JText::_('+');
		} ?></a>
</div>
<div style="border:<?php echo $border; ?>;margin:<?php echo $margin; ?>;background:<?php echo $color; ?> url(modules/mod_ppc_fastfont/img/<?php echo $size; ?><?php echo $useGrad; ?>.png);float:left;height:<?php echo $size; ?>px;width:<?php echo $size; ?>px;">
<a style="text-decoration: none" href="index.php" title="Reset font size to default" onclick="revertStyles(); return false;" class="reset">
<?php if ($params->get('useImg', 1))
		{
		echo '<img style="margin:0; padding:0;" src="modules/mod_ppc_fastfont/img/';
                echo $size;
                echo 'fontreset.png" alt="Reset to Default" />';
		}
		else{
		echo JText::_('A');
		} ?></a>
</div>
<div style="border:<?php echo $border; ?>;margin:<?php echo $margin; ?>;letter-spacing:-1px;background:<?php echo $color; ?> url(modules/mod_ppc_fastfont/img/<?php echo $size; ?><?php echo $useGrad; ?>.png);float:left;height:<?php echo $size; ?>px;width:<?php echo $size; ?>px;">
<a style="text-decoration: none" href="index.php" title="Decrease size" onclick="changeFontSize(-1); return false;" class="smaller">
<?php if ($params->get('useImg', 1))
		{
		echo '<img style="margin:0; padding:0;" src="modules/mod_ppc_fastfont/img/';
                echo $size;
                echo 'fontdecrease.png" alt="Decrease size" />';
		}
		else{
		echo JText::_('--');
		} ?></a>
			</div>	

</div>
