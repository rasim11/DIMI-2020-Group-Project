package com.netcracker.projectDb.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;
import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @Column(columnDefinition = "text")
    private String lastname;
    @NotNull
    @Column(columnDefinition = "text")
    private String firstname;
    @NotNull
    @Column(columnDefinition = "text")
    private String middlename;
    @Lob
    @NotNull
    private String userImage;
    @NotNull
    @Enumerated(EnumType.ORDINAL)
    private Role role;
    @NotNull
    @Column(columnDefinition = "text")
    private String email;
    @NotNull
    private String phoneNumber;
    @NotNull
    private String password;
    @Null
    private String appointment;
    @NotNull
    private LocalDate regDate;
    @Null
    private Long tasksCount;
    @Null
    @ManyToOne
    private Region region;
    @Null
    @ManyToOne
    private Municipality municipality;
}
