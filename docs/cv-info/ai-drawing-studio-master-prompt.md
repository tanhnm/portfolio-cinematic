Build a complete local-first AI Drawing Video Studio.

The goal is to create drawing-style videos entirely through code.

Do NOT use Veo.

Do NOT use any text-to-video model.

Do NOT use diffusion video generation.

The final video must be generated programmatically using:

- TypeScript
- React
- SVG
- Remotion
- FFmpeg

The initial visual style is:

STICKMAN DRAWING ANIMATION.

The architecture must later support:

- doodle
- whiteboard
- notebook
- chalkboard
- blueprint
- marker
- minimal line-art

The application should eventually allow this workflow:

User provides content
→ content is normalized
→ VideoPlan is created
→ scenes are resolved
→ stickman/SVG visuals are generated
→ animations are resolved
→ Remotion preview is generated
→ user edits scenes
→ final MP4 is rendered

The video renderer must be deterministic.

AI may decide what should happen.

Code must decide how the video is rendered.

Do not let AI directly generate arbitrary JSX, JavaScript, CSS, or SVG that is executed at runtime.

Use structured schemas and renderer-native DSL objects.

---

# CORE CONTENT WORKFLOWS

Support three creation modes.

## production_only

The user already created the content somewhere else.

For example, the user may use ChatGPT Web to create:

- topic
- research
- hook
- script
- storyboard
- scene descriptions
- creative plan

The imported content is the source of truth.

Do not unnecessarily rewrite approved narration.

Do not change approved scene order unless required for renderability.

Fill only missing technical information such as:

- layouts
- visual primitives
- stickman poses
- animations
- subtitle timing
- asset mappings

## assist

The user supplies partial content.

Fill missing sections while preserving supplied content.

Example:

user provides script

system creates:

storyboard
visual plan
animation plan
subtitles

## full_auto

The user provides only a topic.

Example:

"Why do people procrastinate?"

The system creates:

topic brief
hook
script
storyboard
visual plan
animation plan
subtitles
VideoPlan

All three modes must use the same final renderer.

---

# IMPORTANT ARCHITECTURE

Use this flow:

Content
→ CreativeVideoPlan
→ VideoPlan
→ Visual DSL
→ Animation DSL
→ Validation
→ Drawing Engine
→ Remotion
→ FFmpeg
→ MP4

CreativeVideoPlan contains human/AI creative ideas.

VideoPlan contains production-ready renderer instructions.

Keep these two concepts separate.

---

# CREATIVE VIDEO PLAN

Create a schema containing approximately:

{
  "version": "1.0",
  "title": "",
  "topic": "",
  "hook": "",
  "audience": "",
  "tone": [],
  "language": "en",
  "durationSeconds": 60,
  "scenes": []
}

Each creative scene contains approximately:

{
  "id": "scene_001",
  "purpose": "hook",
  "narration": "",
  "visualIdea": "",
  "onScreenText": [],
  "emotion": ""
}

This format should be easy for ChatGPT Web or a human to produce.

---

# VIDEOPLAN

Create a strongly typed, versioned VideoPlan schema.

Use Zod.

It should contain approximately:

{
  "version": "1.0",

  "project": {},

  "styleGuide": {},

  "characters": [],

  "assets": [],

  "audio": {},

  "scenes": [],

  "metadata": {}
}

VideoPlan must not depend on:

- React
- Remotion
- OpenAI
- Prisma
- Fastify

It must be portable JSON.

---

# PROJECT SETTINGS

Support:

id

title

topic

platform

aspectRatio

width

height

fps

durationSeconds

language

audience

tone

stylePreset

creationMode

contentSource

seed

Default:

platform = youtube_shorts

aspectRatio = 9:16

width = 1080

height = 1920

fps = 30

durationSeconds = 60

stylePreset = stickman_classic

---

# CONTENT SOURCES

Track sources such as:

external_gpt

manual

internal_ai

imported_script

imported_storyboard

imported_video_plan

This matters because approved external content should not be unexpectedly rewritten.

---

# CREATIVE LOCKS

Implement creative locks.

Example:

{
  "title": true,
  "hook": true,
  "narration": true,
  "sceneOrder": true,
  "visualConcept": false
}

Respect these locks during generation and regeneration.

