package com.netcracker.projectDb.model.comparator;


import com.netcracker.projectDb.model.Task;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Comparator;

public class CompareByDate implements Comparator<Task> {
    @Override
    public int compare(Task taskLeft, Task taskRight) {
//        return o1.getStartDate().compareTo(o2.getStartDate());
        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss");


//            LocalDateTime localDateTimeLeft = LocalDateTime.parse(taskLeft.getRegDate(), format);

        LocalDateTime localDateTimeLeft;
        LocalDateTime localDateTimeRight;
        try {
              localDateTimeLeft = LocalDateTime.parse( taskLeft.getRegDate(), format);
        } catch (DateTimeParseException exception)
        {
            localDateTimeLeft = LocalDateTime.now();
        }

        try {
            localDateTimeRight = LocalDateTime.parse(taskRight.getRegDate(), format);
        } catch (DateTimeParseException exception)
        {
            localDateTimeRight = LocalDateTime.now();
        }
        return  -localDateTimeLeft.compareTo(localDateTimeRight);
    }
}