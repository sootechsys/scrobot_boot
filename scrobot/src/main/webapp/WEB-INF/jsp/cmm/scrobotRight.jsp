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


#mysidenav img:hover{
	cursor:pointer;
}



/* 사이드바 스타일      */
#div_right {
	height: 100%;
	position:fixed;
	z-index: 2;
	top: 0;
	left: 96%;
	background-color: #2D7CA5; /* 2번클릭시 : #47619E , 3번클릭시 : #268F88 */
	overflow-x: hidden;
	transition: 0.5s ease-in-out;
	width: 70px;
	text-align: left;
}

.div_right_icon{
	width:40px;
	padding:10px 0px 10px 10px;
	border-radius: 0% 30% 30% 0%;
	cursor:pointer;
}

#div_right_creationPrj{
	margin-top: 30px;
	background: #3FAEE6; /* 선택 안되었을때 : #2D7CA5*/
}

#div_right_viewEdit{
	margin-top: 3px;
	background: #6389DE; /* 선택 안되었을때 : #47619E */
}

#div_right_devFile{
	margin-top: 3px;
	background: #38CBC1; /* 선택 안되었을때 : #289089 */
}



</style>
<script type="text/javaScript">

$(document).ready(function(){
	var vsViewDvs = '<c:out value="${viewDvs}"/>';
	
	if(vsViewDvs == "creationPrj"){
		fn_creationPrjClick();
	} else if(vsViewDvs == "viewEdit"){
		fn_viewEditClick();
	} else if(vsViewDvs == "devFile"){
		fn_devFileClick();
	}
});

fn_creationPrjClick = function(){
	$("#img_right_creationPrj").attr("src", "/images/cmmn/creationPrj_right_ck.png");
	$("#img_right_viewEdit").attr("src", "/images/cmmn/viewEdit_right_nonck.png");
	$("#img_right_devFile").attr("src", "/images/cmmn/devFile_right_nonck.png");
	
	$("#div_right_creationPrj").css("background","#3FAEE6");
	$("#div_right_viewEdit").css("background","#47619E");
	$("#div_right_devFile").css("background","#289089");
	
	$("#div_right").css("background","#2D7CA5");
	
	$("#view010102").css("display","block");
	$("#view010101").css("display","none");
	$("#view010103").css("display","none");
}

fn_viewEditClick = function(){
	$("#img_right_creationPrj").attr("src", "/images/cmmn/creationPrj_right_nonck.png");
	$("#img_right_viewEdit").attr("src", "/images/cmmn/viewEdit_right_ck.png");
	$("#img_right_devFile").attr("src", "/images/cmmn/devFile_right_nonck.png");
	
	$("#div_right_creationPrj").css("background","#2D7CA5");
	$("#div_right_viewEdit").css("background","#6389DE");
	$("#div_right_devFile").css("background","#289089");
	
	$("#div_right").css("background", "#47619E");
	
	$("#view010102").css("display","none");
	$("#view010101").css("display","block");
	$("#view010103").css("display","none");
}

fn_devFileClick = function(){
	$("#img_right_creationPrj").attr("src", "/images/cmmn/creationPrj_right_nonck.png");
	$("#img_right_viewEdit").attr("src", "/images/cmmn/viewEdit_right_nonck.png");
	$("#img_right_devFile").attr("src", "/images/cmmn/devFile_right_ck.png");
	
	$("#div_right_creationPrj").css("background","#2D7CA5");
	$("#div_right_viewEdit").css("background","#47619E");
	$("#div_right_devFile").css("background","#38CBC1");
	
	$("#div_right").css("background", "#268F88");
	
	$("#view010102").css("display","none");
	$("#view010101").css("display","none");
	$("#view010103").css("display","block");
}
	
	
	
</script>

</head>

<body>
	
	<div id="div_right" class="sidenav">
		<div id="div_right_creationPrj" class="div_right_icon">
			<img id="img_right_creationPrj" src="<c:url value='/images/cmmn/creationPrj_right_nonck.png'/>" onclick="javascript:fn_creationPrjClick()"/>
		</div>
		<div id="div_right_viewEdit" class="div_right_icon">
			<img id="img_right_viewEdit" src="<c:url value='/images/cmmn/viewEdit_right_nonck.png'/>" onclick="javascript:fn_viewEditClick()"/>
		</div>
		<div id="div_right_devFile" class="div_right_icon">
			<img id="img_right_devFile" src="<c:url value='/images/cmmn/devFile_right_nonck.png'/>" onclick="javascript:fn_devFileClick()"/>
		</div>
		
	</div>

</body>
</html>