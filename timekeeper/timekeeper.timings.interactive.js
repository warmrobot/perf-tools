var timekeeperTimingsInteractive=function(n){"use strict";var f=Function("return this")();var v={minLatency:100};function d(n,e,i){n.forEach(function(n){var t=function(){f.removeEventListener(n,t,!0),e(n)};(i=i||f).addEventListener(n,t,!0)})}return n.interactiveTimings=function(n,i){void 0===i&&(i=v);var r,c,t,o=(r="tk-interactive",c=n,function(n,t,e,i){var o=c.group(n?r+"-"+n:r,t,!0);i.forEach(function(n){o.add(n[0],n[1],n[2])}),o.stop(e)}),a=function(){return n.perf.now()},e=["click","touchup","submit","abort","blur","contextmenu","deviceorientation","offline","online","paint","popstate","resize","wheel","scroll"];function u(n,t,e,i){void 0===e&&(e=0),void 0===i&&(i=a()),o(n,e,i,[[t,e,i]])}d(e,function(n){u("first-"+n,"value")}),d(["beforeunload"],function(){u("tab-unload","value")}),["click","touchup","input","submit","resize","scroll"].forEach(function(t){var e;function n(){var n=a();n-e>=i.minLatency&&u("latency-"+t,"value",e,n)}f.addEventListener(t,function(){e=a(),requestAnimationFrame(n)},!0)}),t=function(){d(e,function(n){u("first-"+n,"after-ready")})},"complete"===f.document.readyState?t():window.addEventListener("DOMContentLoaded",t)},n}({});
