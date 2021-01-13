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
            text: '你好',
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
    nodeName:'add',
    html:'<text text-anchor="middle" dominant-baseline="middle" x="100" y="160" fill="currentColor" class="lf-element-text" color="#000000" font-size="12" font-weight="normal" font-family="" value="你好">{{text}}</text>'
})
lf.render(data);