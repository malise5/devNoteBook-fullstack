package com.devbook.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NoteResponse {
    private Long id;
    private String author;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
