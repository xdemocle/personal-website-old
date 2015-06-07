/* jshint devel:true */
/**
 * Utilities Rocco.me JavaScript file
 */
(function(win){

  'use strict';

  var callAjax = function (url, callback) {
    if (typeof XMLHttpRequest === 'undefined') { return; }
    var xmlhttp;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200){
        callback(xmlhttp.responseText);
      }
    };
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
  };

  // Register in window object
  win.callAjax = callAjax;

})(this);