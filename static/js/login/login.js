layui.config({
	base : "js/"
}).use(['form','layer','jquery'],function(){
	var form = layui.form,
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		$ = layui.jquery;
	
	//video背景
	$(window).resize(function(){
		if($(".video-player").width() > $(window).width()){
			$(".video-player").css({"height":$(window).height(),"width":"auto","left":-($(".video-player").width()-$(window).width())/2});
		}else{
			$(".video-player").css({"width":$(window).width(),"height":"auto","left":-($(".video-player").width()-$(window).width())/2});
		}
	}).resize();
	
	
	//登录按钮事件
	form.on("submit(login)",function(data){
		console.log(data.field);
 		var index;
 		 $.ajax({//异步请求返回给后台
	    	  url:'/myweb/login',
	    	  type:'POST',
	    	  data:data.field,
	    	  dataType:'json',
	    	  beforeSend: function(re){
	    		  index = top.layer.msg('登录中',{icon: 16,time:false,shade:0.8});
	          },
	          success:function(d){
	        	  	var r=d.result;
	        	  	console.log(r);
	        	  		if(r==0){
					  		top.layer.msg("登陆成功！");
					  		window.location.href='/myweb';
		        	  	}
		        	  	else if(r==1){
		        	  		layer.open({
		                        content: '密码错误！',
		                        btn: ['确认'],
		                        yes: function(index, layero) {
		                            window.location.href='/myweb';
		                        }
		                    });
		        	  	}
		        	  	else if(r==2){
		        	  		layer.open({
		                        content: '用户不存在！',
		                        btn: ['确认',],
		                        yes: function(index, layero) {
		                            window.location.href='/myweb';
		                        }
		                    });
		        	  	} 			
	           }	 
 		 })
 		 return false;
	})
})
