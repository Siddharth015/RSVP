package com.RSVP.RSVP_Back.model;



import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "attendees")
public class Attendee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private UUID eventId;

    @Column(nullable = false)
    private String attendeeName;

    @Column(nullable = false)
    private int numOfAttendees;

    @Column(nullable = false)
    private String gift;

    // Getters and Setters
    public Long getId() { return id; }
    public UUID getEventId() { return eventId; }
    public String getAttendeeName() { return attendeeName; }
    public int getNumOfAttendees() { return numOfAttendees; }
    public String getGift() { return gift; }

    public void setEventId(UUID eventId) { this.eventId = eventId; }
    public void setAttendeeName(String attendeeName) { this.attendeeName = attendeeName; }
    public void setNumOfAttendees(int numOfAttendees) { this.numOfAttendees = numOfAttendees; }
    public void setGift(String gift) { this.gift = gift; }
}
