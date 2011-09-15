Ext.define('Person.Troll',{
		extend: 'Ext.data.Model',
		idProperty: 'id',
		fields: [
			{ name: 'id',	          type: 'int' },
			{ name: 'createdAt',    type: 'date' },
			{ name: 'name',         type: 'string' },
			{ name: 'login',        type: 'string' },
			{ name: 'passwordHash', type: 'string' }
	],
		validations: [
			{ type: 'presence', field: 'login' },
			{ type: 'length',   field: 'name',  min: 3, max: 100 },
			{ type: 'length',   field: 'login', min: 6, max: 32 },
			{ type: 'format',   field: 'login', matcher: /^[a-z0-9_\.-]+$/ },
		]
});

