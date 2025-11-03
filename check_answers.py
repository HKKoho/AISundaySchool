#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script to verify correctAnswerIndex for all questions in gameData.ts
"""

import re

def extract_quests(filepath):
    """Extract all quest data from the TypeScript file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all quest objects
    quest_pattern = r"{\s*id:\s*'(q\d+)'[\s\S]*?(?={\s*id:\s*'q\d+'|export const levels:)"
    quests_raw = re.finditer(quest_pattern, content)

    quests = []
    for match in quests_raw:
        quest_text = match.group(0)
        quest_id = match.group(1)

        # Extract options
        options_match = re.search(r'options:\s*\[([\s\S]*?)\]', quest_text)
        if not options_match:
            continue

        options_text = options_match.group(1)
        options = re.findall(r"'([^']+)'(?:,\s*(?://.*?)?$)", options_text, re.MULTILINE)

        # Filter out empty/short options
        options = [opt.strip() for opt in options if len(opt.strip()) > 5]

        # Extract correctAnswerIndex
        index_match = re.search(r'correctAnswerIndex:\s*(\d+)', quest_text)
        if not index_match:
            continue
        correct_index = int(index_match.group(1))

        # Extract explanation
        expl_match = re.search(r"explanation:\s*'([^']*(?:\\'[^']*)*)'", quest_text)
        if not expl_match:
            continue
        explanation = expl_match.group(1)

        if len(options) == 4:
            quests.append({
                'id': quest_id,
                'options': options,
                'correctIndex': correct_index,
                'explanation': explanation
            })

    return quests

def analyze_question(quest):
    """Analyze if the correct answer index matches the explanation"""
    qid = quest['id']
    options = quest['options']
    correct_idx = quest['correctIndex']
    explanation = quest['explanation']

    if correct_idx >= len(options):
        return {
            'id': qid,
            'status': 'ERROR',
            'issue': f'Index {correct_idx} out of range (only {len(options)} options)',
            'suggested_index': None
        }

    correct_option = options[correct_idx]

    # Extract key phrases from each option
    def extract_key_phrases(text):
        # Extract Chinese phrases (2+ characters)
        phrases = re.findall(r'[\u4e00-\u9fff]{2,}', text)
        return phrases

    # Check which option's key phrases appear most in explanation
    scores = []
    for idx, opt in enumerate(options):
        key_phrases = extract_key_phrases(opt)
        score = sum(1 for phrase in key_phrases if phrase in explanation)
        scores.append((idx, score, key_phrases))

    # Sort by score
    scores.sort(key=lambda x: x[1], reverse=True)
    best_match_idx = scores[0][0]
    best_score = scores[0][1]
    current_score = scores[[s[0] for s in scores].index(correct_idx)][1] if correct_idx in [s[0] for s in scores] else 0

    # Determine if there's an issue
    if best_match_idx != correct_idx and best_score > current_score:
        return {
            'id': qid,
            'status': 'WRONG',
            'issue': f'Current index {correct_idx} (score={current_score}) but option {best_match_idx} scores higher ({best_score})',
            'current_answer': correct_option[:50],
            'suggested_index': best_match_idx,
            'suggested_answer': options[best_match_idx][:50],
            'explanation': explanation[:100]
        }
    else:
        return {
            'id': qid,
            'status': 'OK',
            'issue': None,
            'suggested_index': None
        }

def main():
    filepath = 'data/gameData.ts'
    quests = extract_quests(filepath)

    print(f"Extracted {len(quests)} questions with 4 options each\n")
    print("="*100)
    print("VERIFICATION REPORT")
    print("="*100)

    wrong = []
    correct = []
    errors = []

    for quest in quests:
        result = analyze_question(quest)

        if result['status'] == 'OK':
            correct.append(result['id'])
        elif result['status'] == 'WRONG':
            wrong.append(result)
            print(f"\n⚠️  {result['id']}: INCORRECT INDEX")
            print(f"   Current: [{quest['correctIndex']}] {result['current_answer']}")
            print(f"   Suggested: [{result['suggested_index']}] {result['suggested_answer']}")
            print(f"   Explanation: {result['explanation']}...")
        else:
            errors.append(result)
            print(f"\n❌ {result['id']}: {result['issue']}")

    print("\n" + "="*100)
    print("SUMMARY")
    print("="*100)
    print(f"Total questions checked: {len(quests)}")
    print(f"✅ Correct indices: {len(correct)}")
    print(f"⚠️  Wrong indices: {len(wrong)}")
    print(f"❌ Errors: {len(errors)}")

    if wrong:
        print(f"\nQuestions with wrong indices: {', '.join([w['id'] for w in wrong])}")

    if correct:
        print(f"\nQuestions with correct indices: {', '.join(correct[:20])}{'...' if len(correct) > 20 else ''}")

if __name__ == '__main__':
    main()
