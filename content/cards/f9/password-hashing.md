---
title: "Storing passwords"
module: f9
type: mcq
source: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html"
tags: ["security", "passwords", "hashing"]
stack: ["owasp"]
choices:
  - text: "SHA-256 with a unique salt per user"
    why: "The salt helps, but SHA-256 is built to be fast, so attackers can test guesses at enormous rates on GPUs."
  - text: "A slow, salted password hash: Argon2id, or scrypt, or bcrypt on legacy systems"
    correct: true
    why: "A unique salt defeats precomputed tables; a tunable work factor makes every guess expensive. bcrypt only reads the first 72 bytes, so cap password length."
  - text: "Encrypt with AES and keep the key in an env var"
    why: "Encryption is reversible: whoever gets the key gets every password. Passwords should be hashed, not encrypted."
  - text: "MD5 is fine if you add a site-wide pepper"
    why: "MD5 is fast and broken. A pepper is extra defence on top of a slow hash, not a replacement for one."
---

## Prompt

How should an app store user passwords?
