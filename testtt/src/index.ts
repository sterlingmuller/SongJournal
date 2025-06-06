// Reexport the native module. On web, it will be resolved to TestttModule.web.ts
// and on native platforms to TestttModule.ts
export { default } from './TestttModule';
export { default as TestttView } from './TestttView';
export * from  './Testtt.types';
