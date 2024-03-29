package com.example.coachescorner.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "injuries")
public class Injury {

    public enum Status {
    active, past
}
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Temporal(TemporalType.DATE)
    Date injuryDate;
//    @JsonIgnore
    @Enumerated(EnumType.ORDINAL)
    private Status status;


    @Column(length = 50)
    private String title;

    private String description;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_id")
    private User user;

    public Injury() {
    }

    public Injury(Date injuryDate, Status status, String title, String description, User userId) {
        this.injuryDate = injuryDate;
        this.status = status;
        this.title = title;
        this.description = description;
        this.user = userId;
    }

    public Injury(Injury injury) {
        this.injuryDate = injury.injuryDate;
        this.status = injury.status;
        this.title = injury.title;
        this.description = injury.description;
        this.user = injury.user;
    }

    public Injury(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getInjuryDate() {
        return injuryDate;
    }

    public void setInjuryDate(Date injuryDate) {
        this.injuryDate = injuryDate;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User userId) {
        this.user = userId;
    }

    @Override
    public String toString() {
        return "Injury{" +
                "id=" + id +
                ", injuryDate=" + injuryDate +
                ", status=" + status +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", user=" + user +
                '}';
    }
}
