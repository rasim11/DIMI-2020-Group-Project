package com.netcracker.project.service;

import com.netcracker.project.model.Task;
import com.netcracker.project.model.User;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

import static com.netcracker.project.controllers.rest.PersonalAccountRestController.TIME_BEFORE_ACCOUNT_DELETION;
import static com.netcracker.project.url.UrlTemplates.*;

@Service
public class MailService {
    private static final String USERNAME = "finderbot44@gmail.com";
    private static final String PASSWORD = "QAZ_wsx_123";
    private static final String SMTP = "smtp.gmail.com";
    private static final int PORT = 587;
    private static final String PROJECT_NAME = "Social Issues Tracker";

    @Async
    public void changeStatus(Task task) {
        final String subj = String.format("Изменён статус по проблеме «%s»", task.getTaskName());
        final String body = String.format("Уважаемый, %s %s! У заведённой Вами проблемы «%s» был изменён статус " +
                        "на «%s».\nДля получения более подробной информации перейдите на страницу данной проблемы по ссылке: " +
                        "%s.\n\nС уважением, команда разработчиков платформы «%s»!",
                task.getAuthor().getFirstname(), task.getAuthor().getMiddlename(), task.getTaskName(),
                task.getStatus().getName(),
                (LOCAL + LOCAL_URL_GET_TASK_BY_ID.replace("{id}", task.getId().toString())), PROJECT_NAME);

        this.sendMail(subj, body, task.getAuthor().getEmail());
    }

    @Async
    public void confirmAccount(User user) {
        final String subj = String.format("Подтверждение регистрации на платформе «%s»", PROJECT_NAME);
        final String body = String.format("Уважаемый, %s %s! Вы зарегистрировались на платформе «%s». " +
                        "Для завершения регистрации необходимо подтвердить адрес электронной почты. " +
                        "Для этого перейдите по ссылке: %s.\nЕсли вы не регистрировались на нашей платформе то, " +
                        "проигнорируйте данное письмо. Аккаунт будет автоматически удалён через %s часа.\n\n" +
                        "С уважением, команда разработчиков платформы «%s»!",
                user.getFirstname(), user.getMiddlename(), PROJECT_NAME,
                LOCAL + LOCAL_URL_GET_CONFIRM_ACCOUNT.replace("{url}", user.getUrlAccountConfirm()),
                TIME_BEFORE_ACCOUNT_DELETION / 1000 / 60 / 60, PROJECT_NAME);

        this.sendMail(subj, body, user.getEmail());
    }

    @Async
    public void sendMail(String subj, String body, String to) {
        Properties prop = new Properties();
        prop.put("mail.smtp.host", SMTP);
        prop.put("mail.smtp.port", PORT);
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.starttls.enable", "true");

        Session session = Session.getInstance(prop,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(USERNAME, PASSWORD);
                    }
                });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(USERNAME, PROJECT_NAME));
            message.setRecipients(
                    Message.RecipientType.TO,
                    InternetAddress.parse(to)
            );
            message.setSubject(subj);
            message.setText(body);

            Transport.send(message);

            System.out.println("Email send");

        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }
}
