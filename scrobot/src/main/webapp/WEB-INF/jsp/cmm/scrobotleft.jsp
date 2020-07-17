<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>scrobot_공통사이드바</title>


<style>


#mysidenav img:hover{
	cursor:pointer;
}

/* 사이드바 스타일      */
.sidenav {
	height: 100%;
	position: fixed;
	z-index: 1;
	top: 0;
	left: 0;
	background-color: #dee5f7;
	overflow-x: hidden;
	transition: 0.5s ease-in-out;
	width: 226px;
}

#div_mainImg{
	position:relative;
	margin-top:50px;
}

#div_mainImg img:hover{
	cursor:default;
}

#div_compoTable{
	text-align:center;
}

#compoTable{
	display: inline-block;
	position:relative;
	margin-top:50px;
}

.JCLRgrip {
	cursor: ew-resize;
}


#compoTable tr{
	height :50px;
}

#compoTable td{
	width: 80px;
}

#div_cellTable{
	position:relative;
	margin-top:10px;
	text-align: center;
}

#cellTable{
	display: inline-block;
	position:relative;
	border-collapse: collapse;
}

#cellTable tr{
	height:45px;
}

#cellTable td:not(:last-child){
	border-right:1px solid grey;
}

#cellTable tr:not(:last-child){
	border-bottom:1px solid grey;
}




#div_propertyTable{
	position:relative;
	margin-top:100px;
	background-color: #bbc2d5;
	text-align: left;
	height:180px;
	
}

#div_propertyTable h4{
	position:relative;
	padding-top:10px;
}


#propertyTable{
	display:block;
	width:90%; 
	align: center;
	border-collapse: collapse;
	background-color: white;
	margin : 10px 10px 5px 10px;
	overflow:auto;
}

#propertyTable tr:not(:nth-child(6)){
	border-bottom:1px solid black;
}


#propertyTable tr td:first-child{
	border-right:1px solid black;
}

#propertyTable tr td{
	padding-left:5px;
}


#propertyTable input{
	border:none;
}

.ibx_property{
	width:125px;
	font-size:1em;
}

#btn_infoUpdate{
	margin-right:10px;
}


