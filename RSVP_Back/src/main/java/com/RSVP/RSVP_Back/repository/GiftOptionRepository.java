package com.RSVP.RSVP_Back.repository;

import com.RSVP.RSVP_Back.model.GiftOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface GiftOptionRepository extends JpaRepository<GiftOption, Long> {
    Optional<GiftOption> findByEventIdAndNormalizedKey(UUID eventId, String normalizedKey);
    List<GiftOption> findByEventIdOrderByFrequencyDesc(UUID eventId);
}
