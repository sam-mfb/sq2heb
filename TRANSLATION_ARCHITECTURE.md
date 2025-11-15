# Sierra AGI Game Translation Architecture Guide

## Overview

This document summarizes the general approach to translation that has been used to translate Sierra AGI games to languages like Hebrew that don't use the standard Western alphabet. Drawn from the work of Segev Mashraky and the adventurebrew team.

## Table of Contents

1. [AGI Game File Structure](#agi-game-file-structure)
2. [Core Translation Challenges](#core-translation-challenges)
3. [Translation Components](#translation-components)
4. [Implementation Strategy](#implementation-strategy)
5. [File Format Specifications](#file-format-specifications)
6. [Testing and Validation](#testing-and-validation)
7. [Encoding References](#encoding-references)
8. [Credits and Attribution](#credits-and-attribution)

---

## AGI Game File Structure

### Game Files Overview

An AGI game consists of several binary and text files:

| File                   | Purpose                             | Translation Required              |
| ---------------------- | ----------------------------------- | --------------------------------- |
| **Logic files (.lgc)** | Game code and message strings       | Yes - messages only               |
| **OBJECT**             | Inventory object names              | Yes                               |
| **WORDS.TOK**          | Parser vocabulary (verbs/nouns)     | Yes                               |
| **VIEWDIR**            | Graphics and inventory descriptions | Yes - embedded text               |
| **PICDIR**             | Room pictures                       | Sometimes - if text in graphics   |
| **LOGDIR**             | Logic file directory                | No - auto-generated               |
| **SNDDIR**             | Sound resources                     | No                                |
| **VOL.\***             | Resource volume files               | Indirect - contains compiled data |

NB: Logic files are not present in the original game files. They are created when you decompile them using WinAGI, agikit, etc.

---

## Core Translation Challenges

The basic issue in translating AGI games are as follows:

- Decompiled logic files have the original strings hardcoded in various places for objects and messages
- Standard file format for decompiled logic files doesn't support extended characters
- User input words are stored in a binary WORDS.TOK file that does not support extended characters

These problems are solved in essence by:

- Converting all objects and messages in logic files to, respectively, object indices and message indices
- Converting logic files to use an encoding for the target language, e.g., Windows-1255 for Hebrew (requires a compiler that can handle this)
- Using a special WORDS.TOK.EXTENDED file which is a text file that allows extended characters and is parsed at runtime by ScummVM

---

## Translation Components

### Component 1: Logic Files (.lgc)

**Purpose:** Contains game code and all in-game text messages

**File Format:**

- Plain text files
- Contains AGI scripting language code
- Messages declared at bottom with `#message` syntax
- Must be compiled after editing

**Translation Process:**

1. **Pre-processing:**
   - Merge multi-line print statements into single lines
   - Replace hard-coded object names with object indices
   - Convert hard-coded prints to message references

2. **Extraction:**
   - Parse all logic files
   - Extract lines matching pattern: `#message <number> "<text>"`
   - Export to structured data format (CSV, JSON, or database) with fields: `logic_file, message_index, original_text, translation, comments`

3. **Translation:**
   - Translate text preserving special elements:
     - Variable placeholders (%w1, %w2, %w3, %v, %s, %m, etc.)
     - Quotation marks and punctuation
     - Format codes

4. **Import:**
   - Read translated data (CSV, JSON, or database - can be any encoding)
   - For each logic file:
     - Load file with target encoding (e.g., Windows-1255)
     - Regex replace: `#message <N> ".*"` → `#message <N> "<translation>"`
     - Write file with target encoding (e.g., Windows-1255)

**Encoding:** Logic files (.lgc) MUST be saved with target language code page (e.g., Windows-1255 for Hebrew, Windows-1251 for Cyrillic). This is required because WinAGI/AGI compiler needs to read Hebrew/Cyrillic characters correctly from the text files.

**Special Considerations:**

- Escape double quotes in translations: `"` → `\"`
- Preserve leading/trailing spaces if present in original
- Game code (if statements, variables) remains in English
- Configure WinAGI to use target code page encoding

### Component 2: OBJECT File

**Purpose:** Stores inventory object names

**File Format (Binary):**

```
Header (varies by version, typically 3 bytes):
  - Byte 0-1: Offset to first object (little-endian)
  - Byte 2: Max animated objects count

Object Entries (3 bytes each):
  - Byte 0-1: Offset to object name string (little-endian)
  - Byte 2: Initial location (room number, or 255 for inventory)

String Table:
  - Null-terminated strings
  - Pointed to by object entries
```

**Translation Process:**

**Option 1: Using AGI Development Tools (WinAGI/agikit)**

- Use built-in object editor if available
- Tools may handle encryption/decryption automatically
- Suitable for small numbers of objects or manual editing
- May not provide batch export/import for translation workflow

**Option 2: Custom Binary Tools (for batch workflow)**

1. **Extraction:**

   ```
   Detect and decrypt if needed (XOR with "Avis Durgan")

   num_objects = read_le(bytes[0:2]) / padding_size
   max_animated = bytes[2]

   For each object (0 to num_objects-1):
       entry_offset = 3 + (object_index * 3)
       string_offset = read_le(bytes[entry_offset:entry_offset+2]) + 3
       location = bytes[entry_offset + 2]

       Read null-terminated string at string_offset
       Export to structured data format (CSV, JSON, or database): object_index, name, location
   ```

2. **Import:**
   - Read translated data (CSV, JSON, or database)
   - Rebuild binary structure
   - Calculate new string offsets
   - Write object entries with updated pointers
   - Write string table with translated names
   - Re-encrypt if original was encrypted

**Recommendation:** Development tools may be sufficient for exploring and small edits. Custom binary tools (as in AGIHebrew reference implementation) are recommended for automated batch translation workflows.

**Encoding:** Binary file - string data uses target language code page byte values (e.g., Windows-1255 for Hebrew). When writing strings to the binary structure, encode them using the target code page to get the correct byte representation.

**Special Considerations:**

- First row often contains metadata (max_animated count)
- Some objects may have special markers (e.g., "?" for invalid objects)
- Object names should be shorter than English originals (display constraints)

### Component 3: WORDS.TOK (Vocabulary)

**Purpose:** Parser vocabulary for player commands

**Important:** Despite similar names, these are two different file formats:

- **WORDS.TOK** - Binary file with compressed/encoded vocabulary
- **WORDS.TOK.EXTENDED** - Text file with plain vocabulary list

**How Vocabulary Works in AGI:**

The `said()` command in logic files uses word numbers, not literal strings:

```
// Logic file:
if (said("look", "mirror")) {
    print(m5);
}

// At compile time:
"look" → word number 1 (via WORDS.TOK)
"mirror" → word number 2 (via WORDS.TOK)
Compiled bytecode: if (said(1, 2)) { ... }

// At runtime (player types "examine glass"):
Parser reads WORDS.TOK.EXTENDED:
"examine" → 1 (synonym of "look")
"glass" → 2 (synonym of "mirror")
Input: [1, 2] matches said(1, 2) ✓
```

**All synonyms with the same word number trigger the same `said()` condition.** This means:

- English words: "look", "examine", "l" (all → word 1)
- Hebrew words: "הסתכל", "בדוק" (all → word 1)
- Player can type ANY synonym in ANY language - all match the same logic

**Key Insight:** Logic files never change during translation. The `said()` strings are just compile-time identifiers to look up word numbers. The actual game logic operates on word numbers, which remain consistent across languages.

**WORDS.TOK File Format (Binary):**

```
Letter Index Table (52 bytes):
  - 26 letter pairs (a-z)
  - Each pair: 2-byte little-endian offset to first word starting with that letter

Word Entries (variable length):
  For each word:
    - 1 byte: Number of letters to reuse from previous word (compression)
    - N bytes: Remaining letters, XOR encoded:
        - All but last: char ^ 0x7F
        - Last char: char ^ 0xFF (sets MSB as terminator)
    - 2 bytes: Word number (little-endian)
```

**WORDS.TOK.EXTENDED File Format (Text):**

Since the binary WORDS.TOK format cannot support extended characters, create a parallel text-based format:

```
Format:
Line 1: Header comment
Subsequent lines: <word><null_byte><word_number><newline>

Example file contents:
WORDS.TOK: Unofficial extended format to support ASCII range of 128-255
go\00001
walk\00001
לך\00001

Note: \0 represents an actual null byte (0x00), not the literal characters '\' and '0'
```

**Translation Process:**

1. **Extraction:**

   ```
   Parse binary WORDS.TOK:

   Skip first 52 bytes (letter index)
   previous_word = ""

   While not end of file:
       reused_letters = read_byte()
       word = previous_word[0:reused_letters]

       While true:
           byte = read_byte()
           if byte >= 0x80:  # Last character (MSB set)
               word += chr(byte ^ 0xFF)
               break
           else:
               word += chr(byte ^ 0x7F)

       word_number = read_le(2 bytes)
       previous_word = word

       Add to dictionary: word_number → [word1, word2, ...]

   Export to structured data format (CSV, JSON, or database): word_number, synonyms (pipe or array-separated)
   ```

2. **Translation:**
   - Translate word groups
   - For CSV: Use pipe (|) to separate synonyms: `"go | walk | leave"`
   - For JSON: Use arrays: `{"synonyms": ["go", "walk", "leave"]}`
   - Maintain verb/noun classifications

3. **Import - Generate BOTH files:**

   Read translated data (CSV, JSON, or database)
   Parse synonyms (from pipe-separated strings, arrays, or database relations)

   **File 1: WORDS.TOK (ASCII only, for compilation)**

   ```
   Filter to ASCII words only
   Sort all words alphabetically

   Build letter index table (offsets for a-z)

   For each word:
       Calculate shared prefix with previous word
       Write: prefix_length
       For each unique character:
           If not last: write(char ^ 0x7F)
           If last: write(char ^ 0xFF)
       Write: word_number (little-endian)
   ```

   **File 2: WORDS.TOK.EXTENDED (all characters, for runtime)**

   ```
   For each word (both languages):
       Write: word + "\0" + word_number + "\n"
   ```

**Encoding:**

- **WORDS.TOK:** Binary file - ASCII only (characters 0-127)
- **WORDS.TOK.EXTENDED:** Text file - MUST use target language code page (e.g., Windows-1255 for Hebrew) to support extended characters 128-255

**File Usage Timeline:**

| Phase           | Tool                | Uses WORDS.TOK                                | Uses WORDS.TOK.EXTENDED                     |
| --------------- | ------------------- | --------------------------------------------- | ------------------------------------------- |
| **Compilation** | WinAGI/AGI Compiler | ✓ Yes - maps `said()` strings to word numbers | ✗ No                                        |
| **Runtime**     | ScummVM             | ✗ No                                          | ✓ Yes - parses player input to word numbers |

**Why Both Files Are Needed:**

1. **WORDS.TOK (ASCII only):**
   - Required for recompiling logic files
   - Development tools (WinAGI) only understand this format
   - Maps English identifiers in `said()` to word numbers
   - Must maintain same word number mappings as EXTENDED version

2. **WORDS.TOK.EXTENDED (all characters):**
   - Used by ScummVM at runtime
   - Contains all synonyms (English + translated language)
   - Allows players to use commands in any included language
   - Simple text format supports extended character sets (128-255)

**Example - Complete Flow:**

```
Development (WinAGI):
  Logic file: if (said("look", "mirror"))
  WORDS.TOK: "look"→1, "mirror"→2
  Compiled: if (said(1, 2))

Gameplay (ScummVM):
  Player types: "הסתכל מראה"
  WORDS.TOK.EXTENDED: "look"→1, "הסתכל"→1, "mirror"→2, "מראה"→2
  Parsed: [1, 2]
  Matches: said(1, 2) ✓
```

**Special Considerations:**

- Auto-generate grammatical variants (e.g., Hebrew prefixes: ה, ב, ל)
- Maintain blacklist for words that shouldn't get prefixes
- Check for duplicate words after expansion
- Ensure word number mappings are identical between both files (for English words)

### Component 4: Inventory Descriptions (VIEWDIR)

**Purpose:** Descriptions shown when examining inventory items

**File Format:**

- Binary resource file
- Contains VIEW resources (graphics + metadata)
- Each view can have embedded text descriptions
- Text stored at specific offsets within view data

**Location:**

- Typically in VOL.0 file
- Indexed by VIEWDIR
- Inventory items use specific view number ranges

**Translation Process:**

1. **Extraction:**

   ```
   Identify inventory view range (e.g., views 117-141)

   For each inventory view:
       Parse VIEW resource structure
       Locate text description field (implementation-specific)
       Extract null-terminated string
       Export to structured data format (CSV, JSON, or database): view_number, description_text
   ```

2. **Translation:**
   - **Critical:** Translations MUST be shorter than or equal to original length
   - Text is stored in fixed-size fields
   - Exceeding length will corrupt data

3. **Import:**
   - Read translated data (CSV, JSON, or database - can be any encoding)
   - Verify translation length ≤ original length
   - Write translated text to same offset using target encoding byte values
   - Null-terminate
   - Preserve all other view data

**Encoding:** Binary file - string data uses target language code page byte values (e.g., Windows-1255 for Hebrew). When writing strings into the VIEW resource, encode them using the target code page.

**Special Considerations:**

- Length validation is mandatory
- Different games may use different view number ranges
- Some games may not have inventory descriptions

---

## File Format Specifications

### Encoding Requirements

**Files that MUST use target language code page (e.g., Windows-1255 for Hebrew):**

1. **Logic files (.lgc)** - Text files with game code and messages
   - Must be saved with target encoding (Windows-1255, Windows-1251, etc.)
   - AGI compiler (WinAGI) must be configured to read/write this encoding
   - Contains Hebrew/Cyrillic characters directly in `#message` declarations

2. **WORDS.TOK.EXTENDED** - Text file with extended vocabulary
   - Must use target encoding to support characters 128-255
   - Contains translated vocabulary alongside original

3. **Binary files (OBJECT, VIEWDIR, VOL.\*)** - Binary data
   - Read/write as byte arrays
   - String data embedded in binary uses target encoding byte values
   - Not "file encoding" but character byte representation

**Files with flexible encoding:**

- **CSV/JSON/database files** - Intermediate translation data
  - Can use UTF-8, target code page, or any encoding your tools support
  - Tools must convert appropriately when reading/writing to game files
  - Common approach: Use UTF-8 for portability, convert when importing to .lgc files

**Critical point:** The AGI compiler and game engine expect specific byte values for extended characters. Logic files and extended vocabulary must be saved in the target code page so that the compiler/engine interprets characters correctly.

### Special Character Handling

**Variable Placeholders:**

- `%w1, %w2, %w3` - Word parameters from player input
- `%v` - Variable value
- `%s` - String value
- `%m` - Message number
- Keep these EXACT (case and position matter)
- Place in grammatically appropriate position for target language

**Escape Sequences:**

- `\"` - Quote mark within string
- `\\` - Backslash
- Preserve or translate as needed

---

## testing and validation

### automated validation

**before translation:**

1. Verify all hard-coded prints are converted to message references
2. Confirm no untranslated English strings remain in logic files
3. Check for multi-line statements that need merging

**After import:**

1. Validate data structure (correct column count for CSV, valid JSON schema, database integrity)
2. Check for inventory description length violations
3. Scan for duplicate words in vocabulary
4. Verify WORDS.TOK.EXTENDED format correctness

### Manual Testing

**Compilation:**

1. Compile with AGI tools (verify no errors)
2. Check generated LOGDIR MD5 hash
3. Verify all resource files updated

**Gameplay:**

1. Test parser with translated commands
2. Verify message display (no truncation, proper direction)
3. Check inventory item names and descriptions
4. Test save/load functionality
5. Verify special characters render correctly

### ScummVM Integration

**Detection Entry:**

For ScummVM to recognize the translated game, add detection entry:

```cpp
GAME_LVFPN("<game_id>", "", "logdir", "<md5_hash>", <logdir_size>,
           Common::HE_ISR,  // Language code
           0x2917,          // Interpreter version
           GF_EXTCHAR,      // Extended character flag
           GID_<GAME>,      // Game ID
           Common::kPlatformDOS,
           GType_V2,
           GAMEOPTIONS_DEFAULT)
```

**Key elements:**

- `<md5_hash>`: MD5 of translated LOGDIR file (lowercase)
- `<logdir_size>`: File size in bytes
- `Common::HE_ISR`: Language constant (Hebrew, Russian, etc.)
- `GF_EXTCHAR`: Flag enabling extended character support

---

## Encoding References

- Windows-1255: Hebrew
- Windows-1251: Cyrillic
- Windows-1252: Western European (extended)

---

## Credits and Attribution

This architecture document was derived from reviewing the code, tools, and documentation in the AGIHebrew translation project:

**Source Repository:** https://github.com/SegMash/AGIHebrew

**Original Project Contributors:**

- Segev Mashraky - Translation tools and workflow development
- Based on AGI reverse-engineering work by the [adventurebrew team](https://github.com/adventurebrew/re-quest)
- ScummVM team - Extended character support implementation
