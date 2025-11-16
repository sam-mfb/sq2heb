# Translation Reference - Complete Index

This directory contains comprehensive reference materials for Phase 3 (Message Translation) of the Space Quest 2 Hebrew translation project.

## Files in This Directory

### 1. translation_reference.json (14 KB)
**Main reference file** - Single source of truth for all translation consistency

**Contains 15 major sections:**
- metadata (purpose, sources, creation date)
- characters (10 character names)
- locations (6 planet/place names)
- objects (20+ inventory items)
- sciFiTerms (30+ technology terms)
- gameTerms (special SQ2 terms)
- commonVerbs (20 essential verbs with conjugations)
- commonNouns (30+ frequently used nouns)
- commonPhrases (20+ recurring phrases)
- humorTerms (bathroom/comedy terms)
- colorTerms (color names)
- directionTerms (directional references)
- translationGuidelines (rules and strategies)
- sqSeriesConsistency (SQ1 established terms)
- sq2SpecificTerms (SQ2-unique terms)

**Sources consolidated:**
- glossary.json
- objects.json
- vocabulary.json
- vocabulary_51-200_quick_reference.md
- sq1Strings.csv

### 2. README.md (7 KB)
**Usage guide and overview**

Explains:
- File structure and organization
- How to use during Phase 3
- Quick lookup tips
- Translation strategy reminders
- Consistency check procedures

### 3. USAGE_EXAMPLES.md (current file)
**Practical translation examples**

Includes:
- 10 detailed translation examples
- Common pitfalls to avoid
- Quick reference checklist
- Programmatic lookup examples

### 4. INDEX.md (this file)
**Directory overview and quick navigation**

## Quick Navigation Guide

### Looking for Character Names?
→ Open `translation_reference.json`
→ Search for `"characters"`
→ Find names like "Sludge Vohaul", "Sarien", "Keronian"

### Looking for Locations?
→ Open `translation_reference.json`
→ Search for `"locations"`
→ Find places like "Kerona", "Labion", "Orat"

### Looking for Inventory Objects?
→ Open `translation_reference.json`
→ Search for `"objects"`
→ Find all 20 items like "keycard", "glowing gem", "oxygen mask"

### Looking for Sci-Fi Terms?
→ Open `translation_reference.json`
→ Search for `"sciFiTerms"`
→ Find terms like "airlock", "buckazoid", "walbot"

### Looking for Common Verbs?
→ Open `translation_reference.json`
→ Search for `"commonVerbs"`
→ Find verbs with all conjugations

### Need Usage Examples?
→ Open `USAGE_EXAMPLES.md`
→ See 10 practical translation scenarios

### Need General Help?
→ Open `README.md`
→ See complete usage guide

## Translation Workflow

**Step 1:** Read the original English message

**Step 2:** Identify key terms:
- Character names?
- Location names?
- Object names?
- Sci-fi terms?
- Common verbs?

**Step 3:** Look up in translation_reference.json:
- Search for the English term
- Find Hebrew translation(s)
- Note multiple options (separated by |)

**Step 4:** Translate the message:
- Use exact spelling from reference
- Preserve placeholders (%v0, %w1, etc.)
- Preserve object references (i0, i1, etc.)
- Maintain 80s Israeli humor tone

**Step 5:** Quality check:
- Character names consistent?
- Placeholders intact?
- Escaped quotes preserved?
- Same length as original?

## File Sizes and Statistics

```
translation_reference.json:  14 KB, 492 lines
README.md:                   7 KB
USAGE_EXAMPLES.md:           8 KB
INDEX.md:                    3 KB

Total reference package:    ~32 KB
```

## Key Statistics from Reference File

- **Characters:** 10 named entities
- **Locations:** 6 planets/places
- **Objects:** 20 inventory items
- **Sci-Fi Terms:** 30+ technology terms
- **Common Verbs:** 20 essential verbs
- **Common Nouns:** 30+ frequently used nouns
- **Total entries:** 150+ translation mappings

## Important Rules (Quick Reminder)

### ✅ ALWAYS Preserve:
- Placeholders: %v0, %w1, %s0, %m0, %m8
- Object references: i0, i1, i2, i20, i34, i39
- Escaped quotes: \"

### ❌ NEVER Translate:
- Debug commands: mem, pri, var, dbg, c, cm, s, sn, t, hh
- Placeholder codes
- Object reference codes

### 📋 Translation Strategy:
- **Verbs:** Include 3+ forms (imperative, infinitive, future)
- **Nouns:** Base form only (compiler adds prefixes)
- **Tone:** 80s Israeli humor, not modern slang
- **Length:** Keep roughly same as original

## External References

This directory supplements (does not replace):

- `/translations/sq2/glossary.json` - Master glossary
- `/translations/sq2/objects.json` - Object translations
- `/translations/sq2/vocabulary.json` - Complete vocabulary
- `/translations/references/sq1Strings.csv` - SQ1 reference
- `/translations/CLAUDE.md` - Translation instructions

## Updates and Maintenance

**To update this reference:**

1. Make changes in source files (glossary.json, objects.json, etc.)
2. Regenerate translation_reference.json
3. Update timestamp in metadata
4. Verify JSON validity: `python3 -m json.tool translation_reference.json`

**Last Updated:** 2025-11-16

**Status:** Ready for Phase 3 (Message Translation)

---

## Quick Command Reference

**Validate JSON:**
```bash
python3 -m json.tool translation_reference.json > /dev/null && echo "Valid"
```

**Search for English term:**
```bash
grep -i "search_term" translation_reference.json
```

**Search for Hebrew term:**
```bash
grep "עברית" translation_reference.json
```

**Count entries:**
```bash
grep -c "\"word\":" translation_reference.json
```

**View structure:**
```bash
python3 -m json.tool translation_reference.json | head -50
```

---

## Support

For questions or issues:
1. Check USAGE_EXAMPLES.md first
2. Check README.md for usage guide
3. Check original source files
4. Refer to /translations/CLAUDE.md for general instructions

---

**Created:** 2025-11-16
**Purpose:** Phase 3 (Message Translation) Reference
**Format:** JSON + Markdown documentation
**Encoding:** UTF-8
**Ready to use!**
