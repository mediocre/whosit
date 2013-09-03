var assert = require('assert');
var whosit = require('../lib/whosit');

describe('parse', function() {
	describe('space separated', function() {
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

		it('Mr Shawn Michael Miller', function() {
			var name = whosit.parse('Mr Shawn Michael Miller');
			assert.equal(name.salutation, 'Mr');
			assert.equal(name.first, 'Shawn');
			assert.equal(name.middle, 'Michael');
			assert.equal(name.last, 'Miller');
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
	});

	describe('comma separated', function() {
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

		it('Miller,Shawn,Mr.', function() {
			var name = whosit.parse('Miller,Shawn,Mr.');
			assert.equal(name.salutation, 'Mr.');
			assert.equal(name.first, 'Shawn');
			assert.equal(name.last, 'Miller');
		});

		it('Miller,Shawn,Prof.', function() {
			var name = whosit.parse('Miller,Shawn,Prof.');
			assert.equal(name.title, 'Prof.');
			assert.equal(name.first, 'Shawn');
			assert.equal(name.last, 'Miller');
		});

		it('Miller,Shawn,Prof.,Mr.', function() {
			var name = whosit.parse('Miller,Shawn,Prof.,Mr.');
			assert.equal(name.salutation, 'Mr.');
			assert.equal(name.title, 'Prof.');
			assert.equal(name.first, 'Shawn');
			assert.equal(name.last, 'Miller');
		});
	});
});