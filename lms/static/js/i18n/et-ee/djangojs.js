

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
    "%s ago": "%s tagasi", 
    "%s from now": "%s praegusest", 
    "Are you sure you want to delete this comment?": "Oled kindel, et soovid selle kommentaari kustutada?", 
    "Are you sure you want to delete this post?": "Oled kindel, et soovid selle postituse kustutada? ", 
    "Average": "Keskmine", 
    "Bold (Ctrl+B)": "Paks kiri (Ctrl+B)", 
    "Bulleted List (Ctrl+U)": "T\u00e4pploend (Ctrl+U)", 
    "Cancel": "Katkesta", 
    "Close": "Sulge", 
    "Code Sample (Ctrl+K)": "Koodin\u00e4idis (Ctrl+K)", 
    "Collapse Instructions": "T\u00f5mba juhised kokku", 
    "Commentary": "M\u00e4rkused", 
    "Course Number": "Kursuse number", 
    "Delete": "Kustuta", 
    "Edit": "Redigeeri", 
    "Editor": "Redigeerija", 
    "Exit full browser": "V\u00e4lju t\u00e4isekraani vaatest", 
    "Expand Instructions": "Laienda juhiseid", 
    "Fill browser": "T\u00e4ida ekraan", 
    "Heading": "Pealkiri", 
    "Heading (Ctrl+H)": "Pealkiri (Ctrl+H)", 
    "Hide Annotations": "Peida kommentaarid", 
    "Hide Discussion": "Peida arutelu", 
    "Hyperlink (Ctrl+L)": "H\u00fcperlink (Ctrl+L)", 
    "Image (Ctrl+G)": "Pilt (Ctrl+G)", 
    "Italic (Ctrl+I)": "Kaldkiri (Ctrl+I)", 
    "List item": "Nimekirja element", 
    "Load all responses": "Laadi k\u00f5ik vastused", 
    "Load more": "Laadi veel", 
    "Loading content": "Sisu laadimine", 
    "Loading more threads": "Rohkemate teemade laadmine", 
    "Loading thread list": "Teemade nimekirja laadimine", 
    "Loud": "Vali", 
    "Low": "Madal", 
    "Maximum": "Maksimaalne", 
    "Muted": "Vaigistatud", 
    "My Notes": "Minu m\u00e4rkmed", 
    "Number of Students": "\u00d5pilaste arv", 
    "Numbered List (Ctrl+O)": "Nummerdatud loend (Ctrl+O)", 
    "OK": "OK", 
    "Open": "Ava", 
    "Password": "Parool", 
    "Pause": "Paus", 
    "Pending": "Otsustamata", 
    "Play": "Esita", 
    "Please enter a username or email.": "Palun sisestage kasutajanimi v\u00f5i e-posti aadress.", 
    "Preview": "Eelvaade", 
    "Redo (Ctrl+Shift+Z)": "Tee uuesti (Ctrl+Shift+Z)", 
    "Redo (Ctrl+Y)": "Tee uuesti (Ctrl+Y)", 
    "Remove": "Eemalda", 
    "Replace": "Asenda", 
    "Reply to Annotation": "Vasta kommentaarile", 
    "Save": "Salvesta", 
    "Search": "Otsing", 
    "Settings": "S\u00e4tted", 
    "Show Annotations": "N\u00e4ita kommentaare", 
    "Show Discussion": "N\u00e4ita arutelu", 
    "Showing all responses": "N\u00e4ita k\u00f5iki vastuseid", 
    "Sorry": "Vabandust", 
    "This link will open in a new browser window/tab": "See link avaneb uues aknas/sakil", 
    "Title": "Pealkiri", 
    "Tools": "T\u00f6\u00f6riistad", 
    "Undo (Ctrl+Z)": "V\u00f5ta tagasi (Ctrl+Z)", 
    "Upload New File": "Laadi uud fail", 
    "Very loud": "V\u00e4ga vali", 
    "Very low": "V\u00e4ga madal", 
    "Video ended": "Video l\u00f5ppes", 
    "Video position": "Video asukoht", 
    "Volume": "Heli tugevus", 
    "We had some trouble loading more responses. Please try again.": "Rohkemate vastuste laadimisel tekkisid probleemid. Palun proovi uuesti.", 
    "We had some trouble loading more threads. Please try again.": "Rohkemate teemade laadimisel tekkisid probleemid. Palun proovi uuesti.", 
    "We had some trouble loading responses. Please reload the page.": "Vastuste laadimisel tekkisid probleemid. Palun laadi lehek\u00fclg uuesti.", 
    "We had some trouble loading the discussion. Please try again.": "Arutelu laadimisel tekkisid probleemid. Palun proovi uuesti.", 
    "We had some trouble loading the threads you requested. Please try again.": "Soovitud teemade laadimisel tekkisid probleemid. Palun proovi uuesti.", 
    "Your file has been deleted.": "Sinu fail on kustutatud.", 
    "a day": "p\u00e4ev", 
    "about a minute": "umbes minut", 
    "about a month": "umbes kuu", 
    "about a year": "umbes aasta", 
    "about an hour": "umbes tund", 
    "anonymous": "anon\u00fc\u00fcmne", 
    "close": "Sulge", 
    "emphasized text": "r\u00f5hutatud tekst", 
    "enter code here": "sisesta siia kood", 
    "enter link description here": "sisesta siia lingi kirjeldus", 
    "less than a minute": "v\u00e4hem kui minut", 
    "strong text": "tugev tekst", 
    "\u2026": "\u2026"
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
    "DECIMAL_SEPARATOR": ",", 
    "FIRST_DAY_OF_WEEK": "0", 
    "MONTH_DAY_FORMAT": "j F", 
    "NUMBER_GROUPING": "0", 
    "SHORT_DATETIME_FORMAT": "m/d/Y P", 
    "SHORT_DATE_FORMAT": "d.m.Y", 
    "THOUSAND_SEPARATOR": "\u00a0", 
    "TIME_FORMAT": "G:i", 
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

