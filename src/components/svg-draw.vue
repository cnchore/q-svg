<template>
  <div class="q-svg-draw">
    <div class="q-header">{{msg}}    
    </div>
    <div class="q-container">
      <div class="q-left">
        <i class="iconfont" :class="item.icons" :active="item.active" :title="item.title" v-for="(item,index) in svgToolbar" @click="toolSel(index)"></i>
        
       
      </div>
      <div class="q-right" >
          <svg @mousedown="rootMouseDown" @mouseleave="rootMouseUp" @mouseup="rootMouseUp" @mousemove="rootMouseMove"
          xmlns="http://www.w3.org/2000/svg" :class="rootCursor===0?'root-cursor':'root-add-cursor'"  version="1.1" id="root-svg">

           
            
            <rect v-if="rootCursor===1 && drawRect.mouseDown && drawRect.rect[0]" 
              v-for="item in drawRect.rect"
             class="q-pointer-all" fill="rgba(255,255,255,0.1)" stroke="#999" stroke-width="1" 
             :x="item.x" 
             :y="item.y" 
             :width="item.width" 
             :height="item.height"
             stroke-dasharray="none"
             ></rect>

             <rect  v-for="(item,index) in drawRect.rectList"
             @mousedown="selMouseDown" @mouseleave="selMouseUp" @mouseup="selMouseUp" @mousemove="selMouseMove"
             class="q-pointer-all" fill="rgba(255,255,255,0.1)" stroke="#111" stroke-width="1" 
             :x="item.x" 
             :y="item.y" 
             :width="item.width" 
             :height="item.height"
              @click="rectSel(index)"
             stroke-dasharray="none"></rect>
             
              
  
             <g transform="" v-if="rootCursor===0">
                <g transform="" >
                  <path fill="none" stroke="rgb(79, 128, 255)" 
                  :d="drawRect.pathList[selectedIndex]">
                  </path>
                    <g fill="#000" class="cursor-rotate" stroke="#000" fill-opacity="0" stroke-opacity="0" stroke-width="0"
                    v-if="drawRect.actCircle[selectedIndex]&& drawRect.actCircle[selectedIndex][0]" 
                    >
                      <circle r="8" 
                      :cx="drawRect.actCircle[selectedIndex]&&drawRect.actCircle[selectedIndex][0]?drawRect.actCircle[selectedIndex][0].x:0" 
                      :cy="drawRect.actCircle[selectedIndex]&&drawRect.actCircle[selectedIndex][0]?drawRect.actCircle[selectedIndex][0].y:0"></circle>
                      <circle r="8" 
                      :cx="drawRect.actCircle[selectedIndex]&&drawRect.actCircle[selectedIndex][0]?drawRect.actCircle[selectedIndex][1].x:0" 
                      :cy="drawRect.actCircle[selectedIndex]&&drawRect.actCircle[selectedIndex][0]?drawRect.actCircle[selectedIndex][1].y:0"></circle>
                      <circle r="8" 
                      :cx="drawRect.actCircle[selectedIndex]&&drawRect.actCircle[selectedIndex][0]?drawRect.actCircle[selectedIndex][2].x:0" 
                      :cy="drawRect.actCircle[selectedIndex]&&drawRect.actCircle[selectedIndex][0]?drawRect.actCircle[selectedIndex][2].y:0"></circle>
                      <circle r="8" 
                      :cx="drawRect.actCircle[selectedIndex]&&drawRect.actCircle[selectedIndex][0]?drawRect.actCircle[selectedIndex][3].x:0" 
                      :cy="drawRect.actCircle[selectedIndex]&&drawRect.actCircle[selectedIndex][0]?drawRect.actCircle[selectedIndex][3].y:0"></circle>
                    </g>
                    <g fill="#4F80FF" stroke="rgba(0,0,0,0)" v-if="drawRect.actRect[selectedIndex]&& drawRect.actRect[selectedIndex][0]">
                      
                      <rect  width="8" height="8"  style="cursor:nw-resize"  
                        :x="drawRect.actRect[selectedIndex]&& drawRect.actRect[selectedIndex][0]?drawRect.actRect[selectedIndex][0].x:0" 
                        :y="drawRect.actRect[selectedIndex]&& drawRect.actRect[selectedIndex][0]?drawRect.actRect[selectedIndex][0].y:0"
                          @mousedown="resizeMouseDown($event,0)" @mouseleave="resizeMouseUp($event,0)" @mouseup="resizeMouseUp($event,0)" @mousemove="resizeMouseMove($event,0)"
                        
                        ></rect>
                     
                      <rect  width="8" height="8"  style="cursor:n-resize"  
                        :x="drawRect.actRect[selectedIndex]&& drawRect.actRect[selectedIndex][0]?drawRect.actRect[selectedIndex][1].x:0" 
                        :y="drawRect.actRect[selectedIndex]&& drawRect.actRect[selectedIndex][0]?drawRect.actRect[selectedIndex][1].y:0"
                          @mousedown="resizeMouseDown($event,1)" @mouseleave="resizeMouseUp($event,1)" @mouseup="resizeMouseUp($event,1)" @mousemove="resizeMouseMove($event,1)"
                        ></rect>
                      <rect  width="8" height="8"  style="cursor:ne-resize"  
                        :x="drawRect.actRect[selectedIndex]&& drawRect.actRect[selectedIndex][0]?drawRect.actRect[selectedIndex][2].x:0" 
                        :y="drawRect.actRect[selectedIndex]&& drawRect.actRect[selectedIndex][0]?drawRect.actRect[selectedIndex][2].y:0"
                          @mousedown="resizeMouseDown($event,2)" @mouseleave="resizeMouseUp($event,2)" @mouseup="resizeMouseUp($event,2)" @mousemove="resizeMouseMove($event,2)"
                        ></rect>
                      <rect  width="8" height="8"  style="cursor:e-resize"  
                        :x="drawRect.actRect[selectedIndex]&& drawRect.actRect[selectedIndex][0]?drawRect.actRect[selectedIndex][3].x:0" 
                        :y="drawRect.actRect[selectedIndex]&& drawRect.actRect[selectedIndex][0]?drawRect.actRect[selectedIndex][3].y:0"
                          @mousedown="resizeMouseDown($event,3)" @mouseleave="resizeMouseUp($event,3)" @mouseup="resizeMouseUp($event,3)" @mousemove="resizeMouseMove($event,3)"
                        ></rect>
                      <rect  width="8" height="8"  style="cursor:se-resize"  
                        :x="drawRect.actRect[selectedIndex]&& drawRect.actRect[selectedIndex][0]?drawRect.actRect[selectedIndex][4].x:0" 
                        :y="drawRect.actRect[selectedIndex]&& drawRect.actRect[selectedIndex][0]?drawRect.actRect[selectedIndex][4].y:0"
                          @mousedown="resizeMouseDown($event,4)" @mouseleave="resizeMouseUp($event,4)" @mouseup="resizeMouseUp($event,4)" @mousemove="resizeMouseMove($event,4)"
                        ></rect>
                      <rect  width="8" height="8"  style="cursor:s-resize"  
                        :x="drawRect.actRect[selectedIndex]&& drawRect.actRect[selectedIndex][0]?drawRect.actRect[selectedIndex][5].x:0" 
                        :y="drawRect.actRect[selectedIndex]&& drawRect.actRect[selectedIndex][0]?drawRect.actRect[selectedIndex][5].y:0"
                          @mousedown="resizeMouseDown($event,5)" @mouseleave="resizeMouseUp($event,5)" @mouseup="resizeMouseUp($event,5)" @mousemove="resizeMouseMove($event,5)"
                        ></rect>
                      <rect  width="8" height="8"  style="cursor:sw-resize"  
                        :x="drawRect.actRect[selectedIndex]&& drawRect.actRect[selectedIndex][0]?drawRect.actRect[selectedIndex][6].x:0" 
                        :y="drawRect.actRect[selectedIndex]&& drawRect.actRect[selectedIndex][0]?drawRect.actRect[selectedIndex][6].y:0"
                          @mousedown="resizeMouseDown($event,6)" @mouseleave="resizeMouseUp($event,6)" @mouseup="resizeMouseUp($event,6)" @mousemove="resizeMouseMove($event,6)"
                        ></rect>
                      <rect  width="8" height="8"  style="cursor:w-resize"  
                        :x="drawRect.actRect[selectedIndex]&& drawRect.actRect[selectedIndex][0]?drawRect.actRect[selectedIndex][7].x:0" 
                        :y="drawRect.actRect[selectedIndex]&& drawRect.actRect[selectedIndex][0]?drawRect.actRect[selectedIndex][7].y:0"
                          @mousedown="resizeMouseDown($event,7)" @mouseleave="resizeMouseUp($event,7)" @mouseup="resizeMouseUp($event,7)" @mousemove="resizeMouseMove($event,7)"
                        ></rect>
                       
                    </g>
                  
                </g>
                
              </g>
          </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'qSvgDraw',
  data () {
    return {
      msg: 'Welcome to Svg Draw Tool',
      //工具栏
      svgToolbar:[
      {icons:'icon-choice',active:true,title:'choice'},
      {icons:'icon-Rectangle',active:false,title:'judge'},
      {icons:'icon-straight',active:false,title:'line'},
      {icons:'icon-tuoyuan',active:false,title:'ellipse'},
      {icons:'icon-fangkuang',active:false,title:'rectangele'},
      {icons:'icon-line-arrow',active:false,title:'arrow'},
      {icons:'icon-22',active:false,title:'text'},
      {icons:'icon-xing',active:false,title:'star'},
      {icons:'icon-fangda',active:false,title:'enlarge'}],
      rootCursor:0,//绘画区光标形状
      drawRect:{
        mouseDown:false,
        startPoint:{x:0,y:0},//绘画起点
        endPoint:{x:0,y:0},//绘画末点
        path:'',
        pathList:[],//选中后的操作区路径
        actRect:[],//选择后的操作区
        actCircle:[],//选中后的旋转区
        rect:[],//绘画草稿
        rectList:[]//所有绘制矩形列表
      },
      cursorPointer:{x:100,y:100},//光标坐标
      mouseDown:false,//鼠标是否按下
      selectedIndex:-1,//选中的下标
      posX:0,//按下鼠标后，鼠标与选中元素x坐标的距离
      posY:0,//按下鼠标后，鼠标与选中元素y坐标的距离
      resizeOld:{p1:{},p2:{}},//缩放前坐标
      resizePx:{x:-1,y:0}//缩放固定点
    }
  },
  methods:{
    //工具选择
    toolSel(_index){

      this.svgToolbar.forEach((item,index)=>{
        if(index===_index){
          item.active=true;
          if(item.title==='choice' || item.title==='enlarge'){
            this.rootCursor=0;
          }else{
            this.rootCursor=1;
          }
        }else{
          item.active=false;
        }
      })
      this.selectedIndex=-1;
    },
    //svg选择
    rectSel(_index){
      if(this.rootCursor===0){
        this.selectedIndex=_index;
        this.cursorPointer.x=this.drawRect.rectList[_index].x;
        this.cursorPointer.y=this.drawRect.rectList[_index].y;
      }
    },
    rootMouseUp(e){
      
      if(this.drawRect.mouseDown && this.rootCursor===1){
        this.drawRect.endPoint.x=e.offsetX;
        this.drawRect.endPoint.y=e.offsetY;
        this.drawRect.pathList.push(this.getPath(this.drawRect.startPoint,this.drawRect.endPoint));
        this.drawRect.rectList.push(this.getRect(this.drawRect.startPoint.x,this.drawRect.startPoint.y,this.drawRect.endPoint.x,this.drawRect.endPoint.y)[0]);
        this.drawRect.actRect.push(this.getActRect(this.drawRect.startPoint,this.drawRect.endPoint));
        this.drawRect.actCircle.push(this.getActCircle(this.drawRect.startPoint,this.drawRect.endPoint));
      }
      this.drawRect.mouseDown=false;

    },
    rootMouseDown(e){
      this.drawRect.mouseDown=true;
      if(this.rootCursor===1){
       this.drawRect.startPoint.x=e.offsetX;
       this.drawRect.startPoint.y=e.offsetY;
      }
    },
    rootMouseMove(e){
      
      if(this.drawRect.mouseDown && this.rootCursor===1){
        this.drawRect.endPoint.x=e.offsetX;
        this.drawRect.endPoint.y=e.offsetY;
        this.drawRect.path=this.getPath(this.drawRect.startPoint,this.drawRect.endPoint);
        this.drawRect.rect=this.getRect(this.drawRect.startPoint.x,this.drawRect.startPoint.y,this.drawRect.endPoint.x,this.drawRect.endPoint.y)
      }
    },
    getActCircle(_p1={x:0,y:0},_p2={x:0,y:0}){
      let _list=[];
      let p1=_p1,p2=_p2;
      if(_p1.x>_p2.x){
        p1=_p2;
        p2=_p1;
      }
      /* 1 2 3
         8   4
         7 6 5
      */
      _list.push({x:p1.x,y:p1.y});//1
      _list.push({x:p2.x,y:p1.y});//3


      _list.push({x:p2.x,y:p2.y});//5
      _list.push({x:p1.x,y:p2.y});//7

      return _list;
    },
    //获取操作区域
    getActRect(_p1={x:0,y:0},_p2={x:0,y:0}){
      let _list=[];
      let p1=_p1,p2=_p2;
      if(_p1.x>_p2.x){
        p1=_p2;
        p2=_p1;
      }
      /* 1 2 3
         8   4
         7 6 5
      */
      _list.push({x:p1.x-5,y:p1.y-5});//1
      _list.push({x:p1.x+(p2.x-p1.x)/2-4,y:p1.y-5});//2
      _list.push({x:p2.x-5,y:p1.y-5});//3

      _list.push({x:p2.x-5,y:p1.y+(p2.y-p1.y)/2-5});//4

      _list.push({x:p2.x-5,y:p2.y-5});//5
      _list.push({x:p1.x-5+(p2.x-p1.x)/2,y:p2.y-5});//6
      _list.push({x:p1.x-5,y:p2.y-5});//7

      _list.push({x:p1.x-5,y:p1.y+(p2.y-p1.y)/2-5});//8
      return _list;
    },
    //获取操作路径
    getPath(p1={x:0,y:0},p2={x:0,y:0}){
      let x1=p1.x<p2.x?p1.x-1.5:p2.x-1.5;
      let y1=p1.x<p2.x?p1.y-1.5:p2.y-1.5;
      let x2=p1.x<p2.x?p2.x+1.5:p1.x+1.5;
      let y2=p1.x<p2.x?p2.y+1.5:p1.y+1.5;
      return `M${x1},${y1},L${x2},${y1},${x2},${y2},${x1},${y2}z`
    },
    getRect(x1,y1,x2,y2){
      let _list=[];
      if(x1<x2){

        _list.push({
          x:x1,
          y:y1,
          width:Math.abs(x2-x1),
          height:Math.abs(y2-y1)
        });
      }else{
        _list.push({
          x:x2,
          y:y2,
          width:Math.abs(x1-x2),
          height:Math.abs(y1-y2)
        });
      }
      return _list;
    },
    //移动后矩形的位置
    setMoveRect(p1={x:0,y:0},p2={x:0,y:0}){
      let self=this;
      //选中的矩形
      let _list=[];
      this.drawRect.rectList.forEach((item,index)=>{
        let _item=item;
        if(index===self.selectedIndex){
          let _rect=self.getRect(p1.x,p1.y,p2.x,p2.y);
          _item=_rect[0];
          console.log('rect:',_item,p1,p2);
        }
        _list.push(_item);
      })
      this.drawRect.rectList=_list;
      //操作的路径
      let _path=[];
      this.drawRect.pathList.forEach((pathItem,pathIndex)=>{
          let _pathItem=pathItem;
          if(pathIndex===self.selectedIndex){
            _pathItem=self.getPath(p1,p2);
          }
          _path.push(_pathItem);
      })
      this.drawRect.pathList=_path;
      //操作的矩形
      let _actRect=[];
      this.drawRect.actRect.forEach((actItem,actIndex)=>{
          let _actItem=actItem;
          if(actIndex===self.selectedIndex){
            _actItem=self.getActRect(p1,p2);
          }
          _actRect.push(_actItem);
      })
      this.drawRect.actRect=_actRect;
      //旋转的圆形
      let _actCircle=[];
      this.drawRect.actCircle.forEach((actCircleItem,actCircleIndex)=>{
          let _actCircleItem=actCircleItem;
          if(actCircleIndex===self.selectedIndex){
            _actCircleItem=self.getActCircle(p1,p2);
          }
          _actCircle.push(_actCircleItem);
      })
      this.drawRect.actCircle=_actCircle;

    },
    selMouseUp(e){
      this.mouseDown=false;
      //console.log('mouseUp:',this.mouseDown);
      if(this.rootCursor===0){
        let p2={};
        if(this.selectedIndex>-1){
          p2.x=this.cursorPointer.x+this.drawRect.rectList[this.selectedIndex].width;
          p2.y=this.cursorPointer.y+this.drawRect.rectList[this.selectedIndex].height;
          this.setMoveRect(this.cursorPointer,p2);
        }
      }
    },
    selMouseDown(e){
      this.mouseDown=true;
      if(this.rootCursor===0){
        this.posX=e.offsetX-this.cursorPointer.x;
        this.posY=e.offsetY-this.cursorPointer.y;
      }
      //console.log('mouseDown:',this.mouseDown);
      
    },
    selMouseMove(e){
      
      if(this.mouseDown && this.rootCursor===0){

        this.cursorPointer.x=e.offsetX-this.posX;
        this.cursorPointer.y=e.offsetY-this.posY;
        let p2={};
        if(this.selectedIndex>-1){
          p2.x=this.cursorPointer.x+this.drawRect.rectList[this.selectedIndex].width;
          p2.y=this.cursorPointer.y+this.drawRect.rectList[this.selectedIndex].height;
          this.setMoveRect(this.cursorPointer,p2);
        }
       // console.log('move:',this.cursorPointer.x,this.cursorPointer.y);
      }
    },
    resizeMouseUp(e,t){
      console.log('up:');
      
      this.mouseDown=false;
      //console.log('mouseUp:',this.mouseDown);
      if(this.rootCursor===0 && this.resizePx.x>-1){
        if(this.selectedIndex>-1){
          let p1={},p2={};
          switch(t){
            case 0:
              p1=this.cursorPointer;
              p2=this.resizeOld.p2;
              break;
            case 1:
              p1.x=this.resizeOld.p1.x;
              p1.y=this.cursorPointer.y;
              p2=this.resizeOld.p2;
              break;
            case 2:
              p1.x=this.resizeOld.p1.x;
              p1.y=this.cursorPointer.y;
              p2.x=this.cursorPointer.x;
              p2.y=this.resizeOld.p2.y;
              break;
            case 3:
              p1=this.resizeOld.p1;
              p2.x=this.cursorPointer.x;
              p2.y=this.resizeOld.p2.y;
              break;
            case 4:
              p1=this.resizeOld.p1;
              p2=this.cursorPointer;
              break;
            case 5:
              p1=this.resizeOld.p1;
              p2.x=this.cursorPointer.x;
              p2.y=this.resizeOld.p2.y;
              break;
            case 6:
              p1.x=this.cursorPointer.x;
              p1.y=this.resizeOld.p1.y;
              p2.x=this.resizeOld.p2.x;
              p2.y=this.cursorPointer.y;
              break;
            case 7:
              p1.x=this.cursorPointer.x;
              p1.y=this.resizeOld.p1.x;
              p2=this.resizeOld.p2;
              break;
          }
          console.log('mouseUp:',p1.x,p1.y,p2.x,p2.y);
          this.setMoveRect(p1,p2);
        }
      }
      this.resizePx.x=-1;
    },
    resizeMouseDown(e,t){
      this.mouseDown=true;
      if(this.rootCursor===0){
        let p1={};
        p1.x=this.drawRect.rectList[this.selectedIndex].x;
        p1.y=this.drawRect.rectList[this.selectedIndex].y;
        this.resizePx.x=this.drawRect.rectList[this.selectedIndex].x+this.drawRect.rectList[this.selectedIndex].width;
        this.resizePx.y=this.drawRect.rectList[this.selectedIndex].y+this.drawRect.rectList[this.selectedIndex].height;
        this.resizeOld.p1=p1;
        this.resizeOld.p2=this.resizePx;
        switch(t){
          case 0:
            this.cursorPointer=p1;
            this.posX=e.offsetX-this.cursorPointer.x;
            this.posY=e.offsetY-this.cursorPointer.y;
            break;
          case 1:
            this.cursorPointer.x=e.offsetX-p1.x;
            this.cursorPointer.y=p1.y;
            this.posX=this.cursorPointer.x;
            this.posY=this.cursorPointer.y;
            break;
          case 2:
            this.cursorPointer.x=e.offsetX-p1.x;
            this.cursorPointer.y=e.offsetY-p1.y;
            this.posX=this.cursorPointer.x;
            this.posY=this.cursorPointer.y;
            break;
          case 3:
            break;
          case 4:
            this.cursorPointer=this.resizePx;
           
            this.posX=0;
            this.posY=0;
            break;
          case 5:
            break;
          case 6:
            break;
          case 7:
            break;
        } 
       
        console.log('mouseDown:',this.resizeOld.p1.x,this.resizeOld.p1.y,this.resizeOld.p2.x,this.resizeOld.p2.y);
      }
      
      
    },
    resizeMouseMove(e,t){
      console.log('move:');
      if(this.mouseDown && this.rootCursor===0 && this.resizePx.x>-1){

        this.cursorPointer.x=e.offsetX-this.posX;
        this.cursorPointer.y=e.offsetY-this.posY;
        if(this.selectedIndex>-1){
          let p1={},p2={};
          switch(t){
            case 0:
              p1=this.cursorPointer;
              p2=this.resizeOld.p2;
              break;
            case 1:
              p1.x=this.resizeOld.p1.x;
              p1.y=this.cursorPointer.y;
              p2=this.resizeOld.p2;
              break;
            case 2:
              p1.x=this.resizeOld.p1.x;
              p1.y=this.cursorPointer.y;
              p2.x=this.cursorPointer.x;
              p2.y=this.resizeOld.p2.y;
              break;
            case 3:
              p1=this.resizeOld.p1;
              p2.x=this.cursorPointer.x;
              p2.y=this.resizeOld.p2.y;
              break;
            case 4:
              p1=this.resizeOld.p1;
              p2=this.cursorPointer;
              break;
            case 5:
              p1=this.resizeOld.p1;
              p2.x=this.cursorPointer.x;
              p2.y=this.resizeOld.p2.y;
              break;
            case 6:
              p1.x=this.cursorPointer.x;
              p1.y=this.resizeOld.p1.y;
              p2.x=this.resizeOld.p2.x;
              p2.y=this.cursorPointer.y;
              break;
            case 7:
              p1.x=this.cursorPointer.x;
              p1.y=this.resizeOld.p1.x;
              p2=this.resizeOld.p2;
              break;
          }
          this.setMoveRect(p1,p2);
          //console.log('cursorPointer:',this.cursorPointer.x,this.cursorPointer.y);
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .root-cursor{
    cursor: default;
  }
  .root-add-cursor{
    cursor: crosshair;
  }
  .q-svg-draw{
    background-color: #111;
    color: #fff;
    height: 100vh;
    .q-header{
      font-size: 20px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-box-align: start;
      -webkit-box-pack: center;
      height: 80px;
    }
    .q-container{
      height: calc(~"100vh - 80px");
      display: flex;
      overflow: hidden;
      .q-left{
        width: 60px;
        text-align: center;
        i{
          &:hover{
            color:#0cf;
          }
          cursor: pointer;
          color: #fff;
          font-size: 20px;
          display: block;
          margin: 10px;
          font-weight: 800;
        }
        i[active=true]{
          color:#0cf;
        }
      }
      .q-right{
        width: 100%;
        overflow: auto;
        background-color:#999;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-box-align: center;
        -webkit-box-pack: center;
        #root-svg{
            background-color:#fff;
            width: 600px;
            height: 800px;
            .q-pointer-all{
              cursor: move;
              &:hover{
                //stroke:#0cf;
              }
            }
            .cursor-rotate{
              cursor:url(../assets/rotate.png) 12 12, auto;
            }
        }
      }
    }
    
  }
</style>
