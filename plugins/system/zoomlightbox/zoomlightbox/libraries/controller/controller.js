var zlController=new Class({Implements:[Options,Events],options:{},initialize:function(a){this.setOptions(a);this.injectElements();if(jQuery.fn.fancybox===undefined){jQuery('script[src*="fancybox"]').clone().appendTo("body")}if(jQuery.zlZoomLighbox===undefined){jQuery('script[src*="zoomlightbox.js"]').clone().appendTo("body")}if(jQuery.fn.zlZoomer===undefined){jQuery('script[src*="zoomer.js"]').clone().appendTo("body")}this.zlZoomLighboxInstance=new jQuery.zlZoomLighbox(this.options);if(a.zoomer_enabled){jQuery(a.zoomer_selectors).zlZoomer(a)}},injectElements:function(){var b=new Element("div",{id:"zoomlightbox-container"});b.inject(document.getElement("body"),"top");$(b).addClass(this.options.position);$(b).addClass(this.options.barscrolling);var d=new Element("div",{id:"text_plugin","class":"maincontainers text",title:zl_description});b.adopt(d);var c=new Element("div",{id:"select_plugin","class":"maincontainers select"});b.adopt(c);var e=new Element("label",{"class":"fr_label startapp"}).appendText(zl_fontsize);c.adopt(e);var f=new Element("select",{id:"zl_font_magnify",title:"Font","class":"pinnable",accesskey:"F","data-role":"fontscale"});var e=new Element("label",{"class":"fr_label startapp"}).appendText(zl_imagesize);c.adopt(e);var a=new Element("select",{id:"zl_image_magnify",title:"Image","class":"pinnable",accesskey:"I","data-role":"imgscale"});c.adopt(f);c.adopt(a);var h=new Element("div",{id:"speaker_plugin","class":"maincontainers switcher"});b.adopt(h);var g=new Element("button",{id:"fr_zoomlightbox_trigger",title:"Stop","class":"pinnable",accesskey:"S"});h.adopt(g)}});