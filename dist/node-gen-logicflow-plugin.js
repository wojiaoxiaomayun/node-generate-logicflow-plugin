(function (exports) {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
      extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function (d, b) {
        d.__proto__ = b;
      } || function (d, b) {
        for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
      };

      return extendStatics(d, b);
    };

    function __extends(d, b) {
      if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);

      function __() {
        this.constructor = d;
      }

      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    /*
     * HTML5 Parser By Sam Blowes
     *
     * Designed for HTML5 documents
     *
     * Original code by John Resig (ejohn.org)
     * http://ejohn.org/blog/pure-javascript-html-parser/
     * Original code by Erik Arvidsson, Mozilla Public License
     * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
     *
     * ----------------------------------------------------------------------------
     * License
     * ----------------------------------------------------------------------------
     *
     * This code is triple licensed using Apache Software License 2.0,
     * Mozilla Public License or GNU Public License
     * 
     * ////////////////////////////////////////////////////////////////////////////
     * 
     * Licensed under the Apache License, Version 2.0 (the "License"); you may not
     * use this file except in compliance with the License.  You may obtain a copy
     * of the License at http://www.apache.org/licenses/LICENSE-2.0
     * 
     * ////////////////////////////////////////////////////////////////////////////
     * 
     * The contents of this file are subject to the Mozilla Public License
     * Version 1.1 (the "License"); you may not use this file except in
     * compliance with the License. You may obtain a copy of the License at
     * http://www.mozilla.org/MPL/
     * 
     * Software distributed under the License is distributed on an "AS IS"
     * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
     * License for the specific language governing rights and limitations
     * under the License.
     * 
     * The Original Code is Simple HTML Parser.
     * 
     * The Initial Developer of the Original Code is Erik Arvidsson.
     * Portions created by Erik Arvidssson are Copyright (C) 2004. All Rights
     * Reserved.
     * 
     * ////////////////////////////////////////////////////////////////////////////
     * 
     * This program is free software; you can redistribute it and/or
     * modify it under the terms of the GNU General Public License
     * as published by the Free Software Foundation; either version 2
     * of the License, or (at your option) any later version.
     * 
     * This program is distributed in the hope that it will be useful,
     * but WITHOUT ANY WARRANTY; without even the implied warranty of
     * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
     * GNU General Public License for more details.
     * 
     * You should have received a copy of the GNU General Public License
     * along with this program; if not, write to the Free Software
     * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
     *
     * ----------------------------------------------------------------------------
     * Usage
     * ----------------------------------------------------------------------------
     *
     * // Use like so:
     * HTMLParser(htmlString, {
     *     start: function(tag, attrs, unary) {},
     *     end: function(tag) {},
     *     chars: function(text) {},
     *     comment: function(text) {}
     * });
     *
     * // or to get an XML string:
     * HTMLtoXML(htmlString);
     *
     * // or to get an XML DOM Document
     * HTMLtoDOM(htmlString);
     *
     * // or to inject into an existing document/DOM node
     * HTMLtoDOM(htmlString, document);
     * HTMLtoDOM(htmlString, document.body);
     *
     */
    (function () {
      // Regular Expressions for parsing tags and attributes
      var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
          endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
          attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g; // Empty Elements - HTML 5

      var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"); // Block Elements - HTML 5

      var block = makeMap("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"); // Inline Elements - HTML 5

      var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var"); // Elements that you can, intentionally, leave open
      // (and which close themselves)

      var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"); // Attributes that have their values filled in disabled="disabled"

      var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"); // Special Elements (can contain anything)

      var special = makeMap("script,style");
      console.log(this)
      var HTMLParser = this.HTMLParser = function (html, handler) {
        var index,
            chars,
            match,
            stack = [],
            last = html;

        stack.last = function () {
          return this[this.length - 1];
        };

        while (html) {
          chars = true; // Make sure we're not in a script or style element

          if (!stack.last() || !special[stack.last()]) {
            // Comment
            if (html.indexOf("<!--") == 0) {
              index = html.indexOf("-->");

              if (index >= 0) {
                if (handler.comment) handler.comment(html.substring(4, index));
                html = html.substring(index + 3);
                chars = false;
              } // end tag

            } else if (html.indexOf("</") == 0) {
              match = html.match(endTag);

              if (match) {
                html = html.substring(match[0].length);
                match[0].replace(endTag, parseEndTag);
                chars = false;
              } // start tag

            } else if (html.indexOf("<") == 0) {
              match = html.match(startTag);

              if (match) {
                html = html.substring(match[0].length);
                match[0].replace(startTag, parseStartTag);
                chars = false;
              }
            }

            if (chars) {
              index = html.indexOf("<");
              var text = index < 0 ? html : html.substring(0, index);
              html = index < 0 ? "" : html.substring(index);
              if (handler.chars) handler.chars(text);
            }
          } else {
            html = html.replace(new RegExp("([\\s\\S]*?)<\/" + stack.last() + "[^>]*>"), function (all, text) {
              text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
              if (handler.chars) handler.chars(text);
              return "";
            });
            parseEndTag("", stack.last());
          }

          if (html == last) throw "Parse Error: " + html;
          last = html;
        } // Clean up any remaining tags


        parseEndTag();

        function parseStartTag(tag, tagName, rest, unary) {
          tagName = tagName.toLowerCase();

          if (block[tagName]) {
            while (stack.last() && inline[stack.last()]) {
              parseEndTag("", stack.last());
            }
          }

          if (closeSelf[tagName] && stack.last() == tagName) {
            parseEndTag("", tagName);
          }

          unary = empty[tagName] || !!unary;
          if (!unary) stack.push(tagName);

          if (handler.start) {
            var attrs = [];
            rest.replace(attr, function (match, name) {
              var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : "";
              attrs.push({
                name: name,
                value: value,
                escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') //"

              });
            });
            if (handler.start) handler.start(tagName, attrs, unary);
          }
        }

        function parseEndTag(tag, tagName) {
          // If no tag name is provided, clean shop
          if (!tagName) var pos = 0; // Find the closest opened tag of the same type
          else for (var pos = stack.length - 1; pos >= 0; pos--) if (stack[pos] == tagName) break;

          if (pos >= 0) {
            // Close all the open elements, up the stack
            for (var i = stack.length - 1; i >= pos; i--) if (handler.end) handler.end(stack[i]); // Remove the open elements from the stack


            stack.length = pos;
          }
        }
      };

      this.HTMLtoXML = function (html) {
        var results = "";
        HTMLParser(html, {
          start: function (tag, attrs, unary) {
            results += "<" + tag;

            for (var i = 0; i < attrs.length; i++) results += " " + attrs[i].name + '="' + attrs[i].escaped + '"';

            results += ">";
          },
          end: function (tag) {
            results += "</" + tag + ">";
          },
          chars: function (text) {
            results += text;
          },
          comment: function (text) {
            results += "<!--" + text + "-->";
          }
        });
        return results;
      };

      this.HTMLtoDOM = function (html, doc) {
        // There can be only one of these elements
        var one = makeMap("html,head,body,title"); // Enforce a structure for the document

        var structure = {
          link: "head",
          base: "head"
        };

        if (!doc) {
          if (typeof DOMDocument != "undefined") doc = new DOMDocument();else if (typeof document != "undefined" && document.implementation && document.implementation.createDocument) doc = document.implementation.createDocument("", "", null);else if (typeof ActiveX != "undefined") doc = new ActiveXObject("Msxml.DOMDocument");
        } else doc = doc.ownerDocument || doc.getOwnerDocument && doc.getOwnerDocument() || doc;

        var elems = [],
            documentElement = doc.documentElement || doc.getDocumentElement && doc.getDocumentElement(); // If we're dealing with an empty document then we
        // need to pre-populate it with the HTML document structure

        if (!documentElement && doc.createElement) (function () {
          var html = doc.createElement("html");
          var head = doc.createElement("head");
          head.appendChild(doc.createElement("title"));
          html.appendChild(head);
          html.appendChild(doc.createElement("body"));
          doc.appendChild(html);
        })(); // Find all the unique elements

        if (doc.getElementsByTagName) for (var i in one) one[i] = doc.getElementsByTagName(i)[0]; // If we're working with a document, inject contents into
        // the body element

        var curParentNode = one.body;
        HTMLParser(html, {
          start: function (tagName, attrs, unary) {
            // If it's a pre-built element, then we can ignore
            // its construction
            if (one[tagName]) {
              curParentNode = one[tagName];

              if (!unary) {
                elems.push(curParentNode);
              }

              return;
            }

            var elem = doc.createElement(tagName);

            for (var attr in attrs) elem.setAttribute(attrs[attr].name, attrs[attr].value);

            if (structure[tagName] && typeof one[structure[tagName]] != "boolean") one[structure[tagName]].appendChild(elem);else if (curParentNode && curParentNode.appendChild) curParentNode.appendChild(elem);

            if (!unary) {
              elems.push(elem);
              curParentNode = elem;
            }
          },
          end: function (tag) {
            elems.length -= 1; // Init the new parentNode

            curParentNode = elems[elems.length - 1];
          },
          chars: function (text) {
            curParentNode.appendChild(doc.createTextNode(text));
          },
          comment: function (text) {// create comment node
          }
        });
        return doc;
      };

      function makeMap(str) {
        var obj = {},
            items = str.split(",");

        for (var i = 0; i < items.length; i++) obj[items[i]] = true;

        return obj;
      }
    })();

    var html2json = createCommonjsModule(function (module) {
      (function (global) {
        DEBUG = false;
        var debug = DEBUG ? console.log.bind(console) : function () {};

        function q(v) {
          return '"' + v + '"';
        }

        function removeDOCTYPE(html) {
          return html.replace(/<\?xml.*\?>\n/, '').replace(/<!doctype.*\>\n/, '').replace(/<!DOCTYPE.*\>\n/, '');
        }

        global.html2json = function html2json(html) {
          html = removeDOCTYPE(html);
          var bufArray = [];
          var results = {
            node: 'root',
            child: []
          };
          HTMLParser(html, {
            start: function (tag, attrs, unary) {
              debug(tag, attrs, unary); // node for this element

              var node = {
                node: 'element',
                tag: tag
              };

              if (attrs.length !== 0) {
                node.attr = attrs.reduce(function (pre, attr) {
                  var name = attr.name;
                  var value = attr.value; // has multi attibutes
                  // make it array of attribute

                  if (value.match(/ /)) {
                    value = value.split(' ');
                  } // if attr already exists
                  // merge it


                  if (pre[name]) {
                    if (Array.isArray(pre[name])) {
                      // already array, push to last
                      pre[name].push(value);
                    } else {
                      // single value, make it array
                      pre[name] = [pre[name], value];
                    }
                  } else {
                    // not exist, put it
                    pre[name] = value;
                  }

                  return pre;
                }, {});
              }

              if (unary) {
                // if this tag dosen't have end tag
                // like <img src="hoge.png"/>
                // add to parents
                var parent = bufArray[0] || results;

                if (parent.child === undefined) {
                  parent.child = [];
                }

                parent.child.push(node);
              } else {
                bufArray.unshift(node);
              }
            },
            end: function (tag) {
              debug(tag); // merge into parent tag

              var node = bufArray.shift();
              if (node.tag !== tag) console.error('invalid state: mismatch end tag');

              if (bufArray.length === 0) {
                results.child.push(node);
              } else {
                var parent = bufArray[0];

                if (parent.child === undefined) {
                  parent.child = [];
                }

                parent.child.push(node);
              }
            },
            chars: function (text) {
              debug(text);
              var node = {
                node: 'text',
                text: text
              };

              if (bufArray.length === 0) {
                results.child.push(node);
              } else {
                var parent = bufArray[0];

                if (parent.child === undefined) {
                  parent.child = [];
                }

                parent.child.push(node);
              }
            },
            comment: function (text) {
              debug(text);
              var node = {
                node: 'comment',
                text: text
              };
              var parent = bufArray[0];

              if (parent.child === undefined) {
                parent.child = [];
              }

              parent.child.push(node);
            }
          });
          return results;
        };

        global.json2html = function json2html(json) {
          // Empty Elements - HTML 4.01
          var empty = ['area', 'base', 'basefont', 'br', 'col', 'frame', 'hr', 'img', 'input', 'isindex', 'link', 'meta', 'param', 'embed'];
          var child = '';

          if (json.child) {
            child = json.child.map(function (c) {
              return json2html(c);
            }).join('');
          }

          var attr = '';

          if (json.attr) {
            attr = Object.keys(json.attr).map(function (key) {
              var value = json.attr[key];
              if (Array.isArray(value)) value = value.join(' ');
              return key + '=' + q(value);
            }).join(' ');
            if (attr !== '') attr = ' ' + attr;
          }

          if (json.node === 'element') {
            var tag = json.tag;

            if (empty.indexOf(tag) > -1) {
              // empty element
              return '<' + json.tag + attr + '/>';
            } // non empty element


            var open = '<' + json.tag + attr + '>';
            var close = '</' + json.tag + '>';
            return open + child + close;
          }

          if (json.node === 'text') {
            return json.text;
          }

          if (json.node === 'comment') {
            return '<!--' + json.text + '-->';
          }

          if (json.node === 'root') {
            return child;
          }
        };
      })(commonjsGlobal);
    });

    var _html2json_1_0_2_html2json = html2json;
    var _html2json_1_0_2_html2json_1 = _html2json_1_0_2_html2json.html2json;

    var getViewModel = function (_a) {
        var CircleNodeModel = _a.CircleNodeModel;
        var GNodeModel = /** @class */ (function (_super) {
            __extends(GNodeModel, _super);
            function GNodeModel() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return GNodeModel;
        }(CircleNodeModel));
        return GNodeModel;
    };
    var getView = function (_a, html) {
        var CircleNode = _a.CircleNode, h = _a.h;
        var GNode = /** @class */ (function (_super) {
            __extends(GNode, _super);
            function GNode() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            GNode.prototype.parseHtml = function () {
                var info = _html2json_1_0_2_html2json_1(html);
                console.log(info);
                console.log(Object.keys(info));
                return html;
            };
            GNode.prototype.getShape = function () {
                this.parseHtml();
                return h('svg', {});
            };
            return GNode;
        }(CircleNode));
        return GNode;
    };

    var gen = {
        install: function (lf) {
            lf.genNode = function (registerParam, html) {
                return {
                    view: getView(registerParam, html),
                    model: getViewModel(registerParam)
                };
            };
        }
    };

    exports.default = gen;
    exports.gen = gen;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}));
