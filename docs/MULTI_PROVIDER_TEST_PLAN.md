# Multi-Provider AI Failover Test Plan

## 🎯 Test Objectives

Verify that the automatic failover system correctly tries providers in order:
1. OpenAI GPT-4o (Primary)
2. Ollama Cloud (Secondary)
3. Google Gemini (Tertiary)

---

## 🧪 Test Scenarios

### Scenario 1: All Providers Enabled (Normal Operation)
**Expected**: OpenAI responds immediately

**Setup**: All API keys configured in `.env`
```bash
OPENAI_API_KEY=sk-...
OLLAMA_API_KEY=ollama_...
GEMINI_API_KEY=AIza...
```

**Test Steps**:
1. Open Bible Question Generator
2. Click "Generate Question"
3. Watch console logs

**Expected Console Output**:
```
🔄 Generating Bible Question - Starting provider chain...
🔄 Trying OpenAI (gpt-4o)...
✅ OpenAI succeeded
```

**Expected Behavior**: Question generates in 2-5 seconds

---

### Scenario 2: OpenAI Disabled (Test Ollama Fallback)
**Expected**: System falls back to Ollama Cloud

**Setup**: Temporarily disable OpenAI
```bash
# Comment out OpenAI key
# OPENAI_API_KEY=sk-...
OLLAMA_API_KEY=ollama_...
GEMINI_API_KEY=AIza...
```

**Test Steps**:
1. Rebuild app: `npm run build`
2. Open Bible Question Generator
3. Click "Generate Question"
4. Watch console logs

**Expected Console Output**:
```
🔄 Generating Bible Question - Starting provider chain...
🔄 Trying OpenAI (gpt-4o)...
⚠️ OpenAI failed: OPENAI_API_KEY not configured
↪️ Falling back to Ollama Cloud (qwen2.5-coder:32b)...
✅ Ollama Cloud succeeded
```

**Expected Behavior**: Question generates via Ollama (may take 5-10 seconds)

---

### Scenario 3: OpenAI + Ollama Disabled (Test Gemini Fallback)
**Expected**: System falls back to Gemini (may fail due to location)

**Setup**: Disable both OpenAI and Ollama
```bash
# OPENAI_API_KEY=sk-...
# OLLAMA_API_KEY=ollama_...
GEMINI_API_KEY=AIza...
```

**Test Steps**:
1. Rebuild app: `npm run build`
2. Open Bible Question Generator
3. Click "Generate Question"
4. Watch console logs

**Expected Console Output**:
```
🔄 Generating Bible Question - Starting provider chain...
🔄 Trying OpenAI (gpt-4o)...
⚠️ OpenAI failed: OPENAI_API_KEY not configured
↪️ Falling back to Ollama Cloud (qwen2.5-coder:32b)...
⚠️ Ollama Cloud failed: OLLAMA_API_KEY not configured
↪️ Falling back to Google Gemini (gemini-2.0-flash-exp)...
```

**Possible Outcomes**:
- ✅ Gemini succeeds (if your location supports it)
- ❌ Gemini fails with "User location is not supported"

---

### Scenario 4: All Providers Disabled (Error Handling)
**Expected**: User-friendly error message

**Setup**: Disable all API keys
```bash
# OPENAI_API_KEY=sk-...
# OLLAMA_API_KEY=ollama_...
# GEMINI_API_KEY=AIza...
```

**Test Steps**:
1. Rebuild app: `npm run build`
2. Open Bible Question Generator
3. Click "Generate Question"
4. Watch console logs and UI

**Expected Console Output**:
```
🔄 Generating Bible Question - Starting provider chain...
🔄 Trying OpenAI (gpt-4o)...
⚠️ OpenAI failed: OPENAI_API_KEY not configured
↪️ Falling back to Ollama Cloud (qwen2.5-coder:32b)...
⚠️ Ollama Cloud failed: OLLAMA_API_KEY not configured
↪️ Falling back to Google Gemini (gemini-2.0-flash-exp)...
❌ Google Gemini failed: GEMINI_API_KEY not configured
Error: All AI providers failed. Please check your configuration and try again.
```

**Expected UI Behavior**: Error message shown to user

---

## 📝 Test Checklist

### Features to Test:
- [ ] Bible Question Generator (`/`)
- [ ] Biblical Language Learning - Sentence Practice (`/language`)
- [ ] Pronunciation Feedback (`/language`)

### Console Log Verification:
- [ ] 🔄 emoji appears when trying provider
- [ ] ✅ emoji appears on success
- [ ] ⚠️ emoji appears on failure
- [ ] ↪️ emoji appears when falling back
- [ ] Provider names are logged correctly
- [ ] Model names are logged correctly

### Performance Metrics:
- [ ] OpenAI response time: 2-5 seconds
- [ ] Ollama response time: 5-10 seconds (if available)
- [ ] Gemini response time: 3-7 seconds (if available)

---

## 🔍 Debugging Tips

### If OpenAI Always Fails:
1. Check `.env` file has `OPENAI_API_KEY=sk-...`
2. Verify API key is valid (not expired)
3. Check network connectivity
4. Look for error message in console

### If Ollama Always Fails:
1. Check if model `qwen2.5-coder:32b` exists in Ollama Cloud
2. Verify `OLLAMA_API_KEY` is set correctly
3. Check `OLLAMA_API_URL=https://api.ollama.cloud`

### If Gemini Always Fails:
1. This is expected if you're in an unsupported location
2. Check `GEMINI_API_KEY` or `API_KEY` is set
3. Try accessing from different region/VPN if needed

---

## 🎬 Quick Test Commands

### Test with Current Configuration:
```bash
# Just open the app and test
npm run dev
# or
npm run build && npm run preview
```

### Test Ollama Fallback:
```bash
# Temporarily rename OpenAI key to disable it
# In .env change:
# OPENAI_API_KEY=sk-...
# to:
# OPENAI_API_KEY_DISABLED=sk-...

npm run build && npm run preview
```

### Restore After Testing:
```bash
# Rename back:
# OPENAI_API_KEY_DISABLED=sk-...
# to:
# OPENAI_API_KEY=sk-...
```

---

## 📊 Expected Test Results Summary

| Scenario | Primary | Secondary | Tertiary | Result |
|----------|---------|-----------|----------|--------|
| Normal | ✅ OpenAI | - | - | Success |
| No OpenAI | ❌ | ✅ Ollama | - | Success |
| No OpenAI/Ollama | ❌ | ❌ | ⚠️ Gemini | May Fail |
| No Providers | ❌ | ❌ | ❌ | Error |

---

## ✅ Success Criteria

The multi-provider system passes if:
1. ✅ OpenAI is tried first when available
2. ✅ Falls back to Ollama when OpenAI fails
3. ✅ Falls back to Gemini when both fail
4. ✅ Shows clear error when all fail
5. ✅ Console logs are clear and helpful
6. ✅ No crashes or hangs
7. ✅ User gets a response or clear error message

---

**Test Date**: 2025-10-26
**Tester**: [Your Name]
**Status**: Ready to Test
