boxEdit = {};



boxEdit.fn_addLine = function(){
	var vsSource = "";
	vsSource += "<tr style=\"width:200px; height:30px; border:1px solid black\"> ";
	vsSource += "<td style=\"width:200px; height:30px; border:1px solid black\"><input type=\"text\" name=\"value\"></input></td> ";
	vsSource += "<td style=\"width:200px; height:30px; border:1px solid black\"><input type=\"text\" name=\"label\"></input></td> ";
	vsSource += "<td style=\"width:200px; height:30px; border:1px solid black\"><input type=\"button\" class=\"del\" onclick=\"boxEdit.fn_delLine(this);\"  value=\"삭제\"></input></td> ";
	vsSource += "</tr> ";
	$("#propertyTablePop > tbody > tr:last").after(vsSource);
}


boxEdit.fn_delLine = function(param){
	debugger;
	if(param.parentElement.parentElement.parentElement.childElementCount <= 1){
		alert("1개 이상 생성해야합니다.");
	}
	else{
		param.parentElement.parentElement.remove();
	}
	
}
