var timekeeperAnalytics=function(e){"use strict";var g=Function("return this")(),a={useTabName:function(e){var n=e.pathname;return("/"===n?"index":n).replace(/[\/\.]+/g,"-").replace(/^-|-$/g,"")}};return e.googleAnalytics=function(n,i){void 0===i&&(i=a);var t=[],r=function(e){n?n("send",e):t.push(e)};return n||function e(){(n=g.gtag?function(e,n){g.gtag("event","timing_complete",{name:n.timingVar,value:n.timingValue,event_category:n.timingCategory,event_label:n.timingLabel})}:g.ga)?(t.forEach(r),t.length=0):setTimeout(e,500)}(),function(e){var n=e.name,t="value",a=e.parent;if(a)for(t=e.name;;){if(!a.parent){n=a.name;break}t=a.name+"_"+t,a=a.parent}r({hitType:"timing",timingCategory:n,timingVar:t,timingValue:Math.round(e.end-e.start),timingLabel:i.useTabName?i.useTabName(g.location):void 0})}},e}({});
