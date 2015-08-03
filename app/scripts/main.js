/* jshint devel:true */
/**
 * Main Rocco.me JavaScript file 
 */
(function(win, doc, U) {

  'use strict';

  /**
   * Do you wanna hire me? function 
   */
  // var confirmHireMe = function() {

  //   // Return confirm message
  //   return confirm('Are you sure?');
  // };

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
   * [slideContainer description]
   * @return {[type]} [description]
   */
  // var slideContainer = function(slideTo) {
  //   var container = doc.getElementById('main');
  // 
  //   // <div class="slider-control" id="slider-control">
  //   //   <a name="slideToLeft"><<</a>
  //   //   <a name="slideToCenter">O</a>
  //   //   <a name="slideToRight">>></a>
  //   // </div>
  // 
  //   U.removeClass(container, 'slideToLeft');
  //   U.removeClass(container, 'slideToCenter');
  //   U.removeClass(container, 'slideToRight');
  // 
  //   if (slideTo === 'slideToLeft') {
  //     U.addClass(container, 'slideToLeft');
  //   }
  //   if (slideTo === 'slideToCenter') {
  //     U.addClass(container, 'slideToCenter');
  //   }
  //   if (slideTo === 'slideToRight') {
  //     U.addClass(container, 'slideToRight');
  //   }
  // };

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

        // Notify Google Analytics
        if (typeof win.ga === 'function') {
          win.ga('send', 'event', 'button', 'click', 'hire-me-clicked');
        }

        // // If confirm is false, block execution
        // if (!confirmHireMe()) {
        //   return false;
        // }
      }

      // Check if is web protocol
      var isWeb = evt.target.protocol.search('http') !== -1 && true;

      // If local domain is different form the domain link
      if (isWeb && evt.target.host !== win.location.hostname) {

        // Open in a new browser window
        return win.open(evt.target.href, '_blank');
      }

      // Check if is control
      // if (evt.target.name.length > 0) {
      //   return slideContainer(evt.target.name);
      // }

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
    doc.getElementById('main').removeAttribute('style');
    U.removeClass(doc.getElementById('main'), 'hide');

    // Load
    U.simpleModal(

      // Messages
      '&#8220;True spirit of Zen, allowing your bright side ' +
        'coexist with your dark one.&#8221;',
      'This website contain an harsh language that could offend' +
        ' some people. So, if you are thinking' +
        ' to propose me a job choose "Hide Bad Words" below. :-D',

      // Set type
      'confirm',

      // Callback
      function(value){

        // Notify Google Analytics
        if (typeof win.ga === 'function') {
          win.ga('send', 'event', 'button', 'click', 'bad-words-'+value);
        }

        // Trigger typewriter terminal function
        win.triggerTypewriterTerminal();
      }
    );
  };

  /**
   * [typewriterTerminalText description]
   * @return {[type]} [description]
   */
  var typewriterTerminalText = function(id, idCursor) {

    // Defualt value
    id = id || 'typewriter';
    idCursor = idCursor || 'cursor';

    var place = doc.getElementById(id);
    var letters = place.innerHTML.split('');
    var cursor = doc.getElementById(idCursor);

    // Reset innerHTML
    place.innerHTML = '';
    
    var randomTime = function() {
      var rand = Math.floor(Math.random(1,5) * 1000 / 3);
      return rand;
    };
    
    var i = 0;
    var countLetters = letters.length;

    var typeNext = function(){
      
      if (i>=countLetters) {
        i=0;
        place.innerHTML = '';
      }

      place.innerHTML = place.innerHTML + letters[i];

      var rand = randomTime();

      if (i===countLetters-1) { rand = 30000; }
      
      setTimeout(typeNext, rand);

      i+=1;
    };
    
    // Execute the first time
    if (place.innerHTML.length > 3 || id.length > 0) {
      typeNext();
    }
    
    // cursor
    if (cursor.innerHTML.length === 1) {

      setInterval(function(){
        cursor.style.visibility = cursor.style.visibility === 'hidden' ? 'visible' : 'hidden';
      }, 400);
    }
  };

  /**
   * Initialize function on load of the page
   */
  var initialize = function() {

    // Run the first
    updateHtmlClasses();

    // Run all
    yearsOldParse();
    allLinkTags();
    updateWebsiteSemver();
    
    // Create trigger global function
    win.triggerTypewriterTerminal = function() {
      setTimeout(typewriterTerminalText, 1500);
    };
  };

  /**
   * When DOM is loaded, run initialize and welcomeMessage for window
   */
  U.listenEvent(doc, 'DOMContentLoaded', initialize);
  U.listenEvent(win, 'load', welcomeMessage);

})(this, this.document, this.utils);