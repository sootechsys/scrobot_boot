<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>

<style>



</style>



<script type="text/javaScript" language="javascript" defer="defer">


voViewList = {};
voViewHistryList = {};


/****************************************
 * event : 조회버튼 클릭
 * desc : 화면목록을 조회한다.
 **************************************/
fn_retrieveWrk = function(){
	var vsWrkNm = $("#ibx_retrieveWrktype").val();


	var vjRetrieveInfo = {
			"wrkNm" : vsWrkNm
	}
	
	$.ajax({
		url : "/retrieveWrk.do",
		type : "POST",
		data : vjRetrieveInfo,
		success : function(data) {
			
			$(".div_retrieve_result").css("display","block")
			$(".div_btnArea").css("display","block")
			
			voViewList = {};
			voViewHistryList = {};
			voViewList = data.resultMap.wrkList;
			voViewHistryList = data.resultMap.wrkHistryList;
			var buffer = "";	
			for(var i=0; i<voViewList.length; i++){
				buffer += "<tr style=\"cursor:pointer;\" onclick =\"fn_wrkListOnclick(this)\" focus=\"false\" >"
				buffer += "<td>"+voViewList[i].WRK_NM+"</td>"
				buffer += "</tr>"
			}
			
			
			
			
			$("#viewList > tbody > tr").remove();
			
			$("#viewList > tbody").append(buffer);
			
			$("#viewChangeHistryList > tbody > tr").remove();
			
			

		},
		error : function() {
		}
	})
}


/**************************************
 * event : 화면목록 클릭
 * desc : 화면변경이력 목록을 조회한다.
 **************************************/
fn_wrkListOnclick = function(param){
	var focusCheck = $("#viewList > tbody > tr[focus=true]").length; //포커스갯수
	$("#viewList > tbody > tr[focus=true]").attr("focus",false);
	$(param).attr("focus",true);
		
		
	var buffer2 ="";
	for(var i=0; i<voViewHistryList.length; i++){
		if(param.textContent != voViewHistryList[i].WRK_NM){
			continue;
		}
		buffer2 +="<tr style=\"cursor:pointer;\" onclick =\"fn_wrkHistryStyle(this)\" focus=\"false\" >"
		buffer2 +="<td ondblclick=\"fn_wrkHistryDbClick(this)\">"+voViewHistryList[i].WRK_NM+"</td>"
		buffer2 +="<td ondblclick=\"fn_wrkHistryDbClick(this)\">"+voViewHistryList[i].CHNG_HISTRY_DTTM+"</td>"
			
		buffer2 += "</tr>"
	}
		
	$("#viewChangeHistryList > tbody > tr").remove();
		
	$("#viewChangeHistryList > tbody").append(buffer2);
}

/**************************************
 * event : 이력목록 클릭
 * desc : 포커스 셋팅
 **************************************/
fn_wrkHistryStyle = function(param){
	
	$("#viewChangeHistryList > tbody > tr[focus=true]").attr("focus",false);
	$(param).attr("focus",true);

}



/**************************************
 * event : 화면변경이력목록 더블클릭
 * desc : 선택한 화면변경이력을 적용한다.
 **************************************/
fn_wrkHistryDbClick = function(param){
	 
	 var vjData = {
			 "index" : $(param).parent().index(),
			 "textContent" : $(param).parent().children().eq(0).text()
	 }
	 
	robot.confirm("해당 파일을 적용하시겠습니까?","","",vjData,"fn_wrkHistryDbClickCallBack");
	
}


fn_wrkHistryDbClickCallBack = function(param){debugger;
	
	if(param != ""){
		var vnCount = -1;
		var vnFocusRow = 0;
		for(var i=0; i<voViewHistryList.length; i++){
			if(voViewHistryList[i].WRK_NM == param.textContent){
				vnCount++;
			}
		
			if(vnCount == param.index){
				vnFocusRow = i;
				break;
			}
		}

		var vsSource = voViewHistryList[vnFocusRow].SOURCE;
		$("#creationTable").empty();

		$("#creationTable").append(vsSource);
		
		fn_saveClone();
		
		var param = voViewHistryList[vnFocusRow].WRK_NM;
		var vsCallback = $("#callBack").val();
		robot.closePop(param, vsCallback);
	}

}

fn_btnSaveClick = function(){
	
	var voRow = $("#viewChangeHistryList > tbody > tr[focus=true]");
	if(voRow.length != 0){
		fn_wrkHistryDbClick(voRow.children().eq(0));
	}
	
}


</script>
</head>

<body>
 <div class="div_retrieve_terms">
 	<span> 업무명</span>
 	<input type="text" id="ibx_retrieveWrktype"></input>
 	<input id="" class="btn_retrieve" type="button" value="조회" onclick="fn_retrieveWrk()"></input>
 </div>
 <div class="div_retrieve_result" style="display:none">
 	<div class="div_grid LblockListTable LblockPageSubtitle">
 		<h2> 화면목록</h2>
 		<table id="viewList">
 			<colgroup>
 				<col width="100"/>
 			</colgroup>
 			<thead>
 				<tr>
 					<th>업무명</th>
 				</tr>
 			</thead>
 			<tbody>
 			</tbody>
 		</table>
 	</div>
 	
 	<div class="div_detailGrid LblockListTable LblockPageSubtitle">
 		<h2> 화면변경 이력목록</h2>
 		<table id="viewChangeHistryList">
 			<colgroup>
 				<col width="100"/>
 			</colgroup>
 			<thead>
 				<tr>
 					<th>업무명</th>
 					<th>저장일시</th>
 				</tr>
 			</thead>
 			<tbody>
 			</tbody>
 		</table>
 	</div>
 	
 </div>
  <div class="div_btnArea" style="display:none">
  	<input id="" class="btn_retrieve" type="button" value="적용" onclick="fn_btnSaveClick()"></input>
  	<input id="" class="btn_retrieve" type="button" value="취소" onclick="robot.closePop()"></input>
  </div>
 

 
 
</body>
</html>
