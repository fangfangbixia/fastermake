$(function() {

	var proId = window.location.search;

	if (proId && proId.trim() != '') {
		
		var picId = proId.substr(4);
		$('#id').val(picId)
		ajaxSelect(picId)
		queryProductList(1,picId)
		
	}else{
		factoryId = $('#factoryId').val();
        ajaxSelect(factoryId)
        queryProductList(1,factoryId)
	}
	
	

	// var tabindex = location.hash.replace('#!tab=', '')
    // tabChange('.active1 .list-group-item1', '.active2 .box_01', 'list-active', 'click', tabindex)
	
	
	var flag=false;
	//工厂口碑弹框部分 去评论
	$('.go_evaluate').click(function(){
	    
		if (userName == null || userName == '' || userName == undefined) {
			 window.location = "/en/login.html";
			 
			 return false;
		}
		flag=false;
		$('#evaluateInfo').val('')
		$('.evaluate_box').find('.ffspan').text('').removeClass('ffspan')
		$('.evaluate_box').fadeIn(300);
		$('.evaluate_ok').removeClass('disabled')
		
		
	});
	
	$('.input-file').on('change',function(){
		$('.radius-txt').val($(this).val());
	})
	$('.evaluate_cancel').click(function(){
		$('.evaluate_box').hide();
	});
	
	
	   
		$('#evaluateInfo').blur(function(){
			
			$('#ffdiv').removeClass('ffspan').css({
				"display" : "none"
			}).text('');
			
			var temp = $(this).val();
			
			if (temp.trim() != '') {
				$(this).addClass('success');
				flag = true;
     			
			} else {
				
				$('#ffdiv').addClass('ffspan').text('Comment content cannot be empty').fadeIn();
				flag = false;
			}
		
			
		})
	
		$('#evaluateInfo').focus(function() {
			
			$('#ffdiv').removeClass('ffspan').css({
				"display" : "none"
			});
		
		})
		
		
		$('.evaluate_ok').click(function(){
			
			
			$('#evaluateInfo').blur()
			
			if(!flag){
				return false;
			}
			$('.evaluate_ok').css('disabled','true')
			ajaxSaveEvaluate()
			
			$('.evaluate_box').hide();
			
			
			
			
			
		})
		
		
		$('#sendMessageToFactory').click(function(){
			
			if (userName == null || userName == '' || userName == undefined) {
				 window.location = "/en/login.html";
				 return false;
			}
			
			var messageFlag = false;
			
			
			$(this).parent().prev().removeClass('ffspan1').css({
				"display" : "none"
			}).text('');
			
			var messageTitle = $('#messageTitle').val()
			var messageInfo = $('#messageInfo').val()
			
			if (!messageTitle||messageTitle.trim()==''||!messageInfo||messageInfo.trim()==''){
				$(this).parent().prev().addClass('ffspan1').text('Title and information cannot be empty').fadeIn();
				messageFlag = false;
			}else{
				messageFlag = true;
			}
			
			
			if(!messageFlag){
				return false;
			}
			
			$('#sendMessageToFactory').css({'background-color':'#ddd'}).attr("disabled",true);
			
			sendMessageToFactory()
			
			
			
			
			
			
		})
		
		
	
		
	
	
	

})

