

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
    "%(num_questions)s question": [
      "%(num_questions)s \u09aa\u09cd\u09b0\u09b6\u09cd\u09a8\u200b", 
      "%(num_questions)s \u09aa\u09cd\u09b0\u09b6\u09cd\u09a8\u200b \u0997\u09c1\u09b2\u09bf"
    ], 
    "%(num_students)s student": [
      "%(num_students)s \u09b6\u09bf\u0995\u09cd\u09b7\u09be\u09b0\u09cd\u09a5\u09c0", 
      "%(num_students)s \u09b6\u09bf\u0995\u09cd\u09b7\u09be\u09b0\u09cd\u09a5\u09c0\u09b0\u09be"
    ], 
    "Add to Dictionary": "\u0985\u09ad\u09bf\u09a7\u09be\u09a8\u09c7 \u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8", 
    "Are you sure you want to delete this post?": "\u0986\u09aa\u09a8\u09bf \u0995\u09bf \u09a8\u09bf\u09b6\u09cd\u099a\u09bf\u09a4 \u0986\u09aa\u09a8\u09bf \u098f\u0987 \u09aa\u09cb\u09b8\u09cd\u099f\u099f\u09bf \u09ae\u09c1\u099b\u09c7 \u09ab\u09c7\u09b2\u09a4\u09c7 \u099a\u09be\u09a8?", 
    "Are you sure you want to delete this response?": "\u0986\u09aa\u09a8\u09bf \u0995\u09bf \u09a8\u09bf\u09b6\u09cd\u099a\u09bf\u09a4 \u0986\u09aa\u09a8\u09bf \u098f\u0987 \u099c\u09ac\u09be\u09ac \u099f\u09bf \u09ae\u09c1\u099b\u09c7 \u09ab\u09c7\u09b2\u09a4\u09c7 \u099a\u09be\u09a8?", 
    "Author": "\u09b2\u09c7\u0996\u0995", 
    "Background color": "\u09ac\u09cd\u09af\u09be\u0995\u0997\u09cd\u09b0\u09be\u0989\u09a8\u09cd\u09a1 \u09b0\u0982", 
    "Blockquote (Ctrl+Q)": "\u0995\u09cb\u099f\u09c7\u09b6\u09a8 (Ctrl+Q)", 
    "Body": "\u09ac\u09a1\u09bf", 
    "Bold": "\u09ac\u09cb\u09b2\u09cd\u09a1", 
    "Bold (Ctrl+B)": "\u09ac\u09cb\u09b2\u09cd\u09a1 (Ctrl+B)", 
    "Border": "\u09ac\u09b0\u09cd\u09a1\u09be\u09b0", 
    "Border color": "\u09ac\u09b0\u09cd\u09a1\u09be\u09b0 \u098f\u09b0 \u09b0\u0982", 
    "Bottom": "\u09a8\u09c0\u099a", 
    "Bulleted List (Ctrl+U)": "\u09ac\u09c1\u09b2\u09c7\u099f \u09a4\u09be\u09b2\u09bf\u0995\u09be (Ctrl+U)", 
    "Cancel": "\u09ac\u09be\u09a4\u09bf\u09b2", 
    "Caption": "\u0995\u09cd\u09af\u09be\u09aa\u09b6\u09a8", 
    "Circle": "\u09ac\u09c3\u09a4\u09cd\u09a4", 
    "Close": "\u09ac\u09a8\u09cd\u09a7", 
    "Close Calculator": "\u0995\u09cd\u09af\u09be\u09b2\u0995\u09c1\u09b2\u09c7\u099f\u09b0 \u09ac\u09a8\u09cd\u09a7 \u0995\u09b0\u09cb", 
    "Code": "\u0995\u09cb\u09a1", 
    "Code Sample (Ctrl+K)": "\u09a8\u09ae\u09c1\u09a8\u09be \u0995\u09cb\u09a1 (Ctrl+K)", 
    "Collapse Instructions": "\u09a8\u09bf\u09b0\u09cd\u09a6\u09c7\u09b6 \u09ac\u09a8\u09cd\u09a7 \u0995\u09b0\u09c1\u09a8", 
    "Color": "\u09b0\u0982", 
    "Column": "\u0995\u09b2\u09be\u09ae", 
    "Commentary": "\u09a7\u09be\u09b0\u09be\u09ad\u09be\u09b7\u09cd\u09af", 
    "Community TA": "\u0995\u09ae\u09bf\u0989\u09a8\u09bf\u099f\u09bf \u09b6\u09bf\u0995\u09cd\u09b7\u0995 \u09b8\u09b9\u0995\u09be\u09b0\u09c0", 
    "Copy": "\u0995\u09aa\u09bf", 
    "Cut": "\u0995\u09be\u099f", 
    "Cut row": "\u0995\u09be\u099f \u09b0\u09cb", 
    "Default": "\u09a1\u09bf\u09ab\u09b2\u09cd\u099f", 
    "Delete": "\u09ae\u09c1\u099b\u09c1\u09a8", 
    "Delete column": "\u0995\u09b2\u09be\u09ae \u09ae\u09c1\u099b\u09c7 \u09ab\u09c7\u09b2\u09c1\u09a8", 
    "Delete row": "\u09b0\u09cb \u09ae\u09c1\u099b\u09c7 \u09ab\u09c7\u09b2\u09c1\u09a8", 
    "Delete table": "\u099f\u09c7\u09ac\u09bf\u09b2 \u09ae\u09c1\u099b\u09c7 \u09ab\u09c7\u09b2\u09c1\u09a8", 
    "Description": "\u09ac\u09bf\u09ac\u09b0\u09a8", 
    "Discussion": "\u0986\u09b2\u09cb\u099a\u09a8\u09be", 
    "Div": "Div", 
    "Edit": "\u09b8\u09ae\u09cd\u09aa\u09be\u09a6\u09a8\u09be", 
    "Error": "\u09b8\u09ae\u09b8\u09cd\u09af\u09be", 
    "Error generating grades. Please try again.": "\u0997\u09cd\u09b0\u09c7\u09a1 \u09aa\u09cd\u09b0\u09b8\u09cd\u09a4\u09c1\u09a4 \u0995\u09b0\u09be \u09af\u09be\u09df \u09a8\u09bf\u0964 \u0985\u09a8\u09c1\u0997\u09cd\u09b0\u09b9 \u0995\u09b0\u09c7 \u0986\u09ac\u09be\u09b0 \u099a\u09c7\u09b7\u09cd\u099f\u09be \u0995\u09b0\u09c1\u09a8\u0964", 
    "Error getting student list.": "\u09b6\u09bf\u0995\u09cd\u09b7\u09be\u09b0\u09cd\u09a5\u09c0\u09a6\u09c7\u09b0 \u09a4\u09be\u09b2\u09bf\u0995\u09be \u09aa\u09be\u0993\u09df\u09be \u09af\u09be\u09df\u09a8\u09bf\u0964", 
    "Error retrieving grading configuration.": "\u0997\u09cd\u09b0\u09c7\u09a1\u09bf\u0982 \u0995\u09a8\u09ab\u09bf\u0997\u09be\u09b0\u09c7\u09b6\u09a8 \u09aa\u09be\u0993\u09df\u09be \u09af\u09be\u09df \u09a8\u09bf\u0964", 
    "Error sending email.": "\u0987\u09ae\u09c7\u0987\u09b2 \u09aa\u09be\u09a0\u09be\u09a8\u09cb \u09af\u09be\u09df \u09a8\u09bf\u0964", 
    "Expand Instructions": "\u09ac\u09bf\u09b6\u09a6 \u09a8\u09bf\u09b0\u09cd\u09a6\u09c7\u09b6", 
    "File": "\u09ab\u09be\u0987\u09b2", 
    "Font Sizes": "\u09ab\u09a8\u09cd\u099f \u0986\u0995\u09be\u09b0", 
    "Footer": "\u09ab\u09c1\u099f\u09be\u09b0", 
    "Format": "\u09ab\u09b0\u09ae\u09cd\u09af\u09be\u099f", 
    "Formats": "\u09ab\u09b0\u09ae\u09cd\u09af\u09be\u099f\u09b8\u09ae\u09c2\u09b9", 
    "Full Name": "\u09b8\u09ae\u09cd\u09aa\u09c2\u09b0\u09cd\u09a3 \u09a8\u09be\u09ae", 
    "Fullscreen": "\u09ab\u09c1\u09b2\u09b8\u09cd\u0995\u09cd\u09b0\u09bf\u09a8", 
    "General": "\u09b8\u09be\u09a7\u09be\u09b0\u09a8", 
    "Header": "\u09b9\u09c7\u09a1\u09be\u09b0", 
    "Header 1": "\u09b9\u09c7\u09a1\u09be\u09b0 \u09e7", 
    "Header 2": "\u09b9\u09c7\u09a1\u09be\u09b0 \u09e8", 
    "Header 3": "\u09b9\u09c7\u09a1\u09be\u09b0 \u09e9", 
    "Header 4": "\u09b9\u09c7\u09a1\u09be\u09b0 \u09ea", 
    "Header 5": "\u09b9\u09c7\u09a1\u09be\u09b0 \u09eb", 
    "Header 6": "\u09b9\u09c7\u09a1\u09be\u09b0 \u09ec", 
    "Headers": "\u09b9\u09c7\u09a1\u09be\u09b0\u09b8\u09ae\u09c2\u09b9", 
    "Heading": "\u09b9\u09c7\u09a1\u09bf\u0982", 
    "Heading (Ctrl+H)": "\u09b9\u09c7\u09a1\u09bf\u0982 (Ctrl+H)", 
    "Heading 1": "\u09b9\u09c7\u09a1\u09bf\u0982 \u09e7", 
    "Heading 2": "\u09b9\u09c7\u09a1\u09bf\u0982 \u09e8", 
    "Heading 3": "\u09b9\u09c7\u09a1\u09bf\u0982 \u09e9", 
    "Heading 4": "\u09b9\u09c7\u09a1\u09bf\u0982 \u09ea", 
    "Heading 5": "\u09b9\u09c7\u09a1\u09bf\u0982 \u09eb", 
    "Heading 6": "\u09b9\u09c7\u09a1\u09bf\u0982 \u09ec", 
    "Headings": "\u09b9\u09c7\u09a1\u09bf\u0982\u09b8\u09ae\u09c2\u09b9", 
    "Height": "\u0989\u099a\u09cd\u099a\u09a4\u09be", 
    "Hide Annotations": "\u0985\u09cd\u09af\u09be\u09a8\u09cb\u099f\u09c7\u09b6\u09a8\u09b8 \u09b8\u09b0\u09be\u09a8", 
    "Horizontal Rule (Ctrl+R)": "\u0986\u09a8\u09c1\u09ad\u09c2\u09ae\u09bf\u0995 \u09b0\u09c7\u0996\u09be (Ctrl+R)", 
    "Horizontal line": "\u0986\u09a8\u09c1\u09ad\u09c2\u09ae\u09bf\u0995 \u09b0\u09c7\u0996\u09be", 
    "Horizontal space": "\u0986\u09a8\u09c1\u09ad\u09c2\u09ae\u09bf\u0995 \u09b8\u09cd\u09aa\u09c7\u09b8", 
    "Hyperlink (Ctrl+L)": "\u09b2\u09bf\u0999\u09cd\u0995 (Ctrl+L)", 
    "Image (Ctrl+G)": "\u099b\u09ac\u09bf (Ctrl+G)", 
    "Inline": "\u0987\u09a8\u09b2\u09be\u0987\u09a8", 
    "Italic (Ctrl+I)": "\u0987\u099f\u09be\u09b2\u09bf\u0995 (Ctrl+I)", 
    "List item": "\u09a4\u09be\u09b2\u09bf\u0995\u09be\u09b0 \u0986\u0987\u099f\u09c7\u09ae", 
    "Load more": "\u0986\u09b0\u09cb \u09b2\u09cb\u09a1 \u0995\u09b0\u09cb", 
    "Loading more threads": "\u0986\u09b0\u09cb \u09a5\u09cd\u09b0\u09c7\u09a1 \u09b2\u09cb\u09a1 \u0995\u09b0\u09be \u09b9\u099a\u09cd\u099b\u09c7", 
    "Loading thread list": "\u09a5\u09cd\u09b0\u09c7\u09a1 \u098f\u09b0 \u09a4\u09be\u09b2\u09bf\u0995\u09be \u09b2\u09cb\u09a1 \u0995\u09b0\u09be \u09b9\u099a\u09cd\u099b\u09c7", 
    "My Notes": "\u0986\u09ae\u09be\u09b0 \u09a8\u09cb\u099f\u09b8\u09ae\u09c2\u09b9", 
    "Name": "\u09a8\u09be\u09ae", 
    "New document": "\u09a8\u09a4\u09c1\u09a8 \u09a1\u0995\u09c1\u09ae\u09c7\u09a8\u09cd\u099f", 
    "New window": "\u09a8\u09a4\u09c1\u09a8 \u0989\u0987\u09a8\u09cd\u09a1\u09cb", 
    "Next": "\u09aa\u09b0\u09ac\u09b0\u09cd\u09a4\u09bf", 
    "No color": "\u09b0\u0982 \u099b\u09be\u09dc\u09be", 
    "Number of Students": "\u09b6\u09bf\u0995\u09cd\u09b7\u09be\u09b0\u09cd\u09a5\u09c0\u09b0 \u09b8\u0982\u0996\u09be", 
    "Numbered List (Ctrl+O)": "\u09a8\u09ae\u09cd\u09ac\u09b0\u0995\u09c3\u09a4 \u09a4\u09be\u09b2\u09bf\u0995\u09be (Ctrl+O)", 
    "OK": "\u0993\u0995\u09c7", 
    "Ok": "\u0993\u0995\u09c7", 
    "Open": "\u0996\u09cb\u09b2\u09cb", 
    "Open Calculator": "\u0995\u09cd\u09af\u09be\u09b2\u0995\u09c1\u09b2\u09c7\u099f\u09b0 \u0996\u09cb\u09b2\u09cb", 
    "Paragraph": "\u0985\u09a8\u09c1\u099a\u09cd\u099b\u09c7\u09a6", 
    "Pause": "\u09a5\u09be\u09ae\u09be\u0993", 
    "Play": "\u099a\u09be\u09b2\u09be\u0993", 
    "Please enter a student email address or username.": "\u0985\u09a8\u09c1\u0997\u09cd\u09b0\u09b9 \u0995\u09b0\u09c7 \u098f\u0995\u099f\u09bf \u09b6\u09bf\u0995\u09cd\u09b7\u09be\u09b0\u09cd\u09a5\u09c0\u09b0 \u0987\u09ae\u09c7\u0987\u09b2 \u098f\u09a1\u09cd\u09b0\u09c7\u09b8 \u0985\u09a5\u09ac\u09be \u0987\u0989\u09b8\u09be\u09b0\u09a8\u09c7\u0987\u09ae \u0987\u09a8\u09aa\u09c1\u099f \u09a6\u09bf\u09a8\u0964", 
    "Preview": "\u09aa\u09cd\u09b0\u09bf\u09ad\u09bf\u0989", 
    "Remove": "\u09b8\u09b0\u09bf\u09df\u09c7 \u09ab\u09c7\u09b2\u09c1\u09a8", 
    "Reply to Annotation": "\u0985\u09cd\u09af\u09be\u09a8\u09cb\u099f\u09c7\u09b6\u09a8\u09c7\u09b0 \u099c\u09ac\u09be\u09ac \u09a6\u09bf\u09a8", 
    "Save": "\u09b8\u09c7\u09ad", 
    "Save changes": "\u09aa\u09b0\u09bf\u09ac\u09b0\u09cd\u09a4\u09a8\u0997\u09c1\u09b2\u09cb \u09b8\u09c7\u0987\u09ad \u0995\u09b0\u09c1\u09a8", 
    "Saving": "\u09b8\u09c7\u09ad\u09bf\u0982", 
    "Search": "\u0996\u09c1\u0981\u099c\u09c1\u09a8", 
    "Show Annotations": "\u0985\u09cd\u09af\u09be\u09a8\u09cb\u099f\u09c7\u09b6\u09a8 \u09a6\u09c7\u0996\u09be\u0993", 
    "Sorry": "\u09a6\u09c1\u0983\u0996\u09bf\u09a4", 
    "Status": "\u0985\u09ac\u09b8\u09cd\u09a5\u09be", 
    "Submit": "\u09b8\u09be\u09ac\u09ae\u09bf\u099f", 
    "This link will open in a new browser window/tab": "\u098f\u0987 \u09b2\u09bf\u0999\u09cd\u0995\u099f\u09bf \u098f\u0995\u099f\u09bf \u09a8\u09a4\u09c1\u09a8 \u09ac\u09cd\u09b0\u09be\u0989\u099c\u09be\u09b0 \u0989\u0987\u09a8\u09cd\u09a1\u09cb/\u099f\u09cd\u09af\u09be\u09ac\u09c7 \u0996\u09c1\u09b2\u09ac\u09c7\u0964", 
    "Title": "\u09b6\u09bf\u09b0\u09cb\u09a8\u09be\u09ae", 
    "Unknown": "\u0985\u099c\u09be\u09a8\u09be", 
    "Upload File": "\u09ab\u09be\u0987\u09b2 \u0986\u09aa\u09b2\u09cb\u09a1", 
    "Upload completed": "\u0986\u09aa\u09cd\u09b2\u09cb\u09a1 \u09b8\u09ae\u09cd\u09aa\u09c2\u09b0\u09cd\u09a8 \u09b9\u09df\u09c7\u099b\u09c7", 
    "Uploading": "\u0986\u09aa\u09b2\u09cb\u09a1\u09bf\u0982", 
    "Username": "\u0987\u0989\u099c\u09be\u09b0\u09a8\u09c7\u09ae", 
    "We had some trouble loading more threads. Please try again.": "\u0986\u09b0\u09cb \u09a5\u09cd\u09b0\u09c7\u09a1 \u09b2\u09cb\u09a1 \u0995\u09b0\u09a4\u09c7 \u0995\u09bf\u099b\u09c1\u099f\u09be \u09b8\u09ae\u09b8\u09cd\u09af\u09be \u09b9\u09df\u09c7\u099b\u09c7\u0964 \u0985\u09a8\u09c1\u0997\u09cd\u09b0\u09b9 \u0995\u09b0\u09c7 \u0986\u09ac\u09be\u09b0 \u099a\u09c7\u09b7\u09cd\u099f\u09be \u0995\u09b0\u09c1\u09a8\u0964", 
    "Your changes have been saved.": "\u0986\u09aa\u09a8\u09be\u09b0 \u09aa\u09b0\u09bf\u09ac\u09b0\u09cd\u09a4\u09a8 \u0997\u09c1\u09b2\u09bf \u09b8\u09c7\u09ad \u0995\u09b0\u09be \u09b9\u09b2 |", 
    "Your message cannot be blank.": "\u0986\u09aa\u09a8\u09be\u09b0 \u09ae\u09c7\u09b8\u09c7\u099c \u09ab\u09be\u0981\u0995\u09be \u09b9\u09a4\u09c7 \u09aa\u09be\u09b0\u09ac\u09c7 \u09a8\u09be\u0964", 
    "Your message must have a subject.": "\u0986\u09aa\u09a8\u09be\u09b0 \u09ae\u09c7\u09b8\u09c7\u099c \u098f \u0985\u09ac\u09b6\u09cd\u09af\u0987 \u098f\u0995\u099f\u09bf \u09ac\u09bf\u09b7\u09df \u09a5\u09be\u0995\u09a4\u09c7 \u09b9\u09ac\u09c7\u0964", 
    "a day": "\u098f\u0995 \u09a6\u09bf\u09a8", 
    "about a minute": "\u09aa\u09cd\u09b0\u09be\u09df \u098f\u0995 \u09ae\u09bf\u09a8\u09bf\u099f", 
    "about a month": "\u09ae\u09be\u09b8\u0996\u09be\u09a8\u09c7\u0995", 
    "about a year": "\u09ac\u099b\u09b0\u0996\u09be\u09a8\u09c7\u0995", 
    "about an hour": "\u0998\u09a8\u09cd\u099f\u09be\u0996\u09be\u09a8\u09c7\u0995", 
    "anonymous": "\u099c\u09a8\u09c8\u0995", 
    "enter code here": "\u098f\u0996\u09be\u09a8\u09c7 \u0995\u09cb\u09a1 \u09b2\u09bf\u0996\u09c1\u09a8", 
    "less than a minute": "\u098f\u0995 \u09ae\u09bf\u09a8\u09bf\u099f\u09c7\u09b0 \u0995\u09ae \u09b8\u09ae\u09df", 
    "\u2026": "..."
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

