"use strict";var classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},createClass=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),toConsumableArray=function(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)},VMAPAdSource=function e(t){for(var a in classCallCheck(this,e),this.id=t.getAttribute("id"),this.allowMultipleAds=t.getAttribute("allowMultipleAds"),this.followRedirects=t.getAttribute("followRedirects"),this.vastAdData=null,this.adTagURI=null,this.customData=null,t.childNodes){var r=t.childNodes[a];switch(r.localName){case"AdTagURI":this.adTagURI={templateType:r.getAttribute("templateType"),uri:(r.textContent||r.text||"").trim()};break;case"VASTAdData":for(this.vastAdData=r.firstChild;this.vastAdData&&1!==this.vastAdData.nodeType;)this.vastAdData=this.vastAdData.nextSibling;break;case"CustomAdData":this.customData=r}}};function childrenByName(e,t){return[].concat(toConsumableArray(e.childNodes)).filter(function(e){return e.nodeName===t||t==="vmap:"+e.nodeName||e.nodeName==="vmap:"+t})}function parseNodeValue(e){var t=e&&e.childNodes&&[].concat(toConsumableArray(e.childNodes));if(!t)return{};var a=t.filter(function(e){return"#cdata-section"===e.nodeName});if(a&&a.length>0)try{return JSON.parse(a[0].data)}catch(e){}return t.reduce(function(e,t){var a="";switch(t.nodeName){case"#text":a=t.textContent.trim();break;case"#cdata-section":a=t.data}return e+a},"")}function parseXMLNode(e){var t={attributes:{},children:{},value:{}};return t.value=parseNodeValue(e),e.attributes&&[].concat(toConsumableArray(e.attributes)).forEach(function(e){e.nodeName&&void 0!==e.nodeValue&&null!==e.nodeValue&&(t.attributes[e.nodeName]=e.nodeValue)}),e.childNodes&&[].concat(toConsumableArray(e.childNodes)).filter(function(e){return"#"!==e.nodeName.substring(0,1)}).forEach(function(e){t.children[e.nodeName]=parseXMLNode(e)}),t}var VMAPAdBreak=function(){function e(t){for(var a in classCallCheck(this,e),this.timeOffset=t.getAttribute("timeOffset"),this.breakType=t.getAttribute("breakType"),this.breakId=t.getAttribute("breakId"),this.repeatAfter=t.getAttribute("repeatAfter"),this.adSource=null,this.trackingEvents=[],this.extensions=[],t.childNodes){var r=t.childNodes[a];switch(r.localName){case"AdSource":this.adSource=new VMAPAdSource(r);break;case"TrackingEvents":for(var n in r.childNodes){var i=r.childNodes[n];"Tracking"===i.localName&&this.trackingEvents.push({event:i.getAttribute("event"),uri:(i.textContent||i.text||"").trim()})}break;case"Extensions":this.extensions=childrenByName(r,"Extension").map(function(e){return parseXMLNode(e)})}}}return createClass(e,[{key:"track",value:function(e,t){for(var a in this.trackingEvents){var r=this.trackingEvents[a];if(r.event===e){var n=r.uri;"error"===r.event&&(n=n.replace("[ERRORCODE]",t)),this.tracker(n)}}}},{key:"tracker",value:function(e){"undefined"!=typeof window&&null!==window&&((new Image).src=e)}}]),e}(),VMAP=function e(t){if(classCallCheck(this,e),null==(null!=t?t.documentElement:void 0)||"VMAP"!==t.documentElement.localName)throw new Error("Not a VMAP document");for(var a in this.version=t.documentElement.getAttribute("version"),this.adBreaks=[],this.extensions=[],t.documentElement.childNodes){var r=t.documentElement.childNodes[a];switch(r.localName){case"AdBreak":this.adBreaks.push(new VMAPAdBreak(r));break;case"Extensions":this.extensions=childrenByName(r,"Extension").map(function(e){return parseXMLNode(e)})}}};module.exports=VMAP;
