
 
$(function(){

    queryAll(1);


    
    
})

 var currentPage = 1;

//查询所有正常询盘
 function queryAll(page){
	
	var process = $('#select_process').find('option:selected').text();
	if(process == undefined || process.trim() == "工艺"){
	   process = "";
	}
	var product = $('#product_name').val();
	if(product == undefined){
		product  == "";factory_quote_list.html
	}

	var quoteStatus = null;
	var str = window.location.search;
	if(str != null && str != ''){
		quoteStatus = str.substr(1);
		quoteStatus = quoteStatus.split("&")[0].split("=")[1];
	}
    //判断当前报价状态，当为status为2时，显示为授盘给我
	var queryUrl = "";
	/*if(quoteStatus == 2){
		$('.supplier_management .repeat').show();
	}else{
		$('.supplier_management .repeat').hide();
	};*/
	if(quoteStatus == 2 || quoteStatus == 3 || quoteStatus == 5){

	    $('.supplier_management #quote_ul li').hover(function(){
	       	$(this).find('span').show();
	       	$(this).find('a').css({'color':'#006dcc'});
	       	$(this).siblings().not('.supplier_management #quote_ul li:eq(4)').find('span').hide();
	   	    $(this).siblings().not('.supplier_management #quote_ul li:eq(4)').find('a').css({'color':'#333'});
	   	    $('.supplier_management #quote_ul li:eq(4)').find('a').css({'color':'#006dcc'});
		 	$('.supplier_management #quote_ul li:eq(4)').find('span').show();
	   	    
	    });
	    $('.supplier_management #quote_ul li').mouseout(function(){
	    	$('.supplier_management #quote_ul li').not('.supplier_management #quote_ul li:eq(4)').find('span').hide();
	    	$('.supplier_management #quote_ul li').not('.supplier_management #quote_ul li:eq(4)').find('a').css({'color':'#333'});
	    });
		$('.supplier_management #quote_ul li:eq(4)').find('a').css({'color':'#006dcc'});
	 	$('.supplier_management #quote_ul li:eq(4)').find('span').show();
		
		
		queryUrl = "/inquiry/queryFinishQuoteList.do";
	}else if(quoteStatus == 7){
	    $('.supplier_management #quote_ul li').hover(function(){      	
	       	$(this).find('span').show();
	       	$(this).find('a').css({'color':'#006dcc'});
	       	$(this).siblings().not('.supplier_management #quote_ul li:eq(5)').find('span').hide();
	   	    $(this).siblings().not('.supplier_management #quote_ul li:eq(5)').find('a').css({'color':'#333'});
	   	    $('.supplier_management #quote_ul li:eq(5)').find('a').css({'color':'#006dcc'});
		 	$('.supplier_management #quote_ul li:eq(5)').find('span').show();
	   	    
	    });
	    $('.supplier_management #quote_ul li').mouseout(function(){  	
	    	$('.supplier_management #quote_ul li').not('.supplier_management #quote_ul li:eq(5)').find('span').hide();
	    	$('.supplier_management #quote_ul li').not('.supplier_management #quote_ul li:eq(5)').find('a').css({'color':'#333'});
	    });
		$('.supplier_management #quote_ul li:eq(5)').find('a').css({'color':'#006dcc'});
	 	$('.supplier_management #quote_ul li:eq(5)').find('span').show();
	 	
		queryUrl = "/inquiry/queryQuoteList.do";
	}else if(quoteStatus == 1){
	    $('.supplier_management #quote_ul li').hover(function(){      	
	       	$(this).find('span').show();
	       	$(this).find('a').css({'color':'#006dcc'});
	       	$(this).siblings().not('.supplier_management #quote_ul li:eq(3)').find('span').hide();
	   	    $(this).siblings().not('.supplier_management #quote_ul li:eq(3)').find('a').css({'color':'#333'});
	   	    $('.supplier_management #quote_ul li:eq(3)').find('a').css({'color':'#006dcc'});
		 	$('.supplier_management #quote_ul li:eq(3)').find('span').show();
	   	    
	    });
	    $('.supplier_management #quote_ul li').mouseout(function(){  	
	    	$('.supplier_management #quote_ul li').not('.supplier_management #quote_ul li:eq(3)').find('span').hide();
	    	$('.supplier_management #quote_ul li').not('.supplier_management #quote_ul li:eq(3)').find('a').css({'color':'#333'});
	    });
		$('.supplier_management #quote_ul li:eq(3)').find('a').css({'color':'#006dcc'});
	 	$('.supplier_management #quote_ul li:eq(3)').find('span').show();
		queryUrl = "/inquiry/queryQuoteList.do";
	}else if(quoteStatus == 100){
	    $('.supplier_management #quote_ul li').hover(function(){      	
	       	$(this).find('span').show();
	       	$(this).find('a').css({'color':'#006dcc'});
	       	$(this).siblings().not('.supplier_management #quote_ul li:eq(1)').find('span').hide();
	   	    $(this).siblings().not('.supplier_management #quote_ul li:eq(1)').find('a').css({'color':'#333'});
	   	    $('.supplier_management #quote_ul li:eq(1)').find('a').css({'color':'#006dcc'});
		 	$('.supplier_management #quote_ul li:eq(1)').find('span').show();
	   	    
	    });
	    $('.supplier_management #quote_ul li').mouseout(function(){  	
	    	$('.supplier_management #quote_ul li').not('.supplier_management #quote_ul li:eq(1)').find('span').hide();
	    	$('.supplier_management #quote_ul li').not('.supplier_management #quote_ul li:eq(1)').find('a').css({'color':'#333'});
	    });
		$('.supplier_management #quote_ul li:eq(1)').find('a').css({'color':'#006dcc'});
	 	$('.supplier_management #quote_ul li:eq(1)').find('span').show();
		queryUrl = "/inquiry/queryInvitation.do";
	}else if(quoteStatus == 101){
	    $('.supplier_management #quote_ul li').hover(function(){      	
	       	$(this).find('span').show();
	       	$(this).find('a').css({'color':'#006dcc'});
	       	$(this).siblings().not('.supplier_management #quote_ul li:eq(6)').find('span').hide();
	   	    $(this).siblings().not('.supplier_management #quote_ul li:eq(6)').find('a').css({'color':'#333'});
	   	    $('.supplier_management #quote_ul li:eq(6)').find('a').css({'color':'#006dcc'});
		 	$('.supplier_management #quote_ul li:eq(6)').find('span').show();
	   	    
	    });
	    $('.supplier_management #quote_ul li').mouseout(function(){  	
	    	$('.supplier_management #quote_ul li').not('.supplier_management #quote_ul li:eq(6)').find('span').hide();
	    	$('.supplier_management #quote_ul li').not('.supplier_management #quote_ul li:eq(6)').find('a').css({'color':'#333'});
	    });
		$('.supplier_management #quote_ul li:eq(6)').find('a').css({'color':'#006dcc'});
	 	$('.supplier_management #quote_ul li:eq(6)').find('span').show();
		queryUrl = "/inquiry/queryCollectList.do";
	}else if(quoteStatus == 102){
        $('.supplier_management #quote_ul li').hover(function(){
            $(this).find('span').show();
            $(this).find('a').css({'color':'#006dcc'});
            $(this).siblings().not('.supplier_management #quote_ul li:eq(2)').find('span').hide();
            $(this).siblings().not('.supplier_management #quote_ul li:eq(2)').find('a').css({'color':'#333'});
            $('.supplier_management #quote_ul li:eq(2)').find('a').css({'color':'#006dcc'});
            $('.supplier_management #quote_ul li:eq(2)').find('span').show();

        });
        $('.supplier_management #quote_ul li').mouseout(function(){
            $('.supplier_management #quote_ul li').not('.supplier_management #quote_ul li:eq(2)').find('span').hide();
            $('.supplier_management #quote_ul li').not('.supplier_management #quote_ul li:eq(2)').find('a').css({'color':'#333'});
        });
        $('.supplier_management #quote_ul li:eq(2)').find('a').css({'color':'#006dcc'});
        $('.supplier_management #quote_ul li:eq(2)').find('span').show();
        queryUrl = "/inquiry/queryMessageOrder.do";
    }else{
	    $('.supplier_management #quote_ul li').hover(function(){      	
	       	$(this).find('span').show();
	       	$(this).find('a').css({'color':'#006dcc'});
	       	$(this).siblings().not('.supplier_management #quote_ul li:eq(0)').find('span').hide();
	   	    $(this).siblings().not('.supplier_management #quote_ul li:eq(0)').find('a').css({'color':'#333'});
	   	    $('.supplier_management #quote_ul li:eq(0)').find('a').css({'color':'#006dcc'});
		 	$('.supplier_management #quote_ul li:eq(0)').find('span').show();
	   	    
	    });
	    $('.supplier_management #quote_ul li').mouseout(function(){  	
	    	$('.supplier_management #quote_ul li').not('.supplier_management #quote_ul li:eq(0)').find('span').hide();
	    	$('.supplier_management #quote_ul li').not('.supplier_management #quote_ul li:eq(0)').find('a').css({'color':'#333'});
	    });
		$('.supplier_management #quote_ul li:eq(0)').find('a').css({'color':'#006dcc'});
	 	$('.supplier_management #quote_ul li:eq(0)').find('span').show();
		queryUrl = "/inquiry/queryInquiryList.do";
	}
	
	$.post(
			queryUrl,
			{
	         "status":quoteStatus,
		     "process":process,
		     "product" : product,
		     "page" : page
			 },
			function(result){
		      if(result.state == 0){
		    	  var inquiryOrders = result.data.inquiryOrders;
		    	  var totalOrder = result.data.totalOrder;
		    	  var totalPage = Math.ceil(totalOrder/18);
		    	  var accepts = result.data.accepts;
                  var projectList = result.data.projectList;
                  var p_tl = projectList?projectList.length:0;
		    	  
		      	  if(totalOrder>0){
		    		  $('.cc0').find('em').text("("+totalOrder+")");  
		    	  }		
		    	  
		    	  
		      	  
		      	  //添加询盘信息
		    	  var tl = inquiryOrders.length;
		    	  $('#tbody1').empty();
		    	  $('#tbody2').empty();
		    	  for(var i=0;i<tl;i++){


                      //报价状态
                      var quoteState = inquiryOrders[i].quoteState;
                      var em = '';
                      var a_detail = '/rfq/'+inquiryOrders[i].orderId+'';
                      //判断是自营还是第三方询盘
                      if(inquiryOrders[i].csgOrderId == null || inquiryOrders[i].csgOrderId == ''){
                          a_detail = '/rfq/'+inquiryOrders[i].orderId+'';
                      }else{
                          a_detail = '/rfq/'+inquiryOrders[i].orderId+'';
                      }
		    		  if(quoteState == 5){
		    			 em = '<em class="em1"></em>';
		    			 // a_detail = '/zh/offer_detail.html?orderId='+inquiryOrders[i].orderId+'';
		    		  }else if(quoteState == 2){
		    			 em = '<em class="em7"></em>';
		    			 // a_detail = '/zh/offer_detail.html?orderId='+inquiryOrders[i].orderId+'';
		    		  }else if(quoteState == 3){
		    			 em = '<em class="em3"></em>';
		    			 // a_detail = '/zh/offer_detail.html?orderId='+inquiryOrders[i].orderId+'';
		    		  }else if(quoteState == 1){
		    			 em = '<em class="em2"></em>';
		    			 // a_detail = '/zh/offer_detail.html?orderId='+inquiryOrders[i].orderId+'';
		    		  }else if(quoteState == 4){
		    			 em = '<em class="em4"></em>';
		    			 // a_detail = '/zh/offer_detail.html?orderId='+inquiryOrders[i].orderId+'';
		    		  }else if(quoteState == 6){
		    			 em = '<em class="em5"></em>';
		    			 // a_detail = '/zh/offer_detail.html?orderId='+inquiryOrders[i].orderId+'';
		    		  }else if(quoteState == 7){
		    			 em = '<em class="em8"></em>';
		    			 // a_detail = '/zh/offer_detail.html?orderId='+inquiryOrders[i].orderId+'';
		    		  }
		    		  
		    		  
		    		  
		    		  //是否选择大货
		    		  if(accepts != null && accepts != '' && accepts != undefined){
		    			   if(accepts[i] == 0){
		    				   a_detail = '/zh/supplier_big_goods.html?orderId='+inquiryOrders[i].orderId+'';
				    	   }
		    		  }
		    		  
    	   	//获取国家对标国旗
	     	 var country = inquiryOrders[i].country;	
	    	 var flagSrc=getFlag(country); 		  
		     
	    	 var tr =  '<tr>'+
		              		'<td>'+
                            '<div class="div_video">'+
                            '<video src="'+(inquiryOrders[i].videoPath == null ? '' : inquiryOrders[i].videoPath)+'" controls loop></video>'+
	                        '<div class="close_button" onclick="closeVideo(this)"><span class="iconfont">&#xe643;</span></div>'+
	                        '</div>'+
		        			'<div class="imgs posirela">'+
		        			(inquiryOrders[i].videoPath == null ? '':'<div class="bf_botton" onclick="playVideo(this)"><span class="iconfont">&#xe626;</span><a title="点击观看3D"></a></div>')+
		        				'<div class="gq">'+
	        	                    '<img src="'+flagSrc+'" alt=""/>'+
		        				'</div>'+				        				
		        					'<img src="'+((inquiryOrders[i].drawingPathCompress == null || inquiryOrders[i].drawingPathCompress == '' ) ? '../images/pic2.png' : inquiryOrders[i].drawingPathCompress)+'" alt="" />'+                          				                                				
		        			'</div>	'+
		        		'</td>'+
		        		'<td><a href="'+a_detail+'" target="_blank"><span class="cc0 tab_a">'+(inquiryOrders[i].quoteTitle == null ? inquiryOrders[i].productName : inquiryOrders[i].quoteTitle)+'</span></a></td>'+
		        		'<td>'+
		        			'<span>'+(inquiryOrders[i].mainProcess == null ? '' : inquiryOrders[i].mainProcess)+'</span><br/>'+
		        			'<i>'+(inquiryOrders[i].annualQuantity == null ? '' : inquiryOrders[i].annualQuantity)+'</i>'+(inquiryOrders[i].quantityUnit == null ? '' : inquiryOrders[i].quantityUnit.split(",")[0])+
		        		'</td>'+
		        		'<td class="td_time">'+(new Date(inquiryOrders[i].publishDate.replace(/-/g,"/").split(".")[0])).Format("yyyy-MM-dd")+'</td>'+
		        		'<td>'+(inquiryOrders[i].state == 1 ? '江浙沪' : (inquiryOrders[i].state == 2 ? '深圳、广东、福建' : '不限'))+em+'</td>'+
		        	'</tr>';
		    		  if(i % 2 == 0){
		    			  $('#tbody1').append(tr);
		    		  }else if(i % 2 == 1){
		    			  $('#tbody2').append(tr); 
		    		  };    		
		    	  };
		    	  
		    	  $('#page_ul').empty();
		    	  var li = "";
		    	  if(totalPage == 0 || totalPage == 1){
		    		  li =    '<li class="li0"><a class="c-hide">&lt;&lt;</a></li><li class="active"><a href="#">1</a></li>'+
				    			  '<li class="li0">'+
		                          '<a class="c-hide">&gt;&gt;</a>'+
		                          '</li>';		    		  		    		  
		    	  }else{
		    		  var li_s = "";
		    		  for(var k=0;k<totalPage;k++){
		    			  if(k == totalPage - 2){
		    				  li_s += "<li class='active'><a onclick='queryByPage("+(k+1)+")'>"+(k+1)+"</a></li>";
		    			  }else{
		    				  li_s += "<li><a onclick='queryByPage("+(k+1)+")'>"+(k+1)+"</a></li>";
		    			  }		    			     
		    		  }
		    		  
		    		 
		    		  //第一页 前面的不能点击
		    		 if(page == 1){
			    		 li =  '<li class="li0" ><a class="c-hide">&lt;&lt;</a></li>'+li_s+
			    			    '<li class="li0">'+
		                        '<a class="c-show" onclick="queryByPage('+(currentPage+1)+')">&gt;&gt;</a>'+
		                        '</li>';	
		    		  }else if(page == totalPage){
		    			  li =  '<li class="li0"><a onclick="queryByPage('+(currentPage-1)+')" class="c-show">&lt;&lt;</a></li>'+li_s+
			    			    '<li class="li0">'+
		                        '<a class="c-hide">&gt;&gt;</a>'+
		                        '</li>';	 
		    		  }else{
		    			  li =  '<li class="li0"><a class="c-show" onclick="queryByPage('+(currentPage-1)+')" class="c-show">&lt;&lt;</a></li>'+li_s+
			    			    '<li class="li0">'+
		                        '<a class="c-show" onclick="queryByPage('+(currentPage+1)+')">&gt;&gt;</a>'+
		                        '</li>';	 
		    		  } 

		    	  }
		    	  if(quoteStatus!=2){
                      $('#page_ul').append(li);
                      $('#page_ul').find('li').eq(page).addClass('active').siblings().removeClass('active');
				  }else{
		    	  	  //返单项目列表
					  /*for(var j=0;j<p_tl;j++){
							 var repeat =  '<table class="table table-bordered" onclick="goUpload(\''+projectList[j].projectNo+'\',\''+projectList[j].factoryId+'\')">'+
												 '<tbody>'+
												 ' <tr>'+
												 '<td>' +
												 '<div class="imgs posirela">'+
												 '<img src="'+((projectList[j].productImg == null || projectList[j].productImg == '' ) ? '/images/pic2.png' : 'http://112.64.174.34:10010/product_img/'+projectList[j].productImg)+'" alt="" />'+
												 '</div>'+
								                 '</td>'+
												 '<td>翻单项目号:</td>'+
												 '<td>'+(projectList[j].projectNo == null?"":projectList[j].projectNo)+'</td>'+
												 '<td>交期:</td>'+
												 '<td>'+(projectList[j].deliveryDate == null ? '暂无':projectList[j].deliveryDate)+'</td>'+
												 '</tr>'+
												 '</tbody>'+
												 '</table>';
							 $('.repeat').append(repeat);
					    }*/
					//返单项目列表
					  for(var j=0;j<p_tl;j++){
						  var tr = 
							 ' <tr onclick="goUpload(\''+projectList[j].projectNo+'\',\''+projectList[j].factoryId+'\')">'+
							 '<td>' +
							 '<div class="imgs posirela">'+
							 '<img src="'+((projectList[j].productImg == null || projectList[j].productImg == '' ) ? '/images/pic2.png' : 'http://112.64.174.34:10010/product_img/'+projectList[j].productImg)+'" alt="" />'+
							 '</div>'+
			                 '</td>'+
							 '<td>翻单项目号:</td>'+
							 '<td>'+(projectList[j].projectNo == null?"":projectList[j].projectNo)+'</td>'+
							 '<td>交期:</td>'+
							 '<td>'+(projectList[j].deliveryDate == null ? '暂无':projectList[j].deliveryDate)+'<em class="em3"></em></td>'+
							 '</tr>';
							 
						  
						  if(j % 2 == 0){
			    			  $('#tbody3').append(tr);
			    		  }else if(j % 2 == 1){
			    			  $('#tbody4').append(tr); 
			    		  };  
					  };
					  
					  
					  
				  }
		    	  		    	  		    	  
//		    	  compare();
		    	  
		    	
		    	  
		    	  
		    	  
		    	  
		    	  
		    	  
	    	     /*table隔行换色*/
	    	      $('.supplier_management_7 tbody tr:even').css({
	    	    	'background-color':'#f9f9f9'
	    	      })
		      }else if(result.state == 2){
		          //如果还未登录，跳转登录页
		    	  window.location = "/zh/login.html";
		      }  
		  })	
		  
		  
} 

 /*视频播放控制*/
 function playVideo(obj){
//	var $video = $(obj).siblings('.div_video').find('video');
//	$video.get(0).play();	
	$(obj).siblings('.div_video').show();
	$('#tbody1').find('.div_video').hide().removeAttr('autoplay');
	$('#tbody2').find('.div_video').hide().removeAttr('autoplay');
 	$(obj).parent().prev().show().find('video').attr('autoplay',true);
 	var $video = $(obj).parent().prev().find('video');
 	$video.get(0).play();
 	
    var div_h = $('.div_video').height();
	var video_h =  $(obj).parent().siblings('.div_video').find('video').height();
    var m_t = (div_h - video_h)/2;
    $(obj).parent().siblings('.div_video').find('video').css({'margin-top':m_t +'px'}); 
    	
 }
 function closeVideo(obj){
 	$(obj).parent().hide().find('video').removeAttr('autoplay');
 	var $video = $(obj).parent().find('video');
 	$video.get(0).pause();
 }

 //根据工艺筛选
 function queryByProcess(obj){
    queryAll(1);	
 }
 //根据工艺筛选
 function queryByKey(obj){
    queryAll(1);	
 }
 
 function queryByPage(page){
	 if(page == currentPage){
		 return false;
	 }else{
		 currentPage = page;		 
		 queryAll(page);	 
	 }
 }


