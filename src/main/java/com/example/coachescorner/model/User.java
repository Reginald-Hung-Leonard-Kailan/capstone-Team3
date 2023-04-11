package com.example.coachescorner.model;

import jakarta.persistence.*;

import java.util.List;


@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 20)
    private String username;

    @Column(length = 50)
    private String email;

    private long password;

    private boolean isCoach;

    @Column(length = 50)
    private String firstName;

    @Column(length = 50)
    private String lastName;

    @Column(length = 50)
    private int phoneNumber;

    private String profilePicture;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "coachId")
    private List<UserClient> coaches;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "clientId")
    private List<UserClient> clients;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "userId")
    private List<Injury> injuries;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "userId")
    private List<ClientInformation> clientInformationList;

    public User() {
    }

    public User(String username, String email, long password, boolean isCoach, String firstName, String lastName, int phoneNumber, String profilePicture) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.isCoach = isCoach;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.profilePicture = profilePicture;
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

    public long getPassword() {
        return password;
    }

    public void setPassword(long password) {
        this.password = password;
    }

    public boolean isCoach() {
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

    public int getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(int phoneNumber) {
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
        return clientInformationList;
    }

    public void setClientInformationList(List<ClientInformation> clientInformationList) {
        this.clientInformationList = clientInformationList;
    }
}
