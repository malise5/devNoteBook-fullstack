package com.devbook.controller;

import com.devbook.serviceImpl.NoteServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class NoteController {

    private final NoteServiceImpl noteServiceImpl;
}
