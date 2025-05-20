const assert = require('assert');
const { describe, it } = require('node:test');
const whosit = require('../lib');

describe('Western Order', function() {
    it('Shawn', function() {
        var name = whosit.parse('Shawn');
        assert.equal(name.first, 'Shawn');
    });

    it('Shawn Miller', function() {
        var name = whosit.parse('Shawn Miller');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.last, 'Miller');
    });

    it(' Shawn  Miller ', function() {
        var name = whosit.parse(' Shawn  Miller ');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.last, 'Miller');
    });

    it('Shawn Michael Miller', function() {
        var name = whosit.parse('Shawn Michael Miller');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.middle, 'Michael');
        assert.equal(name.last, 'Miller');
    });

    it('Mr. Shawn Michael Miller', function() {
        var name = whosit.parse('Mr. Shawn Michael Miller');
        assert.equal(name.salutation, 'Mr.');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.middle, 'Michael');
        assert.equal(name.last, 'Miller');
    });

    it('Shawn Michael Miller Sr', function() {
        var name = whosit.parse('Shawn Michael Miller Sr');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.middle, 'Michael');
        assert.equal(name.last, 'Miller');
        assert.equal(name.suffix, 'Sr');
    });

    it('Mr. Shawn Michael Miller Sr.', function() {
        var name = whosit.parse('Mr. Shawn Michael Miller Sr.');
        assert.equal(name.salutation, 'Mr.');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.middle, 'Michael');
        assert.equal(name.last, 'Miller');
        assert.equal(name.suffix, 'Sr.');
    });

    it('Mister Rogers', function() {
        var name = whosit.parse('Mister Rogers');
        assert.equal(name.salutation, 'Mister');
        assert.equal(name.last, 'Rogers');
    });

    it('Doctor Who', function() {
        var name = whosit.parse('Doctor Who');
        assert.equal(name.salutation, 'Doctor');
        assert.equal(name.last, 'Who');
    });

    it('Dr. Dre', function() {
        var name = whosit.parse('Dr. Dre');
        assert.equal(name.salutation, 'Dr.');
        assert.equal(name.last, 'Dre');
    });

    it('Prof. Plum', function() {
        var name = whosit.parse('Prof. Plum');
        assert.equal(name.salutation, 'Prof.');
        assert.equal(name.last, 'Plum');
    });

    it('Professor Plum', function() {
        var name = whosit.parse('Professor Plum');
        assert.equal(name.salutation, 'Professor');
        assert.equal(name.last, 'Plum');
    });

    it('Robert Griffin III', function() {
        var name = whosit.parse('Robert Griffin III');
        assert.equal(name.first, 'Robert');
        assert.equal(name.last, 'Griffin');
        assert.equal(name.suffix, 'III');
    });

    it('Robert Lee Griffin III', function() {
        var name = whosit.parse('Robert Lee Griffin III');
        assert.equal(name.first, 'Robert');
        assert.equal(name.middle, 'Lee');
        assert.equal(name.last, 'Griffin');
        assert.equal(name.suffix, 'III');
    });
});

// http://en.wikipedia.org/wiki/Personal_name#Lexical_order
// http://en.wikipedia.org/wiki/Surname#Order_of_names
// https://github.com/mediocre/whosit/pull/1
describe('Lexical Order', function() {
    it('Miller,Shawn', function() {
        var name = whosit.parse('Miller,Shawn');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.last, 'Miller');
    });

    it('Miller, Shawn', function() {
        var name = whosit.parse('Miller, Shawn');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.last, 'Miller');
    });

    it('Miller, Shawn, Prof.', function() {
        var name = whosit.parse('Miller, Shawn, Prof.');
        assert.equal(name.salutation, 'Prof.');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.last, 'Miller');
    });

    it('Miller,Shawn Michael', function() {
        var name = whosit.parse('Miller,Shawn Michael');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.middle, 'Michael');
        assert.equal(name.last, 'Miller');
    });

    it('Miller, Shawn Michael', function() {
        var name = whosit.parse('Miller, Shawn Michael');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.middle, 'Michael');
        assert.equal(name.last, 'Miller');
    });

    it('Miller, Shawn Michael, Prof.', function() {
        var name = whosit.parse('Miller, Shawn Michael, Prof.');
        assert.equal(name.salutation, 'Prof.');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.middle, 'Michael');
        assert.equal(name.last, 'Miller');
    });
});

