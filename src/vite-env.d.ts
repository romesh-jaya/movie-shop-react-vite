/// <reference types="vite/client" />

declare namespace React {
  interface HTMLAttributes {
    // Preact supports using "class" instead of "classname" - need to teach typescript
    class?: string;
  }
}
