---
title: "Profile-specific properties"
module: springboot
type: mcq
source: "https://docs.spring.io/spring-boot/reference/features/external-config.html"
tags: ["spring-boot", "configuration", "profiles"]
stack: ["springboot"]
choices:
  - text: "`localhost`: `application.properties` always wins because it's the main file"
    why: "Profile-specific files are loaded after the default file and override it."
  - text: "Startup fails because the property is defined twice"
    why: "Defining a property in several sources is normal; Boot has a precedence order."
  - text: "`db.prod.internal`: `application-prod.properties` is loaded because the `prod` profile is active, and profile-specific values override the defaults"
    correct: true
    why: "Keep shared defaults in `application.properties` and only the differences in `application-{profile}.properties`."
  - text: "`localhost`, unless the prod file is also listed in `spring.config.import`"
    why: "Profile-specific files next to `application.properties` are picked up automatically."
---

## Prompt

The app runs with `spring.profiles.active=prod`. What is `spring.datasource.url`'s host?

```properties
# application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/shop

# application-prod.properties
spring.datasource.url=jdbc:postgresql://db.prod.internal:5432/shop
```
