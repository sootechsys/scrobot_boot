<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>scrobot_공통사이드바</title>


<style>


#mysidenav img:hover{
	cursor:pointer;
}

/* 사이드바 스타일      */
.sidenav {
	height: 100%;
	position: fixed;
	z-index: 1;
	top: 0;
	left: 0;
	background-color: #dee5f7;
	overflow-x: hidden;
	transition: 0.5s ease-in-out;
	width: 226px;
}

#div_mainImg{
	position:relative;
	margin-top:50px;
}

#div_mainImg img:hover{
	cursor:default;
}

#div_compoTable{
	text-align:center;
}

#compoTable{
	display: inline-block;
	position:relative;
	margin-top:50px;
}

.JCLRgrip {
	cursor: ew-resize;
}


#compoTable tr{
	height :50px;
}

#compoTable td{
	width: 80px;
}

#div_cellTable{
	position:relative;
	margin-top:10px;
	text-align: center;
}

#cellTable{
	display: inline-block;
	position:relative;
	border-collapse: collapse;
}

#cellTable tr{
	height:45px;
}

#cellTable td:not(:last-child){
	border-right:1px solid grey;
}

#cellTable tr:not(:last-child){
	border-bottom:1px solid grey;
}




#div_propertyTable{
	position:relative;
	margin-top:100px;
	background-color: #bbc2d5;
	text-align: left;
	height:180px;
	
}

#div_propertyTable h4{
	position:relative;
	padding-top:10px;
}


#propertyTable{
	display:block;
	width:90%; 
	align: center;
	border-collapse: collapse;
	background-color: white;
	margin : 10px 10px 5px 10px;
	overflow:auto;
}

#propertyTable tr:not(:nth-child(6)){
	border-bottom:1px solid black;
}


#propertyTable tr td:first-child{
	border-right:1px solid black;
}

#propertyTable tr td{
	padding-left:5px;
}


#propertyTable input{
	border:none;
}

.ibx_property{
	width:125px;
	font-size:1em;
}

#btn_infoUpdate{
	margin-right:10px;
}


