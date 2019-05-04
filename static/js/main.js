layui.config({
	base : "js/"
}).use(['form','element','layer','jquery','table'],function(){
	var form = layui.form,
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		element = layui.element,
		table = layui.table,
		$ = layui.jquery;

	$(".panel a").on("click",function(){
		window.parent.addTab($(this));
	});
	
	// ==================一个table实例================================
	  table.render({
	    elem: '#demo',// 渲染对象
	    height: 315,// 表格高度
	    url: 'getTaskList', // 数据接口
	    where: {key: ''},// 给后台传的参数
	    page: true, // 开启分页
	    limit: 10,// 每页显示信息条数
	    id: 'testReload',
	    cols: [[ // 表头
	      {field: 'id', title: 'ID', sort: true, fixed: 'left'}
	      ,{field: 'title', title: '任务标题',lign:'center'}
	      ,{field: 'create_time', title: '开始时间', lign:'center'}
	      ,{field: 'deadline', title: '截止时间', lign:'center'} 
	      ,{field: 'depname', title: '执行人',align:'center' }
	      ,{field: 'status', title: '状态',align:'center',
	    	  templet: function(d){
	    		  if(d.status==1){
	    			  return '<span style="color:green;">已完成</span>';
	    		  }else{
	    			  return '<span style="color:red;">未完成</span>';
	    		  }}  
	      }
	      ,{fixed: 'right',  align:'center', toolbar: '#barDemo'} // 这里的toolbar值是模板元素的选择器
	    ]]
	  });
		
 	
 // ///////////////////////////////
 // 基于准备好的dom，初始化echarts实例
         var myChart = echarts.init(document.getElementById('tubiao'));
         var option = {
        		    tooltip : {
        		        trigger: 'axis'
        		    },
        		    calculable : true,
        		    legend: {
        		        data:['未完成','已完成','总任务']
        		    },
        		    xAxis : [
        		        {
        		            type : 'category',
        		            splitLine : {show : false},
        		            data : ['王驰','李金鹏','李颖鹏','杨正旺','李洋','蒋霜','卢英剑','肖老师','梁老师']
        		        }
        		    ],
        		    yAxis : [
        		        {
        		            type : 'value',
        		            position: 'right'
        		        }
        		    ],
        		    series : [
        		        {
        		            name:'未完成',
        		            type:'bar',
        		            stack: '总任务',
        		            label: {
        		            	formatter: '{a}',
        		                normal: {
        		                    show: true
        		                }
        		            },
        		            data:[]
        		        },
        		        {
        		            name:'已完成',
        		            type:'bar',
        		            stack: '总任务',
        		            label: {
        		            	formatter: '{a}',
        		                normal: {
        		                    show: true
        		                }
        		            },
        		            itemStyle: {
          		            	 normal: {
          		            		 label: {
          		            			 show: true,
          		            			 position: 'top',
          		            			 formatter: '{a}\n{c}'
          		            		 }
          		            	 }
           		            },
        		            data:[]
        		        },
        		        {
        		            name:'总任务',
        		            type:'line',
        		            data:[]
        		        },

        		        {
        		            name:'工程任务',
        		            type:'pie',
        		            tooltip : {
        		                trigger: 'item',
        		                formatter: '{a} <br/>{b} : {c} ({d}%)'
        		            },
        		            center:[130,100],
        		            radius:[0, 80],
        		            itemStyle:{
        		            	normal:{
        		                    labelLine : {
        		                        length : 20
        		                    }
        		                }
        		            },
        		            data:[]
        		        }
        		    ]
        		};
         // 使用刚指定的配置项和数据显示图表。
 myChart.setOption(option);
 var names=[];    // 成员名单数组
 var totalTask=[];    // 总完成数组
// 异步加载数据
 $.get('getTaskTubiaoinfo').done(function (data) {
		 var list = data.names;
         for(var i=0;i<list.length;i++){
        	 names.push(list[i].name);    // 遍历成员并填入数组
        	 totalTask.push(list[i].totalTask);
         }
	 
     // 填入数据
     myChart.setOption({
         xAxis: {
             data: names
         },
         series: [{
             // 根据名字对应到相应的系列
             name: '未完成',
             data:data.ncList
         },
         {
             // 根据名字对应到相应的系列
             name: '已完成',
             data: data.cList
         },
         {
             // 根据名字对应到相应的系列
             name: '总任务',
             data: totalTask
         },
         {
             // 根据名字对应到相应的系列
             name: '工程任务',
             data: data.allList
         }
         ]
     });
     });
//处理点击事件并且跳转到相应的百度搜索页面
 myChart.on('click', 'series', function (params) {
	 var index = layui.layer.open({
         title : "查看信息",
         type : 2,
         area: ['1000px', '600px'],
         content : "openStuTask?stuid="+params.name,
         success : function(layero, index){
             setTimeout(function(){
                 layui.layer.tips('点击此处返回列表', '.layui-layer-setwin .layui-layer-close', {
                     tips: 3
                 });
             },500)
         }
     }) 
 });
 function createRandomItemStyle() {
     return {
         normal: {
             color: 'rgb(' + [
                 Math.round(Math.random() * 160),
                 Math.round(Math.random() * 160),
                 Math.round(Math.random() * 160)
             ].join(',') + ')'
         }
     };
 }
 var myChart2 = echarts.init(document.getElementById('myChart2'));
 var option2 = {
		    backgroundColor: '#1b1b1b',
		    tooltip : {
		        formatter: "{a} <br/>{c} {b}"
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    series : [
		        {
		            name:'速度',
		            type:'gauge',
		            min:0,
		            max:220,
		            splitNumber:11,
		            axisLine: {            // 坐标轴线
		                lineStyle: {       // 属性lineStyle控制线条样式
		                    color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
		                    width: 3,
		                    shadowColor : '#fff', //默认透明
		                    shadowBlur: 10
		                }
		            },
		            axisLabel: {            // 坐标轴小标记
		                textStyle: {       // 属性lineStyle控制线条样式
		                    fontWeight: 'bolder',
		                    color: '#fff',
		                    shadowColor : '#fff', //默认透明
		                    shadowBlur: 10
		                }
		            },
		            axisTick: {            // 坐标轴小标记
		                length :15,        // 属性length控制线长
		                lineStyle: {       // 属性lineStyle控制线条样式
		                    color: 'auto',
		                    shadowColor : '#fff', //默认透明
		                    shadowBlur: 10
		                }
		            },
		            splitLine: {           // 分隔线
		                length :25,         // 属性length控制线长
		                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
		                    width:3,
		                    color: '#fff',
		                    shadowColor : '#fff', //默认透明
		                    shadowBlur: 10
		                }
		            },
		            pointer: {           // 分隔线
		                shadowColor : '#fff', //默认透明
		                shadowBlur: 5
		            },
		            title : {
		                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
		                    fontWeight: 'bolder',
		                    fontSize: 20,
		                    fontStyle: 'italic',
		                    color: '#fff',
		                    shadowColor : '#fff', //默认透明
		                    shadowBlur: 10
		                }
		            },
		            detail : {
		                backgroundColor: 'rgba(30,144,255,0.8)',
		                borderWidth: 1,
		                borderColor: '#fff',
		                shadowColor : '#fff', //默认透明
		                shadowBlur: 5,
		                offsetCenter: [0, '50%'],       // x, y，单位px
		                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
		                    fontWeight: 'bolder',
		                    color: '#fff'
		                }
		            },
		            data:[{value: 40, name: 'km/h'}]
		        },
		        {
		            name:'转速',
		            type:'gauge',
		            center : ['25%', '55%'],    // 默认全局居中
		            radius : '50%',
		            min:0,
		            max:7,
		            endAngle:45,
		            splitNumber:7,
		            axisLine: {            // 坐标轴线
		                lineStyle: {       // 属性lineStyle控制线条样式
		                    color: [[0.29, 'lime'],[0.86, '#1e90ff'],[1, '#ff4500']],
		                    width: 2,
		                    shadowColor : '#fff', //默认透明
		                    shadowBlur: 10
		                }
		            },
		            axisLabel: {            // 坐标轴小标记
		                textStyle: {       // 属性lineStyle控制线条样式
		                    fontWeight: 'bolder',
		                    color: '#fff',
		                    shadowColor : '#fff', //默认透明
		                    shadowBlur: 10
		                }
		            },
		            axisTick: {            // 坐标轴小标记
		                length :12,        // 属性length控制线长
		                lineStyle: {       // 属性lineStyle控制线条样式
		                    color: 'auto',
		                    shadowColor : '#fff', //默认透明
		                    shadowBlur: 10
		                }
		            },
		            splitLine: {           // 分隔线
		                length :20,         // 属性length控制线长
		                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
		                    width:3,
		                    color: '#fff',
		                    shadowColor : '#fff', //默认透明
		                    shadowBlur: 10
		                }
		            },
		            pointer: {
		                width:5,
		                shadowColor : '#fff', //默认透明
		                shadowBlur: 5
		            },
		            title : {
		                offsetCenter: [0, '-30%'],       // x, y，单位px
		                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
		                    fontWeight: 'bolder',
		                    fontStyle: 'italic',
		                    color: '#fff',
		                    shadowColor : '#fff', //默认透明
		                    shadowBlur: 10
		                }
		            },
		            detail : {
		                //backgroundColor: 'rgba(30,144,255,0.8)',
		               // borderWidth: 1,
		                borderColor: '#fff',
		                shadowColor : '#fff', //默认透明
		                shadowBlur: 5,
		                width: 80,
		                height:30,
		                offsetCenter: [25, '20%'],       // x, y，单位px
		                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
		                    fontWeight: 'bolder',
		                    color: '#fff'
		                }
		            },
		            data:[{value: 1.5, name: 'x1000 r/min'}]
		        },
		        {
		            name:'油表',
		            type:'gauge',
		            center : ['75%', '50%'],    // 默认全局居中
		            radius : '50%',
		            min:0,
		            max:2,
		            startAngle:135,
		            endAngle:45,
		            splitNumber:2,
		            axisLine: {            // 坐标轴线
		                lineStyle: {       // 属性lineStyle控制线条样式
		                    color: [[0.2, 'lime'],[0.8, '#1e90ff'],[1, '#ff4500']],
		                    width: 2,
		                    shadowColor : '#fff', //默认透明
		                    shadowBlur: 10
		                }
		            },
		            axisTick: {            // 坐标轴小标记
		                length :12,        // 属性length控制线长
		                lineStyle: {       // 属性lineStyle控制线条样式
		                    color: 'auto',
		                    shadowColor : '#fff', //默认透明
		                    shadowBlur: 10
		                }
		            },
		            axisLabel: {
		                textStyle: {       // 属性lineStyle控制线条样式
		                    fontWeight: 'bolder',
		                    color: '#fff',
		                    shadowColor : '#fff', //默认透明
		                    shadowBlur: 10
		                },
		                formatter:function(v){
		                    switch (v + '') {
		                        case '0' : return 'E';
		                        case '1' : return 'Gas';
		                        case '2' : return 'F';
		                    }
		                }
		            },
		            splitLine: {           // 分隔线
		                length :15,         // 属性length控制线长
		                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
		                    width:3,
		                    color: '#fff',
		                    shadowColor : '#fff', //默认透明
		                    shadowBlur: 10
		                }
		            },
		            pointer: {
		                width:2,
		                shadowColor : '#fff', //默认透明
		                shadowBlur: 5
		            },
		            title : {
		                show: false
		            },
		            detail : {
		                show: false
		            },
		            data:[{value: 0.5, name: 'gas'}]
		        },
		        {
		            name:'水表',
		            type:'gauge',
		            center : ['75%', '50%'],    // 默认全局居中
		            radius : '50%',
		            min:0,
		            max:2,
		            startAngle:315,
		            endAngle:225,
		            splitNumber:2,
		            axisLine: {            // 坐标轴线
		                lineStyle: {       // 属性lineStyle控制线条样式
		                    color: [[0.2, 'lime'],[0.8, '#1e90ff'],[1, '#ff4500']],
		                    width: 2,
		                    shadowColor : '#fff', //默认透明
		                    shadowBlur: 10
		                }
		            },
		            axisTick: {            // 坐标轴小标记
		                show: false
		            },
		            axisLabel: {
		                textStyle: {       // 属性lineStyle控制线条样式
		                    fontWeight: 'bolder',
		                    color: '#fff',
		                    shadowColor : '#fff', //默认透明
		                    shadowBlur: 10
		                },
		                formatter:function(v){
		                    switch (v + '') {
		                        case '0' : return 'H';
		                        case '1' : return 'Water';
		                        case '2' : return 'C';
		                    }
		                }
		            },
		            splitLine: {           // 分隔线
		                length :15,         // 属性length控制线长
		                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
		                    width:3,
		                    color: '#fff',
		                    shadowColor : '#fff', //默认透明
		                    shadowBlur: 10
		                }
		            },
		            pointer: {
		                width:2,
		                shadowColor : '#fff', //默认透明
		                shadowBlur: 5
		            },
		            title : {
		                show: false
		            },
		            detail : {
		                show: false
		            },
		            data:[{value: 0.5, name: 'gas'}]
		        }
		    ]
		};
				                    
myChart2.setOption(option2);


clearInterval(timeTicket);
timeTicket = setInterval(function (){
    option.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
    option.series[1].data[0].value = (Math.random()*7).toFixed(2) - 0;
    option.series[2].data[0].value = (Math.random()*2).toFixed(2) - 0;
    option.series[3].data[0].value = (Math.random()*2).toFixed(2) - 0;
    myChart.setOption(option,true);
},2000)
 })


