# Deprecated and abandoned

This is a very old code used in one of my enterprise projects. 

------------------------

## node-extjs

Run ExtJS4 data models in Node.js 

This [node.js](http://nodejs.org) module is providing support for using [ExtJS4](http://www.sencha.com/products/extjs/) data models on server-side. 

## Installation

I cannot redistribute ExtJS with this module, so you will not be able to install it from npm repository directly 

However, installation via npm is easily done manually: 

1. Download ExtJS from http://www.sencha.com/products/extjs/download/
2. Extract it
3. Copy contents of <code>src/</code> into <code>lib/Ext/</code> in here
4. <code>npm install .</code>

## Usage

Basically, all it takes is <code>require('extjs')</code>. <b>Warning:</b> a common mistake is to do <code>Ext=require('extjs')</code>. Don't. 

See also <code>test/</code> folder for usage examples (you'll need nodeunit to run them).

## Proxies

If you get an error complaining about proxy module not found - create an empty file, like <code>proxy/rest.js</code>. Yes, it's a hack. Blame me. 

## TODO

I have a basic support for node-mysql here, however it's not elegant in the ExtJS world (i.e. it's not a Reader/Writer), so not yet published. Any suggestions regarding that? I'm all ears!

## Acknowledgments

* ExtJS is (c) 2011 [Sencha](http://sencha.com/)

## Thanks

This implementation is basically taken from [n-ext](https://github.com/xcambar/n-ext), which is another module for server-side usage of ExtJS. My implementation is a tiny bit lighter. 

Contributors: 

* Alexey Torkhov

## License

Do whatever you want with software as long as you are in compliance with [ExtJS license](http://www.sencha.com/products/extjs/license/). 

Also I redistribute a part of [Ext Core](http://www.sencha.com/products/extcore/) with this package: a bit stripped version of <code>Ext-more.js</code>. A significant piece of browser-related code is removed from it. 

## Author

Egor Egorov <me@egorfine.com>

