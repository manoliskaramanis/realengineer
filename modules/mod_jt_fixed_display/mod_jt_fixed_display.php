<?php
/**
 * @JT Fixed Display
 * @package    joomtut.com
 * @link http://joomtut.com
 * @(C) joomtut.com. All rights reserved.
 * @http://www.gnu.org/copyleft/gpl.html
*/
// Don't allow direct access to the file

// Don't allow direct access to the file
defined( '_JEXEC' ) or die( 'Restricted access' );
  jimport('joomla.application.module.helper');
  $document = JFactory::getDocument();
  $maincontentw = $params->get( 'jtf_maincontentw', 1000 );
  $leftboxw = $params->get( 'jtf_leftboxw', 100 );
  $leftboxh = $params->get( 'jtf_leftboxh', 200 );
  $rightboxw = $params->get( 'jtf_rightboxw', 100 );
  $rightboxh = $params->get( 'jtf_rightboxh', 200 );
  $left_position = $params->get( 'jtf_left_position', 'jt_leftbox' );
  $right_position = $params->get( 'jtf_right_position', 'jt_rightbox' );
  $leftboxcss = $params->get( 'jtf_leftboxcss', '' );
  $rightboxcss = $params->get( 'jtf_rightboxcss', '' );
  $lefttype =  $params->get( 'jtf_lefttype', 0 );
  $righttype =  $params->get( 'jtf_righttype', 0 );
if (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE 6.') == FALSE) {
  $document->addScript('media/mod_jt_fixed_display/assets/jt_fixed_display.js');
  $attribs   = array();
  $attribs['style'] = 'xhtml';
echo '<!-- Start JT Fixed Display -->';
echo '<div id="JtfLefttBox" style="width:'.$leftboxw.'px; height:'.$leftboxh.'px; display: none; position: fixed;'.$leftboxcss.'">';
if ($lefttype == 2) { $modules =& JModuleHelper::getModules($left_position); foreach ($modules as $module) { echo JModuleHelper::renderModule($module, $attribs); } }
echo '</div>';
echo '<div id="JtfRighttBox" style="width:'.$rightboxw.'px; height:'.$rightboxh.'px; display: none; position: fixed;'.$rightboxcss.'">';
if ($righttype == 2) { $modules =& JModuleHelper::getModules($right_position); foreach ($modules as $module) { echo JModuleHelper::renderModule($module, $attribs); } }
$attribs['style'] = 'none';
echo '</div>';
echo "<script type=\"text/javascript\">";
echo "var JtfMainContentW = $maincontentw;";
echo "var JtfLeftType = $lefttype;";
echo "var JtfLeftBoxW = $leftboxw;";
echo "var JtfLeftBoxH = $leftboxh;";
echo "var JtfRightType = $righttype;";
echo "var JtfRightBoxW = $rightboxw;";
echo "var JtfRightBoxH = $rightboxh;";
echo "ShowJtffBox();";
echo "</script><!-- End JT Fixed Display -->";
}
?>