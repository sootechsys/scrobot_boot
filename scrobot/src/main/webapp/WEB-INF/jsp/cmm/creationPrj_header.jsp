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

#div_prjList{
	width:83%;
	height:100px;
	list-style-type:none;
	left:225px;
	top:70px;
	position:relative;
}

#ul_prjList{
	position:relative;
	height:30px;
	padding:0;
	
	
}
#ul_prjList li{
	float:left;
	margin: 0px 30px 20px 0px;
	background: linear-gradient( to bottom, #eff2f7, #C6C9D0);
}

.btn_prj{
	
	height:40px;
	width:auto;
	min-width:130px;
	background: linear-gradient( to bottom, #eff2f7, #C6C9D0);
	border:0px;
	font-size: 10pt;
	font-weight: 900;
	color: #676767;
	cursor:pointer;
}


#div_topMenu {
		width:83%;
		height:100px;
		list-style-type:none;
		left:225px;
		top:30px;
		position:relative;
		
	}
	
#div_menuList{
		z-index:1;
		width:75%;
		top:30px;
		left:100px;
		float:left;
		position:relative;
		overflow-x: auto;
		overflow-y:hidden;  
	}
.ul_creationPrj_header{
	position:relative;
	height:30px;
	padding:0;
	
}

.ul_creationPrj_header li{
	float:left;
	margin: 0px 50px 20px 0px;
}

.ul_creationPrj_header li img{
	opacity:0;
}
	
#div_topMenu_btn{
	position:relative;
	float:right;
	margin-right: 150px;
	top:70px;
	cursor:pointer;
	display:none;
}

