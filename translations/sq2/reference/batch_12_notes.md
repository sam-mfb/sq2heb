# Batch 12 Translation Notes

**Logic File:** 0.agilogic
**Message Count:** 110
**Location Context:** Main game logic - parser messages, menu items, generic responses

## Translation Decisions

### Parser Messages (Core AGI Parser)

These are fundamental AGI parser responses used throughout the game:

- **"Ok."** → **"בסדר."** - Standard acknowledgment
- **"I don't understand"** → **"אני לא מבין"** - Parser doesn't recognize input
- **"Word not known:"** → **"מילה לא מוכרת:"** - Vocabulary not in dictionary
- **"No response to input."** → **"אין תגובה לקלט."** - Command not handled
- **"Say What?"** → **"מה אמרת?"** - Informal confusion response

### Generic Rejection Messages

Standard "you can't do that" messages:

- **"Not right now."** → **"לא עכשיו."**
- **"That would not be advisable at this time."** → **"זה לא יהיה מומלץ כרגע."**
- **"That wouldn't be helpful now."** → **"זה לא יעזור עכשיו."**
- **"You don't need to do that now."** → **"אתה לא צריך לעשות את זה עכשיו."**
- **"That's been done."** → **"זה כבר נעשה."**
- **"Don't waste your time."** → **"אל תבזבז את הזמן שלך."**

### Inventory/Object Messages

- **"You don't have the paper."** → **"אין לך את הנייר."**
- **"You don't have the basket."** → **"אין לך את הסל."**
- **"You don't have those."** → **"אין לך את זה."**
- **"You do not possess the designated item."** → **"אין לך את הפריט המיועד."**
  - More formal tone preserved
- **"You possess nothing that could help you accomplish this."** → **"אין לך שום דבר שיכול לעזור לך להשיג את זה."**

### Visibility/Sight Messages

Fragment messages that combine with %m7:

- **"That does not "** → **"זה לא "** (incomplete sentence fragment)
- **"%m7seem to be in your sight now."** → **"%m7נראה בשדה הראייה שלך עכשיו."**
- **"%m7appear to be here to view."** → **"%m7נראה כאן לצפייה."**
- **"%m7seem to be available at this time."** → **"%m7נראה זמין כרגע."**
- **"%m7compute."** → **"%m7מחשב."** (verb form)

### Space Quest Humor/Personality

#### Message 14: Naked Command Response
- **"I'll get naked if you get naked. You go first."** → **"אני אתפשט אם אתה תתפשט. אתה קודם."**
- Sarcastic response to inappropriate command
- "אתפשט" = will get undressed (colloquial)

#### Message 16: Profanity Response
- **"You foul-mouthed slime bucket. You're a living garbage skow."** → **"פה מלוכלך דלי של רפש. אתה ספינת אשפה מהלכת."**
- Parser's response to profanity
- "דלי של רפש" = bucket of slime
- "ספינת אשפה מהלכת" = walking garbage ship (scow → ship)

#### Message 21: Berries Description
- **"You rub the berries all over your body. You now smell like a walking ammonia inhalant."** → **"אתה משפשף את פירות היער על כל גופך. עכשיו אתה מריח כמו מכשיר שאיפת אמוניה מהלך."**
- "פירות היער" = berries (consistent with objects.json)
- "מכשיר שאיפת אמוניה" = ammonia inhalant device

#### Message 33: Gem Rejection
- **"Nobody is interested in your stupid gem."** → **"לאף אחד לא אכפת מהאבן החן המטומטמת שלך."**
- "מטומטמת" = stupid (colloquial Hebrew)
- "לא אכפת" = doesn't care (more natural than literal translation)

#### Message 46: Mother Comment
- **"Would you want your mother to hear you say that?"** → **"היית רוצה שאמא שלך תשמע אותך אומר את זה?"**
- Scolding response to inappropriate input

#### Message 47: Puzzle Item
- **"You pull the puzzle out and give it a few spins. Instead of improving, it seems to be worse. Irritated, you stash it and go on with the adventure."** → **"אתה מוציא את הפאזל ונותן לו כמה סיבובים. במקום להשתפר, נראה שזה רק מחמיר. במרוצה, אתה דוחף אותו בחזרה וממשיך בהרפתקה."**
- "פאזל" = puzzle (transliterated, consistent with objects.json)
- "במרוצה" = irritated/annoyed (80s Hebrew)
- "ממשיך בהרפתקה" = continue with the adventure

