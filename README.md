jQuery.waterfall
==================

Overview
--------
jQuery util.

Runs functions given in arguments in series, each functions passing their results to the next one.
Return jQuery Deferred object.
При успешном завершении всех фунции их результаты передаются в resolve обработчик Deferred object.
Если одна из функций завершится с ошибкой будет вызван reject обработчик Deferred объекта.

How to use
----------

Последовательно выполняем 3 аякс-запроса, по завершении, что-то делаем с результатами:

$.waterfall(
   function() { $.ajax({url : first_url}) },
   function() { $.ajax({url : second_url}) },
   function() { $.ajax({url : another_url}) }
).fail(function() {
   console.log(arguments)
).done(function() {
   console.log(arguments)
});

Выполняем 2 аякс запроса, проверяем результат.
В случае ошибки останавливаем "водопад"

$.waterfall(
	function() { $.ajax(....) },
	function() { $.ajax(....) },
	function(arg1, arg2) {
		if (arg2.answer != 42) {
			return false;
		}
		return 42;
	},
	function() { $.ajax({url : 'index.php?answer='+arguments[2]}) }
).fail(function() {
   console.log(arguments)
).done(function() {
   console.log(arguments)
});

Аргументами могут быть не только функции возвращающие jQuery.Deferred:

$.waterfall(
	function() { $.ajax({url : first_url}) },
	$.ajax({url : second_url}),
	"string",
	1,
	null,
	{a : 12}
   function() { return 42 }
).fail(function() {
   console.log(arguments)
).done(function() {
   console.log(arguments)
});

