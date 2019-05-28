var orderId;
var factoryId;
var realName;
$(function(){
	var str = window.location.search;
	if(str != null && str != ''){
		str = str.substr(1);
		orderId = str.split("&")[0].split("orderId=")[1];
		factoryId = str.split("&")[1].split("factoryId=")[1];
		realName = str.split("&")[2].split("username=")[1];
       	var base = new Base64();
     	orderId=base.decode(orderId);
     	factoryId=base.decode(factoryId);
     	realName=base.decode(realName);
		$('#order_id').val(orderId);
	}	
	$.post("/factoryInquiry/queryInquiryDetailSelf.do",	
			{"orderId" : orderId,
		     "factoryId" : factoryId,
		     "realName" : realName},
			 function(result){
			      if(result.state == 0){
			    	 var quoteInfo = result.data.quoteInfo; 
			    	 var products = result.data.products; 
			    	 var supplierQuoteInfos = result.data.supplierQuoteInfos; 
			    	 var supplierQuoteProductss = result.data.supplierQuoteProductss; 
			    	 var factoryUser = result.data.factoryUser; 
			    	 var factorys = result.data.factorys; 

			    	 
			    	 //如果是报价助理，不允许修改
			    	 if(factoryUser.permission == 20){
//			    		 $('.xpbj').hide();
//			    		 $('.ljbj').hide();
			    	 }
			    	 
			    	 
			    	 //询盘条件
			    	 $('#quoteId').text(quoteInfo.orderId);
//			    	 if(quoteInfo.quoteTitle == null || quoteInfo.quoteTitle == ''){
//			    		 $('#quote_title').hide();
//			    		 $('#quote_title').prev().hide();
//			    	 }else{
//				    	 $('#quote_title').text(quoteInfo.quoteTitle);
//			    	 }	   
			    	 
			    	 //邀请报价链接
			    	 $('#foo').val("kuaizhizao.cn/rfq/"+orderId);
			    	 
			     	 //未发布询盘不显示工厂报价详情
			    	 if(quoteInfo.orderStatus == 0){
			    		 $('#panel4').hide();
			    		 $('#quoteId').next().css({"color":"#ff5900"}).text('待发布');
			    	 }else if(quoteInfo.orderStatus == 1){
			    		 $('#quoteId').next().css({"color":"#FF973B"}).text('可报价'); 
			    	 }else if(quoteInfo.orderStatus == 2){
			    		 $('#quoteId').next().css({"color":"#4C88FF"}).text('已完成'); 
			    		 $('.price_compare').next().hide();
			    	 }else if(quoteInfo.orderStatus == 3){
			    		 $('#quoteId').next().css({"color":"#999999"}).text('已取消'); 
			    	 }else if(quoteInfo.orderStatus == 4){
			    		 $('#quoteId').next().css({"color":"#CCCCCC"}).text('已过期'); 
			    	 }else if(quoteInfo.orderStatus == 5){
			    		 $('#quoteId').next().css({"color":"#ff655d"}).text('授盘中'); 
			    	 }else if(quoteInfo.orderStatus == 6){
			    		 $('#quoteId').next().css({"color":"#6DCE59"}).text('生产中'); 
			    		 $('.price_compare').next().hide();
			    	 }else if(quoteInfo.orderStatus == 7){
			    		 $('#panel4').hide();
			    		 $('#quoteId').next().css({"color":"#ED1C24"}).text('未通过'); 
			    	 }			    	 
			    	 
			    	 
			    	 
			    	 
					 //查询满足工艺条件的工厂
					 var factoryList = result.data.factoryList;
					 var factoryNames = quoteInfo.inviteFactoryName;
					 var factoryIds = quoteInfo.inviteFactory;	
					 
					 var split1 = [];
					 var split2 = [];
					 var split3 = [];
					 if(factoryIds != null && factoryIds != ''){
						 split1 = factoryIds.split(","); 
						 split3 = factoryIds.split(",");
					 }
                     if(factoryNames != null && factoryNames != ''){
    					 split2 = factoryNames.split(","); 
                     }

                     
                     //将工艺满足条件的工厂添加到列表内
                     for(var i in factoryList){
                    	 split1.push(factoryList[i].factory_id);
                    	 split2.push(factoryList[i].factory_name);
                     }
			    	 
			    	 
			    	 //填写询盘详情
			    	 $('#table1').find('tr').eq(0).find('td').eq(1).text((quoteInfo.confidentialityAgreement == 0  ? '无需保密协议': '有保密协议'));
			    	 $('#table1').find('tr').eq(0).find('td').eq(3).text(quoteInfo.mainProcess);
			    	 if(quoteInfo.updateTime != null && quoteInfo.updateTime != '' && quoteInfo.updateTime != undefined){
			    		 $('#table1').find('tr').eq(0).find('td').eq(5).find('del').text(quoteInfo.publishDate == null ? '' : (new Date(quoteInfo.publishDate.replace(/-/g,"/").split(".")[0])).Format("yyyy-MM-dd")).next().text((new Date(quoteInfo.updateTime.replace(/-/g,"/").split(".")[0])).Format("yyyy-MM-dd")); 
			    	 }else{
			    		 $('#table1').find('tr').eq(0).find('td').eq(5).find('del').text('').next().text(quoteInfo.publishDate == null ? '' : (new Date(quoteInfo.publishDate.replace(/-/g,"/").split(".")[0])).Format("yyyy-MM-dd"));  
			    	 }
			    	 $('#table1').find('tr').eq(1).find('td').eq(1).find('span').text((quoteInfo.quoteWay == 1 ? '只给定向供应商报价' : '公开招标'));
			    	 $('#table1').find('tr').eq(1).find('td').eq(3).find('span').text((quoteInfo.inviteFactoryName == null ? '' : quoteInfo.inviteFactoryName));
			    	 $('#table1').find('tr').eq(1).find('td').eq(3).find('span').attr("title",((quoteInfo.inviteFactoryName == null ? '' : quoteInfo.inviteFactoryName)));
			    	 $('#table1').find('tr').eq(1).find('td').eq(5).text(quoteInfo.quoteEndDate);
			    	 
			    	 $('#table1').find('tr').eq(2).find('td').eq(1).find('span').text((quoteInfo.quoteFreightTerm == null ? '' : quoteInfo.quoteFreightTerm));
			    	 $('#table1').find('tr').eq(2).find('td').eq(3).text((quoteInfo.city == null ? '' : quoteInfo.city));
			    	 $('#table1').find('tr').eq(2).find('td').eq(5).text((quoteInfo.quoteLocation == 0 ? '不限' : (quoteInfo.quoteLocation == 1 ? '江浙沪' : (quoteInfo.quoteLocation == 2 ? '深圳、广东、福建' : ''))));
			    	 
			    	 $('#table1').find('tr').eq(3).find('td').eq(1).text((quoteInfo.staffNumber == null || quoteInfo.staffNumber == '' ? '不限' : quoteInfo.staffNumber));
			    	 $('#table1').find('tr').eq(3).find('td').eq(3).text((quoteInfo.qualification == null ? '' : quoteInfo.qualification));
			    	 $('#table1').find('tr').eq(3).find('td').eq(5).find('span').text((quoteInfo.quotePurpose == 0 ? '实际订单' : '暂时不急的询盘'));
			    	
			    	 $('#table1').find('tr').eq(4).find('td').eq(1).text(quoteInfo.quoteTitle);
			    	 $('#table1').find('tr').eq(4).find('td').eq(3).text(quoteInfo.maxNumber);
			    	 
			    	 var drawingPath = quoteInfo.drawingPath;
			    	 if(drawingPath != null && drawingPath != '' && drawingPath != undefined){
//			    		 var strs = drawingPath.split("\/");
				    	 $('#table1').find('tr').eq(5).find('td').eq(1).find('.ms').text((quoteInfo.drawingName == null ? '' : quoteInfo.drawingName));
				    	 $('#table2').find('tr').eq(5).find('td').eq(1).find('.ms').text((quoteInfo.drawingName == null ? '' : quoteInfo.drawingName));
//				    	 $('#table1').find('tr').eq(4).find('td').eq(1).find('.ms').attr("href","http://180.173.89.127:8081/quote_static/drawing/"+orderId+"/o_drawing/100118&20180112154645.rar");
			    		 $('#table1').find('tr').eq(5).find('td').eq(1).find('.ms').attr("onclick","drawingfiledownload('"+quoteInfo.orderId+"')");
				    	 $('#table2').find('tr').eq(5).find('td').eq(1).find('.ms').attr("onclick","drawingfiledownload('"+quoteInfo.orderId+"')");
			    	 }else{
			    		 $('#table1').find('tr').eq(5).find('td').eq(1).find('.ms').text('');
			    		 $('#table2').find('tr').eq(5).find('td').eq(1).find('.ms').text('');
			    	 }			    	
			    	 $('#table1').find('tr').eq(6).find('td').eq(1).text((quoteInfo.quoteRemark == null ? '' : quoteInfo.quoteRemark));
			    	 
		    	 
                     //填写编辑页询盘
			    	 $('#table2').find('tr').eq(0).find('td').eq(1).text((quoteInfo.confidentialityAgreement == 0  ? '无需保密协议': '有保密协议'));
			    	 $('#table2').find('tr').eq(0).find('td').eq(3).find('select').find("option:contains("+quoteInfo.mainProcess+")").attr("selected",true);
			    	 if(quoteInfo.updateTime != null && quoteInfo.updateTime != '' && quoteInfo.updateTime != undefined){
			    		 $('#table2').find('tr').eq(0).find('td').eq(5).find('del').text(quoteInfo.publishDate == null ? '' : (new Date(quoteInfo.publishDate.replace(/-/g,"/"))).Format("yyyy-MM-dd")).next().text((new Date(quoteInfo.updateTime.replace(/-/g,"/").split(".")[0])).Format("yyyy-MM-dd")); 
			    	 }else{
			    		 $('#table2').find('tr').eq(0).find('td').eq(5).text(quoteInfo.publishDate == null ? '' : (new Date(quoteInfo.publishDate.replace(/-/g,"/").split(".")[0])).Format("yyyy-MM-dd"));  
			    	 }
			    	 
			    	 $('#table2').find('tr').eq(1).find('td').eq(1).find('select').find("option[value="+quoteInfo.quoteWay+"]").attr("selected",true);
			    	 $('#factoryNames').val((factoryNames == null ? '' : factoryNames));
			    	 $('#inviteFactory').val((factoryIds == null ? '' : factoryIds));
			    	 
			    	 var factory_div = '';
			    	 for(var i=0;i<split1.length;i++){
			    		 if(i<split3.length){
				    		 factory_div = '<div class="checkbox">'+
					                         '<label>'+
					                             '<input type="checkbox" checked name="factoryName" onchange="changeInvitation()" value="'+(split1[i] == null ? '' : split1[i])+'"><span>'+(split2[i] == null ? '' : split2[i])+
					                         '</span></label>'+
					                       '</div>';
			    		 }else{
				    		 factory_div = '<div class="checkbox">'+
					                         '<label>'+
					                             '<input type="checkbox" name="factoryName" onchange="changeInvitation()" value="'+(split1[i] == null ? '' : split1[i])+'"><span>'+(split2[i] == null ? '' : split2[i])+
					                         '</span></label>'+
					                       '</div>';
			    		 }

			    		 if(i == 0){
                             var factory_default =  '<div class="checkbox">'+
											 '<label>'+
											 '<input type="checkbox" name="factoryDefault" onchange="selectAll(this)"><span>全选'+
											 '</span></label>'+
											 '</div>';
                             $('#invite_factorys').append(factory_default);
						 }
			    		 $('#invite_factorys').append(factory_div);
			    	 }	
			    	 $('#table2').find('tr').eq(1).find('td').eq(5).find('input').val(quoteInfo.quoteEndDate);
			    	 
			    	 $('#table2').find('tr').eq(2).find('td').eq(1).find('select').find("option:contains("+quoteInfo.quoteFreightTerm+")").attr("selected",true);
			    	 $('#table2').find('tr').eq(2).find('td').eq(3).find('select').find("option:contains("+quoteInfo.city+")").attr("selected",true);
			    	 $('#table2').find('tr').eq(2).find('td').eq(5).find('select').find("option[value="+quoteInfo.quoteLocation+"]").attr("selected",true);
			    	 
			    	 if(quoteInfo.staffNumber != ''){
			    		 $('#table2').find('tr').eq(3).find('td').eq(1).find('select').find("option[value='"+quoteInfo.staffNumber+"']").attr("selected",true);
			    	 }else{
			    		 $('#table2').find('tr').eq(3).find('td').eq(1).find('select').find("option").eq(0).attr("selected",true);
			    	 }
			    	 $('#qualificationName').val((quoteInfo.qualification == null ? '' : quoteInfo.qualification)).attr("title",(quoteInfo.qualification == null ? '' : quoteInfo.qualification));
			    	 $('#table2').find('tr').eq(3).find('td').eq(5).find('select').find("option[value="+quoteInfo.quotePurpose+"]").attr("selected",true);
			    			
			    	 $('#quote_title').val(quoteInfo.quoteTitle);
			    	 $('#max_number').val(quoteInfo.maxNumber);
			    	 $('#table2').find('tr').eq(6).find('td').eq(1).find('textarea').val((quoteInfo.quoteRemark == null ? '' : quoteInfo.quoteRemark));
			    	 
			    	 
				      
		    		//获取资格认证     
		    		var qualification = quoteInfo.qualification;
		    		var strs = [];
		    		if(qualification != null && qualification != '' && qualification != undefined){
		    			strs = qualification.split(",");
		    		}	
		    		if(strs.length != 0){
		    			for(var n=0;n<strs.length;n++){
		    				$('#qualificationName').next().find('input[type="checkbox"]').each(function(){
		    					if($(this).val() == strs[n]){
		    						$(this).attr("checked",true);
		    					}
		    				})    
		    			}
		    		}
			    	 
			    	 
			    	 //产品列表
			    	 $('#product_count').text(products.length);
			    	 $('#product_tbody').empty();
			    	 
			    	 var flag1 = false;    //判断是否有第二报价数
			    	 var flag2 = false;    //判断是否有第三报价数
			    	 
			    	 if(products.length == 1){			    		   
			    		   for(var j=0;j<products.length;j++){			    			   
			    			   var qty = products[j].quantityList;
			    			   var drawingPath = products[j].drawingPath;			    			   
			    			   var list = qty.split(",");							   
							   
						    var tr1 = '<tr><td>'+
				                  				'<em onclick="view_detail(this)"></em>'+
				                  		       '<div class="div_video">'+
	                                           '<video src="'+(products[j].videoPath == null ? '' : products[j].videoPath)+'" autoplay="autoplay" controls loop></video>'+
	                                           '<div class="close_button" onclick="closeVideo(this)"><span class="iconfont">&#xe643;</span></div>'+
		                                      '</div>'+
				                  				'<div class="imgs">'+
				                               '<img src="'+((products[j].drawingPathCompress == null || products[j].drawingPathCompress == '') ? '../images/pic2.png' : products[j].drawingPathCompress)+'" alt=""/>'+
				                               '<div class="bf_botton" onclick="playVideo(this)" '+(products[j].videoPath == null ? 'style="display:none;"' : '')+'><span class="iconfont">&#xe626;</span><a title="点击观看3D"></a></div>'+ 
				                               '</div>'+
				                  			'</td>'+
				                  			'<td> <div class="ws"><span>'+products[j].productName+'</span></div></td>'+
				                  			'<td><div class="ws"><span>'+(products[j].process == null ? quoteInfo.mainProcess : products[j].process)+'</span></div></td>'+
				                  			'<td><div class="ws"><span>'+(products[j].materials == null ? '' : products[j].materials)+'</span></div></td>'+
				                  			'<td><div class="ws w98"><span>'+(products[j].weight == null ? '' : products[j].weight)+'</span></div></td>'+
				                  			'<td><div class="ws"><span>'+(list.length > 0 ? list[0] : '')+'</span></div></td><td><div class="ws"><span>'+(list.length > 1 ? list[1] : '')+'</span></div></td><td><div class="ws"><span>'+(list.length > 2 ? list[2] : '')+'</span></div></td>'+
				                  			'<td><div class="ws"><span>'+(products[j].annualQuantity == null ? '' : products[j].annualQuantity)+'</span></div></td>'+
			                  		   '</tr>';
							 var tr2 = '<tr class="trcol currdis">'+
			                    			'<td class="ljms">零件描述：</td>'+
			                       			'<td colspan="8">'+(products[j].productRemark == null ? '无' : products[j].productRemark)+
			                       			'</td>'+                             			
			                       		'</tr>'; 

							  $('#product_tbody').append(tr1);   
							  $('#product_tbody').append(tr2);
							   
							   
							  
							  //给零件编辑页赋值
							  var edit_tr1 = '<tr>'+
						                     '<td>'+
			                                      '<div class="div_video">'+
		                                          '<video src="'+(products[j].videoPath == null ? '' : products[j].videoPath)+'" autoplay="autoplay" controls loop></video>'+
		                                          '<div class="close_button" onclick="closeVideo(this)"><span class="iconfont">&#xe643;</span></div>'+
			                                      '</div>'+
					                              '<div class="imgs">'+
					                                  '<img src="'+((products[j].drawingPathCompress == null || products[j].drawingPathCompress == '') ? '../images/pic2.png' : products[j].drawingPathCompress)+'" alt=""/>'+
					                                  '<div class="bf_botton" onclick="playVideo(this)" '+(products[j].videoPath == null ? 'style="display:none;"' : '')+'><span class="iconfont">&#xe626;</span></div>'+ 
					                             ' </div>'+
					                             '<form onsubmit="return false;" method="post" enctype="multipart/form-data">'+
					                             '<input type="hidden" name="photoName">'+
					                             '<input type="hidden" name="productId" value="'+products[j].id+'">'+					                             
					                             '<a href="###" class="fj1 img_sc">修改零件图<input type="file" name="fileUpload" onchange="change_img('+products[j].id+',this)"/></a>'+		                      
			                                     '<a href="###" class="fj1 video_sc">修改视频<input type="file" name="fileUpload1" accept="video/*" onchange="change_video('+products[j].id+',this)"></a>'+
					                             '</form>'+
					                          '</td>'+
					                          '<td> <textarea class="form-control w120" onfocus="w120_edit_focus(this)" onblur="w120_edit_blur(this)">'+products[j].productName+'</textarea> </td>'+
					                          '<td><textarea class="form-control w120" onfocus="w120_edit_focus(this)" onblur="w120_edit_blur(this)">'+(products[j].process == null ? quoteInfo.mainProcess : products[j].process)+'</textarea></td>'+
					                          '<td><textarea class="form-control w120" onfocus="w120_edit_focus(this)" onblur="w120_edit_blur(this)">'+(products[j].materials == null ? '' : products[j].materials)+'</textarea></td>'+
					                          '<td><input type="text" class="form-control w120 w90" value="'+(products[j].weight == null ? '' : products[j].weight)+'"/></td>'+
					                          '<td><input type="text" class="form-control w120 w90" value="'+(list.length > 0 ? list[0] : '')+'"/></td><td><input type="text" class="form-control w120 w90" value="'+(list.length > 1 ? list[1] : '')+'"/></td><td><input type="text" class="form-control w120 w90" value="'+(list.length > 2 ? list[2] : '')+'"></td>'+
					                          '<td><input type="text" class="form-control w120 w90" value="'+(products[j].annualQuantity == null ? '' : products[j].annualQuantity)+'"/></td>'+
					                      '</tr>';
							  
							  var edit_tr2 =  '<tr class="trcol">'+
						                              '<td class="ljms">零件描述：</td>'+
						                              '<td colspan="8">'+
						                                 ' <textarea class="form-control w120 w920" onfocus="w920_edit_focus(this)" onblur="w920_edit_blur(this)">'+(products[j].productRemark == null ? '' : products[j].productRemark)+'</textarea>'+
						                              '</td>'+
						                         ' </tr>';
							  
							  $('#product_tbody2').append(edit_tr1);   
							  $('#product_tbody2').append(edit_tr2);
							  
							  
							  
							  //判断产品是否存在第二报价 第三报价

							     if(list.length == 2){
								      flag1 = true;
								 }else if(list.length >2){
									  flag1 = true;
									  flag2 = true;
								 }
			    		   }
			    		   $('.panel3 tbody em').click();
			    	 }
			    	 
			    	 if(products.length > 1){
			    		 for(var j=0;j<products.length;j++){			    			   
			    			   var qty = products[j].quantityList;
			    			   var drawingPath = products[j].drawingPath;
			    			   
			    			   var list = qty.split(",");
			    			   var tr1 = '<tr><td>'+
				                 				'<em onclick="view_detail(this)"></em>'+
				                 				'<div class="div_video">'+
		                                           '<video src="'+(products[j].videoPath == null ? '' : products[j].videoPath)+'" autoplay="autoplay" controls loop></video>'+
		                                           '<div class="close_button" onclick="closeVideo(this)"><span class="iconfont">&#xe643;</span></div>'+
			                                    '</div>'+
				                 				'<div class="imgs">'+
				                              '<img src="'+((products[j].drawingPathCompress == null || products[j].drawingPathCompress == '') ? '../images/pic2.png' : products[j].drawingPathCompress)+'" alt=""/>'+
				                              '<div class="bf_botton" onclick="playVideo(this)" '+(products[j].videoPath == null ? 'style="display:none;"' : '')+'><span class="iconfont">&#xe626;</span></div>'+ 
				                              '</div>'+
				                 			'</td>'+
				                 			'<td> <div class="ws"><span>'+products[j].productName+'</span></div></td>'+
				                  			'<td><div class="ws"><span>'+(products[j].process == null ? quoteInfo.mainProcess : products[j].process)+'</span></div></td>'+
				                  			'<td><div class="ws"><span>'+(products[j].materials == null ? '' : products[j].materials)+'</span></div></td>'+
				                  			'<td><div class="ws w98"><span>'+(products[j].weight == null ? '' : products[j].weight)+'</span></div></td>'+
				                  			'<td><div class="ws"><span>'+(list.length > 0 ? list[0] : '')+'</span></div></td><td><div class="ws"><span>'+(list.length > 1 ? list[1] : '')+'</span></div></td><td><div class="ws"><span>'+(list.length > 2 ? list[2] : '')+'</span></div></td>'+
				                  			'<td><div class="ws"><span>'+(products[j].annualQuantity == null ? '' : products[j].annualQuantity)+'</span></div></td>'+
				             		   '</tr>';
							 var tr2 = '<tr class="trcol currdis">'+
				               			'<td class="ljms">零件描述：</td>'+
				                  			'<td colspan="8">'+(products[j].productRemark == null ? '无' : products[j].productRemark)+
				                  			'</td>'+                             			
				                  		'</tr>'; 
							  $('#product_tbody').append(tr1);   
							  $('#product_tbody').append(tr2);  
							  
							  
							  //给零件编辑页赋值
							  var edit_tr1 = '<tr>'+
						                     '<td>'+
							                     '<div class="div_video">'+
		                                          '<video src="'+(products[j].videoPath == null ? '' : products[j].videoPath)+'" autoplay="autoplay" controls loop></video>'+
		                                          '<div class="close_button" onclick="closeVideo(this)"><span class="iconfont">&#xe643;</span></div>'+
			                                      '</div>'+
					                              '<div class="imgs">'+
					                                  '<img src="'+((products[j].drawingPathCompress == null || products[j].drawingPathCompress == '') ? '../images/pic2.png' : products[j].drawingPathCompress)+'" alt=""/>'+
					                                  '<div class="bf_botton" onclick="playVideo(this)" '+(products[j].videoPath == null ? 'style="display:none;"' : '')+'><span class="iconfont">&#xe626;</span></div>'+ 
					                             '</div>'+
					                             '<form  onsubmit="return false;" method="post" enctype="multipart/form-data">'+
					                             '<input type="hidden" name="photoName">'+
					                             '<input type="hidden" name="productId" value="'+products[j].id+'">'+
					                             '<a href="###" class="fj1 img_sc">修改零件图<input type="file" name="fileUpload" onchange="change_img('+products[j].id+',this)"/></a>'+		                      
			                                     '<a href="###" class="fj1 video_sc">修改视频<input type="file" name="fileUpload1" accept="video/*" onchange="change_video('+products[j].id+',this)"></a>'+
					                             '</form>'+		                           
					                          '</td>'+
					                          '<td> <textarea class="form-control w120" onfocus="w120_edit_focus(this)" onblur="w120_edit_blur(this)">'+products[j].productName+'</textarea> </td>'+
					                          '<td><textarea class="form-control w120" onfocus="w120_edit_focus(this)" onblur="w120_edit_blur(this)">'+(products[j].process == null ? quoteInfo.mainProcess : products[j].process)+'</textarea></td>'+
					                          '<td><textarea class="form-control w120" onfocus="w120_edit_focus(this)" onblur="w120_edit_blur(this)">'+(products[j].materials == null ? '' : products[j].materials)+'</textarea></td>'+
					                          '<td><input type="text" class="form-control w120 w90" value="'+(products[j].weight == null ? '' : products[j].weight)+'"/></td>'+
					                          '<td><input type="text" class="form-control w120 w90" onkeypress="return inputNum(event);" value="'+(list.length > 0 ? list[0] : '')+'"/></td><td><input type="text" onkeypress="return inputNum(event);" class="form-control w120 w90" value="'+(list.length > 1 ? list[1] : '')+'"/></td><td><input type="text" onkeypress="return inputNum(event);" class="form-control w120 w90" value="'+(list.length > 2 ? list[2] : '')+'"/></td>'+
					                          '<td><input type="text" class="form-control w120 w90" onkeypress="return inputNum(event);" value="'+(products[j].annualQuantity == null ? '' : products[j].annualQuantity)+'"/></td>'+
					                      '</tr>';
							  
							  var edit_tr2 =  '<tr class="trcol">'+
						                              '<td class="ljms">零件描述：</td>'+
						                              '<td colspan="8">'+
						                                 ' <textarea class="form-control w120 w920" onfocus="w920_edit_focus(this)" onblur="w920_edit_blur(this)">'+(products[j].productRemark == null ? '' : products[j].productRemark)+'</textarea>'+
						                              '</td>'+
						                         ' </tr>';
							  
							  $('#product_tbody2').append(edit_tr1);   
							  $('#product_tbody2').append(edit_tr2);
							  
							  
							   
							  //判断产品是否存在第二报价 第三报价

							     if(list.length == 2){
								      flag1 = true;
								 }else if(list.length >2){
									  flag1 = true;
									  flag2 = true;
								 }
							     
							     
							     //修改展开产品备注逻辑，当存在备注时自动展开。
							     if(products[j].productRemark != null && products[j].productRemark != ''){
							    	 $('.panel3 tbody em').eq(j).click();
							     }  
			    		   }
			    	 }
			    	 
			    	 
			  	   //判断当前报价数(没有则不显示)
					   if(!flag2){
						   $('#product_thead').find('th').eq(7).remove();   
						   $('.trcol').find('td').eq(1).attr('colspan',7);
						   $('#product_thead2').find('th').eq(7).remove();   
						   $('#product_tbody').find('.trcol').find('td').eq(1).attr('colspan',7);
						   $('#product_tbody2').find('.trcol').find('td').eq(1).attr('colspan',7);
						   $('#product_tbody').find('tr').not('.trcol').each(function(){
                               $(this).find('td').eq(7).remove();
						   })

                           $('#product_tbody2').find('tr').not('.trcol').each(function(){
                               $(this).find('td').eq(7).remove();
                           })
					   }
					   if(!flag1){
						   $('#product_thead').find('th').eq(6).remove();  
						   $('.trcol').find('td').eq(1).attr('colspan',6);
						   $('#product_thead2').find('th').eq(6).remove();  
						   $('#product_tbody').find('.trcol').find('td').eq(1).attr('colspan',6);
						   $('#product_tbody2').find('.trcol').find('td').eq(1).attr('colspan',6);
                           $('#product_tbody').find('tr').not('.trcol').each(function(){
                               $(this).find('td').eq(6).remove();
                           })

                           $('#product_tbody2').find('tr').not('.trcol').each(function(){
                               $(this).find('td').eq(6).remove();
                           })
					   }
					   
					   
					   //工厂报价对比数据
					   $('#factory_quote_tbody').empty(); 					   
					   for(var k=0;k<supplierQuoteInfos.length;k++){				   
						   
						var tr=   ' <tr>'+
				                        '<td>'+
				                        '<h6><a href="/manufacturer-category/'+supplierQuoteInfos[k].factoryId+'/info" target="_blank" class="w110 h_over">'+(supplierQuoteInfos[k].factoryName == null ? '' : supplierQuoteInfos[k].factoryName)+'</a></h6>'+
				                        '<i>'+(new Date(supplierQuoteInfos[k].createTime)).Format("yyyy-MM-dd")+'</i>'+
					                    '</td>'+
					                    '<td><em>'+supplierQuoteInfos[k].totalAmount+'元</em></td>'+
					                    '<td><em>'+supplierQuoteInfos[k].validityDays+'天</em></td>'+
					                    '<td><em class="w100">'+(supplierQuoteInfos[k].paymentTerm == null ? '-' : supplierQuoteInfos[k].paymentTerm)+'</em></td>'+
					                    '<td>'+(supplierQuoteInfos[k].state == null ? '-' : supplierQuoteInfos[k].state)+'</td>'+
					                    '<td><em class="w55" style="width: 100px;">'+(supplierQuoteInfos[k].qualificationNames == null ? '-' : supplierQuoteInfos[k].qualificationNames)+'</em></td>'+
					                    '<td><em>'+(supplierQuoteInfos[k].staffNumber == null ? '-' : supplierQuoteInfos[k].staffNumber)+'</em></td>'+
					                    '<td><span class="w120">'+(supplierQuoteInfos[k].quoteRemark == null ? '-' : supplierQuoteInfos[k].quoteRemark)+'</span></td>'+
					                    '<td><span class="w110">'+(supplierQuoteInfos[k].priceType == 1 ? '含增值税到最近港口价格' : (supplierQuoteInfos[k].priceType == 2 ? '含增值税出厂价格' : '-'))+'</span></td>'+
			                            '<td>'+
			                               '<a href="/zh/purchase_supplier.html?factoryId='+supplierQuoteInfos[k].factoryId+'&orderId='+supplierQuoteInfos[k].orderId+'">细节讨论</a>'+
			                            '</td>'+
			                       '</tr>';
						   
						   
						    $('#factory_quote_tbody').append(tr);
						   
						   
						   
						   
						   
						     //获取价格对比中零件li的数据
							 var product_li = '';
				         
							   
					         if(supplierQuoteProductss != null && supplierQuoteProductss != ''){
						        	 var s_tl = supplierQuoteProductss[k].length;
									 //获取订量一对比数据
									 var tr1 = '';  
									 //获取订量二对比数据
									 var tr2 = '';  
									 //获取订量三对比数据
									 var tr3 = '';  
						        	 //总价
									 var tr4 = '';
									 
									 var quantityList = '';
									 
						        	 for(var n=0;n<s_tl;n++){
						        		 product_li += '<li>'+supplierQuoteProductss[0][n].productName+'</li>';
						        		 quantityList = supplierQuoteProductss[0][n].quantityList;
						        		 var list = quantityList.split(",");
						        		 if(list.length == 1){					        			 
					                          tr1 += '<tr>'+
						                    					'<td>'+list[0]+'</td>'+
						                    					'<td>'+supplierQuoteProductss[k][n].quoteMoldPrice1+'</td>'+
						                    					'<td>'+supplierQuoteProductss[k][n].quoteUnitPrice1+'</td>'+
						                    					'<td>'+Number(supplierQuoteProductss[k][n].quoteUnitPrice1 * list[0] + supplierQuoteProductss[k][n].quoteMoldPrice1).toFixed(0)+'</td>'+
						                    			'</tr>';		
					
						        		 }
				    
			        		 
						        		 if(list.length == 2){		
						        		     tr1 += '<tr>'+
			                    					'<td>'+list[0]+'</td>'+
			                    					'<td>'+supplierQuoteProductss[k][n].quoteMoldPrice1+'</td>'+
			                    					'<td>'+supplierQuoteProductss[k][n].quoteUnitPrice1+'</td>'+
			                    					'<td>'+Number(supplierQuoteProductss[k][n].quoteUnitPrice1 * list[0] + supplierQuoteProductss[k][n].quoteMoldPrice1).toFixed(0)+'</td>'+
			                    			       '</tr>';				
						        			 
				                              tr2 += '<tr>'+
					                    					'<td>'+list[1]+'</td>'+
					                    					'<td>'+supplierQuoteProductss[k][n].quoteMoldPrice2+'</td>'+
					                    					'<td>'+supplierQuoteProductss[k][n].quoteUnitPrice2+'</td>'+
					                    					'<td>'+Number(supplierQuoteProductss[k][n].quoteUnitPrice2 * list[1] + supplierQuoteProductss[k][n].quoteMoldPrice2).toFixed(0)+'</td>'+
					                    			'</tr>';			 
				                              
					        		     } 
						        		 if(list.length == 3){		
						        			 
						        		     tr1 += '<tr>'+
		                    					'<td>'+list[0]+'</td>'+
		                    					'<td>'+supplierQuoteProductss[k][n].quoteMoldPrice1+'</td>'+
		                    					'<td>'+supplierQuoteProductss[k][n].quoteUnitPrice1+'</td>'+
		                    					'<td>'+Number(supplierQuoteProductss[k][n].quoteUnitPrice1 * list[0] + supplierQuoteProductss[k][n].quoteMoldPrice1).toFixed(0)+'</td>'+
		                    			       '</tr>';				
					        			 
			                                tr2 += '<tr>'+
				                    					'<td>'+list[1]+'</td>'+
				                    					'<td>'+supplierQuoteProductss[k][n].quoteMoldPrice2+'</td>'+
				                    					'<td>'+supplierQuoteProductss[k][n].quoteUnitPrice2+'</td>'+
				                    					'<td>'+Number(supplierQuoteProductss[k][n].quoteUnitPrice2 * list[1] + supplierQuoteProductss[k][n].quoteMoldPrice2).toFixed(0)+'</td>'+
				                    			'</tr>';				              	
						        			 
						        			 tr3 += '<tr>'+
						        			 '<td>'+list[2]+'</td>'+
						        			 '<td>'+supplierQuoteProductss[k][n].quoteMoldPrice3+'</td>'+
						        			 '<td>'+supplierQuoteProductss[k][n].quoteUnitPrice3+'</td>'+
						        			 '<td>'+Number(supplierQuoteProductss[k][n].quoteUnitPrice3 * list[2] + supplierQuoteProductss[k][n].quoteMoldPrice3).toFixed(0)+'</td>'+
						        			 '</tr>';				              			
						        		 }	
							        	  tr4 =   '<tr>'+
			                 					   '<td colspan="2"></td>'+
			                					   '<td colspan="2"></td>'+
		                                          '</tr>';
						        		 
						              }
						        	 
						        	 
						        	 
									 var compare_div  =  '<div class="compare clearfix">'+
										                 		'<ul class="pull-left">'+
										                 			'<li>'+
										                 				'<a href="/manufacturer-category/'+supplierQuoteInfos[k].factoryId+'/info">'+(supplierQuoteInfos[k].factoryName == null ? '' : supplierQuoteInfos[k].factoryName)+'</a>'+
										                 			'</li>'+product_li+						                 			
										                 			'<li>总额（元）</li>'+
										                 		'</ul>'+
										                 		'<table>'+
										                 			'<thead>'+
										                 				'<tr>'+
										                 					'<th class="th_1">订量一</th>'+
										                 					'<th class="th_2">模具费（元）</th>'+
										                 					'<th class="th_3">单价（元）</th>'+
										                 					'<th class="th_4">总货值（元）</th>'+
										                 				'</tr>'+
										                 			'</thead>'+
										                 			'<tbody>'+tr1+tr4+						                 				
										                 			'</tbody>'+
										                 		'</table>'+
										                 		'<table>'+
										                 			'<thead>'+
										                 				'<tr>'+
										                 					'<th class="th_1">订量二</th>'+
										                 					'<th class="th_2">模具费（元）</th>'+
										                 					'<th class="th_3">单价（元）</th>'+
										                 					'<th class="th_4">总货值（元）</th>'+
										                 				'</tr>'+
										                 			'</thead>'+
										                 			'<tbody>'+tr2+tr4+
										                 			
										                 			'</tbody>'+
										                 		'</table>'+
										                 		'<table>'+
										                 			'<thead>'+
										                 				'<tr>'+
										                 					'<th class="th_1">订量三</th>'+
										                 					'<th class="th_2">模具费（元）</th>'+
										                 					'<th class="th_3">单价（元）</th>'+
										                 					'<th class="th_4">总货值（元）</th>'+
										                 				'</tr>'+
										                 			'</thead>'+
										                 			'<tbody>'+tr3+tr4+						                 				
										                 			'</tbody>'+
										                 		'</table>'+
										                  	'</div>';
						     
						             $('.price_compare').append(compare_div);
					          }
									
					         			         
						  }
						   
						   
						       //如果不存在第三报价					  
							   $('.compare').each(function(){
								   if(!flag2){
								   $(this).find('table:last').remove();
								   }
								   if(!flag1){
								   $(this).find('table').eq(1).remove();  
								   }
							   }) 
						   					   				   
						   
						   //计算模具价和总价
						   $('.compare').find('table').each(function(){
							   var totalPrice = 0;
							   var totalMoldPrice = 0;
							   $(this).find('tbody').find('tr:not(last)').each(function(){
								   totalMoldPrice += Number($(this).find('td').eq(1).text());							   
								   totalPrice += Number($(this).find('td').eq(3).text());							   
							   })
							   $(this).find('tbody').find('tr:last').find('td:eq(0)').text(totalMoldPrice);
							   $(this).find('tbody').find('tr:last').find('td:eq(1)').text(totalPrice);						   						   

						   })
						   
					   
					   
					   //项目状态显示 和跟进情况显示
					   $("input:radio[name='dd']").each(function(){
						    if($(this).val() == quoteInfo.followStatus){
								$(this).attr("checked",true);  
							 }
					   })
					  $("#current_order_sel").find("option[value="+quoteInfo.inquiryStatus+"]").attr("selected",true);
					   
					  
					   
					   
					   
					   
					   
					   
					   
				   //如果没有报价，则不显示报价数据表
				   if(supplierQuoteInfos == null || supplierQuoteInfos == "" || supplierQuoteInfos == undefined){
					   $("#panel4").hide();
				   }
					   
					   
					   //显示有意向报价的工厂   					   
					   for(var m=0;m<factorys.length;m++){				   
						   
							var tr=   ' <tr>'+
					                        '<td>'+
					                        '<h6><a href="/manufacturer-category/'+factorys[m].factoryId+'/info" target="_blank" class="w110 h_over">'+(factorys[m].factoryName == null ? '' : factorys[m].factoryName)+'</a></h6>'+
						                    '</td>'+
						                    '<td>'+(factorys[m].state == null ? '-' : factorys[m].state)+'</td>'+
						                    '<td><em class="w55" style="width: 100px;">'+(factorys[m].qualificationNames == null ? '-' : factorys[m].qualificationNames)+'</em></td>'+
						                    '<td><em>'+(factorys[m].staffNumber == null ? '-' : factorys[m].staffNumber)+'</em></td>'+
				                            '<td>'+
				                               '<a href="/zh/purchase_supplier.html?factoryId='+factorys[m].factoryId+'&orderId='+orderId+'">细节讨论</a>'+
				                            '</td>'+
				                       '</tr>';   						
						 	
							$('#factory_tbody').append(tr);
					   }	   
					   

					  //如果有意向的工厂为空，则不显示  
				      if(factorys == null || factorys.length == 0){
				    	  $('#mind_factory_list').hide(); 
				      }				   				   
					   //控制编辑行高
					   edit();
					   
					    /* panel3隔行换色*/
					    $(".panel3 tbody tr:not('.trcol'):even").css({
					        'background-color':'#f9f9f9'
					    })
					    
					    /* panel4隔行换色*/
					    $('.panel4 tbody tr:even').css({
					        'background-color':'#f9f9f9'
					    })
			      }else if(result.state == 2){
			    		 //如果还未登录，跳转登录页
			    		 window.location = "/zh/login.html";
			      }   		      			 
	      })
			 
	      
   
	   
	   //处理资格认证显示
	   $("#qualificationName").on("click", function(e){
		    $(".zgrzdx").show();

		    $(document).on("click", function(){
		        $(".zgrzdx").hide();
		    });

		    e.stopPropagation();
		});
		$(".zgrzdx").on("click", function(e){
		    e.stopPropagation();
		});
		
		
		
		//处理邀请工厂显示
		$("#factoryNames").on("click", function(e){
			$(".zgrzdx1").show();
			
			$(document).on("click", function(){
				$(".zgrzdx1").hide();
			});
			
			e.stopPropagation();
		});
		$(".zgrzdx1").on("click", function(e){
			e.stopPropagation();
		});
		
})


