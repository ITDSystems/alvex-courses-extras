// Данный скрипт будет выполнен для всех объектов типа "пользователь" по очереди.
// Именование в Alfresco таково, что "пользователь" внутри этого скрипта адресуется как "document".

// Задачи со сроком "сегодня"
var today = [];
// Задачи со сроком "завтра"
var tomorrow = [];
// Просроченные задачи
var overdue = [];

// Получили сегодняшнюю дату
var now = new Date();
now.setHours(0,0,0,0);

// Получили тикет для выполнения запросов к репозиторию
var ticket = session.getTicket();

// Выбрали из репозитория все задачи пользователя
var connector = remoteService.connect("alfresco");
var resp = eval('(' + connector.get('/api/task-instances?authority=' + encodeURIComponent(document.properties.userName) + '&alf_ticket=' + ticket) + ')');

// Обрабатываем задачи по одной
for each(task in resp.data)
{
	// Если есть контрольный срок
	if(task.workflowInstance.dueDate)
	{
		// Получили его и конвертировали в объект типа "дата"
		var tokens = task.workflowInstance.dueDate.replace(/T.*/,'').split('-');
		var due = new Date(tokens[0], tokens[1]-1, tokens[2]);
		due.setHours(0,0,0,0);
		// Разница между контрольным сроком и "сегодня", выраженная в днях
		var diff = (due.getTime()-now.getTime())/(24*3600*1000);
		// Если со сроком все плохо - запомнили задачу
		if(diff < 0) {
			overdue.push(task.workflowInstance.message + '. Срок: ' + due.getDate()+'.'+(due.getMonth()+1)+'.'+due.getFullYear());
		} else if ( diff < 1 ) {
			today.push(task.workflowInstance.message);
		} else if ( diff == 1 ) {
			tomorrow.push(task.workflowInstance.message);
		}
	}
}

// Если есть хотя бы одна задача, о которой надо напоминать
if( overdue.length + today.length + tomorrow.length > 0 )
{
	// Создали письмо 
	var mail = actions.create("mail");
	// Направим его текущему пользователю, взяв адрес из его профиля
	mail.parameters.to = document.properties.email;
	// Тема письма
	mail.parameters.subject = "Alfresco: список ближайших дел";

	// Начали составлять текст письма
	mail.parameters.text = "Добрый день.\n\nЭто автоматическое сообщение с напоминанием о ближайших задачах.\n\n";

	// Если есть просроченные задачи - добавили
	if( overdue.length > 0 ) {
		mail.parameters.text += "Просроченные задачи:\n";
		for each (task in overdue)
			mail.parameters.text += task + "\n";
		mail.parameters.text += "\n";
	}

	// Если есть задачи на сегодня - добавили
	if( today.length > 0 ) {
		mail.parameters.text += "Задачи, срок которых истекает сегодня:\n";
		for each (task in today)
			mail.parameters.text += task + "\n";
		mail.parameters.text += "\n";
	}

	// Если есть задачи на завтра - добавили
	if( tomorrow.length > 0 ) {
		mail.parameters.text += "Задачи, срок которых истекает завтра:\n";
		for each (task in tomorrow)
			mail.parameters.text += task + "\n";
		mail.parameters.text += "\n";
	}

	// Общий текст в конце письма
	mail.parameters.text += "Чтобы увидеть полный список назначенных задач и закрыть выполненные, войдите в систему.\n";
	mail.parameters.text += "Адрес: http://alfresco.local:8080/share\n";
	mail.parameters.text += "Ваш логин стандартный: " + document.properties.userName + "\n";
	mail.parameters.text += "Ваш пароль также стандартный, который используется на всех корпоративных ресурсах.\n\n";
	mail.parameters.text += "С уважением,\nСервер Alfresco\n";

	// Отправили письмо
	mail.execute(document);
}
