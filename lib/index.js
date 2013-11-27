var salutations = {
    'doctor': 1,
    'dr': 1,
    'miss': 1,
    'mister': 1,
    'mr': 1,
    'mrs': 1,
    'ms': 1,
    'prof': 1,
    'professor': 1
};

var suffixes = {
    'jr': 1,
    'sr': 1
};

function contains(obj, key) {
    return !!obj[key.replace(/\.$/, '').toLowerCase()];
};

function lexicalToWestern(value) {
    return String(value).split(',').reverse().join(' ');
};

exports.parse = function(value) {
    if (value === null || value === undefined) {
        return {};
    }

    value = String(value);
    
    if (value.indexOf(',') > -1) {
        value = lexicalToWestern(value);
    }
    
    var name = {};
    var tokens = value.match(/\S+/g);

    if (contains(salutations, tokens[0])) {
        name.salutation = tokens.shift();

        // If there's only one token remaining it's the last name (Mister Rogers)
        if (tokens.length === 1) {
            name.last = tokens.shift();
        }
    }

    if (tokens.length > 2 && contains(suffixes, tokens[tokens.length - 1])) {
        name.suffix = tokens.pop();
    }

    if (tokens.length) {
        name.first = tokens.shift();
    }

    if (tokens.length > 1) {
        name.middle = tokens.shift();
    }

    if (tokens.length) {
        name.last = tokens.join(' ');
    }

    return name;
};
