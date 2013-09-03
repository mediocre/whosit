var salutations = [ 'doctor', 'dr', 'miss', 'mister', 'mr', 'mrs', 'ms', 'prof', 'professor' ];
var suffixes = [ 'jr', 'sr' ];

function equals(a, b) {
    return a.replace(/\.$/, '').toLowerCase() === b.replace(/\.$/, '').toLowerCase();
}

exports.parse = function(value) {
    var tokens = value.split(/[\s,]+/);
    var name = {};

    // If there isn't a comma assume western order (otherwise use lexical order)
    if(value.indexOf(',') === -1) {
        if(tokens.length > 1) {
            if(salutations.some(function(salutation) { return equals(salutation, tokens[0]); })) {
                name.salutation = tokens[0];
                tokens.splice(0, 1);

                // If there's only one token remaining it's the last name (Mister Rogers)
                if(tokens.length == 1) {
                    name.last = tokens[0];
                    tokens.splice(0, 1);
                }
            }
        }

        if(tokens.length > 2) {
            if(suffixes.some(function(suffix) { return equals(suffix, tokens[tokens.length - 1]); })) {
                name.suffix = tokens[tokens.length - 1];
                tokens.splice(tokens.length - 1, 1);
            }
        }

        if(tokens.length > 0) {
            name.first = tokens[0];
            tokens.splice(0, 1);
        }

        if(tokens.length > 1) {
            name.middle = tokens[0];
            tokens.splice(0, 1);
        }

        if(tokens.length > 0) {
            name.last = tokens.join(' ');
        }
    } else {
        if(tokens.length > 2) {
            if(salutations.some(function(salutation) { return equals(salutation, tokens[tokens.length - 1]); })) {
                name.salutation = tokens[tokens.length - 1];
                tokens.splice(tokens.length - 1, 1);
            }
        }

        if(tokens.length > 0) {
            name.last = tokens[0];
            tokens.splice(0, 1);
        }

        if(tokens.length > 1) {
            name.middle = tokens[tokens.length - 1];
            tokens.splice(tokens.length - 1, 1);
        }

        if(tokens.length > 0) {
            name.first = tokens.join(' ');
        }
    }

    return name;
};