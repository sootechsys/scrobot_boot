
//
onclick = {};

/* focus = 클릭된 태그에 포커스를 주기 위한 분기처리 메소드
 * param(int) = shift 눌림 여부
 * vsClassNm = 선택된 클래스 이름
 * */
onclick.focus = function(param,e){
	
	var vsCompoDvs = $(e.target).attr("compoDvs");
	var vsClassNm = e.target.className;
	
	if(param != 1){ //shift 눌리지 않음
		//
		if(vsCompoDvs == "td"){
			vsMouseDownYn = "N";
			var vitdCount = $("td[tableFocus=true]").length;
			if(vitdCount == 0){
				focusOut.td();
				if($(e.target).attr("tableFocus") == "false"){
					$(e.target).attr("tableFocus","true");
					
				}
			} else if(vitdCount >= 1){
				focusOut.td();
				$(e.target).attr("tableFocus","true");
			}
				
			
		} else if(vsCompoDvs == "div_content"){
			if($(e.target).attr("focus") == "true"){
				
				$(e.target).attr("focus","false"); 
				$(e.target).attr("mainFocus","false"); 
				
			} else if($(e.target).attr("focus") == "false"){
				focusOut.All();
				$(e.target).attr("focus","true"); 
				$(e.target).attr("mainFocus","true");
				
			}
			
		} else if(vsCompoDvs == "button"){
			
			if($(e.target).attr("focus") == "true"){
				$(e.target).attr("focus","false"); 
				
			} else if($(e.target).attr("focus") == "false"){
				focusOut.All();
				$(e.target).attr("focus","true"); 

			}
			
		} else if(vsCompoDvs == "select"){
			
			if($(e.target).attr("focus") == "true"){
				$(e.target).attr("focus","false"); 
				
			} else if($(e.target).attr("focus") == "false"){
				focusOut.All();
				$(e.target).attr("focus","true"); 

			}
			
		} else if(vsCompoDvs == "inputBox"){
			
			if($(e.target).attr("focus") == "true"){
				$(e.target).attr("focus","false"); 
				
			} else if($(e.target).attr("focus") == "false"){
				focusOut.All();
				$(e.target).attr("focus","true"); 

			}
			
		} else if(vsCompoDvs == "span_title" || vsCompoDvs == "span_label"){
			
			if(vbTitleDragCheck == false){
				if($(e.target).attr("focus") == "true"){
					$(e.target).attr("focus","false"); 
					
				} else if($(e.target).attr("focus") == "false"){
					focusOut.All();
					$(e.target).attr("focus","true"); 
				}
			}
			
			vbTitleDragCheck = false;
			
			
		}
		else if(vsCompoDvs == "div_checkbox"){
			if($(e.target).attr("focus") == "true"){
				$(e.target).attr("focus","false"); 
				
			} else if($(e.target).attr("focus") == "false"){
				focusOut.All();
				$(e.target).attr("focus","true"); 

				
			}
		}else if(vsCompoDvs == "div_radio"){
			if($(e.target).attr("focus") == "true"){
				$(e.target).attr("focus","false"); 
				
			} else if($(e.target).attr("focus") == "false"){
				focusOut.All();
				$(e.target).attr("focus","true"); 

				
			}
		}else if(vsCompoDvs == "div_table"){
			
			if($(e.target).attr("focus") == "true"){
				$(e.target).attr("focus","false"); 
				
			} else if($(e.target).attr("focus") == "false"){
				focusOut.All();
				$(e.target).attr("focus","true"); 

				
			}
		}
		
		if(vsCompoDvs != null || e.target.id == "creationTable"){
			robot.getAttr(e.target);
		}
		
		if(e.target.id == "creationTable"){
			focusOut.All();
			
			vsMouseDownYn = "N";
		}
		
		
		
	} else if(param == 1){
		
		if ($(e.target).attr("tableFocus") == "true") {
			$(e.target).attr("tableFocus","false");
			
		} else {
			$(e.target).attr("tableFocus","true");
		}
	}
}

//div_content 개수
vnDivContentCount = 0;

// title 개수
vnTitleCount = 0;