</style>
<script type="text/javaScript">


  fn_creationTableResize = function(ui){
	  
	  var voChild = $("#creationTable").children();
	  var voGrandChild = voChild.children();
		
		var vnTotalLeft = 0;
		var vnTotalTop = 0;
		for(var i=0; i<voChild.length; i++){
			if(voChild.eq(i).attr("id") != ""){
				var vnLeft = Number(voChild.eq(i).css("left").replace("px",""));
				var vnWidth = Number(voChild.eq(i).width());
				
				var vnTop = Number(voChild.eq(i).css("top").replace("px",""));
				var vnHeight = Number(voChild.eq(i).height());
				
				if(vnTotalLeft < vnLeft+vnWidth){
					vnTotalLeft = vnLeft+vnWidth;
				}
				
				if(vnTotalTop < vnTop+vnHeight){
					vnTotalTop = vnTop+vnHeight;
				}
				
				for(var j=0; j<voGrandChild.length; j++){
					if(voGrandChild.eq(j).attr("id") != ""){
						vnLeft = Number(voGrandChild.eq(j).css("left").replace("px",""));
						vnWidth = Number(voGrandChild.eq(j).width());
						
						vnTop = Number(voGrandChild.eq(j).css("top").replace("px",""));
						vnHeight = Number(voGrandChild.eq(j).height());
						
						if(vnTotalLeft < vnLeft+vnWidth){
							vnTotalLeft = vnLeft+vnWidth;
						}
						
						if(vnTotalTop < vnTop+vnHeight){
							vnTotalTop = vnTop+vnHeight;
						}
					}
				}
				
			}
		}
		
		if(vnTotalLeft >  $("#creationForm").width()){
			var vsFormLeft = (ui.offset.left+500)+"px";
		  var vsTableLeft = (ui.offset.left+430)+"px";
	  	  $("#creationForm").css("width",vsFormLeft);
	  	  
	  	  $("#creationTable").css("width",vsTableLeft);
	  	  
		}
		
		if(vnTotalTop+200 >  $("#creationForm").height()){
		  var vsFormTop = (ui.offset.top+600)+"px";
		  var vsTableTop = (ui.offset.top+430)+"px";
	  	  $("#creationForm").css("height",vsFormTop);
	  	  
	  	  $("#creationTable").css("height",vsTableTop);
	  	  fn_saveClone();
		}
		
	  
}
	
  /**********************************
  수정  프로세스 
  ***********************************/
  infoUpdate = function(){
  	var vsCompoId = $("#ibx_propertyTable_id").val();
  	var vsCompoClass = $("#ibx_propertyTable_class").val();
  	var vsCompoName = $("#ibx_propertyTable_name").val();
  	var vsCompoLabel = $("#ibx_propertyTable_label").val();
  	var vsCompoStyle = $("#ibx_propertyTable_style").val();
  	var vsCompoValue = $("#ibx_propertyTable_value").val();
  	var vsCompoDvs = $("#ibx_propertyTable_compoDvs").val();
  	var vsCompoRealId = $("#ibx_propertyTable_realId").val();
  	
  	var vsDvsValue = "";
  	
  	if(vsCompoRealId == ""){
  		if($("[focus=true]").length == 0){
  			vsDvsValue = "td[tableFocus=true]"
  		} else{
  			vsDvsValue = "[focus=true]";
  		}
  	} else{
  		vsDvsValue = "#"+vsCompoRealId;
  	}
  	
  	if(vsCompoDvs == "div_content"){
  		vsCompoClass += " ui-draggable ui-draggable-handle ui-resizable";
  	} else if(["div_table","inputBox","selectBox"].indexOf(vsCompoDvs) != -1){
  		vsCompoClass += " ui-draggable ui-draggable-handle";
  	}
  	
  	if(vsCompoDvs == "td"){
  		var vsTableStyle = vsCompoStyle.substr(13,vsCompoStyle.length);
  		vsTableStyle = vsTableStyle.substr(13,vsCompoStyle.length);
  		$(vsDvsValue).attr("style",vsTableStyle);
  	} else{
  		$(vsDvsValue).attr("style",vsCompoStyle);
  	}
  	
  	$(vsDvsValue).attr("class",vsCompoClass);
  	$(vsDvsValue).attr("name",vsCompoName);
  	$(vsDvsValue).attr("label",vsCompoLabel);
  	$(vsDvsValue).attr("value",vsCompoValue);
  	
  	
  		
  	if(["span_title","span_label"].indexOf(vsCompoDvs) != -1){
  		$(vsDvsValue).text(vsCompoValue);
  		fn_setTitleValueProperty(vsDvsValue,vsCompoValue);
  	}
  	
  	$(vsDvsValue).attr("id",vsCompoId);
  	
  	if(vsCompoDvs == "td"){
  		$(vsDvsValue).text(vsCompoValue);
  		var vsTrInfo = $(vsDvsValue).parent();
  		var vsTableId = vsTrInfo.parent().parent().attr("id");
  		
  		var vsShell = $(vsDvsValue).attr("shell");
  		var vsRow = $(vsDvsValue).attr("row");
  		var vnTrChildCount = $("#"+vsTableId+" tr").length
  		var vnTdChildCount = vsTrInfo.children().length
  		
  		var vnStyleLen = vsCompoStyle.length;
  		
  		var vnWidthStart = vsCompoStyle.indexOf("width")+6
  		var vsWidthSub = vsCompoStyle.substr(vnWidthStart,vnStyleLen)
  		var vnWidth = vsWidthSub.substr(0,vsWidthSub.indexOf("px;")+2);
  		
  		var vnHeightStart = vsCompoStyle.indexOf("height")+7
  		var vsHeightSub = vsCompoStyle.substr(vnHeightStart,vnStyleLen)
  		var vnHeight = vsHeightSub.substr(0,vsHeightSub.indexOf("px;")+2);
  		
  		var voheight = [];
  		var vowidth = [];
  		
  		for(var i=0; i<vnTrChildCount; i++){
  			voheight.push($("#"+vsTableId+" tr").eq(i).css("height"));
  		}
  		
  		for(var j=0; j<vnTdChildCount; j++){
  			vowidth.push(vsTrInfo.children().eq(j).css('width'));
  		}
  		
  		$("#"+vsTableId).css("height","0px");
  		$("#"+vsTableId).css("width","0px");
  		
  		
  		for(var i=0; i<vnTrChildCount; i++){
  			for(var j=0; j<$("#"+vsTableId+" tr").eq(i).children().length; j++){
  				$("#"+vsTableId+" tr").eq(i).children().eq(j).css("height",voheight[i]);
  				$("#"+vsTableId+" tr").eq(i).children().eq(j).css("width",vowidth[j]);
  			}
  			
  		}
  		
  		for(var i=0; i<vnTdChildCount; i++){
  			vsTrInfo.children().eq(i).css('height', vnHeight);
  		}
  		vsTrInfo.css("height",vnHeight);
  		
  		for(var i=0; i<vnTrChildCount; i++){
  			$("#"+vsTableId+" [shell="+vsShell+"]").eq(i).css("width",vnWidth);
  		}
  		
  		vsTrInfo.parent().parent().parent().height(vsTrInfo.parent().parent().height()+30)
  		vsTrInfo.parent().parent().parent().width(vsTrInfo.parent().parent().width()+30)
  				
  	}
  }//수정 프로세스 end



  fn_setTitleValueProperty = function(compoId,value){
  if(value == ""){
  	compoId = "";
  	return false;
  }

  $(compoId).parent().css("width","1000px");
  $(compoId).text(value);
  $(compoId).attr("value",value);

  var vnWidth = Number($(compoId).css("width").replace("px",""));
  var vnHeight = Number($(compoId).css("height").replace("px",""));
  $(compoId).parent().css("width",(vnWidth+30)+"px");
  $(compoId).parent().css("height",(vnHeight+20)+"px");

  robot.getAttr(compoId);
  voPromptObject = "";
  vsLabelYn = "N";
  }

  	
  /**********************************
  검색 프로세스 
  ***********************************/
  infoSearch = function(){
  	//vsProperty == 검색어 
  	var vsProperty = $("#Search").val();
  	var vsTrnum = $("#propertyTable tbody tr").length;
  		vsTrnum --;
  	
  	//반복문을 통해 td의 값(속성 키,값)을 가져와 JsonArray에 삽입
  	var vmObj = {};
  	
  	for(var i=0; i<vsTrnum; i++){
  		//vsKey == 속성키
  		var vsKey = $("tr[name=buffer"+i+"] > td:first").text();
  		var vsValue = $("tr[name=buffer"+i+"] > td:last > input[type=text]").val();
  		if(vsKey != null && vsValue != null){
  			if(vsKey == "id"){
  				vmObj["id"] = vsValue;	
  			}
  			if(vsKey == "class"){
  				vmObj["class"] = vsValue;	
  			}
  			if(vsKey == "name"){
  				vmObj["name"] = vsValue;	
  			}
  			if(vsKey == "label"){
  				vmObj["label"] = vsValue;	
  			}
  		}
  	}	
  	
  	// vmObj의 key값만 저장
  	var Keys = Object.keys(vmObj);
  	
  	// 키값으로 검색어 찾기 
  	for(var j=0; j<Keys.length; j++){
  		//입력값이 없을때 
  		if(vsProperty == null){
  			alert("검색어를 입력하세요");
  			break;
  		}
  		// 입력값이 테이블에 있을때 
  		if(Keys[j] == vsProperty){
  			for(var k=0; k<vsTrnum; k++){	
  				$("tr[name=buffer"+k+"]").hide();
  			}
  				$("tr[name=buffer"+j+"]").show();
  			break;
  		} 
  		
  	}		
  }//검색 프로세스 end



	
