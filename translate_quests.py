#!/usr/bin/env python3
"""
Script to translate Bible quest data from Chinese to English.
Extracts quest data from gameData.ts and generates English translations.
"""

import re
import json

# Read the gameData.ts file
with open('/Users/drpanda/AISundaySchool/data/gameData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract all quest objects
quest_pattern = r'\{\s*id:\s*["\']q(\d+)["\'].*?\n\s*\}'
quests = re.findall(r'\{[^}]*id:\s*["\']q\d+["\'][^}]*(?:\{[^}]*\}[^}]*)*\}(?=,\s*\{|\s*\];)', content, re.DOTALL)

print(f"Found {len(quests)} quests")

# For each quest, extract the Chinese content
for i, quest in enumerate(quests[:10], 1):  # Start with first 10 for testing
    quest_id = re.search(r"id:\s*'(q\d+)'", quest)
    character = re.search(r"character:\s*'([^']+)'", quest)
    question = re.search(r"question:\s*'([^']+)'", quest)

    if quest_id and character and question:
        print(f"\n{quest_id.group(1)}:")
        print(f"  Character: {character.group(1)}")
        print(f"  Question: {question.group(1)[:50]}...")
