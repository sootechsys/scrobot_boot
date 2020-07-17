tableEdit = {};

/* 	
 * trReset : tr row reset
 * 	
 * @parameter
 * 	- vsTableId : 테이블 id
 * */
tableEdit.trReset = function(vsTableId){
	var resetTrNum = $("#"+vsTableId+"> tbody > tr").length;
	for(var i=1; i<=resetTrNum; i++){
		$("#"+vsTableId+"> tbody > tr:nth-child("+i+")").attr("row",i-1);
		}
}

/* 	
 * tdReset : td shell reset
 * 	
 * @parameter
 * 	- vsTableId : 테이블 id
 *  - vnCurrentTrNum : tr row
 * */
tableEdit.tdReset = function(vsTableId, vnCurrentTrNum){
	var resetTdNum = $("#"+vsTableId+"> tbody > tr > td").length;
	for(var i=0; i<vnCurrentTrNum; i++){
		for(var j=1; j<=resetTdNum; j++){
			$("#"+vsTableId+"> tbody > tr[row="+i+"] > td:nth-child("+j+")").attr("shell",j-1);
		}
	}
}


/*
 * startInfo : focus table 정보를 가져온다
 * 
 * @parameter
 * 	- param : tableId
 * 
 * @return
 * 	- voTableArray(Array) : voTableArray = [tableId, vnCurrentTrNum, vnCurrentTdNum, vnFocusTrRow, vnFocusTdShell]
 * */
tableEdit.startInfo = function(param){
	
	if(typeof param =="undefined" || param == null){
		var voTableArray = [];
		
		var vsTableId = $("td[tableFocus=true]").parent().parent().parent().attr("id"); //현재 table
		var vnCurrentTrNum = $("#"+vsTableId+" > tbody > tr").length; // table tr길이
		var vnCurrentTdNum = $("#"+vsTableId+" > tbody > tr > td").length; 
		vnCurrentTdNum = vnCurrentTdNum / vnCurrentTrNum; // table td길이
		var vnFocusTrRow = parseInt($("td[tableFocus=true]").parent().attr("row")); //focus row
		var vnFocusTdShell = parseInt($("td[tableFocus=true]").attr("shell")); //focs td shell
		
		
		
		voTableArray[0] = vsTableId;
		voTableArray[1] = vnCurrentTrNum;
		voTableArray[2] = vnCurrentTdNum;
		voTableArray[3] = vnFocusTrRow;
		voTableArray[4] = vnFocusTdShell;
		
		return voTableArray;
	}
	else{
		
		var voTableArray = [];
		
		var vsTableId = param; //현재 table
		var vnCurrentTrNum = $("#"+vsTableId+" > tbody > tr").length; // table tr길이
		var vnCurrentTdNum = $("#"+vsTableId+" > tbody > tr > td").length; 
		vnCurrentTdNum = vnCurrentTdNum / vnCurrentTrNum; // table td길이
		//var vnFocusTrRow = parseInt($("td[tableFocus=true]").parent().attr("row")); //focus row
		//var vnFocusTdShell = parseInt($("td[tableFocus=true]").attr("shell")); //focs td shell
		
		
		
		voTableArray[0] = vsTableId;
		voTableArray[1] = vnCurrentTrNum;
		voTableArray[2] = vnCurrentTdNum;
		//voTableArray[3] = vnFocusTrRow;
		//voTableArray[4] = vnFocusTdShell;
		
		return voTableArray;
	}
}


/*
 * ColBuffer : table tr 추가 Buffer
 * 
 * @parameter
 * 	- voTableArray(Array) = [tableId, vnCurrentTrNum, vnCurrentTdNum, vnFocusTrRow, vnFocusTdShell]
 * 
 * @Return
 * 	- vsBuffer : String 
 * */
tableEdit.ColBuffer = function(voTableArray){
	
	var vsBuffer = "<tr name=\"tr\" row=\"\" compoDvs=\"tr\" height=\"40\">";
	
	for(var i=0; i<voTableArray[2]; i++){
		vsBuffer += "\n  <td class=\"td\" "
		vsBuffer += "shell = \""+i+"\" tableFocus=false ";
		vsBuffer += "style=\"height:30px; cursor:pointer\" "
		vsBuffer += "compoDvs=\"td\" "
			
		vsBuffer += "onmousedown=\"fn_tdMouseDown(this)\" ";
		vsBuffer += "onmouseover=\"fn_tdMouseOver(this)\" ";
		vsBuffer += "onmouseup=\"fn_tdMouseUp(this)\" ";
		
		vsBuffer += "ondblclick=\"fn_tdDbClick(this)\"> "
		vsBuffer += "</td>"
	}
	vsBuffer += "\n </tr>";
	
	return vsBuffer;
}


/*
 * RowBuffer : table td 추가 Buffer / 반복문 활용하여 사용해야함.
 * 
 * @parameter
 * 	- voTableArray(Array) = [tableId, vnCurrentTrNum, vnCurrentTdNum, vnFocusTrRow, vnFocusTdShell]
 * 
 * @Return
 * 	- vsBuffer : String 
 * */
tableEdit.RowBuffer = function(voTableArray){ //반복문 사용해서 추가해야한다.
	
	var vsBuffer = "";
		vsBuffer += "<td class=\"td\" ";
		vsBuffer += "shell=\"\" tableFocus=false ";
		vsBuffer += "style=\"height:30px; cursor:pointer\" ";
		vsBuffer += "compoDvs=\"td\" ";
		
		vsBuffer += "width=\"100\" ";
		vsBuffer += "onmousedown=\"fn_tdMouseDown(this)\" ";
		vsBuffer += "onmouseover=\"fn_tdMouseOver(this)\" ";
		vsBuffer += "onmouseup=\"fn_tdMouseUp(this)\" ";
		
		vsBuffer += "ondblclick=\"fn_tdDbClick(this)\"> ";
		vsBuffer += "</td>";
		
		return vsBuffer;
}


/*
 * SpanInfo : Table Span 값을 배열로 반환한다
 * 
 * @parameter
 * 	- voTableArray
 * 
 * @return
 * 	- voTotal : Array
 * */
tableEdit.SpanInfo = function(voTableArray){
	//rowSpan check
	var voRow = new Array();
	for(var i=0; i<voTableArray[1]; i++){
		voRow[i] = new Array();
	}
	//colSpan check
	var voCol = new Array();
	for(var i=0; i<voTableArray[1]; i++){
		voCol[i] = new Array();
	}
	
	// rowSpan check Process
	for(var i=0; i<voTableArray[1]; i++){//tr갯수만큼 반복
		//var vnTdLength = $("#"+voTableArray[0]+" > tbody > tr[row="+i+"] > td").length;
		for(var j=0; j<voTableArray[2]; j++){//td갯수만큼 반복
			var rowSpan = $("#"+voTableArray[0]+" > tbody >  tr[row="+i+"]  > td[shell="+j+"]").attr("rowspan");
				if(typeof rowSpan != "undefined" || rowSpan != null){
					voRow[i][j] = rowSpan;
				}
				else{
					voRow[i][j] = 1;
				}
	}}
	
	//colSpan check Process
	for(var i=0; i<voTableArray[1]; i++){
		var vnTdLength = $("#"+voTableArray[0]+" > tbody > tr[row="+i+"] > td").length;
		for(var j=0; j<voTableArray[2]; j++){
			var colSpan = $("#"+voTableArray[0]+" > tbody >  tr[row="+i+"]  > td[shell="+j+"]").attr("colspan");
				if(typeof colSpan != "undefined" || colSpan != null){
					voCol[i][j] = colSpan;
				}
				else{
					voCol[i][j] = 1;
				}
	}}
	
	// sum
	var voTotal = new Array();
	for(var i=0; i<voTableArray[1]; i++){
		voTotal[i] = new Array();
	}
	
	
	for(var i=0; i<voTableArray[1]; i++){	
		for(var j=0; j<voTableArray[2]; j++){
			var rowSpan = voRow[i][j];
			var colSpan = voCol[i][j];
			// 분기처리 - 1. xx 2. xy 3. yx 4. yy
			// 1. xx 둘다 없다
			if(rowSpan == "1" && colSpan == "1"){
				if(voTotal[i][j]=="c0" || voTotal[i][j]=="r0"){ // row&col에 먹힌거면
					continue;
				}else{
					voTotal[i][j] = "1";
				}
			}
			// 2. row는 있고 col은 없다
			else if(rowSpan != "1" && colSpan == "1"){
				var vnRowSpan = parseInt(rowSpan);
				for (var a=1; a<vnRowSpan; a++){
					if(i+a > voTableArray[1]){
						break;
					}
					voTotal[i+a][j] = "r0";
					voTotal[i][j] = "r"+rowSpan;
				}
			}
			// 3. row는 없고 col은 있다
			else if(rowSpan == "1" && colSpan != "1"){
				var vnColSpan = parseInt(colSpan);
				for (var a=1; a<vnColSpan; a++){
					if(j+a > voTableArray[2]){
						break;
					}
					voTotal[i][j+a] = "c0";
					voTotal[i][j] = "c"+colSpan;
				}
			}
			// 4. yy 둘다 있다 i=tr j=td
			else if(rowSpan != "1" && colSpan != "1"){
				var vnRowSpan = parseInt(rowSpan);
				var vnColSpan = parseInt(colSpan);
				for (var a=i; a<vnRowSpan+i; a++){
					for(var b=j; b<vnColSpan+j; b++){
						if(a == i && b == j){
							voTotal[a][b]= "r"+rowSpan+":"+"c"+colSpan;
						}else if(a == i){
							voTotal[a][b]="c0";
						}else if(a!=i){
							voTotal[a][b]="r0";
						}
					}
				}
			}
		}
	}
	
	return voTotal;
}


