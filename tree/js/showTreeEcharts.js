function showTreeEcharts(id, data) {

    let dom = document.getElementById(id);
    let myChart = echarts.init(dom);

    myChart.setOption({
        //显示节点信息的配置
        tooltip: {
            trigger: 'item',             //显示节点信息
            triggerOn: 'mousemove'       //鼠标移入时显示节点信息
        },
        series: [
            {
                type: 'tree',            //图表类型
                data: [data],            //图表数据（json）
                left: '0',               //图表坐标
                right: '0',
                top: '60px',
                bottom: '60px',

                symbolSize: 17,           //标记的大小，就是那个小圆圈，默认7
                orient: 'vertical',       //图表方向（这里设置为垂直方向）
                expandAndCollapse: false, //节点是否可展开和折叠（默认为true）

                //节点所对应的标签的样式
                label: {
                    position: 'left',            //标签的位置
                    verticalAlign: 'middle',     //文字垂直对齐方式，默认自动。
                    align: 'right',              //文字水平对齐方式，默认自动。
                    fontSize: 16
                },
                //叶子节点的特殊配置
                leaves: {
                    label: {
                        //position: 'bottom',
                    }
                }
            }
        ]
    });
}