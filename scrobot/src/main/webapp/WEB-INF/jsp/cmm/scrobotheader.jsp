<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html>
<head profile="http://www.w3.org/2005/10/profile">
<link rel="icon" type="image/png" href="http://example.com/myicon.png">
<meta charset="UTF-8">
<title>scrobot_공통헤더</title>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/sample.css'/>" />
<link type="text/css" rel="stylesheet" href="<c:url value='/css/scrBase.css'/>" />
<link type="text/css" rel="stylesheet" href="<c:url value='/css/scrLayout.css'/>" />
<link type="text/css" rel="stylesheet" href="<c:url value='/css/scrStyle.css'/>" />
<style>
	
	.nav-container {
		display:flex;
		flex-direction:row;
		width:100%;
		height:100px;
		margin:0;
		padding:0;
		background-color:lightsky;
		list-style-type:none;
		left:250px;
		position:relative;
		
	}
	
	#nav{
		z-index:1;
		position:fixed;
		width:100%;
		background: linear-gradient( to bottom, #dce1e7, #c7cad1 );
	}
	
	.nav-item {
		color:black;
		font-size:11pt;
		font-weight: bold;
		border-left: 2px solid #c9ccd3;
		width:100px;
		height:65px;
		margin-top:20px;
	}
	
	.nav-item p{
		font-size:9pt;
	}
	
	.nav-item:first-child{
		border-left: none;
	}
	
	.nav-item:hover {
		cursor:pointer;
	}
	
	.nav-item a {
		text-align:center;
		text-decoration:none;
		color:white;
		
	}
	
	#new{
   		margin-top: 15px;
	}
	
	#open{
    	margin-top: 20px;
	}
	
	#save{
		margin-top: 17px;
	}
	
	#resave{
   		margin-top: 11px;
	}
	
	#back{
	    margin-top: 10px;
	}
	
	#refresh{
	    margin-top: 12px;
	}
	
	#detail{
		margin-top: 10px;
	}
	
	#preview{
		margin-top: 15px;
	}
	
	#li_rollback img, #li_rollback p{
		opacity:0.3;
	}
	
	#li_restart img, #li_restart p{
		opacity:0.3;
	}
	
	#logout:hover{
		cursor:pointer;
		color:blue;
	}
	
</style>
<script src="https://code.jquery.com/jquery-3.2.1.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script type="text/javascript" src="./js/accordian.js" ></script>
<script type="text/javascript" src="./js/boxEdit.js" ></script> 
<script type="text/javascript" src="./js/callBack.js" ></script> 
<script type="text/javascript" src="./js/creationComponent.js" ></script> 
<script type="text/javascript" src="./js/dblclick.js" ></script> 
<script type="text/javascript" src="./js/focusOut.js" ></script> 
<script type="text/javascript" src="./js/onclick.js" ></script> 
<script type="text/javascript" src="./js/outline.js" ></script> 
<script type="text/javascript" src="./js/scrobot.js" ></script> 
<script type="text/javascript" src="./js/table.js" ></script> 
<!-- <script type="text/javascript" src="./js/sootechsys.js" ></script>  -->
<script src ="./js/colResizable-1.6.js"></script>
<script src ="./js/colResizable-1.6.min.js"></script>
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

// 현재 화면 ID
vsViewId = "";

//Clone
voClone = [""];

//clone index
vnCloneIndex = 0;

var shiftHold = 0;

$(document).ready(function(){

	$("#li_rollback").hover(function(){
		 if($("#li_rollback img").css("opacity") == "1"){
			 $(this).css("cursor","pointer");
		 } else{
			 $(this).css("cursor","default");
		 }
	});
	
	$("#li_restart").hover(function(){
		 if($("#li_restart img").css("opacity") == "1"){
			 $(this).css("cursor","pointer");
		 } else{
			 $(this).css("cursor","default");
		 }
	});
	
	
	
	
	$("body").keydown(function(e){
		
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
		else if(e.keyCode == 27){
			$(".div_pop").last().remove()
		}
		
	});
	
});
	
vsMouseDownInfo = {
		"row" : "",
		"col" : ""
};


