
Handlebars.registerHelper('blockHelperMissing', function(context, options) {
  throw new Handlebars.Exception('Only if or each is allowed');
});

Handlebars.registerHelper("nullValue", function(val) {
    if(val === undefined) {
        return "{{" + val + "}}";
    }
    return val;
});

Handlebars.registerHelper('each-limit', function(context, limit) {
    var options = arguments[arguments.length - 1];
    var ret = '';

    if (context && context.length > 0) {
        var max = Math.min(context.length, limit);
        for (var i = 0; i < max; i++) {
            ret += options.fn(context[i]);
        }
    } else {
        ret = options.inverse(this);
    }

    return ret;
});