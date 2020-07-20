callBack = {};

// 그리기 callBack start --------------------------------------

/* box그리기 CallBack */
callBack.boxCreationCallBack = function(param){
	onclick.draw(param);
}

/* box수정 CallBack */
callBack.boxUpdateCallBack = function(param){
	onclick.draw(param);
}

/* select박스 그리기 CallBack */
callBack.selectboxCreationCallBack = function(param){
	onclick.draw("select");
}
/* select박스 수정 CallBack */
callBack.selectUpdateCallBack = function(param){
	onclick.draw(param);
}

/* 테이블그리기 CallBack */
callBack.fn_tableCreationCallBack = function(param){
	onclick.draw("table",param);
}


/* query 수정 CallBack */
callBack.fn_queryCreationCallBack = function(param){
	if(param == ""){
		return false;
	}
	vjQuery = param;
}

//그리기 callBack end --------------------------------------


// dblclick CallBack start ------------------------------
callBack.fn_tdDbClickCallBack = function(param){
	   
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

callBack.fn_buttonOnDblClickCallBack = function(param){
	
	if(param == ""){
		voPromptObject = "";
		return false;
	}
	
	$(voPromptObject).val(param[0]);
	
	robot.getAttr(voPromptObject);
	voPromptObject = "";
}

callBack.fn_titleOnDblClickCallBack = function(param){
	
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


callBack.fn_checkBoxOnDblClickCallBack = function(param){
	
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
	

callBack.fn_radioBoxOnDblClickCallBack = function(param){
	
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

//dblclick CallBack end ------------------------------