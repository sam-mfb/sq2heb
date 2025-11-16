# Translation Reference Guide

## Overview

This directory contains reference materials for the Space Quest 2 Hebrew translation project, specifically designed to support **Phase 3: Message Translation**.

## Files

### translation_reference.json

A comprehensive, consolidated reference file containing all key terms, characters, locations, objects, and common phrases for the SQ2 Hebrew translation.

**Created from:**
- `/translations/sq2/glossary.json` - Translation glossary
- `/translations/sq2/objects.json` - All 20 inventory objects
- `/translations/sq2/vocabulary.json` - Complete vocabulary (432 word groups)
- `/translations/sq2/vocabulary_51-200_quick_reference.md` - Character and location names
- `/translations/references/sq1Strings.csv` - SQ1 translations for consistency

**File size:** ~14 KB (492 lines)
**Created:** 2025-11-16

## Structure

The reference file is organized into the following categories:

### 1. **metadata**
- Purpose and usage information
- Source file references
- Creation timestamp

### 2. **characters**
Character names with Hebrew translations:
- Sludge Vohaul → סלדג' וואול
- Sarien → סריאני
- Keronian → קרוני
- Roger Wilco → רוג'ר ווילקו
- And more...

### 3. **locations**
Planet and location names:
- Kerona → קרונה
- Labion → לאביון
- Orat → אורט
- Xenon → זנון
- And more...

### 4. **objects**
All 20 inventory objects from objects.json:
- order form → טופס הזמנה
- glowing gem → אבן חן זוהרת
- keycard → כרטיס מגנטי
- And more...

### 5. **sciFiTerms**
Technology and spaceship terminology:
- airlock → תא אוויר | אירלוק
- buckazoid → באקזואיד | באקס | זוז
- walbot → רובוט קיר | משעוון
- spacecraft → חללית | ספינה
- And more...

### 6. **gameTerms**
Special game-specific terms:
- cliff dweller → דייר צוק
- Labion terror beast → חיית אימה לאביונית
- Star Generator → מחולל הכוכבים

### 7. **commonVerbs**
Top 20 essential verbs with all conjugations:
- look → הבט | בדוק | הסתכל | ראה
- take → קח | הרם | טול | השג
- use → השתמש | נצל
- Each verb includes:
  - Hebrew translation
  - All common forms (imperative, infinitive, future)
  - Usage note

### 8. **commonNouns**
Frequently used nouns:
- door → דלת | דלתות
- window → חלון | חלונות
- computer → מחשב | קומפיוטר
- And more...

### 9. **commonPhrases**
Useful recurring phrases:
- with → עם
- empty → ריק | ריקה
- nothing → כלום | שום דבר
- And more...

### 10. **humorTerms**
Comedy/bathroom humor terms (SQ2 specific):
- leak → השתן | שופך | דלף
- exlax → משלשל | אקסלקס
- And more...

### 11. **colorTerms**
Color names for descriptions:
- red → אדום
- blue → כחול
- And more...

### 12. **directionTerms**
Directional references:
- north → צפון
- left → שמאל
- And more...

### 13. **translationGuidelines**
Essential rules and strategies:
- Tone: "80s Israeli humor and slang"
- Encoding: Windows-1255
- Placeholder preservation rules
- Verb/noun translation strategies
- Debug commands to skip

### 14. **sqSeriesConsistency**
Terms from SQ1 that must remain consistent:
- Sarien variations
- Xenon
- Roger Wilco
- And more...

### 15. **sq2SpecificTerms**
Terms unique to SQ2 (not in SQ1):
- Vohaul
- Orat
- Labion
- walbot
- And more...

## Usage During Phase 3

When translating game messages:

1. **Before translating any text:**
   - Open `translation_reference.json`
   - Search for character names, locations, objects
   - Ensure consistency with established translations

2. **For character names:**
   - Check `characters` section
   - Use exact spelling from reference

3. **For locations:**
   - Check `locations` section
   - Maintain consistent place names

4. **For objects:**
   - Check `objects` section
   - Use same translation as in objects.json

5. **For verbs:**
   - Check `commonVerbs` section
   - See all available conjugations
   - Choose appropriate form for context

6. **For sci-fi terms:**
   - Check `sciFiTerms` section
   - Multiple options available (use | separator)
   - Choose based on context and tone

7. **Always preserve:**
   - Placeholders: %v0, %w1, %s0, %m0, etc.
   - Escaped quotes: \"
   - Object references: i0, i1, i2, etc.

8. **Never translate:**
   - Debug commands: mem, pri, var, dbg, etc.

## Quick Lookup Tips

**Search by English term:**
```bash
# Find any mention of "Vohaul"
grep -i "vohaul" translation_reference.json

# Find "airlock" translation
grep -i "airlock" translation_reference.json
```

**Search by Hebrew term:**
```bash
# Find where "באקזואיד" is used
grep "באקזואיד" translation_reference.json
```

**Validate JSON syntax:**
```bash
python3 -m json.tool translation_reference.json > /dev/null && echo "Valid JSON"
```

## Translation Strategy Reminders

**For VERBS:**
- Include 3+ forms: imperative, infinitive, future
- Example: פתח (imperative), לפתוח (infinitive), תפתח (future)
- Players type different conjugations naturally

**For NOUNS:**
- Base form ONLY
- Compiler auto-generates prefixes (ל, ה, ב, מ)
- Example: דלת (not הדלת, לדלת)

**For HUMOR:**
- Use 80s Israeli slang
- Avoid modern expressions
- Keep original comedic tone
- Adapt cultural references

**For SCI-FI:**
- Multiple translation options allowed (using |)
- Choose based on context
- Example: "buckazoid" can be "באקזואיד" (formal) or "זוז" (humorous)

## Consistency Checks

Before submitting translations:

1. Search for character names in your messages
2. Verify against `characters` section
3. Search for location names
4. Verify against `locations` section
5. Search for object references
6. Verify against `objects` section
7. Check that placeholders are preserved
8. Check that escaped quotes are intact

## Notes

- This file consolidates data from multiple sources
- Always use this as the single source of truth for Phase 3
- If you find inconsistencies, update glossary.json first, then regenerate this file
- File is in JSON format for easy programmatic access
- Human-readable structure for manual lookup

## See Also

- `/translations/sq2/glossary.json` - Original glossary
- `/translations/sq2/objects.json` - Inventory objects
- `/translations/sq2/vocabulary.json` - Complete vocabulary
- `/translations/sq2/vocabulary_51-200_quick_reference.md` - Quick reference guide
- `/translations/references/sq1Strings.csv` - SQ1 reference translations
- `/translations/CLAUDE.md` - Translation instructions

---

**Last Updated:** 2025-11-16
**For:** Space Quest 2 Hebrew Translation - Phase 3 (Messages)
