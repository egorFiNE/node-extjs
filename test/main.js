util = require('util');
require(__dirname+'/../index');

/* nodeunit required */

exports['check'] = function(test) {
	test.expect(4);
	
	var model;

	Ext.Loader.setPath('Person', __dirname+'/Person'); 
	Ext.require('Person.Troll');

	Ext.define('Person.TrollWithPassword',{
		extend: 'Person.Troll', // extend works, too

		setPassword: function(password) {
			var crypto = require('crypto');
			var shasum = crypto.createHash('md5');
			shasum.update(password);
			this.set('passwordHash', shasum.digest('hex'));
		}
	});

	model = Ext.create('Person.Troll', {
		id:0,
		createdAt: new Date(),
		name: 'Steve Jobs',
		login: 'billgates'
	});

	test.ok(model);
	test.ok(model.isValid());
	test.equal(model.getId(), 0);

	model = Ext.create('Person.TrollWithPassword', {
		id:0,
		createdAt: new Date(),
		name: 'Steve Jobs',
		login: 'billgates'
	});
	model.setPassword('lopata');
	test.equal(model.get('passwordHash'), 'c813006a9d4feb92df26b9f97ca8b285');

	test.done();
}
