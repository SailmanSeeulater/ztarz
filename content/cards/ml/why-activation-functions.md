---
title: "Why neural networks need activation functions"
module: ml
type: out-loud
source: "https://developers.google.com/machine-learning/crash-course/neural-networks/activation-functions"
tags: ["neural-networks", "activation-functions", "deep-learning"]
---

## Prompt

Explain what a neural network layer computes, and why stacking layers is pointless without an activation function. About 60 seconds.

## Model answer

Each node in a layer takes the previous layer's outputs, multiplies each by a weight, adds them up with a bias, and passes the result through an activation function. A layer is many such nodes side by side; a network is layers stacked, with hidden layers between input and output.

Without the activation function, each layer is just a linear transformation, and linear operations on linear operations are still linear. Ten layers collapse into one, and the network can only draw straight decision boundaries.

The activation adds a non-linear bend. The common one is **ReLU**: max(0, x). It's cheap to compute and often trains better than smooth options like sigmoid or tanh. Stack enough of those bends and the network can fit curved, complex patterns.

Training uses backpropagation: compute the loss, work out how much each weight contributed, and nudge every weight downhill with gradient descent.
