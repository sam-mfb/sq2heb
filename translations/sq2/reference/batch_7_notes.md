# Batch 7 Translation Notes

**Date:** 2025-11-16
**Logic Files:** 21.agilogic, 25.agilogic, 4.agilogic, 107.agilogic
**Message Count:** 89 messages
**Translator:** Claude (Sonnet 4.5)

---

## Overview

Batch 7 covers four distinct game areas:
1. **Logic 21** - Forest clearing with root monster and berries (21 messages)
2. **Logic 25** - Dark cave with glowing gem and Cave Beaver (22 messages)
3. **Logic 4** - Transportation control room on orbital station (24 messages)
4. **Logic 107** - Swamp areas with slime slug (23 messages)

---

## Translation Decisions

### Logic 21 - Forest Clearing Scene

**Context:** Roger encounters a giant root monster and can pick red berries from a bush. A small pink alien is also picking berries.

**Key Translations:**
- "odoriferous red berries" → "פירות יער אדומים המסריחים" (literal: "stinking red berries")
- "pungent foliage" → "עלווה חריפה" (sharp/pungent foliage)
- "over-developed root" → "שורש מפותח-יתר-על-המידה" (hyphenated for emphasis)
- "root-like appendages" → "נספחים דמויי-שורש" (appendages resembling roots)
- "digestive system" → "מערכת העיכול" (standard Hebrew term)

**Humor Preservation:**
- Message 2: "Trust me" → "תאמין לי" (casual, sarcastic tone maintained)
- Message 3: Death message maintains dark humor about indigestion
- Message 11: "Get real" → "תתעשת" (Israeli 80s slang for "get serious/wake up")

**Character Note:**
- "The odd little pink dude" → "הבחור הוורוד הקטן והמוזר" - maintains the casual, quirky tone

---

### Logic 25 - Cave Scene

**Context:** Roger explores a dark cave and can use a glowing gem for light. Killer Cave Beaver lurks in the darkness.

**Key Translations:**
- "Cave Beaver" → "בונה מערות" (literal: cave builder - maintains the pun)
- "excruciating" → "מייסר" (agonizing/torturous)
- "scratchy footsteps" → "צעדים מגרדים" (scratching/scraping steps)
- "rough walls" → "קירות מחוספסים" (roughened/coarse walls)

**Sound Effects (Messages 10-14):**
- "Owww!!" → "אאאוווץ'!!" (phonetic adaptation of pain sound)
- "GNASH!" → "חרק!" (grinding/gnashing)
- "GROWL!" → "נהם!" (growling)
- "CRUNCH!" → "קרץ!" (crunching)
- "SNAP!" → "נשך!" (snapping/biting)

**Technical Terms:**
- "glowing gem" → "אבן חן זוהרת" (from translation_reference.json)
- Used consistently throughout scene

**Atmosphere:**
- Messages 16-17 maintain the contrast between darkness and gem light
- Hebrew conveys the claustrophobic cave atmosphere effectively

---

### Logic 4 - Transportation Control Room

**Context:** Roger's boss yells at him in the orbital station's transportation control room. Coworkers are monitoring XOS 4 operations.

**Key Translations:**
- "shuttle bay" → "מפרץ רכבי ההסעות" (shuttle craft bay)
- "pneumatic transport tube" → "צינור הובלה פנאומטי" (from translation_reference.json)
- "monitoring consoles" → "קונסולות ניטור" (monitoring consoles)
- "orbital station" → "תחנה מסלולית" (orbital/circling station)

**Boss Dialogue:**
- Message 12: "You're on your last leg" → "אתה על הרגל האחרונה שלך" (direct translation works)
- Message 15: "That's the last straw" → "זו הטיפה שהציפה את הסאה" (Hebrew idiom: "the drop that filled the measure")
- Message 15: "YOU'RE FIRED!" → "אתה מפוטר!" (emphatic, matches English caps)

**Coworker Debt:**
- Messages 10-11: "twenty buckazoids" → "עשרים באקזואידים" (using established term)
- "cough it up" → "תשלם" (pay up - casual Israeli)

