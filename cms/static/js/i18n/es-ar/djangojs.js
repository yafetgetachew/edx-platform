

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
    "%(value)s hour": [
      "%(value)s hora", 
      "%(value)s horas"
    ], 
    "%(value)s minute": [
      "%(value)s minuto", 
      "%(value)s minutos"
    ], 
    "%(value)s second": [
      "%(value)s segundo", 
      "%(value)s segundos"
    ], 
    "%d day": [
      "%d dia", 
      "%d dias"
    ], 
    "%d minute": [
      "%d minuto", 
      "%d minutos"
    ], 
    "%d month": [
      "%d mes", 
      "%d meses"
    ], 
    "%d year": [
      "%d a\u00f1o", 
      "%d a\u00f1os"
    ], 
    "%s ago": "hace %s", 
    "%s from now": "%s desde ahora", 
    "Advanced": "Avanzado", 
    "All Rights Reserved": "Todos los derechos reservados", 
    "Are you sure you want to delete this post?": "\u00bfEst\u00e1s seguro de querer borrar este post?", 
    "Are you sure you want to delete this response?": "\u00bfEst\u00e1s seguro de querer borrar esta respuesta?", 
    "Are you sure you want to delete this update?": "Est\u00e1s seguro que quer\u00e9s borrar esta actualizaci\u00f3n?", 
    "Are you sure?": "Est\u00e1s seguro?", 
    "Average": "Promedio", 
    "Bold (Ctrl+B)": "Negrita (Ctrl+B)", 
    "Cancel": "Cancelar", 
    "Choose File": "Seleccionar archivo", 
    "Clear search": "Limpiar la busqueda ", 
    "Close": "Cerrar", 
    "Close Calculator": "Cerrar Calculadora", 
    "Closed": "Cerrado", 
    "Code Sample (Ctrl+K)": "Ejemplo de c\u00f3digo (Ctrl+K)", 
    "Collapse Instructions": "Colapsar Instrucciones", 
    "Commentary": "Comentario", 
    "Community TA": "Comunidad TA", 
    "Course": "Curso", 
    "Course ID": "ID del curso.", 
    "Course Number": "N\u00famero de curso", 
    "Creative Commons licensed content, with terms as follow:": "Este contenido est\u00e1 bajo la licencia Creative Commons, con los t\u00e9rminos que siguen:", 
    "Dashboard": "Pizarra", 
    "Date Added": "Fecha a\u00f1adida", 
    "Delete": "Borrar", 
    "Delete File Confirmation": "Confirmaci\u00f3n de borrado de archivo", 
    "Delete \u201c<%= name %>\u201d?": "\u00bfBorrar \"<%= name %>\"?", 
    "Deleting": "Borrando", 
    "Description": "Descripci\u00f3n", 
    "Discussion": "debate", 
    "Display Name": "Mostrar Nombre", 
    "Drag to reorder": "Arrastrar para reordenar", 
    "Edit": "Editar", 
    "Editor": "Editor", 
    "Email": "Email", 
    "Error": "Error", 
    "Error getting student list.": "Error obteniendo la lista de estudiantes.", 
    "Error sending email.": "Error al enviar el email.", 
    "Error:": "Error:", 
    "Exit full browser": "Salir del navegador", 
    "Expand Instructions": "Expandir Instrucciones", 
    "Fill browser": "Llenar el navegador", 
    "Forgot password?": "\u00bfOlvidaste tu contrase\u00f1a?", 
    "Full Name": "Nombre completo.", 
    "Gender": "Sexo", 
    "Heading": "Encabezado", 
    "Heading (Ctrl+H)": "Encabezado (Ctrl+H)", 
    "Hide Annotations": "Ocultar Anotaciones", 
    "Hide Discussion": "Ocultar Debate", 
    "Horizontal Rule (Ctrl+R)": "Regla Horizontal (Ctrl+R)", 
    "Hyperlink (Ctrl+L)": "Hyperlink (Ctrl+L)", 
    "Image (Ctrl+G)": "Imagen (Ctrl+G)", 
    "Italic (Ctrl+I)": "It\u00e1lica (Ctrl+I)", 
    "Key should only contain letters, numbers, _, or -": "La clase deber\u00eda contener s\u00f3lo letras, n\u00fameros, _, o -", 
    "LEARN MORE": "APRENDE MAS", 
    "Load Another File": "Cargar Otro Archivo", 
    "Load all responses": "Cargar todas las respuestas", 
    "Load more": "Cargar m\u00e1s", 
    "Loading": "Cargando", 
    "Loading content": "Cargando contenido", 
    "Loading more threads": "Cargando m\u00e1s hilos", 
    "Loading thread list": "Cargando lista de hilos", 
    "Loud": "Alto", 
    "Low": "Bajo", 
    "Maximum": "M\u00e1ximo", 
    "Muted": "Silenciado", 
    "My Notes": "Mis Notas", 
    "Name": "Nombre", 
    "None": "Nada", 
    "Numbered List (Ctrl+O)": "Lista Enumerada (Ctrl+O)", 
    "OK": "OK", 
    "Open": "Abrir", 
    "Open Calculator": "Abrir Calculadora", 
    "Other": "Otro", 
    "Password": "Contrase\u00f1a", 
    "Pause": "Pausar", 
    "Pending": "Pendiente", 
    "Play": "Reproducir", 
    "Please enter a student email address or username.": "Por favor, ingres\u00e1 una direcci\u00f3n de email de estudiante o nombre de usuario.", 
    "Please enter an integer between 0 and 100.": "Por favor, ingres\u00e1 un entero entre 0 y 100.", 
    "Please enter an integer greater than 0.": "Por favor, ingres\u00e1 un enteror mayor que cero.", 
    "Please enter non-negative integer.": "Por favor, ingres\u00e1 un entero no negativo.", 
    "Preview": "Vista previa", 
    "Print": "Imprimir", 
    "Programs": "Programas", 
    "Redo (Ctrl+Shift+Z)": "Rehacer (Ctrl+Shift+Z)", 
    "Redo (Ctrl+Y)": "Rehacer (Ctrl+Y)", 
    "Remove": "Quitar", 
    "Replace": "Remplazar", 
    "Reply to Annotation": "Contestar la anotaci\u00f3n", 
    "Required field.": "Campo requerido.", 
    "Reset Password": "Resetear Contrase\u00f1a", 
    "Save Changes": "Guardar cambios", 
    "Save changes": "Guardar cambios", 
    "Saving": "Guardando", 
    "Search": "B\u00fasqueda", 
    "Section": "Secci\u00f3n", 
    "Settings": "Configuraci\u00f3n", 
    "Show Annotations": "Mostrar Anotaciones", 
    "Show Discussion": "Mostrar Debate", 
    "Showing all responses": "Mostrando todas las respuestas", 
    "Some Rights Reserved": "Algunos derechos reservados", 
    "Sorry": "Disculp\u00e1", 
    "Status": "Estado", 
    "Student": "Estudiante", 
    "Submit": "Enviar", 
    "Subsection": "Subsecci\u00f3n", 
    "Teams": "Equipos", 
    "The course must have an assigned start date.": "El curso debe tener una fecha de inicio asignada.", 
    "The enrollment end date cannot be after the course end date.": "La fecha de fin de inscripci\u00f3n no puede ser posterior a la fecha de fin de curso.", 
    "The enrollment start date cannot be after the enrollment end date.": "La fecha de inicio de inscripci\u00f3n no puede ser posterior a la fecha de fin de inscripci\u00f3n.", 
    "There is no email history for this course.": "No hay historial de emails para este curso.", 
    "There was an error with the upload": "Hubo un error con la actualizaci\u00f3n", 
    "This action cannot be undone.": "Esta acci\u00f3n no puede deshacerse.", 
    "This link will open in a modal window": "Este enlace se abrir\u00e1 en una ventana modal", 
    "This link will open in a new browser window/tab": "Este link se abrir\u00e1 en una nueva ventana/pesta\u00f1a del explorador", 
    "Title": "T\u00edtulo", 
    "Tools": "Herramientas", 
    "Undo (Ctrl+Z)": "Deshacer (Ctrl+Z)", 
    "Unit": "Unidad", 
    "Unknown": "Desconocido", 
    "Update": "Actualizar", 
    "Upload File": "Subir Archivo", 
    "Upload New File": "Cargar Nuevo Archivo", 
    "Upload completed": "Carga completa", 
    "Verification Deadline": "Fecha l\u00edmite de verificaci\u00f3n", 
    "Verified Certificate": "Certificado verificado.", 
    "Very loud": "Muy alto", 
    "Very low": "Muy bajo", 
    "Video ID": "ID de video", 
    "Video ended": "Video finalizado", 
    "Video position": "Posici\u00f3n del video", 
    "View": "Vista", 
    "View Course": "Ver Curso", 
    "Volume": "Vol\u00famen", 
    "We had some trouble loading more responses. Please try again.": "Tuvimos alg\u00fan problema cargando m\u00e1s respuestas. Por favor, intent\u00e1lo de nuevo.", 
    "We had some trouble loading more threads. Please try again.": "Tuvimos alg\u00fan problema cargando m\u00e1s hilos. Por favor, intent\u00e1lo de nuevo.", 
    "We had some trouble loading responses. Please reload the page.": "Tuvimos alg\u00fan problema cargando las respuestas. Por favor, recarg\u00e1 la p\u00e1gina.", 
    "We had some trouble loading the discussion. Please try again.": "Tuvimos alg\u00fan problema cargando el debate. Por favor, intent\u00e1lo de nuevo.", 
    "We had some trouble loading the threads you requested. Please try again.": "Tuvimos alg\u00fan problema cargando los hilos que solicitaste. Por favor, intent\u00e1lo de nuevo.", 
    "We're sorry, there was an error": "Disculp\u00e1, hubo un error", 
    "You must specify a name": "Ten\u00e9s que especificar un nombre", 
    "You've made some changes": "Hiciste algunos cambios", 
    "You've made some changes, but there are some errors": "Hiciste algunos cambios, pero hay algunos errores", 
    "Your changes have been saved.": "Tus cambios han sido guardados.", 
    "Your changes will not take effect until you save your progress.": "Tus cambios no tendr\u00e1n efecto hasta que no guardes tu progreso.", 
    "Your file has been deleted.": "Tu archivo ha sido borrado.", 
    "Your message must have a subject.": "Tu mensaje tiene que tener asunto.", 
    "a day": "un d\u00eda", 
    "about a minute": "aproximadamente un minuto", 
    "about a month": "aproximadamente un mes", 
    "about a year": "aproximadamente un a\u00f1o", 
    "about an hour": "aproximadamente una hora", 
    "anonymous": "an\u00f3nimo", 
    "correct": "correcto", 
    "enter code here": "ingrresar c\u00f3digo aqu\u00ed", 
    "enter link description here": "ingresar la descripci\u00f3n del link aqui", 
    "incorrect": "incorrecto", 
    "less than a minute": "menos de un minuto", 
    "or": "o", 
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
    "DATETIME_FORMAT": "j N Y H:i", 
    "DATETIME_INPUT_FORMATS": [
      "%d/%m/%Y %H:%M:%S", 
      "%d/%m/%Y %H:%M:%S.%f", 
      "%d/%m/%Y %H:%M", 
      "%d/%m/%y %H:%M:%S", 
      "%d/%m/%y %H:%M:%S.%f", 
      "%d/%m/%y %H:%M", 
      "%Y-%m-%d %H:%M:%S", 
      "%Y-%m-%d %H:%M:%S.%f", 
      "%Y-%m-%d %H:%M", 
      "%Y-%m-%d"
    ], 
    "DATE_FORMAT": "j N Y", 
    "DATE_INPUT_FORMATS": [
      "%d/%m/%Y", 
      "%d/%m/%y", 
      "%Y-%m-%d"
    ], 
    "DECIMAL_SEPARATOR": ",", 
    "FIRST_DAY_OF_WEEK": "0", 
    "MONTH_DAY_FORMAT": "j \\d\\e F", 
    "NUMBER_GROUPING": "3", 
    "SHORT_DATETIME_FORMAT": "d/m/Y H:i", 
    "SHORT_DATE_FORMAT": "d/m/Y", 
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

