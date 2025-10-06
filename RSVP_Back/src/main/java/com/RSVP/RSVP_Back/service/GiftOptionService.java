package com.RSVP.RSVP_Back.service;

import com.RSVP.RSVP_Back.model.GiftOption;
import com.RSVP.RSVP_Back.repository.GiftOptionRepository;
import com.RSVP.RSVP_Back.util.GiftTextUtil;
import com.RSVP.RSVP_Back.util.GiftSimilarityUtil;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class GiftOptionService {
    private final GiftOptionRepository giftOptionRepository;

    public GiftOptionService(GiftOptionRepository giftOptionRepository) {
        this.giftOptionRepository = giftOptionRepository;
    }

    public List<GiftOption> getOptions(UUID eventId) {
        return giftOptionRepository.findByEventIdOrderByFrequencyDesc(eventId);
    }

    /**
     * Resolve a free-text gift to an existing option if the normalized key matches,
     * otherwise create a new option so it becomes available in future.
     */
    public GiftOption resolveOrCreateOption(UUID eventId, String freeTextLabel) {
        String key = GiftTextUtil.normalizeKey(freeTextLabel);
        return giftOptionRepository.findByEventIdAndNormalizedKey(eventId, key)
                .orElseGet(() -> {
                    // Try fuzzy mapping to existing options by normalized key similarity
                    List<GiftOption> options = giftOptionRepository.findByEventIdOrderByFrequencyDesc(eventId);
                    double bestScore = 0.0; GiftOption best = null;
                    for (GiftOption opt : options) {
                        double score = GiftSimilarityUtil.jaroWinkler(key, opt.getNormalizedKey());
                        if (score > bestScore) { bestScore = score; best = opt; }
                    }
                    double THRESHOLD = 0.90; // Adjust based on desired strictness
                    if (best != null && bestScore >= THRESHOLD) {
                        best.setFrequency(best.getFrequency() + 1);
                        return giftOptionRepository.save(best);
                    }
                    GiftOption created = new GiftOption(eventId, freeTextLabel.trim(), key);
                    created.setFrequency(1);
                    return giftOptionRepository.save(created);
                });
    }
}