/*
 *	Vector : 배열로 colSpan / rowSpan / hide / show 배치 
 *
 *	@parameter 
 *  - vsTableId : 테이블 id
 *  - voTotal : 해당 테이블 배열
 */
tableEdit.Vector = function(vsTableId, voTotal){
	
	var voTableArray = tableEdit.startInfo(vsTableId);
	
	for(var i=0; i<voTableArray[1]; i++){
		for(var j=0; j<voTableArray[2]; j++){
			
			var InputSpan = voTotal[i][j];
			
			if(InputSpan == "c0" || InputSpan == "r0" ){ //포함되는 셀 hide();
				$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").hide(); // h
				$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").removeAttr("colspan");
				$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").removeAttr("rowspan");
			} 
			else if(InputSpan == "1"){
				$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").show();
				$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").removeAttr("colspan");
				$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").removeAttr("rowspan");
			}
			else if(InputSpan.indexOf(":") != -1){ // row:col // row나 col이 0일 수 있음 분기처리.
				var vaCheck = InputSpan.split(":");
				var vsRNum = vaCheck[0];
				var vsCNum = vaCheck[1];
				var viRNum = vsRNum.replace("r",""); //r 값
				var viCNum = vsCNum.replace("c",""); //c 값
				
				if(viRNum == "0" && viCNum != "0"){
					$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").attr("colspan",viCNum);
					$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").removeAttr("rowspan");
				}
				else if(viCNum == "0" && viRNum != "0"){
					$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").attr("rowspan",viRNum);
					$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").removeAttr("colspan");
				}
				else if(viCNum != "0" && viRNum != "0"){
					$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").attr("colspan",viCNum);
					$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").attr("rowspan",viRNum);
				}
			}
			else if(InputSpan.indexOf("c") != -1){ // col
				var viStup2 = parseInt(InputSpan.replace("c",""));
				$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").attr("colspan",viStup2);
				$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").removeAttr("rowspan");
			}
			else if(InputSpan.indexOf("r") != -1){ // row
				var viStup1 = parseInt(InputSpan.replace("r",""));
				$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").attr("rowspan",viStup1);
				$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").removeAttr("colspan");
			}
			else if(InputSpan.indexOf("d") != -1){
				$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").hide(); // h
				$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").removeAttr("colspan");
				$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").removeAttr("rowspan");
			}
		}
	}
	
}


/* == * * * * *  * * * * *  * * * * *  * * * * * 테이블 관련 기능  * * * * *  * * * * *  * * * * *  * * * * * ==*/



/*
 * addUp : 선택된 셀 상단에 행을 추가한다
 * 
 * */
tableEdit.addUp = function(){
	
	
	
	
	var voTableArray = tableEdit.startInfo();
	
	var vsBuffer = tableEdit.ColBuffer(voTableArray);
	
	if(voTableArray[3] == 0){ //focus top
		$("#"+voTableArray[0]+"> tbody > tr:first").before(vsBuffer);
		
		tableEdit.trReset(voTableArray[0]);
	}
	else{

		//원래 가지고 있는 테이블 양상
		var voTotal = new Array();
		for(var i=0; i<voTableArray[1]; i++){
			voTotal[i] = new Array();
		}
			
		voTotal = tableEdit.SpanInfo(voTableArray);
		
		console.log(voTotal);
		
		var adderArray = [];
		
	
	for(var i=0; i<voTableArray[2]; i++){ // i for start
		
		var cell = voTotal[voTableArray[3]-1][i]; // focus 이전 tr
		
		if(cell.indexOf(":") != -1){
			var check = cell.split(":");
			var vsRNum = check[0];
			var vsCNum = check[1];
				vsRNum = vsRNum.replace("r","");
				vsCNum = vsRNum.replace("c","");
			var	vnCNum = parseInt(vsCNum);
			var vnRNum = parseInt(vsRNum);
				vnRNum += 1;
				voTotal[voTableArray[3]-1][i] = "r"+vnRNum+":"+check[1];
				for(var k=i; k<i+vnCNum; k++){
					adderArray[k] = "r0";
				}
				i = i+vnCNum - 1 ;
		}
		else if(cell.indexOf("r0") != -1){
			for(var j=0; j<voTableArray[1]; j++){
				var vsRowChecker = voTotal[j][i];
				
				if(vsRowChecker.indexOf(":") != -1){ // 해당 열에 : 있을떄
					var check = vsRowChecker.split(":");
					var vsRNum = check[0];
					var vsCNum = check[1];
					vsRNum = vsRNum.replace("r","");
					vsCNum = vsRNum.replace("c","");
					var vnRNum = parseInt(vsRNum);
					var vnCNum = parseInt(vsCNum);
					if(vnRNum+j-1 >=voTableArray[3]){
						vnRNum += 1;
						voTotal[j][i] = "r"+vnRNum+":"+check[1];
						for(var k=i; k<i+vnCNum; k++){
							adderArray[k] = "r0";
						}
						break;
					}
				}else if(vsRowChecker.indexOf("r") != -1){
					if(vsRowChecker.indexOf("r0") != -1){
						continue; 
					}
					else{
						var vsRNum = vsRowChecker.replace("r","");
						var vnRNum = parseInt(vsRNum);
						if(vnRNum+j-1 >= voTableArray[3]){
							if(j == voTableArray[3]){
								adderArray[k] = "r0";
							}
							else{
								vnRNum += 1;
								voTotal[j][i] = "r"+vnRNum;
								adderArray[i] = "r0";
							}
							break;
						}
					} 
				}
			}
		}
		else if(cell.indexOf("r") != -1){
			var vsRNum = cell.replace("r","");
			var vnRNum = parseInt(vsRNum);
			if(vnRNum == 0){
				continue;
			}
			else if(vnRNum > 0){
				vnRNum += 1;
				voTotal[voTableArray[3]-1][i] = "r"+vnRNum;
				adderArray[i] = "r0";
			}
		}
		else if(cell.indexOf("c0") != -1){
			
		}
		else if(cell.indexOf("1") != -1){
			adderArray[i] = "1";
		}
		
	}// i for end
	
	
	
	voTotal.splice(voTableArray[3],0,adderArray);
	
	//테이블 리셋
	$("#"+voTableArray[0]+"> tbody > tr[row="+voTableArray[3]+"]").before(vsBuffer);
	
	tableEdit.trReset(voTableArray[0]);
	
	var voTableArray2 = tableEdit.startInfo();
	
	tableEdit.Vector(voTableArray2[0],voTotal);
	
}
fn_saveClone();
}


/*
 * addDown : 선택된 셀하단에 행을 추가한다.
 * */
