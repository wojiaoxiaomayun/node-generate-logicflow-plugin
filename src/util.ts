import { RegisterParam,GraphModel,Point } from '@logicflow/core';
import {html2json} from 'html2json';
import { computed, observable } from 'mobx';
export type GenParam = {
    nodeName:string,
    html:string,
    modeType?:string,
    width?:number,
    height?:number
}
export const getViewModel = ({BaseNodeModel,RectNodeModel}:RegisterParam,{modeType,width,height}:GenParam) => {
    // class GNodeModel extends BaseNodeModel{
    //     modelType = (modeType || 'GEN_NODE') as any;
    //     @observable width = width || 100;
    //     @observable height = height || 100;

    //     constructor(data, graphModel: GraphModel) {
    //         super(data);
    //     }
    // }
    class GNodeModel extends RectNodeModel{
        @observable width = width || 100;
        @observable height = height || 100;
    }
    return GNodeModel;
}
export const getView = ({RectNode,h}:RegisterParam,{html}:GenParam) => {
    class GNode extends RectNode{
        parseHtml(){
            let info = html2json(html);
            return this.getH(info);
        }
        getChild(info){
            var arr = [];
            if(info.child){
                info.child.forEach(e => {
                    arr.push(this.getH(e));
                });
            }
            return arr;
        }
        getH(info){
            if(info.tag){
                var attr = (info.attr || {});
                if(info.tag === 'svg'){
                    const {
                        x,y,width,height
                    } = this.getAttributes();
                    attr.x = x - width/ 2;
                    attr.y = y - height / 2;
                    attr.width = width; 
                    attr.height = height;
                }
                Object.keys(attr).forEach(e => {
                    if(attr[e] instanceof Array){
                        attr[e] = attr[e].join(' ');
                    }
                });
                return h(info.tag,attr, this.getChild(info))
            }else{
                return this.getChild(info)[0]
            }
        }
        getShape(){
            return h('g',{},this.parseHtml());
        }
    }
    return GNode;
}