If narration is locked:

visual regeneration must not rewrite narration.

---

# SCENES

A production scene should contain approximately:

id

index

startTime

duration

purpose

narration

visualDescription

layout

elements

animations

subtitles

transition

metadata

Example:

{
  "id": "scene_001",
  "index": 0,
  "startTime": 0,
  "duration": 5,
  "purpose": "hook",
  "narration": "You are not lazy.",
  "visualDescription": "A worried stickman looks at a giant task.",
  "layout": "character_left_content_right",
  "elements": [],
  "animations": []
}

---

# VISUAL DSL

Create a constrained visual DSL.

Supported element types should initially include:

character

asset

text

shape

arrow

icon

group

Every element should use typed properties.

Do not allow arbitrary JSX.

Do not allow arbitrary CSS.

Do not allow arbitrary SVG code imported from AI output.

Use normalized coordinates where appropriate:

x = 0..1

y = 0..1

Renderer maps normalized coordinates to video dimensions.

---

# LAYOUT SYSTEM

Create reusable layouts.

Examples:

center_focus

character_left_content_right

character_right_content_left

top_title_center_visual

full_screen_character

comparison

before_after

three_steps

timeline

diagram

question_answer

AI/content planners should select layout IDs instead of manually calculating every coordinate.

---

# ANIMATION DSL

Create typed animation primitives.

Initial required animations:

draw

write

fadeIn

fadeOut

move

scale

highlight

pop

wait

Later:

rotate

wiggle

bounce

erase

cameraPan

cameraZoom

Every animation must contain:

id

type

targetId

start

duration

easing

parameters

Use discriminated unions.

AI must never generate arbitrary animation JavaScript.

---

# DRAWING EFFECT

The main visual identity is progressive hand-drawn animation.

Implement SVG path reveal using concepts such as:

stroke-dasharray

stroke-dashoffset

path length

frame interpolation

Provide reusable utilities.

Given progress:

0 = hidden

0.5 = half drawn

1 = fully drawn

Support grouped multi-path drawing.

---

# STICKMAN ENGINE

Create stickman characters procedurally using SVG.

Do not use generated stickman images.

Model body parts such as:

head

neck

torso

left arm

right arm

left leg

right leg

eyes

mouth

eyebrows when useful

Use joints or practical pose geometry.

---

# INITIAL POSES

Implement useful pose presets including:

standing

sitting

walking

running

thinking

confused

happy

sad

angry

excited

worried

tired

sleeping

working

typing

pointing

celebrating

surprised

facepalm

looking_at_phone

reading

speaking

---

# EXPRESSIONS

Support:

neutral

happy

sad

angry

confused

worried

excited

surprised

sleepy

focused

frustrated

---

# CHARACTER CONSISTENCY

Characters must maintain identity across scenes.

Character definition may contain:

id

name

body proportions

stroke settings

hair marker

glasses

accessories

accent color

A scene changes:

pose

expression

position

scale

rotation

but not character identity.

---

# ASSET LIBRARY

Create reusable procedural SVG assets.

Start with common objects such as:

desk

chair

laptop

monitor

phone

book

clock

calendar

brain

heart

lightbulb

money

wallet

house

car

office

school

bed

coffee

document

folder

email

notification

bell

check

cross

question mark

exclamation mark

arrow

chart

timeline

graph

speech bubble

thought bubble

cloud

sun

moon

star

road

tree

door

stairs

target

trophy

Do not block MVP on building every asset.

Create assets as needed.

---

# ASSET REGISTRY

Every asset should have:

id

aliases

category

keywords

renderer

default dimensions

drawing information

Example:

"computer"

"notebook computer"

"portable computer"

may resolve to:

laptop

Create an asset resolver.

---

# SIMPLE SHAPES

Support native rendering of:

line

circle

ellipse

rectangle

rounded rectangle

polyline

arrow

underline

scribble

highlight circle

progress bar

basic charts

---

# TEXT SYSTEM

Support text roles:

title

caption

label

subtitle

emphasis

annotation

Use predefined style tokens.

Do not accept arbitrary AI-generated CSS.

---

# SUBTITLES

Subtitle segments should contain:

sceneId

start

end

text

optional emphasis

Use phrase-level timing initially.

