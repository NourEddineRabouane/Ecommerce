package com.example.ecommerce.utils;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmailService {

    @Autowired
    private final JavaMailSender mailSender;

    private final
    String html = """
<div style="font-family: Arial; text-align:center;">
    <h2>Email Verification</h2>
    <p>Please click the button below to verify your email.</p>

    <a href="%s"
       style="padding:12px 20px;
              background:#4CAF50;
              color:white;
              text-decoration:none;
              border-radius:5px;">
        Verify Email
    </a>

    <p style="margin-top:20px;">
        If the button doesn't work copy this link:
    </p>

    <p>%s</p>
</div>
""";
    public void sendPlainText( String to, String subject, String  text){
        // Create message object
        SimpleMailMessage message = new SimpleMailMessage();
        // Set attributes
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        // Send email
        mailSender.send(message);

    }

    public void sendHtml(String to, String subject , String url) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "UTF-8");
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(html.formatted(url, url), true); // true means this is HTML
        mailSender.send(message);
    }

}