//选择取消资格认证事件
$('#qualificationName').next().find('input[type="checkbox"]').change(function(){
	var qualificationName = '';
	$('#qualificationName').next().find('input[type="checkbox"]').each(function(){
		if($(this).is(':checked')){
			qualificationName +=$(this).val() + ",";
		}
	})   
	if(qualificationName != null && qualificationName != '' && qualificationName != undefined){
		qualificationName = qualificationName.substring(0,qualificationName.length-1);
	}
	$('#qualificationName').val(qualificationName);
})



//选择取消邀请工厂事件
function changeInvitation(){

	var factoryNames = '';
	var factoryIds = '';
	$('#factoryNames').next().find('input[type="checkbox"][name="factoryName"]').each(function(){
		if($(this).is(':checked')){
			factoryNames +=$(this).next().text() + ",";
			factoryIds += $(this).val() + ",";
		}
	})   
	if(factoryNames != null && factoryNames != '' && factoryNames != undefined){
		factoryNames = factoryNames.substring(0,factoryNames.length-1);
	}
	if(factoryIds != null && factoryIds != '' && factoryIds != undefined){
		factoryIds = factoryIds.substring(0,factoryIds.length-1);
	}
	$('#factoryNames').val(factoryNames);
	$('#inviteFactory').val(factoryIds);
}

