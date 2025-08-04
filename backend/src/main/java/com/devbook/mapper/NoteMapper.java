package com.devbook.mapper;

import com.devbook.dto.NoteRequest;
import com.devbook.dto.NoteResponse;
import com.devbook.model.Note;

import java.time.LocalDateTime;

public class NoteMapper {

    public static Note toEntity(NoteRequest request) {
        Note note = new Note();
        note.setAuthor(request.getAuthor());
        note.setTitle(request.getTitle());
        note.setContent(request.getContent());
        note.setCreatedAt(LocalDateTime.now());
        note.setUpdatedAt(LocalDateTime.now());
        return note;
    }

    public static void updateEntity(Note note, NoteRequest request) {
        note.setAuthor(request.getAuthor());
        note.setTitle(request.getTitle());
        note.setContent(request.getContent());
        note.setUpdatedAt(LocalDateTime.now());
    }

    public static NoteResponse toResponse(Note note) {
        NoteResponse response = new NoteResponse();
        response.setId(note.getId());
        response.setAuthor(note.getAuthor());
        response.setTitle(note.getTitle());
        response.setContent(note.getContent());
        response.setCreatedAt(note.getCreatedAt());
        response.setUpdatedAt(note.getUpdatedAt());
        return response;
    }

    public static NoteRequest toRequest(Note note) {
        NoteRequest request = new NoteRequest();
        request.setAuthor(note.getAuthor());
        request.setTitle(note.getTitle());
        request.setContent(note.getContent());
        return request;
    }
}
