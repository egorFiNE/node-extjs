var ExtLoader = function() {
	var extCorePath=__dirname+'/lib/Ext/core/src/';
	
	this.load = function () {
		require(extCorePath+'Ext.js');
		require(extCorePath+'version/Version.js');
		require(extCorePath+'lang/Array.js');
		require(extCorePath+'lang/Date.js');
		require(extCorePath+'lang/Function.js');
		require(extCorePath+'lang/Number.js');
		require(extCorePath+'lang/Object.js');
		require(extCorePath+'lang/String.js');
		require(extCorePath+'class/Base.js');
		require(extCorePath+'class/Class.js');
		require(extCorePath+'class/ClassManager.js');
		require(extCorePath+'lang/Error.js');
		require(extCorePath+'class/Loader.js');
		
		require(extCorePath+'util/Format.js');
		require(extCorePath+'util/DelayedTask.js');
		require(extCorePath+'util/Event.js');

		require(__dirname+'/Ext-more-srv-4.0.7.js');

		Ext.Loader.config.enabled = true;
		Ext.Loader.setPath('Ext', __dirname+'/lib/Ext');

		global.__defineGetter__('window', function() {
				return {};
		});

		Ext.require('Ext.ModelManager');
		Ext.require('Ext.data.Store');
	}
}

new ExtLoader().load();