</style>
<script type="text/javaScript">

	// 업무 및 쿼리 맵
	vjQuery = [];


  
  // outline 제자리 복귀시 rownum
  vnSortNum = 0;
  
  // drop여부
  vsDropYn = "";
  
  vbTitleDragCheck = false;
  vbButtonDragCheck = false;
  vbInputBoxDragCheck = false;
  vbCheckBoxDragCheck = false;
  vbRadioBoxDragCheck = false;
  // 마우스다운 여부
  vsMouseDownYn = "N";
  
  // 테이블위의 라벨 더블클릭시 여부
  vsLabelYn = "N";

  
  

  fn_creationTableResize = function(ui){
	  
	  var voChild = $("#creationTable").children();
	  var voGrandChild = voChild.children();
		
		var vnTotalLeft = 0;
		var vnTotalTop = 0;
		for(var i=0; i<voChild.length; i++){
			if(voChild.eq(i).attr("id") != ""){
				var vnLeft = Number(voChild.eq(i).css("left").replace("px",""));
				var vnWidth = Number(voChild.eq(i).width());
				
				var vnTop = Number(voChild.eq(i).css("top").replace("px",""));
				var vnHeight = Number(voChild.eq(i).height());
				
				if(vnTotalLeft < vnLeft+vnWidth){
					vnTotalLeft = vnLeft+vnWidth;
				}
				
				if(vnTotalTop < vnTop+vnHeight){
					vnTotalTop = vnTop+vnHeight;
				}
				
				for(var j=0; j<voGrandChild.length; j++){
					if(voGrandChild.eq(j).attr("id") != ""){
						vnLeft = Number(voGrandChild.eq(j).css("left").replace("px",""));
						vnWidth = Number(voGrandChild.eq(j).width());
						
						vnTop = Number(voGrandChild.eq(j).css("top").replace("px",""));
						vnHeight = Number(voGrandChild.eq(j).height());
						
						if(vnTotalLeft < vnLeft+vnWidth){
							vnTotalLeft = vnLeft+vnWidth;
						}
						
						if(vnTotalTop < vnTop+vnHeight){
							vnTotalTop = vnTop+vnHeight;
						}
					}
				}
				
			}
		}
		
		if(vnTotalLeft >  $("#creationForm").width()){
			var vsFormLeft = (ui.offset.left+500)+"px";
		  var vsTableLeft = (ui.offset.left+430)+"px";
	  	  $("#creationForm").css("width",vsFormLeft);
	  	  
	  	  $("#creationTable").css("width",vsTableLeft);
	  	  
		}
		
		if(vnTotalTop+200 >  $("#creationForm").height()){
		  var vsFormTop = (ui.offset.top+600)+"px";
		  var vsTableTop = (ui.offset.top+430)+"px";
	  	  $("#creationForm").css("height",vsFormTop);
	  	  
	  	  $("#creationTable").css("height",vsTableTop);
	  	  fn_saveClone();
		}
		
	  
  }

 /**************************************
   * accordion 관련 함수
   **************************************/
    fn_draggable = function(){
    	
	 
	 
	 if($( "[compoDvs=div_content]" ).length != 0){
		 $( "[compoDvs=div_content]" ).draggable(
			{cursor: "move",
			 cancel:"[compoDvs=div_table]",
		     grid: [ 10, 10 ],
			 stop: function( event, ui ) {
					  fn_creationTableResize(ui);
			}
		});
		 
		$( "[compoDvs=div_content]" ).resizable({
			stop: function( event, ui ) {
				fn_saveClone();
			}
		});
	 }
	 
	 
	 if($( ".div_table" ).length != 0){
		 $( ".div_table" ).draggable({ cursor: "move",
				/* grid: [ 10, 10 ], */
				cancel: "table",
				stop: function( event, ui ) {
					  fn_creationTableResize(ui);
			}
			});
		 
		 
		 $( "[compoDvs=div_table]" ).resizable(
	    			{helper: "ui-resizable-helper",
	    			start: function(event,ui){
	    				vsMouseDownYn = "N";
		    			
	    				var vnLeft = Number($(ui.helper).css("left").replace("px",""));
	    				var vnTop = Number($(ui.helper).css("top").replace("px",""));
	    				
	    				$(ui.helper).css("left",(vnLeft+10)+"px");
	    				$(ui.helper).css("top",(vnTop+10)+"px");
	    			},
	    			stop: function( event, ui ) {
	    			
	    				var voTr = $("#"+ui.element.attr("id")+" tr");
	    				var vnTrLen = voTr.length;
	    				
	    				
	    				for(var i=0; i<vnTrLen; i++){
	    					var vnTdLen =voTr.eq(i).children().length;
	    					
	    					for(var j=0; j<vnTdLen; j++){
	    						var vnItmLen = voTr.eq(i).children().eq(j).children().length;
	    						
	    						for(var k=0; k<vnItmLen; k++){
	    							$("#"+ui.element.attr("id")+" tr").eq(i).children().eq(j).children().eq(k).css("display","none");
	    						}
	    						
	    						
	    						$("#"+ui.element.attr("id")+" tr").eq(i).children().eq(j).css("height","0px");
	    						$("#"+ui.element.attr("id")+" tr").eq(i).children().eq(j).css("width","0px");
	    						
		    				}
	    					
	    					$("#"+ui.element.attr("id")+" tr").eq(i).css("height","0px");
	    				}
	    			
	    				ui.element.height(ui.element.height()+20)
	    				ui.element.width(ui.element.width()+20)
	    				
	    				ui.element.children().eq(0).height(ui.helper.height()-2);
	    				ui.element.children().eq(0).width(ui.helper.width()-3);
	    				
	    				var vnTrSize = [];
	    				var vnTdSize = [];
	    				for(var i=0; i<vnTrLen; i++){
	    					vnTrSize.push($("#"+ui.element.attr("id")+" tr").eq(i).css("height"));
	    					for(var j=0; j<vnTdLen; j++){
	    						vnTdSize.push($("#"+ui.element.attr("id")+" tr").eq(i).children().eq(j).css("width"));
	    						
		    				}
	    				}
	    				
	    				for(var i=0; i<vnTrLen; i++){
    						vnTrSize.push($("#"+ui.element.attr("id")+" tr").eq(i).css("height"),vnTrSize[i]);
    						var vnTdLen =voTr.eq(i).children().length;
    						for(var j=0; j<vnTdLen; j++){
    							$("#"+ui.element.attr("id")+" tr").eq(i).children().eq(j).css("height",vnTrSize[i]);
    							$("#"+ui.element.attr("id")+" tr").eq(i).children().eq(j).css("width",vnTdSize[j]);
    						
    							var vnItmLen = voTr.eq(i).children().eq(j).children().length;
    							for(var k=0; k<vnItmLen; k++){
        							$("#"+ui.element.attr("id")+" tr").eq(i).children().eq(j).children().eq(k).css("display","block");
        						
    	    					}
	    					}
    						
    						
    					}
	    				
	    				
	    				
	    				fn_saveClone();
	    				}
	    			}
	    	
	    );
	 }
	 
	 if($( ".div_title" ).length != 0){
		$( ".div_title" ).draggable({
				cancel:"[compoDvs=span_title]",
				cursor: "move",
			    grid: [ 10, 10 ],
			    stop: function( event, ui ){
                  vbTitleDragCheck = true;
                 fn_creationTableResize(ui);
  				}
		});
		
		 
	 }
	 
	 if($( ".div_label" ).length != 0){
			$( ".div_label" ).draggable({
					cancel:"[compoDvs=span_label]",
					cursor: "move",
				    grid: [ 10, 10 ],
				    start:function(event,ui){
				    	vsMouseDownYn = "N";
				    },
				    stop: function( event, ui ){
	                  vbTitleDragCheck = true;
	                 fn_creationTableResize(ui);
	  				}
			});
			 
		 }
	 
	 
	 if($(".div_checkbox").length != 0){
		 $(".div_checkbox").draggable({
			cursor:"move",
			  grid: [ 10, 10 ],
			   start:function(event,ui){
			    	vsMouseDownYn = "N";
			    },
             stop: function( event, ui ){
	               vbCheckBoxDragCheck = true;
	              fn_creationTableResize(ui);
             }
		 });
		 
		 $( "[compoDvs=div_checkbox]" ).resizable(
	    			{helper: "ui-resizable-helper",
	    			start: function(event,ui){
	    				vsMouseDownYn = "N";
		    			
	    				var vnLeft = Number($(ui.helper).css("left").replace("px",""));
	    				var vnTop = Number($(ui.helper).css("top").replace("px",""));
	    				
	    				$(ui.helper).css("left",(vnLeft+10)+"px");
	    				$(ui.helper).css("top",(vnTop+10)+"px");
	    			},
	    			stop: function( event, ui ) {
	    				ui.element.width(ui.element.width()+20)
	    				ui.element.height(ui.element.height()+20)
	    			
	    				//ui.element.children().eq(0).width(ui.helper.width()-3);
	    				//ui.element.children().eq(0).height(ui.helper.height()-2);
	    				fn_saveClone();
	    				}
	    			}
	    	
	    );
	 }
	 
	 if($(".div_radio").length != 0){
		 $(".div_radio").draggable({
			cursor:"move",
			  grid: [ 10, 10 ],
			   start:function(event,ui){
			    	vsMouseDownYn = "N";
			    },
             stop: function( event, ui ){
	               vbRadioBoxDragCheck = true;
	              fn_creationTableResize(ui);
             }
		 });
		 
		 $( "[compoDvs=div_radio]" ).resizable(
	    			{helper: "ui-resizable-helper",
	    			start: function(event,ui){
	    				vsMouseDownYn = "N";
		    			
	    				var vnLeft = Number($(ui.helper).css("left").replace("px",""));
	    				var vnTop = Number($(ui.helper).css("top").replace("px",""));
	    				
	    				$(ui.helper).css("left",(vnLeft+10)+"px");
	    				$(ui.helper).css("top",(vnTop+10)+"px");
	    			},
	    			stop: function( event, ui ) {
	    				ui.element.width(ui.element.width()+20)
	    				ui.element.height(ui.element.height()+20)
	    			
	    				//ui.element.children().eq(0).width(ui.helper.width()-3);
	    				//ui.element.children().eq(0).height(ui.helper.height()-2);
	    				fn_saveClone();
	    				}
	    			}
	    	
	    );
	 }
	 
	 if($( ".div_button" ).length != 0){
		 $(".div_button").draggable({cursor: "move",
			   grid: [ 10, 10 ],
			   start:function(event,ui){
			    	vsMouseDownYn = "N";
			    },
              stop: function( event, ui ){
	               vbButtonDragCheck = true;
	              fn_creationTableResize(ui);
	   		}
		});
		 
		 
		 $( "[compoDvs=div_button]" ).resizable(
	    			{helper: "ui-resizable-helper",
	    			start: function(event,ui){
	    				vsMouseDownYn = "N";
		    			
	    				var vnLeft = Number($(ui.helper).css("left").replace("px",""));
	    				var vnTop = Number($(ui.helper).css("top").replace("px",""));
	    				
	    				$(ui.helper).css("left",(vnLeft+10)+"px");
	    				$(ui.helper).css("top",(vnTop+10)+"px");
	    			},
	    			stop: function( event, ui ) {
	    				ui.element.width(ui.element.width()+20)
	    				ui.element.height(ui.element.height()+20)
	    			
	    				ui.element.children().eq(0).width(ui.helper.width()-3);
	    				ui.element.children().eq(0).height(ui.helper.height()-2);
	    				fn_saveClone();
	    				}
	    			}
	    	
	    );
		 
		 
		

	 }
	 
	 

	 if($( "[compoDvs=div_inputBox]" ).length != 0){
		 $("[compoDvs=div_inputBox]").draggable({cursor: "move",
			   grid: [ 10, 10 ],
			   start:function(event,ui){
			    	vsMouseDownYn = "N";
			    },
			   stop: function(event,ui){
				  fn_creationTableResize(ui);
				}
		});
		 
		 
 		 $( "[compoDvs=div_inputBox]" ).resizable(
	    			{helper: "ui-resizable-helper",
	    			start: function(event,ui){
	    				vsMouseDownYn = "N";
		    			
	    				var vnLeft = Number($(ui.helper).css("left").replace("px",""));
	    				var vnTop = Number($(ui.helper).css("top").replace("px",""));
	    				
	    				$(ui.helper).css("left",(vnLeft+10)+"px");
	    				$(ui.helper).css("top",(vnTop+10)+"px");
	    			},
	    			stop: function( event, ui ) {
	    				ui.element.width(ui.element.width()+25)
	    				ui.element.height(ui.element.height()+25)
	    			
	    				ui.element.children().eq(0).width(ui.helper.width()-3);
	    				ui.element.children().eq(0).height(ui.helper.height()-2);
	    				fn_saveClone();
	    				}
	    			}
	    	
	    );
		 
	 }
	 
	if($( "[compoDvs=div_select]" ).length != 0){
		$("[compoDvs=div_select]").draggable({cursor: "move",
				grid: [ 10, 10 ],
				start:function(event,ui){
			    	vsMouseDownYn = "N";
			    },
				stop: function( event, ui ){
					fn_creationTableResize(ui);
				}
		});
		
		
		$( "[compoDvs=div_select]" ).resizable(
    			{helper: "ui-resizable-helper",
    			start: function(event,ui){
    				vsMouseDownYn = "N";
	    			
    				var vnLeft = Number($(ui.helper).css("left").replace("px",""));
    				var vnTop = Number($(ui.helper).css("top").replace("px",""));
    				
    				$(ui.helper).css("left",(vnLeft+10)+"px");
    				$(ui.helper).css("top",(vnTop+10)+"px");
    			},
    			stop: function( event, ui ) {
    				ui.element.width(ui.element.width()+20)
    				ui.element.height(ui.element.height()+20)
    			
    				ui.element.children().eq(0).width(ui.helper.width()-3);
    				ui.element.children().eq(0).height(ui.helper.height()-2);
    				fn_saveClone();
    				}
    			}
    	
    );
	 
	 }
	 

	 


 
  
  
  
  
  
  
  
  	  
  	  
  	  
  	$( "#creationTable" ).droppable({
        drop: function( event, ui ) {
        
        	vsDropYn = "Y";
	        if(ui.draggable.attr("compoDvs") != "div_content"){
	        		
	            var voContent = $("[compoDvs=div_content]");
	            var vnContLength = voContent.length;
	            
	            // 부모 아이디
	            var vsParentId = ui.draggable.parent().attr("id");
	            
	         	// 부모 컴포넌트 종류
	            var vsParentCompoDvs = ui.draggable.parent().attr("compoDvs");
	            // 부모 클래스
	            var vsParentClass = ui.draggable.parent().attr("class");
	            
	            // 움직인곳의 세로높이
	            var vnCurrTop = Number(ui.draggable.css("top").replace("px",""));
	            
	         	// 움직인곳의 가로높이
	            var vnCurrLeft = Number(ui.draggable.css("left").replace("px",""));
	         	
	         	var vsDivYn = "N";
	        	var vnDivRow = 0;
	        	
	            if(vsParentClass != null){
	            	// 출발한 곳이 테이블이라면
	            	if(ui.draggable.parent().prop("tagName") == "TD"){
	            		// 출발한 div의 높이
		            	var vnOldParentTop = Number(ui.draggable.parent().offset().top);
		            	
		            	// 출발한 div의 폭
		            	var vnOldParentLeft = Number(ui.draggable.parent().offset().left);
		            	vnCurrTop += vnOldParentTop;
		            	vnCurrTop -= 132;
		            	vnCurrLeft += vnOldParentLeft;
		            	vnCurrLeft -= 248;
	            	}
	            	
	            	// 출발한 곳이 안이라면
	            	if(vsParentCompoDvs == "div_content"){
	            		// 출발한 div의 높이
		            	var vnOldParentTop = Number(ui.draggable.parent().css("top").replace("px",""));
		            	
		            	// 출발한 div의 폭
		            	var vnOldParentLeft = Number(ui.draggable.parent().css("left").replace("px",""));
		            	vnCurrTop += vnOldParentTop;
		            	vnCurrLeft += vnOldParentLeft;
		            	
		            	
		            	// div_content 개수 동안 반복
	    	         	for(var i=0; i<vnContLength; i++){
	    	         		var top = Number(voContent.eq(i).css("top").replace("px",""));
	                		var height = Number(voContent.eq(i).css("height").replace("px",""));
	                		var left = Number(voContent.eq(i).css("left").replace("px",""));
	                		var width = Number(voContent.eq(i).css("width").replace("px",""));
	                		
	                		// 도착한 곳이 div 안이라면(밖->안)
	    	                if(vnCurrTop < top+height && vnCurrTop > top &&
	    	                   vnCurrLeft < left+width && vnCurrLeft > left){
	    	                	
	    	                	vsDivYn = "Y";
	    	                }
	                		
	        	            if(vsDivYn == "Y"){
	        	            	vnDivRow = i;
	        	            	break;
	        	            }
	    	         	}
		            	
		            
	            	}
	            	
	            	// 출발한 곳이 밖이라면	
	            	if(vsParentId == "creationTable"){
	            		// div_content 개수 동안 반복
	    	         	for(var i=0; i<vnContLength; i++){
	    	         		var top = Number(voContent.eq(i).css("top").replace("px",""));
	                		var height = Number(voContent.eq(i).css("height").replace("px",""));
	                		var left = Number(voContent.eq(i).css("left").replace("px",""));
	                		var width = Number(voContent.eq(i).css("width").replace("px",""));
	                		
	                		// 도착한 곳이 div 안이라면(밖->안)
	    	                if(vnCurrTop <= top+height && vnCurrTop >= top && vnCurrLeft <= left+width && vnCurrLeft >= left){
	    	                	
	    	                	vsDivYn = "Y";
	    	                }
	                		
	        	            if(vsDivYn == "Y"){
	        	            	vnDivRow = i;
	        	            	break;
	        	            }
	    	         	}
	            		
	            	}
	            	
	            }
	            	
	            	

	         	
	         	ui.draggable.css("position","absolute");
	         	
	            // 출발한 곳이 밖이라면
	            if(vsParentId == "creationTable"){
	            	
	            	// 움직인곳이 div 안으로 이동했다면(밖->안)
	            	if(vsDivYn == "Y"){
	            		// 도착한 div의 높이
	        			var vnNewParentTop = Number(voContent.eq(vnDivRow).css("top").replace("px",""));
	        			// 도착한 div의 폭
	        			var vnNewParentLeft = Number(voContent.eq(vnDivRow).css("left").replace("px",""));
	        			
	        			ui.draggable.css("top",(vnCurrTop-vnNewParentTop-31)+"px")
            			ui.draggable.css("left",(vnCurrLeft-vnNewParentLeft-21)+"px")
            			
            			
            			voContent.eq(vnDivRow).append(ui.draggable);
            			
	            	// 움직인곳이 밖으로 이동했다면(밖->밖)
	            	} else{
	            		// 아무액션 필요없음
	            	}
	            
	            // 출발한 곳이 div 안일경우
	            } else{
	            	
            		// 도착한 곳이 div 안이라면(안->안)
	            	if(vsDivYn == "Y"){
	            		
	            		// 도착한 div의 높이
	        			var vnNewParentTop = Number(voContent.eq(vnDivRow).css("top").replace("px",""));
	        			// 도착한 div의 폭
	        			var vnNewParentLeft = Number(voContent.eq(vnDivRow).css("left").replace("px",""));
	        			
            			ui.draggable.css("top",(vnCurrTop-vnNewParentTop)+"px")
            			ui.draggable.css("left",(vnCurrLeft-vnNewParentLeft)+"px")
            			
            			voContent.eq(vnDivRow).append(ui.draggable);
	            	
	            	// 도착한 곳이 div 밖이라면(안->밖)
	            	} else{
	            		
	            		ui.draggable.css("top",(vnCurrTop+33)+"px")
	            		ui.draggable.css("left",(vnCurrLeft+23)+"px")
	            		$( this ).append(ui.draggable);
	            	}
	            	
	            }
	        }
	        
	        fn_saveClone();
        }
  	
  	 });
  
	    $( "td" ).droppable({
	        drop: function( event, ui ) {
	        	var vsCompoDvs = ui.draggable.attr("compoDvs");
	        	if(["div_inputBox","div_select","div_button","div_label","div_checkbox","div_radio"].indexOf(vsCompoDvs) != -1){
	        		ui.draggable.css("top","");
	        		ui.draggable.css("left","");
	        		ui.draggable.css("position","relative");
	        		ui.draggable.css("margin","0");
	        		$(this).append(ui.draggable);
	        		
	        		fn_saveClone("td");
	        		vsMouseDownYn = "N";
	        	}
	        
	        }
	    });
	    
	    var vnResizeLen = $(".ui-resizable-handle").length;
	    for(var i=0; i<vnResizeLen; i++){
	    	var vnHandleLen = $(".ui-resizable-handle").eq(i).parent().children('.ui-resizable-handle').length;
	    	if(vnHandleLen > 3){
	    		for(var j=3; j<vnHandleLen; j++){
	    			$(".ui-resizable-handle").eq(i).parent().children('.ui-resizable-handle').eq(3).remove();
	    		}
	    	}
	    }
	    
	    
	    
    
    };
	
	
	
	
	/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 그리기 이벤트 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ */
	
	/* checkBox 만들기 */
	function checkboxCreation(){
		var info = {"header" : "checkBox",
			    "width"  : "700px",
			    "height" : "500px",
			    "callBack" : "boxCreationCallBack"
			   }
		
		robot.openPop(info, "view010101P10.jsp");		
	}
		
	/* radioBox 만들기 */
	function radioboxCreation(){
		var info = {"header" : "radioBox",
			    "width"  : "700px",
			    "height" : "500px",
			    "callBack" : "boxCreationCallBack"
			   }
		
		robot.openPop(info, "view010101P11.jsp");	
	}
	
	/* select박스 그리기 */
	function selectCreation() {
		var info = {"header" : "selectBox",
			    "width"  : "700px",
			    "height" : "500px",
			    "callBack" : "selectboxCreationCallBack"
			   }
		
		robot.openPop(info, "view010101P12.jsp");
	}
	
	/* select박스 그리기 CallBack */
	selectboxCreationCallBack = function(param){
		onclick.draw("select");
	}
	
	selectUpdateCallBack = function(param){
		onclick.draw(param);
	}
	
	/* box그리기 CallBack */
	boxCreationCallBack = function(param){
		onclick.draw(param);
	}
	
	/* box수정 CallBack */
	boxUpdateCallBack = function(param){
		onclick.draw(param);
	}
	
	/* DIV 만들기 */
	function divCreation() {
		onclick.draw("div");
	}
	/* TITLE 만들기 */
	function titleCreation() {
		
		onclick.draw("title");
	}
	
	/* Label 만들기 */
	function labelCreation() {
		
		onclick.draw("label");
	}
	
	/* button 만들기 */
	function buttonCreation() {
		onclick.draw("button");
	}
	
	/* 테이블그리기 */
	function tableCreation() {
		robot.prompt("테이블생성", "행과 열의 갯수를 지정하십시오.", ["행","열"],"생성","취소","fn_tableCreationCallBack");
	}
	
	
	/* 테이블그리기 CallBack */
	fn_tableCreationCallBack = function(param) {
		onclick.draw("table",param);
	}
	
	/* input박스 그리기 */
	function inputCreation() {
		onclick.draw("input");
	}
	
	
	
	
	queryCreation = function(){
		$.ajax({
			url : "/userIdSessionYn.do",
			type : "POST",
			success : function(data) {
				
				// 세션에 id 없을경우
				if(data == ""){
					robot.alert("세션이 만료되었습니다. 다시 로그인 해주시기 바랍니다.","","","fn_saveListCallAlert");
					
				// 세션에 id가 있다면
				} else{
					var param = {
						"mapInfo"	: vjQuery
				    }
					var info = {"header" : "쿼리생성",
							    "width"  : "800px",
							    "height" : "500px",
							    "callBack" : "fn_queryCreationCallBack",
							    "param" : param}
					robot.openPop(info, "view010101P02.jsp");
				}

			},
			error : function() {
			}
		})
	}
	
	fn_queryCreationCallBack = function(param){
		if(param == ""){
			return false;
		}
		vjQuery = param;
	}
	
	/* ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 그리기 이벤트 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ */

	/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ click 이벤트 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ */
	
	var shiftHold = 0;
	$(document).ready(function(){
		

		$("body").keydown(function(e){ // 키누를떄
			if(e.keyCode == 17){ //ctrl 
				shiftHold = 1;
			}
		
			else if(e.keyCode == 46){ // delete
			
				var vsTdFocus = $("td[tableFocus=true]");
				var vnTdFocusLengh = vsTdFocus.length;
				var voFocusInfo = $("[focus=true]");
				var vsCompoDvs = voFocusInfo.attr("compoDvs");
				
				if(vnTdFocusLengh != 0 && $(document.activeElement).attr("class") != "ibx_property"){
					vsTdFocus.parent().parent().parent().parent().remove();
					fn_saveClone();
				}
					
				if(["inputBox","button","selectBox","span_title","span_label"].indexOf(vsCompoDvs) != -1){
					voFocusInfo.parent().remove();
					fn_saveClone();
				} else{
					$("[focus=true]").remove();
					fn_saveClone();
				}
				
				
			}
			
			
			// enter 클릭시
			else if(e.keyCode == 13){
			
				var vsFocusID = $(document.activeElement).attr("id");
				var vsFocusClass = $(document.activeElement).attr("class");
				
				if($("#btn_infoUpdate").css("display") != "none"){
					if(vsFocusID != null){
						var vsFocusIDSplit = vsFocusID.substr(0,17);
						
						if(vsFocusIDSplit == "ibx_propertyTable"){
							infoUpdate();
							$(document.activeElement).blur();
						}
					}
					
				}
				
				if(vsFocusClass == "prompt_input"){
					$("#btn_promptSave").click();
				}
			}
			
			
			// esc 클릭시
			else if(e.keyCode == 27){
				$(".div_pop").last().remove()
			}
				
		});
		
		$("body").keyup(function (e){ // 키뗄떼
			if(e.keyCode == 17){
				shiftHold = 0;
			}
		});
	});
	
	
	fn_creationClick = function(){
		
		
/* 		if(shiftHold == 0 && vsMouseDownYn == "N"){
			
			focusOut.All();
		}
		
		vsMouseDownYn = "N"; */
		
	}
	
	
	vsMouseDownInfo = {
			"row" : "",
			"col" : ""
	};
	
 	$(document).click(function(e){
		if($(".div_pop span").text() == "Preview"){
			return false;
		}
 		fn_draggable();
 		
		onclick.focus(shiftHold,e);
		
	});
 	
 	
 	fn_tdMouseDown = function(e){
 		focusOut.All();	
 	
 		vsMouseDownYn = "Y";
 		
 		$(e).attr("tableFocus","true");
		vsMouseDownInfo.row = $(e.parentElement).attr("row");
		vsMouseDownInfo.col = $(e).attr("shell");
	}
 	
 	fn_tdMouseUp = function(e){
 	
 		vsMouseDownYn = "N";
 		
	}

	fn_tdMouseOver = function(e){
		if(vsMouseDownYn == "Y"){
			var vnRow = $(e.parentElement).attr("row");
			var vnCol = $(e).attr("shell");
			
			var vnStartRow = vsMouseDownInfo.row;
			var vnStartCol = vsMouseDownInfo.col;
			var vnChange = 0;
			
			focusOut.All();	
			
			if(vnStartRow > vnRow){
				vnChange = vnRow;
				vnRow = vnStartRow;
				vnStartRow = vnChange;
			}
			
			if(vnStartCol > vnCol){
				vnChange = vnCol;
				vnCol = vnStartCol;
				vnStartCol = vnChange;
			}
			
			for(var i=vnStartRow; i<=vnRow; i++){
				for(var j=vnStartCol; j<=vnCol; j++){
					
					var vsTableID = $(e).parent().parent().parent().attr("id");
					
					if($("#"+vsTableID+" [row="+i+"] [shell="+j+"]").css("display") == "none"){
						continue;
					}
					$("#"+vsTableID+" [row="+i+"] [shell="+j+"]").attr("tableFocus","false");
					$("#"+vsTableID+" [row="+i+"] [shell="+j+"]").attr("tableFocus","true");
				}
			}
			
		}
		

	
	}
	
	
	
	/* ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ click 이벤트 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ */
	

	/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ 더블클릭 이벤트 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ */
	fn_InputBoxOnDblClick = function(param){ //input
		//기능 구분되면 작성
	}
	
	fn_SelectBoxOnDblClick = function(param){ //select
		// 기능구분되면 작성
	}
	
	fn_titleOnDblClick = function(param){ // title
		$(param).attr("focus","true");
		robot.getAttr(param);
		robot.prompt("타이틀입력","타이틀을 입력하시오",["타이틀"],"","","fn_titleOnDblClickCallBack");
	
		voPromptObject = param;
			
	}
	
	fn_labelOnDblClick = function(param){
		$(param).attr("focus","true");
		robot.getAttr(param);
		robot.prompt("라벨입력","라벨을 입력하시오",["라벨"],"","","fn_titleOnDblClickCallBack");
	
		voPromptObject = param;
		
		vsLabelYn = "Y";
			
	}
	
	fn_radioBoxOnDblClick = function(param){
		$(param).attr("focus","true");
		robot.getAttr(param);
		robot.prompt("라벨입력","라벨을 입력하시오",["라벨"],"","","fn_radioBoxOnDblClickCallBack");
	
		voPromptObject = param;
		
		vsLabelYn = "Y";
	}

	fn_radioBoxOnDblClickCallBack = function(param){
		
		if(param == ""){
			voPromptObject = "";
			return false;
		}
		
		$(voPromptObject).parent().css("width","1000px");
		voPromptObject.textContent = param[0];
		$(voPromptObject).attr("value",param[0]);
		
		var vnWidth = Number($(voPromptObject).css("width").replace("px",""));
		var vnHeight = Number($(voPromptObject).css("height").replace("px",""));
		$(voPromptObject).parent().css("width",(vnWidth+30)+"px");
		$(voPromptObject).parent().css("height",(vnHeight+20)+"px");
		
		robot.getAttr(voPromptObject);
		voPromptObject = "";
		
	}
	
	fn_checkBoxOnDblClick = function(param){
		$(param).attr("focus","true");
		robot.getAttr(param);
		robot.prompt("라벨입력","라벨을 입력하시오",["라벨"],"","","fn_checkBoxOnDblClickCallBack");
		
		voPromptObject = param;
	}
	
	fn_checkBoxOnDblClickCallBack = function(param){
		
		if(param == ""){
			voPromptObject = "";
			return false;
		}
		
		$(voPromptObject).parent().css("width","1000px");
		voPromptObject.textContent = param[0];
		$(voPromptObject).attr("value",param[0]);
		
		var vnWidth = Number($(voPromptObject).css("width").replace("px",""));
		var vnHeight = Number($(voPromptObject).css("height").replace("px",""));
		$(voPromptObject).parent().css("width",(vnWidth+30)+"px");
		$(voPromptObject).parent().css("height",(vnHeight+20)+"px");
		
		robot.getAttr(voPromptObject);
		voPromptObject = "";
	}

	
	fn_titleOnDblClickCallBack = function(param){
		
		if(param == ""){
			voPromptObject = "";
			return false;
		}
		
		$(voPromptObject).parent().css("width","1000px");
		voPromptObject.textContent = param[0];
		$(voPromptObject).attr("value",param[0]);
		
		var vnWidth = Number($(voPromptObject).css("width").replace("px",""));
		var vnHeight = Number($(voPromptObject).css("height").replace("px",""));
		$(voPromptObject).parent().css("width",(vnWidth+30)+"px");
		$(voPromptObject).parent().css("height",(vnHeight+20)+"px");
		
		robot.getAttr(voPromptObject);
		voPromptObject = "";
		vsLabelYn = "N";
	}
	
	/* 테이블 td 더블클릭 이벤트
	라벨 설정 */
    fn_tdDbClick = function(param) {
    	
    	if(vsLabelYn != "Y"){
    		robot.prompt("라벨입력","라벨을 입력하시오",["라벨"],"","","fn_tdDbClickCallBack");
        	
        	voPromptObject = param;
    	}
    	
    	vsLabelYn = "N";
    	
    
    	
    }
    
    fn_tdDbClickCallBack = function(param){
    
    	if(param == ""){
			voPromptObject = "";
			return false;
		}
    	voPromptObject.textContent = param[0];
    	$("td[tableFocus=true]").attr("value",param[0]);
    	
    	robot.getAttr(voPromptObject);
    	
    	param.removeChild;
    	voPromptObject = "";
    
    }
	
	
	fn_buttonOnDblClick = function(param){ //button
		robot.prompt("버튼명입력","버튼명을 입력하시오",["버튼명"],"","","fn_buttonOnDblClickCallBack");
	
		voPromptObject = param;

	}
	
	fn_buttonOnDblClickCallBack = function(param){
		
		if(param == ""){
			voPromptObject = "";
			return false;
		}
		
		$(voPromptObject).val(param[0]);
		
		robot.getAttr(voPromptObject);
		voPromptObject = "";
	}
	/* ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ 더블클릭 이벤트 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ */
	
	
	

	/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ TABLE 이벤트 ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ */
	fn_colResize = function(){
		
		var onSampleResized = function(e){
			var table = $ (e.currentTarget);
		 };
		
			$ (".table").colResizable({
			 	liveDrag : true , 
			    gripInnerHtml : "<div class = 'grip'> </ div>" ,  
			    draggingClass : "dragging" ,
			    resizeMode:'overflow',
			    onResize : onSampleResized
		  });
		}
	fn_tableColAddUp = function(){
		tableEdit.addUp();
	}
	
	fn_tableColAddDown = function(){
		tableEdit.addDown();
	}
	
	fn_deleter = function(param){
		tableEdit.deleteNode(param);
	}

	fn_tableRowAddLeft = function(){
		tableEdit.addLeft();
	}

	fn_tableRowAddRight = function(){
		tableEdit.addRight();
	}

	fn_fn_tableRowDel = function(){
		tableEdit.RowDelete();
	}

	fn_tableMerge = function(){
		tableEdit.Merge();
	}

	fn_tableDivision = function(){
		tableEdit.Divide();
	}
	
	/* ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ TABLE 이벤트 ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ */
	
	
	/**********************************
	 수정  프로세스 
	***********************************/
	function infoUpdate(){

		
		
		var vsCompoId = $("#ibx_propertyTable_id").val();
		var vsCompoClass = $("#ibx_propertyTable_class").val();
		var vsCompoName = $("#ibx_propertyTable_name").val();
		var vsCompoLabel = $("#ibx_propertyTable_label").val();
		var vsCompoStyle = $("#ibx_propertyTable_style").val();
		var vsCompoValue = $("#ibx_propertyTable_value").val();
		var vsCompoDvs = $("#ibx_propertyTable_compoDvs").val();
		var vsCompoRealId = $("#ibx_propertyTable_realId").val();
		
		var vsDvsValue = "";
		
		if(vsCompoRealId == ""){
			if($("[focus=true]").length == 0){
				vsDvsValue = "td[tableFocus=true]"
			} else{
				vsDvsValue = "[focus=true]";
			}
		} else{
			vsDvsValue = "#"+vsCompoRealId;
		}
		
		if(vsCompoDvs == "div_content"){
			vsCompoClass += " ui-draggable ui-draggable-handle ui-resizable";
		} else if(["div_table","inputBox","selectBox"].indexOf(vsCompoDvs) != -1){
			vsCompoClass += " ui-draggable ui-draggable-handle";
		}
		
		if(vsCompoDvs == "td"){
			var vsTableStyle = vsCompoStyle.substr(13,vsCompoStyle.length);
			vsTableStyle = vsTableStyle.substr(13,vsCompoStyle.length);
			$(vsDvsValue).attr("style",vsTableStyle);
		} else{
			$(vsDvsValue).attr("style",vsCompoStyle);
		}
		
		$(vsDvsValue).attr("class",vsCompoClass);
		$(vsDvsValue).attr("name",vsCompoName);
		$(vsDvsValue).attr("label",vsCompoLabel);
		$(vsDvsValue).attr("value",vsCompoValue);
		
		
			
		if(["span_title","span_label"].indexOf(vsCompoDvs) != -1){
			$(vsDvsValue).text(vsCompoValue);
			fn_setTitleValueProperty(vsDvsValue,vsCompoValue);
		}
		
		$(vsDvsValue).attr("id",vsCompoId);
		
		if(vsCompoDvs == "td"){
			$(vsDvsValue).text(vsCompoValue);
			var vsTrInfo = $(vsDvsValue).parent();
			var vsTableId = vsTrInfo.parent().parent().attr("id");
			
			var vsShell = $(vsDvsValue).attr("shell");
			var vsRow = $(vsDvsValue).attr("row");
			var vnTrChildCount = $("#"+vsTableId+" tr").length
			var vnTdChildCount = vsTrInfo.children().length
			
			var vnStyleLen = vsCompoStyle.length;
			
			var vnWidthStart = vsCompoStyle.indexOf("width")+6
			var vsWidthSub = vsCompoStyle.substr(vnWidthStart,vnStyleLen)
			var vnWidth = vsWidthSub.substr(0,vsWidthSub.indexOf("px;")+2);
			
			var vnHeightStart = vsCompoStyle.indexOf("height")+7
			var vsHeightSub = vsCompoStyle.substr(vnHeightStart,vnStyleLen)
			var vnHeight = vsHeightSub.substr(0,vsHeightSub.indexOf("px;")+2);
			
			var voheight = [];
			var vowidth = [];
			
			for(var i=0; i<vnTrChildCount; i++){
				voheight.push($("#"+vsTableId+" tr").eq(i).css("height"));
			}
			
			for(var j=0; j<vnTdChildCount; j++){
				vowidth.push(vsTrInfo.children().eq(j).css('width'));
			}
			
			$("#"+vsTableId).css("height","0px");
			$("#"+vsTableId).css("width","0px");
			
			
			for(var i=0; i<vnTrChildCount; i++){
				for(var j=0; j<$("#"+vsTableId+" tr").eq(i).children().length; j++){
					$("#"+vsTableId+" tr").eq(i).children().eq(j).css("height",voheight[i]);
					$("#"+vsTableId+" tr").eq(i).children().eq(j).css("width",vowidth[j]);
				}
				
			}
			
			for(var i=0; i<vnTdChildCount; i++){
				vsTrInfo.children().eq(i).css('height', vnHeight);
			}
			vsTrInfo.css("height",vnHeight);
			
			for(var i=0; i<vnTrChildCount; i++){
				$("#"+vsTableId+" [shell="+vsShell+"]").eq(i).css("width",vnWidth);
			}
			
			vsTrInfo.parent().parent().parent().height(vsTrInfo.parent().parent().height()+30)
			vsTrInfo.parent().parent().parent().width(vsTrInfo.parent().parent().width()+30)
			
			
			
		}
		

		 
	}//수정 프로세스 end
	
	
	fn_setTitleValueProperty = function(compoId,value){
	if(value == ""){
		compoId = "";
		return false;
	}
	
	$(compoId).parent().css("width","1000px");
	$(compoId).text(value);
	$(compoId).attr("value",value);
	
	var vnWidth = Number($(compoId).css("width").replace("px",""));
	var vnHeight = Number($(compoId).css("height").replace("px",""));
	$(compoId).parent().css("width",(vnWidth+30)+"px");
	$(compoId).parent().css("height",(vnHeight+20)+"px");
	
	robot.getAttr(compoId);
	voPromptObject = "";
	vsLabelYn = "N";
	}
	
		
	/**********************************
	 검색 프로세스 
	***********************************/
	function infoSearch(){
		//vsProperty == 검색어 
		var vsProperty = $("#Search").val();
		var vsTrnum = $("#propertyTable tbody tr").length;
			vsTrnum --;
		
		//반복문을 통해 td의 값(속성 키,값)을 가져와 JsonArray에 삽입
		var vmObj = {};
		
		for(var i=0; i<vsTrnum; i++){
			//vsKey == 속성키
			var vsKey = $("tr[name=buffer"+i+"] > td:first").text();
			var vsValue = $("tr[name=buffer"+i+"] > td:last > input[type=text]").val();
			if(vsKey != null && vsValue != null){
				if(vsKey == "id"){
					vmObj["id"] = vsValue;	
				}
				if(vsKey == "class"){
					vmObj["class"] = vsValue;	
				}
				if(vsKey == "name"){
					vmObj["name"] = vsValue;	
				}
				if(vsKey == "label"){
					vmObj["label"] = vsValue;	
				}
			}
		}	
		
		// vmObj의 key값만 저장
		var Keys = Object.keys(vmObj);
		
		// 키값으로 검색어 찾기 
		for(var j=0; j<Keys.length; j++){
			//입력값이 없을때 
			if(vsProperty == null){
				alert("검색어를 입력하세요");
				break;
			}
			// 입력값이 테이블에 있을때 
			if(Keys[j] == vsProperty){
				for(var k=0; k<vsTrnum; k++){	
					$("tr[name=buffer"+k+"]").hide();
				}
					$("tr[name=buffer"+j+"]").show();
				break;
			} 
			
		}		
	}//검색 프로세스 end
	
	
	