//全选工厂事件
function selectAll(obj){
    if($(obj).is(':checked')){
        $('#factoryNames').next().find('input[type="checkbox"][name="factoryName"]').attr('checked',true);
    }else{
        $('#factoryNames').next().find('input[type="checkbox"][name="factoryName"]').attr('checked',false);
    }
    changeInvitation();
}



//更新客户状态
function update_status(obj){
	
	if (confirm("是否确认更新项目状态？")){ 
	var followStatus = $("input:radio[name='dd']:checked").val();
	if(followStatus == null || followStatus == '' || followStatus == undefined){
		followStatus = '';
	}
	$(obj).css({'color':'#ddd'}).attr("disabled",true);
	$.post("/factoryInquiry/updateInquirySelf.do",	
			{"orderId" : orderId,
		     "inquiryStatus" : $("#current_order_sel").val(),
		     "followStatus" : $("input:radio[name='dd']:checked").val() 
			},
			 function(result){
				$(obj).css({'color':'#006dcc'}).attr("disabled",true);
			      if(result.state == 0){
			    	  easyDialog.open({
			      		   container : {
			          		     header : ' 提示信息',
			          		     content : ' 更新成功 '
			      		   },
							  overlay : false,
							  autoClose : 1000
			      		 });   
			      }else if(result.state == 2){
			    		 //如果还未登录，跳转登录页
			    		 window.location = "/zh/login.html";
			      }    
			})     
	}		
}







