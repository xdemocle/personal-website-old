/* jshint devel:true */
/**
 * Main Rocco.me JavaScript file 
 */
(function(win, doc, U) {

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
    var shittyVersionEl = doc.getElementById('shittyVersion');

    U.ajax('/manifest.json', function(jsonData) {

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
    var yearsOldEl = doc.getElementById('yearsOld');

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
    var aTags = doc.getElementsByTagName('a');

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
    var html = doc.getElementsByTagName('html')[0];

    // Remove initial .no-js class by default
    html.className = html.className.replace('no-js', '');

    // Update classes
    if (newClasses) {
      html.className = html.className + ' ' + newClasses;
    }
  };

  /**
   * Welcome confirm message
   */
  var welcomeMessage = function() {

    // Hide loader
    U.addClass(doc.getElementById('preloader'), 'displayHide');

    // Remove hide to show the #main div
    U.removeClass(doc.getElementById('main'), 'hide');

    // Load
    U.simpleModal({
      'firstLine': '&#8220;True spirit of Zen, allowing your bright side ' +
        'coexist with your dark one.&#8221;',
      'secondLine': 'This website contain an harsh language that could offend' +
        ' someone as well as isn\'t such professional. So, if you are thinking' +
        ' to propose me a job choose "Hide Bad Words" below.'
    }, 'confirm');
  };

  /**
   * Initialize function on load of the page
   */
  var initialize = function() {

    // Run all
    updateHtmlClasses();
    yearsOldParse();
    allLinkTags();
    updateWebsiteSemver();
  };

  /**
   * When DOM is loaded, run initialize and welcomeMessage for window
   */
  U.listenEvent(doc, 'DOMContentLoaded', initialize);
  U.listenEvent(win, 'load', welcomeMessage);

})(this, this.document, this.utils);