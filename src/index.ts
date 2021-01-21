import {LogicFlow,RegisterParam,RegisterBack} from "@logicflow/core";
import {getViewModel,getView,GenParam} from './util'


interface lfgen extends LogicFlow{
    registerGenNode
}
const gen = {
    install(lf:LogicFlow){
        var genNode = (registerParam:RegisterParam,genParam:GenParam) => {
            return {
                view:getView(registerParam,genParam),
                model:getViewModel(registerParam,genParam)
            };
        }
        (lf as lfgen).registerGenNode = (genParam:GenParam) => {
            lf.register(genParam.nodeType,(params:RegisterParam) => {
                return genNode(params,genParam)
            });
        }
    }
}

export default gen;
export {
    gen
}
export type {lfgen}