Keep subtitles within safe areas.

Wrap text correctly.

Avoid giant subtitle blocks.

---

# SAFE AREAS

Provide vertical-video safe-area configuration.

Preview should optionally display safe-area guides.

Keep important text and visual information away from typical platform UI overlays.

---

# STYLE SYSTEM

Create style presets.

Initial preset:

stickman_classic

Use:

white or warm-white background

near-black strokes

simple typography

minimal accent color

clean drawing

simple transitions

Architecture should later support:

stickman_dark

doodle

whiteboard

notebook

chalkboard

blueprint

marker

---

# CONTENT IMPORT

Support:

raw topic

plain script

storyboard JSON

CreativeVideoPlan JSON

VideoPlan JSON

Markdown content

Build robust validation.

When importing externally generated content:

show warnings

map aliases

preserve locked creative fields

reject only genuinely invalid structures.

---

# GPT WEB WORKFLOW

Treat ChatGPT Web content creation as a first-class workflow.

Create documentation explaining:

GPT Web
→ approved creative content
→ import into project
→ convert to VideoPlan
→ preview
→ edit
→ render

Create a reusable file:

templates/gpt-content-prompt.md

This file should help the user ask ChatGPT Web to generate content compatible with CreativeVideoPlan.

Do not require ChatGPT Web to understand Remotion or SVG implementation details.

---

# CONTENT NORMALIZATION

Create a content package responsible for converting:

topic

script

storyboard

CreativeVideoPlan

into normalized content.

Do not mix content parsing with rendering code.

---

# OPTIONAL AI PIPELINE

The platform may optionally generate content internally.

Create logical stages such as:

ContentDirector

ScriptWriter

StoryboardPlanner

VisualPlanner

AnimationPlanner

SubtitlePlanner

QA

Do not build an unnecessarily complex distributed multi-agent system.

A sequential structured pipeline is enough.

---

# AI PROVIDER ABSTRACTION

Create an interface for structured generation.

Implement:

MockAIProvider

OpenAIProvider

The renderer must not require either provider.

External content must be renderable without any AI call.

Use OpenAI Responses API when OpenAI integration is enabled.

Prefer Structured Outputs.

Validate everything with Zod.

---

# MODEL CONFIGURATION

Do not hardcode model names throughout the application.

Create centralized configuration.

Example environment variables:

AI_PROVIDER

AI_DEFAULT_MODEL

AI_FAST_MODEL

AI_HARD_MODEL

AI_DEFAULT_REASONING

AI_HARD_REASONING

AI_MOCK_MODE

Mock mode must be enabled easily.

---

# MOCK MODE

Implement:

AI_MOCK_MODE=true

When enabled:

make zero paid AI calls.

Use deterministic fixtures.

The full renderer/editor/render workflow must still work.

---

# VISUAL PLANNING RULES

Resolve visuals in this priority:

1. procedural stickman
2. reusable SVG asset
3. primitive shape
4. icon
5. typography
6. combination of the above

Never require AI image generation.

Never require AI video generation.

If a visual concept is too complicated:

simplify the concept while preserving its meaning.

Example:

"thousands of emails explode out of a laptop"

can become:

laptop

five envelope icons

outward arrows

worried stickman

---

# CAPABILITY REGISTRIES

Maintain registries for:

poses

expressions

assets

layouts

animations

styles

transitions

Planners should receive the current capabilities.

Do not allow planners to invent unsupported renderer features.

---

# VISUAL SIMPLIFICATION

Implement a mechanism for unsupported ideas.

Example:

"character carries the entire world on his shoulders"

may become:

stickman

large globe icon

globe positioned above shoulders

worried pose

The system should simplify rather than fail unnecessarily.

---

# VALIDATION

Implement deterministic validation.

Check:

schema validity

duplicate IDs

scene timings

negative durations

invalid references

missing animation targets

unsupported poses

unsupported expressions

unsupported assets

unsupported animations

invalid coordinates

timeline overflow

invalid subtitle timing

invalid dimensions

AI QA must not replace deterministic validation.

---

# QA

Optional AI QA may check:

weak hook

visual/narration mismatch

repetitive scenes

clutter

tone inconsistency

poor ending

confusing metaphor

