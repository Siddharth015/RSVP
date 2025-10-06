package com.RSVP.RSVP_Back.model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "gift_options", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"event_id", "normalized_key"})
})
public class GiftOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "event_id", nullable = false)
    private UUID eventId;

    @Column(name = "label", nullable = false)
    private String label; // Display label for dropdown

    @Column(name = "normalized_key", nullable = false)
    private String normalizedKey; // Normalized comparison key

    @Column(name = "frequency", nullable = false)
    private int frequency = 0; // How many times users picked/typed this

    public GiftOption() {}

    public GiftOption(UUID eventId, String label, String normalizedKey) {
        this.eventId = eventId;
        this.label = label;
        this.normalizedKey = normalizedKey;
    }

    public Long getId() { return id; }
    public UUID getEventId() { return eventId; }
    public String getLabel() { return label; }
    public String getNormalizedKey() { return normalizedKey; }
    public int getFrequency() { return frequency; }

    public void setEventId(UUID eventId) { this.eventId = eventId; }
    public void setLabel(String label) { this.label = label; }
    public void setNormalizedKey(String normalizedKey) { this.normalizedKey = normalizedKey; }
    public void setFrequency(int frequency) { this.frequency = frequency; }
}
