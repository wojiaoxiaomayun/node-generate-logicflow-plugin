var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { html2json } from '../lib/html2json.js';
import artTemplate from '../lib/template-web.js';
export var getViewModel = function (_a, _b) {
    var BaseNodeModel = _a.BaseNodeModel, RectNodeModel = _a.RectNodeModel;
    var sourceRules = _b.sourceRules, targetRules = _b.targetRules;
    var GNodeModel = /** @class */ (function (_super) {
        __extends(GNodeModel, _super);
        function GNodeModel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GNodeModel.prototype.getConnectedSourceRules = function () {
            var brules = _super.prototype.getConnectedSourceRules.call(this);
            if (sourceRules && sourceRules instanceof Array) {
                brules = brules.concat(sourceRules);
            }
            return brules;
        };
        GNodeModel.prototype.getConnectedTargetRules = function () {
            var brules = _super.prototype.getConnectedTargetRules.call(this);
            if (targetRules && targetRules instanceof Array) {
                brules = brules.concat(targetRules);
            }
            return brules;
        };
        return GNodeModel;
    }(RectNodeModel));
    return GNodeModel;
};
export var getView = function (_a, _b) {
    var RectNode = _a.RectNode, h = _a.h;
    var svg = _b.svg, html = _b.html, attributes = _b.attributes;
    var GNode = /** @class */ (function (_super) {
        __extends(GNode, _super);
        function GNode() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GNode.prototype.getAttributes = function () {
            var oldattributes = _super.prototype.getAttributes.call(this);
            return attributes && attributes.call(this, oldattributes) || oldattributes;
        };
        GNode.prototype.parseHtml = function () {
            var temp = svg || html;
            if (!svg && html) {
                temp = "<foreignObject>\n                    <body xmlns=\"http://www.w3.org/1999/xhtml\">\n                        " + temp + "\n                    </body>\n                </foreignObject>";
            }
            var properties = this.getAttributes().properties;
            temp = artTemplate.render(temp, properties, {
                escape: false
            });
            var info = html2json(temp);
            return this.getH(info);
        };
        GNode.prototype.getChild = function (info, isFirst) {
            var _this = this;
            if (isFirst === void 0) { isFirst = false; }
            var arr = [];
            if (info.child) {
                info.child.forEach(function (e) {
                    if (e.node == 'element') {
                        arr.push(_this.getH(e, isFirst));
                    }
                    else if (e.node == 'text') {
                        arr.push(e.text);
                    }
                });
            }
            return arr;
        };
        GNode.prototype.getH = function (info, isFirst) {
            if (isFirst === void 0) { isFirst = false; }
            if (info.node == 'root') {
                return h('g', {}, this.getChild(info, true));
            }
            if (info.tag) {
                var attr = (info.attr || {});
                if (isFirst) {
                    var attr = (info.attr || {});
                    var _a = this.getAttributes(), x = _a.x, y = _a.y, width = _a.width, height = _a.height;
                    attr.x = x - width / 2;
                    attr.y = y - height / 2;
                    attr.width = width;
                    attr.height = height;
                }
                Object.keys(attr).forEach(function (e) {
                    if (attr[e] instanceof Array) {
                        attr[e] = attr[e].join(' ');
                    }
                });
                return h(info.tag, attr, this.getChild(info));
            }
        };
        GNode.prototype.getShape = function () {
            return this.parseHtml();
        };
        return GNode;
    }(RectNode));
    return GNode;
};
