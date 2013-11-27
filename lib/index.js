var salutations = {
    "doctor" : 1,
    "dr" : 1,
    "miss" : 1,
    "mister" : 1,
    "mr" : 1,
    "mrs" : 1,
    "ms" : 1,
    "prof" : 1,
    "professor" : 1
};
var suffixes = {
    'jr' : 1,
    'sr' : 1
};

function hasName(obj, propName) {
    return !!obj[propName.replace(/\.$/, '').toLowerCase()];
}
function lexicalToWestern(value) {
    return String(value).split(/,/g).reverse().join(" ").trim().replace(/\s+/, " ");
}
exports.parse = function (value) {
    if (value === null || value === undefined) {
        return {};
    }
    value = String(value).trim();
    if (0 < value.indexOf(',')) {
        value = lexicalToWestern(value);
    }
    var name = {},
    tokens = value.split(" ");

    if (hasName(salutations, tokens[0])) {
        name.salutation = tokens.shift();
        // If there's only one token remaining it's the last name (Mister Rogers)
        if (tokens.length === 1) {
            name.last = tokens.shift();
        }
    }
    if (2 < tokens.length && hasName(suffixes, tokens[tokens.length - 1])) {
        name.suffix = tokens.pop();
    }
    if (tokens.length) {
        name.first = tokens.shift();
    }
    if (1 < tokens.length) {
        name.middle = tokens.shift();
    }
    if (tokens.length) {
        name.last = tokens.join(' ');
    }
    return name;
};
