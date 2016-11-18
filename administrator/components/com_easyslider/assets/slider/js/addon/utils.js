void function(exports,$,_,Backbone){_.mixin({joinPath:function(){return _(arguments).join("/").replace(/([^:])\/+/g,"$1/")},deepExtend:function deepExtend(obj){return $.extend.apply($,_(arguments).splice(0,0,true))},parseNumberUnit:function(str){str+="";var match=str.replace(/\s+/," ").match(/([-0-9.]+)\s?([^\s]*)?/);return{value:match&&parseFloat(match[1])||0,unit:match&&match[2]||""}},stripTags:function(str){return str.replace(/</g,"&lt;").replace(/>/g,"&gt;")},encodeHtmlEntities:function(str){return String(str).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},decodeHtmlEntities:function(str){return String(str).replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"')}});$("body").on("click","[type=toggle]",function(e){e.preventDefault();$(this).attr("data-on",$(this).attr("data-on")=="true"?false:true).trigger("change")});$.fn.clickOutside=function(callback,context){return typeof callback!="function"?this:this.each(function(index,element){$(window).on("mousedown",function clickHandler(e){if(!$(element).is(e.target)&&!$(e.target).parents("."+$(element).attr("class").replace(/\s+/g,".")).length)$(window).off("mousedown",clickHandler),callback.call(context,e)})})};function getCenter(el){var $el=$(el);var offset=$el.offset();return{x:offset.left+$el.width()/2,y:offset.top+$el.height()/2}}function isWithinRange(value,target,tolerance){return value>=target-tolerance&&value<=target+tolerance}function getCenterSnapObjects(el,targets,tolerance){var $targets=$(targets);var center=getCenter(el);var snaps=$targets.map(function(){var targetCenter=getCenter(this);return{el:this,snapX:isWithinRange(center.x,targetCenter.x,tolerance||10),snapY:isWithinRange(center.y,targetCenter.y,tolerance||10),x:targetCenter.x,y:targetCenter.y,dX:targetCenter.x-center.x,dY:targetCenter.y-center.y}}).toArray();var snapX=_(snaps).chain().filter(function(match){return match.snapX}).sortBy(function(match){return Math.abs(match.dX)}).first().value();var snapY=_(snaps).chain().filter(function(match){return match.snapY}).sortBy(function(match){return Math.abs(match.dY)}).first().value();return{x:snapX,y:snapY}}$.fn.getSnapObjects=function(targets,tolerance){return getCenterSnapObjects(this,targets,tolerance)};$.fn.getObjectCenter=function(targets,tolerance){return getCenter(this)};$.fn.selectText=function(){var range,selection;return this.each(function(){if(document.body.createTextRange){range=document.body.createTextRange();range.moveToElementText(this);range.select()}else if(window.getSelection){selection=window.getSelection();range=document.createRange();range.selectNodeContents(this);selection.removeAllRanges();selection.addRange(range)}})};$.fn.deselectText=function(){var selection;return this.each(function(){if(window.getSelection){if(window.getSelection().empty){window.getSelection().empty()}else if(window.getSelection().removeAllRanges){window.getSelection().removeAllRanges()}}else if(document.selection){document.selection.empty()}})};$.fn.jsnGetThumb=function(width,cb){var data;if(this.length){if(window.hasOwnProperty("html2canvas")){html2canvas(this.get(0),{onrendered:function(canvas){var src=canvas.toDataURL();var canvas,img;img=new Image;img.onload=function(){var ratio=img.width/width;canvas.width=img.width/ratio;canvas.height=img.height/ratio;var ctx=canvas.getContext("2d");ctx.drawImage(img,0,0,canvas.width,canvas.height);data=canvas.toDataURL();typeof cb!="function"||cb(data)};img.src=src}})}}};$.fn.setCaretPosition=function(pos){var range;return this.each(function(){var elem=this;if(elem.createTextRange){range=elem.createTextRange();range.move("character",pos);range.select()}else{elem.focus();if(typeof elem.selectionStart!=="undefined"){elem.setSelectionRange(pos,pos)}}})};$.fn.getCaretPosition=function(){if(!this.length)return null;var input=this.get(0);if(!input)return;if(document.selection){input.focus()}return"selectionStart"in input?input.selectionStart:""||Math.abs(document.selection.createRange().moveStart("character",-input.value.length))};$.fn.alignItems=function(alignment,target){log("align to target");var $target=$(target);var position=$target.position();var width=$target.width();var height=$target.height();return this.each(function(){if(target){var $el=$(this);var elemOffsetX=parseFloat($el.css("margin-left"));var elemOffsetY=parseFloat($el.css("margin-top"));var targetOffsetX=parseFloat($target.css("margin-left"));var targetOffsetY=parseFloat($target.css("margin-top"));var offsetX=elemOffsetX-targetOffsetX;var offsetY=elemOffsetY-targetOffsetY;if($el.parent().is(target)){position.left=0;position.top=0}switch(alignment){case"left":$el.css("left",position.left-offsetX);break;case"center":var center=position.left+width/2;$el.css("left",center-$el.width()/2-offsetX);break;case"right":var right=position.left+width;$el.css("left",right-$el.width()-offsetX);break;case"top":$el.css("top",position.top-offsetY);break;case"middle":var middle=position.top+height/2;$el.css("top",middle-$el.height()/2-offsetY);break;case"bottom":var bottom=position.top+height;$el.css("top",bottom-$el.height()-offsetY);break}}})}}(this,JSNES_jQuery,JSNES_Underscore,JSNES_Backbone);