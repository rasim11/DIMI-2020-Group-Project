package com.netcracker.project.service;

import com.netcracker.project.model.Task;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

import static com.netcracker.project.url.UrlTemplates.LOCAL;
import static com.netcracker.project.url.UrlTemplates.LOCAL_URL_GET_TASK_BY_ID;

@Service
public class MailService {
    @Async
    public void sendMail(Task task) {
        final String projectName = "Social Issues Tracker";
        final String subj = String.format("Изменён статус по проблеме «%s»", task.getTaskName());
        final String body = String.format("Уважаемый, %s %s! У заведённой Вами проблемы «%s» был изменён статус " +
                        "на «%s».\nДля получения более подробной информации перейдите на страницу данной проблемы по ссылке: " +
                        "%s.\n\nС уважением, команда разработчиков платформы «%s»!",
                task.getAuthor().getFirstname(), task.getAuthor().getMiddlename(), task.getTaskName(),
                task.getStatus().getName(),
                (LOCAL + LOCAL_URL_GET_TASK_BY_ID.replace("{id}", task.getId().toString())), projectName);
        final String username = "finderbot44@gmail.com";
        final String password = "QAZ_wsx_123";
        final String smtp = "smtp.gmail.com";
        final int port = 587;

        Properties prop = new Properties();
        prop.put("mail.smtp.host", smtp);
        prop.put("mail.smtp.port", port);
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.starttls.enable", "true");

        Session session = Session.getInstance(prop,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username, projectName));
            message.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse(task.getAuthor().getEmail())
            );
            message.setSubject(subj);
            message.setText(body);

            Transport.send(message);

            System.out.println("Done");

        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }
}