function ajaxSelect(id) {

	$
			.ajax({
				url : "/viewFactoryInfo/selectFactoryDetailsInfo.do",
				type : "post",
				traditional : true,
				data : {
					'factoryId' : id
				},
				datatype : "json",
				success : function(result) {

					if (result.state == 0) {
                        var isCollect = result.data.isCollect
						var factoryInfo = result.data.factoryInfo
						var factoryEvaluateList =  result.data.factoryEvaluateList
						var evaluateCount = result.data.evaluateCount
						
						 if(isCollect == '0'){
					    	   $('#isCollect').text('+Add to favourites')
					    	 //  $('#isCollect').next().removeClass('hide_01').addClass('hide_02')
					    	   $('#isCollect').next().show()
					    	  }else if(isCollect == '1'){
					    		  $('#isCollect').text('Collected')
						    	//  $('#isCollect').next().removeClass('hide_02').addClass('hide_01')
					    		   $('#isCollect').next().hide()
					    	  }
						
						
						if (factoryInfo) {
							var factory_info = factoryInfo.factoryInfo
							var factory_name = factoryInfo.factoryName
							var factory_logo = factoryInfo.factoryLogo
							var create_time = factoryInfo.createTime
							var state = factoryInfo.state
							var city = factoryInfo.city
							var district = factoryInfo.district
							var staffNumber = factoryInfo.staffNumber
							var detailsAddress = factoryInfo.detailsAddress
							var factoryValue = factoryInfo.factoryValue
							if(factoryValue){
                                factoryValue = factoryValue.replace("万元",'')
                                factoryValue = "¥"+factoryValue;
							}
							var establishmentYear = factoryInfo.establishmentYear
							var factoryAcreage = factoryInfo.factoryAcreage
							var website = factoryInfo.website
							var mainProcessS = factoryInfo.mainProcessS
							var dominantMaterialModel = factoryInfo.dominantMaterialModel
							var dominantMaterialSize = factoryInfo.dominantMaterialSize
							if(dominantMaterialSize){
								if(dominantMaterialSize == 1){
                                    dominantMaterialSize = '中';
								}
								if(dominantMaterialSize == 2){
                                    dominantMaterialSize = '大';
								}
								if(dominantMaterialSize == 0){
                                    dominantMaterialSize = '小';
								}
							}
                            var qualificationList = factoryInfo.qualificationList
							var factoryId = factoryInfo.factoryId
							var equipmentList = factoryInfo.equipmentList
							var productionEnvironment = factoryInfo.productionEnvironment
							var productionVideo = factoryInfo.productionVideo
							var factoryStatus = factoryInfo.factoryStatus
                            var tel = factoryInfo.tel
                            var phone = factoryInfo.mobile
							
							
							
							
							if(factoryStatus==1){
								$('.watch_fact').show()
							}
							
							$('#factoryId').val(factoryId)

							$('#fatoryInfo').text(factory_info)
		
							$('.factoryName').text(factory_name)

							
							if (factory_logo) {
								$('#factory_logo').attr('src', '/static_img/factory_logo/'+factoryId+'/'+factory_logo)
							}
							
							if (create_time) {

								var year = create_time.substr(0, 4);
								var month = create_time.substr(5, 2);

								var date = create_time.substr(8, 2);
								$('#create_time').text(
										year + '.' + month + '.' + date + '')
							}
							$('#region').text(
									(state ? state : '')
											+ (city ? ',' + city : '')
											+ (district ? ',' + district : ''))
							
						   if($('#region').text()){
							   $('#region').append('<i class="iconfont icon-01">&#xe854;</i>')
						   }		
											
											
							
								$('#staffNumber').html(staffNumber?(staffNumber+'<i class="iconfont icon-01">&#xe854;</i>'):"")
							
							
								$('#detailsAddress').html(detailsAddress?(detailsAddress+'<i class="iconfont icon-01">&#xe854;</i>'):"")
							
							
								$('#factoryValue').html(factoryValue?(factoryValue+'<i class="iconfont icon-01">&#xe854;</i>'):"")
							

							
								$('#establishmentYear').html(establishmentYear?(establishmentYear+'<i class="iconfont icon-01">&#xe854;</i>'):"")
							
							
								$('#factoryAcreage').html(factoryAcreage?(factoryAcreage+'<i class="iconfont icon-01">&#xe854;</i>'):"")
							
							

						        if(!isContains(website, "http://")){
                                    website = "http://"+website;
								}
                                $('#website').html(website?(website+'<i class="iconfont icon-01">&#xe854;</i>'):"");
                                $('#website').attr('href',website).attr('target','_blank');


                                $('#tel').html(tel?(tel+'<i class="iconfont icon-01">&#xe854;</i>'):"")

                                $('#phone').html(phone?(phone+'<i class="iconfont icon-01">&#xe854;</i>'):"")
							
							
								$('#dominantMaterialModel').html(
										dominantMaterialModel?(dominantMaterialModel+'<i class="iconfont icon-03">&#xe854;</i>'):"")
							
							
								$('#dominantMaterialSize').html(
										dominantMaterialSize?(dominantMaterialSize+'<i class="iconfont icon-03">&#xe854;</i>'):"")
							
							
							if(mainProcessS&&mainProcessS.length>0){
								
								var addProcess = '<span class="span-01" >Main Process</span>';
								
								for(var i=0;i<mainProcessS.length;i++){
									
									addProcess+='<span class="span_03"><em>'+mainProcessS[i]+'</em></span>';
									
								}
								addProcess+= '<i class="iconfont icon-03">&#xe854;</i>'
								
								$('#mainProcess').html(addProcess);

							}
							
							
							
						
						   if(qualificationList&&qualificationList.length>0){
							   var addqualification = '';
							   
							   for(var j=0;j<qualificationList.length;j++){
									var qualification = qualificationList[j]
									addqualification+= '<tr><td>'+(qualification.qualificationName?qualification.qualificationName:"")+
										              '</td><td>'+(qualification.validityTime?qualification.validityTime:"")
										              +'</td><td>'
										
										if(qualification.fileUrl){
											addqualification+='<a href="javaScript:void(0);" dataurl='+qualification.id+' factoryid='+factoryId+' onclick="download_file(this)" >Download</a>'
										}
										
									addqualification +='</td></tr>'
							
								}
							
							   $('#qualification').html(addqualification)
							   
						   }
						   
						   
						   if(equipmentList&&equipmentList.length>0){
							   var addequipment = '';
							   
							   for(var j=0;j<equipmentList.length;j++){
									var equipment = equipmentList[j]
									
									addequipment+=    '<tr><td>'+(equipment.equipmentNameEn?equipment.equipmentNameEn:"")+'</td>'
														+'<td>'+(equipment.equipmentModel?equipment.equipmentModel:"")+'</td>'
														+'<td>'+(equipment.number?equipment.number:"")+'</td>'
														+'<td>'+(equipment.type?equipment.type:"")+'</td></tr>'
										
							
							
								}
							
							   $('#equipmentList').html(addequipment)
							   
						   }
						   
						   
						   if(productionEnvironment){
							   
							   var productionEnvironmentS = productionEnvironment.split(',');
							   // var addpe = '<li><img src="../lib/video/poster-small.png"></li>';
							   var addpe = '';
							   var addpbe ='';
							   for(var j=0;j<productionEnvironmentS.length;j++){
								   var pe = productionEnvironmentS[j]
								   if(pe){
									   addpe+='<li><img src="/static_img/production_environment/'+factoryId+'/'+pe+'" ></li>';
									   addpbe+='<div class="div_video div_add">'
										     +'<img class="pic_add" src="/static_img/production_environment/'+factoryId+'/'+pe+'"></div>'
//										     +'<video id="video_1" class="video-js video vjs-big-play-centered" controls preload="none" poster="/static_img/production_environment/'+factoryId+'/'+pe+'" data-setup="{}">'
//										     +'<source src="http://jq22com.qiniudn.com/jq22-sp.mp4" type="video/mp4">'
//										     +'</video></div>'
									   
									   
									   
									   
								   }
								   
							   }

							   $('#div_video').after(addpbe)
							   $('#environmentPic').html(addpe)
							   
				
						   }
						   
						   if(productionVideo&&productionVideo.trim()!=""&&productionVideo!=undefined){
							   var addpeVideo = '<li><img src="/lib/video/poster-small.png"></li>';
							    $('#source_video').attr("src","/static_img/production_video/"+factoryId+"/convert/"+productionVideo)
							    $('#environmentPic').prepend(addpeVideo)     
							    $.getScript('/lib/video/video.min.js')
							    
							   
						   }else{
							 
							   $('#div_video').remove()
						   }
						   
						   
							  //工厂点评
						   
						    $('#evaluateCount').text(evaluateCount?evaluateCount:0)
						    refreshEvaluate(factoryEvaluateList)
				
						   bannerVideo();//轮播图部分
						   
						   
						   
						 
						   
						  
							
						
						

						}

					}

				}
			})
}

