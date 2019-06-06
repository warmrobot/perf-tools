var perfKeeperExtensions=function(e){"use strict";var i=function(){return(i=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e}).apply(this,arguments)},S=Function("return this")(),g=S.document,h=S.performance,T=h&&h.now?function(){return h.now()}:Date.now;function z(e){"complete"===g.readyState?e():S.addEventListener("DOMContentLoaded",e)}var b,t,s=[];function k(i,o,c,u){var a={};return[function(e,t,n,r){var i=a;s.concat(e).forEach(function(e){var t=i.nested||(i.nested={});i=t[e]||(t[e]={name:e})}),null!=i.end?i.end+=n-t:(i.start=t,i.end=n,i.unit=r)},function(e,t,n,r){a.name=e?i+"-"+e:i,a.start=t,a.end=n,function t(e,n){var r=e.nested,i=r?Object.keys(r):s;if(i.length){var a=(n||o).group(e.name,e.start);a._=!0,a.unit=c||"ms",(!1===u?i:i.sort()).forEach(function(e){t(r[e],a)}),a.stop(e.end)}else n&&(n.add(e.name,e.start,e.end),n.entries[n.entries.length-1].unit=e.unit||n.unit)}(a,null),r&&(a={})}]}var n,r,a,L,o=0,w=0,x=!1,O=300;var c="0px";function u(){o=T(),n=S.mozPaintCount||0,r=0,a=-1,t.left=t.left===c?window.innerWidth/2+"px":c,f()}function f(){var e=S.getComputedStyle(b,null),t=e&&e.left?+e.left.slice(0,-2):0;a!==t&&(r++,a=t),w=requestAnimationFrame(f)}function d(){var e=T()-o,t=(S.mozPaintCount||r)-n;cancelAnimationFrame(w),x&&(L(Math.min(Math.round(1e3*t/e),60)),u())}function l(){b||((b=g.createElement("div")).id="FPSMeterHelper",(t=b.style).position="absolute",t.backgroundColor="transparent",t.width="1px",t.height="1px",t.left=c,t.bottom=c,t.transition="left "+O+"ms linear",b.addEventListener("transitionend",d,!1))}function A(){x&&(l(),g.body.appendChild(b),setTimeout(u,0))}z(l);var B={rate:300,scrollableName:function(e){return e===document?"page":null},scrollableElement:S};function m(s,e){void 0===e&&(e=B);var f,r=e.rate,d=e.scrollableName,t=e.scrollableElement,i=!1,a=0,n=0,o=!1,l=[],c=0,m=0;function u(e){l.push(e)}function v(){o||(o=!0,n=a,setTimeout(p,r))}function p(){o=!1,n===a?(i=!1,x&&(x=!1,cancelAnimationFrame(w),b&&g.body.removeChild(b)),h()):v()}function h(){var e=d?d(f):null,t=k("pk-fps"+(e?"-"+e:""),s,"fps"),n=t[0],r=t[1],i=l.length,a=Math.floor(i/2),o=0,c=60,u=0;(l=l.sort()).forEach(function(e){c=Math.min(c,e),u=Math.max(u,e),o+=e}),0<i&&(o/=i,n("latency",0,m,"ms"),n("min",0,c),n("max",0,u),n("avg",0,o),n("median",0,i%2?l[a]:(l[a-1]+l[a])/2),r(null,0,o),l.length=0)}function y(){m=T()-c}function E(e){var t,n=e.target;i?f!==n&&(h(),c=T(),requestAnimationFrame(y)):(c=T(),L=u,(t=r)&&(O=t),x=i=!0,z(A),requestAnimationFrame(y)),f=n,a++,v()}return t&&t.addEventListener("scroll",E,!0),{handleScroll:E,destory:function(){t&&t.removeEventListener("scroll",E,!0)}}}var y={};function v(e,t){void 0===t&&(t=y);var n=k("pk-nav",e,"ms",!1),o=n[0],c=n[1];try{var r=h.timing,i=r.navigationStart,a=r.redirectStart,u=r.redirectEnd,s=r.fetchStart,f=r.domainLookupStart,d=r.domainLookupEnd,l=r.requestStart,m=r.responseStart,v=r.responseEnd,p=navigator.connection;p&&p.effectiveType&&o("conn-"+p.effectiveType,0,1,"raw"),a?(o("init",i,a),o("redirect",a,u),o("app-cache",u,f)):s?(o("init",i,s),o("app-cache",s,f)):o("init",i,f),o("dns",f,d),o("tcp",d,l),o("request",l,m),o("response",m,v),c("net",i,v,!0)}catch(t){}z(function e(){try{var t=h.timing,n=t.responseEnd,r=t.domInteractive,i=t.domContentLoadedEventEnd,a=t.domComplete;if(!a)return void setTimeout(e,250);o("interactive",n,r),o("content-loaded",r,i),o("complete",i,a),c("dom-ready",n,a,!0)}catch(e){}}),z(function e(){try{var t=h.timing,n=t.responseEnd,r=t.domComplete,i=t.loadEventEnd;if(!i)return void setTimeout(e,250);o("ready",n,r),o("load",r,i),c("dom-load",n,i,!0)}catch(e){}})}var p={};function E(e,t){void 0===t&&(t=p);var n=k("pk-paint",e),i=n[0],a=n[1];z(function e(){try{var t=h.getEntriesByType("paint");if(1<t.length){var n=0,r=0;t.sort(function(e,t){return e.startTime-t.startTime}).forEach(function(e){r=e.startTime,n=Math.max(n,r),i(e.name,0,r)}),a(null,0,n,!0)}else setTimeout(e,250)}catch(e){}})}var C={minLatency:100,ttiDelay:2e3,prefIdProp:"data-perf-id"};function M(e,n){void 0===n&&(n={});var r,i,a={},o=!1,c=!1,t=k("pk-perf",e),u=t[0],s=t[1],f=["click","touchup","submit","abort","blur","contextmenu","deviceorientation","offline","online","paint","popstate","resize","wheel","scroll"],d=n.minLatency,l=void 0===d?C.minLatency:d,m=n.ttiDelay,v=void 0===m?C.ttiDelay:m,p=n.getPerfId,h=void 0===p?function(e,t){for(var n;e&&!n&&1===e.nodeType;)n=e.getAttribute(t),e=e.parentNode;return n}:p;function y(e){return h(e&&1===e.nodeType?e:null,n.prefIdProp||C.prefIdProp)}function E(){Object.keys(a).forEach(function(e){var t=a[e];t.values.forEach(function(e){u(e[0],e[1],e[2])}),s(e,t.start,t.end,!0)}),o=!(a={})}function g(e,t,n,r){void 0===n&&(n=0),void 0===r&&(r=T());var i=a[e]=a[e]||{start:0,end:0,values:[]};i.start=Math.min(i.start,n),i.end=Math.max(i.end,r),i.values.push([t,n,r]),!o&&setTimeout(E),o=!0}function b(e,t){var n=y(t.target),r="first-"+e+(c?"-ready":"");g(r,"value"),n&&g(r,n)}P(f,b),P(["beforeunload"],function(){g("tab-unload","value")}),["click","touchup","input","submit","resize","scroll"].forEach(function(i){S.addEventListener(i,function(e){var n=e.target,r=T();requestAnimationFrame(function(){var e=T();if(l<=e-r){var t=y(n);u("value",r,e),t&&u(t,r,e),s("latency-"+i,r,e,!0)}})},!0)});try{(i=new PerformanceObserver(function(e){r=e.getEntries().pop()})).observe({entryTypes:["longtask"]})}catch(e){}z(function(){if(c=!0,i){var e,t=function(){r?(e=r.startTime+r.duration,T()-e>=v?(g("tti","value",0,e),i.disconnect()):setTimeout(t,n.ttiDelay)):e?(g("tti","value",0,e),i.disconnect()):(e=T(),setTimeout(t,500))};t()}P(f,b)})}function P(e,r,i){e.forEach(function(t){var n=function(e){S.removeEventListener(t,n,!0),r(t,e)};(i=i||S).addEventListener(t,n,!0)})}var j=/^https?:\/\/(?:www\.)?(.*?)\.[a-z]+\//,F=6e4,q={};function D(e,t){void 0===t&&(t=q);var n=k("pk-resource-traffic",e,"KiB"),a=n[0],o=n[1],r=k("pk-resource-traffic-cached",e,"KiB"),c=r[0],u=r[1],i=k("pk-resource-stats",e,"KiB"),s=i[0],f=i[1],m=t.onBeforeEntryAdd,v=t.resourceName||function(e){var t=j.exec(e.name);return t?[e.initiatorType,t[1]]:null},p=t.intervals||[["15sec",15e3],["1min",F],["5min",5*F],["15min",15*F],["30min",30*F],["1hour",60*F],["1day",1440*F],["2days",2880*F]];z(function(){var d={size:0,cached:0,cachedSize:0,transfered:0,transferedSize:0,unmeasurable:0,duration:0},n=[],r="start";function l(e,t,n){t&&(e?c:a)(t,0,n)}function i(){var e=h.getEntriesByType("resource");e&&0<e.length&&(n=n.concat(e)),h.clearResourceTimings()}try{!function e(){i(),n.forEach(function(e){if(!m||!1!==m(e)){var t=e.duration,n=e.transferSize,r=e.entryType,i=e.nextHopProtocol,a=e.initiatorType,o=n||e.encodedBodySize||e.decodedBodySize,c=!n;if("navigation"===a&&(a="html"),a&&0<o){var u=[r,a,i];if(u.forEach(function(e){l(c,e,o)}),"html"!==a){var s=v(e),f=function(e,t,n){(0<t||-1!==u.indexOf(e))&&l(c,n.slice(0,t+1),o)};s&&s.length&&(Array.isArray(s[0])?s.forEach(function(e){e.forEach(f)}):s.forEach(f))}}d.size+=o,d.duration+=t,d[a]=(d[a]||0)+1,c?(d.cached++,d.cachedSize+=o):0<o?(d.transfered++,d.transferedSize+=o):d.unmeasurable++}}),Object.keys(d).forEach(function(e){s(e,0,d[e],"duration"===e?"ms":/size/i.test(e)?"KiB":"raw")}),f(r,0,d.size),0<d.transfered&&o(r,0,d.transferedSize),0<d.cachedSize&&u(r,0,d.cachedSize),n.length=0;var t=p.shift();t&&(r=t[0],setTimeout(e,t[1]))}(),h.onresourcetimingbufferfull=function(){i()}}catch(e){}})}var K=6e4;function H(e,t){void 0===t&&(t={});var n=k("pk-memory",e,"KiB"),a=n[0],o=n[1],c=t.intervals||[["15sec",15e3],["1min",K],["5min",5*K],["15min",15*K],["30min",30*K],["1hour",60*K],["1day",1440*K],["2days",2880*K]];z(function(){var i="start";try{!function e(){var t=h.memory,n=c.shift(),r=t.totalJSHeapSize;a("total",0,r),a("used",0,t.usedJSHeapSize),a("js",0,t.jsHeapSizeLimit),o(i,0,r,!0),n&&(i=n[0],setTimeout(e,n[1]))}()}catch(e){}})}return e.set=function(r,e){function t(e,t,n){e(r,i({},Object(n),Object(t)))}t(m,e.fps,B),t(v,e.navigation,y),t(E,e.paint,p),t(M,e.performance,C),t(D,e.resource,q),t(H,e.memory,{})},e}({});
