

(function (globals) {

  var django = globals.django || (globals.django = {});

  
  django.pluralidx = function (n) {
    var v=0;
    if (typeof(v) == 'boolean') {
      return v ? 1 : 0;
    } else {
      return v;
    }
  };
  

  
  /* gettext library */

  django.catalog = {
    "%(comments_count)s %(span_sr_open)scomments %(span_close)s": "%(comments_count)s %(span_sr_open)s\u56de\u61c9%(span_close)s", 
    "%(comments_count)s %(span_sr_open)scomments (%(unread_comments_count)s unread comments)%(span_close)s": "%(comments_count)s %(span_sr_open)s\u56de\u61c9\uff08%(unread_comments_count)s \u672a\u8b80\u56de\u61c9\uff09%(span_close)s", 
    "%d day": [
      "%d \u5929"
    ], 
    "%d minute": [
      "%d \u5206\u9418"
    ], 
    "%d month": [
      "%d \u500b\u6708"
    ], 
    "%d year": [
      "%d \u5e74"
    ], 
    "Account Settings": "\u5e33\u6236\u8a2d\u5b9a", 
    "Actions": "\u52d5\u4f5c", 
    "Activate Your Account": "\u555f\u52d5\u5e33\u865f", 
    "Active Threads": "\u6d3b\u52d5\u4e3b\u984c", 
    "Add New Component": "\u6dfb\u52a0\u65b0\u7684\u7ec4\u4ef6", 
    "Add a comment": "\u65b0\u589e\u8a55\u8ad6", 
    "Add to Dictionary": "\u65b0\u589e\u5230\u5b57\u5178", 
    "Admin": "\u7ba1\u7406\u54e1", 
    "Advanced": "\u9032\u968e", 
    "Align center": "\u7f6e\u4e2d", 
    "Align left": "\u9760\u5de6\u5c0d\u9f4a", 
    "Align right": "\u9760\u53f3\u5c0d\u9f4a", 
    "Alignment": "\u5c0d\u9f4a\u65b9\u5f0f", 
    "All Groups": "\u6240\u6709\u7fa4", 
    "All Rights Reserved": "\u7248\u6b0a\u6240\u6709", 
    "Already have an account?": "\u5df2\u7d93\u64c1\u6709\u5e33\u6236\uff1f", 
    "Alternative source": "\u5176\u4ed6\u4f86\u6e90", 
    "An error occurred. Please try again later.": "\u767c\u751f\u932f\u8aa4\uff0c\u8acb\u7a0d\u5f8c\u518d\u8a66\u3002", 
    "Are you sure?": "\u4f60\u78ba\u5b9a\u55ce\uff1f", 
    "Author": "\u4f5c\u8005", 
    "Background color": "v", 
    "Be sure your entire face is inside the frame": "\u8acb\u78ba\u8a8d\u60a8\u7684\u6574\u500b\u81c9\u90e8\u90fd\u5728\u6846\u6846\u5167", 
    "Can we match the photo you took with the one on your ID?": "\u6211\u5011\u53ef\u4ee5\u5c07\u60a8\u62cd\u651d\u7684\u76f8\u7247\u8207\u60a8\u7684ID\u5339\u914d\u55ce\uff1f", 
    "Cancel": "\u53d6\u6d88", 
    "Check this box to receive an email digest once a day notifying you about new, unread activity from posts you are following.": "\u9ede\u64ca\u6b64\u8907\u9078\u6846\uff0c\u60a8\u6bcf\u5929\u5c07\u6536\u5230\u4e00\u5c01\u96fb\u5b50\u90f5\u4ef6\u901a\u77e5\u60a8\u65b0\u7684\u6587\u6458\uff0c\u672a\u8b80\u6d3b\u52d5\u5f9e\u60a8\u6b63\u8ddf\u96a8\u7684\u6587\u7ae0\u3002", 
    "Check your email": "\u6aa2\u67e5\u96fb\u90f5", 
    "Clear search": "\u6e05\u9664\u641c\u5c0b", 
    "Click on this button to mute or unmute this video or press UP or DOWN buttons to increase or decrease volume level.": "\u55ae\u64ca\u6b64\u6309\u9215\u53ef\u975c\u97f3\u6216\u53d6\u6d88\u975c\u97f3\u6b64\u8996\u983b\u6216\u6309UP\u6216DOWN\u9375\u4f86\u589e\u5927\u6216\u6e1b\u5c0f\u97f3\u91cf\u3002", 
    "Click to add": "\u9ede\u64ca\u4ee5\u65b0\u589e", 
    "Click to remove": "\u9ede\u64ca\u4ee5\u79fb\u9664", 
    "Close": "\u95dc\u9589", 
    "Close Calculator": "\u95dc\u9589\u8a08\u7b97\u6a5f", 
    "Closed": "\u95dc\u9589", 
    "Collapse Instructions": "\u6536\u8d77\u8aaa\u660e", 
    "Collapse discussion": "\u6536\u8d77\u8a0e\u8ad6", 
    "Coming Soon": "\u5373\u5c07\u4f86\u81e8", 
    "Commentary": "\u8a55\u8ad6", 
    "Common Problem Types": "\u666e\u901a\u95ee\u9898\u7c7b\u578b", 
    "Community TA": "\u8a0e\u8ad6\u5340\u52a9\u6559", 
    "Confirm": "\u78ba\u8a8d", 
    "Country": "\u570b\u5bb6", 
    "Course": "\u8ab2\u7a0b", 
    "Course Handouts": "\u8ab2\u7a0b\u8b1b\u7fa9", 
    "Course ID": "\u8ab2\u7a0b\u7de8\u865f", 
    "Course Number": "\u8ab2\u7a0b\u7de8\u865f", 
    "Creative Commons licensed content, with terms as follow:": "\u77e5\u8b58\u5171\u4eab\u6388\u6b0a\u5167\u5bb9\uff0c\u8853\u8a9e\u5982\u4e0b\uff1a", 
    "Dashboard": "\u63a7\u5236\u9762\u7248", 
    "Date": "\u65e5\u671f", 
    "Delete": "\u522a\u9664", 
    "Description": "\u6558\u8ff0", 
    "Discussion": "\u8a0e\u8ad6", 
    "Discussion Home": "\u8a0e\u8ad6\u9996\u9801", 
    "Don't see your picture? Make sure to allow your browser to use your camera when it asks for permission.": "\u60a8\u6c92\u6709\u770b\u5230\u60a8\u7684\u7167\u7247\u55ce\uff1f\u8acb\u53bb\u60a8\u7684\u700f\u89bd\u5668\u4e2d\u78ba\u8a8d\u662f\u5426\u5141\u8a31\u4f7f\u7528\u7167\u76f8\u529f\u80fd\u3002", 
    "Donate": "\u6350\u6b3e", 
    "Due:": "\u539f\u56e0\ufe30", 
    "Duration (sec)": "\u6301\u7e8c\u6642\u9593\uff08\u79d2\uff09", 
    "Edit": "\u7de8\u8f2f", 
    "Edit Your Name": "\u7de8\u8f2f\u60a8\u7684\u59d3\u540d", 
    "Editing comment": "\u7de8\u8f2f\u8a55\u8ad6", 
    "Editing post": "\u7de8\u8f2f\u767c\u8868", 
    "Editing response": "\u7de8\u8f2f\u56de\u61c9", 
    "Email": "\u96fb\u90f5", 
    "Engage with posts": "\u5f9e\u4e8b\u7684\u8077\u4f4d", 
    "Ensure that you can see your photo and read your name": "\u78ba\u4fdd\u60a8\u80fd\u5920\u770b\u5230\u60a8\u7684\u7167\u7247\u548c\u60a8\u7684\u59d3\u540d\u3002", 
    "Error": "\u932f\u8aa4", 
    "Error:": "\u932f\u8aa4\ufe30", 
    "Expand Instructions": "\u5c55\u958b\u8aaa\u660e", 
    "Expand discussion": "\u5c55\u958b\u8a0e\u8ad6", 
    "Fill browser": "\u586b\u6eff\u700f\u89bd\u5668", 
    "Find discussions": "\u5c0b\u627e\u8a0e\u8ad6", 
    "Following": "\u53c3\u8207", 
    "Forgot password?": "\u5fd8\u8a18\u5bc6\u78bc\uff1f", 
    "Full Name": "\u5168\u540d", 
    "Fullscreen": "\u5168\u87a2\u5e55", 
    "Gender": "\u6027\u5225", 
    "Go to your Dashboard": "\u9032\u5165\u60a8\u7684\u8a0a\u606f\u8996\u7a97", 
    "Grade": "\u6210\u7e3e", 
    "Heading 1": "\u6a19\u984c 1", 
    "Heading 2": "\u6a19\u984c 2", 
    "Heading 3": "\u6a19\u984c 3", 
    "Hide Annotations": "\u96b1\u85cf\u8a3b\u89e3", 
    "In Progress": "\u6b63\u5728\u9032\u884c\u4e2d", 
    "LEARN MORE": "\u5b78\u7fd2\u66f4\u591a", 
    "Large": "\u5927\u7684", 
    "Loading": "\u8f09\u5165\u4e2d\u2026", 
    "Make sure your ID is well-lit": "\u8acb\u78ba\u8a8d\u60a8\u7684ID\u662f\u5149\u7dda\u5145\u8db3\u7684", 
    "Make sure your face is well-lit": "\u8acb\u78ba\u8a8d\u60a8\u7684\u81c9\u90e8\u662f\u5149\u7dda\u5145\u8db3\u7684", 
    "Message:": "\u8a0a\u606f\uff1a", 
    "Middle": "\u521d\u4e2d", 
    "My Notes": "\u6211\u7684\u7b46\u8a18", 
    "Name": "\u540d\u7a31", 
    "Next": "\u4e0b\u4e00\u500b", 
    "No Derivatives": "\u7981\u6b62\u6539\u4f5c", 
    "No Flash Detected": "\u6c92\u6709\u5075\u6e2c\u5230Flash", 
    "No Webcam Detected": "\u672a\u5075\u6e2c\u5230\u8996\u8a0a\u93e1\u982d", 
    "Noncommercial": "\u975e\u5546\u696d\u6027", 
    "None": "\u6c92\u6709", 
    "Notes": "\u7b46\u8a18", 
    "Number of Students": "\u5b66\u751f\u4eba\u6570", 
    "OK": "\u597d", 
    "Ok": "\u597d", 
    "Open Calculator": "\u958b\u555f\u8a08\u7b97\u6a5f", 
    "Order History": "\u8a02\u55ae\u7d00\u9304", 
    "Order No.": "\u8a02\u55ae\u7de8\u865f", 
    "Other": "\u5176\u4ed6\u7684", 
    "Paragraph": "\u6bb5\u843d", 
    "Password": "\u5bc6\u78bc", 
    "Pause": "\u66ab\u505c", 
    "Pending": "\u5f85\u5b9a", 
    "Photos don't meet the requirements?": "\u7167\u7247\u4e0d\u7b26\u5408\u8981\u6c42\uff1f", 
    "Pinned": "\u7f6e\u9802", 
    "Play": "\u64ad\u653e", 
    "Play video": "\u64ad\u653e\u5f71\u7247", 
    "Please print this page for your records; it serves as your receipt. You will also receive an email with the same information.": "\u8acb\u5217\u5370\u9019\u500b\u9801\u9762\u4f5c\u70ba\u60a8\u7684\u7d00\u9304\uff1b\u5b83\u53ef\u4ee5\u7576\u4f5c\u60a8\u7684\u6536\u64da\u3002\u4e4b\u5f8c\u60a8\u4e5f\u5c07\u6536\u5230\u4e00\u5247\u96fb\u5b50\u90f5\u4ef6\u5305\u542b\u76f8\u540c\u7684\u8a0a\u606f\u3002", 
    "Preferred Language": "\u504f\u597d\u8a9e\u8a00", 
    "Preformatted": "\u5df2\u6709\u9810\u8a2d\u683c\u5f0f", 
    "Preview": "\u9810\u89bd", 
    "Previous": "\u4e0a\u4e00\u500b", 
    "Profile": "\u7c21\u4ecb", 
    "Receive updates": "\u63a5\u6536\u66f4\u65b0", 
    "Remove": "\u79fb\u9664", 
    "Reply to Annotation": "\u56de\u8986\u8a3b\u91cb", 
    "Reported": "\u8209\u5831", 
    "Requester": "\u8acb\u6c42\u8005", 
    "Reset Password": "\u91cd\u8a2d\u5bc6\u78bc", 
    "Retake Your Photos": "\u91cd\u65b0\u62cd\u651d\u60a8\u7684\u7167\u7247", 
    "Return to Your Dashboard": "\u56de\u5230\u4f60\u7684\u63a7\u5236\u9762\u7248", 
    "Save": "\u5132\u5b58", 
    "Saving": "\u5132\u5b58\u4e2d", 
    "Search": "\u641c\u5c0b", 
    "Section": "\u7ae0", 
    "Send to:": "\u767c\u81f3\uff1a", 
    "Settings": "\u8a2d\u7f6e", 
    "Share Alike": "\u76f8\u540c\u65b9\u5f0f\u5171\u4eab", 
    "Show Annotations": "\u986f\u793a\u8a3b\u89e3", 
    "Show Discussion": "\u986f\u793a\u8a0e\u8ad6", 
    "Sign in": "\u8a3b\u518a", 
    "Skip": "\u8df3\u904e", 
    "Some Rights Reserved": "\u4fdd\u7559\u90e8\u5206\u6b0a\u5229", 
    "Sorry": "\u5c0d\u4e0d\u8d77", 
    "Speed": "\u901f\u5ea6", 
    "Start Date": "\u958b\u59cb\u65e5\u671f", 
    "Starts": "\u958b\u59cb", 
    "Status": "\u72c0\u614b", 
    "Student": "\u5b78\u751f", 
    "Studio's having trouble saving your work": "\u4e0d\u64ad\u653e\u5668\u4e0d\u80fd\u4fdd\u5b58\u60a8\u7684\u6587\u6863\u3002", 
    "Submit": "\u63d0\u4ea4", 
    "Submitted": "\u5df2\u63d0\u4ea4", 
    "Take Photo": "\u7167\u76f8", 
    "Take Your Photo": "\u62cd\u651d\u60a8\u7684\u7167\u7247", 
    "Task Progress": "\u4efb\u52d9\u9032\u5ea6", 
    "Task Type": "\u4efb\u52d9\u985e\u578b", 
    "Task inputs": "\u4efb\u52d9\u8f38\u5165", 
    "Teams": "\u5718\u968a", 
    "The grading process is still running. Refresh the page to see updates.": "\u8a55\u5206\u4ecd\u5728\u9032\u884c\u4e2d\u3002\u91cd\u6574\u9801\u9762\u67e5\u770b\u6700\u65b0\u7d50\u679c\u3002", 
    "This link will open in a new browser window/tab": "\u5728\u65b0\u7684\u700f\u89bd\u7a97\u53e3/\u6a19\u7c64\u6253\u958b\u6b64\u93c8\u63a5", 
    "This may be happening because of an error with our server or your internet connection. Try refreshing the page or making sure you are online.": "\u8fd9\u53ef\u80fd\u662f\u56e0\u4e3a\u6211\u4eec\u670d\u52a1\u5668\u7684\u9519\u8bef\u6216\u662f\u60a8\u7684\u7f51\u7edc\u8fde\u63a5\u51fa\u4e86\u95ee\u9898\u3002\u8bf7\u5c1d\u8bd5\u5237\u65b0\u7f51\u9875\u6216\u786e\u8ba4\u60a8\u7684\u7f51\u7edc\u8fde\u63a5\u3002", 
    "This thread is closed.": "\u9019\u9805\u4e3b\u984c\u5df2\u7d93\u95dc\u9589\u3002", 
    "Tips on taking a successful photo": "\u62cd\u4e00\u5f35\u6210\u529f\u7167\u7247\u7684\u79d8\u8a23", 
    "Title": "\u6a19\u984c", 
    "Toggle Notifications Setting": "\u5207\u63db\u901a\u77e5\u8a2d\u5b9a", 
    "Total": "\u7e3d\u6578", 
    "Unit": "\u55ae\u5143", 
    "Unknown": "\u672a\u77e5\u7684", 
    "Update comment": "\u66f4\u65b0\u8a55\u8ad6", 
    "Update post": "\u66f4\u65b0\u767c\u8868", 
    "Update response": "\u66f4\u65b0\u56de\u61c9", 
    "Upload File": "\u4e0a\u8f09\u6a94\u6848", 
    "Uploading": "\u4e0a\u8f09\u4e2d", 
    "User": "\u4f7f\u7528\u8005", 
    "Username": "\u4f7f\u7528\u8005\u540d\u7a31", 
    "Users": "\u4f7f\u7528\u8005", 
    "Verified Status": "\u5df2\u9a57\u8b49\u72c0\u614b", 
    "Video position": "\u5f71\u7247\u4f4d\u7f6e", 
    "View": "\u6aa2\u8996", 
    "View Archived Course": "\u67e5\u770b\u5df2\u5b58\u6a94\u7684\u8ab2\u7a0b", 
    "View Course": "\u6aa2\u8996\u8ab2\u7a0b", 
    "View Live": "\u6aa2\u8996\u76f4\u64ad", 
    "View discussion": "\u6aa2\u8996\u8a0e\u8ad6", 
    "Volume": "\u97f3\u91cf", 
    "Webcam": "\u8996\u8a0a\u88dd\u7f6e", 
    "Year of Birth": "\u51fa\u751f\u5e74\u4efd", 
    "Your changes have been saved.": "\u4f60\u7684\u8b8a\u66f4\u5df2\u88ab\u5132\u5b58\u3002", 
    "Zoom In": "\u653e\u5927", 
    "Zoom Out": "\u7e2e\u5c0f", 
    "a day": "\u4e00\u5929", 
    "about %d hour": [
      "\u5927\u7d04 %d \u5c0f\u6642"
    ], 
    "about a minute": "\u5927\u7d04\u4e00\u5206\u9418", 
    "about a month": "\u5927\u7d04\u4e00\u500b\u6708", 
    "about a year": "\u5927\u7d04\u4e00\u5e74", 
    "about an hour": "\u5927\u7d04\u4e00\u5c0f\u6642", 
    "anonymous": "\u533f\u540d", 
    "close": "\u95dc\u9589", 
    "follow this post": "\u8ffd\u8e64\u6b64\u6587", 
    "less than a minute": "\u5c11\u65bc\u4e00\u5206\u9418", 
    "or": "\u6216\u8005", 
    "post anonymously": "\u533f\u540d\u767c\u8868", 
    "post anonymously to classmates": "\u4ee5\u533f\u540d\u65b9\u5f0f\u5411\u540c\u5b78\u767c\u8868", 
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

