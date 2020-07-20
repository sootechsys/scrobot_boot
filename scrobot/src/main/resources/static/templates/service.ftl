package ${packagePath}.${viewId}.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import javax.annotation.Resource;

import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.support.SqlSessionDaoSupport;


/**
 * ${viewId} service
 * @author
 */
@Repository("${viewId}Service")
public class ${viewId}Service


	@Resource(name = "sqlSession")
	public void setSqlSessionFactory(SqlSessionFactory sqlSession) {
		super.setSqlSessionFactory(sqlSession);
	}
	
	
	
	<#list devSource as item>
	
	<#if item.CRUD_DVS == "r">
	/**
	 * ${item.WRK_ID}Select
	 */
	public List<Map<String,Object>> ${item.WRK_ID}Select(Map<String, Object> paramMap) throws Exception {
	
		return getSqlSession().selectList("${viewId}.${item.WRK_ID}Select", paramMap);
		
	}
	</#if>
	
	<#if item.CRUD_DVS == "c">
	/**
	 * ${item.WRK_ID}Insert
	 */
	public void ${item.WRK_ID}Insert(Map<String, Object> paramMap) throws Exception {
	
		getSqlSession().insert("${viewId}.${item.WRK_ID}Insert", paramMap);
		
	}
	</#if>
	
	<#if item.CRUD_DVS == "u">
	/**
	 * ${item.WRK_ID}Update
	 */
	public void ${item.WRK_ID}Update(Map<String, Object> paramMap) throws Exception {
	
		getSqlSession().update("${viewId}.${item.WRK_ID}Update", paramMap);
		
	}
	</#if>
	
	<#if item.CRUD_DVS == "d">
	/**
	 * ${item.WRK_ID}Delete
	 */
	public void ${item.WRK_ID}Delete(Map<String, Object> paramMap) throws Exception {
	
		getSqlSession().delete("${viewId}.${item.WRK_ID}Delete", paramMap);
		
	}
	</#if>
	
	
	
	
	</#list>
