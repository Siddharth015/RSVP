package com.RSVP.RSVP_Back.service;



import com.RSVP.RSVP_Back.model.Attendee;
import com.RSVP.RSVP_Back.repository.AttendeeRepository;
import com.RSVP.RSVP_Back.util.GiftTextUtil;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AttendeeService {
    private final AttendeeRepository attendeeRepository;
    public AttendeeService(AttendeeRepository attendeeRepository) {
        this.attendeeRepository = attendeeRepository;
    }

    public boolean isGiftUnique(UUID eventId, String gift) {
    String key = GiftTextUtil.normalizeKey(gift);
    return !attendeeRepository.existsByEventIdAndGiftKey(eventId, key);
    }

    public void registerAttendee(Attendee attendee) {
        // Assign canonical giftKey before save
        String key = GiftTextUtil.normalizeKey(attendee.getGift());
        attendee.setGiftKey(key);
        attendeeRepository.save(attendee);
    }

    public int getTotalAttendees(UUID eventId) {
        return attendeeRepository.countByEventId(eventId);
    }
}
