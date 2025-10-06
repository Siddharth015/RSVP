package com.RSVP.RSVP_Back.controller;

import com.RSVP.RSVP_Back.model.Attendee;
import com.RSVP.RSVP_Back.service.AttendeeService;
import com.RSVP.RSVP_Back.service.GiftOptionService;
import com.RSVP.RSVP_Back.model.GiftOption;
import com.RSVP.RSVP_Back.util.GiftTextUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/events")  // Matches frontend calls
@CrossOrigin(origins = "https://rsvp-vcpu.vercel.app/") // Allow frontend access
public class AttendeeController {

    private final AttendeeService attendeeService;
    private final GiftOptionService giftOptionService;

    public AttendeeController(AttendeeService attendeeService, GiftOptionService giftOptionService) {
        this.attendeeService = attendeeService;
        this.giftOptionService = giftOptionService;
    }

    // Corrected API to check gift uniqueness
    @GetMapping("/{eventId}/attendees/check-gift")
    public ResponseEntity<Map<String, Boolean>> checkGiftUniqueness(
            @PathVariable UUID eventId,  
            @RequestParam String gift) {
        // Check uniqueness using normalized key
        String key = GiftTextUtil.normalizeKey(gift);
        boolean isUnique = attendeeService.isGiftUnique(eventId, key);
        Map<String, Boolean> response = new HashMap<>();
        response.put("isUnique", isUnique);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{eventId}/attendees")
    public ResponseEntity<?> registerAttendee(
            @PathVariable UUID eventId,  
            @RequestBody Attendee attendee) {
        // Resolve against options and check uniqueness by normalized key
        String key = GiftTextUtil.normalizeKey(attendee.getGift());
        if (!attendeeService.isGiftUnique(eventId, key)) {
            return ResponseEntity.badRequest().body("Gift is already taken. Please choose another one.");
        
        }

        // Register attendee
        attendee.setEventId(eventId);
        // Persist their original label for display
        attendeeService.registerAttendee(attendee);

        // Update gift options list (resolve or create)
        giftOptionService.resolveOrCreateOption(eventId, attendee.getGift());
        return ResponseEntity.ok("RSVP submitted successfully!");
    }

    // Fetch current gift options for an event to populate dropdown
    @GetMapping("/{eventId}/gift-options")
    public ResponseEntity<List<GiftOption>> getGiftOptions(@PathVariable UUID eventId) {
        return ResponseEntity.ok(giftOptionService.getOptions(eventId));
    }

    @GetMapping("/{eventId}/attendees/count")
    public ResponseEntity<Integer> getAttendeeCount(@PathVariable UUID eventId) {
        int totalCount = attendeeService.getTotalAttendees(eventId);
        return ResponseEntity.ok(totalCount);
    }
}
