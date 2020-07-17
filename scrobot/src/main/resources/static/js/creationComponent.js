createCompo = {};


/* checkBox 만들기 */
createCompo.checkboxCreation = function(){
	var info = {"header" : "checkBox",
		    "width"  : "700px",
		    "height" : "500px",
		    "callBack" : "callBack.boxCreationCallBack"
		   }
	
	robot.openPop(info, "view010101P10.jsp");		
}

/* radioBox 만들기 */
createCompo.radioboxCreation = function(){
	var info = {"header" : "radioBox",
		    "width"  : "700px",
		    "height" : "500px",
		    "callBack" : "callBack.boxCreationCallBack"
		   }
	
	robot.openPop(info, "view010101P11.jsp");	
}

/* select박스 그리기 */
createCompo.selectCreation = function(){
	var info = {"header" : "selectBox",
		    "width"  : "700px",
		    "height" : "500px",
		    "callBack" : "callBack.selectboxCreationCallBack"
		   }
	
	robot.openPop(info, "view010101P12.jsp");
}



/* DIV 만들기 */
createCompo.divCreation = function(){
	onclick.draw("div");
}

/* TITLE 만들기 */
createCompo.titleCreation = function(){
	onclick.draw("title");
}

/* Label 만들기 */
createCompo.labelCreation = function(){
	
	onclick.draw("label");
}

/* button 만들기 */
createCompo.buttonCreation = function(){
	onclick.draw("button");
}

/* 테이블그리기 */
createCompo.tableCreation = function(){
	robot.prompt("테이블생성", "행과 열의 갯수를 지정하십시오.", ["행","열"],"생성","취소","callBack.fn_tableCreationCallBack");
}


/* input박스 그리기 */
createCompo.inputCreation = function(){
	onclick.draw("input");
}

/* query 만들기 */
createCompo.queryCreation = function(){
	$.ajax({
		url : "/userIdSessionYn.do",
		type : "POST",
		success : function(data){
			
			// 세션에 id 없을경우
			if(data == ""){
				robot.alert("세션이 만료되었습니다. 다시 로그인 해주시기 바랍니다.","","","fn_saveListCallAlert");
				
			// 세션에 id가 있다면
			} else{
				var param = {
					"mapInfo"	: vjQuery
			    }
				var info = {"header" : "쿼리생성",
						    "width"  : "800px",
						    "height" : "500px",
						    "callBack" : "callBack.fn_queryCreationCallBack",
						    "param" : param}
				robot.openPop(info, "view010101P02.jsp");
			}

		},
		error : function() {
		}
	})
}

