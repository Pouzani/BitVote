package com.bitvote.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class BitVoteApplication {

	public static void main(String[] args) {
		SpringApplication.run(BitVoteApplication.class, args);
	}

}