</script>

</head>

<body>
	<div id="mysidenav" class="sidenav">
		<div id="div_mainImg">
			<img src="<c:url value='/images/main_scrobot.png'/>" alt=""/>
		</div>
		<div id="div_compoTable">
			<table id="compoTable">
				<colgroup>
					<col width="100" />
					<col width="100" />
					<col width="100" />
				</colgroup>
				<tr>
					<td class="" onclick="divCreation();">
						<img src="<c:url value='/images/object/icon_div.png'/>" title="DIV생성"/>
					</td>
					<td class="" onclick="titleCreation();">
						<img src="<c:url value='/images/object/icon_title.png'/>" title="TITLE생성"/>
					</td>
						
					<td class="" onclick="labelCreation();">
						<img src="<c:url value='/images/object/icon_label.png'/>" title="LABEL생성"/>
					</td>
					
				</tr>
				<tr>
					<td class="" onclick="buttonCreation();">
						<img src="<c:url value='/images/object/icon_button.png'/>" title="버튼생성"/>
					</td>
					<td class="" onclick="inputCreation();">
						<img src="<c:url value='/images/object/icon_input.png'/>" title="TEXT생성"/>
					</td>
					<td class="" onclick="selectCreation();">
						<img src="<c:url value='/images/object/icon_select.png'/>" title="SELECT생성"/>
					</td>
				</tr>
	
				<tr>
					<td class="" onclick="checkboxCreation();">checkBox</td>
					<td class="" onclick="radioboxCreation();">radioBox</td>
					<td class="" onclick="tableCreation();">
						<img src="<c:url value='/images/object/icon_table.png'/>" title="테이블생성"/>
					</td>
					<td class="" onclick="queryCreation();">
						<img src="<c:url value='/images/object/icon_table.png'/>" title="테이블생성"/>
					</td>
				</tr>
			</table>
		</div>
		
		<div id="div_cellTable">
			<table id="cellTable">
				<colgroup>
					<col width="50" />
					<col width="50" />
					<col width="50" />
				</colgroup>

				<tr>
				   
					<td class="" onclick="fn_tableColAddUp();">
						<img src="<c:url value='/images/object/icon_row_up.png'/>" title="위로 행 추가"/>
					</td>
					<td class="" onclick="fn_tableColAddDown();">
						<img src="<c:url value='/images/object/icon_row_down.png'/>" title="아래 행 추가"/>
					</td>
					<td class="" onclick="fn_deleter(1);">
						<img src="<c:url value='/images/object/icon_row_del.png'/>" title="행삭제"/>
					</td>
				</tr>
				<tr>
					<td class="" onclick="fn_tableRowAddLeft();">
						<img src="<c:url value='/images/object/icon_col_left.png'/>" title="좌로 열 추가"/>
					</td>
					<td class="" onclick="fn_tableRowAddRight();">
						<img src="<c:url value='/images/object/icon_col_right.png'/>" title="우로 열 추가"/>
					</td>
					<td class="" onclick="fn_deleter(2);">
						<img src="<c:url value='/images/object/icon_col_del.png'/>" title="열삭제"/>
					</td>	
				</tr>
				<tr>
					<td class="" onclick="fn_tableMerge();">
						<img src="<c:url value='/images/object/icon_cell_with.png'/>" title="병합"/>
					</td>
					<td class="" onclick="fn_tableDivision();">
						<img src="<c:url value='/images/object/icon_cell_division.png'/>" title="분할"/>
					</td>
					<td class="">
					</td>
	
				</tr>
			</table>
		</div>
		
		<div id="div_propertyTable">
			<h4>◎ Property</h4>
			<table id="propertyTable">
				<tbody>
					<tr>
						<td>id</td>
						<td><input type=text class="ibx_property" id="ibx_propertyTable_id" value="" ></input></td>
					</tr>
					<tr>
						<td>class</td>
						<td><input type=text class="ibx_property" id="ibx_propertyTable_class" value=""></input></td>
					</tr>
					<tr>
						<td>name</td>
						<td><input type=text class="ibx_property" id="ibx_propertyTable_name" value=""></input></td>
					</tr>
					<tr>
						<td>label</td>
						<td><input type=text class="ibx_property" id="ibx_propertyTable_label" value=""></input></td>
					</tr>
					<tr>
						<td>style</td>
						<td><input type=text class="ibx_property" id="ibx_propertyTable_style" value=""></input></td>
					</tr>
					<tr>
						<td>value&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
						<td><input type=text class="ibx_property" id="ibx_propertyTable_value" value=""></input></td>
					</tr>
					<tr style="display:none;">
						<td><input type=hidden id="ibx_propertyTable_compoDvs" value=""></input></td>
						<td><input type=hidden id="ibx_propertyTable_realId" value=""></input></td>
						
					</tr>
				</tbody>
				
			</table>
			<div style="text-align: right;">
				<input type="button" id="btn_infoUpdate" onclick="infoUpdate();" value="수정" style="display:none;"></input>
			</div>
		</div>
	</div>

</body>
</html>