function download_file(obj){
    var dataid = $(obj).attr('dataurl')

	if(dataid){
		window.location = "/download/qualification-download.do?id="+dataid;
	}
	
}

/*
 * 添加收藏
 */
function addOrCancelCollect(obj){

	  var factoryId = $('#factoryId').val()
	  if(!factoryId){
		  return false;
		  
	  }
	  
	  var factoryName = $('.factoryName').eq(0).text()
	  
	  
	  $.ajax({
			url : "/viewFactoryInfo/addOrCancelCollect.do",
			type : "post",
			traditional : true,
			data : {
				'factoryId' : factoryId,
				
				'factoryName' :factoryName
			},
			datatype : "json",
			
			success : function(result) {
				
				 if(result.state == 0){
			    	  var status = result.data;
			    	  if(status == '0'){
			    	   $(obj).text('+Add to favourites')
			    	  // $(obj).next().removeClass('hide_01').addClass('hide_02')
			    	  //    $(obj).next().show()
						  easyDialog.open({
							  container : {
								  header : 'Prompt message',
								  content : 'Collection cancelled'
							  },
							  overlay : false,
							  autoClose : 2000
						  });
			    	  }else if(status == '1'){
			    		  $(obj).text('Collected')
				    	 // $(obj).next().removeClass('hide_02').addClass('hide_01') 
			    		 //    $(obj).next().hide()
                          easyDialog.open({
                              container : {
                                  header : 'Prompt message',
                                  content : 'Successful collection'
                              },
                              overlay : false,
                              autoClose : 2000
                          });
			    	  }
			       }
				 if(result.state ==2){
					 window.location = result.data;
				 }
				  
			}
				
			})
	  
	 
	
	   
	}



