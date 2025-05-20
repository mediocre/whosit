const salutations = {
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

const suffixes = {
    'jr': 1,
    'sr': 1,
    'ii': 1,
    'iii': 1,
    'iv': 1,
    'v': 1
};

const surnamePrefixes = {
    'da': 1,
    'de': 1,
    'del': 1,
    'della': 1,
    'den': 1,
    'der': 1,
    'di': 1,
    'do': 1,
    'du': 1,
    'la': 1,
    'le': 1,
    'mac': 1,
    'nic': 1,
    'ní': 1,
    'ó': 1,
    'van': 1,
    'vanden': 1,
    'vander': 1,
    'von': 1
};

function contains(obj, key) {
    return !!obj[key.replace(/\.$/, '').toLowerCase()];
}

function lexicalToWestern(value) {
    return String(value).split(',').reverse().join(' ');
}

exports.parse = function(value) {
    if (value === null || value === undefined) {
        return {};
    }

    value = String(value).trim();

    if (!value) {
        return {};
    }

    if (value.indexOf(',') > -1) {
        value = lexicalToWestern(value);
    }

    const name = {};
    const tokens = value.match(/\S+/g) || [];

    if (tokens[0] && contains(salutations, tokens[0])) {
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

    if (tokens.length > 1 && !contains(surnamePrefixes, tokens[0])) {
        name.middle = tokens.shift();
    }

    if (tokens.length) {
        name.last = tokens.join(' ');
    }

    return name;
};
