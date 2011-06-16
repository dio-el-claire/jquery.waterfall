jQuery.waterfall
==================

Overview
--------
jQuery util.

Runs functions given in arguments in series, each function passing their results to the next one.
Return jQuery Deferred object.
On all functions success pass its results into `Deferred.resolve();`
On any function fail call `Deferred.reject();`

This is very useful when you need to run chain of ajax request to the server.

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

`$.waterfall` arguments may have any type, not only function:

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


License
-------

(The 3-clause BSD License)

Copyright (c) 2011, Dmitry Levashov <dio@std42.ru>
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the Studio 42 Ltd. nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY Dmitry Levashov ''AS IS'' AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL Studio 42 Ltd. BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
