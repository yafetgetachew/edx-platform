

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
    "%d day": [
      "%d dias", 
      "%d dias"
    ], 
    "%d minute": [
      "%d minutos", 
      "%d minutos"
    ], 
    "%d month": [
      "%d meses", 
      "%d meses"
    ], 
    "%d year": [
      "%d anos", 
      "%d anos"
    ], 
    "%s ago": "%s atr\u00e1s", 
    "%s from now": "   %s a partir de agora", 
    "A valid email address is required": "\u00c9 requerido um endere\u00e7o de email v\u00e1lido", 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ": "ABCDEFGHIJKLMNOPQRSTUVWXYZ", 
    "Actions": "A\u00e7\u00f5es", 
    "Add New Component": "Adicionar um Novo Componente", 
    "Add to Dictionary": "Adicionar ao Dicion\u00e1rio", 
    "Adding": "Adicionar", 
    "Admin": "Administrador", 
    "Advanced": "Avan\u00e7ados", 
    "All Groups": "Todos os Grupos", 
    "All Rights Reserved": "Todos os direitos reservados ", 
    "All groups must have a name.": "Todos os grupos t\u00eam de ter nome.", 
    "All groups must have a unique name.": "Todos os grupos devem ter um nome \u00fanico.", 
    "Already a course team member": "J\u00e1 \u00e9 um membro da equipa do curso", 
    "Already a library team member": "J\u00e1 \u00e9 um membro da equipa desta biblioteca", 
    "Amount": "Quantidade", 
    "Are you sure you want to delete this page? This action cannot be undone.": "Tem a certeza que quer apagar esta p\u00e1gina? Esta a\u00e7\u00e3o n\u00e3o pode ser revertida", 
    "Are you sure you want to delete this update?": "Tem certeza que quer eliminar esta atualiza\u00e7\u00e3o?", 
    "Are you sure you want to delete {email} from the course team for \u201c{container}\u201d?": "Tem a certeza de que quer apagar {email} da equipe do curso para \u201c{container}\u201d?", 
    "Are you sure you want to delete {email} from the library \u201c{container}\u201d?": "Tem a certeza de que quer apagar {email} da biblioteca \u201c{container}\u201d?", 
    "Are you sure you want to revert to the last published version of the unit? You cannot undo this action.": "Tem a certeza que quer reverter para a \u00faltima vers\u00e3o publicada da unidade? N\u00e3o pode desfazer esta a\u00e7\u00e3o.", 
    "Are you sure you wish to delete this item. It cannot be reversed!\n\nAlso any content that links/refers to this item will no longer work (e.g. broken images and/or links)": "Tem certeza que deseja eliminar este item? A opera\u00e7\u00e3o n\u00e3o pode ser revertida! \u23ce\n\u23ce\nAl\u00e9m disso, qualquer conte\u00fado que tenha links ou se refira a este item deixa de funcionar (ex.: imagens e/or links quebrados) ", 
    "Are you sure?": "Tem a certeza?", 
    "Assignment Type Name": "Nome do Tipo de Tarefa", 
    "Attribution": "Atribui\u00e7\u00e3o", 
    "Average": "m\u00e9dia", 
    "Billed to": "Faturado a", 
    "Blockquote": "Blockquote", 
    "Blockquote (Ctrl+Q)": "Blockquote (Ctrl+Q)", 
    "Body": "Corpo", 
    "Bold (Ctrl+B)": "Negrito (Ctrl+B)", 
    "Bulleted List (Ctrl+U)": "Marcadores List (Ctrl+U)", 
    "Cancel": "Cancelar", 
    "Change Manually": "Alterar Manualmente", 
    "Choose File": "Escolha um ficheiro", 
    "Choose new file": "Escolha um novo ficheiro", 
    "Clear All": "Limpar tudo", 
    "Clear search results": "Limpe os resultados da pesquisa", 
    "Click to add": "Clique para adicionar", 
    "Click to change": "Click para mudar", 
    "Click to edit": "Clique para editar", 
    "Click to remove": "Clique para remover", 
    "Close": "Fechar", 
    "Code": "C\u00f3digo", 
    "Collapse All": "Recolher", 
    "Collapse Instructions": "Contrair Instru\u00e7\u00f5es", 
    "Commentary": "coment\u00e1rio", 
    "Common Problem Types": "Tipos Comuns de Problemas", 
    "Community TA": "Assistente de Ensino da Comunidade", 
    "Component": "Componente", 
    "Confirm": "Confirmar", 
    "Correct failed component": "Corrija o componente falhado", 
    "Country": "Pa\u00eds", 
    "Course": "Curso", 
    "Course ID": "Identifica\u00e7\u00e3o do Curso", 
    "Course Index": "Ind\u00edce de cursos", 
    "Course Number": "N\u00famero do Curso", 
    "Course Outline": "Descri\u00e7\u00e3o Geral do Curso", 
    "Create Re-run": "Criar Re-execu\u00e7\u00e3o", 
    "Create a new account": "Criar uma conta nova", 
    "Create team.": "Criar equipe.", 
    "Create your account": "Criar a sua conta", 
    "Crossed out items have been refunded.": "Os items selecionados foram reembolsados.", 
    "Current Role:": "Fun\u00e7\u00e3o Atual:", 
    "Dashboard": "Painel", 
    "Date": "Data", 
    "Date Added": "Data de Entrada", 
    "Date added": "Data adicionada", 
    "Delete": "Eliminar", 
    "Delete File Confirmation": "Confirma\u00e7\u00e3o da elimina\u00e7\u00e3o de ficheiro", 
    "Delete Page Confirmation": "Confirma\u00e7\u00e3o de Elimina\u00e7\u00e3o de P\u00e1gina", 
    "Delete Team": "Apagar equipe", 
    "Delete the user, {username}": "Eliminar o utilizador {username}", 
    "Delete this %(item_display_name)s?": "Apague isto  %(item_display_name)s?", 
    "Delete \u201c<%= name %>\u201d?": "Eliminar \u201c<%= name %>\u201d?", 
    "Deleting": "Eliminando", 
    "Deleting a textbook cannot be undone and once deleted any reference to it in your courseware's navigation will also be removed.": "A elimina\u00e7\u00e3o de um livro de texto n\u00e3o pode ser desfeita e qualquer refer\u00eancia a ele durante a navega\u00e7\u00e3o tamb\u00e9m ser\u00e1 removida. ", 
    "Deleting this %(item_display_name)s is permanent and cannot be undone.": "Apagar isto %(item_display_name)s \u00e9 permanente e n\u00e3o pode ser reposto.", 
    "Description": "Descri\u00e7\u00e3o", 
    "Discard Changes": "Descartar Altera\u00e7\u00f5es", 
    "Discarding Changes": "Descartar altera\u00e7\u00f5es", 
    "Discussion": "Discuss\u00e3o", 
    "Donate": "Fa\u00e7a um donativo", 
    "Download": "Descarregar", 
    "Drag and drop or click here to upload video files.": "Arraste e solte ou clique aqui para fazer o upload de ficheiros de v\u00eddeo.", 
    "Drag to reorder": "Arraste para reorganizar", 
    "Due Date": "Prazo", 
    "Duplicating": "A duplicar", 
    "Duration": "Dura\u00e7\u00e3o", 
    "Edit": "Editar", 
    "Editing visibility for: %(title)s": "Editar visibilidade para: %(title)s", 
    "Editing: %(title)s": "Edi\u00e7\u00e3o: %(title)s", 
    "Editor": "Editor", 
    "Email": "E-mail", 
    "Email Address": "Endere\u00e7o de e-mail", 
    "Email address": "Endere\u00e7o do correio eletr\u00f3nico", 
    "End My Exam": "Termine Meu Exame", 
    "Error": "Erro", 
    "Error adding user": "Erro durante a adi\u00e7\u00e3o do utilizador", 
    "Error importing course": "Erro ao importar o curso", 
    "Error removing user": "Erro na remo\u00e7\u00e3o do utilizador", 
    "Error:": "Erro:", 
    "Exit full browser": "Sair do navegador com ecr\u00e1n cheio ", 
    "Expand All": "Expandir", 
    "Expand Instructions": "Expandir Instru\u00e7\u00f5es", 
    "Explanation": "Explica\u00e7\u00e3o", 
    "Explicitly Hiding from Students": "Esconder explicitamente dos Estudantes", 
    "File {filename} exceeds maximum size of {maxFileSizeInMBs} MB": "Ficheiro {filename} excede o tamanho m\u00e1ximo de {maxFileSizeInMBs} MB", 
    "Files must be in JPEG or PNG format.": "Os ficheiros devem ser nos formatos JPEG ou PNG.", 
    "Fill browser": "Preencher navegador", 
    "Follow": "Seguir", 
    "Forgot password?": "Esqueceu a senha?", 
    "Full Name": "Nome completo", 
    "Gender": "Sexo", 
    "General": "Geral", 
    "Go to Dashboard": "V\u00e1 ao Painel de Instrumentos", 
    "Grace period must be specified in HH:MM format.": "O prazo de toler\u00e2ncia deve ser especificado no formato HH:MM. ", 
    "Grade": "Nota", 
    "Graded as:": "Avaliado como:", 
    "Grading": "Avalia\u00e7\u00e3o", 
    "Group %s": "Grupo %s", 
    "Group A": "Grupo A", 
    "Group B": "Grupo B", 
    "Group Configuration name is required.": "O nome da Configura\u00e7\u00e3o do Grupo \u00e9 obrigat\u00f3rio.", 
    "Group name is required": "O nome do Grupo \u00e9 obrigat\u00f3rio", 
    "Heading": "t\u00edtulo", 
    "Heading (Ctrl+H)": "t\u00edtulo (Ctrl+H)", 
    "Hide Annotations": "Ocultar Anota\u00e7\u00f5es", 
    "Hide Deprecated Settings": "Esconder defini\u00e7\u00f5es depreceadas", 
    "Hide Previews": "Esconder pr\u00e9-visualiza\u00e7\u00f5es", 
    "Hiding from Students": "Esconder de estudantes", 
    "Highlighted text": "Destacar texto", 
    "Horizontal Rule (Ctrl+R)": "Regra Horizontal (Ctrl+R)", 
    "Hyperlink (Ctrl+L)": "Hiperliga\u00e7\u00e3o (Ctrl+L)", 
    "If the unit was previously published and released to students, any changes you made to the unit when it was hidden will now be visible to students. Do you want to proceed?": "Se a unidade foi previamente publicada e libertada para estudantes, quaisquer altera\u00e7\u00f5es feitas para a unidade quando estava escondida ficar\u00e3o agora vis\u00edveis para estudantes. Quer continuar?", 
    "If you don't verify your identity now, you can still explore your course from your dashboard. You will receive periodic reminders from %(platformName)s to verify your identity.": "Se voc\u00ea n\u00e3o verificar a sua identidade agora, voc\u00ea pode ainda explorar o seu curso a partir do seu painel. Receber\u00e1 lembretes peri\u00f3dicos de %(platformName)s para verificar a sua identidade.", 
    "Image (Ctrl+G)": "Agrupar (Ctrl+G)", 
    "In Progress": "Em progresso", 
    "Inheriting Student Visibility": "Visibilidade inerente do Estudante", 
    "Italic (Ctrl+I)": "it\u00e1lico (Ctrl+I)", 
    "Key should only contain letters, numbers, _, or -": "A chave deve conter apenas letras, n\u00fameros, _, ou -", 
    "LEARN MORE": "SAIBA MAIS", 
    "Last Edited:": "\u00daltimo editado", 
    "Less": "Menos", 
    "Library User": "Utilizador da Biblioteca", 
    "List item": "item da lista", 
    "Load Another File": "Carregar Outro Ficheiro", 
    "Loading": "Carregando", 
    "Loud": "alto", 
    "Low": "baixo", 
    "Make Visible to Students": "Tornar Vis\u00edvel para Estudantes", 
    "Making Visible to Students": "tornar vis\u00edvel para os estudantes", 
    "Mark Exam As Completed": "Marque Exame Como Completado", 
    "Markdown Editing Help": "  Editando redu\u00e7\u00e3o de pre\u00e7o ", 
    "Max file size exceeded": "O tamanho m\u00e1ximo do ficheiro foi excedido", 
    "Maximum": "m\u00e1ximo", 
    "Membership": "Assinatura", 
    "Middle": "Meio", 
    "More": "Mais", 
    "Muted": "em surdina", 
    "My Notes": "As Minhas Notas", 
    "Name": "Nome", 
    "Next": "Pr\u00f3ximo", 
    "No receipt available": "Sem recibo ", 
    "No results": "Sem resultados", 
    "None": "Nenhum", 
    "Not Graded": "sem Classifica\u00e7\u00e3o", 
    "Not in Use": "N\u00e3o est\u00e1 em Uso", 
    "Note": "Nota", 
    "Noted in:": "Anotado em", 
    "Notes": "Notas", 
    "Numbered List (Ctrl+O)": "Lista numerada (Ctrl+O)", 
    "OK": "CONFIRMAR", 
    "Only <%= fileTypes %> files can be uploaded. Please select a file ending in <%= fileExtensions %> to upload.": "Apenas ficheiros <%= fileTypes %> podem ser enviados . Por favor, selecione um fichaeiro acabado em <%= fileExtensions %> para fazer o upload.", 
    "Open": "Abrir", 
    "OpenAssessment Save Error": "Erro ao Guardar o OpenAssessent", 
    "Order Details": "Detalhes da Encomenda", 
    "Order No.": "Ordem N\u00ba", 
    "Organization": "Organiza\u00e7\u00e3o", 
    "Organization Name": "Nome da Organiza\u00e7\u00e3o", 
    "Other": "Outro", 
    "Paragraph": "Par\u00e1grafo", 
    "Password": "Palavra-passe", 
    "Path to Signature Image": "Caminho da Imagem de Assinatura", 
    "Pause": "Pausa", 
    "Pending": "Pendente", 
    "Play": "Reproduzir", 
    "Please Note": "Por favor observe", 
    "Please address the errors on this page first, and then save your progress.": "Por favor, primeiro corrija os erros nesta p\u00e1gina e depois guarde o seu progresso. ", 
    "Please do not use any spaces in this field.": "Por favor, n\u00e3o use espa\u00e7os neste campo.", 
    "Please do not use any spaces or special characters in this field.": "Por favor, n\u00e3o utilize nenhum espa\u00e7o ou caracteres especiais neste campo. ", 
    "Please enter an integer between %(min)s and %(max)s.": "Por favor, introduza um n\u00famero inteiro entre %(min)s e %(max)s.", 
    "Please enter an integer between 0 and 100.": "Por favor, insira um n\u00famero inteiro entre 0 e 100.", 
    "Please enter an integer greater than 0.": "Por favor insira um n\u00famero inteiro maior que 0.", 
    "Please enter non-negative integer.": "Por favor entre um n\u00famero inteiro n\u00e3o negativo.", 
    "Please follow the instructions here to upload a file elsewhere and link to it: {maxFileSizeRedirectUrl}": "Por favor siga as instru\u00e7\u00f5es aqui para fazer o upload do ficheiro noutro local e adicione-lhe: {maxFileSizeRedirectUrl}", 
    "Please print this page for your records; it serves as your receipt. You will also receive an email with the same information.": "Por favor, imprima esta p\u00e1gina para o seu registo; serve como o seu recibo. Voc\u00ea receber\u00e1 tamb\u00e9m um email com a mesma informa\u00e7\u00e3o.", 
    "Please select a PDF file to upload.": "Por favor, selecione um arquivo PDF para upload.", 
    "Preferred Language": "L\u00edngua de prefer\u00eancia", 
    "Prerequisite:": "Pr\u00e9-requisito:", 
    "Preview": "Pr\u00e9-visualizar", 
    "Previous": "Anterior", 
    "Processing Re-run Request": "A processar Pedido de Re-execu\u00e7\u00e3o", 
    "Professional Education": "Educa\u00e7\u00e3o profissional", 
    "Programs": "Programas", 
    "Promote another member to Admin to remove your admin rights": "Promova outro membro a Administrador para remover os seus direitos de administrador", 
    "Public": "P\u00fablico", 
    "Publish": "Publicar", 
    "Publishing": "Publicando", 
    "Question": "Pergunta", 
    "Queued": "Em fila de espera", 
    "Redo (Ctrl+Shift+Z)": "Refazer (Ctrl + Shift + Z)", 
    "Redo (Ctrl+Y)": "Refazer (Ctrl + Y)", 
    "Remove": "Remover", 
    "Replace": "Substituir", 
    "Reply to Annotation": "Responder a Anota\u00e7\u00e3o", 
    "Required field.": "Campo obrigat\u00f3rio.", 
    "Reset Password": "Redefinir Palavra-passe", 
    "Return and add email address": "Volte atr\u00e1s e adicione endere\u00e7o de email", 
    "Return to Export": "Regressar a Export", 
    "Return to team listing": "Volte atr\u00e1s para a lista da equipa", 
    "Save": "Guardar", 
    "Save Changes": "Guardar Altera\u00e7\u00f5es", 
    "Save changes": "Salvar altera\u00e7\u00f5es", 
    "Saving": "A Guardar", 
    "Search": "Procurar", 
    "Search Results": "Resultados da pesquisa", 
    "Section": "Se\u00e7\u00e3o", 
    "Settings": "Configura\u00e7\u00f5es", 
    "Share": "Partilhar", 
    "Show Annotations": "Mostrar Anota\u00e7\u00f5es", 
    "Show Deprecated Settings": "Mostrar defini\u00e7\u00f5es depreceadas", 
    "Show Previews": "Mostrar pr\u00e9-visualiza\u00e7\u00f5es", 
    "Sign in": "Iniciar Sess\u00e3o", 
    "Sign in using %(providerName)s": "Iniciar Sess\u00e3o com %(providerName)s", 
    "Sign in with %(providerName)s": "Iniciar Sess\u00e3o com %(providerName)s", 
    "Signature Image": "Imagem de Assinatura", 
    "Some Rights Reserved": "Alguns direitos reservados", 
    "Sorry, there was an error parsing the subtitles that you uploaded. Please check the format and try again.": "Desculpe, houve um erro ao analisar as legendas que voc\u00ea carregou. Verifique o formato e tente novamente.", 
    "Source": "Fonte", 
    "Specify whether discussion topics are divided by cohort": "Especifique se os t\u00f3picos de discuss\u00e3o s\u00e3o divididos por grupos", 
    "Staff": "Equipa", 
    "Start Date": "Data de inicio", 
    "Starts": "Inicio", 
    "Status": "Estado:", 
    "Student": "Aluno", 
    "Studio's having trouble saving your work": "O Studio est\u00e1 a ter problemas a guardar o seu trabalho", 
    "Submitted": "Submetido", 
    "Subsection": "Subsec\u00e7\u00e3o", 
    "Tags:": "Tag", 
    "Take Photo": "Tirar foto", 
    "Take me to the main course page": "Leva-me \u00e0 p\u00e1gina principal do curso", 
    "Take me to the main library page": "Leva-me \u00e0 p\u00e1gina principal da biblioteca", 
    "Team Details": "Detalhes da equipe", 
    "Teams": "Equipas", 
    "The combined length of the organization and library code fields cannot be more than <%=limit%> characters.": "A largura combinada dos campos de c\u00f3digo da organiza\u00e7\u00e3o e livraria n\u00e3o podem ser superiores a <%=limit%>  caracteres.", 
    "The combined length of the organization, course number, and course run fields cannot be more than <%=limit%> characters.": "A largura combinada dos campos da organiza\u00e7\u00e3o, n\u00famero de curso e curso n\u00e3o podem ser superiores a <%=limit%> caracteres.", 
    "The course end date must be later than the course start date.": "A data de \u00ednicio do curso tem de ser depois da data de come\u00e7o do curso.", 
    "The course must have an assigned start date.": "O curso deve ter uma data de in\u00edcio definida.", 
    "The course start date must be later than the enrollment start date.": "A data de in\u00edcio do curso tem de ser posterior \u00e0 data de inscri\u00e7\u00e3o.", 
    "The enrollment end date cannot be after the course end date.": "A data final de matr\u00edcula n\u00e3o pode ser posterior \u00e0 data do final do curso. ", 
    "The enrollment start date cannot be after the enrollment end date.": "A data de in\u00edcio da matr\u00edcula n\u00e3o pode ser posterior \u00e0 data final para matr\u00edcula. ", 
    "The raw error message is:": "O mensagem de erro raw \u00e9:", 
    "There has been a failure to export to XML at least one component. It is recommended that you go to the edit page and repair the error before attempting another export. Please check that all components on the page are valid and do not display any error messages.": "Houve uma falha da exporta\u00e7\u00e3o para XML de pelo menos um componente. \u00c9 recomendade que volte \u00e0 p\u00e1gina de edi\u00e7\u00e3o e repare o erro antes de tentar outra exporta\u00e7\u00e3o novamente. Por favor verifique se todos os componentes da p\u00e1gina s\u00e3o v\u00e1lidos e n\u00e3o existem mensagens de erro. ", 
    "There has been an error while exporting.": "Ocorreu um erro durante a exporta\u00e7\u00e3o.", 
    "There has been an error with your export.": "Ocorreu um erro com a sua export.", 
    "There must be at least one group.": "Tem de existir pelo menos um grupo.", 
    "There was an error changing the user's role": "Ocorreu um erro durante a altera\u00e7\u00e3o da fun\u00e7\u00e3o do utilizador.", 
    "There was an error during the upload process.": "Ocorreu um erro durante o processo de upload.", 
    "There was an error while importing the new course to our database.": "Ocorreu um erro durante a importa\u00e7\u00e3o do novo curso para a nossa bade de dados.", 
    "There was an error while importing the new library to our database.": "Ocorreu um erro ao importar a nova biblioteca \u00e0 nossa base de dados.", 
    "There was an error while unpacking the file.": "Ocorreu um erro durante a descompacta\u00e7\u00e3o do ficheiro.", 
    "There was an error while verifying the file you submitted.": "Ocorreu um erro durante a verifica\u00e7\u00e3o do ficheiro submetido.", 
    "There was an error with the upload": "Ocorreu um erro durante o upload", 
    "There's already another assignment type with this name.": "J\u00e1 existe um outro tipo de tarefa com este nome.", 
    "This action cannot be undone.": "Esta a\u00e7\u00e3o n\u00e3o pode ser desfeita.", 
    "This component has validation issues.": "Este componente tem problemas de valida\u00e7\u00e3o.", 
    "This link will open in a modal window": "Este link ir\u00e1 abrir numa janela modal", 
    "This link will open in a new browser window/tab": "Esta hiperliga\u00e7\u00e3o ir\u00e1 abrir numa nova janela/separador do navegador", 
    "This may be happening because of an error with our server or your internet connection. Try refreshing the page or making sure you are online.": "Isto pode estar a acontecer devido a um erro com o nosso servidor ou com a sua liga\u00e7\u00e3o de internet. Tente actualizar a p\u00e1gina ou confirmar que se encontra online.", 
    "Title": "T\u00edtulo", 
    "Title:": "T\u00edtulo:", 
    "Tools": "Ferramentas", 
    "Total": "Total", 
    "Type": "Digite", 
    "Undo (Ctrl+Z)": "Desfazer (Ctrl + Z)", 
    "Undo Changes": "Desfazer Altera\u00e7\u00f5es", 
    "Unit": "Unidade", 
    "Unknown": "Desconhecido", 
    "Update": "Actualizar", 
    "Update team.": "Actualizar equipe.", 
    "Upload": "Enviar", 
    "Upload File": "Upload de ficheiro", 
    "Upload New File": "Fazer o Upload de um Novo Ficheiro", 
    "Upload a new PDF to \u201c<%= name %>\u201d": "Fazer o upload de um novo PDF para \u201c<%= name %>\u201d", 
    "Upload completed": "Upload concluido", 
    "Upload failed": "Upload falhou", 
    "Upload signature image.": "Enviar imagem de assinatura.", 
    "Upload translation": "Enviar tradu\u00e7\u00e3o", 
    "Upload your course image.": "Fa\u00e7a upload da imagem do seu curso.", 
    "Uploading": "Uploading", 
    "User": "Utilizador", 
    "Username": "Nome do usu\u00e1rio", 
    "Validation Error While Saving": "Erro de Valida\u00e7\u00e3o ao Guardar", 
    "Verify Now": "Verifique agora", 
    "Version": "Vers\u00e3o", 
    "Very loud": "muito alto", 
    "Very low": "muito baixo", 
    "Video ended": "V\u00eddeo terminou", 
    "Video position": "posi\u00e7\u00e3o v\u00eddeo", 
    "View": "Vis\u00e3o", 
    "View Archived Course": "Ver Curso Arquivado", 
    "View Course": "Ver Curso", 
    "View Live": "Visualizar no ar", 
    "Volume": "Volume", 
    "Want to confirm your identity later?": "Quer confirmar a sua identidade mais tarde?", 
    "Warning": "Aviso", 
    "We're sorry, there was an error": "Desculpe, ocorreu um erro", 
    "You commented...": "Comentou", 
    "You have not created any content groups yet.": "ainda n\u00e3o criou nenhum conte\u00fado nos grupos.", 
    "You have not created any group configurations yet.": "Ainda n\u00e3o criou nenhumas configura\u00e7\u00f5es de grupo.", 
    "You have unsaved changes. Do you really want to leave this page?": "Tem altera\u00e7\u00f5es n\u00e3o guardadas. Quer realmente deixar esta p\u00e1gina?", 
    "You must enter a valid email address in order to add a new team member": "Dever\u00e1 inserir um endere\u00e7o de email v\u00e1lido para adicionar um novo membro de equipa", 
    "You must specify a name": "Deve especificar um nome ", 
    "You!": "Voc\u00ea!", 
    "You've made some changes": "Fez algumas altera\u00e7\u00f5es", 
    "You've made some changes, but there are some errors": "Fez algumas altera\u00e7\u00f5es, mas h\u00e1 alguns erros", 
    "Your changes have been saved.": "As suas altera\u00e7\u00f5es foram guardadas", 
    "Your changes will not take effect until you save your progress.": "As suas altera\u00e7\u00f5es n\u00e3o ter\u00e3o efeito at\u00e9 que voc\u00ea guarde seu progresso.", 
    "Your changes will not take effect until you save your progress. Take care with key and value formatting, as validation is not implemented.": "As altera\u00e7\u00f5es n\u00e3o ter\u00e3o efeito at\u00e9 que voc\u00ea guarde o seu progresso. Verifique a formata\u00e7\u00e3o da chave e valor pois a valida\u00e7\u00e3o n\u00e3o est\u00e1 implementada.", 
    "Your course could not be exported to XML. There is not enough information to identify the failed component. Inspect your course to identify any problematic components and try again.": "O seu curso n\u00e3o p\u00f4de ser exportado para XML. N\u00e3o existe informa\u00e7\u00e3o suficiente que permita identificar o componente em falha. Verifique quaisquer componentes com problema no seu curso e tente de novo.", 
    "Your file could not be uploaded": "O ficheiro n\u00e3o pode ser uploaded", 
    "Your file has been deleted.": "O seu ficheiro foi eliminado.", 
    "Your import has failed.": "A importa\u00e7\u00e3o falhou.", 
    "Your import is in progress; navigating away will abort it.": "A importa\u00e7\u00e3o est\u00e1 a decorrer neste momento, sair desta pagin\u00e1 ir\u00e1 abort\u00e1-la.", 
    "Your library could not be exported to XML. There is not enough information to identify the failed component. Inspect your library to identify any problematic components and try again.": "A sua biblioteca n\u00e3o p\u00f4de ser exportada para XML. N\u00e3o existe informa\u00e7\u00e3o suficiente que permita identificar o componente em falha. Verifique quaisquer componentes com problema na sua biblioteca e tente de novo.", 
    "Your policy changes have been saved.": "As altera\u00e7\u00f5es na pol\u00edtica foram guardadas.", 
    "a day": "por dia", 
    "about %d hour": [
      "cerca de %d horas", 
      "cerca de %d horas"
    ], 
    "about a minute": "Cerca de um minuto", 
    "about a month": "cerca de um m\u00eas", 
    "about a year": "cerca de um ano", 
    "about an hour": "Cerca de uma hora", 
    "anonymous": "an\u00f3nimo", 
    "close": "fechar", 
    "content group": "grupo de conte\u00fado", 
    "emphasized text": "texto enfatizado", 
    "enter code here": "introduza o c\u00f3digo aqui", 
    "enter link description here": "entrar descri\u00e7\u00e3o link aqui", 
    "group configuration": "configura\u00e7\u00e3o de grupo", 
    "less than a minute": "menos de um minuto", 
    "name": "nome", 
    "or": "ou", 
    "or sign in with": "ou inicie a sess\u00e3o com", 
    "remove": "remova", 
    "remove all": "remova tudo", 
    "section": "sec\u00e7\u00e3o", 
    "send an email message to {email}": "enviar uma mensagem de email para {email}", 
    "strong text": "texto forte", 
    "subsection": "subsec\u00e7\u00e3o", 
    "unit": "unidade"
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
    "DATETIME_FORMAT": "j \\d\\e F \\d\\e Y \u00e0\\s H:i", 
    "DATETIME_INPUT_FORMATS": [
      "%Y-%m-%d %H:%M:%S", 
      "%Y-%m-%d %H:%M:%S.%f", 
      "%Y-%m-%d %H:%M", 
      "%Y-%m-%d", 
      "%d/%m/%Y %H:%M:%S", 
      "%d/%m/%Y %H:%M:%S.%f", 
      "%d/%m/%Y %H:%M", 
      "%d/%m/%Y", 
      "%d/%m/%y %H:%M:%S", 
      "%d/%m/%y %H:%M:%S.%f", 
      "%d/%m/%y %H:%M", 
      "%d/%m/%y"
    ], 
    "DATE_FORMAT": "j \\d\\e F \\d\\e Y", 
    "DATE_INPUT_FORMATS": [
      "%Y-%m-%d", 
      "%d/%m/%Y", 
      "%d/%m/%y"
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

