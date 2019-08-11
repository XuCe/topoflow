<template>
  <div id="app">
    <div id="graph"></div>
  </div>
</template>

<script>
import mxgraph from '@/graph/index'
import { genGraph } from '@/graph/Graph'
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
      // 启动橡皮框拖选
      new mxRubberband(this.graph)
    },
    setLinkAnimation(link){
      var state = this.graph.view.getState(link)
      if(!state) return
      let node = state.shape.node
			//state.shape.node.getElementsByTagName('path')[0].removeAttribute('visibility');
			node.getElementsByTagName('path')[1].setAttribute('id', 'link')

    },
  },
  mounted(){
    this.initTopo()
    let v1 = this.graph.insertVertex(this.parent, null, 'Hello,', 20, 20, 80, 30)
		let v2 = this.graph.insertVertex(this.parent, null, 'World!', 200, 150, 80, 30)
		let link = this.graph.insertEdge(this.parent, null, '', v1, v2,`endArrow=none;startArrow=none;strokeWidth=2;endSize=3;strokeColor=#000;rounded=1;`)
    this.setLinkAnimation(link)
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
