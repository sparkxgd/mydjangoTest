var $;
layui.config({
	base : "js/"
}).use(['form','layer','jquery'],function(){
	var form = layui.form,
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		laypage = layui.laypage;
		$ = layui.jquery;
		var id=$("input[name='id']").val();
		//加载页面数据
		$.get("getTaskShow?id="+id, function(data){
			var d=data.m;
			var sl=data.sl;
			var szl=data.szl;
	        	//执行加载数据的方法
	        	$("input[name='title']").val(d.title);
	        	$("input[name='create_time']").val(d.create_time);
	        	$("input[name='deadline']").val(d.deadline);
	        	$("input[name='executor']").val(d.executor);
	        	$("input[name='finish_time']").val(d.finish_time);
	        	if(d.status==1){
	        		$("input[name='status']").val("已完成");
	        	}else{
	        		$("input[name='status']").val("未完成");
	        	}
	        	
	        	$("textarea[name='content']").val(d.content);
	        	
	        	form.render();//必须要再次渲染，要不然option显示不出来
		})

 	form.on("submit(update)",function(data){
		  layer.confirm('确定完成任务？',{icon:3, title:'提示信息'},function(index){
			var msgid;
	 		 $.ajax({//异步请求返回给后台
		    	  url:'updateTask',
		    	  type:'POST',
		    	  data:data.field,
		    	  dataType:'json',
		    	  beforeSend: function(re){
		    		  msgid = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
		          },
		    	  success:function(d){
		    			//弹出loading
				    	top.layer.close(index);
				  		top.layer.msg("操作成功！");
				   		layer.closeAll("iframe");
				  	 		//刷新父页面
				  	 	parent.location.reload();
			    		
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
		  })
 	})
})
