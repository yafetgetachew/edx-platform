

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
    "Cancel": "\u0ab0\u0aa6", 
    "Close": "\u0aac\u0a82\u0aa7", 
    "Collapse Instructions": "\u0ab8\u0ac2\u0a9a\u0aa8\u0abe\u0a93 \u0aa8\u0abe\u0aa8\u0ac0 \u0a95\u0ab0\u0acb.", 
    "Course Number": "\u0a85\u0aad\u0acd\u0aaf\u0abe\u0ab8\u0a95\u0acd\u0ab0\u0aae \u0a95\u0acd\u0ab0\u0aae\u0abe\u0a82\u0a95", 
    "Dashboard": "\u0aa1\u0ac7\u0ab6\u0aac\u0acb\u0ab0\u0acd\u0aa1", 
    "Date": "\u0aa4\u0abe\u0ab0\u0ac0\u0a96", 
    "Delete": "\u0aa6\u0ac1\u0ab0 \u0a95\u0ab0\u0acb", 
    "Donate": "\u0aa6\u0abe\u0aa8", 
    "Edit": "\u0aab\u0ac7\u0ab0\u0aab\u0abe\u0ab0", 
    "Email": "\u0a88-\u0aae\u0ac7\u0ab2", 
    "Error:": "bhul", 
    "Forgot password?": "\u0aaa\u0abe\u0ab8\u0ab5\u0ab0\u0acd\u0aa1 \u0aad\u0ac2\u0ab2\u0ac0 \u0a97\u0aaf\u0abe ?", 
    "Full Name": "\u0a86\u0a96\u0ac1\u0a82 \u0aa8\u0abe\u0aae", 
    "Hide Annotations": "\u0ab5\u0abf\u0ab5\u0ab0\u0aa3 \u0a9b\u0ac1\u0aaa\u0abe\u0ab5\u0acb", 
    "Password": "\u0aaa\u0abe\u0ab8\u0ab5\u0ab0\u0acd\u0aa1", 
    "Reset Password": "\u0ab0\u0ac0\u0ab8\u0ac7\u0a9f \u0aaa\u0abe\u0ab8\u0ab5\u0ab0\u0acd\u0aa1", 
    "Section": "vibhag", 
    "Settings": "\u0ab8\u0ac7\u0a9f\u0abf\u0a82\u0a97", 
    "Start Date": "\u0ab6\u0ab0\u0ac1\t\t\t\u0a86\u0aa4 \u0aa8\u0ac0 \u0aa4\u0abe\u0ab0\u0ac0\u0a96", 
    "Title": "\u0ab6\u0ac0\u0ab0\u0acd\u0ab7\u0a95", 
    "Total": "\u0a95\u0ac1\u0ab2", 
    "View": "\u0a9c\u0acb\u0ab5\u0ac1\u0a82", 
    "View Archived Course": "\u0ab8\u0a82\u0a97\u0acd\u0ab0\u0ab9\u0abf\u0aa4 \u0a85\u0aad\u0acd\u0aaf\u0abe\u0ab8\u0a95\u0acd\u0ab0\u0aae \u0a9c\u0ac1\u0a93", 
    "View Course": "\u0a85\u0aad\u0acd\u0aaf\u0abe\u0ab8\u0a95\u0acd\u0ab0\u0aae \u0a9c\u0ac1\u0a93", 
    "What does this mean?": "\u0a86\u0aa8\u0acb \u0ab6\u0ac1\u0a82 \u0a85\u0ab0\u0acd\u0aa5 \u0a9b\u0ac7?", 
    "anonymous": "\u0a85\u0aa8\u0abe\u0aae\u0ac0", 
    "close": "\u0aac\u0a82\u0aa7", 
    "name": "\u0aa8\u0abe\u0aae"
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
    "DATE_FORMAT": "N j, Y", 
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
    "MONTH_DAY_FORMAT": "F j", 
    "NUMBER_GROUPING": "0", 
    "SHORT_DATETIME_FORMAT": "m/d/Y P", 
    "SHORT_DATE_FORMAT": "m/d/Y", 
    "THOUSAND_SEPARATOR": ",", 
    "TIME_FORMAT": "P", 
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

