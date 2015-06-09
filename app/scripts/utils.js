/* jshint devel:true */
/** * Utilities Rocco.me JavaScript file */
(function(win) {
  'use strict';
  var doc = win.document;

  /**
   * [callAjax description]
   */
  var callAjax = function(url, callback) {
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

  /**
   * Very simple modal
   */
  var simpleModal = function(msg, type) { 

    // Select default status for type
    type = type || 'alert';
    
    // Create element
    function createEl(tag) {
      return doc.createElement(tag);
    }
    
    // Create an modal div element
    function createModalEl(htmlString) {
      
      // Local vars 
      var modal = createEl('div'),
        text = createEl('div'),
        p = createEl('p'),
        confirmBox = createEl('div'),
        className = 'modal ' + type;
      
      // Set modal's class
      modal.setAttribute('class', className);
      text.setAttribute('class', 'text');
      
      // Set p content and append to text
      p.innerHTML = msg;
      text.appendChild(p);
      
      // Append text to
      modal.appendChild(text);
      
      // Add confirm html
      if (type === 'confirm') {
        confirmBox.setAttribute('class', 'confirmBox');
        confirmBox.innerHTML = '<div><a href="#">Okay</a><a href="#">Nope</a></div>';
        modal.appendChild(confirmBox);
      }

      console.log(modal);
      
      // Append to body of page
      // doc.body.appendChild(modal); 
    }

    // Create modal
    createModalEl(msg);
  };

  // Register functions in window object
  win.callAjax = callAjax;
  win.simpleModal = simpleModal;

})(this);