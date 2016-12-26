

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
    "Actions": "\u0c1a\u0c30\u0c4d\u0c2f\u0c32\u0c41", 
    "Cancel": "\u0c30\u0c26\u0c4d\u0c26\u0c41", 
    "Country": "\u0c26\u0c47\u0c36\u0c02", 
    "Delete": "\u0c24\u0c4a\u0c32\u0c17\u0c3f\u0c02\u0c1a\u0c02\u0c21\u0c3f", 
    "Donate": "\u0c26\u0c3e\u0c28\u0c02", 
    "Duplicate": "\u0c28\u0c15\u0c3f\u0c32\u0c40", 
    "Gender": "\u0c32\u0c3f\u0c02\u0c17\u0c2e\u0c41", 
    "Groups": "\u0c38\u0c2e\u0c42\u0c39\u0c3e\u0c32\u0c41", 
    "Less": "\u0c24\u0c15\u0c4d\u0c15\u0c41\u0c35", 
    "Middle": "\u0c2e\u0c27\u0c4d\u0c2f", 
    "More": "\u0c0e\u0c15\u0c4d\u0c15\u0c41\u0c35", 
    "Name": "\u0c2a\u0c47\u0c30\u0c41", 
    "OK": "\u0c38\u0c30\u0c47", 
    "Ok": "\u0c38\u0c30\u0c47", 
    "Organization": "\u0c38\u0c02\u0c38\u0c4d\u0c25", 
    "Other": "\u0c07\u0c24\u0c30", 
    "Title": "\u0c36\u0c40\u0c30\u0c4d\u0c37\u0c3f\u0c15", 
    "Warning": "\u0c39\u0c46\u0c1a\u0c4d\u0c1a\u0c30\u0c3f\u0c15", 
    "anonymous": "\u0c05\u0c28\u0c3e\u0c2e\u0c15", 
    "name": "\u0c2a\u0c47\u0c30\u0c41", 
    "remove": "\u0c24\u0c4a\u0c32\u0c17\u0c3f\u0c02\u0c1a\u0c02\u0c21\u0c3f"
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
    "DATE_FORMAT": "j F Y", 
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
    "SHORT_DATE_FORMAT": "j M Y", 
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

