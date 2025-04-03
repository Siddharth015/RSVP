package com.RSVP.RSVP_Back.controller;

import com.RSVP.RSVP_Back.model.Attendee;
import com.RSVP.RSVP_Back.service.AttendeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/events")  // Matches frontend calls
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend access
public class AttendeeController {

    private final AttendeeService attendeeService;

    public AttendeeController(AttendeeService attendeeService) {
        this.attendeeService = attendeeService;
    }

    // Corrected API to check gift uniqueness
    @GetMapping("/{eventId}/attendees/check-gift")
    public ResponseEntity<Map<String, Boolean>> checkGiftUniqueness(
            @PathVariable UUID eventId,  
            @RequestParam String gift) {
        boolean isUnique = attendeeService.isGiftUnique(eventId, gift);
        Map<String, Boolean> response = new HashMap<>();
        response.put("isUnique", isUnique);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{eventId}/attendees")
    public ResponseEntity<?> registerAttendee(
            @PathVariable UUID eventId,  
            @RequestBody Attendee attendee) {
        // Check if gift is unique
        if (!attendeeService.isGiftUnique(eventId, attendee.getGift())) {
            return ResponseEntity.badRequest().body("Gift is already taken. Please choose another one.");
        
        }

        // Register attendee
        attendee.setEventId(eventId);
        attendeeService.registerAttendee(attendee);
        return ResponseEntity.ok("RSVP submitted successfully!");
    }

    @GetMapping("/{eventId}/attendees/count")
    public ResponseEntity<Integer> getAttendeeCount(@PathVariable UUID eventId) {
        int totalCount = attendeeService.getTotalAttendees(eventId);
        return ResponseEntity.ok(totalCount);
    }
}
