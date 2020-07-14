
package scrobot.viewedit.controller;

import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.support.SessionStatus;

import scrobot.sourceFileGenerator.Application;
import scrobot.viewedit.service.View010101Service;


/*
 * @Class Name : viewEditController.java
 * @Description : EgovSample Controller Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2009.03.16           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */

@Controller
public class View010101Controller {
	
	/** view010101Service */
	@Resource(name = "view010101Service")
	private View010101Service view010101service;
	
	/**
	 * 화면그리기 화면을 조회한다.
	 */
	@RequestMapping(value = "/viewEdit.do", method = RequestMethod.GET, produces = "application/text; charset=utf8" )
	public String main(HttpServletRequest request) throws Exception {
		
		HttpSession session = request.getSession();
		String userId = (String) session.getAttribute("userId");
		if(userId != null) {
			return "view/view010101";
		} else {
			return "forward:/";
		}
		
	}
	
	/**
	 * 소스 만들기를 실행한다.
	 */
	@RequestMapping(value = "/creationSource.do", produces = "application/text; charset=utf8" )
	public void creationSource(@RequestParam Map<String, Object> param, SessionStatus status) throws Exception {
		Application.creation(param);
	}
	
	
	/**
	 * 불러오기전 새션확인
	 */
	@RequestMapping(value = "/userIdSessionYn.do", produces = "application/text; charset=utf8" )
	@ResponseBody
	public String userIdSessionYn(HttpServletRequest request) throws Exception {
		
		HttpSession session = request.getSession();
		String userId = (String) session.getAttribute("userId");
		
		return userId;
	}
	
	
	/**
	 * HTML 만들기를 실행한다.
	 */
	@RequestMapping(value = "/creationHTML.do", produces = "application/text; charset=utf8" )
	@ResponseBody
	public String creationHTML(@RequestParam Map<String, Object> paramMap, SessionStatus status, HttpServletRequest request) throws Exception {
	//	paramMap = Application.creationHTML(paramMap);
		
		
		HttpSession session = request.getSession();
		String userId = (String) session.getAttribute("userId");
		
		paramMap.put("userId", userId);
		paramMap.put("wrkNm", paramMap.get("businessNm"));
		paramMap.put("source", paramMap.get("html"));
		
		String urlDvs = (String) session.getAttribute("urlDvs");
		paramMap.put("urlDvs", urlDvs);
		
		view010101service.registViewDrawWrk(paramMap);
		view010101service.registViewDrawWrkHistry(paramMap);
		
		return "Y";
	}
	



}
