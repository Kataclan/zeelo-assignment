// Mock the msw worker to use it in runtime.
import { setupWorker } from "msw";

import { itemHandlers } from "./api-handlers";

export const mswWorker = setupWorker(...itemHandlers);