tableEdit.addDown = function(){
	
	
	
	var voTableArray = tableEdit.startInfo();
	
	var vsBuffer = tableEdit.ColBuffer(voTableArray);
	
	if(voTableArray[3] == voTableArray[1]-1){ // bottom if start
		// 최 하단 찍은것,
		$("#"+voTableArray[0]+"> tbody > tr:last").after(vsBuffer);	
		tableEdit.trReset(voTableArray[0]);
	}
	else{
		
		var voTotal = new Array();
		for(var i=0; i<voTableArray[1]; i++){
			voTotal[i] = new Array();
		}
			
		voTotal = tableEdit.SpanInfo(voTableArray);
		
		console.log(voTotal);
		
		var adderArray = [];
		
		for(var i=0; i<voTableArray[2]; i++){
			
			var cell = voTotal[voTableArray[3]][i];
			
			if(cell.indexOf(":") != -1){
				var check = cell.split(":");
				var vsRNum = check[0];
				var vsCNum = check[1];
					vsRNum = vsRNum.replace("r","");
					vsCNum = vsRNum.replace("c","");
				var	vnCNum = parseInt(vsCNum);
				var vnRNum = parseInt(vsRNum);
					vnRNum += 1;
					voTotal[voTableArray[3]][i] = "r"+vnRNum+":"+check[1];
					for(var k=i; k<i+vnCNum; k++){
						adderArray[k] = "r0";
					}
					i = i+vnCNum - 1 ;
			}
			else if(cell.indexOf("r0") != -1){
				for(var j=0; j<voTableArray[1]; j++){
					var vsRowChecker = voTotal[j][i];
					
					if(vsRowChecker.indexOf(":") != -1){
						var check = vsRowChecker.split(":");
						var vsRNum = check[0];
						var vsCNum = check[1];
						vsRNum = vsRNum.replace("r","");
						vsCNum = vsRNum.replace("c","");
						var vnRNum = parseInt(vsRNum);
						var vnCNum = parseInt(vsCNum);
						if(vnRNum+j-1 >=voTableArray[3]){
							vnRNum += 1;
							voTotal[j][i] = "r"+vnRNum+":"+check[1];
							for(var k=i; k<i+vnCNum; k++){
								adderArray[k] = "r0";
							}
							break;
						}
					}
					else if(vsRowChecker.indexOf("r") != -1){
						if(vsRowChecker.indexOf("r0") != -1){
							continue;
						}
						else{
							var vsRNum = vsRowChecker.replace("r","");
							var vnRNum = parseInt(vsRNum);
							if(vnRNum+j-1 >= voTableArray[3]){
								vnRNum += 1;
								voTotal[j][i] = "r"+vnRNum;
								adderArray[i] = "r0"; 
							}
							else if(vnRNum+j-1 < voTableArray[3]){
								continue;
							}
						}
					}
					
				}
			}
			else if(cell.indexOf("r") != -1){
				var vsRNum = cell.replace("r","");
				var vnRNum = parseInt(vsRNum);
				if(vnRNum == 0){
					continue;
				}
				else if(vnRNum > 0){
					vnRNum += 1;
					voTotal[voTableArray[3]][i] = "r"+vnRNum;
					adderArray[i] = "r0";
				}
			}
			else if(cell.indexOf("c0") != -1){
				continue;
			}
			else if(cell.indexOf("1") != -1){
				adderArray[i] = "1";
			}
		}
	
	voTotal.splice(voTableArray[3]+1,0,adderArray);
	
	console.log(voTotal);
	
	//테이블 리셋
	$("#"+voTableArray[0]+"> tbody > tr[row="+voTableArray[3]+"]").after(vsBuffer);
	
	
	tableEdit.trReset(voTableArray[0]);
	
	var voTableArray2 = tableEdit.startInfo(voTableArray[0]);
	
	tableEdit.Vector(voTableArray2[0],voTotal);

	}
		fn_saveClone();
}



/*
 * addLeft = 포커스된 행의 좌측으로 열을 추가한다.
 * */
tableEdit.addLeft = function(){
	
	
	
	var voTableArray = tableEdit.startInfo();
	
	var vsBuffer = tableEdit.RowBuffer(voTableArray);
	
	var voTotal = new Array();
	for(var i=0; i<voTableArray[1]; i++){
		voTotal[i] = new Array();
	}
		
	voTotal = tableEdit.SpanInfo(voTableArray);
	
	console.log(voTotal);
	
	var adderArray = [];
	
	if(voTableArray[4] == 0){
		for(var i=0; i<voTableArray[1]; i++){
			$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td:first").before(vsBuffer);
		}
		tableEdit.trReset(voTableArray[0]);
	}
	else if(voTableArray[4] != 0){
		for(var i=0; i<voTableArray[1]; i++){
			var cell = voTotal[i][voTableArray[4]-1];
		
		if(cell.indexOf(":") != -1){
			var check = cell.split(":");
			var vsRNum = check[0];
			var vsCNum = check[1];
				vsRNum = vsRNum.replace("r","");
				vsCNum = vsRNum.replace("c","");
			var	vnCNum = parseInt(vsCNum);
			var vnRNum = parseInt(vsRNum);
				vnCNum += 1;
				voTotal[i][voTableArray[4]-1] = vsRNum + ":" + "c" + vnCNum;
				for(var k=i; k<i+vnRNum; k++){
					if(k == i){
						adderArray[k] = "c0";
					}
					else{
						adderArray[k] = "r0";
					}
					
				}
				i = i+vnRNum -1;
		}
		else if(cell.indexOf("r0") != -1){
			continue;
		}
		else if(cell.indexOf("r") != -1){
			adderArray[k]= "1";
		}
		else if(cell.indexOf("c0") != -1){
			for(var j=0; j<voTableArray[2]; j++){
				var vsColChecker = voTotal[i][j];
				if(vsColChecker.indexOf(":") != -1){
					var check = vsColChecker.split(":");
					var vsRNum = check[0];
					var vsCNum = check[1];
					vsRNum = vsRNum.replace("r","");
					vsCNum = vsRNum.replace("c","");
					var vnRNum = parseInt(vsRNum);
					var vnCNum = parseInt(vsCNum);
					
					if(vnCNum+j-1 >= voTableArray[4]){
						vnCNum += 1;
						voTotal[i][j] = vsRNum+":"+"c"+vnCNum;
						for(var k=i; k<i+vnRNum; k++){
							if(k == i){
								adderArray[k] = "c0";
							}
							else{
								adderArray[k] = "r0";
							}
						}
						break;
					}
					else if(vnCNum +j -1 < voTableArray[4]){
						if(j+1 == voTableArray[4]){
							adderArray[i]="1";
						}
					}
					
				}
				else if(vsColChecker.indexOf("c") != -1){
					if(vsColChecker.indexOf("c0") != -1){
						continue;
					}
				}
			}
			
		}
		else if(cell.indexOf("c") != -1){
			var vsCNum = cell.replace("c","");
			var vnCNum = parseInt(vsCNum);
			if(vnCNum == 0){
				continue;
			}
			else if(vnCNum > 0){
				vnCNum += 1;
				voTotal[i][voTableArray[4]-1] = "c"+vnCNum;
				adderArray[i] = "c0";
			}
		}
		else if(cell.indexOf("1") != -1){
			adderArray[i] = "1";
		}
		
		}
	
	
	for(var i=0; i<voTableArray[1]; i++){
		$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+voTableArray[4]+"]").before(vsBuffer);
		voTotal[i].splice(voTableArray[4],0,adderArray[i]);
	}
	
	
	tableEdit.tdReset(voTableArray[0],voTableArray[1]);
	
	var voTableArray2 = tableEdit.startInfo(voTableArray[0]);
	
	tableEdit.Vector(voTableArray2[0],voTotal);
	
	}
	
	tableEdit.tdReset(voTableArrayEnd[0],voTableArrayEnd[1]);
	fn_saveClone();
}






/*
 * addRight = 포커스된 행의 우측으로 열을 추가한다.
 * */
tableEdit.addRight = function(){
	
	
	
	var voTableArray = tableEdit.startInfo();
	
	var vsBuffer = tableEdit.RowBuffer(voTableArray);
	
	var voTotal = new Array();
	for(var i=0; i<voTableArray[1]; i++){
		voTotal[i] = new Array();
	}
		
	voTotal = tableEdit.SpanInfo(voTableArray);
	
	console.log(voTotal);
	
	var adderArray = [];
	
	if(voTableArray[4] == voTableArray[2]-1){
		for(var i=0; i<voTableArray[1]; i++){
			$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td:last").after(vsBuffer);
		}
		tableEdit.trReset(voTableArray[0]);
	}
	else if(voTableArray[4] != voTableArray[2]-1){
		
		for(var i=0; i<voTableArray[1]; i++){
			var cell = voTotal[i][voTableArray[4]];
			
			if(cell.indexOf(":") != -1){
				var check = cell.split(":");
				var vsRNum = check[0];
				var vsCNum = check[1];
					vsRNum = vsRNum.replace("r","");
					vsCNum = vsRNum.replace("c","");
				var	vnCNum = parseInt(vsCNum);
				var vnRNum = parseInt(vsRNum);
					vnCNum += 1;
					voTotal[i][voTableArray[4]] = vsRNum + ":" + "c" + vnCNum;
					for(var k=i; k<i+vnRNum; k++){
						if(k == i){
							adderArray[k] = "c0";
						}
						else{
							adderArray[k] = "r0";
						}
						
					}
					i = i+vnRNum -1;
			}
			else if(cell.indexOf("r0") != -1){
				continue;
			}
			else if(cell.indexOf("r") != -1){
				adderArray[k]= "1";
			}
			else if(cell.indexOf("c0") != -1){
				for(var j=0; j<voTableArray[2]; j++){
					var vsColChecker = voTotal[i][j];
					if(vsColChecker.indexOf(":") != -1){
						var check = vsColChecker.split(":");
						var vsRNum = check[0];
						var vsCNum = check[1];
						vsRNum = vsRNum.replace("r","");
						vsCNum = vsRNum.replace("c","");
						var vnRNum = parseInt(vsRNum);
						var vnCNum = parseInt(vsCNum);
						
						if(vnCNum+j-1 >= voTableArray[4]){
							vnCNum += 1;
							voTotal[i][j] = vsRNum+":"+"c"+vnCNum;
							for(var k=i; k<i+vnRNum; k++){
								if(k == i){
									adderArray[k] = "c0";
								}
								else{
									adderArray[k] = "r0";
								}
							}
							break;
						}
						else if(vnCNum +j -1 < voTableArray[4]){
							if(j+1 == voTableArray[4]){
								adderArray[i]="1";
							}
						}
						
					}
					else if(vsColChecker.indexOf("c") != -1){
						if(vsColChecker.indexOf("c0") != -1){
							continue;
						}
					}
				}
			}
			else if(cell.indexOf("c") != -1){
				var vsCNum = cell.replace("c","");
				var vnCNum = parseInt(vsCNum);
				if(vnCNum == 0){
					continue;
				}
				else if(vnCNum > 0){
					vnCNum += 1;
					voTotal[i][voTableArray[4]] = "c"+vnCNum;
					adderArray[i] = "c0";
				}
			}
			else if(cell.indexOf("1") != -1){
				adderArray[i] = "1";
			}
		}
	
		for(var i=0; i<voTableArray[1]; i++){
			$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+voTableArray[4]+"]").after(vsBuffer);
			voTotal[i].splice(voTableArray[4]+1,0,adderArray[i]);
		}
		
		
		
		
		tableEdit.tdReset(voTableArray[0],voTableArray[1]);
		
		var voTableArray2 = tableEdit.startInfo(voTableArray[0]);
		
		tableEdit.Vector(voTableArray2[0],voTotal);
		
		}
		
		tableEdit.tdReset(voTableArrayEnd[0],voTableArrayEnd[1]);
		fn_saveClone();
}



