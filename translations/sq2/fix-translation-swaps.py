#!/usr/bin/env python3
"""
Fix translation swap errors in messages.json

Two types of swaps detected:
1. Simple swap: Logic 12 ↔ Logic 72
2. Circular rotation: Logic 140 → 6 → 105 → 39 → 140
"""

import json
import sys
from pathlib import Path


def load_messages(filepath):
    """Load messages.json file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)


def save_messages(data, filepath):
    """Save messages.json file"""
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def get_messages_by_logic(data, logic_file):
    """Extract all messages for a specific logic file"""
    return [msg for msg in data['messages'] if msg['logicFile'] == logic_file]


def fix_simple_swap(data):
    """Fix the simple swap between logic 12 and 72"""
    logic12_msgs = get_messages_by_logic(data, '12.agilogic')
    logic72_msgs = get_messages_by_logic(data, '72.agilogic')

    print(f"Fixing simple swap: Logic 12 ({len(logic12_msgs)} msgs) ↔ Logic 72 ({len(logic72_msgs)} msgs)")

    # Create translation lookup for logic 12
    logic12_translations = {msg['messageNumber']: msg['translation'] for msg in logic12_msgs}

    # Create translation lookup for logic 72
    logic72_translations = {msg['messageNumber']: msg['translation'] for msg in logic72_msgs}

    # Swap translations in the main data
    swap_count = 0
    for msg in data['messages']:
        if msg['logicFile'] == '12.agilogic':
            msg_num = msg['messageNumber']
            if msg_num in logic72_translations:
                msg['translation'] = logic72_translations[msg_num]
                swap_count += 1
        elif msg['logicFile'] == '72.agilogic':
            msg_num = msg['messageNumber']
            if msg_num in logic12_translations:
                msg['translation'] = logic12_translations[msg_num]
                swap_count += 1

    print(f"  ✓ Swapped {swap_count} translations")
    return swap_count


def fix_circular_rotation(data):
    """Fix the circular rotation: 140 → 6 → 105 → 39 → 140"""
    logic6_msgs = get_messages_by_logic(data, '6.agilogic')
    logic39_msgs = get_messages_by_logic(data, '39.agilogic')
    logic105_msgs = get_messages_by_logic(data, '105.agilogic')
    logic140_msgs = get_messages_by_logic(data, '140.agilogic')

    print(f"Fixing circular rotation:")
    print(f"  Logic 6: {len(logic6_msgs)} msgs")
    print(f"  Logic 39: {len(logic39_msgs)} msgs")
    print(f"  Logic 105: {len(logic105_msgs)} msgs")
    print(f"  Logic 140: {len(logic140_msgs)} msgs")

    # Create translation lookups (current state)
    logic6_trans = {msg['messageNumber']: msg['translation'] for msg in logic6_msgs}
    logic39_trans = {msg['messageNumber']: msg['translation'] for msg in logic39_msgs}
    logic105_trans = {msg['messageNumber']: msg['translation'] for msg in logic105_msgs}
    logic140_trans = {msg['messageNumber']: msg['translation'] for msg in logic140_msgs}

    # Rotation cycle: 140 → 6 → 105 → 39 → 140
    # This means:
    # - Logic 6 should get translations from Logic 140
    # - Logic 105 should get translations from Logic 6
    # - Logic 39 should get translations from Logic 105
    # - Logic 140 should get translations from Logic 39

    rotation_count = 0
    for msg in data['messages']:
        msg_num = msg['messageNumber']

        if msg['logicFile'] == '6.agilogic' and msg_num in logic140_trans:
            msg['translation'] = logic140_trans[msg_num]
            rotation_count += 1
        elif msg['logicFile'] == '105.agilogic' and msg_num in logic6_trans:
            msg['translation'] = logic6_trans[msg_num]
            rotation_count += 1
        elif msg['logicFile'] == '39.agilogic' and msg_num in logic105_trans:
            msg['translation'] = logic105_trans[msg_num]
            rotation_count += 1
        elif msg['logicFile'] == '140.agilogic' and msg_num in logic39_trans:
            msg['translation'] = logic39_trans[msg_num]
            rotation_count += 1

    print(f"  ✓ Rotated {rotation_count} translations")
    return rotation_count


def validate_fixes(data):
    """Validate that fixes were successful"""
    print("\nValidating fixes...")

    # Check key messages
    checks = [
        ('140.agilogic', 1, 'על ידי', 'Title screen'),
        ('6.agilogic', 1, 'כשהעיניים', 'Vohaul encounter'),
        ('12.agilogic', 1, 'אתה באזור', 'Forest area'),
        ('72.agilogic', 1, 'די חשוך', 'Dark room'),
    ]

    all_passed = True
    for logic_file, msg_num, expected_start, description in checks:
        msg = next((m for m in data['messages']
                   if m['logicFile'] == logic_file and m['messageNumber'] == msg_num), None)

        if msg and msg['translation'].startswith(expected_start):
            print(f"  ✓ {logic_file} msg#{msg_num}: {description}")
        else:
            print(f"  ✗ {logic_file} msg#{msg_num}: FAILED")
            if msg:
                print(f"    Got: {msg['translation'][:30]}...")
            all_passed = False

    return all_passed


def main():
    if len(sys.argv) < 2:
        print("Usage: python fix-translation-swaps.py <messages.json>")
        sys.exit(1)

    filepath = Path(sys.argv[1])

    if not filepath.exists():
        print(f"Error: File not found: {filepath}")
        sys.exit(1)

    print(f"Loading {filepath}...")
    data = load_messages(filepath)

    total_messages = len(data['messages'])
    print(f"Total messages: {total_messages}")

    # Apply fixes
    print("\n" + "="*60)
    swap_count = fix_simple_swap(data)

    print("\n" + "="*60)
    rotation_count = fix_circular_rotation(data)

    total_fixed = swap_count + rotation_count
    print("\n" + "="*60)
    print(f"Total fixes applied: {total_fixed}")

    # Validate
    print("\n" + "="*60)
    if validate_fixes(data):
        print("\n✓ All validation checks passed!")
    else:
        print("\n✗ Some validation checks failed!")
        sys.exit(1)

    # Save
    backup_path = filepath.with_suffix('.json.backup')
    print(f"\nCreating backup: {backup_path}")
    save_messages(data, backup_path)

    print(f"Saving fixed file: {filepath}")
    save_messages(data, filepath)

    print("\n✓ Translation swaps fixed successfully!")


if __name__ == '__main__':
    main()
