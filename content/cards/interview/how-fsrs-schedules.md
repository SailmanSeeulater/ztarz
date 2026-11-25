---
title: "How does spaced repetition schedule a card?"
module: interview
type: out-loud
source: "https://github.com/open-spaced-repetition/awesome-fsrs/wiki/ABC-of-FSRS"
tags: ["spaced-repetition", "fsrs", "algorithms", "project"]
---

## Prompt

Your app uses spaced repetition. How does it decide when to show a card again?

## Model answer

ztarz uses FSRS, which models each card's memory with three numbers:

- **Retrievability:** the probability I'd recall it right now. It falls as time passes since the last review.
- **Stability:** how slowly retrievability falls. Roughly, the number of days for it to drop from 100% to 90%.
- **Difficulty:** how hard this card is for me. It limits how fast stability can grow.

When I answer, the rating (Again, Hard, Good or Easy) updates stability and difficulty. A successful review never lowers stability, and it raises it most when the card was nearly forgotten. A lapse cuts it.

The next interval is the point where predicted retrievability falls to the **desired retention**, which is 90% in ztarz. A higher target means shorter intervals and more reviews a day.

The model's parameters can be fitted to a person's own review history, which is why ztarz logs every review with the memory state before it. In the app, a day's session is the cards that are due plus a few new ones.
