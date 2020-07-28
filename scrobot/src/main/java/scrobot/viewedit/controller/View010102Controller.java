
package scrobot.viewedit.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import scrobot.sourceFileGenerator.Application;
import scrobot.viewedit.service.View010102Service;


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
public class View010102Controller {
	
	/** view010101Service */
	@Resource(name = "view010102Service")
	private View010102Service view010102service;
	
	/**
	 * 화면그리기 화면을 조회한다.
	 */
	@RequestMapping(value = "/createPrj.do", method = RequestMethod.GET, produces = "application/text; charset=utf8" )
	public ModelAndView createPrj(HttpServletRequest request) throws Exception {
		
		HttpSession session = request.getSession();
		String userId = (String) session.getAttribute("userId");
		ModelAndView mav = new ModelAndView("jsonView");
		
		if(userId != null) {
			
			mav.addObject("viewDvs","creationPrj");
			mav.setViewName("view/view0101");
		} else {
			mav.setViewName("user/user010101");
		}
		
		return mav;
		
	}
	
	
	/**
	 * 화면그리기 화면을 조회한다.
	 */
	@RequestMapping(value = "/savePrj.do", method = RequestMethod.GET, produces = "application/text; charset=utf8" )
	@ResponseBody
	public ModelAndView savePrj(@RequestBody Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
		
		HttpSession session = request.getSession();
		String userId = (String) session.getAttribute("userId");
		
		paramMap.put("userId", userId);

		// PROJECT01 INSERT
		view010102service.savePrj(paramMap);
		
		List<Map<String, Object>> menuList = (List<Map<String, Object>>) paramMap.get("MENU_INFO");
		
		if(menuList.size() == 0) {
			return null;
		}
		
		String key [] = new String[menuList.size()];
		
		for(int i=0; i<menuList.size(); i++) {
			
			Map<String, Object> map = menuList.get(i);
			
			map.put("userId",paramMap.get("userId"));
			map.put("PRJ_ID",paramMap.get("PRJ_ID"));
			
			// PROJECT03 INSERT
			view010102service.registMenu(map);
			
			key[i] = map.get("MENU_ID").toString();
			
		}
		
		paramMap.put("deleteKey", key);
		
		// PROJECT03 DELETE
		view010102service.deleteMenu(paramMap);
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		mav.addObject("success","Y");
		
		return mav;
	}
	
	
	/**
	 * 메뉴를 조회한다.
	 */
	@RequestMapping(value = "/retrieveMenuList.do", method = RequestMethod.GET, produces = "application/text; charset=utf8" )
	public ModelAndView retrieveMenuList(@RequestBody Map<String, Object> paramMap, HttpServletRequest request) throws Exception {
		
		HttpSession session = request.getSession();
		String userId = (String) session.getAttribute("userId");
		String urlDvs = (String) session.getAttribute("urlDvs");
		
		paramMap.put("userId", userId);
		paramMap.put("urlDvs", urlDvs);
		
		List<Map<String,Object>> menuList = view010102service.retrieveMenuList(paramMap);
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		mav.addObject("menuList",menuList);
		
		return mav;
		
	}
	
}
