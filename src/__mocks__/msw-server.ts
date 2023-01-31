// Mock the msw server to use it in tests.
import { setupServer } from "msw/node";

import { itemHandlers } from "./api-handlers";

export const mswServer = setupServer(...itemHandlers);
