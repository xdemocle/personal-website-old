!function(e){"use strict";var n=e.document,t=function(e,n){if("undefined"!=typeof XMLHttpRequest){var t;t=new XMLHttpRequest,t.onreadystatechange=function(){4===t.readyState&&200===t.status&&n(t.responseText)},t.open("GET",e,!0),t.send()}},a=function(e){return n.createElement(e)},o=function(e,t,o){t=t||"alert";var l=a("div"),d=a("div"),c=a("div"),f=a("div"),u=a("div"),m="modal "+t;if(i(l,m),i(d,"modal-wrapper"),i(c,"modal-content"),i(f,"text"),f.innerHTML='<p class="firstLine">'+e.firstLine+'</p><p class="secondLine">'+e.secondLine+"</p>",c.appendChild(f),d.appendChild(c),l.appendChild(d),"confirm"===t){i(u,"confirmBox"),u.innerHTML='<div><a href="#okay">Show All Words</a><a href="#nope">Hide Bad Words</a></div>',c.appendChild(u);var p=u.getElementsByTagName("a");r(p,"click",function(e){var t=e.target.hash.replace("#","");t.length>0&&("nope"===t&&i(n.body,"hide-harsh"),"okay"===t&&s(n.body,"hide-harsh"),s(l,"open"),i(l,"close"),s(n.getElementById("main"),"blur"),s(n.body,"no-overflow")),"function"==typeof o&&o("okay"===t?1:0),e.preventDefault()})}i(n.getElementById("main"),"blur"),n.body.appendChild(l),i(n.body,"no-overflow"),setTimeout(function(){i(l,"open")},100)},i=function(e,n){if(e){var t=e.className;return-1===t.indexOf(n)&&(null===t||""===t?e.className=n:e.className+=" "+n),e}},s=function(e,n){var t=e.className;return-1!==t.indexOf(" "+n)?void(e.className=e.className.replace(" "+n,"")):-1!==t.indexOf(n+" ")?void(e.className=e.className.replace(n+" ","")):-1!==t.indexOf(n)?void(e.className=e.className.replace(n,"")):e},r=function(n,t,a){var o=function(n){e.addEventListener?n.addEventListener(t,a,!1):e.attachEvent&&n.attachEvent(t,a,!1)};if("object"==typeof n&&n.length>0)for(var i=0;i<n.length;i++)o(n[i]);else o(n)};e.utils={ajax:t,listenEvent:r,addClass:i,removeClass:s,simpleModal:o}}(this),function(e,n,t){"use strict";var a=function(){return confirm("Are you sure?")},o=function(){var e=n.getElementById("shittyVersion");t.ajax("/manifest.json",function(n){e.innerHTML="v"+JSON.parse(n).version})},i=function(n){n.addEventListener("click",function(n){if(n.preventDefault(),"hire-me"===n.target.className&&("function"==typeof e.ga&&e.ga("send","event","button","click","hire-me-clicked"),!a()))return!1;var t=-1!==n.target.protocol.search("http")&&!0;return t&&n.target.host!==e.location.hostname?e.open(n.target.href,"_blank"):void(e.location.href=n.target.href)},!1)},s=function(){var e=n.getElementById("yearsOld"),t=(new Date).getFullYear()-1982;e.innerHTML=t},r=function(){for(var e=n.getElementsByTagName("a"),t=0;t<e.length;t++)i(e[t])},l=function(e){var t=n.getElementsByTagName("html")[0];t.className=t.className.replace("no-js",""),e&&(t.className=t.className+" "+e)},d=function(){t.addClass(n.getElementById("preloader"),"displayHide"),t.removeClass(n.getElementById("main"),"hide"),t.simpleModal({firstLine:"&#8220;True spirit of Zen, allowing your bright side coexist with your dark one.&#8221;",secondLine:'This website contain an harsh language that could offend some people. So, if you are thinking to propose me a job choose "Hide Bad Words" below. :-D'},"confirm",function(n){"function"==typeof e.ga&&e.ga("send","event","button","click","bad-words",n)})},c=function(){l(),s(),r(),o()};t.listenEvent(n,"DOMContentLoaded",c),t.listenEvent(e,"load",d)}(this,this.document,this.utils);