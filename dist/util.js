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
export var getViewModel = function (_a) {
    var BaseNodeModel = _a.BaseNodeModel, ModelType = _a.ModelType;
    var GNodeModel = /** @class */ (function (_super) {
        __extends(GNodeModel, _super);
        function GNodeModel() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.modelType = ModelType.NODE;
            return _this;
        }
        return GNodeModel;
    }(BaseNodeModel));
    return GNodeModel;
};
