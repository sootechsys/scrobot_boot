/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package scrobot.user.controller;

import java.io.File;
import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;
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

import scrobot.user.service.User010101Service;

/**
 * @Class Name : EgovSampleController.java

 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2009.03.16           최초생성

 */

@Controller
public class User010101Controller {

	/** user010101Service */
	@Resource(name = "user010101Service")
	private User010101Service user010101service;
	
	

/*	@RequestMapping(value = "/", method = RequestMethod.GET, produces = "application/text; charset=utf8" )
	public ModelAndView main(HttpServletRequest request) throws Exception {
		File file = new File(".");
	    System.out.println(file.getAbsolutePath());
		
		URL url = User010101Controller.class.getProtectionDomain().getCodeSource().getLocation();
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("file1",file.getAbsolutePath());
		mav.addObject("file2",url.toString());
		mav.setViewName("user/test");
		
		return mav;
	}*/
	
	/**
	 * 메인 화면을 조회한다.
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param model
	 * @return "egovSampleRegister"
	 * @exception Exception
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET, produces = "application/text; charset=utf8" )
	public String main(HttpServletRequest request) throws Exception {
		  HttpSession session = request.getSession();
		  
		  URL url = User010101Controller.class.getProtectionDomain().getCodeSource().getLocation();
		  String urlDvs = url.toString().substring(0,3);
		  
		  if(urlDvs.equals("JAR")) {
			  session.setAttribute("urlDvs", "JAR");
		  } else {
			  session.setAttribute("urlDvs", "JAR");
			  //session.setAttribute("urlDvs", "WEB");
		  }
		  
		  Map<String, Object> resultMap = user010101service.retrieveTableCreate();
		  if(resultMap.get("CREATIONYN").equals("N")) {
			  user010101service.registTableCreate();
		  }
		  
		  String userId = (String) session.getAttribute("userId");
		  if(userId != null) {
			  return "forward:/viewEdit.do";
		  } else {
			  return "user/user010101";
		  }
	}
	
	
	/**
	 * 메인 화면을 조회한다.
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param model
	 * @return "egovSampleRegister"
	 * @exception Exception
	 */
	@RequestMapping(value = "/test.do", method = RequestMethod.GET, produces = "application/text; charset=utf8" )
	public String mainTest(HttpServletRequest request) throws Exception {
		  return "user/testDetail";
	}
	
	
	/**
	 * 회원가입 화면을 조회한다.
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param model
	 * @return "egovSampleRegister"
	 * @exception Exception
	 */
	@RequestMapping(value = "/moveJoinForm.do", method = RequestMethod.GET, produces = "application/text; charset=utf8" )
	public String moveJoinForm() throws Exception {
		return "user/user010102";
	}

	
	/**
	 * 로그인 정보를 조회 후 로그인한다.
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param model
	 * @return "egovSampleRegister"
	 * @exception Exception
	 */
	@RequestMapping(value = "/retrieveLogin.do", method = RequestMethod.POST, produces = "application/text; charset=utf8" )
	@ResponseBody
	public String retrieveLogin(@RequestParam Map<String, Object> param, SessionStatus status, HttpServletRequest request) throws Exception {
		param.put("dvsNm", "login");
		HttpSession session = request.getSession();
		
		String urlDvs = (String) session.getAttribute("urlDvs");
		
		param.put("urlDvs", urlDvs);
		
		Map<String,Object> login = user010101service.retrieveLogin(param);
		String loginSuccessYn = (String) login.get("LOGINSUCCESSYN");
		if(loginSuccessYn.equals("Y")) {
			
		    session.setAttribute("userId", param.get("id"));
		}
		status.setComplete();
		return loginSuccessYn;
		
	}
	
	
	/**
	 * 로그아웃한다.
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param model
	 * @return "egovSampleRegister"
	 * @exception Exception
	 */
	@RequestMapping(value = "/logout.do", method = RequestMethod.GET, produces = "application/text; charset=utf8" )
	public String logout(SessionStatus status, HttpServletRequest request) throws Exception {
		HttpSession session = request.getSession();
		session.invalidate();
		status.setComplete();
		return "forward:/";
	}


}
