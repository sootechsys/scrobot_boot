/***
 * 
 */
 //
robot = {};

/* prompt - 프롬프트를 실행한다.a
 * msg : 메시지 내용(String)
 * ele : prompt 요소(Arrary)
 * btn1 : 버튼1 name(String)
 * btn2 : 버튼2 name(String)
 * callBack : callback함수(String)
 * */
robot.prompt = function(header, msg, ele, btn1, btn2, callBack){
	
	if(typeof(ele) != "object"){
		robot.alert("프롬프트 메소드 에러","");
		return false;
	}
	var vsSource = "<h3>"+msg+"</h3><br><br>";
	for(var i=0; i<ele.length; i++){
		vsSource += "<span>"+ele[i]+" : "+"</span>";
		vsSource += "<input class=\"prompt_input\" type=\"text\"></input><br><br>";
	}
	
	vsSource += "<br>"
	
	if(btn1 == null || btn1 == ""){
		btn1 = "확인";
	}
	if(btn2 == null || btn2 == ""){
		btn2 = "취소";
	}
	
	if(header == null || header == ""){
		header = "prompt";
	}
	
	
	vsSource += "<input type=\"button\" class=\"btn_retrieve\" id=\"btn_promptSave\" value=\""+btn1+"\" onclick=\"robot.promptOnclick(";
	
	if(typeof(ele) == "object"){
		vsSource += "[";
		for(var i=0; i<ele.length; i++){
			vsSource += "'";
			vsSource += ele[i];
			vsSource += "'";
			if(ele.length-1 != i){
				vsSource += ",";
			}
		}
		vsSource += "]";
	} else if(typeof(ele) == "string"){
		vsSource += "'"+ele+"'";
	} else if(typeof(ele) == "number"){
		vsSource += ele;
	}
	
	vsSource += "," + callBack+")\"></input>";
	vsSource += "<input type=\"button\" class=\"btn_retrieve\" value=\""+btn2+"\" onclick=\"robot.closePop('',"+callBack+")\"></input>";
	
	var info = {"header" : header,
			    "callBack" : callBack};
	robot.openPop(info, vsSource,"tag","prompt");
}

robot.promptOnclick = function(ele, callBack){
	var voClassInfo = $(".prompt_input");
	var voClassValue = [];
	var vsMsg = "";
	
	for(var i=0; i<voClassInfo.length; i++){
		if(voClassInfo.eq(i).val() == ""){
			
			
			if(vsMsg != ""){
				vsMsg += ", ";
			}
			vsMsg += ele[i];
			
		}
		voClassValue.push(voClassInfo.eq(i).val());
	}
	
	if(vsMsg != ""){
		robot.alert(vsMsg+"을(를) 올바르게 입력하여 주시기 바랍니다.");
		return false;
	}
	
	
	robot.closePop(voClassValue, callBack);
	
}


/* alert - alert창을 실행
 * msg : 메시지 내용(String)
 * btn : 버튼 name(String)
 * param : 파라메터 값 (JSON)
 * callBack : callback함수(String)
 * */
robot.alert = function(msg, btn, param, callBack){

	var vsSource = "<h3>"+msg+"</h3><br><br>";
	vsSource += "<br>"
	
	if(btn == null || btn == ""){
		btn = "확인";
	}
	
	vsSource += "<input type=\"button\" class=\"btn_retrieve\" value=\""+btn+"\" onclick=\"robot.closePop(";
	
	if(typeof(param) == "object"){
		vsSource += "{";
		for(var i=0; i<Object.keys(param).length; i++){
			vsSource += Object.keys(param)[i];
			vsSource += ":'";
			vsSource += param[Object.keys(param)[i]];
			if(Object.keys(param).length-1 != i){
				vsSource += "',";
			}
		}
		vsSource += "}";
	} else if(typeof(param) == "string"){
		vsSource += "'"+param+"'";
	} else if(typeof(param) == "number"){
		vsSource += param;
	} else if(typeof(param) == "undefined"){
		vsSource += "''";
	}
		
	vsSource += ","+callBack+")\"></input>";
	
	
	var info = {"header" : "prompt",
		        "callBack" : callBack};
	robot.openPop(info, vsSource,"tag");
}


