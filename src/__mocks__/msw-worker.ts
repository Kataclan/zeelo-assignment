// Mock the msw worker to use it in runtime.
import { setupWorker } from "msw";

export const mswWorker = setupWorker();
