<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="ko" xml:lang="ko">
<head>

<style>



</style>

<!-- <script src="https://code.jquery.com/jquery-2.2.1.js"></script> -->
<script type="text/javascript" src="./js/scrobot.js" ></script> 
<script type="text/javaScript" language="javascript" defer="defer">

fn_makeCheckBox = function(){
	callBack.boxCreationCallBack("checkbox");
}

fn_updateBox = function(){
	debugger;
	var node = $("#node").val();
	
	$("#"+node).remove();
	
	callBack.boxUpdateCallBack("checkbox");
} 

$(document).ready(function(){
	
	var callBack = $("#callBack").val();
	
	if(callBack == "callBack.boxCreationCallBack"){
		$("#btn_promptUpdate").hide();
		$("#btn_promptSave").show();
	}
	else if(callBack == "callBack.boxUpdateCallBack"){
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
				vsSource += "<td style=\"width:200px; height:30px; border:1px solid black\"><input type=\"button\" class=\"del\" onclick=\"boxEdit.fn_delLine(this);\"  value=\"삭제\"></input></td> ";
				vsSource += "</tr> ";
			}
			$("#propertyTablePop > tbody ").append(vsSource);
		}
	}
});

</script>
</head>

<body>
<h3 style="text-align:left;">체크박스를 작성하세요</h3>

<table id="propertyTablePop">
	<thead>
	<tr style="width:200px; height:30px; border:1px solid black;">
		<td style="width:200px; height:30px; border:1px solid black;" colSpan="3">
			<input class="prompt_input" type="radio" name="check" choice="width" value="width" style="float:left;" checked></input>
			<span style="float:left;">가로배열</span>
			<input class="prompt_input" type="radio" name="check" choice="height" value="height" style="float:left;"></input>
			<span style="float:left;">세로배열</span>
			<input type="button" class="add" onclick="boxEdit.fn_addLine();" value="추가" style="float:right;"></input>
		</td>
	</tr>
	<tr>
		<td style="width:200px; height:30px; border:1px solid black;" >value</td>
		<td style="width:200px; height:30px; border:1px solid black;" >label</td>
		<td style="width:200px; height:30px; border:1px solid black;" >+/-</td>
	</tr>
	</thead>
	<tbody>
	<tr style="width:200px; height:30px; border:1px solid black">
		<td style="width:200px; height:30px; border:1px solid black;"><input type="text" name="value"></input></td>
		<td style="width:200px; height:30px; border:1px solid black;"><input type="text" name="label"></input></td> 
		<td style="width:200px; height:30px; border:1px solid black;"><input type="button" onclick="boxEdit.fn_delLine(this);" value="삭제"></input></td>
	</tr>	
	</tbody>
</table>

<input type="button" class="btn_retrieve" id="btn_promptSave" value="생성" onclick="fn_makeCheckBox();"></input>
<input type="button" class="btn_retrieve" id="btn_promptUpdate" value="수정" onclick="fn_updateBox();"></input>
<input type="button" class="btn_retrieve" value="취소" onclick="robot.closePop('',callBack.boxCreationCallBack);"></input>

</body>
</html>















