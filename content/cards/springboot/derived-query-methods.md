---
title: "Spring Data repositories and derived queries"
module: springboot
type: concept
source: "https://docs.spring.io/spring-data/jpa/reference/repositories/query-methods-details.html"
tags: ["spring-data", "jpa", "repositories"]
stack: ["springboot"]
---

## Prompt

How can a Spring Data JPA repository run queries when you only write an interface?

## Answer

You declare an interface extending a repository type such as `JpaRepository<User, Long>`, and Spring Data generates the implementation at runtime. You get `save`, `findById`, `findAll`, `deleteById` and so on for free.

For custom queries, it **derives the query from the method name**:

```java
interface UserRepository extends JpaRepository<User, Long> {
  List<User> findByEmailAddressAndLastname(String email, String lastname);
  List<User> findByLastnameIgnoreCase(String lastname);
}
```

`findBy` starts the query and the rest names properties joined with `And`, `Or`, keywords like `IgnoreCase` and `OrderBy`. Names get unwieldy fast; for anything complex, write the query explicitly with `@Query`.
