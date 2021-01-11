import { RegisterParam } from '@logicflow/core';
import {html2json} from 'html2json'
export const getViewModel = ({CircleNodeModel}:RegisterParam) => {
    class GNodeModel extends CircleNodeModel{
    }
    return GNodeModel;
}
export const getView = ({CircleNode,h}:RegisterParam,html:string) => {
    class GNode extends CircleNode{
        parseHtml(){
            let info = html2json(html);
            console.log(info)
            console.log(Object.keys(info))
            return html;
        }
        getShape(){
            this.parseHtml()
            return h('svg',{});
        }
    }
    return GNode;
}