#### Message 48: Berries/Dates Pun
- **"Phew! These babies are pungent. You'll get no dates with these."** → **"פיו! המותקים האלה חזקים. לא תשיג דייטים עם אלה."**
- "פיו" = Phew (onomatopoeia)
- "המותקים האלה" = these babies (affectionate term for items)
- "דייטים" = dates (romantic encounters, not the fruit)

#### Message 52-53: Body Scent
- **"You bear your normal manly scent."** → **"אתה נושא את הריח הגברי הרגיל שלך."**
- **"%m52 Not to mention what could be a powerful skunk repellent."** → **"%m52 שלא לדבר על מה שיכול להיות דוחה בואש חזק."**
- "ריח גברי" = manly scent
- "דוחה בואש" = skunk repellent

#### Message 59: NO JUMPING Zone
- **"Sorry. This game is in a NO JUMPING zone."** → **"סליחה. המשחק הזה באזור ללא קפיצות."**
- Meta-game humor about game mechanics
- "אזור ללא קפיצות" = no jumping zone

#### Message 63: Past Trouble
- **"No way! You've already gotten in enough trouble in the past doing that."** → **"בשום פנים! כבר נכנסת למספיק צרות בעבר בגלל זה."**
- "בשום פנים" = no way (emphatic)
- "נכנסת לצרות" = gotten into trouble

#### Message 66: Let's Don't
- **"Let's don't, and say we did."** → **"בואו לא נעשה, ונגיד שעשינו."**
- Sarcastic suggestion to pretend
- Maintains casual, conversational tone

#### Message 84: Text Adventure Meta
- **"This isn't a text adventure!"** → **"זה לא הרפתקת טקסט!"**
- Meta-game comment about adventure game genres

#### Message 85: Athletic Supporter
- **"Leave the supporter alone!"** → **"תעזוב את התומך בשקט!"**
- "תומך" = supporter (consistent with objects.json)
- Refers to athletic supporter item

### Clothing/Appearance Messages

#### Message 36: Excursion Garment (Fragment)
- **"%m4dressed in the standard issue excursion garment."** → **"%m4לבוש בבגד הטיול הסטנדרטי."**
- Combines with message 4 ("You are ")
- "בגד טיול" = excursion garment

#### Message 37: Xenon Uniform
- **"You are attired in the smart-looking uniform of a Xenon Orbital Station employee."** → **"אתה לבוש במדי העובד המשובחים של תחנת מסלול זנון."**
- "זנון" = Xenon (consistent with translation_reference.json)
- "תחנת מסלול" = orbital station
- "מדים משובחים" = smart-looking uniform

### Menu Items (Game Interface)

#### Main Menus
- **"Sierra"** → **"Sierra"** (company name, left in English)
- **"About SQ2"** → **"אודות SQ2"** (SQ2 left as abbreviation)
- **"File"** → **"קובץ"**
- **"Action"** → **"פעולה"**
- **"Special"** → **"מיוחד"**
- **"Speed"** → **"מהירות"**

#### File Menu
- **"Help"** → **"עזרה"**
- **"Save <F5>"** → **"שמירה <F5>"**
- **"Restore <F7>"** → **"שחזור <F7>"**
- **"Restart <F9>"** → **"התחל מחדש <F9>"**
- **"Quit <Alt-Z>"** → **"יציאה <Alt-Z>"**

#### Action Menu
- **"See Object <F4>"** → **"ראה אובייקט <F4>"**
- **"Inventory <Tab>"** → **"מלאי <Tab>"**

#### Special Menu
- **"Sound On/Off <F2>"** → **"צליל דלוק/כבוי <F2>"**
- **"Color/BW <Ctrl R>"** → **"צבע/שחור-לבן <Ctrl R>"**
- **"Clock On/Off <F6>"** → **"שעון דלוק/כבוי <F6>"**
- **"Joystick <Ctrl J>"** → **"ג'ויסטיק <Ctrl J>"**
- **"Joystick/Mouse <Ctrl J>"** → **"ג'ויסטיק/עכבר <Ctrl J>"**
- **"Pause <Esc>"** → **"השהיה <Esc>"**

#### Speed Menu
- **"Normal"** → **"רגיל"**
- **"Slow"** → **"איטי"**
- **"Fast"** → **"מהיר"**
- **"Fastest"** → **"הכי מהיר"**

### Credits
- **"By "** → **"מאת "**
- **"MARK CROWE and SCOTT MURPHY"** → **"מארק קרו וסקוט מרפי"**
  - Names transliterated to Hebrew phonetically

