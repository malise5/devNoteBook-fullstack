package com.devbook.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class NoteRequest {

    @NotBlank(message = "Author is required")
    private String author;

    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title can't exceed 200 characters")
    private String title;

    @NotBlank(message = "Content is required")
    private String content;
}
