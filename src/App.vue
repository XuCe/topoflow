<template>
  <div id="app">
    <div id="graph"></div>
  </div>
</template>

<script>
import mxgraph from '@/graph/index'
import { genGraph } from '@/graph/Graph'
import flow from './flow'
const {
  mxGraph,
  mxOutline,
  mxEvent,
  mxCell,
  mxGeometry,
  mxUtils,
  mxEventObject,
  mxConnectionHandler,
  mxConstants,
  mxFastOrganicLayout,
  mxCellOverlay,
  mxImage,
  mxPoint,
  mxRubberband,
  mxUndoManager,
  mxCellTracker
} = mxgraph
export default {
  name: 'app',
  data(){
    return {
      graph:null,
      parent:null
    }
  },
  methods:{
    initTopo () {
      this.graph = genGraph(document.getElementById('graph'))
      this.graph.cellsEditable = false
      this.graph.setConnectable(false)
      this.parent = this.graph.getDefaultParent()
      var style = this.graph.getStylesheet().getDefaultEdgeStyle();
			style[mxConstants.STYLE_ROUNDED] = true;
			this.graph.alternateEdgeStyle = 'elbow=vertical';
      // 启动橡皮框拖选
      new mxRubberband(this.graph)
    },
    setLinkAnimation(link){
      var state = this.graph.view.getState(link)
      if(!state) return
      let node = state.shape.node
			//state.shape.node.getElementsByTagName('path')[0].removeAttribute('visibility');
			// node.getElementsByTagName('path')[1].setAttribute('id', 'link')
      new flow('aa',node,'#2598FC',node.getElementsByTagName('path')[1].getAttribute('d'))
    },
  },
  mounted(){
    this.initTopo()
    let v1 = this.graph.insertVertex(this.parent, null, 'Hello,', 20, 40, 80, 70)
		let v2 = this.graph.insertVertex(this.parent, null, 'World!', 200, 200, 80, 40)
		let link = this.graph.insertEdge(this.parent, null, '', v1, v2,`endArrow=none;startArrow=none;strokeWidth=1;endSize=3;strokeColor=#2598FC;rounded=1;`)
    this.setLinkAnimation(link)
    let v3 = this.graph.insertVertex(this.parent, null, 'Hello,', 330, 330, 80, 70)
    let link1 = this.graph.insertEdge(this.parent, null, '', v3, v2,`endArrow=none;startArrow=none;strokeWidth=1;endSize=3;strokeColor=#2598FC;rounded=1;`)
    this.setLinkAnimation(link1)
    let v4 = this.graph.insertVertex(this.parent, null, 'Hello,', 330, 40, 80, 70)
    let link2 = this.graph.insertEdge(this.parent, null, '', v4, v2,`endArrow=none;startArrow=none;strokeWidth=1;endSize=3;strokeColor=#2598FC;rounded=1;`)
    this.setLinkAnimation(link2)
    let v5 = this.graph.insertVertex(this.parent, null, 'Hello,', 20, 330, 80, 70)
    let link3 = this.graph.insertEdge(this.parent, null, '', v5, v2,`endArrow=none;startArrow=none;strokeWidth=1;endSize=3;strokeColor=#2598FC;rounded=1;`)
    this.setLinkAnimation(link3)
  }
}
</script>

<style>
*{margin: 0;padding: 0;}
html,body{
  height:100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
  height: 100%;
}
#graph {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: rgb(255, 255, 255);
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UwZTBlMCIgb3BhY2l0eT0iMC4yIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=");
  background-position: -1px -1px;
}
</style>