//label 개수
vnLabelCount = 0;

// button 개수
vnButtonCount = 0;

// table 개수
vnTableCount = 0;

// input 개수
vnInputCount = 0;

// select 개수
vnSelectCount = 0;

// checkBox 개수
vnCheckCount = 0;

// checkBoxGroup 개수
vnCheckGroupCount = 0;

// radioBox 개수
vnRadioCount = 0;

//radioBoxGroup 개수
vnRadioGroupCount = 0;

/* 컴포넌트 생성시 폼크기 동적조정 */
onclick.fn_setformSize = function(){
	var vnFormHeight = Number($("#creationForm").css("height").replace("px",""));
	var vnContentTop = Number($("#creationTable").children().last().css("top").replace("px",""));
	var vnContentHeight = Number($("#creationTable").children().last().css("height").replace("px",""));
	var vnTotalSize = vnContentTop+vnContentHeight+220;
	var vnTableSize = vnContentTop+vnContentHeight+50;
	
	if(vnFormHeight <= vnTotalSize){
		vnFormHeight = vnTotalSize+"px";
		$("#creationForm").css("height",vnFormHeight);
		$("#creationTable").css("height",vnTableSize+"px");
	}
}

/* 컴포넌트 생성시 div크기 동적조정 */
onclick.fn_setDivContentSize = function(){
	var vnContentTop = Number($("[mainFocus=true]").children().last().css("top").replace("px",""));
	var vnContentHeight = Number($("[mainFocus=true]").children().last().css("height").replace("px",""));
	
	var vnDivContentSize = Number($("[mainFocus=true]").css("height").replace("px",""));
	
	var vnContentSize = vnContentTop+vnContentHeight;
	
	if(vnContentSize >= vnDivContentSize){
		$("[mainFocus=true]").css("height",vnContentSize+30+"px");
		onclick.fn_setformSize();
	}
	
	
}


//컴포넌트 생성시 위치잡기
onclick.fn_creationPosition = function(param){
	// div focus 여부
	// 포커스가 없다면 body에 생성
	if(!focusOut.divYn()){//focusOut.divYn()
		var voChildInfo = $("#creationTable").children();
		if(voChildInfo.length != 0){
			var vsParentTop = Number(voChildInfo.last().css("top").replace("px",""));
			var vsParentHeight = Number(voChildInfo.last().css("height").replace("px",""));
		}
		
	// 포커스가 있다면 포커스잡힌 div에 생성
	} else{
		
		if(param == "content"){
			var voChildInfo = $("#creationTable").children();
			if(voChildInfo.length != 0){
				var vsParentTop = Number(voChildInfo.last().css("top").replace("px",""));
				var vsParentHeight = Number(voChildInfo.last().css("height").replace("px",""));
			}
		} else{
			var voChildInfo = $("[compoDvs=div_content][mainfocus=true]").children();
			var vnChildCount = voChildInfo.length;
			for(var i=0; i<vnChildCount; i++){
				if(voChildInfo.eq(i).attr("id") == "" || voChildInfo.eq(i).attr("id") == null){
					continue;
				}
				
				var vsParentTop = Number(voChildInfo.eq(i).css("top").replace("px",""));
				var vsParentHeight = Number(voChildInfo.eq(i).last().css("height").replace("px",""));
				
			}
		}
		
		
	}
	
	var vnWidth = 0;
	
	if(vsParentTop == null){
		vsParentTop = 0;
	}
	
	if(vsParentHeight == null){
		vsParentHeight = 0;
	}
	
	if((vsParentTop+vsParentHeight) != 0){
		vnWidth = (vsParentTop+vsParentHeight+20);
	}
	
	return vnWidth;
}


/*
 * draw = 그리기
 * tagName(String) = 태그 이름
 * param(array) 태그에 들어가야하는 데이터 
 * */
