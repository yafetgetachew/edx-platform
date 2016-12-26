

(function (globals) {

  var django = globals.django || (globals.django = {});

  
  django.pluralidx = function (n) {
    var v=(n != 1);
    if (typeof(v) == 'boolean') {
      return v ? 1 : 0;
    } else {
      return v;
    }
  };
  

  
  /* gettext library */

  django.catalog = {
    "Cancel": "\u09ac\u09be\u09a4\u09bf\u09b2 ", 
    "Close": "\u09ac\u09a8\u09cd\u09a7 \u0995\u09b0\u09be ", 
    "Collapse Instructions": "\u09a8\u09bf\u09b0\u09cd\u09a6\u09c7\u09b6 \u09b2\u09c1\u0995\u09be\u09a8  ", 
    "Commentary": "\u09a7\u09be\u09b0\u09be\u09ad\u09be\u09b7\u09cd\u09af ", 
    "Delete": "\u09ae\u09c1\u099b\u09c7 \u09ab\u09c7\u09b2\u09be ", 
    "Error": "\u09ac\u09bf\u09ad\u09cd\u09b0\u09ae\n\u09ad\u09c1\u09b2", 
    "Expand Instructions": "\u09ac\u09bf\u09b8\u09cd\u09a4\u09be\u09b0\u09bf\u09a4 \u09a8\u09bf\u09b0\u09cd\u09a6\u09c7\u09b6 \u09a6\u09c7\u0996\u09be\u09a8 ", 
    "Hide Annotations": "\u09ae\u09a8\u09cd\u09a4\u09ac\u09cd\u09af \u09b2\u09c1\u0995\u09be\u09a8 ", 
    "Name": "\u09a8\u09be\u09ae ", 
    "OK": "\u09a0\u09bf\u0995 \u0986\u099b\u09c7 ", 
    "Reply to Annotation": "\u09ac\u09bf\u09ac\u09b0\u09a3 \u09ac\u09be \u099f\u09bf\u0995\u09be\u09b0 \u0989\u09a4\u09cd\u09a4\u09b0", 
    "Save": "\u099c\u09ae\u09be\u09a8\u09cb \n\u09b0\u0995\u09cd\u09b7\u09be \u0995\u09b0\u09be", 
    "Show Annotations": "\u09ae\u09a8\u09cd\u09a4\u09ac\u09cd\u09af \u09a6\u09c7\u0996\u09be\u09a8 ", 
    "Submit": "\u099c\u09ae\u09be \u0995\u09b0\u09be\n\u099c\u09ae\u09be \u09a6\u09c7\u0993\u09df\u09be ", 
    "This link will open in a new browser window/tab": "\u09b2\u09bf\u0999\u09cd\u0995\u099f\u09bf \u098f\u0995\u099f\u09bf \u09a8\u09a4\u09c1\u09a8 \u09ac\u09cd\u09b0\u09be\u0989\u099c\u09be\u09b0 \u0989\u0987\u09a8\u09cd\u09a1\u09cb \u09ac\u09be \u099f\u09cd\u09af\u09be\u09ac\u09c7 \u0996\u09c1\u09b2\u09ac\u09c7 ", 
    "Unknown": "\u0985\u099c\u09be\u09a8\u09be ", 
    "Upload File": "\u09ab\u09be\u0987\u09b2 \u0986\u09aa\u09b2\u09cb\u09a1 \u0995\u09b0\u09be\n\u09ab\u09be\u0987\u09b2 \u0987\u09a8\u09cd\u099f\u09be\u09b0\u09a8\u09c7\u099f-\u098f \u09a4\u09c1\u09b2\u09c7 \u09b0\u09be\u0996\u09be  ", 
    "anonymous": "\u09ac\u09c7\u09a8\u09be\u09ae\u09c0"
  };

  django.gettext = function (msgid) {
    var value = django.catalog[msgid];
    if (typeof(value) == 'undefined') {
      return msgid;
    } else {
      return (typeof(value) == 'string') ? value : value[0];
    }
  };

  django.ngettext = function (singular, plural, count) {
    var value = django.catalog[singular];
    if (typeof(value) == 'undefined') {
      return (count == 1) ? singular : plural;
    } else {
      return value[django.pluralidx(count)];
    }
  };

  django.gettext_noop = function (msgid) { return msgid; };

  django.pgettext = function (context, msgid) {
    var value = django.gettext(context + '\x04' + msgid);
    if (value.indexOf('\x04') != -1) {
      value = msgid;
    }
    return value;
  };

  django.npgettext = function (context, singular, plural, count) {
    var value = django.ngettext(context + '\x04' + singular, context + '\x04' + plural, count);
    if (value.indexOf('\x04') != -1) {
      value = django.ngettext(singular, plural, count);
    }
    return value;
  };
  

  django.interpolate = function (fmt, obj, named) {
    if (named) {
      return fmt.replace(/%\(\w+\)s/g, function(match){return String(obj[match.slice(2,-2)])});
    } else {
      return fmt.replace(/%s/g, function(match){return String(obj.shift())});
    }
  };


  /* formatting library */

  django.formats = {
    "DATETIME_FORMAT": "N j, Y, P", 
    "DATETIME_INPUT_FORMATS": [
      "%Y-%m-%d %H:%M:%S", 
      "%Y-%m-%d %H:%M:%S.%f", 
      "%Y-%m-%d %H:%M", 
      "%Y-%m-%d", 
      "%m/%d/%Y %H:%M:%S", 
      "%m/%d/%Y %H:%M:%S.%f", 
      "%m/%d/%Y %H:%M", 
      "%m/%d/%Y", 
      "%m/%d/%y %H:%M:%S", 
      "%m/%d/%y %H:%M:%S.%f", 
      "%m/%d/%y %H:%M", 
      "%m/%d/%y"
    ], 
    "DATE_FORMAT": "j F, Y", 
    "DATE_INPUT_FORMATS": [
      "%Y-%m-%d", 
      "%m/%d/%Y", 
      "%m/%d/%y", 
      "%b %d %Y", 
      "%b %d, %Y", 
      "%d %b %Y", 
      "%d %b, %Y", 
      "%B %d %Y", 
      "%B %d, %Y", 
      "%d %B %Y", 
      "%d %B, %Y"
    ], 
    "DECIMAL_SEPARATOR": ".", 
    "FIRST_DAY_OF_WEEK": "0", 
    "MONTH_DAY_FORMAT": "j F", 
    "NUMBER_GROUPING": "0", 
    "SHORT_DATETIME_FORMAT": "m/d/Y P", 
    "SHORT_DATE_FORMAT": "j M, Y", 
    "THOUSAND_SEPARATOR": ",", 
    "TIME_FORMAT": "g:i A", 
    "TIME_INPUT_FORMATS": [
      "%H:%M:%S", 
      "%H:%M:%S.%f", 
      "%H:%M"
    ], 
    "YEAR_MONTH_FORMAT": "F Y"
  };

  django.get_format = function (format_type) {
    var value = django.formats[format_type];
    if (typeof(value) == 'undefined') {
      return format_type;
    } else {
      return value;
    }
  };

  /* add to global namespace */
  globals.pluralidx = django.pluralidx;
  globals.gettext = django.gettext;
  globals.ngettext = django.ngettext;
  globals.gettext_noop = django.gettext_noop;
  globals.pgettext = django.pgettext;
  globals.npgettext = django.npgettext;
  globals.interpolate = django.interpolate;
  globals.get_format = django.get_format;

}(this));

