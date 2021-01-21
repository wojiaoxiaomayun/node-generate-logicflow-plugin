import { RegisterParam,ConnectRule} from '@logicflow/core';
import {html2json} from '../lib/html2json.js';
import { computed, observable } from 'mobx';
import artTemplate from '../lib/template-web.js'
export type GenParam = {
    nodeType:string,
    svg?:string,
    html?:string,
    attributes?:Function,
    targetRules?:ConnectRule[],
    sourceRules?:ConnectRule[]
}
export const getViewModel = ({BaseNodeModel,RectNodeModel}:RegisterParam,{sourceRules,targetRules}:GenParam) => {
    class GNodeModel extends RectNodeModel{
        getConnectedSourceRules(): ConnectRule[]{
            let brules = super.getConnectedSourceRules();
            if(sourceRules && sourceRules instanceof Array){
                brules = brules.concat(sourceRules)
            }
            return brules;
        }
        getConnectedTargetRules(): ConnectRule[]{
            let brules = super.getConnectedTargetRules();
            if(targetRules && targetRules instanceof Array){
                brules = brules.concat(targetRules)
            }
            return brules;
        }
    }
    return GNodeModel;
}
export const getView = ({RectNode,h}:RegisterParam,{svg,html,attributes}:GenParam) => {
    class GNode extends RectNode{
        getAttributes() {
            let oldattributes = super.getAttributes();
            return attributes && attributes.call(this,oldattributes) || oldattributes;
        }
        parseHtml(){
            var temp = svg || html;
            if(!svg && html){
                temp = `<foreignObject>
                    <body xmlns="http://www.w3.org/1999/xhtml">
                        ${temp}
                    </body>
                </foreignObject>`
            }
            let {properties} = this.getAttributes();
            temp = artTemplate.render(temp,properties,{
                escape:false
            });
            let info = html2json(temp);
            return this.getH(info);
        }
        getChild(info,isFirst = false){
            var arr = [];
            if(info.child){
                info.child.forEach(e => {
                    if(e.node == 'element'){
                        arr.push(this.getH(e,isFirst));
                    }else if(e.node == 'text'){
                        arr.push(e.text)
                    }
                });
            }
            return arr;
        }
        getH(info,isFirst = false){
            if(info.node == 'root'){
                return h('g',{},this.getChild(info,true));
            }
            if(info.tag){
                var attr = (info.attr || {});
                if(isFirst){
                    var attr = (info.attr || {});
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
            }
        }
        getShape(){
            return this.parseHtml();
        }
    }
    return GNode;
}