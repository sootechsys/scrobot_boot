/**
 * d
 */
package scrobot.sourceFileGenerator;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
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
	public void generate(Configuration cfg, Map<String,Object> metaMap) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {
		//
		List<String> targets = (List<String>) metaMap.get("targets");
		
		//
		if(Utils.contains(targets, "controller")) {
			genController(cfg, metaMap);
		}
		
		//
		if(Utils.contains(targets, "service")) {
			genService(cfg, metaMap);
		}
		
		//TODO serviceimpl
		
		//vo
		if(Utils.contains(targets, "vo")) {
			genVo(cfg, metaMap);
		}
		
		//TODO dao
		
		//TODO mapper
		
		//TODO jsp
		if(Utils.contains(targets, "jsp")) {
			genListJsp(cfg, metaMap);
			genRegistFormJsp(cfg, metaMap);
			genUpdtFormJsp(cfg, metaMap);
			genDetailJsp(cfg, metaMap);
		}
		//vo
		if(Utils.contains(targets, "html")) {
			genHtml(cfg, metaMap);
		}
	}
	
	

	/**
	 * 목록 jsp 파일 생성
	 * @param configMap
	 * @param cfg
	 * @param metaMap
	 * @throws TemplateNotFoundException
	 * @throws MalformedTemplateNameException
	 * @throws ParseException
	 * @throws IOException
	 * @throws TemplateException
	 */
	private void genListJsp(Configuration cfg, Map<String, Object> metaMap) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {
		
		//템플릿
		Template temp = cfg.getTemplate("listJsp.ftl");
		
		//파일 생성 경로
		Path path = Paths.get(metaMap.get("outputPath").toString(), metaMap.get("businessNm").toString(), "jsp");
		
		//파일명
		String filename = metaMap.get("businessNm") + "List.jsp";
		
		//
		gen(cfg, metaMap, temp, path, filename);
	}
	
	/**
	 * 등록 폼 jsp 파일 생성
	 * @param configMap
	 * @param cfg
	 * @param metaMap
	 * @throws TemplateNotFoundException
	 * @throws MalformedTemplateNameException
	 * @throws ParseException
	 * @throws IOException
	 * @throws TemplateException
	 */
	private void genRegistFormJsp(Configuration cfg, Map<String, Object> metaMap) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {
		
		//템플릿
		Template temp = cfg.getTemplate("registFormJsp.ftl");
		
		//파일 생성 경로
		Path path = Paths.get(metaMap.get("outputPath").toString(), metaMap.get("businessNm").toString(), "jsp");
		
		//파일명
		String filename = metaMap.get("businessNm") + "RegistForm.jsp";
		
		//
		gen(cfg, metaMap, temp, path, filename);
	}
	
	/**
	 * 수정 폼 jsp 파일 생성
	 * @param configMap
	 * @param cfg
	 * @param metaMap
	 * @throws TemplateNotFoundException
	 * @throws MalformedTemplateNameException
	 * @throws ParseException
	 * @throws IOException
	 * @throws TemplateException
	 */
	private void genUpdtFormJsp(Configuration cfg, Map<String, Object> metaMap) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {
		
		//템플릿
		Template temp = cfg.getTemplate("updtFormJsp.ftl");
		
		//파일 생성 경로
		Path path = Paths.get(metaMap.get("outputPath").toString(), metaMap.get("businessNm").toString(), "jsp");
		
		//파일명
		String filename = metaMap.get("businessNm") + "UpdtForm.jsp";
		
		//
		gen(cfg, metaMap, temp, path, filename);
	}
	
	/**
	 * 상세 조회 jsp 파일 생성
	 * @param configMap
	 * @param cfg
	 * @param metaMap
	 * @throws TemplateNotFoundException
	 * @throws MalformedTemplateNameException
	 * @throws ParseException
	 * @throws IOException
	 * @throws TemplateException
	 */
	private void genDetailJsp(Configuration cfg, Map<String, Object> metaMap) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {
		
		//템플릿
		Template temp = cfg.getTemplate("detailJsp.ftl");
		
		//파일 생성 경로
		Path path = Paths.get(metaMap.get("outputPath").toString(), metaMap.get("businessNm").toString(), "jsp");
		
		//파일명
		String filename = metaMap.get("businessNm") + "Detail.jsp";
		
		//
		gen(cfg, metaMap, temp, path, filename);
	}



	/**
	 * 공통 - 소스 파일 생성
	 * @param configMap
	 * @param cfg
	 * @param dataMap
	 * @param temp
	 * @param path
	 * @param filename
	 * @throws TemplateException
	 * @throws IOException
	 */
	private void gen(Configuration cfg, Map<String,Object> dataMap, Template temp, Path path, String filename) throws TemplateException, IOException {
		//경로 미존재시 생성
		if(!path.toFile().exists()) {
			path.toFile().mkdirs();
		}

		//
		boolean b = (boolean) dataMap.get("overwrite");
		if(!b) {
			Utils.backupFileIfExists(path, filename);
		}



		//처리
//		try(Writer out = new OutputStreamWriter(System.out)){
//			temp.process(dataMap, out);
//		}	
		
		try(OutputStream os = new FileOutputStream(path.resolve(filename).toFile())){
			try(Writer out = new OutputStreamWriter(os, StandardCharsets.UTF_8)){
				temp.process(dataMap, out);
			}
		}
		
		//
		Utils.log(Thread.currentThread().getStackTrace(), "<<", path.resolve(filename));
	}

	

	/**
	 * controller 파일 생성
	 * @param configMap
	 * @param cfg
	 * @param dataMap
	 * @throws TemplateNotFoundException
	 * @throws MalformedTemplateNameException
	 * @throws ParseException
	 * @throws IOException
	 * @throws TemplateException
	 */
	private void genController(Configuration cfg,	Map<String, Object> dataMap) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {

		//템플릿
		Template temp = cfg.getTemplate("controller.ftl");
		
		//파일 생성 경로
		Path path = Paths.get(dataMap.get("outputPath").toString(), dataMap.get("businessNm").toString(), "web");
		
		//파일명
		String filename = dataMap.get("businessNm") + "Controller.java";
		
		//
		gen(cfg, dataMap, temp, path, filename);
	}

	
	/**
	 * service 파일 생성
	 * @param configMap
	 * @param cfg
	 * @param dataMap
	 * @throws TemplateNotFoundException
	 * @throws MalformedTemplateNameException
	 * @throws ParseException
	 * @throws IOException
	 * @throws TemplateException
	 */
	private void genService(Configuration cfg,	Map<String, Object> dataMap) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {
		
		//템플릿
		Template temp = cfg.getTemplate("service.ftl");
		
		//파일 생성 경로
		Path path = Paths.get(dataMap.get("outputPath").toString(), dataMap.get("businessNm").toString(), "service");
		
		//파일명
		String filename = dataMap.get("businessNm") + "Service.java";
		
		//
		gen(cfg, dataMap, temp, path, filename);
		
	}
	

	
	
	/**
	 * vo 파일 생성
	 * @param configMap
	 * @param cfg
	 * @param metaMap
	 * @param datas
	 * @throws TemplateNotFoundException
	 * @throws MalformedTemplateNameException
	 * @throws ParseException
	 * @throws IOException
	 * @throws TemplateException
	 */
	private void genVo(Configuration cfg, Map<String, Object> metaMap) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {
		//템플릿
		Template temp = cfg.getTemplate("vo.ftl");

		//파일 생성 경로
		Path path = Paths.get(metaMap.get("outputPath").toString(), metaMap.get("businessNm").toString(), "vo");

		//파일명
		String filename = metaMap.get("businessNm") + "Vo.java";

		//
		gen(cfg, metaMap, temp, path, filename);
		
	}
	
	
	/**
	 * html 파일 생성
	 * @param cfg
	 * @param metaMap
	 * @throws TemplateNotFoundException
	 * @throws MalformedTemplateNameException
	 * @throws ParseException
	 * @throws IOException
	 * @throws TemplateException
	 */
	private void genHtml(Configuration cfg, Map<String, Object> metaMap) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException {
		
		//템플릿
		Template temp = cfg.getTemplate("html.ftl");
		
		//파일 생성 경로
		Path path = Paths.get(metaMap.get("outputPath").toString(), metaMap.get("businessNm").toString(), "html");
		
		//파일명
		String filename = metaMap.get("businessNm") + ".html";
		
		//
		gen(cfg, metaMap, temp, path, filename);
	}
}

