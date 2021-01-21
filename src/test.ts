import LogicFlow, { RegisterParam } from '@logicflow/core'
import '@logicflow/core/dist/style/index.css';
import {gen,lfgen} from './index'

const data = {
    // 节点
    nodes: [
        {
            id: 50,
            type: 'add',
            x: 100,
            y: 150,
            properties:{
                text:'aa'
            }
        },
        {
            id: 51,
            type: 'add',
            x: 200,
            y: 150,
            properties:{
                text:'cc'
            }
        },
        {
            id: 21,
            type: 'rect',
            x: 300,
            y: 150,
        },
    ],
    // 边
    edges:[
        {
            type: 'polyline',
            sourceNodeId: 50,
            targetNodeId: 21,
        }
    ]
}
LogicFlow.use(gen);
const lf = new LogicFlow({
    container: document.querySelector('#app'),
    tool: {
        control: false,
    },
    stopScrollGraph: true,
    stopZoomGraph: true,
    grid: {
        type: 'dot',
        size: 20,
    },
});
(lf as lfgen).registerGenNode({
    nodeType:'add',
    // svg:'<text>{{text}}</text>',
    html:'<button style="width:100%;height:100%;">{{text}}</button>',
    width:200,
    height:50,
    rules:[{
        message: '流程节点下一个节点只能是网关节点',
        validate: (source, target) => {
            let isValid = true;
            if (target.type !== 'rect') {
                isValid = false;
            }
            return isValid;
        }
    }]
})
lf.render(data);
lf.on('node:click', ({ data, e }) => {
    console.log(data)
})