(function(c){var d=function(G){var u={};var E={};var v=80;var F=80;var B=0;var z=0;var x="";var C=function(){c(u.fontsizeSelector).filter(function(h){var f=this.nodeName.toLowerCase();var j=false;var g=0;var k=1;switch(f){case"h1":g=100;j=true;break;case"h2":g=80;k=0.8;j=true;break;case"h3":g=40;k=0.6;j=true;break;case"h4":g=20;k=0.4;j=true;break}if(j){if(u.fontSizeOverride){c(this).attr("style","font-size:"+(parseInt(F)+(u.fontSizeHeadersIncrement*k)+g)+"%")}else{var e=c(this).attr("style")||"";c(this).attr("style",e+";font-size:"+(parseInt(F)+(u.fontSizeHeadersIncrement*k)+g)+"%")}}})};var y=function(f){z=parseInt(window.sessionStorage.getItem("scr_highcontrast_alternate"))||0;var e=function(){c("html").removeClass("scr_highcontrast");B=0;window.sessionStorage.setItem("scr_highcontrast",B);if(!x){x=c("html").attr("style")}var j="";if(c(this).data("rotate")){j=" hue-rotate("+parseInt(c(this).data("rotate"))+"deg)"}var h="";if(c(this).data("brightness")){h=" brightness("+parseInt(c(this).data("brightness"))+")"}c("html").attr("style",x+";-webkit-filter: invert(100%)"+j+h+";filter: invert(100%)"+j+h)};if(!z){e.bind(this)();z=c(this).data("alternate")}else{if(z&&typeof(f)!=="undefined"){var g=c(this).data("alternate");if(g==z){c("html").attr("style",x);z=0}else{z=g;e.bind(this)()}}else{if(z&&typeof(f)==="undefined"){e.bind(this)()}}}if(window.sessionStorage){window.sessionStorage.setItem("scr_highcontrast_alternate",z)}};var A=function(f,g){f=f.toUpperCase();var h=f.split("");var j="";var k="FEDCBA9876".split("");var l=new Array();l.A="5";l.B="4";l.C="3";l.D="2";l.E="1";l.F="0";for(i=0;i<6;i++){if(!isNaN(h[i])){j+=k[h[i]]}else{if(l[h[i]]){j+=l[h[i]]}else{return false}}}if(g&&u.ieHighContrast){var e=parseInt(f,16);var m=parseInt(j,16);if(m<e){return f}}return j};var b=function(g){var k=/rgba? *\( *([0-9]{1,3}) *, *([0-9]{1,3}) *, *([0-9]{1,3})(, *[0-9]{1,3}[.0-9]*)? *\)/;var h=k.exec(g);if(!h){return"FFFFFF"}var l=Math.round(parseFloat(h[1]));var e=Math.round(parseFloat(h[2]));var j=Math.round(parseFloat(h[3]));var f=(l+65536).toString(16).substring(3).toUpperCase()+(e+65536).toString(16).substring(3).toUpperCase()+(j+65536).toString(16).substring(3).toUpperCase();return f};var w=function(e){var f=" -webkit- -moz- -o- -ms- ".split(" ");var g=document.createElement("div");g.style.cssText=f.join("filter:invert(100%); ");return !!g.style.length&&((document.documentMode===undefined||document.documentMode>9))};var a=function(f){var e=c(f);c.fn.skipElement=function(g){var h=this.css(g);this.css(g,"inherit");var j=this.css(g);if(h!=j&&b(j)!="000000"){this.css(g,j);return true}else{this.css(g,h);return false}};c(f).each(function(o,h){if(c.inArray(h.nodeName.toLowerCase(),["script","embed","object"])==-1){if(u.ieHighContrastAdvanced){var j=c(h).css("background-color");var k=c(h).css("color");if(j&&k){var m=A(b(j));var n=A(b(k),true);var g=c(h).attr("style")||"";var l=g+" background-color:#"+m+" !important; color:#"+n+" !important";c(h).attr("style",l)}}else{if(!c(h).skipElement("background-color")){var j=c(h).css("background-color");var k=c(h).css("color");if(j&&k){var m=A(b(j));var n=A(b(k),true);c(h).css("background-color","#"+m);c(h).css("color","#"+n)}}}}})};this.buildInterface=function(){var s=c("<div/>").attr("id","accessibility-links").addClass(u.position+" "+u.scrolling);if(u.targetAppendMode=="bottom"){s.appendTo(u.targetAppendto)}else{if(u.targetAppendMode=="top"){s.prependTo(u.targetAppendto)}}var j=c("<div/>").attr("id","text_plugin").attr("title",fr_screenreader).addClass("scbasebin screenreader text");if(!u.showlabel){j.addClass("scr_nolabel")}s.append(j);var L=c("<div/>").attr("id","volume_plugin").addClass("scbasebin");s.append(L);var e=c("<div/>").attr("id","speaker_plugin").addClass("scbasebin speaker");s.append(e);var g=c("<div/>").css("clear","both");s.append(g);if(u.showlabel){var K=c("<label/>").addClass("fr_label startapp").text(fr_screenreader);j.append(K)}var f=c("<button/>").attr({id:"fr_screenreader_play",title:"Play",accesskey:u.accesskey_play}).addClass("pinnable");e.append(f);var r=c("<button/>").attr({id:"fr_screenreader_pause",title:"Pause",accesskey:u.accesskey_pause}).addClass("pinnable");e.append(r);var m=c("<button/>").attr({id:"fr_screenreader_stop",title:"Stop",accesskey:u.accesskey_stop}).addClass("pinnable");e.append(m);if(u.fontsize){var o=c("<button/>").attr({id:"fr_screenreader_font_increase",title:fr_increase,accesskey:u.accesskey_increase,"data-value":"1"}).addClass("sizable");e.append(o);var n=c("<button/>").attr({id:"fr_screenreader_font_decrease",title:fr_decrease,accesskey:u.accesskey_decrease,"data-value":"-1"}).addClass("sizable");e.append(n);var q=c("<button/>").attr({id:"fr_screenreader_font_reset",title:fr_reset,accesskey:u.accesskey_reset,"data-value":"0"}).addClass("resizable");e.append(q)}if(u.highcontrast){var p=c("<button/>").attr({id:"fr_screenreader_highcontrast",title:fr_highcontrast,accesskey:u.accesskey_highcontrast,"data-value":"0"});e.append(p);var k=u.highcontrastAlternate&&w();if(k){var h=c("<button/>").attr({id:"fr_screenreader_highcontrast2",title:fr_highcontrast,accesskey:u.accesskey_highcontrast2,"data-alternate":"1","data-rotate":u.colorHue});e.append(h);var l=c("<button/>").attr({id:"fr_screenreader_highcontrast3",title:fr_highcontrast,accesskey:u.accesskey_highcontrast3,"data-alternate":"2","data-rotate":u.colorHue,"data-brightness":u.colorBrightness});e.append(l);z=parseInt(window.sessionStorage.getItem("scr_highcontrast_alternate"))||0;if(z){var M=c("button[data-alternate="+z+"]");y.call(M)}}if(u.fontsize&&k){c("#speaker_plugin").css("width","310px")}else{if(u.fontsize){c("#speaker_plugin").css("width","250px")}}}else{if(u.fontsize){c("#speaker_plugin").css("width","220px")}else{c("#speaker_plugin").css("width","100px")}}if(u.template=="custom.css"){c("#speaker_plugin button").css("background-color",u.toolbarBgcolor);c("#accessibility-links").css("background","transparent")}else{c("#accessibility-links").css("background-color",u.toolbarBgcolor)}};this.startTTSEngine=function(){E=new jQuery.frTTSEngine(u);return true};var t=function(){c(document).on("click",".sizable",function(e){var g=parseInt(c(this).data("value"));F=parseInt(F)+parseInt(g*5);if(F>u.fontsizeMax){F=u.fontsizeMax}else{if(F<u.fontsizeMin){F=u.fontsizeMin}}c("body").css("font-size",F+"%");if(u.fontsizeSelector){if(u.fontSizeOverride){c(u.fontsizeSelector).attr("style","font-size:"+(parseInt(F)+20)+"%")}else{var f=c(u.fontsizeSelector);c.each(f,function(j,h){var k=c(h).attr("style")||"";c(h).attr("style",k+";font-size:"+(parseInt(F)+20)+"%")})}C()}if(window.sessionStorage){window.sessionStorage.setItem("scr_fontsize",F)}});c(document).on("click",".resizable",function(e){F=v;c("body").css("font-size",v+"%");if(u.fontsizeSelector){if(u.fontSizeOverride){c(u.fontsizeSelector).attr("style","font-size:"+(parseInt(F)+20)+"%")}else{var f=c(u.fontsizeSelector);c.each(f,function(j,h){var g=c(h).attr("style")||"";c(h).attr("style",g+";font-size:"+(parseInt(F)+20)+"%")})}C()}if(window.sessionStorage){window.sessionStorage.setItem("scr_fontsize",v)}});c(document).on("click","#fr_screenreader_highcontrast",function(e){B=!!parseInt(window.sessionStorage.getItem("scr_highcontrast"))||0;if(!B){if(z){c("html").attr("style",x);z=0;if(window.sessionStorage){window.sessionStorage.setItem("scr_highcontrast_alternate",z)}}c("html").addClass("scr_highcontrast");if("ActiveXObject" in window){a("body, body *:not(#accessibility-links, #accessibility-links *)")}B=1}else{c("html").removeClass("scr_highcontrast");if("ActiveXObject" in window){B=0;window.location.reload()}B=0}if(window.sessionStorage){window.sessionStorage.setItem("scr_highcontrast",B)}});c(document).on("click","#fr_screenreader_highcontrast2, #fr_screenreader_highcontrast3",y)};(function D(){c.extend(u,G);if(jQuery.frTTSEngine===undefined){jQuery('script[src*="tts.js"]').clone().appendTo("body")}var e=c("body").css("background-color");c("html").css("background-color",e);v=F=u.fontsizeDefault;if(window.sessionStorage){var f=window.sessionStorage.getItem("scr_fontsize");if(f){F=f}c("body").css("font-size",F+"%");if(u.fontsizeSelector){if(u.fontSizeOverride){c(u.fontsizeSelector).attr("style","font-size:"+(parseInt(F)+20)+"%")}else{var g=c(u.fontsizeSelector);c.each(g,function(j,h){var k=c(h).attr("style")||"";c(h).attr("style",k+";font-size:"+(parseInt(F)+20)+"%")})}C()}B=!!parseInt(window.sessionStorage.getItem("scr_highcontrast"))||0;if(B){c("html").addClass("scr_highcontrast");if("ActiveXObject" in window){a("body, body *:not(#accessibility-links, #accessibility-links *)")}}}t()}).call(this)};c(function(){window.ScreenReaderMainController=new d(screenReaderConfigOptions);ScreenReaderMainController.buildInterface();ScreenReaderMainController.startTTSEngine()})})(jQuery);