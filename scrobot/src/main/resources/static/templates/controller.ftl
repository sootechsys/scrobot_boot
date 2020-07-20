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
	<#if item.CRUD_DVS == "r">
	/**
	 * ${item.WRK_ID}Select
	 */
	@RequestMapping(value = "/${item.WRK_ID}Select.do", produces = "application/text; charset=utf8")
	public ModelAndView ${item.WRK_ID}Select((@RequestParam Map<String, Object> paramMap, HttpServletRequest request){
		
		List<Map<String, Object>> ${item.TO_MAP} = ${viewId}service.${item.WRK_ID}Select(paramMap);
		
		ModelAndView mav = new ModelAndView("jsonView");
		
		mav.addObject("${item.TO_MAP}",${item.TO_MAP});
		
		return mav;
	}
	</#if>
	<#if item.CRUD_DVS == "c">
	/**
	 * ${item.WRK_ID}Insert
	 */
	@RequestMapping(value = "/${item.WRK_ID}Insert.do", produces = "application/text; charset=utf8")
	public void ${item.WRK_ID}Insert((@RequestParam Map<String, Object> paramMap, HttpServletRequest request){
		
		${viewId}service.${item.WRK_ID}Insert(paramMap);
		
	}
	</#if>
	<#if item.CRUD_DVS == "u">
	/**
	 * ${item.WRK_ID}Update
	 */
	@RequestMapping(value = "/${item.WRK_ID}Update.do", produces = "application/text; charset=utf8")
	public void ${item.WRK_ID}Update((@RequestParam Map<String, Object> paramMap, HttpServletRequest request){
		
		${viewId}service.${item.WRK_ID}Update(paramMap);
		
	}
	</#if>
	<#if item.CRUD_DVS == "d">
	/**
	 * ${item.WRK_ID}Delete
	 */
	@RequestMapping(value = "/${item.WRK_ID}Delete.do", produces = "application/text; charset=utf8")
	public void ${item.WRK_ID}Delete((@RequestParam Map<String, Object> paramMap, HttpServletRequest request){
		
		${viewId}service.${item.WRK_ID}Delete(paramMap);
		
	}
	</#if>
	</#list>


	
}