//页面加载事件
function edit(){
    /* 零件信息控制行高*/
    $('.tab2_bj tbody tr td:not(:first-child)').css({
        'vertical-align':'middle'
    })
    
    $('.tab2_bj .w120').css({"line-height":"18px"});
}

/*视频播放控制*/
function playVideo(obj){
		
	$('#product_tbody').find('.div_video').hide().removeAttr('autoplay');
	$('#product_tbody2').find('.div_video').hide().removeAttr('autoplay');
	$(obj).parent().prev().show().find('video').attr('autoplay',true);
	
 	var $video = $(obj).parent().prev().find('video');
 	$video.get(0).pause();
	
	$(obj).siblings('.div_video').show();
    var div_h = $('.div_video').height();
	var video_h =  $(obj).parent().prev().find('video').height();
    var m_t = (div_h - video_h)/2;
    $(obj).parent().prev().find('video').css({'margin-top':m_t +'px'});
}
function closeVideo(obj){
	$(obj).parent().hide().find('video').removeAttr('autoplay');
	
 	var $video = $(obj).parent().find('video');
 	$video.get(0).pause();
}




function w120_edit_focus(obj){
	  $(obj).css({
	        'height':'auto',
	        'line-height':'14px',
	        'overflow-y':'scroll'
	    })
}
function w120_edit_blur(obj){
	 $(obj).css({
	        'height':'30px',
	        'overflow-y':'hidden',
	        'line-height':'18px'
	 })
}
function w920_edit_focus(obj){
	$(obj).css({
		    'height':'136px',
	        'line-height':'18px',
	        'overflow-y':'scroll'
	})
}
function w920_edit_blur(obj){
	$(obj).css({
		'height':'136px',
		'overflow-y':'hidden'
			
	})
}

