package scrobot.sourceFileGenerator;

import java.awt.datatransfer.UnsupportedFlavorException;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import com.google.gson.Gson;
import com.google.gson.JsonIOException;
import com.google.gson.JsonSyntaxException;

import freemarker.core.ParseException;
import freemarker.template.Configuration;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.TemplateException;
import freemarker.template.TemplateExceptionHandler;
import freemarker.template.TemplateNotFoundException;

/**
 * @author hyunseongkil
 * 
 */
public class Application {
	
	
	/**
	 * @param args
	 * @throws IOException 
	 * @throws TemplateException 
	 * @throws UnsupportedFlavorException 
	 * @throws SQLException 
	 * @throws ClassNotFoundException 
	 */
	public static void creation(Map<String,Object> paramMap) throws IOException, TemplateException, UnsupportedFlavorException, ClassNotFoundException, SQLException {
		Utils.log(Thread.currentThread().getStackTrace(), ">>");
		
		//
		Map<String,Object> configMap = loadConfigJson(paramMap);
				

		//
		processAll(configMap);
		
		//
		Utils.log(Thread.currentThread().getStackTrace(), "<<");
		
	}
	
	/**
	 * @param args
	 * @throws IOException 
	 * @throws TemplateException 
	 * @throws UnsupportedFlavorException 
	 * @throws SQLException 
	 * @throws ClassNotFoundException 
	 */
	public static Map<String,Object> creationHTML(Map<String,Object> paramMap) throws IOException, TemplateException, UnsupportedFlavorException, ClassNotFoundException, SQLException {
		
		Map<String,Object> configMap = loadConfigJsonHTML(paramMap);

		processAll(configMap);
		
		return configMap;
		
	}

