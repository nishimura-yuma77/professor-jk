---
name: create-blog-article
description: Use ONLY when creating and writing a new Blog article in this repository, including requests such as "新しいブログ記事を作って", "ブログを書いて", or use of /blog-new. Creates a creative, narratively coherent slug-based draft, writes meta.ts and content.ts, and validates it. Do not use for editing existing articles, publishing drafts, or adding ArticleBlock components.
---

# Create Blog Article

Create a complete draft article with the repository's existing Blog tooling and typed ArticleBlock system. Shape the article as a continuous movement of thought governed by one editorial intention, rather than as a collection of explanatory sections.

## Source Of Truth

Before writing, read:

- `BLOG.md` for the current authoring and publishing workflow.
- `const/article.ts` for the available ArticleBlock variants.
- One or two relevant articles under `const/blog/` when tone or Block usage needs clarification.

Follow the current files if they differ from examples in this Skill.

## Gather The Article Brief

Use information already present in the request before asking questions. Establish:

- The topic and intended takeaway.
- Source material, URLs, files, code, or facts that must be covered.
- The audience and the change in perception, feeling, or understanding the article should create.
- Any voice, atmosphere, image, question, contradiction, or moment the user wants to preserve.
- A title and kebab-case slug, if the user supplied them.
- Any required cover image or media.

Ask one concise question when essential information is missing or the intended claims are ambiguous. Do not invent personal experiences, measurements, incidents, opinions, quotes, or project outcomes. If the request contains enough material, proceed without an unnecessary confirmation round.

When deriving a slug, use a concise lowercase English kebab-case description of the topic. The slug must match `^[a-z0-9]+(?:-[a-z0-9]+)*$`. If multiple materially different slugs are plausible, confirm the choice before creating files.

## Find The Article's Intention

Before drafting, read `references/narrative-writing.md` and work from the supplied material rather than imposing a stock story structure.

Privately establish one governing intention for the article: the particular movement in the reader's perception that every section should help create. This is not merely the topic, summary, or list of facts. Do not write this planning note into the article.

Privately consider two or three materially different narrative directions. They may organize the same material through a question, contrast, discovery, chronology, recurring image, reversal, or another form that emerges from the material. Select the direction with the strongest combination of specificity, continuity, factual support, voice, and resonance. Make this selection automatically unless essential source material is missing or the alternatives would express fundamentally different authorial positions.

Do not invent scenes, chronology, emotions, setbacks, motives, dialogue, or outcomes to make the article feel more narrative. Creative freedom applies to perspective, selection, order, rhythm, and language, not to facts.

## Create The Draft

1. Confirm that `const/blog/<slug>/` does not already exist.
2. Run `npm run blog:new -- <slug>` exactly once.
3. If the slug already exists, do not overwrite it or silently switch to editing it. Report the conflict and ask how to proceed.
4. Edit only the generated `meta.ts` and `content.ts`, plus files explicitly required by the user's request.

Keep the generated `publishedAt` and `logNumber` unless there is a concrete reason to change them. Always keep `draft: true`; publishing is a separate operation and requires an explicit request.

## Write meta.ts

- Replace the placeholder title with a concrete Japanese article title.
- Replace the placeholder description with a concise summary suitable for the archive, metadata, and social previews.
- Keep `slug` equal to the directory name.
- Omit `coverImage` unless the user supplied an appropriate image. The generated `/blog/<slug>/og.png` fallback is the default.
- Do not add optional fields merely to make the metadata look complete.

## Write content.ts

- Remove every generated placeholder sentence.
- Use the available ArticleBlock variants semantically.
- Compose the article around its governing intention before treating it as a sequence of Blocks. ArticleBlock is the delivery format, not the organizing idea.
- Open from a concrete observation, question, image, tension, or claim that belongs specifically to this article. Do not default to announcing what the article will explain.
- Give each section one local intention that advances, complicates, or reframes the article's governing intention.
- Make adjacent sections continuous: each section should inherit something from the previous one and create a reason for the next one to exist.
- Let headings participate in the article's movement. Avoid generic category labels when a heading can express a discovery, contrast, turn, or change in perspective.
- End by completing, deepening, or transforming the movement begun in the opening. Do not recap every section or attach a generic conclusion.
- Give every Block and list item a unique, descriptive kebab-case `id`.
- Give every heading a unique kebab-case `anchor` that describes the section.
- Use `externalLink` for relevant source or reference pages.
- Use `code`, lists, links, and images as evidence or texture within the narrative, not as substitutes for it. Use `code` only for real code needed by the article and specify a supported Shiki language.
- Use `imageGallery` only when actual image paths, dimensions, alt text, and captions are known.
- Preserve the user's voice and level of certainty. Clearly distinguish observed facts from interpretation.
- Prefer concrete and particular language over abstract framing. Explanation should serve the article's intention rather than becoming its default voice.
- Vary paragraph length and sentence rhythm when the material supports it, without becoming ornamental or imitating literary drama.

If the requested presentation is not supported by the current ArticleBlock union, stop and ask whether to use an existing Block or add a new component. Do not expand the shared ArticleBlock ecosystem as a side effect of article creation.

## Edit The Narrative

After drafting, reread the article as a whole before registering it. Revise the prose rather than merely confirming that all requested facts appear.

Check the article in this order:

1. **Whole-article intention:** State the governing intention privately in one sentence. Remove or reshape material that does not contribute to it.
2. **Section intention:** Confirm that each section performs one distinct movement within the whole. Merge sections that repeat the same work and split sections that pursue unrelated intentions.
3. **Continuity:** Read only the final paragraph of each section followed by the next heading and opening paragraph. Repair jumps, resets, and topic changes that feel assembled rather than composed.
4. **Voice:** Replace generic exposition, canned transitions, repeated summaries, and instructional filler with language specific to the subject and the author's point of view.
5. **Truth:** Confirm that every concrete detail, sequence, quote, result, and personal claim is supported by the supplied material.
6. **Ending:** Confirm that the ending changes the meaning of, answers, or echoes the opening without simply restating it.

If a section can be removed without changing the reader's journey through the article, remove it or give it a clearer purpose. Do not preserve material solely for comprehensiveness.

## Register The Draft

Do not expose the generated placeholders through the registry. After `meta.ts` and `content.ts` are complete:

1. Confirm that no template text remains and `draft` is still `true`.
2. Run `npm run blog:generate`.
3. Confirm that `registry.generated.ts` imports the new slug without editing the generated file directly.

This registry update is the point at which a running dev server can discover the new article through HMR.

## Validate

Do not start or restart the dev server unless the user explicitly requests it.

Run these commands sequentially after writing:

```bash
npm run lint
npm run typecheck
npm run build
```

Fix errors caused by the new article. Do not modify unrelated user changes or clean up existing warnings outside the article's scope.

Before finishing, confirm:

- No template text remains.
- The slug matches the directory and metadata.
- `draft` is still `true`.
- Block IDs and heading anchors are unique.
- Claims are supported by the supplied material.
- The article is governed by one discernible intention rather than a list of topics.
- Every section has one local intention that contributes to the whole.
- The ending of each section and beginning of the next form a continuous reading path.
- The voice is specific to the article and does not default to explanatory boilerplate.
- The registry was generated by the existing scripts and was not edited directly.

Report the created slug, article files, draft status, and validation results. If creation succeeded but later work is blocked, leave the article as a draft and explain the blocker; do not delete it without permission.