Keep AI QA separate from hard renderer validation.

---

# REPAIR

For structured AI output:

validate

capture errors

request targeted repair

retry only the invalid portion

default maximum retries = 2

Never create infinite retry loops.

---

# SCENE REGENERATION

Support:

regenerateScene

regenerateNarration

regenerateVisuals

regenerateAnimation

regenerateSubtitles

Never regenerate the entire project merely because one scene needs modification.

Respect creative locks.

---

# VIDEO EDITOR

Build a desktop-first editor.

Layout:

LEFT:
scene navigator

CENTER:
Remotion preview

RIGHT:
scene inspector

BOTTOM:
basic timeline

TOP:
project controls

---

# PROJECT CREATION

Allow:

Create from Topic

Paste Script

Import Storyboard

Import Creative Plan

Import VideoPlan

Provide settings:

platform

duration

language

audience

tone

style

---

# SCENE NAVIGATOR

Support:

select

add

duplicate

delete

reorder

duration display

warning indicator

lock indicator

---

# INSPECTOR

Allow editing:

narration

visual description

layout

character

pose

expression

text

duration

animations

creative locks

Provide actions:

Regenerate Visuals

Regenerate Animation

Regenerate Subtitles

Preview Scene

---

# PREVIEW

Use Remotion Player.

Preview must consume the same VideoPlan contract as final rendering.

Do not create a completely separate visual preview implementation.

---

# TIMELINE

Keep MVP timeline simple.

Display:

scenes

duration

animation markers

subtitle markers

audio indicator

Do not build a professional NLE.

---

# VIDEO ENGINE

Organize approximately:

VideoComposition

SceneSequence

SceneRenderer

CharacterRenderer

StickmanRenderer

AssetRenderer

ShapeRenderer

TextRenderer

SubtitleRenderer

AnimationController

TransitionRenderer

Renderer components should receive validated data.

Do not fetch project data internally.

---

# FRAME UTILITIES

Centralize:

secondsToFrames

framesToSeconds

sceneLocalFrame

animationProgress

clamp

interpolation

easing

Do not duplicate frame calculations everywhere.

---

# CHARACTER ACTIONS

Eventually support reusable deterministic actions such as:

walk

run

look

nod

shakeHead

point

type

think

celebrate

panic

sleep

phoneScroll

These actions map to procedural movement.

Start only with actions needed by demo content.

---

# CAMERA

MVP camera:

static

Later support:

pan

zoom

Keep camera architecture simple.

---

# TRANSITIONS

Initial:

none

fade

simple slide

Avoid flashy transitions.

---

# AUDIO ARCHITECTURE

Create:

VoiceProvider

Initial:

MockVoiceProvider

Future:

real TTS providers

Do not block early renderer development on TTS.

---

# NARRATION TIMING

Before audio exists:

estimate narration duration using words-per-minute.

After actual audio exists:

use actual audio duration.

Create reconciliation logic when narration is longer than planned scene duration.

Do not excessively speed up audio.

---

# FFMPEG

Create a centralized FFmpeg wrapper.

Support as needed:

mux audio/video

normalize audio

mix audio

probe metadata

convert formats

Sanitize paths.

Never execute shell strings constructed directly from user content.

---

# FINAL OUTPUT

Default:

MP4

1080x1920

30 FPS

9:16

Use reasonable H.264-compatible export settings.

---

# LOCAL CLI

Build an agent-friendly CLI.

Target commands:

pnpm video:create

pnpm video:validate

pnpm video:preview

pnpm video:render

pnpm video:list

Example project directory:

content/
  procrastination/
    project.json
    source.md
    script.md
    creative-plan.json
    video-plan.json
    assets/
    audio/
    render/

Antigravity should be able to operate this workflow from terminal.

---

# OUTPUT DIRECTORY

Use something like:

output/
  procrastination/
    final.mp4
    video-plan.json
    render-metadata.json

Do not silently overwrite previous completed renders.

Use versions or unique render IDs.

---

# LOCAL-FIRST DEVELOPMENT

The drawing engine and Remotion preview must run locally.

Prefer tooling that does not require Windows Administrator access.

Avoid unnecessary global dependencies.

Do not make Docker mandatory for basic preview/render development.

---

# MONOREPO

Use approximately:

