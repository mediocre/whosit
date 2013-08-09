var salutations = [ 'dr', 'miss', 'mr', 'mrs', 'ms' ];
var suffixes = [ 'jr', 'sr' ];

exports.parse = function(value) {
    var tokens = value.split(' ');
    var name = {};

    if (tokens.length > 1) {
        if(salutations.some(function(salutation) { return salutation == tokens[0].replace(/.$/, '').toLowerCase(); })) {
            name.salutation = tokens[0];
            tokens.splice(0, 1);
		}
    }

    if (tokens.length > 2) {
        if(suffixes.some(function(suffix) { return suffix == tokens[tokens.length - 1].replace(/.$/, '').toLowerCase(); })) {
            name.suffix = tokens[tokens.length - 1];
            tokens.splice(tokens.length - 1, 1);
        }
    }

    if (tokens.length > 0) {
        name.first = tokens[0];
        tokens.splice(0, 1);
    }

    if (tokens.length > 1) {
        name.middle = tokens[0];
        tokens.splice(0, 1);
    }

    name.last = tokens.join(' ');

    return name;
};