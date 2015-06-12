/* jshint devel:true */
/**
 * Utilities Rocco.me JavaScript file 
 */
(function(win) {

  'use strict';

  var doc = win.document;

  /**
   * [ajax description]
   * @param  {[type]}   url      [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  var ajax = function(url, callback) {
    if (typeof XMLHttpRequest === 'undefined') {
      return;
    }
    var xmlhttp;
    
    // compatible with IE7+, Firefox, Chrome, Opera, Safari 
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        callback(xmlhttp.responseText);
      }
    };
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
  };

  // Create element
  var createEl = function(tag) {
    return doc.createElement(tag);
  };

  /**
   * Very simple modal
   * @param  {[type]} msg  [description]
   * @param  {[type]} type [description]
   * @return {[type]}      [description]
   */
  var simpleModal = function(msg, type) { 

    // Select default status for type
    type = type || 'alert';
    
    // Local vars 
    var modal = createEl('div'),
      wrapper = createEl('div'),
      content = createEl('div'),
      text = createEl('div'),
      confirmBox = createEl('div'),
      className = 'modal ' + type;
    
    // Set modal's classes
    addClass(modal, className);
    addClass(wrapper, 'modal-wrapper');
    addClass(content, 'modal-content');
    addClass(text, 'text');
    
    // Set p content and append to text
    text.innerHTML = '<p class="firstLine">'+msg.firstLine+'</p>' +
      '<p class="secondLine">'+msg.secondLine+'</p>';
    
    // Append text to
    content.appendChild(text);
    wrapper.appendChild(content);

    // Append wrapper to
    modal.appendChild(wrapper);
    
    // Add confirm html
    if (type === 'confirm') {

      // Add class and other DOM manipulation
      addClass(confirmBox, 'confirmBox');
      confirmBox.innerHTML = '<div><a href="#okay">Show All Words</a>' +
                             '<a href="#nope">Hide Bad Words</a></div>';

      content.appendChild(confirmBox);

      // All links in confirm box
      var confirmLinks = confirmBox.getElementsByTagName('a');

      // Event listening
      listenEvent(confirmLinks, 'click', function(evt){

        var hash = evt.target.hash.replace('#', '');

        if (hash.length > 0) {

          if (hash === 'nope') { addClass(doc.body, 'hide-harsh'); }
          if (hash === 'okay') { removeClass(doc.body, 'hide-harsh'); }

          removeClass(modal, 'open');
          addClass(modal, 'close');

          removeClass(doc.getElementById('main'), 'blur');
        }

        // Prevent normal behaviour
        evt.preventDefault();
      });
    }

    // Add blur to #main
    addClass(doc.getElementById('main'), 'blur');

    // Append to body of page
    doc.body.appendChild(modal);

    // Add show the #main div
    setTimeout(function(){
      addClass(modal, 'open');
    }, 100);
  };

  /**
   * [addClass description]
   * @param {[type]} element    [description]
   * @param {[type]} classToAdd [description]
   */
  var addClass = function(element, classToAdd) {
    if (!element) { return; }
    var currentClassValue = element.className;
     
    if (currentClassValue.indexOf(classToAdd) === -1) {
      if ((currentClassValue === null) || (currentClassValue === '')) {
        element.className = classToAdd;
      } else {
        element.className += ' ' + classToAdd;
      }
    }

    return element;
  };

  /**
   * [removeClass description]
   * @param  {[type]} element       [description]
   * @param  {[type]} classToRemove [description]
   * @return {[type]}               [description]
   */
  var removeClass = function(element, classToRemove) {
    var currentClassValue = element.className;
     
    // removing a class value when there is more than one class value present
    // and the class you want to remove is not the first one
    if (currentClassValue.indexOf(' ' + classToRemove) !== -1) {
      element.className = element.className.replace(' ' + classToRemove, '');
      return;
    }
     
    // removing the first class value when there is more than one class
    // value present
    if (currentClassValue.indexOf(classToRemove + ' ') !== -1) {
      element.className = element.className.replace(classToRemove + ' ', '');
      return;
    }
     
    // removing the first class value when there is only one class value 
    // present
    if (currentClassValue.indexOf(classToRemove) !== -1) {
      element.className = element.className.replace(classToRemove, '');
      return;
    }

    return element;
  };

  /**
   * [listenEvent description]
   * @param  {[type]} els  [description]
   * @param  {[type]} evt  [description]
   * @param  {[type]} func [description]
   * @return {[type]}      [description]
   */
  var listenEvent = function(els, evt, func) {

    var listen = function(el) {

      if (win.addEventListener) {
        el.addEventListener(evt, func, false);
      } else if (win.attachEvent) {
        el.attachEvent(evt, func, false);
      }      
    };

    if (typeof els === 'object' && els.length > 0) {
      for (var i=0; i < els.length; i++) {
        listen(els[i]);
      }
      return;
    }

    listen(els);
  };

  /**
   * Register functions in window object
   * @type {Object}
   */
  win.utils = {
    'ajax': ajax,
    'listenEvent': listenEvent,
    'addClass': addClass,
    'removeClass': removeClass,
    'simpleModal': simpleModal
  };

})(this);