/* jshint devel:true */
/**
 * Main Rocco.me JavaScript file
 */
(function(win){

  'use strict';
  
  /**
   * Add click event
   */
  var addClickEvent = function (target) {

    // Bind clicks on links with hostname different from local one
    target.addEventListener('click', function(evt){

      // If local domain is different form the domain link
      if (evt.target.host !== win.location.hostname) {

        // Prevent default behaviour of links
        evt.preventDefault();

        // Open in a new browser window
        win.open(evt.target.href, '_blank');
      }

    }, false);
  };

  /**
   * years_old
   */
  
  /**
   * Init function on load of the page
   */
  var init = function () {

    var aTags = win.document.getElementsByTagName('a');

    for (var i=0;i<aTags.length;i++){
      addClickEvent(aTags[i]);
    }
  };

  /**
   * Update html tag classes
   */
  (function (newClasses) {

    // Local html tag
    var html = win.document.getElementsByTagName('html')[0];

    // Remove initial .no-js class by default
    html.className = html.className.replace('no-js', '');

    // Update classes
    if (newClasses) {
      html.className = html.className + ' ' + newClasses;
    }

  })();

  /**
   * When document is loaded initiate init
   */
  if (win.addEventListener) {
    win.document.addEventListener('DOMContentLoaded', init, false);
  } else if (win.attachEvent) {
    win.document.attachEvent('onDOMContentLoaded', init);
  }

})(this);