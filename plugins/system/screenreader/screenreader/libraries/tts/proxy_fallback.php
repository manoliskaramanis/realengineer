<?php
/**
 * Proxy della REST API di Google TTS
 * @package SCREENREADER::plugins::system
 * @subpackage screenreader
 * @subpackage libraries
 * @subpackage tts
 * @author Joomla! Extensions Store
 * @copyright (C) 2015 - Joomla! Extensions Store
 * @license GNU/GPLv2 http://www.gnu.org/licenses/gpl-2.0.html  
 */
ini_set ( 'display_errors', false );
// Joomla Init
define ( '_JEXEC', 1 );
defined ( '_JEXEC' ) or die ();
define ( 'JPATH_BASE', realpath ( '../../../../../../' ) );
define ( 'DS', DIRECTORY_SEPARATOR );

if (file_exists(JPATH_BASE . '/defines.php')) {
	include_once JPATH_BASE . '/defines.php';
}

if (!defined('_JDEFINES')) {
	require_once JPATH_BASE.'/includes/defines.php';
}

require_once (JPATH_BASE . DS . 'includes' . DS . 'framework.php');
$mainframe = JFactory::getApplication ( 'site' );

// testo
$text = preg_replace ( "/[" . PHP_EOL . "]+/", " ", ($_GET ['text']) );
// lingua
$lang = ($_GET ['lang']);
// security token same domain
$token = ($_GET ['token']);
// engine token if used by the engine
$engineToken = ($_GET ['engine_token']);

if ($token === md5 ( $_SERVER ['HTTP_HOST'] )) {
	// Lazy loading
	require_once '../http/http.php';
	
	// Random user agents DB
	$userAgents = array (
			"Mozilla/5.0 (Windows NT 6.3; rv:36.0) Gecko/20100101 Firefox/36.0",
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10; rv:33.0) Gecko/20100101 Firefox/33.0",
			"Mozilla/5.0 (X11; Linux i586; rv:31.0) Gecko/20100101 Firefox/31.0",
			"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:31.0) Gecko/20130401 Firefox/31.0",
			"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36",
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1944.0 Safari/537.36",
			"Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2224.3 Safari/537.36",
			"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A",
			"Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25",
			"Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko",
			"Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko",
			"Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)",
			"Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)",
			"Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/5.0)",
			"Mozilla/5.0 (compatible; MSIE 10.0; Macintosh; Intel Mac OS X 10_7_3; Trident/6.0)" 
	);
	$ua = $userAgents [rand ( 0, count ( $userAgents ) - 1 )];
	// Format the request header array
	$headers = array (
			'Cache-Control' => 'max-age=0',
			'User-Agent' => $ua,
			'Accept' => 'audio/mpeg',
			'Referer' => 'http://www.naturalreaders.com/index.html',
			'Accept-Language' => 'en-GB, en' 
	);
	
	// Request API GET
	// Transport wrapper
	$HTTPClient = new jscrHttp ();
	
	// Mapped language to code
	$mappedLangCode = array (
			'en-US' => 1,
			'en-GB' => 3,
			'en' => 3,
			'fr-FR' => 7,
			'fr' => 7,
			'de-DE' => 5,
			'de' => 5,
			'es-ES' => 20,
			'es' => 20,
			'it-IT' => 12,
			'it' => 12,
			'ar-AR' => 34,
			'ar-AA' => 34,
			'ar' => 34 
	);
	if(array_key_exists($lang, $mappedLangCode)) {
		$langNumericKey = $mappedLangCode[$lang];
	} else {
		$langNumericKey = 2; // Fallback always on english
	}
	
	$qs = http_build_query ( array (
			'r' => $langNumericKey,
			't' => ($text),
			's' => 0,
			'requesttoken' => $engineToken
	) );
	$HTTPResponse = $HTTPClient->get ( "http://api.naturalreaders.com/v2/tts/?$qs", $headers );
	
	$binaryString = $HTTPResponse->body;
	$download_size = strlen ( $HTTPResponse->body );
	
	// send the headers
	header ( "Pragma: public" ); // purge the browser cache
	header ( "Expires: 0" ); // ...
	header ( "Cache-Control:" ); // ...
	header ( "Cache-Control: public" ); // ...
	header ( "Content-Description: File Transfer" ); //
	header ( "Content-Type: audio/mpeg" ); // file type
	header ( "Content-Disposition: attachment; filename=tts.mp3" );
	header ( "Content-Transfer-Encoding: binary" ); // transfer method
	header ( "Content-Length: $download_size" ); // download length
	
	echo $binaryString;
}
exit ();?>