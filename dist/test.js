import LogicFlow from '@logicflow/core';
import '@logicflow/core/dist/style/index.css';
import { gen } from './index';
var data = {
    // 节点
    nodes: [
        {
            id: 50,
            type: 'add',
            x: 100,
            y: 150,
            properties: {
                text: 'aa'
            }
        },
        {
            id: 51,
            type: 'add',
            x: 200,
            y: 150,
            properties: {
                text: 'cc'
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
    edges: [
        {
            type: 'polyline',
            sourceNodeId: 50,
            targetNodeId: 21,
        }
    ]
};
LogicFlow.use(gen);
var lf = new LogicFlow({
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
lf.registerGenNode({
    nodeType: 'add',
    // svg:'<text>{{text}}</text>',
    html: '<button style="width:100%;height:100%;">{{text}}</button>',
    attributes: function (e) {
        e.width = 100;
        e.height = 50;
        return e;
    }
});
lf.render(data);
lf.on('node:click', function (_a) {
    var data = _a.data, e = _a.e;
    console.log(data);
});
