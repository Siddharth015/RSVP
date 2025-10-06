package com.RSVP.RSVP_Back.util;

import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;

/**
 * Utility for lightweight, generic normalization of gift names without hardcoded synonyms.
 * - lowercase, trim, diacritics removal
 * - non-alphanumeric to single spaces
 * - collapse whitespace
 * - basic plural trimming (bikes -> bike)
 */
public final class GiftTextUtil {
    private GiftTextUtil() {}

    private static final Pattern NON_ALNUM = Pattern.compile("[^a-z0-9]+");
    private static final Pattern COMBINING_MARKS = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");

    public static String normalizeKey(String input) {
        if (input == null) return "";
        String s = input.toLowerCase(Locale.ROOT).trim();
        s = Normalizer.normalize(s, Normalizer.Form.NFD);
        s = COMBINING_MARKS.matcher(s).replaceAll("");
        s = NON_ALNUM.matcher(s).replaceAll(" ");
        s = s.trim().replaceAll("\\s+", " ");
        if (s.endsWith("ies") && s.length() > 4) {
            s = s.substring(0, s.length() - 3) + "y";
        } else if (s.endsWith("s") && s.length() > 3 && !s.endsWith("ss")) {
            s = s.substring(0, s.length() - 1);
        }
        return s;
    }
}
