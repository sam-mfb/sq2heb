# Translation Reference - Usage Examples

## How to Use translation_reference.json During Phase 3

This guide shows practical examples of using the reference file when translating Space Quest 2 game messages.

---

## Example 1: Simple Message with Character Name

**Original English:**
```
"Sludge Vohaul has captured you!"
```

**Translation Process:**

1. **Identify key terms:**
   - Character: "Sludge Vohaul"
   - Verb: "captured"
   - Object: "you"

2. **Look up in reference:**
   ```json
   "characters": {
     "Sludge Vohaul": "סלדג' וואול"
   }
   ```

3. **Translate:**
   ```
   "סלדג' וואול לכד אותך!"
   ```

---

## Example 2: Message with Location and Object

**Original English:**
```
"You see a keycard on the floor in the airlock."
```

**Translation Process:**

1. **Identify key terms:**
   - Object: "keycard"
   - Noun: "floor"
   - Location term: "airlock"

2. **Look up in reference:**
   ```json
   "objects": {
     "keycard": "כרטיס מגנטי"
   },
   "commonNouns": {
     "floor": "רצפה | קרקע"
   },
   "sciFiTerms": {
     "airlock": "תא אוויר | אירלוק"
   }
   ```

3. **Choose appropriate options:**
   - keycard → כרטיס מגנטי (only option)
   - floor → רצפה (more specific than קרקע)
   - airlock → תא אוויר (more Hebrew, fits 80s tone)

4. **Translate:**
   ```
   "אתה רואה כרטיס מגנטי על הרצפה בתא האוויר."
   ```

---

## Example 3: Message with Multiple Verbs

**Original English:**
```
"Look at the computer console and press the button."
```

**Translation Process:**

1. **Identify key terms:**
   - Verbs: "look", "press"
   - Nouns: "computer console", "button"

2. **Look up verbs:**
   ```json
   "commonVerbs": {
     "look": {
       "forms": ["הבט", "להביט", "תביט", "בדוק", "לבדוק", "תבדוק", ...]
     },
     "push": {
       "forms": ["לחץ", "ללחוץ", "תלחץ", "דחוף", "לדחוף", "תדחוף"]
     }
   }
   ```

3. **Look up nouns:**
   ```json
   "sciFiTerms": {
     "computer console": "קונסולת מחשב | לוח בקרה"
   },
   "commonNouns": {
     "button": "כפתור | מתג | מקש"
   }
   ```

4. **Choose imperative forms for commands:**
   - look → הבט (classic command form)
   - press → לחץ (imperative)
   - console → לוח בקרה (more 80s tech term)
   - button → כפתור (most common)

5. **Translate:**
   ```
   "הבט על לוח הבקרה ולחץ על הכפתור."
   ```

---

## Example 4: Humorous Message (SQ2 style)

**Original English:**
```
"You really need to use the toilet. Better find one soon!"
```

**Translation Process:**

1. **Identify humor terms:**
   - Bathroom humor: "toilet", "use"

2. **Look up humor terms:**
   ```json
   "humorTerms": {
     "toilet": "אסלה | שירותים"
   }
   ```

3. **Adapt to Israeli humor:**
   - Keep the urgency
   - Use more direct Hebrew slang

4. **Translate:**
   ```
   "אתה ממש צריך להשתמש בשירותים. כדאי למצוא אסלה במהרה!"
   ```

   Or more slangy:
   ```
   "אתה ממש צריך לשירותים. עדיף למצוא אסלה מהר!"
   ```

---

## Example 5: Message with Placeholder

**Original English:**
```
"You picked up the %w1."
```

**Translation Process:**

1. **IMPORTANT:** Preserve %w1 placeholder!

2. **Look up verb:**
   ```json
   "commonVerbs": {
     "take": {
       "forms": ["קח", "לקחת", "תקח", "הרם", "להרים", "תרים"]
     }
   }
   ```

3. **Choose past tense form:**
   - "picked up" → לקחת (past)

4. **Translate with placeholder intact:**
   ```
   "לקחת את %w1."
   ```

   Note: %w1 will be replaced at runtime with object name

---

## Example 6: Message with Object Reference

**Original English:**
```
"You already have the i34."
```

**Translation Process:**

1. **Check what i34 is:**
   - From objects.json: i34 = "Cage Key" (מפתח לכלוב)

2. **Look up in reference:**
   ```json
   "objects": {
     "cage key": "מפתח לכלוב"
   }
   ```

3. **IMPORTANT:** Keep i34 reference!

4. **Translate:**
   ```
   "כבר יש לך את i34."
   ```

   Runtime will replace i34 with "מפתח לכלוב"

---

## Example 7: Direction/Movement Message

