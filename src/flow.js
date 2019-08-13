import * as d3 from "d3"
export default class flow {
  constructor(id,dom,color,path){
    var container = d3.select(dom)
    this.effectGroup = container.append("g")
    this.t = null
    this.t2 = null
    this.path = this.trimPath(path)
    this.color = color
    this.id = id
    // console.log(this.path)
    this.run()
  }

  trimPath(path){
    return path.replace(/M\s/g,'M')
    .replace(/L\s/g,'L')
    .replace(/\s/g,',')
  }

  run(){
    var self = this
    var count = 0
    if (count % 100 === 0) {
      this.launch(this.id,this.color,this.path)
    }
    count++
    setTimeout(function() {
      self.run()
    }, 2 * 1000);
  }

  LightenDarkenColor(col, amt){
    var usePound = false
    if (col[0] == "#") {
      col = col.slice(1)
      usePound = true
    }
    var num = parseInt(col, 16)
    var r = (num >> 16) + amt
    if (r > 255) r = 255
    else if (r < 0) r = 0
    var b = ((num >> 8) & 0x00FF) + amt
    if (b > 255) b = 255
    else if (b < 0) b = 0
    var g = (num & 0x0000FF) + amt
    if (g > 255) g = 255
    else if (g < 0) g = 0
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16)
  }

  calcTailPath(linear, cx, cy, cx2, cy2, pathArray){
    // 判断一个点是否在两个点之间
    var isBetween = function(x, y, jx1, jy1, jx2, jy2) {
      var originLength = Math.pow(Math.pow(jx2 - jx1, 2) + Math.pow(jy2 - jy1, 2), 0.5);
      var lenth1 = Math.pow(Math.pow(x - jx1, 2) + Math.pow(y - jy1, 2), 0.5);
      var lenth2 = Math.pow(Math.pow(x - jx2, 2) + Math.pow(y - jy2, 2), 0.5);
      return Math.abs(lenth1 + lenth2 - originLength) < 5;
    };
    var pathContainer = []
    for (var key in pathArray) {
      if (key == 0) {
        continue
      }
      var pre = pathArray[key - 1]
      var cur = pathArray[key]
      pathContainer.push(pre)
      if (isBetween(cx2, cy2, pre[0], pre[1], cur[0], cur[1])) {
        pathContainer = [
          [cx2, cy2]
        ]
      }
      if (isBetween(cx, cy, pre[0], pre[1], cur[0], cur[1])) {
        pathContainer.push([cx, cy])
        break
      }
    }

    pathContainer[0][0] = (pathContainer[0][0]+pathContainer[1][0])/2
    pathContainer[0][1] = (pathContainer[0][1]+pathContainer[1][1])/2
    linear
      .attr('x1', pathContainer[0][0])
      .attr('y1', pathContainer[0][1])
      .attr('x2', pathContainer[pathContainer.length - 1][0])
      .attr('y2', pathContainer[pathContainer.length - 1][1])
    pathContainer.forEach(function(item) {
      return item.join(',')
    })

    return 'M' + pathContainer.join('L')
  }

  launch(id,color,path){
    var self = this;
    var pathTmp = path.substr(1);
    var pathArray = pathTmp.split('L').map(function(item) {
      return item.split(',')
    });
    var cx = +pathArray[0][0];
    var cy = +pathArray[0][1];
    var cx2 = cx;
    var cy2 = cy;
    var pointer = 1;
    var pointer2 = 1;
    id = this.id + Math.random();
    var defs = self.effectGroup.append('defs');
    var linear = defs.append('linearGradient').attr('id', id).attr('gradientUnits', 'userSpaceOnUse')
    linear.append('stop').attr('offset', '0%').style('stop-color', this.color).style('stop-opacity', 0);
    linear.append('stop').attr('offset', '100%').style('stop-color', this.color).style('stop-opacity', 1);
    var isPointIn = function(currentX, currentY, stepX, stepY, pointX, pointY) {
      var len = Math.pow((Math.pow(currentX - pointX, 2) + Math.pow(currentY - pointY, 2)), 0.5);
      var len2 = Math.pow((Math.pow(currentX + stepX - pointX, 2) + Math.pow(currentY + stepY - pointY, 2)), 0.5);
      return len <= len2;
    };

    var tail = self.effectGroup.append('path');

    var t = d3.timer(function() {
      var preX = pathArray[pointer - 1][0];
      var preY = pathArray[pointer - 1][1];
      var x = pathArray[pointer][0];
      var y = pathArray[pointer][1];
      var len = Math.pow((Math.pow(preX - x, 2) + Math.pow(preY - y, 2)), 0.5);
      var stepX = (x - preX) / len * 3;
      var stepY = (y - preY) / len * 3;
      if (isPointIn(cx + stepX, cy + stepY, stepX, stepY, x, y)) {
        if (pointer < pathArray.length - 1) {
          pointer++;
        } else {
          t.stop()
          t2.stop()
          tail.remove()
          defs.remove()
          return;
        }
      }
      cx += stepX;
      cy += stepY;
      var tailString = self.calcTailPath(linear, cx, cy, cx2, cy2, pathArray.slice(0));
      if (tailString !== 'M') {
        tail
          .attr('d', tailString)
          .attr('stroke-width', '3')
          .attr('stroke-linecap', 'round')
          .attr('stroke', 'url(#' + id + ')')
      }
    });

    var t2 = d3.timer(function() {
      var preX = pathArray[pointer2 - 1][0];
      var preY = pathArray[pointer2 - 1][1];
      var x = pathArray[pointer2][0];
      var y = pathArray[pointer2][1];
      var len = Math.pow((Math.pow(preX - x, 2) + Math.pow(preY - y, 2)), 0.5);
      var stepX = (x - preX) / len * 3;
      var stepY = (y - preY) / len * 3;
      if (isPointIn(cx2 + stepX, cy2 + stepY, stepX, stepY, x, y)) {
        if (pointer2 < pathArray.length - 1) {
          pointer2++;
        } else {
          t2.stop();
          return;
        }
      }
      cx2 += stepX;
      cy2 += stepY;

    }, 0.6 * 1000);
  }

}
