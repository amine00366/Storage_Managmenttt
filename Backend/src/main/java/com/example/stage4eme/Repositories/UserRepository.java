package com.example.stage4eme.Repositories;


import com.example.stage4eme.Entities.Role;
import com.example.stage4eme.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository  extends JpaRepository<User, Long> {

    Optional<User> findByEmail (String email) ;
    User findByRole (Role role) ;
}