### Game Prompts

#### Message 42-43: Meltdown Timer
- **"\"%v148 MINUTES UNTIL MELTDOWN,\" a synthesized voice cheerfully announces."** → **"\"%v148 דקות עד התמוטטות,\" קול מסונתז מכריז בעליזות."**
- **"\"1 MINUTE LEFT. IT'S BEEN NICE KNOWING YOU.\""** → **"\"נשארה דקה אחת. היה נעים להכיר אותך.\""**
- "התמוטטות" = meltdown
- "קול מסונתז" = synthesized voice
- Dark humor preserved in farewell

#### Message 116: Exit Prompt
- **"Exit Game? (Y/N)"** → **"לצאת מהמשחק? (Y/N)"**
- Left Y/N in English (standard UI convention)

### Placeholder Messages

Several messages are pure placeholders:
- Messages 10-13: "%m8"%w1-4"" - Word error message combinations
- Messages 141-145: "%m140"%w1-5"" - Unknown word message combinations
- Message 109: "%v13:%v12|2:%v11|2" - Time display format
- Message 115: "%s4" - String variable reference
- Message 20: "%v81,%v82 %v96" - Variable display

All preserved exactly as-is.

### Special Vocabulary Consistency

#### "mess with" / "Don't mess with"
- Message 29: "There is no need to mess with that." → "אין צורך לפשפש בזה."
- Message 40-41: "Don't mess with the spore." → "אל תפשפש בנבג."
- "פשפש" = mess with/fiddle with (consistent usage)

#### "seem to be" / "appear to be"
Used "נראה" (appears/seems) consistently for these constructions

#### "obtain" / "acquire" / "get"
- "השיג" = obtain/get/achieve (used consistently)
- "לקחת" = take/acquire

## Cross-Reference Verification

### Objects (from translation_reference.json)
✓ **basket** → **סל**
✓ **paper** → **נייר** (toilet paper context)
✓ **berries** → **פירות יער**
✓ **spore** → **נבג**
✓ **gem** → **אבן חן**
✓ **puzzle** → **פאזל**
✓ **supporter** → **תומך** (athletic supporter)

### Locations (from translation_reference.json)
✓ **Xenon** → **זנון**

### Common Phrases
✓ **"Ok."** → **"בסדר."** (matches previous batches)
✓ **"You are"** → **"אתה"** (standard second person)
✓ **"Don't"** → **"אל" (imperative negative)

## Technical Notes

### Fragment Messages
Several messages are sentence fragments designed to combine with other messages via %m references:
- Message 4: "You are " (space at end preserved)
- Message 7: "That does not " (space at end preserved)
- Message 8: "I don't understand " (space at end preserved)
- Message 40: "Don't mess with the" (no period)
- Message 175: "By " (space at end preserved)

Hebrew translations maintain compatible grammar for concatenation.

### Menu Spacing
Menu items have trailing spaces for formatting:
- "Help     " → "עזרה     " (5 spaces preserved)
- "Save     <F5>" → "שמירה     <F5>" (5 spaces preserved)
- etc.

Spacing preserved for UI alignment.

## Tone & Style

**Parser Messages:**
- Direct and functional
- Maintain AGI parser's personality
- Some sarcasm in rejection messages

**Menu Items:**
- Clear and concise
- Standard computer/game terminology
- Function keys preserved in English notation

**SQ Humor:**
- Bathroom humor (berries smell, body scent, supporter)
- Meta-game comments (text adventure, jumping zone)
- Sarcastic responses to inappropriate commands
- Dark humor (meltdown timer)

**80s Israeli Adaptation:**
- "במרוצה" (irritated) - period-appropriate
- "דייטים" (dates) - transliterated 80s loanword
- "מטומטמת" (stupid) - colloquial Hebrew
- "בשום פנים" (no way) - emphatic refusal

## Quality Assurance

- ✅ All 110 messages translated
- ✅ Placeholders preserved (%m8, %w1-5, %v11-148, %s1, %s4)
- ✅ Escaped quotes preserved where needed
- ✅ Notes field blank (as per standard)
- ✅ Tone consistent with batches 1-11
- ✅ Object names match objects.json
- ✅ Common phrases match translation_reference.json
- ✅ Menu items use standard Hebrew computer terminology
- ✅ Fragment messages maintain grammatically compatible endings
- ✅ Spacing in menu items preserved for UI alignment
