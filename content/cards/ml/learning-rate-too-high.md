---
title: "Loss bouncing around during training"
module: ml
type: mcq
source: "https://developers.google.com/machine-learning/crash-course/linear-regression/hyperparameters"
tags: ["gradient-descent", "learning-rate", "training"]
choices:
  - text: "The learning rate is too low"
    why: "Too low gives slow, steady progress: the loss creeps down over many iterations rather than jumping around."
  - text: "The batch size is too large"
    why: "Large batches give smoother gradient estimates, which makes the loss less noisy, not more."
  - text: "The model needs more epochs"
    why: "More passes won't help if each step overshoots. The loss will keep bouncing."
  - text: "The learning rate is too high"
    correct: true
    why: "Gradient descent moves the weights a step in the downhill direction, scaled by the learning rate. Too big a step overshoots the minimum, so the loss bounces or climbs and never converges."
---

## Prompt

Training loss jumps up and down every epoch and sometimes climbs instead of falling. What's the most likely cause?