**Original English:**
```
"You can't go north from here."
```

**Translation Process:**

1. **Look up direction:**
   ```json
   "directionTerms": {
     "north": "צפון"
   }
   ```

2. **Translate:**
   ```
   "אתה לא יכול ללכת צפונה מכאן."
   ```

---

## Example 8: Sci-Fi Technology Description

**Original English:**
```
"The walbot patrols the corridor with its pressure gauge flashing."
```

**Translation Process:**

1. **Look up SQ2-specific terms:**
   ```json
   "sq2SpecificTerms": {
     "walbot": "רובוט קיר | משעוון"
   },
   "sciFiTerms": {
     "pressure gauge": "מד לחץ | מחוון"
   },
   "commonNouns": {
     "corridor": "מסדרון"
   }
   ```

2. **Choose based on tone:**
   - walbot → רובוט קיר (descriptive, fits context)
   - pressure gauge → מד לחץ (more technical)
   - corridor → מסדרון (standard)

3. **Translate:**
   ```
   "רובוט הקיר מפטרל במסדרון כשמד הלחץ שלו מהבהב."
   ```

---

## Example 9: Multiple Locations Referenced

**Original English:**
```
"Roger Wilco escaped from Kerona to reach Labion."
```

**Translation Process:**

1. **Look up all names:**
   ```json
   "characters": {
     "Roger Wilco": "רוג'ר ווילקו"
   },
   "locations": {
     "Kerona": "קרונה",
     "Labion": "לאביון"
   }
   ```

2. **Translate:**
   ```
   "רוג'ר ווילקו ברח מקרונה כדי להגיע للאביון."
   ```

---

## Example 10: Color Description

**Original English:**
```
"You see a red door and a blue window."
```

**Translation Process:**

1. **Look up colors and nouns:**
   ```json
   "colorTerms": {
     "red": "אדום",
     "blue": "כחול"
   },
   "commonNouns": {
     "door": "דלת | דלתות",
     "window": "חלון | חלונות"
   }
   ```

2. **Apply gender agreement:**
   - door (feminine) → דלת אדומה
   - window (masculine) → חלון כחול

3. **Translate:**
   ```
   "אתה רואה דלת אדומה וחלון כחול."
   ```

---

## Common Pitfalls to Avoid

### ❌ DON'T: Translate placeholders
```
Wrong: "לקחת את מילה1"
Right: "לקחת את %w1"
```

### ❌ DON'T: Add prefixes to inventory objects
```
Wrong: "לקחת את המפתח"
Right: "לקחת את i34"
```

### ❌ DON'T: Translate debug commands
```
Wrong: "זכרון | משתנה"
Right: Skip translating "mem" and "var"
```

### ❌ DON'T: Change character name spelling
```
Wrong: "סלאדג' ווהאול"
Right: "סלדג' וואול" (exactly as in reference)
```

### ❌ DON'T: Ignore escaped quotes
```
Wrong: "הוא אמר "שלום""
Right: "הוא אמר \"שלום\""
```

---

## Quick Reference Checklist

Before submitting each translation:

- [ ] Checked character names in reference
- [ ] Checked location names in reference
- [ ] Checked object names in reference
- [ ] Preserved all placeholders (%v0, %w1, %s0, %m0)
- [ ] Preserved all object references (i0, i1, i2)
- [ ] Preserved escaped quotes (\")
- [ ] Skipped debug commands
- [ ] Used appropriate verb conjugations
- [ ] Applied proper gender agreement
- [ ] Maintained 80s Israeli humor tone
- [ ] Kept roughly same length as original

---

## Advanced: Programmatic Lookup

If you're using scripts to process messages, you can load the JSON:

```python
import json

# Load reference
with open('translation_reference.json', 'r', encoding='utf-8') as f:
    ref = json.load(f)

# Look up character
character = ref['characters']['Sludge Vohaul']
print(character)  # Output: סלדג' וואול

# Look up verb forms
look_forms = ref['commonVerbs']['look']['forms']
print(look_forms)  # Output: ['הבט', 'להביט', 'תביט', ...]

# Look up object
keycard = ref['objects']['keycard']
print(keycard)  # Output: כרטיס מגנטי
```

---

## Need Help?

If you can't find a term in the reference:

1. Check the original source files:
   - `/translations/sq2/glossary.json`
   - `/translations/sq2/vocabulary.json`

2. Check SQ1 reference:
   - `/translations/references/sq1Strings.csv`

3. For new terms, add to glossary.json first, then update reference

4. Maintain consistency with established patterns

---

**Last Updated:** 2025-11-16
**For:** Space Quest 2 Hebrew Translation - Phase 3 (Messages)