$(document).click(function(e){
	if($(".div_pop span").text() == "Preview"){
		return false;
	}
	accordian.fn_draggable();
		
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

/* 2020.05.04 상세보기 페이지를 위치시킨다. *///


function info(){ 	
	if($("#div_propertyTable").css("display") == "block"){
		$("#div_propertyTable").hide();
	}
	else{
		$("#div_propertyTable").show();
	}
}
	
function fn_sourceReset(){	
	if($("#creationTable").children().length != 0){
		$("#creationTable").empty();
		fn_saveClone();
		vsViewId = "";
	}
	
}
		
	
fn_saveClone = function(param){
	
	$("#li_rollback").attr("onclick","fn_sourceRollBack()");
	$("#li_rollback img, #li_rollback p").css("opacity", "1.0");
	
	if(vnCloneIndex == 0){
		//되돌리기 위하여 클론저장
		if(param == "td"){
			voClone[0] = ($("#creationTable").html());
		} else{
			voClone.unshift($("#creationTable").html());
		}
	} 
	else{
		for(var i=0; i<vnCloneIndex; i++){
			voClone.splice(0,1)
		}
		
		
		//되돌리기 위하여 클론저장
	if(param == "td"){
		voClone[0] = ($("#creationTable").html());
	}
	else{
		voClone.unshift($("#creationTable").html());
		}
		
		$("#li_restart").attr("onclick","");
		$("#li_restart img, #li_restart p").css("opacity", "0.3");
		vnCloneIndex = 0;
	}
}
	
//되돌리기
function fn_sourceRollBack(){

	if(vnCloneIndex == 0 && voClone.length == 1){
		//되돌리기 위하여 클론저장
		voClone.unshift($("#creationTable").html());
	}

	$("#creationTable").empty();
	vnCloneIndex++;
	$("#creationTable").append(voClone[vnCloneIndex]);
		
		
	if(vnCloneIndex == voClone.length-1){
		$("#li_rollback").attr("onclick","");
		$("#li_rollback img, #li_rollback p").css("opacity", "0.3");
		$("#li_rollback").css("cursor", "default");
	} 
	else{
		$("#li_rollback").attr("onclick","fn_sourceRollBack()");
		$("#li_rollback img, #li_rollback p").css("opacity", "1.0");
		$("#li_rollback").css("cursor", "pointer");
	}
	
	$("#li_restart").attr("onclick","fn_sourceRestart()");
	$("#li_restart img, #li_restart p").css("opacity", "1.0");
	$("#li_restart").css("cursor", "pointer");
			
}
	
	// 다시실행
fn_sourceRestart = function(){
		
	if(voClone != ""){
		$("#creationTable").empty();
		vnCloneIndex--;
		$("#creationTable").append(voClone[vnCloneIndex]);
	
		if(vnCloneIndex == 0){
			$("#li_restart").attr("onclick","");
			$("#li_restart img, #li_restart p").css("opacity", "0.3");
			$("#li_restart").css("cursor", "default");
		} else{
			$("#li_restart").attr("onclick","fn_sourceRestart()");
			$("#li_restart img, #li_restart p").css("opacity", "1.0");
			$("#li_restart").css("cursor", "pointer");
		}
		
		$("#li_rollback").attr("onclick","fn_sourceRollBack()");
		$("#li_rollback img, #li_rollback p").css("opacity", "1.0");
		$("#li_rollback").css("cursor", "pointer");
	}
}

	
	
fn_preview = function(){
	
	var info = {"header" : "Preview",
			    "width"  : "1200px",
			    "height" : "700px"}
	robot.openPop(info,$("#div_creationForm").html(),"tag");
		
	$(".pop_content .ui-resizable-handle").remove();
	$(".pop_content .ui-draggable").removeClass("ui-draggable");
	$(".pop_content .ui-resizable").removeClass("ui-resizable");
	$(".pop_content .ui-draggable-handle").removeClass("ui-draggable-handle");
}
	
/* 다른이름으로 저장 function */
fn_diffrentNmSave = function() {
	
	$.ajax({
		url : "/userIdSessionYn.do",
		type : "POST",
		success : function(data) {
			
			// 세션에 id 없을경우
			if(data == ""){
				robot.alert("세션이 만료되었습니다. 다시 로그인 해주시기 바랍니다.","","","fn_saveListCallAlert");
				
			// 세션에 id가 있다면
			} else{
				robot.prompt("다른이름으로 저장","업무명을 입력하시오",["업무명"],"","","fn_diffrentNmSaveCallBack");
			}
			},
		error : function() {
		}
	})
	
	
	
}

/* 다른이름으로 저장 CallBack */
fn_diffrentNmSaveCallBack = function(param){
		
	if(param == ""){
		return false;
	}
	
	//////////////////////전체젲거
	// compodvs attr 제거
	$("#creationTable [compodvs]").removeAttr("compodvs");
	$("#creationTable [focus]").removeAttr("focus");
	$("#creationTable [mainfocus]").removeAttr("mainfocus");
	$("#creationTable [tablefocus]").removeAttr("tablefocus");
	
	$("#creationTable [onclick]").removeAttr("onclick");
	$("#creationTable [ondblclick]").removeAttr("ondblclick");
	$("#creationTable [onmousedown]").removeAttr("onmousedown");
	$("#creationTable [onmouseover]").removeAttr("onmouseover");
	$("#creationTable [onmouseup]").removeAttr("onmouseup");
	
	
	// resize 모양 제거
	$("#creationTable .ui-resizable-handle").remove();
	
	// class 제거
	$("#creationTable .ui-draggable").removeClass("ui-draggable ui-draggable-handle ui-resizable");
	
	// resize 모양 제거
	$("#creationTable .ui-droppable").removeClass("ui-droppable");
	
	
	
	////////////////////////////////////////////////////////table
	$("#creationTable [row]").removeAttr("row")
	$("#creationTable [shell]").removeAttr("shell")
	
	
	var vsJsp = $("#creationTable").html();
	
	// 지우기전 클론으로 되돌리기
	$("#creationTable").empty();
	$("#creationTable").append(voClone[vnCloneIndex]);
	
	var vsHtml = $("#creationTable").html();
	var vsStyle = $("style").html();
	
	var vsbusinessNm = param[0]
		var vjCreationInfo = {
			"html" : vsHtml,
			"jsp" : vsJsp,
			"businessNm" : vsbusinessNm,
			"style" : vsStyle,
			"devSource" : vjQuery
	}
	
	$.ajax({
		url : "/creationHTML.do",
		type : "POST",
		data : JSON.stringify(vjCreationInfo),
		dataType: "json",
		contentType: "application/json",
		success : function(data) {
			robot.alert("저장되었습니다.");
			vsViewId = vsbusinessNm;
			},
		error:function(request,status,error){
	        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
	       }
		})
}



/* 저장 function */
fn_createSource = function() {
	
	$.ajax({
		url : "/userIdSessionYn.do",
		type : "POST",
		success : function(data) {
			
			// 세션에 id 없을경우
			if(data == ""){
				robot.alert("세션이 만료되었습니다. 다시 로그인 해주시기 바랍니다.","","","fn_saveListCallAlert");
				
			// 세션에 id가 있다면
			} else{
				if(vsViewId == ""){
					robot.prompt("저장","업무명을 입력하시오",["업무명"],"","","fn_diffrentNmSaveCallBack");
				} else{
					fn_diffrentNmSaveCallBack([vsViewId]);
				}
			}
			},
		error : function() {
		}
	})
		
}	
	
		// 모든소스 만들기
/* 		var vjCreationInfo = $("#creationForm").serialize();

		$.ajax({
			url : "/creationSource.do",
			type : "POST",
			data : vjCreationInfo,
			success : function() {
				alert("완료");

			},
			error : function() {
			}
		}) */
		
	
/* 불러오기 function */
fn_saveListCall = function(){
	$.ajax({
		url : "/userIdSessionYn.do",
		type : "POST",
		success : function(data) {
					
			// 세션에 id 없을경우
			if(data == ""){
				robot.alert("세션이 만료되었습니다. 다시 로그인 해주시기 바랍니다.","","","fn_saveListCallAlert");
				
			// 세션에 id가 있다면
			} 
			else{
				var param = {
			    		"viewId" : "hi"
			    }
				var info = {"header" : "불러오기",
						    "width"  : "700px",
						    "height" : "500px",
						    "callBack" : "fn_saveListCallCallBack",
						    "param" : param}
				robot.openPop(info, "view010101P01.jsp");
				}
			},
			error : function() {
			}
		})
}
		
		
fn_saveListCallAlert = function(param){
	var info = {"header" : "로그인",
		    "width"  : "700px",
		    "height" : "500px"}
	robot.openPop(info, "user010101P01.jsp");
}
		
fn_saveListCallCallBack = function(param){
	if(param != ""){
		if(typeof(param) == "string"){
			vsViewId = param;
			vjQuery = "";
		} 
		else{
			vsViewId = param[0].VIEW_ID;
			vjQuery = param;
		}
		
	}
	
	
}

fn_logout = function(){
	robot.confirm("로그아웃 하시겠습니까?","","","true","fn_logoutCallBack")
}
	
fn_logoutCallBack = function(param){
	if(param == "true"){
		window.location.href = "/logout.do";
	}
}



</script>
</head>

<body>
	 <div id="nav"> <!-- 크기조절하여 글자 라인 맞추기부터 실시 -->
	 	<ul class="nav-container">
	 		<li class="nav-item"  onclick="fn_sourceReset();"><img src="/images/menu/icon_top_new.png">
	 		<p id="new">새로만들기</p></li>
	 		<li class="nav-item" onclick="fn_saveListCall();"><img src="/images/menu/icon_top_open.png">
	 		<p id="open">불러오기</p></li>
	 		<li class="nav-item" onclick="fn_createSource();"><img src="/images/menu/icon_top_save.png">
	 		<p id="save">저장</p></li>
			<li class="nav-item" onclick="fn_diffrentNmSave();"><img src="/images/menu/icon_top_resave.png">
			<p id="resave">다른이름저장</p></li>
	 		<li id="li_rollback" class="nav-item" onclick=";"><img src="/images/menu/icon_top_back.png">
	 		<p id="back">되돌리기</p></li>
	 		<li id="li_restart" class="nav-item" onclick=";"><img src="/images/menu/icon_top_refresh.png">
	 		<p id="refresh">재실행</p></li>
	 		<li class="nav-item" onclick="info();"><img src="/images/menu/icon_top_detail.png">
	 		<p id="detail">속성보기</p></li>
	 		<li class="nav-item" onclick="fn_preview();"><img src="/images/menu/icon_top_preview.png">
	 		<p id="preview">미리보기</p></li>
	 			 		
			<li>
				<span id="logout" onclick="fn_logout()">로그아웃</span>
			</li>
	 	</ul>
	 </div>
</body>
</html>























