package com.example.stage4eme;

import com.example.stage4eme.Entities.Role;
import com.example.stage4eme.Entities.User;
import com.example.stage4eme.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class Stage4emeApplication {  //implements CommandLineRunner

    @Autowired
    private UserRepository userRepository ;
    public static void main(String[] args) {
        SpringApplication.run(Stage4emeApplication.class, args);
    }

//    public void run (String... args){
//        User adminAccount = userRepository.findByRole(Role.ADMIN);
//        if (null ==adminAccount){
//            User user = new User();
//            user.setEmail("admin@gmail.com");
//            user.setNom("admin");
//            user.setPrenom("sidhom");
//            user.setRole(Role.ADMIN);
//            user.setMotDePasse(new BCryptPasswordEncoder().encode("admin"));
//            userRepository.save(user);
//
//        }
//    }
}
