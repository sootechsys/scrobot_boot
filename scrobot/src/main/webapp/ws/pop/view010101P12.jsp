<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>

<style>



</style>

<!-- <script src="https://code.jquery.com/jquery-2.2.1.js"></script> -->
<script type="text/javascript" src="./js/scrobot.js" ></script> 
<script type="text/javaScript" language="javascript" defer="defer">

fn_makeSelectBox = function(){
	selectboxCreationCallBack("select");
}

fn_updateSelectBox = function(){
	var node = $("#node").val();
	
	$("#"+node).remove();
	selectUpdateCallBack("select");
} 


$(document).ready(function(){
	
	var callBack = $("#callBack").val();
	
	if(callBack == "selectboxCreationCallBack"){
		$("#btn_promptUpdate").hide();
		$("#btn_promptSave").show();
	}
	else if(callBack == "selectUpdateCallBack"){
		$("#btn_promptUpdate").show();
		$("#btn_promptSave").hide();
		
		var vsData = $("#param").val();
		
		if(typeof vsData != "undefined" && vsData != null && vsData != ""){
			var voData = JSON.parse(vsData);
			
			$("#propertyTablePop > tbody > tr").remove();
			
			var vsSource = "";
			
			for(var i=0; i<voData.length; i++){
				vsSource += "<tr style=\"width:200px; height:30px; border:1px solid black\"> ";
				vsSource += "<td style=\"width:200px; height:30px; border:1px solid black\"><input type=\"text\" name=\"value\" value="+voData[i].value+"></input></td> ";
				vsSource += "<td style=\"width:200px; height:30px; border:1px solid black\"><input type=\"text\" name=\"label\" value="+voData[i].label+"></input></td> ";
				vsSource += "<td style=\"width:200px; height:30px; border:1px solid black\"><input type=\"button\" class=\"del\" onclick=\"fn_delLine(this);\"  value=\"삭제\"></input></td> ";
				vsSource += "</tr> ";
			}
		
			$("#propertyTablePop > tbody ").append(vsSource);
		}
	}
});

</script>
</head>

<body>
<h3 style="text-align:left;">셀렉트 박스를 작성하세요</h3>

<table id="propertyTablePop">
	<thead>
	<tr style="width:200px; height:30px; border:1px solid black;">
		<td style="width:200px; height:30px; border:1px solid black;" colSpan="3">
			<input type="button" class="add" onclick="fn_addLine();" value="추가" style="float:right;"></input>
		</td>
	</tr>
	<tr>
		<td style="width:200px; height:30px; border:1px solid black;" >option value</td>
		<td style="width:200px; height:30px; border:1px solid black;" >label</td>
		<td style="width:200px; height:30px; border:1px solid black;" >+/-</td>
	</tr>
	</thead>
	<tbody>
	<tr style="width:200px; height:30px; border:1px solid black">
		<td style="width:200px; height:30px; border:1px solid black;"><input type="text" name="value"></input></td>
		<td style="width:200px; height:30px; border:1px solid black;"><input type="text" name="label"></input></td> 
		<td style="width:200px; height:30px; border:1px solid black;"><input type="button" onclick="fn_delLine(this);" value="삭제"></input></td>
	</tr>	
	</tbody>
</table>

<input type="button" class="btn_retrieve" id="btn_promptSave" value="생성" onclick="fn_makeSelectBox();"></input>
<input type="button" class="btn_retrieve" id="btn_promptUpdate" value="수정" onclick="fn_updateSelectBox()"></input>
<input type="button" class="btn_retrieve" value="취소" onclick="robot.closePop('',robot.selectCreationCallBack);"></input>

 
</body>
</html>















