

(function (globals) {

  var django = globals.django || (globals.django = {});

  
  django.pluralidx = function (n) {
    var v=(n==1) ? 0 : (n>=2 && n<=4) ? 1 : 2;
    if (typeof(v) == 'boolean') {
      return v ? 1 : 0;
    } else {
      return v;
    }
  };
  

  
  /* gettext library */

  django.catalog = {
    "Account Settings": "Nastaven\u00ed \u00fa\u010dtu", 
    "Activate Your Account": "Aktivujte si V\u00e1\u0161 \u00fa\u010det", 
    "Add Students": "P\u0159idat studenty", 
    "Add to Dictionary": "P\u0159idat do slovn\u00edku", 
    "Admin": "Admin", 
    "Advanced": "Pokro\u010dil\u00e9", 
    "Align center": "Zarovnat na st\u0159ed", 
    "Align left": "Zarovnat doleva", 
    "Align right": "Zarovnat doprava", 
    "All Rights Reserved": "V\u0161echna pr\u00e1va vyhrazena", 
    "Alternative source": "Alternativn\u00ed zdroj", 
    "Are you sure you want to delete this update?": "Ur\u010dit\u011b chcete smazat tuto aktualizaci?", 
    "Are you sure?": "Jste si jist\u00fd ?", 
    "Author": "Autor", 
    "Automatic": "Automaticky", 
    "Background color": "Barva pozad\u00ed", 
    "Body": "T\u011blo", 
    "Border": "Okraj", 
    "Border color": "Barva okraje", 
    "Cancel": "Zru\u0161it", 
    "Check Your Email": "Zkontrolujte si V\u00e1\u0161 email", 
    "Check your email": "Zkontrolujte si v\u00e1\u0161 email", 
    "Clear search": "Vy\u010distit hled\u00e1n\u00ed", 
    "Close": "Zav\u0159\u00edt", 
    "Closed": "Uzav\u0159eno", 
    "Collapse Instructions": "Sbalit instrukce", 
    "Commentary": "Koment\u00e1\u0159", 
    "Confirm": "Potvrdit", 
    "Copy": "Kop\u00edrovat", 
    "Country": "St\u00e1t", 
    "Course": "Kurz", 
    "Course Number": "\u010c\u00edslo kurzu", 
    "Create a new account": "Vytvo\u0159it nov\u00fd \u00fa\u010det", 
    "Create an account": "Vytvo\u0159it \u00fa\u010det", 
    "Create your account": "Vytvo\u0159it v\u00e1s \u00fa\u010det", 
    "Dashboard": "N\u00e1st\u011bnka", 
    "Date": "Datum", 
    "Delete": "Smazat", 
    "Delete File Confirmation": "Potvrzen\u00ed smaz\u00e1n\u00ed souboru", 
    "Delete \u201c<%= name %>\u201d?": "Smazat \u201c<%= name %>\u201d?", 
    "Deleting": "Maz\u00e1n\u00ed", 
    "Description": "Popis", 
    "Drag to reorder": "Ta\u017een\u00edm p\u0159esu\u0148te", 
    "Edit": "Upravit", 
    "Editor": "Editor", 
    "Email": "Email", 
    "Engage with posts": "Zapojte se do diskuze", 
    "Error": "Chyba", 
    "Error:": "Chyba:", 
    "Expand Instructions": "Rozbalit instrukce", 
    "Files must be in JPEG or PNG format.": "Form\u00e1t soubor\u016f mus\u00ed b\u00fdt JPEG nebo PNG.", 
    "Fill browser": "Pr\u016fzkumn\u00edk soubor\u016f", 
    "Filter and sort topics": "Filtrujte a t\u0159i\u010fte t\u00e9mata", 
    "Find discussions": "Vyhled\u00e1v\u00e1n\u00ed ve f\u00f3rech", 
    "Follow or unfollow posts": "P\u0159ihla\u0161te se k odb\u011bru p\u0159\u00edsp\u011bvk\u016f ve f\u00f3ru", 
    "Forgot password?": "Zapomenut\u00e9 heslo?", 
    "Full Name": "Cel\u00e9 jm\u00e9no", 
    "Fullscreen": "Cel\u00e1 obrazovka", 
    "Gender": "Pohlav\u00ed", 
    "Grace period must be specified in HH:MM format.": "Tolerance prodlen\u00ed mus\u00ed b\u00fdt stanovena ve form\u00e1tu HH:MM", 
    "Heading 1": "Nadpis 1", 
    "Heading 2": "Nadpis 2", 
    "Heading 3": "Nadpis 3", 
    "Hide Annotations": "Schovat pozn\u00e1mky", 
    "Highlighted text": "Zv\u00fdrazn\u011bn\u00fd text", 
    "How to use %(platform_name)s discussions": "Jak pou\u017e\u00edvat diskuzn\u00ed f\u00f3ra %(platform_name)s", 
    "Key should only contain letters, numbers, _, or -": "Kl\u00ed\u010d by m\u011bl obsahovat pouze p\u00edsmena, \u010d\u00edsla, podtr\u017e\u00edtka, nebo poml\u010dky", 
    "Last Edited:": "Posledn\u00ed \u00faprava:", 
    "Loading": "Nahr\u00e1v\u00e1n\u00ed", 
    "Manual": "Manu\u00e1ln\u011b", 
    "Membership": "\u010clenstv\u00ed", 
    "More": "V\u00edce", 
    "My Notes": "Moje pozn\u00e1mky", 
    "Name": "Jm\u00e9no", 
    "Noncommercial": "Nekomer\u010dn\u00ed", 
    "Number of Students": "Po\u010det student\u016f", 
    "OK": "OK", 
    "Only <%= fileTypes %> files can be uploaded. Please select a file ending in <%= fileExtensions %> to upload.": "Nahr\u00e1ny mohou b\u00fdt pouze soubory <%= fileTypes %>. Pro nahr\u00e1n\u00ed zvolte, pros\u00edm, soubory s koncovkou <%= fileExtensions %>", 
    "Other": "Jin\u00e9", 
    "Password": "Heslo", 
    "Pause": "Pozastavit", 
    "Pending": "\u010cek\u00e1n\u00ed", 
    "Play": "P\u0159ehr\u00e1t", 
    "Please do not use any spaces or special characters in this field.": "Zde nepou\u017e\u00edvejte mezery ani speci\u00e1ln\u00ed znaky.", 
    "Please enter an integer between 0 and 100.": "Vlo\u017ete, pros\u00edm, cel\u00e9 \u010d\u00edslo mezi 0 a 100.", 
    "Preferred Language": "Preferovan\u00fd jazyk", 
    "Preview": "N\u00e1hled", 
    "Remove": "Odstranit", 
    "Reply to Annotation": "Odpov\u011bd\u011bt na pozn\u00e1mku", 
    "Report abuse, topics, and responses": "Nahla\u0161te nevhodn\u00e1 t\u00e9mata a p\u0159\u00edsp\u011bvky", 
    "Required field": "Po\u017eadovan\u00e1 pole", 
    "Required field.": "Povinn\u00e9 pole.", 
    "Reset Password": "Obnovit heslo", 
    "Reset my password": "Obnovit m\u00e9 heslo", 
    "Save": "Ulo\u017eit", 
    "Save Changes": "Ulo\u017eit zm\u011bny", 
    "Save changes": "Ulo\u017eit zm\u011bny", 
    "Saving": "Ukl\u00e1d\u00e1n\u00ed", 
    "Search": "Hledat", 
    "Search all posts": "Prohledejte p\u0159\u00edsp\u011bvky", 
    "Section": "Sekce", 
    "Settings": "Nastaven\u00ed", 
    "Show Annotations": "Zobrazit pozn\u00e1mky", 
    "Sign in": "P\u0159ihl\u00e1sit se", 
    "Some Rights Reserved": "N\u011bkter\u00e1 pr\u00e1va vyhrazena", 
    "Status": "Stav", 
    "Submit": "Zaslat", 
    "Tags:": "\u0160t\u00edtky:", 
    "The course must have an assigned start date.": "Kurz mus\u00ed m\u00edt stanoveno po\u010d\u00e1te\u010dn\u00ed datum.", 
    "There was an error with the upload": "Vyskytl se probl\u00e9m s nahr\u00e1v\u00e1n\u00edm", 
    "This action cannot be undone.": "Tato akce nem\u016f\u017ee b\u00fdt vr\u00e1cena.", 
    "This link will open in a modal window": "Odkaz se otev\u0159e v mod\u00e1ln\u00edm okn\u011b", 
    "This link will open in a new browser window/tab": "Odkaz se otev\u0159e v nov\u00e9m okn\u011b/z\u00e1lo\u017ece prohl\u00ed\u017ee\u010de", 
    "Title": "N\u00e1zev", 
    "Upload File": "Nahr\u00e1t soubor", 
    "Upload New File": "Nahr\u00e1t nov\u00fd soubor", 
    "Upload a new PDF to \u201c<%= name %>\u201d": "Nahrajte nov\u00e9 PDF do \u201c<%= name %>\u201d", 
    "Upload completed": "Nahr\u00e1v\u00e1n\u00ed dokon\u010deno", 
    "Upload your course image.": "Nahr\u00e1t obr\u00e1zek va\u0161eho kurzu.", 
    "User": "U\u017eivatel", 
    "Username": "U\u017eivatelsk\u00e9 jm\u00e9no", 
    "View": "Zobrazit", 
    "View Course": "Zobrazit kurz", 
    "Volume": "Hlasitost", 
    "Vote for good posts and responses": "Dejte sv\u016fj hlas kvalitn\u00edm p\u0159\u00edsp\u011bvk\u016fm a odpov\u011bd\u00edm", 
    "Warning": "Varov\u00e1n\u00ed", 
    "We're sorry, there was an error": "Je n\u00e1m l\u00edto, do\u0161lo k chyb\u011b", 
    "You must specify a name": "Mus\u00edte up\u0159esnit jm\u00e9no", 
    "You've made some changes": "Provedli jste zm\u011bny", 
    "Your changes have been saved.": "Va\u0161e zm\u011bny byly ulo\u017eeny.", 
    "Your file has been deleted.": "V\u00e1\u0161 soubor byl smaz\u00e1n.", 
    "Zoom In": "P\u0159ibl\u00ed\u017eit", 
    "Zoom Out": "Odd\u00e1lit", 
    "anonymous": "anonymn\u00ed", 
    "close": "zav\u0159\u00edt", 
    "name": "jm\u00e9no", 
    "or": "nebo", 
    "or sign in with": "nebo p\u0159ihl\u00e1sit se p\u0159es", 
    "remove": "odstranit", 
    "remove all": "odstranit v\u0161e"
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
    "DATETIME_FORMAT": "j. E Y G:i", 
    "DATETIME_INPUT_FORMATS": [
      "%d.%m.%Y %H:%M:%S", 
      "%d.%m.%Y %H:%M:%S.%f", 
      "%d.%m.%Y %H.%M", 
      "%d.%m.%Y %H:%M", 
      "%d.%m.%Y", 
      "%d. %m. %Y %H:%M:%S", 
      "%d. %m. %Y %H:%M:%S.%f", 
      "%d. %m. %Y %H.%M", 
      "%d. %m. %Y %H:%M", 
      "%d. %m. %Y", 
      "%Y-%m-%d %H.%M", 
      "%Y-%m-%d %H:%M:%S", 
      "%Y-%m-%d %H:%M:%S.%f", 
      "%Y-%m-%d %H:%M", 
      "%Y-%m-%d"
    ], 
    "DATE_FORMAT": "j. E Y", 
    "DATE_INPUT_FORMATS": [
      "%d.%m.%Y", 
      "%d.%m.%y", 
      "%d. %m. %Y", 
      "%d. %m. %y", 
      "%Y-%m-%d"
    ], 
    "DECIMAL_SEPARATOR": ",", 
    "FIRST_DAY_OF_WEEK": "1", 
    "MONTH_DAY_FORMAT": "j. F", 
    "NUMBER_GROUPING": "3", 
    "SHORT_DATETIME_FORMAT": "d.m.Y G:i", 
    "SHORT_DATE_FORMAT": "d.m.Y", 
    "THOUSAND_SEPARATOR": "\u00a0", 
    "TIME_FORMAT": "G:i", 
    "TIME_INPUT_FORMATS": [
      "%H:%M:%S", 
      "%H.%M", 
      "%H:%M", 
      "%H:%M:%S.%f"
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