/* confirm - confirm창을 실행
 * msg : 메시지 내용(String)
 * btn1 : 버튼 name(String)
 * btn2 : 버튼 name(String)
 * param : 파라메터 값 (JSON)
 * callBack : callback함수(String)
 * */
robot.confirm = function(msg, btn1, btn2, param, callBack){
	
	var vsSource = "<h3>"+msg+"<h3><br><br>";

	
	if(btn1 == null || btn1 == ""){
		btn1 = "확인";
	}
	if(btn2 == null || btn2 == ""){
		btn2 = "취소";
	}
	
	
	vsSource += "<input type=\"button\" class=\"btn_retrieve\" value=\""+btn1+"\" onclick=\"robot.closePop(";
	
	if(typeof(param) == "object"){
		vsSource += "{";
		for(var i=0; i<Object.keys(param).length; i++){
			vsSource += Object.keys(param)[i];
			vsSource += ":'";
			vsSource += param[Object.keys(param)[i]];
			vsSource += "'";
			if(Object.keys(param).length-1 != i){
				vsSource += ",";
			}
		}
		vsSource += "}";
	} else if(typeof(param) == "string"){
		vsSource += "'"+param+"'";
	} else if(typeof(param) == "number"){
		vsSource += param;
	} else if(typeof(param) == "undefined"){
		vsSource += "''";
	}
	
	
	
	vsSource += ","+callBack+");\"></input>";
	vsSource += "<input type=\"button\" class=\"btn_retrieve\" value=\""+btn2+"\" onclick=\"robot.closePop('','');\"></input>";
	
	var info = {"header" : "prompt",
		        "callBack" : callBack};
	robot.openPop(info, vsSource,"tag");
}



/* openPop - 팝업을 오픈한다.
 * info : header헤더에 표시될 내용(string)
 * url : 팝업에 표시될 url내용(String)
 * urlDvs : jsp를 호출할지 tag를 직접입력할지 여부(String)
 *        - tag경우에 append, url인경우 load
 * */
robot.openPop = function(info, url, urlDvs,tagDvs){

	var header = info.header;
	var width = info.width;
	var height = info.height;
	var vsCallBack = info.callBack;
	var vjParam = info.param;
	
	if(typeof(header) == "undefined"){
		header = "popUp";
	}
	
	if(typeof(width) == "undefined"){
		width = "400px";
	} else if(typeof(width) == "number"){
		width += "px";
	}
	
	if(typeof(height) == "undefined"){
		height = "250px";
	} else if(typeof(height) == "number"){
		height += "px";
	}
	
	if(typeof(vsCallBack) == "undefined"){
		vsCallBack = "''";
	}

	
	
	var div_popCount = $(".div_pop").length;

	var info= "<div id=\"div_pop"+div_popCount+"\" class=\"div_pop\" style=>";
	
	info += " <input id=\"param\" type=\"hidden\" value=";
	
	if(typeof(vjParam) == "object"){
		info += "{";
		for(var i=0; i<Object.keys(vjParam).length; i++){
			info += "\"";
			info += Object.keys(vjParam)[i];
			
			info += "\":\"";
			info += vjParam[Object.keys(vjParam)[i]];
			info += "\"";
			if(Object.keys(vjParam).length-1 != i){
				info += ",";
			}
		}
		info += "}";
	}
	
	info += "></input>";
	
	info += " <input id=\"callBack\" type=\"hidden\" value=\""+vsCallBack+"\"></input>";
	
	
	info += "    <div id=\"div_pop_content"+div_popCount+"\" class=\"div_pop_content\" style=\"width:"+width+"; height:"+height+"\">";
	info += "      <div style=\"height:40px; background: linear-gradient( to bottom, #dce1e7, #c7cad1 ); text-align:left; \">";
	info += "      <span class=\"span_content\" style=\"height:30px; margin:5px 0px 0px 5px; display:inline-block;\">"+header+"</span>";
	info += "      <input type=\"button\" value=\"X\" style=\"float:right; background: linear-gradient( to bottom, #dce1e7, #c7cad1 ); height:100%; width:40px; font-size:15pt; font-weight:bold;\"";
	info += "      onclick=\"robot.closePop('',"+vsCallBack+");\">";
	info += "      </div>";
	info += "      <div id=\"pop_content"+div_popCount+"\" class=\"pop_content\">";
	info += "      </div>";
	info += "    </div>";
	info += "</div>";


	$("body").append(info);
	
	
	if(urlDvs == "tag"){
		$("#pop_content"+div_popCount).append(url);
		if(tagDvs == "prompt"){
			$(".prompt_input").eq(0).focus();
		}
	} else {
		$("#pop_content"+div_popCount).load("./ws/pop/"+url);
	}
	
}

