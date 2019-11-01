package com.usermanager.springboot.usermanagercrudapi.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private Date dob;
 
    public User() {
  
    }
 
    public User(String firstName, String lastName, String email,Date dob) {
         this.firstName = firstName;
         this.lastName = lastName;
         this.email= email;
         this.dob= dob;
    }
 
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
        public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
 
    @Column(name = "first_name", nullable = false)
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
 
    @Column(name = "last_name", nullable = false)
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
 
    @Column(name = "email", nullable = false)
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    
    @Column(name = "dob", nullable = false)
    public Date getDOB() {
        return dob;
    }
    public void setDOB(Date dob) {
        this.dob = dob;
    }

    @Override
    public String toString() {
        return "User [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email
        		+ ", dob=" + dob.toString() + "]";
    }
 
}