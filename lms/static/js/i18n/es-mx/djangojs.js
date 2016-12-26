

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
    "A valid email address is required": "Se requiere un correo electronico valido ", 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ": "ABCDEFGHIJKLMNOPQRSTUVWXYZ", 
    "Adding": "a\u00f1adir", 
    "Admin": "Admin", 
    "Advanced": "Avanzado", 
    "All groups must have a name.": "Todos los grupos deben tener nombre", 
    "All groups must have a unique name.": "todos los grupos deben de tener un nombre unico", 
    "Already a course team member": "Miembro existente del curso", 
    "Already a library team member": "Miembro existente del grupo de libreria", 
    "Already have an account?": "\u00bfYa tiene una cuenta?", 
    "Annotation": "Nota", 
    "Are you sure you want to delete this page? This action cannot be undone.": "Estas seguro de eliminar esta p\u00e1gina? Esta acci\u00f3n no puede ser revertida.", 
    "Are you sure you want to delete this update?": "Seguro que quieres borrar este mensaje?", 
    "Are you sure you want to revert to the last published version of the unit? You cannot undo this action.": "Esta seguro de querer regresar a la ultima versi\u00f3n publicada de esta unidad? No se puede deshacer esta accion\n ", 
    "Are you sure you wish to delete this item. It cannot be reversed!\n\nAlso any content that links/refers to this item will no longer work (e.g. broken images and/or links)": "Esta seguro que desea borrar este elemento. \u00a1Esta operaci\u00f3n no se puede revertir!\n\nCualquier contenido que lige/refiera a este elemento ya no funcionar\u00e1 (por ej. im\u00e1genes y/o enlaces)", 
    "Are you sure?": "Esta seguro?", 
    "Bold (Ctrl+B)": "Negritas (Ctrl+B)", 
    "Cancel": "Cancelar", 
    "Caption": "\tsubt\u00edtulo", 
    "Change Manually": "cambiar manualmente", 
    "Choose File": "Escoge un archivo", 
    "Choose new file": "Elija un nuevo archivo", 
    "Circle": "C\u00edrculo", 
    "Close": "Cerrar", 
    "Closed": "Cerrado", 
    "Collapse Instructions": "Contraer instrucciones", 
    "Commentary": "Comentario", 
    "Community TA": "Comunidad TA", 
    "Component": "Componente", 
    "Confirm": "Confirmar", 
    "Correct failed component": "Corregir falla en componente", 
    "Country": "Pais ", 
    "Course Index": "indice del curso", 
    "Course Number": "Numero de curso", 
    "Course Outline": "Contorno del curso", 
    "Course is not yet visible to students.": "El curso aun no es visible a estudiantes.", 
    "Create Re-run": "crear repeticion  ", 
    "Dashboard": "Pizarra", 
    "Date": "Fecha", 
    "Date Added": "Fecha de Inclusi\u00f3n", 
    "Date added": "fecha a\u00f1adida", 
    "Delete": "Borrar", 
    "Delete File Confirmation": "Confirmacion de eliminaci\u00f3n de archivo", 
    "Delete Page Confirmation": "Confirmaci\u00f3n de Eliminaci\u00f3n de P\u00e1gina", 
    "Delete this %(item_display_name)s?": "Eliminar este %(item_display_names)s?", 
    "Delete \u201c<%= name %>\u201d?": "\u00bfEliminar \"<%= name %>\"?", 
    "Deleting": "Eliminando", 
    "Deleting a textbook cannot be undone and once deleted any reference to it in your courseware's navigation will also be removed.": "Eliminar un libro de texto es permanente y tambi\u00e9n elimina cualquier referencia a este en el navegador del material del curso.", 
    "Deleting this %(item_display_name)s is permanent and cannot be undone.": "Eliminacion de %(item_display_names)s es permanente y no puede ser deshechada", 
    "Description": "Descripci\u00f3n", 
    "Discard Changes": "Desechar cambios", 
    "Discarding Changes": "Descartar cambios", 
    "Discussion": "Discusi\u00f3n", 
    "Drag to reorder": "Para reordenar, arrastra", 
    "Duplicating": "Duplicando", 
    "Edit": "Editar", 
    "Editing visibility for: %(title)s": "editar visibilidad para: %(title)s ", 
    "Editing: %(title)s": "Editando: %(title)s", 
    "Editor": "Editor", 
    "Email": "Correo electr\u00f3nico", 
    "Error": "Error", 
    "Error adding user": "error al a\u00f1adir usuario", 
    "Error importing course": "error al importar curso", 
    "Error removing user": "Error al eliminar usuario ", 
    "Error:": "Error:", 
    "Expand Instructions": "Expandir instrucciones", 
    "Explicitly Hiding from Students": "esconder empl\u00edcitamente de estudiantes", 
    "File {filename} exceeds maximum size of {maxFileSizeInMBs} MB": "Archivo {nombre del archivo} excede el tama\u00f1o m\u00e1ximo de {maxFileSizeinMBs} MB", 
    "Files must be in JPEG or PNG format.": "Los archivos deben estar en formato JPEG o PNG.rgar", 
    "Forgot password?": "Olvido su contrase\u00f1a?", 
    "Full Name": "Nombre completo", 
    "Fullscreen": "Pantalla completa", 
    "Gender": "G\u00e9nero", 
    "Grace period must be specified in HH:MM format.": "El tiempo limite debe ser especificada en el formato: HH:MM.", 
    "Group %s": "Grupo %s", 
    "Group A": "grupo A", 
    "Group B": "grupo B", 
    "Group Configuration name is required.": "se requiere nombre del configuracion grupal", 
    "Group name is required": "nombre del grupo es requerido", 
    "Hide Annotations": "Esconder anotaciones", 
    "Hide Deprecated Settings": "esconder ajustes obsoletos", 
    "Hiding from Students": "esconder de los estudiantes", 
    "Hyperlink (Ctrl+L)": "Hiperv\u00ednculo (Ctrl+L)", 
    "If the unit was previously published and released to students, any changes you made to the unit when it was hidden will now be visible to students. Do you want to proceed?": "Si la unidad fue previamente publicada y liberada a estudiantes, cualquier cambio que se haya hecho cuando estaba oculta a estos, sera ahora visible a los estudiantes. Desea continuar?", 
    "Inheriting Student Visibility": "visibilidad estudiantil heredada", 
    "Instructor": "Instructor", 
    "Italic (Ctrl+I)": "It\u00e1lica (Ctrl+I)", 
    "Key should only contain letters, numbers, _, or -": "La clave puede  contener solo letras, n\u00fameros, _ o -", 
    "Language": "Idioma", 
    "Load Another File": "Cargar otro archivo", 
    "Loading": "Cargando", 
    "Make Visible to Students": "hacer visible a estudiantes", 
    "Making Visible to Students": "hacer visible a estudiantes", 
    "Max file size exceeded": "m\u00e1ximo tama\u00f1o de archivo ha sido excedido", 
    "Membership": "Membres\u00eda", 
    "My Notes": "Mis notas", 
    "Name": "Nombre", 
    "Next": "Siguiente", 
    "None": "Ninguno", 
    "Not Graded": "Sin Calificar", 
    "Not in Use": "sin uso", 
    "Notes": "Notas", 
    "Number of Students": "edad <%=value%>", 
    "OK": "OK", 
    "Ok": "Ok", 
    "Only <%= fileTypes %> files can be uploaded. Please select a file ending in <%= fileExtensions %> to upload.": "Solo archivos <%= fileTypes %> pueden ser cargados. Por favor selecciona un archivo que termine con <%= fileExtensions %> para cargar.", 
    "OpenAssessment Save Error": "Evaluacion abierta Guardar Error", 
    "Order History": "Historial de ordenes", 
    "Other": "Otro", 
    "Password": "Contrase\u00f1a", 
    "Pending": "pendiente", 
    "Please address the errors on this page first, and then save your progress.": "Por favor corrige primero los errores de esta p\u00e1gina, despu\u00e9s guardas tus avances.", 
    "Please do not use any spaces in this field.": "Por favor no uses espacios en este campo", 
    "Please do not use any spaces or special characters in this field.": "Por favor, no uses ning\u00fan espacio o caracteres especiales en este campo.", 
    "Please enter an integer between 0 and 100.": "Por favor introduce un entero entre 0 y 100.", 
    "Please enter an integer greater than 0.": "Por favor introduce un entero mayor que 0.", 
    "Please enter non-negative integer.": "Por favor introduce un entero positivo.", 
    "Please follow the instructions here to upload a file elsewhere and link to it: {maxFileSizeRedirectUrl}": "por favor siga las instrucciones para cargar un archivo en cualquier parte y hacer el enlace para este: {maxFileSizeRedirectUrl} ", 
    "Please select a PDF file to upload.": "por favor elija archivo PDF para cargar", 
    "Preferred Language": "Lenguaje preferido", 
    "Preview": "Vista preliminar", 
    "Previous": "Previo", 
    "Processing Re-run Request": "proceso de repetici\u00f3n pedida", 
    "Publish": "publicar", 
    "Publishing": "Publilcando ", 
    "Queued": "Encolar", 
    "Remove": "Remover", 
    "Replace": "Reemplazar", 
    "Reply to Annotation": "Responder a la anotaci\u00f3n", 
    "Required field.": "Entrada requerida ", 
    "Reset Password": "Restablecer contrase\u00f1a", 
    "Return and add email address": "Regresar y a\u00f1adir un correo electronico  ", 
    "Return to Export": "presione return para exportar", 
    "Return to team listing": "Regresar al listado de equipo", 
    "Right to left": "de derecha a izquierda", 
    "Save": "Guardar", 
    "Save Changes": "Guardar Cambios", 
    "Save changes": "Salvar cambios", 
    "Saving": "Guardando", 
    "Search": "Buscar", 
    "Section": "Seccion ", 
    "Settings": "Ajustes", 
    "Show Annotations": "Mostrar anotaciones.", 
    "Show Deprecated Settings": "mostrar ajustes obsoletos", 
    "Sorry, there was an error parsing the subtitles that you uploaded. Please check the format and try again.": "Lo sentimos, hubo un error al analizar los subtitulos que subiste. Por favor revisa el formato e int\u00e9ntalo de nuevo.", 
    "Staff": "Equipo", 
    "Status": "Estatus", 
    "Student": "Estudiante", 
    "Studio's having trouble saving your work": "Studio tiene problemas al tratar de guardar tu trabajo.", 
    "Submit": "Enviar", 
    "Subsection": "Subseccion ", 
    "The combined length of the organization and library code fields cannot be more than <%=limit%> characters.": "el largo de la combinaci\u00f3n entre organizaci\u00f3n y c\u00f3digo de librer\u00eda no puede ser mas  <%=limit%> caracteres ", 
    "The combined length of the organization, course number, and course run fields cannot be more than <%=limit%> characters.": "el largo de la combinacion entre organizacion, numero de curso,y campo de curso no pueden ser mas de <%=limit%> caracteres ", 
    "The course must have an assigned start date.": "El curso debe tener una fecha de inicio asignada.", 
    "The enrollment end date cannot be after the course end date.": "La fecha de fin de registro no puede ser posterior a la fecha de fin de curso.", 
    "The enrollment start date cannot be after the enrollment end date.": "la fecha de inicio de registro no puede ser posterior a la fecha de termino de registro.", 
    "The raw error message is:": "El mensaje error prima es:", 
    "There has been a failure to export to XML at least one component. It is recommended that you go to the edit page and repair the error before attempting another export. Please check that all components on the page are valid and do not display any error messages.": "Se ha presentado una falla al exportar  a XML cuando menos en un componente. Se recomienda regresar a editar la p\u00e1gina y componer el error antes de intentar exportar otro. Por favor revise que todos los componentes de la p\u00e1gina son v\u00e1lidos y que no se muestren mensajes de error", 
    "There has been an error while exporting.": "Se ha presentado un problema al exportar", 
    "There has been an error with your export.": "Se ha presentado un error al exportar", 
    "There must be at least one group.": "Debe existir al menos un grupo", 
    "There was an error changing the user's role": "Se present\u00f3 un error al cambiar el rol del usario ", 
    "There was an error during the upload process.": "Se ha presentado un error durante el proceso de carga", 
    "There was an error while importing the new course to our database.": "Se ha presentado un error al importar el nuevo curso de nuestra base de datos", 
    "There was an error while unpacking the file.": "Se ha presentado un error al descargar el archivo", 
    "There was an error while verifying the file you submitted.": "Se ha presentado un error al verificar el archivo submitido", 
    "There was an error with the upload": "Hubo un error al cargar el archivo", 
    "There's already another assignment type with this name.": "Ya existe otra asignatura con el mismo nombre.", 
    "This action cannot be undone.": "Esta acci\u00f3n no es reversible", 
    "This component has validation issues.": "Este componente tiene cuestiones de validacion", 
    "This link will open in a modal window": "Este enlace se abrir\u00e1 en ventana emergente. ", 
    "This link will open in a new browser window/tab": "El enlace se abrir\u00e1 en una nueva ventana/pesta\u00f1a del navegador", 
    "This may be happening because of an error with our server or your internet connection. Try refreshing the page or making sure you are online.": "Esto puede estar pasando debido a un error en la conexi\u00f3n. Aseg\u00farate de contar con conexi\u00f3n a Internet e Intenta actualizar la p\u00e1gina.", 
    "Title": "T\u00edtulo", 
    "Tools": "Herramientas", 
    "Total": "Total", 
    "Type": "tipo", 
    "Undo Changes": "deshacer cambios", 
    "Unit": "Unidad", 
    "Unknown": "Desconocido", 
    "Update": "Aztualizado", 
    "Upload": "Cargar", 
    "Upload File": "Cargar archivo", 
    "Upload New File": "Cargar un Nuevo Archivo", 
    "Upload a new PDF to \u201c<%= name %>\u201d": "Env\u00eda un nuevo PDF a \"<%= name %>\"", 
    "Upload completed": "Carga completada", 
    "Upload failed": "carga fallida", 
    "Upload translation": "Cargar traducci\u00f3n", 
    "Upload your course image.": "Cargar la imagen de tu curso", 
    "Uploading": "Cargando", 
    "User": "Usuario", 
    "Username": "Nombre de usuario", 
    "Validation Error While Saving": "Error de validacion al guardar", 
    "Verification Deadline": "Fecha l\u00edmite de la verificaci\u00f3n", 
    "Video ID": "ID del video", 
    "View": "Ver mas", 
    "View Course": "Ver curso", 
    "Warning": "precaucion", 
    "We're sorry, there was an error": "Lo sentimos, ha ocurrido un error", 
    "Words: {0}": "palabras: {0}", 
    "Year of Birth": "A\u00f1o de nacimiento", 
    "You have not created any content groups yet.": "No se han creado ningun contenido de grupos", 
    "You have not created any group configurations yet.": "Usted no ha creado ninguna configuraci\u00f3n grupal ", 
    "You have unsaved changes. Do you really want to leave this page?": "Tiene cambios sin guardar. Realmente quiere salir de esta p\u00e1gina?", 
    "You must enter a valid email address in order to add a new team member": "Se requiere un correo electronico valido para poder a\u00f1adir a un nuevo miembro del equipo", 
    "You must specify a name": "Debes especificar un nombre", 
    "You've made some changes": "Has realizado cambios", 
    "You've made some changes, but there are some errors": "Has realizado cambios, pero existen algunos errores.", 
    "Your changes have been saved.": "Los cambios han sido guardados.", 
    "Your changes will not take effect until you save your progress.": "Los cambios no har\u00e1n efecto hasta que guardes tus avances.", 
    "Your changes will not take effect until you save your progress. Take care with key and value formatting, as validation is not implemented.": "Los cambios no surtir\u00e1n efecto hasta que haya salavado su progreso. Tenga cuidado con el formato de clave y valor, ya que la validaci\u00f3n no est\u00e1 implementada.", 
    "Your file could not be uploaded": "su archivo no pudo ser cargado", 
    "Your file has been deleted.": "El archivo a sido eliminado", 
    "Your import has failed.": "La importacion ha fallado ", 
    "Your policy changes have been saved.": "Tus cambios de pol\u00edza han sido guardados.", 
    "a day": "un d\u00eda", 
    "about a minute": "cerca de un minuto", 
    "about a month": "cerca de un mes", 
    "about a year": "cerca de un a\u00f1o", 
    "about an hour": "cerca de una hora", 
    "anonymous": "an\u00f3nimo", 
    "close": "cerrar", 
    "content group": "contenido de grupo", 
    "correct": "correcto", 
    "group configuration": "configuracion grupal", 
    "incorrect": "incorrecto", 
    "less than a minute": "menos de un minuto", 
    "or": "o", 
    "section": "seccion  ", 
    "subsection": "subseccion ", 
    "unit": "unidad"
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
    "DATETIME_FORMAT": "j \\d\\e F \\d\\e Y \\a \\l\\a\\s H:i", 
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
    "DATE_FORMAT": "j \\d\\e F \\d\\e Y", 
    "DATE_INPUT_FORMATS": [
      "%d/%m/%Y", 
      "%d/%m/%y", 
      "%Y%m%d", 
      "%Y-%m-%d"
    ], 
    "DECIMAL_SEPARATOR": ".", 
    "FIRST_DAY_OF_WEEK": "1", 
    "MONTH_DAY_FORMAT": "j \\d\\e F", 
    "NUMBER_GROUPING": "3", 
    "SHORT_DATETIME_FORMAT": "d/m/Y H:i", 
    "SHORT_DATE_FORMAT": "d/m/Y", 
    "THOUSAND_SEPARATOR": "\u00a0", 
    "TIME_FORMAT": "H:i", 
    "TIME_INPUT_FORMATS": [
      "%H:%M:%S", 
      "%H:%M:%S.%f", 
      "%H:%M"
    ], 
    "YEAR_MONTH_FORMAT": "F \\d\\e Y"
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

