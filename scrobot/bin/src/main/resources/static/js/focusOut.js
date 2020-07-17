
//
focusOut = {};


focusOut.All = function(){
	focusOut.div();
	focusOut.td();
	focusOut.title();
	focusOut.input();
	focusOut.select();
	focusOut.button();
}

focusOut.title = function(){
	var vnTitleCount = $("#creationTable > div > span[class=\"span_title\"]").length;
	
	for(var i=0; i<vnTitleCount; i++){
		$("#span"+i+"_title").attr("focus","false");
	}
}

focusOut.div = function(){
	if($("[focus=true]").length != 0){
		$("[focus=true]").attr("focus","false");
		$("[mainFocus=true]").attr("mainFocus","false");
	}
}


focusOut.td = function(){
	var vnTableFocusCount = $("td[tableFocus=true]").length;
	if(vnTableFocusCount != 0){
		for(var i=0; i<vnTableFocusCount; i++){
			$("td[tableFocus=true]").eq(0).attr("tableFocus","false");
		}
	}
}


focusOut.input = function(){
	var vnInputBoxCount = $("input[class=\"inputBox ui-draggable ui-draggable-handle\"]").length; //수정필요
	for(var i=0; i<vnInputBoxCount; i++){
		$("input[name=value"+i+"]").attr("focus","false");
	}
}


focusOut.button = function(){
	var vnButtonCount = $(".button").length;
	for(var i=0; i<vnButtonCount; i++){
		$("#button"+i).attr("focus","false");
	}
}

focusOut.select = function(){
	var vnSelectCount = $(".selectBox").length;
	for(var i=0; i<vnSelectCount; i++){
		$("select[name=value"+i+"]").attr("focus","false");
	}
}


focusOut.divYn = function(){
	var vnFocusCount = $("[mainFocus=true]").length;
	if (vnFocusCount == 0) {
		return false;
	} else{
		return true;
	}
}

focusOut.tableYn = function(){
	var vnFocusCount = $("td[tableFocus=true]").length;
	if (vnFocusCount == 0) {
		return false;
	} else{
		return true;
	}
}

/**/

