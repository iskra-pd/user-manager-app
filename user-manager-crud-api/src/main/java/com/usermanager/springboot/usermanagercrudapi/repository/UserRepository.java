package com.usermanager.springboot.usermanagercrudapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.usermanager.springboot.usermanagercrudapi.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

}