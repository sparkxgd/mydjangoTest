var $;
layui.config({
	base : "js/"
}).use(['form','layer','jquery'],function(){
	var form = layui.form,
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		$ = layui.jquery;
	/**
	 * 密码验证
	 */
	form.verify({
		password: [/(.+){6,12}$/, '密码必须6到12位']
		,repassword: function(value){
			var passvalue = $('#password').val();
			if(value != passvalue){
				return '两次输入的密码不一致!';
			}
		}
	});
 	form.on("submit(updatepassword)",function(data){
 		var index;
 		 $.ajax({//异步请求返回给后台
	    	  url:'update_user',
	    	  type:'POST',
	    	  data:data.field,
	    	  dataType:'json',
	    	  beforeSend: function(re){
	    		  index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
	          },
	    	  success:function(d){
	    			//弹出loading
			    	top.layer.close(index);
			  		top.layer.msg("修改成功！");
			   		layer.closeAll("iframe");
			  	 	//刷新父页面
			  	 	parent.location.reload();
		    		
	    	  },
	    	  error:function(XMLHttpRequest, textStatus, errorThrown){
	    		  top.layer.msg('保存失败！！！服务器有问题！！！！<br>请检测服务器是否启动？', {
	    		        time: 20000, //20s后自动关闭
	    		        btn: ['知道了']
	    		      });
	           }
	      });
 		return false;
 	})
	
})
