###
Call waterfall with any number of { functions | Deferred objects | values }s.
Functions will get passed all prior results and should all return a Deferred.

  $.waterfall(
   -> $.ajax url: page1url
   (page1) -> $.ajax url: page2url
   (page1, page2) -> $.ajax url: page3url
   (page1, page2, page3) $.Deferred -> @resolve 17
   4711
  ).fail((all, args, sent, to, reject) ->
    console.log arguments
  ).done (page1, page2, page3, tiny, large) ->
    console.log arguments

@return jQuery.Deferred
###

do ($ = jQuery) ->

  action = (result) -> if result is false then 'reject' else 'resolve'

  $.waterfall = (fns...) ->
    waterfall = $.Deferred()

    steps = fns.map (step) ->
      (priorStepResults...) ->
        deferred =
          if typeof step is 'function'
            if (deferred = step.apply null, priorStepResults)?.promise
              deferred
            else
              $.Deferred()[action deferred] deferred
          else if step?.promise
            step
          else
            $.Deferred()[action step] step

        deferred
          .fail((args...) -> waterfall.reject.apply waterfall, args)
          .done((stepRes) ->
            stepNo = priorStepResults.push stepRes
            if stepNo is steps.length
              waterfall.resolve.apply waterfall, priorStepResults
            else
              steps[stepNo].apply null, priorStepResults
          )

    if steps.length
      steps[0]()
    else
      waterfall.resolve()

    waterfall