	/**
	 * 프리마커 환경 인스턴스 생성
	 * @see https://freemarker.apache.org/docs/pgui_quickstart.html
	 * @param configMap
	 * @return
	 * @throws IOException
	 */
	private static Configuration createConfiguration(Map<String, Object> configMap) throws IOException {
		// Create your Configuration instance, and specify if up to what FreeMarker
		// version (here 2.3.29) do you want to apply the fixes that are not 100%
		// backward-compatible. See the Configuration JavaDoc for details.
		Configuration cfg = new Configuration(Configuration.VERSION_2_3_29);

		// Specify the source where the template files come from. Here I set a
		// plain directory for it, but non-file-system sources are possible too:
		Path path = Paths.get(configMap.get("templatePath").toString());
		cfg.setDirectoryForTemplateLoading(path.toFile());

		// From here we will set the settings recommended for new projects. These
		// aren't the defaults for backward compatibilty.

		// Set the preferred charset template files are stored in. UTF-8 is
		// a good choice in most applications:
		cfg.setDefaultEncoding("UTF-8");

		// Sets how errors will appear.
		// During web page *development* TemplateExceptionHandler.HTML_DEBUG_HANDLER is better.
		cfg.setTemplateExceptionHandler(TemplateExceptionHandler.RETHROW_HANDLER);

		// Don't log exceptions inside FreeMarker that it will thrown at you anyway:
		cfg.setLogTemplateExceptions(false);

		// Wrap unchecked exceptions thrown during template processing into TemplateException-s:
		cfg.setWrapUncheckedExceptions(true);

		// Do not fall back to higher scopes when reading a null loop variable:
		cfg.setFallbackOnNullLoopVariable(false);

		//
		Utils.log(Thread.currentThread().getStackTrace(), "<<", cfg);
		return cfg;
	}
	


	
	/**
	 * 환경 파일 로드
	 * 실행 파일과 같은 경로의 app.json파일 로드
	 * @return
	 * @throws JsonSyntaxException
	 * @throws JsonIOException
	 * @throws FileNotFoundException
	 */
	@SuppressWarnings("unchecked")
	private static Map<String,Object> loadConfigJson(Map<String,Object> paramMap) throws JsonSyntaxException, JsonIOException, FileNotFoundException {
		URL url = Application.class.getProtectionDomain().getCodeSource().getLocation();
		Path path = Paths.get(url.toString().replaceAll("classes", "").replaceAll("file:/", ""));
		String filename = "app.json";

		Map<String,Object> map = new Gson().fromJson(new FileReader(path.resolve(filename).toFile()), Map.class);
		
		//현재 시간
		map.put("now", Utils.getNow());
		map.put("templatePath", path.toString().replaceAll("WEB-INF", "template"));
		map.put("businessNm", paramMap.get("businessNm"));
		
		List<Map<String,Object>> datas = new ArrayList();
		Map<String,Object> viewInfo = new HashMap();
		
		Set key = paramMap.keySet();
		
		for (Iterator iterator = key.iterator(); iterator.hasNext();) {
            String keyName = (String) iterator.next();
            String valueName = (String) paramMap.get(keyName);

		}

		
		if(paramMap.get("value0") == null){
			paramMap.put("value0", "sootech");
			paramMap.put("label0", "systems");
		}
		if(paramMap.get("drag1") == null){
			paramMap.put("drag1", "sootech");
			paramMap.put("drag2", "systems");
		}
		viewInfo.put("businessNm", paramMap.get("value0"));
		viewInfo.put("kor", paramMap.get("label0"));
		viewInfo.put("comment", paramMap.get("label0"));
		viewInfo.put("drag1", paramMap.get("drag1"));
		
		datas.add(viewInfo);
		
		
		map.put("datas", datas);
		
		//
		Utils.log(Thread.currentThread().getStackTrace(), "<<", map);
		return map;
	}
	
	
	/**
	 * 환경 파일 로드
	 * 실행 파일과 같은 경로의 app.json파일 로드
	 * @return
	 * @throws JsonSyntaxException
	 * @throws JsonIOException
	 * @throws IOException 
	 */
	@SuppressWarnings("unchecked")
	private static Map<String,Object> loadConfigJsonHTML(Map<String,Object> paramMap) throws JsonSyntaxException, JsonIOException, IOException {
		URL url = Application.class.getProtectionDomain().getCodeSource().getLocation();
		Path path = Paths.get(url.toString().replaceAll("classes", "").replaceAll("file:/", ""));
		String filename = "app2.json";

		Map<String,Object> map = new Gson().fromJson(new FileReader(path.resolve(filename).toFile()), Map.class);
		
		
		Path cssPath = Paths.get(url.toString().replaceAll("classes", "").replaceAll("file:/", "").replaceAll("WEB-INF", "css/egovframework"));
		String cssFileName = "sample.css";
		
		BufferedReader reader = new BufferedReader(new FileReader(cssPath.resolve(cssFileName).toFile()));
		
		String         line = null;
	    StringBuilder  stringBuilder = new StringBuilder();

	    try {
	        while((line = reader.readLine()) != null) {
	            stringBuilder.append(line);
	        }

	        
	    } finally {
	        reader.close();
	    }
		
	    String style = paramMap.get("style").toString();
	    stringBuilder.append(style);
	    
	    map.put("style", stringBuilder.toString());
		map.put("templatePath", path.toString().replaceAll("WEB-INF", "template"));
		map.put("businessNm", paramMap.get("businessNm"));
		map.put("html", paramMap.get("html"));
		
		Utils.log(Thread.currentThread().getStackTrace(), "<<", map);
		return map;
	}
	

	

	
	
	/**
	 * 모든 소스 파일 생성
	 * @param configMap
	 * @throws TemplateNotFoundException
	 * @throws MalformedTemplateNameException
	 * @throws ParseException
	 * @throws IOException
	 * @throws TemplateException
	 * @throws UnsupportedFlavorException 
	 * @throws SQLException 
	 * @throws ClassNotFoundException 
	 */
	private static void processAll(Map<String, Object> configMap) throws TemplateNotFoundException, MalformedTemplateNameException, ParseException, IOException, TemplateException, UnsupportedFlavorException, ClassNotFoundException, SQLException {

		//
		Configuration cfg = createConfiguration(configMap);
		

		//
		new FileGenerator().generate(cfg, configMap);
		
	}



}
