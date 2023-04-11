package com.example.coachescorner.model;

import jakarta.persistence.*;

import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "client_information")
public class ClientInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "client_info")
    private String clientInformation;

    @Temporal(TemporalType.DATE)
    Date date;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_id")
    private User userId;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "information_type")
    private InformationType InformationType;

    public ClientInformation() {
    }

    public ClientInformation(String clientInformation, Date date, User userId) {
        this.clientInformation = clientInformation;
        this.date = date;
        this.userId = userId;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getClientInformation() {
        return clientInformation;
    }

    public void setClientInformation(String clientInformation) {
        this.clientInformation = clientInformation;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

//    public Set<InformationType> getTypes() {
//        return types;
//    }
//
//    public void setTypes(Set<InformationType> types) {
//        this.types = types;
//    }
}
