var assert = require('assert');
var whosit = require('../lib');

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

    it('Prof. Dre', function() {
        var name = whosit.parse('Prof. Plum');
        assert.equal(name.salutation, 'Prof.');
        assert.equal(name.last, 'Plum');
    });

    it('Professor Plum', function() {
        var name = whosit.parse('Professor Plum');
        assert.equal(name.salutation, 'Professor');
        assert.equal(name.last, 'Plum');
    });
});

// http://en.wikipedia.org/wiki/Personal_name#Lexical_order
// http://en.wikipedia.org/wiki/Surname#Order_of_names
// https://github.com/freshlogic/whosit/pull/1
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
