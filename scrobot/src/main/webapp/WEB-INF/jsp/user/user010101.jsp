<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
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
  *
  * Copyright (C) 2009 by MOPAS  All right reserved.
  */
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>userPage</title>
    <link type="text/css" rel="stylesheet" href="<c:url value='/css/sample.css'/>"/>
    
    
    <style>
   
   
#div_login{
	width:350px;
	background: white;
	padding: 30px 30px 10px 30px;
	box-shadow:  0px 0px 10px 3px grey;
}

#div_login_title{
	margin-bottom: 20px;
	border-bottom: 2px solid #C4CFED;
	position:relative;
	
}

#span_login_title{
	display:inline-block;
	font-size: 13pt;
	font-weight: 900;
	margin-bottom: 20px;
	
}

#tbl_login_table{
	font-size: 1.4em;
	font-weight: bold;
	text-align: left;
}

#tbl_login_table td{
	height:40px;
}

#tbl_login_table input{
	border: 1px solid #6486DF;
	height:30px;
	width:210px;
}

#tbl_login_table img{
	border: 1px solid #6486DF;
	cursor:pointer;
}

#div_login_table{
	position:relative;
}

#div_login_button{
	position:relative;
	text-align: right;
	margin:10px 5px 10px 0px;
}
   
    </style>
    
    <script src="https://code.jquery.com/jquery-2.2.1.js"></script>
    <script type="text/javascript" src="./js/scrobot.js" ></script> 
    <script type="text/javaScript" language="javascript" defer="defer">
    

        /* 로그인 화면 function */
        fn_retrieveLogin = function () {
        	var vjLoginInfo = $("#loginForm").serialize();
        	$.ajax({
                url: "/retrieveLogin.do",
                type: "POST",
                data: vjLoginInfo,
                success: function(data){
                    if(data == "Y"){
                    	window.location.href = "/main.do";
                    } else{
                    	robot.alert("ID 또는 비밀번호를 확인하시기 바랍니다.")
                    }
                },
                error: function(){
                }
            })
        
        }

        

        

    </script>
</head>

<body style="text-align:center; margin:0 auto; display:inline; background:#f7f7f7 ">
    <form:form id="loginForm" name="loginForm" method="post">
        <div id="div_login" style="position:absolute; left:45%; transform:translateX(-50%); top:30%">
        	<!-- 타이틀 -->
        	<div id="div_login_title" style="text-align: left;">
        		<span id="span_login_title">Log-in</span>
        	</div>
        	<!-- // 타이틀 -->

        	<div id="div_login_table">
        		<table id="tbl_login_table" width="100%" cellpadding="0" cellspacing="0">
        			<colgroup>
        				<col width="30"/>
        				<col width="90"/>
        				<col width="80"/>
        			</colgroup>
        			<tr>
        				<td>ID</td>
        				<td><input type="text" name ="id" id="id"></text></td>
        				<td rowspan="2"><img src="<c:url value='/images/cmmn/btn_login.png'/>" onclick="fn_retrieveLogin();"/>
                      </span></td>
        			</tr>
        			<tr>
        				<td>PW</td>
        				<td><input type="password" name="pass" id="pass"></td>
        			</tr>

        		</table>
        	</div>
        	<!-- /List -->
        	<div id="div_login_button">
        	  <span>
        	     <a href="/moveJoinForm.do" style="color:blue;">회원가입</a>
              </span>
                  
        	</div>
        </div>
    </form:form>
</body>
</html>
