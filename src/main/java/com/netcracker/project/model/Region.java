package com.netcracker.project.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Region implements Cloneable {
    private int id;
    private String regionName;

    @Override
    public Region clone() throws CloneNotSupportedException{

        return (Region) super.clone();
    }
}
