# End-to-End Product Plan

Date: 2026-05-20

Status: proposed operating plan. User approval required.

## Goal

Build a daily 玄学 dialogue app for 1M daily users.

The app must be:
- Friendly.
- Professional.
- Emotionally supportive.
- Accurate in calculation.
- Traceable in reasoning.
- Useful in daily decisions.

## Core Route

### Phase 1: Data Collection

Owner: Andrew.

Goal:
- Collect reliable calculation engines.
- Collect classical sources.
- Collect public app benchmarks.
- Collect evaluation questions.

Inputs:
- Open-source libraries.
- Classical text sources.
- Competitor product flows.
- User Q&A examples.
- 世界算命大赛题库, if source and usage rights pass review.

Output:
- `Andrew_Source_Inventory.csv`
- source notes
- license notes
- benchmark question set

Human review:
- User approves source list.
- Peter approves metaphysics scope.

### Phase 2: Internal Knowledge Base

Owner: Peter + Andrew.

Goal:
- Turn data into an internal wiki.
- Separate fact, rule, interpretation, and product language.

Knowledge base structure:
- `calculation_rules`
- `classical_sources`
- `system_definitions`
- `interpretation_cards`
- `forbidden_claims`
- `test_cases`
- `style_examples`

Rule card format:
- rule_id
- system
- input fields
- calculation dependency
- source basis
- interpretation logic
- user-facing wording
- caveat
- Peter approval status

Human review:
- Peter approves rule cards.
- User approves MVP knowledge scope.

### Phase 3: Benchmark Evaluation

Owner: Bill.

Goal:
- Use internal wiki + model to answer benchmark questions.
- Measure whether the product reaches “master-level” output.

Benchmark source:
- 世界算命大赛题库, only after Andrew validates source, permission, and quality.
- If not usable, create internal benchmark from approved cases.

Evaluation dimensions:
- calculation accuracy
- rule traceability
- interpretation depth
- answer usefulness
- tone safety
- emotional support
- refusal quality

Output:
- benchmark dataset
- answer samples
- scoring rubric
- error log
- improvement backlog

Human review:
- Peter scores professional correctness.
- Bill scores product usability.
- User approves whether quality is good enough for product spec.

### Phase 4: Conversation Style

Owner: Bill.

Goal:
- Make the answer fit user habits.
- Keep it human, warm, and professional.
- Avoid fear, mystery theater, and fake certainty.

Style standard:
- conclusion first
- short explanation
- practical suggestion
- emotional support
- optional follow-up

Forbidden style:
- scare tactics
- absolute fate claims
- paid ritual upsell
- medical, legal, or financial certainty
- vague “能量很强” filler

Output:
- style guide
- sample answer library
- prompt policy
- refusal templates

Human review:
- User approves tone.
- Peter approves professional wording.

### Phase 5: UI/UE Design

Owner: Bill.

Goal:
- Design the daily use flow.
- Make the app easy to open every day.
- Make dialogue feel low-pressure.

Core screens:
- onboarding
- birth profile
- daily fortune
- chat
- reasoning/source card
- history
- profile settings

Design principles:
- first screen gives daily value
- professional proof is visible but not heavy
- source logic is accessible on demand
- emotional support is built into answer flow
- avoid “scam-like” visuals and claims

Human review:
- User approves key screens.
- Peter approves visible metaphysics terms.

### Phase 6: Development and Deployment

Owner: engineering.

Goal:
- Build and deploy MVP.

System layers:
1. calculation engine
2. knowledge base
3. retrieval layer
4. model response layer
5. evaluation layer
6. frontend app
7. analytics and safety logs

MVP release requirements:
- validated calculation output
- approved rule cards
- benchmark score above threshold
- safety policy implemented
- core daily flow complete
- user feedback loop live

Human review:
- User approves MVP release.

## Operating Principle

No phase moves forward without a review gate.

The product must not be “LLM pretending to be a master.”

The product must be:
- engine-calculated
- source-grounded
- Peter-reviewed
- benchmark-tested
- user-friendly

## Immediate Next Step

Create Phase 1 deliverables:

1. Andrew validates the source inventory.
2. Peter defines MVP rule systems.
3. Bill defines benchmark scoring.

Recommended first benchmark task:
- Verify whether 世界算命大赛题库 is real, accessible, legally usable, and high quality.
- If it passes, convert it into a structured evaluation set.
- If it fails, build an internal benchmark from approved cases.
