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
package scrobot.viewedit.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import scrobot.EgovAbstractMapper;

/**
 * @Class Name : SampleDAO.java
 * @Description : Sample DAO Class
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

@Repository("view010101Service")
public class View010101Service extends EgovAbstractMapper {
	
	/**
	 * 
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
	public void registViewDrawWrk(Map<String, Object> param) throws Exception {
		if(param.get("urlDvs").equals("JAR")) {
			insert("view010101lite.insertViewDrawWrk", param);
		} else {
			insert("view010101.insertViewDrawWrk", param);
		}
	    
	}
	
	/**
	 * 
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
	public void registViewDrawWrkHistry(Map<String, Object> param) throws Exception {
		if(param.get("urlDvs").equals("JAR")) {
			insert("view010101lite.insertViewDrawWrkHistry", param);
		} else {
			insert("view010101.insertViewDrawWrkHistry", param);
		}
	    
	}
	
	/**
	 * 
	 * @param vo - 등록할 정보가 담긴 SampleVO
	 * @return 등록 결과
	 * @exception Exception
	 */
	public void registDevSource(Map<String, Object> param) throws Exception {
		
		List<Map<String, Object>> devSourceList = (List<Map<String, Object>>) param.get("devSource");
		
		if(devSourceList.size() == 0) {
			return;
		}
		
		String key [] = new String[devSourceList.size()];
		
		for(int i=0; i<devSourceList.size(); i++) {
			
			
			Map<String, Object> map = devSourceList.get(i);
			
			map.put("userId",param.get("userId"));
			map.put("viewId",param.get("viewId"));
			
			if(param.get("urlDvs").equals("JAR")) {
				insert("view010101lite.insertDevSource", map);
			} else {
				insert("view010101.insertDevSource", map);
			}
			
			key[i] = map.get("WRK_ID").toString();
			
		}
		
		param.put("deleteKey", key);
		
		insert("view010101lite.deleteDevSource", param);
	    
	}

	

}
 








