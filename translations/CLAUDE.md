# Translation Instructions

You are translating the Sierra game **Space Quest 2** into Hebrew. Specifically you will be translating:

- **Inventory items/objects** - Item names and descriptions
- **Messages in the game** - Narration, dialogue, descriptions
- **Vocabulary words** - Commands the user can type (look, take, open, etc.)

## General Guidance

Space Quest was a humorous science fiction adventure game from the late 80s. Its humor is quirky, sarcastic, and nerdy. Your translations should:

1. **Capture the original tone** - Use appropriate idiomatic expressions and slang familiar to Israelis in the 80s
2. **Adapt cultural references** - This was an American game; adapt references to Israeli culture when appropriate
3. **Use period-appropriate Hebrew** - Stick to 80s-era slang and expressions; avoid modern Hebrew slang
4. **Preserve humor** - The game is comedic; ensure jokes and sarcasm translate well
5. **Maintain consistency** - Use the same terminology throughout (see reference files below)

## Reference Files

### Vocabulary Words (Commands/Verbs)

King's Quest games have a very different vibe than Space Quest, but they had a similar text parser interface. **Hebrew translations of standard commands and action words should be consistent across all Sierra games.**

Available reference files:

- `translations/references/kq1Words.csv` - King's Quest 1 vocabulary
- `translations/references/kq2Words.csv` - King's Quest 2 vocabulary
- `translations/references/kq3Words.csv` - King's Quest 3 vocabulary

**Format:** CSV with columns: אינדקס (index), מקור (source/English), תרגום (translation/Hebrew), הערות (notes)

**IMPORTANT - Vocabulary Translation Strategy:**

For **nouns**, the AGI compiler will automatically generate variations with prepositional prefixes (ל, ה, ב, מ, etc.). Only provide the base noun form.

For **verbs**, provide the forms that users are most likely to type. This includes:

- Imperative forms (command forms): הבט, קח, פתח
- Infinitive forms: לראות, לקחת, לפתוח
- Future tense forms: תראה, תקח, תפתח
- Any conjugation a player might naturally type

**Examples:**

- Nouns: דלת (not הדלת, לדלת - prefixes auto-generated)
- Verbs: הבט / תסתכל / לראות (include common typing variations)

**Key verbs to keep consistent:**

- look/examine/see → הבט / תסתכל / לראות / תראה
- take/get → קח / לקחת / תקח / השג
- open → פתח / לפתוח / תפתח
- use → השתמש / להשתמש / תשתמש
- talk → דבר / לדבר / תדבר
- climb → טפס / לטפס / תטפס

### Messages and Game Text

Space Quest 1 has been translated and serves as the primary reference for:

- **Tone and style** - How to handle sci-fi humor in Hebrew
- **Recurring characters/terms** - Roger Wilco, Sarien, etc.
- **Common game messages** - Death messages, navigation text, etc.

Available reference file:

- `translations/references/sq1Strings.csv` - Space Quest 1 complete translation

**Important:** The SQ1 translators were experienced and their choices should be respected. Familiarize yourself with their work before starting.

## Translation Reference Materials (SQ2)

**Space Quest 2 translation is in progress.** The following materials have been completed and are available for reference:

### Completed Translation Files

Located in `sq2/`:

1. **`vocabulary.json`** - ✅ **COMPLETE** (433 words)
   - All vocabulary words translated with Hebrew synonyms
   - `notes` field blank (reserved for human editors)
   - Includes verb conjugations and noun base forms
   - Cross-referenced with KQ1-3 for consistency

2. **`objects.json`** - ✅ **COMPLETE** (20 items)
   - All inventory item names translated
   - `notes` field blank (reserved for human editors)

3. **`messages.json`** - ⏳ **IN PROGRESS** (1,828 messages)
   - Awaiting translation
   - See workflow below

### Reference Materials for Message Translation

Located in `sq2/reference/`:

#### **1. translation_reference.json** - PRIMARY REFERENCE

**Use this file constantly during message translation!**

Comprehensive glossary with 200+ entries organized by category:

- **characters** (11) - Character names: Sludge Vohaul → סלדג' וואול, Sarien → סריאני, Roger Wilco → רוג'ר ווילקו
- **locations** (6) - Planet/place names: Kerona → קרונה, Labion → לאביון, Orat → אורט
- **objects** (23) - All inventory items: keycard → כרטיס מגנטי, oxygen mask → מסכת חמצן
- **sciFiTerms** (36) - Technology: airlock → תא אוויר | אירלוק, buckazoid → באקזואיד | באקס | זוז
- **commonVerbs** (20) - Essential verbs with full conjugations
- **commonNouns** (32) - Frequently used nouns
- **commonPhrases** (24) - Recurring phrases
- **humorTerms** (8) - Bathroom/comedy terms (SQ2 signature humor)
- **translationGuidelines** (11) - Translation rules and strategies
- **sqSeriesConsistency** (7) - SQ1 established terms to maintain
- **sq2SpecificTerms** (10) - SQ2-unique terms (walbot, insurance salesman clones, etc.)

