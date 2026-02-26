package com.example.ecommerce.exception;


import lombok.*;
import org.springframework.http.HttpStatus;



@Getter
@RequiredArgsConstructor
public class ImageCountException extends RuntimeException {
    private final String errorCode;
    private final HttpStatus httpStatus;

    public ImageCountException(String errorCode, String message, HttpStatus httpStatus){
        super(message);
        this.errorCode = errorCode;
        this.httpStatus = httpStatus;
    }
}
