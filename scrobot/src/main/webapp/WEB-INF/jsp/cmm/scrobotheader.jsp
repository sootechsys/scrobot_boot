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
<script type="text/javascript" src="./js/scrobot.js" ></script> 
<script type="text/javascript" src="./js/onclick.js" ></script> 
<script type="text/javascript" src="./js/focusOut.js" ></script> 
<script type="text/javascript" src="./js/table.js" ></script> 
<script src ="./js/colResizable-1.6.js"></script>
<script src ="./js/colResizable-1.6.min.js"></script>
<script type="text/javaScript">


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
});
	
	// 현재 화면 업무명
	vsWrkNm = "";
	
	//Clone
	voClone = [""];
	
	//clone index
	vnCloneIndex = 0;
	
	
	/* 2020.05.04
	상세보기 페이지를 위치시킨다.
	*///
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
			vsWrkNm = "";
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
		
		
	} else{
		for(var i=0; i<vnCloneIndex; i++){
			voClone.splice(0,1)
		}
		
		
		//되돌리기 위하여 클론저장
		if(param == "td"){
			voClone[0] = ($("#creationTable").html());
		} else{
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
		} else{
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
		
		var vsHtml = $("#creationTable").html();
		var vsStyle = $("style").html();
		
		var vsbusinessNm = param[0]

		var vjCreationInfo = {
				"html" : vsHtml,
				"businessNm" : vsbusinessNm,
				"style" : vsStyle
		}
		
		$.ajax({
			url : "/creationHTML.do",
			type : "POST",
			data : vjCreationInfo,
			success : function(data) {
				robot.alert("저장되었습니다.");
				vsWrkNm = vsbusinessNm;

			},
			error : function() {
			}
		})
	}
	
	
	
	/* 저장 function */
	fn_createSource = function() {debugger;
		
		$.ajax({
			url : "/userIdSessionYn.do",
			type : "POST",
			success : function(data) {
				
				// 세션에 id 없을경우
				if(data == ""){
					robot.alert("세션이 만료되었습니다. 다시 로그인 해주시기 바랍니다.","","","fn_saveListCallAlert");
					
				// 세션에 id가 있다면
				} else{
					if(vsWrkNm == ""){
						robot.prompt("저장","업무명을 입력하시오",["업무명"],"","","fn_diffrentNmSaveCallBack");
					} else{
						fn_diffrentNmSaveCallBack([vsWrkNm]);
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
					} else{
						var param = {
					    		"wrkNm" : "hi"
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
		vsWrkNm = param;
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