.btn_topMenu{
	
	height:40px;
	width:auto;
	min-width:130px;
	background: linear-gradient( to bottom, #eff2f7, #C6C9D0);
	border:0px;
	font-size: 13pt;
	font-weight: 900;
	color: #676767;
	cursor:pointer;
}
	
</style>
<script type="text/javaScript">

voHeaderPrompt = "";


$(document).ready(function(){

})




/*
 * 프로젝트 만들기 클릭 이벤트
 * 새로운 프로젝트 탭 생성
 */
fn_creationPrj = function(){
	
	var vsPrjId = robot.sysdate("PR01")
	
	var vsSource = "<li>"
	vsSource += "\n <input type=\"button\" ";
	vsSource += "class=\"btn_prj\" ";
	vsSource += "prjFocus=\"false\" ";
	vsSource += "onclick=\"fn_prjClick(this);\" ";
	vsSource += "value=\"새 프로젝트\" ";
	vsSource += "prjId=\""+vsPrjId+"\">";
	vsSource += "\n </input>";
	vsSource += "\n <img width=\"20px;\" src=\"<c:url value='/images/object/icon_delete.png'/>\" onclick=\"fn_topMenuDelete(this);\"/>";
	vsSource += "\n</li>";
	
	// 프로젝트 추가
	$("#ul_prjList").append(vsSource);
	
	
	var vsSource = "<ul prjId=\""+vsPrjId+"\" class=\"ul_creationPrj_header\">";
	vsSource += "</ul>";
	
	// 새로운 메뉴 ul 생성
	$("#div_menuList").append(vsSource);
}

/*
 * 프로젝트 클릭 이벤트
 * 프로젝트 상세내용 오픈
 */
fn_prjClick = function(param){
	
	$("[prjFocus=true]").attr("prjFocus","false");
	$(param).attr("prjFocus","true");
	$("#div_topMenu_btn").css("display","block");
	
	var vsPrjId = $(param).attr("prjId");
	
	$("#div_menuList ul").css("display","none");
	$("#div_menuList [prjid="+vsPrjId+"]").css("display","inline");
	
	$("#div_creationMenu_left").css("display","none");
	
}

/* 
+아이콘 클릭 이벤트
: top menu 추가
*/
fn_creationTopMenu = function(){
	
	// 포커스 프로젝트의 프로젝트 id값 구하기
	var vsPrjId = $("[prjFocus=true]").attr("prjId");
	
	var vsMenuId = robot.sysdate("PR03");
	
	var vsSource = "<li onmouseover=\"fn_topMenuMouseOver(this);\" ";
	vsSource += "onmouseout=\"fn_topMenuMouseOut(this);\">"
	vsSource += "\n <input type=\"button\" ";
	vsSource += "compoDvs=\"menu\" ";
	vsSource += "class=\"btn_topMenu\" ";
	vsSource += "menuId=\""+vsMenuId+"\" ";
	vsSource += "hrnk_menuId=\"\" ";
	vsSource += "lvl1_menufocus=\"false\"";
	vsSource += "onclick=\"fn_topMenuClick(this);\" ";
	vsSource += "ondblclick=\"fn_topMenuModify(this);\" ";
	vsSource += "value=\"새메뉴\" ";
	vsSource += "menulvl=\"1\">";
	vsSource += "\n </input>";
	vsSource += "\n <img width=\"20px;\" src=\"<c:url value='/images/object/icon_delete.png'/>\" onclick=\"fn_topMenuDelete(this);\"/>";
	vsSource += "\n</li>";
	
	
	
	// 포커스잡힌 프로젝트에 메뉴 생성
	$("#div_menuList [prjid="+vsPrjId+"]").append(vsSource);
	

	
	var vsSource = "<ul prjId=\""+vsPrjId+"\" hrnk_menuId=\""+vsMenuId+"\" class=\"ul_creationPrj_left\">";
	vsSource += "</ul>";
	
	// 새로운 메뉴 ul 생성
	$("#div_leftMenuList").append(vsSource);
	
}


fn_topMenuClick = function(param){
	$("[lvl1_MenuFocus=true]").attr("lvl1_MenuFocus","false");
	$(param).attr("lvl1_MenuFocus","true");
	
	$("#div_creationMenu_left").css("display","block");
	$("#div_leftMenu_btn").css("display","block");
	
	var vsMenuId = $(param).attr("menuId");
	
	$("#div_leftMenuList ul").css("display","none");
	$("#div_leftMenuList [hrnk_menuId="+vsMenuId+"]").css("display","inline");
}


/* 
	menu li mouse over 이벤트
	: x표시 활성화
*/
fn_topMenuMouseOver = function(param){
	$(param).children("img").css("opacity","1")
	$(param).children("img").attr("onclick","fn_topMenuDelete(this);");
}

/* 
	menu li mouse out 이벤트
	: x표시 비활성화
*/
fn_topMenuMouseOut = function(param){
	$(param).children("img").css("opacity","0")
	$(param).children("img").attr("onclick","");
}


/* 
x아이콘 클릭 이벤트
: top menu 삭제
*/
fn_topMenuDelete = function(param){
	param.parentNode.remove()
}


/* 
탑메뉴 더블클릭 이벤트
: 탑메뉴명 변경
*/
fn_topMenuModify = function(param){
	robot.prompt("메뉴명","메뉴명을 입력하시오",[{"메뉴명":param.value}],"","","fn_topMenuModifyCallBack");
	
	voHeaderPrompt = param;
}

/* 
탑메뉴 더블클릭 이벤트 콜백
: 콜백
*/
fn_topMenuModifyCallBack = function(param){
	if(param == ""){
		return false;
	}
	
	$(voHeaderPrompt).val(param[0]);
	
	voHeaderPrompt = "";
}




fn_savePrj = function(){
	$.ajax({
		url : "/userIdSessionYn.do",
		type : "POST",
		success : function(data) {
			
			// 세션에 id 없을경우
			if(data == ""){
				robot.alert("세션이 만료되었습니다. 다시 로그인 해주시기 바랍니다.","","","fn_saveListCallAlert");
				
			// 세션에 id가 있다면
			} else{
				var vsPrjId = $("[prjFocus=true]").val();
				if(vsPrjId == "새 프로젝트"){
					robot.prompt("저장","프로젝트명을 입력하시오",["프로젝트명"],"","","fn_diffrentPrjSaveCallBack");
				} else{
					fn_diffrentPrjSaveCallBack([vsPrjId]);
				}
			}
			},
		error : function() {
		}
	})
}

/* 다른이름으로 저장 CallBack */
fn_diffrentPrjSaveCallBack = function(param){debugger;
		
	if(param == ""){
		return false;
	}
	
	var voPrj = $("[prjFocus=true]");
	var vsPrjId = $("[prjFocus=true]").attr("prjId");
	
	
	$("[prjFocus=true]").val(param);
	
	var voMenu = $("ul[prjId="+vsPrjId+"]").find("[compodvs=menu]");
	
	
	var voMenuInfo = [];
	for(var i=0; i<voMenu.length; i++){
		var vsMenuId = voMenu.eq(i).attr("menuId");
		var vsMenuLvl = voMenu.eq(i).attr("menulvl");
		var vsHrnkMenuId = voMenu.eq(i).attr("hrnk_menuId");
		if(voMenu.eq(i).prop("tagName") == "SPAN"){
			var vsMenuNm = voMenu.eq(i).text();
		} else if(voMenu.eq(i).prop("tagName") == "INPUT"){
			var vsMenuNm = voMenu.eq(i).val();
		}
		
		voMenuInfo.push({
			"MENU_ID" : vsMenuId,
			"MENU_LVL" : vsMenuLvl,
			"MENU_NM" : vsMenuNm,
			"HRNK_MENU_ID" : vsHrnkMenuId,
		})
		
	}
	
	var vjInfo = {
			"PRJ_ID" : voPrj.attr("prjId"),
			"PRJ_NM" : voPrj.val(),
			"MENU_INFO" : voMenuInfo
	}

	$.ajax({
		url : "/savePrj.do",
		type : "POST",
		data : JSON.stringify(vjInfo),
		dataType: "json",
		contentType: "application/json",
		success : function(data) {
			robot.alert("저장되었습니다.");
			},
		error:function(request,status,error){
	        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
	       }
		})
}





</script>
</head>

<body>

	<div id="nav"> <!-- 크기조절하여 글자 라인 맞추기부터 실시 -->
	 	<ul class="nav-container">
	 		<li class="nav-item"  onclick="fn_creationPrj();">
	 			<img src="/images/menu/icon_top_new.png">
	 			<p id="new">프로젝트<br>새로만들기</p>
	 		</li>
	 		<li class="nav-item" onclick="fn_prjListCall();"><img src="/images/menu/icon_top_open.png">
	 		<p id="open">프로젝트<br>불러오기</p></li>
	 		<li class="nav-item" onclick="fn_savePrj();"><img src="/images/menu/icon_top_save.png">
	 		<p id="save">프로젝트<br>저장</p></li>
			<li class="nav-item" onclick="fn_diffrentNmSavePrj();"><img src="/images/menu/icon_top_resave.png">
			<p id="resave">프로젝트<br>다른이름저장</p></li>
			<li>
				<span id="logout" onclick="fn_logout()">로그아웃</span>
			</li>
	 	</ul>
	 </div>
	 
	 <div id="div_prjList">
	 	<ul id="ul_prjList">
	 	</ul>
	 </div>

	 <div id="div_topMenu">
	 
	 	<div id="div_menuList">

	 	</div>
	 	
	 	<div id="div_topMenu_btn">
	 		<img width="30px;" src="<c:url value='/images/object/img_add.png'/>" onclick="fn_creationTopMenu();"/>
	 	</div>
	 	
	 </div>
</body>
</html>























