<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="${viewId}">

	<#list devSource as item>
	<#if item.CRUD_DVS == "r">
		<select id="${item.WRK_ID}Select" parameterType="hashmap" resultType ="HashMap">

	    	/* ${viewId}.${item.WRK_ID}Select */
	    	
			${item.QUERY}
		</select>
	</#if>
	
	<#if item.CRUD_DVS == "c">
		<insert id="${item.WRK_ID}Insert" parameterType="hashmap">

	    	/* ${viewId}.${item.WRK_ID}Insert */
	    	
			${item.QUERY}
		</insert>
	</#if>
	
	<#if item.CRUD_DVS == "u">
		<insert id="${item.WRK_ID}Update" parameterType="hashmap">

	    	/* ${viewId}.${item.WRK_ID}Update */
	    	
			${item.QUERY}
		</insert>
	</#if>
	
	<#if item.CRUD_DVS == "d">
		<insert id="${item.WRK_ID}Delete" parameterType="hashmap">

	    	/* ${viewId}.${item.WRK_ID}Delete */
	    	
			${item.QUERY}
		</insert>
	</#if>
	
	</#list>

</mapper>