/*
 * deleteNode = 삭제 메소드 분기 호출 
 * */

tableEdit.deleteNode = function(param){
	
	
	
	var voTableArray = tableEdit.startInfo();
		
	var focusLength = $("#"+voTableArray[0]+" > tbody > tr > td[tableFocus=true]").length; // focus 갯수

	var check = param;
	
	if(focusLength == 1){ // 단일선택
		
		var focusRow = $("#"+voTableArray[0]+"> tbody > tr[row="+voTableArray[3]+"] > td[shell="+voTableArray[4]+"]").attr("rowSpan");
		var focusCol = $("#"+voTableArray[0]+"> tbody > tr[row="+voTableArray[3]+"] > td[shell="+voTableArray[4]+"]").attr("colSpan");
		
		if(typeof focusRow == "undefined" && typeof focusCol == "undefined"){ // 둘다 없다면 그냥 단일
			tableEdit.oneDelete(check);
		}
		else if(typeof focusRow != "undefined" && typeof focusCol == "undefined"){ // rowSpan 보유
			tableEdit.rowSpanDelete(check,focusRow);
		}
		else if(typeof focusRow == "undefined" && typeof focusCol != "undefined"){ // colSpan 보유
			tableEdit.colSpanDelete(check,focusCol);
		}
		else if(typeof focusRow != "undefined" && typeof focusCol != "undefined"){ // rowSpan & colSpan 보유
			tableEdit.SpanDelete(check, focusCol, focusRow);
		}
		
	}
	else if(focusLength > 1){ // 다중 선택 2차.
		
	}
}




/*
 * oneDelete = col x / row x
 * 
 * colSpanDelete = col o / row x
 * 
 * rowSpanDelete = col x / row o
 * 
 * SpanDelete = col o / row o  
 * 
 * */


/*
 * oneDelete : 단칸 셀 지정으로 행 / 열 삭제
 * 
 * @parameter
 * 	- check : 행 or 열
 * 
 * */
tableEdit.oneDelete = function(check){
var voTableArray = tableEdit.startInfo();
	
	var voTotal = new Array();
	for(var i=0; i<voTableArray[1]; i++){
		voTotal[i] = new Array();
	}
	
	voTotal = tableEdit.SpanInfo(voTableArray);	
	
	if(check == 1){ // 행삭제
		
		for(var i=0; i<voTableArray[2]; i++){ // 모든 td
			
			var vsChecker = voTotal[voTableArray[3]][i]; // focus tr Line td
			
			if(vsChecker.indexOf(":") != -1){ //
				
				var checker = vsChecker.split(":");
				var vsRNum = checker[0];
				var vsCNum = checker[1];
					vsRNum = vsRNum.replace("r","");
					vsCNum = vsRNum.replace("c","");
				var	vnCNum = parseInt(vsCNum);
				var vnRNum = parseInt(vsRNum);
				for(var j=voTableArray[3]; j<voTableArray[3]+vnRNum; j++){
					for(var n=i; n<i+vnCNum; n++){
						voTotal[j][n] = "1";
					}
				}
				
			}
			else if(vsChecker.indexOf("c0") != -1){ //
				continue;
			}
			else if(vsChecker.indexOf("r0") != -1){ //
				
				for(var k=0; k<voTableArray[1]; k++){
					
					var vsRowChecker = voTotal[k][i];
					
					if(vsRowChecker.indexOf("r0") != -1){
						continue;
					}
					else if(vsRowChecker.indexOf(":") != -1){
						var checker = vsChecker.split(":");
						var vsRNum = checker[0];
						var vsCNum = checker[1];
							vsRNum = vsRNum.replace("r","");
							vsCNum = vsRNum.replace("c","");
						var	vnCNum = parseInt(vsCNum);
						var vnRNum = parseInt(vsRNum);
						
						if(vnRNum + k -1 >= voTableArray[3]){
							
							if(vnRNum == 2){
								voTotal[k][i] = vsRNum;
								break;
							}
							else{
								vnRNum = vnRNum-1;
								
								voTotal[k][i] = "r"+vnRNum+":"+"c"+vnCNum;
								break;
							}
							
						}
						
					}
					else if(vsRowChecker.indexOf("r") != -1){
						var vsRNum = vsRowChecker.replace("r","");
						var vnRNum = parseInt(vsRNum);
						// 값이 focus tr 넘어가지 않도록
						if(vnRNum + k -1 >= voTableArray[3]){
							if(vnRNum == 2){
								voTotal[k][i] = "1";
								voTotal[k+1][i] = "1";
								break;
							}
							else{
								vnRNum = vnRNum-1;
								voTotal[k][i] = "r"+vnRNum;
								break;
							}
						}
					}
				}
				
			}
			else if(vsChecker.indexOf("c") != -1){ //
				continue;
			}
			else if(vsChecker.indexOf("r") != -1){ //
				var vsRNum = vsChecker.replace("r","");
				var vnRNum = parseInt(vsRNum);
				if(vnRNum == 2){
					voTotal[voTableArray[3]][i] = "1";
					voTotal[voTableArray[3]+1][i] = "1";
				}
				else if(vnRNum >= 2){
					var minusRNum = vnRNum-1;
					voTotal[voTableArray[3]][i] = "r"+minusRNum;
					for(var k=voTableArray[3]+1; k<voTableArray[3]+vnRNum; k++){
						if( k == voTableArray[3]){ continue; }
						else{
							voTotal[k][voTableArray[4]]="1";
						}
						
					}
				}
			}
			else if(vsChecker.indexOf("1") != -1){ //
				continue;
			}
		}
		
		tableEdit.Vector(voTableArray[0], voTotal);
		
		$("#"+voTableArray[0]+" > tbody > tr[row="+voTableArray[3]+"]").remove();
		
		tableEdit.trReset(voTableArray[0]);
		tableEdit.tdReset(voTableArray[0],voTableArray[1]);
	}
	else if(check == 2){ // 열삭제 
		
		for(var i=0; i<voTableArray[1]; i++){
			
			var vsChecker = voTotal[i][voTableArray[4]];
			
			if(vsChecker.indexOf(":") != -1){//
				// 열 삭제 중 :가 껴있을떄 .....
			}
			else if(vsChecker.indexOf("r0") != -1){//
				continue;
			}
			else if(vsChecker.indexOf("c0") != -1){// 
				for(var j=0; j<voTableArray[2]; j++){ // focus td까지 검토
					var checker = voTotal[i][j];
					
					if(checker.indexOf(":") != -1){ // 문제있음
						var vsCheck = checker.split(":");
						var vsRNum = vsCheck[0];
						var vsCNum = vsCheck[1];
							vsRNum = vsRNum.replace("r","");
							vsCNum = vsRNum.replace("c","");
						var	vnCNum = parseInt(vsCNum);
						var vnRNum = parseInt(vsRNum);
						
						if(vnCNum + j - 1 >= voTableArray[4]){
							var minVnCNum = vnCNum-1;
							voTotal[i][j] = vnRNum+":c"+minVnCNum;
							
							for(var m=i; m<i+vnRNum; m++){
								for(var n=j; n<j+vnCNum; n++){
									if(m==i && n==j){
										continue;
									}
									else{
										voTotal[m][n] = "1";
									}
								}
							}
							
						}
					}
					else if(checker.indexOf("r0") != -1){
						continue;
					}
					else if(checker.indexOf("c0") != -1){
						continue;
					}
					else if(checker.indexOf("r") != -1){
						continue;
					}
					else if(checker.indexOf("c") != -1){
						var vsCheck = checker.replace("c","");
						var vnCNum = parseInt(vsCheck);
						if(j + vnCNum - 1 >= voTableArray[4]){
							if(vnCNum == 2){
								voTotal[i][j] = "1";
								voTotal[i][j+1] = "1";
							}
							else if(vnCNum != 2){
								var minusVnCNum = vnCNum - 1;
								voTotal[i][j] = "c"+minusVnCNum;
								for(var k=j; k<j+vnCNum; k++){ // 전부 1로 변환
								if(k == j){
									continue;
									}
								else{
									voTotal[i][k]="c0";
									}
								}
								
							}
							break;
						}
						else{
							continue;
						}
							
					
					}
					else if(checker.indexOf("1") != -1){
						continue;
					}
				}
			}
			else if(vsChecker.indexOf("c") != -1){//
				var checker = vsChecker.replace("c","");
				var vnCNum = parseInt(checker);
				if(vnCNum == 2){
					voTotal[i][voTableArray[4]] = "1";
					voTotal[i][voTableArray[4]+1] = "1";
				}
				else if(vnCNum != 2){
					var minVnCNum = vnCNum - 1;
					voTotal[i][voTableArray[4]] = "c"+minVnCNum;
					
					for(var k=voTableArray[4]; k<voTableArray[4]+vnCNum; k++){
						if(k == voTableArray[4]){continue}
						else{
							voTotal[i][k] ="1";
						}
					}
				}
			}
			else if(vsChecker.indexOf("r") != -1){//
				continue;
			}
			else if(vsChecker.indexOf("1") != -1){
				continue;
			}
			
			
		}
		
		tableEdit.Vector(voTableArray[0], voTotal);
		
		for(var i=0; i<voTableArray[1]; i++){
			$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+voTableArray[4]+"]").remove();
		}
		
		tableEdit.trReset(voTableArray[0]);
		tableEdit.tdReset(voTableArray[0],voTableArray[1]);
	}
	fn_saveClone();
}

