/*! Amaze UI v2.4.2 | by Amaze UI Team | (c) 2015 AllMobilize, Inc. | Licensed under MIT | 2015-07-06T10:25:45+0800 */
 
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.AMUI = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);
_dereq_(30);
_dereq_(3);
_dereq_(4);
_dereq_(5);
_dereq_(6);
_dereq_(7);
_dereq_(8);
_dereq_(9);
_dereq_(10);
_dereq_(11);
_dereq_(12);
_dereq_(13);
_dereq_(14);
_dereq_(15);
_dereq_(16);
_dereq_(17);
_dereq_(18);
_dereq_(19);
_dereq_(20);
_dereq_(21);
_dereq_(22);
_dereq_(23);
_dereq_(24);
_dereq_(25);
_dereq_(26);
_dereq_(27);
_dereq_(28);
_dereq_(29);
_dereq_(31);
_dereq_(32);
_dereq_(33);
_dereq_(34);
_dereq_(35);
_dereq_(36);
_dereq_(37);
_dereq_(38);
_dereq_(39);
_dereq_(40);
_dereq_(41);
_dereq_(42);
_dereq_(43);
_dereq_(44);
_dereq_(45);
_dereq_(46);
_dereq_(47);
_dereq_(48);
_dereq_(49);
_dereq_(50);
_dereq_(51);
_dereq_(52);

module.exports = $.AMUI = UI;

},{"10":10,"11":11,"12":12,"13":13,"14":14,"15":15,"16":16,"17":17,"18":18,"19":19,"2":2,"20":20,"21":21,"22":22,"23":23,"24":24,"25":25,"26":26,"27":27,"28":28,"29":29,"3":3,"30":30,"31":31,"32":32,"33":33,"34":34,"35":35,"36":36,"37":37,"38":38,"39":39,"4":4,"40":40,"41":41,"42":42,"43":43,"44":44,"45":45,"46":46,"47":47,"48":48,"49":49,"5":5,"50":50,"51":51,"52":52,"6":6,"7":7,"8":8,"9":9}],2:[function(_dereq_,module,exports){
'use strict';

/* jshint -W040 */

var $ = (window.jQuery);

if (typeof $ === 'undefined') {
  throw new Error('Amaze UI 2.x requires jQuery :-(\n' +
  '\u7231\u4e0a\u4e00\u5339\u91ce\u9a6c\uff0c\u53ef\u4f60' +
  '\u7684\u5bb6\u91cc\u6ca1\u6709\u8349\u539f\u2026');
}

var UI = $.AMUI || {};
var $win = $(window);
var doc = window.document;
var $html = $('html');

UI.VERSION = '2.4.2';

UI.support = {};

UI.support.transition = (function() {
  var transitionEnd = (function() {
    // https://developer.mozilla.org/en-US/docs/Web/Events/transitionend#Browser_compatibility
    var element = doc.body || doc.documentElement;
    var transEndEventNames = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend'
    };

    for (var name in transEndEventNames) {
      if (element.style[name] !== undefined) {
        return transEndEventNames[name];
      }
    }
  })();

  return transitionEnd && {end: transitionEnd};
})();

UI.support.animation = (function() {
  var animationEnd = (function() {
    var element = doc.body || doc.documentElement;
    var animEndEventNames = {
      WebkitAnimation: 'webkitAnimationEnd',
      MozAnimation: 'animationend',
      OAnimation: 'oAnimationEnd oanimationend',
      animation: 'animationend'
    };

    for (var name in animEndEventNames) {
      if (element.style[name] !== undefined) {
        return animEndEventNames[name];
      }
    }
  })();

  return animationEnd && {end: animationEnd};
})();

/* jshint -W069 */
UI.support.touch = (
('ontouchstart' in window &&
navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
(window.DocumentTouch && document instanceof window.DocumentTouch) ||
(window.navigator['msPointerEnabled'] &&
window.navigator['msMaxTouchPoints'] > 0) || //IE 10
(window.navigator['pointerEnabled'] &&
window.navigator['maxTouchPoints'] > 0) || //IE >=11
false);

// https://developer.mozilla.org/zh-CN/docs/DOM/MutationObserver
UI.support.mutationobserver = (window.MutationObserver ||
window.WebKitMutationObserver || null);

// https://github.com/Modernizr/Modernizr/blob/924c7611c170ef2dc502582e5079507aff61e388/feature-detects/forms/validation.js#L20
UI.support.formValidation = (typeof document.createElement('form').
  checkValidity === 'function');

UI.utils = {};

/**
 * Debounce function
 * @param {function} func  Function to be debounced
 * @param {number} wait Function execution threshold in milliseconds
 * @param {bool} immediate  Whether the function should be called at
 *                          the beginning of the delay instead of the
 *                          end. Default is false.
 * @desc Executes a function when it stops being invoked for n seconds
 * @via  _.debounce() http://underscorejs.org
 */
UI.utils.debounce = function(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this;
    var args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
};

UI.utils.isInView = function(element, options) {
  var $element = $(element);
  var visible = !!($element.width() || $element.height()) &&
    $element.css('display') !== 'none';

  if (!visible) {
    return false;
  }

  var windowLeft = $win.scrollLeft();
  var windowTop = $win.scrollTop();
  var offset = $element.offset();
  var left = offset.left;
  var top = offset.top;

  options = $.extend({topOffset: 0, leftOffset: 0}, options);

  return (top + $element.height() >= windowTop &&
  top - options.topOffset <= windowTop + $win.height() &&
  left + $element.width() >= windowLeft &&
  left - options.leftOffset <= windowLeft + $win.width());
};

/* jshint -W054 */
UI.utils.parseOptions = UI.utils.options = function(string) {
  if ($.isPlainObject(string)) {
    return string;
  }

  var start = (string ? string.indexOf('{') : -1);
  var options = {};

  if (start != -1) {
    try {
      options = (new Function('',
        'var json = ' + string.substr(start) +
        '; return JSON.parse(JSON.stringify(json));'))();
    } catch (e) {
    }
  }

  return options;
};

/* jshint +W054 */

UI.utils.generateGUID = function(namespace) {
  var uid = namespace + '-' || 'am-';

  do {
    uid += Math.random().toString(36).substring(2, 7);
  } while (document.getElementById(uid));

  return uid;
};

/**
 * Plugin AMUI Component to jQuery
 *
 * @param {String} name - plugin name
 * @param {Function} Component - plugin constructor
 * @param {Object} [pluginOption]
 * @param {String} pluginOption.dataOptions
 * @param {Function} pluginOption.methodCall - custom method call
 * @param {Function} pluginOption.before
 * @param {Function} pluginOption.after
 * @since v2.4.1
 */
UI.plugin = function UIPlugin(name, Component, pluginOption) {
  var old = $.fn[name];
  pluginOption = pluginOption || {};

  $.fn[name] = function(option) {
    var allArgs = Array.prototype.slice.call(arguments, 0);
    var args = allArgs.slice(1);
    var propReturn;
    var $set = this.each(function() {
      var $this = $(this);
      var dataName = 'amui.' + name;
      var dataOptionsName = pluginOption.dataOptions || ('data-am-' + name);
      var instance = $this.data(dataName);
      var options = $.extend({},
        UI.utils.parseOptions($this.attr(dataOptionsName)),
        typeof option === 'object' && option);

      if (!instance && option === 'destroy') {
        return;
      }

      if (!instance) {
        $this.data(dataName, (instance = new Component(this, options)));
      }

      // custom method call
      if (pluginOption.methodCall) {
        pluginOption.methodCall.call($this, allArgs, instance);
      } else {
        // before method call
        pluginOption.before &&
        pluginOption.before.call($this, allArgs, instance);

        if (typeof option === 'string') {
          propReturn = typeof instance[option] === 'function' ?
            instance[option].apply(instance, args) : instance[option];
        }

        // after method call
        pluginOption.after && pluginOption.after.call($this, allArgs, instance);
      }
    });

    return (propReturn === undefined) ? $set : propReturn;
  };

  $.fn[name].Constructor = Component;

  // no conflict
  $.fn[name].noConflict = function() {
    $.fn[name] = old;
    console.log(this);
    return this;
  };

  UI[name] = Component;
};

// http://blog.alexmaccaw.com/css-transitions
$.fn.emulateTransitionEnd = function(duration) {
  var called = false;
  var $el = this;

  $(this).one(UI.support.transition.end, function() {
    called = true;
  });

  var callback = function() {
    if (!called) {
      $($el).trigger(UI.support.transition.end);
    }
    $el.transitionEndTimmer = undefined;
  };
  this.transitionEndTimmer = setTimeout(callback, duration);
  return this;
};

$.fn.redraw = function() {
  return this.each(function() {
    /* jshint unused:false */
    var redraw = this.offsetHeight;
  });
};

/* jshint unused:true */

$.fn.transitionEnd = function(callback) {
  var endEvent = UI.support.transition.end;
  var dom = this;

  function fireCallBack(e) {
    callback.call(this, e);
    endEvent && dom.off(endEvent, fireCallBack);
  }

  if (callback && endEvent) {
    dom.on(endEvent, fireCallBack);
  }

  return this;
};

$.fn.removeClassRegEx = function() {
  return this.each(function(regex) {
    var classes = $(this).attr('class');

    if (!classes || !regex) {
      return false;
    }

    var classArray = [];
    classes = classes.split(' ');

    for (var i = 0, len = classes.length; i < len; i++) {
      if (!classes[i].match(regex)) {
        classArray.push(classes[i]);
      }
    }

    $(this).attr('class', classArray.join(' '));
  });
};

//
$.fn.alterClass = function(removals, additions) {
  var self = this;

  if (removals.indexOf('*') === -1) {
    // Use native jQuery methods if there is no wildcard matching
    self.removeClass(removals);
    return !additions ? self : self.addClass(additions);
  }

  var classPattern = new RegExp('\\s' +
  removals.
    replace(/\*/g, '[A-Za-z0-9-_]+').
    split(' ').
    join('\\s|\\s') +
  '\\s', 'g');

  self.each(function(i, it) {
    var cn = ' ' + it.className + ' ';
    while (classPattern.test(cn)) {
      cn = cn.replace(classPattern, ' ');
    }
    it.className = $.trim(cn);
  });

  return !additions ? self : self.addClass(additions);
};

// handle multiple browsers for requestAnimationFrame()
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
// https://github.com/gnarf/jquery-requestAnimationFrame
UI.utils.rAF = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
      // if all else fails, use setTimeout
    function(callback) {
      return window.setTimeout(callback, 1000 / 60); // shoot for 60 fps
    };
})();

// handle multiple browsers for cancelAnimationFrame()
UI.utils.cancelAF = (function() {
  return window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.oCancelAnimationFrame ||
    function(id) {
      window.clearTimeout(id);
    };
})();

// via http://davidwalsh.name/detect-scrollbar-width
UI.utils.measureScrollbar = function() {
  if (document.body.clientWidth >= window.innerWidth) {
    return 0;
  }

  // if ($html.width() >= window.innerWidth) return;
  // var scrollbarWidth = window.innerWidth - $html.width();
  var $measure = $('<div ' +
  'style="width: 100px;height: 100px;overflow: scroll;' +
  'position: absolute;top: -9999px;"></div>');

  $(document.body).append($measure);

  var scrollbarWidth = $measure[0].offsetWidth - $measure[0].clientWidth;

  $measure.remove();

  return scrollbarWidth;
};

UI.utils.imageLoader = function($image, callback) {
  function loaded() {
    callback($image[0]);
  }

  function bindLoad() {
    this.one('load', loaded);
    if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
      var src = this.attr('src');
      var param = src.match(/\?/) ? '&' : '?';

      param += 'random=' + (new Date()).getTime();
      this.attr('src', src + param);
    }
  }

  if (!$image.attr('src')) {
    loaded();
    return;
  }

  if ($image[0].complete || $image[0].readyState === 4) {
    loaded();
  } else {
    bindLoad.call($image);
  }
};

/**
 * https://github.com/cho45/micro-template.js
 * (c) cho45 http://cho45.github.com/mit-license
 */
/* jshint -W109 */
UI.template = function(id, data) {
  var me = UI.template;

  if (!me.cache[id]) {
    me.cache[id] = (function() {
      var name = id;
      var string = /^[\w\-]+$/.test(id) ?
        me.get(id) : (name = 'template(string)', id); // no warnings

      var line = 1;
      var body = ('try { ' + (me.variable ?
      'var ' + me.variable + ' = this.stash;' : 'with (this.stash) { ') +
      "this.ret += '" +
      string.
        replace(/<%/g, '\x11').replace(/%>/g, '\x13'). // if you want other tag, just edit this line
        replace(/'(?![^\x11\x13]+?\x13)/g, '\\x27').
        replace(/^\s*|\s*$/g, '').
        replace(/\n/g, function() {
          return "';\nthis.line = " + (++line) + "; this.ret += '\\n";
        }).
        replace(/\x11-(.+?)\x13/g, "' + ($1) + '").
        replace(/\x11=(.+?)\x13/g, "' + this.escapeHTML($1) + '").
        replace(/\x11(.+?)\x13/g, "'; $1; this.ret += '") +
      "'; " + (me.variable ? "" : "}") + "return this.ret;" +
      "} catch (e) { throw 'TemplateError: ' + e + ' (on " + name +
      "' + ' line ' + this.line + ')'; } " +
      "//@ sourceURL=" + name + "\n" // source map
      ).replace(/this\.ret \+= '';/g, '');
      /* jshint -W054 */
      var func = new Function(body);
      var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '\x22': '&#x22;',
        '\x27': '&#x27;'
      };
      var escapeHTML = function(string) {
        return ('' + string).replace(/[&<>\'\"]/g, function(_) {
          return map[_];
        });
      };

      return function(stash) {
        return func.call(me.context = {
          escapeHTML: escapeHTML,
          line: 1,
          ret: '',
          stash: stash
        });
      };
    })();
  }

  return data ? me.cache[id](data) : me.cache[id];
};
/* jshint +W109 */
/* jshint +W054 */

UI.template.cache = {};

UI.template.get = function(id) {
  if (id) {
    var element = document.getElementById(id);
    return element && element.innerHTML || '';
  }
};

// Dom mutation watchers
UI.DOMWatchers = [];
UI.DOMReady = false;
UI.ready = function(callback) {
  UI.DOMWatchers.push(callback);
  if (UI.DOMReady) {
    // console.log('Ready call');
    callback(document);
  }
};

UI.DOMObserve = function(elements, options, callback) {
  var Observer = UI.support.mutationobserver;
  if (!Observer) {
    return;
  }

  options = $.isPlainObject(options) ?
    options : {childList: true, subtree: true};

  callback = typeof callback === 'function' && callback || function() {
  };

  $(elements).each(function() {
    var element = this;
    var $element = $(element);

    if ($element.data('am.observer')) {
      return;
    }

    try {
      var observer = new Observer(UI.utils.debounce(
        function(mutations, instance) {
        callback.call(element, mutations, instance);
        // trigger this event manually if MutationObserver not supported
        $element.trigger('changed.dom.amui');
      }, 50));

      observer.observe(element, options);

      $element.data('am.observer', observer);
    } catch (e) {
    }
  });
};

$.fn.DOMObserve = function(options, callback) {
  return this.each(function() {
    UI.DOMObserve(this, options, callback);
  });
};

if (UI.support.touch) {
  $html.addClass('am-touch');
}

$(document).on('changed.dom.amui', function(e) {
  var element = e.target;

  // TODO: just call changed element's watcher
  //       every watcher callback should have a key
  //       use like this: <div data-am-observe='key1, key2'>
  //       get keys via $(element).data('amObserve')
  //       call functions store with these keys
  $.each(UI.DOMWatchers, function(i, watcher) {
    watcher(element);
  });
});

$(function() {
  var $body = $('body');

  UI.DOMReady = true;

  // Run default init
  $.each(UI.DOMWatchers, function(i, watcher) {
    watcher(document);
  });

  // watches DOM
  UI.DOMObserve('[data-am-observe]');

  $html.removeClass('no-js').addClass('js');

  UI.support.animation && $html.addClass('cssanimations');

  // iOS standalone mode
  if (window.navigator.standalone) {
    $html.addClass('am-standalone');
  }

  $('.am-topbar-fixed-top').length &&
  $body.addClass('am-with-topbar-fixed-top');

  $('.am-topbar-fixed-bottom').length &&
  $body.addClass('am-with-topbar-fixed-bottom');

  // Remove responsive classes in .am-layout
  var $layout = $('.am-layout');
  $layout.find('[class*="md-block-grid"]').alterClass('md-block-grid-*');
  $layout.find('[class*="lg-block-grid"]').alterClass('lg-block-grid');

  // widgets not in .am-layout
  $('[data-am-widget]').each(function() {
    var $widget = $(this);
    // console.log($widget.parents('.am-layout').length)
    if ($widget.parents('.am-layout').length === 0) {
      $widget.addClass('am-no-layout');
    }
  });
});

module.exports = UI;

},{}],3:[function(_dereq_,module,exports){
'use strict';

var UI = _dereq_(2);

/* jshint -W101, -W106 */
/**
 * Add to Homescreen v3.2.2
 * (c) 2015 Matteo Spinelli
 * @license: http://cubiq.org/license
 */

// Check for addEventListener browser support (prevent errors in IE<9)
var _eventListener = 'addEventListener' in window;

// Check if document is loaded, needed by autostart
var _DOMReady = false;
if (document.readyState === 'complete') {
  _DOMReady = true;
} else if (_eventListener) {
  window.addEventListener('load', loaded, false);
}

function loaded() {
  window.removeEventListener('load', loaded, false);
  _DOMReady = true;
}

// regex used to detect if app has been added to the homescreen
var _reSmartURL = /\/ath(\/)?$/;
var _reQueryString = /([\?&]ath=[^&]*$|&ath=[^&]*(&))/;

// singleton
var _instance;
function ath(options) {
  _instance = _instance || new ath.Class(options);

  return _instance;
}

// message in all supported languages
ath.intl = {
  en_us: {
    ios: 'To add this web app to the home screen: tap %icon and then <strong>Add to Home Screen</strong>.',
    android: 'To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class="ath-action-icon">icon</span>.</small>'
  },

  zh_cn: {
    ios: '如要把应用程式加至主屏幕,请点击%icon, 然后<strong>加至主屏幕</strong>',
    android: 'To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class="ath-action-icon">icon</span>.</small>'
  },

  zh_tw: {
    ios: '如要把應用程式加至主屏幕, 請點擊%icon, 然後<strong>加至主屏幕</strong>.',
    android: 'To add this web app to the home screen open the browser option menu and tap on <strong>Add to homescreen</strong>. <small>The menu can be accessed by pressing the menu hardware button if your device has one, or by tapping the top right menu icon <span class="ath-action-icon">icon</span>.</small>'
  }
};

// Add 2 characters language support (Android mostly)
for (var lang in ath.intl) {
  ath.intl[lang.substr(0, 2)] = ath.intl[lang];
}

// default options
ath.defaults = {
  appID: 'org.cubiq.addtohome',		// local storage name (no need to change)
  fontSize: 15,				// base font size, used to properly resize the popup based on viewport scale factor
  debug: false,				// override browser checks
  logging: false,				// log reasons for showing or not showing to js console; defaults to true when debug is true
  modal: false,				// prevent further actions until the message is closed
  mandatory: false,			// you can't proceed if you don't add the app to the homescreen
  autostart: true,			// show the message automatically
  skipFirstVisit: false,		// show only to returning visitors (ie: skip the first time you visit)
  startDelay: 1,				// display the message after that many seconds from page load
  lifespan: 15,				// life of the message in seconds
  displayPace: 1440,			// minutes before the message is shown again (0: display every time, default 24 hours)
  maxDisplayCount: 0,			// absolute maximum number of times the message will be shown to the user (0: no limit)
  icon: true,					// add touch icon to the message
  message: '',				// the message can be customized
  validLocation: [],			// list of pages where the message will be shown (array of regexes)
  onInit: null,				// executed on instance creation
  onShow: null,				// executed when the message is shown
  onRemove: null,				// executed when the message is removed
  onAdd: null,				// when the application is launched the first time from the homescreen (guesstimate)
  onPrivate: null,			// executed if user is in private mode
  privateModeOverride: false,	// show the message even in private mode (very rude)
  detectHomescreen: false		// try to detect if the site has been added to the homescreen (false | true | 'hash' | 'queryString' | 'smartURL')
};

// browser info and capability
var _ua = window.navigator.userAgent;

var _nav = window.navigator;
_extend(ath, {
  hasToken: document.location.hash == '#ath' || _reSmartURL.test(document.location.href) || _reQueryString.test(document.location.search),
  isRetina: window.devicePixelRatio && window.devicePixelRatio > 1,
  isIDevice: (/iphone|ipod|ipad/i).test(_ua),
  isMobileChrome: _ua.indexOf('Android') > -1 && (/Chrome\/[.0-9]*/).test(_ua) && _ua.indexOf("Version") == -1,
  isMobileIE: _ua.indexOf('Windows Phone') > -1,
  language: _nav.language && _nav.language.toLowerCase().replace('-', '_') || ''
});

// falls back to en_us if language is unsupported
ath.language = ath.language && ath.language in ath.intl ? ath.language : 'en_us';

ath.isMobileSafari = ath.isIDevice && _ua.indexOf('Safari') > -1 && _ua.indexOf('CriOS') < 0;
ath.OS = ath.isIDevice ? 'ios' : ath.isMobileChrome ? 'android' : ath.isMobileIE ? 'windows' : 'unsupported';

ath.OSVersion = _ua.match(/(OS|Android) (\d+[_\.]\d+)/);
ath.OSVersion = ath.OSVersion && ath.OSVersion[2] ? +ath.OSVersion[2].replace('_', '.') : 0;

ath.isStandalone = 'standalone' in window.navigator && window.navigator.standalone;
ath.isTablet = (ath.isMobileSafari && _ua.indexOf('iPad') > -1) || (ath.isMobileChrome && _ua.indexOf('Mobile') < 0);

ath.isCompatible = (ath.isMobileSafari && ath.OSVersion >= 6) || ath.isMobileChrome;	// TODO: add winphone

var _defaultSession = {
  lastDisplayTime: 0,			// last time we displayed the message
  returningVisitor: false,	// is this the first time you visit
  displayCount: 0,			// number of times the message has been shown
  optedout: false,			// has the user opted out
  added: false				// has been actually added to the homescreen
};

ath.removeSession = function(appID) {
  try {
    if (!localStorage) {
      throw new Error('localStorage is not defined');
    }

    localStorage.removeItem(appID || ath.defaults.appID);
  } catch (e) {
    // we are most likely in private mode
  }
};

ath.doLog = function(logStr) {
  if (this.options.logging) {
    console.log(logStr);
  }
};

ath.Class = function(options) {
  // class methods
  this.doLog = ath.doLog;

  // merge default options with user config
  this.options = _extend({}, ath.defaults);
  _extend(this.options, options);
  // override defaults that are dependent on each other
  if (options.debug && (typeof options.logging === "undefined")) {
    this.options.logging = true;
  }

  // IE<9 so exit (I hate you, really)
  if (!_eventListener) {
    return;
  }

  // normalize some options
  this.options.mandatory = this.options.mandatory && ( 'standalone' in window.navigator || this.options.debug );
  this.options.modal = this.options.modal || this.options.mandatory;
  if (this.options.mandatory) {
    this.options.startDelay = -0.5;		// make the popup hasty
  }
  this.options.detectHomescreen = this.options.detectHomescreen === true ? 'hash' : this.options.detectHomescreen;

  // setup the debug environment
  if (this.options.debug) {
    ath.isCompatible = true;
    ath.OS = typeof this.options.debug == 'string' ? this.options.debug : ath.OS == 'unsupported' ? 'android' : ath.OS;
    ath.OSVersion = ath.OS == 'ios' ? '8' : '4';
  }

  // the element the message will be appended to
  this.container = document.documentElement;

  // load session
  this.session = this.getItem(this.options.appID);
  this.session = this.session ? JSON.parse(this.session) : undefined;

  // user most likely came from a direct link containing our token, we don't need it and we remove it
  if (ath.hasToken && ( !ath.isCompatible || !this.session )) {
    ath.hasToken = false;
    _removeToken();
  }

  // the device is not supported
  if (!ath.isCompatible) {
    this.doLog("Add to homescreen: not displaying callout because device not supported");
    return;
  }

  this.session = this.session || _defaultSession;

  // check if we can use the local storage
  try {
    if (!localStorage) {
      throw new Error('localStorage is not defined');
    }

    localStorage.setItem(this.options.appID, JSON.stringify(this.session));
    ath.hasLocalStorage = true;
  } catch (e) {
    // we are most likely in private mode
    ath.hasLocalStorage = false;

    if (this.options.onPrivate) {
      this.options.onPrivate.call(this);
    }
  }

  // check if this is a valid location
  var isValidLocation = !this.options.validLocation.length;
  for (var i = this.options.validLocation.length; i--;) {
    if (this.options.validLocation[i].test(document.location.href)) {
      isValidLocation = true;
      break;
    }
  }

  // check compatibility with old versions of add to homescreen. Opt-out if an old session is found
  if (this.getItem('addToHome')) {
    this.optOut();
  }

  // critical errors:
  if (this.session.optedout) {
    this.doLog("Add to homescreen: not displaying callout because user opted out");
    return;
  }
  if (this.session.added) {
    this.doLog("Add to homescreen: not displaying callout because already added to the homescreen");
    return;
  }
  if (!isValidLocation) {
    this.doLog("Add to homescreen: not displaying callout because not a valid location");
    return;
  }

  // check if the app is in stand alone mode
  if (ath.isStandalone) {
    // execute the onAdd event if we haven't already
    if (!this.session.added) {
      this.session.added = true;
      this.updateSession();

      if (this.options.onAdd && ath.hasLocalStorage) {	// double check on localstorage to avoid multiple calls to the custom event
        this.options.onAdd.call(this);
      }
    }

    this.doLog("Add to homescreen: not displaying callout because in standalone mode");
    return;
  }

  // (try to) check if the page has been added to the homescreen
  if (this.options.detectHomescreen) {
    // the URL has the token, we are likely coming from the homescreen
    if (ath.hasToken) {
      _removeToken();		// we don't actually need the token anymore, we remove it to prevent redistribution

      // this is called the first time the user opens the app from the homescreen
      if (!this.session.added) {
        this.session.added = true;
        this.updateSession();

        if (this.options.onAdd && ath.hasLocalStorage) {	// double check on localstorage to avoid multiple calls to the custom event
          this.options.onAdd.call(this);
        }
      }

      this.doLog("Add to homescreen: not displaying callout because URL has token, so we are likely coming from homescreen");
      return;
    }

    // URL doesn't have the token, so add it
    if (this.options.detectHomescreen == 'hash') {
      history.replaceState('', window.document.title, document.location.href + '#ath');
    } else if (this.options.detectHomescreen == 'smartURL') {
      history.replaceState('', window.document.title, document.location.href.replace(/(\/)?$/, '/ath$1'));
    } else {
      history.replaceState('', window.document.title, document.location.href + (document.location.search ? '&' : '?' ) + 'ath=');
    }
  }

  // check if this is a returning visitor
  if (!this.session.returningVisitor) {
    this.session.returningVisitor = true;
    this.updateSession();

    // we do not show the message if this is your first visit
    if (this.options.skipFirstVisit) {
      this.doLog("Add to homescreen: not displaying callout because skipping first visit");
      return;
    }
  }

  // we do no show the message in private mode
  if (!this.options.privateModeOverride && !ath.hasLocalStorage) {
    this.doLog("Add to homescreen: not displaying callout because browser is in private mode");
    return;
  }

  // all checks passed, ready to display
  this.ready = true;

  if (this.options.onInit) {
    this.options.onInit.call(this);
  }

  if (this.options.autostart) {
    this.doLog("Add to homescreen: autostart displaying callout");
    this.show();
  }
};

ath.Class.prototype = {
  // event type to method conversion
  events: {
    load: '_delayedShow',
    error: '_delayedShow',
    orientationchange: 'resize',
    resize: 'resize',
    scroll: 'resize',
    click: 'remove',
    touchmove: '_preventDefault',
    transitionend: '_removeElements',
    webkitTransitionEnd: '_removeElements',
    MSTransitionEnd: '_removeElements'
  },

  handleEvent: function(e) {
    var type = this.events[e.type];
    if (type) {
      this[type](e);
    }
  },

  show: function(force) {
    // in autostart mode wait for the document to be ready
    if (this.options.autostart && !_DOMReady) {
      setTimeout(this.show.bind(this), 50);
      // we are not displaying callout because DOM not ready, but don't log that because
      // it would log too frequently
      return;
    }

    // message already on screen
    if (this.shown) {
      this.doLog("Add to homescreen: not displaying callout because already shown on screen");
      return;
    }

    var now = Date.now();
    var lastDisplayTime = this.session.lastDisplayTime;

    if (force !== true) {
      // this is needed if autostart is disabled and you programmatically call the show() method
      if (!this.ready) {
        this.doLog("Add to homescreen: not displaying callout because not ready");
        return;
      }

      // we obey the display pace (prevent the message to popup too often)
      if (now - lastDisplayTime < this.options.displayPace * 60000) {
        this.doLog("Add to homescreen: not displaying callout because displayed recently");
        return;
      }

      // obey the maximum number of display count
      if (this.options.maxDisplayCount && this.session.displayCount >= this.options.maxDisplayCount) {
        this.doLog("Add to homescreen: not displaying callout because displayed too many times already");
        return;
      }
    }

    this.shown = true;

    // increment the display count
    this.session.lastDisplayTime = now;
    this.session.displayCount++;
    this.updateSession();

    // try to get the highest resolution application icon
    if (!this.applicationIcon) {
      if (ath.OS == 'ios') {
        this.applicationIcon = document.querySelector('head link[rel^=apple-touch-icon][sizes="152x152"],head link[rel^=apple-touch-icon][sizes="144x144"],head link[rel^=apple-touch-icon][sizes="120x120"],head link[rel^=apple-touch-icon][sizes="114x114"],head link[rel^=apple-touch-icon]');
      } else {
        this.applicationIcon = document.querySelector('head link[rel^="shortcut icon"][sizes="196x196"],head link[rel^=apple-touch-icon]');
      }
    }

    var message = '';

    if (typeof this.options.message == 'object' && ath.language in this.options.message) {		// use custom language message
      message = this.options.message[ath.language][ath.OS];
    } else if (typeof this.options.message == 'object' && ath.OS in this.options.message) {		// use custom os message
      message = this.options.message[ath.OS];
    } else if (this.options.message in ath.intl) {				// you can force the locale
      message = ath.intl[this.options.message][ath.OS];
    } else if (this.options.message !== '') {						// use a custom message
      message = this.options.message;
    } else if (ath.OS in ath.intl[ath.language]) {				// otherwise we use our message
      message = ath.intl[ath.language][ath.OS];
    }

    // add the action icon
    message = '<p>' + message.replace('%icon', '<span class="ath-action-icon">icon</span>') + '</p>';

    // create the message container
    this.viewport = document.createElement('div');
    this.viewport.className = 'ath-viewport';
    if (this.options.modal) {
      this.viewport.className += ' ath-modal';
    }
    if (this.options.mandatory) {
      this.viewport.className += ' ath-mandatory';
    }
    this.viewport.style.position = 'absolute';

    // create the actual message element
    this.element = document.createElement('div');
    this.element.className = 'ath-container ath-' + ath.OS + ' ath-' + ath.OS + (ath.OSVersion + '').substr(0, 1) + ' ath-' + (ath.isTablet ? 'tablet' : 'phone');
    this.element.style.cssText = '-webkit-transition-property:-webkit-transform,opacity;-webkit-transition-duration:0s;-webkit-transition-timing-function:ease-out;transition-property:transform,opacity;transition-duration:0s;transition-timing-function:ease-out;';
    this.element.style.webkitTransform = 'translate3d(0,-' + window.innerHeight + 'px,0)';
    this.element.style.transform = 'translate3d(0,-' + window.innerHeight + 'px,0)';

    // add the application icon
    if (this.options.icon && this.applicationIcon) {
      this.element.className += ' ath-icon';
      this.img = document.createElement('img');
      this.img.className = 'ath-application-icon';
      this.img.addEventListener('load', this, false);
      this.img.addEventListener('error', this, false);

      this.img.src = this.applicationIcon.href;
      this.element.appendChild(this.img);
    }

    this.element.innerHTML += message;

    // we are not ready to show, place the message out of sight
    this.viewport.style.left = '-99999em';

    // attach all elements to the DOM
    this.viewport.appendChild(this.element);
    this.container.appendChild(this.viewport);

    // if we don't have to wait for an image to load, show the message right away
    if (this.img) {
      this.doLog("Add to homescreen: not displaying callout because waiting for img to load");
    } else {
      this._delayedShow();
    }
  },

  _delayedShow: function(e) {
    setTimeout(this._show.bind(this), this.options.startDelay * 1000 + 500);
  },

  _show: function() {
    var that = this;

    // update the viewport size and orientation
    this.updateViewport();

    // reposition/resize the message on orientation change
    window.addEventListener('resize', this, false);
    window.addEventListener('scroll', this, false);
    window.addEventListener('orientationchange', this, false);

    if (this.options.modal) {
      // lock any other interaction
      document.addEventListener('touchmove', this, true);
    }

    // Enable closing after 1 second
    if (!this.options.mandatory) {
      setTimeout(function() {
        that.element.addEventListener('click', that, true);
      }, 1000);
    }

    // kick the animation
    setTimeout(function() {
      that.element.style.webkitTransitionDuration = '1.2s';
      that.element.style.transitionDuration = '1.2s';
      that.element.style.webkitTransform = 'translate3d(0,0,0)';
      that.element.style.transform = 'translate3d(0,0,0)';
    }, 0);

    // set the destroy timer
    if (this.options.lifespan) {
      this.removeTimer = setTimeout(this.remove.bind(this), this.options.lifespan * 1000);
    }

    // fire the custom onShow event
    if (this.options.onShow) {
      this.options.onShow.call(this);
    }
  },

  remove: function() {
    clearTimeout(this.removeTimer);

    // clear up the event listeners
    if (this.img) {
      this.img.removeEventListener('load', this, false);
      this.img.removeEventListener('error', this, false);
    }

    window.removeEventListener('resize', this, false);
    window.removeEventListener('scroll', this, false);
    window.removeEventListener('orientationchange', this, false);
    document.removeEventListener('touchmove', this, true);
    this.element.removeEventListener('click', this, true);

    // remove the message element on transition end
    this.element.addEventListener('transitionend', this, false);
    this.element.addEventListener('webkitTransitionEnd', this, false);
    this.element.addEventListener('MSTransitionEnd', this, false);

    // start the fade out animation
    this.element.style.webkitTransitionDuration = '0.3s';
    this.element.style.opacity = '0';
  },

  _removeElements: function() {
    this.element.removeEventListener('transitionend', this, false);
    this.element.removeEventListener('webkitTransitionEnd', this, false);
    this.element.removeEventListener('MSTransitionEnd', this, false);

    // remove the message from the DOM
    this.container.removeChild(this.viewport);

    this.shown = false;

    // fire the custom onRemove event
    if (this.options.onRemove) {
      this.options.onRemove.call(this);
    }
  },

  updateViewport: function() {
    if (!this.shown) {
      return;
    }

    this.viewport.style.width = window.innerWidth + 'px';
    this.viewport.style.height = window.innerHeight + 'px';
    this.viewport.style.left = window.scrollX + 'px';
    this.viewport.style.top = window.scrollY + 'px';

    var clientWidth = document.documentElement.clientWidth;

    this.orientation = clientWidth > document.documentElement.clientHeight ? 'landscape' : 'portrait';

    var screenWidth = ath.OS == 'ios' ? this.orientation == 'portrait' ? screen.width : screen.height : screen.width;
    this.scale = screen.width > clientWidth ? 1 : screenWidth / window.innerWidth;

    this.element.style.fontSize = this.options.fontSize / this.scale + 'px';
  },

  resize: function() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(this.updateViewport.bind(this), 100);
  },

  updateSession: function() {
    if (ath.hasLocalStorage === false) {
      return;
    }

    if (localStorage) {
      localStorage.setItem(this.options.appID, JSON.stringify(this.session));
    }
  },

  clearSession: function() {
    this.session = _defaultSession;
    this.updateSession();
  },

  getItem: function(item) {
    try {
      if (!localStorage) {
        throw new Error('localStorage is not defined');
      }

      return localStorage.getItem(item);
    } catch (e) {
      // Preventing exception for some browsers when fetching localStorage key
      ath.hasLocalStorage = false;
    }
  },

  optOut: function() {
    this.session.optedout = true;
    this.updateSession();
  },

  optIn: function() {
    this.session.optedout = false;
    this.updateSession();
  },

  clearDisplayCount: function() {
    this.session.displayCount = 0;
    this.updateSession();
  },

  _preventDefault: function(e) {
    e.preventDefault();
    e.stopPropagation();
  }
};

// utility
function _extend(target, obj) {
  for (var i in obj) {
    target[i] = obj[i];
  }

  return target;
}

function _removeToken() {
  if (document.location.hash == '#ath') {
    history.replaceState('', window.document.title, document.location.href.split('#')[0]);
  }

  if (_reSmartURL.test(document.location.href)) {
    history.replaceState('', window.document.title, document.location.href.replace(_reSmartURL, '$1'));
  }

  if (_reQueryString.test(document.location.search)) {
    history.replaceState('', window.document.title, document.location.href.replace(_reQueryString, '$2'));
  }
}

/* jshint +W101, +W106 */

ath.VERSION = '3.2.2';

module.exports = UI.addToHomescreen = ath;

},{"2":2}],4:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);

/**
 * @via https://github.com/Minwe/bootstrap/blob/master/js/alert.js
 * @copyright Copyright 2013 Twitter, Inc.
 * @license Apache 2.0
 */

// Alert Class
// NOTE: removeElement option is unavailable now
var Alert = function(element, options) {
  var _this = this;
  this.options = $.extend({}, Alert.DEFAULTS, options);
  this.$element = $(element);

  this.$element
    .addClass('am-fade am-in')
    .on('click.alert.amui', '.am-close', function() {
      _this.close();
    });
};

Alert.DEFAULTS = {
  removeElement: true
};

Alert.prototype.close = function() {
  var $element = this.$element;

  $element.trigger('close.alert.amui').removeClass('am-in');

  function processAlert() {
    $element.trigger('closed.alert.amui').remove();
  }

  UI.support.transition && $element.hasClass('am-fade') ?
    $element
      .one(UI.support.transition.end, processAlert)
      .emulateTransitionEnd(200) :
    processAlert();
};

// plugin
UI.plugin('alert', Alert);

// Init code
$(document).on('click.alert.amui.data-api', '[data-am-alert]', function(e) {
  var $target = $(e.target);
  $target.is('.am-close') && $(this).alert('close');
});

module.exports = Alert;

},{"2":2}],5:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);

/**
 * @via https://github.com/twbs/bootstrap/blob/master/js/button.js
 * @copyright (c) 2011-2014 Twitter, Inc
 * @license The MIT License
 */

var Button = function(element, options) {
  this.$element = $(element);
  this.options = $.extend({}, Button.DEFAULTS, options);
  this.isLoading = false;
  this.hasSpinner = false;
};

Button.DEFAULTS = {
  loadingText: 'loading...',
  disabledClassName: 'am-disabled',
  spinner: undefined
};

Button.prototype.setState = function(state, stateText) {
  var $element = this.$element;
  var disabled = 'disabled';
  var data = $element.data();
  var options = this.options;
  var val = $element.is('input') ? 'val' : 'html';
  var stateClassName = 'am-btn-' + state + ' ' + options.disabledClassName;

  state += 'Text';

  if (!options.resetText) {
    options.resetText = $element[val]();
  }

  // add spinner for element with html()
  if (UI.support.animation && options.spinner &&
    val === 'html' && !this.hasSpinner) {
    options.loadingText = '<span class="am-icon-' + options.spinner +
      ' am-icon-spin"></span>' + options.loadingText;

    this.hasSpinner = true;
  }

  stateText = stateText ||
    (data[state] === undefined ? options[state] : data[state]);

  $element[val](stateText);

  // push to event loop to allow forms to submit
  setTimeout($.proxy(function() {
    // TODO: add stateClass for other states
    if (state === 'loadingText') {
      $element.addClass(stateClassName).attr(disabled, disabled);
      this.isLoading = true;
    } else if (this.isLoading) {
      $element.removeClass(stateClassName).removeAttr(disabled);
      this.isLoading = false;
    }
  }, this), 0);
};

Button.prototype.toggle = function() {
  var changed = true;
  var $element = this.$element;
  var $parent = this.$element.parent('[class*="am-btn-group"]');

  if ($parent.length) {
    var $input = this.$element.find('input');

    if ($input.prop('type') == 'radio') {
      if ($input.prop('checked') && $element.hasClass('am-active')) {
        changed = false;
      } else {
        $parent.find('.am-active').removeClass('am-active');
      }
    }

    if (changed) {
      $input.prop('checked',
        !$element.hasClass('am-active')).trigger('change');
    }
  }

  if (changed) {
    $element.toggleClass('am-active');
    if (!$element.hasClass('am-active')) {
      $element.blur();
    }
  }
};

UI.plugin('button', Button, {
  dataOptions: 'data-am-loading',
  methodCall: function(args, instance) {
    if (args[0] === 'toggle') {
      instance.toggle();
    } else if (typeof args[0] === 'string') {
      instance.setState.apply(instance, args);
    }
  }
});

// Init code
$(document).on('click.button.amui.data-api', '[data-am-button]', function(e) {
  e.preventDefault();
  var $btn = $(e.target);

  if (!$btn.hasClass('am-btn')) {
    $btn = $btn.closest('.am-btn');
  }

  $btn.button('toggle');
});

UI.ready(function(context) {
  $('[data-am-loading]', context).button();
});

module.exports = UI.button = Button;

},{"2":2}],6:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);

/**
 * @via https://github.com/twbs/bootstrap/blob/master/js/collapse.js
 * @copyright (c) 2011-2014 Twitter, Inc
 * @license The MIT License
 */

var Collapse = function(element, options) {
  this.$element = $(element);
  this.options = $.extend({}, Collapse.DEFAULTS, options);
  this.transitioning = null;

  if (this.options.parent) {
    this.$parent = $(this.options.parent);
  }

  if (this.options.toggle) {
    this.toggle();
  }
};

Collapse.DEFAULTS = {
  toggle: true
};

Collapse.prototype.open = function() {
  if (this.transitioning || this.$element.hasClass('am-in')) {
    return;
  }

  var startEvent = $.Event('open.collapse.amui');
  this.$element.trigger(startEvent);

  if (startEvent.isDefaultPrevented()) {
    return;
  }

  var actives = this.$parent && this.$parent.find('> .am-panel > .am-in');

  if (actives && actives.length) {
    var hasData = actives.data('amui.collapse');

    if (hasData && hasData.transitioning) {
      return;
    }

    Plugin.call(actives, 'close');

    hasData || actives.data('amui.collapse', null);
  }

  this.$element
    .removeClass('am-collapse')
    .addClass('am-collapsing').height(0);

  this.transitioning = 1;

  var complete = function() {
    this.$element
      .removeClass('am-collapsing')
      .addClass('am-collapse am-in')
      .height('')
      .trigger('opened.collapse.amui');
    this.transitioning = 0;
  };

  if (!UI.support.transition) {
    return complete.call(this);
  }

  var scrollHeight = this.$element[0].scrollHeight;

  this.$element
    .one(UI.support.transition.end, $.proxy(complete, this))
    .emulateTransitionEnd(300)
    .css({height: scrollHeight}); // 当折叠的容器有 padding 时，如果用 height() 只能设置内容的宽度
};

Collapse.prototype.close = function() {
  if (this.transitioning || !this.$element.hasClass('am-in')) {
    return;
  }

  var startEvent = $.Event('close.collapse.amui');
  this.$element.trigger(startEvent);

  if (startEvent.isDefaultPrevented()) {
    return;
  }

  this.$element.height(this.$element.height()).redraw();

  this.$element.addClass('am-collapsing').
    removeClass('am-collapse am-in');

  this.transitioning = 1;

  var complete = function() {
    this.transitioning = 0;
    this.$element
      .trigger('closed.collapse.amui')
      .removeClass('am-collapsing')
      .addClass('am-collapse');
    // css({height: '0'});
  };

  if (!UI.support.transition) {
    return complete.call(this);
  }

  this.$element.height(0)
    .one(UI.support.transition.end, $.proxy(complete, this))
    .emulateTransitionEnd(300);
};

Collapse.prototype.toggle = function() {
  this[this.$element.hasClass('am-in') ? 'close' : 'open']();
};

// Collapse Plugin
function Plugin(option) {
  return this.each(function() {
    var $this = $(this);
    var data = $this.data('amui.collapse');
    var options = $.extend({}, Collapse.DEFAULTS,
      UI.utils.options($this.attr('data-am-collapse')),
      typeof option == 'object' && option);

    if (!data && options.toggle && option === 'open') {
      option = !option;
    }

    if (!data) {
      $this.data('amui.collapse', (data = new Collapse(this, options)));
    }

    if (typeof option == 'string') {
      data[option]();
    }
  });
}

$.fn.collapse = Plugin;

// Init code
$(document).on('click.collapse.amui.data-api', '[data-am-collapse]',
  function(e) {
    var href;
    var $this = $(this);
    var options = UI.utils.options($this.attr('data-am-collapse'));
    var target = options.target ||
      e.preventDefault() ||
      (href = $this.attr('href')) &&
      href.replace(/.*(?=#[^\s]+$)/, '');
    var $target = $(target);
    var data = $target.data('amui.collapse');
    var option = data ? 'toggle' : options;
    var parent = options.parent;
    var $parent = parent && $(parent);

    if (!data || !data.transitioning) {
      if ($parent) {
        // '[data-am-collapse*="{parent: \'' + parent + '"]
        $parent.find('[data-am-collapse]').not($this).addClass('am-collapsed');
      }

      $this[$target.hasClass('am-in') ?
        'addClass' : 'removeClass']('am-collapsed');
    }

    Plugin.call($target, option);
  });

module.exports = UI.collapse = Collapse;

// TODO: 更好的 target 选择方式
//       折叠的容器必须没有 border/padding 才能正常处理，否则动画会有一些小问题
//       寻找更好的未知高度 transition 动画解决方案，max-height 之类的就算了

},{"2":2}],7:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);
var $doc = $(document);

/**
 * bootstrap-datepicker.js
 * @via http://www.eyecon.ro/bootstrap-datepicker
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
var Datepicker = function(element, options) {
  this.$element = $(element);
  this.options = $.extend({}, Datepicker.DEFAULTS, options);
  this.format = DPGlobal.parseFormat(this.options.format);

  this.$element.data('date', this.options.date);
  this.language = this.getLocale(this.options.locale);
  this.theme = this.options.theme;
  this.$picker = $(DPGlobal.template).appendTo('body').on({
    click: $.proxy(this.click, this)
    // mousedown: $.proxy(this.mousedown, this)
  });

  this.isInput = this.$element.is('input');
  this.component = this.$element.is('.am-datepicker-date') ?
    this.$element.find('.am-datepicker-add-on') : false;

  if (this.isInput) {
    this.$element.on({
      'click.datepicker.amui': $.proxy(this.open, this),
      // blur: $.proxy(this.close, this),
      'keyup.datepicker.amui': $.proxy(this.update, this)
    });
  } else {
    if (this.component) {
      this.component.on('click.datepicker.amui', $.proxy(this.open, this));
    } else {
      this.$element.on('click.datepicker.amui', $.proxy(this.open, this));
    }
  }

  this.minViewMode = this.options.minViewMode;

  if (typeof this.minViewMode === 'string') {
    switch (this.minViewMode) {
      case 'months':
        this.minViewMode = 1;
        break;
      case 'years':
        this.minViewMode = 2;
        break;
      default:
        this.minViewMode = 0;
        break;
    }
  }

  this.viewMode = this.options.viewMode;

  if (typeof this.viewMode === 'string') {
    switch (this.viewMode) {
      case 'months':
        this.viewMode = 1;
        break;
      case 'years':
        this.viewMode = 2;
        break;
      default:
        this.viewMode = 0;
        break;
    }
  }

  this.startViewMode = this.viewMode;
  this.weekStart = ((this.options.weekStart ||
  Datepicker.locales[this.language].weekStart || 0) % 7);
  this.weekEnd = ((this.weekStart + 6) % 7);
  this.onRender = this.options.onRender;

  this.setTheme();
  this.fillDow();
  this.fillMonths();
  this.update();
  this.showMode();
};

Datepicker.DEFAULTS = {
  locale: 'zh_CN',
  format: 'yyyy-mm-dd',
  weekStart: undefined,
  viewMode: 0,
  minViewMode: 0,
  date: '',
  theme: '',
  autoClose: 1,
  onRender: function(date) {
    return '';
  }
};

Datepicker.prototype.open = function(e) {
  this.$picker.show();
  this.height = this.component ?
    this.component.outerHeight() : this.$element.outerHeight();

  this.place();
  $(window).on('resize.datepicker.amui', $.proxy(this.place, this));
  if (e) {
    e.stopPropagation();
    e.preventDefault();
  }
  var that = this;
  $doc.on('mousedown.datapicker.amui touchstart.datepicker.amui', function(ev) {
    if ($(ev.target).closest('.am-datepicker').length === 0) {
      that.close();
    }
  });
  this.$element.trigger({
    type: 'open.datepicker.amui',
    date: this.date
  });
};

Datepicker.prototype.close = function() {
  this.$picker.hide();
  $(window).off('resize.datepicker.amui', this.place);
  this.viewMode = this.startViewMode;
  this.showMode();
  if (!this.isInput) {
    $(document).off('mousedown.datapicker.amui touchstart.datepicker.amui',
      this.close);
  }
  // this.set();
  this.$element.trigger({
    type: 'close.datepicker.amui',
    date: this.date
  });
};

Datepicker.prototype.set = function() {
  var formated = DPGlobal.formatDate(this.date, this.format);
  if (!this.isInput) {
    if (this.component) {
      this.$element.find('input').prop('value', formated);
    }
    this.$element.data('date', formated);
  } else {
    this.$element.prop('value', formated);
  }
};

Datepicker.prototype.setValue = function(newDate) {
  if (typeof newDate === 'string') {
    this.date = DPGlobal.parseDate(newDate, this.format);
  } else {
    this.date = new Date(newDate);
  }
  this.set();

  this.viewDate = new Date(this.date.getFullYear(),
    this.date.getMonth(), 1, 0, 0, 0, 0);

  this.fill();
};

Datepicker.prototype.place = function() {
  var offset = this.component ?
    this.component.offset() : this.$element.offset();
  var $width = this.component ?
    this.component.width() : this.$element.width();
  var top = offset.top + this.height;
  var left = offset.left;
  var right = $doc.width() - offset.left - $width;
  var isOutView = this.isOutView();
  this.$picker.removeClass('am-datepicker-right');
  this.$picker.removeClass('am-datepicker-up');
  if ($doc.width() > 640) {
    if (isOutView.outRight) {
      this.$picker.addClass('am-datepicker-right');
      this.$picker.css({
        top: top,
        left: 'auto',
        right: right
      });
      return;
    }
    if (isOutView.outBottom) {
      this.$picker.addClass('am-datepicker-up');
      top = offset.top - this.$picker.outerHeight(true);
    }
  } else {
    left = 0;
  }
  this.$picker.css({
    top: top,
    left: left
  });
};

Datepicker.prototype.update = function(newDate) {
  this.date = DPGlobal.parseDate(
    typeof newDate === 'string' ? newDate : (this.isInput ?
      this.$element.prop('value') : this.$element.data('date')),
    this.format
  );
  this.viewDate = new Date(this.date.getFullYear(),
    this.date.getMonth(), 1, 0, 0, 0, 0);
  this.fill();
};

// Days of week
Datepicker.prototype.fillDow = function() {
  var dowCount = this.weekStart;
  var html = '<tr>';
  while (dowCount < this.weekStart + 7) {
    // NOTE: do % then add 1
    html += '<th class="am-datepicker-dow">' +
    Datepicker.locales[this.language].daysMin[(dowCount++) % 7] +
    '</th>';
  }
  html += '</tr>';

  this.$picker.find('.am-datepicker-days thead').append(html);
};

Datepicker.prototype.fillMonths = function() {
  var html = '';
  var i = 0;
  while (i < 12) {
    html += '<span class="am-datepicker-month">' +
    Datepicker.locales[this.language].monthsShort[i++] + '</span>';
  }
  this.$picker.find('.am-datepicker-months td').append(html);
};

Datepicker.prototype.fill = function() {
  var d = new Date(this.viewDate);
  var year = d.getFullYear();
  var month = d.getMonth();
  var currentDate = this.date.valueOf();

  var prevMonth = new Date(year, month - 1, 28, 0, 0, 0, 0);
  var day = DPGlobal
    .getDaysInMonth(prevMonth.getFullYear(), prevMonth.getMonth());

  var daysSelect = this.$picker
    .find('.am-datepicker-days .am-datepicker-select');

  if (this.language === 'zh_CN') {
    daysSelect.text(year + Datepicker.locales[this.language].year[0] +
    ' ' + Datepicker.locales[this.language].months[month]);
  } else {
    daysSelect.text(Datepicker.locales[this.language].months[month] +
    ' ' + year);
  }

  prevMonth.setDate(day);
  prevMonth.setDate(day - (prevMonth.getDay() - this.weekStart + 7) % 7);

  var nextMonth = new Date(prevMonth);
  nextMonth.setDate(nextMonth.getDate() + 42);
  nextMonth = nextMonth.valueOf();
  var html = [];

  var className;
  var prevY;
  var prevM;

  while (prevMonth.valueOf() < nextMonth) {
    if (prevMonth.getDay() === this.weekStart) {
      html.push('<tr>');
    }
    className = this.onRender(prevMonth);
    prevY = prevMonth.getFullYear();
    prevM = prevMonth.getMonth();
    if ((prevM < month && prevY === year) || prevY < year) {
      className += ' am-datepicker-old';
    } else if ((prevM > month && prevY === year) || prevY > year) {
      className += ' am-datepicker-new';
    }
    if (prevMonth.valueOf() === currentDate) {
      className += ' am-active';
    }
    html.push('<td class="am-datepicker-day ' +
    className + '">' + prevMonth.getDate() + '</td>');

    if (prevMonth.getDay() === this.weekEnd) {
      html.push('</tr>');
    }
    prevMonth.setDate(prevMonth.getDate() + 1);
  }

  this.$picker.find('.am-datepicker-days tbody')
    .empty().append(html.join(''));

  var currentYear = this.date.getFullYear();
  var months = this.$picker.find('.am-datepicker-months')
    .find('.am-datepicker-select')
    .text(year);
  months = months.end()
    .find('span').removeClass('am-active').removeClass('am-disabled');

  var monthLen = 0;

  while (monthLen < 12) {
    if (this.onRender(d.setFullYear(year, monthLen))) {
      months.eq(monthLen).addClass('am-disabled');
    }
    monthLen++;
  }

  if (currentYear === year) {
    months.eq(this.date.getMonth())
        .removeClass('am-disabled')
        .addClass('am-active');
  }

  html = '';
  year = parseInt(year / 10, 10) * 10;
  var yearCont = this.$picker
    .find('.am-datepicker-years')
    .find('.am-datepicker-select')
    .text(year + '-' + (year + 9))
    .end()
    .find('td');

  var yearClassName;
  year -= 1;
  for (var i = -1; i < 11; i++) {
    yearClassName = this.onRender(d.setFullYear(year));
    html += '<span class="' + yearClassName + '' +
    (i === -1 || i === 10 ? ' am-datepicker-old' : '') +
    (currentYear === year ? ' am-active' : '') + '">' + year + '</span>';
    year += 1;
  }
  yearCont.html(html);
};

Datepicker.prototype.click = function(event) {
  event.stopPropagation();
  event.preventDefault();
  var month;
  var year;
  var $dayActive = this.$picker.find('.am-datepicker-days').find('.am-active');
  var $months = this.$picker.find('.am-datepicker-months');
  var $monthIndex = $months.find('.am-active').index();

  var $target = $(event.target).closest('span, td, th');
  if ($target.length === 1) {
    switch ($target[0].nodeName.toLowerCase()) {
      case 'th':
        switch ($target[0].className) {
          case 'am-datepicker-switch':
            this.showMode(1);
            break;
          case 'am-datepicker-prev':
          case 'am-datepicker-next':
            this.viewDate['set' + DPGlobal.modes[this.viewMode].navFnc].call(
              this.viewDate,
              this.viewDate
                ['get' + DPGlobal.modes[this.viewMode].navFnc]
                .call(this.viewDate) +
              DPGlobal.modes[this.viewMode].navStep *
              ($target[0].className === 'am-datepicker-prev' ? -1 : 1)
            );
            this.fill();
            this.set();
            break;
        }
        break;
      case 'span':
        if ($target.is('.am-disabled')) {
          return;
        }

        if ($target.is('.am-datepicker-month')) {
          month = $target.parent().find('span').index($target);

          if ($target.is('.am-active')) {
            this.viewDate.setMonth(month, $dayActive.text());
          } else {
            this.viewDate.setMonth(month);
          }

        } else {
          year = parseInt($target.text(), 10) || 0;
          if ($target.is('.am-active')) {
            this.viewDate.setFullYear(year, $monthIndex, $dayActive.text());
          } else {
            this.viewDate.setFullYear(year);
          }

        }

        if (this.viewMode !== 0) {
          this.date = new Date(this.viewDate);
          this.$element.trigger({
            type: 'changeDate.datepicker.amui',
            date: this.date,
            viewMode: DPGlobal.modes[this.viewMode].clsName
          });
        }

        this.showMode(-1);
        this.fill();
        this.set();
        break;
      case 'td':
        if ($target.is('.am-datepicker-day') && !$target.is('.am-disabled')) {
          var day = parseInt($target.text(), 10) || 1;
          month = this.viewDate.getMonth();
          if ($target.is('.am-datepicker-old')) {
            month -= 1;
          } else if ($target.is('.am-datepicker-new')) {
            month += 1;
          }
          year = this.viewDate.getFullYear();
          this.date = new Date(year, month, day, 0, 0, 0, 0);
          this.viewDate = new Date(year, month, Math.min(28, day), 0, 0, 0, 0);
          this.fill();
          this.set();
          this.$element.trigger({
            type: 'changeDate.datepicker.amui',
            date: this.date,
            viewMode: DPGlobal.modes[this.viewMode].clsName
          });

          this.options.autoClose && this.close();
        }
        break;
    }
  }
};

Datepicker.prototype.mousedown = function(event) {
  event.stopPropagation();
  event.preventDefault();
};

Datepicker.prototype.showMode = function(dir) {
  if (dir) {
    this.viewMode = Math.max(this.minViewMode,
      Math.min(2, this.viewMode + dir));
  }

  this.$picker.find('>div').hide().
    filter('.am-datepicker-' + DPGlobal.modes[this.viewMode].clsName).show();
};

Datepicker.prototype.isOutView = function() {
  var offset = this.component ?
    this.component.offset() : this.$element.offset();
  var isOutView = {
    outRight: false,
    outBottom: false
  };
  var $picker = this.$picker;
  var width = offset.left + $picker.outerWidth(true);
  var height = offset.top + $picker.outerHeight(true) +
    this.$element.innerHeight();

  if (width > $doc.width()) {
    isOutView.outRight = true;
  }
  if (height > $doc.height()) {
    isOutView.outBottom = true;
  }
  return isOutView;
};

Datepicker.prototype.getLocale = function(locale) {
  if (!locale) {
    locale = navigator.language && navigator.language.split('-');
    locale[1] = locale[1].toUpperCase();
    locale = locale.join('_');
  }

  if (!Datepicker.locales[locale]) {
    locale = 'en_US';
  }
  return locale;
};

Datepicker.prototype.setTheme = function() {
  if (this.theme) {
    this.$picker.addClass('am-datepicker-' + this.theme);
  }
};

// Datepicker locales
Datepicker.locales = {
  en_US: {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
      'Friday', 'Saturday'],
    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    months: ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekStart: 0
  },
  zh_CN: {
    days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    daysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    daysMin: ['日', '一', '二', '三', '四', '五', '六'],
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月',
      '八月', '九月', '十月', '十一月', '十二月'],
    monthsShort: ['一月', '二月', '三月', '四月', '五月', '六月',
      '七月', '八月', '九月', '十月', '十一月', '十二月'],
    weekStart: 1,
    year: ['年']
  }
};

var DPGlobal = {
  modes: [
    {
      clsName: 'days',
      navFnc: 'Month',
      navStep: 1
    },
    {
      clsName: 'months',
      navFnc: 'FullYear',
      navStep: 1
    },
    {
      clsName: 'years',
      navFnc: 'FullYear',
      navStep: 10
    }
  ],

  isLeapYear: function(year) {
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
  },

  getDaysInMonth: function(year, month) {
    return [31, (DPGlobal.isLeapYear(year) ? 29 : 28),
      31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  },

  parseFormat: function(format) {
    var separator = format.match(/[.\/\-\s].*?/);
    var parts = format.split(/\W+/);

    if (!separator || !parts || parts.length === 0) {
      throw new Error('Invalid date format.');
    }

    return {
      separator: separator,
      parts: parts
    };
  },

  parseDate: function(date, format) {
    var parts = date.split(format.separator);
    var val;
    date = new Date();

    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    if (parts.length === format.parts.length) {
      var year = date.getFullYear();
      var day = date.getDate();
      var month = date.getMonth();

      for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
        val = parseInt(parts[i], 10) || 1;
        switch (format.parts[i]) {
          case 'dd':
          case 'd':
            day = val;
            date.setDate(val);
            break;
          case 'mm':
          case 'm':
            month = val - 1;
            date.setMonth(val - 1);
            break;
          case 'yy':
            year = 2000 + val;
            date.setFullYear(2000 + val);
            break;
          case 'yyyy':
            year = val;
            date.setFullYear(val);
            break;
        }
      }
      date = new Date(year, month, day, 0, 0, 0);
    }
    return date;
  },

  formatDate: function(date, format) {
    var val = {
      d: date.getDate(),
      m: date.getMonth() + 1,
      yy: date.getFullYear().toString().substring(2),
      yyyy: date.getFullYear()
    };
    var dateArray = [];

    val.dd = (val.d < 10 ? '0' : '') + val.d;
    val.mm = (val.m < 10 ? '0' : '') + val.m;

    for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
      dateArray.push(val[format.parts[i]]);
    }
    return dateArray.join(format.separator);
  },

  headTemplate: '<thead>' +
  '<tr class="am-datepicker-header">' +
  '<th class="am-datepicker-prev">' +
  '<i class="am-datepicker-prev-icon"></i></th>' +
  '<th colspan="5" class="am-datepicker-switch">' +
  '<div class="am-datepicker-select"></div></th>' +
  '<th class="am-datepicker-next"><i class="am-datepicker-next-icon"></i>' +
  '</th></tr></thead>',

  contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>'
};

DPGlobal.template = '<div class="am-datepicker am-datepicker-dropdown">' +
'<div class="am-datepicker-caret"></div>' +
'<div class="am-datepicker-days">' +
'<table class="am-datepicker-table">' +
DPGlobal.headTemplate +
'<tbody></tbody>' +
'</table>' +
'</div>' +
'<div class="am-datepicker-months">' +
'<table class="am-datepicker-table">' +
DPGlobal.headTemplate +
DPGlobal.contTemplate +
'</table>' +
'</div>' +
'<div class="am-datepicker-years">' +
'<table class="am-datepicker-table">' +
DPGlobal.headTemplate +
DPGlobal.contTemplate +
'</table>' +
'</div>' +
'</div>';

// jQuery plugin
UI.plugin('datepicker', Datepicker);

// Init code
UI.ready(function(context) {
  $('[data-am-datepicker]').datepicker();
});

module.exports = UI.datepicker = Datepicker;

// TODO: 1. 载入动画
//       2. less 优化

},{"2":2}],8:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);
var $doc = $(document);
var transition = UI.support.transition;

var Dimmer = function() {
  this.id = UI.utils.generateGUID('am-dimmer');
  this.$element = $(Dimmer.DEFAULTS.tpl, {
    id: this.id
  });

  this.inited = false;
  this.scrollbarWidth = 0;
  this.$used = $([]);
};

Dimmer.DEFAULTS = {
  tpl: '<div class="am-dimmer" data-am-dimmer></div>'
};

Dimmer.prototype.init = function() {
  if (!this.inited) {
    $(document.body).append(this.$element);
    this.inited = true;
    $doc.trigger('init.dimmer.amui');
    this.$element.on('touchmove.dimmer.amui', function(e) {
      e.preventDefault();
    });
  }

  return this;
};

Dimmer.prototype.open = function(relatedElement) {
  if (!this.inited) {
    this.init();
  }

  var $element = this.$element;

  // 用于多重调用
  if (relatedElement) {
    this.$used = this.$used.add($(relatedElement));
  }

  this.checkScrollbar().setScrollbar();

  $element.show().trigger('open.dimmer.amui');

  transition && $element.off(transition.end);

  setTimeout(function() {
    $element.addClass('am-active');
  }, 0);

  return this;
};

Dimmer.prototype.close = function(relatedElement, force) {
  this.$used = this.$used.not($(relatedElement));

  if (!force && this.$used.length) {
    return this;
  }

  var $element = this.$element;

  $element.removeClass('am-active').trigger('close.dimmer.amui');

  function complete() {
    $element.hide();
    this.resetScrollbar();
  }

  // transition ? $element.one(transition.end, $.proxy(complete, this)) :
  complete.call(this);

  return this;
};

Dimmer.prototype.checkScrollbar = function() {
  this.scrollbarWidth = UI.utils.measureScrollbar();

  return this;
};

Dimmer.prototype.setScrollbar = function() {
  var $body = $(document.body);
  var bodyPaddingRight = parseInt(($body.css('padding-right') || 0), 10);

  if (this.scrollbarWidth) {
    $body.css('padding-right', bodyPaddingRight + this.scrollbarWidth);
  }

  $body.addClass('am-dimmer-active');

  return this;
};

Dimmer.prototype.resetScrollbar = function() {
  $(document.body).css('padding-right', '').removeClass('am-dimmer-active');

  return this;
};

module.exports = UI.dimmer = new Dimmer();

},{"2":2}],9:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);
var animation = UI.support.animation;

/**
 * @via https://github.com/Minwe/bootstrap/blob/master/js/dropdown.js
 * @copyright (c) 2011-2014 Twitter, Inc
 * @license The MIT License
 */

// var toggle = '[data-am-dropdown] > .am-dropdown-toggle';

var Dropdown = function(element, options) {
  this.options = $.extend({}, Dropdown.DEFAULTS, options);

  options = this.options;

  this.$element = $(element);
  this.$toggle = this.$element.find(options.selector.toggle);
  this.$dropdown = this.$element.find(options.selector.dropdown);
  this.$boundary = (options.boundary === window) ? $(window) :
    this.$element.closest(options.boundary);
  this.$justify = (options.justify && $(options.justify).length &&
  $(options.justify)) || undefined;

  !this.$boundary.length && (this.$boundary = $(window));

  this.active = this.$element.hasClass('am-active') ? true : false;
  this.animating = null;

  this.events();
};

Dropdown.DEFAULTS = {
  animation: 'am-animation-slide-top-fixed',
  boundary: window,
  justify: undefined,
  selector: {
    dropdown: '.am-dropdown-content',
    toggle: '.am-dropdown-toggle'
  },
  trigger: 'click'
};

Dropdown.prototype.toggle = function() {
  this.clear();

  if (this.animating) {
    return;
  }

  this[this.active ? 'close' : 'open']();
};

Dropdown.prototype.open = function(e) {
  var $toggle = this.$toggle;
  var $element = this.$element;
  var $dropdown = this.$dropdown;

  if ($toggle.is('.am-disabled, :disabled')) {
    return;
  }

  if (this.active) {
    return;
  }

  $element.trigger('open.dropdown.amui').addClass('am-active');

  $toggle.trigger('focus');

  this.checkDimensions();

  var complete = $.proxy(function() {
    $element.trigger('opened.dropdown.amui');
    this.active = true;
    this.animating = 0;
  }, this);

  if (animation) {
    this.animating = 1;
    $dropdown.addClass(this.options.animation).
      on(animation.end + '.open.dropdown.amui', $.proxy(function() {
        complete();
        $dropdown.removeClass(this.options.animation);
      }, this));
  } else {
    complete();
  }
};

Dropdown.prototype.close = function() {
  if (!this.active) {
    return;
  }

  // fix #165
  // var animationName = this.options.animation + ' am-animation-reverse';
  var animationName = 'am-dropdown-animation';
  var $element = this.$element;
  var $dropdown = this.$dropdown;

  $element.trigger('close.dropdown.amui');

  var complete = $.proxy(function complete() {
    $element.
      removeClass('am-active').
      trigger('closed.dropdown.amui');
    this.active = false;
    this.animating = 0;
    this.$toggle.blur();
  }, this);

  if (animation) {
    $dropdown.removeClass(this.options.animation);
    $dropdown.addClass(animationName);
    this.animating = 1;
    // animation
    $dropdown.one(animation.end + '.close.dropdown.amui', function() {
      $dropdown.removeClass(animationName);
      complete();
    });
  } else {
    complete();
  }
};

Dropdown.prototype.checkDimensions = function() {
  if (!this.$dropdown.length) {
    return;
  }

  var $dropdown = this.$dropdown;
  var offset = $dropdown.offset();
  var width = $dropdown.outerWidth();
  var boundaryWidth = this.$boundary.width();
  var boundaryOffset = $.isWindow(this.boundary) && this.$boundary.offset() ?
    this.$boundary.offset().left : 0;

  if (this.$justify) {
    // jQuery.fn.width() is really...
    $dropdown.css({'min-width': this.$justify.css('width')});
  }

  if ((width + (offset.left - boundaryOffset)) > boundaryWidth) {
    this.$element.addClass('am-dropdown-flip');
  }
};

Dropdown.prototype.clear = function() {
  $('[data-am-dropdown]').not(this.$element).each(function() {
    var data = $(this).data('amui.dropdown');
    data && data.close();
  });
};

Dropdown.prototype.events = function() {
  var eventNS = 'dropdown.amui';
  // triggers = this.options.trigger.split(' '),
  var $toggle = this.$toggle;

  $toggle.on('click.' + eventNS, $.proxy(function(e) {
    e.preventDefault();
    this.toggle();
  }, this));

  /*for (var i = triggers.length; i--;) {
   var trigger = triggers[i];

   if (trigger === 'click') {
   $toggle.on('click.' + eventNS, $.proxy(this.toggle, this))
   }

   if (trigger === 'focus' || trigger === 'hover') {
   var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin';
   var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout';

   this.$element.on(eventIn + '.' + eventNS, $.proxy(this.open, this))
   .on(eventOut + '.' + eventNS, $.proxy(this.close, this));
   }
   }*/

  $(document).on('keydown.dropdown.amui', $.proxy(function(e) {
    e.keyCode === 27 && this.active && this.close();
  }, this)).on('click.outer.dropdown.amui', $.proxy(function(e) {
    // var $target = $(e.target);

    if (this.active &&
      (this.$element[0] === e.target || !this.$element.find(e.target).length)) {
      this.close();
    }
  }, this));
};

// Dropdown Plugin
UI.plugin('dropdown', Dropdown);

// Init code
UI.ready(function(context) {
  $('[data-am-dropdown]', context).dropdown();
});

$(document).on('click.dropdown.amui.data-api', '.am-dropdown form',
  function(e) {
    e.stopPropagation();
  });

module.exports = UI.dropdown = Dropdown;

// TODO: 1. 处理链接 focus
//       2. 增加 mouseenter / mouseleave 选项
//       3. 宽度适应

},{"2":2}],10:[function(_dereq_,module,exports){
var $ = (window.jQuery);
var UI = _dereq_(2);

// MODIFIED:
// - LINE 226: add `<i></i>`
// - namespace
// - Init code
// TODO: start after x ms when pause on actions

/*
 * jQuery FlexSlider v2.4.0
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */

// FlexSlider: Object Instance
$.flexslider = function(el, options) {
  var slider = $(el);

  // making variables public
  slider.vars = $.extend({}, $.flexslider.defaults, options);

  var namespace = slider.vars.namespace,
    msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
    touch = (( "ontouchstart" in window ) || msGesture || window.DocumentTouch && document instanceof DocumentTouch) && slider.vars.touch,
  // depricating this idea, as devices are being released with both of these events
  //eventType = (touch) ? "touchend" : "click",
    eventType = "click touchend MSPointerUp keyup",
    watchedEvent = "",
    watchedEventClearTimer,
    vertical = slider.vars.direction === "vertical",
    reverse = slider.vars.reverse,
    carousel = (slider.vars.itemWidth > 0),
    fade = slider.vars.animation === "fade",
    asNav = slider.vars.asNavFor !== "",
    methods = {},
    focused = true;

  // Store a reference to the slider object
  $.data(el, 'flexslider', slider);

  // Private slider methods
  methods = {
    init: function() {
      slider.animating = false;
      // Get current slide and make sure it is a number
      slider.currentSlide = parseInt((slider.vars.startAt ? slider.vars.startAt : 0), 10);
      if (isNaN(slider.currentSlide)) {
        slider.currentSlide = 0;
      }
      slider.animatingTo = slider.currentSlide;
      slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
      slider.containerSelector = slider.vars.selector.substr(0, slider.vars.selector.search(' '));
      slider.slides = $(slider.vars.selector, slider);
      slider.container = $(slider.containerSelector, slider);
      slider.count = slider.slides.length;
      // SYNC:
      slider.syncExists = $(slider.vars.sync).length > 0;
      // SLIDE:
      if (slider.vars.animation === "slide") {
        slider.vars.animation = "swing";
      }
      slider.prop = (vertical) ? "top" : "marginLeft";
      slider.args = {};
      // SLIDESHOW:
      slider.manualPause = false;
      slider.stopped = false;
      //PAUSE WHEN INVISIBLE
      slider.started = false;
      slider.startTimeout = null;
      // TOUCH/USECSS:
      slider.transitions = !slider.vars.video && !fade && slider.vars.useCSS && (function() {
        var obj = document.createElement('div'),
          props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
        for (var i in props) {
          if (obj.style[props[i]] !== undefined) {
            slider.pfx = props[i].replace('Perspective', '').toLowerCase();
            slider.prop = "-" + slider.pfx + "-transform";
            return true;
          }
        }
        return false;
      }());
      slider.ensureAnimationEnd = '';
      // CONTROLSCONTAINER:
      if (slider.vars.controlsContainer !== "") slider.controlsContainer = $(slider.vars.controlsContainer).length > 0 && $(slider.vars.controlsContainer);
      // MANUAL:
      if (slider.vars.manualControls !== "") slider.manualControls = $(slider.vars.manualControls).length > 0 && $(slider.vars.manualControls);

      // RANDOMIZE:
      if (slider.vars.randomize) {
        slider.slides.sort(function() {
          return (Math.round(Math.random()) - 0.5);
        });
        slider.container.empty().append(slider.slides);
      }

      slider.doMath();

      // INIT
      slider.setup("init");

      // CONTROLNAV:
      if (slider.vars.controlNav) {
        methods.controlNav.setup();
      }

      // DIRECTIONNAV:
      if (slider.vars.directionNav) {
        methods.directionNav.setup();
      }

      // KEYBOARD:
      if (slider.vars.keyboard && ($(slider.containerSelector).length === 1 || slider.vars.multipleKeyboard)) {
        $(document).bind('keyup', function(event) {
          var keycode = event.keyCode;
          if (!slider.animating && (keycode === 39 || keycode === 37)) {
            var target = (keycode === 39) ? slider.getTarget('next') :
              (keycode === 37) ? slider.getTarget('prev') : false;
            slider.flexAnimate(target, slider.vars.pauseOnAction);
          }
        });
      }
      // MOUSEWHEEL:
      if (slider.vars.mousewheel) {
        slider.bind('mousewheel', function(event, delta, deltaX, deltaY) {
          event.preventDefault();
          var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
          slider.flexAnimate(target, slider.vars.pauseOnAction);
        });
      }

      // PAUSEPLAY
      if (slider.vars.pausePlay) {
        methods.pausePlay.setup();
      }

      //PAUSE WHEN INVISIBLE
      if (slider.vars.slideshow && slider.vars.pauseInvisible) {
        methods.pauseInvisible.init();
      }

      // SLIDSESHOW
      if (slider.vars.slideshow) {
        if (slider.vars.pauseOnHover) {
          slider.hover(function() {
            if (!slider.manualPlay && !slider.manualPause) {slider.pause();}
          }, function() {
            if (!slider.manualPause && !slider.manualPlay && !slider.stopped) {slider.play();}
          });
        }
        // initialize animation
        // If we're visible, or we don't use PageVisibility API
        if (!slider.vars.pauseInvisible || !methods.pauseInvisible.isHidden()) {
          (slider.vars.initDelay > 0) ? slider.startTimeout = setTimeout(slider.play, slider.vars.initDelay) : slider.play();
        }
      }

      // ASNAV:
      if (asNav) {methods.asNav.setup();}

      // TOUCH
      if (touch && slider.vars.touch) {methods.touch();}

      // FADE&&SMOOTHHEIGHT || SLIDE:
      if (!fade || (fade && slider.vars.smoothHeight)) {$(window).bind("resize orientationchange focus", methods.resize);}

      slider.find("img").attr("draggable", "false");

      // API: start() Callback
      setTimeout(function() {
        slider.vars.start(slider);
      }, 200);
    },
    asNav: {
      setup: function() {
        slider.asNav = true;
        slider.animatingTo = Math.floor(slider.currentSlide / slider.move);
        slider.currentItem = slider.currentSlide;
        slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
        if (!msGesture) {
          slider.slides.on(eventType, function(e) {
            e.preventDefault();
            var $slide = $(this),
              target = $slide.index();
            var posFromLeft = $slide.offset().left - $(slider).scrollLeft(); // Find position of slide relative to left of slider container
            if (posFromLeft <= 0 && $slide.hasClass(namespace + 'active-slide')) {
              slider.flexAnimate(slider.getTarget("prev"), true);
            } else if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass(namespace + "active-slide")) {
              slider.direction = (slider.currentItem < target) ? "next" : "prev";
              slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
            }
          });
        } else {
          el._slider = slider;
          slider.slides.each(function() {
            var that = this;
            that._gesture = new MSGesture();
            that._gesture.target = that;
            that.addEventListener("MSPointerDown", function(e) {
              e.preventDefault();
              if (e.currentTarget._gesture) {
                e.currentTarget._gesture.addPointer(e.pointerId);
              }
            }, false);
            that.addEventListener("MSGestureTap", function(e) {
              e.preventDefault();
              var $slide = $(this),
                target = $slide.index();
              if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
                slider.direction = (slider.currentItem < target) ? "next" : "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
              }
            });
          });
        }
      }
    },
    controlNav: {
      setup: function() {
        if (!slider.manualControls) {
          methods.controlNav.setupPaging();
        } else { // MANUALCONTROLS:
          methods.controlNav.setupManual();
        }
      },
      setupPaging: function() {
        var type = (slider.vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
          j = 1,
          item,
          slide;

        slider.controlNavScaffold = $('<ol class="' + namespace + 'control-nav ' + namespace + type + '"></ol>');

        if (slider.pagingCount > 1) {
          for (var i = 0; i < slider.pagingCount; i++) {
            slide = slider.slides.eq(i);
            item = (slider.vars.controlNav === "thumbnails") ? '<img src="' + slide.attr('data-thumb') + '"/>' : '<a>' + j + '</a>';
            if ('thumbnails' === slider.vars.controlNav && true === slider.vars.thumbCaptions) {
              var captn = slide.attr('data-thumbcaption');
              if ('' != captn && undefined != captn) {item += '<span class="' + namespace + 'caption">' + captn + '</span>'};
            }
            // slider.controlNavScaffold.append('<li>' + item + '</li>');
            slider.controlNavScaffold.append('<li>' + item + '<i></i></li>');
            j++;
          }
        }

        // CONTROLSCONTAINER:
        (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
        methods.controlNav.set();

        methods.controlNav.active();

        slider.controlNavScaffold.delegate('a, img', eventType, function(event) {
          event.preventDefault();

          if (watchedEvent === "" || watchedEvent === event.type) {
            var $this = $(this),
              target = slider.controlNav.index($this);

            if (!$this.hasClass(namespace + 'active')) {
              slider.direction = (target > slider.currentSlide) ? "next" : "prev";
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }
          }

          // setup flags to prevent event duplication
          if (watchedEvent === "") {
            watchedEvent = event.type;
          }
          methods.setToClearWatchedEvent();

        });
      },
      setupManual: function() {
        slider.controlNav = slider.manualControls;
        methods.controlNav.active();

        slider.controlNav.bind(eventType, function(event) {
          event.preventDefault();

          if (watchedEvent === "" || watchedEvent === event.type) {
            var $this = $(this),
              target = slider.controlNav.index($this);

            if (!$this.hasClass(namespace + 'active')) {
              (target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }
          }

          // setup flags to prevent event duplication
          if (watchedEvent === "") {
            watchedEvent = event.type;
          }
          methods.setToClearWatchedEvent();
        });
      },
      set: function() {
        var selector = (slider.vars.controlNav === "thumbnails") ? 'img' : 'a';
        slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
      },
      active: function() {
        slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
      },
      update: function(action, pos) {
        if (slider.pagingCount > 1 && action === "add") {
          slider.controlNavScaffold.append($('<li><a>' + slider.count + '</a></li>'));
        } else if (slider.pagingCount === 1) {
          slider.controlNavScaffold.find('li').remove();
        } else {
          slider.controlNav.eq(pos).closest('li').remove();
        }
        methods.controlNav.set();
        (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
      }
    },
    directionNav: {
      setup: function() {
        var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li class="' + namespace + 'nav-prev"><a class="' + namespace + 'prev" href="#">' + slider.vars.prevText + '</a></li><li class="' + namespace + 'nav-next"><a class="' + namespace + 'next" href="#">' + slider.vars.nextText + '</a></li></ul>');

        // CONTROLSCONTAINER:
        if (slider.controlsContainer) {
          $(slider.controlsContainer).append(directionNavScaffold);
          slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
        } else {
          slider.append(directionNavScaffold);
          slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
        }

        methods.directionNav.update();

        slider.directionNav.bind(eventType, function(event) {
          event.preventDefault();
          var target;

          if (watchedEvent === "" || watchedEvent === event.type) {
            target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
            slider.flexAnimate(target, slider.vars.pauseOnAction);
          }

          // setup flags to prevent event duplication
          if (watchedEvent === "") {
            watchedEvent = event.type;
          }
          methods.setToClearWatchedEvent();
        });
      },
      update: function() {
        var disabledClass = namespace + 'disabled';
        if (slider.pagingCount === 1) {
          slider.directionNav.addClass(disabledClass).attr('tabindex', '-1');
        } else if (!slider.vars.animationLoop) {
          if (slider.animatingTo === 0) {
            slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass).attr('tabindex', '-1');
          } else if (slider.animatingTo === slider.last) {
            slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass).attr('tabindex', '-1');
          } else {
            slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
          }
        } else {
          slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
        }
      }
    },
    pausePlay: {
      setup: function() {
        var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a></a></div>');

        // CONTROLSCONTAINER:
        if (slider.controlsContainer) {
          slider.controlsContainer.append(pausePlayScaffold);
          slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
        } else {
          slider.append(pausePlayScaffold);
          slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
        }

        methods.pausePlay.update((slider.vars.slideshow) ? namespace + 'pause' : namespace + 'play');

        slider.pausePlay.bind(eventType, function(event) {
          event.preventDefault();

          if (watchedEvent === "" || watchedEvent === event.type) {
            if ($(this).hasClass(namespace + 'pause')) {
              slider.manualPause = true;
              slider.manualPlay = false;
              slider.pause();
            } else {
              slider.manualPause = false;
              slider.manualPlay = true;
              slider.play();
            }
          }

          // setup flags to prevent event duplication
          if (watchedEvent === "") {
            watchedEvent = event.type;
          }
          methods.setToClearWatchedEvent();
        });
      },
      update: function(state) {
        (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').html(slider.vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').html(slider.vars.pauseText);
      }
    },
    touch: function() {
      var startX,
        startY,
        offset,
        cwidth,
        dx,
        startT,
        scrolling = false,
        localX = 0,
        localY = 0,
        accDx = 0;

      if (!msGesture) {
        el.addEventListener('touchstart', onTouchStart, false);

        function onTouchStart(e) {
          if (slider.animating) {
            e.preventDefault();
          } else if (( window.navigator.msPointerEnabled ) || e.touches.length === 1) {
            slider.pause();
            // CAROUSEL:
            cwidth = (vertical) ? slider.h : slider.w;
            startT = Number(new Date());
            // CAROUSEL:

            // Local vars for X and Y points.
            localX = e.touches[0].pageX;
            localY = e.touches[0].pageY;

            offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
              (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                (carousel && slider.currentSlide === slider.last) ? slider.limit :
                  (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                    (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
            startX = (vertical) ? localY : localX;
            startY = (vertical) ? localX : localY;

            el.addEventListener('touchmove', onTouchMove, false);
            el.addEventListener('touchend', onTouchEnd, false);
          }
        }

        function onTouchMove(e) {
          // Local vars for X and Y points.

          localX = e.touches[0].pageX;
          localY = e.touches[0].pageY;

          dx = (vertical) ? startX - localY : startX - localX;
          scrolling = (vertical) ? (Math.abs(dx) < Math.abs(localX - startY)) : (Math.abs(dx) < Math.abs(localY - startY));

          var fxms = 500;

          if (!scrolling || Number(new Date()) - startT > fxms) {
            e.preventDefault();
            if (!fade && slider.transitions) {
              if (!slider.vars.animationLoop) {
                dx = dx / ((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx) / cwidth + 2) : 1);
              }
              slider.setProps(offset + dx, "setTouch");
            }
          }
        }

        function onTouchEnd(e) {
          // finish the touch by undoing the touch session
          el.removeEventListener('touchmove', onTouchMove, false);

          if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
            var updateDx = (reverse) ? -dx : dx,
              target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

            if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth / 2)) {
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            } else {
              if (!fade) {slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true);}
            }
          }
          el.removeEventListener('touchend', onTouchEnd, false);

          startX = null;
          startY = null;
          dx = null;
          offset = null;
        }
      } else {
        el.style.msTouchAction = "none";
        el._gesture = new MSGesture();
        el._gesture.target = el;
        el.addEventListener("MSPointerDown", onMSPointerDown, false);
        el._slider = slider;
        el.addEventListener("MSGestureChange", onMSGestureChange, false);
        el.addEventListener("MSGestureEnd", onMSGestureEnd, false);

        function onMSPointerDown(e) {
          e.stopPropagation();
          if (slider.animating) {
            e.preventDefault();
          } else {
            slider.pause();
            el._gesture.addPointer(e.pointerId);
            accDx = 0;
            cwidth = (vertical) ? slider.h : slider.w;
            startT = Number(new Date());
            // CAROUSEL:

            offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
              (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                (carousel && slider.currentSlide === slider.last) ? slider.limit :
                  (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                    (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
          }
        }

        function onMSGestureChange(e) {
          e.stopPropagation();
          var slider = e.target._slider;
          if (!slider) {
            return;
          }
          var transX = -e.translationX,
            transY = -e.translationY;

          //Accumulate translations.
          accDx = accDx + ((vertical) ? transY : transX);
          dx = accDx;
          scrolling = (vertical) ? (Math.abs(accDx) < Math.abs(-transX)) : (Math.abs(accDx) < Math.abs(-transY));

          if (e.detail === e.MSGESTURE_FLAG_INERTIA) {
            setImmediate(function() {
              el._gesture.stop();
            });

            return;
          }

          if (!scrolling || Number(new Date()) - startT > 500) {
            e.preventDefault();
            if (!fade && slider.transitions) {
              if (!slider.vars.animationLoop) {
                dx = accDx / ((slider.currentSlide === 0 && accDx < 0 || slider.currentSlide === slider.last && accDx > 0) ? (Math.abs(accDx) / cwidth + 2) : 1);
              }
              slider.setProps(offset + dx, "setTouch");
            }
          }
        }

        function onMSGestureEnd(e) {
          e.stopPropagation();
          var slider = e.target._slider;
          if (!slider) {
            return;
          }
          if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
            var updateDx = (reverse) ? -dx : dx,
              target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

            if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth / 2)) {
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            } else {
              if (!fade) {slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true);}
            }
          }

          startX = null;
          startY = null;
          dx = null;
          offset = null;
          accDx = 0;
        }
      }
    },
    resize: function() {
      if (!slider.animating && slider.is(':visible')) {
        if (!carousel) {slider.doMath()};

        if (fade) {
          // SMOOTH HEIGHT:
          methods.smoothHeight();
        } else if (carousel) { //CAROUSEL:
          slider.slides.width(slider.computedW);
          slider.update(slider.pagingCount);
          slider.setProps();
        }
        else if (vertical) { //VERTICAL:
          slider.viewport.height(slider.h);
          slider.setProps(slider.h, "setTotal");
        } else {
          // SMOOTH HEIGHT:
          if (slider.vars.smoothHeight) {methods.smoothHeight();}
          slider.newSlides.width(slider.computedW);
          slider.setProps(slider.computedW, "setTotal");
        }
      }
    },
    smoothHeight: function(dur) {
      if (!vertical || fade) {
        var $obj = (fade) ? slider : slider.viewport;
        (dur) ? $obj.animate({"height": slider.slides.eq(slider.animatingTo).height()}, dur) : $obj.height(slider.slides.eq(slider.animatingTo).height());
      }
    },
    sync: function(action) {
      var $obj = $(slider.vars.sync).data("flexslider"),
        target = slider.animatingTo;

      switch (action) {
        case "animate":
          $obj.flexAnimate(target, slider.vars.pauseOnAction, false, true);
          break;
        case "play":
          if (!$obj.playing && !$obj.asNav) {
            $obj.play();
          }
          break;
        case "pause":
          $obj.pause();
          break;
      }
    },
    uniqueID: function($clone) {
      // Append _clone to current level and children elements with id attributes
      $clone.filter('[id]').add($clone.find('[id]')).each(function() {
        var $this = $(this);
        $this.attr('id', $this.attr('id') + '_clone');
      });
      return $clone;
    },
    pauseInvisible: {
      visProp: null,
      init: function() {
        var visProp = methods.pauseInvisible.getHiddenProp();
        if (visProp) {
          var evtname = visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
          document.addEventListener(evtname, function() {
            if (methods.pauseInvisible.isHidden()) {
              if(slider.startTimeout) {
                clearTimeout(slider.startTimeout); //If clock is ticking, stop timer and prevent from starting while invisible
              } else {
                slider.pause(); //Or just pause
              }
            }
            else {
              if(slider.started) {
                slider.play(); //Initiated before, just play
              } else {
                if (slider.vars.initDelay > 0) {
                  setTimeout(slider.play, slider.vars.initDelay);
                } else {
                  slider.play(); //Didn't init before: simply init or wait for it
                }
              }
            }
          });
        }
      },
      isHidden: function() {
        var prop = methods.pauseInvisible.getHiddenProp();
        if (!prop) {
          return false;
        }
        return document[prop];
      },
      getHiddenProp: function() {
        var prefixes = ['webkit','moz','ms','o'];
        // if 'hidden' is natively supported just return it
        if ('hidden' in document) {
          return 'hidden';
        }
        // otherwise loop over all the known prefixes until we find one
        for (var i = 0; i < prefixes.length; i++ ) {
          if ((prefixes[i] + 'Hidden') in document) {
            return prefixes[i] + 'Hidden';
          }
        }
        // otherwise it's not supported
        return null;
      }
    },
    setToClearWatchedEvent: function() {
      clearTimeout(watchedEventClearTimer);
      watchedEventClearTimer = setTimeout(function() {
        watchedEvent = "";
      }, 3000);
    }
  };

  // public methods
  slider.flexAnimate = function(target, pause, override, withSync, fromNav) {
    if (!slider.vars.animationLoop && target !== slider.currentSlide) {
      slider.direction = (target > slider.currentSlide) ? "next" : "prev";
    }

    if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";

    if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
      if (asNav && withSync) {
        var master = $(slider.vars.asNavFor).data('flexslider');
        slider.atEnd = target === 0 || target === slider.count - 1;
        master.flexAnimate(target, true, false, true, fromNav);
        slider.direction = (slider.currentItem < target) ? "next" : "prev";
        master.direction = slider.direction;

        if (Math.ceil((target + 1) / slider.visible) - 1 !== slider.currentSlide && target !== 0) {
          slider.currentItem = target;
          slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
          target = Math.floor(target / slider.visible);
        } else {
          slider.currentItem = target;
          slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
          return false;
        }
      }

      slider.animating = true;
      slider.animatingTo = target;

      // SLIDESHOW:
      if (pause) {slider.pause();}

      // API: before() animation Callback
      slider.vars.before(slider);

      // SYNC:
      if (slider.syncExists && !fromNav) {methods.sync("animate");}

      // CONTROLNAV
      if (slider.vars.controlNav) {methods.controlNav.active();}

      // !CAROUSEL:
      // CANDIDATE: slide active class (for add/remove slide)
      if (!carousel) {slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide');}

      // INFINITE LOOP:
      // CANDIDATE: atEnd
      slider.atEnd = target === 0 || target === slider.last;

      // DIRECTIONNAV:
      if (slider.vars.directionNav) {methods.directionNav.update();}

      if (target === slider.last) {
        // API: end() of cycle Callback
        slider.vars.end(slider);
        // SLIDESHOW && !INFINITE LOOP:
        if (!slider.vars.animationLoop) {slider.pause();}
      }

      // SLIDE:
      if (!fade) {
        var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
          margin, slideString, calcNext;

        // INFINITE LOOP / REVERSE:
        if (carousel) {
          //margin = (slider.vars.itemWidth > slider.w) ? slider.vars.itemMargin * 2 : slider.vars.itemMargin;
          margin = slider.vars.itemMargin;
          calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
          slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
        } else if (slider.currentSlide === 0 && target === slider.count - 1 && slider.vars.animationLoop && slider.direction !== "next") {
          slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
        } else if (slider.currentSlide === slider.last && target === 0 && slider.vars.animationLoop && slider.direction !== "prev") {
          slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
        } else {
          slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
        }
        slider.setProps(slideString, "", slider.vars.animationSpeed);
        if (slider.transitions) {
          if (!slider.vars.animationLoop || !slider.atEnd) {
            slider.animating = false;
            slider.currentSlide = slider.animatingTo;
          }

          // Unbind previous transitionEnd events and re-bind new transitionEnd event
          slider.container.unbind("webkitTransitionEnd transitionend");
          slider.container.bind("webkitTransitionEnd transitionend", function() {
            clearTimeout(slider.ensureAnimationEnd);
            slider.wrapup(dimension);
          });

          // Insurance for the ever-so-fickle transitionEnd event
          clearTimeout(slider.ensureAnimationEnd);
          slider.ensureAnimationEnd = setTimeout(function() {
            slider.wrapup(dimension);
          }, slider.vars.animationSpeed + 100);

        } else {
          slider.container.animate(slider.args, slider.vars.animationSpeed, slider.vars.easing, function(){
            slider.wrapup(dimension);
          });
        }
      } else { // FADE:
        if (!touch) {
          //slider.slides.eq(slider.currentSlide).fadeOut(slider.vars.animationSpeed, slider.vars.easing);
          //slider.slides.eq(target).fadeIn(slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

          slider.slides.eq(slider.currentSlide).css({"zIndex": 1}).animate({"opacity": 0}, slider.vars.animationSpeed, slider.vars.easing);
          slider.slides.eq(target).css({"zIndex": 2}).animate({"opacity": 1}, slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);

        } else {
          slider.slides.eq(slider.currentSlide).css({
            "opacity": 0,
            "zIndex": 1
          });
          slider.slides.eq(target).css({"opacity": 1, "zIndex": 2});
          slider.wrapup(dimension);
        }
      }
      // SMOOTH HEIGHT:
      if (slider.vars.smoothHeight) {methods.smoothHeight(slider.vars.animationSpeed)};
    }
  };
  slider.wrapup = function(dimension) {
    // SLIDE:
    if (!fade && !carousel) {
      if (slider.currentSlide === 0 && slider.animatingTo === slider.last && slider.vars.animationLoop) {
        slider.setProps(dimension, "jumpEnd");
      } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && slider.vars.animationLoop) {
        slider.setProps(dimension, "jumpStart");
      }
    }
    slider.animating = false;
    slider.currentSlide = slider.animatingTo;
    // API: after() animation Callback
    slider.vars.after(slider);
  };

  // SLIDESHOW:
  slider.animateSlides = function() {
    if (!slider.animating && focused) {slider.flexAnimate(slider.getTarget("next"));}
  };
  // SLIDESHOW:
  slider.pause = function() {
    clearInterval(slider.animatedSlides);
    slider.animatedSlides = null;
    slider.playing = false;
    // PAUSEPLAY:
    if (slider.vars.pausePlay) {methods.pausePlay.update("play");}
    // SYNC:
    if (slider.syncExists) {methods.sync("pause");}
  };
  // SLIDESHOW:
  slider.play = function() {
    if (slider.playing) {clearInterval(slider.animatedSlides);}
    slider.animatedSlides = slider.animatedSlides || setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
    slider.started = slider.playing = true;
    // PAUSEPLAY:
    if (slider.vars.pausePlay) {methods.pausePlay.update("pause");}
    // SYNC:
    if (slider.syncExists) {methods.sync("play");}
  };
  // STOP:
  slider.stop = function() {
    slider.pause();
    slider.stopped = true;
  };
  slider.canAdvance = function(target, fromNav) {
    // ASNAV:
    var last = (asNav) ? slider.pagingCount - 1 : slider.last;
    return (fromNav) ? true :
      (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true :
        (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false :
          (target === slider.currentSlide && !asNav) ? false :
            (slider.vars.animationLoop) ? true :
              (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false :
                (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false :
                  true;
  };
  slider.getTarget = function(dir) {
    slider.direction = dir;
    if (dir === "next") {
      return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
    } else {
      return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
    }
  };

  // SLIDE:
  slider.setProps = function(pos, special, dur) {
    var target = (function() {
      var posCheck = (pos) ? pos : ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo,
        posCalc = (function() {
          if (carousel) {
            return (special === "setTouch") ? pos :
              (reverse && slider.animatingTo === slider.last) ? 0 :
                (reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                  (slider.animatingTo === slider.last) ? slider.limit : posCheck;
          } else {
            switch (special) {
              case "setTotal":
                return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
              case "setTouch":
                return (reverse) ? pos : pos;
              case "jumpEnd":
                return (reverse) ? pos : slider.count * pos;
              case "jumpStart":
                return (reverse) ? slider.count * pos : pos;
              default:
                return pos;
            }
          }
        }());

      return (posCalc * -1) + "px";
    }());

    if (slider.transitions) {
      target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + target + ",0,0)";
      dur = (dur !== undefined) ? (dur / 1000) + "s" : "0s";
      slider.container.css("-" + slider.pfx + "-transition-duration", dur);
      slider.container.css("transition-duration", dur);
    }

    slider.args[slider.prop] = target;
    if (slider.transitions || dur === undefined) {slider.container.css(slider.args);}

    slider.container.css('transform', target);
  };

  slider.setup = function(type) {
    // SLIDE:
    if (!fade) {
      var sliderOffset, arr;

      if (type === "init") {
        slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({
          "overflow": "hidden",
          "position": "relative"
        }).appendTo(slider).append(slider.container);
        // INFINITE LOOP:
        slider.cloneCount = 0;
        slider.cloneOffset = 0;
        // REVERSE:
        if (reverse) {
          arr = $.makeArray(slider.slides).reverse();
          slider.slides = $(arr);
          slider.container.empty().append(slider.slides);
        }
      }
      // INFINITE LOOP && !CAROUSEL:
      if (slider.vars.animationLoop && !carousel) {
        slider.cloneCount = 2;
        slider.cloneOffset = 1;
        // clear out old clones
        if (type !== "init") { slider.container.find('.clone').remove(); }
        slider.container.append(methods.uniqueID(slider.slides.first().clone().addClass('clone')).attr('aria-hidden', 'true'))
          .prepend(methods.uniqueID(slider.slides.last().clone().addClass('clone')).attr('aria-hidden', 'true'));
      }
      slider.newSlides = $(slider.vars.selector, slider);

      sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
      // VERTICAL:
      if (vertical && !carousel) {
        slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
        setTimeout(function() {
          slider.newSlides.css({"display": "block"});
          slider.doMath();
          slider.viewport.height(slider.h);
          slider.setProps(sliderOffset * slider.h, "init");
        }, (type === "init") ? 100 : 0);
      } else {
        slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
        slider.setProps(sliderOffset * slider.computedW, "init");
        setTimeout(function() {
          slider.doMath();
          slider.newSlides.css({
            "width": slider.computedW,
            "float": "left",
            "display": "block"
          });
          // SMOOTH HEIGHT:
          if (slider.vars.smoothHeight) {methods.smoothHeight();}
        }, (type === "init") ? 100 : 0);
      }
    } else { // FADE:
      slider.slides.css({
        "width": "100%",
        "float": "left",
        "marginRight": "-100%",
        "position": "relative"
      });
      if (type === "init") {
        if (!touch) {
          //slider.slides.eq(slider.currentSlide).fadeIn(slider.vars.animationSpeed, slider.vars.easing);
          if (slider.vars.fadeFirstSlide == false) {
            slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).css({"opacity": 1});
          } else {
            slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).animate({"opacity": 1},slider.vars.animationSpeed,slider.vars.easing);
          }
        } else {
          slider.slides.css({ "opacity": 0, "display": "block", "webkitTransition": "opacity " + slider.vars.animationSpeed / 1000 + "s ease", "zIndex": 1 }).eq(slider.currentSlide).css({ "opacity": 1, "zIndex": 2});
        }
      }
      // SMOOTH HEIGHT:
      if (slider.vars.smoothHeight) {methods.smoothHeight();}
    }
    // !CAROUSEL:
    // CANDIDATE: active slide
    if (!carousel) {slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide");}

    //FlexSlider: init() Callback
    slider.vars.init(slider);
  };

  slider.doMath = function() {
    var slide = slider.slides.first(),
      slideMargin = slider.vars.itemMargin,
      minItems = slider.vars.minItems,
      maxItems = slider.vars.maxItems;

    slider.w = (slider.viewport === undefined) ? slider.width() : slider.viewport.width();
    slider.h = slide.height();
    slider.boxPadding = slide.outerWidth() - slide.width();

    // CAROUSEL:
    if (carousel) {
      slider.itemT = slider.vars.itemWidth + slideMargin;
      slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
      slider.maxW = (maxItems) ? (maxItems * slider.itemT) - slideMargin : slider.w;
      slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * (minItems - 1))) / minItems :
        (slider.maxW < slider.w) ? (slider.w - (slideMargin * (maxItems - 1))) / maxItems :
          (slider.vars.itemWidth > slider.w) ? slider.w : slider.vars.itemWidth;

      slider.visible = Math.floor(slider.w / (slider.itemW));
      slider.move = (slider.vars.move > 0 && slider.vars.move < slider.visible ) ? slider.vars.move : slider.visible;
      slider.pagingCount = Math.ceil(((slider.count - slider.visible) / slider.move) + 1);
      slider.last = slider.pagingCount - 1;
      slider.limit = (slider.pagingCount === 1) ? 0 :
        (slider.vars.itemWidth > slider.w) ? (slider.itemW * (slider.count - 1)) + (slideMargin * (slider.count - 1)) : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
    } else {
      slider.itemW = slider.w;
      slider.pagingCount = slider.count;
      slider.last = slider.count - 1;
    }
    slider.computedW = slider.itemW - slider.boxPadding;
  };

  slider.update = function(pos, action) {
    slider.doMath();

    // update currentSlide and slider.animatingTo if necessary
    if (!carousel) {
      if (pos < slider.currentSlide) {
        slider.currentSlide += 1;
      } else if (pos <= slider.currentSlide && pos !== 0) {
        slider.currentSlide -= 1;
      }
      slider.animatingTo = slider.currentSlide;
    }

    // update controlNav
    if (slider.vars.controlNav && !slider.manualControls) {
      if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
        methods.controlNav.update("add");
      } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
        if (carousel && slider.currentSlide > slider.last) {
          slider.currentSlide -= 1;
          slider.animatingTo -= 1;
        }
        methods.controlNav.update("remove", slider.last);
      }
    }
    // update directionNav
    if (slider.vars.directionNav) {methods.directionNav.update();}

  };

  slider.addSlide = function(obj, pos) {
    var $obj = $(obj);

    slider.count += 1;
    slider.last = slider.count - 1;

    // append new slide
    if (vertical && reverse) {
      (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
    } else {
      (pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
    }

    // update currentSlide, animatingTo, controlNav, and directionNav
    slider.update(pos, "add");

    // update slider.slides
    slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
    // re-setup the slider to accomdate new slide
    slider.setup();

    //FlexSlider: added() Callback
    slider.vars.added(slider);
  };
  slider.removeSlide = function(obj) {
    var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;

    // update count
    slider.count -= 1;
    slider.last = slider.count - 1;

    // remove slide
    if (isNaN(obj)) {
      $(obj, slider.slides).remove();
    } else {
      (vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
    }

    // update currentSlide, animatingTo, controlNav, and directionNav
    slider.doMath();
    slider.update(pos, "remove");

    // update slider.slides
    slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
    // re-setup the slider to accomdate new slide
    slider.setup();

    // FlexSlider: removed() Callback
    slider.vars.removed(slider);
  };

  //FlexSlider: Initialize
  methods.init();
};

// Ensure the slider isn't focussed if the window loses focus.
$(window).blur(function(e) {
  focused = false;
}).focus(function(e) {
  focused = true;
});

// FlexSlider: Default Settings
$.flexslider.defaults = {
  namespace: 'am-',             // {NEW} String: Prefix string attached to the class of every element generated by the plugin
  selector: '.am-slides > li',       // {NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
  animation: 'slide',              // String: Select your animation type, 'fade' or 'slide'
  easing: 'swing',                // {NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
  direction: 'horizontal',        // String: Select the sliding direction, "horizontal" or "vertical"
  reverse: false,                 // {NEW} Boolean: Reverse the animation direction
  animationLoop: true,            // Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
  smoothHeight: false,            // {NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
  startAt: 0,                     // Integer: The slide that the slider should start on. Array notation (0 = first slide)
  slideshow: true,                // Boolean: Animate slider automatically
  slideshowSpeed: 5000,           // Integer: Set the speed of the slideshow cycling, in milliseconds
  animationSpeed: 600,            // Integer: Set the speed of animations, in milliseconds
  initDelay: 0,                   // {NEW} Integer: Set an initialization delay, in milliseconds
  randomize: false,               // Boolean: Randomize slide order
  fadeFirstSlide: true,           // Boolean: Fade in the first slide when animation type is "fade"
  thumbCaptions: false,           // Boolean: Whether or not to put captions on thumbnails when using the "thumbnails" controlNav.

  // Usability features
  pauseOnAction: true,            // Boolean: Pause the slideshow when interacting with control elements, highly recommended.
  pauseOnHover: false,            // Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
  pauseInvisible: true,   		// {NEW} Boolean: Pause the slideshow when tab is invisible, resume when visible. Provides better UX, lower CPU usage.
  useCSS: true,                   // {NEW} Boolean: Slider will use CSS3 transitions if available
  touch: true,                    // {NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
  video: false,                   // {NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

  // Primary Controls
  controlNav: true,               // Boolean: Create navigation for paging control of each slide? Note: Leave true for manualControls usage
  directionNav: true,             // Boolean: Create navigation for previous/next navigation? (true/false)
  prevText: ' ',           // String: Set the text for the "previous" directionNav item
  nextText: ' ',               // String: Set the text for the "next" directionNav item

  // Secondary Navigation
  keyboard: true,                 // Boolean: Allow slider navigating via keyboard left/right keys
  multipleKeyboard: false,        // {NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
  mousewheel: false,              // {UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
  pausePlay: false,               // Boolean: Create pause/play dynamic element
  pauseText: 'Pause',             // String: Set the text for the 'pause' pausePlay item
  playText: 'Play',               // String: Set the text for the 'play' pausePlay item

  //  Special properties
  controlsContainer: '',          // {UPDATED} jQuery Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $('.flexslider-container'). Property is ignored if given element is not found.
  manualControls: '',             // {UPDATED} jQuery Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
  sync: '',                       // {NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
  asNavFor: '',                   // {NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

  // Carousel Options
  itemWidth: 0,                   // {NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
  itemMargin: 0,                  // {NEW} Integer: Margin between carousel items.
  minItems: 1,                    // {NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
  maxItems: 0,                    // {NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
  move: 0,                        // {NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
  allowOneSlide: true,           // {NEW} Boolean: Whether or not to allow a slider comprised of a single slide

  // Callback API
  start: function() {
  },            // Callback: function(slider) - Fires when the slider loads the first slide
  before: function() {
  },           // Callback: function(slider) - Fires asynchronously with each slider animation
  after: function() {
  },            // Callback: function(slider) - Fires after each slider animation completes
  end: function() {
  },              // Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
  added: function() {
  },            // {NEW} Callback: function(slider) - Fires after a slide is added
  removed: function() {
  },           // {NEW} Callback: function(slider) - Fires after a slide is removed
  init: function() {
  }             // {NEW} Callback: function(slider) - Fires after the slider is initially setup
};

// FlexSlider: Plugin Function
$.fn.flexslider = function(options) {
  var args = Array.prototype.slice.call(arguments, 1);
  if (options === undefined) {options = {};}

  if (typeof options === 'object') {
    return this.each(function() {
      var $this = $(this);
      var selector = (options.selector) ? options.selector : '.am-slides > li';
      var $slides = $this.find(selector);

      if (($slides.length === 1 && options.allowOneSlide === true) || $slides.length === 0) {
        $slides.fadeIn(400);
        if (options.start) {options.start($this);}
      } else if ($this.data('flexslider') === undefined) {
        new $.flexslider(this, options);
      }
    });
  } else {
    // Helper strings to quickly pecdrform functions on the slider
    var $slider = $(this).data('flexslider');
    var methodReturn;
    switch (options) {
      case 'next':
        $slider.flexAnimate($slider.getTarget('next'), true);
        break;
      case 'prev':
      case 'previous':
        $slider.flexAnimate($slider.getTarget('prev'), true);
        break;
      default:
        if (typeof options === 'number') {
          $slider.flexAnimate(options, true);
        } else if (typeof options === 'string') {
          methodReturn = (typeof $slider[options] === 'function') ?
            $slider[options].apply($slider, args) : $slider[options];
        }
    }

    return methodReturn === undefined ? this : methodReturn;
  }
};

// Init code
UI.ready(function(context) {
  $('[data-am-flexslider]', context).each(function(i, item) {
    var $slider = $(item);
    var options = UI.utils.parseOptions($slider.data('amFlexslider'));

    options.before = function(slider) {
      if (slider._pausedTimer) {
        window.clearTimeout(slider._pausedTimer);
        slider._pausedTimer = null;
      }
    };

    options.after = function(slider) {
      var pauseTime = slider.vars.playAfterPaused;
      if (pauseTime && !isNaN(pauseTime) && !slider.playing) {
        if (!slider.manualPause && !slider.manualPlay && !slider.stopped) {
          slider._pausedTimer = window.setTimeout(function() {
            slider.play();
          }, pauseTime);
        }
      }
    };

    $slider.flexslider(options);
  });
});

module.exports = $.flexslider;

},{"2":2}],11:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);

/* jshint unused: false */
/* jshint -W101, -W116, -W109 */

/*! iScroll v5.1.3
 * (c) 2008-2014 Matteo Spinelli
 * http://cubiq.org/license
 */

var rAF = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };

var utils = (function() {
  var me = {};

  var _elementStyle = document.createElement('div').style;
  var _vendor = (function() {
    var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
      transform,
      i = 0,
      l = vendors.length;

    for (; i < l; i++) {
      transform = vendors[i] + 'ransform';
      if (transform in _elementStyle) return vendors[i].substr(0, vendors[i].length - 1);
    }

    return false;
  })();

  function _prefixStyle(style) {
    if (_vendor === false) return false;
    if (_vendor === '') return style;
    return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
  }

  me.getTime = Date.now || function getTime() {
    return new Date().getTime();
  };

  me.extend = function(target, obj) {
    for (var i in obj) {
      target[i] = obj[i];
    }
  };

  me.addEvent = function(el, type, fn, capture) {
    el.addEventListener(type, fn, !!capture);
  };

  me.removeEvent = function(el, type, fn, capture) {
    el.removeEventListener(type, fn, !!capture);
  };

  me.prefixPointerEvent = function(pointerEvent) {
    return window.MSPointerEvent ?
    'MSPointer' + pointerEvent.charAt(9).toUpperCase() + pointerEvent.substr(10) :
      pointerEvent;
  };

  me.momentum = function(current, start, time, lowerMargin, wrapperSize, deceleration) {
    var distance = current - start,
      speed = Math.abs(distance) / time,
      destination,
      duration;

    deceleration = deceleration === undefined ? 0.0006 : deceleration;

    destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
    duration = speed / deceleration;

    if (destination < lowerMargin) {
      destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
      distance = Math.abs(destination - current);
      duration = distance / speed;
    } else if (destination > 0) {
      destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
      distance = Math.abs(current) + destination;
      duration = distance / speed;
    }

    return {
      destination: Math.round(destination),
      duration: duration
    };
  };

  var _transform = _prefixStyle('transform');

  me.extend(me, {
    hasTransform: _transform !== false,
    hasPerspective: _prefixStyle('perspective') in _elementStyle,
    hasTouch: 'ontouchstart' in window,
    hasPointer: window.PointerEvent || window.MSPointerEvent, // IE10 is prefixed
    hasTransition: _prefixStyle('transition') in _elementStyle
  });

  // This should find all Android browsers lower than build 535.19 (both stock browser and webview)
  me.isBadAndroid = /Android /.test(window.navigator.appVersion) && !(/Chrome\/\d/.test(window.navigator.appVersion));

  me.extend(me.style = {}, {
    transform: _transform,
    transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
    transitionDuration: _prefixStyle('transitionDuration'),
    transitionDelay: _prefixStyle('transitionDelay'),
    transformOrigin: _prefixStyle('transformOrigin')
  });

  me.hasClass = function(e, c) {
    var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
    return re.test(e.className);
  };

  me.addClass = function(e, c) {
    if (me.hasClass(e, c)) {
      return;
    }

    var newclass = e.className.split(' ');
    newclass.push(c);
    e.className = newclass.join(' ');
  };

  me.removeClass = function(e, c) {
    if (!me.hasClass(e, c)) {
      return;
    }

    var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
    e.className = e.className.replace(re, ' ');
  };

  me.offset = function(el) {
    var left = -el.offsetLeft,
      top = -el.offsetTop;

    // jshint -W084
    while (el = el.offsetParent) {
      left -= el.offsetLeft;
      top -= el.offsetTop;
    }
    // jshint +W084

    return {
      left: left,
      top: top
    };
  };

  me.preventDefaultException = function(el, exceptions) {
    for (var i in exceptions) {
      if (exceptions[i].test(el[i])) {
        return true;
      }
    }

    return false;
  };

  me.extend(me.eventType = {}, {
    touchstart: 1,
    touchmove: 1,
    touchend: 1,

    mousedown: 2,
    mousemove: 2,
    mouseup: 2,

    pointerdown: 3,
    pointermove: 3,
    pointerup: 3,

    MSPointerDown: 3,
    MSPointerMove: 3,
    MSPointerUp: 3
  });

  me.extend(me.ease = {}, {
    quadratic: {
      style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      fn: function(k) {
        return k * ( 2 - k );
      }
    },
    circular: {
      style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',	// Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
      fn: function(k) {
        return Math.sqrt(1 - ( --k * k ));
      }
    },
    back: {
      style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      fn: function(k) {
        var b = 4;
        return ( k = k - 1 ) * k * ( ( b + 1 ) * k + b ) + 1;
      }
    },
    bounce: {
      style: '',
      fn: function(k) {
        if (( k /= 1 ) < ( 1 / 2.75 )) {
          return 7.5625 * k * k;
        } else if (k < ( 2 / 2.75 )) {
          return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;
        } else if (k < ( 2.5 / 2.75 )) {
          return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;
        } else {
          return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;
        }
      }
    },
    elastic: {
      style: '',
      fn: function(k) {
        var f = 0.22,
          e = 0.4;

        if (k === 0) {
          return 0;
        }
        if (k == 1) {
          return 1;
        }

        return ( e * Math.pow(2, -10 * k) * Math.sin(( k - f / 4 ) * ( 2 * Math.PI ) / f) + 1 );
      }
    }
  });

  me.tap = function(e, eventName) {
    var ev = document.createEvent('Event');
    ev.initEvent(eventName, true, true);
    ev.pageX = e.pageX;
    ev.pageY = e.pageY;
    e.target.dispatchEvent(ev);
  };

  me.click = function(e) {
    var target = e.target,
      ev;

    if (!(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName)) {
      ev = document.createEvent('MouseEvents');
      ev.initMouseEvent('click', true, true, e.view, 1,
        target.screenX, target.screenY, target.clientX, target.clientY,
        e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
        0, null);

      ev._constructed = true;
      target.dispatchEvent(ev);
    }
  };

  return me;
})();

function IScroll(el, options) {
  this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
  this.scroller = this.wrapper.children[0];
  this.scrollerStyle = this.scroller.style;		// cache style for better performance

  this.options = {

    // INSERT POINT: OPTIONS

    startX: 0,
    startY: 0,
    scrollY: true,
    directionLockThreshold: 5,
    momentum: true,

    bounce: true,
    bounceTime: 600,
    bounceEasing: '',

    preventDefault: true,
    preventDefaultException: {tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/},

    HWCompositing: true,
    useTransition: true,
    useTransform: true
  };

  for (var i in options) {
    this.options[i] = options[i];
  }

  // Normalize options
  this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';

  this.options.useTransition = utils.hasTransition && this.options.useTransition;
  this.options.useTransform = utils.hasTransform && this.options.useTransform;

  this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
  this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;

  // If you want eventPassthrough I have to lock one of the axes
  this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
  this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;

  // With eventPassthrough we also need lockDirection mechanism
  this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
  this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

  this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;

  this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;

  if (this.options.tap === true) {
    this.options.tap = 'tap';
  }

  // INSERT POINT: NORMALIZATION

  // Some defaults
  this.x = 0;
  this.y = 0;
  this.directionX = 0;
  this.directionY = 0;
  this._events = {};

  // INSERT POINT: DEFAULTS

  this._init();
  this.refresh();

  this.scrollTo(this.options.startX, this.options.startY);
  this.enable();
}

IScroll.prototype = {
  version: '5.1.3',

  _init: function() {
    this._initEvents();

    // INSERT POINT: _init

  },

  destroy: function() {
    this._initEvents(true);

    this._execEvent('destroy');
  },

  _transitionEnd: function(e) {
    if (e.target != this.scroller || !this.isInTransition) {
      return;
    }

    this._transitionTime();
    if (!this.resetPosition(this.options.bounceTime)) {
      this.isInTransition = false;
      this._execEvent('scrollEnd');
    }
  },

  _start: function(e) {
    // React to left mouse button only
    if (utils.eventType[e.type] != 1) {
      if (e.button !== 0) {
        return;
      }
    }

    if (!this.enabled || (this.initiated && utils.eventType[e.type] !== this.initiated)) {
      return;
    }

    if (this.options.preventDefault && !utils.isBadAndroid && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) {
      e.preventDefault();
    }

    var point = e.touches ? e.touches[0] : e,
      pos;

    this.initiated = utils.eventType[e.type];
    this.moved = false;
    this.distX = 0;
    this.distY = 0;
    this.directionX = 0;
    this.directionY = 0;
    this.directionLocked = 0;

    this._transitionTime();

    this.startTime = utils.getTime();

    if (this.options.useTransition && this.isInTransition) {
      this.isInTransition = false;
      pos = this.getComputedPosition();
      this._translate(Math.round(pos.x), Math.round(pos.y));
      this._execEvent('scrollEnd');
    } else if (!this.options.useTransition && this.isAnimating) {
      this.isAnimating = false;
      this._execEvent('scrollEnd');
    }

    this.startX = this.x;
    this.startY = this.y;
    this.absStartX = this.x;
    this.absStartY = this.y;
    this.pointX = point.pageX;
    this.pointY = point.pageY;

    this._execEvent('beforeScrollStart');
  },

  _move: function(e) {
    if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
      return;
    }

    if (this.options.preventDefault) {	// increases performance on Android? TODO: check!
      e.preventDefault();
    }

    var point = e.touches ? e.touches[0] : e,
      deltaX = point.pageX - this.pointX,
      deltaY = point.pageY - this.pointY,
      timestamp = utils.getTime(),
      newX, newY,
      absDistX, absDistY;

    this.pointX = point.pageX;
    this.pointY = point.pageY;

    this.distX += deltaX;
    this.distY += deltaY;
    absDistX = Math.abs(this.distX);
    absDistY = Math.abs(this.distY);

    // We need to move at least 10 pixels for the scrolling to initiate
    if (timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10)) {
      return;
    }

    // If you are scrolling in one direction lock the other
    if (!this.directionLocked && !this.options.freeScroll) {
      if (absDistX > absDistY + this.options.directionLockThreshold) {
        this.directionLocked = 'h';		// lock horizontally
      } else if (absDistY >= absDistX + this.options.directionLockThreshold) {
        this.directionLocked = 'v';		// lock vertically
      } else {
        this.directionLocked = 'n';		// no lock
      }
    }

    if (this.directionLocked == 'h') {
      if (this.options.eventPassthrough == 'vertical') {
        e.preventDefault();
      } else if (this.options.eventPassthrough == 'horizontal') {
        this.initiated = false;
        return;
      }

      deltaY = 0;
    } else if (this.directionLocked == 'v') {
      if (this.options.eventPassthrough == 'horizontal') {
        e.preventDefault();
      } else if (this.options.eventPassthrough == 'vertical') {
        this.initiated = false;
        return;
      }

      deltaX = 0;
    }

    deltaX = this.hasHorizontalScroll ? deltaX : 0;
    deltaY = this.hasVerticalScroll ? deltaY : 0;

    newX = this.x + deltaX;
    newY = this.y + deltaY;

    // Slow down if outside of the boundaries
    if (newX > 0 || newX < this.maxScrollX) {
      newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
    }
    if (newY > 0 || newY < this.maxScrollY) {
      newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
    }

    this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
    this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

    if (!this.moved) {
      this._execEvent('scrollStart');
    }

    this.moved = true;

    this._translate(newX, newY);

    /* REPLACE START: _move */

    if (timestamp - this.startTime > 300) {
      this.startTime = timestamp;
      this.startX = this.x;
      this.startY = this.y;
    }

    /* REPLACE END: _move */

  },

  _end: function(e) {
    if (!this.enabled || utils.eventType[e.type] !== this.initiated) {
      return;
    }

    if (this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException)) {
      e.preventDefault();
    }

    var point = e.changedTouches ? e.changedTouches[0] : e,
      momentumX,
      momentumY,
      duration = utils.getTime() - this.startTime,
      newX = Math.round(this.x),
      newY = Math.round(this.y),
      distanceX = Math.abs(newX - this.startX),
      distanceY = Math.abs(newY - this.startY),
      time = 0,
      easing = '';

    this.isInTransition = 0;
    this.initiated = 0;
    this.endTime = utils.getTime();

    // reset if we are outside of the boundaries
    if (this.resetPosition(this.options.bounceTime)) {
      return;
    }

    this.scrollTo(newX, newY);	// ensures that the last position is rounded

    // we scrolled less than 10 pixels
    if (!this.moved) {
      if (this.options.tap) {
        utils.tap(e, this.options.tap);
      }

      if (this.options.click) {
        utils.click(e);
      }

      this._execEvent('scrollCancel');
      return;
    }

    if (this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100) {
      this._execEvent('flick');
      return;
    }

    // start momentum animation if needed
    if (this.options.momentum && duration < 300) {
      momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
        destination: newX,
        duration: 0
      };
      momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
        destination: newY,
        duration: 0
      };
      newX = momentumX.destination;
      newY = momentumY.destination;
      time = Math.max(momentumX.duration, momentumY.duration);
      this.isInTransition = 1;
    }

    // INSERT POINT: _end

    if (newX != this.x || newY != this.y) {
      // change easing function when scroller goes out of the boundaries
      if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
        easing = utils.ease.quadratic;
      }

      this.scrollTo(newX, newY, time, easing);
      return;
    }

    this._execEvent('scrollEnd');
  },

  _resize: function() {
    var that = this;

    clearTimeout(this.resizeTimeout);

    this.resizeTimeout = setTimeout(function() {
      that.refresh();
    }, this.options.resizePolling);
  },

  resetPosition: function(time) {
    var x = this.x,
      y = this.y;

    time = time || 0;

    if (!this.hasHorizontalScroll || this.x > 0) {
      x = 0;
    } else if (this.x < this.maxScrollX) {
      x = this.maxScrollX;
    }

    if (!this.hasVerticalScroll || this.y > 0) {
      y = 0;
    } else if (this.y < this.maxScrollY) {
      y = this.maxScrollY;
    }

    if (x == this.x && y == this.y) {
      return false;
    }

    this.scrollTo(x, y, time, this.options.bounceEasing);

    return true;
  },

  disable: function() {
    this.enabled = false;
  },

  enable: function() {
    this.enabled = true;
  },

  refresh: function() {
    var rf = this.wrapper.offsetHeight;		// Force reflow

    this.wrapperWidth = this.wrapper.clientWidth;
    this.wrapperHeight = this.wrapper.clientHeight;

    /* REPLACE START: refresh */

    this.scrollerWidth = this.scroller.offsetWidth;
    this.scrollerHeight = this.scroller.offsetHeight;

    this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
    this.maxScrollY = this.wrapperHeight - this.scrollerHeight;

    /* REPLACE END: refresh */

    this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0;
    this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0;

    if (!this.hasHorizontalScroll) {
      this.maxScrollX = 0;
      this.scrollerWidth = this.wrapperWidth;
    }

    if (!this.hasVerticalScroll) {
      this.maxScrollY = 0;
      this.scrollerHeight = this.wrapperHeight;
    }

    this.endTime = 0;
    this.directionX = 0;
    this.directionY = 0;

    this.wrapperOffset = utils.offset(this.wrapper);

    this._execEvent('refresh');

    this.resetPosition();

    // INSERT POINT: _refresh

  },

  on: function(type, fn) {
    if (!this._events[type]) {
      this._events[type] = [];
    }

    this._events[type].push(fn);
  },

  off: function(type, fn) {
    if (!this._events[type]) {
      return;
    }

    var index = this._events[type].indexOf(fn);

    if (index > -1) {
      this._events[type].splice(index, 1);
    }
  },

  _execEvent: function(type) {
    if (!this._events[type]) {
      return;
    }

    var i = 0,
      l = this._events[type].length;

    if (!l) {
      return;
    }

    for (; i < l; i++) {
      this._events[type][i].apply(this, [].slice.call(arguments, 1));
    }
  },

  scrollBy: function(x, y, time, easing) {
    x = this.x + x;
    y = this.y + y;
    time = time || 0;

    this.scrollTo(x, y, time, easing);
  },

  scrollTo: function(x, y, time, easing) {
    easing = easing || utils.ease.circular;

    this.isInTransition = this.options.useTransition && time > 0;

    if (!time || (this.options.useTransition && easing.style)) {
      this._transitionTimingFunction(easing.style);
      this._transitionTime(time);
      this._translate(x, y);
    } else {
      this._animate(x, y, time, easing.fn);
    }
  },

  scrollToElement: function(el, time, offsetX, offsetY, easing) {
    el = el.nodeType ? el : this.scroller.querySelector(el);

    if (!el) {
      return;
    }

    var pos = utils.offset(el);

    pos.left -= this.wrapperOffset.left;
    pos.top -= this.wrapperOffset.top;

    // if offsetX/Y are true we center the element to the screen
    if (offsetX === true) {
      offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
    }
    if (offsetY === true) {
      offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
    }

    pos.left -= offsetX || 0;
    pos.top -= offsetY || 0;

    pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
    pos.top = pos.top > 0 ? 0 : pos.top < this.maxScrollY ? this.maxScrollY : pos.top;

    time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x - pos.left), Math.abs(this.y - pos.top)) : time;

    this.scrollTo(pos.left, pos.top, time, easing);
  },

  _transitionTime: function(time) {
    time = time || 0;

    this.scrollerStyle[utils.style.transitionDuration] = time + 'ms';

    if (!time && utils.isBadAndroid) {
      this.scrollerStyle[utils.style.transitionDuration] = '0.001s';
    }

    // INSERT POINT: _transitionTime

  },

  _transitionTimingFunction: function(easing) {
    this.scrollerStyle[utils.style.transitionTimingFunction] = easing;

    // INSERT POINT: _transitionTimingFunction

  },

  _translate: function(x, y) {
    if (this.options.useTransform) {

      /* REPLACE START: _translate */

      this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;

      /* REPLACE END: _translate */

    } else {
      x = Math.round(x);
      y = Math.round(y);
      this.scrollerStyle.left = x + 'px';
      this.scrollerStyle.top = y + 'px';
    }

    this.x = x;
    this.y = y;

    // INSERT POINT: _translate

  },

  _initEvents: function(remove) {
    var eventType = remove ? utils.removeEvent : utils.addEvent,
      target = this.options.bindToWrapper ? this.wrapper : window;

    eventType(window, 'orientationchange', this);
    eventType(window, 'resize', this);

    if (this.options.click) {
      eventType(this.wrapper, 'click', this, true);
    }

    if (!this.options.disableMouse) {
      eventType(this.wrapper, 'mousedown', this);
      eventType(target, 'mousemove', this);
      eventType(target, 'mousecancel', this);
      eventType(target, 'mouseup', this);
    }

    if (utils.hasPointer && !this.options.disablePointer) {
      eventType(this.wrapper, utils.prefixPointerEvent('pointerdown'), this);
      eventType(target, utils.prefixPointerEvent('pointermove'), this);
      eventType(target, utils.prefixPointerEvent('pointercancel'), this);
      eventType(target, utils.prefixPointerEvent('pointerup'), this);
    }

    if (utils.hasTouch && !this.options.disableTouch) {
      eventType(this.wrapper, 'touchstart', this);
      eventType(target, 'touchmove', this);
      eventType(target, 'touchcancel', this);
      eventType(target, 'touchend', this);
    }

    eventType(this.scroller, 'transitionend', this);
    eventType(this.scroller, 'webkitTransitionEnd', this);
    eventType(this.scroller, 'oTransitionEnd', this);
    eventType(this.scroller, 'MSTransitionEnd', this);
  },

  getComputedPosition: function() {
    var matrix = window.getComputedStyle(this.scroller, null),
      x, y;

    if (this.options.useTransform) {
      matrix = matrix[utils.style.transform].split(')')[0].split(', ');
      x = +(matrix[12] || matrix[4]);
      y = +(matrix[13] || matrix[5]);
    } else {
      x = +matrix.left.replace(/[^-\d.]/g, '');
      y = +matrix.top.replace(/[^-\d.]/g, '');
    }

    return {x: x, y: y};
  },

  _animate: function(destX, destY, duration, easingFn) {
    var that = this,
      startX = this.x,
      startY = this.y,
      startTime = utils.getTime(),
      destTime = startTime + duration;

    function step() {
      var now = utils.getTime(),
        newX, newY,
        easing;

      if (now >= destTime) {
        that.isAnimating = false;
        that._translate(destX, destY);

        if (!that.resetPosition(that.options.bounceTime)) {
          that._execEvent('scrollEnd');
        }

        return;
      }

      now = ( now - startTime ) / duration;
      easing = easingFn(now);
      newX = ( destX - startX ) * easing + startX;
      newY = ( destY - startY ) * easing + startY;
      that._translate(newX, newY);

      if (that.isAnimating) {
        rAF(step);
      }
    }

    this.isAnimating = true;
    step();
  },
  handleEvent: function(e) {
    switch (e.type) {
      case 'touchstart':
      case 'pointerdown':
      case 'MSPointerDown':
      case 'mousedown':
        this._start(e);
        break;
      case 'touchmove':
      case 'pointermove':
      case 'MSPointerMove':
      case 'mousemove':
        this._move(e);
        break;
      case 'touchend':
      case 'pointerup':
      case 'MSPointerUp':
      case 'mouseup':
      case 'touchcancel':
      case 'pointercancel':
      case 'MSPointerCancel':
      case 'mousecancel':
        this._end(e);
        break;
      case 'orientationchange':
      case 'resize':
        this._resize();
        break;
      case 'transitionend':
      case 'webkitTransitionEnd':
      case 'oTransitionEnd':
      case 'MSTransitionEnd':
        this._transitionEnd(e);
        break;
      case 'wheel':
      case 'DOMMouseScroll':
      case 'mousewheel':
        this._wheel(e);
        break;
      case 'keydown':
        this._key(e);
        break;
      case 'click':
        if (!e._constructed) {
          e.preventDefault();
          e.stopPropagation();
        }
        break;
    }
  }
};

IScroll.utils = utils;

module.exports = UI.iScroll = IScroll;

/* jshint unused: true */
/* jshint +W101, +W116, +W109 */

},{"2":2}],12:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);
var dimmer = _dereq_(8);
var $doc = $(document);
var supportTransition = UI.support.transition;

/**
 * @reference https://github.com/nolimits4web/Framework7/blob/master/src/js/modals.js
 * @license https://github.com/nolimits4web/Framework7/blob/master/LICENSE
 */

var Modal = function(element, options) {
  this.options = $.extend({}, Modal.DEFAULTS, options || {});
  this.$element = $(element);
  this.$dialog =   this.$element.find('.am-modal-dialog');

  if (!this.$element.attr('id')) {
    this.$element.attr('id', UI.utils.generateGUID('am-modal'));
  }

  this.isPopup = this.$element.hasClass('am-popup');
  this.isActions = this.$element.hasClass('am-modal-actions');
  this.isPrompt = this.$element.hasClass('am-modal-prompt');
  this.isLoading = this.$element.hasClass('am-modal-loading');
  this.active = this.transitioning = this.relatedTarget = null;

  this.events();
};

Modal.DEFAULTS = {
  className: {
    active: 'am-modal-active',
    out: 'am-modal-out'
  },
  selector: {
    modal: '.am-modal',
    active: '.am-modal-active'
  },
  closeViaDimmer: true,
  cancelable: true,
  onConfirm: function() {
  },
  onCancel: function() {
  },
  closeOnCancel: true,
  closeOnConfirm: true,
  height: undefined,
  width: undefined,
  duration: 300, // must equal the CSS transition duration
  transitionEnd: supportTransition && supportTransition.end + '.modal.amui'
};

Modal.prototype.toggle = function(relatedTarget) {
  return this.active ? this.close() : this.open(relatedTarget);
};

Modal.prototype.open = function(relatedTarget) {
  var $element = this.$element;
  var options = this.options;
  var isPopup = this.isPopup;
  var width = options.width;
  var height = options.height;
  var style = {};

  if (this.active) {
    return;
  }

  if (!this.$element.length) {
    return;
  }

  // callback hook
  relatedTarget && (this.relatedTarget = relatedTarget);

  // 判断如果还在动画，就先触发之前的closed事件
  if (this.transitioning) {
    clearTimeout($element.transitionEndTimmer);
    $element.transitionEndTimmer = null;
    $element.trigger(options.transitionEnd).off(options.transitionEnd);
  }

  isPopup && this.$element.show();

  this.active = true;

  $element.trigger($.Event('open.modal.amui', {relatedTarget: relatedTarget}));

  dimmer.open($element);

  $element.show().redraw();

  // apply Modal width/height if set
  if (!isPopup && !this.isActions) {
    if (width) {
      width = parseInt(width, 10);
      style.width =  width + 'px';
      style.marginLeft =  -parseInt(width / 2) + 'px';
    }

    if (height) {
      height = parseInt(height, 10);
      // style.height = height + 'px';
      style.marginTop = -parseInt(height / 2) + 'px';

      // the background color is styled to $dialog
      // so the height should set to $dialog
      this.$dialog.css({height: height + 'px'});
    } else {
      style.marginTop = -parseInt($element.height() / 2, 10) + 'px';
    }

    $element.css(style);
  }

  $element.
    removeClass(options.className.out).
    addClass(options.className.active);

  this.transitioning = 1;

  var complete = function() {
    $element.trigger($.Event('opened.modal.amui',
      {relatedTarget: relatedTarget}));
    this.transitioning = 0;

    // Prompt auto focus
    if (this.isPrompt) {
      this.$dialog.find('input').eq(0).focus();
    }
  };

  if (!supportTransition) {
    return complete.call(this);
  }

  $element.
    one(options.transitionEnd, $.proxy(complete, this)).
    emulateTransitionEnd(options.duration);
};

Modal.prototype.close = function(relatedTarget) {
  if (!this.active) {
    return;
  }

  var $element = this.$element;
  var options = this.options;
  var isPopup = this.isPopup;

  // 判断如果还在动画，就先触发之前的opened事件
  if (this.transitioning) {
    clearTimeout($element.transitionEndTimmer);
    $element.transitionEndTimmer = null;
    $element.trigger(options.transitionEnd).off(options.transitionEnd);
    dimmer.close($element, true);
  }

  this.$element.trigger($.Event('close.modal.amui',
    {relatedTarget: relatedTarget}));

  this.transitioning = 1;

  var complete = function() {
    $element.trigger('closed.modal.amui');
    isPopup && $element.removeClass(options.className.out);
    $element.hide();
    this.transitioning = 0;
    // 不强制关闭 Dimmer，以便多个 Modal 可以共享 Dimmer
    dimmer.close($element, false);
    this.active = false;
  };

  $element.removeClass(options.className.active).
    addClass(options.className.out);

  if (!supportTransition) {
    return complete.call(this);
  }

  $element.one(options.transitionEnd, $.proxy(complete, this)).
    emulateTransitionEnd(options.duration);
};

Modal.prototype.events = function() {
  var options = this.options;
  var _this = this;
  var $element = this.$element;
  var $ipt = $element.find('.am-modal-prompt-input');
  var $confirm = $element.find('[data-am-modal-confirm]');
  var $cancel = $element.find('[data-am-modal-cancel]');
  var getData = function() {
    var data = [];
    $ipt.each(function() {
      data.push($(this).val());
    });

    return (data.length === 0) ? undefined :
      ((data.length === 1) ? data[0] : data);
  };

  // close via Esc key
  if (this.options.cancelable) {
    $element.on('keyup.modal.amui', function(e) {
        if (_this.active && e.which === 27) {
          $element.trigger('cancel.modal.amui');
          _this.close();
        }
      });
  }

  // Close Modal when dimmer clicked
  if (this.options.closeViaDimmer && !this.isLoading) {
    dimmer.$element.on('click.dimmer.modal.amui', function(e) {
      _this.close();
    });
  }

  // Close Modal when button clicked
  $element.find('[data-am-modal-close], .am-modal-btn').
    on('click.close.modal.amui', function(e) {
      e.preventDefault();
      var $this = $(this);

      if ($this.is($confirm)) {
        console.log('sdafdf');
        options.closeOnConfirm && _this.close();
      } else if ($this.is($cancel)) {
        options.closeOnCancel && _this.close();
      } else {
        _this.close();
      }
    });

  $confirm.on('click.confirm.modal.amui',
    function() {
      $element.trigger($.Event('confirm.modal.amui', {
        trigger: this
      }));
    });

  $cancel.on('click.cancel.modal.amui', function() {
      $element.trigger($.Event('cancel.modal.amui', {
        trigger: this
      }));
    });

  $element.on('confirm.modal.amui', function(e) {
    e.data = getData();
    _this.options.onConfirm.call(_this, e);
  }).on('cancel.modal.amui', function(e) {
    e.data = getData();
    _this.options.onCancel.call(_this, e);
  });
};

function Plugin(option, relatedTarget) {
  return this.each(function() {
    var $this = $(this);
    var data = $this.data('amui.modal');
    var options = typeof option == 'object' && option;

    if (!data) {
      $this.data('amui.modal', (data = new Modal(this, options)));
    }

    if (typeof option == 'string') {
      data[option] && data[option](relatedTarget);
    } else {
      data.toggle(option && option.relatedTarget || undefined);
    }
  });
}

$.fn.modal = Plugin;

// Init
$doc.on('click.modal.amui.data-api', '[data-am-modal]', function() {
  var $this = $(this);
  var options = UI.utils.parseOptions($this.attr('data-am-modal'));
  var $target = $(options.target ||
  (this.href && this.href.replace(/.*(?=#[^\s]+$)/, '')));
  var option = $target.data('amui.modal') ? 'toggle' : options;

  Plugin.call($target, option, this);
});

module.exports = UI.modal = Modal;

},{"2":2,"8":8}],13:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);
_dereq_(30);

var $win = $(window);
var $doc = $(document);
var scrollPos;

/**
 * @via https://github.com/uikit/uikit/blob/master/src/js/offcanvas.js
 * @license https://github.com/uikit/uikit/blob/master/LICENSE.md
 */

var OffCanvas = function(element, options) {
  this.$element = $(element);
  this.options = $.extend({}, OffCanvas.DEFAULTS, options);
  this.active = null;
  this.bindEvents();
};

OffCanvas.DEFAULTS = {
  duration: 300,
  effect: 'overlay' // {push|overlay}, push is too expensive
};

OffCanvas.prototype.open = function(relatedElement) {
  var _this = this;
  var $element = this.$element;

  if (!$element.length || $element.hasClass('am-active')) {
    return;
  }

  var effect = this.options.effect;
  var $html = $('html');
  var $body = $('body');
  var $bar = $element.find('.am-offcanvas-bar').first();
  var dir = $bar.hasClass('am-offcanvas-bar-flip') ? -1 : 1;

  $bar.addClass('am-offcanvas-bar-' + effect);

  scrollPos = {x: window.scrollX, y: window.scrollY};

  $element.addClass('am-active');

  $body.css({
    width: window.innerWidth,
    height: $win.height()
  }).addClass('am-offcanvas-page');

  if (effect !== 'overlay') {
    $body.css({
      'margin-left': $bar.outerWidth() * dir
    }).width(); // force redraw
  }

  $html.css('margin-top', scrollPos.y * -1);

  setTimeout(function() {
    $bar.addClass('am-offcanvas-bar-active').width();
  }, 0);

  $element.trigger('open.offcanvas.amui');

  this.active = 1;

  // Close OffCanvas when none content area clicked
  $element.on('click.offcanvas.amui', function(e) {
    var $target = $(e.target);

    if ($target.hasClass('am-offcanvas-bar')) {
      return;
    }

    if ($target.parents('.am-offcanvas-bar').first().length) {
      return;
    }

    // https://developer.mozilla.org/zh-CN/docs/DOM/event.stopImmediatePropagation
    e.stopImmediatePropagation();

    _this.close();
  });

  $html.on('keydown.offcanvas.amui', function(e) {
    (e.keyCode === 27) && _this.close();
  });
};

OffCanvas.prototype.close = function(relatedElement) {
  var _this = this;
  var $html = $('html');
  var $body = $('body');
  var $element = this.$element;
  var $bar = $element.find('.am-offcanvas-bar').first();

  if (!$element.length || !this.active || !$element.hasClass('am-active')) {
    return;
  }

  $element.trigger('close.offcanvas.amui');

  function complete() {
    $body
      .removeClass('am-offcanvas-page')
      .css({
        width: '',
        height: '',
        'margin-left': '',
        'margin-right': ''
      });
    $element.removeClass('am-active');
    $bar.removeClass('am-offcanvas-bar-active');
    $html.css('margin-top', '');
    window.scrollTo(scrollPos.x, scrollPos.y);
    $element.trigger('closed.offcanvas.amui');
    _this.active = 0;
  }

  if (UI.support.transition) {
    setTimeout(function() {
      $bar.removeClass('am-offcanvas-bar-active');
    }, 0);

    $body.css('margin-left', '').one(UI.support.transition.end, function() {
      complete();
    }).emulateTransitionEnd(this.options.duration);
  } else {
    complete();
  }

  $element.off('click.offcanvas.amui');
  $html.off('.offcanvas.amui');
};

OffCanvas.prototype.bindEvents = function() {
  var _this = this;
  $doc.on('click.offcanvas.amui', '[data-am-dismiss="offcanvas"]', function(e) {
      e.preventDefault();
      _this.close();
    });

  $win.on('resize.offcanvas.amui orientationchange.offcanvas.amui',
    function() {
      _this.active && _this.close();
    });

  this.$element.hammer().on('swipeleft swipeleft', function(e) {
    e.preventDefault();
    _this.close();
  });

  return this;
};

function Plugin(option, relatedElement) {
  var args = Array.prototype.slice.call(arguments, 1);

  return this.each(function() {
    var $this = $(this);
    var data = $this.data('amui.offcanvas');
    var options = $.extend({}, typeof option == 'object' && option);

    if (!data) {
      $this.data('amui.offcanvas', (data = new OffCanvas(this, options)));
      (!option || typeof option == 'object') && data.open(relatedElement);
    }

    if (typeof option == 'string') {
      data[option] && data[option].apply(data, args);
    }
  });
}

$.fn.offCanvas = Plugin;

// Init code
$doc.on('click.offcanvas.amui', '[data-am-offcanvas]', function(e) {
  e.preventDefault();
  var $this = $(this);
  var options = UI.utils.parseOptions($this.data('amOffcanvas'));
  var $target = $(options.target ||
  (this.href && this.href.replace(/.*(?=#[^\s]+$)/, '')));
  var option = $target.data('amui.offcanvas') ? 'open' : options;

  Plugin.call($target, option, this);
});

module.exports = UI.offcanvas = OffCanvas;

// TODO: 优化动画效果
// http://dbushell.github.io/Responsive-Off-Canvas-Menu/step4.html

},{"2":2,"30":30}],14:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);

/**
 * @via https://github.com/manuelstofer/pinchzoom/blob/master/src/pinchzoom.js
 * @license the MIT License.
 */

var definePinchZoom = function($) {
  /**
   * Pinch zoom using jQuery
   * @version 0.0.2
   * @author Manuel Stofer <mst@rtp.ch>
   * @param el
   * @param options
   * @constructor
   */
  var PinchZoom = function(el, options) {
      this.el = $(el);
      this.zoomFactor = 1;
      this.lastScale = 1;
      this.offset = {
        x: 0,
        y: 0
      };
      this.options = $.extend({}, this.defaults, options);
      this.setupMarkup();
      this.bindEvents();
      this.update();
      // default enable.
      this.enable();

    },
    sum = function(a, b) {
      return a + b;
    },
    isCloseTo = function(value, expected) {
      return value > expected - 0.01 && value < expected + 0.01;
    };

  PinchZoom.prototype = {

    defaults: {
      tapZoomFactor: 2,
      zoomOutFactor: 1.3,
      animationDuration: 300,
      animationInterval: 5,
      maxZoom: 5,
      minZoom: 0.5,
      lockDragAxis: false,
      use2d: false,
      zoomStartEventName: 'pz_zoomstart',
      zoomEndEventName: 'pz_zoomend',
      dragStartEventName: 'pz_dragstart',
      dragEndEventName: 'pz_dragend',
      doubleTapEventName: 'pz_doubletap'
    },

    /**
     * Event handler for 'dragstart'
     * @param event
     */
    handleDragStart: function(event) {
      this.el.trigger(this.options.dragStartEventName);
      this.stopAnimation();
      this.lastDragPosition = false;
      this.hasInteraction = true;
      this.handleDrag(event);
    },

    /**
     * Event handler for 'drag'
     * @param event
     */
    handleDrag: function(event) {

      if (this.zoomFactor > 1.0) {
        var touch = this.getTouches(event)[0];
        this.drag(touch, this.lastDragPosition);
        this.offset = this.sanitizeOffset(this.offset);
        this.lastDragPosition = touch;
      }
    },

    handleDragEnd: function() {
      this.el.trigger(this.options.dragEndEventName);
      this.end();
    },

    /**
     * Event handler for 'zoomstart'
     * @param event
     */
    handleZoomStart: function(event) {
      this.el.trigger(this.options.zoomStartEventName);
      this.stopAnimation();
      this.lastScale = 1;
      this.nthZoom = 0;
      this.lastZoomCenter = false;
      this.hasInteraction = true;
    },

    /**
     * Event handler for 'zoom'
     * @param event
     */
    handleZoom: function(event, newScale) {

      // a relative scale factor is used
      var touchCenter = this.getTouchCenter(this.getTouches(event)),
        scale = newScale / this.lastScale;
      this.lastScale = newScale;

      // the first touch events are thrown away since they are not precise
      this.nthZoom += 1;
      if (this.nthZoom > 3) {

        this.scale(scale, touchCenter);
        this.drag(touchCenter, this.lastZoomCenter);
      }
      this.lastZoomCenter = touchCenter;
    },

    handleZoomEnd: function() {
      this.el.trigger(this.options.zoomEndEventName);
      this.end();
    },

    /**
     * Event handler for 'doubletap'
     * @param event
     */
    handleDoubleTap: function(event) {
      var center = this.getTouches(event)[0],
        zoomFactor = this.zoomFactor > 1 ? 1 : this.options.tapZoomFactor,
        startZoomFactor = this.zoomFactor,
        updateProgress = (function(progress) {
          this.scaleTo(startZoomFactor + progress * (zoomFactor - startZoomFactor), center);
        }).bind(this);

      if (this.hasInteraction) {
        return;
      }
      if (startZoomFactor > zoomFactor) {
        center = this.getCurrentZoomCenter();
      }

      this.animate(this.options.animationDuration, this.options.animationInterval, updateProgress, this.swing);
      this.el.trigger(this.options.doubleTapEventName);
    },

    /**
     * Max / min values for the offset
     * @param offset
     * @return {Object} the sanitized offset
     */
    sanitizeOffset: function(offset) {
      var maxX = (this.zoomFactor - 1) * this.getContainerX(),
        maxY = (this.zoomFactor - 1) * this.getContainerY(),
        maxOffsetX = Math.max(maxX, 0),
        maxOffsetY = Math.max(maxY, 0),
        minOffsetX = Math.min(maxX, 0),
        minOffsetY = Math.min(maxY, 0);

      return {
        x: Math.min(Math.max(offset.x, minOffsetX), maxOffsetX),
        y: Math.min(Math.max(offset.y, minOffsetY), maxOffsetY)
      };
    },

    /**
     * Scale to a specific zoom factor (not relative)
     * @param zoomFactor
     * @param center
     */
    scaleTo: function(zoomFactor, center) {
      this.scale(zoomFactor / this.zoomFactor, center);
    },

    /**
     * Scales the element from specified center
     * @param scale
     * @param center
     */
    scale: function(scale, center) {
      scale = this.scaleZoomFactor(scale);
      this.addOffset({
        x: (scale - 1) * (center.x + this.offset.x),
        y: (scale - 1) * (center.y + this.offset.y)
      });
    },

    /**
     * Scales the zoom factor relative to current state
     * @param scale
     * @return the actual scale (can differ because of max min zoom factor)
     */
    scaleZoomFactor: function(scale) {
      var originalZoomFactor = this.zoomFactor;
      this.zoomFactor *= scale;
      this.zoomFactor = Math.min(this.options.maxZoom, Math.max(this.zoomFactor, this.options.minZoom));
      return this.zoomFactor / originalZoomFactor;
    },

    /**
     * Drags the element
     * @param center
     * @param lastCenter
     */
    drag: function(center, lastCenter) {
      if (lastCenter) {
        if (this.options.lockDragAxis) {
          // lock scroll to position that was changed the most
          if (Math.abs(center.x - lastCenter.x) > Math.abs(center.y - lastCenter.y)) {
            this.addOffset({
              x: -(center.x - lastCenter.x),
              y: 0
            });
          }
          else {
            this.addOffset({
              y: -(center.y - lastCenter.y),
              x: 0
            });
          }
        }
        else {
          this.addOffset({
            y: -(center.y - lastCenter.y),
            x: -(center.x - lastCenter.x)
          });
        }
      }
    },

    /**
     * Calculates the touch center of multiple touches
     * @param touches
     * @return {Object}
     */
    getTouchCenter: function(touches) {
      return this.getVectorAvg(touches);
    },

    /**
     * Calculates the average of multiple vectors (x, y values)
     */
    getVectorAvg: function(vectors) {
      return {
        x: vectors.map(function(v) {
          return v.x;
        }).reduce(sum) / vectors.length,
        y: vectors.map(function(v) {
          return v.y;
        }).reduce(sum) / vectors.length
      };
    },

    /**
     * Adds an offset
     * @param offset the offset to add
     * @return return true when the offset change was accepted
     */
    addOffset: function(offset) {
      this.offset = {
        x: this.offset.x + offset.x,
        y: this.offset.y + offset.y
      };
    },

    sanitize: function() {
      if (this.zoomFactor < this.options.zoomOutFactor) {
        this.zoomOutAnimation();
      } else if (this.isInsaneOffset(this.offset)) {
        this.sanitizeOffsetAnimation();
      }
    },

    /**
     * Checks if the offset is ok with the current zoom factor
     * @param offset
     * @return {Boolean}
     */
    isInsaneOffset: function(offset) {
      var sanitizedOffset = this.sanitizeOffset(offset);
      return sanitizedOffset.x !== offset.x ||
        sanitizedOffset.y !== offset.y;
    },

    /**
     * Creates an animation moving to a sane offset
     */
    sanitizeOffsetAnimation: function() {
      var targetOffset = this.sanitizeOffset(this.offset),
        startOffset = {
          x: this.offset.x,
          y: this.offset.y
        },
        updateProgress = (function(progress) {
          this.offset.x = startOffset.x + progress * (targetOffset.x - startOffset.x);
          this.offset.y = startOffset.y + progress * (targetOffset.y - startOffset.y);
          this.update();
        }).bind(this);

      this.animate(
        this.options.animationDuration,
        this.options.animationInterval,
        updateProgress,
        this.swing
      );
    },

    /**
     * Zooms back to the original position,
     * (no offset and zoom factor 1)
     */
    zoomOutAnimation: function() {
      var startZoomFactor = this.zoomFactor,
        zoomFactor = 1,
        center = this.getCurrentZoomCenter(),
        updateProgress = (function(progress) {
          this.scaleTo(startZoomFactor + progress * (zoomFactor - startZoomFactor), center);
        }).bind(this);

      this.animate(
        this.options.animationDuration,
        this.options.animationInterval,
        updateProgress,
        this.swing
      );
    },

    /**
     * Updates the aspect ratio
     */
    updateAspectRatio: function() {
      // this.setContainerY(this.getContainerX() / this.getAspectRatio());
      // @modified
      this.setContainerY()
    },

    /**
     * Calculates the initial zoom factor (for the element to fit into the container)
     * @return the initial zoom factor
     */
    getInitialZoomFactor: function() {
      // use .offsetWidth instead of width()
      // because jQuery-width() return the original width but Zepto-width() will calculate width with transform.
      // the same as .height()
      return this.container[0].offsetWidth / this.el[0].offsetWidth;
    },

    /**
     * Calculates the aspect ratio of the element
     * @return the aspect ratio
     */
    getAspectRatio: function() {
      return this.el[0].offsetWidth / this.el[0].offsetHeight;
    },

    /**
     * Calculates the virtual zoom center for the current offset and zoom factor
     * (used for reverse zoom)
     * @return {Object} the current zoom center
     */
    getCurrentZoomCenter: function() {

      // uses following formula to calculate the zoom center x value
      // offset_left / offset_right = zoomcenter_x / (container_x - zoomcenter_x)
      var length = this.container[0].offsetWidth * this.zoomFactor,
        offsetLeft = this.offset.x,
        offsetRight = length - offsetLeft - this.container[0].offsetWidth,
        widthOffsetRatio = offsetLeft / offsetRight,
        centerX = widthOffsetRatio * this.container[0].offsetWidth / (widthOffsetRatio + 1),

      // the same for the zoomcenter y
        height = this.container[0].offsetHeight * this.zoomFactor,
        offsetTop = this.offset.y,
        offsetBottom = height - offsetTop - this.container[0].offsetHeight,
        heightOffsetRatio = offsetTop / offsetBottom,
        centerY = heightOffsetRatio * this.container[0].offsetHeight / (heightOffsetRatio + 1);

      // prevents division by zero
      if (offsetRight === 0) {
        centerX = this.container[0].offsetWidth;
      }
      if (offsetBottom === 0) {
        centerY = this.container[0].offsetHeight;
      }

      return {
        x: centerX,
        y: centerY
      };
    },

    canDrag: function() {
      return !isCloseTo(this.zoomFactor, 1);
    },

    /**
     * Returns the touches of an event relative to the container offset
     * @param event
     * @return array touches
     */
    getTouches: function(event) {
      var position = this.container.offset();
      return Array.prototype.slice.call(event.touches).map(function(touch) {
        return {
          x: touch.pageX - position.left,
          y: touch.pageY - position.top
        };
      });
    },

    /**
     * Animation loop
     * does not support simultaneous animations
     * @param duration
     * @param interval
     * @param framefn
     * @param timefn
     * @param callback
     */
    animate: function(duration, interval, framefn, timefn, callback) {
      var startTime = new Date().getTime(),
        renderFrame = (function() {
          if (!this.inAnimation) {
            return;
          }
          var frameTime = new Date().getTime() - startTime,
            progress = frameTime / duration;
          if (frameTime >= duration) {
            framefn(1);
            if (callback) {
              callback();
            }
            this.update();
            this.stopAnimation();
            this.update();
          } else {
            if (timefn) {
              progress = timefn(progress);
            }
            framefn(progress);
            this.update();
            setTimeout(renderFrame, interval);
          }
        }).bind(this);
      this.inAnimation = true;
      renderFrame();
    },

    /**
     * Stops the animation
     */
    stopAnimation: function() {
      this.inAnimation = false;
    },

    /**
     * Swing timing function for animations
     * @param p
     * @return {Number}
     */
    swing: function(p) {
      return -Math.cos(p * Math.PI) / 2 + 0.5;
    },

    getContainerX: function() {
      // return this.container[0].offsetWidth;
      // @modified
      return window.innerWidth
    },

    getContainerY: function() {
      // return this.container[0].offsetHeight;
      // @modified
      return window.innerHeight
    },

    setContainerY: function(y) {
      // return this.container.height(y);
      // @modified
      var t = window.innerHeight;
      return this.el.css({height: t}), this.container.height(t);
    },

    /**
     * Creates the expected html structure
     */
    setupMarkup: function() {
      this.container = $('<div class="pinch-zoom-container"></div>');
      this.el.before(this.container);
      this.container.append(this.el);

      this.container.css({
        'overflow': 'hidden',
        'position': 'relative'
      });

      // Zepto doesn't recognize `webkitTransform..` style
      this.el.css({
        '-webkit-transform-origin': '0% 0%',
        '-moz-transform-origin': '0% 0%',
        '-ms-transform-origin': '0% 0%',
        '-o-transform-origin': '0% 0%',
        'transform-origin': '0% 0%',
        'position': 'absolute'
      });
    },

    end: function() {
      this.hasInteraction = false;
      this.sanitize();
      this.update();
    },

    /**
     * Binds all required event listeners
     */
    bindEvents: function() {
      detectGestures(this.container.get(0), this);
      // Zepto and jQuery both know about `on`
      $(window).on('resize', this.update.bind(this));
      $(this.el).find('img').on('load', this.update.bind(this));
    },

    /**
     * Updates the css values according to the current zoom factor and offset
     */
    update: function() {

      if (this.updatePlaned) {
        return;
      }
      this.updatePlaned = true;

      setTimeout((function() {
        this.updatePlaned = false;
        this.updateAspectRatio();

        var zoomFactor = this.getInitialZoomFactor() * this.zoomFactor,
          offsetX = -this.offset.x / zoomFactor,
          offsetY = -this.offset.y / zoomFactor,
          transform3d = 'scale3d(' + zoomFactor + ', ' + zoomFactor + ',1) ' +
            'translate3d(' + offsetX + 'px,' + offsetY + 'px,0px)',
          transform2d = 'scale(' + zoomFactor + ', ' + zoomFactor + ') ' +
            'translate(' + offsetX + 'px,' + offsetY + 'px)',
          removeClone = (function() {
            if (this.clone) {
              this.clone.remove();
              delete this.clone;
            }
          }).bind(this);

        // Scale 3d and translate3d are faster (at least on ios)
        // but they also reduce the quality.
        // PinchZoom uses the 3d transformations during interactions
        // after interactions it falls back to 2d transformations
        if (!this.options.use2d || this.hasInteraction || this.inAnimation) {
          this.is3d = true;
          removeClone();
          this.el.css({
            '-webkit-transform': transform3d,
            '-o-transform': transform2d,
            '-ms-transform': transform2d,
            '-moz-transform': transform2d,
            'transform': transform3d
          });
        } else {

          // When changing from 3d to 2d transform webkit has some glitches.
          // To avoid this, a copy of the 3d transformed element is displayed in the
          // foreground while the element is converted from 3d to 2d transform
          if (this.is3d) {
            this.clone = this.el.clone();
            this.clone.css('pointer-events', 'none');
            this.clone.appendTo(this.container);
            setTimeout(removeClone, 200);
          }
          this.el.css({
            '-webkit-transform': transform2d,
            '-o-transform': transform2d,
            '-ms-transform': transform2d,
            '-moz-transform': transform2d,
            'transform': transform2d
          });
          this.is3d = false;
        }
      }).bind(this), 0);
    },

    /**
     * Enables event handling for gestures
     */
    enable: function() {
      this.enabled = true;
    },

    /**
     * Disables event handling for gestures
     */
    disable: function() {
      this.enabled = false;
    }
  };

  var detectGestures = function(el, target) {
    var interaction = null,
      fingers = 0,
      lastTouchStart = null,
      startTouches = null,

      setInteraction = function(newInteraction, event) {
        if (interaction !== newInteraction) {

          if (interaction && !newInteraction) {
            switch (interaction) {
              case "zoom":
                target.handleZoomEnd(event);
                break;
              case 'drag':
                target.handleDragEnd(event);
                break;
            }
          }

          switch (newInteraction) {
            case 'zoom':
              target.handleZoomStart(event);
              break;
            case 'drag':
              target.handleDragStart(event);
              break;
          }
        }
        interaction = newInteraction;
      },

      updateInteraction = function(event) {
        if (fingers === 2) {
          setInteraction('zoom');
        } else if (fingers === 1 && target.canDrag()) {
          setInteraction('drag', event);
        } else {
          setInteraction(null, event);
        }
      },

      targetTouches = function(touches) {
        return Array.prototype.slice.call(touches).map(function(touch) {
          return {
            x: touch.pageX,
            y: touch.pageY
          };
        });
      },

      getDistance = function(a, b) {
        var x, y;
        x = a.x - b.x;
        y = a.y - b.y;
        return Math.sqrt(x * x + y * y);
      },

      calculateScale = function(startTouches, endTouches) {
        var startDistance = getDistance(startTouches[0], startTouches[1]),
          endDistance = getDistance(endTouches[0], endTouches[1]);
        return endDistance / startDistance;
      },

      cancelEvent = function(event) {
        event.stopPropagation();
        event.preventDefault();
      },

      detectDoubleTap = function(event) {
        var time = (new Date()).getTime();

        if (fingers > 1) {
          lastTouchStart = null;
        }

        if (time - lastTouchStart < 300) {
          cancelEvent(event);

          target.handleDoubleTap(event);
          switch (interaction) {
            case "zoom":
              target.handleZoomEnd(event);
              break;
            case 'drag':
              target.handleDragEnd(event);
              break;
          }
        }

        if (fingers === 1) {
          lastTouchStart = time;
        }
      },
      firstMove = true;

    el.addEventListener('touchstart', function(event) {
      if (target.enabled) {
        firstMove = true;
        fingers = event.touches.length;
        detectDoubleTap(event);
      }
    });

    el.addEventListener('touchmove', function(event) {
      if (target.enabled) {
        if (firstMove) {
          updateInteraction(event);
          if (interaction) {
            cancelEvent(event);
          }
          startTouches = targetTouches(event.touches);
        } else {
          switch (interaction) {
            case 'zoom':
              target.handleZoom(event, calculateScale(startTouches, targetTouches(event.touches)));
              break;
            case 'drag':
              target.handleDrag(event);
              break;
          }
          if (interaction) {
            cancelEvent(event);
            target.update();
          }
        }

        firstMove = false;
      }
    });

    el.addEventListener('touchend', function(event) {
      if (target.enabled) {
        fingers = event.touches.length;
        updateInteraction(event);
      }
    });
  };

  return PinchZoom;
};

module.exports = UI.pichzoom = definePinchZoom($);

},{"2":2}],15:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);
var $w = $(window);

/**
 * @reference https://github.com/nolimits4web/Framework7/blob/master/src/js/modals.js
 * @license https://github.com/nolimits4web/Framework7/blob/master/LICENSE
 */

var Popover = function(element, options) {
  this.options = $.extend({}, Popover.DEFAULTS, options);
  this.$element = $(element);
  this.active = null;
  this.$popover = (this.options.target && $(this.options.target)) || null;

  this.init();
  this._bindEvents();
};

Popover.DEFAULTS = {
  theme: undefined,
  trigger: 'click',
  content: '',
  open: false,
  target: undefined,
  tpl: '<div class="am-popover">' +
    '<div class="am-popover-inner"></div>' +
    '<div class="am-popover-caret"></div></div>'
};

Popover.prototype.init = function() {
  var _this = this;
  var $element = this.$element;
  var $popover;

  if (!this.options.target) {
    this.$popover = this.getPopover();
    this.setContent();
  }

  $popover = this.$popover;

  $popover.appendTo($('body'));

  this.sizePopover();

  function sizePopover() {
    _this.sizePopover();
  }

  // TODO: 监听页面内容变化，重新调整位置

  $element.on('open.popover.amui', function() {
    $(window).on('resize.popover.amui', UI.utils.debounce(sizePopover, 50));
  });

  $element.on('close.popover.amui', function() {
    $(window).off('resize.popover.amui', sizePopover);
  });

  this.options.open && this.open();
};

Popover.prototype.sizePopover = function sizePopover() {
  var $element = this.$element;
  var $popover = this.$popover;

  if (!$popover || !$popover.length) {
    return;
  }

  var popWidth = $popover.outerWidth();
  var popHeight = $popover.outerHeight();
  var $popCaret = $popover.find('.am-popover-caret');
  var popCaretSize = ($popCaret.outerWidth() / 2) || 8;
  // 取不到 $popCaret.outerHeight() 的值，所以直接加 8
  var popTotalHeight = popHeight + 8; // $popCaret.outerHeight();

  var triggerWidth = $element.outerWidth();
  var triggerHeight = $element.outerHeight();
  var triggerOffset = $element.offset();
  var triggerRect = $element[0].getBoundingClientRect();

  var winHeight = $w.height();
  var winWidth = $w.width();
  var popTop = 0;
  var popLeft = 0;
  var diff = 0;
  var spacing = 2;
  var popPosition = 'top';

  $popover.css({left: '', top: ''}).removeClass('am-popover-left ' +
  'am-popover-right am-popover-top am-popover-bottom');

  // $popCaret.css({left: '', top: ''});

  if (popTotalHeight - spacing < triggerRect.top + spacing) {
    // Popover on the top of trigger
    popTop = triggerOffset.top - popTotalHeight - spacing;
  } else if (popTotalHeight <
    winHeight - triggerRect.top - triggerRect.height) {
    // On bottom
    popPosition = 'bottom';
    popTop = triggerOffset.top + triggerHeight + popCaretSize + spacing;
  } else { // On middle
    popPosition = 'middle';
    popTop = triggerHeight / 2 + triggerOffset.top - popHeight / 2;
  }

  // Horizontal Position
  if (popPosition === 'top' || popPosition === 'bottom') {
    popLeft = triggerWidth / 2 + triggerOffset.left - popWidth / 2;

    diff = popLeft;

    if (popLeft < 5) {
      popLeft = 5;
    }

    if (popLeft + popWidth > winWidth) {
      popLeft = (winWidth - popWidth - 20);
      // console.log('left %d, win %d, popw %d', popLeft, winWidth, popWidth);
    }

    if (popPosition === 'top') {
      // This is the Popover position, NOT caret position
      // Popover on the Top of trigger, caret on the bottom of Popover
      $popover.addClass('am-popover-top');
    }

    if (popPosition === 'bottom') {
      $popover.addClass('am-popover-bottom');
    }

    diff = diff - popLeft;
    // $popCaret.css({left: (popWidth / 2 - popCaretSize + diff) + 'px'});

  } else if (popPosition === 'middle') {
    popLeft = triggerOffset.left - popWidth - popCaretSize;
    $popover.addClass('am-popover-left');
    if (popLeft < 5) {
      popLeft = triggerOffset.left + triggerWidth + popCaretSize;
      $popover.removeClass('am-popover-left').addClass('am-popover-right');
    }

    if (popLeft + popWidth > winWidth) {
      popLeft = winWidth - popWidth - 5;
      $popover.removeClass('am-popover-left').addClass('am-popover-right');
    }
    // $popCaret.css({top: (popHeight / 2 - popCaretSize / 2) + 'px'});
  }

  // Apply position style
  $popover.css({top: popTop + 'px', left: popLeft + 'px'});
};

Popover.prototype.toggle = function() {
  return this[this.active ? 'close' : 'open']();
};

Popover.prototype.open = function() {
  var $popover = this.$popover;

  this.$element.trigger('open.popover.amui');
  this.sizePopover();
  $popover.show().addClass('am-active');
  this.active = true;
};

Popover.prototype.close = function() {
  var $popover = this.$popover;

  this.$element.trigger('close.popover.amui');

  $popover
    .removeClass('am-active')
    .trigger('closed.popover.amui')
    .hide();

  this.active = false;
};

Popover.prototype.getPopover = function() {
  var uid = UI.utils.generateGUID('am-popover');
  var theme = [];

  if (this.options.theme) {
    $.each(this.options.theme.split(','), function(i, item) {
      theme.push('am-popover-' + $.trim(item));
    });
  }

  return $(this.options.tpl).attr('id', uid).addClass(theme.join(' '));
};

Popover.prototype.setContent = function(content) {
  content = content || this.options.content;
  this.$popover && this.$popover.find('.am-popover-inner')
    .empty().html(content);
};

Popover.prototype._bindEvents = function() {
  var eventNS = 'popover.amui';
  var triggers = this.options.trigger.split(' ');

  for (var i = triggers.length; i--;) {
    var trigger = triggers[i];

    if (trigger === 'click') {
      this.$element.on('click.' + eventNS, $.proxy(this.toggle, this));
    } else { // hover or focus
      var eventIn = trigger == 'hover' ? 'mouseenter' : 'focusin';
      var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout';

      this.$element.on(eventIn + '.' + eventNS, $.proxy(this.open, this));
      this.$element.on(eventOut + '.' + eventNS, $.proxy(this.close, this));
    }
  }
};

UI.plugin('popover', Popover);

// Init code
UI.ready(function(context) {
  $('[data-am-popover]', context).popover();
});

module.exports = Popover;

},{"2":2}],16:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);

var Progress = (function() {
  /**
   * NProgress (c) 2013, Rico Sta. Cruz
   * @via http://ricostacruz.com/nprogress
   */

  var NProgress = {};

  NProgress.version = '0.2.0';

  var Settings = NProgress.settings = {
    minimum: 0.08,
    easing: 'ease',
    positionUsing: '',
    speed: 200,
    trickle: true,
    trickleRate: 0.02,
    trickleSpeed: 800,
    showSpinner: true,
    parent: 'body',
    barSelector: '[role="nprogress-bar"]',
    spinnerSelector: '[role="nprogress-spinner"]',
    template: '<div class="nprogress-bar" role="nprogress-bar">' +
    '<div class="nprogress-peg"></div></div>' +
    '<div class="nprogress-spinner" role="nprogress-spinner">' +
    '<div class="nprogress-spinner-icon"></div></div>'
  };

  /**
   * Updates configuration.
   *
   *     NProgress.configure({
   *       minimum: 0.1
   *     });
   */
  NProgress.configure = function(options) {
    var key, value;
    for (key in options) {
      value = options[key];
      if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
    }

    return this;
  };

  /**
   * Last number.
   */

  NProgress.status = null;

  /**
   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
   *
   *     NProgress.set(0.4);
   *     NProgress.set(1.0);
   */

  NProgress.set = function(n) {
    var started = NProgress.isStarted();

    n = clamp(n, Settings.minimum, 1);
    NProgress.status = (n === 1 ? null : n);

    var progress = NProgress.render(!started),
      bar      = progress.querySelector(Settings.barSelector),
      speed    = Settings.speed,
      ease     = Settings.easing;

    progress.offsetWidth; /* Repaint */

    queue(function(next) {
      // Set positionUsing if it hasn't already been set
      if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();

      // Add transition
      css(bar, barPositionCSS(n, speed, ease));

      if (n === 1) {
        // Fade out
        css(progress, {
          transition: 'none',
          opacity: 1
        });
        progress.offsetWidth; /* Repaint */

        setTimeout(function() {
          css(progress, {
            transition: 'all ' + speed + 'ms linear',
            opacity: 0
          });
          setTimeout(function() {
            NProgress.remove();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(next, speed);
      }
    });

    return this;
  };

  NProgress.isStarted = function() {
    return typeof NProgress.status === 'number';
  };

  /**
   * Shows the progress bar.
   * This is the same as setting the status to 0%, except that it doesn't go backwards.
   *
   *     NProgress.start();
   *
   */
  NProgress.start = function() {
    if (!NProgress.status) NProgress.set(0);

    var work = function() {
      setTimeout(function() {
        if (!NProgress.status) return;
        NProgress.trickle();
        work();
      }, Settings.trickleSpeed);
    };

    if (Settings.trickle) work();

    return this;
  };

  /**
   * Hides the progress bar.
   * This is the *sort of* the same as setting the status to 100%, with the
   * difference being `done()` makes some placebo effect of some realistic motion.
   *
   *     NProgress.done();
   *
   * If `true` is passed, it will show the progress bar even if its hidden.
   *
   *     NProgress.done(true);
   */

  NProgress.done = function(force) {
    if (!force && !NProgress.status) return this;

    return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
  };

  /**
   * Increments by a random amount.
   */

  NProgress.inc = function(amount) {
    var n = NProgress.status;

    if (!n) {
      return NProgress.start();
    } else {
      if (typeof amount !== 'number') {
        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
      }

      n = clamp(n + amount, 0, 0.994);
      return NProgress.set(n);
    }
  };

  NProgress.trickle = function() {
    return NProgress.inc(Math.random() * Settings.trickleRate);
  };

  /**
   * Waits for all supplied jQuery promises and
   * increases the progress as the promises resolve.
   *
   * @param $promise jQUery Promise
   */
  (function() {
    var initial = 0, current = 0;

    NProgress.promise = function($promise) {
      if (!$promise || $promise.state() === "resolved") {
        return this;
      }

      if (current === 0) {
        NProgress.start();
      }

      initial++;
      current++;

      $promise.always(function() {
        current--;
        if (current === 0) {
          initial = 0;
          NProgress.done();
        } else {
          NProgress.set((initial - current) / initial);
        }
      });

      return this;
    };

  })();

  /**
   * (Internal) renders the progress bar markup based on the `template`
   * setting.
   */

  NProgress.render = function(fromStart) {
    if (NProgress.isRendered()) return document.getElementById('nprogress');

    addClass(document.documentElement, 'nprogress-busy');

    var progress = document.createElement('div');
    progress.id = 'nprogress';
    progress.innerHTML = Settings.template;

    var bar      = progress.querySelector(Settings.barSelector),
      perc     = fromStart ? '-100' : toBarPerc(NProgress.status || 0),
      parent   = document.querySelector(Settings.parent),
      spinner;

    css(bar, {
      transition: 'all 0 linear',
      transform: 'translate3d(' + perc + '%,0,0)'
    });

    if (!Settings.showSpinner) {
      spinner = progress.querySelector(Settings.spinnerSelector);
      spinner && removeElement(spinner);
    }

    if (parent != document.body) {
      addClass(parent, 'nprogress-custom-parent');
    }

    parent.appendChild(progress);
    return progress;
  };

  /**
   * Removes the element. Opposite of render().
   */

  NProgress.remove = function() {
    removeClass(document.documentElement, 'nprogress-busy');
    removeClass(document.querySelector(Settings.parent), 'nprogress-custom-parent');
    var progress = document.getElementById('nprogress');
    progress && removeElement(progress);
  };

  /**
   * Checks if the progress bar is rendered.
   */

  NProgress.isRendered = function() {
    return !!document.getElementById('nprogress');
  };

  /**
   * Determine which positioning CSS rule to use.
   */

  NProgress.getPositioningCSS = function() {
    // Sniff on document.body.style
    var bodyStyle = document.body.style;

    // Sniff prefixes
    var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
      ('MozTransform' in bodyStyle) ? 'Moz' :
        ('msTransform' in bodyStyle) ? 'ms' :
          ('OTransform' in bodyStyle) ? 'O' : '';

    if (vendorPrefix + 'Perspective' in bodyStyle) {
      // Modern browsers with 3D support, e.g. Webkit, IE10
      return 'translate3d';
    } else if (vendorPrefix + 'Transform' in bodyStyle) {
      // Browsers without 3D support, e.g. IE9
      return 'translate';
    } else {
      // Browsers without translate() support, e.g. IE7-8
      return 'margin';
    }
  };

  /**
   * Helpers
   */

  function clamp(n, min, max) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
  }

  /**
   * (Internal) converts a percentage (`0..1`) to a bar translateX
   * percentage (`-100%..0%`).
   */

  function toBarPerc(n) {
    return (-1 + n) * 100;
  }


  /**
   * (Internal) returns the correct CSS for changing the bar's
   * position given an n percentage, and speed and ease from Settings
   */

  function barPositionCSS(n, speed, ease) {
    var barCSS;

    if (Settings.positionUsing === 'translate3d') {
      barCSS = { transform: 'translate3d('+toBarPerc(n)+'%,0,0)' };
    } else if (Settings.positionUsing === 'translate') {
      barCSS = { transform: 'translate('+toBarPerc(n)+'%,0)' };
    } else {
      barCSS = { 'margin-left': toBarPerc(n)+'%' };
    }

    barCSS.transition = 'all '+speed+'ms '+ease;

    return barCSS;
  }

  /**
   * (Internal) Queues a function to be executed.
   */

  var queue = (function() {
    var pending = [];

    function next() {
      var fn = pending.shift();
      if (fn) {
        fn(next);
      }
    }

    return function(fn) {
      pending.push(fn);
      if (pending.length == 1) next();
    };
  })();

  /**
   * (Internal) Applies css properties to an element, similar to the jQuery
   * css method.
   *
   * While this helper does assist with vendor prefixed property names, it
   * does not perform any manipulation of values prior to setting styles.
   */

  var css = (function() {
    var cssPrefixes = [ 'Webkit', 'O', 'Moz', 'ms' ],
      cssProps    = {};

    function camelCase(string) {
      return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function(match, letter) {
        return letter.toUpperCase();
      });
    }

    function getVendorProp(name) {
      var style = document.body.style;
      if (name in style) return name;

      var i = cssPrefixes.length,
        capName = name.charAt(0).toUpperCase() + name.slice(1),
        vendorName;
      while (i--) {
        vendorName = cssPrefixes[i] + capName;
        if (vendorName in style) return vendorName;
      }

      return name;
    }

    function getStyleProp(name) {
      name = camelCase(name);
      return cssProps[name] || (cssProps[name] = getVendorProp(name));
    }

    function applyCss(element, prop, value) {
      prop = getStyleProp(prop);
      element.style[prop] = value;
    }

    return function(element, properties) {
      var args = arguments,
        prop,
        value;

      if (args.length == 2) {
        for (prop in properties) {
          value = properties[prop];
          if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
        }
      } else {
        applyCss(element, args[1], args[2]);
      }
    }
  })();

  /**
   * (Internal) Determines if an element or space separated list of class names contains a class name.
   */

  function hasClass(element, name) {
    var list = typeof element == 'string' ? element : classList(element);
    return list.indexOf(' ' + name + ' ') >= 0;
  }

  /**
   * (Internal) Adds a class to an element.
   */

  function addClass(element, name) {
    var oldList = classList(element),
      newList = oldList + name;

    if (hasClass(oldList, name)) return;

    // Trim the opening space.
    element.className = newList.substring(1);
  }

  /**
   * (Internal) Removes a class from an element.
   */

  function removeClass(element, name) {
    var oldList = classList(element),
      newList;

    if (!hasClass(element, name)) return;

    // Replace the class name.
    newList = oldList.replace(' ' + name + ' ', ' ');

    // Trim the opening and closing spaces.
    element.className = newList.substring(1, newList.length - 1);
  }

  /**
   * (Internal) Gets a space separated list of the class names on the element.
   * The list is wrapped with a single space on each end to facilitate finding
   * matches within the list.
   */

  function classList(element) {
    return (' ' + (element.className || '') + ' ').replace(/\s+/gi, ' ');
  }

  /**
   * (Internal) Removes an element from the DOM.
   */

  function removeElement(element) {
    element && element.parentNode && element.parentNode.removeChild(element);
  }

  return NProgress;
})();

module.exports = UI.progress = Progress;

},{"2":2}],17:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);
var PinchZoom = _dereq_(14);
var Hammer = _dereq_(30);
var animation = UI.support.animation;
var transition = UI.support.transition;

/**
 * PureView
 * @desc Image browser for Mobile
 * @param element
 * @param options
 * @constructor
 */

var PureView = function(element, options) {
  this.$element = $(element);
  this.$body = $(document.body);
  this.options = $.extend({}, PureView.DEFAULTS, options);
  this.$pureview = $(this.options.tpl).attr('id',
    UI.utils.generateGUID('am-pureview'));

  this.$slides = null;
  this.transitioning = null;
  this.scrollbarWidth = 0;

  this.init();
};

PureView.DEFAULTS = {
  tpl: '<div class="am-pureview am-pureview-bar-active">' +
  '<ul class="am-pureview-slider"></ul>' +
  '<ul class="am-pureview-direction">' +
  '<li class="am-pureview-prev"><a href=""></a></li>' +
  '<li class="am-pureview-next"><a href=""></a></li></ul>' +
  '<ol class="am-pureview-nav"></ol>' +
  '<div class="am-pureview-bar am-active">' +
  '<span class="am-pureview-title"></span>' +
  '<div class="am-pureview-counter"><span class="am-pureview-current"></span> / ' +
  '<span class="am-pureview-total"></span></div></div>' +
  '<div class="am-pureview-actions am-active">' +
  '<a href="javascript: void(0)" class="am-icon-chevron-left" ' +
  'data-am-close="pureview"></a></div>' +
  '</div>',

  className: {
    prevSlide: 'am-pureview-slide-prev',
    nextSlide: 'am-pureview-slide-next',
    onlyOne: 'am-pureview-only',
    active: 'am-active',
    barActive: 'am-pureview-bar-active',
    activeBody: 'am-pureview-active'
  },

  selector: {
    slider: '.am-pureview-slider',
    close: '[data-am-close="pureview"]',
    total: '.am-pureview-total',
    current: '.am-pureview-current',
    title: '.am-pureview-title',
    actions: '.am-pureview-actions',
    bar: '.am-pureview-bar',
    pinchZoom: '.am-pinch-zoom',
    nav: '.am-pureview-nav'
  },

  shareBtn: false,

  // press to toggle Toolbar
  toggleToolbar: true,

  // 从何处获取图片，img 可以使用 data-rel 指定大图
  target: 'img',

  // 微信 Webview 中调用微信的图片浏览器
  // 实现图片保存、分享好友、收藏图片等功能
  weChatImagePreview: true
};

PureView.prototype.init = function() {
  var _this = this;
  var options = this.options;
  var $element = this.$element;
  var $pureview = this.$pureview;

  this.refreshSlides();

  $('body').append($pureview);

  this.$title = $pureview.find(options.selector.title);
  this.$current = $pureview.find(options.selector.current);
  this.$bar = $pureview.find(options.selector.bar);
  this.$actions = $pureview.find(options.selector.actions);

  if (options.shareBtn) {
    this.$actions.append('<a href="javascript: void(0)" ' +
    'class="am-icon-share-square-o" data-am-toggle="share"></a>');
  }

  this.$element.on('click.pureview.amui', options.target, function(e) {
    e.preventDefault();
    var clicked = _this.$images.index(this);

    // Invoke WeChat ImagePreview in WeChat
    // TODO: detect WeChat before init
    if (options.weChatImagePreview && window.WeixinJSBridge) {
      window.WeixinJSBridge.invoke('imagePreview', {
        current: _this.imgUrls[clicked],
        urls: _this.imgUrls
      });
    } else {
      _this.open(clicked);
    }
  });

  $pureview.find('.am-pureview-direction').
    on('click.direction.pureview.amui', 'li', function(e) {
      e.preventDefault();

      if ($(this).is('.am-pureview-prev')) {
        _this.prevSlide();
      } else {
        _this.nextSlide();
      }
    });

  // Nav Contorl
  $pureview.find(options.selector.nav).on('click.nav.pureview.amui', 'li',
    function() {
      var index = _this.$navItems.index($(this));
      _this.activate(_this.$slides.eq(index));
    });

  // Close Icon
  $pureview.find(options.selector.close).
    on('click.close.pureview.amui', function(e) {
      e.preventDefault();
      _this.close();
    });

  this.$slider.hammer().on('swipeleft.pureview.amui', function(e) {
    e.preventDefault();
    _this.nextSlide();
  }).on('swiperight.pureview.amui', function(e) {
    e.preventDefault();
    _this.prevSlide();
  }).on('press.pureview.amui', function(e) {
    e.preventDefault();
    options.toggleToolbar && _this.toggleToolBar();
  });

  this.$slider.data('hammer').get('swipe').set({
    direction: Hammer.DIRECTION_HORIZONTAL,
    velocity: 0.35
  });

  // Observe DOM
  $element.DOMObserve({
    childList: true,
    subtree: true
  }, function(mutations, observer) {
    // _this.refreshSlides();
    // console.log('mutations[0].type);
  });

  // NOTE:
  // trigger this event manually if MutationObserver not supported
  //   when new images appended, or call refreshSlides()
  // if (!UI.support.mutationobserver) $element.trigger('changed.dom.amui')
  $element.on('changed.dom.amui', function(e) {
    e.stopPropagation();
    _this.refreshSlides();
  });

  $(document).on('keydown.pureview.amui', $.proxy(function(e) {
    var keyCode = e.keyCode;
    if (keyCode == 37) {
      this.prevSlide();
    } else if (keyCode == 39) {
      this.nextSlide();
    } else if (keyCode == 27) {
      this.close();
    }
  }, this));
};

PureView.prototype.refreshSlides = function() {
  // update images collections
  this.$images = this.$element.find(this.options.target);
  var _this = this;
  var options = this.options;
  var $pureview = this.$pureview;
  var $slides = $([]);
  var $navItems = $([]);
  var $images = this.$images;
  var total = $images.length;
  this.$slider = $pureview.find(options.selector.slider);
  this.$nav = $pureview.find(options.selector.nav);
  var viewedFlag = 'data-am-pureviewed';
  // for WeChat Image Preview
  this.imgUrls = this.imgUrls || [];

  if (!total) {
    return;
  }

  if (total === 1) {
    $pureview.addClass(options.className.onlyOne);
  }

  $images.not('[' + viewedFlag + ']').each(function(i, item) {
    var src;
    var title;

    // get image URI from link's href attribute
    if (item.nodeName === 'A') {
      src = item.href; // to absolute path
      title = item.title || '';
    } else {
      // NOTE: `data-rel` should be a full URL, otherwise,
      //        WeChat images preview will not work
      src = $(item).data('rel') || item.src; // <img src='' data-rel='' />
      title = $(item).attr('alt') || '';
    }

    // add pureviewed flag
    item.setAttribute(viewedFlag, '1');

    // hide bar: wechat_webview_type=1
    // http://tmt.io/wechat/  not working?
    _this.imgUrls.push(src);

    $slides = $slides.add($('<li data-src="' + src + '" data-title="' + title +
    '"></li>'));
    $navItems = $navItems.add($('<li>' + (i + 1) + '</li>'));
  });

  $pureview.find(options.selector.total).text(total);

  this.$slider.append($slides);
  this.$nav.append($navItems);
  this.$navItems = this.$nav.find('li');
  this.$slides = this.$slider.find('li');
};

PureView.prototype.loadImage = function($slide, callback) {
  var appendedFlag = 'image-appended';

  if (!$slide.data(appendedFlag)) {
    var $img = $('<img>', {
      src: $slide.data('src'),
      alt: $slide.data('title')
    });

    $slide.html($img).wrapInner('<div class="am-pinch-zoom"></div>').redraw();

    var $pinchWrapper = $slide.find(this.options.selector.pinchZoom);
    $pinchWrapper.data('amui.pinchzoom', new PinchZoom($pinchWrapper[0], {}));
    $slide.data('image-appended', true);
  }

  callback && callback.call(this);
};

PureView.prototype.activate = function($slide) {
  var options = this.options;
  var $slides = this.$slides;
  var activeIndex = $slides.index($slide);
  var title = $slide.data('title') || '';
  var active = options.className.active;

  if ($slides.find('.' + active).is($slide)) {
    return;
  }

  if (this.transitioning) {
    return;
  }

  this.loadImage($slide, function() {
    UI.utils.imageLoader($slide.find('img'), function(image) {
      $slide.find('.am-pinch-zoom').addClass('am-pureview-loaded');
      $(image).addClass('am-img-loaded');
    });
  });

  this.transitioning = 1;

  this.$title.text(title);
  this.$current.text(activeIndex + 1);
  $slides.removeClass();
  $slide.addClass(active);
  $slides.eq(activeIndex - 1).addClass(options.className.prevSlide);
  $slides.eq(activeIndex + 1).addClass(options.className.nextSlide);

  this.$navItems.removeClass().
    eq(activeIndex).addClass(options.className.active);

  if (transition) {
    $slide.one(transition.end, $.proxy(function() {
      this.transitioning = 0;
    }, this)).emulateTransitionEnd(300);
  } else {
    this.transitioning = 0;
  }

  // TODO: pre-load next image
};

PureView.prototype.nextSlide = function() {
  if (this.$slides.length === 1) {
    return;
  }

  var $slides = this.$slides;
  var $active = $slides.filter('.am-active');
  var activeIndex = $slides.index($active);
  var rightSpring = 'am-animation-right-spring';

  if (activeIndex + 1 >= $slides.length) { // last one
    animation && $active.addClass(rightSpring).on(animation.end, function() {
      $active.removeClass(rightSpring);
    });
  } else {
    this.activate($slides.eq(activeIndex + 1));
  }
};

PureView.prototype.prevSlide = function() {
  if (this.$slides.length === 1) {
    return;
  }

  var $slides = this.$slides;
  var $active = $slides.filter('.am-active');
  var activeIndex = this.$slides.index(($active));
  var leftSpring = 'am-animation-left-spring';

  if (activeIndex === 0) { // first one
    animation && $active.addClass(leftSpring).on(animation.end, function() {
      $active.removeClass(leftSpring);
    });
  } else {
    this.activate($slides.eq(activeIndex - 1));
  }
};

PureView.prototype.toggleToolBar = function() {
  this.$pureview.toggleClass(this.options.className.barActive);
};

PureView.prototype.open = function(index) {
  var active = index || 0;
  this.checkScrollbar();
  this.setScrollbar();
  this.activate(this.$slides.eq(active));
  this.$pureview.show().redraw().addClass(this.options.className.active);
  this.$body.addClass(this.options.className.activeBody);
};

PureView.prototype.close = function() {
  var options = this.options;

  this.$pureview.removeClass(options.className.active);
  this.$slides.removeClass();

  function resetBody() {
    this.$pureview.hide();
    this.$body.removeClass(options.className.activeBody);
    this.resetScrollbar();
  }

  if (transition) {
    this.$pureview.one(transition.end, $.proxy(resetBody, this)).
      emulateTransitionEnd(300);
  } else {
    resetBody.call(this);
  }
};

PureView.prototype.checkScrollbar = function() {
  this.scrollbarWidth = UI.utils.measureScrollbar();
};

PureView.prototype.setScrollbar = function() {
  var bodyPaddingRight = parseInt((this.$body.css('padding-right') || 0), 10);
  if (this.scrollbarWidth) {
    this.$body.css('padding-right', bodyPaddingRight + this.scrollbarWidth);
  }
};

PureView.prototype.resetScrollbar = function() {
  this.$body.css('padding-right', '');
};

UI.plugin('pureview', PureView);

// Init code
UI.ready(function(context) {
  $('[data-am-pureview]', context).pureview();
});

module.exports = PureView;

// TODO: 1. 动画改进
//       2. 改变图片的时候恢复 Zoom
//       3. 选项
//       4. 图片高度问题：由于 PinchZoom 的原因，过高的图片如果设置看了滚动，则放大以后显示不全

},{"14":14,"2":2,"30":30}],18:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);

/**
 * @via https://github.com/uikit/uikit/blob/master/src/js/scrollspy.js
 * @license https://github.com/uikit/uikit/blob/master/LICENSE.md
 */

var ScrollSpy = function(element, options) {
  if (!UI.support.animation) {
    return;
  }

  this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
  this.$element = $(element);

  var checkViewRAF = function() {
    UI.utils.rAF.call(window, $.proxy(this.checkView, this));
  }.bind(this);

  this.$window = $(window).on('scroll.scrollspy.amui', checkViewRAF)
    .on('resize.scrollspy.amui orientationchange.scrollspy.amui',
    UI.utils.debounce(checkViewRAF, 50));

  this.timer = this.inViewState = this.initInView = null;

  checkViewRAF();
};

ScrollSpy.DEFAULTS = {
  animation: 'fade',
  className: {
    inView: 'am-scrollspy-inview',
    init: 'am-scrollspy-init'
  },
  repeat: true,
  delay: 0,
  topOffset: 0,
  leftOffset: 0
};

ScrollSpy.prototype.checkView = function() {
  var $element = this.$element;
  var options = this.options;
  var inView = UI.utils.isInView($element, options);
  var animation = options.animation ?
  ' am-animation-' + options.animation : '';

  if (inView && !this.inViewState) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    if (!this.initInView) {
      $element.addClass(options.className.init);
      this.offset = $element.offset();
      this.initInView = true;

      $element.trigger('init.scrollspy.amui');
    }

    this.timer = setTimeout(function() {
      if (inView) {
        $element.addClass(options.className.inView + animation).width();
      }
    }, options.delay);

    this.inViewState = true;
    $element.trigger('inview.scrollspy.amui');
  }

  if (!inView && this.inViewState && options.repeat) {
    $element.removeClass(options.className.inView + animation);

    this.inViewState = false;

    $element.trigger('outview.scrollspy.amui');
  }
};

ScrollSpy.prototype.check = function() {
  UI.utils.rAF.call(window, $.proxy(this.checkView, this));
};

// Sticky Plugin
UI.plugin('scrollspy', ScrollSpy);

// Init code
UI.ready(function(context) {
  $('[data-am-scrollspy]', context).scrollspy();
});

module.exports = ScrollSpy;

},{"2":2}],19:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);
_dereq_(22);

/**
 * @via https://github.com/uikit/uikit/
 * @license https://github.com/uikit/uikit/blob/master/LICENSE.md
 */

// ScrollSpyNav Class
var ScrollSpyNav = function(element, options) {
  this.options = $.extend({}, ScrollSpyNav.DEFAULTS, options);
  this.$element = $(element);
  this.anchors = [];

  this.$links = this.$element.find('a[href^="#"]').each(function(i, link) {
    this.anchors.push($(link).attr('href'));
  }.bind(this));

  this.$targets = $(this.anchors.join(', '));

  var processRAF = function() {
    UI.utils.rAF.call(window, $.proxy(this.process, this));
  }.bind(this);

  this.$window = $(window).on('scroll.scrollspynav.amui', processRAF)
    .on('resize.scrollspynav.amui orientationchange.scrollspynav.amui',
    UI.utils.debounce(processRAF, 50));

  processRAF();
  this.scrollProcess();
};

ScrollSpyNav.DEFAULTS = {
  className: {
    active: 'am-active'
  },
  closest: false,
  smooth: true,
  offsetTop: 0
};

ScrollSpyNav.prototype.process = function() {
  var scrollTop = this.$window.scrollTop();
  var options = this.options;
  var inViews = [];
  var $links = this.$links;

  var $targets = this.$targets;

  $targets.each(function(i, target) {
    if (UI.utils.isInView(target, options)) {
      inViews.push(target);
    }
  });

  // console.log(inViews.length);

  if (inViews.length) {
    var $target;

    $.each(inViews, function(i, item) {
      if ($(item).offset().top >= scrollTop) {
        $target = $(item);
        return false; // break
      }
    });

    if (!$target) {
      return;
    }

    if (options.closest) {
      $links.closest(options.closest).removeClass(options.className.active);
      $links.filter('a[href="#' + $target.attr('id') + '"]').
        closest(options.closest).addClass(options.className.active);
    } else {
      $links.removeClass(options.className.active).
        filter('a[href="#' + $target.attr('id') + '"]').
        addClass(options.className.active);
    }
  }
};

ScrollSpyNav.prototype.scrollProcess = function() {
  var $links = this.$links;
  var options = this.options;

  // smoothScroll
  if (options.smooth && $.fn.smoothScroll) {
    $links.on('click', function(e) {
      e.preventDefault();

      var $this = $(this);
      var $target = $($this.attr('href'));

      if (!$target) {
        return;
      }

      var offsetTop = options.offsetTop &&
        !isNaN(parseInt(options.offsetTop)) && parseInt(options.offsetTop) || 0;

      $(window).smoothScroll({position: $target.offset().top - offsetTop});
    });
  }
};

// ScrollSpyNav Plugin
UI.plugin('scrollspynav', ScrollSpyNav);

// Init code
UI.ready(function(context) {
  $('[data-am-scrollspy-nav]', context).scrollspynav();
});

module.exports = ScrollSpyNav;

// TODO: 1. 算法改进
//       2. 多级菜单支持
//       3. smooth scroll pushState

},{"2":2,"22":22}],20:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);

// Make jQuery :contains Case-Insensitive
$.expr[':'].containsNC = function(elem, i, match, array) {
  return (elem.textContent || elem.innerText || '').toLowerCase().
      indexOf((match[3] || '').toLowerCase()) >= 0;
};

/**
 * Selected
 * @desc HTML select replacer
 * @via https://github.com/silviomoreto/bootstrap-select
 * @license https://github.com/silviomoreto/bootstrap-select/blob/master/LICENSE
 * @param element
 * @param options
 * @constructor
 */

var Selected = function(element, options) {
  this.$element = $(element);
  this.options = $.extend({}, Selected.DEFAULTS, options);
  this.$originalOptions = this.$element.find('option');
  this.multiple = element.multiple;
  this.$selector = null;
  this.initialized = false;
  this.init();
};

Selected.DEFAULTS = {
  btnWidth: null,
  btnSize: null,
  btnStyle: 'default',
  dropUp: 0,
  maxHeight: null,
  placeholder: '点击选择...',
  selectedClass: 'am-checked',
  disabledClass: 'am-disabled',
  searchBox: false,
  tpl: '<div class="am-selected am-dropdown ' +
  '<%= dropUp ? \'am-dropdown-up\': \'\' %>" id="<%= id %>" data-am-dropdown>' +
  '  <button type="button" class="am-selected-btn am-btn am-dropdown-toggle">' +
  '    <span class="am-selected-status am-fl"></span>' +
  '    <i class="am-selected-icon am-icon-caret-' +
  '<%= dropUp ? \'up\' : \'down\' %>"></i>' +
  '  </button>' +
  '  <div class="am-selected-content am-dropdown-content">' +
  '    <h2 class="am-selected-header">' +
  '<span class="am-icon-chevron-left">返回</span></h2>' +
  '   <% if (searchBox) { %>' +
  '   <div class="am-selected-search">' +
  '     <input autocomplete="off" class="am-form-field am-input-sm" />' +
  '   </div>' +
  '   <% } %>' +
  '    <ul class="am-selected-list">' +
  '      <% for (var i = 0; i < options.length; i++) { %>' +
  '       <% var option = options[i] %>' +
  '       <% if (option.header) { %>' +
  '  <li data-group="<%= option.group %>" class="am-selected-list-header">' +
  '       <%= option.text %></li>' +
  '       <% } else { %>' +
  '       <li class="<%= option.classNames%>" ' +
  '         data-index="<%= option.index %>" ' +
  '         data-group="<%= option.group || 0 %>" ' +
  '         data-value="<%= option.value %>" >' +
  '         <span class="am-selected-text"><%= option.text %></span>' +
  '         <i class="am-icon-check"></i></li>' +
  '      <% } %>' +
  '      <% } %>' +
  '    </ul>' +
  '    <div class="am-selected-hint"></div>' +
  '  </div>' +
  '</div>',
  listTpl:   '<% for (var i = 0; i < options.length; i++) { %>' +
  '       <% var option = options[i] %>' +
  '       <% if (option.header) { %>' +
  '  <li data-group="<%= option.group %>" class="am-selected-list-header">' +
  '       <%= option.text %></li>' +
  '       <% } else { %>' +
  '       <li class="<%= option.classNames %>" ' +
  '         data-index="<%= option.index %>" ' +
  '         data-group="<%= option.group || 0 %>" ' +
  '         data-value="<%= option.value %>" >' +
  '         <span class="am-selected-text"><%= option.text %></span>' +
  '         <i class="am-icon-check"></i></li>' +
  '      <% } %>' +
  '      <% } %>'
};

Selected.prototype.init = function() {
  var _this = this;
  var $element = this.$element;
  var options = this.options;

  $element.hide();

  var data = {
    id: UI.utils.generateGUID('am-selected'),
    multiple: this.multiple,
    options: [],
    searchBox: options.searchBox,
    dropUp: options.dropUp,
    placeholder: options.placeholder
  };

  this.$selector = $(UI.template(this.options.tpl, data));
  // set select button styles
  this.$selector.css({width: this.options.btnWidth});

  this.$list = this.$selector.find('.am-selected-list');
  this.$searchField = this.$selector.find('.am-selected-search input');
  this.$hint = this.$selector.find('.am-selected-hint');

  var $selectorBtn = this.$selector.find('.am-selected-btn');
  var btnClassNames = [];

  options.btnSize && btnClassNames.push('am-btn-' + options.btnSize);
  options.btnStyle && btnClassNames.push('am-btn-' + options.btnStyle);
  $selectorBtn.addClass(btnClassNames.join(' '));

  this.$selector.dropdown({
    justify: $selectorBtn
  });

  // set list height
  if (options.maxHeight) {
    this.$selector.find('.am-selected-list').css({
      'max-height': options.maxHeight,
      'overflow-y': 'scroll'
    });
  }

  // set hint text
  var hint = [];
  var min = $element.attr('minchecked');
  var max = $element.attr('maxchecked');

  if ($element[0].required) {
    hint.push('必选');
  }

  if (min || max) {
    min && hint.push('至少选择 ' + min + ' 项');
    max && hint.push('至多选择 ' + max + ' 项');
  }

  this.$hint.text(hint.join('，'));

  // render dropdown list
  this.renderOptions();

  // append $selector after <select>
  this.$element.after(this.$selector);
  this.dropdown = this.$selector.data('amui.dropdown');
  this.$status = this.$selector.find('.am-selected-status');

  // #try to fixes #476
  setTimeout(function() {
    _this.syncData();
    _this.initialized = true;
  }, 0);

  this.bindEvents();
};

Selected.prototype.renderOptions = function() {
  var $element = this.$element;
  var options = this.options;
  var optionItems = [];
  var $optgroup = $element.find('optgroup');
  this.$originalOptions = this.$element.find('option');

  // 单选框使用 JS 禁用已经选择的 option 以后，
  // 浏览器会重新选定第一个 option，但有一定延迟，致使 JS 获取 value 时返回 null
  if (!this.multiple && ($element.val() === null)) {
    this.$originalOptions.length &&
    (this.$originalOptions.get(0).selected = true);
  }

  function pushOption(index, item, group) {
    var classNames = '';
    item.disabled && (classNames += options.disabledClass);
    !item.disabled && item.selected && (classNames += options.selectedClass);

    optionItems.push({
      group: group,
      index: index,
      classNames: classNames,
      text: item.text,
      value: item.value
    });
  }

  // select with option groups
  if ($optgroup.length) {
    $optgroup.each(function(i) {
      // push group name
      optionItems.push({
        header: true,
        group: i + 1,
        text: this.label
      });

      $optgroup.eq(i).find('option').each(function(index, item) {
        pushOption(index, item, i);
      });
    });
  } else {
    // without option groups
    this.$originalOptions.each(function(index, item) {
      pushOption(index, item, null);
    });
  }

  this.$list.html(UI.template(options.listTpl, {options: optionItems}));
  this.$shadowOptions = this.$list.find('> li').
    not('.am-selected-list-header');
};

Selected.prototype.setChecked = function(item) {
  var options = this.options;
  var $item = $(item);
  var isChecked = $item.hasClass(options.selectedClass);
  if (!this.multiple) {
    if (!isChecked) {
      this.dropdown.close();
      this.$shadowOptions.not($item).removeClass(options.selectedClass);
    } else {
      return;
    }
  }

  $item.toggleClass(options.selectedClass);

  this.syncData(item);
};

/**
 * syncData
 * @desc if `item` set, only sync `item` related option
 * @param {Object} item
 */
Selected.prototype.syncData = function(item) {
  var _this = this;
  var options = this.options;
  var status = [];
  var $checked = $([]);

  this.$shadowOptions.filter('.' + options.selectedClass).each(function() {
    var $this = $(this);
    status.push($this.find('.am-selected-text').text());

    if (!item) {
      $checked = $checked.add(_this.$originalOptions.
        filter('[value="' + $this.data('value') + '"]').
        prop('selected', true));
    }
  });

  if (item) {
    var $item = $(item);
    this.$originalOptions.filter('[value="' + $item.data('value') + '"]').
      prop('selected', $item.hasClass(options.selectedClass));
  } else {
    this.$originalOptions.not($checked).prop('selected', false);
  }

  // nothing selected
  if (!this.$element.val()) {
    status = [options.placeholder];
  }

  this.$status.text(status.join(', '));

  // Do not trigger change event on initializing
  this.initialized && this.$element.trigger('change');
};

Selected.prototype.bindEvents = function() {
  var _this = this;
  var header = 'am-selected-list-header';
  var handleKeyup = UI.utils.debounce(function(e) {
    _this.$shadowOptions.not('.' + header).hide().
     filter(':containsNC("' + e.target.value + '")').show();
  }, 100);

  this.$list.on('click', '> li', function(e) {
    var $this = $(this);
    !$this.hasClass(_this.options.disabledClass) &&
      !$this.hasClass(header) && _this.setChecked(this);
  });

  // simple search with jQuery :contains
  this.$searchField.on('keyup.selected.amui', handleKeyup);

  // empty search keywords
  this.$selector.on('closed.dropdown.amui', function() {
    _this.$searchField.val('');
    _this.$shadowOptions.css({display: ''});
  });

  // observe DOM
  if (UI.support.mutationobserver) {
    this.observer = new UI.support.mutationobserver(function() {
      _this.$element.trigger('changed.selected.amui');
    });

    this.observer.observe(this.$element[0], {
      childList: true,
      attributes: true,
      subtree: true,
      characterData: true
    });
  }

  // custom event
  this.$element.on('changed.selected.amui', function() {
    _this.renderOptions();
    _this.syncData();
  });
};

Selected.prototype.destroy = function() {
  this.$element.removeData('amui.selected').show();
  this.$selector.remove();
};

UI.plugin('selected', Selected);

// Conflict with jQuery form
// https://github.com/malsup/form/blob/6bf24a5f6d8be65f4e5491863180c09356d9dadd/jquery.form.js#L1240-L1258
// https://github.com/allmobilize/amazeui/issues/379
// $.fn.selected = $.fn.selectIt = Plugin;

UI.ready(function(context) {
  $('[data-am-selected]', context).selected();
});

module.exports = Selected;

},{"2":2}],21:[function(_dereq_,module,exports){
'use strict';

_dereq_(12);
var $ = (window.jQuery);
var UI = _dereq_(2);
var QRCode = _dereq_(31);
var doc = document;
var $doc = $(doc);

var Share = function(options) {
  this.options = $.extend({}, Share.DEFAULTS, options || {});
  this.$element = null;
  this.$wechatQr = null;
  this.pics = null;
  this.inited = false;
  this.active = false;
  // this.init();
};

Share.DEFAULTS = {
  sns: ['weibo', 'qq', 'qzone', 'tqq', 'wechat', 'renren'],
  title: '分享到',
  cancel: '取消',
  closeOnShare: true,
  id: UI.utils.generateGUID('am-share'),
  desc: 'Hi，孤夜观天象，发现一个不错的西西，分享一下下 ;-)',
  via: 'Amaze UI',
  tpl: '<div class="am-share am-modal-actions" id="<%= id %>">' +
  '<h3 class="am-share-title"><%= title %></h3>' +
  '<ul class="am-share-sns am-avg-sm-3">' +
  '<% for(var i = 0; i < sns.length; i++) {%>' +
  '<li>' +
  '<a href="<%= sns[i].shareUrl %>" ' +
  'data-am-share-to="<%= sns[i].id %>" >' +
  '<i class="am-icon-<%= sns[i].icon %>"></i>' +
  '<span><%= sns[i].title %></span>' +
  '</a></li>' +
  '<% } %></ul>' +
  '<div class="am-share-footer">' +
  '<button class="am-btn am-btn-default am-btn-block" ' +
  'data-am-share-close><%= cancel %></button></div>' +
  '</div>'
};

Share.SNS = {
  weibo: {
    title: '新浪微博',
    url: 'http://service.weibo.com/share/share.php',
    width: 620,
    height: 450,
    icon: 'weibo'
  },
  // url          链接地址
  // title:”,     分享的文字内容(可选，默认为所在页面的title)
  // appkey:”,    您申请的应用appkey,显示分享来源(可选)
  // pic:”,       分享图片的路径(可选)
  // ralateUid:”, 关联用户的UID，分享微博会@该用户(可选)
  // NOTE: 会自动抓取图片，不用指定 pic

  qq: {
    title: 'QQ 好友',
    url: 'http://connect.qq.com/widget/shareqq/index.html',
    icon: 'qq'
  },
  // url:,
  // title:'',    分享标题(可选)
  // pics:'',     分享图片的路径(可选)
  // summary:'',  分享摘要(可选)
  // site:'',     分享来源 如：腾讯网(可选)
  // desc: ''     发送给用户的消息
  // NOTE: 经过测试，最终发给用户的只有 url 和 desc

  qzone: {
    title: 'QQ 空间',
    url: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey',
    icon: 'star'
  },
  // http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=xxx&title=xxx&desc=&summary=&site=
  // url:,
  // title:'',    分享标题(可选)
  // desc:'',     默认分享理由(可选)
  // summary:'',  分享摘要(可选)
  // site:'',     分享来源 如：腾讯网(可选)
  // pics:'',     分享图片的路径(可选)，不会自动抓取，多个图片用|分隔

  tqq: {
    title: '腾讯微博',
    url: 'http://v.t.qq.com/share/share.php',
    icon: 'tencent-weibo'
  },
  // url=xx&title=&appkey=801cf76d3cfc44ada52ec13114e84a96
  // url
  // title
  // pic 多个图片用 | 分隔
  // appkey
  // NOTE: 不会自动抓取图片

  wechat: {
    title: '微信',
    url: '[qrcode]',
    icon: 'wechat'
  },
  // 生成一个二维码 供用户扫描
  // 相关接口 https://github.com/zxlie/WeixinApi

  renren: {
    title: '人人网',
    url: 'http://widget.renren.com/dialog/share',
    icon: 'renren'
  },
  // http://widget.renren.com/dialog/share?resourceUrl=www&srcUrl=www&title=ww&description=xxx
  // 550 * 400
  // resourceUrl : '', // 分享的资源Url
  // srcUrl : '',	     // 分享的资源来源Url,
  //                   //   默认为header中的Referer,如果分享失败可以调整此值为resourceUrl试试
  // pic : '',		 // 分享的主题图片，会自动抓取
  // title : '',		 // 分享的标题
  // description : ''	 // 分享的详细描述
  // NOTE: 经过测试，直接使用 url 参数即可

  douban: {
    title: '豆瓣',
    url: 'http://www.douban.com/recommend/',
    icon: 'share-alt'
  },
  // http://www.douban.com/service/sharebutton
  // 450 * 330
  // http://www.douban.com/share/service?bm=1&image=&href=xxx&updated=&name=
  // href 链接
  // name 标题

  /* void (function() {
   var d = document, e = encodeURIComponent,
   s1 = window.getSelection, s2 = d.getSelection,
   s3 = d.selection, s = s1 ? s1()
   : s2 ? s2() : s3 ? s3.createRange().text : '',
   r = 'http://www.douban.com/recommend/?url=&title=&sel=&v=1&r=1'
   })();
   */

  // tsohu: '',
  // http://t.sohu.com/third/post.jsp?url=&title=&content=utf-8&pic=

  // print: '',

  mail: {
    title: '邮件分享',
    url: 'mailto:',
    icon: 'envelope-o'
  },

  sms: {
    title: '短信分享',
    url: 'sms:',
    icon: 'comment'
  }
};

Share.prototype.render = function() {
  var options = this.options;
  var snsData = [];
  var title = encodeURIComponent(doc.title);
  var link = encodeURIComponent(doc.location);
  var msgBody = '?body=' + title + link;

  options.sns.forEach(function(item, i) {
    if (Share.SNS[item]) {
      var tmp = Share.SNS[item];
      var shareUrl;

      tmp.id = item;

      if (item === 'mail') {
        shareUrl = msgBody + '&subject=' + options.desc;
      } else if (item === 'sms') {
        shareUrl = msgBody;
      } else {
        shareUrl = '?url=' + link + '&title=' + title;
      }

      tmp.shareUrl = tmp.url + shareUrl;

      snsData.push(tmp);
    }
  });

  return UI.template(options.tpl, $.extend({}, options, {sns: snsData}));
};

Share.prototype.init = function() {
  if (this.inited) {
    return;
  }

  var me = this;
  var shareItem = '[data-am-share-to]';

  $doc.ready($.proxy(function() {
    $('body').append(this.render()); // append share DOM to body
    this.$element = $('#' + this.options.id);

    this.$element.find('[data-am-share-close]').
      on('click.share.amui', function() {
        me.close();
      });
  }, this));

  $doc.on('click.share.amui', shareItem, $.proxy(function(e) {
    var $clicked = $(e.target);
    var $target = $clicked.is(shareItem) && $clicked ||
      $clicked.parent(shareItem);
    var sns = $target.attr('data-am-share-to');

    if (!(sns === 'mail' || sns === 'sms')) {
      e.preventDefault();
      this.shareTo(sns, this.setData(sns));
    }

    this.close();
  }, this));

  this.inited = true;
};

Share.prototype.open = function() {
  !this.inited && this.init();
  this.$element && this.$element.modal('open');
  this.$element.trigger('open.share.amui');
  this.active = true;
};

Share.prototype.close = function() {
  this.$element && this.$element.modal('close');
  this.$element.trigger('close.share.amui');
  this.active = false;
};

Share.prototype.toggle = function() {
  this.active ? this.close() : this.open();
};

Share.prototype.setData = function(sns) {
  if (!sns) {
    return;
  }

  var shareData = {
    url: doc.location,
    title: doc.title
  };
  var desc = this.options.desc;
  var imgSrc = this.pics || [];
  var qqReg = /^(qzone|qq|tqq)$/;

  if (qqReg.test(sns) && !imgSrc.length) {
    var allImages = doc.images;

    for (var i = 0; i < allImages.length && i < 10; i++) {
      !!allImages[i].src && imgSrc.push(encodeURIComponent(allImages[i].src));
    }

    this.pics = imgSrc; // 缓存图片
  }

  switch (sns) {
    case 'qzone':
      shareData.desc = desc;
      shareData.site = this.options.via;
      shareData.pics = imgSrc.join('|');
      // TODO: 抓取图片多张
      break;
    case 'qq':
      shareData.desc = desc;
      shareData.site = this.options.via;
      shareData.pics = imgSrc[0];
      // 抓取一张图片
      break;
    case 'tqq':
      // 抓取图片多张
      shareData.pic = imgSrc.join('|');
      break;
  }

  return shareData;
};

Share.prototype.shareTo = function(sns, data) {
  var snsInfo = Share.SNS[sns];

  if (!snsInfo) {
    return;
  }

  if (sns === 'wechat' || sns === 'weixin') {
    return this.wechatQr();
  }

  var query = [];
  for (var key in data) {
    if (data[key]) {
      // 避免 encode 图片分隔符 |
      query.push(key.toString() + '=' + ((key === 'pic' || key === 'pics') ?
        data[key] : encodeURIComponent(data[key])));
    }
  }

  window.open(snsInfo.url + '?' + query.join('&'));
};

Share.prototype.wechatQr = function() {
  if (!this.$wechatQr) {
    var qrId = UI.utils.generateGUID('am-share-wechat');
    var $qr = $('<div class="am-modal am-modal-no-btn am-share-wechat-qr">' +
    '<div class="am-modal-dialog"><div class="am-modal-hd">分享到微信 ' +
    '<a href="" class="am-close am-close-spin" ' +
    'data-am-modal-close>&times;</a> </div>' +
    '<div class="am-modal-bd">' +
    '<div class="am-share-wx-qr"></div>' +
    '<div class="am-share-wechat-tip">' +
    '打开微信，点击底部的<em>发现</em>，<br/> ' +
    '使用<em>扫一扫</em>将网页分享至朋友圈</div></div></div></div>');

    $qr.attr('id', qrId);

    var qrNode = new QRCode({
      render: 'canvas',
      correctLevel: 0,
      text: doc.location.href,
      width: 180,
      height: 180,
      background: '#fff',
      foreground: '#000'
    });

    $qr.find('.am-share-wx-qr').html(qrNode);

    $qr.appendTo($('body'));

    this.$wechatQr = $('#' + qrId);
  }

  this.$wechatQr.modal('open');
};

var share = new Share();

$doc.on('click.share.amui.data-api', '[data-am-toggle="share"]', function(e) {
  e.preventDefault();
  share.toggle();
});

module.exports = UI.share = share;

},{"12":12,"2":2,"31":31}],22:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);
var rAF = UI.utils.rAF;
var cAF = UI.utils.cancelAF;

/**
 * Smooth Scroll
 * @param position
 * @via http://mir.aculo.us/2014/01/19/scrolling-dom-elements-to-the-top-a-zepto-plugin/
 */

// Usage: $(window).smoothScroll([options])

// only allow one scroll to top operation to be in progress at a time,
// which is probably what you want
var smoothScrollInProgress = false;

var SmoothScroll = function(element, options) {
  options = options || {};

  var $this = $(element);
  var targetY = parseInt(options.position) || SmoothScroll.DEFAULTS.position;
  var initialY = $this.scrollTop();
  var lastY = initialY;
  var delta = targetY - initialY;
  // duration in ms, make it a bit shorter for short distances
  // this is not scientific and you might want to adjust this for
  // your preferences
  var speed = options.speed ||
      Math.min(750, Math.min(1500, Math.abs(initialY - targetY)));
  // temp variables (t will be a position between 0 and 1, y is the calculated scrollTop)
  var start;
  var t;
  var y;
  var cancelScroll = function() {
      abort();
    };

  // abort if already in progress or nothing to scroll
  if (smoothScrollInProgress) {
    return;
  }

  if (delta === 0) {
    return;
  }

  // quint ease-in-out smoothing, from
  // https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/penner.js#L127-L136
  function smooth(pos) {
    if ((pos /= 0.5) < 1) {
      return 0.5 * Math.pow(pos, 5);
    }

    return 0.5 * (Math.pow((pos - 2), 5) + 2);
  }

  function abort() {
    $this.off('touchstart.smoothscroll.amui', cancelScroll);
    smoothScrollInProgress = false;
  }

  // when there's a touch detected while scrolling is in progress, abort
  // the scrolling (emulates native scrolling behavior)
  $this.on('touchstart.smoothscroll.amui', cancelScroll);
  smoothScrollInProgress = true;

  // start rendering away! note the function given to frame
  // is named "render" so we can reference it again further down
  function render(now) {
    if (!smoothScrollInProgress) {
      return;
    }
    if (!start) {
      start = now;
    }

    // calculate t, position of animation in [0..1]
    t = Math.min(1, Math.max((now - start) / speed, 0));
    // calculate the new scrollTop position (don't forget to smooth)
    y = Math.round(initialY + delta * smooth(t));
    // bracket scrollTop so we're never over-scrolling
    if (delta > 0 && y > targetY) {
      y = targetY;
    }
    if (delta < 0 && y < targetY) {
      y = targetY;
    }

    // only actually set scrollTop if there was a change fromt he last frame
    if (lastY != y) {
      $this.scrollTop(y);
    }

    lastY = y;
    // if we're not done yet, queue up an other frame to render,
    // or clean up
    if (y !== targetY) {
      cAF(scrollRAF);
      scrollRAF = rAF(render);
    } else {
      cAF(scrollRAF);
      abort();
    }
  }

  var scrollRAF = rAF(render);
};

SmoothScroll.DEFAULTS = {
  position: 0
};

$.fn.smoothScroll = function(option) {
  return this.each(function() {
    new SmoothScroll(this, option);
  });
};

// Init code
$(document).on('click.smoothScroll.amui.data-api', '[data-am-smooth-scroll]',
  function(e) {
    e.preventDefault();
    var options = UI.utils.parseOptions($(this).data('amSmoothScroll'));

    $(window).smoothScroll(options);
  });

module.exports = SmoothScroll;

},{"2":2}],23:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);

/**
 * @via https://github.com/uikit/uikit/blob/master/src/js/addons/sticky.js
 * @license https://github.com/uikit/uikit/blob/master/LICENSE.md
 */

// Sticky Class
var Sticky = function(element, options) {
  var _this = this;

  this.options = $.extend({}, Sticky.DEFAULTS, options);
  this.$element = $(element);
  this.sticked = null;
  this.inited = null;
  this.$holder = undefined;

  this.$window = $(window).
    on('scroll.sticky.amui',
    UI.utils.debounce($.proxy(this.checkPosition, this), 10)).
    on('resize.sticky.amui orientationchange.sticky.amui',
    UI.utils.debounce(function() {
      _this.reset(true, function() {
        _this.checkPosition();
      });
    }, 50)).
    on('load.sticky.amui', $.proxy(this.checkPosition, this));

  // the `.offset()` is diff between jQuery & Zepto.js
  // jQuery: return `top` and `left`
  // Zepto.js: return `top`, `left`, `width`, `height`
  this.offset = this.$element.offset();

  this.init();
};

Sticky.DEFAULTS = {
  top: 0,
  bottom: 0,
  animation: '',
  className: {
    sticky: 'am-sticky',
    resetting: 'am-sticky-resetting',
    stickyBtm: 'am-sticky-bottom',
    animationRev: 'am-animation-reverse'
  }
};

Sticky.prototype.init = function() {
  var result = this.check();

  if (!result) {
    return false;
  }

  var $element = this.$element;
  var $elementMargin = '';

  $.each($element.css(
      ['marginTop', 'marginRight', 'marginBottom', 'marginLeft']),
    function(name, value) {
      return $elementMargin += ' ' + value;
    });

  var $holder = $('<div class="am-sticky-placeholder"></div>').css({
    height: $element.css('position') !== 'absolute' ?
      $element.outerHeight() : '',
    float: $element.css('float') != 'none' ? $element.css('float') : '',
    margin: $elementMargin
  });

  this.$holder = $element.css('margin', 0).wrap($holder).parent();
  this.inited = 1;

  return true;
};

Sticky.prototype.reset = function(force, cb) {
  var options = this.options;
  var $element = this.$element;
  var animation = (options.animation) ?
  ' am-animation-' + options.animation : '';
  var complete = function() {
    $element.css({position: '', top: '', width: '', left: '', margin: 0});
    $element.removeClass([
      animation,
      options.className.animationRev,
      options.className.sticky,
      options.className.resetting
    ].join(' '));

    this.animating = false;
    this.sticked = false;
    this.offset = $element.offset();
    cb && cb();
  }.bind(this);

  $element.addClass(options.className.resetting);

  if (!force && options.animation && UI.support.animation) {

    this.animating = true;

    $element.removeClass(animation).one(UI.support.animation.end, function() {
      complete();
    }).width(); // force redraw

    $element.addClass(animation + ' ' + options.className.animationRev);
  } else {
    complete();
  }
};

Sticky.prototype.check = function() {
  if (!this.$element.is(':visible')) {
    return false;
  }

  var media = this.options.media;

  if (media) {
    switch (typeof(media)) {
      case 'number':
        if (window.innerWidth < media) {
          return false;
        }
        break;

      case 'string':
        if (window.matchMedia && !window.matchMedia(media).matches) {
          return false;
        }
        break;
    }
  }

  return true;
};

Sticky.prototype.checkPosition = function() {
  if (!this.inited) {
    var initialized = this.init();
    if (!initialized) {
      return;
    }
  }

  var options = this.options;
  var scrollTop = this.$window.scrollTop();
  var offsetTop = options.top;
  var offsetBottom = options.bottom;
  var $element = this.$element;
  var animation = (options.animation) ?
    ' am-animation-' + options.animation : '';
  var className = [options.className.sticky, animation].join(' ');

  if (typeof offsetBottom == 'function') {
    offsetBottom = offsetBottom(this.$element);
  }

  var checkResult = (scrollTop > this.$holder.offset().top);

  if (!this.sticked && checkResult) {
    $element.addClass(className);
  } else if (this.sticked && !checkResult) {
    this.reset();
  }

  this.$holder.css({
    height: $element.is(':visible') && $element.css('position') !== 'absolute' ?
      $element.outerHeight() : ''
  });

  if (checkResult) {
    $element.css({
      top: offsetTop,
      left: this.$holder.offset().left,
      width: this.$holder.width()
    });

    /*
     if (offsetBottom) {
     // （底部边距 + 元素高度 > 窗口高度） 时定位到底部
     if ((offsetBottom + this.offset.height > $(window).height()) &&
     (scrollTop + $(window).height() >= scrollHeight - offsetBottom)) {
     $element.addClass(options.className.stickyBtm).
     css({top: $(window).height() - offsetBottom - this.offset.height});
     } else {
     $element.removeClass(options.className.stickyBtm).css({top: offsetTop});
     }
     }
     */
  }

  this.sticked = checkResult;
};

// Sticky Plugin
UI.plugin('sticky', Sticky);

// Init code
$(window).on('load', function() {
  $('[data-am-sticky]').sticky();
});

module.exports = Sticky;

},{"2":2}],24:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);
var Hammer = _dereq_(30);
var supportTransition = UI.support.transition;
var animation = UI.support.animation;

/**
 * @via https://github.com/twbs/bootstrap/blob/master/js/tab.js
 * @copyright 2011-2014 Twitter, Inc.
 * @license MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

/**
 * Tabs
 * @param {HTMLElement} element
 * @param {Object} options
 * @constructor
 */
var Tabs = function(element, options) {
  this.$element = $(element);
  this.options = $.extend({}, Tabs.DEFAULTS, options || {});
  this.transitioning = this.activeIndex = null;

  this.refresh();
  this.init();
};

Tabs.DEFAULTS = {
  selector: {
    nav: '> .am-tabs-nav',
    content: '> .am-tabs-bd',
    panel: '> .am-tab-panel'
  },
  activeClass: 'am-active'
};

Tabs.prototype.refresh = function() {
  var selector = this.options.selector;

  this.$tabNav = this.$element.find(selector.nav);
  this.$navs = this.$tabNav.find('a');

  this.$content = this.$element.find(selector.content);
  this.$tabPanels = this.$content.find(selector.panel);

  var $active = this.$tabNav.find('> .' + this.options.activeClass);

  // Activate the first Tab when no active Tab or multiple active Tabs
  if ($active.length !== 1) {
    this.open(0);
  } else {
    this.activeIndex = this.$navs.index($active.children('a'));
  }
};

Tabs.prototype.init = function() {
  var _this = this;
  var options = this.options;

  this.$element.on('click.tabs.amui', options.selector.nav + ' a', function(e) {
    e.preventDefault();
    _this.open($(this));
  });

  // TODO: nested Tabs touch events
  if (!options.noSwipe) {
    if (!this.$content.length) {
      return this;
    }

    var hammer = new Hammer.Manager(this.$content[0]);
    var swipe = new Hammer.Swipe({
      direction: Hammer.DIRECTION_HORIZONTAL
      // threshold: 40
    });

    hammer.add(swipe);

    hammer.on('swipeleft', UI.utils.debounce(function(e) {
      e.preventDefault();
      _this.goTo('next');
    }, 100));

    hammer.on('swiperight', UI.utils.debounce(function(e) {
      e.preventDefault();
      _this.goTo('prev');
    }, 100));

    this._hammer = hammer;
  }
};

/**
 * Open $nav tab
 * @param {jQuery|HTMLElement|Number} $nav
 * @returns {Tabs}
 */
Tabs.prototype.open = function($nav) {
  var activeClass = this.options.activeClass;
  var activeIndex = typeof $nav === 'number' ? $nav : this.$navs.index($($nav));

  $nav = typeof $nav === 'number' ? this.$navs.eq(activeIndex) : $($nav);

  if (!$nav ||
    !$nav.length ||
    this.transitioning ||
    $nav.parent('li').hasClass(activeClass)) {
    return;
  }

  var $tabNav = this.$tabNav;
  var href = $nav.attr('href');
  var regexHash = /^#.+$/;
  var $target = regexHash.test(href) && this.$content.find(href) ||
    this.$tabPanels.eq(activeIndex);
  var previous = $tabNav.find('.' + activeClass + ' a')[0];
  var e = $.Event('open.tabs.amui', {
    relatedTarget: previous
  });

  $nav.trigger(e);

  if (e.isDefaultPrevented()) {
    return;
  }

  // activate Tab nav
  this.activate($nav.closest('li'), $tabNav);

  // activate Tab content
  this.activate($target, this.$content, function() {
    $nav.trigger({
      type: 'opened.tabs.amui',
      relatedTarget: previous
    });
  });

  this.activeIndex = activeIndex;
};

Tabs.prototype.activate = function($element, $container, callback) {
  this.transitioning = true;

  var activeClass = this.options.activeClass;
  var $active = $container.find('> .' + activeClass);
  var transition = callback && supportTransition && !!$active.length;

  $active.removeClass(activeClass + ' am-in');

  $element.addClass(activeClass);

  if (transition) {
    $element.redraw(); // reflow for transition
    $element.addClass('am-in');
  } else {
    $element.removeClass('am-fade');
  }

  var complete = $.proxy(function complete() {
    callback && callback();
    this.transitioning = false;
  }, this);

  transition ? $active.one(supportTransition.end, complete) : complete();
};

/**
 * Go to `next` or `prev` tab
 * @param {String} direction - `next` or `prev`
 */
Tabs.prototype.goTo = function(direction) {
  var navIndex = this.activeIndex;
  var isNext = direction === 'next';
  var spring = isNext ? 'am-animation-right-spring' :
    'am-animation-left-spring';

  if ((isNext && navIndex + 1 >= this.$navs.length) || // last one
    (!isNext && navIndex === 0)) { // first one
    var $panel = this.$tabPanels.eq(navIndex);

    animation && $panel.addClass(spring).on(animation.end, function() {
      $panel.removeClass(spring);
    });
  } else {
    this.open(isNext ? navIndex + 1 : navIndex - 1);
  }
};

Tabs.prototype.destroy = function() {
  this.$element.off('.tabs.amui');
  Hammer.off(this.$content[0], 'swipeleft swiperight');
  this._hammer && this._hammer.destroy();
  $.removeData(this.$element, 'amui.tabs');
};

// Plugin
function Plugin(option) {
  var args = Array.prototype.slice.call(arguments, 1);
  var methodReturn;

  this.each(function() {
    var $this = $(this);
    var $tabs = $this.is('.am-tabs') && $this || $this.closest('.am-tabs');
    var data = $tabs.data('amui.tabs');
    var options = $.extend({}, UI.utils.parseOptions($this.data('amTabs')),
      $.isPlainObject(option) && option);

    if (!data) {
      $tabs.data('amui.tabs', (data = new Tabs($tabs[0], options)));
    }

    if (typeof option === 'string') {
      if (option === 'open' && $this.is('.am-tabs-nav a')) {
        data.open($this);
      } else {
        methodReturn = typeof data[option] === 'function' ?
          data[option].apply(data, args) : data[option];
      }
    }
  });

  return methodReturn === undefined ? this : methodReturn;
}

$.fn.tabs = Plugin;

// Init code
UI.ready(function(context) {
  $('[data-am-tabs]', context).tabs();
});

$(document).on('click.tabs.amui.data-api', '[data-am-tabs] .am-tabs-nav a',
  function(e) {
  e.preventDefault();
  Plugin.call($(this), 'open');
});

module.exports = UI.tabs = Tabs;

// TODO: 1. Ajax 支持
//       2. touch 事件处理逻辑优化

},{"2":2,"30":30}],25:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);

/**
 * UCheck
 * @via https://github.com/designmodo/Flat-UI/blob/8ef98df23ba7f5033e596a9bd05b53b535a9fe99/js/radiocheck.js
 * @license CC BY 3.0 & MIT
 * @param {HTMLElement} element
 * @param {object} options
 * @constructor
 */

var UCheck = function(element, options) {
  this.options = $.extend({}, UCheck.DEFAULTS, options);
  // this.options = $.extend({}, UCheck.DEFAULTS, this.$element.data(), options);
  this.$element = $(element);
  this.init();
};

UCheck.DEFAULTS = {
  checkboxClass: 'am-ucheck-checkbox',
  radioClass: 'am-ucheck-radio',
  checkboxTpl: '<span class="am-ucheck-icons">' +
  '<i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span>',
  radioTpl: '<span class="am-ucheck-icons">' +
  '<i class="am-icon-unchecked"></i><i class="am-icon-checked"></i></span>'
};

UCheck.prototype.init = function() {
  var $element = this.$element;
  var element = $element[0];
  var options = this.options;

  if (element.type === 'checkbox') {
    $element.addClass(options.checkboxClass)
      .after(options.checkboxTpl);
  } else if (element.type === 'radio') {
    $element.addClass(options.radioClass)
      .after(options.radioTpl);
  }
};

UCheck.prototype.check = function() {
  this.$element
    .prop('checked', true)
    .trigger('change.ucheck.amui')
    .trigger('checked.ucheck.amui');
},

UCheck.prototype.uncheck = function() {
  this.$element
    .prop('checked', false)
    .trigger('change.ucheck.amui')
    .trigger('unchecked.ucheck.amui');
},

UCheck.prototype.toggle = function() {
  this.$element.
    prop('checked', function(i, value) {
      return !value;
    })
    .trigger('change.ucheck.amui')
    .trigger('toggled.ucheck.amui');
},

UCheck.prototype.disable = function() {
  this.$element
    .prop('disabled', true)
    .trigger('change.ucheck.amui')
    .trigger('disabled.ucheck.amui');
},

UCheck.prototype.enable = function() {
  this.$element.prop('disabled', false);
  this.$element.trigger('change.ucheck.amui').trigger('enabled.ucheck.amui');
},

UCheck.prototype.destroy = function() {
  this.$element
    .removeData('amui.ucheck')
    .removeClass(this.options.checkboxClass + ' ' + this.options.radioClass)
    .next('.am-ucheck-icons')
    .remove()
  .end()
    .trigger('destroyed.ucheck.amui');
};

UI.plugin('uCheck', UCheck, {
  after: function() {
    // Adding 'am-nohover' class for touch devices
    if (UI.support.touch) {
      this.parent().hover(function() {
        this.addClass('am-nohover');
      }, function() {
        this.removeClass('am-nohover');
      });
    }
  }
});

UI.ready(function(context) {
  $('[data-am-ucheck]', context).uCheck();
});

module.exports = UCheck;

// TODO: 与表单验证结合使用的情况

},{"2":2}],26:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);

var Validator = function(element, options) {
  this.options = $.extend({}, Validator.DEFAULTS, options);
  this.options.patterns = $.extend({}, Validator.patterns,
    this.options.patterns);
  var locales = this.options.locales;
  !Validator.validationMessages[locales] && (this.options.locales = 'zh_CN');
  this.$element = $(element);
  this.init();
};

Validator.DEFAULTS = {
  debug: false,
  locales: 'zh_CN',
  H5validation: false,
  H5inputType: ['email', 'url', 'number'],
  patterns: {},
  patternClassPrefix: 'js-pattern-',
  activeClass: 'am-active',
  inValidClass: 'am-field-error',
  validClass: 'am-field-valid',

  validateOnSubmit: true,
  // Elements to validate with allValid (only validating visible elements)
  // :input: selects all input, textarea, select and button elements.
  allFields: ':input:visible:not(:submit, :button, :disabled, .am-novalidate)',

  // Custom events
  customEvents: 'validate',

  // Keyboard events
  keyboardFields: ':input:not(:submit, :button, :disabled, .am-novalidate)',
  keyboardEvents: 'focusout, change', // keyup, focusin

  // bind `keyup` event to active field
  activeKeyup: false,
  textareaMaxlenthKeyup: true,

  // Mouse events
  pointerFields: 'input[type="range"]:not(:disabled, .am-novalidate), ' +
  'input[type="radio"]:not(:disabled, .am-novalidate), ' +
  'input[type="checkbox"]:not(:disabled, .am-novalidate), ' +
  'select:not(:disabled, .am-novalidate), ' +
  'option:not(:disabled, .am-novalidate)',
  pointerEvents: 'click',

  onValid: function(validity) {
  },

  onInValid: function(validity) {
  },

  markValid: function(validity) {
    // this is Validator instance
    var options = this.options;
    var $field = $(validity.field);
    var $parent = $field.closest('.am-form-group');

    $field.addClass(options.validClass).removeClass(options.inValidClass);
    $parent.addClass('am-form-success').removeClass('am-form-error');
    options.onValid.call(this, validity);
  },

  markInValid: function(validity) {
    var options = this.options;
    var $field = $(validity.field);
    var $parent = $field.closest('.am-form-group');

    $field.addClass(options.inValidClass + ' ' + options.activeClass).
      removeClass(options.validClass);
    $parent.addClass('am-form-error').removeClass('am-form-success');
    options.onInValid.call(this, validity);
  },

  validate: function(validity) {
    // return validity;
  },

  submit: null
};

Validator.VERSION = '2.4.1';

/* jshint -W101 */
Validator.patterns = {
  email: /^((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/,

  url: /^(https?|ftp):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,

  // Number, including positive, negative, and floating decimal
  number: /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/,
  dateISO: /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,
  integer: /^-?\d+$/
};
/* jshint +W101 */

Validator.validationMessages = {
  zh_CN: {
    valueMissing: '请填写（选择）此字段',
    customError: {
      tooShort: '至少填写 %s 个字符',
      checkedOverflow: '至多选择 %s 项',
      checkedUnderflow: '至少选择 %s 项'
    },
    patternMismatch: '请按照要求的格式填写',
    rangeOverflow: '请填写小于等于 %s 的值',
    rangeUnderflow: '请填写大于等于 %s 的值',
    stepMismatch: '',
    tooLong: '至多填写 %s 个字符',
    typeMismatch: '请按照要求的类型填写'
  }
};

Validator.ERROR_MAP = {
  tooShort: 'minlength',
  checkedOverflow: 'maxchecked',
  checkedUnderflow: 'minchecked',
  rangeOverflow: 'max',
  rangeUnderflow: 'min',
  tooLong: 'maxlength'
};

// TODO: 考虑表单元素不是 form 子元素的情形
// TODO: change/click/focusout 同时触发时处理重复
// TODO: 显示提示信息

Validator.prototype.init = function() {
  var _this = this;
  var $element = this.$element;
  var options = this.options;

  // using H5 form validation if option set and supported
  if (options.H5validation && UI.support.formValidation) {
    return false;
  }

  // disable HTML5 form validation
  $element.attr('novalidate', 'novalidate');

  function regexToPattern(regex) {
    var pattern = regex.toString();
    return pattern.substring(1, pattern.length - 1);
  }

  // add pattern to H5 input type
  $.each(options.H5inputType, function(i, type) {
    var $field = $element.find('input[type=' + type + ']');
    if (!$field.attr('pattern') &&
      !$field.is('[class*=' + options.patternClassPrefix + ']')) {
      $field.attr('pattern', regexToPattern(options.patterns[type]));
    }
  });

  // add pattern to .js-pattern-xx
  $.each(options.patterns, function(key, value) {
    var $field = $element.find('.' + options.patternClassPrefix + key);
    !$field.attr('pattern') && $field.attr('pattern', regexToPattern(value));
  });

  $element.submit(function(e) {
    // user custom submit handler
    if (typeof options.submit === 'function') {
      return options.submit.call(_this, e);
    }

    if (options.validateOnSubmit) {
      var formValidity = _this.isFormValid();

      // sync validate, return result
      if ($.type(formValidity) === 'boolean') {
        return formValidity;
      }

      if ($element.data('amui.checked')) {
        return true;
      } else {
        $.when(formValidity).then(function() {
          // done, submit form
          $element.data('amui.checked', true).submit();
        }, function() {
          // fail
          $element.data('amui.checked', false).
            find('.' + options.inValidClass).eq(0).focus();
        });
        return false;
      }
    }
  });

  function bindEvents(fields, eventFlags, debounce) {
    var events = eventFlags.split(',');
    var validate = function(e) {
      // console.log(e.type);
      _this.validate(this);
    };

    if (debounce) {
      validate = UI.utils.debounce(validate, debounce);
    }

    $.each(events, function(i, event) {
      $element.on(event + '.validator.amui', fields, validate);
    });
  }

  bindEvents(':input', options.customEvents);
  bindEvents(options.keyboardFields, options.keyboardEvents);
  bindEvents(options.pointerFields, options.pointerEvents);

  if (options.textareaMaxlenthKeyup) {
    bindEvents('textarea[maxlength]', 'keyup', 50);
  }

  if (options.activeKeyup) {
    bindEvents('.am-active', 'keyup', 50);
  }

  /*if (options.errorMessage === 'tooltip') {
    this.$tooltip = $('<div></div>', {
      'class': 'am-validator-message',
      id: UI.utils.generateGUID('am-validator-message')
    });

    $(document.body).append(this.$tooltip);
  }*/
};

Validator.prototype.isValid = function(field) {
  var $field = $(field);
  // valid field not has been validated
  if ($field.data('validity') === undefined) {
    this.validate(field);
  }

  return $field.data('validity') && $field.data('validity').valid;
};

Validator.prototype.validate = function(field) {
  var _this = this;
  var $element = this.$element;
  var options = this.options;
  var $field = $(field);

  // Validate equal, e.g. confirm password
  var equalTo = $field.data('equalTo');
  if (equalTo) {
    $field.attr('pattern', '^' + $element.find(equalTo).val() + '$');
  }

  var pattern = $field.attr('pattern') || false;
  var re = new RegExp(pattern);
  var $radioGroup = null;
  var $checkboxGroup = null;
  // if checkbox, return `:chcked` length
  // NOTE: checkbox and radio should have name attribute
  var value = ($field.is('[type=checkbox]')) ?
    ($checkboxGroup = $element.find('input[name="' + field.name + '"]')).
      filter(':checked').length : ($field.is('[type=radio]') ?
  ($radioGroup = this.$element.find('input[name="' + field.name + '"]')).
    filter(':checked').length > 0 : $field.val());

  // if checkbox, valid the first input of checkbox group
  $field = ($checkboxGroup && $checkboxGroup.length) ?
    $checkboxGroup.first() : $field;

  var required = ($field.attr('required') !== undefined) &&
    ($field.attr('required') !== 'false');
  var maxLength = parseInt($field.attr('maxlength'), 10);
  var minLength = parseInt($field.attr('minlength'), 10);
  var min = Number($field.attr('min'));
  var max = Number($field.attr('max'));
  var validity = this.createValidity({field: $field[0], valid: true});

  // Debug
  if (options.debug && window.console) {
    console.log('Validate: value -> [' + value + ', regex -> [' + re +
    '], required -> ' + required);
    console.log('Regex test: ' + re.test(value) + ', Pattern: ' + pattern);
  }

  // check value length
  if (!isNaN(maxLength) && value.length > maxLength) {
    validity.valid = false;
    validity.tooLong = true;
  }

  if (!isNaN(minLength) && value.length < minLength) {
    validity.valid = false;
    validity.customError = 'tooShort';
  }

  // check minimum and maximum
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input
  // TODO: 日期验证最小值和最大值 min/max
  if (!isNaN(min) && Number(value) < min) {
    validity.valid = false;
    validity.rangeUnderflow = true;
  }

  if (!isNaN(max) && Number(value) > max) {
    validity.valid = false;
    validity.rangeOverflow = true;
  }

  // check required
  if (required && !value) {
    validity.valid = false;
    validity.valueMissing = true;
  } else if (($checkboxGroup || $field.is('select[multiple="multiple"]')) &&
    value) {
    // check checkboxes / multiple select with `minchecked`/`maxchecked` attr
    // var $multipleField = $checkboxGroup ? $checkboxGroup.first() : $field;

    // if is select[multiple="multiple"], return selected length
    value = $checkboxGroup ? value : value.length;

    // at least checked
    var minChecked = parseInt($field.attr('minchecked'), 10);
    // at most checked
    var maxChecked = parseInt($field.attr('maxchecked'), 10);

    if (!isNaN(minChecked) && value < minChecked) {
      // console.log('At least [%d] items checked！', maxChecked);
      validity.valid = false;
      validity.customError = 'checkedUnderflow';
    }

    if (!isNaN(maxChecked) && value > maxChecked) {
      // console.log('At most [%d] items checked！', maxChecked);
      validity.valid = false;
      validity.customError = 'checkedOverflow';
    }
  } else if (pattern && !re.test(value) && value) { // check pattern
    validity.valid = false;
    validity.patternMismatch = true;
  }

  var validateComplete = function(validity) {
    this.markField(validity);

    $field.trigger('validated.field.validator.amui', validity).
      data('validity', validity);

    // validate the radios/checkboxes with the same name
    var $fields = $radioGroup || $checkboxGroup;
    if ($fields) {
      $fields.not($field).data('validity', validity).each(function() {
        validity.field = this;
        _this.markField(validity);
      });
    }

    return validity;
  };

  // Run custom validate
  // NOTE: async custom validate should return Deferred project
  var customValidate;
  (typeof options.validate === 'function') &&
    (customValidate = options.validate.call(this, validity));

  // Deferred
  if (customValidate) {
    var dfd = new $.Deferred();
    $field.data('amui.dfdValidity', dfd.promise());
    return $.when(customValidate).always(function(validity) {
      dfd[validity.valid ? 'resolve' : 'reject'](validity);
      validateComplete.call(_this, validity);
    });
  }

  validateComplete.call(this, validity);
};

Validator.prototype.markField = function(validity) {
  var options = this.options;
  var flag = 'mark' + (validity.valid ? '' : 'In') + 'Valid';
  options[flag] && options[flag].call(this, validity);
};

// check all fields in the form are valid
Validator.prototype.validateForm = function() {
  var _this = this;
  var $element = this.$element;
  var options = this.options;
  var $allFields = $element.find(options.allFields);
  var radioNames = [];
  var valid = true;
  var formValidity = [];
  var $inValidFields = $([]);
  var promises = [];
  // for async validate
  var async = false;

  $element.trigger('validate.form.validator.amui');

  // Filter radio with the same name and keep only one,
  //   since they will be checked as a group by validate()
  var $filteredFields = $allFields.filter(function(index) {
    var name;
    if (this.tagName === 'INPUT' && this.type === 'radio') {
      name = this.name;
      if (radioNames[name] === true) {
        return false;
      }
      radioNames[name] = true;
    }
    return true;
  });

  $filteredFields.each(function() {
    var $this = $(this);
    var fieldValid = _this.isValid(this);
    var fieldValidity = $this.data('validity');

    valid = !!fieldValid && valid;
    formValidity.push(fieldValidity);

    if (!fieldValid) {
      $inValidFields = $inValidFields.add($(this), $element);
    }

    // async validity
    var promise = $this.data('amui.dfdValidity');

    if (promise) {
      promises.push(promise);
      async = true;
    } else {
      // convert sync validity to Promise
      var dfd = new $.Deferred();
      promises.push(dfd.promise());
      dfd[fieldValid ? 'resolve' : 'reject'](fieldValidity);
    }
  });

  // NOTE: If there are async validity, the valid may be not exact result.
  var validity = {
    valid: valid,
    $invalidFields: $inValidFields,
    validity: formValidity,
    promises: promises,
    async: async
  };

  $element.trigger('validated.form.validator.amui', validity);

  return validity;
};

Validator.prototype.isFormValid = function() {
  var _this = this;
  var formValidity = this.validateForm();
  var triggerValid = function(type) {
    _this.$element.trigger(type + '.validator.amui');
  };

  if (formValidity.async) {
    var masterDfd = new $.Deferred();

    $.when.apply(null, formValidity.promises).then(function() {
      masterDfd.resolve();
      triggerValid('valid');
    }, function() {
      masterDfd.reject();
      triggerValid('invalid');
    });

    return masterDfd.promise();
  } else {
    if (!formValidity.valid) {
      formValidity.$invalidFields.first().focus();
      triggerValid('invalid');
      return false;
    }

    triggerValid('valid');
    return true;
  }
};

// customErrors:
//    1. tooShort
//    2. checkedOverflow
//    3. checkedUnderflow
Validator.prototype.createValidity = function(validity) {
  return $.extend({
    customError: validity.customError || false,
    patternMismatch: validity.patternMismatch || false,
    rangeOverflow: validity.rangeOverflow || false, // higher than maximum
    rangeUnderflow: validity.rangeUnderflow || false, // lower than  minimum
    stepMismatch: validity.stepMismatch || false,
    tooLong: validity.tooLong || false,
    // value is not in the correct syntax
    typeMismatch: validity.typeMismatch || false,
    valid: validity.valid || true,
    // Returns true if the element has no value but is a required field
    valueMissing: validity.valueMissing || false
  }, validity);
};

Validator.prototype.getValidationMessage = function(validity) {
  var messages = Validator.validationMessages[this.options.locales];
  var error;
  var message;
  var placeholder = '%s';
  var $field = $(validity.field);

  if ($field.is('[type="checkbox"]') || $field.is('[type="radio"]')) {
    $field = this.$element.find('[name=' + $field.attr('name') + ']').first();
  }

  // get error name
  $.each(validity, function(key, val) {
    // skip `field` and `valid`
    if (key === 'field' || key === 'valid') {
      return key;
    }

    // Amaze UI custom error type
    if (key === 'customError' && val) {
      error = val;
      messages = messages.customError;
      return false;
    }

    // W3C specs error type
    if (val === true) {
      error = key;
      return false;
    }
  });

  message = messages[error] || undefined;

  if (message && Validator.ERROR_MAP[error]) {
    message = message.replace(placeholder,
      $field.attr(Validator.ERROR_MAP[error]) || '规定的');
  }

  return message;
};

// remove valid mark
Validator.prototype.removeMark = function() {
  this.$element.find('.am-form-success, .am-form-error, .am-field-error')
    .removeClass('am-form-success am-form-error am-field-error');
};

UI.plugin('validator', Validator);

// init code
UI.ready(function(context) {
  $('[data-am-validator]', context).validator();
});

module.exports = Validator;

},{"2":2}],27:[function(_dereq_,module,exports){
'use strict';

var UI = _dereq_(2);

var cookie = {
  get: function(name) {
    var cookieName = encodeURIComponent(name) + '=';
    var cookieStart = document.cookie.indexOf(cookieName);
    var cookieValue = null;
    var cookieEnd;

    if (cookieStart > -1) {
      cookieEnd = document.cookie.indexOf(';', cookieStart);
      if (cookieEnd == -1) {
        cookieEnd = document.cookie.length;
      }
      cookieValue = decodeURIComponent(document.cookie.substring(cookieStart +
      cookieName.length, cookieEnd));
    }

    return cookieValue;
  },

  set: function(name, value, expires, path, domain, secure) {
    var cookieText = encodeURIComponent(name) + '=' +
      encodeURIComponent(value);

    if (expires instanceof Date) {
      cookieText += '; expires=' + expires.toUTCString();
    }

    if (path) {
      cookieText += '; path=' + path;
    }

    if (domain) {
      cookieText += '; domain=' + domain;
    }

    if (secure) {
      cookieText += '; secure';
    }

    document.cookie = cookieText;
  },

  unset: function(name, path, domain, secure) {
    this.set(name, '', new Date(0), path, domain, secure);
  }
};

UI.utils = UI.utils || {};

module.exports = UI.utils.cookie = cookie;

},{"2":2}],28:[function(_dereq_,module,exports){
'use strict';

var UI = _dereq_(2);
var screenfull = (function() {
  var keyboardAllowed = typeof Element !== 'undefined' &&
    'ALLOW_KEYBOARD_INPUT' in Element;

  var fn = (function() {
    var val;
    var valLength;

    var fnMap = [
      [
        'requestFullscreen',
        'exitFullscreen',
        'fullscreenElement',
        'fullscreenEnabled',
        'fullscreenchange',
        'fullscreenerror'
      ],
      // new WebKit
      [
        'webkitRequestFullscreen',
        'webkitExitFullscreen',
        'webkitFullscreenElement',
        'webkitFullscreenEnabled',
        'webkitfullscreenchange',
        'webkitfullscreenerror'

      ],
      // old WebKit (Safari 5.1)
      [
        'webkitRequestFullScreen',
        'webkitCancelFullScreen',
        'webkitCurrentFullScreenElement',
        'webkitCancelFullScreen',
        'webkitfullscreenchange',
        'webkitfullscreenerror'

      ],
      [
        'mozRequestFullScreen',
        'mozCancelFullScreen',
        'mozFullScreenElement',
        'mozFullScreenEnabled',
        'mozfullscreenchange',
        'mozfullscreenerror'
      ],
      [
        'msRequestFullscreen',
        'msExitFullscreen',
        'msFullscreenElement',
        'msFullscreenEnabled',
        'MSFullscreenChange',
        'MSFullscreenError'
      ]
    ];

    var i = 0;
    var l = fnMap.length;
    var ret = {};

    for (; i < l; i++) {
      val = fnMap[i];
      if (val && val[1] in document) {
        for (i = 0, valLength = val.length; i < valLength; i++) {
          ret[fnMap[0][i]] = val[i];
        }
        return ret;
      }
    }

    return false;
  })();

  var screenfull = {
    request: function(elem) {
      var request = fn.requestFullscreen;

      elem = elem || document.documentElement;

      // Work around Safari 5.1 bug: reports support for
      // keyboard in fullscreen even though it doesn't.
      // Browser sniffing, since the alternative with
      // setTimeout is even worse.
      if (/5\.1[\.\d]* Safari/.test(navigator.userAgent)) {
        elem[request]();
      } else {
        elem[request](keyboardAllowed && Element.ALLOW_KEYBOARD_INPUT);
      }
    },
    exit: function() {
      document[fn.exitFullscreen]();
    },
    toggle: function(elem) {
      if (this.isFullscreen) {
        this.exit();
      } else {
        this.request(elem);
      }
    },
    raw: fn
  };

  if (!fn) {
    return false;
  }

  Object.defineProperties(screenfull, {
    isFullscreen: {
      get: function() {
        return !!document[fn.fullscreenElement];
      }
    },
    element: {
      enumerable: true,
      get: function() {
        return document[fn.fullscreenElement];
      }
    },
    enabled: {
      enumerable: true,
      get: function() {
        // Coerce to boolean in case of old WebKit
        return !!document[fn.fullscreenEnabled];
      }
    }
  });

  screenfull.VERSION = '2.0.0';

  return screenfull;
})();

module.exports = UI.fullscreen = screenfull;

},{"2":2}],29:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);
UI.support.geolocation = window.navigator && window.navigator.geolocation;

var geo = UI.support.geolocation;

var Geolocation = function(options) {
  this.options = options || {};
};

Geolocation.MESSAGES = {
  unsupportedBrowser: 'Browser does not support location services',
  permissionDenied: 'You have rejected access to your location',
  positionUnavailable: 'Unable to determine your location',
  timeout: 'Service timeout has been reached'
};

Geolocation.ERROR_CODE = {
  0: 'unsupportedBrowser',
  1: 'permissionDenied',
  2: 'positionUnavailable',
  3: 'timeout'
};

Geolocation.prototype.get = function(options) {
  var _this = this;
  options = $.extend({}, this.options, options);
  var deferred = new $.Deferred();

  if (geo) {
    this.watchID = geo.getCurrentPosition(function(position) {
      deferred.resolve.call(_this, position);
    }, function(error) {
      deferred.reject(Geolocation.MESSAGES[Geolocation.ERROR_CODE[error.code]]);
    }, options);
  } else {
    deferred.reject(Geolocation.MESSAGES.unsupportedBrowser);
  }

  return deferred.promise();
};

Geolocation.prototype.watch = function(options) {
  if (!geo) {
    return;
  }

  options = $.extend({}, this.options, options);

  if (!$.isFunction(options.done)) {
    return;
  }

  this.clearWatch();

  var fail = $.isFunction(options.fail) ? options.fail : null;

  this.watchID = geo.watchPosition(options.done, fail, options);

  return this.watchID;
};

Geolocation.prototype.clearWatch = function() {
  if (!geo || !this.watchID) {
    return;
  }
  geo.clearWatch(this.watchID);
  this.watchID = null;
};

module.exports = UI.Geolocation = Geolocation;

},{"2":2}],30:[function(_dereq_,module,exports){
/*! Hammer.JS - v2.0.4 - 2014-09-28
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder;
 * Licensed under the MIT license */

'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);

var VENDOR_PREFIXES = ['', 'webkit', 'moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
  return setTimeout(bindFn(fn, context), timeout);
}

/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */
function invokeArrayArg(arg, fn, context) {
  if (Array.isArray(arg)) {
    each(arg, context[fn], context);
    return true;
  }
  return false;
}

/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
  var i;

  if (!obj) {
    return;
  }

  if (obj.forEach) {
    obj.forEach(iterator, context);
  } else if (obj.length !== undefined) {
    i = 0;
    while (i < obj.length) {
      iterator.call(context, obj[i], i, obj);
      i++;
    }
  } else {
    for (i in obj) {
      obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
    }
  }
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge]
 * @returns {Object} dest
 */
function extend(dest, src, merge) {
  var keys = Object.keys(src);
  var i = 0;
  while (i < keys.length) {
    if (!merge || (merge && dest[keys[i]] === undefined)) {
      dest[keys[i]] = src[keys[i]];
    }
    i++;
  }
  return dest;
}

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
function merge(dest, src) {
  return extend(dest, src, true);
}

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
  var baseP = base.prototype,
    childP;

  childP = child.prototype = Object.create(baseP);
  childP.constructor = child;
  childP._super = baseP;

  if (properties) {
    extend(childP, properties);
  }
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
  return function boundFn() {
    return fn.apply(context, arguments);
  };
}

/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */
function boolOrFn(val, args) {
  if (typeof val == TYPE_FUNCTION) {
    return val.apply(args ? args[0] || undefined : undefined, args);
  }
  return val;
}

/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function ifUndefined(val1, val2) {
  return (val1 === undefined) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
  each(splitStr(types), function(type) {
    target.addEventListener(type, handler, false);
  });
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
  each(splitStr(types), function(type) {
    target.removeEventListener(type, handler, false);
  });
}

/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
  while (node) {
    if (node == parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
  return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
  return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
  if (src.indexOf && !findByKey) {
    return src.indexOf(find);
  } else {
    var i = 0;
    while (i < src.length) {
      if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
        return i;
      }
      i++;
    }
    return -1;
  }
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
  return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
  var results = [];
  var values = [];
  var i = 0;

  while (i < src.length) {
    var val = key ? src[i][key] : src[i];
    if (inArray(values, val) < 0) {
      results.push(src[i]);
    }
    values[i] = val;
    i++;
  }

  if (sort) {
    if (!key) {
      results = results.sort();
    } else {
      results = results.sort(function sortUniqueArray(a, b) {
        return a[key] > b[key];
      });
    }
  }

  return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
  var prefix, prop;
  var camelProp = property[0].toUpperCase() + property.slice(1);

  var i = 0;
  while (i < VENDOR_PREFIXES.length) {
    prefix = VENDOR_PREFIXES[i];
    prop = (prefix) ? prefix + camelProp : property;

    if (prop in obj) {
      return prop;
    }
    i++;
  }
  return undefined;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
  return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
  var doc = element.ownerDocument;
  return (doc.defaultView || doc.parentWindow);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';

var COMPUTE_INTERVAL = 25;

var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;

var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
function Input(manager, callback) {
  var self = this;
  this.manager = manager;
  this.callback = callback;
  this.element = manager.element;
  this.target = manager.options.inputTarget;

  // smaller wrapper around the handler, for the scope and the enabled state of the manager,
  // so when disabled the input events are completely bypassed.
  this.domHandler = function(ev) {
    if (boolOrFn(manager.options.enable, [manager])) {
      self.handler(ev);
    }
  };

  this.init();

}

Input.prototype = {
  /**
   * should handle the inputEvent data and trigger the callback
   * @virtual
   */
  handler: function() {
  },

  /**
   * bind the events
   */
  init: function() {
    this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
    this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
    this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
  },

  /**
   * unbind the events
   */
  destroy: function() {
    this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
    this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
    this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
  }
};

/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
  var Type;
  var inputClass = manager.options.inputClass;

  if (inputClass) {
    Type = inputClass;
  } else if (SUPPORT_POINTER_EVENTS) {
    Type = PointerEventInput;
  } else if (SUPPORT_ONLY_TOUCH) {
    Type = TouchInput;
  } else if (!SUPPORT_TOUCH) {
    Type = MouseInput;
  } else {
    Type = TouchMouseInput;
  }
  return new (Type)(manager, inputHandler);
}

/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
  var pointersLen = input.pointers.length;
  var changedPointersLen = input.changedPointers.length;
  var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
  var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

  input.isFirst = !!isFirst;
  input.isFinal = !!isFinal;

  if (isFirst) {
    manager.session = {};
  }

  // source event is the normalized value of the domEvents
  // like 'touchstart, mouseup, pointerdown'
  input.eventType = eventType;

  // compute scale, rotation etc
  computeInputData(manager, input);

  // emit secret event
  manager.emit('hammer.input', input);

  manager.recognize(input);
  manager.session.prevInput = input;
}

/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
  var session = manager.session;
  var pointers = input.pointers;
  var pointersLength = pointers.length;

  // store the first input to calculate the distance and direction
  if (!session.firstInput) {
    session.firstInput = simpleCloneInputData(input);
  }

  // to compute scale and rotation we need to store the multiple touches
  if (pointersLength > 1 && !session.firstMultiple) {
    session.firstMultiple = simpleCloneInputData(input);
  } else if (pointersLength === 1) {
    session.firstMultiple = false;
  }

  var firstInput = session.firstInput;
  var firstMultiple = session.firstMultiple;
  var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

  var center = input.center = getCenter(pointers);
  input.timeStamp = now();
  input.deltaTime = input.timeStamp - firstInput.timeStamp;

  input.angle = getAngle(offsetCenter, center);
  input.distance = getDistance(offsetCenter, center);

  computeDeltaXY(session, input);
  input.offsetDirection = getDirection(input.deltaX, input.deltaY);

  input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
  input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

  computeIntervalInputData(session, input);

  // find the correct target
  var target = manager.element;
  if (hasParent(input.srcEvent.target, target)) {
    target = input.srcEvent.target;
  }
  input.target = target;
}

function computeDeltaXY(session, input) {
  var center = input.center;
  var offset = session.offsetDelta || {};
  var prevDelta = session.prevDelta || {};
  var prevInput = session.prevInput || {};

  if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
    prevDelta = session.prevDelta = {
      x: prevInput.deltaX || 0,
      y: prevInput.deltaY || 0
    };

    offset = session.offsetDelta = {
      x: center.x,
      y: center.y
    };
  }

  input.deltaX = prevDelta.x + (center.x - offset.x);
  input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
  var last = session.lastInterval || input,
    deltaTime = input.timeStamp - last.timeStamp,
    velocity, velocityX, velocityY, direction;

  if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
    var deltaX = last.deltaX - input.deltaX;
    var deltaY = last.deltaY - input.deltaY;

    var v = getVelocity(deltaTime, deltaX, deltaY);
    velocityX = v.x;
    velocityY = v.y;
    velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
    direction = getDirection(deltaX, deltaY);

    session.lastInterval = input;
  } else {
    // use latest velocity info if it doesn't overtake a minimum period
    velocity = last.velocity;
    velocityX = last.velocityX;
    velocityY = last.velocityY;
    direction = last.direction;
  }

  input.velocity = velocity;
  input.velocityX = velocityX;
  input.velocityY = velocityY;
  input.direction = direction;
}

/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
  // make a simple copy of the pointers because we will get a reference if we don't
  // we only need clientXY for the calculations
  var pointers = [];
  var i = 0;
  while (i < input.pointers.length) {
    pointers[i] = {
      clientX: round(input.pointers[i].clientX),
      clientY: round(input.pointers[i].clientY)
    };
    i++;
  }

  return {
    timeStamp: now(),
    pointers: pointers,
    center: getCenter(pointers),
    deltaX: input.deltaX,
    deltaY: input.deltaY
  };
}

/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */
function getCenter(pointers) {
  var pointersLength = pointers.length;

  // no need to loop when only one touch
  if (pointersLength === 1) {
    return {
      x: round(pointers[0].clientX),
      y: round(pointers[0].clientY)
    };
  }

  var x = 0, y = 0, i = 0;
  while (i < pointersLength) {
    x += pointers[i].clientX;
    y += pointers[i].clientY;
    i++;
  }

  return {
    x: round(x / pointersLength),
    y: round(y / pointersLength)
  };
}

/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
  return {
    x: x / deltaTime || 0,
    y: y / deltaTime || 0
  };
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
  if (x === y) {
    return DIRECTION_NONE;
  }

  if (abs(x) >= abs(y)) {
    return x > 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
  }
  return y > 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
  if (!props) {
    props = PROPS_XY;
  }
  var x = p2[props[0]] - p1[props[0]],
    y = p2[props[1]] - p1[props[1]];

  return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
  if (!props) {
    props = PROPS_XY;
  }
  var x = p2[props[0]] - p1[props[0]],
    y = p2[props[1]] - p1[props[1]];
  return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
  return getAngle(end[1], end[0], PROPS_CLIENT_XY) - getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
  return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

var MOUSE_INPUT_MAP = {
  mousedown: INPUT_START,
  mousemove: INPUT_MOVE,
  mouseup: INPUT_END
};

var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

/**
 * Mouse events input
 * @constructor
 * @extends Input
 */
function MouseInput() {
  this.evEl = MOUSE_ELEMENT_EVENTS;
  this.evWin = MOUSE_WINDOW_EVENTS;

  this.allow = true; // used by Input.TouchMouse to disable mouse events
  this.pressed = false; // mousedown state

  Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
  /**
   * handle mouse events
   * @param {Object} ev
   */
  handler: function MEhandler(ev) {
    var eventType = MOUSE_INPUT_MAP[ev.type];

    // on start we want to have the left mouse button down
    if (eventType & INPUT_START && ev.button === 0) {
      this.pressed = true;
    }

    if (eventType & INPUT_MOVE && ev.which !== 1) {
      eventType = INPUT_END;
    }

    // mouse must be down, and mouse events are allowed (see the TouchMouse input)
    if (!this.pressed || !this.allow) {
      return;
    }

    if (eventType & INPUT_END) {
      this.pressed = false;
    }

    this.callback(this.manager, eventType, {
      pointers: [ev],
      changedPointers: [ev],
      pointerType: INPUT_TYPE_MOUSE,
      srcEvent: ev
    });
  }
});

var POINTER_INPUT_MAP = {
  pointerdown: INPUT_START,
  pointermove: INPUT_MOVE,
  pointerup: INPUT_END,
  pointercancel: INPUT_CANCEL,
  pointerout: INPUT_CANCEL
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
  2: INPUT_TYPE_TOUCH,
  3: INPUT_TYPE_PEN,
  4: INPUT_TYPE_MOUSE,
  5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent) {
  POINTER_ELEMENT_EVENTS = 'MSPointerDown';
  POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}

/**
 * Pointer events input
 * @constructor
 * @extends Input
 */
function PointerEventInput() {
  this.evEl = POINTER_ELEMENT_EVENTS;
  this.evWin = POINTER_WINDOW_EVENTS;

  Input.apply(this, arguments);

  this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
  /**
   * handle mouse events
   * @param {Object} ev
   */
  handler: function PEhandler(ev) {
    var store = this.store;
    var removePointer = false;

    var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
    var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
    var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

    var isTouch = (pointerType == INPUT_TYPE_TOUCH);

    // get index of the event in the store
    var storeIndex = inArray(store, ev.pointerId, 'pointerId');

    // start and mouse must be down
    if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
      if (storeIndex < 0) {
        store.push(ev);
        storeIndex = store.length - 1;
      }
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
      removePointer = true;
    }

    // it not found, so the pointer hasn't been down (so it's probably a hover)
    if (storeIndex < 0) {
      return;
    }

    // update the event in the store
    store[storeIndex] = ev;

    this.callback(this.manager, eventType, {
      pointers: store,
      changedPointers: [ev],
      pointerType: pointerType,
      srcEvent: ev
    });

    if (removePointer) {
      // remove from the store
      store.splice(storeIndex, 1);
    }
  }
});

var SINGLE_TOUCH_INPUT_MAP = {
  touchstart: INPUT_START,
  touchmove: INPUT_MOVE,
  touchend: INPUT_END,
  touchcancel: INPUT_CANCEL
};

var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Touch events input
 * @constructor
 * @extends Input
 */
function SingleTouchInput() {
  this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
  this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
  this.started = false;

  Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
  handler: function TEhandler(ev) {
    var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

    // should we handle the touch events?
    if (type === INPUT_START) {
      this.started = true;
    }

    if (!this.started) {
      return;
    }

    var touches = normalizeSingleTouches.call(this, ev, type);

    // when done, reset the started state
    if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
      this.started = false;
    }

    this.callback(this.manager, type, {
      pointers: touches[0],
      changedPointers: touches[1],
      pointerType: INPUT_TYPE_TOUCH,
      srcEvent: ev
    });
  }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function normalizeSingleTouches(ev, type) {
  var all = toArray(ev.touches);
  var changed = toArray(ev.changedTouches);

  if (type & (INPUT_END | INPUT_CANCEL)) {
    all = uniqueArray(all.concat(changed), 'identifier', true);
  }

  return [all, changed];
}

var TOUCH_INPUT_MAP = {
  touchstart: INPUT_START,
  touchmove: INPUT_MOVE,
  touchend: INPUT_END,
  touchcancel: INPUT_CANCEL
};

var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
function TouchInput() {
  this.evTarget = TOUCH_TARGET_EVENTS;
  this.targetIds = {};

  Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
  handler: function MTEhandler(ev) {
    var type = TOUCH_INPUT_MAP[ev.type];
    var touches = getTouches.call(this, ev, type);
    if (!touches) {
      return;
    }

    this.callback(this.manager, type, {
      pointers: touches[0],
      changedPointers: touches[1],
      pointerType: INPUT_TYPE_TOUCH,
      srcEvent: ev
    });
  }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function getTouches(ev, type) {
  var allTouches = toArray(ev.touches);
  var targetIds = this.targetIds;

  // when there is only one touch, the process can be simplified
  if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
    targetIds[allTouches[0].identifier] = true;
    return [allTouches, allTouches];
  }

  var i,
    targetTouches,
    changedTouches = toArray(ev.changedTouches),
    changedTargetTouches = [],
    target = this.target;

  // get target touches from touches
  targetTouches = allTouches.filter(function(touch) {
    return hasParent(touch.target, target);
  });

  // collect touches
  if (type === INPUT_START) {
    i = 0;
    while (i < targetTouches.length) {
      targetIds[targetTouches[i].identifier] = true;
      i++;
    }
  }

  // filter changed touches to only contain touches that exist in the collected target ids
  i = 0;
  while (i < changedTouches.length) {
    if (targetIds[changedTouches[i].identifier]) {
      changedTargetTouches.push(changedTouches[i]);
    }

    // cleanup removed touches
    if (type & (INPUT_END | INPUT_CANCEL)) {
      delete targetIds[changedTouches[i].identifier];
    }
    i++;
  }

  if (!changedTargetTouches.length) {
    return;
  }

  return [
    // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
    uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
    changedTargetTouches
  ];
}

/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */
function TouchMouseInput() {
  Input.apply(this, arguments);

  var handler = bindFn(this.handler, this);
  this.touch = new TouchInput(this.manager, handler);
  this.mouse = new MouseInput(this.manager, handler);
}

inherit(TouchMouseInput, Input, {
  /**
   * handle mouse and touch events
   * @param {Hammer} manager
   * @param {String} inputEvent
   * @param {Object} inputData
   */
  handler: function TMEhandler(manager, inputEvent, inputData) {
    var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
      isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

    // when we're in a touch event, so  block all upcoming mouse events
    // most mobile browser also emit mouseevents, right after touchstart
    if (isTouch) {
      this.mouse.allow = false;
    } else if (isMouse && !this.mouse.allow) {
      return;
    }

    // reset the allowMouse when we're done
    if (inputEvent & (INPUT_END | INPUT_CANCEL)) {
      this.mouse.allow = true;
    }

    this.callback(manager, inputEvent, inputData);
  },

  /**
   * remove the event listeners
   */
  destroy: function destroy() {
    this.touch.destroy();
    this.mouse.destroy();
  }
});

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';

/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
function TouchAction(manager, value) {
  this.manager = manager;
  this.set(value);
}

TouchAction.prototype = {
  /**
   * set the touchAction value on the element or enable the polyfill
   * @param {String} value
   */
  set: function(value) {
    // find out the touch-action by the event handlers
    if (value == TOUCH_ACTION_COMPUTE) {
      value = this.compute();
    }

    if (NATIVE_TOUCH_ACTION) {
      this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
    }
    this.actions = value.toLowerCase().trim();
  },

  /**
   * just re-set the touchAction value
   */
  update: function() {
    this.set(this.manager.options.touchAction);
  },

  /**
   * compute the value for the touchAction property based on the recognizer's settings
   * @returns {String} value
   */
  compute: function() {
    var actions = [];
    each(this.manager.recognizers, function(recognizer) {
      if (boolOrFn(recognizer.options.enable, [recognizer])) {
        actions = actions.concat(recognizer.getTouchAction());
      }
    });
    return cleanTouchActions(actions.join(' '));
  },

  /**
   * this method is called on each input cycle and provides the preventing of the browser behavior
   * @param {Object} input
   */
  preventDefaults: function(input) {
    // not needed with native support for the touchAction property
    if (NATIVE_TOUCH_ACTION) {
      return;
    }

    var srcEvent = input.srcEvent;
    var direction = input.offsetDirection;

    // if the touch action did prevented once this session
    if (this.manager.session.prevented) {
      srcEvent.preventDefault();
      return;
    }

    var actions = this.actions;
    var hasNone = inStr(actions, TOUCH_ACTION_NONE);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);

    if (hasNone ||
      (hasPanY && direction & DIRECTION_HORIZONTAL) ||
      (hasPanX && direction & DIRECTION_VERTICAL)) {
      return this.preventSrc(srcEvent);
    }
  },

  /**
   * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
   * @param {Object} srcEvent
   */
  preventSrc: function(srcEvent) {
    this.manager.session.prevented = true;
    srcEvent.preventDefault();
  }
};

/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */
function cleanTouchActions(actions) {
  // none
  if (inStr(actions, TOUCH_ACTION_NONE)) {
    return TOUCH_ACTION_NONE;
  }

  var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
  var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

  // pan-x and pan-y can be combined
  if (hasPanX && hasPanY) {
    return TOUCH_ACTION_PAN_X + ' ' + TOUCH_ACTION_PAN_Y;
  }

  // pan-x OR pan-y
  if (hasPanX || hasPanY) {
    return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
  }

  // manipulation
  if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
    return TOUCH_ACTION_MANIPULATION;
  }

  return TOUCH_ACTION_AUTO;
}

/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */
var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
function Recognizer(options) {
  this.id = uniqueId();

  this.manager = null;
  this.options = merge(options || {}, this.defaults);

  // default is enable true
  this.options.enable = ifUndefined(this.options.enable, true);

  this.state = STATE_POSSIBLE;

  this.simultaneous = {};
  this.requireFail = [];
}

Recognizer.prototype = {
  /**
   * @virtual
   * @type {Object}
   */
  defaults: {},

  /**
   * set options
   * @param {Object} options
   * @return {Recognizer}
   */
  set: function(options) {
    extend(this.options, options);

    // also update the touchAction, in case something changed about the directions/enabled state
    this.manager && this.manager.touchAction.update();
    return this;
  },

  /**
   * recognize simultaneous with an other recognizer.
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */
  recognizeWith: function(otherRecognizer) {
    if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
      return this;
    }

    var simultaneous = this.simultaneous;
    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
    if (!simultaneous[otherRecognizer.id]) {
      simultaneous[otherRecognizer.id] = otherRecognizer;
      otherRecognizer.recognizeWith(this);
    }
    return this;
  },

  /**
   * drop the simultaneous link. it doesnt remove the link on the other recognizer.
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */
  dropRecognizeWith: function(otherRecognizer) {
    if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
      return this;
    }

    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
    delete this.simultaneous[otherRecognizer.id];
    return this;
  },

  /**
   * recognizer can only run when an other is failing
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */
  requireFailure: function(otherRecognizer) {
    if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
      return this;
    }

    var requireFail = this.requireFail;
    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
    if (inArray(requireFail, otherRecognizer) === -1) {
      requireFail.push(otherRecognizer);
      otherRecognizer.requireFailure(this);
    }
    return this;
  },

  /**
   * drop the requireFailure link. it does not remove the link on the other recognizer.
   * @param {Recognizer} otherRecognizer
   * @returns {Recognizer} this
   */
  dropRequireFailure: function(otherRecognizer) {
    if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
      return this;
    }

    otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
    var index = inArray(this.requireFail, otherRecognizer);
    if (index > -1) {
      this.requireFail.splice(index, 1);
    }
    return this;
  },

  /**
   * has require failures boolean
   * @returns {boolean}
   */
  hasRequireFailures: function() {
    return this.requireFail.length > 0;
  },

  /**
   * if the recognizer can recognize simultaneous with an other recognizer
   * @param {Recognizer} otherRecognizer
   * @returns {Boolean}
   */
  canRecognizeWith: function(otherRecognizer) {
    return !!this.simultaneous[otherRecognizer.id];
  },

  /**
   * You should use `tryEmit` instead of `emit` directly to check
   * that all the needed recognizers has failed before emitting.
   * @param {Object} input
   */
  emit: function(input) {
    var self = this;
    var state = this.state;

    function emit(withState) {
      self.manager.emit(self.options.event + (withState ? stateStr(state) : ''), input);
    }

    // 'panstart' and 'panmove'
    if (state < STATE_ENDED) {
      emit(true);
    }

    emit(); // simple 'eventName' events

    // panend and pancancel
    if (state >= STATE_ENDED) {
      emit(true);
    }
  },

  /**
   * Check that all the require failure recognizers has failed,
   * if true, it emits a gesture event,
   * otherwise, setup the state to FAILED.
   * @param {Object} input
   */
  tryEmit: function(input) {
    if (this.canEmit()) {
      return this.emit(input);
    }
    // it's failing anyway
    this.state = STATE_FAILED;
  },

  /**
   * can we emit?
   * @returns {boolean}
   */
  canEmit: function() {
    var i = 0;
    while (i < this.requireFail.length) {
      if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
        return false;
      }
      i++;
    }
    return true;
  },

  /**
   * update the recognizer
   * @param {Object} inputData
   */
  recognize: function(inputData) {
    // make a new copy of the inputData
    // so we can change the inputData without messing up the other recognizers
    var inputDataClone = extend({}, inputData);

    // is is enabled and allow recognizing?
    if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
      this.reset();
      this.state = STATE_FAILED;
      return;
    }

    // reset when we've reached the end
    if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
      this.state = STATE_POSSIBLE;
    }

    this.state = this.process(inputDataClone);

    // the recognizer has recognized a gesture
    // so trigger an event
    if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
      this.tryEmit(inputDataClone);
    }
  },

  /**
   * return the state of the recognizer
   * the actual recognizing happens in this method
   * @virtual
   * @param {Object} inputData
   * @returns {Const} STATE
   */
  process: function(inputData) {
  }, // jshint ignore:line

  /**
   * return the preferred touch-action
   * @virtual
   * @returns {Array}
   */
  getTouchAction: function() {
  },

  /**
   * called when the gesture isn't allowed to recognize
   * like when another is being recognized or it is disabled
   * @virtual
   */
  reset: function() {
  }
};

/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */
function stateStr(state) {
  if (state & STATE_CANCELLED) {
    return 'cancel';
  } else if (state & STATE_ENDED) {
    return 'end';
  } else if (state & STATE_CHANGED) {
    return 'move';
  } else if (state & STATE_BEGAN) {
    return 'start';
  }
  return '';
}

/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */
function directionStr(direction) {
  if (direction == DIRECTION_DOWN) {
    return 'down';
  } else if (direction == DIRECTION_UP) {
    return 'up';
  } else if (direction == DIRECTION_LEFT) {
    return 'left';
  } else if (direction == DIRECTION_RIGHT) {
    return 'right';
  }
  return '';
}

/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
  var manager = recognizer.manager;
  if (manager) {
    return manager.get(otherRecognizer);
  }
  return otherRecognizer;
}

/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
function AttrRecognizer() {
  Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
  /**
   * @namespace
   * @memberof AttrRecognizer
   */
  defaults: {
    /**
     * @type {Number}
     * @default 1
     */
    pointers: 1
  },

  /**
   * Used to check if it the recognizer receives valid input, like input.distance > 10.
   * @memberof AttrRecognizer
   * @param {Object} input
   * @returns {Boolean} recognized
   */
  attrTest: function(input) {
    var optionPointers = this.options.pointers;
    return optionPointers === 0 || input.pointers.length === optionPointers;
  },

  /**
   * Process the input and return the state for the recognizer
   * @memberof AttrRecognizer
   * @param {Object} input
   * @returns {*} State
   */
  process: function(input) {
    var state = this.state;
    var eventType = input.eventType;

    var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
    var isValid = this.attrTest(input);

    // on cancel input and we've recognized before, return STATE_CANCELLED
    if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
      return state | STATE_CANCELLED;
    } else if (isRecognized || isValid) {
      if (eventType & INPUT_END) {
        return state | STATE_ENDED;
      } else if (!(state & STATE_BEGAN)) {
        return STATE_BEGAN;
      }
      return state | STATE_CHANGED;
    }
    return STATE_FAILED;
  }
});

/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function PanRecognizer() {
  AttrRecognizer.apply(this, arguments);

  this.pX = null;
  this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
  /**
   * @namespace
   * @memberof PanRecognizer
   */
  defaults: {
    event: 'pan',
    threshold: 10,
    pointers: 1,
    direction: DIRECTION_ALL
  },

  getTouchAction: function() {
    var direction = this.options.direction;
    var actions = [];
    if (direction & DIRECTION_HORIZONTAL) {
      actions.push(TOUCH_ACTION_PAN_Y);
    }
    if (direction & DIRECTION_VERTICAL) {
      actions.push(TOUCH_ACTION_PAN_X);
    }
    return actions;
  },

  directionTest: function(input) {
    var options = this.options;
    var hasMoved = true;
    var distance = input.distance;
    var direction = input.direction;
    var x = input.deltaX;
    var y = input.deltaY;

    // lock to axis?
    if (!(direction & options.direction)) {
      if (options.direction & DIRECTION_HORIZONTAL) {
        direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
        hasMoved = x != this.pX;
        distance = Math.abs(input.deltaX);
      } else {
        direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
        hasMoved = y != this.pY;
        distance = Math.abs(input.deltaY);
      }
    }
    input.direction = direction;
    return hasMoved && distance > options.threshold && direction & options.direction;
  },

  attrTest: function(input) {
    return AttrRecognizer.prototype.attrTest.call(this, input) &&
      (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
  },

  emit: function(input) {
    this.pX = input.deltaX;
    this.pY = input.deltaY;

    var direction = directionStr(input.direction);
    if (direction) {
      this.manager.emit(this.options.event + direction, input);
    }

    this._super.emit.call(this, input);
  }
});

/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */
function PinchRecognizer() {
  AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
  /**
   * @namespace
   * @memberof PinchRecognizer
   */
  defaults: {
    event: 'pinch',
    threshold: 0,
    pointers: 2
  },

  getTouchAction: function() {
    return [TOUCH_ACTION_NONE];
  },

  attrTest: function(input) {
    return this._super.attrTest.call(this, input) &&
      (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
  },

  emit: function(input) {
    this._super.emit.call(this, input);
    if (input.scale !== 1) {
      var inOut = input.scale < 1 ? 'in' : 'out';
      this.manager.emit(this.options.event + inOut, input);
    }
  }
});

/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
function PressRecognizer() {
  Recognizer.apply(this, arguments);

  this._timer = null;
  this._input = null;
}

inherit(PressRecognizer, Recognizer, {
  /**
   * @namespace
   * @memberof PressRecognizer
   */
  defaults: {
    event: 'press',
    pointers: 1,
    time: 500, // minimal time of the pointer to be pressed
    threshold: 5 // a minimal movement is ok, but keep it low
  },

  getTouchAction: function() {
    return [TOUCH_ACTION_AUTO];
  },

  process: function(input) {
    var options = this.options;
    var validPointers = input.pointers.length === options.pointers;
    var validMovement = input.distance < options.threshold;
    var validTime = input.deltaTime > options.time;

    this._input = input;

    // we only allow little movement
    // and we've reached an end event, so a tap is possible
    if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
      this.reset();
    } else if (input.eventType & INPUT_START) {
      this.reset();
      this._timer = setTimeoutContext(function() {
        this.state = STATE_RECOGNIZED;
        this.tryEmit();
      }, options.time, this);
    } else if (input.eventType & INPUT_END) {
      return STATE_RECOGNIZED;
    }
    return STATE_FAILED;
  },

  reset: function() {
    clearTimeout(this._timer);
  },

  emit: function(input) {
    if (this.state !== STATE_RECOGNIZED) {
      return;
    }

    if (input && (input.eventType & INPUT_END)) {
      this.manager.emit(this.options.event + 'up', input);
    } else {
      this._input.timeStamp = now();
      this.manager.emit(this.options.event, this._input);
    }
  }
});

/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */
function RotateRecognizer() {
  AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
  /**
   * @namespace
   * @memberof RotateRecognizer
   */
  defaults: {
    event: 'rotate',
    threshold: 0,
    pointers: 2
  },

  getTouchAction: function() {
    return [TOUCH_ACTION_NONE];
  },

  attrTest: function(input) {
    return this._super.attrTest.call(this, input) &&
      (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
  }
});

/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function SwipeRecognizer() {
  AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
  /**
   * @namespace
   * @memberof SwipeRecognizer
   */
  defaults: {
    event: 'swipe',
    threshold: 10,
    velocity: 0.65,
    direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
    pointers: 1
  },

  getTouchAction: function() {
    return PanRecognizer.prototype.getTouchAction.call(this);
  },

  attrTest: function(input) {
    var direction = this.options.direction;
    var velocity;

    if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
      velocity = input.velocity;
    } else if (direction & DIRECTION_HORIZONTAL) {
      velocity = input.velocityX;
    } else if (direction & DIRECTION_VERTICAL) {
      velocity = input.velocityY;
    }

    return this._super.attrTest.call(this, input) &&
      direction & input.direction &&
      input.distance > this.options.threshold &&
      abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
  },

  emit: function(input) {
    var direction = directionStr(input.direction);
    if (direction) {
      this.manager.emit(this.options.event + direction, input);
    }

    this.manager.emit(this.options.event, input);
  }
});

/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
function TapRecognizer() {
  Recognizer.apply(this, arguments);

  // previous time and center,
  // used for tap counting
  this.pTime = false;
  this.pCenter = false;

  this._timer = null;
  this._input = null;
  this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
  /**
   * @namespace
   * @memberof PinchRecognizer
   */
  defaults: {
    event: 'tap',
    pointers: 1,
    taps: 1,
    interval: 300, // max time between the multi-tap taps
    time: 250, // max time of the pointer to be down (like finger on the screen)
    threshold: 2, // a minimal movement is ok, but keep it low
    posThreshold: 10 // a multi-tap can be a bit off the initial position
  },

  getTouchAction: function() {
    return [TOUCH_ACTION_MANIPULATION];
  },

  process: function(input) {
    var options = this.options;

    var validPointers = input.pointers.length === options.pointers;
    var validMovement = input.distance < options.threshold;
    var validTouchTime = input.deltaTime < options.time;

    this.reset();

    if ((input.eventType & INPUT_START) && (this.count === 0)) {
      return this.failTimeout();
    }

    // we only allow little movement
    // and we've reached an end event, so a tap is possible
    if (validMovement && validTouchTime && validPointers) {
      if (input.eventType != INPUT_END) {
        return this.failTimeout();
      }

      var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
      var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

      this.pTime = input.timeStamp;
      this.pCenter = input.center;

      if (!validMultiTap || !validInterval) {
        this.count = 1;
      } else {
        this.count += 1;
      }

      this._input = input;

      // if tap count matches we have recognized it,
      // else it has began recognizing...
      var tapCount = this.count % options.taps;
      if (tapCount === 0) {
        // no failing requirements, immediately trigger the tap event
        // or wait as long as the multitap interval to trigger
        if (!this.hasRequireFailures()) {
          return STATE_RECOGNIZED;
        } else {
          this._timer = setTimeoutContext(function() {
            this.state = STATE_RECOGNIZED;
            this.tryEmit();
          }, options.interval, this);
          return STATE_BEGAN;
        }
      }
    }
    return STATE_FAILED;
  },

  failTimeout: function() {
    this._timer = setTimeoutContext(function() {
      this.state = STATE_FAILED;
    }, this.options.interval, this);
    return STATE_FAILED;
  },

  reset: function() {
    clearTimeout(this._timer);
  },

  emit: function() {
    if (this.state == STATE_RECOGNIZED) {
      this._input.tapCount = this.count;
      this.manager.emit(this.options.event, this._input);
    }
  }
});

/**
 * Simple way to create an manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Hammer(element, options) {
  options = options || {};
  options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
  return new Manager(element, options);
}

/**
 * @const {string}
 */
Hammer.VERSION = '2.0.4';

/**
 * default settings
 * @namespace
 */
Hammer.defaults = {
  /**
   * set if DOM events are being triggered.
   * But this is slower and unused by simple implementations, so disabled by default.
   * @type {Boolean}
   * @default false
   */
  domEvents: false,

  /**
   * The value for the touchAction property/fallback.
   * When set to `compute` it will magically set the correct value based on the added recognizers.
   * @type {String}
   * @default compute
   */
  touchAction: TOUCH_ACTION_COMPUTE,

  /**
   * @type {Boolean}
   * @default true
   */
  enable: true,

  /**
   * EXPERIMENTAL FEATURE -- can be removed/changed
   * Change the parent input target element.
   * If Null, then it is being set the to main element.
   * @type {Null|EventTarget}
   * @default null
   */
  inputTarget: null,

  /**
   * force an input class
   * @type {Null|Function}
   * @default null
   */
  inputClass: null,

  /**
   * Default recognizer setup when calling `Hammer()`
   * When creating a new Manager these will be skipped.
   * @type {Array}
   */
  preset: [
    // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
    [RotateRecognizer, {enable: false}],
    [PinchRecognizer, {enable: false}, ['rotate']],
    [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
    [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
    [TapRecognizer],
    [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
    [PressRecognizer]
  ],

  /**
   * Some CSS properties can be used to improve the working of Hammer.
   * Add them to this method and they will be set when creating a new Manager.
   * @namespace
   */
  cssProps: {
    /**
     * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
     * @type {String}
     * @default 'none'
     */
    userSelect: 'none',

    /**
     * Disable the Windows Phone grippers when pressing an element.
     * @type {String}
     * @default 'none'
     */
    touchSelect: 'none',

    /**
     * Disables the default callout shown when you touch and hold a touch target.
     * On iOS, when you touch and hold a touch target such as a link, Safari displays
     * a callout containing information about the link. This property allows you to disable that callout.
     * @type {String}
     * @default 'none'
     */
    touchCallout: 'none',

    /**
     * Specifies whether zooming is enabled. Used by IE10>
     * @type {String}
     * @default 'none'
     */
    contentZooming: 'none',

    /**
     * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
     * @type {String}
     * @default 'none'
     */
    userDrag: 'none',

    /**
     * Overrides the highlight color shown when the user taps a link or a JavaScript
     * clickable element in iOS. This property obeys the alpha value, if specified.
     * @type {String}
     * @default 'rgba(0,0,0,0)'
     */
    tapHighlightColor: 'rgba(0,0,0,0)'
  }
};

var STOP = 1;
var FORCED_STOP = 2;

/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Manager(element, options) {
  options = options || {};

  this.options = merge(options, Hammer.defaults);
  this.options.inputTarget = this.options.inputTarget || element;

  this.handlers = {};
  this.session = {};
  this.recognizers = [];

  this.element = element;
  this.input = createInputInstance(this);
  this.touchAction = new TouchAction(this, this.options.touchAction);

  toggleCssProps(this, true);

  each(options.recognizers, function(item) {
    var recognizer = this.add(new (item[0])(item[1]));
    item[2] && recognizer.recognizeWith(item[2]);
    item[3] && recognizer.requireFailure(item[3]);
  }, this);
}

Manager.prototype = {
  /**
   * set options
   * @param {Object} options
   * @returns {Manager}
   */
  set: function(options) {
    extend(this.options, options);

    // Options that need a little more setup
    if (options.touchAction) {
      this.touchAction.update();
    }
    if (options.inputTarget) {
      // Clean up existing event listeners and reinitialize
      this.input.destroy();
      this.input.target = options.inputTarget;
      this.input.init();
    }
    return this;
  },

  /**
   * stop recognizing for this session.
   * This session will be discarded, when a new [input]start event is fired.
   * When forced, the recognizer cycle is stopped immediately.
   * @param {Boolean} [force]
   */
  stop: function(force) {
    this.session.stopped = force ? FORCED_STOP : STOP;
  },

  /**
   * run the recognizers!
   * called by the inputHandler function on every movement of the pointers (touches)
   * it walks through all the recognizers and tries to detect the gesture that is being made
   * @param {Object} inputData
   */
  recognize: function(inputData) {
    var session = this.session;
    if (session.stopped) {
      return;
    }

    // run the touch-action polyfill
    this.touchAction.preventDefaults(inputData);

    var recognizer;
    var recognizers = this.recognizers;

    // this holds the recognizer that is being recognized.
    // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
    // if no recognizer is detecting a thing, it is set to `null`
    var curRecognizer = session.curRecognizer;

    // reset when the last recognizer is recognized
    // or when we're in a new session
    if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
      curRecognizer = session.curRecognizer = null;
    }

    var i = 0;
    while (i < recognizers.length) {
      recognizer = recognizers[i];

      // find out if we are allowed try to recognize the input for this one.
      // 1.   allow if the session is NOT forced stopped (see the .stop() method)
      // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
      //      that is being recognized.
      // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
      //      this can be setup with the `recognizeWith()` method on the recognizer.
      if (session.stopped !== FORCED_STOP && ( // 1
        !curRecognizer || recognizer == curRecognizer || // 2
        recognizer.canRecognizeWith(curRecognizer))) { // 3
        recognizer.recognize(inputData);
      } else {
        recognizer.reset();
      }

      // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
      // current active recognizer. but only if we don't already have an active recognizer
      if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
        curRecognizer = session.curRecognizer = recognizer;
      }
      i++;
    }
  },

  /**
   * get a recognizer by its event name.
   * @param {Recognizer|String} recognizer
   * @returns {Recognizer|Null}
   */
  get: function(recognizer) {
    if (recognizer instanceof Recognizer) {
      return recognizer;
    }

    var recognizers = this.recognizers;
    for (var i = 0; i < recognizers.length; i++) {
      if (recognizers[i].options.event == recognizer) {
        return recognizers[i];
      }
    }
    return null;
  },

  /**
   * add a recognizer to the manager
   * existing recognizers with the same event name will be removed
   * @param {Recognizer} recognizer
   * @returns {Recognizer|Manager}
   */
  add: function(recognizer) {
    if (invokeArrayArg(recognizer, 'add', this)) {
      return this;
    }

    // remove existing
    var existing = this.get(recognizer.options.event);
    if (existing) {
      this.remove(existing);
    }

    this.recognizers.push(recognizer);
    recognizer.manager = this;

    this.touchAction.update();
    return recognizer;
  },

  /**
   * remove a recognizer by name or instance
   * @param {Recognizer|String} recognizer
   * @returns {Manager}
   */
  remove: function(recognizer) {
    if (invokeArrayArg(recognizer, 'remove', this)) {
      return this;
    }

    var recognizers = this.recognizers;
    recognizer = this.get(recognizer);
    recognizers.splice(inArray(recognizers, recognizer), 1);

    this.touchAction.update();
    return this;
  },

  /**
   * bind event
   * @param {String} events
   * @param {Function} handler
   * @returns {EventEmitter} this
   */
  on: function(events, handler) {
    var handlers = this.handlers;
    each(splitStr(events), function(event) {
      handlers[event] = handlers[event] || [];
      handlers[event].push(handler);
    });
    return this;
  },

  /**
   * unbind event, leave emit blank to remove all handlers
   * @param {String} events
   * @param {Function} [handler]
   * @returns {EventEmitter} this
   */
  off: function(events, handler) {
    var handlers = this.handlers;
    each(splitStr(events), function(event) {
      if (!handler) {
        delete handlers[event];
      } else {
        handlers[event].splice(inArray(handlers[event], handler), 1);
      }
    });
    return this;
  },

  /**
   * emit event to the listeners
   * @param {String} event
   * @param {Object} data
   */
  emit: function(event, data) {
    // we also want to trigger dom events
    if (this.options.domEvents) {
      triggerDomEvent(event, data);
    }

    // no handlers, so skip it all
    var handlers = this.handlers[event] && this.handlers[event].slice();
    if (!handlers || !handlers.length) {
      return;
    }

    data.type = event;
    data.preventDefault = function() {
      data.srcEvent.preventDefault();
    };

    var i = 0;
    while (i < handlers.length) {
      handlers[i](data);
      i++;
    }
  },

  /**
   * destroy the manager and unbinds all events
   * it doesn't unbind dom events, that is the user own responsibility
   */
  destroy: function() {
    this.element && toggleCssProps(this, false);

    this.handlers = {};
    this.session = {};
    this.input.destroy();
    this.element = null;
  }
};

/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */
function toggleCssProps(manager, add) {
  var element = manager.element;
  each(manager.options.cssProps, function(value, name) {
    element.style[prefixed(element.style, name)] = add ? value : '';
  });
}

/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
  var gestureEvent = document.createEvent('Event');
  gestureEvent.initEvent(event, true, true);
  gestureEvent.gesture = data;
  data.target.dispatchEvent(gestureEvent);
}

extend(Hammer, {
  INPUT_START: INPUT_START,
  INPUT_MOVE: INPUT_MOVE,
  INPUT_END: INPUT_END,
  INPUT_CANCEL: INPUT_CANCEL,

  STATE_POSSIBLE: STATE_POSSIBLE,
  STATE_BEGAN: STATE_BEGAN,
  STATE_CHANGED: STATE_CHANGED,
  STATE_ENDED: STATE_ENDED,
  STATE_RECOGNIZED: STATE_RECOGNIZED,
  STATE_CANCELLED: STATE_CANCELLED,
  STATE_FAILED: STATE_FAILED,

  DIRECTION_NONE: DIRECTION_NONE,
  DIRECTION_LEFT: DIRECTION_LEFT,
  DIRECTION_RIGHT: DIRECTION_RIGHT,
  DIRECTION_UP: DIRECTION_UP,
  DIRECTION_DOWN: DIRECTION_DOWN,
  DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
  DIRECTION_VERTICAL: DIRECTION_VERTICAL,
  DIRECTION_ALL: DIRECTION_ALL,

  Manager: Manager,
  Input: Input,
  TouchAction: TouchAction,

  TouchInput: TouchInput,
  MouseInput: MouseInput,
  PointerEventInput: PointerEventInput,
  TouchMouseInput: TouchMouseInput,
  SingleTouchInput: SingleTouchInput,

  Recognizer: Recognizer,
  AttrRecognizer: AttrRecognizer,
  Tap: TapRecognizer,
  Pan: PanRecognizer,
  Swipe: SwipeRecognizer,
  Pinch: PinchRecognizer,
  Rotate: RotateRecognizer,
  Press: PressRecognizer,

  on: addEventListeners,
  off: removeEventListeners,
  each: each,
  merge: merge,
  extend: extend,
  inherit: inherit,
  bindFn: bindFn,
  prefixed: prefixed
});

// jquery.hammer.js
// This jQuery plugin is just a small wrapper around the Hammer() class.
// It also extends the Manager.emit method by triggering jQuery events.
// $(element).hammer(options).bind("pan", myPanHandler);
// The Hammer instance is stored at $element.data("hammer").
// https://github.com/hammerjs/jquery.hammer.js

(function($, Hammer) {
  function hammerify(el, options) {
    var $el = $(el);
    if (!$el.data('hammer')) {
      $el.data('hammer', new Hammer($el[0], options));
    }
  }

  $.fn.hammer = function(options) {
    return this.each(function() {
      hammerify(this, options);
    });
  };

  // extend the emit method to also trigger jQuery events
  Hammer.Manager.prototype.emit = (function(originalEmit) {
    return function(type, data) {
      originalEmit.call(this, type, data);
      $(this.element).trigger({
        type: type,
        gesture: data
      });
    };
  })(Hammer.Manager.prototype.emit);
})($, Hammer);

module.exports = UI.Hammer = Hammer;

},{"2":2}],31:[function(_dereq_,module,exports){
var $ = (window.jQuery);
var UI = _dereq_(2);

/**
 * @ver 1.1.0
 * @via https://github.com/aralejs/qrcode/blob/master/src/qrcode.js
 * @license http://aralejs.org/
 */

var qrcodeAlgObjCache = [];

/**
 * 二维码构造函数，主要用于绘制
 * @param  {Object} opt 传递参数
 * @return {String} qrcode
 * @constructor
 */
var QRCode = function(opt) {
  if (typeof opt === 'string') { // 只编码ASCII字符串
    opt = {
      text: opt
    };
  }
  // 设置默认参数
  this.options = $.extend({}, {
    text: "",
    render: "",
    width: 256,
    height: 256,
    correctLevel: 3,
    background: "#ffffff",
    foreground: "#000000"
  }, opt);

  // 使用QRCodeAlg创建二维码结构
  var qrCodeAlg = null;
  for (var i = 0, l = qrcodeAlgObjCache.length; i < l; i++) {
    if (qrcodeAlgObjCache[i].text == this.options.text && qrcodeAlgObjCache[i].text.correctLevel == this.options.correctLevel) {
      qrCodeAlg = qrcodeAlgObjCache[i].obj;
      break;
    }
  }
  if (i == l) {
    qrCodeAlg = new QRCodeAlg(this.options.text, this.options.correctLevel);
    qrcodeAlgObjCache.push({
      text: this.options.text,
      correctLevel: this.options.correctLevel,
      obj: qrCodeAlg
    });
  }

  if (this.options.render) {
    switch (this.options.render) {
      case "canvas":
        return this.createCanvas(qrCodeAlg);
      case "table":
        return this.createTable(qrCodeAlg);
      case "svg":
        return this.createSVG(qrCodeAlg);
      default:
        return this.createDefault(qrCodeAlg);
    }
  }
  return this.createDefault(qrCodeAlg);
};
/**
 * 使用Canvas来画二维码
 * @return {}
 */

QRCode.prototype.createDefault = function(qrCodeAlg) {
  var canvas = document.createElement('canvas');
  if (canvas.getContext)
    return this.createCanvas(qrCodeAlg);
  if (!!document.createElementNS && !!document.createElementNS(SVG_NS, 'svg').createSVGRect)
    return this.createSVG(qrCodeAlg);
  return this.createTable(qrCodeAlg);
};
QRCode.prototype.createCanvas = function(qrCodeAlg) {
  //创建canvas节点
  var canvas = document.createElement('canvas');
  canvas.width = this.options.width;
  canvas.height = this.options.height;
  var ctx = canvas.getContext('2d');

  //计算每个点的长宽
  var tileW = (this.options.width / qrCodeAlg.getModuleCount()).toPrecision(4);
  var tileH = this.options.height / qrCodeAlg.getModuleCount().toPrecision(4);

  //绘制
  for (var row = 0; row < qrCodeAlg.getModuleCount(); row++) {
    for (var col = 0; col < qrCodeAlg.getModuleCount(); col++) {
      ctx.fillStyle = qrCodeAlg.modules[row][col] ? this.options.foreground : this.options.background;
      var w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW));
      var h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW));
      ctx.fillRect(Math.round(col * tileW), Math.round(row * tileH), w, h);
    }
  }
  //返回绘制的节点
  return canvas;
};
/**
 * 使用table来绘制二维码
 * @return {}
 */
QRCode.prototype.createTable = function(qrCodeAlg) {
  //创建table节点
  var s = [];
  s.push('<table style="border:0px; margin:0px; padding:0px; border-collapse:collapse; background-color: ' +
  this.options.background +
  ';">');
  // 计算每个节点的长宽；取整，防止点之间出现分离
  var tileW = -1, tileH = -1, caculateW = -1, caculateH = -1;
  tileW = caculateW = Math.floor(this.options.width / qrCodeAlg.getModuleCount());
  tileH = caculateH = Math.floor(this.options.height / qrCodeAlg.getModuleCount());
  if (caculateW <= 0) {
    if (qrCodeAlg.getModuleCount() < 80) {
      tileW = 2;
    } else {
      tileW = 1;
    }
  }
  if (caculateH <= 0) {
    if (qrCodeAlg.getModuleCount() < 80) {
      tileH = 2;
    } else {
      tileH = 1;
    }
  }

  // 绘制二维码
  foreTd = '<td style="border:0px; margin:0px; padding:0px; width:' + tileW + 'px; background-color: ' + this.options.foreground + '"></td>',
    backTd = '<td style="border:0px; margin:0px; padding:0px; width:' + tileW + 'px; background-color: ' + this.options.background + '"></td>',
    l = qrCodeAlg.getModuleCount();

  for (var row = 0; row < l; row++) {
    s.push('<tr style="border:0px; margin:0px; padding:0px; height: ' + tileH + 'px">');
    for (var col = 0; col < l; col++) {
      s.push(qrCodeAlg.modules[row][col] ? foreTd : backTd);
    }
    s.push('</tr>');
  }
  s.push('</table>');
  var span = document.createElement("span");
  span.innerHTML = s.join('');

  return span.firstChild;
};

/**
 * 使用SVG开绘制二维码
 * @return {}
 */
QRCode.prototype.createSVG = function(qrCodeAlg) {
  var x, dx, y, dy,
    moduleCount = qrCodeAlg.getModuleCount(),
    scale = this.options.height / this.options.width,
    svg = '<svg xmlns="http://www.w3.org/2000/svg" '
      + 'width="' + this.options.width + 'px" height="' + this.options.height + 'px" '
      + 'viewbox="0 0 ' + moduleCount * 10 + ' ' + moduleCount * 10 * scale + '">',
    rectHead = '<path ',
    foreRect = ' style="stroke-width:0.5;stroke:' + this.options.foreground
      + ';fill:' + this.options.foreground + ';"></path>',
    backRect = ' style="stroke-width:0.5;stroke:' + this.options.background
      + ';fill:' + this.options.background + ';"></path>';

  // draw in the svg
  for (var row = 0; row < moduleCount; row++) {
    for (var col = 0; col < moduleCount; col++) {
      x = col * 10;
      y = row * 10 * scale;
      dx = (col + 1) * 10;
      dy = (row + 1) * 10 * scale;

      svg += rectHead + 'd="M ' + x + ',' + y
      + ' L ' + dx + ',' + y
      + ' L ' + dx + ',' + dy
      + ' L ' + x + ',' + dy
      + ' Z"';

      svg += qrCodeAlg.modules[row][col] ? foreRect : backRect;
    }
  }

  svg += '</svg>';

  // return just built svg
  return $(svg)[0];
};

/**
 * 获取单个字符的utf8编码
 * unicode BMP平面约65535个字符
 * @param {num} code
 * return {array}
 */
function unicodeFormat8(code) {
  // 1 byte
  if (code < 128) {
    return [code];
    // 2 bytes
  } else if (code < 2048) {
    c0 = 192 + (code >> 6);
    c1 = 128 + (code & 63);
    return [c0, c1];
    // 3 bytes
  } else {
    c0 = 224 + (code >> 12);
    c1 = 128 + (code >> 6 & 63);
    c2 = 128 + (code & 63);
    return [c0, c1, c2];
  }
}

/**
 * 获取字符串的utf8编码字节串
 * @param {string} string
 * @return {array}
 */
function getUTF8Bytes(string) {
  var utf8codes = [];
  for (var i = 0; i < string.length; i++) {
    var code = string.charCodeAt(i);
    var utf8 = unicodeFormat8(code);
    for (var j = 0; j < utf8.length; j++) {
      utf8codes.push(utf8[j]);
    }
  }
  return utf8codes;
}

/**
 * 二维码算法实现
 * @param {string} data              要编码的信息字符串
 * @param {num} errorCorrectLevel 纠错等级
 */
function QRCodeAlg(data, errorCorrectLevel) {
  this.typeNumber = -1; // 版本
  this.errorCorrectLevel = errorCorrectLevel;
  this.modules = null;  // 二维矩阵，存放最终结果
  this.moduleCount = 0; // 矩阵大小
  this.dataCache = null; // 数据缓存
  this.rsBlocks = null; // 版本数据信息
  this.totalDataCount = -1; // 可使用的数据量
  this.data = data;
  this.utf8bytes = getUTF8Bytes(data);
  this.make();
}

QRCodeAlg.prototype = {
  constructor: QRCodeAlg,
  /**
   * 获取二维码矩阵大小
   * @return {num} 矩阵大小
   */
  getModuleCount: function() {
    return this.moduleCount;
  },
  /**
   * 编码
   */
  make: function() {
    this.getRightType();
    this.dataCache = this.createData();
    this.createQrcode();
  },
  /**
   * 设置二位矩阵功能图形
   * @param  {bool} test 表示是否在寻找最好掩膜阶段
   * @param  {num} maskPattern 掩膜的版本
   */
  makeImpl: function(maskPattern) {

    this.moduleCount = this.typeNumber * 4 + 17;
    this.modules = new Array(this.moduleCount);

    for (var row = 0; row < this.moduleCount; row++) {

      this.modules[row] = new Array(this.moduleCount);

    }
    this.setupPositionProbePattern(0, 0);
    this.setupPositionProbePattern(this.moduleCount - 7, 0);
    this.setupPositionProbePattern(0, this.moduleCount - 7);
    this.setupPositionAdjustPattern();
    this.setupTimingPattern();
    this.setupTypeInfo(true, maskPattern);

    if (this.typeNumber >= 7) {
      this.setupTypeNumber(true);
    }
    this.mapData(this.dataCache, maskPattern);
  },
  /**
   * 设置二维码的位置探测图形
   * @param  {num} row 探测图形的中心横坐标
   * @param  {num} col 探测图形的中心纵坐标
   */
  setupPositionProbePattern: function(row, col) {

    for (var r = -1; r <= 7; r++) {

      if (row + r <= -1 || this.moduleCount <= row + r) continue;

      for (var c = -1; c <= 7; c++) {

        if (col + c <= -1 || this.moduleCount <= col + c) continue;

        if ((0 <= r && r <= 6 && (c == 0 || c == 6)) || (0 <= c && c <= 6 && (r == 0 || r == 6)) || (2 <= r && r <= 4 && 2 <= c && c <= 4)) {
          this.modules[row + r][col + c] = true;
        } else {
          this.modules[row + r][col + c] = false;
        }
      }
    }
  },
  /**
   * 创建二维码
   * @return {[type]} [description]
   */
  createQrcode: function() {

    var minLostPoint = 0;
    var pattern = 0;
    var bestModules = null;

    for (var i = 0; i < 8; i++) {

      this.makeImpl(i);

      var lostPoint = QRUtil.getLostPoint(this);
      if (i == 0 || minLostPoint > lostPoint) {
        minLostPoint = lostPoint;
        pattern = i;
        bestModules = this.modules;
      }
    }
    this.modules = bestModules;
    this.setupTypeInfo(false, pattern);

    if (this.typeNumber >= 7) {
      this.setupTypeNumber(false);
    }

  },
  /**
   * 设置定位图形
   * @return {[type]} [description]
   */
  setupTimingPattern: function() {

    for (var r = 8; r < this.moduleCount - 8; r++) {
      if (this.modules[r][6] != null) {
        continue;
      }
      this.modules[r][6] = (r % 2 == 0);

      if (this.modules[6][r] != null) {
        continue;
      }
      this.modules[6][r] = (r % 2 == 0);
    }
  },
  /**
   * 设置矫正图形
   * @return {[type]} [description]
   */
  setupPositionAdjustPattern: function() {

    var pos = QRUtil.getPatternPosition(this.typeNumber);

    for (var i = 0; i < pos.length; i++) {

      for (var j = 0; j < pos.length; j++) {

        var row = pos[i];
        var col = pos[j];

        if (this.modules[row][col] != null) {
          continue;
        }

        for (var r = -2; r <= 2; r++) {

          for (var c = -2; c <= 2; c++) {

            if (r == -2 || r == 2 || c == -2 || c == 2 || (r == 0 && c == 0)) {
              this.modules[row + r][col + c] = true;
            } else {
              this.modules[row + r][col + c] = false;
            }
          }
        }
      }
    }
  },
  /**
   * 设置版本信息（7以上版本才有）
   * @param  {bool} test 是否处于判断最佳掩膜阶段
   * @return {[type]}      [description]
   */
  setupTypeNumber: function(test) {

    var bits = QRUtil.getBCHTypeNumber(this.typeNumber);

    for (var i = 0; i < 18; i++) {
      var mod = (!test && ((bits >> i) & 1) == 1);
      this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
      this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
    }
  },
  /**
   * 设置格式信息（纠错等级和掩膜版本）
   * @param  {bool} test
   * @param  {num} maskPattern 掩膜版本
   * @return {}
   */
  setupTypeInfo: function(test, maskPattern) {

    var data = (QRErrorCorrectLevel[this.errorCorrectLevel] << 3) | maskPattern;
    var bits = QRUtil.getBCHTypeInfo(data);

    // vertical
    for (var i = 0; i < 15; i++) {

      var mod = (!test && ((bits >> i) & 1) == 1);

      if (i < 6) {
        this.modules[i][8] = mod;
      } else if (i < 8) {
        this.modules[i + 1][8] = mod;
      } else {
        this.modules[this.moduleCount - 15 + i][8] = mod;
      }

      // horizontal
      var mod = (!test && ((bits >> i) & 1) == 1);

      if (i < 8) {
        this.modules[8][this.moduleCount - i - 1] = mod;
      } else if (i < 9) {
        this.modules[8][15 - i - 1 + 1] = mod;
      } else {
        this.modules[8][15 - i - 1] = mod;
      }
    }

    // fixed module
    this.modules[this.moduleCount - 8][8] = (!test);

  },
  /**
   * 数据编码
   * @return {[type]} [description]
   */
  createData: function() {
    var buffer = new QRBitBuffer();
    var lengthBits = this.typeNumber > 9 ? 16 : 8;
    buffer.put(4, 4); //添加模式
    buffer.put(this.utf8bytes.length, lengthBits);
    for (var i = 0, l = this.utf8bytes.length; i < l; i++) {
      buffer.put(this.utf8bytes[i], 8);
    }
    if (buffer.length + 4 <= this.totalDataCount * 8) {
      buffer.put(0, 4);
    }

    // padding
    while (buffer.length % 8 != 0) {
      buffer.putBit(false);
    }

    // padding
    while (true) {

      if (buffer.length >= this.totalDataCount * 8) {
        break;
      }
      buffer.put(QRCodeAlg.PAD0, 8);

      if (buffer.length >= this.totalDataCount * 8) {
        break;
      }
      buffer.put(QRCodeAlg.PAD1, 8);
    }
    return this.createBytes(buffer);
  },
  /**
   * 纠错码编码
   * @param  {buffer} buffer 数据编码
   * @return {[type]}
   */
  createBytes: function(buffer) {

    var offset = 0;

    var maxDcCount = 0;
    var maxEcCount = 0;

    var length = this.rsBlock.length / 3;

    var rsBlocks = new Array();

    for (var i = 0; i < length; i++) {

      var count = this.rsBlock[i * 3 + 0];
      var totalCount = this.rsBlock[i * 3 + 1];
      var dataCount = this.rsBlock[i * 3 + 2];

      for (var j = 0; j < count; j++) {
        rsBlocks.push([dataCount, totalCount]);
      }
    }

    var dcdata = new Array(rsBlocks.length);
    var ecdata = new Array(rsBlocks.length);

    for (var r = 0; r < rsBlocks.length; r++) {

      var dcCount = rsBlocks[r][0];
      var ecCount = rsBlocks[r][1] - dcCount;

      maxDcCount = Math.max(maxDcCount, dcCount);
      maxEcCount = Math.max(maxEcCount, ecCount);

      dcdata[r] = new Array(dcCount);

      for (var i = 0; i < dcdata[r].length; i++) {
        dcdata[r][i] = 0xff & buffer.buffer[i + offset];
      }
      offset += dcCount;

      var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
      var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);

      var modPoly = rawPoly.mod(rsPoly);
      ecdata[r] = new Array(rsPoly.getLength() - 1);
      for (var i = 0; i < ecdata[r].length; i++) {
        var modIndex = i + modPoly.getLength() - ecdata[r].length;
        ecdata[r][i] = (modIndex >= 0) ? modPoly.get(modIndex) : 0;
      }
    }

    var data = new Array(this.totalDataCount);
    var index = 0;

    for (var i = 0; i < maxDcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < dcdata[r].length) {
          data[index++] = dcdata[r][i];
        }
      }
    }

    for (var i = 0; i < maxEcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < ecdata[r].length) {
          data[index++] = ecdata[r][i];
        }
      }
    }

    return data;

  },
  /**
   * 布置模块，构建最终信息
   * @param  {} data
   * @param  {} maskPattern
   * @return {}
   */
  mapData: function(data, maskPattern) {

    var inc = -1;
    var row = this.moduleCount - 1;
    var bitIndex = 7;
    var byteIndex = 0;

    for (var col = this.moduleCount - 1; col > 0; col -= 2) {

      if (col == 6) col--;

      while (true) {

        for (var c = 0; c < 2; c++) {

          if (this.modules[row][col - c] == null) {

            var dark = false;

            if (byteIndex < data.length) {
              dark = (((data[byteIndex] >>> bitIndex) & 1) == 1);
            }

            var mask = QRUtil.getMask(maskPattern, row, col - c);

            if (mask) {
              dark = !dark;
            }

            this.modules[row][col - c] = dark;
            bitIndex--;

            if (bitIndex == -1) {
              byteIndex++;
              bitIndex = 7;
            }
          }
        }

        row += inc;

        if (row < 0 || this.moduleCount <= row) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }
  }

};
/**
 * 填充字段
 */
QRCodeAlg.PAD0 = 0xEC;
QRCodeAlg.PAD1 = 0x11;


//---------------------------------------------------------------------
// 纠错等级对应的编码
//---------------------------------------------------------------------

var QRErrorCorrectLevel = [1, 0, 3, 2];

//---------------------------------------------------------------------
// 掩膜版本
//---------------------------------------------------------------------

var QRMaskPattern = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
};

//---------------------------------------------------------------------
// 工具类
//---------------------------------------------------------------------

var QRUtil = {

  /*
   每个版本矫正图形的位置
   */
  PATTERN_POSITION_TABLE: [
    [],
    [6, 18],
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50],
    [6, 30, 54],
    [6, 32, 58],
    [6, 34, 62],
    [6, 26, 46, 66],
    [6, 26, 48, 70],
    [6, 26, 50, 74],
    [6, 30, 54, 78],
    [6, 30, 56, 82],
    [6, 30, 58, 86],
    [6, 34, 62, 90],
    [6, 28, 50, 72, 94],
    [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102],
    [6, 28, 54, 80, 106],
    [6, 32, 58, 84, 110],
    [6, 30, 58, 86, 114],
    [6, 34, 62, 90, 118],
    [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126],
    [6, 26, 52, 78, 104, 130],
    [6, 30, 56, 82, 108, 134],
    [6, 34, 60, 86, 112, 138],
    [6, 30, 58, 86, 114, 142],
    [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150],
    [6, 24, 50, 76, 102, 128, 154],
    [6, 28, 54, 80, 106, 132, 158],
    [6, 32, 58, 84, 110, 136, 162],
    [6, 26, 54, 82, 110, 138, 166],
    [6, 30, 58, 86, 114, 142, 170]
  ],

  G15: (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
  G18: (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0),
  G15_MASK: (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1),

  /*
   BCH编码格式信息
   */
  getBCHTypeInfo: function(data) {
    var d = data << 10;
    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
      d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15)));
    }
    return ((data << 10) | d) ^ QRUtil.G15_MASK;
  },
  /*
   BCH编码版本信息
   */
  getBCHTypeNumber: function(data) {
    var d = data << 12;
    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
      d ^= (QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18)));
    }
    return (data << 12) | d;
  },
  /*
   获取BCH位信息
   */
  getBCHDigit: function(data) {

    var digit = 0;

    while (data != 0) {
      digit++;
      data >>>= 1;
    }

    return digit;
  },
  /*
   获取版本对应的矫正图形位置
   */
  getPatternPosition: function(typeNumber) {
    return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
  },
  /*
   掩膜算法
   */
  getMask: function(maskPattern, i, j) {

    switch (maskPattern) {

      case QRMaskPattern.PATTERN000:
        return (i + j) % 2 == 0;
      case QRMaskPattern.PATTERN001:
        return i % 2 == 0;
      case QRMaskPattern.PATTERN010:
        return j % 3 == 0;
      case QRMaskPattern.PATTERN011:
        return (i + j) % 3 == 0;
      case QRMaskPattern.PATTERN100:
        return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
      case QRMaskPattern.PATTERN101:
        return (i * j) % 2 + (i * j) % 3 == 0;
      case QRMaskPattern.PATTERN110:
        return ((i * j) % 2 + (i * j) % 3) % 2 == 0;
      case QRMaskPattern.PATTERN111:
        return ((i * j) % 3 + (i + j) % 2) % 2 == 0;

      default:
        throw new Error("bad maskPattern:" + maskPattern);
    }
  },
  /*
   获取RS的纠错多项式
   */
  getErrorCorrectPolynomial: function(errorCorrectLength) {

    var a = new QRPolynomial([1], 0);

    for (var i = 0; i < errorCorrectLength; i++) {
      a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
    }

    return a;
  },
  /*
   获取评价
   */
  getLostPoint: function(qrCode) {

    var moduleCount = qrCode.getModuleCount(),
      lostPoint = 0,
      darkCount = 0;

    for (var row = 0; row < moduleCount; row++) {

      var sameCount = 0;
      var head = qrCode.modules[row][0];

      for (var col = 0; col < moduleCount; col++) {

        var current = qrCode.modules[row][col];

        //level 3 评价
        if (col < moduleCount - 6) {
          if (current && !qrCode.modules[row][col + 1] && qrCode.modules[row][col + 2] && qrCode.modules[row][col + 3] && qrCode.modules[row][col + 4] && !qrCode.modules[row][col + 5] && qrCode.modules[row][col + 6]) {
            if (col < moduleCount - 10) {
              if (qrCode.modules[row][col + 7] && qrCode.modules[row][col + 8] && qrCode.modules[row][col + 9] && qrCode.modules[row][col + 10]) {
                lostPoint += 40;
              }
            } else if (col > 3) {
              if (qrCode.modules[row][col - 1] && qrCode.modules[row][col - 2] && qrCode.modules[row][col - 3] && qrCode.modules[row][col - 4]) {
                lostPoint += 40;
              }
            }

          }
        }

        //level 2 评价
        if ((row < moduleCount - 1) && (col < moduleCount - 1)) {
          var count = 0;
          if (current) count++;
          if (qrCode.modules[row + 1][col]) count++;
          if (qrCode.modules[row][col + 1]) count++;
          if (qrCode.modules[row + 1][col + 1]) count++;
          if (count == 0 || count == 4) {
            lostPoint += 3;
          }
        }

        //level 1 评价
        if (head ^ current) {
          sameCount++;
        } else {
          head = current;
          if (sameCount >= 5) {
            lostPoint += (3 + sameCount - 5);
          }
          sameCount = 1;
        }

        //level 4 评价
        if (current) {
          darkCount++;
        }

      }
    }

    for (var col = 0; col < moduleCount; col++) {

      var sameCount = 0;
      var head = qrCode.modules[0][col];

      for (var row = 0; row < moduleCount; row++) {

        var current = qrCode.modules[row][col];

        //level 3 评价
        if (row < moduleCount - 6) {
          if (current && !qrCode.modules[row + 1][col] && qrCode.modules[row + 2][col] && qrCode.modules[row + 3][col] && qrCode.modules[row + 4][col] && !qrCode.modules[row + 5][col] && qrCode.modules[row + 6][col]) {
            if (row < moduleCount - 10) {
              if (qrCode.modules[row + 7][col] && qrCode.modules[row + 8][col] && qrCode.modules[row + 9][col] && qrCode.modules[row + 10][col]) {
                lostPoint += 40;
              }
            } else if (row > 3) {
              if (qrCode.modules[row - 1][col] && qrCode.modules[row - 2][col] && qrCode.modules[row - 3][col] && qrCode.modules[row - 4][col]) {
                lostPoint += 40;
              }
            }
          }
        }

        //level 1 评价
        if (head ^ current) {
          sameCount++;
        } else {
          head = current;
          if (sameCount >= 5) {
            lostPoint += (3 + sameCount - 5);
          }
          sameCount = 1;
        }

      }
    }

    // LEVEL4

    var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
    lostPoint += ratio * 10;

    return lostPoint;
  }

};


//---------------------------------------------------------------------
// QRMath使用的数学工具
//---------------------------------------------------------------------

var QRMath = {
  /*
   将n转化为a^m
   */
  glog: function(n) {

    if (n < 1) {
      throw new Error("glog(" + n + ")");
    }

    return QRMath.LOG_TABLE[n];
  },
  /*
   将a^m转化为n
   */
  gexp: function(n) {

    while (n < 0) {
      n += 255;
    }

    while (n >= 256) {
      n -= 255;
    }

    return QRMath.EXP_TABLE[n];
  },

  EXP_TABLE: new Array(256),

  LOG_TABLE: new Array(256)

};

for (var i = 0; i < 8; i++) {
  QRMath.EXP_TABLE[i] = 1 << i;
}
for (var i = 8; i < 256; i++) {
  QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
}
for (var i = 0; i < 255; i++) {
  QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
}

//---------------------------------------------------------------------
// QRPolynomial 多项式
//---------------------------------------------------------------------
/**
 * 多项式类
 * @param {Array} num   系数
 * @param {num} shift a^shift
 */
function QRPolynomial(num, shift) {

  if (num.length == undefined) {
    throw new Error(num.length + "/" + shift);
  }

  var offset = 0;

  while (offset < num.length && num[offset] == 0) {
    offset++;
  }

  this.num = new Array(num.length - offset + shift);
  for (var i = 0; i < num.length - offset; i++) {
    this.num[i] = num[i + offset];
  }
}

QRPolynomial.prototype = {

  get: function(index) {
    return this.num[index];
  },

  getLength: function() {
    return this.num.length;
  },
  /**
   * 多项式乘法
   * @param  {QRPolynomial} e 被乘多项式
   * @return {[type]}   [description]
   */
  multiply: function(e) {

    var num = new Array(this.getLength() + e.getLength() - 1);

    for (var i = 0; i < this.getLength(); i++) {
      for (var j = 0; j < e.getLength(); j++) {
        num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
      }
    }

    return new QRPolynomial(num, 0);
  },
  /**
   * 多项式模运算
   * @param  {QRPolynomial} e 模多项式
   * @return {}
   */
  mod: function(e) {
    var tl = this.getLength(),
      el = e.getLength();
    if (tl - el < 0) {
      return this;
    }
    var num = new Array(tl);
    for (var i = 0; i < tl; i++) {
      num[i] = this.get(i);
    }
    while (num.length >= el) {
      var ratio = QRMath.glog(num[0]) - QRMath.glog(e.get(0));

      for (var i = 0; i < e.getLength(); i++) {
        num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
      }
      while (num[0] == 0) {
        num.shift();
      }
    }
    return new QRPolynomial(num, 0);
  }
};

//---------------------------------------------------------------------
// RS_BLOCK_TABLE
//---------------------------------------------------------------------
/*
 二维码各个版本信息[块数, 每块中的数据块数, 每块中的信息块数]
 */
var RS_BLOCK_TABLE = [

  // L
  // M
  // Q
  // H

  // 1
  [1, 26, 19],
  [1, 26, 16],
  [1, 26, 13],
  [1, 26, 9],

  // 2
  [1, 44, 34],
  [1, 44, 28],
  [1, 44, 22],
  [1, 44, 16],

  // 3
  [1, 70, 55],
  [1, 70, 44],
  [2, 35, 17],
  [2, 35, 13],

  // 4
  [1, 100, 80],
  [2, 50, 32],
  [2, 50, 24],
  [4, 25, 9],

  // 5
  [1, 134, 108],
  [2, 67, 43],
  [2, 33, 15, 2, 34, 16],
  [2, 33, 11, 2, 34, 12],

  // 6
  [2, 86, 68],
  [4, 43, 27],
  [4, 43, 19],
  [4, 43, 15],

  // 7
  [2, 98, 78],
  [4, 49, 31],
  [2, 32, 14, 4, 33, 15],
  [4, 39, 13, 1, 40, 14],

  // 8
  [2, 121, 97],
  [2, 60, 38, 2, 61, 39],
  [4, 40, 18, 2, 41, 19],
  [4, 40, 14, 2, 41, 15],

  // 9
  [2, 146, 116],
  [3, 58, 36, 2, 59, 37],
  [4, 36, 16, 4, 37, 17],
  [4, 36, 12, 4, 37, 13],

  // 10
  [2, 86, 68, 2, 87, 69],
  [4, 69, 43, 1, 70, 44],
  [6, 43, 19, 2, 44, 20],
  [6, 43, 15, 2, 44, 16],

  // 11
  [4, 101, 81],
  [1, 80, 50, 4, 81, 51],
  [4, 50, 22, 4, 51, 23],
  [3, 36, 12, 8, 37, 13],

  // 12
  [2, 116, 92, 2, 117, 93],
  [6, 58, 36, 2, 59, 37],
  [4, 46, 20, 6, 47, 21],
  [7, 42, 14, 4, 43, 15],

  // 13
  [4, 133, 107],
  [8, 59, 37, 1, 60, 38],
  [8, 44, 20, 4, 45, 21],
  [12, 33, 11, 4, 34, 12],

  // 14
  [3, 145, 115, 1, 146, 116],
  [4, 64, 40, 5, 65, 41],
  [11, 36, 16, 5, 37, 17],
  [11, 36, 12, 5, 37, 13],

  // 15
  [5, 109, 87, 1, 110, 88],
  [5, 65, 41, 5, 66, 42],
  [5, 54, 24, 7, 55, 25],
  [11, 36, 12],

  // 16
  [5, 122, 98, 1, 123, 99],
  [7, 73, 45, 3, 74, 46],
  [15, 43, 19, 2, 44, 20],
  [3, 45, 15, 13, 46, 16],

  // 17
  [1, 135, 107, 5, 136, 108],
  [10, 74, 46, 1, 75, 47],
  [1, 50, 22, 15, 51, 23],
  [2, 42, 14, 17, 43, 15],

  // 18
  [5, 150, 120, 1, 151, 121],
  [9, 69, 43, 4, 70, 44],
  [17, 50, 22, 1, 51, 23],
  [2, 42, 14, 19, 43, 15],

  // 19
  [3, 141, 113, 4, 142, 114],
  [3, 70, 44, 11, 71, 45],
  [17, 47, 21, 4, 48, 22],
  [9, 39, 13, 16, 40, 14],

  // 20
  [3, 135, 107, 5, 136, 108],
  [3, 67, 41, 13, 68, 42],
  [15, 54, 24, 5, 55, 25],
  [15, 43, 15, 10, 44, 16],

  // 21
  [4, 144, 116, 4, 145, 117],
  [17, 68, 42],
  [17, 50, 22, 6, 51, 23],
  [19, 46, 16, 6, 47, 17],

  // 22
  [2, 139, 111, 7, 140, 112],
  [17, 74, 46],
  [7, 54, 24, 16, 55, 25],
  [34, 37, 13],

  // 23
  [4, 151, 121, 5, 152, 122],
  [4, 75, 47, 14, 76, 48],
  [11, 54, 24, 14, 55, 25],
  [16, 45, 15, 14, 46, 16],

  // 24
  [6, 147, 117, 4, 148, 118],
  [6, 73, 45, 14, 74, 46],
  [11, 54, 24, 16, 55, 25],
  [30, 46, 16, 2, 47, 17],

  // 25
  [8, 132, 106, 4, 133, 107],
  [8, 75, 47, 13, 76, 48],
  [7, 54, 24, 22, 55, 25],
  [22, 45, 15, 13, 46, 16],

  // 26
  [10, 142, 114, 2, 143, 115],
  [19, 74, 46, 4, 75, 47],
  [28, 50, 22, 6, 51, 23],
  [33, 46, 16, 4, 47, 17],

  // 27
  [8, 152, 122, 4, 153, 123],
  [22, 73, 45, 3, 74, 46],
  [8, 53, 23, 26, 54, 24],
  [12, 45, 15, 28, 46, 16],

  // 28
  [3, 147, 117, 10, 148, 118],
  [3, 73, 45, 23, 74, 46],
  [4, 54, 24, 31, 55, 25],
  [11, 45, 15, 31, 46, 16],

  // 29
  [7, 146, 116, 7, 147, 117],
  [21, 73, 45, 7, 74, 46],
  [1, 53, 23, 37, 54, 24],
  [19, 45, 15, 26, 46, 16],

  // 30
  [5, 145, 115, 10, 146, 116],
  [19, 75, 47, 10, 76, 48],
  [15, 54, 24, 25, 55, 25],
  [23, 45, 15, 25, 46, 16],

  // 31
  [13, 145, 115, 3, 146, 116],
  [2, 74, 46, 29, 75, 47],
  [42, 54, 24, 1, 55, 25],
  [23, 45, 15, 28, 46, 16],

  // 32
  [17, 145, 115],
  [10, 74, 46, 23, 75, 47],
  [10, 54, 24, 35, 55, 25],
  [19, 45, 15, 35, 46, 16],

  // 33
  [17, 145, 115, 1, 146, 116],
  [14, 74, 46, 21, 75, 47],
  [29, 54, 24, 19, 55, 25],
  [11, 45, 15, 46, 46, 16],

  // 34
  [13, 145, 115, 6, 146, 116],
  [14, 74, 46, 23, 75, 47],
  [44, 54, 24, 7, 55, 25],
  [59, 46, 16, 1, 47, 17],

  // 35
  [12, 151, 121, 7, 152, 122],
  [12, 75, 47, 26, 76, 48],
  [39, 54, 24, 14, 55, 25],
  [22, 45, 15, 41, 46, 16],

  // 36
  [6, 151, 121, 14, 152, 122],
  [6, 75, 47, 34, 76, 48],
  [46, 54, 24, 10, 55, 25],
  [2, 45, 15, 64, 46, 16],

  // 37
  [17, 152, 122, 4, 153, 123],
  [29, 74, 46, 14, 75, 47],
  [49, 54, 24, 10, 55, 25],
  [24, 45, 15, 46, 46, 16],

  // 38
  [4, 152, 122, 18, 153, 123],
  [13, 74, 46, 32, 75, 47],
  [48, 54, 24, 14, 55, 25],
  [42, 45, 15, 32, 46, 16],

  // 39
  [20, 147, 117, 4, 148, 118],
  [40, 75, 47, 7, 76, 48],
  [43, 54, 24, 22, 55, 25],
  [10, 45, 15, 67, 46, 16],

  // 40
  [19, 148, 118, 6, 149, 119],
  [18, 75, 47, 31, 76, 48],
  [34, 54, 24, 34, 55, 25],
  [20, 45, 15, 61, 46, 16]
];

/**
 * 根据数据获取对应版本
 * @return {[type]} [description]
 */
QRCodeAlg.prototype.getRightType = function() {
  for (var typeNumber = 1; typeNumber < 41; typeNumber++) {
    var rsBlock = RS_BLOCK_TABLE[(typeNumber - 1) * 4 + this.errorCorrectLevel];
    if (rsBlock == undefined) {
      throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + this.errorCorrectLevel);
    }
    var length = rsBlock.length / 3;
    var totalDataCount = 0;
    for (var i = 0; i < length; i++) {
      var count = rsBlock[i * 3 + 0];
      var dataCount = rsBlock[i * 3 + 2];
      totalDataCount += dataCount * count;
    }

    var lengthBytes = typeNumber > 9 ? 2 : 1;
    if (this.utf8bytes.length + lengthBytes < totalDataCount || typeNumber == 40) {
      this.typeNumber = typeNumber;
      this.rsBlock = rsBlock;
      this.totalDataCount = totalDataCount;
      break;
    }
  }
};

//---------------------------------------------------------------------
// QRBitBuffer
//---------------------------------------------------------------------

function QRBitBuffer() {
  this.buffer = new Array();
  this.length = 0;
}

QRBitBuffer.prototype = {

  get: function(index) {
    var bufIndex = Math.floor(index / 8);
    return ((this.buffer[bufIndex] >>> (7 - index % 8)) & 1);
  },

  put: function(num, length) {
    for (var i = 0; i < length; i++) {
      this.putBit(((num >>> (length - i - 1)) & 1));
    }
  },

  putBit: function(bit) {

    var bufIndex = Math.floor(this.length / 8);
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0);
    }

    if (bit) {
      this.buffer[bufIndex] |= (0x80 >>> (this.length % 8));
    }

    this.length++;
  }
};
/**
 * 获取单个字符的utf8编码
 * unicode BMP平面约65535个字符
 * @param {num} code
 * return {array}
 */
function unicodeFormat8(code) {
  // 1 byte
  if (code < 128) {
    return [code];
    // 2 bytes
  } else if (code < 2048) {
    c0 = 192 + (code >> 6);
    c1 = 128 + (code & 63);
    return [c0, c1];
    // 3 bytes
  } else {
    c0 = 224 + (code >> 12);
    c1 = 128 + (code >> 6 & 63);
    c2 = 128 + (code & 63);
    return [c0, c1, c2];
  }
}

/**
 * 获取字符串的utf8编码字节串
 * @param {string} string
 * @return {array}
 */
function getUTF8Bytes(string) {
  var utf8codes = [];
  for (var i = 0; i < string.length; i++) {
    var code = string.charCodeAt(i);
    var utf8 = unicodeFormat8(code);
    for (var j = 0; j < utf8.length; j++) {
      utf8codes.push(utf8[j]);
    }
  }
  return utf8codes;
}

/**
 * 二维码算法实现
 * @param {string} data              要编码的信息字符串
 * @param {num} errorCorrectLevel 纠错等级
 */
function QRCodeAlg(data, errorCorrectLevel) {
  this.typeNumber = -1; //版本
  this.errorCorrectLevel = errorCorrectLevel;
  this.modules = null;  //二维矩阵，存放最终结果
  this.moduleCount = 0; //矩阵大小
  this.dataCache = null; //数据缓存
  this.rsBlocks = null; //版本数据信息
  this.totalDataCount = -1; //可使用的数据量
  this.data = data;
  this.utf8bytes = getUTF8Bytes(data);
  this.make();
}

QRCodeAlg.prototype = {
  constructor: QRCodeAlg,
  /**
   * 获取二维码矩阵大小
   * @return {num} 矩阵大小
   */
  getModuleCount: function() {
    return this.moduleCount;
  },
  /**
   * 编码
   */
  make: function() {
    this.getRightType();
    this.dataCache = this.createData();
    this.createQrcode();
  },
  /**
   * 设置二位矩阵功能图形
   * @param  {bool} test 表示是否在寻找最好掩膜阶段
   * @param  {num} maskPattern 掩膜的版本
   */
  makeImpl: function(maskPattern) {

    this.moduleCount = this.typeNumber * 4 + 17;
    this.modules = new Array(this.moduleCount);

    for (var row = 0; row < this.moduleCount; row++) {

      this.modules[row] = new Array(this.moduleCount);

    }
    this.setupPositionProbePattern(0, 0);
    this.setupPositionProbePattern(this.moduleCount - 7, 0);
    this.setupPositionProbePattern(0, this.moduleCount - 7);
    this.setupPositionAdjustPattern();
    this.setupTimingPattern();
    this.setupTypeInfo(true, maskPattern);

    if (this.typeNumber >= 7) {
      this.setupTypeNumber(true);
    }
    this.mapData(this.dataCache, maskPattern);
  },
  /**
   * 设置二维码的位置探测图形
   * @param  {num} row 探测图形的中心横坐标
   * @param  {num} col 探测图形的中心纵坐标
   */
  setupPositionProbePattern: function(row, col) {

    for (var r = -1; r <= 7; r++) {

      if (row + r <= -1 || this.moduleCount <= row + r) continue;

      for (var c = -1; c <= 7; c++) {

        if (col + c <= -1 || this.moduleCount <= col + c) continue;

        if ((0 <= r && r <= 6 && (c == 0 || c == 6)) || (0 <= c && c <= 6 && (r == 0 || r == 6)) || (2 <= r && r <= 4 && 2 <= c && c <= 4)) {
          this.modules[row + r][col + c] = true;
        } else {
          this.modules[row + r][col + c] = false;
        }
      }
    }
  },
  /**
   * 创建二维码
   * @return {[type]} [description]
   */
  createQrcode: function() {

    var minLostPoint = 0;
    var pattern = 0;
    var bestModules = null;

    for (var i = 0; i < 8; i++) {

      this.makeImpl(i);

      var lostPoint = QRUtil.getLostPoint(this);
      if (i == 0 || minLostPoint > lostPoint) {
        minLostPoint = lostPoint;
        pattern = i;
        bestModules = this.modules;
      }
    }
    this.modules = bestModules;
    this.setupTypeInfo(false, pattern);

    if (this.typeNumber >= 7) {
      this.setupTypeNumber(false);
    }

  },
  /**
   * 设置定位图形
   * @return {[type]} [description]
   */
  setupTimingPattern: function() {

    for (var r = 8; r < this.moduleCount - 8; r++) {
      if (this.modules[r][6] != null) {
        continue;
      }
      this.modules[r][6] = (r % 2 == 0);

      if (this.modules[6][r] != null) {
        continue;
      }
      this.modules[6][r] = (r % 2 == 0);
    }
  },
  /**
   * 设置矫正图形
   * @return {[type]} [description]
   */
  setupPositionAdjustPattern: function() {

    var pos = QRUtil.getPatternPosition(this.typeNumber);

    for (var i = 0; i < pos.length; i++) {

      for (var j = 0; j < pos.length; j++) {

        var row = pos[i];
        var col = pos[j];

        if (this.modules[row][col] != null) {
          continue;
        }

        for (var r = -2; r <= 2; r++) {

          for (var c = -2; c <= 2; c++) {

            if (r == -2 || r == 2 || c == -2 || c == 2 || (r == 0 && c == 0)) {
              this.modules[row + r][col + c] = true;
            } else {
              this.modules[row + r][col + c] = false;
            }
          }
        }
      }
    }
  },
  /**
   * 设置版本信息（7以上版本才有）
   * @param  {bool} test 是否处于判断最佳掩膜阶段
   * @return {[type]}      [description]
   */
  setupTypeNumber: function(test) {

    var bits = QRUtil.getBCHTypeNumber(this.typeNumber);

    for (var i = 0; i < 18; i++) {
      var mod = (!test && ((bits >> i) & 1) == 1);
      this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
      this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
    }
  },
  /**
   * 设置格式信息（纠错等级和掩膜版本）
   * @param  {bool} test
   * @param  {num} maskPattern 掩膜版本
   * @return {}
   */
  setupTypeInfo: function(test, maskPattern) {

    var data = (QRErrorCorrectLevel[this.errorCorrectLevel] << 3) | maskPattern;
    var bits = QRUtil.getBCHTypeInfo(data);

    // vertical
    for (var i = 0; i < 15; i++) {

      var mod = (!test && ((bits >> i) & 1) == 1);

      if (i < 6) {
        this.modules[i][8] = mod;
      } else if (i < 8) {
        this.modules[i + 1][8] = mod;
      } else {
        this.modules[this.moduleCount - 15 + i][8] = mod;
      }

      // horizontal
      var mod = (!test && ((bits >> i) & 1) == 1);

      if (i < 8) {
        this.modules[8][this.moduleCount - i - 1] = mod;
      } else if (i < 9) {
        this.modules[8][15 - i - 1 + 1] = mod;
      } else {
        this.modules[8][15 - i - 1] = mod;
      }
    }

    // fixed module
    this.modules[this.moduleCount - 8][8] = (!test);

  },
  /**
   * 数据编码
   * @return {[type]} [description]
   */
  createData: function() {
    var buffer = new QRBitBuffer();
    var lengthBits = this.typeNumber > 9 ? 16 : 8;
    buffer.put(4, 4); //添加模式
    buffer.put(this.utf8bytes.length, lengthBits);
    for (var i = 0, l = this.utf8bytes.length; i < l; i++) {
      buffer.put(this.utf8bytes[i], 8);
    }
    if (buffer.length + 4 <= this.totalDataCount * 8) {
      buffer.put(0, 4);
    }

    // padding
    while (buffer.length % 8 != 0) {
      buffer.putBit(false);
    }

    // padding
    while (true) {

      if (buffer.length >= this.totalDataCount * 8) {
        break;
      }
      buffer.put(QRCodeAlg.PAD0, 8);

      if (buffer.length >= this.totalDataCount * 8) {
        break;
      }
      buffer.put(QRCodeAlg.PAD1, 8);
    }
    return this.createBytes(buffer);
  },
  /**
   * 纠错码编码
   * @param  {buffer} buffer 数据编码
   * @return {[type]}
   */
  createBytes: function(buffer) {

    var offset = 0;

    var maxDcCount = 0;
    var maxEcCount = 0;

    var length = this.rsBlock.length / 3;

    var rsBlocks = new Array();

    for (var i = 0; i < length; i++) {

      var count = this.rsBlock[i * 3 + 0];
      var totalCount = this.rsBlock[i * 3 + 1];
      var dataCount = this.rsBlock[i * 3 + 2];

      for (var j = 0; j < count; j++) {
        rsBlocks.push([dataCount, totalCount]);
      }
    }

    var dcdata = new Array(rsBlocks.length);
    var ecdata = new Array(rsBlocks.length);

    for (var r = 0; r < rsBlocks.length; r++) {

      var dcCount = rsBlocks[r][0];
      var ecCount = rsBlocks[r][1] - dcCount;

      maxDcCount = Math.max(maxDcCount, dcCount);
      maxEcCount = Math.max(maxEcCount, ecCount);

      dcdata[r] = new Array(dcCount);

      for (var i = 0; i < dcdata[r].length; i++) {
        dcdata[r][i] = 0xff & buffer.buffer[i + offset];
      }
      offset += dcCount;

      var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
      var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);

      var modPoly = rawPoly.mod(rsPoly);
      ecdata[r] = new Array(rsPoly.getLength() - 1);
      for (var i = 0; i < ecdata[r].length; i++) {
        var modIndex = i + modPoly.getLength() - ecdata[r].length;
        ecdata[r][i] = (modIndex >= 0) ? modPoly.get(modIndex) : 0;
      }
    }

    var data = new Array(this.totalDataCount);
    var index = 0;

    for (var i = 0; i < maxDcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < dcdata[r].length) {
          data[index++] = dcdata[r][i];
        }
      }
    }

    for (var i = 0; i < maxEcCount; i++) {
      for (var r = 0; r < rsBlocks.length; r++) {
        if (i < ecdata[r].length) {
          data[index++] = ecdata[r][i];
        }
      }
    }

    return data;

  },
  /**
   * 布置模块，构建最终信息
   * @param  {} data
   * @param  {} maskPattern
   * @return {}
   */
  mapData: function(data, maskPattern) {

    var inc = -1;
    var row = this.moduleCount - 1;
    var bitIndex = 7;
    var byteIndex = 0;

    for (var col = this.moduleCount - 1; col > 0; col -= 2) {

      if (col == 6) col--;

      while (true) {

        for (var c = 0; c < 2; c++) {

          if (this.modules[row][col - c] == null) {

            var dark = false;

            if (byteIndex < data.length) {
              dark = (((data[byteIndex] >>> bitIndex) & 1) == 1);
            }

            var mask = QRUtil.getMask(maskPattern, row, col - c);

            if (mask) {
              dark = !dark;
            }

            this.modules[row][col - c] = dark;
            bitIndex--;

            if (bitIndex == -1) {
              byteIndex++;
              bitIndex = 7;
            }
          }
        }

        row += inc;

        if (row < 0 || this.moduleCount <= row) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }
  }

};
/**
 * 填充字段
 */
QRCodeAlg.PAD0 = 0xEC;
QRCodeAlg.PAD1 = 0x11;


//---------------------------------------------------------------------
// 纠错等级对应的编码
//---------------------------------------------------------------------

var QRErrorCorrectLevel = [1, 0, 3, 2];

//---------------------------------------------------------------------
// 掩膜版本
//---------------------------------------------------------------------

var QRMaskPattern = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
};

//---------------------------------------------------------------------
// 工具类
//---------------------------------------------------------------------

var QRUtil = {

  /*
   每个版本矫正图形的位置
   */
  PATTERN_POSITION_TABLE: [
    [],
    [6, 18],
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50],
    [6, 30, 54],
    [6, 32, 58],
    [6, 34, 62],
    [6, 26, 46, 66],
    [6, 26, 48, 70],
    [6, 26, 50, 74],
    [6, 30, 54, 78],
    [6, 30, 56, 82],
    [6, 30, 58, 86],
    [6, 34, 62, 90],
    [6, 28, 50, 72, 94],
    [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102],
    [6, 28, 54, 80, 106],
    [6, 32, 58, 84, 110],
    [6, 30, 58, 86, 114],
    [6, 34, 62, 90, 118],
    [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126],
    [6, 26, 52, 78, 104, 130],
    [6, 30, 56, 82, 108, 134],
    [6, 34, 60, 86, 112, 138],
    [6, 30, 58, 86, 114, 142],
    [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150],
    [6, 24, 50, 76, 102, 128, 154],
    [6, 28, 54, 80, 106, 132, 158],
    [6, 32, 58, 84, 110, 136, 162],
    [6, 26, 54, 82, 110, 138, 166],
    [6, 30, 58, 86, 114, 142, 170]
  ],

  G15: (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
  G18: (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0),
  G15_MASK: (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1),

  /*
   BCH编码格式信息
   */
  getBCHTypeInfo: function(data) {
    var d = data << 10;
    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
      d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15)));
    }
    return ((data << 10) | d) ^ QRUtil.G15_MASK;
  },
  /*
   BCH编码版本信息
   */
  getBCHTypeNumber: function(data) {
    var d = data << 12;
    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
      d ^= (QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18)));
    }
    return (data << 12) | d;
  },
  /*
   获取BCH位信息
   */
  getBCHDigit: function(data) {

    var digit = 0;

    while (data != 0) {
      digit++;
      data >>>= 1;
    }

    return digit;
  },
  /*
   获取版本对应的矫正图形位置
   */
  getPatternPosition: function(typeNumber) {
    return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
  },
  /*
   掩膜算法
   */
  getMask: function(maskPattern, i, j) {

    switch (maskPattern) {

      case QRMaskPattern.PATTERN000:
        return (i + j) % 2 == 0;
      case QRMaskPattern.PATTERN001:
        return i % 2 == 0;
      case QRMaskPattern.PATTERN010:
        return j % 3 == 0;
      case QRMaskPattern.PATTERN011:
        return (i + j) % 3 == 0;
      case QRMaskPattern.PATTERN100:
        return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
      case QRMaskPattern.PATTERN101:
        return (i * j) % 2 + (i * j) % 3 == 0;
      case QRMaskPattern.PATTERN110:
        return ((i * j) % 2 + (i * j) % 3) % 2 == 0;
      case QRMaskPattern.PATTERN111:
        return ((i * j) % 3 + (i + j) % 2) % 2 == 0;

      default:
        throw new Error("bad maskPattern:" + maskPattern);
    }
  },
  /*
   获取RS的纠错多项式
   */
  getErrorCorrectPolynomial: function(errorCorrectLength) {

    var a = new QRPolynomial([1], 0);

    for (var i = 0; i < errorCorrectLength; i++) {
      a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
    }

    return a;
  },
  /*
   获取评价
   */
  getLostPoint: function(qrCode) {

    var moduleCount = qrCode.getModuleCount(),
      lostPoint = 0,
      darkCount = 0;

    for (var row = 0; row < moduleCount; row++) {

      var sameCount = 0;
      var head = qrCode.modules[row][0];

      for (var col = 0; col < moduleCount; col++) {

        var current = qrCode.modules[row][col];

        //level 3 评价
        if (col < moduleCount - 6) {
          if (current && !qrCode.modules[row][col + 1] && qrCode.modules[row][col + 2] && qrCode.modules[row][col + 3] && qrCode.modules[row][col + 4] && !qrCode.modules[row][col + 5] && qrCode.modules[row][col + 6]) {
            if (col < moduleCount - 10) {
              if (qrCode.modules[row][col + 7] && qrCode.modules[row][col + 8] && qrCode.modules[row][col + 9] && qrCode.modules[row][col + 10]) {
                lostPoint += 40;
              }
            } else if (col > 3) {
              if (qrCode.modules[row][col - 1] && qrCode.modules[row][col - 2] && qrCode.modules[row][col - 3] && qrCode.modules[row][col - 4]) {
                lostPoint += 40;
              }
            }

          }
        }

        //level 2 评价
        if ((row < moduleCount - 1) && (col < moduleCount - 1)) {
          var count = 0;
          if (current) count++;
          if (qrCode.modules[row + 1][col]) count++;
          if (qrCode.modules[row][col + 1]) count++;
          if (qrCode.modules[row + 1][col + 1]) count++;
          if (count == 0 || count == 4) {
            lostPoint += 3;
          }
        }

        //level 1 评价
        if (head ^ current) {
          sameCount++;
        } else {
          head = current;
          if (sameCount >= 5) {
            lostPoint += (3 + sameCount - 5);
          }
          sameCount = 1;
        }

        //level 4 评价
        if (current) {
          darkCount++;
        }

      }
    }

    for (var col = 0; col < moduleCount; col++) {

      var sameCount = 0;
      var head = qrCode.modules[0][col];

      for (var row = 0; row < moduleCount; row++) {

        var current = qrCode.modules[row][col];

        //level 3 评价
        if (row < moduleCount - 6) {
          if (current && !qrCode.modules[row + 1][col] && qrCode.modules[row + 2][col] && qrCode.modules[row + 3][col] && qrCode.modules[row + 4][col] && !qrCode.modules[row + 5][col] && qrCode.modules[row + 6][col]) {
            if (row < moduleCount - 10) {
              if (qrCode.modules[row + 7][col] && qrCode.modules[row + 8][col] && qrCode.modules[row + 9][col] && qrCode.modules[row + 10][col]) {
                lostPoint += 40;
              }
            } else if (row > 3) {
              if (qrCode.modules[row - 1][col] && qrCode.modules[row - 2][col] && qrCode.modules[row - 3][col] && qrCode.modules[row - 4][col]) {
                lostPoint += 40;
              }
            }
          }
        }

        //level 1 评价
        if (head ^ current) {
          sameCount++;
        } else {
          head = current;
          if (sameCount >= 5) {
            lostPoint += (3 + sameCount - 5);
          }
          sameCount = 1;
        }

      }
    }

    // LEVEL4

    var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
    lostPoint += ratio * 10;

    return lostPoint;
  }

};


//---------------------------------------------------------------------
// QRMath使用的数学工具
//---------------------------------------------------------------------

var QRMath = {
  /*
   将n转化为a^m
   */
  glog: function(n) {

    if (n < 1) {
      throw new Error("glog(" + n + ")");
    }

    return QRMath.LOG_TABLE[n];
  },
  /*
   将a^m转化为n
   */
  gexp: function(n) {

    while (n < 0) {
      n += 255;
    }

    while (n >= 256) {
      n -= 255;
    }

    return QRMath.EXP_TABLE[n];
  },

  EXP_TABLE: new Array(256),

  LOG_TABLE: new Array(256)

};

for (var i = 0; i < 8; i++) {
  QRMath.EXP_TABLE[i] = 1 << i;
}
for (var i = 8; i < 256; i++) {
  QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
}
for (var i = 0; i < 255; i++) {
  QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
}

//---------------------------------------------------------------------
// QRPolynomial 多项式
//---------------------------------------------------------------------
/**
 * 多项式类
 * @param {Array} num   系数
 * @param {num} shift a^shift
 */
function QRPolynomial(num, shift) {

  if (num.length == undefined) {
    throw new Error(num.length + "/" + shift);
  }

  var offset = 0;

  while (offset < num.length && num[offset] == 0) {
    offset++;
  }

  this.num = new Array(num.length - offset + shift);
  for (var i = 0; i < num.length - offset; i++) {
    this.num[i] = num[i + offset];
  }
}

QRPolynomial.prototype = {

  get: function(index) {
    return this.num[index];
  },

  getLength: function() {
    return this.num.length;
  },
  /**
   * 多项式乘法
   * @param  {QRPolynomial} e 被乘多项式
   * @return {[type]}   [description]
   */
  multiply: function(e) {

    var num = new Array(this.getLength() + e.getLength() - 1);

    for (var i = 0; i < this.getLength(); i++) {
      for (var j = 0; j < e.getLength(); j++) {
        num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
      }
    }

    return new QRPolynomial(num, 0);
  },
  /**
   * 多项式模运算
   * @param  {QRPolynomial} e 模多项式
   * @return {}
   */
  mod: function(e) {
    var tl = this.getLength(),
      el = e.getLength();
    if (tl - el < 0) {
      return this;
    }
    var num = new Array(tl);
    for (var i = 0; i < tl; i++) {
      num[i] = this.get(i);
    }
    while (num.length >= el) {
      var ratio = QRMath.glog(num[0]) - QRMath.glog(e.get(0));

      for (var i = 0; i < e.getLength(); i++) {
        num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
      }
      while (num[0] == 0) {
        num.shift();
      }
    }
    return new QRPolynomial(num, 0);
  }
};

//---------------------------------------------------------------------
// RS_BLOCK_TABLE
//---------------------------------------------------------------------
/*
 二维码各个版本信息[块数, 每块中的数据块数, 每块中的信息块数]
 */
RS_BLOCK_TABLE = [

  // L
  // M
  // Q
  // H

  // 1
  [1, 26, 19],
  [1, 26, 16],
  [1, 26, 13],
  [1, 26, 9],

  // 2
  [1, 44, 34],
  [1, 44, 28],
  [1, 44, 22],
  [1, 44, 16],

  // 3
  [1, 70, 55],
  [1, 70, 44],
  [2, 35, 17],
  [2, 35, 13],

  // 4
  [1, 100, 80],
  [2, 50, 32],
  [2, 50, 24],
  [4, 25, 9],

  // 5
  [1, 134, 108],
  [2, 67, 43],
  [2, 33, 15, 2, 34, 16],
  [2, 33, 11, 2, 34, 12],

  // 6
  [2, 86, 68],
  [4, 43, 27],
  [4, 43, 19],
  [4, 43, 15],

  // 7
  [2, 98, 78],
  [4, 49, 31],
  [2, 32, 14, 4, 33, 15],
  [4, 39, 13, 1, 40, 14],

  // 8
  [2, 121, 97],
  [2, 60, 38, 2, 61, 39],
  [4, 40, 18, 2, 41, 19],
  [4, 40, 14, 2, 41, 15],

  // 9
  [2, 146, 116],
  [3, 58, 36, 2, 59, 37],
  [4, 36, 16, 4, 37, 17],
  [4, 36, 12, 4, 37, 13],

  // 10
  [2, 86, 68, 2, 87, 69],
  [4, 69, 43, 1, 70, 44],
  [6, 43, 19, 2, 44, 20],
  [6, 43, 15, 2, 44, 16],

  // 11
  [4, 101, 81],
  [1, 80, 50, 4, 81, 51],
  [4, 50, 22, 4, 51, 23],
  [3, 36, 12, 8, 37, 13],

  // 12
  [2, 116, 92, 2, 117, 93],
  [6, 58, 36, 2, 59, 37],
  [4, 46, 20, 6, 47, 21],
  [7, 42, 14, 4, 43, 15],

  // 13
  [4, 133, 107],
  [8, 59, 37, 1, 60, 38],
  [8, 44, 20, 4, 45, 21],
  [12, 33, 11, 4, 34, 12],

  // 14
  [3, 145, 115, 1, 146, 116],
  [4, 64, 40, 5, 65, 41],
  [11, 36, 16, 5, 37, 17],
  [11, 36, 12, 5, 37, 13],

  // 15
  [5, 109, 87, 1, 110, 88],
  [5, 65, 41, 5, 66, 42],
  [5, 54, 24, 7, 55, 25],
  [11, 36, 12],

  // 16
  [5, 122, 98, 1, 123, 99],
  [7, 73, 45, 3, 74, 46],
  [15, 43, 19, 2, 44, 20],
  [3, 45, 15, 13, 46, 16],

  // 17
  [1, 135, 107, 5, 136, 108],
  [10, 74, 46, 1, 75, 47],
  [1, 50, 22, 15, 51, 23],
  [2, 42, 14, 17, 43, 15],

  // 18
  [5, 150, 120, 1, 151, 121],
  [9, 69, 43, 4, 70, 44],
  [17, 50, 22, 1, 51, 23],
  [2, 42, 14, 19, 43, 15],

  // 19
  [3, 141, 113, 4, 142, 114],
  [3, 70, 44, 11, 71, 45],
  [17, 47, 21, 4, 48, 22],
  [9, 39, 13, 16, 40, 14],

  // 20
  [3, 135, 107, 5, 136, 108],
  [3, 67, 41, 13, 68, 42],
  [15, 54, 24, 5, 55, 25],
  [15, 43, 15, 10, 44, 16],

  // 21
  [4, 144, 116, 4, 145, 117],
  [17, 68, 42],
  [17, 50, 22, 6, 51, 23],
  [19, 46, 16, 6, 47, 17],

  // 22
  [2, 139, 111, 7, 140, 112],
  [17, 74, 46],
  [7, 54, 24, 16, 55, 25],
  [34, 37, 13],

  // 23
  [4, 151, 121, 5, 152, 122],
  [4, 75, 47, 14, 76, 48],
  [11, 54, 24, 14, 55, 25],
  [16, 45, 15, 14, 46, 16],

  // 24
  [6, 147, 117, 4, 148, 118],
  [6, 73, 45, 14, 74, 46],
  [11, 54, 24, 16, 55, 25],
  [30, 46, 16, 2, 47, 17],

  // 25
  [8, 132, 106, 4, 133, 107],
  [8, 75, 47, 13, 76, 48],
  [7, 54, 24, 22, 55, 25],
  [22, 45, 15, 13, 46, 16],

  // 26
  [10, 142, 114, 2, 143, 115],
  [19, 74, 46, 4, 75, 47],
  [28, 50, 22, 6, 51, 23],
  [33, 46, 16, 4, 47, 17],

  // 27
  [8, 152, 122, 4, 153, 123],
  [22, 73, 45, 3, 74, 46],
  [8, 53, 23, 26, 54, 24],
  [12, 45, 15, 28, 46, 16],

  // 28
  [3, 147, 117, 10, 148, 118],
  [3, 73, 45, 23, 74, 46],
  [4, 54, 24, 31, 55, 25],
  [11, 45, 15, 31, 46, 16],

  // 29
  [7, 146, 116, 7, 147, 117],
  [21, 73, 45, 7, 74, 46],
  [1, 53, 23, 37, 54, 24],
  [19, 45, 15, 26, 46, 16],

  // 30
  [5, 145, 115, 10, 146, 116],
  [19, 75, 47, 10, 76, 48],
  [15, 54, 24, 25, 55, 25],
  [23, 45, 15, 25, 46, 16],

  // 31
  [13, 145, 115, 3, 146, 116],
  [2, 74, 46, 29, 75, 47],
  [42, 54, 24, 1, 55, 25],
  [23, 45, 15, 28, 46, 16],

  // 32
  [17, 145, 115],
  [10, 74, 46, 23, 75, 47],
  [10, 54, 24, 35, 55, 25],
  [19, 45, 15, 35, 46, 16],

  // 33
  [17, 145, 115, 1, 146, 116],
  [14, 74, 46, 21, 75, 47],
  [29, 54, 24, 19, 55, 25],
  [11, 45, 15, 46, 46, 16],

  // 34
  [13, 145, 115, 6, 146, 116],
  [14, 74, 46, 23, 75, 47],
  [44, 54, 24, 7, 55, 25],
  [59, 46, 16, 1, 47, 17],

  // 35
  [12, 151, 121, 7, 152, 122],
  [12, 75, 47, 26, 76, 48],
  [39, 54, 24, 14, 55, 25],
  [22, 45, 15, 41, 46, 16],

  // 36
  [6, 151, 121, 14, 152, 122],
  [6, 75, 47, 34, 76, 48],
  [46, 54, 24, 10, 55, 25],
  [2, 45, 15, 64, 46, 16],

  // 37
  [17, 152, 122, 4, 153, 123],
  [29, 74, 46, 14, 75, 47],
  [49, 54, 24, 10, 55, 25],
  [24, 45, 15, 46, 46, 16],

  // 38
  [4, 152, 122, 18, 153, 123],
  [13, 74, 46, 32, 75, 47],
  [48, 54, 24, 14, 55, 25],
  [42, 45, 15, 32, 46, 16],

  // 39
  [20, 147, 117, 4, 148, 118],
  [40, 75, 47, 7, 76, 48],
  [43, 54, 24, 22, 55, 25],
  [10, 45, 15, 67, 46, 16],

  // 40
  [19, 148, 118, 6, 149, 119],
  [18, 75, 47, 31, 76, 48],
  [34, 54, 24, 34, 55, 25],
  [20, 45, 15, 61, 46, 16]
];

/**
 * 根据数据获取对应版本
 * @return {[type]} [description]
 */
QRCodeAlg.prototype.getRightType = function() {
  for (var typeNumber = 1; typeNumber < 41; typeNumber++) {
    var rsBlock = RS_BLOCK_TABLE[(typeNumber - 1) * 4 + this.errorCorrectLevel];
    if (rsBlock == undefined) {
      throw new Error('bad rs block @ typeNumber:' + typeNumber + '/errorCorrectLevel:' + this.errorCorrectLevel);
    }
    var length = rsBlock.length / 3;
    var totalDataCount = 0;
    for (var i = 0; i < length; i++) {
      var count = rsBlock[i * 3 + 0];
      var dataCount = rsBlock[i * 3 + 2];
      totalDataCount += dataCount * count;
    }

    var lengthBytes = typeNumber > 9 ? 2 : 1;
    if (this.utf8bytes.length + lengthBytes < totalDataCount || typeNumber == 40) {
      this.typeNumber = typeNumber;
      this.rsBlock = rsBlock;
      this.totalDataCount = totalDataCount;
      break;
    }
  }
};

// ---------------------------------------------------------------------
// QRBitBuffer
// ---------------------------------------------------------------------

function QRBitBuffer() {
  this.buffer = new Array();
  this.length = 0;
}

QRBitBuffer.prototype = {
  get: function(index) {
    var bufIndex = Math.floor(index / 8);
    return ((this.buffer[bufIndex] >>> (7 - index % 8)) & 1);
  },

  put: function(num, length) {
    for (var i = 0; i < length; i++) {
      this.putBit(((num >>> (length - i - 1)) & 1));
    }
  },

  putBit: function(bit) {

    var bufIndex = Math.floor(this.length / 8);
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0);
    }

    if (bit) {
      this.buffer[bufIndex] |= (0x80 >>> (this.length % 8));
    }

    this.length++;
  }
};

$.fn.qrcode = function QRCodePlugin(option) {
  return this.each(function() {
    $(this).append(new QRCode(option));
  });
};

module.exports = UI.qrcode = QRCode;

},{"2":2}],32:[function(_dereq_,module,exports){
'use strict';

var UI = _dereq_(2);

/**
 * store.js
 * @via https://github.com/marcuswestin/store.js
 * @license https://github.com/marcuswestin/store.js/blob/master/LICENSE
 */

var store = {};
var win = window;
var localStorageName = 'localStorage';
var storage;

store.disabled = false;

store.version = '1.3.17';

store.set = function(key, value) {
};

store.get = function(key, defaultVal) {
};

store.has = function(key) {
  return store.get(key) !== undefined;
};

store.remove = function(key) {
};

store.clear = function() {
};

store.transact = function(key, defaultVal, transactionFn) {
  if (transactionFn == null) {
    transactionFn = defaultVal;
    defaultVal = null;
  }

  if (defaultVal == null) {
    defaultVal = {};
  }

  var val = store.get(key, defaultVal);
  transactionFn(val);
  store.set(key, val);
};

store.getAll = function() {
};

store.forEach = function() {
};

store.serialize = function(value) {
  return JSON.stringify(value);
};

store.deserialize = function(value) {
  if (typeof value != 'string') {
    return undefined;
  }

  try {
    return JSON.parse(value);
  } catch (e) {
    return value || undefined;
  }
};

// Functions to encapsulate questionable FireFox 3.6.13 behavior
// when about.config::dom.storage.enabled === false
// See https://github.com/marcuswestin/store.js/issues#issue/13
function isLocalStorageNameSupported() {
  try {
    return (localStorageName in win && win[localStorageName]);
  }
  catch (err) {
    return false;
  }
}

if (isLocalStorageNameSupported()) {
  storage = win[localStorageName];
  store.set = function(key, val) {
    if (val === undefined) {
      return store.remove(key);
    }
    storage.setItem(key, store.serialize(val));
    return val;
  };

  store.get = function(key, defaultVal) {
    var val = store.deserialize(storage.getItem(key));
    return (val === undefined ? defaultVal : val);
  };

  store.remove = function(key) {
    storage.removeItem(key);
  };

  store.clear = function() {
    storage.clear();
  };

  store.getAll = function() {
    var ret = {};
    store.forEach(function(key, val) {
      ret[key] = val;
    });
    return ret;
  };

  store.forEach = function(callback) {
    for (var i = 0; i < storage.length; i++) {
      var key = storage.key(i);
      callback(key, store.get(key));
    }
  };
}

try {
  var testKey = '__storeJs__';
  store.set(testKey, testKey);
  if (store.get(testKey) != testKey) {
    store.disabled = true;
  }
  store.remove(testKey);
} catch (e) {
  store.disabled = true;
}

store.enabled = !store.disabled;

module.exports = UI.store = store;

},{"2":2}],33:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);
_dereq_(6);

function accordionInit() {
  var $accordion = $('[data-am-widget="accordion"]');
  var selector = {
    item: '.am-accordion-item',
    title: '.am-accordion-title',
    body: '.am-accordion-bd',
    disabled: '.am-disabled'
  };

  $accordion.each(function(i, item) {
    var options = UI.utils.parseOptions($(item).attr('data-am-accordion'));
    var $title = $(item).find(selector.title);

    $title.on('click.accordion.amui', function() {
      var $collapse = $(this).next(selector.body);
      var $parent = $(this).parent(selector.item);
      var data = $collapse.data('amui.collapse');

      if ($parent.is(selector.disabled)) {
        return;
      }

      $parent.toggleClass('am-active');

      if (!data) {
        $collapse.collapse();
      } else {
        $collapse.collapse('toggle');
      }

      !options.multiple &&
      $(item).children('.am-active').
        not($parent).not(selector.disabled).removeClass('am-active').
        find(selector.body + '.am-in').collapse('close');
    });
  });
}

// Init on DOM ready
$(accordionInit);

module.exports = UI.accordion = {
  VERSION: '2.1.0',
  init: accordionInit
};

},{"2":2,"6":6}],34:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  VERSION: '2.0.1'
};

},{}],35:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);

function duoshuoInit() {
  var $dsThread = $('.ds-thread');
  var dsShortName = $dsThread.parent('[data-am-widget="duoshuo"]').
    attr('data-ds-short-name');
  var dsSrc = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
    '//static.duoshuo.com/embed.js';

  if (!$dsThread.length || !dsShortName) {
    return;
  }

  window.duoshuoQuery = {
    short_name: dsShortName
  };

  // 已经有多说脚本
  if ($('script[src="' + dsSrc + '"]').length) {
    return;
  }

  var $dsJS = $('<script>', {
    async: true,
    type: 'text/javascript',
    src: dsSrc,
    charset: 'utf-8'
  });

  $('body').append($dsJS);
}

$(window).on('load', duoshuoInit);

module.exports = UI.duoshuo = {
  VERSION: '2.0.1',
  init: duoshuoInit
};

},{"2":2}],36:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);
_dereq_(17);

/**
 * Is Images zoomable
 * @return {Boolean}
 */
$.isImgZoomAble = function(element) {
  var t = new Image();
  t.src = element.src;

  var zoomAble = ($(element).width() < t.width);

  if (zoomAble) {
    $(element).closest('.am-figure').addClass('am-figure-zoomable');
  }

  return zoomAble;
};

function figureInit() {
  $('.am-figure').each(function(i, item) {
    var options = UI.utils.parseOptions($(item).attr('data-am-figure'));
    var $item = $(item);
    var data;

    if (options.pureview) {
      if (options.pureview === 'auto') {
        var zoomAble = $.isImgZoomAble($item.find('img')[0]);
        zoomAble && $item.pureview();
      } else {
        $item.addClass('am-figure-zoomable').pureview();
      }
    }

    data = $item.data('amui.pureview');

    if (data) {
      $item.on('click', ':not(img)', function() {
        data.open(0);
      });
    }
  });
}

$(window).on('load', figureInit);

module.exports = UI.figure = {
  VERSION: '2.0.3',
  init: figureInit
};

},{"17":17,"2":2}],37:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);
_dereq_(12);
var addToHS = _dereq_(3);
var cookie = _dereq_(27);

function footerInit() {
  // modal mode
  $('.am-footer-ysp').on('click', function() {
    $('#am-footer-modal').modal();
  });

  var options = UI.utils.parseOptions($('.am-footer').data('amFooter'));
  options.addToHS && addToHS();

  // switch mode
  // switch to desktop
  $('[data-rel="desktop"]').on('click', function(e) {
    e.preventDefault();
    if (window.AMPlatform) { // front end
      window.AMPlatform.util.goDesktop();
    } else { // back end
      cookie.set('allmobilize', 'desktop', '', '/');
      window.location = window.location;
    }
  });
}

$(footerInit);

module.exports = UI.footer = {
  VERSION: '3.1.2',
  init: footerInit
};

},{"12":12,"2":2,"27":27,"3":3}],38:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);
_dereq_(17);

function galleryInit() {
  var $gallery = $('[data-am-widget="gallery"]');

  $gallery.each(function() {
    var options = UI.utils.parseOptions($(this).attr('data-am-gallery'));

    if (options.pureview) {
      (typeof options.pureview === 'object') ?
        $(this).pureview(options.pureview) : $(this).pureview();
    }
  });
}

$(galleryInit);

module.exports = UI.gallery = {
  VERSION: '3.0.0',
  init: galleryInit
};

},{"17":17,"2":2}],39:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);
_dereq_(22);

function goTopInit() {
  var $goTop = $('[data-am-widget="gotop"]');
  var $fixed = $goTop.filter('.am-gotop-fixed');
  var $win = $(window);

  if ($goTop.data('init')) {
    return;
  }

  $goTop.find('a').on('click', function(e) {
    e.preventDefault();
    $win.smoothScroll();
  });

  function checkPosition() {
    $fixed[($win.scrollTop() > 50 ? 'add' : 'remove') + 'Class']('am-active');
  }

  checkPosition();

  $win.on('scroll.gotop.amui', UI.utils.debounce(checkPosition, 100));

  $goTop.data('init', true);
}

$(goTopInit);

module.exports = UI.gotop = {
  VERSION: '4.0.2',
  init: goTopInit
};

},{"2":2,"22":22}],40:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);

function headerInit() {
  $('[data-am-widget="header"]').each(function() {
    if ($(this).hasClass('am-header-fixed')) {
      $('body').addClass('am-with-fixed-header');
      return false;
    }
  });
}

$(headerInit);

module.exports = UI.header = {
  VERSION: '2.0.0',
  init: headerInit
};

},{"2":2}],41:[function(_dereq_,module,exports){
'use strict';

var UI = _dereq_(2);

module.exports = UI.intro = {
  VERSION: '4.0.2',
  init: function() {}
};

},{"2":2}],42:[function(_dereq_,module,exports){
'use strict';

var UI = _dereq_(2);

module.exports = UI.listNews = {
  VERSION: '4.0.0',
  init: function() {}
};

},{"2":2}],43:[function(_dereq_,module,exports){
/* jshint strict: false, maxlen: 200 */
/* global BMap */

var $ = (window.jQuery);
var UI = _dereq_(2);

function addMapApi(callback) {
  var $mapApi0 = $('<script />', {
    id: 'am-map-api-0'
  });

  $('body').append($mapApi0);

  $mapApi0.on('load', function() {
    console.log('load');
    var $mapApi1 = $('<script/>', {
      id: 'am-map-api-1'
    });

    $('body').append($mapApi1);

    $mapApi1.on('load', function() {
      var script = document.createElement('script');
      script.textContent = '(' + callback.toString() + ')();';
      $('body')[0].appendChild(script);
    }).attr('src', 'http://api.map.baidu.com/getscript' +
      '?type=quick&file=feature' +
      '&ak=WVAXZ05oyNRXS5egLImmentg&t=20140109092002');
  }).attr('src', 'http://api.map.baidu.com/getscript' +
  '?type=quick&file=api&ak=WVAXZ05oyNRXS5egLImmentg&t=20140109092002');

  // jQuery 中 `load` 事件触发有问题，动态设置 src 属性才会触发 `load` 事件
  // $mapApi0 = $('<script />', {src: 'xxx'}); 这样的写法在 Zepto.js 中则没有问题
}

function addBdMap() {
  // 如果使用 $ 选择符，minify 以后会报错: $ is undefined
  // 即使传入 $ 也无效，改为使用原生方法
  // 这个函数作为 callback 会插入到 body 以后才执行，应该是 $ 引用错误导致
  var content = document.querySelector('.am-map');
  var defaultLng = 116.331398; // 经度默认值
  var defaultLat = 39.897445;  // 纬度默认值
  var name = content.getAttribute('data-name');
  var address = content.getAttribute('data-address');
  var lng = content.getAttribute('data-longitude') || defaultLng;
  var lat = content.getAttribute('data-latitude') || defaultLat;
  var setZoom = content.getAttribute('data-setZoom') || 17;
  var icon = content.getAttribute('data-icon');

  var map = new BMap.Map('bd-map');

  // 实例化一个地理坐标点
  var point = new BMap.Point(lng, lat);

  // 设初始化地图, options: 3-18
  map.centerAndZoom(point, setZoom);

  // 添加地图缩放控件
  if (content.getAttribute('data-zoomControl')) {
    map.addControl(new BMap.ZoomControl());
  }

  // 添加比例尺控件
  if (content.getAttribute('data-scaleControl')) {
    map.addControl(new BMap.ScaleControl());
  }

  // 创建标准与自定义 icon
  var marker = new BMap.Marker(point);
  if (icon) {
    marker.setIcon(new BMap.Icon(icon, new BMap.Size(40, 40)));
  }

  var opts = {
    width: 200,     // 信息窗口宽度
    // height: 'auto',     // 信息窗口高度
    title: name // 信息窗口标题
  };

  // 创建信息窗口对象
  var infoWindow = new BMap.InfoWindow('地址：' + address, opts);

  // 创建地址解析器实例
  var myGeo = new BMap.Geocoder();

  // 判断有没有使用经纬度
  if (lng == defaultLng && lat == defaultLat) {
    // 使用地址反解析来设置地图
    // 将地址解析结果显示在地图上,并调整地图视野
    myGeo.getPoint(address, function(point) {
      if (point) {
        map.centerAndZoom(point, setZoom);
        marker.setPosition(point);
        map.addOverlay(marker);
        map.openInfoWindow(infoWindow, point); // 开启信息窗口
      }
    }, '');

  } else {
    // 使用经纬度来设置地图
    myGeo.getLocation(point, function(result) {
      map.centerAndZoom(point, setZoom);
      marker.setPosition(point);
      map.addOverlay(marker);
      if (address) {
        map.openInfoWindow(infoWindow, point); // 开启信息窗口
      } else {
        map.openInfoWindow(new BMap.InfoWindow(address, opts), point); // 开启信息窗口
      }
    });
  }
}

var mapInit = function() {
  $('.am-map').length && addMapApi(addBdMap);
};

$(mapInit);

module.exports = UI.map = {
  VERSION: '2.0.2',
  init: mapInit
};

},{"2":2}],44:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);

function mechatInit() {
  if (!$('#mechat').length) {
    return;
  }

  var $mechat = $('[data-am-widget="mechat"]');
  var unitid = $mechat.data('am-mechat-unitid');
  var $mechatData = $('<script>', {
    charset: 'utf-8',
    src: 'http://mechatim.com/js/unit/button.js?id=' + unitid
  });

  $('body').append($mechatData);
}

// Lazy load
$(window).on('load', mechatInit);

module.exports = UI.mechat = {
  VERSION: '2.0.1',
  init: mechatInit
};

},{"2":2}],45:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);
var IScroll = _dereq_(11);
_dereq_(13);
_dereq_(6);

var menuInit = function() {
  var $menus = $('[data-am-widget="menu"]');

  $menus.find('.am-menu-nav .am-parent > a').on('click', function(e) {
    e.preventDefault();
    var $clicked = $(this);
    var $parent = $clicked.parent();
    var $subMenu = $clicked.next('.am-menu-sub');

    $parent.toggleClass('am-open');
    $subMenu.collapse('toggle');
    $parent.siblings('.am-parent').removeClass('am-open')
      .children('.am-menu-sub.am-in').collapse('close');
  });

  // Dropdown/slideDown menu
  $menus.
    filter('[data-am-menu-collapse]').
    find('> .am-menu-toggle').
    on('click', function(e) {
      e.preventDefault();
      var $this = $(this);
      var $nav = $this.next('.am-menu-nav');

      $this.toggleClass('am-active');

      $nav.collapse('toggle');
    });

  // OffCanvas menu
  $menus.
    filter('[data-am-menu-offcanvas]').
    find('> .am-menu-toggle').
    on('click', function(e) {
      e.preventDefault();
      var $this = $(this);
      var $nav = $this.next('.am-offcanvas');

      $this.toggleClass('am-active');

      $nav.offCanvas('open');
    });

  // Close offCanvas when link clicked
  var autoCloseOffCanvas = '.am-offcanvas[data-dismiss-on="click"]';
  var $autoCloseOffCanvas = $(autoCloseOffCanvas);

  $autoCloseOffCanvas.find('a').not('.am-parent>a').on('click', function(e) {
    $(this).parents(autoCloseOffCanvas).offCanvas('close');
  });

  // one theme
  $menus.filter('.am-menu-one').each(function(index) {
    var $this = $(this);
    var $wrap = $('<div class="am-menu-nav-sub-wrap"></div>');
    var allWidth = 0;
    var $nav = $this.find('.am-menu-nav');
    var $navTopItem = $nav.children('li');
    var prevIndex;

    $navTopItem.filter('.am-parent').each(function(index) {
      $(this).attr('data-rel', '#am-menu-sub-' + index);
      $(this).
        find('.am-menu-sub').
        attr('id', 'am-menu-sub-' + index).
        appendTo($wrap);
    });

    $this.append($wrap);

    $nav.wrap('<div class="am-menu-nav-wrap" id="am-menu-' + index + '">');

    // $navTopItem.eq(0).addClass('am-active');

    // 计算出所有 li 宽度
    $navTopItem.each(function(i) {
      allWidth += parseFloat($(this).css('width'));
    });

    $nav.width(allWidth);

    var menuScroll = new IScroll('#am-menu-' + index, {
      eventPassthrough: true,
      scrollX: true,
      scrollY: false,
      preventDefault: false
    });

    $navTopItem.on('click', function() {
      var $clicked = $(this);
      $clicked.addClass('am-active').siblings().removeClass('am-active');

      $wrap.find('.am-menu-sub.am-in').collapse('close');

      if ($clicked.is('.am-parent')) {
        !$clicked.hasClass('.am-open') &&
        $wrap.find($clicked.attr('data-rel')).collapse('open');
      } else {
        $clicked.siblings().removeClass('am-open');
      }

      // 第一次调用，没有prevIndex
      if (prevIndex === undefined) {
        prevIndex = $(this).index() ? 0 : 1;
      }

      // 判断方向
      var dir = $(this).index() > prevIndex;
      var target = $(this)[dir ? 'next' : 'prev']();

      // 点击的按钮，显示一半
      var offset = target.offset() || $(this).offset();
      var within = $this.offset();

      // 父类左边距
      var listOffset;
      var parentLeft = parseInt($this.css('padding-left'));

      if (dir ? offset.left + offset.width > within.left + within.width :
        offset.left < within.left) {
        listOffset = $nav.offset();
        menuScroll.scrollTo(dir ?
        within.width - offset.left + listOffset.left -
        offset.width - parentLeft :
        listOffset.left - offset.left, 0, 400);
      }

      prevIndex = $(this).index();

    });

    $this.on('touchmove', function(event) {
      event.preventDefault();
    });
  });
};

$(menuInit);

module.exports = UI.menu = {
  VERSION: '4.0.3',
  init: menuInit
};

},{"11":11,"13":13,"2":2,"6":6}],46:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);
var share = _dereq_(21);
var QRCode = _dereq_(31);
_dereq_(12);

function navbarInit() {
  var $navBar = $('[data-am-widget="navbar"]');

  if (!$navBar.length) {
    return;
  }

  var $win = $(window);
  var $body = $('body');
  var $navBarNav = $navBar.find('.am-navbar-nav');
  var $navItems = $navBar.find('li');
  var navItemsCounter = $navItems.length;
  var configItems = $navBarNav.attr('class') &&
    parseInt($navBarNav.attr('class').
      match(/am-avg-sm-(\d+)/)[1]) || 3;
  var navMinWidth = 60; // 每个 li 最小宽度
  var offsetWidth = 16;
  var $share = $navItems.filter('[data-am-navbar-share]');
  var $qrcode = $navItems.filter('[data-am-navbar-qrcode]');
  var activeStatus = 'am-active';
  var $moreActions = $('<ul class="am-navbar-actions"></ul>', {
    id: UI.utils.generateGUID('am-navbar-actions')
  });
  var $moreLink = $('<li class="am-navbar-labels am-navbar-more">' +
  '<a href="javascript: void(0);">' +
  '<span class="am-icon-angle-up"></span>' +
  '<span class="am-navbar-label">更多</span></a></li>');

  // 如果有 Fix 的工具栏则设置 body 的 padding-bottom
  if ($navBar.css('position') == 'fixed') {
    $body.addClass('am-with-fixed-navbar');
  }

  if ($qrcode.length) {
    var qrId = 'am-navbar-qrcode';
    $qrModal = $('#' + qrId);

    if (!$qrModal.length) {
      var qrImg = $qrcode.attr('data-am-navbar-qrcode');
      var $qrModal = $('<div class="am-modal am-modal-no-btn" id="">' +
      '<div class="am-modal-dialog">' +
      '<div class="am-modal-bd"></div></div>' +
      '</div>', {
        id: qrId
      });
      var $qrContainer = $qrModal.find('.am-modal-bd');

      // 判断上传自定义的二维码没有，否则生成二维码
      if (qrImg) {
        $qrContainer.html('<img src="' + qrImg + '"/>');
      } else {
        var qrnode = new QRCode({
          render: 'canvas',
          correctLevel: 0,
          text: window.location.href,
          width: 200,
          height: 200,
          background: '#fff',
          foreground: '#000'
        });
        $qrContainer.html(qrnode);
      }

      $body.append($qrModal);
    }

    $qrcode.on('click', function(e) {
      e.preventDefault();
      $qrModal.modal();
    });
  }

  if (navItemsCounter > configItems && navItemsCounter > calcSuiteItems()) {
    initActions();
  }

  // console.log('NavItems: %d, config: %d, best: %d',
  //    navItemsCounter, configItems, calcSuiteItems());

  function initActions() {
    $navBarNav.append($moreLink);

    $navBarNav.
      find('li').
      not('.am-navbar-more').
      slice(calcSuiteItems() - 1).
      appendTo($moreActions);

    // Append more actions
    $navBar.append($moreActions);
  }

  function checkNavBarItems() {
    if (calcSuiteItems() >= navItemsCounter) {
      // 显示所有链接，隐藏 more
      $moreLink.hide();
      $moreActions.find('li').insertBefore($moreLink);
      return;
    }

    !$navBar.find('.am-navbar-actions').length && initActions();

    $moreLink.show();

    if ($navBarNav.find('li').length < calcSuiteItems()) {
      $moreActions.find('li').
        slice(0, calcSuiteItems() - $navBarNav.find('li').length).
        insertBefore($moreLink);
    } else if ($navBarNav.find('li').length > calcSuiteItems()) {
      if ($moreActions.find('li').length) {
        $navBarNav.find('li').not($moreLink).slice(calcSuiteItems() - 1).
          insertBefore($moreActions.find('li').first());
      } else {
        $navBarNav.find('li').not($moreLink).slice(calcSuiteItems() - 1).
          appendTo($moreActions);
      }
    }
  }

  /**
   * 计算最适合显示的条目个数
   * @returns {number}
   */
  function calcSuiteItems() {
    return Math.floor(($win.width() - offsetWidth) / navMinWidth);
  }

  $navBar.on('click.navbar.amui', '.am-navbar-more', function(e) {
    e.preventDefault();

    $moreLink[$moreActions.hasClass(activeStatus) ?
      'removeClass' : 'addClass'](activeStatus);

    $moreActions.toggleClass(activeStatus);
  });

  if ($share.length) {
    $share.on('click.navbar.amui', function(e) {
      e.preventDefault();
      share.toggle();
    });
  }

  $win.on('resize.navbar.amui orientationchange.navbar.amui',
    UI.utils.debounce(checkNavBarItems, 150));
}

// DOMContent ready
$(navbarInit);

module.exports = UI.navbar = {
  VERSION: '2.0.2',
  init: navbarInit
};

},{"12":12,"2":2,"21":21,"31":31}],47:[function(_dereq_,module,exports){
'use strict';

var UI = _dereq_(2);

module.exports = UI.pagination = {
  VERSION: '3.0.1'
};

},{"2":2}],48:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);
var IScroll = _dereq_(11);
_dereq_(17);

/**
 * 表格滚动
 * @param {number} index ID 标识，多个 paragraph 里面多个 table
 */
$.fn.scrollTable = function(index) {
  var $this = $(this);
  var $parent;

  $this.wrap('<div class="am-paragraph-table-container" ' +
  'id="am-paragraph-table-' + index + '">' +
  '<div class="am-paragraph-table-scroller"></div></div>');

  $parent = $this.parent();
  $parent.width($this.width());
  $parent.height($this.height());

  new IScroll('#am-paragraph-table-' + index, {
    eventPassthrough: true,
    scrollX: true,
    scrollY: false,
    preventDefault: false
  });
};

function paragraphInit() {
  var $paragraph = $('[data-am-widget="paragraph"]');

  $paragraph.each(function(index) {
    var $this = $(this);
    var options = UI.utils.parseOptions($this.attr('data-am-paragraph'));
    var $index = index;

    if (options.pureview) {
      $this.pureview();
    }

    if (options.tableScrollable) {
      $this.find('table').each(function(index) {
        if ($(this).width() > $(window).width()) {
          $(this).scrollTable($index + '-' + index);
        }
      });
    }
  });
}

$(window).on('load', paragraphInit);

module.exports = UI.paragraph = {
  VERSION: '2.0.1',
  init: paragraphInit
};

},{"11":11,"17":17,"2":2}],49:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);
_dereq_(10);

function sliderInit() {
  var $sliders = $('[data-am-widget="slider"]');
  $sliders.not('.am-slider-manual').each(function(i, item) {
    var options = UI.utils.parseOptions($(item).attr('data-am-slider'));
    $(item).flexslider(options);
  });
}

$(sliderInit);

module.exports = UI.slider = {
  VERSION: '3.0.1',
  init: sliderInit
};

},{"10":10,"2":2}],50:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);
_dereq_(24);

function tabsInit() {
  $('[data-am-widget="tabs"]').each(function() {
    var options = $(this).data('amTabsNoswipe') ? {noSwipe: 1} : {};
    $(this).tabs(options);
  });
}

$(tabsInit);

module.exports = UI.tab = {
  VERSION: '4.0.1',
  init: tabsInit
};

},{"2":2,"24":24}],51:[function(_dereq_,module,exports){
'use strict';

var UI = _dereq_(2);

module.exports = UI.titlebar = {
  VERSION: '4.0.1'
};

},{"2":2}],52:[function(_dereq_,module,exports){
'use strict';

var $ = (window.jQuery);
var UI = _dereq_(2);

var isWeChat = window.navigator.userAgent.indexOf('MicroMessenger') > -1;

/* global wx,alert */

function appendWeChatSDK(callback) {
  var $weChatSDK = $('<script/>', {
    id: 'wechat-sdk'
  });

  $('body').append($weChatSDK);

  $weChatSDK.on('load', function() {
    callback && callback();
  }).attr('src', 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js');
}

function payHandler() {
  var $paymentBtn = $('[data-am-widget="wechatpay"]');

  if (!isWeChat) {
    $paymentBtn.hide();
    return false;
  }

  $paymentBtn.on('click', '.am-wechatpay-btn', function(e) {
    e.preventDefault();
    var options = UI.utils.parseOptions($(this).parent().data('wechatPay'));
    // console.log(options);
    // alert('pay button clicked');
    if (!window.wx) {
      alert('没有微信 JS SDK');
      return;
    }

    wx.checkJsApi({
      jsApiList: ['chooseWXPay'],
      success: function(res) {
        if (res.checkResult.chooseWXPay) {
          wx.chooseWXPay(options);
        } else {
          alert('微信版本不支持支付接口或没有开启！');
        }
      },
      fail: function() {
        alert('调用 checkJsApi 接口时发生错误!');
      }
    });
  });
}

var payInit = payHandler;

// Init on DOM ready
$(payInit);

module.exports = UI.pay = {
  VERSION: '1.0.0',
  init: payInit
};

},{"2":2}]},{},[1])(1)
});
/*
Unobtrusive JavaScript
https://github.com/rails/rails/blob/master/actionview/app/assets/javascripts
Released under the MIT license
 */


(function() {
  var context = this;

  (function() {
    (function() {
      this.Rails = {
        linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',
        buttonClickSelector: {
          selector: 'button[data-remote]:not([form]), button[data-confirm]:not([form])',
          exclude: 'form button'
        },
        inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',
        formSubmitSelector: 'form',
        formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',
        formDisableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',
        formEnableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',
        fileInputSelector: 'input[name][type=file]:not([disabled])',
        linkDisableSelector: 'a[data-disable-with], a[data-disable]',
        buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]'
      };

    }).call(this);
  }).call(context);

  var Rails = context.Rails;

  (function() {
    (function() {
      var expando, m;

      m = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;

      Rails.matches = function(element, selector) {
        if (selector.exclude != null) {
          return m.call(element, selector.selector) && !m.call(element, selector.exclude);
        } else {
          return m.call(element, selector);
        }
      };

      expando = '_ujsData';

      Rails.getData = function(element, key) {
        var ref;
        return (ref = element[expando]) != null ? ref[key] : void 0;
      };

      Rails.setData = function(element, key, value) {
        if (element[expando] == null) {
          element[expando] = {};
        }
        return element[expando][key] = value;
      };

      Rails.$ = function(selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
      };

    }).call(this);
    (function() {
      var $, csrfParam, csrfToken;

      $ = Rails.$;

      csrfToken = Rails.csrfToken = function() {
        var meta;
        meta = document.querySelector('meta[name=csrf-token]');
        return meta && meta.content;
      };

      csrfParam = Rails.csrfParam = function() {
        var meta;
        meta = document.querySelector('meta[name=csrf-param]');
        return meta && meta.content;
      };

      Rails.CSRFProtection = function(xhr) {
        var token;
        token = csrfToken();
        if (token != null) {
          return xhr.setRequestHeader('X-CSRF-Token', token);
        }
      };

      Rails.refreshCSRFTokens = function() {
        var param, token;
        token = csrfToken();
        param = csrfParam();
        if ((token != null) && (param != null)) {
          return $('form input[name="' + param + '"]').forEach(function(input) {
            return input.value = token;
          });
        }
      };

    }).call(this);
    (function() {
      var CustomEvent, fire, matches;

      matches = Rails.matches;

      CustomEvent = window.CustomEvent;

      if (typeof CustomEvent !== 'function') {
        CustomEvent = function(event, params) {
          var evt;
          evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
          return evt;
        };
        CustomEvent.prototype = window.Event.prototype;
      }

      fire = Rails.fire = function(obj, name, data) {
        var event;
        event = new CustomEvent(name, {
          bubbles: true,
          cancelable: true,
          detail: data
        });
        obj.dispatchEvent(event);
        return !event.defaultPrevented;
      };

      Rails.stopEverything = function(e) {
        fire(e.target, 'ujs:everythingStopped');
        e.preventDefault();
        e.stopPropagation();
        return e.stopImmediatePropagation();
      };

      Rails.delegate = function(element, selector, eventType, handler) {
        return element.addEventListener(eventType, function(e) {
          var target;
          target = e.target;
          while (!(!(target instanceof Element) || matches(target, selector))) {
            target = target.parentNode;
          }
          if (target instanceof Element && handler.call(target, e) === false) {
            e.preventDefault();
            return e.stopPropagation();
          }
        });
      };

    }).call(this);
    (function() {
      var AcceptHeaders, CSRFProtection, createXHR, fire, prepareOptions, processResponse;

      CSRFProtection = Rails.CSRFProtection, fire = Rails.fire;

      AcceptHeaders = {
        '*': '*/*',
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript',
        script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
      };

      Rails.ajax = function(options) {
        var xhr;
        options = prepareOptions(options);
        xhr = createXHR(options, function() {
          var response;
          response = processResponse(xhr.response, xhr.getResponseHeader('Content-Type'));
          if (Math.floor(xhr.status / 100) === 2) {
            if (typeof options.success === "function") {
              options.success(response, xhr.statusText, xhr);
            }
          } else {
            if (typeof options.error === "function") {
              options.error(response, xhr.statusText, xhr);
            }
          }
          return typeof options.complete === "function" ? options.complete(xhr, xhr.statusText) : void 0;
        });
        if (typeof options.beforeSend === "function") {
          options.beforeSend(xhr, options);
        }
        if (xhr.readyState === XMLHttpRequest.OPENED) {
          return xhr.send(options.data);
        } else {
          return fire(document, 'ajaxStop');
        }
      };

      prepareOptions = function(options) {
        options.url = options.url || location.href;
        options.type = options.type.toUpperCase();
        if (options.type === 'GET' && options.data) {
          if (options.url.indexOf('?') < 0) {
            options.url += '?' + options.data;
          } else {
            options.url += '&' + options.data;
          }
        }
        if (AcceptHeaders[options.dataType] == null) {
          options.dataType = '*';
        }
        options.accept = AcceptHeaders[options.dataType];
        if (options.dataType !== '*') {
          options.accept += ', */*; q=0.01';
        }
        return options;
      };

      createXHR = function(options, done) {
        var xhr;
        xhr = new XMLHttpRequest();
        xhr.open(options.type, options.url, true);
        xhr.setRequestHeader('Accept', options.accept);
        if (typeof options.data === 'string') {
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        }
        if (!options.crossDomain) {
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }
        CSRFProtection(xhr);
        xhr.withCredentials = !!options.withCredentials;
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            return done(xhr);
          }
        };
        return xhr;
      };

      processResponse = function(response, type) {
        var parser, script;
        if (typeof response === 'string' && typeof type === 'string') {
          if (type.match(/\bjson\b/)) {
            try {
              response = JSON.parse(response);
            } catch (error) {}
          } else if (type.match(/\b(?:java|ecma)script\b/)) {
            script = document.createElement('script');
            script.text = response;
            document.head.appendChild(script).parentNode.removeChild(script);
          } else if (type.match(/\b(xml|html|svg)\b/)) {
            parser = new DOMParser();
            type = type.replace(/;.+/, '');
            try {
              response = parser.parseFromString(response, type);
            } catch (error) {}
          }
        }
        return response;
      };

      Rails.href = function(element) {
        return element.href;
      };

      Rails.isCrossDomain = function(url) {
        var e, originAnchor, urlAnchor;
        originAnchor = document.createElement('a');
        originAnchor.href = location.href;
        urlAnchor = document.createElement('a');
        try {
          urlAnchor.href = url;
          return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) || (originAnchor.protocol + '//' + originAnchor.host === urlAnchor.protocol + '//' + urlAnchor.host));
        } catch (error) {
          e = error;
          return true;
        }
      };

    }).call(this);
    (function() {
      var matches, toArray;

      matches = Rails.matches;

      toArray = function(e) {
        return Array.prototype.slice.call(e);
      };

      Rails.serializeElement = function(element, additionalParam) {
        var inputs, params;
        inputs = [element];
        if (matches(element, 'form')) {
          inputs = toArray(element.elements);
        }
        params = [];
        inputs.forEach(function(input) {
          if (!input.name) {
            return;
          }
          if (matches(input, 'select')) {
            return toArray(input.options).forEach(function(option) {
              if (option.selected) {
                return params.push({
                  name: input.name,
                  value: option.value
                });
              }
            });
          } else if (input.checked || ['radio', 'checkbox', 'submit'].indexOf(input.type) === -1) {
            return params.push({
              name: input.name,
              value: input.value
            });
          }
        });
        if (additionalParam) {
          params.push(additionalParam);
        }
        return params.map(function(param) {
          if (param.name != null) {
            return (encodeURIComponent(param.name)) + "=" + (encodeURIComponent(param.value));
          } else {
            return param;
          }
        }).join('&');
      };

      Rails.formElements = function(form, selector) {
        if (matches(form, 'form')) {
          return toArray(form.elements).filter(function(el) {
            return matches(el, selector);
          });
        } else {
          return toArray(form.querySelectorAll(selector));
        }
      };

    }).call(this);
    (function() {
      var allowAction, fire, stopEverything;

      fire = Rails.fire, stopEverything = Rails.stopEverything;

      Rails.handleConfirm = function(e) {
        if (!allowAction(this)) {
          return stopEverything(e);
        }
      };

      allowAction = function(element) {
        var answer, callback, message;
        message = element.getAttribute('data-confirm');
        if (!message) {
          return true;
        }
        answer = false;
        if (fire(element, 'confirm')) {
          try {
            answer = confirm(message);
          } catch (error) {}
          callback = fire(element, 'confirm:complete', [answer]);
        }
        return answer && callback;
      };

    }).call(this);
    (function() {
      var disableFormElement, disableFormElements, disableLinkElement, enableFormElement, enableFormElements, enableLinkElement, formElements, getData, matches, setData, stopEverything;

      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, stopEverything = Rails.stopEverything, formElements = Rails.formElements;

      Rails.handleDisabledElement = function(e) {
        var element;
        element = this;
        if (element.disabled) {
          return stopEverything(e);
        }
      };

      Rails.enableElement = function(e) {
        var element;
        element = e instanceof Event ? e.target : e;
        if (matches(element, Rails.linkDisableSelector)) {
          return enableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formEnableSelector)) {
          return enableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return enableFormElements(element);
        }
      };

      Rails.disableElement = function(e) {
        var element;
        element = e instanceof Event ? e.target : e;
        if (matches(element, Rails.linkDisableSelector)) {
          return disableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formDisableSelector)) {
          return disableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return disableFormElements(element);
        }
      };

      disableLinkElement = function(element) {
        var replacement;
        replacement = element.getAttribute('data-disable-with');
        if (replacement != null) {
          setData(element, 'ujs:enable-with', element.innerHTML);
          element.innerHTML = replacement;
        }
        element.addEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', true);
      };

      enableLinkElement = function(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');
        if (originalText != null) {
          element.innerHTML = originalText;
          setData(element, 'ujs:enable-with', null);
        }
        element.removeEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', null);
      };

      disableFormElements = function(form) {
        return formElements(form, Rails.formDisableSelector).forEach(disableFormElement);
      };

      disableFormElement = function(element) {
        var replacement;
        replacement = element.getAttribute('data-disable-with');
        if (replacement != null) {
          if (matches(element, 'button')) {
            setData(element, 'ujs:enable-with', element.innerHTML);
            element.innerHTML = replacement;
          } else {
            setData(element, 'ujs:enable-with', element.value);
            element.value = replacement;
          }
        }
        element.disabled = true;
        return setData(element, 'ujs:disabled', true);
      };

      enableFormElements = function(form) {
        return formElements(form, Rails.formEnableSelector).forEach(enableFormElement);
      };

      enableFormElement = function(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');
        if (originalText != null) {
          if (matches(element, 'button')) {
            element.innerHTML = originalText;
          } else {
            element.value = originalText;
          }
          setData(element, 'ujs:enable-with', null);
        }
        element.disabled = false;
        return setData(element, 'ujs:disabled', null);
      };

    }).call(this);
    (function() {
      var stopEverything;

      stopEverything = Rails.stopEverything;

      Rails.handleMethod = function(e) {
        var csrfParam, csrfToken, form, formContent, href, link, method;
        link = this;
        method = link.getAttribute('data-method');
        if (!method) {
          return;
        }
        href = Rails.href(link);
        csrfToken = Rails.csrfToken();
        csrfParam = Rails.csrfParam();
        form = document.createElement('form');
        formContent = "<input name='_method' value='" + method + "' type='hidden' />";
        if ((csrfParam != null) && (csrfToken != null) && !Rails.isCrossDomain(href)) {
          formContent += "<input name='" + csrfParam + "' value='" + csrfToken + "' type='hidden' />";
        }
        formContent += '<input type="submit" />';
        form.method = 'post';
        form.action = href;
        form.target = link.target;
        form.innerHTML = formContent;
        form.style.display = 'none';
        document.body.appendChild(form);
        form.querySelector('[type="submit"]').click();
        return stopEverything(e);
      };

    }).call(this);
    (function() {
      var ajax, fire, getData, isCrossDomain, isRemote, matches, serializeElement, setData, stopEverything,
        slice = [].slice;

      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, fire = Rails.fire, stopEverything = Rails.stopEverything, ajax = Rails.ajax, isCrossDomain = Rails.isCrossDomain, serializeElement = Rails.serializeElement;

      isRemote = function(element) {
        var value;
        value = element.getAttribute('data-remote');
        return (value != null) && value !== 'false';
      };

      Rails.handleRemote = function(e) {
        var button, data, dataType, element, method, url, withCredentials;
        element = this;
        if (!isRemote(element)) {
          return true;
        }
        if (!fire(element, 'ajax:before')) {
          fire(element, 'ajax:stopped');
          return false;
        }
        withCredentials = element.getAttribute('data-with-credentials');
        dataType = element.getAttribute('data-type') || 'script';
        if (matches(element, Rails.formSubmitSelector)) {
          button = getData(element, 'ujs:submit-button');
          method = getData(element, 'ujs:submit-button-formmethod') || element.method;
          url = getData(element, 'ujs:submit-button-formaction') || element.getAttribute('action') || location.href;
          if (method.toUpperCase() === 'GET') {
            url = url.replace(/\?.*$/, '');
          }
          if (element.enctype === 'multipart/form-data') {
            data = new FormData(element);
            if (button != null) {
              data.append(button.name, button.value);
            }
          } else {
            data = serializeElement(element, button);
          }
          setData(element, 'ujs:submit-button', null);
          setData(element, 'ujs:submit-button-formmethod', null);
          setData(element, 'ujs:submit-button-formaction', null);
        } else if (matches(element, Rails.buttonClickSelector) || matches(element, Rails.inputChangeSelector)) {
          method = element.getAttribute('data-method');
          url = element.getAttribute('data-url');
          data = serializeElement(element, element.getAttribute('data-params'));
        } else {
          method = element.getAttribute('data-method');
          url = Rails.href(element);
          data = element.getAttribute('data-params');
        }
        ajax({
          type: method || 'GET',
          url: url,
          data: data,
          dataType: dataType,
          beforeSend: function(xhr, options) {
            if (fire(element, 'ajax:beforeSend', [xhr, options])) {
              return fire(element, 'ajax:send', [xhr]);
            } else {
              fire(element, 'ajax:stopped');
              return xhr.abort();
            }
          },
          success: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:success', args);
          },
          error: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:error', args);
          },
          complete: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:complete', args);
          },
          crossDomain: isCrossDomain(url),
          withCredentials: (withCredentials != null) && withCredentials !== 'false'
        });
        return stopEverything(e);
      };

      Rails.formSubmitButtonClick = function(e) {
        var button, form;
        button = this;
        form = button.form;
        if (!form) {
          return;
        }
        if (button.name) {
          setData(form, 'ujs:submit-button', {
            name: button.name,
            value: button.value
          });
        }
        setData(form, 'ujs:formnovalidate-button', button.formNoValidate);
        setData(form, 'ujs:submit-button-formaction', button.getAttribute('formaction'));
        return setData(form, 'ujs:submit-button-formmethod', button.getAttribute('formmethod'));
      };

      Rails.handleMetaClick = function(e) {
        var data, link, metaClick, method;
        link = this;
        method = (link.getAttribute('data-method') || 'GET').toUpperCase();
        data = link.getAttribute('data-params');
        metaClick = e.metaKey || e.ctrlKey;
        if (metaClick && method === 'GET' && !data) {
          return e.stopImmediatePropagation();
        }
      };

    }).call(this);
    (function() {
      var $, CSRFProtection, delegate, disableElement, enableElement, fire, formSubmitButtonClick, getData, handleConfirm, handleDisabledElement, handleMetaClick, handleMethod, handleRemote, refreshCSRFTokens;

      fire = Rails.fire, delegate = Rails.delegate, getData = Rails.getData, $ = Rails.$, refreshCSRFTokens = Rails.refreshCSRFTokens, CSRFProtection = Rails.CSRFProtection, enableElement = Rails.enableElement, disableElement = Rails.disableElement, handleDisabledElement = Rails.handleDisabledElement, handleConfirm = Rails.handleConfirm, handleRemote = Rails.handleRemote, formSubmitButtonClick = Rails.formSubmitButtonClick, handleMetaClick = Rails.handleMetaClick, handleMethod = Rails.handleMethod;

      if ((typeof jQuery !== "undefined" && jQuery !== null) && (jQuery.ajax != null) && !jQuery.rails) {
        jQuery.rails = Rails;
        jQuery.ajaxPrefilter(function(options, originalOptions, xhr) {
          if (!options.crossDomain) {
            return CSRFProtection(xhr);
          }
        });
      }

      Rails.start = function() {
        if (window._rails_loaded) {
          throw new Error('rails-ujs has already been loaded!');
        }
        window.addEventListener('pageshow', function() {
          $(Rails.formEnableSelector).forEach(function(el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
          return $(Rails.linkDisableSelector).forEach(function(el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
        });
        delegate(document, Rails.linkDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.linkDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.linkClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.linkClickSelector, 'click', handleConfirm);
        delegate(document, Rails.linkClickSelector, 'click', handleMetaClick);
        delegate(document, Rails.linkClickSelector, 'click', disableElement);
        delegate(document, Rails.linkClickSelector, 'click', handleRemote);
        delegate(document, Rails.linkClickSelector, 'click', handleMethod);
        delegate(document, Rails.buttonClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.buttonClickSelector, 'click', handleConfirm);
        delegate(document, Rails.buttonClickSelector, 'click', disableElement);
        delegate(document, Rails.buttonClickSelector, 'click', handleRemote);
        delegate(document, Rails.inputChangeSelector, 'change', handleDisabledElement);
        delegate(document, Rails.inputChangeSelector, 'change', handleConfirm);
        delegate(document, Rails.inputChangeSelector, 'change', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', handleDisabledElement);
        delegate(document, Rails.formSubmitSelector, 'submit', handleConfirm);
        delegate(document, Rails.formSubmitSelector, 'submit', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', function(e) {
          return setTimeout((function() {
            return disableElement(e);
          }), 13);
        });
        delegate(document, Rails.formSubmitSelector, 'ajax:send', disableElement);
        delegate(document, Rails.formSubmitSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.formInputClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.formInputClickSelector, 'click', handleConfirm);
        delegate(document, Rails.formInputClickSelector, 'click', formSubmitButtonClick);
        document.addEventListener('DOMContentLoaded', refreshCSRFTokens);
        return window._rails_loaded = true;
      };

      if (window.Rails === Rails && fire(document, 'rails:attachBindings')) {
        Rails.start();
      }

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = Rails;
  } else if (typeof define === "function" && define.amd) {
    define(Rails);
  }
}).call(this);
/*
Turbolinks 5.0.3
Copyright © 2017 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame&&null!=window.addEventListener}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r,n=[].slice;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.throttle=function(t){var e;return e=null,function(){var r;return r=1<=arguments.length?n.call(arguments,0):[],null!=e?e:e=requestAnimationFrame(function(n){return function(){return e=null,t.apply(n,r)}}(this))}},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.History=function(){function r(t){this.delegate=t,this.onPageLoad=e(this.onPageLoad,this),this.onPopState=e(this.onPopState,this)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),addEventListener("load",this.onPageLoad,!1),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),removeEventListener("load",this.onPageLoad,!1),this.started=!1):void 0},r.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},r.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},r.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},r.prototype.onPageLoad=function(e){return t.defer(function(t){return function(){return t.pageLoaded=!0}}(this))},r.prototype.shouldHandlePopState=function(){return this.pageIsLoaded()},r.prototype.pageIsLoaded=function(){return this.pageLoaded||"complete"===document.readyState},r.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},r}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,l;for(this.element=t,this.elements={},l=this.element.childNodes,s=0,u=l.length;u>s;s++)i=l[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function r(r){this.delegate=r,this.onScroll=e(this.onScroll,this),this.onScroll=t.throttle(this.onScroll)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},r.prototype.scrollToElement=function(t){return t.scrollIntoView()},r.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},r.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},r.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},r}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){
return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target]):not([download])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
(function() {
  var context = this;

  (function() {
    (function() {
      var slice = [].slice;

      this.ActionCable = {
        INTERNAL: {
          "message_types": {
            "welcome": "welcome",
            "ping": "ping",
            "confirmation": "confirm_subscription",
            "rejection": "reject_subscription"
          },
          "default_mount_path": "/cable",
          "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
        },
        WebSocket: window.WebSocket,
        logger: window.console,
        createConsumer: function(url) {
          var ref;
          if (url == null) {
            url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
          }
          return new ActionCable.Consumer(this.createWebSocketURL(url));
        },
        getConfig: function(name) {
          var element;
          element = document.head.querySelector("meta[name='action-cable-" + name + "']");
          return element != null ? element.getAttribute("content") : void 0;
        },
        createWebSocketURL: function(url) {
          var a;
          if (url && !/^wss?:/i.test(url)) {
            a = document.createElement("a");
            a.href = url;
            a.href = a.href;
            a.protocol = a.protocol.replace("http", "ws");
            return a.href;
          } else {
            return url;
          }
        },
        startDebugging: function() {
          return this.debugging = true;
        },
        stopDebugging: function() {
          return this.debugging = null;
        },
        log: function() {
          var messages, ref;
          messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          if (this.debugging) {
            messages.push(Date.now());
            return (ref = this.logger).log.apply(ref, ["[ActionCable]"].concat(slice.call(messages)));
          }
        }
      };

    }).call(this);
  }).call(context);

  var ActionCable = context.ActionCable;

  (function() {
    (function() {
      var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

      ActionCable.ConnectionMonitor = (function() {
        var clamp, now, secondsSince;

        ConnectionMonitor.pollInterval = {
          min: 3,
          max: 30
        };

        ConnectionMonitor.staleThreshold = 6;

        function ConnectionMonitor(connection) {
          this.connection = connection;
          this.visibilityDidChange = bind(this.visibilityDidChange, this);
          this.reconnectAttempts = 0;
        }

        ConnectionMonitor.prototype.start = function() {
          if (!this.isRunning()) {
            this.startedAt = now();
            delete this.stoppedAt;
            this.startPolling();
            document.addEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
          }
        };

        ConnectionMonitor.prototype.stop = function() {
          if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();
            document.removeEventListener("visibilitychange", this.visibilityDidChange);
            return ActionCable.log("ConnectionMonitor stopped");
          }
        };

        ConnectionMonitor.prototype.isRunning = function() {
          return (this.startedAt != null) && (this.stoppedAt == null);
        };

        ConnectionMonitor.prototype.recordPing = function() {
          return this.pingedAt = now();
        };

        ConnectionMonitor.prototype.recordConnect = function() {
          this.reconnectAttempts = 0;
          this.recordPing();
          delete this.disconnectedAt;
          return ActionCable.log("ConnectionMonitor recorded connect");
        };

        ConnectionMonitor.prototype.recordDisconnect = function() {
          this.disconnectedAt = now();
          return ActionCable.log("ConnectionMonitor recorded disconnect");
        };

        ConnectionMonitor.prototype.startPolling = function() {
          this.stopPolling();
          return this.poll();
        };

        ConnectionMonitor.prototype.stopPolling = function() {
          return clearTimeout(this.pollTimeout);
        };

        ConnectionMonitor.prototype.poll = function() {
          return this.pollTimeout = setTimeout((function(_this) {
            return function() {
              _this.reconnectIfStale();
              return _this.poll();
            };
          })(this), this.getPollInterval());
        };

        ConnectionMonitor.prototype.getPollInterval = function() {
          var interval, max, min, ref;
          ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
          interval = 5 * Math.log(this.reconnectAttempts + 1);
          return Math.round(clamp(interval, min, max) * 1000);
        };

        ConnectionMonitor.prototype.reconnectIfStale = function() {
          if (this.connectionIsStale()) {
            ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
            this.reconnectAttempts++;
            if (this.disconnectedRecently()) {
              return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
            } else {
              ActionCable.log("ConnectionMonitor reopening");
              return this.connection.reopen();
            }
          }
        };

        ConnectionMonitor.prototype.connectionIsStale = function() {
          var ref;
          return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.disconnectedRecently = function() {
          return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
        };

        ConnectionMonitor.prototype.visibilityDidChange = function() {
          if (document.visibilityState === "visible") {
            return setTimeout((function(_this) {
              return function() {
                if (_this.connectionIsStale() || !_this.connection.isOpen()) {
                  ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
                  return _this.connection.reopen();
                }
              };
            })(this), 200);
          }
        };

        now = function() {
          return new Date().getTime();
        };

        secondsSince = function(time) {
          return (now() - time) / 1000;
        };

        clamp = function(number, min, max) {
          return Math.max(min, Math.min(max, number));
        };

        return ConnectionMonitor;

      })();

    }).call(this);
    (function() {
      var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
        slice = [].slice,
        bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

      ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

      supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

      ActionCable.Connection = (function() {
        Connection.reopenDelay = 500;

        function Connection(consumer) {
          this.consumer = consumer;
          this.open = bind(this.open, this);
          this.subscriptions = this.consumer.subscriptions;
          this.monitor = new ActionCable.ConnectionMonitor(this);
          this.disconnected = true;
        }

        Connection.prototype.send = function(data) {
          if (this.isOpen()) {
            this.webSocket.send(JSON.stringify(data));
            return true;
          } else {
            return false;
          }
        };

        Connection.prototype.open = function() {
          if (this.isActive()) {
            ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
            return false;
          } else {
            ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
            if (this.webSocket != null) {
              this.uninstallEventHandlers();
            }
            this.webSocket = new ActionCable.WebSocket(this.consumer.url, protocols);
            this.installEventHandlers();
            this.monitor.start();
            return true;
          }
        };

        Connection.prototype.close = function(arg) {
          var allowReconnect, ref1;
          allowReconnect = (arg != null ? arg : {
            allowReconnect: true
          }).allowReconnect;
          if (!allowReconnect) {
            this.monitor.stop();
          }
          if (this.isActive()) {
            return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
          }
        };

        Connection.prototype.reopen = function() {
          var error;
          ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
          if (this.isActive()) {
            try {
              return this.close();
            } catch (error1) {
              error = error1;
              return ActionCable.log("Failed to reopen WebSocket", error);
            } finally {
              ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
              setTimeout(this.open, this.constructor.reopenDelay);
            }
          } else {
            return this.open();
          }
        };

        Connection.prototype.getProtocol = function() {
          var ref1;
          return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
        };

        Connection.prototype.isOpen = function() {
          return this.isState("open");
        };

        Connection.prototype.isActive = function() {
          return this.isState("open", "connecting");
        };

        Connection.prototype.isProtocolSupported = function() {
          var ref1;
          return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
        };

        Connection.prototype.isState = function() {
          var ref1, states;
          states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
        };

        Connection.prototype.getState = function() {
          var ref1, state, value;
          for (state in WebSocket) {
            value = WebSocket[state];
            if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
              return state.toLowerCase();
            }
          }
          return null;
        };

        Connection.prototype.installEventHandlers = function() {
          var eventName, handler;
          for (eventName in this.events) {
            handler = this.events[eventName].bind(this);
            this.webSocket["on" + eventName] = handler;
          }
        };

        Connection.prototype.uninstallEventHandlers = function() {
          var eventName;
          for (eventName in this.events) {
            this.webSocket["on" + eventName] = function() {};
          }
        };

        Connection.prototype.events = {
          message: function(event) {
            var identifier, message, ref1, type;
            if (!this.isProtocolSupported()) {
              return;
            }
            ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
            switch (type) {
              case message_types.welcome:
                this.monitor.recordConnect();
                return this.subscriptions.reload();
              case message_types.ping:
                return this.monitor.recordPing();
              case message_types.confirmation:
                return this.subscriptions.notify(identifier, "connected");
              case message_types.rejection:
                return this.subscriptions.reject(identifier);
              default:
                return this.subscriptions.notify(identifier, "received", message);
            }
          },
          open: function() {
            ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
            this.disconnected = false;
            if (!this.isProtocolSupported()) {
              ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
              return this.close({
                allowReconnect: false
              });
            }
          },
          close: function(event) {
            ActionCable.log("WebSocket onclose event");
            if (this.disconnected) {
              return;
            }
            this.disconnected = true;
            this.monitor.recordDisconnect();
            return this.subscriptions.notifyAll("disconnected", {
              willAttemptReconnect: this.monitor.isRunning()
            });
          },
          error: function() {
            return ActionCable.log("WebSocket onerror event");
          }
        };

        return Connection;

      })();

    }).call(this);
    (function() {
      var slice = [].slice;

      ActionCable.Subscriptions = (function() {
        function Subscriptions(consumer) {
          this.consumer = consumer;
          this.subscriptions = [];
        }

        Subscriptions.prototype.create = function(channelName, mixin) {
          var channel, params, subscription;
          channel = channelName;
          params = typeof channel === "object" ? channel : {
            channel: channel
          };
          subscription = new ActionCable.Subscription(this.consumer, params, mixin);
          return this.add(subscription);
        };

        Subscriptions.prototype.add = function(subscription) {
          this.subscriptions.push(subscription);
          this.consumer.ensureActiveConnection();
          this.notify(subscription, "initialized");
          this.sendCommand(subscription, "subscribe");
          return subscription;
        };

        Subscriptions.prototype.remove = function(subscription) {
          this.forget(subscription);
          if (!this.findAll(subscription.identifier).length) {
            this.sendCommand(subscription, "unsubscribe");
          }
          return subscription;
        };

        Subscriptions.prototype.reject = function(identifier) {
          var i, len, ref, results, subscription;
          ref = this.findAll(identifier);
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            this.forget(subscription);
            this.notify(subscription, "rejected");
            results.push(subscription);
          }
          return results;
        };

        Subscriptions.prototype.forget = function(subscription) {
          var s;
          this.subscriptions = (function() {
            var i, len, ref, results;
            ref = this.subscriptions;
            results = [];
            for (i = 0, len = ref.length; i < len; i++) {
              s = ref[i];
              if (s !== subscription) {
                results.push(s);
              }
            }
            return results;
          }).call(this);
          return subscription;
        };

        Subscriptions.prototype.findAll = function(identifier) {
          var i, len, ref, results, s;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            s = ref[i];
            if (s.identifier === identifier) {
              results.push(s);
            }
          }
          return results;
        };

        Subscriptions.prototype.reload = function() {
          var i, len, ref, results, subscription;
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.sendCommand(subscription, "subscribe"));
          }
          return results;
        };

        Subscriptions.prototype.notifyAll = function() {
          var args, callbackName, i, len, ref, results, subscription;
          callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
          ref = this.subscriptions;
          results = [];
          for (i = 0, len = ref.length; i < len; i++) {
            subscription = ref[i];
            results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
          }
          return results;
        };

        Subscriptions.prototype.notify = function() {
          var args, callbackName, i, len, results, subscription, subscriptions;
          subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
          if (typeof subscription === "string") {
            subscriptions = this.findAll(subscription);
          } else {
            subscriptions = [subscription];
          }
          results = [];
          for (i = 0, len = subscriptions.length; i < len; i++) {
            subscription = subscriptions[i];
            results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
          }
          return results;
        };

        Subscriptions.prototype.sendCommand = function(subscription, command) {
          var identifier;
          identifier = subscription.identifier;
          return this.consumer.send({
            command: command,
            identifier: identifier
          });
        };

        return Subscriptions;

      })();

    }).call(this);
    (function() {
      ActionCable.Subscription = (function() {
        var extend;

        function Subscription(consumer, params, mixin) {
          this.consumer = consumer;
          if (params == null) {
            params = {};
          }
          this.identifier = JSON.stringify(params);
          extend(this, mixin);
        }

        Subscription.prototype.perform = function(action, data) {
          if (data == null) {
            data = {};
          }
          data.action = action;
          return this.send(data);
        };

        Subscription.prototype.send = function(data) {
          return this.consumer.send({
            command: "message",
            identifier: this.identifier,
            data: JSON.stringify(data)
          });
        };

        Subscription.prototype.unsubscribe = function() {
          return this.consumer.subscriptions.remove(this);
        };

        extend = function(object, properties) {
          var key, value;
          if (properties != null) {
            for (key in properties) {
              value = properties[key];
              object[key] = value;
            }
          }
          return object;
        };

        return Subscription;

      })();

    }).call(this);
    (function() {
      ActionCable.Consumer = (function() {
        function Consumer(url) {
          this.url = url;
          this.subscriptions = new ActionCable.Subscriptions(this);
          this.connection = new ActionCable.Connection(this);
        }

        Consumer.prototype.send = function(data) {
          return this.connection.send(data);
        };

        Consumer.prototype.connect = function() {
          return this.connection.open();
        };

        Consumer.prototype.disconnect = function() {
          return this.connection.close({
            allowReconnect: false
          });
        };

        Consumer.prototype.ensureActiveConnection = function() {
          if (!this.connection.isActive()) {
            return this.connection.open();
          }
        };

        return Consumer;

      })();

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = ActionCable;
  } else if (typeof define === "function" && define.amd) {
    define(ActionCable);
  }
}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);
/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);












// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//






;
