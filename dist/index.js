import { getViewModel, getView } from './util';
var gen = {
    install: function (lf) {
        var genNode = function (registerParam, genParam) {
            return {
                view: getView(registerParam, genParam),
                model: getViewModel(registerParam, genParam)
            };
        };
        lf.registerGenNode = function (genParam) {
            lf.register(genParam.nodeType, function (params) {
                return genNode(params, genParam);
            });
        };
    }
};
export default gen;
export { gen };
