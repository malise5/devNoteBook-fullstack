package com.devbook.service;

import com.devbook.dto.NoteRequest;
import com.devbook.dto.NoteResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface NoteService {
    NoteResponse createNote(NoteRequest request);
    Page<NoteResponse> getNotes(Pageable pageable);

    NoteResponse updateNote(Long id, NoteRequest request);
    NoteResponse getNoteById(Long id);
    List<NoteResponse> getAllNotes();
    void deleteNote(Long id);
}