function ajaxSaveEvaluate() {
 
	var factoryId = $('#factoryId').val() 
	var evaluateInfo = $('#evaluateInfo').val() 
	
	$.ajax({
		url : "/viewFactoryInfo/publishEvaluate.do",
		type : "post",
		traditional : true,
		data : {
			'factoryId' : factoryId,
			'evaluateInfo' : evaluateInfo
		},
		datatype : "json",
		success : function(result) {
			if (result.state == 0) {
				
				easyDialog.open({
					container : {
						header : 'Prompt message',
						content : 'Successful'
					},
					overlay : false,
					autoClose : 1000
				});
				
				  $('#factoryEvaluateList').html('')
				  var factoryEvaluateList =  result.data.factoryEvaluateList
				  var evaluateCount = result.data.evaluateCount
				  
				  $('#evaluateCount').text(evaluateCount?evaluateCount:0)
				   
				   refreshEvaluate(factoryEvaluateList)
				
			}else{
				
				easyDialog.open({
					container : {
						header : 'Prompt message',
						content : 'failed'
					},
					overlay : false,
					autoClose : 1000
				});
				
			}
		}
	})

}








function bannerVideo() {
	var index = 0;
	var length = $("#img .div_video").length;
	var i = 1;

	$("#img .div_video").eq(0).css('display','inline-block');
	$("#cbtn li").eq(0).addClass("hov");
	$(".picSildeRight,#next").click(function() {
		slideNext();
	})
	$(".picSildeLeft,#prev").click(function() {
		slideFront();
	})
	$("#cbtn li").click(function() {
		index = $("#cbtn li").index(this);
		showImg(index);
	});
	//关键函数：通过控制i ，来显示图片
	function showImg(i) {
		$("#img .div_video").eq(i).stop(true, true).css('display','inline-block').fadeIn(800).siblings(".div_video").hide();
		$("#cbtn li").eq(i).addClass("hov").siblings().removeClass("hov");
	}
	
	

	function slideNext() {
		if(index >= 0 && index < length - 1) {
			++index;
			showImg(index);
		} else {
			showImg(0);
			index = 0;
			
			if(length>=5){
				aniPx = (length - 5) * 140 + 'px'; //所有图片数 - 可见图片数 * 每张的距离 = 最后一张滚动到第一张的距离
			}else{
				aniPx = '0px';
			}
			
			
			
			
			$("#cSlideUl ul").animate({
				"left": "+=" + aniPx
			}, 200);
			i = 1;
			return false;
		}
		if(i < 0 || i > length - 5) {
			return false;
		}
		$("#cSlideUl ul").animate({
			"left": "-=140px"
		}, 200)
		i++;
	}

	function slideFront() {
		if(index >= 1) {
			--index;
			showImg(index);
		}
		if(i < 2 || i > length + 5) {
			return false;
		}
		$("#cSlideUl ul").animate({
			"left": "+=140px"
		}, 200)
		i--;
	}
}



	
function thumbUp(obj){
	
	var dataid = $(obj).attr('dataid')
	
	if(dataid==null||dataid.trim()==''){
		return false;
	}
	
	
	if (userName == null || userName == '' || userName == undefined) {
		 window.location = "/en/login.html";
		 return false;
	}
	
	
	$.ajax({
		url : "/viewFactoryInfo/thumbUp.do",
		type : "post",
		traditional : true,
		data : {
			'dataid' : dataid
		},
		datatype : "json",
		success : function(result) {
			if (result.state == 0) {
				
				var isPrefer = result.data.isPrefer
				var preferCount = result.data.preferCount
				
				 
		    	  if(isPrefer == '0'){
		    	
		    	   $(obj).html('')
		    	   
		    	   $(obj).removeClass('area_zan_alreadly').html('<i class="iconfont icon-zan">&#xe618;</i>&nbsp;&nbsp;赞 ( <em class="zan_num">'+(preferCount?preferCount:0)+'</em> )')
		    	  }else if(isPrefer == '1'){
		    		  $(obj).html('')
			    	  $(obj).addClass('area_zan_alreadly').html('<i class="iconfont icon-zan">&#xe618;</i>&nbsp;&nbsp;已赞 ( <em class="zan_num">'+(preferCount?preferCount:1)+'</em> )')
		    	  }
		       }
				
				
				
				
			}
		
		})
	
	
	
}