onclick.draw = function(tagName, param){

	
	
	if(tagName == "div"){
		// 전체 div 시작
		var vsSource = "<div id=\"div" + vnDivContentCount + "\"";
		vsSource += " class=\"div_content\" focus=false mainfocus=false compoDvs=\"div_content\" ";
		vsSource += " style=\"top:"+onclick.fn_creationPosition("content")+"px;\"";
		//vsSource += " onclick=\"fn_divOnClick(this)\"";
		vsSource += " >";

		vsSource += "</div>";

		$("#creationTable").append(vsSource);
		
		// divcontent영역 개수 증가
		vnDivContentCount ++;
		
		
		// form 크기 동적조정
		onclick.fn_setformSize();
		
		$("[compoDvs=div_content]").hover(function(e){
			
		})
	}
	else if(tagName == "title"){

		// 타이틀 div 시작
		var vsSource = "\n  <div id=\"div" + vnTitleCount + "_title\"";
		vsSource += "   class=\"div_title\" compoDvs=\"div_title\" ";
		
		vsSource += "   style=\"top:"+onclick.fn_creationPosition()+"px;\"";

		
		vsSource += ">";
	
		// 타이틀 span
		vsSource += "\n    <span id=\"span" + vnTitleCount +"_title\" focus=false";
		vsSource += "  class=\"span_title\" compoDvs=\"span_title\" value=\"title\" "
		vsSource += "  ondblclick=\"dblclick.fn_titleOnDblClick(this);\">title"
		vsSource += "  </span>";
		vsSource += "\n  </div>";
		
		
		
		
		// table focus 여부
		// 포커스가 없다면 body에 생성
		if(!focusOut.tableYn()){
			// div도 포커스가 없다면
			if(!focusOut.divYn()){
				$("#creationTable").append(vsSource);
				onclick.fn_setformSize();
			} else{
				$("[compoDvs=div_content][mainfocus=true]").append(vsSource);
				onclick.fn_setDivContentSize();
			}
			
		// 포커스가 있다면 포커스잡힌 td에 생성
		} else{
			if(tagName == "title"){
				// div도 포커스가 없다면
				if(!focusOut.divYn()){
					$("#creationTable").append(vsSource);
					onclick.fn_setformSize();
				} else{
					$("[compoDvs=div_content][mainfocus=true]").append(vsSource);
					onclick.fn_setDivContentSize();
				}
			} else{
				$("td[tableFocus=true]").append(vsSource);
			}
			
		}
		
		vnTitleCount++;
		
		
		

	} else if(tagName == "label"){

	// 타이틀 div 시작
	var vsSource = "\n  <div id=\"div" + vnLabelCount + "_label\"";
	vsSource += "   class=\"div_label\" compoDvs=\"div_label\" ";
	
	if(!focusOut.tableYn()){
		vsSource += "style=\"top:"+onclick.fn_creationPosition()+"px; margin: 10px 0px 0px 10px;\">";
	} else {
		vsSource += "style=\"position:relative;\">";
	}
	
	// 타이틀 span
	vsSource += "\n    <span id=\"span" + vnLabelCount +"_label\" focus=false";
	vsSource += "  class=\"span_label\" compoDvs=\"span_label\" value=\"label\" "
	vsSource += "  ondblclick=\"dblclick.fn_labelOnDblClick(this);\"> label"
	vsSource += "  </span>";
	vsSource += "\n  </div>";
	
	
	
	
	// table focus 여부
	// 포커스가 없다면 body에 생성
	if(!focusOut.tableYn()){
		// div도 포커스가 없다면
		if(!focusOut.divYn()){
			$("#creationTable").append(vsSource);
			onclick.fn_setformSize();
		} else{
			$("[compoDvs=div_content][mainfocus=true]").append(vsSource);
			onclick.fn_setDivContentSize();
		}
		
	// 포커스가 있다면 포커스잡힌 td에 생성
	} else{
		$("td[tableFocus=true]").append(vsSource);
	}
	
	vnLabelCount++;
	
	
	

}
	else if(tagName == "input"){
		
		var vsSource = "";
		
		if(!focusOut.tableYn()){
			vsSource += "<br/>"
		}
		
		vsSource += "\n  <div id=\"div_inputBox"+vnInputCount+"\" compoDvs=\"div_inputBox\" class=\"div_inputBox\" ";
		
			
		if(!focusOut.tableYn()){
			vsSource += "style=\"top:"+onclick.fn_creationPosition()+"px; margin: 10px 0px 0px 10px;\">";
		} else {
			vsSource += "style=\"position:relative;\">";
		}
		
		
		vsSource += "\n   <input id=\"inputBox"+vnInputCount+"\" type=\"text\" class=\"inputBox Ltext\" name=\"value"+vnInputCount+"\" ";
		vsSource += " focus=false compoDvs=\"inputBox\" "
		vsSource += "> </input>";
		vsSource += "\n  </div>";

		// input박스 왼쪽정렬
		$("td[tableFocus=true]").css("text-align","left");
		
		
		// table focus 여부
		// 포커스가 없다면 body에 생성
		if(!focusOut.tableYn()){
			// div도 포커스가 없다면
			if(!focusOut.divYn()){
				$("#creationTable").append(vsSource);
				onclick.fn_setformSize();
			} else{
				$("[compoDvs=div_content][mainfocus=true]").append(vsSource);
				onclick.fn_setDivContentSize();
			}
			
		// 포커스가 있다면 포커스잡힌 td에 생성
		} else{
			$("td[tableFocus=true]").append(vsSource);
		}
		
		vnInputCount++;
		
	}
	else if(tagName == "select"){
		
		debugger;
		
		var value;
		var label;
		
		var totalArray = new Array();	
		var tableLength = $("#propertyTablePop > tbody > tr").length;
		
		for(var i=0; i<=tableLength; i++){
			if(i == 0){
				var total = new Object();
				
				value = "stub";
				total.value = value;
				label = "stub";
				total.label = label;
				
				totalArray.push(total);
			}
			else{
				var total = new Object();

				value = $("#propertyTablePop > tbody > tr:nth-child("+i+") > td:nth-child(1) > input").val();
				label = $("#propertyTablePop > tbody > tr:nth-child("+i+") > td:nth-child(2) > input").val();
				total.value = value;
				total.label = label;
		
				totalArray.push(total);
			}
			
		}
		
		
		var vsSource = "";
		
		if(!focusOut.tableYn()){
			vsSource += "<br/>"
		}
		
		vsSource += " <div id=\"div_"+tagName+""+vnSelectCount+"\" compoDvs=\"div_"+tagName+"\" class=\"div_"+tagName+"\" focus=false ";

		if(!focusOut.tableYn()){
			vsSource += "style=\"top:"+onclick.fn_creationPosition()+"px; margin: 10px 0px 0px 10px;\">";
		} else {
			vsSource += "style=\"position:relative;\">";
		}
		
		vsSource += "<select id=\"select"+vnSelectCount+"\" class=\"select\" name=\"value"+vnSelectCount+"\" ";
		vsSource += "focus=false  ondblclick=\"dblclick.fn_SelectBoxOnDblClick(this);\" compoDvs=\"select\" >";
		
		for(var i=0; i<totalArray.length; i++){
			if(i==0){
				continue;
			}
			else{
				vsSource += "<option value=\""+totalArray[i].value+"\" label=\""+totalArray[i].label+"\">"+totalArray[i].label;
				vsSource += "</option>";
			}
		}
		
		vsSource += "</select>";
		vsSource += "</div>";
		
		// input박스 왼쪽정렬
		$("td[tableFocus=true]").css("text-align","left");
		
		// table focus 여부
		// 포커스가 없다면 body에 생성
		if(!focusOut.tableYn()){
			// div도 포커스가 없다면
			if(!focusOut.divYn()){
				$("#creationTable").append(vsSource);
				onclick.fn_setformSize();
			} else{
				$("[compoDvs=div_content][mainfocus=true]").append(vsSource);
				onclick.fn_setDivContentSize();
			}
			
		// 포커스가 있다면 포커스잡힌 td에 생성
		} else{
			$("td[tableFocus=true]").append(vsSource);
		}
		
		vnSelectCount++;
		
		var div_popCount = ($(".div_pop").length)-1;
		$("#div_pop"+div_popCount).remove();
	}
	else if(tagName == "button"){
	

		
		var vsSource = "\n  <div id=\"div_button"+vnButtonCount+"\" compoDvs=\"div_button\" class=\"div_button\" ";
		
		
		if(!focusOut.tableYn()){
			vsSource += "style=\"top:"+onclick.fn_creationPosition()+"px; margin: 10px 0px 0px 10px;\">";
		} else {
			vsSource += "style=\"position:relative;\">";
		}
		
		// 타이틀 span
		vsSource += "\n    <input type=\"button\" id=\"button" + vnButtonCount+"\"";
		vsSource += "  class=\"button\" "
		vsSource += "  value=\"button\" "
		vsSource += "  focus=false compoDvs=\"button\" "
		
		vsSource += "  ondblclick=\"dblclick.fn_buttonOnDblClick(this);\">";
		vsSource += "  </input>";
		vsSource += "\n  </div>";
		
		// table focus 여부
		// 포커스가 없다면 body에 생성
		if(!focusOut.tableYn()){
			// div도 포커스가 없다면
			if(!focusOut.divYn()){
				$("#creationTable").append(vsSource);
				onclick.fn_setformSize();
			} else{
				$("[compoDvs=div_content][mainfocus=true]").append(vsSource);
				onclick.fn_setDivContentSize();
			}
			
		// 포커스가 있다면 포커스잡힌 td에 생성
		} else{
			$("td[tableFocus=true]").append(vsSource);
		}
		
		vnButtonCount++;
		
	}
	else if(tagName == "table"){
		if(param == "" || param == null){
			return false;
		}
		
		// 부모 가로크기
		//var width = $(voFocusDivInfo).css("width");

		// table 시작
		var vsSource = "\n  <div id=\"div_table"+vnTableCount+"\"";
		vsSource += " class=\"div_table\" focus=false";
		vsSource += " style=\"top:"+onclick.fn_creationPosition()+"px;\" compoDvs=\"div_table\" ";
		vsSource += ">";
		vsSource += "\n    <table id=\"table" + vnTableCount + "\"";;
		vsSource += " class=\"table\" border=\"1\" cellspacing=\"0\" ";
		vsSource += " compoDvs=\"table\"> ";
		vsSource += "\n     <colgroup>";

		for (var i = 0; i < param[0]; i++) {
			//짝수 셀
			if(i % 2 == 0){
				vsSource += "\n      <col/>";
			// 홀수 셀
			} else{
				vsSource += "\n      <col/>";
			}
			
		}
		vsSource += "\n     </colgroup>";
		
		//tbody 추가
		vsSource += "\n     <tbody>"

		for (var i = 0; i < param[1]; i++) {
			vsSource += "\n <tr name=\"tr\" row=\""+i+"\" compoDvs=\"tr\" height=\"40\">";
			for (var j = 0; j < param[0]; j++) {
				vsSource += "\n  <td class=\"td\" tableFocus=false "
				vsSource += "shell=\""+j+"\" ";
				vsSource += "compoDvs=\"td\" ";
				//짝수 셀
				if(j % 2 == 0){
					vsSource += "width=\"100\"";
				// 홀수 셀
				} else{
					vsSource += "width=\"225\"";
				}
					
				vsSource += "onmousedown=\"fn_tdMouseDown(this)\" ";
				vsSource += "onmouseover=\"fn_tdMouseOver(this)\" ";
				vsSource += "onmouseup=\"fn_tdMouseUp(this)\" ";
					
				vsSource += "ondblclick=\"dblclick.fn_tdDbClick(this)\"> "
				vsSource += "</td>";
			}
			vsSource += "\n      </tr>";
		}
		
		//tbody 추가
		vsSource += "\n     </tbody>"

		vsSource += "\n    </table>";
		vsSource += "\n  </div>";
		
		// div focus 여부
		// 포커스가 없다면 body에 생성
		if(!focusOut.divYn()){
			$("#creationTable").append(vsSource);
			onclick.fn_setformSize();
		// 포커스가 있다면 포커스잡힌 div에 생성
		} else{
			$("[compoDvs=div_content][mainfocus=true]").append(vsSource);
			onclick.fn_setDivContentSize();
		}

		vnTableCount++;
		

	}
	else if(tagName == "checkbox" || tagName =="radio"){
		
		var vnGroupCount = 0;
		
		if(tagName == "checkbox"){
			vnGroupCount  = vnCheckGroupCount;
			vnCheckGroupCount++;
		}
		else if(tagName == "radio"){
			vnGroupCount  = vnRadioGroupCount;
			vnCheckGroupCount++;
		}
		
		var width = $("input[choice=width]:checked").val();
		var height = $("input[choice=height]:checked").val();
		
		var direction;

		if(typeof width == "undefined"){
			direction = height;
		}
		else if(typeof height == "undefined"){
			direction = width;
		}
		
		var value;
		var label;
		
		var totalArray = new Array();	
		var tableLength = $("#propertyTablePop > tbody > tr").length;
		
		for(var i=0; i<=tableLength; i++){
			var total = new Object();
			
			if(i==0){
				total.direction = direction;
			}
			else{
				value = $("#propertyTablePop > tbody > tr:nth-child("+i+") > td:nth-child(1) > input").val();
				label = $("#propertyTablePop > tbody > tr:nth-child("+i+") > td:nth-child(2) > input").val();
				total.value = value;
				total.label = label;
			}
			totalArray.push(total);
		}
		
		var vsSource = "";
		
		if(!focusOut.tableYn()){
			vsSource += "<br/>"
		}
		
		vsSource += " <div id=\"div_"+tagName+""+vnGroupCount+"\" compoDvs=\"div_"+tagName+"\" class=\"div_"+tagName+"\" focus=false ";

		var maxNum = 0;
		
		for(var i=1; i<=tableLength; i++){
			var checker = totalArray[i].label;
			
			var checkerLength = checker.length;
			
			if(maxNum <= checkerLength){
				maxNum = checkerLength;
			}
			else{
				continue;
			}
			
		}
		
		var widthCheck = "";
		var heightCheck = "";
		
		if(!focusOut.tableYn()){
			
			if(totalArray[0].direction == "width"){
				widthCheck = "width:"+((30+maxNum*10)*tableLength)+"px;";
				heightCheck = "";
			}
			else if(totalArray[0].direction == "height"){
				widthCheck = "width:"+(30+maxNum*10)+"px;";
				heightCheck = "height:"+(30*tableLength)+"px;";
			}
			
			vsSource += "style=\"top:"+onclick.fn_creationPosition()+"px; margin: 10px 0px 0px 10px; "+widthCheck+"  "+heightCheck+" \" ";
		}
		else{
			vsSource += "style=\"position:relative;\" ";
		}
		
		
		vsSource += "ondblclick=\"dblclick.fn_BoxOnDblClick(this)\">";
		
		for(var i=0; i<totalArray.length; i++){
			
			if(i==0){
				continue;
			}
			else{
				vsSource += "<input type=\""+tagName+"\" compoDvs=\""+tagName+"\" name=\"name"+vnGroupCount+"\" value=\""+totalArray[i].value+"\"/ label=\""+totalArray[i].label+"\" >"+totalArray[i].label;
				if(totalArray[0].direction == "height"){
					vsSource += "<br>";
				}
			}
			
		}	
		vsSource += " </div>";
		
		$("td[tableFocus=true]").css("text-align","left");
		
		if(!focusOut.tableYn()){
			// div도 포커스가 없다면
			if(!focusOut.divYn()){
				$("#creationTable").append(vsSource);
				onclick.fn_setformSize();
			} else{
				$("[compoDvs=div_content][mainfocus=true]").append(vsSource);
				onclick.fn_setDivContentSize();
			}
			
		// 포커스가 있다면 포커스잡힌 td에 생성
		} else{
			$("td[tableFocus=true]").append(vsSource);
		}
		
		vnCheckGroupCount++;
		
		var div_popCount = ($(".div_pop").length)-1;
		$("#div_pop"+div_popCount).remove();

		
	}
	
	fn_saveClone();
	accordian.fn_draggable();
}













