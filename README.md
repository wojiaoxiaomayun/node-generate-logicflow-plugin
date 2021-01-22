# logic-flow自定义节点插件

## 1.介绍

基于滴滴开源的[logic-flow](http://logic-flow.org/)实现的自定义节点插件，让自定义节点能给简单一点，初衷是想做个爬虫的流程图，结果发现我想自定义图标和一些复制图形节点，用目前官网提供的重写感觉好难啊，我有点看不懂，定义shape的时候又卡住了，通过函数生成虚拟dom，复杂一点的dom完犊子了，好麻烦，多定义几个不同的shape会不会挂掉（夸张一下），哈哈。

举个例子：

[![https://ae01.alicdn.com/kf/Uce47dd85f96847a4950fa56fecee6632r.jpg](https://ae01.alicdn.com/kf/Uce47dd85f96847a4950fa56fecee6632r.jpg)](https://ae01.alicdn.com/kf/Uce47dd85f96847a4950fa56fecee6632r.jpg)

[![https://ae01.alicdn.com/kf/Uf6f845f28edf44e2ae0502f18d1256adi.jpg](https://ae01.alicdn.com/kf/Uf6f845f28edf44e2ae0502f18d1256adi.jpg)](https://ae01.alicdn.com/kf/Uf6f845f28edf44e2ae0502f18d1256adi.jpg)

我想定义这两种节点，或者最开始我想弄个数据库表的描述列表，想想头疼，如果让我用html定义的话，是挺快，但是用函数得想各种嵌套，所以就产生了这个插件。

## 2.安装

```
npm install node-gen-logicflow-plugin
```

普通的script引用正在打包中

## 3.使用

```javascript
import LogicFlow from '@logicflow/core'
import '@logicflow/core/dist/style/index.css';
import gen from 'node-gen-logicflow-plugin'
//添加插件
LogicFlow.use(gen);

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
//注册自定义节点
lf.registerGenNode({
    nodeType:'add',
    // svg:'<text>{{text}}</text>',
    html:'<button style="width:100%;height:100%;">{{text}}</button>',
    attributes:function(e){
        e.width = 100;
        e.height = 50;
        return e;
    }
})
lf.render(data);
```

## 4.具体参数

```typescript
export type GenParam = {
    nodeType:string,
    svg?:string,
    html?:string,
    attributes?:Function,
    targetRules?:ConnectRule[],
    sourceRules?:ConnectRule[]
}
```

| 参数        | 具体用法                                                     | 数据类型 | 是否必选 |
| ----------- | :----------------------------------------------------------- | -------- | -------- |
| nodeType    | 同logic-flow中注册节点的type                                 | string   | 是       |
| svg         | svg代码，直接根据svg代码生成节点，svg与html只能选择一种，两种都写及默认选中svg的代码，支持art-template模板写法，便于动态改变节点图形内的东东，将properties中的数据注入模板，如上方例子中{{text}},取值为properties中的text值 | string   | 否       |
| html        | html代码，直接根据html代码生成节点，同svg                    | string   | 否       |
| attributes  | 回调参数为节点attributes中的值，基于这个方法，可以动态修改attributes中的数据，最后将attributes数据返回，同[logic-flow自定义属性](http://logic-flow.org/guide/advance/customNode.html#自定义属性) | 回调函数 | 否       |
| targetRules | 当前节点作为连线开始点的校验规则                             | 数组     | 否       |
| sourceRules | 当前节点作为连接目标点时的校验规则                           | 数组     | 否       |

> 各参数使用示例

nodeType:

```
略
```

svg：(我随意从iconfont下载的一个svg图标)

```javascript
//静态svg
svg:'<svg t="1611290688265" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3964" width="200" height="200"><path d="M512 71.4c-243.2 0-440.4 197.2-440.4 440.4S268.8 952.2 512 952.2 952.4 755 952.4 511.8 755.2 71.4 512 71.4z m0 768.2c-181 0-327.8-146.8-327.8-327.8S331 184 512 184s327.8 146.8 327.8 327.8S693 839.6 512 839.6z" fill="#F3990F" p-id="3965"></path><path d="M512 957.2c-60.1 0-118.5-11.8-173.4-35-53-22.4-100.7-54.5-141.6-95.5-40.9-40.9-73-88.5-95.5-141.6-23.2-54.9-35-113.2-35-173.4 0-60.1 11.8-118.5 35-173.4 22.4-53 54.5-100.7 95.5-141.6 40.9-40.9 88.5-73 141.6-95.5 54.9-23.2 113.2-35 173.4-35 60.1 0 118.5 11.8 173.4 35 53 22.4 100.7 54.5 141.6 95.5 40.9 40.9 73 88.5 95.5 141.6 23.2 54.9 35 113.2 35 173.4 0 60.1-11.8 118.5-35 173.4-22.4 53-54.5 100.7-95.5 141.6-40.9 40.9-88.5 73-141.6 95.5-54.9 23.2-113.3 35-173.4 35z m0-880.8c-240.1 0-435.4 195.3-435.4 435.4 0 240.1 195.3 435.4 435.4 435.4 240.1 0 435.4-195.3 435.4-435.4 0-240.1-195.3-435.4-435.4-435.4z m0 768.2c-88.9 0-172.5-34.6-235.3-97.5-62.9-62.9-97.5-146.4-97.5-235.3s34.6-172.5 97.5-235.3C339.5 213.6 423.1 179 512 179s172.5 34.6 235.3 97.5c62.9 62.9 97.5 146.4 97.5 235.3s-34.6 172.5-97.5 235.3C684.5 810 600.9 844.6 512 844.6z m0-655.6c-178 0-322.8 144.8-322.8 322.8S334 834.6 512 834.6s322.8-144.8 322.8-322.8S690 189 512 189z" fill="#333333" p-id="3966"></path><path d="M512 511.8m-327.8 0a327.8 327.8 0 1 0 655.6 0 327.8 327.8 0 1 0-655.6 0Z" fill="#F9BD53" p-id="3967"></path><path d="M512 844.6c-88.9 0-172.5-34.6-235.3-97.5-62.9-62.9-97.5-146.4-97.5-235.3s34.6-172.5 97.5-235.3C339.5 213.6 423.1 179 512 179s172.5 34.6 235.3 97.5c62.9 62.9 97.5 146.4 97.5 235.3s-34.6 172.5-97.5 235.3C684.5 810 600.9 844.6 512 844.6z m0-655.6c-178 0-322.8 144.8-322.8 322.8S334 834.6 512 834.6s322.8-144.8 322.8-322.8S690 189 512 189z" fill="#333333" p-id="3968"></path><path d="M381.3 383.8v258.9h258.9V383.8H381.3zM581 583.4H440.6V443H581v140.4z" fill="#F3990F" p-id="3969"></path><path d="M640.2 647.7H381.3c-2.8 0-5-2.2-5-5V383.8c0-2.8 2.2-5 5-5h258.9c2.8 0 5 2.2 5 5v258.9c0 2.7-2.2 5-5 5z m-253.9-10h248.9V388.8H386.3v248.9zM581 588.4H440.6c-2.8 0-5-2.2-5-5V443c0-2.8 2.2-5 5-5H581c2.8 0 5 2.2 5 5v140.4c0 2.8-2.2 5-5 5z m-135.4-10H576V448H445.6v130.4z" fill="#333333" p-id="3970"></path><path d="M440.6 443H581v140.4H440.6z" fill="#FFFFFF" p-id="3971"></path><path d="M581 588.4H440.6c-2.8 0-5-2.2-5-5V443c0-2.8 2.2-5 5-5H581c2.8 0 5 2.2 5 5v140.4c0 2.8-2.2 5-5 5z m-135.4-10H576V448H445.6v130.4z" fill="#333333" p-id="3972"></path><path d="M457.9 77.5C243.1 109.9 78.6 292.4 78.6 512.8c0 222.3 167.4 406.1 384.9 436.1C10 587.7 351.1 185.2 457.9 77.5z" fill="#4D4D4D" opacity=".1" p-id="3973"></path></svg>'//首标签<svg>的宽高会被attributes中宽高替换
//模板写法,text会被动态的解析成properties中的text，参考art-template
svg:'<text>{{text}}</text>'
```

html:

```javascript
//正常写法，静态模板，不会改变
html:'<div style=“width:100%;height:100%”></div>'//宽高设成100%及获取的当前节点attributes里的宽高
//模板写法,text会被动态的解析成properties中的text，参考art-template
html:'<div>{{text}}</div>'
```

attributes:

[![https://ae01.alicdn.com/kf/Uf6f6e678fcfe481c89daaf7d68fac506T.jpg](https://ae01.alicdn.com/kf/Uf6f6e678fcfe481c89daaf7d68fac506T.jpg)](https://ae01.alicdn.com/kf/Uf6f6e678fcfe481c89daaf7d68fac506T.jpg)

```javascript
//拿官网自定义参数举例
attributes:function(e){
	const { properties } = e;
    if (properties.size === 'big') {
        attributes.width = e.width * 1.3;
        attributes.height = e.height * 1.3;
    }
    return attributes;
}
```

sourceRules:

[![https://ae01.alicdn.com/kf/U4aa31beab5174779b06cc1a1ac125943T.jpg](https://ae01.alicdn.com/kf/U4aa31beab5174779b06cc1a1ac125943T.jpg)](https://ae01.alicdn.com/kf/U4aa31beab5174779b06cc1a1ac125943T.jpg)

```javascript
//还是官网的例子
sourceRules:[{
    message: '流程节点下一个节点只能是网关节点',
    validate: (source: BaseNode, target: BaseNode) => {
        let isValid = true;
        if (target.type !== EXCLUSIVE_GATEWAY_NAME) {
            isValid = false;
        }
        return isValid;
    },
}]
```

targetRules:

同sourceRules