//$(function(){
	  /*零件信息*/
//	$('#tab2_bj').find('.w120').focus(function(){
//	  
//	})
//	$('#tab2_bj').find('.w120').blur(function(){
//	    $(this).css({
//	        'height':'30px',
//	        'overflow-y':'hidden'
//	
//	    })
//	})
	/* 零件信息，零件描述控制高度*/
//	$('.tab2_bj .w920').focus(function(){
//	    $(this).css({
//	        'height':'136px',
//	        'line-height':'18px'
//	    })
//	})
//	$('.tab2_bj .w920').blur(function(){
//	    $(this).css({
//	        'height':'136px',
//	        /* 'overflow-y':'auto'*/
//	
//	    })
//	})
//})



//查看产品详情
function view_detail(obj){


    var $this = $(obj).parent().parent().next('.trcol');
    if($this.hasClass('currdis')){
            $this.removeClass('currdis');
        $(obj).css({
            'background':'url(../images/red.png) no-repeat'
        })
    }else{
        $this.addClass('currdis');
        $(obj).css({
            'background':'url(../images/green.png) no-repeat'
        })
    }

}






 //上传后返回图纸路径
function show_drawingName(obj){
		var path = $(obj).val();
	    sppath = path.split("\\");
	    var drawingName = sppath[sppath.length-1];	  	   
	    if(drawingName == null || drawingName == '' || drawingName == undefined){
	    	return false;
	    }else{
	    	
	        if(!getFilesize(obj)){
	        	easyDialog.open({
		      		   container : {
		          		     header : '提示信息',
		          		     content : '请上传小于30M文件'
		      		   },
	  					  overlay : false,
	  					  autoClose : 1000
		      		 });   
	        	return false;
	        }	
	    	
	       $('#fileName').val(drawingName);
    	   autTime(); 
		   $('#upload_title').children().text("上传进度");
	    }	 		    	
     		
		  
		  //先上传后获取上传文件路径
		 $("#file_upload_id").ajaxSubmit({    			
			type: "post",
			url: "/upload/drawingAndChangeName.do",
	     	dataType: "text",
	     	success: function(str){
	     	var result = eval('(' + str + ')');	
	     	if(result.state == 0){
	 	         $('.ms').text(drawingName);
 	             $('#new_drawing').val(result.data);  
	     	}else{
       	     	easyDialog.open({
	      		   container : {
	          		     header : '  提示信息',
	          		     content : ' 上传失败 '
	      		   },
					  overlay : false,
					  autoClose : 1000
	      		 });   
       	     	$('#show_upload_dialog').hide();
	     	}	

	     	},
			error: function(){
				 easyDialog.open({
         		   container : {
             		     header : '  提示信息',
             		     content : ' 上传失败 '
         		   },
					  overlay : false,
					  autoClose : 1000
         		 });   
	     		$('#show_upload_dialog').hide();
			}       	     	
	 	}); 	 		    

 }
