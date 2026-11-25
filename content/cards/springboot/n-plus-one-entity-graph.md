---
title: "Fixing N+1 with an entity graph"
module: springboot
type: mcq
source: "https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html#jpa.entity-graph"
tags: ["spring-data", "jpa", "performance", "n-plus-one"]
stack: ["springboot"]
choices:
  - text: "Change the association to `FetchType.EAGER` on the entity"
    why: "That loads the members for every query that touches a group, wanted or not, and eager loading can still issue one query per row."
  - text: "Add `@Transactional` to the controller so lazy loading works"
    why: "That avoids a lazy-loading exception, but still runs one query per group."
  - text: "Annotate the repository method with `@EntityGraph(attributePaths = {\"members\"})` so the members are fetched in the same query"
    correct: true
    why: "The entity graph overrides the lazy default for this one query. A `JOIN FETCH` in an `@Query` does the same."
  - text: "Add a database index on the `members` foreign key"
    why: "An index makes each of the N queries faster; there are still N of them."
---

## Prompt

`groupRepository.findAll()` returns 50 groups and the page then reads `group.getMembers()` for each. The log shows 51 SQL queries. `members` is a lazy `@ManyToMany`. What's the targeted fix?