//跳转更新页面
function goUpload(csgOrderId,supplierId) {
    var base = new Base64();
    var supplierIdD = base.encode(supplierId);
    window.location = '/report/reportList?csgOrderId='+ csgOrderId +'&supplierId='+supplierIdD;
}


 //根据选择的checkbox添加收藏
 function collect_inquiry(){
	var orderIds = '';
	$('#total_div').find('tbody').find('input:checkbox').each(function(){		
		if($(this).is(':checked')){
			var orderId = $(this).next().val();
			orderIds += orderId + ",";
		}	
	})
	
	if(orderIds == ''){
		return false;
	}
	
	$.post("/inquiry/addCollect.do",
			{
		     "orderIds":orderIds
			 },
			function(result){				 
				if(result.state == 0){
					easyDialog.open({
						  container : {
						    content : '收藏成功'
						  },
			    		  overlay : false,
			    		  autoClose : 1000
						});
				}else{
					easyDialog.open({
						  container : {
						    content : '收藏失败'
						  },
			    		  overlay : false,
			    		  autoClose : 1000
						});
				} 
		    })
 }
 
 
 //查询订单详情
 function queryDetails(orderId){
    window.location = "/zh/offer_detail.html?orderId="+orderId;
 }
 
 
 
 function compare(){
		/*侧边栏长度控制效果*/
		var h1 = $(document.body).height() +230;
		var h2 = window.screen.availHeight  ;

		if(h1 < h2){
			$('#footer').addClass('footer1');
		}else{
			$('#footer').removeClass('footer1');
		}
} 
 
 function dateFormat(dateString,format) {
     if(!dateString)return "";
     var time = new Date(dateString.replace(/-/g,'/').replace(/T|Z/g,' ').trim());
     var o = {
         "M+": time.getMonth() + 1, //月份
         "d+": time.getDate(), //日
         "h+": time.getHours(), //小时
         "m+": time.getMinutes(), //分
         "s+": time.getSeconds(), //秒
         "q+": Math.floor((time.getMonth() + 3) / 3), //季度
         "S": time.getMilliseconds() //毫秒
     };
     if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
     for (var k in o)
         if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
     return format;
 }
 
 

/** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
     可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
     Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423      
  * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
  * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
  * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
  * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
  */        
// Date.prototype.pattern=function(fmt) {         
//     var o = {         
//     "M+" : this.getMonth()+1, //月份         
//     "d+" : this.getDate(), //日         
//     "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
//     "H+" : this.getHours(), //小时         
//     "m+" : this.getMinutes(), //分         
//     "s+" : this.getSeconds(), //秒         
//     "q+" : Math.floor((this.getMonth()+3)/3), //季度         
//     "S" : this.getMilliseconds() //毫秒         
//     };         
//     var week = {         
//     "0" : "/u65e5",         
//     "1" : "/u4e00",         
//     "2" : "/u4e8c",         
//     "3" : "/u4e09",         
//     "4" : "/u56db",         
//     "5" : "/u4e94",         
//     "6" : "/u516d"        
//     };         
//     if(/(y+)/.test(fmt)){         
//         fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
//     }         
//     if(/(E+)/.test(fmt)){         
//         fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
//     }         
//     for(var k in o){         
//         if(new RegExp("("+ k +")").test(fmt)){         
//             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
//         }         
//     }         
//     return fmt;         
// }       
      


 
 
 
 
 
 