//上传后返回图纸路径
function change_img(productId,obj){
	var path = $(obj).val();
	sppath = path.split("\\");
	var drawingName = sppath[sppath.length-1];	  	   
	if(drawingName == null || drawingName == '' || drawingName == undefined){
		return false;
	}else{
		$(obj).parents('form').find('input:first').val(drawingName);		
        if(!getFilesize(obj)){
        	easyDialog.open({
	      		   container : {
	          		     header : '提示信息',
	          		     content : '请上传小于30M图片'
	      		   },
					  overlay : false,
  					  autoClose : 1000
	      		 });   
        	return false;
        }	
		autTime(); 
		$('#upload_title').children().text("上传进度");
	}	 		    	
	
	
	//先上传后获取上传文件路径
	$(obj).parents('form').ajaxSubmit({    			
		type: "post",
		url: "/factoryInquiry/updateCompressImg.do",
		dataType: "text",
		success: function(str){
			var result = eval('(' + str + ')');	
			if(result.state == 0){
				$(obj).parents('td').find('img').attr('src',result.data);
			}else if(result.state == 2){
	    		 //如果还未登录，跳转登录页
	    		 window.location = "/zh/login.html";
	        }   
			$(obj).val('');
		},
		error: function(){
			easyDialog.open({
				container : {
					header : '  提示信息',
					content : ' 上传失败 '
				},
				overlay : false,
				autoClose : 1000
			});   
			$('#show_upload_dialog').hide();
			$(obj).val('');
		}       	     	
	}); 	 		    
	
}

