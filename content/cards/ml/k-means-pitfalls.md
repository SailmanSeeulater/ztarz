---
title: "What k-means assumes"
module: ml
type: mcq
source: "https://scikit-learn.org/stable/modules/clustering.html#k-means"
tags: ["clustering", "k-means", "unsupervised"]
stack: ["scikitlearn"]
choices:
  - text: "k-means finds the best number of clusters automatically"
    why: "You must specify k. People try several values and compare, for example with an elbow plot or silhouette score."
  - text: "k-means always reaches the global best clustering"
    why: "It always converges, but possibly to a local minimum that depends on the starting centroids. That's why it's run several times with k-means++ initialisation."
  - text: "k-means assumes roughly round, similar-sized clusters, so it splits long or curved ones badly"
    correct: true
    why: "It minimises the within-cluster sum of squared distances to each centroid, which favours convex, isotropic blobs. For odd shapes, try DBSCAN or a Gaussian mixture."
  - text: "k-means needs labelled data to train"
    why: "It's unsupervised: it only uses feature values and distances."
---

## Prompt

Which statement about k-means is true?
