package com.devbook.controller;

import com.devbook.dto.NoteRequest;
import com.devbook.dto.NoteResponse;
import com.devbook.serviceImpl.NoteServiceImpl;
import jakarta.validation.Valid;
import lombok.Generated;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/notes")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class NoteController {

    private final NoteServiceImpl noteServiceImpl;

    @PostMapping
    public ResponseEntity<NoteResponse> createNote(@Valid @RequestBody NoteRequest noteRequest) {
        return ResponseEntity.ok(noteServiceImpl.createNote(noteRequest));
    }

    @GetMapping("/paged")
    public ResponseEntity<Page<NoteResponse>> getNotes(Pageable pageable) {
        return ResponseEntity.ok(noteServiceImpl.getNotes(pageable));
    }

    @GetMapping
    public ResponseEntity<Iterable<NoteResponse>> getAllNotes() {
        return ResponseEntity.ok(noteServiceImpl.getAllNotes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoteResponse> getNoteById(@PathVariable Long id) {
        return ResponseEntity.ok(noteServiceImpl.getNoteById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<NoteResponse> updateNote(@PathVariable Long id, @Valid @RequestBody NoteRequest noteRequest) {
        return ResponseEntity.ok(noteServiceImpl.updateNote(id, noteRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        noteServiceImpl.deleteNote(id);
        return ResponseEntity.noContent().build();
    }
}
