package com.RSVP.RSVP_Back.service;



import com.RSVP.RSVP_Back.model.Attendee;
import com.RSVP.RSVP_Back.repository.AttendeeRepository;
import org.springframework.stereotype.Service;

import java.util.List ;
import java.util.UUID;

@Service
public class AttendeeService {
    private final AttendeeRepository attendeeRepository;

    public AttendeeService(AttendeeRepository attendeeRepository) {
        this.attendeeRepository = attendeeRepository;
    }

    public boolean isGiftUnique(UUID eventId, String gift) {
        return !attendeeRepository.existsByEventIdAndGift(eventId, gift);
    }

    public void registerAttendee(Attendee attendee) {
        attendeeRepository.save(attendee);
    }

    public int getTotalAttendees(UUID eventId) {
        return attendeeRepository.countByEventId(eventId);
    }
}
