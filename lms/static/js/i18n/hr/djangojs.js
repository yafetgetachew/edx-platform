

(function (globals) {

  var django = globals.django || (globals.django = {});

  
  django.pluralidx = function (n) {
    var v=n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2;
    if (typeof(v) == 'boolean') {
      return v ? 1 : 0;
    } else {
      return v;
    }
  };
  

  
  /* gettext library */

  django.catalog = {
    "(Required Field)": "(trazeno polje)", 
    "Add Students": "Dodaj studente", 
    "Add to Dictionary": "Dodaj u rje\u010dnik", 
    "Advanced": "Unaprije\u0111en", 
    "Align center": "Poravnaj centralno", 
    "Align left": "Poravnaj ulijevo", 
    "Align right": "Poravnaj udesno.", 
    "Alignment": "Poravnavanje", 
    "Alternative source": "Alternativni izvor", 
    "Anchor": "Sidro", 
    "Anchors": "Sidra", 
    "Author": "Autor", 
    "Background color": "Boja pozadine", 
    "Blockquote": "Blok citat", 
    "Blocks": "Blokovi", 
    "Body": "Tijelo", 
    "Bold": "Podebljano", 
    "Border": "Granica", 
    "Border color": "Boja obruba", 
    "Bottom": "Dno", 
    "Cancel": "Otka\u017ei", 
    "Cell": "\u0106elija", 
    "Cell properties": "Svojstva \u0107elije", 
    "Cell spacing": "Razmak u \u0107eliji", 
    "Cell type": "Tip \u0107elije", 
    "Center": "Centar", 
    "Change My Email Address": "Promijeni moju e-mail adresu", 
    "Choose File": "Izaberite Datoteku", 
    "Circle": "Krug", 
    "Clear formatting": "Ukloni prilagodbe", 
    "Close": "Zatvori", 
    "Closed": "Zatvoren", 
    "Code": "Kod", 
    "Code block": "Blok koda", 
    "Collapse Instructions": "Zatvori upute", 
    "Color": "Boja", 
    "Cols": "Stupci", 
    "Column": "Stupac", 
    "Column group": "Grupa stupaca", 
    "Commentary": "Komentar", 
    "Component": "Komponenta", 
    "Confirm": "Potvrdite", 
    "Constrain proportions": "Zadr\u017ei proporcije", 
    "Copy": "Kopiraj", 
    "Copy row": "Kopiraj red", 
    "Could not find the specified string.": "Nije mogu\u0107e na\u0107i navedeni tekst.", 
    "Country": "Dr\u017eava", 
    "Custom color": "Prilago\u0111ena boja", 
    "Cut": "Izre\u017ei", 
    "Cut row": "Izre\u017ei red", 
    "Dashboard": "Nadzorna plo\u010da", 
    "Date": "Datum", 
    "Date Added": "Datum dodavanja", 
    "Date added": "Datum dodavanja", 
    "Decrease indent": "Smanji uvlaku", 
    "Default": "Zadano", 
    "Delete": "Izbri\u0161i", 
    "Delete column": "Izbri\u0161i stupac", 
    "Delete row": "Izbri\u0161i redak", 
    "Delete table": "Izbri\u0161i tablicu", 
    "Delete this %(item_display_name)s?": "Izbri\u0161i %(item_display_name)s?", 
    "Delete \u201c<%= name %>\u201d?": "Izbri\u0161i \u201c<%= name %>\u201d?", 
    "Description": "Opis", 
    "Dimensions": "Dimenzije", 
    "Disc": "Disk", 
    "Discard Changes": "Odbaci promjene", 
    "Document properties": "Svojstva dokumenta", 
    "Donate": "Doniraj", 
    "Due:": "Rok:", 
    "Duration": "Trajanje", 
    "Edit": "Uredi", 
    "Edit HTML": "Uredi HTML", 
    "Email": "E-po\u0161ta", 
    "Embed": "Ugradi", 
    "Emoticons": "Smajli\u0107i", 
    "Encoding": "Kodiranje", 
    "Error": "Gre\u0161ka", 
    "Expand Instructions": "Povecaj upute", 
    "File": "Datoteka", 
    "Find": "Pronadji", 
    "Find and replace": "Na\u0111i i zamijeni", 
    "Find next": "Pronadji sljedece", 
    "Find previous": "Pronadji prijasnje", 
    "Finish": "Zavrsi", 
    "Font Family": "Skupina fontova", 
    "Font Sizes": "Veli\u010dine fontova", 
    "Footer": "Podno\u017eje", 
    "Format": "Format", 
    "Formats": "Formati", 
    "Full Name": "Puno ime", 
    "Fullscreen": "Preko \u010ditavog zaslona", 
    "Gender": "Spol", 
    "General": "Op\u0107i ", 
    "HTML source code": "HTML izvorni kod", 
    "Header": "Zaglavlje", 
    "Header 1": "Zaglavlje 1", 
    "Header 2": "Zaglavlje 2", 
    "Header 3": "Zaglavlje 3", 
    "Header 4": "Zaglavlje 4", 
    "Header 5": "Zaglavlje 5", 
    "Header 6": "Zaglavlje 6", 
    "Header cell": "\u0106elija zaglavlja", 
    "Headers": "Zaglavlja", 
    "Heading 1": "Zaglavlje 1", 
    "Heading 2": "Zaglavlje 2", 
    "Heading 3": "Zaglavlje 3", 
    "Heading 4": "Naslov 4", 
    "Heading 5": "Naslov 5", 
    "Heading 6": "Naslov 6", 
    "Headings": "Naslovi", 
    "Height": "Visina", 
    "Hide Annotations": "Sakrij bilje\u0161ke", 
    "Horizontal line": "Horizontalna linija", 
    "Horizontal space": "Horizontalni razmak", 
    "Ignore": "Ignoriraj", 
    "Ignore all": "Ignoriraj sve", 
    "Image description": "Opis slike", 
    "In Progress": "U tijeku", 
    "Increase indent": "Pove\u0107aj uvlaku", 
    "Inline": "U jednoj liniji", 
    "Insert": "Unesi", 
    "Insert column after": "Unesi stupac poslije", 
    "Insert column before": "Unesi stupac prije", 
    "Insert date/time": "Unesi datum/vrijeme", 
    "Insert image": "Unesi sliku", 
    "Insert link": "Unesi link", 
    "Insert row after": "Unesi redak poslije", 
    "Insert row before": "unesi redak prije", 
    "Insert table": "Unesi tablicu", 
    "Insert template": "Unesi predlo\u017eak", 
    "Insert video": "Unesi video", 
    "Insert/edit image": "Unesi/uredi sliku", 
    "Insert/edit link": "Unesi/uredi link", 
    "Insert/edit video": "Unesi/uredi video", 
    "Italic": "Nako\u0161eno", 
    "Justify": "Poravnato po rubovima", 
    "Keywords": "Klju\u010dne rije\u010di", 
    "Large": "Veliko", 
    "Left": "Lijevo", 
    "Left to right": "S lijeva na desno", 
    "Less": "Manje", 
    "Loading": "U\u010ditava se", 
    "Lower Alpha": "Mala slova", 
    "Lower Greek": "Mala gr\u010dka slova", 
    "Merge cells": "Spoji \u0107elije", 
    "Middle": "Sredina", 
    "More": "Vi\u0161e", 
    "My Notes": "Moje bilje\u0161ke", 
    "Name": "Ime", 
    "New Address": "Nova adresa", 
    "New document": "Novi dokument", 
    "New window": "Novi prozor", 
    "Next": "Sljedeci", 
    "No color": "Bez boje", 
    "Nonbreaking space": "Neprekidaju\u0107i prostor", 
    "None": "Ni\u0161ta", 
    "Not Graded": "Nije ocijenjeno", 
    "Not in Use": "Ne koristi se", 
    "OK": "Ok", 
    "Ok": "U redu", 
    "Other": "Drugo", 
    "Paragraph": "Odlomak", 
    "Password": "Lozinka", 
    "Paste as text": "preslikaj kao tekst", 
    "Pinned": "Zakacen", 
    "Please enter an integer between 0 and 100.": "Unesite cijeli broj izme\u0111u 0 i 100.", 
    "Please enter an integer greater than 0.": "Unesite cijeli ve\u0107i od 0.", 
    "Please enter non-negative integer.": "Unesite pozitivni cijeli broj.", 
    "Preferred Language": "Jezik koji preferirate", 
    "Preformatted": "Format promijenjen", 
    "Publish": "Objavi", 
    "Remove": "Ukloni", 
    "Reply to Annotation": "Odgovori  na bilje\u0161ku", 
    "Reported": "Prijavljeno", 
    "Required field": "Obavezno polje", 
    "Required field.": "Obavezno polje.", 
    "Reset Password": "Resetiraj zaporku", 
    "Right": "Desno", 
    "Save": "Spremi", 
    "Save Changes": "Sa\u010duvaj promjene", 
    "Settings": "Postavke", 
    "Show Annotations": "Pokazi biljeske", 
    "Status": "Status", 
    "Submit": "Dostavi", 
    "Submitted": "Predano", 
    "The grading process is still running. Refresh the page to see updates.": "Proces ocjenjivanja je jo\u0161 u tijeku. Osvje\u017eite stranicu da biste vidjeli obnove.", 
    "This link will open in a new browser window/tab": "Ova poveznica \u0107e se otvoriti u novom prozoru/kartici pretra\u017eiva\u010da.", 
    "This post is visible only to %(group_name)s.": "Ova postavka je vidljiva samo %(group_name)s.", 
    "This post is visible to everyone.": "Postavka je vidljiva svima.", 
    "Title": "Naslov", 
    "Tools": "Alati", 
    "Type": "Tip", 
    "Unknown": "Nepoznato", 
    "Upload File": "U\u010ditaj datoteku", 
    "Upload New File": "Uploadajte Novu Datoteku", 
    "Uploading": "U\u010ditava se ", 
    "User": "Korisnik", 
    "Video": "Video", 
    "View Archived Course": "Pogledaj arhivirani kolegij", 
    "View Course": "Pogledaj kolegij", 
    "Warning": "Upozorenje", 
    "What does this mean?": "Sto ovo znaci?", 
    "Your changes have been saved.": "Va\u0161e promjene su spremljene.", 
    "Your file has been deleted.": "Va\u0161a datoteka je izbrisana.", 
    "Zoom In": "Zumiraj", 
    "Zoom Out": "Odzumiraj", 
    "anonymous": "anoniman"
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
    "DATETIME_FORMAT": "j. E Y. H:i", 
    "DATETIME_INPUT_FORMATS": [
      "%Y-%m-%d %H:%M:%S", 
      "%Y-%m-%d %H:%M:%S.%f", 
      "%Y-%m-%d %H:%M", 
      "%Y-%m-%d", 
      "%d.%m.%Y. %H:%M:%S", 
      "%d.%m.%Y. %H:%M:%S.%f", 
      "%d.%m.%Y. %H:%M", 
      "%d.%m.%Y.", 
      "%d.%m.%y. %H:%M:%S", 
      "%d.%m.%y. %H:%M:%S.%f", 
      "%d.%m.%y. %H:%M", 
      "%d.%m.%y.", 
      "%d. %m. %Y. %H:%M:%S", 
      "%d. %m. %Y. %H:%M:%S.%f", 
      "%d. %m. %Y. %H:%M", 
      "%d. %m. %Y.", 
      "%d. %m. %y. %H:%M:%S", 
      "%d. %m. %y. %H:%M:%S.%f", 
      "%d. %m. %y. %H:%M", 
      "%d. %m. %y."
    ], 
    "DATE_FORMAT": "j. E Y.", 
    "DATE_INPUT_FORMATS": [
      "%Y-%m-%d", 
      "%d.%m.%Y.", 
      "%d.%m.%y.", 
      "%d. %m. %Y.", 
      "%d. %m. %y."
    ], 
    "DECIMAL_SEPARATOR": ",", 
    "FIRST_DAY_OF_WEEK": "1", 
    "MONTH_DAY_FORMAT": "j. F", 
    "NUMBER_GROUPING": "3", 
    "SHORT_DATETIME_FORMAT": "j.m.Y. H:i", 
    "SHORT_DATE_FORMAT": "j.m.Y.", 
    "THOUSAND_SEPARATOR": ".", 
    "TIME_FORMAT": "H:i", 
    "TIME_INPUT_FORMATS": [
      "%H:%M:%S", 
      "%H:%M:%S.%f", 
      "%H:%M"
    ], 
    "YEAR_MONTH_FORMAT": "F Y."
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

