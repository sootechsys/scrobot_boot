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
    <title></title>
    <link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/sample.css'/>"/>
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
                    	robot.alert("로그인 되었습니다.","","","callBack.fn_retrieveLoginAlertCallBack")
                    } else{
                    	robot.alert("ID 또는 비밀번호를 확인하시기 바랍니다.")
                    }
                },
                error: function(){
                }
            })
        
        }

        fn_retrieveLoginAlertCallBack = function(){
        	robot.closePop();
        }
        

    </script>
</head>

<body style="text-align:center; margin:0 auto; display:inline; ">
    <form:form id="loginForm" name="loginForm" method="post">
        <div id="content_pop" style="position:absolute; left:50%; transform:translateX(-50%); top:30%">
        	<!-- 타이틀 -->
        	<div id="title">
        		<ul>
        			<li><img src="<c:url value='/images/egovframework/example/title_dot.gif'/>" alt=""/>로그인</li>
        		</ul>
        	</div>
        	<!-- // 타이틀 -->

        	<div id="table">
        		<table width="100%" border="1" cellpadding="0" cellspacing="0" style="bordercolor:#D3E2EC; bordercolordark:#FFFFFF; BORDER-TOP:#C2D0DB 2px solid; BORDER-LEFT:#ffffff 1px solid; BORDER-RIGHT:#ffffff 1px solid; BORDER-BOTTOM:#C2D0DB 1px solid; border-collapse: collapse;">
        			<colgroup>
        				<col width="100"/>
        				<col width="100"/>
        			</colgroup>
        			<tr>
        				<td class="tbtd_caption">ID</td>
        				<td class="tbtd_content"><input type="text" name ="id" id="id"></text></td>
        			</tr>
        			<tr>
        				<td class="tbtd_caption">비밀번호</td>
        				<td class="tbtd_content"><input type="text" name="pass" id="pass"></td>
        			</tr>

        		</table>
        	</div>
        	<!-- /List -->
        	<div id="sysbtn">
        	  <ul>
                  <li>
        	          <span class="btn_blue_l">
        	              <a href="javascript:fn_retrieveLogin();">로그인</a>
                          <img src="<c:url value='/images/egovframework/example/btn_bg_r.gif'/>" style="margin-left:6px;" alt=""/>
                      </span>
                  </li>
              </ul>
        	</div>
        </div>
    </form:form>
</body>
</html>
