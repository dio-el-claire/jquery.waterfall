(function($) {
/**
 * Runs functions given in arguments in series, each functions passing their results to the next one.
 * Return jQuery Deferred object.
 * При успешном завершении всех фунции их результаты передаются в resolve обработчик Deferred object.
 * Если одна из функций завершится с ошибкой будет вызван reject обработчик Deferred объекта.
 *
 * @example
 * $.waterfall(
 *    function() { $.ajax({url : first_url}) },
 *    function() { $.ajax({url : second_url}) },
 *    function() { $.ajax({url : another_url}) }
 *).fail(function() {
 *    console.log(arguments)
 *).done(function() {
 *    console.log(arguments)
 *})
 *
 * @author Dmitry (dio) Levashov, dio@std42.ru
 * @return jQuery.Deferred
 */
$.waterfall = function() {
	var steps   = [],
		dfrd    = $.Deferred(),
		pointer = 0;

	$.each(arguments, function(i, a) {
		steps.push(function() {
			var args = [].slice.apply(arguments), d;

			if (typeof(a) == 'function') {
				if (!((d = a.apply(null, args)) && d.promise)) {
					d = $.Deferred()[d === false ? 'reject' : 'resolve'](d)
				}
			} else if (a && a.promise) {
				d = a;
				if (!d.isResolved() && !d.isRejected()) {
					d.resolve.apply(d, args);
				}
			} else {
				d = $.Deferred().resolve(a);
			}

			d.fail(function() {
				dfrd.reject.apply(dfrd, [].slice.apply(arguments));
			})
			.done(function(data) {
				pointer++;
				args.push(data);

				if (pointer == steps.length) {
					dfrd.resolve.apply(dfrd, args);
				} else {
					steps[pointer].apply(null, args);
				}
			});
		});
	});

	steps.length ? steps[0]() : dfrd.resolve();

	return dfrd;
}

})(jQuery);