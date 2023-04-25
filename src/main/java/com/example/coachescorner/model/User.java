package com.example.coachescorner.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.util.List;


@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true, length = 20)
    @Size(min = 1, message = "Username must be at least 1 character long")
    private String username;

    @Column(unique = true)
    @Size(min = 1, message = "Email must be at least 1 character long")
    private String email;

@JsonIgnore
@Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;

@Column(nullable = true)
    private boolean isCoach;

    @Column(length = 50)
    private String firstName;

    @Column(length = 50)
    private String lastName;

    @Column(length = 50)
    private String phoneNumber;

    private String profilePicture;

    @Column(length = 255)
    private String bio;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "coach")
    private List<UserClient> clients;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "client")
    private List<UserClient> coaches;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "user")
    private List<Injury> injuries;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "userId")
    private List<ClientInformation> clientStats;

    public User() {
    }


    public User(String username, String email, String password, boolean isCoach, String firstName, String lastName, String phoneNumber, String profilePicture, String bio) {

        this.username = username;
        this.email = email;
        this.password = password;
        this.isCoach = isCoach;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.profilePicture = profilePicture;
        this.bio = bio;
    }

    public User(User copy) {
        id = copy.id; // This line is SUPER important! Many things won't work if it's absent
        email = copy.email;
        username = copy.username;
        password = copy.password;
        isCoach = copy.isCoach;
        firstName = copy.firstName;
        lastName = copy.lastName;
        phoneNumber = copy.phoneNumber;
        profilePicture = copy.profilePicture;
        bio = copy.bio;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {

        this.password = password;
    }

    public boolean getIsCoach() {
        return isCoach;
    }

    public void setCoach(boolean coach) {
        isCoach = coach;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public List<UserClient> getCoaches() {
        return coaches;
    }

    public void setCoaches(List<UserClient> coaches) {
        this.coaches = coaches;
    }

    public List<UserClient> getClients() {
        return clients;
    }

    public void setClients(List<UserClient> clients) {
        this.clients = clients;
    }

    public List<Injury> getInjuries() {
        return injuries;
    }

    public void setInjuries(List<Injury> injuries) {
        this.injuries = injuries;
    }

    public List<ClientInformation> getClientInformationList() {
        return clientStats;
    }

    public void setClientInformationList(List<ClientInformation> clientInformationList) {
        this.clientStats = clientInformationList;
    }

    public User(String firstName) {
        this.firstName = firstName;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}
