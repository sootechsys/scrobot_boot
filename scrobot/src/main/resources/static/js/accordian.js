
accordian = {};


accordian.fn_draggable = function(){
	
	 /**************************************
	   * accordion 관련 함수
	   **************************************/		 
		 
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
		 
		 if($(".div_checkbox_sub").length != 0){
			 $(".div_checkbox_sub").draggable({
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
			 
			 $( "[compoDvs=portlet-header]" ).resizable(
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
			 
			 $( "[compoDvs=portlet-header]" ).resizable(
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
		 if($(".div_radio_sub").length != 0){
			 $(".div_radio_sub").draggable({
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
			 
			 $( "[compoDvs=div_radio_sub]" ).resizable(
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
}

$( function() {
    $( ".div_checkbox" ).sortable({
      connectWith: ".div_checkbox",
      handle: ".portlet-header",
      cancel: ".portlet-toggle",
      placeholder: "portlet-placeholder ui-corner-all"
    });
 
    $( ".div_checkbox_sub" )
      .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" ) 
      .find( ".portlet-header" )
        .addClass( "ui-widget-header ui-corner-all" )
       .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");
 
    $( ".portlet-toggle" ).on( "click", function() {
      var icon = $( this );
   //   icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
   //   icon.closest( ".div_checkbox_sub" ).find( ".portlet-content" ).toggle();
    });
  } );


accordian.fn_colResize = function(){
	
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
