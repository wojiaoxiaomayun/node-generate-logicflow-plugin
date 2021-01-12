import LogicFlow from "@logicflow/core";

import {RegisterParam} from '@logicflow/core/types/type'
import {getViewModel,getView} from './util'


interface lfgen extends LogicFlow{
    genNode(registerParam:RegisterParam,html:string):any;
}
const gen = {
    install(lf:LogicFlow){
        (lf as lfgen).genNode = (registerParam:RegisterParam,html:string) => {
            return {
                view:getView(registerParam,html),
                model:getViewModel(registerParam)
            };
        }
    }
}

export default gen;
export {
    gen
}
export type {lfgen}