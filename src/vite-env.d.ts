/// <reference types="vite/client" />

declare namespace React {
  interface HTMLAttributes {
    // Preact supports using "class" instead of "classname" - need to teach typescript
    class?: string;
  }
}

interface ImportMetaEnv {
  readonly VITE_AUTH0_DOMAIN: string;
  readonly VITE_AUTH0_CLIENT_ID: string;
  readonly VITE_AUTH0_AUDIENCE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