apps/
  web/
  api/
  worker/

packages/
  schemas/
  content/
  ai/
  drawing-engine/
  video-engine/
  asset-library/
  audio/
  database/
  queue/
  storage/
  ui/
  shared/
  config/

tools/
  video-cli/

content/

fixtures/

output/

docs/

scripts/

Use pnpm and Turborepo unless existing repository constraints suggest otherwise.

---

# DATABASE

When persistence is introduced use:

PostgreSQL

Prisma

Entities approximately:

Project

Scene

VideoVersion

RenderJob

GenerationJob

AgentRun

Asset

Character

StylePreset

Do not store video binaries in PostgreSQL.

---

# VERSIONING

When user renders:

snapshot the current VideoPlan.

Create immutable VideoVersion.

Render that snapshot.

If project changes during rendering, current render must remain unchanged.

---

# QUEUE

Use:

BullMQ

Redis

Render jobs should execute outside normal HTTP requests.

Statuses:

queued

preparing

rendering

encoding

completed

failed

---

# WORKER

Worker flow:

load VideoVersion

validate VideoPlan

resolve assets

prepare audio

render Remotion

process with FFmpeg if necessary

store output

update database

clean temp files

Handle failures explicitly.

---

# STORAGE

Create:

StorageProvider

Initial:

LocalStorageProvider

Future-compatible with:

S3

R2

MinIO

---

# SECURITY

Never expose:

AI API keys

database credentials

Redis secrets

storage credentials

TTS credentials

Validate request payloads.

Prevent path traversal.

Never evaluate imported JavaScript.

Never execute arbitrary AI-generated code.

Never use raw imported SVG markup without sanitization/DSL conversion.

---

# TELEMETRY

For AI calls record when available:

agent

provider

model

reasoning level

prompt version

latency

token usage

retry count

success/failure

projectId

sceneId

Do not log secrets.

---

# COST CONTROL

Implement:

mock mode

bounded retries

scene-level regeneration

idempotent expensive operations

result reuse

small AI contexts

creative locks

No unnecessary whole-project regeneration.

---

# PROJECT DOCUMENTATION

Maintain:

README.md

docs/ARCHITECTURE.md

docs/PROGRESS.md

docs/TASKS.md

docs/VIDEOPLAN.md

docs/CONTENT_WORKFLOW.md

docs/GPT_CONTENT_WORKFLOW.md

docs/ANTIGRAVITY_WORKFLOW.md

docs/RENDERER.md

docs/LOCAL_DEVELOPMENT.md

docs/DECISIONS/

---

# PROGRESS TRACKING

docs/PROGRESS.md should contain:

Completed

In Progress

Next

Known Issues

Architecture Decisions

Test Status

Current Milestone

Update it after meaningful milestones.

---

# SESSION RECOVERY

Whenever starting or resuming work:

inspect repository

inspect git status

read:

README.md

docs/PROGRESS.md

docs/TASKS.md

docs/ARCHITECTURE.md

Then continue from the first unfinished milestone.

Do not restart completed work.

---

# TESTING

Create unit tests for:

VideoPlan schemas

CreativeVideoPlan schemas

scene timing

animation validation

asset resolution

pose resolution

stickman geometry

drawing progress

layout resolution

content normalization

VideoPlan conversion

renderability validation

job state transitions

Create integration tests for:

script import

CreativeVideoPlan import

VideoPlan import

mock generation

scene regeneration

project persistence

render-job creation

CLI flows

---

# DEMO PROJECT

Create:

content/procrastination/

Topic:

Why do people procrastinate?

Duration:

approximately 60 seconds

Style:

Stickman Classic

Tone:

fun

educational

relatable

Opening narration:

"You are not lazy. Your brain is just really good at avoiding discomfort."

Suggested scenes:

1. Stickman sees a huge task.

2. Character hesitates.

3. Brain/discomfort metaphor.

4. Phone notification appears.

5. Character chooses easy reward.

6. Clock moves forward.

7. Deadline becomes huge.

8. Character panics.

9. Task is broken into a tiny first step.

10. Character starts working.

Create this as a deterministic fixture.

Do not use AI API for the fixture.

---

# FIRST MILESTONE

Before implementing AI:

create a working deterministic preview scene.

