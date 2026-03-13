package com.example.ecommerce.exception_handlers;

import com.example.ecommerce.exception.TokenException;
import com.example.ecommerce.exception.UserException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GloabalExceptionHandler {

    @ExceptionHandler(UserException.class)
    public ResponseEntity<?> handleUserAlreadyExists( UserException e){
        ProblemDetail problemDetail = ProblemDetail
                .forStatusAndDetail(
                        HttpStatus.CONFLICT,
                        e.getMessage()
                );

        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(problemDetail);
    }

    // Token Exception
    @ExceptionHandler(TokenException.class)
    public ResponseEntity<?> handleTokenException( TokenException e){
        ProblemDetail problemDetail = ProblemDetail
                .forStatusAndDetail(
                        HttpStatus.FORBIDDEN,
                        e.getMessage()
                );
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(problemDetail);
    }
}
