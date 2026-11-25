---
title: "Reading a dot product"
module: math
type: mcq
source: "https://en.wikipedia.org/wiki/Dot_product"
tags: ["vectors", "linear-algebra"]
stack: ["numpy"]
choices:
  - text: "`[-12, 12]`: the vectors share no direction"
    why: "That's the element-wise product `a * b`. The dot product then sums those terms into a single number."
  - text: "`25`: the product of their lengths"
    why: "Both lengths are 5, but |a||b| is only the dot product when the vectors point the same way, because a · b = |a||b| cos θ."
  - text: "`0`: the vectors are perpendicular"
    correct: true
    why: "3 × −4 + 4 × 3 = 0. Since a · b = |a||b| cos θ, a zero result means cos θ = 0: a right angle. Positive means they point broadly the same way, negative broadly opposite."
  - text: "`-1`: they point in opposite directions"
    why: "−1 is the cosine similarity of exactly opposite vectors. The raw dot product isn't scaled to the range −1..1."
---

## Prompt

What does this return, and what does it say about the two vectors?

```python
import numpy as np
np.dot([3, 4], [-4, 3])
```
