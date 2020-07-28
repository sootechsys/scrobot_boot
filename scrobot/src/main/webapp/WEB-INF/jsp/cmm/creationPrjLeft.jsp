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


/* 사이드바 스타일      */
#div_creationPrj_left {
	height: 100%;
	position: fixed;
	z-index: 1;
	top: 0;
	left: 0;
	background-color: #3FAEE6;
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


#div_leftMenu_btn{
	float:right;
	margin:30px 10px 0px 0px;
	display:none;
}

#div_leftMenu_btn img:hover{
	cursor:pointer;
}

#div_leftMenuList{
	margin:40px 0px 0px 20px;
	float:left;
	position:relative;
}

.ul_creationPrj_left li{
	margin-bottom:15px;
	border-top:1px dashed #A1D7F3;
	width:200px;
	text-align: left;
}

.ul_creationPrj_left li span{
	font-size: 13pt;
	font-weight: 900;
	color: white;
	cursor:pointer;
	margin-top: 15px;
	display:inline-block;
}

.ul_creationPrj_left li img{
	opacity:0;
}



</style>
<script type="text/javaScript">

voLeftPrompt = "";

/* 
+아이콘 클릭 이벤트
: left menu 추가
*/
fn_creationLeftMenu = function(param){debugger;
	
	var vsMenuId = robot.sysdate("PR03");
	
	var vsHrnkMenuId = $("[lvl1_MenuFocus=true]").attr("menuId");
	
	var vsSource = "<li onmouseover=\"fn_topMenuMouseOver(this);\" onmouseout=\"fn_topMenuMouseOut(this);\">"
	vsSource += "\n <span menuId=\""+vsMenuId+"\" hrnk_menuId=\""+vsHrnkMenuId+"\" compoDvs=\"menu\" ";
	vsSource += "\n onclick=\"fn_leftMenuClick(this);\" ondblclick=\"fn_leftMenuModify(this);\" menulvl=\"2\">새메뉴</span>";
	vsSource += "\n <img width=\"20px;\" src=\"<c:url value='/images/cmmn/icon_leftDelete.png'/>\" onclick=\"fn_topMenuDelete(this);\"/>";
	vsSource += "\n</li>";
	
	// 포커스 프로젝트의 프로젝트 id값 구하기
	var vsPrjId = $("[prjFocus=true]").attr("prjId");
	
	// 포커스잡힌 프로젝트에 메뉴 생성
	$("#div_leftMenuList ul[hrnk_menuId="+vsHrnkMenuId+"]").append(vsSource);
	
}


/* 
레프트메뉴 더블클릭 이벤트
: 탑메뉴명 변경
*/
fn_leftMenuModify = function(param){
	robot.prompt("메뉴명","메뉴명을 입력하시오",[{"메뉴명":param.textContent}],"","","fn_leftMenuModifyCallBack");
	
	voLeftPrompt = param;
}

/* 
레프트메뉴 더블클릭 이벤트 콜백
: 콜백
*/
fn_leftMenuModifyCallBack = function(param){debugger;
	if(param == ""){
		return false;
	}
	
	$(voLeftPrompt).text(param[0]);

	voLeftPrompt = "";
}
	
</script>

</head>

<body>
	<div id="div_creationPrj_left" class="sidenav">
		<div id="div_mainImg">
			<img src="<c:url value='/images/creationPrj_main.png'/>" alt=""/>
		</div>
		
		<div id="div_creationMenu_left">
			<div id="div_leftMenu_btn">
	 			<img width="30px;" src="<c:url value='/images/cmmn/img_leftAdd.png'/>" onclick="fn_creationLeftMenu();"/>
	 		</div>
	 		
	 		<div id="div_leftMenuList">

	 		</div>
		</div>

		
		
		
		
	</div>

</body>
</html>