tableEdit.colSpanDelete = function(check , FocusCol){
	
	var focusCol = parseInt(FocusCol);
	
	var voTableArray = tableEdit.startInfo();
	
	var voTotal = new Array();
	for(var i=0; i<voTableArray[i]; i++){
		voTotal[i] = new Array();
	}
	
	voTotal = tableEdit.SpanInfo(voTableArray);
	
	if(check == 1){// 행 => colSpan 보유한 행 삭제 인디			
	
		for(var i=0; i<voTableArray[2]; i++){ // 모든 td
					
			var vsChecker = voTotal[voTableArray[3]][i]; // focus tr Line td
					
			if(vsChecker.indexOf(":") != -1){ //
				
				var checker = vsChecker.split(":");
				var vsRNum = checker[0];
				var vsCNum = checker[1];
					vsRNum = vsRNum.replace("r","");
					vsCNum = vsRNum.replace("c","");
				var	vnCNum = parseInt(vsCNum);
				var vnRNum = parseInt(vsRNum);
				
				for(var j=voTableArray[3]; j<voTableArray[3]+vnRNum; j++){
					for(var n=i; n<i+vnCNum; n++){
						voTotal[j][n] = "1";
					}
				}
					
			}
			else if(vsChecker.indexOf("c0") != -1){ //
				continue;
			}
			else if(vsChecker.indexOf("r0") != -1){ //
						
				for(var k=0; k<voTableArray[1]; k++){
							
					var vsRowChecker = voTotal[k][i];
							
					if(vsRowChecker.indexOf("r0") != -1){
						continue;
					}
					else if(vsRowChecker.indexOf(":") != -1){
						var checker = vsChecker.split(":");
						var vsRNum = checker[0];
						var vsCNum = checker[1];
							vsRNum = vsRNum.replace("r","");
							vsCNum = vsRNum.replace("c","");
						var	vnCNum = parseInt(vsCNum);
						var vnRNum = parseInt(vsRNum);
				
						if(vnRNum + k -1 >= voTableArray[3]){
									
							if(vnRNum == 2){
								voTotal[k][i] = vsRNum;
								break;
							}
							else{
								vnRNum = vnRNum-1;
										
								voTotal[k][i] = "r"+vnRNum+":"+"c"+vnCNum;
								break;
							}
								
						}
								
					}
					else if(vsRowChecker.indexOf("r") != -1){
						var vsRNum = vsRowChecker.replace("r","");
						var vnRNum = parseInt(vsRNum);
						// 값이 focus tr 넘어가지 않도록
						if(vnRNum + k -1 >= voTableArray[3]){
							if(vnRNum == 2){
								voTotal[k][i] = "1";
								voTotal[k+1][i] = "1";
								break;
							}
							else{
								vnRNum = vnRNum-1;
								voTotal[k][i] = "r"+vnRNum;
								break;
							}
						}
					}
				}
					
				}
				else if(vsChecker.indexOf("c") != -1){ //
					continue;
				}
				else if(vsChecker.indexOf("r") != -1){ //
					var vsRNum = vsChecker.replace("r","");
					var vnRNum = parseInt(vsRNum);
					if(vnRNum == 2){
						voTotal[voTableArray[3]][i] = "1";
						voTotal[voTableArray[3]+1][i] = "1";
					}
					else if(vnRNum >= 2){
						var minusRNum = vnRNum-1;
						voTotal[voTableArray[3]][i] = "r"+minusRNum;
						for(var k=voTableArray[3]+1; k<voTableArray[3]+vnRNum; k++){
							if( k == voTableArray[3]){ continue; }
							else{
								voTotal[k][voTableArray[4]]="1";
							}
							
						}
					}
				}
				else if(vsChecker.indexOf("1") != -1){ //
					continue;
				}
			}
						
		
		tableEdit.Vector(voTableArray[0], voTotal);
		
		$("#"+voTableArray[0]+" > tbody > tr[row="+voTableArray[3]+"]").remove();
		
		tableEdit.trReset(voTableArray[0]);
		tableEdit.tdReset(voTableArray[0],voTableArray[1]);
		
		
	}
	else if(check == 2){ // 열   /////다시체크하기 .... 반복문 0부터 시작인데 0찍으면안댐..
		
		
		for(var i=0; i<voTableArray[1]; i++){
			
			for(var j=voTableArray[4]; j<voTableArray[4]+focusCol; j++){
				
				var checker = voTotal[i][j];
				
				if(checker.indexOf(":") != -1){// 1
					var checkSpan = vsInCheck.split(":");
					var vsRNum = checkSpan[0];
					var vsCNum = checkSpan[1];
						vsRNum = vsRNum.replace("r","");
						vsCNum = vsCNum.replace("c","");
					var vnRNum = parseInt(vsRNum);
					var vnCNum = parseInt(vsCNum);
					
					var count = 0;
					var fixer = 0;
					
					for(var m=i; m<i+vnRNum; m++){
						for(var n=j; n<j+vnCNum; n++){
							if(m == i){
								if(n > voTableArray[4]+focusCol-1){
									count+=1;
									if(fixer ==0){
										fixer = n;
									}
								}
								else if(n <= voTableArray[4]+focusCol-1){
									voTotal[m][n]="d";
								}
							}
							else{
								if(n > voTableArray[4]+focusCol-1){
									continue;
								}
								else if(n < voTableArray[4]+focusCol-1){
									voTotal[m][n] ="d";
								}
							}
						}
					}
					
					
					
				}
				else if(checker.indexOf("r0") != -1){// 1
					voTotal[i][j]="d";
				}
				else if(checker.indexOf("c0") != -1){// 1
					
					//----- c0 start -------
					for(var m=0; m<voTableArray[2]; m++){//2 td all
						
						var vsInCheck = voTotal[i][m];
						
						if(vsInCheck.indexOf(":") != -1){
							var checkSpan = vsInCheck.split(":");
							var vsRNum = checkSpan[0];
							var vsCNum = checkSpan[1];
								vsRNum = vsRNum.replace("r","");
								vsCNum = vsCNum.replace("c","");
							var vnRNum = parseInt(vsRNum);
							var vnCNum = parseInt(vsCNum);
							
							
							
						}
						else if(vsInCheck.indexOf("r0") != -1){
							continue;
						}
						else if(vsInCheck.indexOf("c0") != -1){
							continue;				
						}
						else if(vsInCheck.indexOf("r") != -1){
							continue;
						}
						else if(vsInCheck.indexOf("c") != -1){
							var vsCNum = vsInCheck.replace("c","");
							var vnCNum = parseInt(vsCNum);
							
							if(m+vnCNum-1 < voTableArray[4]){
								continue;
							}
							else if(m+vnCNum-1 >= voTableArray[4]){
								var count =0;
								for(var k=m; k<m+vnCNum; k++){
									if(k >= voTableArray[4]){
										count += 1;
										voTotal[i][k] = "d";
									}
									else{
										continue;
									}
								}
								
								var total = vnCNum - count;
								
								if(total == 1){
									voTotal[i][m] = "1";
								}
								else if(total > 1){
									voTotal[i][m] = "c"+total;
								}
								
							
							}
							
							
						}
						else if(vsInCheck.indexOf("1") != -1){
							continue;
						}
						else if(vsInCheck.indexOf("d") != -1){
							continue;
						}
					}
					
					
					
					//----- c0 end -------
				}
				else if(checker.indexOf("r") != -1){// 1
					voTotal[i][j] = "d";
				}
				else if(checker.indexOf("c") != -1){// 1
					var vsCNum = checker.replace("c","");
					var vnCNum = parseInt(vsCNum);
					
					if(j+vnCNum-1 <= voTableArray[4]+focusCol-1){
						
						for(var k=j; k<j+vnCNum; k++){
							
							voTotal[i][k]="d";
						}
					}
					else if(j+vnCNum-1 > voTableArray[4]+focusCol-1){
						var count = 0;
						var fixer = 0;
						for(var k=j; k<j+vnCNum; k++){
							if(k <= voTableArray[4]+focusCol-1){
								voTotal[i][k] = "d";
							}
							else if(k > voTableArray[4]+focusCol-1){
								count += 1;
								if(fixer == 0){
									fixer = k;
								}
							}
						}
						
						if(count == 1){
							voTotal[i][fixer] = "1";
						}
						else if(count > 1){
							
							for(var k=fixer; k<count; k++){
								if(k==fixer){
									voTotal[i][fixer] = "c"+count;
								}
								else{
									voTotal[i][k]="c0";
								}
							}
							
						}
						
						
					}
					
				}
				else if(checker.indexOf("1") != -1){// 1
					voTotal[i][j] = "d";
				}
				else if(checker.indexOf("d") != -1){// 1
					continue;
				}
				
				
			}
		}
		
		tableEdit.Vector(voTableArray[0], voTotal);
		
		for(var i=0; i<voTableArray[1]; i++){
			for(var j=voTableArray[4]; j<voTableArray[4]+focusCol; j++){
				
				$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").remove();
				
			}
		}
		
		tableEdit.trReset(voTableArray[0]);
		tableEdit.tdReset(voTableArray[0],voTableArray[1]);
		
	}
	
	fn_saveClone();
}


