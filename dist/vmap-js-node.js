"use strict";class VMAPAdSource{constructor(e){this.id=e.getAttribute("id"),this.allowMultipleAds=e.getAttribute("allowMultipleAds"),this.followRedirects=e.getAttribute("followRedirects"),this.vastAdData=null,this.adTagURI=null,this.customData=null;for(const t in e.childNodes){const s=e.childNodes[t];switch(s.localName){case"AdTagURI":this.adTagURI={templateType:s.getAttribute("templateType"),uri:(s.textContent||s.text||"").trim()};break;case"VASTAdData":for(this.vastAdData=s.firstChild;this.vastAdData&&1!==this.vastAdData.nodeType;)this.vastAdData=this.vastAdData.nextSibling;break;case"CustomAdData":this.customData=s}}}}function childrenByName(e,t){return[...e.childNodes].filter(e=>e.nodeName===t||t===`vmap:${e.nodeName}`||e.nodeName===`vmap:${t}`)}function parseNodeValue(e){const t=e&&e.childNodes&&[...e.childNodes];if(!t)return{};const s=t.filter(e=>"#cdata-section"===e.nodeName);if(s&&s.length>0)try{return JSON.parse(s[0].data)}catch(e){}return t.reduce((e,t)=>{let s="";switch(t.nodeName){case"#text":s=t.textContent.trim();break;case"#cdata-section":s=t.data}return e+s},"")}function parseXMLNode(e){const t={attributes:{},children:{},value:{}};return t.value=parseNodeValue(e),e.attributes&&[...e.attributes].forEach(e=>{e.nodeName&&void 0!==e.nodeValue&&null!==e.nodeValue&&(t.attributes[e.nodeName]=e.nodeValue)}),e.childNodes&&[...e.childNodes].filter(e=>"#"!==e.nodeName.substring(0,1)).forEach(e=>{t.children[e.nodeName]=parseXMLNode(e)}),t}class VMAPAdBreak{constructor(e){this.timeOffset=e.getAttribute("timeOffset"),this.breakType=e.getAttribute("breakType"),this.breakId=e.getAttribute("breakId"),this.repeatAfter=e.getAttribute("repeatAfter"),this.adSource=null,this.trackingEvents=[],this.extensions=[];for(const t in e.childNodes){const s=e.childNodes[t];switch(s.localName){case"AdSource":this.adSource=new VMAPAdSource(s);break;case"TrackingEvents":for(const e in s.childNodes){const t=s.childNodes[e];"Tracking"===t.localName&&this.trackingEvents.push({event:t.getAttribute("event"),uri:(t.textContent||t.text||"").trim()})}break;case"Extensions":this.extensions=childrenByName(s,"Extension").map(e=>parseXMLNode(e))}}}track(e,t){for(const s in this.trackingEvents){const a=this.trackingEvents[s];if(a.event===e){let{uri:e}=a;"error"===a.event&&(e=e.replace("[ERRORCODE]",t)),this.tracker(e)}}}tracker(e){if("undefined"!=typeof window&&null!==window){(new Image).src=e}}}class VMAP{constructor(e){if(null===(null!==e?e.documentElement:void 0)||"VMAP"!==e.documentElement.localName)throw new Error("Not a VMAP document");this.version=e.documentElement.getAttribute("version"),this.adBreaks=[],this.extensions=[];for(const t in e.documentElement.childNodes){const s=e.documentElement.childNodes[t];switch(s.localName){case"AdBreak":this.adBreaks.push(new VMAPAdBreak(s));break;case"Extensions":this.extensions=childrenByName(s,"Extension").map(e=>parseXMLNode(e))}}}}module.exports=VMAP;
