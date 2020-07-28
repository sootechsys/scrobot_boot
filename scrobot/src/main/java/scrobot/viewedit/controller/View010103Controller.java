
package scrobot.viewedit.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import scrobot.viewedit.service.View010103Service;


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
public class View010103Controller {
	
	/** view010101Service */
	@Resource(name = "view010103Service")
	private View010103Service view010103service;
	
	/**
	 * 화면그리기 화면을 조회한다.
	 */
	@RequestMapping(value = "/devFile.do", method = RequestMethod.GET, produces = "application/text; charset=utf8" )
	public ModelAndView main(HttpServletRequest request) throws Exception {
		
		HttpSession session = request.getSession();
		String userId = (String) session.getAttribute("userId");
		ModelAndView mav = new ModelAndView("jsonView");
		
		
		
		
		if(userId != null) {
			
			mav.addObject("viewDvs","devFile");
			mav.setViewName("view/view0101");
		} else {
			mav.setViewName("user/user010101");
		}
		
		return mav;
		
	}
	
}
