var salutations = [ 'miss', 'mister', 'mr', 'mrs', 'ms' ];
var suffixes = [ 'jr', 'sr' ];
var titles = [ 'prof', 'dr' ];

function equals(element) {
    return function(compare) {
        return compare === element.replace(/\.$/, '').toLowerCase();
    };
}

function trim(element) {
    return element.trim();
}

exports.parse = function(value) {
    var name = {};

    if (/[^,]+,[^,]+,[^,]+,[^,]+/.test(value)) {
        // exactly three commas: "Last, First, Title, Salutation"
        var tokens = value.split(',').map(trim);

        name.first = tokens[1];
        name.last = tokens[0];

        if (salutations.some(equals(tokens[3]))) {
            name.salutation = tokens[3];
        }
        if (titles.some(equals(tokens[2]))) {
            name.title = tokens[2];
        }

        return name;
    }

    if (/[^,]+,[^,]+,[^,]+/.test(value)) {
        // exactly two commas: "Last, First, [Title|Salutation]"
        var tokens = value.split(',').map(trim);

        name.first = tokens[1];
        name.last = tokens[0];

        if (salutations.some(equals(tokens[2]))) {
            name.salutation = tokens[2];
        }
        else if (titles.some(equals(tokens[2]))) {
            name.title = tokens[2];
        }

        return name;
    }

    if (/[^,]+,[^,]+/.test(value)) {
        // exactly one comma: "Last, First"
        var tokens = value.split(',');

        name.first = tokens[1].trim();
        name.last = tokens[0].trim();
        
        return name;
    }

    // space separated
    
    var tokens = value.split(' ');

    if (tokens.length > 1) {
        if(salutations.some(equals(tokens[0]))) {
            name.salutation = tokens[0];
            tokens.splice(0, 1);

            // If there's only one token remaining it's the last name (Mister Rogers)
            if(tokens.length == 1) {
                name.last = tokens[0];
                tokens.splice(0, 1);
            }
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

    if (tokens.length > 0) {
        name.last = tokens.join(' ');
    }

    return name;
};