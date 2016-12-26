

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
    "#Replies": "#Respuestas", 
    "%d day": [
      "%d d\u00eda", 
      "%d d\u00edas"
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
    "A name that identifies your team (maximum 255 characters).": "Un nombre que identifique a tu equipo (M\u00e1ximo 255 caracteres)", 
    "Add to Dictionary": "Agregar al Diccionario", 
    "Adding the selected course to your cart": "A\u00f1adiendo el curso seleccionado a su carrito", 
    "Advanced": "Avanzado", 
    "Align center": "Alinear al centro", 
    "Align left": "Alinear al izquierda", 
    "Align right": "Alinear a la derecha", 
    "Alignment": "Alineaci\u00f3n", 
    "All Topics": "Todos los temas", 
    "All accounts were created successfully.": "Todas las cuentas fueron creadas satisfactoriamente.", 
    "All teams": "Todos los equipos", 
    "Alternative source": "Fuente alternativa", 
    "An error has occurred. Check your Internet connection and try again.": "Ha ocurrido un error. Revise su conexi\u00f3n a internet e int\u00e9ntelo nuevamente.", 
    "An error has occurred. Try refreshing the page, or check your Internet connection.": "Ha ocurrido un error. Actualice la p\u00e1gina, o revise su conexi\u00f3n a internet.", 
    "An error occurred. Please try again.": "Ha ocurrido un error. Por favor int\u00e9ntelo nuevamente.", 
    "Annotation": "Anotaci\u00f3n", 
    "Are you sure you want to delete this comment?": "\u00bfEst\u00e1 usted seguro que quiere eliminar este comentario?", 
    "Are you sure you want to delete this response?": "\u00bfEst\u00e1 usted seguro que quiere eliminar esta respuesta?", 
    "Author": "Autor", 
    "Average": "Promedio", 
    "Background color": "Color de Fondo", 
    "Body": "Cuerpo", 
    "Border": "Borde", 
    "Bullet list": "Lista de vi\u00f1etas", 
    "Cancel": "Cancelar", 
    "Cell": "celda", 
    "Cell properties": "Propiedades de celda", 
    "Cell type": "Tipo de celda", 
    "Close": "Cerrar", 
    "Close Calculator": "Cerrar Calculadora", 
    "Code": "C\u00f3digo", 
    "Collapse Instructions": "Contraer instrucciones", 
    "Color": "Color", 
    "Column": "Columna", 
    "Commentary": "Comentario", 
    "Confirm": "Confirmar", 
    "Copy": "Copiar", 
    "Copy Email To Editor": "Copiar Correo Electr\u00f3nico a Editor", 
    "Copy row": "Copiar fila", 
    "Country": "Pa\u00eds", 
    "Country or Region": "Pa\u00eds o Regi\u00f3n", 
    "Create": "Crear", 
    "Current conversation": "Conversaci\u00f3n actual", 
    "Custom color": "Color personalizado", 
    "Custom...": "Personalizar...", 
    "Cut": "Cortar", 
    "Cut row": "Cortar fila", 
    "Delete": "Borrar", 
    "Delete column": "Eliminar columna", 
    "Delete row": "Eliminar fila", 
    "Delete table": "Eliminar tabla", 
    "Delete this team?": "\u00bfEliminar este equipo?", 
    "Description": "Descripci\u00f3n", 
    "Dimensions": "Dimensiones", 
    "Do not show again": "No mostrar de nuevo", 
    "Duration (sec)": "Duraci\u00f3n (seg)", 
    "Edit": "Editar", 
    "Edit Team": "Editar equipo", 
    "Education Completed": "Educaci\u00f3n completa", 
    "Email": "Correo Electr\u00f3nico", 
    "Email Address": "Correo electr\u00f3nico", 
    "Encoding": "Codificaci\u00f3n", 
    "End": "Fin", 
    "Enrolling you in the selected course": "Inscribi\u00e9ndolo en el curso seleccionado", 
    "Enter a student's username or email address.": "Ingrese el usuario o correo electr\u00f3nico de un alumno.", 
    "Enter team description.": "Ingresar la descripci\u00f3n del equipo", 
    "Enter team name.": "Ingresar el nombre del equipo.", 
    "Enter username or email": "Ingresar usuario o correo electr\u00f3nico", 
    "Error": "Error", 
    "Errors": "Errores", 
    "Expand Instructions": "Expandir instrucciones", 
    "File Name": "Nombre del Archivo", 
    "Find": "Encontrar", 
    "Find and replace": "Buscar y reemplazar ", 
    "Find next": "Buscar siguiente", 
    "Find previous": "Buscar anterior", 
    "Finish": "Terminar", 
    "Font Sizes": "Tama\u00f1o de fuente", 
    "Footer": "Pie de p\u00e1gina", 
    "Format": "Formato", 
    "Full Name": "Nombre completo", 
    "Fullscreen": "Pantalla completa", 
    "Gender": "G\u00e9nero", 
    "Header": "Encabezado", 
    "Header 1": "Encabezado 1", 
    "Header 2": "Encabezado 2", 
    "Header 3": "Encabezado 3", 
    "Header 4": "Encabezado 4", 
    "Header 5": "Encabezado 5", 
    "Header 6": "Encabezado 6", 
    "Headers": "Encabezados", 
    "Heading 1": "Encabezado 1", 
    "Heading 2": "Encabezado 2", 
    "Heading 3": "Encabezado 3", 
    "Heading 4": "Encabezado 4", 
    "Heading 5": "Encabezado 5", 
    "Heading 6": "Encabezado 6", 
    "Headings": "Encabezados", 
    "Height": "Altura", 
    "Hide Annotations": "Ocultar anotaciones", 
    "Hide Discussion": "Ocultar Discusi\u00f3n", 
    "High Definition": "Alta Definici\u00f3n", 
    "Horizontal line": "L\u00ednea horizontal", 
    "Horizontal space": "Espacio horizontal", 
    "Ignore": "Ignorar", 
    "Image": "Imagen", 
    "Image (Ctrl+G)": "Imagen (Ctrl+G)", 
    "Image description": "Descripci\u00f3n de la imagen ", 
    "Insert": "Insertar", 
    "Insert column after": "Inserte columna despu\u00e9s", 
    "Insert column before": "Inserte columna antes", 
    "Insert date/time": "Ingrese fecha/hora", 
    "Insert image": "Insertar imagen", 
    "Insert link": "Insertar link", 
    "Insert row after": "Insertar fila despu\u00e9s", 
    "Insert row before": "Insertar fila antes", 
    "Insert table": "Insertar tabla", 
    "Insert video": "Insertar video", 
    "Insert/edit image": "Insertar/editar imagen", 
    "Insert/edit link": "Insertar/editar link", 
    "Insert/edit video": "Insertar/editar video", 
    "Instructor": "Instructor", 
    "Justify": "Justificar", 
    "Language": "Idioma", 
    "Leave this team?": "\u00bfDejar este equipo?", 
    "Left": "Izquierda", 
    "Left to right": "Izquierda a derecha", 
    "Load all responses": "Cargar todas las respuestas", 
    "Load more": "Cargar m\u00e1s", 
    "Loading": "Cargando", 
    "Loading content": "Cargando el contenido", 
    "Loading data...": "Cargando la informaci\u00f3n...", 
    "Loading your courses": "Cargando cursos", 
    "Loud": "Alto", 
    "Low": "Bajo", 
    "Maximum": "M\u00e1ximo", 
    "Membership": "Afiliaci\u00f3n", 
    "Merge cells": "Combinar celdas", 
    "Message:": "Mensaje:", 
    "More": "M\u00e1s", 
    "My Notes": "Mis notas", 
    "My Team": "Mi equipo", 
    "Name": "Nombre", 
    "New document": "Nuevo documento", 
    "New window": "Nueva ventana", 
    "Next": "Siguiente", 
    "Numbered List (Ctrl+O)": "Lista Enumerada (Ctrl+O)", 
    "OK": "Ok", 
    "Ok": "Ok", 
    "Open Calculator": "Abrir Calculadora", 
    "Open language menu": "Abrir el men\u00fa de idiomas", 
    "Paragraph": "P\u00e1rrafo ", 
    "Password": "Contrase\u00f1a", 
    "Paste": "Pegar", 
    "Paste as text": "Pegar como texto", 
    "Paste row after": "Pegar fila despu\u00e9s", 
    "Paste row before": "Pegar fila antes", 
    "Pause": "Pausa", 
    "Pending": "Pendiente", 
    "Play": "Reproducir", 
    "Play video": "Reproducir video", 
    "Please check your email to confirm the change": "Por favor revise su correo electr\u00f3nico para confirmar el cambio", 
    "Please enter a student email address or username.": "Por favor ingrese un correo electr\u00f3nico de alumno o usuario.", 
    "Please enter a username or email.": "Por favor ingrese un usuario o correo electr\u00f3nico", 
    "Please enter a valid password": "Por favor introduce una contrase\u00f1a v\u00e1lida", 
    "Preview": "Vista previa", 
    "Print": "Imprimir", 
    "Public": "P\u00fablico", 
    "Redo (Ctrl+Shift+Z)": "Rehacer (Ctrl+Shift+Z)", 
    "Redo (Ctrl+Y)": "Rehacer (Ctrl+Y)", 
    "Replace": "Remplazar", 
    "Reply": "Responder", 
    "Reply to Annotation": "Replicar una anotaci\u00f3n", 
    "Requester": "Solicitante", 
    "Required field.": "Campo requerido", 
    "Reset Password": "Restablecer contrase\u00f1a", 
    "Revoke access": "Revocar acceso", 
    "Right": "Derecha", 
    "Row": "Fila", 
    "Row properties": "Propiedades de la fila", 
    "Row type": "Tipo de fila", 
    "Rows": "Filas", 
    "Save": "Guardar", 
    "Save changes": "Guardar cambios", 
    "Saving": "Grabando", 
    "Search": "Buscar", 
    "Search Results": "Resultados de la b\u00fasqueda", 
    "Search teams": "Buscar equipos", 
    "Section": "Secci\u00f3n", 
    "Select a chapter": "Seleccione un cap\u00edtulo", 
    "Select all": "Seleccionar todo", 
    "Sent By": "Enviado por", 
    "Sent By:": "Enviado por:", 
    "Sent To:": "Enviado a:", 
    "Show Annotations": "Mostrar anotaciones", 
    "Show Discussion": "Mostrar Discusi\u00f3n", 
    "Showing all responses": "Mostrando todas las respuestas", 
    "Sorry": "Disculpe", 
    "Source": "Fuente", 
    "Source code": "C\u00f3digo de fuente", 
    "Square": "Cuadrado", 
    "Start": "Inicio", 
    "State": "Estado", 
    "Status": "Estado", 
    "Style": "Estilo", 
    "Subject": "Asunto", 
    "Subject:": "Asunto:", 
    "Submit": "Enviar", 
    "Submitted": "Enviado", 
    "Subsection": "Subsecci\u00f3n", 
    "Success": "\u00c9xito", 
    "Tags": "Etiquetas", 
    "Task Progress": "Progreso de la Tarea", 
    "Task Type": "Tipo de Tarea", 
    "Team Description (Required) *": "Descripci\u00f3n del Equipo (Requerido) *", 
    "Team Name (Required) *": "Nombre del Equipo (Requerido) *", 
    "Team description cannot have more than 300 characters.": "La descripci\u00f3n del equipo no debe superar los 300 caracteres ", 
    "Team name cannot have more than 255 characters.": "El nombre del equipo no debe superar los 255 caracteres ", 
    "Teams": "Equipos", 
    "Text": "Texto", 
    "The country that team members primarily identify with.": "El pa\u00eds con el que el equipo se identifica principalmente.", 
    "The data could not be saved.": "La informaci\u00f3n no pudo ser guardada", 
    "The email address you use to sign in. Communications from {platform_name} and your courses are sent to this address.": "El correo electr\u00f3nico que usa para ingresar. Las comunicaciones de {nombre_plataforma} y sus cursos son enviadas a este correo.", 
    "The following errors were generated:": "Se generaron los siguientes errores:", 
    "The following warnings were generated:": "Se generaron las siguientes advertencias:", 
    "The language that team members primarily use to communicate with each other.": "El idioma que los miembros del equipo utilizan principalmente para comunicarse entre s\u00ed.", 
    "The language used throughout this site. This site is currently available in a limited number of languages.": "El idioma utilizado en todo este sitio. Este sitio est\u00e1 disponible en un n\u00famero limitado de idiomas.", 
    "This browser cannot play .mp4, .ogg, or .webm files.": "Este navegador no puede reproducir archivos .mp4, .ogg o .webm ", 
    "This link will open in a new browser window/tab": "Este enlace abrir\u00e1 una nueva ventana del navegador", 
    "This team does not have any members.": "Este equipo no tiene miembros", 
    "Topic": "Tema", 
    "Topics": "Temas", 
    "Try using a different browser, such as Google Chrome.": "Intente usando otro navegador, como Google Chrome", 
    "Underline": "Subrayar", 
    "Undo": "Deshacer", 
    "Undo (Ctrl+Z)": "Deshacer (Ctrl+Z)", 
    "Unit": "Unidad", 
    "Unknown": "Valor desconocido", 
    "Update": "Actualizar", 
    "Upload File": "Subir archivo", 
    "Uploading": "Subiendo", 
    "User": "Usuario", 
    "Username": "Usuario", 
    "Users": "Usuarios", 
    "Very loud": "Muy alto", 
    "Very low": "Muy bajo", 
    "Video": "Video", 
    "View": "Vista", 
    "Volume": "Volumen", 
    "Warnings": "Advertencias", 
    "We had some trouble deleting this comment. Please try again.": "Tuvimos algunos problemas eliminando este comentario. Por favor int\u00e9ntelo m\u00e1s tarde.", 
    "We had some trouble loading the page you requested. Please try again.": "Tuvimos algunos problemas cargando la p\u00e1gina que solicit\u00f3. Por favor int\u00e9ntelo m\u00e1s tarde", 
    "We've sent a confirmation message to {new_email_address}. Click the link in the message to update your email address.": "Hemos enviado un mensaje de confirmaci\u00f3n a {nuevo_correo_electr\u00f3nico}. Haga click en el link que aparece en el mensaje para actualizar su correo electr\u00f3nico.", 
    "We've sent a message to {email_address}. Click the link in the message to reset your password.": "Hemos enviado un mensaje a {correo_electr\u00f3nico}. Haga click en el link que aparece en el mensaje para restablecer su contrase\u00f1a.", 
    "Width": "Ancho", 
    "Year of Birth": "A\u00f1o de Nacimiento", 
    "You already belong to another team.": "Usted ya pertenece a otro equipo.", 
    "You are not currently a member of any team.": "Actualmente no pertenece a ning\u00fan equipo.", 
    "Your changes have been saved.": "Sus cambios han sido guardados.", 
    "Your message cannot be blank.": "Su mensaje no puede estar en blanco.", 
    "a day": "un d\u00eda", 
    "about %d hour": [
      "al rededor de %d hora", 
      "al rededor de %d horas"
    ], 
    "about a minute": "al rededor de un minuto", 
    "about a month": "al rededor de un mes", 
    "about a year": "al rededor de un a\u00f1o", 
    "about an hour": "al rededor de una hora", 
    "anonymous": "an\u00f3nimo", 
    "answer": "Respuesta", 
    "correct": "Correcto", 
    "incorrect": "Incorrecto", 
    "less than a minute": "Menos de un minuto", 
    "name": "nombre", 
    "off": "Apagado", 
    "on": "Encendido"
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
      "%Y-%m-%d"
    ], 
    "DECIMAL_SEPARATOR": ",", 
    "FIRST_DAY_OF_WEEK": "1", 
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

