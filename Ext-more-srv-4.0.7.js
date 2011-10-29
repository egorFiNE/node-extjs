/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext

 The Ext namespace (global object) encapsulates all classes, singletons, and utility methods provided by Sencha's libraries.</p>
 Most user interface Components are at a lower level of nesting in the namespace, but many common utility functions are provided
 as direct properties of the Ext namespace.

 Also many frequently used methods from other classes are provided as shortcuts within the Ext namespace.
 For example {@link Ext#getCmp Ext.getCmp} aliases {@link Ext.ComponentManager#get Ext.ComponentManager.get}.

 Many applications are initiated with {@link Ext#onReady Ext.onReady} which is called once the DOM is ready.
 This ensures all scripts have been loaded, preventing dependency issues. For example

     Ext.onReady(function(){
         new Ext.Component({
             renderTo: document.body,
             html: 'DOM ready!'
         });
     });

For more information about how to use the Ext classes, see

- <a href="http://www.sencha.com/learn/">The Learning Center</a>
- <a href="http://www.sencha.com/learn/Ext_FAQ">The FAQ</a>
- <a href="http://www.sencha.com/forum/">The forums</a>

 * @singleton
 * @markdown
 */
Ext.apply(Ext, {
    cache: {},

    /**
     * True when the document is fully initialized and ready for action
     * @type Boolean
     */
    isReady: false,

    /**
     * True to automatically uncache orphaned Ext.Elements periodically
     * @type Boolean
     */
    enableGarbageCollector: true,

    /**
     * True to automatically purge event listeners during garbageCollection.
     * @type Boolean
     */
    enableListenerCollection: true,

    /**
     * Attempts to destroy any objects passed to it by removing all event listeners, removing them from the
     * DOM (if applicable) and calling their destroy functions (if available).  This method is primarily
     * intended for arguments of type {@link Ext.Element} and {@link Ext.Component}, but any subclass of
     * {@link Ext.util.Observable} can be passed in.  Any number of elements and/or components can be
     * passed into this function in a single call as separate arguments.
     * @param {Ext.Element/Ext.Component/Ext.Element[]/Ext.Component[]...} arg1
     * An {@link Ext.Element}, {@link Ext.Component}, or an Array of either of these to destroy
     */
    destroy: function() {
        var ln = arguments.length,
        i, arg;

        for (i = 0; i < ln; i++) {
            arg = arguments[i];
            if (arg) {
                if (Ext.isArray(arg)) {
                    this.destroy.apply(this, arg);
                }
                else if (Ext.isFunction(arg.destroy)) {
                    arg.destroy();
                }
                else if (arg.dom) {
                    arg.remove();
                }
            }
        }
    },

    /**
     * Execute a callback function in a particular scope. If no function is passed the call is ignored.
     *
     * For example, these lines are equivalent:
     *
     *     Ext.callback(myFunc, this, [arg1, arg2]);
     *     Ext.isFunction(myFunc) && myFunc.apply(this, [arg1, arg2]);
     *
     * @param {Function} callback The callback to execute
     * @param {Object} scope (optional) The scope to execute in
     * @param {Array} args (optional) The arguments to pass to the function
     * @param {Number} delay (optional) Pass a number to delay the call by a number of milliseconds.
     */
    callback: function(callback, scope, args, delay){
        if(Ext.isFunction(callback)){
            args = args || [];
            scope = scope || window;
            if (delay) {
                Ext.defer(callback, delay, scope, args);
            } else {
                callback.apply(scope, args);
            }
        }
    },

    /**
     * Convert certain characters (&, <, >, and ') to their HTML character equivalents for literal display in web pages.
     * @param {String} value The string to encode
     * @return {String} The encoded text
     */
    htmlEncode : function(value) {
        return Ext.String.htmlEncode(value);
    },

    /**
     * Convert certain characters (&, <, >, and ') from their HTML character equivalents.
     * @param {String} value The string to decode
     * @return {String} The decoded text
     */
    htmlDecode : function(value) {
         return Ext.String.htmlDecode(value);
    },

    /**
     * Appends content to the query string of a URL, handling logic for whether to place
     * a question mark or ampersand.
     * @param {String} url The URL to append to.
     * @param {String} s The content to append to the URL.
     * @return (String) The resulting URL
     */
    urlAppend : function(url, s) {
        if (!Ext.isEmpty(s)) {
            return url + (url.indexOf('?') === -1 ? '?' : '&') + s;
        }
        return url;
    }
});


Ext.ns = Ext.namespace;

/**
 * @class Ext
 * Ext core utilities and functions.
 * @singleton
 */
(function(){
/*
FF 3.6      - Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.2.17) Gecko/20110420 Firefox/3.6.17
FF 4.0.1    - Mozilla/5.0 (Windows NT 5.1; rv:2.0.1) Gecko/20100101 Firefox/4.0.1
FF 5.0      - Mozilla/5.0 (Windows NT 6.1; WOW64; rv:5.0) Gecko/20100101 Firefox/5.0

IE6         - Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1;)
IE7         - Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; SV1;)
IE8         - Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)
IE9         - Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)

Chrome 11   - Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.60 Safari/534.24

Safari 5    - Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1

Opera 11.11 - Opera/9.80 (Windows NT 6.1; U; en) Presto/2.8.131 Version/11.11
*/
    var check = function(regex){
            return regex.test(Ext.userAgent);
        };


    Ext.setVersion('extjs', '4.0.7');
    Ext.apply(Ext, {
        /**
         * EXPERIMENTAL - True to cascade listener removal to child elements when an element is removed.
         * Currently not optimized for performance.
         * @type Boolean
         */
        enableNestedListenerRemoval : false,

        /**
         * Indicates whether to use native browser parsing for JSON methods.
         * This option is ignored if the browser does not support native JSON methods.
         * <b>Note: Native JSON methods will not work with objects that have functions.
         * Also, property names must be quoted, otherwise the data will not parse.</b> (Defaults to false)
         * @type Boolean
         */
        USE_NATIVE_JSON : false,

        /**
         * <p>Utility method for returning a default value if the passed value is empty.</p>
         * <p>The value is deemed to be empty if it is<div class="mdetail-params"><ul>
         * <li>null</li>
         * <li>undefined</li>
         * <li>an empty array</li>
         * <li>a zero length string (Unless the <tt>allowBlank</tt> parameter is <tt>true</tt>)</li>
         * </ul></div>
         * @param {Object} value The value to test
         * @param {Object} defaultValue The value to return if the original value is empty
         * @param {Boolean} allowBlank (optional) true to allow zero length strings to qualify as non-empty (defaults to false)
         * @return {Object} value, if non-empty, else defaultValue
         * @deprecated 4.0.0 Use {@link Ext#valueFrom} instead
         */
        value : function(v, defaultValue, allowBlank){
            return Ext.isEmpty(v, allowBlank) ? defaultValue : v;
        },

        /**
         * Escapes the passed string for use in a regular expression
         * @param {String} str
         * @return {String}
         * @deprecated 4.0.0 Use {@link Ext.String#escapeRegex} instead
         */
        escapeRe : function(s) {
            return s.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1");
        },

        /**
         * Applies event listeners to elements by selectors when the document is ready.
         * The event name is specified with an <tt>&#64;</tt> suffix.
         * <pre><code>
Ext.addBehaviors({
    // add a listener for click on all anchors in element with id foo
    '#foo a&#64;click' : function(e, t){
        // do something
    },

    // add the same listener to multiple selectors (separated by comma BEFORE the &#64;)
    '#foo a, #bar span.some-class&#64;mouseover' : function(){
        // do something
    }
});
         * </code></pre>
         * @param {Object} obj The list of behaviors to apply
         */
        addBehaviors : function(o){
            if(!Ext.isReady){
                Ext.onReady(function(){
                    Ext.addBehaviors(o);
                });
            } else {
                var cache = {}, // simple cache for applying multiple behaviors to same selector does query multiple times
                    parts,
                    b,
                    s;
                for (b in o) {
                    if ((parts = b.split('@'))[1]) { // for Object prototype breakers
                        s = parts[0];
                        if(!cache[s]){
                            cache[s] = Ext.select(s);
                        }
                        cache[s].on(parts[1], o[b]);
                    }
                }
                cache = null;
            }
        },

        /**
         * Copies a set of named properties fom the source object to the destination object.
         *
         * Example:
         *
         *     ImageComponent = Ext.extend(Ext.Component, {
         *         initComponent: function() {
         *             this.autoEl = { tag: 'img' };
         *             MyComponent.superclass.initComponent.apply(this, arguments);
         *             this.initialBox = Ext.copyTo({}, this.initialConfig, 'x,y,width,height');
         *         }
         *     });
         *
         * Important note: To borrow class prototype methods, use {@link Ext.Base#borrow} instead.
         *
         * @param {Object} dest The destination object.
         * @param {Object} source The source object.
         * @param {String/String[]} names Either an Array of property names, or a comma-delimited list
         * of property names to copy.
         * @param {Boolean} usePrototypeKeys (Optional) Defaults to false. Pass true to copy keys off of the prototype as well as the instance.
         * @return {Object} The modified object.
         */
        copyTo : function(dest, source, names, usePrototypeKeys){
            if(typeof names == 'string'){
                names = names.split(/[,;\s]/);
            }
            Ext.each(names, function(name){
                if(usePrototypeKeys || source.hasOwnProperty(name)){
                    dest[name] = source[name];
                }
            }, this);
            return dest;
        },

        /**
         * Attempts to destroy and then remove a set of named properties of the passed object.
         * @param {Object} o The object (most likely a Component) who's properties you wish to destroy.
         * @param {String...} args One or more names of the properties to destroy and remove from the object.
         */
        destroyMembers : function(o){
            for (var i = 1, a = arguments, len = a.length; i < len; i++) {
                Ext.destroy(o[a[i]]);
                delete o[a[i]];
            }
        },

        /**
         * Partitions the set into two sets: a true set and a false set.
         * Example:
         * Example2:
         * <pre><code>
// Example 1:
Ext.partition([true, false, true, true, false]); // [[true, true, true], [false, false]]

// Example 2:
Ext.partition(
    Ext.query("p"),
    function(val){
        return val.className == "class1"
    }
);
// true are those paragraph elements with a className of "class1",
// false set are those that do not have that className.
         * </code></pre>
         * @param {Array/NodeList} arr The array to partition
         * @param {Function} truth (optional) a function to determine truth.  If this is omitted the element
         * itself must be able to be evaluated for its truthfulness.
         * @return {Array} [array of truish values, array of falsy values]
         * @deprecated 4.0.0 Will be removed in the next major version
         */
        partition : function(arr, truth){
            var ret = [[],[]];
            Ext.each(arr, function(v, i, a) {
                ret[ (truth && truth(v, i, a)) || (!truth && v) ? 0 : 1].push(v);
            });
            return ret;
        },

        /**
         * Invokes a method on each item in an Array.
         * <pre><code>
// Example:
Ext.invoke(Ext.query("p"), "getAttribute", "id");
// [el1.getAttribute("id"), el2.getAttribute("id"), ..., elN.getAttribute("id")]
         * </code></pre>
         * @param {Array/NodeList} arr The Array of items to invoke the method on.
         * @param {String} methodName The method name to invoke.
         * @param {Object...} args Arguments to send into the method invocation.
         * @return {Array} The results of invoking the method on each item in the array.
         * @deprecated 4.0.0 Will be removed in the next major version
         */
        invoke : function(arr, methodName){
            var ret = [],
                args = Array.prototype.slice.call(arguments, 2);
            Ext.each(arr, function(v,i) {
                if (v && typeof v[methodName] == 'function') {
                    ret.push(v[methodName].apply(v, args));
                } else {
                    ret.push(undefined);
                }
            });
            return ret;
        },

        /**
         * <p>Zips N sets together.</p>
         * <pre><code>
// Example 1:
Ext.zip([1,2,3],[4,5,6]); // [[1,4],[2,5],[3,6]]
// Example 2:
Ext.zip(
    [ "+", "-", "+"],
    [  12,  10,  22],
    [  43,  15,  96],
    function(a, b, c){
        return "$" + a + "" + b + "." + c
    }
); // ["$+12.43", "$-10.15", "$+22.96"]
         * </code></pre>
         * @param {Array/NodeList...} arr This argument may be repeated. Array(s) to contribute values.
         * @param {Function} zipper (optional) The last item in the argument list. This will drive how the items are zipped together.
         * @return {Array} The zipped set.
         * @deprecated 4.0.0 Will be removed in the next major version
         */
        zip : function(){
            var parts = Ext.partition(arguments, function( val ){ return typeof val != 'function'; }),
                arrs = parts[0],
                fn = parts[1][0],
                len = Ext.max(Ext.pluck(arrs, "length")),
                ret = [];

            for (var i = 0; i < len; i++) {
                ret[i] = [];
                if(fn){
                    ret[i] = fn.apply(fn, Ext.pluck(arrs, i));
                }else{
                    for (var j = 0, aLen = arrs.length; j < aLen; j++){
                        ret[i].push( arrs[j][i] );
                    }
                }
            }
            return ret;
        },

        /**
         * Turns an array into a sentence, joined by a specified connector - e.g.:
         * Ext.toSentence(['Adama', 'Tigh', 'Roslin']); //'Adama, Tigh and Roslin'
         * Ext.toSentence(['Adama', 'Tigh', 'Roslin'], 'or'); //'Adama, Tigh or Roslin'
         * @param {String[]} items The array to create a sentence from
         * @param {String} connector The string to use to connect the last two words. Usually 'and' or 'or' - defaults to 'and'.
         * @return {String} The sentence string
         * @deprecated 4.0.0 Will be removed in the next major version
         */
        toSentence: function(items, connector) {
            var length = items.length;

            if (length <= 1) {
                return items[0];
            } else {
                var head = items.slice(0, length - 1),
                    tail = items[length - 1];

                return Ext.util.Format.format("{0} {1} {2}", head.join(", "), connector || 'and', tail);
            }
        }
    });
})();

/**
 * Loads Ext.app.Application class and starts it up with given configuration after the page is ready.
 *
 * See Ext.app.Application for details.
 *
 * @param {Object} config
 */
Ext.application = function(config) {
    Ext.require('Ext.app.Application');

    Ext.onReady(function() {
        Ext.create('Ext.app.Application', config);
    });
};

