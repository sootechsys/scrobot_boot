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
	
	
	/**
	 * ${item.WRK_ID}
	 */
	public List<Map<String,Object>> ${item.WRK_ID}(Map<String, Object> paramMap) throws Exception {
	
		return getSqlSession().selectList("${viewId}Sql.${item.WRK_ID}", paramMap);
		
	}
	
	
	</#list>
