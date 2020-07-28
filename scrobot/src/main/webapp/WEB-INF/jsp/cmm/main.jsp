<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%
	/**
	* @Class Name : egovSampleList.jsp
	* @Description : Sample List 화면
	* @Modification Information
	*
	*   수정일         수정자                   수정내용
	*  -------    --------    ---------------------------
	*  2009.02.01            최초 생성
	*
	* author 실행환경 개발팀
	* since 2009.02.01
	**
	* Copyright (C) 2009 by MOPAS  All right reserved.
	*/
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>edit</title>
<style>

#div_main img{
	cursor:pointer;
	margin-left: 20px;
	border: 1px solid #2B7DA5;
	border-radius: 5%;
}

</style>
<script src="https://code.jquery.com/jquery-3.2.1.js"></script>
<script type="text/javaScript" language="javascript" defer="defer">

</script>
</head>

<body>
	<div id="div_main" style="position:absolute; left:45%; transform:translateX(-50%); top:30%">
		<img src="<c:url value='/images/cmmn/creationPrj.png'/>" onclick="location.href='/createPrj.do'"/>
		<img src="<c:url value='/images/cmmn/viewEdit.png'/>" onclick="location.href='/viewEdit.do'"/>
		<img src="<c:url value='/images/cmmn/devFile.png'/>"  onclick="location.href='/devFile.do'"/>
	</div>
	

</body>
</html>