Requirements:

vertical white canvas

stickman progressively draws onto screen

desk draws

laptop draws

character visually faces laptop

text appears:

"Why do we procrastinate?"

question mark appears

scene plays correctly in Remotion Player

This proves:

VideoPlan

SVG engine

stickman engine

animation DSL

Remotion preview

are working together.

Do not move deeply into AI before this works.

---

# SECOND MILESTONE

Create the complete deterministic procrastination demo.

Requirements:

8–10 scenes

drawing animations

text

stickman poses

basic transitions

subtitles or placeholder subtitle timing

Preview works.

---

# THIRD MILESTONE

Implement external content import.

The user must be able to take content made in ChatGPT Web and import it.

Support at minimum:

script

CreativeVideoPlan

VideoPlan

Preserve approved content.

---

# FOURTH MILESTONE

Build editor.

User can:

select scenes

edit narration

change visual description

change pose

change expression

change text

change duration

preview

---

# FIFTH MILESTONE

Implement final rendering.

Generate final MP4 locally.

---

# SIXTH MILESTONE

Add optional internal AI generation.

Raw topic:

"Explain the habit loop."

should become:

CreativeVideoPlan

then:

VideoPlan

then:

preview/render

But external GPT content must continue to work without internal AI.

---

# DEFINITION OF MVP DONE

Do not declare MVP complete until:

monorepo builds

web app works

API works

CreativeVideoPlan exists

VideoPlan exists

script import works

CreativeVideoPlan import works

VideoPlan import works

creative locks work

procedural stickman works

SVG assets work

drawing animation works

multi-scene preview works

Remotion Player works

editor works

scene-level regeneration works

mock mode works

optional AI provider works when configured

project persistence works

queue works

render worker works

final MP4 works

subtitles work

CLI works

tests pass

typecheck passes

build passes

demo works without AI API

no Veo is used

no generative video model is used

---

# DEVELOPMENT RULES

Do not only explain what needs to be implemented.

Implement it.

Do not stop after scaffolding.

Do not repeatedly ask for permission to continue.

Make reasonable engineering decisions.

Work incrementally.

After meaningful changes run:

typecheck

tests

build where appropriate

Fix errors before continuing.

Do not hide errors using `any`.

Do not randomly patch dependencies.

Do not disable validation simply to make tests pass.

Find root causes.

---

# GIT SAFETY

Inspect git status before major changes.

Do not delete uncommitted user work.

Do not overwrite unrelated files.

Avoid destructive commands.

---

# WHEN SOMETHING IS MISSING

If API credentials are unavailable:

use mock providers.

If PostgreSQL is unavailable:

continue with schema and appropriate local/mock path.

If Redis is unavailable:

continue implementing queue abstraction and local testing path.

If TTS credentials are unavailable:

use mock voice.

Do not stop the overall implementation because an external service is unavailable.

---

# NO FALSE COMPLETION

Do not claim something works unless it has been tested when testing is possible.

If something is implemented but cannot be verified:

state that clearly in docs/PROGRESS.md.

---

# PRIORITY ORDER

Prioritize:

1. VideoPlan
2. deterministic stickman renderer
3. SVG drawing engine
4. Remotion preview
5. GPT Web content import
6. editor
7. MP4 rendering
8. subtitles/audio
9. optional AI generation
10. advanced visual polish

---

# PRODUCT PRINCIPLE

This is not a text-to-video platform.

It is:

AN AI-DIRECTED PROGRAMMATIC DRAWING ANIMATION STUDIO.

The core advantages should be:

deterministic video

editable scenes

consistent characters

low production cost

repeatable visual style

code-driven animations

easy iteration

content portability

GPT Web compatibility

Antigravity-friendly local workflow

---

# START

Inspect the current repository first.

If the repository is empty:

initialize the monorepo.

Create:

docs/PROGRESS.md

docs/TASKS.md

docs/ARCHITECTURE.md

Then begin with:

VideoPlan schemas

CreativeVideoPlan schemas

deterministic fixture

stickman engine

SVG drawing engine

Remotion preview

Do not begin with OpenAI integration.

Continue through the milestones automatically.

Use the repository documentation to maintain progress across sessions.

Do not stop merely to provide a plan.

Build the project.