//上传后返回视频路径
function change_video(productId,obj){
	var path = $(obj).val();
	sppath = path.split("\\");
	var drawingName = sppath[sppath.length-1];	  	   
	if(drawingName == null || drawingName == '' || drawingName == undefined){
		return false;
	}else{
        if(!getFilesize(obj)){
        	easyDialog.open({
	      		   container : {
	          		     header : '提示信息',
	          		     content : '请上传小于30M视频'
	      		   },
					  overlay : false,
  					  autoClose : 1000
	      		 });   
        	return false;
        }
    	var gen = path.lastIndexOf("."); 
        var type = path.substr(gen); 
        if(!(type.toLowerCase()  == ".mp4")){
        	easyDialog.open({
    			container : {
    				header : '提示信息',
    				content : '请选择.mp4格式文件'
    			},
    			overlay : false,
    			autoClose : 1000  	
            });   
        	return false;
        }
        
		autTime(); 
		$('#upload_title').children().text("上传进度");
	}	 		    	
	

	
	
	//先上传后获取上传文件路径
	$(obj).parents('form').ajaxSubmit({    			
		type: "post",
		url: "/factoryInquiry/updateVideo.do",
		dataType: "text",
		success: function(str){
			var result = eval('(' + str + ')');	
			if(result.state == 0){
				$(obj).parents('td').find('video').attr('src',result.data);
				$(obj).parents('td').find('.bf_botton').show();
				easyDialog.open({
		      		   container : {
		          		     header : '  提示信息',
		          		     content : ' 上传成功'
		      		   },
						  overlay : false,
						  autoClose : 1000
		      		 });   
			}else if(result.state == 2){
	    		 //如果还未登录，跳转登录页
	    		 window.location = "/zh/login.html";
	        }else if(result.state == 3){
	    	  easyDialog.open({
	      		   container : {
	          		     header : '  提示信息',
	          		     content : ' 无权限操作'
	      		   },
					  overlay : false
	      		 });   
	         } else{
				easyDialog.open({
					container : {
						header : '  提示信息',
						content : ' 上传失败 '
					},
					overlay : false,
					autoClose : 1000
				});   
				$('#show_upload_dialog').hide();
			}	
			$(obj).val('');
		},
		error: function(){
			easyDialog.open({
				container : {
					header : '  提示信息',
					content : ' 上传失败 '
				},
				overlay : false,
				autoClose : 1000
			});   
			$('#show_upload_dialog').hide();
			$(obj).val('');
		}       	     	
	}); 	 		    
	
}
/*
 * 检测文件大小
 */