</script>

</head>

<body>
	<div id="mysidenav" class="sidenav">
		<div id="div_mainImg">
			<img src="<c:url value='/images/main_scrobot.png'/>" alt=""/>
		</div>
		<div id="div_compoTable">
			<table id="compoTable">
				<colgroup>
					<col width="100" />
					<col width="100" />
					<col width="100" />
				</colgroup>
				<tr>
					<td class="" onclick="createCompo.divCreation();">
						<img src="<c:url value='/images/object/icon_div.png'/>" title="DIV생성"/>
					</td>
					<td class="" onclick="createCompo.titleCreation();">
						<img src="<c:url value='/images/object/icon_title.png'/>" title="TITLE생성"/>
					</td>
						
					<td class="" onclick="createCompo.labelCreation();">
						<img src="<c:url value='/images/object/icon_label.png'/>" title="LABEL생성"/>
					</td>
					
				</tr>
				<tr>
					<td class="" onclick="createCompo.buttonCreation();">
						<img src="<c:url value='/images/object/icon_button.png'/>" title="버튼생성"/>
					</td>
					<td class="" onclick="createCompo.inputCreation();">
						<img src="<c:url value='/images/object/icon_input.png'/>" title="TEXT생성"/>
					</td>
					<td class="" onclick="createCompo.selectCreation();">
						<img src="<c:url value='/images/object/icon_select.png'/>" title="SELECT생성"/>
					</td>
				</tr>
	
				<tr>
					<td class="" onclick="createCompo.checkboxCreation();">checkBox</td>
					<td class="" onclick="createCompo.radioboxCreation();">radioBox</td>
					<td class="" onclick="createCompo.tableCreation();">
						<img src="<c:url value='/images/object/icon_table.png'/>" title="테이블생성"/>
					</td>
					<td class="" onclick="createCompo.queryCreation();">
						<img src="<c:url value='/images/object/icon_table.png'/>" title="테이블생성"/>
					</td>
				</tr>
			</table>
		</div>
		
		<div id="div_cellTable">
			<table id="cellTable">
				<colgroup>
					<col width="50" />
					<col width="50" />
					<col width="50" />
				</colgroup>

				<tr>
				   
					<td class="" onclick="tableEdit.addUp();">
						<img src="<c:url value='/images/object/icon_row_up.png'/>" title="위로 행 추가"/>
					</td>
					<td class="" onclick="tableEdit.addDown();">
						<img src="<c:url value='/images/object/icon_row_down.png'/>" title="아래 행 추가"/>
					</td>
					<td class="" onclick="tableEdit.deleteNode(1);">
						<img src="<c:url value='/images/object/icon_row_del.png'/>" title="행삭제"/>
					</td>
				</tr>
				<tr>
					<td class="" onclick="tableEdit.addLeft();">
						<img src="<c:url value='/images/object/icon_col_left.png'/>" title="좌로 열 추가"/>
					</td>
					<td class="" onclick="tableEdit.addRight();">
						<img src="<c:url value='/images/object/icon_col_right.png'/>" title="우로 열 추가"/>
					</td>
					<td class="" onclick="tableEdit.deleteNode(2);">
						<img src="<c:url value='/images/object/icon_col_del.png'/>" title="열삭제"/>
					</td>	
				</tr>
				<tr>
					<td class="" onclick="tableEdit.Merge();">
						<img src="<c:url value='/images/object/icon_cell_with.png'/>" title="병합"/>
					</td>
					<td class="" onclick="tableEdit.Divide();">
						<img src="<c:url value='/images/object/icon_cell_division.png'/>" title="분할"/>
					</td>
					<td class="">
					</td>
	
				</tr>
			</table>
		</div>
		
		<div id="div_propertyTable">
			<h4>◎ Property</h4>
			<table id="propertyTable">
				<tbody>
					<tr>
						<td>id</td>
						<td><input type=text class="ibx_property" id="ibx_propertyTable_id" value="" ></input></td>
					</tr>
					<tr>
						<td>class</td>
						<td><input type=text class="ibx_property" id="ibx_propertyTable_class" value=""></input></td>
					</tr>
					<tr>
						<td>name</td>
						<td><input type=text class="ibx_property" id="ibx_propertyTable_name" value=""></input></td>
					</tr>
					<tr>
						<td>label</td>
						<td><input type=text class="ibx_property" id="ibx_propertyTable_label" value=""></input></td>
					</tr>
					<tr>
						<td>style</td>
						<td><input type=text class="ibx_property" id="ibx_propertyTable_style" value=""></input></td>
					</tr>
					<tr>
						<td>value&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
						<td><input type=text class="ibx_property" id="ibx_propertyTable_value" value=""></input></td>
					</tr>
					<tr style="display:none;">
						<td><input type=hidden id="ibx_propertyTable_compoDvs" value=""></input></td>
						<td><input type=hidden id="ibx_propertyTable_realId" value=""></input></td>
						
					</tr>
				</tbody>
				
			</table>
			<div style="text-align: right;">
				<input type="button" id="btn_infoUpdate" onclick="infoUpdate();" value="수정" style="display:none;"></input>
			</div>
		</div>
	</div>

</body>
</html>