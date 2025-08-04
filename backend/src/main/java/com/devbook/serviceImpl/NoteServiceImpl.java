package com.devbook.serviceImpl;

import com.devbook.dto.NoteRequest;
import com.devbook.dto.NoteResponse;
import com.devbook.exception.NoteNotFoundException;
import com.devbook.mapper.NoteMapper;
import com.devbook.model.Note;
import com.devbook.repository.NoteRepository;
import com.devbook.service.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteServiceImpl implements NoteService {

    private final NoteRepository noteRepository;
    @Override
    public NoteResponse createNote(NoteRequest request) {
        // Convert NoteRequest to Note entity
        Note note = NoteMapper.toEntity(request);

        // Save the note to the repository
        Note savedNote = noteRepository.save(note);

        // Convert saved Note entity back to NoteResponse
        return NoteMapper.toResponse(savedNote);
    }

    @Override
    public NoteResponse updateNote(Long id, NoteRequest request) {
        // Find the existing note by ID
        Note existingNote = noteRepository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException(id));

        // Update the existing note with new data
        NoteMapper.updateEntity(existingNote, request);

        // Save the updated note to the repository
        Note updatedNote = noteRepository.save(existingNote);

        // Convert updated Note entity back to NoteResponse
        return NoteMapper.toResponse(updatedNote);
    }

    @Override
    public NoteResponse getNoteById(Long id) {
        // Find the note by ID
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException(id));

        // Convert Note entity to NoteResponse
        return NoteMapper.toResponse(note);
    }

    @Override
    public List<NoteResponse> getAllNotes() {
        // Retrieve all notes from the repository
        List<Note> notes = noteRepository.findAll();

        // Convert List of Note entities to List of NoteResponse
        return notes.stream()
                .map(NoteMapper::toResponse)
                .toList();
    }

    @Override
    public void deleteNote(Long id) {
        // Check if the note exists before deleting
        if (!noteRepository.existsById(id)) {
            throw new NoteNotFoundException(id);
        }

        // Delete the note by ID
        noteRepository.deleteById(id);
    }
}
