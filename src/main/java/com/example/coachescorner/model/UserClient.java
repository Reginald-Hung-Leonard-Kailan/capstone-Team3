package com.example.coachescorner.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user_clients")
public class UserClient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "coach_id")
    private User coachId;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "client_id")
    private User clientId;

    private boolean isActive;

    public UserClient() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getCoachId() {
        return coachId;
    }

    public void setCoachId(User coachId) {
        this.coachId = coachId;
    }

    public User getClientId() {
        return clientId;
    }

    public void setClientId(User clientId) {
        this.clientId = clientId;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }
}
