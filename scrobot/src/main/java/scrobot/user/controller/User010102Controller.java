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

import scrobot.user.service.User010101Service;
import scrobot.user.service.User010102Service;

/**
 * @Class Name : EgovSampleController.java

 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2009.03.16           최초생성

 */

@Controller
public class User010102Controller {
	
	/** user010101Service */
	@Resource(name = "user010101Service")
	private User010101Service user010101service;

	/** user010102Service */
	@Resource(name = "user010102Service")
	private User010102Service user010102service;

	/**
	 * 회원가입 정보를 등록한다.
	 * @param searchVO - 목록 조회조건 정보가 담긴 VO
	 * @param model
	 * @return "egovSampleRegister"
	 * @exception Exception
	 */
	@RequestMapping(value = "/registJoin.do", method = RequestMethod.POST, produces = "application/text; charset=utf8" )
	@ResponseBody
	public String registJoin(@RequestParam Map<String, Object> param, SessionStatus status, HttpServletRequest request) throws Exception {
		HttpSession session = request.getSession();
		String urlDvs = (String) session.getAttribute("urlDvs");
		param.put("urlDvs", urlDvs);
		
		Map<String,Object> join = user010101service.retrieveLogin(param);
		String loginSuccessYn = (String) join.get("LOGINSUCCESSYN");
		if(!loginSuccessYn.equals("Y")) {
			user010102service.registJoin(param);
		}
		
		status.setComplete();
		return loginSuccessYn;
	}
	

}
