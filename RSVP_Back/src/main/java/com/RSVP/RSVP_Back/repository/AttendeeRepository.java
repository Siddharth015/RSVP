package com.RSVP.RSVP_Back.repository;

import com.RSVP.RSVP_Back.model.Attendee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.UUID;


@Repository
public interface AttendeeRepository extends JpaRepository<Attendee, UUID> {
    boolean existsByEventIdAndGift(UUID eventId, String gift);
    int countByEventId(UUID eventId);
}