function refreshEvaluate(list){
	
       var factoryEvaluateList = list
	   
	   
	   if(factoryEvaluateList&&factoryEvaluateList.length>0){
		   var addFactoryEvaluate = ''
			   for(var i=0;i<factoryEvaluateList.length;i++){
				   var factoryEvaluate = factoryEvaluateList[i]
				  
				   addFactoryEvaluate+='<div class="area_common">'
					                 +'<div class="readonly_area">'+(factoryEvaluate.evaluateInfo?factoryEvaluate.evaluateInfo:"")+'</div>'
					                 +'<span class="area_time">'+(factoryEvaluate.createTime?factoryEvaluate.createTime.substr(0,19):"")+'</span>'
					                
					                 
				   if(factoryEvaluate.isPrefer){
					   addFactoryEvaluate+='<span dataid="'+factoryEvaluate.id+'" onclick ="thumbUp(this)"  class="area_zan area_zan_alreadly">'
		                                  +'<i class="iconfont icon-zan">&#xe618;</i>'
					                      +'&nbsp;&nbsp;已赞 ( <em class="zan_num">'
				   }else{
					   addFactoryEvaluate+='<span dataid="'+factoryEvaluate.id+'" onclick ="thumbUp(this)"  class="area_zan">'
                       +'<i class="iconfont icon-zan">&#xe618;</i>'
					   +'&nbsp;&nbsp;赞 ( <em class="zan_num">'
				   }                        
				   addFactoryEvaluate+=(factoryEvaluate.count?factoryEvaluate.count:0)+'</em> )</span>'       
					                 +'</div>'
				   
				   
				   
			   }
		   
		   $('#factoryEvaluateList').html(addFactoryEvaluate)
		   
	   }
	
	
}

function queryProductList(page,factoryId){
	
	$.ajax({
		url : "/viewFactoryInfo/queryProductList.do",
		type : "post",
		traditional : true,
		data : {
			'page' : page,
			'pageSize' : 6,
			'factoryId' :factoryId
		},
		datatype : "json",
		success : function(result) {
			
			if (result.state == 0) {
				$('#productList').empty();
				var totalOrder = result.data.totalOrder
				var productList = result.data.productList
				
				
				var addProduct = ''
					
				if(productList&&productList.length>0){
					
					for (var i = 0; i < result.data.productList.length; i++) {
						var temp = result.data.productList[i];
						var process = [];
						var inductry = [];
                        //获取产品跳转链接地址
                        var productNameEn = temp.enProductName;
                        productNameEn = productNameEn.replace(/ /g, '-')
                        var detailUrl = '/manufacturer-category/'+factoryId+'/products/'+productNameEn+'-'+temp.id;
						
						
						if(temp.processEn){
							 process =temp.processEn.split(';');
						}
						
						if(temp.inductryEn){
							inductry =temp.inductryEn.split('>');
						}
						
						addProduct+='<dl class="dl_list">'
						          +'<dt class="dt_list"><a href="'+detailUrl+'" target="_blank">'
						
						if(temp.compressDrawingPath){
							addProduct+='<img src="'+temp.compressDrawingPath+'"/>'
						}else{
							addProduct+='<img src="../images/pic2.jpg"/>'
						}
						
						addProduct+='</a></dt><dd class="dd_list">'
							
						+'<p class="p_list"><span class="span_list1">Product Name</span><span class="span_list2">'
						if(temp.enProductName){
							if(temp.enProductName.length>5)
								addProduct+=  temp.enProductName.substr(0,5) +'...'
							else{
								addProduct+=  temp.enProductName
								}
						}
						
						
		
						addProduct+='</span></p>'
						+'<p class="p_list"><span class="span_list1">Process</span><span class="span_list2">'
						
						if(process.length>0){
							addProduct+= process[0]
							
						}	
						
						addProduct+='</span></p>'
						+'<p class="p_list"><span class="span_list1">Industry</span><span class="span_list2">'
						
						if(inductry.length>0){
							addProduct+= inductry[0]

						}	
						
						
						
						addProduct+='</span></p>'
						+'<p class="p_list"><span class="span_list1">Price</span><span class="span_list2">'
						
						
						if(temp.minquote){
							
	                        if(temp.minquote&&temp.purchasedUnit){
	                        	addProduct+= '￥'+temp.minquote+'/'+temp.purchasedUnit
	                        }
							
						}
						addProduct+= '</span></p>'
						+'</dd></dl>'
						
					}
					
					$('#productList').html(addProduct)
				}
				
				var totalPage = Math.ceil(totalOrder / 6);

				if(totalPage>0){
                    laypage({
                        cont: 'page_link',
                        pages: totalPage,
                        skin: '#006DCC', //皮肤
                        last:  totalPage,
                        groups:5,
                        prev: '<', //若不显示，设置false即可
                        next: '>' ,//若不显示，设置false即可
                        curr: location.hash.replace('#!fenye=', ''), //获取hash值为fenye的当前页
                        hash: 'fenye', //自定义hash值
                        jump: function(obj,first) {
                            if(!obj && !first){
                                queryProductList(obj.curr,factoryId);

                            }

                        }
                    })
				}

			}
			
		  }	
		})	
	
}


