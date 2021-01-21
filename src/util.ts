import { RegisterParam,ConnectRule} from '@logicflow/core';
import {html2json} from '../lib/html2json.js';
import { computed, observable } from 'mobx';
import artTemplate from '../lib/template-web.js'
export type GenParam = {
    nodeType:string,
    svg?:string,
    html?:string,
    width?:number,
    height?:number,
    rules?:ConnectRule[]
}
export const getViewModel = ({BaseNodeModel,RectNodeModel}:RegisterParam,{width,height,rules}:GenParam) => {
    class GNodeModel extends RectNodeModel{
        width = width ?? 200;
        height = height ?? 100;
        getConnectedSourceRules(): ConnectRule[]{
            let brules = super.getConnectedSourceRules();
            if(rules && rules instanceof Array){
                brules = brules.concat(rules)
            }
            return rules;
        }
    }
    return GNodeModel;
}
export const getView = ({RectNode,h}:RegisterParam,{svg,html}:GenParam) => {
    class GNode extends RectNode{
        parseHtml(){
            var temp = svg || html;
            if(!svg && html){
                temp = `<foreignObject>
                    <body xmlns="http://www.w3.org/1999/xhtml">
                        ${temp}
                    </body>
                </foreignObject>`
            }
            temp = artTemplate.render(temp,this.getProperties(),{
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
                    console.log(width)
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