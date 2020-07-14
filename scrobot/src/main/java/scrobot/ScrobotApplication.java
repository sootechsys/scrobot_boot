package scrobot;

import java.io.File;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

@SpringBootApplication
public class ScrobotApplication {
	
	@Autowired
	private ApplicationContext applicationContext;

	public static void main(String[] args) {
		SpringApplication.run(ScrobotApplication.class, args);
	}

	
	/*
	 * SqlSessionFactory 생성
	 * = Mybatis 의 SqlSessiongFactory 반환
	 * DataSource 객체를 주입하여 결과를 만들고 그 결과를 빈으로 사용
	 * */
	  @Bean("sqlSession")
	    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception{
	        
	        SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
	        
	        sessionFactory.setDataSource(dataSource);
	        sessionFactory.setMapperLocations(applicationContext.getResources("classpath:mapper/**/*.xml"));
	        return sessionFactory.getObject();
	        
	   }

	 
	    @Bean
	    public DataSource dataSource() {
	        DriverManagerDataSource dataSource = new DriverManagerDataSource();
	        File file = new File(".");
		    String path = file.getAbsolutePath();
		    path = path.replace(path.substring(path.length()-1), "");
	        dataSource.setDriverClassName("org.h2.Driver");
	        dataSource.setUrl("jdbc:h2:file:"+path+"scrobot_db/scrobot_db");
	        dataSource.setUsername("sa");
	        dataSource.setPassword("");
	 
	        return dataSource;
	    }
	    
	    @Bean
	    MappingJackson2JsonView jsonView(){
	        return new MappingJackson2JsonView();
	    }


}
