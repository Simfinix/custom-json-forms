// btoa existe en DOM; este shim evita que TS se queje al generar .d.ts
declare const btoa: (data: string) => string;

// Evita error por Buffer sin traer @types/node
declare const Buffer: {
  from(input: any, encoding?: string): { toString(encoding?: string): string };
};
