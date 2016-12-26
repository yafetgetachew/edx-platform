

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
      "%(value)s hores"
    ], 
    "%(value)s minute": [
      "%(value)s minut", 
      "%(value)s minuts"
    ], 
    "%(value)s second": [
      "%(value)s segon", 
      "%(value)s segons"
    ], 
    "%d day": [
      "%d dia", 
      "%d dies"
    ], 
    "%d minute": [
      "%d minut", 
      "%d minuts"
    ], 
    "%d month": [
      "%d mes", 
      "%d mesos"
    ], 
    "%d year": [
      "%d any", 
      "%d anys"
    ], 
    "%s ago": "fa %s", 
    "%s from now": "%s des d'ara", 
    "Actions": "Accions", 
    "Add New Component": "Afegir un nou component", 
    "Add to Dictionary": "Afegir al diccionari", 
    "Advanced": "Avan\u00e7at", 
    "Align center": "Alinear al centre", 
    "Align left": "Alinear a l'esquerra", 
    "Align right": "Alinear a la dreta", 
    "Alignment": "Alineaci", 
    "Alternative source": "Font alternativa", 
    "Are you sure you want to delete this comment?": "Segur que vols esborrar aquest comentari?", 
    "Are you sure you want to delete this post?": "Segur que vols esborrar aquest post?", 
    "Are you sure you want to delete this response?": "Segur que vols esborrar aquesta resposta?", 
    "Are you sure you want to delete this update?": "Segur que vols esborrar aquesta actualitzaci\u00f3?", 
    "Are you sure you wish to delete this item. It cannot be reversed!\n\nAlso any content that links/refers to this item will no longer work (e.g. broken images and/or links)": "Segur que vols esborrar aquest element? No es podran desfer els canvis!\n\n\nA m\u00e9s, qualsevol contingut enlla\u00e7at o que faci refer\u00e8ncia a aquest element ja no funcionar\u00e0 (imatges o enlla\u00e7os trencats)", 
    "Are you sure?": "Segur?", 
    "Author": "Autor", 
    "Average": "Mig", 
    "Background color": "Color de fons", 
    "Blockquote": "Cita", 
    "Blockquote (Ctrl+Q)": "Cita (Ctrl+Q)", 
    "Blocks": "blocs", 
    "Body": "Cos", 
    "Bold": "Negreta", 
    "Bold (Ctrl+B)": "Negreta (Ctrl+B)", 
    "Border": "Marge", 
    "Border color": "Color del marge", 
    "Bulleted List (Ctrl+U)": "Llista amb pics (Ctrl+U)", 
    "Cancel": "Cancel\u00b7lar", 
    "Cell properties": "Propietats de les cel\u00b7les", 
    "Center": "Centre", 
    "Choose File": "Escull arxiu", 
    "Circle": "Cercle", 
    "Close": "Tancar", 
    "Close Calculator": "Tancar la calculadora", 
    "Code": "Codi", 
    "Code Sample (Ctrl+K)": "Exemple de codi (Ctrl+K)", 
    "Collapse Instructions": "Col\u00b7lapsar instruccions", 
    "Color": "Color", 
    "Column": "Columna", 
    "Commentary": "Comentaris", 
    "Common Problem Types": "Tipus de problemes freq\u00fcents", 
    "Community TA": "Comunitat TA", 
    "Component": "Component", 
    "Configure": "Configura", 
    "Copy": "opiar", 
    "Copy row": "Copiar fila", 
    "Could not find users associated with the following identifiers:": "No s'han pogut trobar usuaries associats amb el seg\u00fcents identificadors:", 
    "Country": "Pa\u00eds", 
    "Cut": "Tallar", 
    "Date": "Data", 
    "Date Added": "Data afegida", 
    "Delete": "Esborrar", 
    "Delete File Confirmation": "Confirma l'esborrat del fitxer", 
    "Delete column": "Esborrar columna", 
    "Delete row": "Esborrar fila", 
    "Delete student '<%= student_id %>'s state on problem '<%= problem_id %>'?": "Vols esborrar l'estat de l'estudiant '<%= student_id %>' per al problema '<%= problem_id %>'?", 
    "Delete table": "Esborrar taula", 
    "Delete this asset": "Esborra aquest recurs", 
    "Delete \u201c<%= name %>\u201d?": "Vols esborrar \u201c<%= name %>\u201d?", 
    "Deleting": "Esborrant", 
    "Deleting a textbook cannot be undone and once deleted any reference to it in your courseware's navigation will also be removed.": "Esborrar un llibre de text no es pot desfer i un cop esborrat qualsevol refer\u00e8ncia a ell en el navegador de materials del curs tamb\u00e9 ser\u00e0 eliminada.", 
    "Description": "Descripci\u00f3", 
    "Dimensions": "Dimensions", 
    "Disc": "Disc", 
    "Display Name": "Mostra el Nom", 
    "Document properties": "Propietats del document", 
    "Duration (sec)": "Durada (segons)", 
    "Edit": "Editar", 
    "Edit HTML": "Editar HTML", 
    "Editing: %(title)s": "Editant: %(title)s", 
    "Editor": "Editor", 
    "Email": "Email", 
    "Emails successfully sent. The following users are no longer enrolled in the course:": "Emails enviats correctament. Els seg\u00fcents usuaris ja no estan donats d'alta al curs:", 
    "Emoticons": "Emoticones", 
    "Enter username or email": "Entra el nom d'usuari o email", 
    "Error": "Error", 
    "Error adding/removing users as beta testers.": "Error afegint o eliminant usuaris com a beta testers.", 
    "Error changing user's permissions.": "Error canviant els permisos d'usuari.", 
    "Error enrolling/unenrolling users.": "Error donant d'alta/baixa usuaris.", 
    "Error generating grades. Please try again.": "Error generant puntuacions. Si us plau, intenta-ho de nou.", 
    "Error getting student list.": "Error obtenint la llista d'estudiants.", 
    "Error listing task history for this student and problem.": "Error llistant l'hist\u00f2ric de tasques per aquest estudiant i problema.", 
    "Error retrieving grading configuration.": "Error obtenint la configuraci\u00f3 de graus", 
    "Error sending email.": "Error enviant email.", 
    "Error: You cannot remove yourself from the Instructor group!": "Error: no pots eliminar-te tu mateix del grup d'instructors!", 
    "Exit full browser": "Surt del navegador complet", 
    "Expand Instructions": "Expandir instruccions", 
    "File": "Arxiu", 
    "File Name": "Nom del fitxer", 
    "Files must be in JPEG or PNG format.": "Els fitxers han d'estar en format JPEG o PNG.", 
    "Fill browser": "Navegador complet", 
    "Find": "Trobar", 
    "Find and replace": "Trobar i reempla\u00e7ar", 
    "Find next": "Trobar seg\u00fcent", 
    "Find previous": "Trobar anterior", 
    "Finish": "Acabar", 
    "Font Sizes": "Tamanys de lletra", 
    "Format": "Format", 
    "Formats": "Formats", 
    "Fullscreen": "Pantalla complerta", 
    "General": "General", 
    "Grace period must be specified in HH:MM format.": "El per\u00edode de gr\u00e0cia ha de tenir el format HH:MM.", 
    "Header 1": "T\u00edtol 1", 
    "Header 2": "T\u00edtol 2", 
    "Header 3": "T\u00edtol 3", 
    "Heading": "Cap\u00e7alera", 
    "Heading (Ctrl+H)": "Cap\u00e7alera (Ctrl+H)", 
    "Heading 1": "T\u00edtol 1", 
    "Heading 2": "T\u00edtol 2", 
    "Heading 3": "T\u00edtol 3", 
    "Hide Annotations": "Ocultar anotacions", 
    "Hide Discussion": "Ocultar discussi\u00f3", 
    "Horizontal Rule (Ctrl+R)": "L\u00ednia horitzontal (Ctrl+R)", 
    "Horizontal line": "L\u00ednea horitzontal", 
    "Hyperlink (Ctrl+L)": "Enlla\u00e7 (Ctrl+L)", 
    "Ignore": "Ignorar", 
    "Image (Ctrl+G)": "Imatge (Ctrl+G)", 
    "Image description": "Descripci\u00f3 de la imatge", 
    "Insert Hyperlink": "Inserta l'hipervincle", 
    "Italic (Ctrl+I)": "Cursiva (Ctrl+I)", 
    "Key should only contain letters, numbers, _, or -": "La clau nom\u00e9s pot contenir lletres, nombres, _, o -", 
    "Links are generated on demand and expire within 5 minutes due to the sensitive nature of student information.": "Els enlla\u00e7os es generen sota demanda i caduquen en 5 minuts degut a la naturalesa sensible de la informaci\u00f3 de l'estudiant.", 
    "List item": "Item de llista", 
    "List of uploaded files and assets in this course": "Llista d'arxius i recursos pujats en aquests curs", 
    "Load all responses": "Carrega totes les respostes", 
    "Load more": "Carrega m\u00e9s", 
    "Loading content": "Carregant el contingut", 
    "Loading more threads": "Carregant m\u00e9s fils", 
    "Loading thread list": "Carregant llista de fils", 
    "Lock/unlock file": "Bloqueja/desbloqueja aquest arxiu", 
    "Loud": "Alt", 
    "Low": "Baix", 
    "Markdown Editing Help": "Ajuda d'edici\u00f3 amb etiquetes", 
    "Maximum": "M\u00e0xim", 
    "Membership": "Pertinen\u00e7a", 
    "Module state successfully deleted.": "Estat del m\u00f2dul esborrat correctament.", 
    "Muted": "Mut", 
    "My Notes": "Les meves notes", 
    "Name": "Nom", 
    "None": "Cap", 
    "Not Graded": "No puntuat", 
    "Number of Students": "Nombre d'estudiants", 
    "Numbered List (Ctrl+O)": "Llista numerada (Ctrl+O)", 
    "OK": "D'acord", 
    "Only <%= fileTypes %> files can be uploaded. Please select a file ending in <%= fileExtensions %> to upload.": "Nom\u00e9s els fitxers de tipus <%= fileTypes %> es poden carregar. Si us plau, selecciona un fitxer que acabi en <%= fileExtensions %> per poder-lo carregar.", 
    "Open": "Obrir", 
    "Open Calculator": "Obrir la calculadora", 
    "Open/download this file": "Obre/descarrega aquest arxiu", 
    "Other": "Altres", 
    "Paragraph": "Par\u00e0graf", 
    "Pause": "Pausa", 
    "Pinned": "Fixat", 
    "Play": "Iniciar", 
    "Please address the errors on this page first, and then save your progress.": "Si us plau, primer arregla els errors en aquesta p\u00e0gina i llavors guarda el progr\u00e9s.", 
    "Please do not use any spaces in this field.": "Si us plau, no facis servir espais en aquest camp.", 
    "Please do not use any spaces or special characters in this field.": "Si us plau, no facis servir espais o car\u00e0cters especials en aquest camp.", 
    "Please enter a student email address or username.": "Si us plau entra una adre\u00e7a d'email d'estudiant o nom d'usuari.", 
    "Please enter a username or email.": "Si us plau, entra el nom d'usuari o email.", 
    "Please enter an integer between 0 and 100.": "Si us plau, entra un nombre enter de 0 a 100.", 
    "Please enter an integer greater than 0.": "Si us plau, entra un nombre enter m\u00e9s gran que 0.", 
    "Please enter non-negative integer.": "Si us plau, entra un nombre enter no negatiu.", 
    "Please select a PDF file to upload.": "Si us plau, seleccioneu un fitxer PDF per pujar-lo.", 
    "Post body": "Cos del missatge", 
    "Preformatted": "Pre-formatejat", 
    "Preview": "Previsualitzar", 
    "Publish": "Publica", 
    "Redo (Ctrl+Shift+Z)": "Refer (Ctrl+Shift+Z)", 
    "Redo (Ctrl+Y)": "Refer (Ctrl+Y)", 
    "Remove": "Eliminar", 
    "Replace": "Substituir", 
    "Reply to Annotation": "Respondre anotaci\u00f3", 
    "Requester": "Sol\u00b7licitant", 
    "Required field.": "Camp requerit.", 
    "Rescore problem '<%= problem_id %>' for all students?": "Vols re-puntuar el problema '<%= problem_id %>' per a tots els estudiants?", 
    "Reset attempts for all students on problem '<%= problem_id %>'?": "Vols reiniciar els intents de tots els estudiants sobre el problema '<%= problem_id %>'?", 
    "Revoke access": "Revocar l'acc\u00e9s", 
    "Save": "Guardar", 
    "Save Changes": "Guardar canvis", 
    "Save changes": "Guardar els canvis", 
    "Saving": "Guardant", 
    "Search": "Cerca", 
    "Settings": "Configuraci\u00f3", 
    "Show Annotations": "Mostrar anotacions", 
    "Show Discussion": "Mostrar discussi\u00f3", 
    "Showing all responses": "Mostrant totes les respostes", 
    "Sorry": "Ho sentim", 
    "Sorry, there was an error parsing the subtitles that you uploaded. Please check the format and try again.": "Perdoni, hi ha hagut un error analitzant els subt\u00edtols que ha pujat. Si us plau, reviseu el format i torneu-ho a provar.", 
    "Started rescore problem task for problem '<%= problem_id %>' and student '<%= student_id %>'. Click the 'Show Background Task History for Student' button to see the status of the task.": "Iniciada la tasca de re-puntuaci\u00f3 de problema per al problema '<%= problem_id %>' i estudiant '<%= student_id %>'. Feu clic al bot\u00f3  'Mostrar Hist\u00f2ric de Tasques en Segon Pla per a l'Estudiant' per veure l'estat de la tasca.", 
    "State": "Estat", 
    "Studio's having trouble saving your work": "L'Studio t\u00e9 problemes guardant la teva feina.", 
    "Submit": "Enviar", 
    "Submitted": "Enviat", 
    "Success! Problem attempts reset for problem '<%= problem_id %>' and student '<%= student_id %>'.": "Correcte! Els intents de problema han estat re-iniciats per al problema '<%= problem_id %>' i l'estudiant '<%= student_id %>'.", 
    "Successfully deleted student state for user {user}": "S'ha esborrat l'estat de l'estudiant per l'usuari {user}", 
    "Successfully enrolled and sent email to the following users:": "Els seg\u00fcents usuaris han estat donats d'alta correctament i se'ls ha enviat un email:", 
    "Successfully enrolled the following users:": "Els seg\u00fcents usuaris han estat donats d'alta correctament:", 
    "Successfully rescored problem for user {user}": "S'ha pogut reescriure la puntuaci\u00f3 del problema de l'usuari {user}", 
    "Successfully reset the attempts for user {user}": "S'han reiniciat amb \u00e8xit els intents per l'usuari {user}", 
    "Successfully sent enrollment emails to the following users. They will be allowed to enroll once they register:": "S'han enviat correctament els emails d'alta dels seg\u00fcents usuaris. Es podran donar d'alta un cop s'enregistrin:", 
    "Successfully sent enrollment emails to the following users. They will be enrolled once they register:": "S'han enviat correctament els emails d'alta als seg\u00fcents usuaris. Seran donats d'alta un cop s'enregistrin:", 
    "Successfully started task to rescore problem '<%= problem_id %>' for all students. Click the 'Show Background Task History for Problem' button to see the status of the task.": "S'ha iniciat correctament la tasca per re-puntuar el problema '<%= problem_id %>' per a tots els estudiants. Clica el bot\u00f3 'Mostrar Hist\u00f2ric de Tasques en Segon Pla del Problema' per veure l'estat de la tasca.", 
    "Successfully started task to reset attempts for problem '<%= problem_id %>'. Click the 'Show Background Task History for Problem' button to see the status of the task.": "S'ha iniciat correctament la tasca per reiniciar els intents del problema '<%= problem_id %>'. Feu clic al bot\u00f3 'Mostrar Hist\u00f2ric de Tasques en Segon Pla per a l'Estudiant' per veure l'estat de la tasca.", 
    "Task ID": "ID de tasca", 
    "Task Progress": "Progr\u00e9s de tasca", 
    "Task Status": "Estat de tasca", 
    "Task Type": "Tipus de tasca", 
    "Task inputs": "Entrades de tasca", 
    "The course must have an assigned start date.": "El curs ha de tenir assignada una data d'inici.", 
    "The enrollment end date cannot be after the course end date.": "La data de baixa del curs no pot ser posterior a la data de final de curs.", 
    "The enrollment start date cannot be after the enrollment end date.": "La data d'alta al curs no pot ser posterior la a data de baixa.", 
    "The following email addresses and/or usernames are invalid:": "Les seg\u00fcents adreces de correu i/o noms d'usuaris s\u00f3n inv\u00e0lids:", 
    "The following users are no longer enrolled in the course:": "Els usuaris seg\u00fcents ja no estan donats d'alta al curs:", 
    "The thread you selected has been deleted. Please select another thread.": "El fil que ha seleccionat ha sigut esborrat. Si us plau, seleccioneu-ne un altre.", 
    "There is no email history for this course.": "No hi ha hist\u00f2ric d'emails per aquest curs.", 
    "There was an error obtaining email task history for this course.": "Hi ha hagut un error obtenint l'email d'hist\u00f2ric de tasques per aquest curs.", 
    "There was an error with the upload": "Hi ha hagut un error durant la c\u00e0rrega", 
    "There's already another assignment type with this name.": "Ja hi ha un altre tipus de tasca amb aquest nom.", 
    "These users were not added as beta testers:": "Aquests usuaris no s'han afegit com a beta testers:", 
    "These users were not affiliated with the course so could not be unenrolled:": "Aquests usuaris no han estat afiliats al curs i, per tant, no han pogut ser donats de baixa:", 
    "These users were not removed as beta testers:": "Aquests usuaris no s'han esborrat com a beta testers:", 
    "These users were successfully added as beta testers:": "Aquests usuaris s'han afegit correctament com a beta testers:", 
    "These users were successfully removed as beta testers:": "Aquests usuaris han estat correctament eliminats com a beta testers:", 
    "These users will be allowed to enroll once they register:": "Aquests usuaris poden donar-se d'alta un cop s'enregistrin:", 
    "These users will be enrolled once they register:": "Aquests usuaris seran donats d'alta un cop s'enregistrin:", 
    "This action cannot be undone.": "Aquesta acci\u00f3 no es pot desfer.", 
    "This link will open in a modal window": "Aquest enlla\u00e7 s'obrir\u00e0 en una finestra modal", 
    "This link will open in a new browser window/tab": "Aquest enlla\u00e7 s'obrir\u00e0 en una nova finestra/pestanya del navegador", 
    "This may be happening because of an error with our server or your internet connection. Try refreshing the page or making sure you are online.": "Deu ser per un error amb el nostre servidor o la teva connexi\u00f3 d'Internet. Intenta refrescar la p\u00e0gina o assegura't que est\u00e0s connectat.", 
    "Title": "T\u00edtol", 
    "Unable to retrieve data, please try again later.": "No  s'ha pogut obtenir les dades. Si us plau, intenta-ho m\u00e9s endavant.", 
    "Undo (Ctrl+Z)": "Desfer (Ctrl+Z)", 
    "Unknown": "Desconegut", 
    "Unknown Error Occurred.": "Hi ha hagut un error desconegut.", 
    "Unscheduled": "No planificat", 
    "Upload": "Pujar", 
    "Upload File": "Carregar fitxer", 
    "Upload a new PDF to \u201c<%= name %>\u201d": "Carregar un nou PDF a \u201c<%= name %>\u201d", 
    "Upload completed": "C\u00e0rrega completada", 
    "Upload translation": "Pujar traducci\u00f3", 
    "Upload your course image.": "Carregar la imatge del curs", 
    "Upload your first asset": "Puja el teu primer recurs", 
    "Username": "Nom d'usuari", 
    "Users must create and activate their account before they can be promoted to beta tester.": "Els usuaris han de crear i activar els seus comptes abans de poder ser promoguts a beta tester.", 
    "Very loud": "Molt alt", 
    "Very low": "Molt baix", 
    "Video": "Video", 
    "Video ended": "Video finalitzat", 
    "Video position": "Posici\u00f3 del v\u00eddeo", 
    "Volume": "Volum", 
    "We had some trouble deleting this comment. Please try again.": "Hem tingut problemes esborrant aquest comentari. Si us plau, intenta-ho de nou.", 
    "We had some trouble loading more responses. Please try again.": "Hem tingut problemes carregant m\u00e9s respostes. Si us plau, intenta-ho de nou.", 
    "We had some trouble loading more threads. Please try again.": "Hem tingut problemes carregant m\u00e9s fils. Si us plau, intenta-ho de nou.", 
    "We had some trouble loading responses. Please reload the page.": "Hem tingut problemes carregant les respostes. Si us plau, recarrega la p\u00e0gina.", 
    "We had some trouble loading the discussion. Please try again.": "Hem tingut problemes carregant la discussi\u00f3. Si us plau, prova-ho de nou.", 
    "We had some trouble loading the page you requested. Please try again.": "Estem tenint alguns problemes carregant la p\u00e0gina que ha demanat. Si us plau, torna-ho a provar.", 
    "We had some trouble loading the threads you requested. Please try again.": "Hem tingut problemes carregant els fils que has sol\u00b7licitat. Si us plau, intenta-ho de nou.", 
    "We're sorry, there was an error": "Ho sentim, hi ha hagut un error", 
    "You haven't added any assets to this course yet.": "Encara no has afegit cap recurs en aquest curs.", 
    "You must specify a name": "Has d'especificar un nom", 
    "You've made some changes": "Has fet canvis", 
    "You've made some changes, but there are some errors": "Has fet canvis, per\u00f2 hi ha hagut errors", 
    "Your changes have been saved.": "Els canvis s'han guardat", 
    "Your changes will not take effect until you save your progress.": "Els teus canvis no tindran efecte fins que no salvis el teu progr\u00e9s.", 
    "Your changes will not take effect until you save your progress. Take care with key and value formatting, as validation is not implemented.": "Els canvis no tindran efecte fins que guardis el teu progr\u00e9s. Vigila el format de la clau i el valor, ja que no controlem si s\u00f3n v\u00e0lids o no.", 
    "Your file has been deleted.": "El teu fitxer s'ha esborrat.", 
    "Your message cannot be blank.": "El teu missatge no pot estar en blanc.", 
    "Your message must have a subject.": "El teu missatge ha de tenir un tema.", 
    "Your policy changes have been saved.": "Els teus canvis de pol\u00edtica s'han guardat.", 
    "a day": "un dia", 
    "about %d hour": [
      "aproximadament %d hora", 
      "aproximadament %d hores"
    ], 
    "about a minute": "aproximadament un minut", 
    "about a month": "aproximadament un mes", 
    "about a year": "aproximadament un any", 
    "about an hour": "aproximadament una hora", 
    "anonymous": "an\u00f2nim", 
    "close": "Tanca", 
    "emphasized text": "text emfatitzat", 
    "enter code here": "entra el codi aqu\u00ed", 
    "enter link description here": "entra aqu\u00ed la descripci\u00f3 de l'enlla\u00e7", 
    "less than a minute": "menys d'un minut", 
    "or": "o", 
    "strong text": "text en negreta", 
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

