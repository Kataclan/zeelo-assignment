// Mock the msw server to use it in tests.
import { setupServer } from "msw/node";

export const mswServer = setupServer();
