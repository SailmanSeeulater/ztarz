---
title: "A matrix is a transformation"
module: math
type: mcq
source: "https://en.wikipedia.org/wiki/Rotation_matrix"
tags: ["matrices", "linear-algebra"]
choices:
  - text: "It reflects the plane across the line y = x"
    why: "A reflection across y = x sends (1, 0) to (0, 1) but (0, 1) back to (1, 0). The second column here is (−1, 0)."
  - text: "It rotates the plane 90° clockwise"
    why: "Clockwise would send (1, 0) to (0, −1). This matrix sends it to (0, 1), which is anticlockwise."
  - text: "It rotates the plane 90° anticlockwise"
    correct: true
    why: "The columns show where the basis vectors land: (1, 0) goes to (0, 1) and (0, 1) goes to (−1, 0). That's the rotation matrix for θ = 90°: [[cos θ, −sin θ], [sin θ, cos θ]]."
  - text: "It flips every point through the origin"
    why: "That's −I, [[−1, 0], [0, −1]], which sends (1, 0) to (−1, 0)."
---

## Prompt

What does multiplying 2D points by this matrix do?

```text
[ 0  -1 ]
[ 1   0 ]
```

Hint: the first column is where (1, 0) ends up, the second is where (0, 1) ends up.
