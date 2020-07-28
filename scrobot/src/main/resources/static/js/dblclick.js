dblclick = {};

dblclick.fn_InputBoxOnDblClick = function(param){ //input
		//기능 구분되면 작성

}
	

dblclick.fn_SelectBoxOnDblClick = function(param){ //select
	var vnBoxLength = param.childElementCount;
	var vsBoxDivId = param.id;
	
	var vnBoxCount;
	
	var totalArray = new Array();	
	
	for(var i=0; i<vnBoxLength; i++){
		var total = new Object();
		
		var label = $("#"+vsBoxDivId+" option:eq("+i+")").attr("label");
		var value = $("#"+vsBoxDivId+" option:eq("+i+")").val();
		
		total.label = label;
		total.value = value;
		
		totalArray.push(total);
	}
	
	var info = {"header" : "selectBox",
		    "width"  : "700px",
		    "height" : "500px",
		    "callBack" : "callBack.selectUpdateCallBack",
		    "param" : totalArray,
		    "node" : vsBoxDivId
	  		}

	robot.openPop(info, "view010101P12.jsp");

}

dblclick.fn_BoxOnDblClick = function(param){ debugger;
	var vnBoxLength = param.childElementCount-3;
	var vsBoxDivId = param.id;
	var vnBoxCount;
	var header = "";
	
	if(vsBoxDivId.indexOf("checkbox") != -1){
		var vsBoxCount = vsBoxDivId.replace("div_checkbox","");
		vnBoxCount = parseInt(vsBoxCount);
		header = "checkbox";
	}
	else if(vsBoxDivId.indexOf("radio") != -1){
		var vsBoxCount = vsBoxDivId.replace("div_radio","");
		vnBoxCount = parseInt(vsBoxCount);
		header = "radiobox";
	}

	var totalArray = new Array();	
/*	
	for(var i=1; i<=vnBoxLength; i++){
		var total = new Object();
		var value = $(".portlet-header > input[cost="+i+"]").val();
		var label = $(".portlet-header > input[cost="+i+"]").attr("label");
		
		total.value = value;
		total.label = label;
		
		totalArray.push(total);
	}*/
	
	var checkboxObjects = $("#"+vsBoxDivId).children().children().children().children("input");
	
	for(var i=0; i<checkboxObjects.length; i++){
			var total = new Object();
			var label = $(checkboxObjects[i]).attr("label");
			var value = checkboxObjects[i].value;
			
			total.value = value;
			total.label = label;
			
			totalArray.push(total);		
	}
	
	
	var info = {"header" : header,
			    "width"  : "700px",
			    "height" : "500px",
			    "callBack" : "callBack.boxUpdateCallBack",
			    "param" : totalArray,
			    "node" : vsBoxDivId
		  		}
	
	if(header == "checkbox"){
		robot.openPop(info, "view010101P10.jsp");
	}
	else if(header == "radiobox"){
		robot.openPop(info, "view010101P11.jsp");
	}
}


dblclick.fn_titleOnDblClick = function(param){ // title
	$(param).attr("focus","true");
	robot.getAttr(param);
	robot.prompt("타이틀입력","타이틀을 입력하시오",["타이틀"],"","","callBack.fn_titleOnDblClickCallBack");

	voPromptObject = param;
}
	

dblclick.fn_labelOnDblClick = function(param){
	$(param).attr("focus","true");
	robot.getAttr(param);
	robot.prompt("라벨입력","라벨을 입력하시오",["라벨"],"","","callBack.fn_titleOnDblClickCallBack");

	voPromptObject = param;
	
	vsLabelYn = "Y";			
}


dblclick.fn_radioBoxOnDblClick = function(param){
	$(param).attr("focus","true");
	robot.getAttr(param);
	robot.prompt("라벨입력","라벨을 입력하시오",["라벨"],"","","callBack.fn_radioBoxOnDblClickCallBack");

	voPromptObject = param;
	
	vsLabelYn = "Y";
}



dblclick.fn_checkBoxOnDblClick = function(param){
	$(param).attr("focus","true");
	robot.getAttr(param);
	robot.prompt("라벨입력","라벨을 입력하시오",["라벨"],"","","callBack.fn_checkBoxOnDblClickCallBack");
	
	voPromptObject = param;
}

/* 테이블 td 더블클릭 이벤트
라벨 설정 */
dblclick.fn_tdDbClick = function(param) {
   	
	if(vsLabelYn != "Y"){
   		robot.prompt("라벨입력","라벨을 입력하시오",["라벨"],"","","callBack.fn_tdDbClickCallBack");
       	
       	voPromptObject = param;
   	}
   	
   	vsLabelYn = "N";
}
   

dblclick.fn_buttonOnDblClick = function(param){ //button
	robot.prompt("버튼명입력","버튼명을 입력하시오",["버튼명"],"","","callBack.fn_buttonOnDblClickCallBack");

	voPromptObject = param;
	}

