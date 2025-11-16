# Batch 11 Translation Notes

**Logic File:** 16.agilogic
**Message Count:** 35
**Location Context:** Forest area with fissure, log bridge, and rope climbing sequence

## Translation Decisions

### Environmental Terms
- **fissure** → **בקע** - geological crack/fissure (used consistently)
- **log** → **בול** - fallen tree trunk
- **stump** → **גזע** - tree stump
- **snag** → **גזע** - dead standing tree (used context-appropriate translation)
- **foliage** → **עלווה** - tree leaves/vegetation

### Key Phrase Translations

#### Message 9: "Holy logjams, Batman!"
- Translation: "אלוהים ישמור, באטמן!"
- Preserves the Batman reference (80s cultural touchstone)
- "Holy logjams" → "אלוהים ישמור" (God protect us) - common 80s Israeli exclamation
- Maintains the humorous tone

#### Message 10: Death by Falling
- "redimensioned to the point where life is no longer an option"
- Translation: "משונות לממדים שבהם החיים כבר לא אופציה"
- Preserves the dark humor and technical-sounding euphemism for death
- "redimensioned" → "משונות לממדים" (changed in dimensions)

#### Message 2: "shinny your way up"
- Translation: "מתחיל לטפס במעלה" (begin to climb up)
- "shinny" is colloquial for climbing, simplified to standard Hebrew climbing term

#### Message 33: "advance the game in no way"
- Translation: "לא יקדם את המשחק בשום צורה"
- Meta-game reference preserved
- Direct, sarcastic tone maintained

### Consistency with References

#### From translation_reference.json:
- **rope** → **חבל** (consistent with objects.json)
- **tree** → **עץ** (commonNouns)
- **cliff** → **צוק** (used in related death messages)

#### From Previous Batches:
- "You can't do that from here" → "אתה לא יכול לעשות את זה מכאן" (standard rejection phrase)
- "Ok." → "בסדר." (consistent acknowledgment)

### Sound Effects
- **CRACK!!!** → **קראק!!!** - onomatopoeia, phonetically adapted to Hebrew
- **OOOFF!!** → **אוףףף!!** - pain exclamation with repeated ף for emphasis

### Technical Notes

#### Message Placeholders
Several messages use %m references to combine text fragments:
- Message 19: "%m5 A log lies..." → references message 5 for location description
- Message 21: "%m20 log." → appends to message 20's rope description
- Message 22: "%m20 stump." → alternate ending to message 20
- Message 26-27: Similar pattern for rope descriptions

These are preserved exactly as in original.

#### Typo Preserved
- Message 23: "wou want" (original typo) → maintained in Hebrew translation
- Message 31: "somthing" (original typo) → maintained as "למשהו"

### Tone & Style

**Adventure Game Language:**
- Direct, practical descriptions
- Occasional sarcasm (message 33)
- Dark humor in death messages (messages 10, 11)

**80s Israeli Adaptation:**
- "Holy logjams, Batman" → cultural reference preserved
- "You almost ate the big one" → "כמעט אכלת את הגדול" (idiomatic Hebrew)

### Gameplay Context

This scene involves:
1. Climbing a dead tree (snag)
2. Crossing a log over a deep fissure
3. Tying rope to stump or log
4. Climbing down rope into fissure
5. Multiple death scenarios (falling, losing balance)

The translations support this puzzle sequence while maintaining the game's characteristic blend of danger and humor.

## Quality Assurance

- ✅ All 35 messages translated
- ✅ Placeholders preserved (%m10, %m5, %m20, %m24, %m25)
- ✅ No placeholders translated
- ✅ Notes field blank (as per standard)
- ✅ Tone consistent with batches 1-10
- ✅ Object names match objects.json
- ✅ Common phrases match translation_reference.json
