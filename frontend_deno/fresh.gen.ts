// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/_404.tsx";
import * as $1 from "./routes/activate/[uid_token].tsx";
import * as $2 from "./routes/auth.tsx";
import * as $3 from "./routes/index.tsx";
import * as $4 from "./routes/login.tsx";
import * as $5 from "./routes/logout.ts";
import * as $6 from "./routes/profile.tsx";
import * as $7 from "./routes/register.tsx";
import * as $$0 from "./islands/LoginForm.tsx";
import * as $$1 from "./islands/ProfileForm.tsx";
import * as $$2 from "./islands/RegistrationForm.tsx";

const manifest = {
  routes: {
    "./routes/_404.tsx": $0,
    "./routes/activate/[uid_token].tsx": $1,
    "./routes/auth.tsx": $2,
    "./routes/index.tsx": $3,
    "./routes/login.tsx": $4,
    "./routes/logout.ts": $5,
    "./routes/profile.tsx": $6,
    "./routes/register.tsx": $7,
  },
  islands: {
    "./islands/LoginForm.tsx": $$0,
    "./islands/ProfileForm.tsx": $$1,
    "./islands/RegistrationForm.tsx": $$2,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
