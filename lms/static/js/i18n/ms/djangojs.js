

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
    "%(num_questions)s question": [
      "%(bil_soalan) soalan"
    ], 
    "%(num_students)s student": [
      "%(bil_pelajar) pelajar"
    ], 
    "%d day": [
      "%d hari"
    ], 
    "%d minute": [
      "%d minit"
    ], 
    "%d month": [
      "%d bulan"
    ], 
    "%d year": [
      "%d tahun"
    ], 
    "Cancel": "Batal", 
    "Choose File": "Pilih Fail", 
    "Circle": "bulat", 
    "Close": "Tutup", 
    "Color": "warna", 
    "Commentary": "Ulasan", 
    "Could not retrieve payment information": "Gagal mendapatkan maklumat pembayaran", 
    "Could not submit photos": "Tidak dapat menghantar gambar", 
    "Delete": "Padam", 
    "Description": "Penerangan", 
    "Exit full browser": "Keluar dari browser", 
    "Fill browser": "Isikan browser", 
    "Format": "Format", 
    "Fullscreen": "Skrin penuh", 
    "Hide Annotations": "Sembunyi anotasi", 
    "Insert date/time": "Masukkan tarikh/masa", 
    "Insert image": "masukkan imej", 
    "Insert link": "Masukkan link", 
    "Insert video": "Masukkan video", 
    "Insert/edit image": "Masuk/sunting imej", 
    "Insert/edit video": "Masuk/sunting video", 
    "Left": "Kiri", 
    "Left to right": "Kiri ke kanan", 
    "Loud": "Bising", 
    "Low": "Perlahan", 
    "Maximum": "Maksimum", 
    "Name": "Nama", 
    "Number of Students": "Bilangan pelajar", 
    "OK": "OK", 
    "Ok": "Ok", 
    "Pause": "Berhenti seketika", 
    "Play": "Mainkan", 
    "Redo": "Buat semula", 
    "Remove": "Buang", 
    "Replace": "Ganti", 
    "Replace all": "Ganti semua", 
    "Replace with": "Ganti dengan", 
    "Reply to Annotation": "Membalas anotasi", 
    "Right to left": "Kanan ke kiri", 
    "Save": "Simpan", 
    "Scope": "Skop", 
    "Select all": "Pilih semua", 
    "Short explanation": "penjelasan ringkas", 
    "Show Annotations": "Tunjuk anotasi", 
    "Sorry": "Maaf", 
    "This link will open in a new browser window/tab": "Pautan in akan dibuka di tab/tetingkap yang baru", 
    "Title": "Tajuk", 
    "Unknown": "Tidak diketahui", 
    "Upload File": "Muatnaik Fail", 
    "Uploading": "Muatnaik", 
    "Very loud": "sangat bising", 
    "Very low": "Sangat perlahan", 
    "Video ended": "Video tamat", 
    "Video position": "Kedudukan video", 
    "Your upload of '{file}' failed.": "'{Dokumen}' yang dimuat naik gagal", 
    "Your upload of '{file}' succeeded.": "'{Dokumen}' yang dimuat naik berjaya", 
    "a day": "sehari", 
    "about %d hour": [
      "lebih kurang %d jam"
    ], 
    "about a minute": "lebih kurang seminit", 
    "about a month": "lebih kurang sebulan", 
    "about a year": "lebih kurang setahun", 
    "about an hour": "lebih kurang sejam", 
    "anonymous": "samaran", 
    "answer": "jawapan", 
    "correct": "betul", 
    "incorrect": "tidak betul", 
    "less than a minute": "kurang dari seminit"
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

