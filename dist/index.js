"use strict";var _createClass=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}!function(t,e){"undefined"!=typeof module&&"object"===("undefined"==typeof exports?"undefined":_typeof(exports))?module.exports=e():"function"==typeof define&&(define.amd||define.cmd)?define(function(){return e}):t.JsdocArtist=e()}("undefined"!=typeof window?window:global,function(){var t=function(){function t(e){_classCallCheck(this,t),this.baseName=e}return _createClass(t,[{key:"systemError",value:function(t,e,n){throw n&&(console.log("%c error object is : ","color:#FFF; background:red"),console.log(n)),new Error("(☉д⊙)!! JsdocArtist::"+this.baseName+" => "+t+" -> "+e)}}]),t}(),e=function(e){function n(t,e){_classCallCheck(this,n);var r=_possibleConstructorReturn(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,"Tag"));return r.name=t,r.validate("help",e.help,"",!1),r.validate("temp",e.temp,[],!1),r.validate("output",e.output,function(){},!0),r}return _inherits(n,t),_createClass(n,[{key:"validate",value:function(t,e,n,r){r&&null==e&&this.systemError("validate","Tag "+t+" must required"),(void 0===e?"undefined":_typeof(e))!==(void 0===n?"undefined":_typeof(n))&&this.systemError("validate","Tag "+t+" type must a "+(void 0===n?"undefined":_typeof(n)),e),this[t]=null==e?n:e}},{key:"getNewData",value:function(t,e,n,r){return{error:null,output:{},params:JSON.parse(JSON.stringify(r)),text:e,line:n,name:t,data:{}}}},{key:"read",value:function(t,e,n,r){for(var o=this.getNewData(t,e,r,n),i=0;i<this.temp.length;i++)o.params[i]?o.data[this.temp[i]]=i===this.temp.length-1?n.join(" "):n.shift():o.error="Params "+this.temp[i]+" not found";return o.output=this.output(o.data,this.error.bind(o)),o}},{key:"error",value:function(t){this.error=t}}]),n}();return function(n){function r(){_classCallCheck(this,r);var t=_possibleConstructorReturn(this,(r.__proto__||Object.getPrototypeOf(r)).call(this,"JsdocArtist"));return t.tags={},t.block=null,t.injsdoc=!1,t}return _inherits(r,t),_createClass(r,[{key:"register",value:function(t,n){null==this.tags[t]?this.tags[t]=new e(t,n):this.systemError("useTags","Tag name is conflict or no name.",t)}},{key:"settingBlock",value:function(t){"string"==typeof t?this.block=t:this.systemError("settingBlock","Value only string",t)}},{key:"getInJSDoc",value:function(t,e){var n=e.trim();return"/**"!==n||this.injsdoc?("*/"===n&&this.injsdoc&&(this.block&&t.data.push(this.block),this.injsdoc=!1),this.injsdoc):(this.injsdoc=!0,!1)}},{key:"readTag",value:function(t,e,n){var r=e.slice(e.indexOf("@")+1).split(" ").filter(function(t){return""!==t.trim()}),o=r.shift();if(null!=this.tags[o]){var i=this.tags[o].read(o,e,r,n);i.error?t.error.push(i):t.data.push(i)}else t.miss.push({name:o,line:n,text:e})}},{key:"read",value:function(t){if("string"==typeof t){var e=t.split("\n"),n=e.length,r=this.getOutputBase();this.injsdoc=!1;for(var o=0;o<n;o++)this.getInJSDoc(r,e[o])&&e[o].match("@")&&this.readTag(r,e[o],o);for(var i=0;i<r.data.length;i++)r.text+=("string"==typeof r.data[i]?r.data[i]:r.data[i].output)+"\n";return r}this.systemError("read","Text must a string",t)}},{key:"getOutputBase",value:function(){return{text:"",data:[],miss:[],error:[]}}}]),r}()});