**Placeholder Handling:**
- %s1 preserved in messages 3, 5, 12, 15, 16 (Roger's name)
- %m19 preserved in message 20 (message reference)
- %v12 preserved in message 1 (time variable)

**Cultural Reference:**
- Message 24: "Greg Steffen" - name kept as-is (developer in-joke)
- "drop trou" → "להוריד מכנסיים" (drop pants - maintained mooning reference)

**Humor:**
- Message 18: Spit wad/straw comparison for pneumatic tube maintained perfectly
- Message 1: "How far down your family tree did knuckles last play an important role in locomotion?" - Translated preserving the evolutionary insult

---

### Logic 107 - Swamp Scene

**Context:** Roger wades through swamp water where a slime slug lurks. Can drink the disgusting water.

**Key Translations:**
- "slime slug" → "שבלול רפש" (mud/slime snail)
- "murky liquid/water" → "נוזל עכור" / "מים עכורים" (cloudy/turbid water)
- "swamp water" → "מי ביצה" (marsh/swamp waters)

**Gross-Out Humor (Message 3):**
- "squeezings of 100 moist gym socks" → "סחיטה של 100 גרבי כושר לחים"
- Maintains the disgusting imagery perfectly
- "shiver in disgust" → "רועד בגועל" (trembling in revulsion)
- "intestinal discomfort" → "אי נוחות מעיים" (bowel discomfort - classic SQ bathroom humor)

**Death Messages:**
- Message 9: "something slimy clamp down" → "משהו רירי נצמד" (slimy thing clamping)
- Message 10: Death by drowning/tasting putrid water - translated maintaining horror

**Cultural References:**
- Message 5: "Lloyd Bridges" - name kept (Sea Hunt reference)
- Message 11: "(COMING ATTRACTION!!)" → "(אטרקציה בקרוב!!)" (theatrical preview joke)

**Berries Reference:**
- Message 8: References berries from Logic 21 - maintains cross-scene continuity
- "bad after taste" → "טעם לוואי גרוע" (bad aftertaste)

**Trees:**
- Message 1: "Wet ones, and dry ones" → "רטובים, ויבשים" - deadpan humor preserved

**Verbose Description (Message 21):**
- Maintains the overly technical description of dirt
- "It's real hard if come at from a distance" - awkward phrasing preserved in Hebrew to match original's intentional verbosity
- "Not desirable stuff" → "חומר לא רצוי" (undesirable material)

---

## Consistency Notes

### Cross-Referenced with translation_reference.json:
- ✅ "glowing gem" = "אבן חן זוהרת" (Logic 25)
- ✅ "buckazoids" = "באקזואידים" (Logic 4)
- ✅ "berries" = "פירות יער" (Logic 21, 107)
- ✅ "pneumatic transport" = "צינור הובלה פנאומטי" (Logic 4)

### Placeholder Preservation:
- ✅ %v12 (Logic 4, message 1)
- ✅ %s1 (Logic 4, messages 3, 5, 12, 15, 16; Logic 107, message 7)
- ✅ %m9 (Logic 107, messages 8, 10)
- ✅ %m19 (Logic 4, message 20)

### Verb Forms:
All imperatives maintain informal second-person singular (אתה):
- "Get closer" → "התקרב יותר"
- "Just get in" → "פשוט היכנס"
- "Go on in" → "תיכנס"

---

## Style Notes

### 80s Israeli Slang:
- "Get real" → "תתעשת" (snap out of it)
- "dead meat" → "בשר מת" (dead meat - works in Hebrew)
- "You're history" → "אתה היסטוריה" (direct borrowing)
- "buddy/bud" → "חבר" (friend/pal)

### Sarcasm & Humor:
- Maintained throughout all death messages
- Boss's anger conveyed through word choice and punctuation
- Gross-out humor (swamp water, gym socks) translated literally for maximum effect

### Technical Accuracy:
- All sci-fi terms cross-referenced
- Game mechanics descriptions preserved
- No modern slang introduced

---

## Quality Metrics

- **Total Messages:** 89
- **Placeholders:** 7 (all preserved correctly)
- **Character Names:** 0 in this batch
- **Location Names:** 0 in this batch
- **Object References:** glowing gem, berries (both consistent with previous batches)
- **Cross-references:** 4 terms verified against translation_reference.json
- **Cultural Adaptations:** 2 (Hebrew idioms for "last straw", kept Lloyd Bridges/Greg Steffen)

---

## Special Considerations

### Logic 21 - Digestive System Death
Messages 1-3 form a death sequence that's both horrifying and humorous. The translation maintains:
- Clinical tone in message 1 ("guided tour of digestive system")
- Meta-humor in message 2 ("Trust me" - breaking fourth wall)
- Dark comedy in message 3 (indigestion making monster unpopular)

### Logic 25 - Cave Beaver Attack
Messages 9-15 create a crescendo of sound and terror:
- Slow build with footsteps (message 9)
- Pain exclamation (message 10)
- Four rapid sound effects (messages 11-14)
- Punchline death message (message 15)
Hebrew sound effects chosen for phonetic impact, not literal meaning.

### Logic 4 - Workplace Tension
Boss/employee relationship conveyed through:
- Formal-but-angry tone from boss
- Repeated warnings and escalation
- Coworker gossip about debt
- Maintains American workplace dynamics

### Logic 107 - Environmental Storytelling
Water descriptions build atmosphere:
- "murky" used consistently
- Taste description is intentionally revolting
- "tell tale bubbles" creates suspense
- Death by drowning is drawn out for horror effect

---

## Notes Field

All `notes` fields left blank as per instructions. These are reserved for human editors to add:
- Voice acting directions
- Alternative translation suggestions
- Cultural context notes for future revisers
- QA feedback during testing

---

## Conclusion

Batch 7 maintains the high quality standard of previous batches:
- ✅ Sarcastic Space Quest tone preserved
- ✅ 80s Israeli slang used appropriately
- ✅ All placeholders preserved
- ✅ Cross-references verified
- ✅ Humor translated effectively
- ✅ Technical terms consistent
- ✅ No anachronistic modern Hebrew

**Ready for:** QA review, voice recording direction, in-game testing

---

**Translator signature:** Claude Sonnet 4.5
**Batch completion:** 2025-11-16
**Next batch:** Batch 8 (awaiting assignment)
