package com.example.ecommerce.exception_handlers;


import com.example.ecommerce.exception.ImageCountException;
import com.example.ecommerce.image.ImageApiErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandlerForImages {

    @ExceptionHandler(ImageCountException.class)
    public ResponseEntity<ImageApiErrorResponse> handleApplicationException(
            final ImageCountException exception,
            final HttpServletRequest request
            ){
        var guid = "id";
        var response = new ImageApiErrorResponse(
                guid,
                exception.getErrorCode(),
                exception.getMessage(),
                exception.getHttpStatus().value(),
                exception.getHttpStatus().name(),
                request.getRequestURI(),
                request.getMethod(),
                LocalDateTime.now()
        );

        return  new ResponseEntity<>(response, exception.getHttpStatus());
    }
}
