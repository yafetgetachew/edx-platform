

(function (globals) {

  var django = globals.django || (globals.django = {});

  
  django.pluralidx = function (n) {
    var v=(n%100==1 ? 0 : n%100==2 ? 1 : n%100==3 || n%100==4 ? 2 : 3);
    if (typeof(v) == 'boolean') {
      return v ? 1 : 0;
    } else {
      return v;
    }
  };
  

  
  /* gettext library */

  django.catalog = {
    "%(post_type)s posted %(time_ago)s by %(author)s": "%(post_type)s je ob %(time_ago)s objavil %(author)s", 
    "%(value)s hour": [
      "%(value)s ura", 
      "%(value)s uri", 
      "%(value)s ure", 
      "%(value)s ur"
    ], 
    "%(value)s minute": [
      "%(value)s minuta", 
      "%(value)s minuti", 
      "%(value)s minute", 
      "%(value)s minute"
    ], 
    "%(value)s second": [
      "%(value)s sekunda", 
      "%(value)s sekundi", 
      "%(value)s sekunde", 
      "%(value)s sekunde"
    ], 
    "%d day": [
      "%d dan", 
      "%d dneva", 
      "%d dnevov", 
      "%d dnevov"
    ], 
    "%d minute": [
      "%d minuta", 
      "%d minuti", 
      "%d minut", 
      "%d minut"
    ], 
    "%d month": [
      "%d mesec", 
      "%d mesca", 
      "%d mescov", 
      "%d mescov"
    ], 
    "%d year": [
      "%d leto", 
      "%d leti", 
      "%d let", 
      "%d let"
    ], 
    "%s ago": "%s nazaj", 
    "%s from now": "%s od zdaj", 
    "(Required Field)": "(Obvezno Polje)", 
    "(contains %(student_count)s student)": [
      "(vsebuje %(student_count)s \u0161tudenta)", 
      "(vsebuje %(student_count)s \u0161tudenta)", 
      "(vsebuje %(student_count)s \u0161tudentov)", 
      "(vsebuje %(student_count)s \u0161tudentov)"
    ], 
    "Abbreviation": "Okraj\u0161ava", 
    "Actions": "Akcije", 
    "Add": "dodaj", 
    "Add Students": "Dodaj \u0160tudente", 
    "Add a Chapter": "Dodaj poglavje", 
    "Add another group": "Dodaj skupino", 
    "Add to Dictionary": "Dodaj v slovar", 
    "Advanced": "Napredno", 
    "Align center": "Poravnaj centralno", 
    "Align left": "Poravnaj levo", 
    "Align right": "Poravnaj desno", 
    "Alignment": "Poravnava", 
    "Alternative source": "Alternativni vir", 
    "Are you sure you want to delete this comment?": "Ste prepri\u010dani, da \u017eelite izbrisati ta komentar", 
    "Are you sure you want to delete this post?": "Ste prepri\u010dani, da \u017eelite izbrisati to objavo?", 
    "Are you sure you want to delete this response?": "Ste prepri\u010dani, da \u017eelite izbrisati ta odgovor?", 
    "Author": "Avtor", 
    "Average": "Povpre\u010dno", 
    "Background color": "Barva ozadja", 
    "Blockquote": "Citat", 
    "Blockquote (Ctrl+Q)": "Citat (Ctrl+Q)", 
    "Body": "Telo", 
    "Bold": "Krepko", 
    "Bold (Ctrl+B)": "Krepko (Ctrl+B)", 
    "Border": "Obroba", 
    "Bulleted List (Ctrl+U)": "Seznam (Ctrl+U)", 
    "Cancel": "Prekli\u010di", 
    "Cell": "Celica", 
    "Center": "Center", 
    "Change My Email Address": "spremeni moj email naslov", 
    "Chapter Name": "Naslov poglavja", 
    "Chapter information": "Informacije o poglavju", 
    "Choose File": "Izberi datoteko", 
    "Circle": "Krog", 
    "Clear": "po\u010disti", 
    "Clear Value": "po\u010disti vrednost", 
    "Clear formatting": "Po\u010disti oblikovanje", 
    "Close": "Zapri", 
    "Close Calculator": "Zapri kalkulator", 
    "Closed": "Zaprto", 
    "Code": "Koda", 
    "Code Sample (Ctrl+K)": "Programska koda (Ctrl+K)", 
    "Collapse Instructions": "Zdru\u017ei navodila", 
    "Color": "Barva", 
    "Cols": "Cols", 
    "Column": "Stolpec", 
    "Column group": "Skupina stoplcev", 
    "Commentary": "Komentar", 
    "Community TA": "TA skupnost", 
    "Configure": "Nastavi", 
    "Confirm": "Potrdi", 
    "Contains staff only content": "Vsebina je dostopna le osebju", 
    "Copy": "Kopiraj", 
    "Copy row": "Kopiraj vrstico", 
    "Country": "Dr\u017eava", 
    "Course ID": "ID Te\u010daja", 
    "Course Number": "\u0160tevilka te\u010daja", 
    "Create": "Ustvari", 
    "Custom color": "Poljubna barva", 
    "Cut": "Izre\u017ei", 
    "Cut row": "Izre\u017ei vrstico", 
    "Dashboard": "Nadzorna plo\u0161\u010da", 
    "Date": "Datum", 
    "Date Added": "Dodan datum", 
    "Delete": "Izbri\u0161i", 
    "Delete column": "Izbri\u0161i stolpec", 
    "Delete row": "Izbri\u0161i vrstico", 
    "Delete student '<%= student_id %>'s state on problem '<%= problem_id %>'?": "Izbri\u0161i \u0161tudentovo '<%= student_id %>' stanje na problemu '<%= problem_id %>'?", 
    "Delete table": "Izbri\u0161i tabelo", 
    "Description": "Opis", 
    "Display Name": "Prika\u017ei ime", 
    "Div": "div", 
    "Document properties": "Lastnosti dokumenta", 
    "Donate": "Doniraj", 
    "Download": "Prenesi", 
    "Due Date:": "Datum oddaje", 
    "Due Time in UTC:": "\u010cas oddaje v UTC", 
    "Due:": "Do:", 
    "Edit": "Uredi", 
    "Edit %(display_name)s (required)": "Spremeni %(display_name)s (zahtevan)", 
    "Edit HTML": "Uredi HTML", 
    "Edit the name": "Spremeni ime", 
    "Email": "Sporo\u010dilo", 
    "End": "Konec", 
    "Error": "Napaka", 
    "Error generating grades. Please try again.": "Napaka pri generiranju ocen. Poskusite znova.", 
    "Error getting student list.": "Napaka pri pridobivanju seznama \u0161tudentov.", 
    "Error listing task history for this student and problem.": "Pri pridobivanju zgodovine opravil za tega \u0161tudenta in ta problem je pri\u0161lo do napake.", 
    "Error retrieving grading configuration.": "Napaka pri pridobivanju nastavitev za ocene.", 
    "Error sending email.": "Napaka pri po\u0161iljanju sporo\u010dila.", 
    "Error:": "Napaka:", 
    "Exit full browser": "Izhod iz celozaslonskega na\u010dina.", 
    "Expand Instructions": "Raz\u0161iri navodila", 
    "File": "Datoteka", 
    "File upload succeeded": "Datoteka je uspe\u0161no nalo\u017eena", 
    "Fill browser": "Celozaslonski na\u010din", 
    "Find": "Najdi", 
    "Find and replace": "Najdi in zamenjaj", 
    "Find next": "Najdi naslednjega", 
    "Finish": "Konec", 
    "Font Sizes": "Velikost pisave", 
    "Footer": "Noga", 
    "Full Name": "Celostno ime", 
    "Fullscreen": "Celozalonsko", 
    "Gender": "Spol", 
    "Graded as:": "Ocenjeno kot:", 
    "Grading": "Ocenjevanje", 
    "Group information": "Informacije o skupini", 
    "Groups": "Skupine", 
    "Header": "Glava", 
    "Header 1": "Glava 1", 
    "Header 2": "Glava 2", 
    "Header 3": "Glava 3", 
    "Header 4": "Glava 4", 
    "Header 5": "Glava 5", 
    "Header 6": "Glava 6", 
    "Headers": "Glave", 
    "Heading": "Naslov", 
    "Heading (Ctrl+H)": "Naslov (Ctrl+H)", 
    "Heading 1": "Naslov1", 
    "Heading 2": "Naslov2", 
    "Heading 3": "Naslov3", 
    "Heading 4": "Naslov 4", 
    "Heading 5": "Naslov 5", 
    "Heading 6": "Naslov 6", 
    "Headings": "Naslovi", 
    "Height": "Vi\u0161ina", 
    "Hide Annotations": "Skrij pripombe", 
    "Hide Discussion": "Skrij pogovor", 
    "Horizontal Rule (Ctrl+R)": "Horinzontalno pravilo (Ctrl+R)", 
    "Hyperlink (Ctrl+L)": "Povezava (Ctrl+L)", 
    "ID": "ID", 
    "Ignore": "Ignoriraj", 
    "Ignore all": "Ignoriraj vse", 
    "Image (Ctrl+G)": "Sika (Ctrl+G)", 
    "Image description": "Opis slike", 
    "In Progress": "V delu", 
    "Insert": "Vstavi", 
    "Insert column after": "Vstavi stolpec pred", 
    "Insert column before": "Vstavi stolpec za", 
    "Insert date/time": "Vstavi datum/\u010das", 
    "Insert image": "Vstavi sliko", 
    "Insert link": "Vstavi povezavo", 
    "Insert row after": "Vstavi vrstico za", 
    "Insert row before": "Vstavi vrstico pred", 
    "Insert table": "Vstavi tabelo", 
    "Insert template": "Vstavi predlogo", 
    "Insert video": "Vstavi video", 
    "Insert/edit image": "Vstavi/spremeni sliko", 
    "Insert/edit link": "Vstavi/spremeni povezavo", 
    "Insert/edit video": "Vstavi/spremeni video", 
    "Is Visible To:": "Vidno :", 
    "Italic (Ctrl+I)": "Le\u017ee\u010de (Ctrl+I)", 
    "Keywords": "Klju\u010dne besede", 
    "Large": "Veliko", 
    "Left": "Levo", 
    "List item": "Seznam", 
    "Load all responses": "Nalo\u017ei vse odzive", 
    "Load more": "Nalo\u017ei ve\u010d", 
    "Loading": "Nalaganje", 
    "Loading content": "Nalagam vsebino", 
    "Loading more threads": "Nalagam ve\u010d vsebine", 
    "Loading thread list": "Nalagam seznam vsebine", 
    "Lock/unlock file": "Zakleni/odkleni datoteko", 
    "Loud": "Glasno", 
    "Low": "Tiho", 
    "Markdown Editing Help": "Pomo\u010d pri urejevanju", 
    "Maximum": "Maksimum", 
    "Merge cells": "Zdru\u017ei celice", 
    "Middle": "Sredina", 
    "Module state successfully deleted.": "Stanje modula uspe\u0161no izbrisano.", 
    "Muted": "Uti\u0161ano", 
    "My Notes": "Moji zapiski", 
    "Name": "Ime", 
    "Never published": "Nikoli objavleno", 
    "New Address": "Nov naslov", 
    "New document": "Nov dokument", 
    "New window": "Novo okno", 
    "Next": "Naprej", 
    "No color": "Brez barve", 
    "None": "Brez", 
    "Not Graded": "Neocenjeno", 
    "Number of Students": "\u0160tevilo \u0161tudentov", 
    "Numbered List (Ctrl+O)": "O\u0161tevil\u010den seznam (Ctrl+O)", 
    "OK": "OK", 
    "Ok": "V redu", 
    "Open": "Odpri", 
    "Open Calculator": "Odpri kalkulator", 
    "Open/download this file": "Odpri/prenesi to datoteko", 
    "Organization": "Organizacija", 
    "Other": "Drugo", 
    "Page break": "Prelom strani", 
    "Paragraph": "Odstavek", 
    "Password": "geslo", 
    "Paste": "Prilepi", 
    "Paste as text": "Prilepi kot besedilo", 
    "Paste row after": "Prilepi vrstico za", 
    "Paste row before": "Prilepi vrstico pred", 
    "Pause": "Pavza", 
    "Pinned": "Ozna\u010deno", 
    "Play": "Igraj", 
    "Please enter a student email address or username.": "Prosimo vnesite email ali ime \u0161tudenta.", 
    "Post body": "Post vsebina", 
    "Preferred Language": "\u017deleni jezik", 
    "Preview": "Predogled", 
    "Print": "Natisni", 
    "Publish": "Objavi", 
    "Redo (Ctrl+Shift+Z)": "Uveljavi (Ctrl+Shift+Z)", 
    "Redo (Ctrl+Y)": "Uveljavi (Ctrl+Y)", 
    "Remove": "Odstrani", 
    "Remove link": "Odstrani povezavo", 
    "Replace": "Zamenjaj", 
    "Replace all": "Zamenjaj vse", 
    "Replace with": "Zamenjaj z", 
    "Reply to Annotation": "Odgovorite na komentar", 
    "Reported": "Prijavljena", 
    "Rescore problem '<%= problem_id %>' for all students?": "Ponovno oceni problem  '<%= problem_id %>'  za vse \u0161tudente?", 
    "Reset Password": "Ponastavi geslo", 
    "Reset attempts for all students on problem '<%= problem_id %>'?": "Ponastavi poskuse za vse \u0161tudente na problemu  '<%= problem_id %>'?", 
    "Right": "Desno", 
    "Robots": "Roboti", 
    "Row": "Vrstica", 
    "Rows": "Vrstice", 
    "Save": "Shrani", 
    "Search Results": "Rezultati iskanja", 
    "Settings": "Nastavitve", 
    "Show Annotations": "Prika\u017ei pripombe", 
    "Show Discussion": "Prika\u017ei pogovor", 
    "Showing all responses": "Prika\u017ei vse odzive", 
    "Sorry": "Oprosti", 
    "Source": "Izvor", 
    "Source code": "Izvorna koda", 
    "Speed": "Hitrost", 
    "Square": "Kvadrat", 
    "Staff Only": "Samo osebje", 
    "Start": "Za\u010detek", 
    "Start Date": "Datum za\u010detka", 
    "Start search": "Za\u010dni iskanje", 
    "Started rescore problem task for problem '<%= problem_id %>' and student '<%= student_id %>'. Click the 'Show Background Task History for Student' button to see the status of the task.": "Ponovno ocenjevanje za problem  '<%= problem_id %>' in \u0161tudenta '<%= student_id %>' se je za\u010delo. Kliknite na 'Poka\u017ei zgodovino opravil za \u0161tudenta' da pogledate status opravila. ", 
    "Status": "Status", 
    "Student": "\u0160tudent", 
    "Style": "Slog", 
    "Submit": "Oddaj", 
    "Submitted": "Oddano", 
    "Subscript": "Podpisano", 
    "Success! Problem attempts reset for problem '<%= problem_id %>' and student '<%= student_id %>'.": "Uspe\u0161no! Problem za problem  '<%= problem_id %>' in \u0161tudenta '<%= student_id %>' je ponastavljen.", 
    "Successfully started task to rescore problem '<%= problem_id %>' for all students. Click the 'Show Background Task History for Problem' button to see the status of the task.": "Opravilo za ponovno ocenjevanje vseh poskusov na problemu '<%= problem_id %>' se je uspe\u0161no za\u010delo. Kliknite na 'Poka\u017ei zgodovino opravil za problem' da pogledate status opravila. ", 
    "Successfully started task to reset attempts for problem '<%= problem_id %>'. Click the 'Show Background Task History for Problem' button to see the status of the task.": "Opravilo za ponastavitev vseh poskusov na problemu '<%= problem_id %>' se je uspe\u0161no za\u010delo. Kliknite na 'Poka\u017ei zgodovino opravil za problem' da pogledate status opravila. ", 
    "Table": "Tabela", 
    "Table properties": "Lastnosti tabele", 
    "Templates": "Predloge", 
    "Text color": "Barva besedila", 
    "There is no email history for this course.": "Za ta te\u010daj nimate zgodovine sporo\u010dil.", 
    "There was an error obtaining email task history for this course.": "Pri pridobivanju zgodovine sporo\u010dil za ta te\u010daj je pri\u0161lo do napake.", 
    "This link will open in a new browser window/tab": "Ta povezava se bo odprla v novem oknu/zavihku", 
    "This may be happening because of an error with our server or your internet connection. Try refreshing the page or making sure you are online.": "To se dogaja zaradi napake na na\u0161ih serverjih ali va\u0161i internetni povezavi. Poizkusite osve\u017eiti stran ali preverite internetno povezavo.", 
    "This post is visible only to %(group_name)s.": "Ta objava je vidna samo %(group_name)s.", 
    "This post is visible to everyone.": "Ta objava je vidna vsem", 
    "Title": "Naslov", 
    "Tools": "Orodja", 
    "Top": "Vrh", 
    "Total": "Skupaj", 
    "Total Number": "Celotna \u0161tevilka", 
    "Underline": "Pod\u010drtano", 
    "Undo": "Razveljavi", 
    "Undo (Ctrl+Z)": "Razveljavi (Ctrl+Z)", 
    "Unit": "Poglavje", 
    "Unknown": "Neznan", 
    "Upload": "Nalo\u017ei", 
    "Upload New File": "Nalo\u017ei novo datoteko", 
    "Upload PDF": "Nalo\u017ei PDF", 
    "Upload completed": "Nalaganje je zaklju\u010deno", 
    "Url": "URL", 
    "User": "Uporabnik", 
    "Very loud": "Zelo glasno", 
    "Very low": "Zelo tiho", 
    "Video": "Video", 
    "Video ended": "Video kon\u010dan", 
    "Video position": "Video pozicija", 
    "View": "Pogled", 
    "View Archived Course": "Poglej arhivirane te\u010daje", 
    "View Course": "Poglej te\u010daj", 
    "View Live": "Pogled v \u017eivo", 
    "Volume": "Glasnost", 
    "We had some trouble loading more threads. Please try again.": "Pri nalaganju vsebine smo imeli te\u017eave. Prosimo poskusite znova.", 
    "We had some trouble loading the discussion. Please try again.": "Pri nalaganju pogovora smo imeli te\u017eave. Prosimo poskusite znova.", 
    "We had some trouble loading the threads you requested. Please try again.": "Pri nalaganju smo imeli te\u017eave. Prosimo, poskusite znova.", 
    "We had some trouble saving your vote.  Please try again.": "Pri shranjevanju tvojega glasu smo imeli te\u017eave. Prosim poskusite znova", 
    "What does this mean?": "Kaj to pomeni?", 
    "Width": "\u0160irina", 
    "Words: {0}": "Besede:{0}", 
    "Year of Birth": "Leto rojstva", 
    "You have unsaved changes are you sure you want to navigate away?": "Imate neshranjene spremembe, ali res \u017eelite nadaljevati?", 
    "Your message cannot be blank.": "Va\u0161e sporo\u010dilo ne more biti prazno.", 
    "Your message must have a subject.": "Va\u0161e sporo\u010dilo mora imeti naslov.", 
    "Your post will be discarded.": "Va\u0161a objava bo izbrisana", 
    "Zoom In": "Pove\u010daj", 
    "Zoom Out": "Pomanj\u0161aj", 
    "a day": "dan", 
    "about %d hour": [
      "pribli\u017eno %d ura", 
      "pribli\u017eno %d uri", 
      "pribli\u017eno %d ur", 
      "pribli\u017eno %d ur"
    ], 
    "about a minute": "pribli\u017eno minuto", 
    "about a month": "pribli\u017eno mesec", 
    "about a year": "pribli\u017eno leto", 
    "about an hour": "pribli\u017eno uro", 
    "anonymous": "anonimen", 
    "close": "zapri", 
    "delete chapter": "izbri\u0161i poglavje", 
    "delete group": "izbri\u0161i skupino", 
    "e.g. johndoe@example.com, JaneDoe, joeydoe@example.com": "npr. johndoe@example.com, JaneDoe, joeydoe@example.com", 
    "emphasized text": "poudarjeno besedilo", 
    "enter code here": "vnesite kodo", 
    "enter link description here": "vnesite opis povezave", 
    "less than a minute": "manj kot minuto", 
    "strong text": "krepko besedilo", 
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
    "DATETIME_FORMAT": "j. F Y. H:i", 
    "DATETIME_INPUT_FORMATS": [
      "%d.%m.%Y %H:%M:%S", 
      "%d.%m.%Y %H:%M:%S.%f", 
      "%d.%m.%Y %H:%M", 
      "%d.%m.%Y", 
      "%d.%m.%y %H:%M:%S", 
      "%d.%m.%y %H:%M:%S.%f", 
      "%d.%m.%y %H:%M", 
      "%d.%m.%y", 
      "%d-%m-%Y %H:%M:%S", 
      "%d-%m-%Y %H:%M:%S.%f", 
      "%d-%m-%Y %H:%M", 
      "%d-%m-%Y", 
      "%d. %m. %Y %H:%M:%S", 
      "%d. %m. %Y %H:%M:%S.%f", 
      "%d. %m. %Y %H:%M", 
      "%d. %m. %Y", 
      "%d. %m. %y %H:%M:%S", 
      "%d. %m. %y %H:%M:%S.%f", 
      "%d. %m. %y %H:%M", 
      "%d. %m. %y", 
      "%Y-%m-%d %H:%M:%S", 
      "%Y-%m-%d %H:%M:%S.%f", 
      "%Y-%m-%d %H:%M", 
      "%Y-%m-%d"
    ], 
    "DATE_FORMAT": "d. F Y", 
    "DATE_INPUT_FORMATS": [
      "%d.%m.%Y", 
      "%d.%m.%y", 
      "%d-%m-%Y", 
      "%d. %m. %Y", 
      "%d. %m. %y", 
      "%Y-%m-%d"
    ], 
    "DECIMAL_SEPARATOR": ",", 
    "FIRST_DAY_OF_WEEK": "0", 
    "MONTH_DAY_FORMAT": "j. F", 
    "NUMBER_GROUPING": "3", 
    "SHORT_DATETIME_FORMAT": "j.n.Y. H:i", 
    "SHORT_DATE_FORMAT": "j. M. Y", 
    "THOUSAND_SEPARATOR": ".", 
    "TIME_FORMAT": "H:i", 
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

