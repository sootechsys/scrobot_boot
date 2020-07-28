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
 *  - 파라메터 입력 시 focus 된 셀 위치는 빼고 반환
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
	
		voTableArray[0] = vsTableId;
		voTableArray[1] = vnCurrentTrNum;
		voTableArray[2] = vnCurrentTdNum;
		
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
					$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").show();
					$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").attr("colspan",viCNum);
					$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").removeAttr("rowspan");
				}
				else if(viCNum == "0" && viRNum != "0"){
					$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").show();
					$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").attr("rowspan",viRNum);
					$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").removeAttr("colspan");
				}
				else if(viCNum != "0" && viRNum != "0"){
					$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").show();
					$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").attr("colspan",viCNum);
					$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").attr("rowspan",viRNum);
				}
			}
			else if(InputSpan.indexOf("c") != -1){ // col
				var viStup2 = parseInt(InputSpan.replace("c",""));
				$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").show();
				$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").attr("colspan",viStup2);
				$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").removeAttr("rowspan");
			}
			else if(InputSpan.indexOf("r") != -1){ // row
				var viStup1 = parseInt(InputSpan.replace("r",""));
				$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").show();
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
	
	
	debugger;
	
	var voTableArray = tableEdit.startInfo();
	
	var vsBuffer = tableEdit.ColBuffer(voTableArray);
	
	if(voTableArray[3] == 0){ //focus top
		$("#"+voTableArray[0]+"> tbody > tr:first").before(vsBuffer);
		
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
		
		for(var a=0; a<voTableArray[2]; a++){ // td 전체 검색
			
			var vsCheck = voTotal[voTableArray[3]][a]; // focus 된 라인을 검색
			
			if(vsCheck.indexOf(":") != -1){
				adderArray[a] = "1";
			}
			else if(vsCheck.indexOf("r0") != -1){
				
				for(var b=0; b<voTableArray[1]; b++){ // tr 전체
						
					var vsRowCheck = voTotal[b][a];
					
					if(vsRowCheck.indexOf(":") != -1){
						var voInCheck = vsRowCheck.split(":");
						var vsRNum = voInCheck[0];
						var vsCNum = voInCheck[1];
						vsRNum = vsRNum.replace("r","");
						vsCNum = vsCNum.replace("c","");
						var vnRNum = parseInt(vsRNum);
						var vnCNum = parseInt(vsCNum);
						
						if(voTableArray[3] == 0){
							if(vnRNum+b >= voTableArray[3]){
								var vnPlusVnRNum = vnRNum + 1;
								voTotal[b][a]="r"+vnPlusVnRNum+":"+"c"+vnCNum;
								for(var c=a; c<a+vnCNum; c++){
									adderArray[c]="r0";
								}
								break;
							}
							else if(vnRNum+b < voTableArray[3]){
								continue;
							}
						}
						else{
							if(vnRNum+b-1 >= voTableArray[3]){
								var vnPlusVnRNum = vnRNum + 1;
								voTotal[b][a]="r"+vnPlusVnRNum+":"+"c"+vnCNum;
								for(var c=a; c<a+vnCNum; c++){
									adderArray[c]="r0";
								}
								break;
							}
							else if(vnRNum+b-1 < voTableArray[3]){
								continue;
							}
						}
						
						
					}
					else if(vsRowCheck.indexOf("c0") != -1){
						continue;
					}
					else if(vsRowCheck.indexOf("r0") != -1){
						continue;
					}
					else if(vsRowCheck.indexOf("r") != -1){
						var vsInRowCheck = vsRowCheck.replace("r","");
						var vnRNum = parseInt(vsInRowCheck);
						
						if(b == 0){
							if(vnRNum+b >= voTableArray[3]){
								var vnPlusVnRNum = vnRNum + 1;
								voTotal[b][a] = "r"+vnPlusVnRNum;
								adderArray[a] = "r0";
							}
							else{
								continue;
								}
						}
						else if(b != 0){
							if(vnRNum+b-1 >= voTableArray[3]){
								var vnPlusVnRNum = vnRNum + 1;
								voTotal[b][a] = "r"+vnPlusVnRNum;
								adderArray[a] = "r0";
							}
							else{
								continue;
								}
						}
						
					}
					else if(vsRowCheck.indexOf("c") != -1){
						continue;
					}
					else if(vsRowCheck.indexOf("1") != -1){
						continue;
					}
				} // 
			}
			else if(vsCheck.indexOf("c0") != -1){
				continue;		
			}
			else if(vsCheck.indexOf("r") != -1){
				adderArray[a] = "1";				
			}
			else if(vsCheck.indexOf("c") != -1){
				var vsCNum = vsCheck.replace("c","");
				var vnCNum = parseInt(vsCNum);
				
				for(var k=a; k<a+vnCNum; k++){
					if(k == a){
						adderArray[k] = "c"+vnCNum;
					}
					else{
						adderArray[k] = "c0";
					}
					
				}
				
			}
			else if(vsCheck.indexOf("1") != -1){
				adderArray[a] = "1";
			}
		}
		
		voTotal.splice(voTableArray[3],0,adderArray);
		
		//테이블 리셋
		$("#"+voTableArray[0]+"> tbody > tr[row="+voTableArray[3]+"]").before(vsBuffer);
		
		tableEdit.trReset(voTableArray[0]);
		
		var voTableArray2 = tableEdit.startInfo();
		
		tableEdit.Vector(voTableArray2[0],voTotal);
		
	}
	
/* fn_saveClone(); */

} // addUp end



/*
 * addDown : 선택된 셀하단에 행을 추가한다.
 * */
