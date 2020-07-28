<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>

<style>
.div_retrieve_result input{
	width:100px;
}

.div_retrieve_result textarea{
	width:230px;
}

.rowDeleteTd{
	border: 1px solid white !important;
}

.rowDelete:hover{
	cursor:pointer;
}

</style>

<script type="text/javaScript" language="javascript" defer="defer">

$(document).ready(function(){
	var pjParam = JSON.parse($("#param").val());
	
	var voMapInfo = pjParam.mapInfo;
	var vsSource = "";
	
	if(voMapInfo.length == 0){
		vsSource = "<tr>";
		vsSource += "\n <td><input class=\"wrkId\" type=\"text\"></input></td>";
		vsSource += "\n <td><textarea class=\"query\" rows=\"5\"></textarea></td>";
		vsSource += "\n <td><input class=\"fromMap\" type=\"text\"></input></td>";
		vsSource += "\n <td><input class=\"toMap\" type=\"text\"></input></td>";
		vsSource += "\n <td><select class=\"crudDvs\">";
		vsSource += "\n  <option value=\"r\" label=\"select\"></option>";
		vsSource += "\n  <option value=\"c\" label=\"insert\"></option>";
		vsSource += "\n  <option value=\"u\" label=\"update\"></option>";
		vsSource += "\n  <option value=\"d\" label=\"delete\"></option>";
		vsSource += "\n </select></td>";
		vsSource += "\n <td class=\"rowDeleteTd\">";
		vsSource += "\n  <img onclick=\"fn_queryRowDelete(this)\"";
		vsSource += "class=\"rowDelete\" width=\"20\" src=\"<c:url value='/images/object/img_subtraction.png'/>\"/>";
		vsSource += "\n </td>";
		vsSource += "\n</tr>";
		
		$("#queryList tbody").append(vsSource);
	} else {
		
		for(var i=0; i<voMapInfo.length; i++){
			vsSource += "<tr>";
			vsSource += "\n <td><input class=\"wrkId\" type=\"text\" value=\""+voMapInfo[i].WRK_ID+"\"></input></td>";
			vsSource += "\n <td><textarea class=\"query\" rows=\"5\" >"+voMapInfo[i].QUERY+"</textarea></td>";
			vsSource += "\n <td><input class=\"fromMap\" type=\"text\" value=\""+voMapInfo[i].FROM_MAP+"\"></input></td>";
			vsSource += "\n <td><input class=\"toMap\" type=\"text\" value=\""+voMapInfo[i].TO_MAP+"\"></input></td>";
			vsSource += "\n <td><select class=\"crudDvs\">";
			vsSource += "\n  <option value=\"r\" label=\"select\"></option>";
			vsSource += "\n  <option value=\"c\" label=\"insert\"></option>";
			vsSource += "\n  <option value=\"u\" label=\"update\"></option>";
			vsSource += "\n  <option value=\"d\" label=\"delete\"></option>";
			vsSource += "\n </select></td>";
			vsSource += "\n <td class=\"rowDeleteTd\">";
			vsSource += "\n  <img onclick=\"fn_queryRowDelete(this)\"";
			vsSource += "class=\"rowDelete\" width=\"20\" src=\"<c:url value='/images/object/img_subtraction.png'/>\"/>";
			vsSource += "\n </td>";
			vsSource += "\n</tr>";
		}
		
		
		$("#queryList tbody").append(vsSource);
		for(var i=0; i<voMapInfo.length; i++){
			$(".crudDvs").eq(i).val(voMapInfo[i].CRUD_DVS).prop("selected",true);
		}
		
	}
	
	
	
	
	
})
	

fn_btnSaveClick = function(){
	
	var voRow = $("#viewChangeHistryList > tbody > tr[focus=true]");
	if(voRow.length != 0){
		fn_wrkHistryDbClick(voRow.children().eq(0));
	}
	
}

fn_queryRowDelete = function(param){
	$(param).parent().parent().remove();
}

fn_queryRowAdd = function(){
	
	var vsSource = "<tr>";
	vsSource += "\n <td><input class=\"wrkId\" type=\"text\"></input></td>";
	vsSource += "\n <td><textarea class=\"query\" rows=\"5\"></textarea></td>";
	vsSource += "\n <td><input class=\"fromMap\" type=\"text\"></input></td>";
	vsSource += "\n <td><input class=\"toMap\" type=\"text\"></input></td>";
	vsSource += "\n <td><select class=\"crudDvs\">";
	vsSource += "\n  <option value=\"r\" label=\"select\"></option>";
	vsSource += "\n  <option value=\"c\" label=\"insert\"></option>";
	vsSource += "\n  <option value=\"u\" label=\"update\"></option>";
	vsSource += "\n  <option value=\"d\" label=\"delete\"></option>";
	vsSource += "\n </select></td>";
	vsSource += "\n <td class=\"rowDeleteTd\">";
	vsSource += "\n  <img onclick=\"fn_queryRowDelete(this)\"";
	vsSource += "class=\"rowDelete\" width=\"20\" src=\"<c:url value='/images/object/img_subtraction.png'/>\"/>";
	vsSource += "\n </td>";
	vsSource += "\n</tr>";
	
	$("#queryList tbody").append(vsSource);
}


/**************************************
 * event : 적용 클릭
 * desc : 쿼리 및 업무를 저장한다.
 **************************************/
fn_btnSaveClick = function(){

	var voDataList = [];
	 
	var voTrList = $("#queryList tbody tr");
	var vnCount = voTrList.length;
	
	for (var i=0; i<vnCount; i++){
		var voTrInfo = voTrList.eq(i);
		
		var vjData = {
				"WRK_ID" : voTrInfo.find(".wrkId").val(),
				"QUERY" : voTrInfo.find(".query").val(),
				"FROM_MAP" : voTrInfo.find(".fromMap").val(),
				"TO_MAP" : voTrInfo.find(".toMap").val(),
				"CRUD_DVS" : voTrInfo.find(".crudDvs").val()
		}
		
		voDataList.push(vjData);
	}
	var vsCallback = $("#callBack").val(); 
	robot.closePop(voDataList, vsCallback);
	
}


</script>
</head>

<body>

 <div class="div_retrieve_result">
 	<div class="div_grid LblockListTable LblockPageSubtitle">
 		<h2> data 목록 <img style="float:right;" onclick="fn_queryRowAdd()"
 						class="rowAdd" width="20" src="<c:url value='/images/object/img_add.png'/>"/></h2>
 		
 		<table id="queryList" style="table-layout: fixed;">
 			<colgroup>
 				<col width="150px"/>
 				<col width="250px"/>
 				<col width="150px"/>
 				<col width="150px"/>
 				<col width="150px"/>
 				<col width="50px"/>
 			</colgroup>
 			<thead>
 				<tr>
 					<th>업무ID</th>
 					<th>쿼리</th>
 					<th>FROM DATA</th>
 					<th>TO DATA</th>
 					<th>CRUD</th>
 				</tr>
 			</thead>
 			<tbody>
 			</tbody>
 		</table>
 	</div>

 	
 </div>
  <div class="div_btnArea">
  	<input id="" class="btn_retrieve" type="button" value="적용" onclick="fn_btnSaveClick()"></input>
  	<input id="" class="btn_retrieve" type="button" value="취소" onclick="robot.closePop()"></input>
  </div>
 

 
 
</body>
</html>