/*
 * 发送信息给采购商
 */
function sendMessageToFactory(){

	  var factoryId = $('#factoryId').val()
	  if(!factoryId){
		  return false;
		  
	  }
	  
	  var messageTitle = $('#messageTitle').val()
	  var messageInfo = $('#messageInfo').val()
	  
	  
	  $.ajax({
			url : "/viewFactoryInfo/sendMessageToFactory.do",
			type : "post",
			traditional : true,
            data : {
    			'factoryId' : factoryId,
    			'messageTitle' : messageTitle,
    			'messageInfo' :messageInfo
    		},
			datatype : "json",
			success : function(result) {
				
				 if(result.state == 0){
					 
					 $('#messageTitle').val('')
					 $('#messageInfo').val('')
		
					 easyDialog.open({
							container : {
								header : 'Prompt message',
								content : 'Send successfully'
							},
							overlay : false,
							autoClose : 1000
						});
					 
					 
			    	
			       }else{
			    	   
			    	   easyDialog.open({
							container : {
								header : 'Prompt message',
								content : 'Send failed'
							},
							overlay : false,
							autoClose : 1000
						});
			    	   
			    	   
			       }
				
				 $('#sendMessageToFactory').css({'background-color':'#999'}).removeAttr('disabled');
			}
				
			})
	  
	 
	
	   
	}


// function tabChange(tabBar, tabCon, class_name, tabEvent, i) {
// 	var $tab_menu = $(tabBar);
// 	// 初始化操作
// 	$tab_menu.removeClass(class_name);
// 	$(tabBar).eq(i).addClass(class_name);
// 	$(tabCon).hide();
// 	$(tabCon).eq(i).show();
//
// //	if(i==1 ||i==3 ){
// //		addcss1()
// //	}else{
// //		addcss()
// //	}
//
//
// 	$tab_menu.bind(tabEvent, function() {
// 		$tab_menu.removeClass(class_name);
// 		$(this).addClass(class_name);
// 		var index = $tab_menu.index(this);
// 		$(tabCon).hide();
// 		$(tabCon).eq(index).show();
// //		if(index==1 ||index==3 ){
// //			addcss1()
// //		}else{
// //			addcss()
// //		}
//
//
// 		var url = location.href;
// 		if(url.indexOf('#!fenye')>0){
// 		newUrl = url.substring(0,url.indexOf('#!'))
// 		window.history.pushState({}, 0, newUrl);
// 		}
// 	})
//
// }


function addcss() {
	/* body 高度控制底部位置 */
	var h1 = $(document.body).height();
	var h2 = window.screen.availHeight;
	if (h1 < h2) {
		$('#footer').addClass('footer1')
	} else {
		$('#footer').removeClass('footer1');
	}
}


function addcss1() {
	/* body 高度控制底部位置 */
	var h1 = $(document.body).height()+150;
	var h2 = window.screen.availHeight;
	if (h1 < h2) {
		$('#footer').addClass('footer1')
	} else {
		$('#footer').removeClass('footer1');
	}
}

function isContains(str, substr) {
    return str.indexOf(substr) >= 0;
}