#### **2. vocabulary_translation_notes.md**

Translation decisions and rationale for vocabulary choices:

- Why certain Hebrew terms were selected
- KQ1-3 cross-references for standard verbs
- SQ1 consistency notes
- 80s Israeli slang choices
- Special cases and ambiguities

#### **3. vocabulary_complete_analysis.md**

Statistical analysis of all vocabulary translations:

- Breakdown by word type (verbs, nouns, sci-fi, etc.)
- Cross-phase consistency verification
- Quality metrics

#### **4. vocabulary_51-200_quick_reference.md**

Quick lookup table for common terms:

- Character names
- Location names
- Profanity/humor translations
- Technology terms

#### **5. README.md, USAGE_EXAMPLES.md, INDEX.md**

Documentation explaining how to use the reference materials effectively.

### Translation Workflow for Messages (Phase 3)

When translating messages:

1. **Before starting a batch:**
   - Open `translation_reference.json` and review relevant categories
   - Check if the message contains character/location names
   - Identify any inventory objects mentioned

2. **While translating:**
   - **Character names:** Always use exact translations from `translation_reference.json` → characters
   - **Location names:** Check `translation_reference.json` → locations
   - **Objects:** Verify consistency with `objects.json` and `translation_reference.json` → objects
   - **Sci-fi terms:** Look up technology/spaceship terms in `translation_reference.json` → sciFiTerms
   - **Common phrases:** Check `translation_reference.json` → commonPhrases for consistency

3. **For style/tone:**
   - Reference `vocabulary_translation_notes.md` for 80s slang approach
   - Check SQ1 translation for similar message types
   - Maintain Space Quest's quirky, sarcastic humor

4. **Preserve technical elements:**
   - **Placeholders:** Never translate `%v0`, `%w1`, `%s0`, `%m8`, etc.
   - **Object references:** `i0`, `i1`, `i2` map to inventory objects (check `objects.json`)
   - **Escaped quotes:** Preserve `\"` exactly as-is
   - **Line breaks:** Keep `\n` codes intact

5. **Use the notes field:**
   - Add editorial comments to `messages.json` → `notes` field
   - Document any ambiguities or translation choices
   - Flag items needing review

### Example Message Translation Workflow

```
Original: "You don't have the keycard."
Placeholders: None
Objects: keycard (i36 from objects.json)

Step 1: Check translation_reference.json → objects
        → keycard: "כרטיס מגנטי"

Step 2: Translate maintaining Hebrew grammar
        → "אין לך את הכרטיס המגנטי."

Step 3: Verify tone (informative, direct - typical adventure game)
Step 4: Add to messages.json with translation and blank notes
```

## Translation Workflow

1. **Review reference files first** - Check SQ1 strings and KQ vocabulary before starting
2. **Maintain a glossary** - Keep track of your translation choices for consistency
3. **Preserve placeholders** - AGI uses codes like `%v0`, `%w1`, `%s0` - **do not translate these**
4. **Test in context** - Translations must fit the original space constraints (character limits)

## Technical Notes

- **Character encoding:** Game uses Windows-1255 for Hebrew text
- **Direction:** Right-to-left (RTL) text is supported
- **Length constraints:** Keep translations roughly the same length as originals
- **Special characters:** Avoid characters outside Windows-1255 encoding
- **Line breaks:** Preserve `\n` line break codes exactly as they appear

## Common Pitfalls to Avoid

❌ **Don't translate:**

- Variable placeholders (`%v0`, `%s1`, etc.)
- Resource references (`i0`, `i1`, etc.)
- Command syntax in logic files

❌ **Don't add prefixes to nouns:**

- For nouns only, the compiler auto-generates variations with ל, ה, ב, מ, etc.
- For verbs, DO include forms users might type (imperatives, infinitives, conjugations)

❌ **Don't modernize:**

- Use 80s-era Hebrew, not 2020s slang
- Keep the retro sci-fi feel

❌ **Don't ignore references:**

- Always check SQ1 translation for recurring elements
- Always check KQ translations for standard verbs

## Questions?

If you're unsure about a translation choice:

1. Check the reference files first
2. Consider the character and context
3. Prioritize humor and playability over literal accuracy
4. When in doubt, ask for clarification
