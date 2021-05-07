package com.netcracker.projectDb.model.response;


import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;


import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class FilterParamsTest {

    @Test
    void isDateRangeIsCorrect() {
        FilterParams filterParams = new FilterParams();

        LocalDate left = LocalDate.now();
        LocalDate right = LocalDate.now();
        filterParams.setLeftDate(left);
        filterParams.setRightDate(right);

        Assertions.assertEquals(true, filterParams.isDateRangeIsCorrect());

        left = LocalDate.now().plusDays(10);
        filterParams.setLeftDate(left);
        Assertions.assertEquals(false, filterParams.isDateRangeIsCorrect());

        Assertions.assertEquals(false, filterParams.isFilterEmpty());

        filterParams.setRightDate(null);
        filterParams.setLeftDate(null);
        Assertions.assertEquals(true, filterParams.isFilterEmpty());

        filterParams.setAuthorFilter("");
        filterParams.setResponsibleFilter("");
        Assertions.assertEquals(true, filterParams.isFilterEmpty());


        FilterRadio filterRadio = new FilterRadio();
        filterParams.setFilterRadio(filterRadio);
        Assertions.assertEquals(false, filterParams.isFilterEmpty());


    }
}