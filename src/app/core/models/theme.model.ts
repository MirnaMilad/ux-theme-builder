export interface ThemeModel {
  id: string;
  name: string;
  colors: Record<string, string>;
  typography: Record<string, string>;
  spacing: Record<string, string>;
  radius: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

export type ThemeCategory = keyof Omit<ThemeModel, 'id' | 'name' | 'createdAt' | 'updatedAt'>;

export enum ExportFormat {
  JSON = 'json',
  CSS = 'css',
  SCSS = 'scss',
}

export interface ThemeMetadata {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