/* closePop - 팝업을 닫는다.
 * param : 콜백함수로 보내질 param값(Object)
 * callBack : callBack 함수(String)
 * */
robot.closePop = function(param, callBack){

	var div_popCount = ($(".div_pop").length)-1;
	$("#div_pop"+div_popCount).remove();
	
	if(callBack != null && callBack != "" && typeof(callBack) == "function"){
		callBack(param);
	}
	
	if(typeof(callBack) == "string" && callBack != ""){
		eval(callBack)(param);
	}
}

/*
 * getAttr(param) - 해당태그의 속성을 가져온다. 
 * param(String) - 해당 태그가 input인지 select 인지 명시 
 * i(int) - 반복 변수
 */
robot.getAttr = function(param, i){

		var focusYn = $(param).attr("focus");
		
		if($("td[tableFocus=true]").length != 0){
			focusYn = "true";
		}
		
		var vmObj = {
				"id" : $(param).attr("id"),
				"class" : $(param).attr("class"),
				"name" : $(param).attr("name"),
				"label" : $(param).attr("label"),
				"style" : $(param).attr("style"),
				"value" : $(param).attr("value"),
				"compoDvs" : $(param).attr("compoDvs"),
				"realId" : $(param).attr("id")
		};
		
		if(vmObj.compoDvs == "td"){
		
			
			
			if(vmObj.style == null){
				vmObj.style = "";
				vmObj.style = vmObj.style+"height:"+$(param).parent().css("height")+"; "
				vmObj.style = vmObj.style+"width:"+$(param).css("width")+"; "
				
			} else {
				var vnStyleLen = vmObj.style.length;
				if(vmObj.style.indexOf("height") == -1){
					vmObj.style = "height:"+$(param).css("height")+"; "+vmObj.style
				} else{
					var vnHeightStart = vmObj.style.indexOf("height")+7
					var vsHeightSub = vmObj.style.substr(vnHeightStart,vnStyleLen)
					var vnHeight = vsHeightSub.substr(0,vsHeightSub.indexOf("px;")+2);
					vmObj.style = vmObj.style.replace("height:"+vnHeight,"height:"+$(param).css("height"));
				}
				
				if(vmObj.style.indexOf("width") == -1){
					vmObj.style = vmObj.style+"width:"+$(param).css("width")+"; "
				} else{
					var vnWidthStart = vmObj.style.indexOf("width")+6
					var vsWidthSub = vmObj.style.substr(vnWidthStart,vnStyleLen)
					var vnWidth = vsWidthSub.substr(0,vsWidthSub.indexOf("px;")+2);
					vmObj.style = vmObj.style.replace("width:"+vnWidth,"width:"+$(param).css("width"));
				}
				
				
			}
				
			
			
		}
		
		if(vmObj.compoDvs == "div_content"){
			vmObj.class = vmObj.class.split(" ui-draggable ui-draggable-handle ui-resizable").join("");
		} else if(["div_table","inputBox","selectBox"].indexOf(vmObj.compoDvs) != -1){
			vmObj.class = vmObj.class.split(" ui-draggable ui-draggable-handle").join("");
		}
		
		

		var keys = Object.keys(vmObj);
			
		if(focusYn == "true"){
			
			for(var j in keys){

				if(vmObj[keys[j]] == null){
					vmObj[keys[j]] = "";
				}
				
				
				$("#ibx_propertyTable_"+keys[j]).val(vmObj[keys[j]])
					
			}
			
			$("#btn_infoUpdate").show();
			
		} else{
			for(var j in keys){
				
				if(vmObj[keys[j]] == null){
					vmObj[keys[j]] = "";
				}
				
				$("#ibx_propertyTable_"+keys[j]).val("")
			}
			
			$("#btn_infoUpdate").hide();
		}
	
	
}
	
	
	
	






