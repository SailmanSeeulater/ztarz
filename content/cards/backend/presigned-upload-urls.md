---
title: "Uploading large files with presigned URLs"
module: backend
type: concept
source: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html"
tags: ["uploads", "storage", "security"]
stack: ["s3"]
---

## Prompt

Users upload videos of up to 2 GB. Why not POST them through your API, and how does a presigned upload work instead?

## Answer

Streaming gigabytes through your app ties up servers, memory and request timeouts for work that object storage does better.

1. The client asks your API for an upload slot. The API checks who they are and the declared size and type, then picks the object key itself, such as `uploads/<userId>/<uuid>`.
2. The API signs a `PUT` URL for that key, valid for a few minutes, and returns it.
3. The client uploads the file straight to S3 with that URL.
4. The client tells your API it's done (or an S3 event does), and the API records the file.

Things to know: the URL acts with the permissions of whoever signed it, and anyone holding it can upload until it expires. Uploading to an existing key replaces that object, which is why the server chooses the key, never the client's filename. If you signed a `Content-Type`, the upload must send the same one.