describe('Edge Cases', function() {
    it('null', function() {
        var name = whosit.parse(null);
        assert(name);
        assert.strictEqual(Object.keys(name).length, 0);
    });

    it('undefined', function() {
        var name = whosit.parse();
        assert(name);
        assert.strictEqual(Object.keys(name).length, 0);

        name = whosit.parse(undefined);
        assert(name);
        assert.strictEqual(Object.keys(name).length, 0);
    });
});

describe('Complex Surnames', function() {
    it('Michael O Connor', function() {
        var name = whosit.parse('Michael O Connor');
        assert.equal(name.first, 'Michael');
        assert.equal(name.middle, 'O');
        assert.equal(name.last, 'Connor');
    });
    it('Michael O. Connor', function() {
        var name = whosit.parse('Michael O. Connor');
        assert.equal(name.first, 'Michael');
        assert.equal(name.middle, 'O.');
        assert.equal(name.last, 'Connor');
    });
    it('Michael O\'Connor', function() {
        var name = whosit.parse('Michael O\'Connor');
        assert.equal(name.first, 'Michael');
        assert.equal(name.last, 'O\'Connor');
    });
    it('Michael Ó Conchúir', function() {
        var name = whosit.parse('Michael Ó Conchúir');
        assert.equal(name.first, 'Michael');
        assert.equal(name.last, 'Ó Conchúir');
    });
    it('O\'Connor, Michael', function() {
        var name = whosit.parse('O\'Connor, Michael');
        assert.equal(name.first, 'Michael');
        assert.equal(name.last, 'O\'Connor');
    });
    it('Ó Conchúir, Michael', function() {
        var name = whosit.parse('Ó Conchúir, Michael');
        assert.equal(name.first, 'Michael');
        assert.equal(name.last, 'Ó Conchúir');
    });
    it('Fintan MacNeill', function() {
        var name = whosit.parse('Fintan MacNeill');
        assert.equal(name.first, 'Fintan');
        assert.equal(name.last, 'MacNeill');
    });
    it('Fintan Mac Néill', function() {
        var name = whosit.parse('Fintan Mac Néill');
        assert.equal(name.first, 'Fintan');
        assert.equal(name.last, 'Mac Néill');
    });
    it('MacNeill, Fintan', function() {
        var name = whosit.parse('MacNeill, Fintan');
        assert.equal(name.first, 'Fintan');
        assert.equal(name.last, 'MacNeill');
    });
    it('Mac Néill, Fintan', function() {
        var name = whosit.parse('Mac Néill, Fintan');
        assert.equal(name.first, 'Fintan');
        assert.equal(name.last, 'Mac Néill');
    });
    it('Joost van der Meer', function() {
        var name = whosit.parse('Joost van der Meer');
        assert.equal(name.first, 'Joost');
        assert.equal(name.last, 'van der Meer');
    });
    it('van der Meer, Joost', function() {
        var name = whosit.parse('van der Meer, Joost');
        assert.equal(name.first, 'Joost');
        assert.equal(name.last, 'van der Meer');
    });
    it('Van Morrison', function() {
        var name = whosit.parse('Van Morrison');
        assert.equal(name.first, 'Van');
        assert.equal(name.last, 'Morrison');
    });
    it('Beyoncé Knowles-Carter', function() {
        var name = whosit.parse('Beyoncé Knowles-Carter');
        assert.equal(name.first, 'Beyoncé');
        assert.equal(name.last, 'Knowles-Carter');
    });
    it('Maria de la Cruz', function() {
        var name = whosit.parse('Maria de la Cruz');
        assert.equal(name.first, 'Maria');
        assert.equal(name.last, 'de la Cruz');
    });
});