tableEdit.addDown = function(){
	
	debugger;
	
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
		
		for(var a=0; a<voTableArray[2]; a++){
			
			var vsCheck = voTotal[voTableArray[3]][a]; 
			
			if(vsCheck.indexOf(":") != -1){
					var voInCheck = vsCheck.split(":");
					var vsRNum = voInCheck[0];
					var vsCNum = voInCheck[1];
					vsRNum = vsRNum.replace("r","");
					vsCNum = vsCNum.replace("c","");
					var vnRNum = parseInt(vsRNum);
					var vnCNum = parseInt(vsCNum);
					
					var vnPlusVnRNum = vnRNum + 1;
					
					voTotal[voTableArray[3]][a] = "r"+vnPlusVnRNum+":"+"c"+vnCNum;
					
					for(var c=a; c<a+vnCNum; c++){
						adderArray[c] = "r0";							
					}
			}
			else if(vsCheck.indexOf("r0") != -1){
				for(var b=0; b<voTableArray[1]; b++){
					var vsInCheck = voTotal[b][a];
					
					if(vsInCheck.indexOf(":") != -1){
						var voInCheck = vsInCheck.split(":");
						var vsRNum = voInCheck[0];
						var vsCNum = voInCheck[1];
						vsRNum = vsRNum.replace("r","");
						vsCNum = vsCNum.replace("c","");
						var vnRNum = parseInt(vsRNum);
						var vnCNum = parseInt(vsCNum);
						
						if(b == 0){
							if(b+vnRNum >= voTableArray[3]){
								var vnPlusVnRNum = vnRNum + 1;
								voTotal[b][a] = "r"+vnPlusVnRNum+":"+"c"+vnCNum;
								for(var c=a; c<a+vnCNum; c++){
									adderArray[c] = "r0";							
								}
							}
							else{
								continue;
							}
						}
						else{
							if(b+vnRNum-1 >= voTableArray[3]){
								var vnPlusVnRNum = vnRNum + 1;
								voTotal[b][a] = "r"+vnPlusVnRNum+":"+"c"+vnCNum;
								for(var c=a; c<a+vnCNum; c++){
									adderArray[c] = "r0";							
								}
							}
							else{
								continue;
							}
						}
					}
					else if(vsInCheck.indexOf("r0") != -1){
						continue;
					}
					else if(vsInCheck.indexOf("c0") != -1){
						continue;
					}
					else if(vsInCheck.indexOf("r") != -1){
						var vsInRowCheck = vsInCheck.replace("r","");
						var vnRNum = parseInt(vsInRowCheck);
						if(b == 0){
							if(vnRNum+b >= voTableArray[3]){
								var vnPlusVnRNum = vnRNum + 1;
								voTotal[b][a] = "r"+vnPlusVnRNum;
								adderArray[a] = "r0";
							}
							else{
								continue;
								}
						}
						else if(b != 0){
							if(vnRNum+b-1 >= voTableArray[3]){
								var vnPlusVnRNum = vnRNum + 1;
								voTotal[b][a] = "r"+vnPlusVnRNum;
								adderArray[a] = "r0";
							}
							else{
								continue;
								}
						}
					}
					else if(vsInCheck.indexOf("c") != -1){
						continue;
					}
					else if(vsInCheck.indexOf("1") != -1){
						continue;
					}
					
				}
			}
			else if(vsCheck.indexOf("c0") != -1){
				continue;
			}
			else if(vsCheck.indexOf("r") != -1){
				var vsInRowCheck = vsCheck.replace("r","");
				var vnRNum = parseInt(vsInRowCheck);
				
				var vnPlusVnRnum = vnRNum + 1;
				
				voTotal[voTableArray[3]][a] = "r"+vnPlusVnRnum;
				adderArray[a]="r0";
			}
			else if(vsCheck.indexOf("c") != -1){
				var vsCNum = vsCheck.replace("c","");
				var vnCNum = parseInt(vsCNum);
				
				for(var k=a; k<a+vnCNum; k++){
					if(k == a){
						adderArray[k] = "c"+vnCNum;
					}
					else{
						adderArray[k] = "c0";
					}
					
				}
			}
			else if(vsCheck.indexOf("1") != -1){
				adderArray[a] = "1";
			}
			
		}
		
		voTotal.splice(voTableArray[3]+1,0,adderArray);
		
		//테이블 리셋
		$("#"+voTableArray[0]+"> tbody > tr[row="+voTableArray[3]+"]").before(vsBuffer);
		
		tableEdit.trReset(voTableArray[0]);
		
		var voTableArray2 = tableEdit.startInfo();
		
		tableEdit.Vector(voTableArray2[0],voTotal);
		
		
	}
		
	/* fn_saveClone(); */
}



/*
 * addLeft = 포커스된 행의 좌측으로 열을 추가한다.
 * */
