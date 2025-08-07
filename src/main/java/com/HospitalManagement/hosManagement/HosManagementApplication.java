package com.HospitalManagement.hosManagement;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class HosManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(HosManagementApplication.class, args);
		System.out.println("Hello Code check");
		String base64Key = Encoders.BASE64.encode(Keys.secretKeyFor(SignatureAlgorithm.HS512).getEncoded());
		System.out.println(base64Key);


	}



}
