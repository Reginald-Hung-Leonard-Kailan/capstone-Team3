package com.example.coachescorner.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;


import java.util.Set;

@Entity
@Table(name = "information_type")
public class InformationType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

//    @JsonIgnore
//    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "InformationType")
//    private Set<ClientInformation> clientInformations;


    public InformationType() {
    }

    public InformationType(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


//    public Set<ClientInformation> getClientInformations() {
//        return clientInformations;
//    }

//    public void setClientInformations(Set<ClientInformation> clientInformations) {
//        this.clientInformations = clientInformations;
//    }
}
