<?php
/**  
 * JS APP renderer system plugin - opera con i parametri del componente
 * @package ZOOMLIGHTBOX::plugins::system
 * @author Joomla! Extensions Store  
 * @copyright (C) 2013 - Joomla! Extensions Store
 * @license GNU/GPLv2 http://www.gnu.org/licenses/gpl-2.0.html  
 */
// no direct access
defined ( '_JEXEC' ) or die ( 'Restricted access' );
jimport ( 'joomla.plugin.plugin' );
jimport ( 'joomla.filesystem.file');

class plgSystemZoomlightbox extends JPlugin {
	/**
	 * Class Constructor 
	 * @access	protected
	 * @param	object	$subject The object to observe
	 * @param 	array   $config  An array that holds the plugin configuration
	 * @since	1.0
	 */
	function plgSystemZoomlightbox(& $subject, $config) {
		parent::__construct ( $subject, $config );
	} 
	/**
	 * onAfterInitialise handler
	 *
	 * Aggiunge nel page document output la JS APP
	 *
	 * @access	public
	 * @return null
	 */
	function onAfterDispatch() {
		$app = JFactory::getApplication(); 
		// Execute solo nel frontend
		if(!$app->getClientId()) {
			//load the translation
			$language = JFactory::getLanguage();
			$langTag = $language->getTag();
			$langCode = @array_shift(explode('-', $langTag));
			$token = md5($_SERVER["HTTP_HOST"]);
			
			// Security safe 
			if(!JFile::exists(JPATH_SITE .'/plugins/system/zoomlightbox/zoomlightbox/languages/' . $langTag . '.js')) {
				$langTag = 'en-GB';
			}
			
			$base = JURI::base();
			
			// Ottenimento document
			$doc = JFactory::getDocument (); 
			// Output JS APP nel Document
			if($doc->getType() !== 'html' || JRequest::getCmd('tmpl') === 'component') {
				return false;
			}  
			JHTML::_('behavior.framework'); 
				 
			// Gestione params plugin php / options plugin js
			$pparams = new stdClass();
			
			$pparams->fontscale = $this->params->get('fontscale', '150%');
			$pparams->imgscale = $this->params->get('imgscale', '150%');
			$pparams->autodimension = $this->params->get('autodimension', 0);
			$pparams->fancybox_width = $this->params->get('fancybox_width', 800);
			$pparams->fancybox_height = $this->params->get('fancybox_height', 600);
			$pparams->barscrolling = $this->params->get('barscrolling', 'fixed');
			$pparams->target_minwidth = $this->params->get('target_minwidth', 200);
			$pparams->target_minheight = $this->params->get('target_minheight', 100);
			
			$pparams->zoomer_enabled = $this->params->get('zoomer_enabled', 1);
			$pparams->zoomer_selectors = $this->params->get('zoomer_selectors', 'img,p');
			$pparams->lente_width = $this->params->get('lente_width', 250);
			$pparams->lente_height = $this->params->get('lente_height', 250);
			$pparams->ratio = $this->params->get('ratio', 2);
			
			$pparams->position = $this->params->get('corner_position', 'bottomright');
			$pparams->scrolling = $this->params->get('scrolling', 'yes');
			
			$jQueryInclusion = $this->params->get('jquery_include', true);
			
			$doc->addStyleSheet(JURI::root(true) . '/plugins/system/zoomlightbox/zoomlightbox/libraries/controller/css/main.css');
			$doc->addStyleSheet(JURI::root(true) . '/plugins/system/zoomlightbox/zoomlightbox/libraries/zoomlightbox/fancybox/jquery.fancybox.css'); 
			 
			if($jQueryInclusion) {
				if(version_compare(JVERSION, '3.0', '>=')) {
					JHtml::_('jquery.framework');
				} else {
					$doc->addScript(JURI::root(true) . '/plugins/system/zoomlightbox/zoomlightbox/libraries/jquery/jquery.js');
				}
			}
			
			$doc->addScript(JURI::root(true) . '/plugins/system/zoomlightbox/zoomlightbox/languages/' . $langTag . '.js');
			$doc->addScript(JURI::root(true) . '/plugins/system/zoomlightbox/zoomlightbox/libraries/controller/controller.js');
			 
			$doc->addScript(JURI::root(true) . '/plugins/system/zoomlightbox/zoomlightbox/libraries/zoomlightbox/fancybox/jquery.fancybox.js');
			$doc->addScript(JURI::root(true) . '/plugins/system/zoomlightbox/zoomlightbox/libraries/zoomlightbox/zoomlightbox.js'); 
			$doc->addScript(JURI::root(true) . '/plugins/system/zoomlightbox/zoomlightbox/libraries/zoomlightbox/zoomer.js');
			 
			$doc->addScriptDeclaration("var fr_baseURI='$base';");
			$doc->addScriptDeclaration(	"window.addEvent('domready', function(){  
											frConfiguration = {	baseURI: '$base',
																fontscale: '$pparams->fontscale',
																imgscale: '$pparams->imgscale',
																autoDimensions: $pparams->autodimension,
																width: $pparams->fancybox_width,
																height: $pparams->fancybox_height,
																barscrolling: '$pparams->barscrolling',
																target_minwidth: $pparams->target_minwidth,
																target_minheight: $pparams->target_minheight,
																position: '$pparams->position',
																scrolling: '$pparams->scrolling',
																zoomer_enabled: $pparams->zoomer_enabled,
																zoomer_selectors: '$pparams->zoomer_selectors',
																lenteWidth: $pparams->lente_width,
																lenteHeight: $pparams->lente_height,
																ratio: $pparams->ratio
																};
											frBootstrap = new zlController(frConfiguration);});");
		}
	} 
}
