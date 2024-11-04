declare namespace NodeJS {
  type Global = {
    mongoose: {
      conn: unknown;
      promise: Promise<unknown> | null;
    };
  }
}

// Pour TypeScript, ajouter la déclaration globale
declare const global: NodeJS.Global;
