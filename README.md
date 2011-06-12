jQuery.waterfall
==================

Overview
--------
jQuery util.

Runs functions given in arguments in series, each functions passing their results to the next one.
Return jQuery Deferred object.
On all functions success pass its results into Deferred.resolve();
On any function fail call Deferred.reject();

How to use
----------

Call 3 requests in series:

$.waterfall(
   function() { $.ajax({url : first_url}) },
   function() { $.ajax({url : second_url}) },
   function() { $.ajax({url : another_url}) }
).fail(function(error) {
   console.log(error)
).done(function(result1, result2, result3) {
   console.log(result1);
   console.log(result2);
   console.log(result3)
});


Call 2 requests, check results, on error stop waterfall:

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

$.waterfall arguments may have any type, not only function:

$.waterfall(
	function() { $.ajax({url : first_url}) },
	$.ajax({url : second_url}),
	"string",
	1,
	null,
	{a : 12},
   function() { return 42 }
).fail(function() {
   console.log(arguments)
).done(function() {
   console.log(arguments)
});

