import { AfterViewInit, Component, OnInit } from '@angular/core';
import { OrganizationService } from '@sparrowmini/org-api';
import * as echarts from 'echarts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor(
    private orgService: OrganizationService
  ) { }
  ngAfterViewInit(): void {

    this.orgService.orgTree().subscribe((res) => {
      const data: any = res;

      var chartDom = document.getElementById('chartContainer');
      var myChart = echarts.init(chartDom);
      var option;

      myChart.showLoading();

      myChart.hideLoading();
      myChart.setOption(
        (option = {
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
          },
          series: [
            {
              type: 'tree',
              data: [data],
              left: '2%',
              right: '2%',
              top: '8%',
              bottom: '20%',
              symbol: 'emptyCircle',
              orient: 'vertical',
              roam: true,
              expandAndCollapse: true,
              avoidLabelOverlap: true,
              itemStyle:{
                color: '#ff9800'
              },
              label: {
                position: 'top',
                // rotate: -90,
                verticalAlign: 'middle',
                align: 'right',
                fontSize: 9
              },
              leaves: {
                label: {
                  position: 'bottom',
                  // rotate: -90,
                  verticalAlign: 'middle',
                  align: 'center'
                }
              },
              animationDurationUpdate: 750
            }
          ]
        })
      );

      option && myChart.setOption(option);

    });

    // const data = {
    //   name: '销售部',
    //   children: [{
    //     name: '销售一部',
    //     children: [{
    //       name: '任务名称1',
    //       itemStyle: { color: "#ff9800" },
    //     },
    //     {
    //       name: '任务名称2',
    //       itemStyle: { color: "#4d8dd9" },
    //     },
    //     {
    //       name: '任务名称3',
    //       itemStyle: { color: "#22b07b" },
    //     },
    //     {
    //       name: '任务名称4'
    //     },
    //     {
    //       name: '任务名称5'
    //     },
    //     {
    //       name: '任务名称6'
    //     },
    //     {
    //       name: '任务名称7'
    //     },
    //     {
    //       name: '任务名称8'
    //     }
    //     ]
    //   },
    //   {
    //     name: '销售二部',
    //   },
    //   {
    //     name: '销售三部',
    //     children: [{
    //       name: '任务3-1'
    //     },
    //     {
    //       name: '任务3-2'
    //     }
    //     ]
    //   },
    //   {
    //     name: '销售四部',
    //     children: [{
    //       name: '任务4-1'
    //     },
    //     {
    //       name: '任务4-2'
    //     }
    //     ]
    //   }
    //   ]
    // };

    var ROOT_PATH = 'https://echarts.apache.org/examples';



    // var dom = document.getElementById("chartContainer");
    // var myChart: any = echarts.init(dom);
    // var app = {};
    // var option;
    // const data = {
    //   name: '销售部',
    //   children: [{
    //     name: '销售一部',
    //     children: [{
    //       name: '任务名称1',
    //       itemStyle: { color: "#ff9800" },
    //     },
    //     {
    //       name: '任务名称2',
    //       itemStyle: { color: "#4d8dd9" },
    //     },
    //     {
    //       name: '任务名称3',
    //       itemStyle: { color: "#22b07b" },
    //     },
    //     {
    //       name: '任务名称4'
    //     },
    //     {
    //       name: '任务名称5'
    //     },
    //     {
    //       name: '任务名称6'
    //     },
    //     {
    //       name: '任务名称7'
    //     },
    //     {
    //       name: '任务名称8'
    //     }
    //     ]
    //   },
    //   {
    //     name: '销售二部',
    //   },
    //   {
    //     name: '销售三部',
    //     children: [{
    //       name: '任务3-1'
    //     },
    //     {
    //       name: '任务3-2'
    //     }
    //     ]
    //   },
    //   {
    //     name: '销售四部',
    //     children: [{
    //       name: '任务4-1'
    //     },
    //     {
    //       name: '任务4-2'
    //     }
    //     ]
    //   }
    //   ]
    // };
    // option = {
    //   tooltip: {
    //     trigger: 'item',
    //     triggerOn: 'mousemove'
    //   },
    //   series: [{
    //     type: 'tree',
    //     id: 0,
    //     name: 'tree1',
    //     data: [data],
    //     top: '10%',
    //     left: '10%',
    //     bottom: '20%',
    //     right: '10%',
    //     avoidLabelOverlap: true,//防止标签重叠
    //     roam: true, //移动+缩放  'scale' 或 'zoom'：只能够缩放。 'move' 或 'pan'：只能够平移。
    //     scaleLimit: { //缩放比例
    //       min: 0.7,//最小的缩放值
    //       max: 4,//最大的缩放值
    //     },
    //     layout: 'orthogonal',//树图布局，orthogonal水平垂直方向，radial径向布局 是指以根节点为圆心，每一层节点为环，一层层向外
    //     orient: 'TB', //树形方向  TB为上下结构  LR为左右结构
    //     // nodePadding: 100,//结点间距 （发现没用）
    //     //layerPadding: 30,//连接线长度 （发现没用）
    //     symbol: 'circle', //图形形状  rect方形  roundRect圆角 emptyCircle圆形 circle实心圆
    //     symbolSize: 14, //状态大小
    //     edgeShape: 'polyline', //线条类型  curve曲线
    //     initialTreeDepth: 1, //初始展开的层级
    //     expandAndCollapse: true,//子树折叠和展开的交互，默认打开
    //     lineStyle: {//结构线条样式
    //       width: 0.7,
    //       color: '#1E9FFF',
    //       type: 'broken'
    //     },
    //     label: {//节点文本样式
    //       normal: {
    //         backgroundColor: '#81c5f7',
    //         position: 'bottom',
    //         verticalAlign: 'middle', //文字垂直对齐方式
    //         align: 'center',
    //         borderColor: '#1E9FFF',
    //         color: '#fff',
    //         borderWidth: 1,
    //         borderRadius: 5,
    //         padding: 5,
    //         height: 40,
    //         width: 100,
    //         offset: [0, 30],//节点文字与圆圈之间的距离
    //         fontSize: 15,
    //         // 节点文本阴影
    //         shadowBlur: 10,
    //         shadowColor: 'rgba(0,0,0,0.25)',
    //         shadowOffsetX: 0,
    //         shadowOffsetY: 2,
    //       }
    //     },
    //     leaves: { //叶子节点文本样式
    //       label: {
    //         //backgroundColor: '#81c5f7',
    //         backgroundColor: '#fff',
    //         color: '#333',
    //         position: 'bottom',
    //         rotate: 0,//标签旋转。
    //         verticalAlign: 'middle',
    //         align: 'center',
    //         //文本框内文字超过6个字折行
    //         /* formatter: function(val) {
    //          let strs = val.name.split(''); //字符串数组
    //          let str = ''
    //          for(let i = 0, s; s = strs[i++];) { //遍历字符串数组
    //            str += s;
    //            if(!(i % 6)) str += '\n'; //按需要求余，目前是一个字换一行
    //          }
    //          return str
    //          }, */
    //         //或者
    //         overflow: 'break',//break为文字折行，  truncate为文字超出部分省略号显示
    //         lineOverflow: 'truncate',//文字超出高度后 直接截取
    //       }
    //     },
    //     // expandAndCollapse: true, //默认展开树形结构
    //     animationDuration: 550,
    //     animationDurationUpdate: 750
    //   }]
    // };
    // window.onresize = function () {
    //   myChart.resize();
    // }
    // if (option && typeof option === "object") {
    //   myChart.setOption(option, true);
    //   //节点切换显示
    //   myChart.on('mousedown', (e: any) => {
    //     const name = e.data?.name;
    //     const curNode = myChart._chartsViews[0]._data.tree._nodes.find((item: any) => {
    //       return item.name === name;
    //     });
    //     const depth = curNode.depth;
    //     const curIsExpand = curNode.isExpand;
    //     myChart._chartsViews[0]._data.tree._nodes.forEach((item: any, index: any) => {
    //       if (item.depth === depth && item.name !== name && !curIsExpand) {
    //         item.isExpand = false;
    //       }
    //     });
    //   })
    // }
  }

  ngOnInit(): void {
  }

}