tableEdit.addLeft = function(){
	
	debugger;
	
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
			$($("#"+voTableArray[0]+" > tbody > tr[row="+i+"] > td").eq(0)).before(vsBuffer);
		}
		tableEdit.tdReset(voTableArray[0],voTableArray[1]);
		var voTableArray2 = tableEdit.startInfo(voTableArray[0]);
		tableEdit.Vector(voTableArray2[0],voTotal);
		tableEdit.tdReset(voTableArray2[0],voTableArray2[1]);;
	}
	else if(voTableArray[4] != 0){
		
		for(var i=0; i<voTableArray[1]; i++){ //tr 열 스캔
			
			var vsCheck = voTotal[i][voTableArray[4]];
			
			if(vsCheck.indexOf(":") != -1){
				var vsInCheck = vsCheck.split(":");
				var vsRNum = vsInCheck[0];
				var vsCNum = vsInCheck[1];
					vsRNum = vsRNum.replace("r","");
					vsCNum = vsCNum.replace("c","");
				var	vnCNum = parseInt(vsCNum);
				var vnRNum = parseInt(vsRNum);
				var vnPlusVnCNum = vnCNum + 1;
				
				voTotal[i][voTableArray[4]] = "r"+vnPlusVnCNum+":"+"c"+vnCNum;
				
				for(var m=i; m<i+vnRNum; m++){
					if(m == i){
						adderArray[m]="r"+vnRNum;
					}
					else{
						adderArray[m]="r0";
					}
				}
			}
			else if(vsCheck.indexOf("r0") != -1){
				continue;
			}
			else if(vsCheck.indexOf("c0") != -1){
				for(var m=0; m<voTableArray[2]; m++){
					var vsInCheck = voTotal[i][m];
					
					if(vsInCheck.indexOf(":") != -1){
						var vsInInCheck = vsInCheck.split(":");
						var vsRNum = vsInInCheck[0];
						var vsCNum = vsInInCheck[1];
						vsRNum = vsRNum.replace("r","");
						vsCNum = vsCNum.replace("c","");
						var vnRNum = parseInt(vsRNum);
						var vnCNum = parseInt(vsCNum);
						
						if(m == 0){
							if(vnCNum+m >= voTableArray[4]){
								var vnPlusVnCNum = vnCNum + 1;
								voTotal[i][m] = "r"+vnRNum+":"+"c"+vnPlusVnCNum;
								
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
							else{
								continue;
							}
							
						}
						else if(m != 0){
							if(vnCNum+m-1 >= voTableArray[4]){
								var vnPlusVnCNum = vnCNum + 1;
								voTotal[i][m] = "r"+vnRNum+":"+"c"+vnPlusVnCNum;
								
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
							else{
								continue;
							}
							
						}
						
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
						
						if(m == 0){
							if(vnCNum+m >= voTableArray[4]){
								var vnPlusVnCNum = vnCNum + 1;
								voTotal[i][m] = "c"+vnPlusVnCNum;
								adderArray[i] = "c0";
							}
							else{
								continue;
							}
						}
						else{
							if(vnCNum+m-1 >= voTableArray[4]){
								var vnPlusVnCNum = vnCNum + 1;
								voTotal[i][m] = "c"+vnPlusVnCNum;
								adderArray[i] = "c0";
							}
							else{
								continue;
							}
						}
					}
					else if(vsInCheck.indexOf("1") != -1){
						continue;
					}
				}
			}
			else if(vsCheck.indexOf("r") != -1){
				var vsRNum = vsCheck.replace("r","");
				var vnRNum = parseInt(vsRNum);
				
				for(var m=i; m<i+vnRNum; m++){
					if(m == i){
						adderArray[m] = "r"+vnRNum;
					}
					else{
						adderArray[m] = "r0";
					}
				}
			}
			else if(vsCheck.indexOf("c") != -1){
				adderArray[i] = "1";
			}
			else if(vsCheck.indexOf("1") != -1){
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
		
		tableEdit.tdReset(voTableArray2[0],voTableArray2[1]);	
	}
	
/* fn_saveClone(); */

}
	

/*
 * addRight = 포커스된 행의 우측으로 열을 추가한다.
 * */
tableEdit.addRight = function(){
	
	debugger;
	
	var voTableArray = tableEdit.startInfo();
	
	var vsBuffer = tableEdit.RowBuffer(voTableArray);
	
	var voTotal = new Array();
	for(var i=0; i<voTableArray[1]; i++){
		voTotal[i] = new Array();
	}
		
	voTotal = tableEdit.SpanInfo(voTableArray);
	
	var adderArray = [];
	
	if(voTableArray[4] == voTableArray[2]-1){
		for(var i=0; i<voTableArray[1]; i++){
			$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td:last").after(vsBuffer);
		}
		tableEdit.tdReset(voTableArray[0],voTableArray[1]);
		var voTableArray2 = tableEdit.startInfo(voTableArray[0]);
		tableEdit.Vector(voTableArray2[0],voTotal);
		tableEdit.tdReset(voTableArray2[0],voTableArray2[1]);
	}
	else if(voTableArray[4] != voTableArray[2]-1){
		
		for(var i=0; i<voTableArray[1]; i++){
			var vsCheck = voTotal[i][voTableArray[4]];
			
			if(vsCheck.indexOf(":") != -1){
				var vsInCheck = vsCheck.split(":");
				var vsRNum = vsInCheck[0];
				var vsCNum = vsInCheck[1];
					vsRNum = vsRNum.replace("r","");
					vsCNum = vsCNum.replace("c","");
				var	vnCNum = parseInt(vsCNum);
				var vnRNum = parseInt(vsRNum);
				var vnPlusVnCNum = vnCNum + 1;
				
				voTotal[i][voTableArray[4]] = "r"+vnRNum+":"+"c"+vnPlusVnCNum;
				
				for(var m=i; m<i+vnRNum; m++){
					if(m == i){
						adderArray[m]="c0";
					}
					else{
						adderArray[m]="r0";
					}
				}
			}
			else if(vsCheck.indexOf("r0") != -1){
				continue;
			}
			else if(vsCheck.indexOf("c0") != -1){
				for(var m=0; m<voTableArray[2]; m++){
					var vsInCheck = voTotal[i][m];
					
					if(vsInCheck.indexOf(":") != -1){
						var vsInInCheck = vsInCheck.split(":");
						var vsRNum = vsInInCheck[0];
						var vsCNum = vsInInCheck[1];
						vsRNum = vsRNum.replace("r","");
						vsCNum = vsCNum.replace("c","");
						var vnRNum = parseInt(vsRNum);
						var vnCNum = parseInt(vsCNum);
						
						if(m == 0){
							if(vnCNum+m >= voTableArray[4]){
								var vnPlusVnCNum = vnCNum + 1;
								voTotal[i][m] = "r"+vnRNum+":"+"c"+vnPlusVnCNum;
								
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
							else{
								continue;
							}
							
						}
						else if(m != 0){
							if(vnCNum+m-1 >= voTableArray[4]){
								var vnPlusVnCNum = vnCNum + 1;
								voTotal[i][m] = "r"+vnRNum+":"+"c"+vnPlusVnCNum;
								
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
							else{
								continue;
							}
							
						}
					}
					else if(vsInCheck.indexOf("r0") != -1){
						continue;
					}
					else if(vsInCheck.indexOf("c0") != -1){
						continue;	
					}
					else if(vsInCheck.indexOf("c") != -1){
						var vsCNum = vsInCheck.replace("c","");
						var vnCNum = parseInt(vsCNum);
						
						if(m == 0){
							if(vnCNum+m >= voTableArray[4]){
								var vnPlusVnCNum = vnCNum + 1;
								voTotal[i][m] = "c"+vnPlusVnCNum;
								adderArray[i] = "c0";
							}
							else{
								continue;
							}
						}
						else{
							if(vnCNum+m-1 >= voTableArray[4]){
								var vnPlusVnCNum = vnCNum + 1;
								voTotal[i][m] = "c"+vnPlusVnCNum;
								adderArray[i] = "c0";
							}
							else{
								continue;
							}
						}
					}
					else if(vsInCheck.indexOf("r") != -1){
						continue;
					}
					else if(vsInCheck.indexOf("1") != -1){
						continue;
					}
				}
			}
			else if(vsCheck.indexOf("r") != -1){
				var vsRNum = vsCheck.replace("r","");
				var vnRNum = parseInt(vsRNum);
				
				for(var m=i; m<i+vnRNum; m++){
					if(m == i){
						adderArray[m] = "r"+vnRNum;
					}
					else{
						adderArray[m] = "r0";
					}
				}
			}
			else if(vsCheck.indexOf("c") != -1){
				var vsCNum = vsCheck.replace("c","");
				var vnCNum = parseInt(vsCNum);
				
				var vnPlusVnCNum = vnCNum + 1;
				
				voTotal[i][voTableArray[4]] = "c"+vnPlusVnCNum;
				adderArray[i]="c0";
				
				
			}
			else if(vsCheck.indexOf("1") != -1){
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
		
		tableEdit.tdReset(voTableArray2[0],voTableArray2[1]);
	}
	/* fn_saveClone(); */
	
}



/*
 * deleteNode = 삭제 메소드 분기 호출 
 * */

tableEdit.deleteNode = function(param){
	
	debugger;
	
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
		
		if(check == 1){
			tableEdit.dragColDelete();
		}
		else if(check == 2){
			tableEdit.dragRowDelete();
		}
		
		
	}
}


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
	
	
	if(check == 1){ // 행
		
		for(var i=0; i<voTableArray[2]; i++){
			
			var vsCheck = voTotal[voTableArray[3]][i];
			
			if(vsCheck.indexOf(":") != -1){
				var vsInCheck = vsCheck.split(":");
				var vsRNum = vsInCheck[0];
				var vsCNum = vsInCheck[1];
					vsRNum = vsRNum.replace("r","");
					vsCNum = vsCNum.replace("c","");
				var	vnCNum = parseInt(vsCNum);
				var vnRNum = parseInt(vsRNum);
				
				var minusVnRNum = vnRNum - 1;
				
				for(var a=voTableArray[3]; a<voTableArray[3]+vnRNum; a++){
					for(var b=i; b<i+vnCNum; b++){
						if(a == voTableArray[3]){
							voTotal[a][b]="d";
						}
						else if(a == voTableArray[3]+1 && b==i){
							voTotal[a][b] = "r"+minusVnRNum+":"+"c"+vnCNum;
						}
						else if(a == voTableArray[3]+1){
							voTotal[a][b] = "c0";
						}
						else{
							voTotal[a][b] = "r0";
						}
					}					
				}
				
			}
			else if(vsCheck.indexOf("r0") != -1){
				for(var a=0; a<voTableArray[1]; a++){
					var vsInCheck = voTotal[a][i];
					
					if(vsInCheck.indexOf(":") != -1){
						var vsInInCheck = vsInCheck.split(":");
						var vsRNum = vsInInCheck[0];
						var vsCNum = vsInInCheck[1];
							vsRNum = vsRNum.replace("r","");
							vsCNum = vsCNum.replace("c","");
						var	vnCNum = parseInt(vsCNum);
						var vnRNum = parseInt(vsRNum);
						var minusVnRNum = vnRNum -1;
						
					
							if(vnRNum+a-1 >= voTableArray[3]){
								voTotal[a][i] = "r"+minusVnRNum+":"+"c"+vnCNum;
								
								for(var b=i; b<i+vnCNum; b++){
									voTotal[voTableArray[3]][b] = "d";
								}
								
								break;
							}
							else{
								continue;
							}
						
					
					}
					else if(vsInCheck.indexOf("c0") != -1){
						continue;
					}
					else if(vsInCheck.indexOf("r") != -1){
						var vsRNum = vsInCheck.replace("r","");
						var vnRNum = parseInt(vsRNum);
						var minusVnRNum = vnRNum - 1;
						
						
							if(vnRNum+a-1 >= voTableArray[3]){
								voTotal[a][i] = "r"+minusVnRNum;
								voTotal[voTableArray[3]][i] = "d";
								break;
							}
							else{
								continue;
							}
						
					}
					else if(vsInCheck.indexOf("c") != -1){
						continue;
					}
					else if(vsInCheck.indexOf("1") != -1){
						continue;
					}
					else if(vsInCheck.indexOf("d") != -1){
						continue;
					}
				}
				
			}
			else if(vsCheck.indexOf("c0") != -1){
				continue;
			}
			else if(vsCheck.indexOf("r") != -1){
				var vsRNum = vsCheck.replace("r","");
				var vnRNum = parseInt(vsRNum);
				var minusVnRNum = vnRNum - 1;
				
				for(var a=voTableArray[3]; a<voTableArray[3]+vnRNum; a++){
					if(a == voTableArray[3]){
						voTotal[a][i] = "d";
					}
					else if(a == voTableArray[3]+1){
						voTotal[a][i]="r"+minusVnRNum;
					}
					else{
						voTotal[a][i]="r0";
					}
				}
			}
			else if(vsCheck.indexOf("c") != -1){
				var vsCNum = vsCheck.replace("c","");
				var vnCNum = parseInt(vsCNum);
				for(var a=i; a<i+vnCNum; a++){
					voTotal[voTableArray[3]][a] = "d";
				}
			}
			else if(vsCheck.indexOf("1") != -1){
				voTotal[voTableArray[3]][i] = "d";
			}
			else if(vsCheck.indexOf("d") != -1){
				continue;
			}
			
		}
		
		tableEdit.Vector(voTableArray[0], voTotal);
		
		$("#"+voTableArray[0]+" > tbody > tr[row="+voTableArray[3]+"]").remove();
		
		tableEdit.trReset(voTableArray[0]);
		tableEdit.tdReset(voTableArray[0],voTableArray[1]);
		
	}
	else if(check == 2){ // 열 
		
		for(var i=0; i<voTableArray[1]; i++){
			
			var vsCheck = voTotal[i][voTableArray[4]];
			
			if(vsCheck.indexOf(":") != -1){
				var vsInCheck = vsCheck.split(":");
				var vsRNum = vsInCheck[0];
				var vsCNum = vsInCheck[1];
					vsRNum = vsRNum.replace("r","");
					vsCNum = vsCNum.replace("c","");
				var	vnCNum = parseInt(vsCNum);
				var vnRNum = parseInt(vsRNum);
				
				var minusVnCNum = vnCNum - 1;
				
				for(var a=i; a<i+vnRNum; a++){
					voTotal[a][voTableArray[4]] = "d";
				}
				
				if(minusVnCNum > 1){
					voTotal[i][voTableArray[4]+1] = "r"+vnRNum+":"+"c"+minusVnCNum;
				}
				else{
					voTotal[i][voTableArray[4]+1] = "r"+vnRNum;
				}
				
			}
			else if(vsCheck.indexOf("r0") != -1){
				continue;
			}
			else if(vsCheck.indexOf("c0") != -1){
				for(var a=0; a<voTableArray[2]; a++){
					var vsInCheck = voTotal[i][a];
					
					if(vsInCheck.indexOf(":") != -1){
						var voCheck = vsInCheck.split(":");
						var vsRNum = voCheck[0];
						var vsCNum = voCheck[1];
						var vnRNum = parseInt(vsRNum.replace("r",""));
						var vnCNum = parseInt(vsCNum.replace("c",""));
						var vnCNumMin = vnCNum-1;
						
						if(vnCNum + a -1 >= voTableArray[4]){
							voTotal[i][a] = "r"+vnRNum+":"+"c"+vnCNumMin;
							for(var b=i; b<i+vnRNum; b++){
								voTotal[b][voTableArray[4]] = "d";
							}
							break;
						}
						else {
							continue;
						}
						
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
						var minusVnCNum = vnCNum - 1;
						
							if(vnCNum+a-1 >= voTableArray[4]){
								voTotal[i][a] = "c"+minusVnCNum;
								voTotal[i][voTableArray[4]]="d";
								break;
							}
							else{
								continue;
							}
						
					}
					else if(vsInCheck.indexOf("1") != -1){
						continue;
					}
					else if(vsInCheck.indexOf("d") != -1){
						continue;
					}
				}
			}
			else if(vsCheck.indexOf("r") != -1){
				var vsRNum = vsCheck.replace("r","");
				var vnRNum = parseInt(vsRNum);
				
				for(var a=i; a<i+vnRNum; a++){
					voTotal[a][voTableArray[4]] = "d";
				}
				
			}
			else if(vsCheck.indexOf("c") != -1){
				var vsCNum = vsCheck.replace("c","");
				var vnCNum = parseInt(vsCNum);
				var minusVnCNum = vnCNum - 1;
		
				voTotal[i][voTableArray[4]]="d";
				
				if(minusVnCNum >1){
					voTotal[i][voTableArray[4]+1]="c"+minusVnCNum;
				}
				else{
					voTotal[i][voTableArray[4]+1] = "1";
				}
				
			}
			else if(vsCheck.indexOf("1") != -1){
				voTotal[i][voTableArray[4]] = "d";
			}
			else if(vsCheck.indexOf("d") != -1){
				continue;
			}
			
		}
		
	
		tableEdit.Vector(voTableArray[0], voTotal);
		
		for(var i=0; i<voTableArray[1]; i++){
			$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+voTableArray[4]+"]").remove();
		
		
		tableEdit.trReset(voTableArray[0]);
		tableEdit.tdReset(voTableArray[0],voTableArray[1]);
		
		}
}
}

/*
 * colSpanDelete : 단칸 셀 지정으로 행 / 열 삭제
 * 
 * @parameter
 * 	- check : 행 or 열
 *  - FocusCol : focus cell의 colSpan
 * */
tableEdit.colSpanDelete = function(check , FocusCol){
	
	debugger;
	
	var focusCol = parseInt(FocusCol);
	
	var voTableArray = tableEdit.startInfo();
	
	var voTotal = new Array();
	for(var i=0; i<voTableArray[i]; i++){
		voTotal[i] = new Array();
	}
	
	voTotal = tableEdit.SpanInfo(voTableArray);
	
	if(check == 1){ // colSpan 있는 행
		
		for(var i=0; i<voTableArray[2]; i++){
			var vsCheck = voTotal[voTableArray[3]][i];
			
			if(vsCheck.indexOf(":") != -1){
				var vsInCheck = vsCheck.split(":");
				var vsRNum = vsInCheck[0];
				var vsCNum = vsInCheck[1];
					vsRNum = vsRNum.replace("r","");
					vsCNum = vsCNum.replace("c","");
				var	vnCNum = parseInt(vsCNum);
				var vnRNum = parseInt(vsRNum);
				
				var minusVnRNum = vnRNum - 1;
				
				for(var a=voTableArray[3]; a<voTableArray[3]+vnRNum; a++){
					for(var b=i; b<i+vnCNum; b++){
						if(a == voTableArray[3]){
							voTotal[a][b]="d";
						}
						else if(a == voTableArray[3]+1 && b==i){
							voTotal[a][b] = "r"+minusVnRNum+":"+"c"+vnCNum;
						}
						else if(a == voTableArray[3]+1){
							voTotal[a][b] = "c0";
						}
						else{
							voTotal[a][b] = "r0";
						}
					}					
				}
			}
			else if(vsCheck.indexOf("r0") != -1){
				for(var a=0; a<voTableArray[1]; a++){
					var vsInCheck = voTotal[a][i];
					
					if(vsInCheck.indexOf(":") != -1){
						var vsInInCheck = vsInCheck.split(":");
						var vsRNum = vsInInCheck[0];
						var vsCNum = vsInInCheck[1];
							vsRNum = vsRNum.replace("r","");
							vsCNum = vsCNum.replace("c","");
						var	vnCNum = parseInt(vsCNum);
						var vnRNum = parseInt(vsRNum);
						var minusVnRNum = vnRNum -1;
						
						
							if(vnRNum+a-1 >= voTableArray[3]){
								voTotal[a][i] = "r"+minusVnRNum+":"+"c"+vnCNum;
								
								for(var b=i; b<i+vnCNum; b++){
									voTotal[voTableArray[3]][b] = "d";
								}
								
								break;
							}
							else{
								continue;
							}
						
						
					}
					else if(vsInCheck.indexOf("r0") != -1){
						continue;
					}
					else if(vsInCheck.indexOf("c0") != -1){
						continue;					
					}
					else if(vsInCheck.indexOf("r") != -1){
						var vsRNum = vsInCheck.replace("r","");
						var vnRNum = parseInt(vsRNum);
						var minusVnRNum = vnRNum - 1;
						
						
							if(vnRNum+a >= voTableArray[3]){
								voTotal[a][i] = "r"+minusVnRNum;
								voTotal[voTableArray[3]][i] = "d";
								break;
							}
							else{
								continue;
							}
						
					}
					else if(vsInCheck.indexOf("c") != -1){
						continue;
					}
					else if(vsInCheck.indexOf("1") != -1){
						continue;
					}
					else if(vsInCheck.indexOf("d") != -1){
						continue;
					}
				}
			}
			else if(vsCheck.indexOf("c0") != -1){
				continue;			
			}
			else if(vsCheck.indexOf("r") != -1){
				var vsRNum = vsCheck.replace("r","");
				var vnRNum = parseInt(vsRNum);
				var minusVnRNum = vnRNum - 1;
				
				if(minusVnRNum > 1){
					for(var a=voTableArray[3]; a<voTableArray[3]+vnRNum; a++){
						if(a == voTableArray[3]){
							voTotal[a][i] = "d";
						}
						else if(a == voTableArray[3]+1){
							voTotal[a][i] = "r"+minusVnRNum;
						}
						else{
							voTotal[a][i] = "r0";
						}
					}
				}
				else{
					voTotal[voTableArray[3]][i] = "d";
					voTotal[voTableArray[3]+1][i] = "1";
				}
			}
			else if(vsCheck.indexOf("c") != -1){
				var vsCNum = vsCheck.replace("c","");
				var vnCNum = parseInt(vsCNum);
				
				for(var a=i; a<i+vnCNum; a++){
					voTotal[voTableArray[3]][a] = "d";
				}
			}
			else if(vsCheck.indexOf("1") != -1){
				voTotal[voTableArray[3]][i] = "d";
			}
			else if(vsCheck.indexOf("d") != -1){
				continue;
			}
			
		}
		
		tableEdit.Vector(voTableArray[0], voTotal);
		
		$("#"+voTableArray[0]+" > tbody > tr[row="+voTableArray[3]+"]").remove();
		
		tableEdit.trReset(voTableArray[0]);
		tableEdit.tdReset(voTableArray[0],voTableArray[1]);
		
	}
	else if(check == 2){ // colSpan 있는 열
		
		for(var i=0; i<voTableArray[1]; i++){
			for(var j=voTableArray[4]; j<voTableArray[4]+focusCol; j++){
				var vsCheck = voTotal[i][j];
				
				if(vsCheck.indexOf(":") != -1){
					var vsInCheck = vsCheck.split(":");
					var vsRNum = vsInCheck[0];
					var vsCNum = vsInCheck[1];
						vsRNum = vsRNum.replace("r","");
						vsCNum = vsCNum.replace("c","");
					var	vnCNum = parseInt(vsCNum);
					var vnRNum = parseInt(vsRNum);
					/* 들어오는 것 부터 확인한 후 
					 * 나가는지 들어와서 멈추는지 확인해야함. */
					
					if(j+vnCNum-1 > voTableArray[4]+focusCol-1){ // inout
						var count = 0;
						var fixerC = 0;
						var fixerR = 0;
						for(var a=i; a<i+vnRNum; a++){
							for(var b=j; b<j+vnCNum; b++){
								if(b > voTableArray[4]+focusCol-1){
									count += 1;
									if(fixerC == 0 && fixerR == 0){
										fixerC = b;
										fixerR = a;
									}
								}
							}
						}
						
						var total = count/vnRNum;
						
						if(total>1){
							voTotal[fixerR][fixerC] = "r"+vnRNum+":"+"c"+total;
						}
						else{
							voTotal[fixerR][fixerC] = "r"+vnRNum;
						}
						
					}
					else if(j+vnCNum-1 <= voTableArray[4]+focusCol-1){
						for(var a=i; a<i+vnRNum; a++){
							for(var b=j; b<j+vnCNum; b++){
								voTotal[a][b]="d";
							}
						}
					}
					
					
				}
				else if(vsCheck.indexOf("r0") != -1){
					continue;
				}
				else if(vsCheck.indexOf("c0") != -1){
					for(var a=0; a<voTableArray[2]; a++){
						var vsInCheck = voTotal[i][a];
						
						if(vsInCheck.indexOf(":") != -1){
							var vsInInCheck = vsInCheck.split(":");
							var vsRNum = vsInInCheck[0];
							var vsCNum = vsInInCheck[1];
								vsRNum = vsRNum.replace("r","");
								vsCNum = vsCNum.replace("c","");
							var	vnCNum = parseInt(vsCNum);
							var vnRNum = parseInt(vsRNum);
							/* 들어오는 것 부터 확인한 후 
							 * 나가는지 들어와서 멈추는지 확인해야함. */
							
							
							if(a+vnCNum-1 >= voTableArray[4]){ // in
								if(a+vnCNum-1 > voTableArray[4]+focusCol-1){ // inout
									var count = 0;
									var fixer = 0;
									
									for(var m=i; m<i+vnRNum; m++){
										for(var n=a; n<a+vnCNum; n++){
											if(n < voTableArray[4]){
												count += 1;
												if(fixer == 0){
													fixer = m;
												}
											}
											else if(n >= voTableArray[4] && n <= voTableArray[4]+focusCol-1){
												voTotal[m][n]="d";
											}
											else if(n > voTableArray[4]+focusCol-1){
												count += 1;
											}
										}
									}
									
									var total = count/vnRNum;
									
									if(total>1){
										voTotal[fixer][a] = "r"+vnRNum+":"+"c"+total;
									}
									else{
										voTotal[fixer][a] = "r"+vnRNum;
									}
									
								}
								else if(a+vnCNum-1 <= voTableArray[4]+focusCol-1){ // in end
									var count = 0;
									var fixer = 0;
									
									for(var m=i; m<i+vnRNum; m++){
										for(var n=a; n<a+vnCNum; n++){
											if(n < voTableArray[4]){
												count += 1;
												if(fixer == 0){
													fixer = m;
												}
											}
											else if(n >= voTableArray[4] && n <= voTableArray[4]+focusCol-1){
												voTotal[m][n]="d";
											}
										}
									}
									
									var total = count/vnRNum;
									
									if(total>1){
										voTotal[fixer][a] = "r"+vnRNum+":"+"c"+total;
									}
									else{
										voTotal[fixer][a] = "r"+vnRNum;
									}
							}
							
							}
							else{
								continue;
							}
							
							
							
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
							
							var vnStub = 0;
							
							if(voTableArray[4] == 0){
								vnStub = voTableArray[4]+focusCol;
							}
							else{
								vnStub = voTableArray[4]+focusCol-1;
							}
							
								if(a+vnCNum-1 >= voTableArray[4]){ // 범위 진입
									if(a+vnCNum-1 <= vnStub){ // 범위 내
										var count = 0;
										var fixer = 0;
										for(var b=a; b<a+vnCNum; b++){
											if(b < voTableArray[4]){
												count += 1;
												if(fixer == 0){
													fixer = a;
												}
											}
											else if(voTableArray[4] <= b && b <= vnStub){
												voTotal[i][b]="d";
												
											}	
										}
										
										if(count>1){
											voTotal[i][fixer] = "c"+count; 
										}
										else{
											voTotal[i][fixer] = "1";
										}
										
									}
									else if(a+vnCNum-1 > vnStub){ // 범위 외
										var beforeCount = 0;
										var afterCount = 0;
										var beforeFixer = 0;
										var afterFixer = 0;
										
										for(var b=a; b<a+vnCNum; b++){
											if(b < voTableArray[4]){
												beforeCount += 1;
												if(beforeFixer == 0){
													beforeFixer = b;
												}
											}
											else if(voTableArray[4] <= b && b<= vnStub){
												voTotal[i][b]="d";
											}
											else if(b > vnStub){
												afterCount += 1;
												if(afterFixer == 0){
													afterFixer = b;
												}
											}
										}
										
										if(beforeCount>1){
											voTotal[i][beforeFixer] = "c"+beforeCount;
										}
										else{
											voTotal[i][beforeFixer] = "1";
										}
										
										if(afterCount>1){
											voTotal[i][afterFixer] = "c"+afterCount;
										}
										else{
											voTotal[i][afterFixer] = "1";
										}
										
								}
								else{
									continue;
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
				}
				else if(vsCheck.indexOf("r") != -1){
					var vsRNum = vsCheck.replace("r","");
					var vnRNum = parseInt(vsRNum);
					
					for(var a=i; a<i+vnRNum; a++){
						voTotal[a][j] = "d";
					}
				}
				else if(vsCheck.indexOf("c") != -1){
					var vsCNum = vsCheck.replace("c","");
					var vnCNum = parseInt(vsCNum);
					
						var count = 0;
						var fixer = 0;
						
						for(var a=j; a<j+vnCNum; a++){
							if(a <= voTableArray[4]+focusCol-1){
								voTotal[i][a]="d";
							}
							else{
								count += 1;
								if(fixer == 0){
									fixer = a;
								}
							}
						}
						
						if(count>1){
							voTotal[i][fixer] = "c"+count;
						}
						else{
							voTotal[i][fixer] = "1";
						}
				}
				else if(vsCheck.indexOf("1") != -1){
					voTotal[i][j] = "d";
				}
				else if(vsCheck.indexOf("d") != -1){
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
		
	} //check == 2 end
}


/*
 * rowSpanDelete = rowSpan보유 셀 선택 후 삭제 시 행과 열을 삭제
 * 
 * 
 * 
 * 
 * */
tableEdit.rowSpanDelete = function(check, FocusRow){
	
	
	
	var focusRow = parseInt(FocusRow);
	
	var voTableArray = tableEdit.startInfo();
	
	var voTotal = new Array();
	for(var i=0; i<voTableArray[1]; i++){
		voTotal[i] = new Array();
	}
	
	voTotal = tableEdit.SpanInfo(voTableArray);	
	debugger; 
	if(check == 1){ // 행
		
		for(var i=voTableArray[3]; i<voTableArray[3]+focusRow; i++){ //tr rowSpan까지
			for(var j=0; j<voTableArray[2]; j++){ // td 전체
				var vsCheck = voTotal[i][j];
				
				if(vsCheck.indexOf(":") != -1){
					var vsInCheck = vsCheck.split(":");
					var vsRNum = vsInCheck[0];
					var vsCNum = vsInCheck[1];
						vsRNum = vsRNum.replace("r","");
						vsCNum = vsCNum.replace("c","");
					var vnRNum = parseInt(vsRNum);
					var vnCNum = parseInt(vsCNum);
					var count = 0;
					var fixer = 0;
					
					/* 범위 */
					for(var a=i; a<i+vnRNum; a++){
						for(var b=j; b<j+vnCNum; b++){
							if(a >= voTableArray[3] && a <= voTableArray[3]+focusRow-1){
								voTotal[a][b]="d";
							}
							else if(a > voTableArray[3]+focusRow-1){
								voTotal[a][b]="r0";
								count += 1;
								if(fixer == 0){
									fixer = a;
								}
							}
						}
					}
					
					var total = count/vnCNum;
					
					if(total>1){
						voTotal[fixer][j]="r"+total+":"+"c"+vnCNum;
					}
					else{
						voTotal[fixer][j]="c"+vnCNum;
					}
	
					
				}
				else if(vsCheck.indexOf("r0") != -1){
					for(var a=0; a<voTableArray[1]; a++){
						var vsInCheck = voTotal[a][j];
						
						if(vsInCheck.indexOf(":") != -1){
							var vsInInCheck = vsInCheck.split(":");
							var vsRNum = vsInInCheck[0];
							var vsCNum = vsInInCheck[1];
								vsRNum = vsRNum.replace("r","");
								vsCNum = vsCNum.replace("c","");
							var vnRNum = parseInt(vsRNum);
							var vnCNum = parseInt(vsCNum);
							var count = 0;
							
								if(a+vnRNum-1 >= voTableArray[3]){
									for(var b=a; b<a+vnRNum; b++){
										if(b >= voTableArray[3]){
											for(var c=j; c<j+vnCNum; c++){
												voTotal[b][c]="d";
												count += 1;
											}
										}
									}
									
									var total = count/vnRNum;
									
									if(total>1){
										voTotal[a][j]="r"+total+":"+"c"+vnCNum;
									}
									else{
										voTotal[a][j]="c"+vnCNum;
									}
								}
							
							
						}
						else if(vsInCheck.indexOf("r0") != -1){
							continue;
						}
						else if(vsInCheck.indexOf("c0") != -1){
							continue;
						}
						else if(vsInCheck.indexOf("r") != -1){
							var vsRNum = vsInCheck.replace("r","");
							var vnRNum = parseInt(vsRNum);
							
								if(a+vnRNum-1 >= voTableArray[3]){
									if(a+vnRNum-1 > voTableArray[3]+focusRow-1){ // 범위 초과
										var beforeCount = 0;
										var afterCount = 0;
										var beforeFixer = 0;
										var afterFixer = 0;
										
										for(var b=a; b<a+vnRNum; b++){
											if(b < voTableArray[3]){
												beforeCount += 1;
												if(beforeFixer == 0){
													beforeFixer = b;
												}
											}
											else if(b >= voTableArray[3] && b <= voTableArray[3]+focusRow-1){
												voTotal[b][j] = "d";
											}
											else if(b > voTableArray[3]+focusRow-1){
												afterCount += 1;
												if(afterFixer == 0){
													afterFixer = b;
												}
											}
										}
										
										if(beforeCount > 1){
											voTotal[beforeFixer][j]="r"+beforeCount;
										}
										else{
											voTotal[beforeFixer][j]="1";
										}
										if(afterCount > 1){
											voTotal[afterFixer][j]="r"+afterCount;
										}
										else{
											voTotal[afterFixer][j]="1";
										}
										
										
									}
									else if(a+vnRNum-1 <= voTableArray[3]+focusRow-1){ // 범위 내
										var count = 0;
										var fixer = 0;
										
										for(var b=a; b<a+vnRNum; b++){
											if(b < voTableArray[3]){
												count += 1;
												if(fixer == 0){
													fixer = b;
												}
											}
											else if(b >= voTableArray[3] && b <= voTableArray[3]+focusRow-1){
												voTotal[b][j]="d";
											}
										}
										
										if(count>1){
											voTotal[fixer][j]="r"+count;
										}
										else{
											voTotal[fixer][j]="1";
										}
										
									}
								}
								else{
									continue;
								}
							
							
						}
						else if(vsInCheck.indexOf("c") != -1){
							continue;
						}
						else if(vsInCheck.indexOf("1") != -1){
							continue;
						}
						else if(vsInCheck.indexOf("d") != -1){
							continue;
						}
						
					}
				}
				else if(vsCheck.indexOf("c0") != -1){
					continue;
				}
				else if(vsCheck.indexOf("r") != -1){
					var vsRNum = vsCheck.replace("r","");
					var vnRNum = parseInt(vsRNum);
					
					if(i == 0){
						if(i+vnRNum > voTableArray[3]+focusRow-1){ // 범위 초과
							for(var a=i; a<i+vnRNum; a++){
								var count = 0;
								var fixer = 0;
								for(var a=i; a<i+vnRNum; a++){
									if(a <= voTableArray[3]+focusRow-1){
										voTotal[a][j]="d";
									}
									else if(a > voTableArray[3]+focusRow-1){
										count += 1;
										if(fixer == 0){
											fixer = a;
										}
									}
								}
								
								if(count > 1){
									voTotal[fixer][j] = "r"+count;
								}
								else{
									voTotal[fixer][j] = "1";
								}
							}
						}
						else if(i+vnRNum <= voTableArray[3]+focusRow-1){ // 범위 내
							for(var a=i; a<i+vnRNum; a++){
								voTotal[a][j]="d";
							}
						}
					}
					else if(i != 0){
						if(i+vnRNum-1 > voTableArray[3]+focusRow-1){ // 범위 초과
							for(var a=i; a<i+vnRNum; a++){
								var count = 0;
								var fixer = 0;
								for(var a=i; a<i+vnRNum; a++){
									if(a <= voTableArray[3]+focusRow-1){
										voTotal[a][j]="d";
									}
									else if(a > voTableArray[3]+focusRow-1){
										count += 1;
										if(fixer == 0){
											fixer = a;
										}
									}
								}
								
								if(count > 1){
									voTotal[fixer][j] = "r"+count;
								}
								else{
									voTotal[fixer][j] = "1";
								}
							}
						}
						else if(i+vnRNum-1 <= voTableArray[3]+focusRow-1){ // 범위 내
							for(var a=i; a<i+vnRNum; a++){
								voTotal[a][j]="d";
							}
						}
					}
					
					
					
					
				}
				else if(vsCheck.indexOf("c") != -1){
					var vsCNum = vsCheck.replace("c","");
					var vnCnum = parseInt(vsCNum);
					
					for(var a=j; a<j+vnCNum; a++){
						voTotal[i][a] = "d";
					}
					
				}
				else if(vsCheck.indexOf("1") != -1){
					voTotal[i][j] = "d";
				}
				else if(vsCheck.indexOf("d") != -1){
					continue;
				}
				
			}
		}
		
		console.log(voTotal);
		
		tableEdit.Vector(voTableArray[0], voTotal);
		
		for(var a=voTableArray[3]; a<voTableArray[3]+focusRow; a++){
				$("#"+voTableArray[0]+"> tbody > tr[row="+a+"]").remove();
			
		}
		
		tableEdit.trReset(voTableArray[0]);
		tableEdit.tdReset(voTableArray[0],voTableArray[1]);
		/* fn_saveClone(); */
		
	}
	else if(check == 2){ // 열
	
		for(var i=0; i<voTableArray[1]; i++){
			var vsCheck = voTotal[i][voTableArray[4]];
			
			if(vsCheck.indexOf(":") != -1){
				var vsInCheck = vsCheck.split(":");
				var vsRNum = vsInCheck[0];
				var vsCNum = vsInCheck[1];
					vsRNum = vsRNum.replace("r","");
					vsCNum = vsCNum.replace("c","");
				var vnRNum = parseInt(vsRNum);
				var vnCNum = parseInt(vsCNum);
				var count = 0;
				var fixer = 0;
				var fixercount = 0;
				for(var m=i; m<i+vnRNum; m++){
					for(var n=voTableArray[4]; n<voTableArray[4]+vnCNum; n++){
						if(n == voTableArray[4]){
							voTotal[m][n] = "d";
						}
						else{
							count += 1;
							if(fixercount == 0){
								fixer = m;
								fixercount = 1;
							}
						}
					}
				}
				
				var total = count/vnRNum;
				
				if(total>1){
					voTotal[fixer][voTableArray[4]+1] = "r"+vnRNum+":"+"c"+total;
				}
				else{
					voTotal[fixer][voTableArray[4]+1] = "r"+vnRNum;
				}
				
				console.log(voTotal);
				
			}
			else if(vsCheck.indexOf("r0") != -1){
				continue;
			}			
			else if(vsCheck.indexOf("c0") != -1){
				for(var a=0; a<voTableArray[2]; a++){
					var vsInCheck = voTotal[i][a];
					
					if(vsInCheck.indexOf(":") != -1){
						var vsInInCheck = vsInCheck.split(":");
						var vsRNum = vsInInCheck[0];
						var vsCNum = vsInInCheck[1];
							vsRNum = vsRNum.replace("r","");
							vsCNum = vsCNum.replace("c","");
						var vnRNum = parseInt(vsRNum);
						var vnCNum = parseInt(vsCNum);
						
						if(a+vnCNum-1 >= voTableArray[4]){ // in
							
							if(a+vnCNum-1 > voTableArray[4]){
								var count = 0;
								for(var m=i; m<i+vnRNum; m++){
									for(var n=a; n<a+vnCNum; n++){
										if(n < voTableArray[4]){
											count += 1;
										}
										else if(n == voTableArray[4]){
											voTotal[m][n] ="d";
										}
										else{
											count += 1;
										}
									}
								}
								
								var total = count/vnRNum;
								
								if(total>1){
									voTotal[i][a]="r"+vnRNum+":"+"c"+total;
								}
								else{
									voTotal[i][a] = "r"+vnRNum;
								}
								
							}
							else if(a+vnCNum-1 == voTableArray[4]){
								var count = 0;
								for(var m=i; m<i+vnRNum; m++){
									for(var n=a; n<a+vnCNum; n++){
										if(n == voTableArray[4]){
											voTotal[m][n] = "d";
										}
										else{
											count += 1;
										}
									}
								}
								
								var total = count/vnRNum;
								
								if(total>1){
									voTotal[i][a]="r"+vnRNum+":"+"c"+total;
								}
								else{
									voTotal[i][a] = "r"+vnRNum;
								}
							}
							
						}
						else{
							continue;
						}
						
						
						
						
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
						var minusVnCNum = vnCNum -1;
						
						
							if(a+vnCNum-1 >= voTableArray[4]){
								voTotal[i][a] = "c"+minusVnCNum;
								voTotal[i][voTableArray[4]] = "d";
							}
							else{
								continue;
							}
						
						
						
					}
					else if(vsInCheck.indexOf("1") != -1){
						continue;
					}
					else if(vsInCheck.indexOf("d") != -1){
						continue;
					}
				}
			}
			else if(vsCheck.indexOf("r") != -1){
				var vsRNum = vsCheck.replace("r","");
				var vnRNum = parseInt(vsRNum);
				
				for(var b=i; b<i+vnRNum; b++){
					voTotal[b][voTableArray[4]]="d";
				}
				
			}
			else if(vsCheck.indexOf("c") != -1){
				var vsCNum = vsCheck.replace("c","");
				var vnCNum = parseInt(vsCNum);
				
				var minusVnCNum = vnCNum -1;
				
				if(minusVnCNum > 1){
					for(var b=voTableArray[4]; b<voTableArray[4]+vnCNum; b++){
						if(b == voTableArray[4]){
							voTotal[i][b] = "d";
						}
						else if(b == voTableArray[4]+1){
							voTotal[i][b]="c"+minusVnCNum;
						}
						else{
							voTotal[i][b]="c0";
						}
					}
				}
				else{
					for(var b=voTableArray[4]; b<voTableArray[4]+vnCNum; b++){
						if(b == voTableArray[4]){
							voTotal[i][b] = "d";
						}
						else{
							voTotal[i][b] = "1";
						}
					}
				}
				
			
				
			}
			else if(vsCheck.indexOf("1") != -1){
				voTotal[i][voTableArray[4]] = "d";
			}
			else if(vsCheck.indexOf("d") != -1){
				continue;
			}	
			
			console.log(voTotal);

			
		}
		
		tableEdit.Vector(voTableArray[0], voTotal);
		
		for(var i=0; i<voTableArray[1]; i++){
			$("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+voTableArray[4]+"]").remove();
		}
		
		tableEdit.trReset(voTableArray[0]);
		tableEdit.tdReset(voTableArray[0],voTableArray[1]);
		/* fn_saveClone(); */
	}
}



tableEdit.dragColDelete = function(){
	
	debugger;
	
	var voTableArray = tableEdit.startInfo();
	
	var voTotal = new Array();
	for(var i=0; i<voTableArray[1]; i++){
		voTotal[i] = new Array();
	}
	
	voTotal = tableEdit.SpanInfo(voTableArray);	
	
	var voFocusTotal = new Array();
	for(var i=0; i<voTableArray[1]; i++){
		voFocusTotal[i] = new Array();
	}
	
	for(var i=0; i<voTableArray[1]; i++){
		for(var j=0; j<voTableArray[2]; j++){
			voFocusTotal[i][j] = $("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").attr("tablefocus");
		}
	}
	
	for(var i=0; i<voTableArray[1]; i++){
		for(var j=0; j<voTableArray[2]; j++){
			var vsCheck = voFocusTotal[i][j];
			
			if(vsCheck == "true"){
				voTotal[i][j]="d";
			}
			else{
				continue;
			}
		}
	}
	
	tableEdit.Vector(voTableArray[0], voTotal);
	
	for(var i=0; i<voTableArray[1]; i++){
		for(var j=0; j<voTableArray[2]; j++){
			var vsTotalCheck = voTotal[i][j];
			
			if(vsTotalCheck.indexOf("d") != -1){
				$("#"+voTableArray[0]+"> tbody > tr[row="+i+"]").remove();
			}
			else{
				continue;
			}
		}
	}	
	
	
	tableEdit.trReset(voTableArray[0]);
	tableEdit.tdReset(voTableArray[0],voTableArray[1]);
	/* fn_saveClone(); */
	
}

tableEdit.dragRowDelete = function(){
	
	debugger;
	
	var voTableArray = tableEdit.startInfo();
	
	var voTotal = new Array();
	for(var i=0; i<voTableArray[1]; i++){
		voTotal[i] = new Array();
	}
	
	voTotal = tableEdit.SpanInfo(voTableArray);	
	
	var voFocusTotal = new Array();
	for(var i=0; i<voTableArray[1]; i++){
		voFocusTotal[i] = new Array();
	}
	
	for(var i=0; i<voTableArray[1]; i++){
		for(var j=0; j<voTableArray[2]; j++){
			voFocusTotal[i][j] = $("#"+voTableArray[0]+"> tbody > tr[row="+i+"] > td[shell="+j+"]").attr("tablefocus");
		}
	}
	
	for(var i=0; i<voTableArray[1]; i++){
		for(var j=0; j<voTableArray[2]; j++){
			var vsCheck = voFocusTotal[i][j];
			
			if(vsCheck == "true"){
				voTotal[i][j]="d";
			}
			else{
				continue;
			}
		}
	}
	
	tableEdit.Vector(voTableArray[0], voTotal);
	
	for(var i=0; i<voTableArray[1]; i++){
		for(var j=0; j<voTableArray[2]; j++){
			var vsTotalCheck = voTotal[i][j];
			
			if(vsTotalCheck.indexOf("d") != -1){
				for(var m=0; m<voTableArray[1]; m++){
					$("#"+voTableArray[0]+"> tbody > tr[row="+m+"] > td[shell="+j+"]").remove();
				}
			}
			else{
				continue;
			}
		}
	}	
	
	
	tableEdit.trReset(voTableArray[0]);
	tableEdit.tdReset(voTableArray[0],voTableArray[1]);
	/* fn_saveClone(); */
	
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
	
	debugger;
	
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
 		 
 		 alert("단일 셀 지정 분할은 준비되지 않은 기능입니다");
 		 
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
/*			var vsBuffer = "";
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
			}*/
 	 }
}







