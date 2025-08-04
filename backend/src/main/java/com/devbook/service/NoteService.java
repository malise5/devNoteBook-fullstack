package com.devbook.service;

import com.devbook.dto.NoteRequest;
import com.devbook.dto.NoteResponse;

import java.util.List;

public interface NoteService {
    NoteResponse createNote(NoteRequest request);
    NoteResponse updateNote(Long id, NoteRequest request);
    NoteResponse getNoteById(Long id);
    List<NoteResponse> getAllNotes();
    void deleteNote(Long id);
}