function getFilesize(file) {

	fileSize = file.files[0].size / 1024;
	if (Number(fileSize) > 30720) {
		return false;
	} else {
		return true;
	}

}

//修改询盘信息
function edit_inquiry(obj){
	

	$(obj).css({'background-color':'#ddd'}).attr("disabled",true);	
	$.post("/factoryInquiry/updateFactoryInquiry.do",	
			{"orderId" : orderId,
		     "mainProcess" : $('#main_process').val(),
		     "inviteStatus" : $('#invite_status').val(),
		     "quoteEndDate" : $('#quoteEndDate').val(),
		     "quoteFreightTerm" : $('#quote_freight_term').val(),
		     "city" : $('#city').val(),
		     "quoteLocation" : $('#quote_location').val(),
		     "staffNumber" : $('#staff_number').val(),
		     "quotePurpose" : $('#quote_purpose').val(),
		     "drawingPath" : $('#new_drawing').val(),
		     "qualification" : $('#qualificationName').val(),
		     "quoteRemark" : $('#quote_remark').val(),
		     "drawingName": $('#fileName').val(),
		     "inviteFactoryName" : $('#factoryNames').val(),
		     "inviteFactory" : $('#inviteFactory').val(),
		     "quoteTitle" : $('#quote_title').val(),
			 "maxNumber" : $('#max_number').val()
			},
			 function(result){
				
		     $(obj).css({'background-color':'#006dcc'}).removeAttr('disabled');
				if(result.state == 0){
					easyDialog.open({
		         		   container : {
		             		     header : ' 提示信息',
		             		     content : ' 更新成功 '
		         		   },
							  overlay : false,
							  autoClose : 1000
		         		 });   
				   setTimeout("location.reload()",1000);	  
				}else if(result.state == 2){
		    		 //如果还未登录，跳转登录页
		    		 window.location = "/zh/login.html";
		        }   
			}
		)	
	
}

//修改产品信息
function edit_product(obj){
	var productList = '';
	//遍历tr
	$('#product_tbody2 tr').each(function(i){
		var quantityList;
		var tl = $(this).find('td').length;
		if(tl > 2){
			var productId = $(this).find('td').eq(0).find('input').eq(1).val();
			var productName = $(this).find('td').eq(1).find('textarea').val();
			var process = $(this).find('td').eq(2).find('textarea').val();
			var materials = $(this).find('td').eq(3).find('textarea').val();
			var weight = $(this).find('td').eq(4).find('input').val();
			if(tl == 7){
				quantityList = $(this).find('td').eq(5).find('input').val();
			}else if(tl == 8){
				quantityList = $(this).find('td').eq(5).find('input').val() + "," +  $(this).find('td').eq(6).find('input').val();
			}else if(tl == 9){
				quantityList = $(this).find('td').eq(5).find('input').val() + "," +  $(this).find('td').eq(6).find('input').val() + "," +  $(this).find('td').eq(7).find('input').val();
			}
			var annualQuantity = $(this).find('td:last').find('input').val();
			var productRemark = $(this).next().find('td').eq(1).find('textarea').val();	
			productList += (productId + "&" + productName + "&" + process + "&"  + materials + "&"  + weight + "&"  + quantityList + "&" + annualQuantity + "&" + productRemark + "~"); 
		}

	})

	$(obj).css({'background-color':'#ddd'}).attr("disabled",true);
	$.post("/factoryInquiry/updateFactoryInquiry.do",	
			{"orderId" : orderId,
		     "productList" : productList
			},
			 function(result){
			  $(obj).css({'background-color':'#006dcc'}).removeAttr('disabled');		
				if(result.state == 0){
					easyDialog.open({
		         		   container : {
		             		     header : ' 提示信息',
		             		     content : ' 更新成功 '
		         		   },
							  overlay : false,
							  autoClose : 1000
		         		 });   
				   setTimeout("location.reload()",1000);	  
				}else if(result.state == 2){
		    		 //如果还未登录，跳转登录页
		    		 window.location = "/zh/login.html";
		        }   
			}
		)	
	
}








/**
 * 获取输入字符串长度
 * @returns {Boolean}
 */
function getCharacterLength(){
	var character = $('#reason').val();
	var tl = character.length;
	if(tl > 300){
		easyDialog.open({
   		   container : {
       		     header : ' 提示信息',
       		     content : '最多只能300个字'
   		   },
					  overlay : false,
					  autoClose : 1000
   		   });   		
		$('#reason').val(character.substring(0,300));
		return false;
	}else{
		$('#reason').next().find('i').text(tl);
	}
}


//下载消息附件
function download_file(id){
	window.location = "/download/message-file-download.do?id="+id;
}
//下载图纸
function download_drawing(id){
	window.location = "/download/drawing-download.do?id="+id;
}
//下载附件
function drawingfiledownload(id){
	window.location = "/download/drawingfiledownload.do?id="+id;
}

function compare(){
	/*侧边栏长度控制效果*/
	var h1 = $(document.body).height() ;
	var h2 = window.screen.availHeight  ;
	if(h1 < h2){
		$('#footer').addClass('footer1');
	}else{
		$('#footer').removeClass('footer1');
	}
}

//拒绝所有报价
function refuse(quoteStatus){
	var refuseReasons;
	var str = $('input:radio[name="dx"]:checked').next().text();
	if(str == '其他'){
		refuseReasons = $('#reason').val();
		if(refuseReasons == null || refuseReasons == '' || refuseReasons == undefined){
			easyDialog.open({
      		   container : {
          		     header : ' 提示信息',
          		     content : ' 拒绝原因不能为空！'
      		   },
					  overlay : false,
					  autoClose : 1000
      		 });   
			return false;
		}
	}else{
		refuseReasons = str;
	}
	$('#refuse_btn').css({'background-color':'#ddd'}).attr("disabled",true);
	
	$.post("/factoryInquiry/updateOrderStatus.do",	
			{"orderId" : orderId,
		     "quoteStatus" : quoteStatus,
		     "refuseReasons" : refuseReasons
			},
			 function(result){
				
				$('#refuse_btn').css({'background-color':'#006dcc'}).removeAttr('disabled');
				if(result.state == 0){
					 easyDialog.open({
		         		   container : {
		             		     header : ' 提示信息',
		             		     content : ' 拒绝成功'
		         		   },
							  overlay : false,
							  autoClose : 1000
		         		 });   
					 
					 setTimeout("location.reload()",1000);
				}else if(result.state == 2){
		    		 //如果还未登录，跳转登录页
		    		 window.location = "/zh/login.html";
		        }   	  
			
         })
}



//注意：火狐使用event时，
function inputNum(evt){
    //火狐使用evt.which获取键盘按键值，IE使用window.event.keyCode获取键盘按键值
    var ev = evt.which?evt.which:window.event.keyCode;
    if(ev>=48&&ev<=57){
        return true;
    }else{
        return false;
    }
}