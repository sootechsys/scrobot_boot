/**
 * d
 */
package scrobot.sourceFileGenerator;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

import freemarker.core.ParseException;
import freemarker.template.Configuration;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateNotFoundException;

/**
 * 파일 생성
 * @author hyunseongkil
 *
 */
public class FileGenerator {

	@SuppressWarnings("unchecked")
	public Map<String, Object> generate(Configuration cfg, Map<String,Object> paramMap) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {
		//
		List<String> targets = (List<String>) paramMap.get("targets");
		
		//
		if(Utils.contains(targets, "controller")) {
			paramMap.put("CONTROLLER_SOURCE", genController(cfg, paramMap));
		}
		
		//
		if(Utils.contains(targets, "service")) {
			paramMap.put("SERVICE_SOURCE", genService(cfg, paramMap));
		}
		
		//TODO mapper
		if(Utils.contains(targets, "sql")) {
			paramMap.put("SQL_SOURCE", genSql(cfg, paramMap));
		}
		
		//TODO jsp
		if(Utils.contains(targets, "jsp")) {
			paramMap.put("JSP_SOURCE", genDetailJsp(cfg, paramMap));
		}
		//vo
		if(Utils.contains(targets, "html")) {
			genHtml(cfg, paramMap);
		}

		return paramMap;
		
	}

	
	/**
	 * 상세 조회 jsp 파일 생성
	 * @param configMap
	 * @param cfg
	 * @param paramMap
	 * @throws TemplateNotFoundException
	 * @throws MalformedTemplateNameException
	 * @throws ParseException
	 * @throws IOException
	 * @throws TemplateException
	 */
	private String genDetailJsp(Configuration cfg, Map<String, Object> paramMap) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {
		
		//템플릿
		Template temp = cfg.getTemplate("detailJsp.ftl");
		
		//파일 생성 경로
		Path path = Paths.get(paramMap.get("outputPath").toString(), paramMap.get("businessNm").toString(), "jsp");
		
		//파일명
		String filename = paramMap.get("businessNm") + "Detail.jsp";
		
		//
		return gen(cfg, paramMap, temp, path, filename);
	}

	/**
	 * controller 파일 생성
	 * @param configMap
	 * @param cfg
	 * @param paramMap
	 * @throws TemplateNotFoundException
	 * @throws MalformedTemplateNameException
	 * @throws ParseException
	 * @throws IOException
	 * @throws TemplateException
	 */
	private String genController(Configuration cfg,	Map<String, Object> paramMap) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {

		//템플릿
		Template temp = cfg.getTemplate("controller.ftl");
		
		//파일 생성 경로
		Path path = Paths.get(paramMap.get("outputPath").toString(), paramMap.get("businessNm").toString(), "controller");
		
		//파일명
		String filename = paramMap.get("businessNm") + "Controller.java";
		
		//
		return gen(cfg, paramMap, temp, path, filename);
	}

	
	/**
	 * service 파일 생성
	 * @param configMap
	 * @param cfg
	 * @param paramMap
	 * @throws TemplateNotFoundException
	 * @throws MalformedTemplateNameException
	 * @throws ParseException
	 * @throws IOException
	 * @throws TemplateException
	 */
	private String genService(Configuration cfg,	Map<String, Object> paramMap) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {
		
		//템플릿
		Template temp = cfg.getTemplate("service.ftl");
		
		//파일 생성 경로
		Path path = Paths.get(paramMap.get("outputPath").toString(), paramMap.get("businessNm").toString(), "service");
		
		//파일명
		String filename = paramMap.get("businessNm") + "Service.java";
		
		//
		return gen(cfg, paramMap, temp, path, filename);
		
	}
	

	
	/**
	 * html 파일 생성
	 * @param cfg
	 * @param paramMap
	 * @throws TemplateNotFoundException
	 * @throws MalformedTemplateNameException
	 * @throws ParseException
	 * @throws IOException
	 * @throws TemplateException
	 */
	private String genHtml(Configuration cfg, Map<String, Object> paramMap) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {
		
		//템플릿
		Template temp = cfg.getTemplate("html.ftl");
		
		//파일 생성 경로
		Path path = Paths.get(paramMap.get("outputPath").toString(), paramMap.get("businessNm").toString(), "html");
		
		//파일명
		String filename = paramMap.get("businessNm") + ".html";
		
		//
		return gen(cfg, paramMap, temp, path, filename);
	}
	
	
	/**
	 * sql 파일 생성
	 * @param cfg
	 * @param paramMap
	 * @throws TemplateNotFoundException
	 * @throws MalformedTemplateNameException
	 * @throws ParseException
	 * @throws IOException
	 * @throws TemplateException
	 */
	private String genSql(Configuration cfg, Map<String, Object> paramMap) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {
		
		//템플릿
		Template temp = cfg.getTemplate("sql.ftl");
		
		//파일 생성 경로
		Path path = Paths.get(paramMap.get("outputPath").toString(), paramMap.get("businessNm").toString(), "sql");
		
		//파일명
		String filename = paramMap.get("businessNm") + "Sql.xml";
		
		//
		return gen(cfg, paramMap, temp, path, filename);
	}
	
	
	/**
	 * 공통 - 소스 파일 생성
	 * @param configMap
	 * @param cfg
	 * @param paramMap
	 * @param temp
	 * @param path
	 * @param filename
	 * @throws TemplateException
	 * @throws IOException
	 */
	private String gen(Configuration cfg, Map<String,Object> paramMap, Template temp, Path path, String filename) throws TemplateException, IOException {
		//경로 미존재시 생성
		if(!path.toFile().exists()) {
			path.toFile().mkdirs();
		}

		//
		boolean b = (boolean) paramMap.get("overwrite");
		if(!b) {
			Utils.backupFileIfExists(path, filename);
		}



		//처리
//		try(Writer out = new OutputStreamWriter(System.out)){
//			temp.process(dataMap, out);
//		}	
		
		try(OutputStream os = new FileOutputStream(path.resolve(filename).toFile())){
			try(Writer out = new OutputStreamWriter(os, StandardCharsets.UTF_8)){
				temp.process(paramMap, out);
				
			}
		}
		
		
		String targetString = "";
		
		try(InputStream is = new FileInputStream(path.resolve(filename).toFile())){
			try(Reader in = new InputStreamReader(is, StandardCharsets.UTF_8)){
				int intValueOfChar;
			    while ((intValueOfChar = in.read()) != -1) {
			        targetString += (char) intValueOfChar;
			    }
			    in.close();
				
			}
		}
		
		//
		Utils.log(Thread.currentThread().getStackTrace(), "<<", path.resolve(filename));
		
		return targetString;
	}
	
}