tableEdit.rowSpanDelete = function(check, focusRow){

	 
	
	var voTableArray = tableEdit.startInfo();
	
	var voTotal = new Array();
	for(var i=0; i<voTableArray[1]; i++){
		voTotal[i] = new Array();
	}
	
	voTotal = tableEdit.SpanInfo(voTableArray);	
	
	if(check == 1){ // 행
		
		/*
		 * rowSpan 만큼 td 전부 검사해서 col / row 변동사항 입력
		 * */
		
		for(var i=voTableArray[3]; i<voTableArray[3]+focusRow; i++){ // focus rowSpan 전부 
			for(var j=0; j<voTableArray[2]; j++){ // td 전체
				
				var check = voTotal[i][j];
				
				if(check.indexOf(":") != -1){
					
				}
				else if(check.indexOf("r0") != -1){ // r0을 보게되면 위에서 아래로 훑어서 확인
					
					for(var m=0; m<voTableArray[1]; m++){ // 전체 tr 확인
						
						var inCheck = voTotal[m][j];
						
						if(inCheck.indexOf(":") != -1){
							
						}
						else if(inCheck.indexOf("r0") != -1){
							continue;
						}
						else if(inCheck.indexOf("c0") != -1){
							continue;						
						}
						else if(inCheck.indexOf("r") != -1){
							var vsRNum = inCheck.replace("r","");
							var vnRNum = parseInt(vsRNum);
							var count = 0;
							if(m+vnRNum-1 > i){
								continue;
							}
							else if(m+vnRNum-1 <= i){ // rowSpan 만큼 삭제하는 범위에 들어오면
								for(var n=m; n<m+vnRNum; n++){ // m에서 vnRNum 만큼 반복
									if(n >= i){
										count += 1;  
										voTotal[n][j] = "d";
									}
									else if(n < i){
										continue;
									}
								}
								
							var minusRNum = vnRNum - count;
							
							if(minusRNum == 1){
								voTotal[m][j] = "1";
							}
							else if(minusRNum >= 2){
								voTotal[m][j] = "r"+minusRNum;
							}
								
							}
							
						}
						else if(inCheck.indexOf("c") != -1){
							continue;
						}
						else if(inCheck.indexOf("1") != -1){
							continue;
						}
						else if(inCheck.indexOf("d") != -1){
							continue;
						}
						
					}
				}
				else if(check.indexOf("c0") != -1){//
					voTotal[i][j]="d";
				}
				else if(check.indexOf("r") != -1){//
					var vsRNum = check.replace("r","");
					var vnRNum = parseInt(vsRNum);
					
					for(var m=i; m<i+vnRNum; m++){
						voTotal[m][j]="d";
					}
					
				}
				else if(check.indexOf("c") != -1){//
					var vsCNum = check.replace("c","");		
					var vnCNum = parseInt(vsCNum);
					for(var m=j; m<j+vnCNum; m++){
						voTotal[i][m]="d";
					}
				}
				else if(check.indexOf("1") != -1){//
					voTotal[i][j] = "d";
				}
				else if(check.indexOf("d") != -1){//
					continue;
				}
				
			}
		}
		
		tableEdit.Vector(voTableArray[0], voTotal);
		
		for(var i=voTableArray[3]; i<voTableArray[3]+focusRow; i++){
			for(var j=0; j<voTableArray[2]; j++){
				$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").remove();
			}
		}
		
		tableEdit.trReset(voTableArray[0]);
		tableEdit.tdReset(voTableArray[0],voTableArray[1]);
		fn_saveClone();
		
	}
	else if(check == 2){ // 열
		
		for(var i=0; i<voTableArray[1]; i++){
			
			var vsChecker = voTotal[i][voTableArray[4]];
			
			if(vsChecker.indexOf(":") != -1){//
				var checker = vsChecker.split(":");
				var vsRNum = checker[0];
				var vsCNum = checker[1];
					vsRNum = vsRNum.replace("r","");
					vsCNum = vsRNum.replace("c","");
				var	vnCNum = parseInt(vsCNum);
				var vnRNum = parseInt(vsRNum);
				///////////////보류

			}
			else if(vsChecker.indexOf("r0") != -1){//
				continue;
			}
			else if(vsChecker.indexOf("c0") != -1){//
				for(var j=0; j<voTableArray[2]; j++){ // focus td까지 검토
					var checker = voTotal[i][j];
					
					if(checker.indexOf(":") != -1){
						
					}
					else if(checker.indexOf("r0") != -1){
						continue;
					}
					else if(checker.indexOf("c0") != -1){
						continue;
					}
					else if(checker.indexOf("r") != -1){
						continue;
					}
					else if(checker.indexOf("c") != -1){
						var vsCheck = checker.replace("c","");
						var vnCNum = parseInt(vsCheck);
						if(j+vnCNum-1 >= voTableArray[4]){
							if(vnCNum == 2){
								voTotal[i][j] = "1";
								voTotal[i][j+1] = "1";
							}
							else if(vnCNum != 2){
								vnCNum -= 1;
								voTotal[i][j] = "c"+vnCNum;
							}
							
						}						
					}
					else if(checker.indexOf("1") != -1){
						continue;
					}
				}	
			}
			else if(vsChecker.indexOf("r") != -1){//
				continue;
			}
			else if(vsChecker.indexOf("c") != -1){//
				var checker = vsChecker.replace("c","");
				var vnCNum = parseInt(check);
				if(vnCNum == 2){
					voTotal[i][j]= "1";
					voTotal[i][j+1] = "1";
				}
				else if(vmCNum != 2){
					var minVnCNum = vnCNum - 1;
					voTotal[i][j] = "c"+minVnCNum;
					
					for(var k=j; k<j+vnCNum; k++){
						if(k == j){continue}
						else{
							voTotal[i][k] ="1";
						}
					}
				}
			}
			else if(vsChecker.indexOf("1") != -1){//
				continue;
			}
		}
		
		tableEdit.Vector(voTableArray[0], voTotal);
		
		for(var i=0; i<voTableArray[1]; i++){
			$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+voTableArray[4]+"]").remove();
		}
		
		tableEdit.trReset(voTableArray[0]);
		tableEdit.tdReset(voTableArray[0],voTableArray[1]);
		fn_saveClone();
	}

}


