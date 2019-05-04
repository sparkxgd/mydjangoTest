layui.config({
	base : "js/"
}).use(['form','layer','jquery','laypage','table'],function(){
	var form = layui.form,
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage,
		table = layui.table,
		$ = layui.$;

//==================一个table实例================================
	  table.render({
	    elem: '#demo',//渲染对象
	    height: 'full-88',//表格高度
	    url: 'getDepms', //数据接口
	    where: {key: ''},//给后台传的参数
	    page: true, //开启分页
	    limit: 10,//每页显示信息条数
	    id: 'testReload',
	    cols: [[ //表头
	      {field: 'id', title: 'ID', sort: true, fixed: 'left'}
	      ,{field: 'depname', title: '姓名',lign:'center'}
	      ,{field: 'create_time', title: '加入日期', lign:'center'} 
	      ,{field: 'status', title: '状态',align:'center',width:80,
	    	  templet: function(d){
    		  if(d.status==1){
    			  return '<span class="layui-badge layui-bg-orange">异常</span>';
    		  }else{
    			  return '<span class="layui-badge layui-bg-blue">正常</span>';
    		  }}
	      }
	      ,{fixed: 'right',  align:'center', toolbar: '#barDemo'} //这里的toolbar值是模板元素的选择器
	    ]]
	  });
	  
//====================点击【搜索】按钮事件===========================
  var active = {
		  reload : function() {
			  var demoReload = $('#demoReload');
							// 执行重载
			  table.reload('testReload', {
				  page : {
					  curr : 1// 重新从第 1 页开始
					  },
					  where : {//要查询的字段
						  key : demoReload.val(),
						  id : 11
						  }
					  });
			  }
  };
  /**
   * 点击操作后刷新数据
   */
  var active_op = {
		  reload : function() {
			  var demoReload = $('#demoReload');
							// 执行重载
			  table.reload('testReload', {//reload重新加载
					  where : {//要查询的字段
						  key : demoReload.val(),
						  }
					  });
			  }
  };
//绑定搜索事件
  $('.layui-btn').on('click', function() {
	  var type = $(this).data('type');
	  active[type] ? active[type].call(this) : '';
	  });
  
//=============绑定【添加】事件============================
	$(window).one("resize",function(){
		$(".add_btn").click(function(){//基于框架做的
				var index = layui.layer.open({
					title : "【添加开发者信息】",
					icon: 2,
					type : 2,
					skin: 'layui-layer-lan',
					area: ['600px', '400px'],
					content : "openDepmerAdd",//加载某一张页面
					success : function(layero, index){//等同于js异步提交
						setTimeout(function(){
							layui.layer.tips('点击此处返回列表', '.layui-layer-setwin .layui-layer-close', {
								tips: 3
							});
						},500)
					}
				})			
		})
	}).resize();
  
//=======================监听工具条====================================
	table.on('tool(test)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
	  var data = obj.data; //获得当前行数据
	  var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
	  var tr = obj.tr; //获得当前行 tr 的DOM对象
	 
	  if(layEvent === 'detail'){ //查看
		 var index = layui.layer.open({
              title : "查看信息",
              type : 2,
              area: ['1000px', '600px'],
              content : "openTaskShow?id="+data.id,
              success : function(layero, index){
                  setTimeout(function(){
                      layui.layer.tips('点击此处返回列表', '.layui-layer-setwin .layui-layer-close', {
                          tips: 3
                      });
                  },500)
              }
          })          
	  } else if(layEvent === 'del'){
		  //删除
		  layer.confirm('确定删除此信息？',{icon:3, title:'提示信息'},function(index){
				var msgid;
				//向服务端发送删除指令
		 		 $.ajax({//异步请求返回给后台
			    	  url:'delDepmer',
			    	  type:'POST',
			    	  data:{"id":data.id},
			    	  dataType:'json',
			    	  beforeSend: function(re){
			    		  msgid = top.layer.msg('数据处理中，请稍候',{icon: 16,time:false,shade:0.8});
			          },
			    	  success:function(d){
			    		  top.layer.close(msgid);
			    		  if(d.result){
			    			//弹出loading
						   	obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
						  	 //刷新父页面
						   	active_op.reload();
			    		  }else{
			    			  top.layer.msg("操作失败！，数据库操作有问题！！");
			    		  }
				    		
			    	  },
			    	  error:function(XMLHttpRequest, textStatus, errorThrown){
			    		  top.layer.msg('操作失败！！！服务器有问题！！！！<br>请检测服务器是否启动？', {
			    		        time: 20000, //20s后自动关闭
			    		        btn: ['知道了']
			    		      });
			           }
			      });
		 //关闭当前提示	
	      layer.close(index);
	    });
	  } else if(layEvent === 'edit'){
			var index = layui.layer.open({
				title : "【修改开发者信息】",
				icon: 2,
				type : 2,
				skin: 'layui-layer-lan',
				area: ['600px', '400px'],
				content : "openDepmerEdit?id="+data.id,
				success : function(layero, index){//等同于js异步提交
					setTimeout(function(){
						layui.layer.tips('点击此处返回列表', '.layui-layer-setwin .layui-layer-close', {
							tips: 3
						});
					},500)
				}
			})			
	  }
	});
})


