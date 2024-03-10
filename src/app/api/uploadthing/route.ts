import { createRouteHandler } from "uploadthing/next";
export const runtime = "nodejs";

import { ourFileRouter } from "./core";

export const { GET, POST } = createRouteHandler({ router: ourFileRouter });