tableEdit.SpanDelete = function(check, focusCol, focusRow){
		
	
	
	
}







/*
 * Merge = 테이블 병합
 * 
 * */
tableEdit.Merge = function(){
	// tableInfo
	var voTableArray = tableEdit.startInfo();
	
	// table SpanInfo
	var voTotal = new Array();
	for(var i=0; i<voTableArray[1]; i++){
		voTotal[i] = new Array();
	}
	
	// Span total
	voTotal = tableEdit.SpanInfo(voTableArray);
	
	//focus cell check
	var voTableFocus = new Array();
	for(var i=0; i<voTableArray[1]; i++){
		voTableFocus[i] = new Array();
	}
	
	//focus cell check Process
	for(var i=0; i<voTableArray[1]; i++){
		for(var j=0; j<voTableArray[2]; j++){
			voTableFocus[i][j] = $("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").attr("tableFocus");
		}
	}
	
	var tableFocusRowNumber = $("td[tableFocus=true]").parent().attr("row"); //focus cell top row
	var stub = parseInt(tableFocusRowNumber);
	var tableFocusShellNumber = $("td[tableFocus=true]").attr("shell"); //focus cell top shell
	var stub2 = parseInt(tableFocusShellNumber);
	
	var Span = []; // Span check
	
	var vnInputRowSpan = 0; // final rowSpan
	var vnInputColSpan = 0; // final colSpan
	
	for(var i=0; i<voTableArray[1]; i++){
		for(var j=0; j<voTableArray[2]; j++){
			var check = voTotal[i][j];
			var classCheck = voTableFocus[i][j];
			//span배열 초기화
			if(typeof Span[i] == "undefined" && Span[i] == null){
				Span[i]=0;
			}
			/* classCheck == true > focus cell 고려할 셀 : c~ / 1 / r:c
			 * classCheck == false > none focus cell / 고려할 셀 : c0 / r0
			 * */
			if(classCheck == "true"){
				if(check.indexOf(":") != -1){
					var vaCheck = check.split(":");
					var viRNum = vaCheck[0];
					var viCNum = vaCheck[1];
					viRNum = viRNum.replace("r","");
					viCNum = viCNum.replace("c","");
					var vnRNum = parseInt(viRNum);
					var vnCNum = parseInt(viCNum);
					var colSize = Span[i];
					Span[i] = colSize+vnCNum;
				}
				else if(check.indexOf("c0") != -1){
					continue;
				}
				else if(check.indexOf("c") != -1){
					var vnStup2 = parseInt(check.replace("c",""));
					var colSize = Span[i];
					Span[i] = colSize+vnStup2;
				}
				else if(check.indexOf("r0") != -1){
					continue;
				}
				else if(check.indexOf("r") != -1){
					var colSize = Span[i];
					Span[i] = colSize+1;					
				}
				else if(check.indexOf("1") != -1){
					var colSize = Span[i]
					colSize += 1;
					Span[i] = colSize;
				}
			}
			
		}}
	
		//colSpan 
		vnInputColSpan = Span[stub];
		
		//rowSpan
		var voFocusRow = new Array();
		for(var i=0; i<voTableArray[1]; i++){
			voFocusRow[i] = new Array();
		}
		
		for(var i=0; i<voTableArray[1]; i++){
			for(var j=0; j<voTableArray[2]; j++){
				var check = voTotal[i][j];
				var classCheck = voTableFocus[i][j];
				if(classCheck == "true"){
					if(check.indexOf(":") != -1){
						var vaCheck = check.split(":");
						var vsRNum = vaCheck[0];
						var viRNum = vsRNum.replace("r","");
						var vnRNum = parseInt(viRNum);
						voFocusRow[i][j] = vnRNum;
					}
					else if(check.indexOf("r") != -1){
						var vsStup1 = parseInt(check.replace("r",""));
						var vnRNum = parseInt(vsStup1);
						voFocusRow[i][j] = vnRNum;
						
					}
					else if(check.indexOf("c") != -1){
						voFocusRow[i][j] = 1;
					}
					else if(check == 1){
						voFocusRow[i][j] = 1;
					}
				}
				else if(classCheck != "true"){
					voFocusRow[i][j] = 0;
				}
				
			}
		}
		
		var total = [];
		for(var i=0; i<voTableArray[2]; i++){
			for(var j=0; j<voTableArray[1]; j++){
				var adder = voFocusRow[j][i];
				if(typeof total[i] =="undefined"){
					total[i]=0;
				}
				if(adder == 0){
					continue;
				}
				else if(adder != 0){
					var current = total[i];
					total[i] = current + adder;
				}
			}
		}
		
		// inputRowSpan에 값 설정.
		for(var i=0; i<total.length; i++){
			var check = total[i];
			if(vnInputRowSpan <= check){
				vnInputRowSpan = check;
			}		
		}
		
		var first=0;
		for(var i=0; i<voTableArray[1]; i++){
			for(var j=0; j<voTableArray[2]; j++){
				var check = voTotal[i][j];
				var classCheck = voTableFocus[i][j];
				if(classCheck == "true"){
					if(check != "0"){
						if(first == 0){ // 1 time 
							first += 1;
							if(vnInputRowSpan > 1 && vnInputColSpan > 1){
								for(var a=stub; a<vnInputRowSpan+stub; a++){
									for(var b=stub2; b<vnInputColSpan+stub2; b++){
										if(a == stub && b == stub2){
											continue;
										}
										
										if(a == stub){
											voTotal[a][b] = "c0";
										}
										else if(a != stub){
											voTotal[a][b] = "r0";
										}
										
									}
								}
								voTotal[i][j] = vnInputRowSpan.toString()+":"+vnInputColSpan.toString();	
							}
							else if(vnInputRowSpan > 1 && vnInputColSpan <= 1){
								for(var a=stub; a<vnInputRowSpan+stub; a++){
									if(a == stub){
										continue;
									}
									voTotal[a][j] = "r0"
								}
								voTotal[i][j] = "r"+ vnInputRowSpan.toString()
							}
							else if(vnInputRowSpan <= 1 && vnInputColSpan > 1){
								for(var b=stub2; b<vnInputColSpan+stub2; b++){
									if(b == stub2){
										continue;
									}
									voTotal[i][b] = "c0"
								}
								voTotal[i][j] = "c"+vnInputColSpan.toString();
							}
							else if(vnInputRowSpan <= 1 && vnInputColSpan <= 1){
								
							}
						}
					}
				}
			}
		}	
		
		tableEdit.Vector(voTableArray[0], voTotal);
		
		tableEdit.trReset(voTableArray[0]);
		tableEdit.tdReset(voTableArray[1],voTableArray[1]);
}




/*
 * Divide = 테이블을 분할한다.
 * */
