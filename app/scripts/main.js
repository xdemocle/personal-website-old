/* jshint devel:true */
/**
 * Main Rocco.me JavaScript file 
 */
(function(win) {

  'use strict';

  /**
   * Do you wanna hire me? function 
   */
  var confirmHireMe = function() {

    // Return confirm message
    return confirm('Are you sure?');
  };

  /**
   * Update website version
   */
  var updateWebsiteSemver = function() {

    // shittyVersion span ID
    var shittyVersionEl = win.document.getElementById('shittyVersion');

    win.callAjax('/manifest.json', function(jsonData) {

      // Update text
      shittyVersionEl.innerHTML = 'v' + JSON.parse(jsonData).version;
    });
  };

  /**
   * Add click event 
   */
  var addClickEvent = function(target) {

    // Bind clicks on links with hostname different from local one
    target.addEventListener('click', function(evt) {

      // Prevent default behaviour of links
      evt.preventDefault();

      // Hook hire-me class for confirm
      if (evt.target.className === 'hire-me') {

        // If confirm is false, block execution
        if (!confirmHireMe()) {
          return false;
        }
      }

      // Check if is web protocol
      var isWeb = evt.target.protocol.search('http') !== -1 && true;

      // If local domain is different form the domain link
      if (isWeb && evt.target.host !== win.location.hostname) {

        // Open in a new browser window
        return win.open(evt.target.href, '_blank');
      }

      // If no return, restore normal behaviour
      win.location.href = evt.target.href;

    }, false);
  };

  /**
   * years_old
   */
  var yearsOldParse = function() {

    // yearsOld span ID
    var yearsOldEl = win.document.getElementById('yearsOld');

    // Calculate my years old
    var yearsOld = (new Date()).getFullYear() - 1982;

    // Update text
    yearsOldEl.innerHTML = yearsOld;
  };

  /**
   * All link tags
   */
  var allLinkTags = function() {

    // All links
    var aTags = win.document.getElementsByTagName('a');

    // Add event listener for each links found it
    for (var i = 0; i < aTags.length; i++) {
      addClickEvent(aTags[i]);
    }
  };

  /**
   * Update HTML tag classes
   */
  var updateHtmlClasses = function(newClasses) {

    // Local html tag
    var html = win.document.getElementsByTagName('html')[0];

    // Remove initial.no - js class by default
    html.className = html.className.replace('no-js', '');

    // Update classes
    if (newClasses) {
      html.className = html.className + ' ' + newClasses;
    }
  };

  /**
   * Welcome confirm message
   */
  // var welcomeMessage = function() {

  //   // Load
  //   win.simpleModal('&#8220;True spirit of Zen, allowing your bright side ' +
  //     'coexist with your dark one.&#8221;', 'confirm');
  // };

  /**
   * Initialize function on load of the page
   */
  var initialize = function() {

    // Run all
    updateHtmlClasses();
    yearsOldParse();
    allLinkTags();
    updateWebsiteSemver();
    // welcomeMessage();
  };

  /**
   * When document is loaded run initialize
   */
  if (win.addEventListener) {
    win.document.addEventListener('DOMContentLoaded', initialize, false);
  } else if (win.attachEvent) {
    win.document.attachEvent('onDOMContentLoaded', initialize);
  }

})(this);