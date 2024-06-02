/// <reference types="vite/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASEURL: string;
  readonly VITE_MAP_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