tableEdit.Divide = function(){
	
	var voTableArray = tableEdit.startInfo();
	
	var vsCheckColSpan = $("td[tableFocus=true]").attr("colspan");
 	if(typeof vsCheckColSpan == "undefined"){
 		vsCheckColSpan = 0;
 	}
 	var vnfocusShellCol = parseInt(vsCheckColSpan);
 
 	var vsCheckRowSpan = $("td[tableFocus=true]").attr("rowspan");
 	if(typeof vsCheckRowSpan == "undefined"){
 		vsCheckRowSpan = 0;
 	}
 	
 	var vnfocusShellRow = parseInt(vsCheckRowSpan);
 	
 	 if(vnfocusShellCol == 0 && vnfocusShellRow != 0){// col이 없을떄
 		$("#"+voTableArray[0]+"> tbody > tr[row="+voTableArray[3]+"] > td[shell="+voTableArray[4]+"]").removeAttr("rowSpan");
 		
 	 	for(var a=voTableArray[3]+1; a<voTableArray[3]+vnfocusShellRow; a++){
 			$("#"+voTableArray[0]+"> tbody > tr[row="+a+"] > td[shell="+voTableArray[4]+"]").show();
 		}
 	 }
 	 else if(vnfocusShellCol != 0 && vnfocusShellRow == 0){ // row가 없을때
 		 $("#"+voTableArray[0]+"> tbody > tr[row="+voTableArray[3]+"] > td[shell="+voTableArray[4]+"]").removeAttr("colSpan");

 		 for(var a=voTableArray[4]+1; a<voTableArray[4]+vnfocusShellCol; a++){
 			$("#"+voTableArray[0]+"> tbody > tr[row="+voTableArray[3]+"] > td[shell="+a+"]").show();
 		}
 	 }
 	 else if(vnfocusShellCol != 0 && vnfocusShellRow != 0){ // 둘다 있으면
 		 $("#"+voTableArray[0]+"> tbody > tr[row="+voTableArray[3]+"] > td[shell="+voTableArray[4]+"]").removeAttr("rowSpan");
 		 $("#"+voTableArray[0]+"> tbody > tr[row="+voTableArray[3]+"] > td[shell="+voTableArray[4]+"]").removeAttr("colSpan");
 		 
 		 for(var a=voTableArray[3]; a<voTableArray[3]+vnfocusShellRow; a++){
 			 for(var b=voTableArray[4]; b<voTableArray[4]+vnfocusShellCol; b++){
 				 if(a==voTableArray[3] && b==voTableArray[4]){
 					 continue;
 				 }
 				 else{
 					 $("#"+voTableArray[0]+"> tbody > tr[row="+a+"] > td[shell="+b+"]").show();
 				 }
 			 }
 		 }
 	 }
 	 else if(vnfocusShellCol == 0 && vnfocusShellRow == 0){ 
 		 //단일셀 분할
 		/* 1. 분할셀이 단일일때
		  * 2. after해서 한줄 추가
		  * 3. 재배열 
		  * 4. 배열로 다시 hide show 먹이기?  -> focusTr 위치 상단에 
		  * voTableArray[0] = vsTableId;
			voTableArray[1] = currentTrNum;
			voTableArray[2] = currentTdNum;
			voTableArray[3] = vsFocusTrRow;
			voTableArray[4] = vsFocusTdShell;
		
		  * */
 		 	// 2번
			var vsBuffer = "";
				vsBuffer += "\n  <td class=\"td\"";
				vsBuffer += "shell = \""+voTableArray[4]+"\"";
				vsBuffer += "style=\"height:30px; cursor:pointer\" tableFocus=false ";
				vsBuffer += "compoDvs=\"td\" ";
				vsBuffer += "width=\"100\" ";
				vsBuffer += "onmousedown=\"fn_tdMouseDown(this)\" ";
				vsBuffer += "onmouseover=\"fn_tdMouseOver(this)\" ";
				vsBuffer += "onmouseup=\"fn_tdMouseUp(this)\" ";
				
				vsBuffer += "ondblclick=\"fn_tdDbClick(this)\"> ";
				vsBuffer += "</td>";
	
			for(var i=0; i<voTableArray[1]; i++){
				if(i != voTableArray[3]){
					$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+voTableArray[4]+"]").after(vsBuffer);
				}
				else if(i == voTableArray[3]){
					$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+voTableArray[4]+"]").after(vsBuffer);
				}
			}
			// 3번
			tableEdit.tdReset(voTableArray[0],voTableArray[1]);
			tableEdit.trReset(voTableArray[0]);
			
			var voTableArrayStart2 = tableEdit.startInfo();
			
			var voTotal = new Array(voTableArrayStart2[2]);
			for(var i=0; i<voTableArray[1]; i++){
				voTotal[i] = new Array(voTableArrayStart2[1]);
			}
			
			// 4. 배열로 데이터 가져오기 
			voTotal = tableEdit.SpanInfo(voTableArrayStart2);
			
			// 5. 가져온 것에 원래 focus된 td 상단을 확인해서 c0이면 c0을 포함한 친구에게 col+1 / col=2  추가한 셀들은 hide
			// c0 이면 col+1 아니면 c=2
			for(var i=0; i<voTableArrayStart2[1]; i++){
				if(i == voTableArrayStart2[3]){
					continue;
				}
				var check = voTotal[i][voTableArrayStart2[4]];
				// 있을 수 있는 것, c0 r0 r~ c~ r:c 1 분기 처리
				if(check.indexOf(":") != -1){
					var vaCheck = check.split(":");
					var vsCNum = vaCheck[1];
					var vsRNum = vaCheck[0];
					var viCNum = vsCNum.replace("c",""); //c 값
					var viRNum = vsRNum.replace("r","");
					var vnCNum = parseInt(viCNum);
					var vnRNum = parseInt(viRNum);
					vnCNum += 1;
					for(var k=voTableArrayStart2[4]+1; k<=voTableArrayStart2[4]+vnCNum; k++){
						voTotal[i][k]="c0";
					}
					for(var m=i+1; m<i+vnRNum; m++){
						for(var n=voTableArrayStart2[4]; n<voTableArrayStart2[4]+vnCNum; n++){
							voTotal[m][n]="r0";
						}
					}
					vsCNum = "c"+vnCNum;
					vsCNum = "r"+vsRNum+":"+vsCNum;
					voTotal[i][voTableArrayStart2[4]] = vsCNum;
					//voTotal[i][voTableArrayStart2[4]+1] = "c0";
				}
				else if(check.indexOf("c0") != -1){
					for(var j=0; j<voTableArrayStart2[2]; j++){
						// td갯수만큼 반복
						var vsCheckC0 = voTotal[i][j];
						if(vsCheckC0.indexOf(":") != -1){
							var vaCheck = vsCheckC0.split(":");
							var vsCNum = vaCheck[1];
							var vsRNum = vaCheck[0];
							var viCNum = vsCNum.replace("c",""); //c 값
							var viRNum = vsRNum.replace("r","");
							var vnCNum = parseInt(viCNum);
							var vnRNum = parseInt(viRNum);
							vnCNum += 1;
							for(var k=j; k<j+vnCNum; k++){
								if(k==j){continue;}
								voTotal[i][k]="c0";
							}
							for(var m=i+1; m<i+vnRNum; m++){
								for(var n=j; n<j+vnCNum; n++){
									voTotal[m][n]="r0";
								}
							}
							
							vsCNum = "c"+vnCNum;
							vsCNum = "r"+vsRNum+":"+vsCNum;
							voTotal[i][j] = vsCNum;
							break;
						}
						else if(vsCheckC0.indexOf("c") != -1){
							var viCNum = vsCheckC0.replace("c","");
							var vnCNum = parseInt(viCNum);
							if(vnCNum != 0){ //0이면 오류생김..
								if(j+vnCNum >= voTableArrayStart2[4]){
									vnCNum += 1;
									for(var k=j; k<=vnCNum; k++){
										if(k == j){continue;}
										voTotal[i][k]="c0";
									}
									viCNum = "c"+vnCNum;
									voTotal[i][j] = viCNum;
									break;
								}
								else if(j+vnCNum < voTableArrayStart2[4]){
									continue;
								}
							}
							
						}
					}
				}
				else if(check.indexOf("r0") != -1){
					continue;				
				}
				else if(check.indexOf("c") != -1){// c~ 구간임 c +1;
					var vsCNum = check.replace("c","");
					var vnCNum = parseInt(vsCNum);
					vnCNum += 1;
					for(var k=voTableArrayStart2[4]+1; k<=vnCNum; k++){
						voTotal[i][k]="c0";
					}
					vsCNum = "c"+vnCNum;
					voTotal[i][voTableArrayStart2[4]] = vsCNum;
					
				}
				else if(check.indexOf("r") != -1){
					continue;
				}
				else if(check.indexOf("1") != -1){
					check = "c2";
					voTotal[i][voTableArrayStart2[4]] = check;
					voTotal[i][voTableArrayStart2[4]+1] = "c0";
				}
			}
			
			
			for(var i=0; i<voTableArrayStart2[1]; i++){
				for(var j=0; j<voTableArrayStart2[2]; j++){
					var InputSpan = voTotal[i][j];
					// 0 / 1 / c / r / r:c
					if(InputSpan == "c0" || InputSpan == "r0" ){ //포함되는 셀 hide();
						$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").hide(); // h
					} 
					else if(InputSpan == "1"){
						$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").show();
					}
					else if(InputSpan.indexOf(":") != -1){ // row:col // row나 col이 0일 수 있음 분기처리.
						var vaCheck = InputSpan.split(":");
						var vsRNum = vaCheck[0];
						var vsCNum = vaCheck[1];
						var viRNum = vsRNum.replace("r",""); //r 값
						var viCNum = vsCNum.replace("c",""); //c 값
						
						if(viRNum == "0" && viCNum != "0"){
							$("#"+voTableArrayStart2[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").attr("colspan",viCNum);
						}
						else if(viCNum == "0" && viRNum != "0"){
							$("#"+voTableArrayStart2[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").attr("rowspan",viRNum);
						}
						else if(viCNum != "0" && viRNum != "0"){
							$("#"+voTableArrayStart2[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").attr("colspan",viCNum);
							$("#"+voTableArrayStart2[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").attr("rowspan",viRNum);
						}
					}
					else if(InputSpan.indexOf("c") != -1){ // col
						var viStup2 = parseInt(InputSpan.replace("c",""));
						$("#"+voTableArrayStart2[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").attr("colspan",viStup2);
					}
					else if(InputSpan.indexOf("r") != -1){ // row
						var viStup1 = parseInt(InputSpan.replace("r",""));
						$("#"+voTableArrayStart2[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").attr("rowspan",viStup1);
					}
				}
			}
 	 }
}



