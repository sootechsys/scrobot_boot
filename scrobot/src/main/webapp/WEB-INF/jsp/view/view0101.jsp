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

  </style>
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">  
<script src="https://code.jquery.com/jquery-3.2.1.js"></script>
<script type="text/javaScript" language="javascript" defer="defer">

</script>
</head>

<body>
	<jsp:include page="../cmm/scrobotRight.jsp" />
	<jsp:include page="../view/view010101.jsp" />
	<jsp:include page="../view/view010102.jsp" />
	<jsp:include page="../view/view010103.jsp" />
	<c:choose>
		<c:when test="${viewDvs eq 'viewEdit'}">
			
		</c:when>
		<c:when test="${viewDvs eq 'creationPrj'}">
			
		</c:when>
		<c:when test="${viewDvs eq 'devFile'}">
			
		</c:when>
	
	</c:choose>



	
	

</body>
</html>
