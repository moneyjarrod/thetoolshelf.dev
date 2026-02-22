# FIELDSTONE Split-Mode Workflow

## Problem
Web search results consume 40-50K tokens per batch of listings.
Writing listings needs ~5K tokens each. Combined = compaction city.

## Solution: Two-Conversation Pipeline

### Conversation A: Research
- Run all web searches for a batch (3-5 servers)
- Condense findings into `research/wave-X-notes.md`
- Format: one section per server with everything needed to write the listing
- NO file creation — just research and notes

### Conversation B: Writing  
- Read the notes file + LISTING_TEMPLATE.md + ASSESSMENT_CRITERIA.md
- Write all listings from compressed notes
- Zero web searches needed
- Can also be CC execution

## Research Note Format Per Server

```
## [Server Name]

### Identity
- GitHub: [url]
- Package: [npm/pypi]  
- Language: [lang]
- License: [license]
- Stars: [approx]
- Last updated: [date]
- Transport: [stdio/sse/http]

### What It Does (3-4 sentences)
[Core functionality summary]

### Tools List
[Enumerated tools with one-line descriptions]

### Install Config
[The actual JSON config block]

### Gotchas Found
- [Real issues, sharp edges, confusion points]

### Verdict Lean
[Recommended/Conditional/Skip + 1-sentence reason]

### Comparison Notes  
- vs [archived/competing server]: [key difference]
- Setup difficulty: [1-5]
```

## Batch Sizing
- 3-5 servers per research conversation (sweet spot)
- Research conv stays under 100K tokens
- Writing conv stays under 50K tokens
- No compactions in either
