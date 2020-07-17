package ${packagePath}.${viewId}.controller;

import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.springframework.web.servlet.ModelAndView;

import ${packagePath}.${viewId}Service;
//TODO add spring...

/**
 * ${viewId} controller
 * @author
 */
@Controller
@RequestMapping("TODO")
public class ${viewId}Controller {


	/** ${businessNm}Service */
	@Resource(name = "${viewId}Service")
	private ${viewId}Service ${viewId}service;

	<#list devSource as item>
	/**
	 * ${item.WRK_ID}
	 */
	@RequestMapping(value = "/${item.WRK_ID}.do", produces = "application/text; charset=utf8")
	public ModelAndView ${item.WRK_ID}((@RequestParam Map<String, Object> paramMap, HttpServletRequest request){
		
		
		
		List<Map<String, Object>> ${item.TO_MAP} = ${viewId}service.${item.WRK_ID}(paramMap);
		
		ModelAndView mav = new ModelAndView("jsonView");
		mav.addObject("success","Y");
		
		
		return mav;
	}
	
	</#list>


	
}