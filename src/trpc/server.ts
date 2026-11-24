import "server-only";
import { headers } from "next/headers";
import { cache } from "react";
import { appRouter } from "@/server/root";
import { createCallerFactory, createContext } from "@/server/trpc";

const createCaller = createCallerFactory(appRouter);

/** tRPC for Server Components: same procedures and auth checks, no HTTP round trip. */
export const getCaller = cache(async () => createCaller(await createContext({ headers: await headers() })));
