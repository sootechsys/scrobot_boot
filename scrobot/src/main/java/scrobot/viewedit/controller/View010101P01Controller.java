
package scrobot.viewedit.controller;

import java.util.HashMap;
import java.util.List;
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
import org.springframework.web.servlet.ModelAndView;

import scrobot.viewedit.service.View010101P01Service;

/**
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
public class View010101P01Controller {
	
	/** view010101Service */
	@Resource(name = "view010101P01Service")
	private View010101P01Service view010101P01service;
	
	/***
	 * HTML 만들기를 실행한다.
	 */
	@RequestMapping(value = "/retrieveWrk.do", produces = "application/text; charset=utf8" )
	@ResponseBody
	public ModelAndView retrieveWrk(@RequestParam Map<String, Object> paramMap, SessionStatus status, HttpServletRequest request) throws Exception {
		HttpSession session = request.getSession();
		String userId = (String) session.getAttribute("userId");
		String urlDvs = (String) session.getAttribute("urlDvs");
		
		paramMap.put("userId", userId);
		paramMap.put("urlDvs", urlDvs);
		
		List<Map<String,Object>> wrkList = view010101P01service.retrieveWrkList(paramMap);
		List<Map<String,Object>> wrkHistryList = view010101P01service.retrieveWrkHistryList(paramMap);
		List<Map<String,Object>> devSourceList = view010101P01service.retrieveDevSourceList(paramMap);
		
		Map<String, Object> resultMap = new HashMap();
		
		resultMap.put("wrkList", wrkList);
		resultMap.put("wrkHistryList", wrkHistryList);
		resultMap.put("devSourceList", devSourceList);
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		mav.addObject("resultMap",resultMap);
		return mav;
	}
	


}
