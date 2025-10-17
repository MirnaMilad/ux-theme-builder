import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeMetadata, ThemeModel } from '../models/theme.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly platformId: object = inject(PLATFORM_ID);
  private readonly isBrowser: boolean = isPlatformBrowser(this.platformId);

  private readonly STORAGE_KEY: string = 'ux-theme-builder';
  private readonly THEMES_KEY: string = `${this.STORAGE_KEY}_themes`;

  private savedThemesSignal: ReturnType<typeof signal<ThemeMetadata[]>> = signal<ThemeMetadata[]>([]);
  readonly savedThemes$: ReturnType<ReturnType<typeof signal<ThemeMetadata[]>>['asReadonly']> =
    this.savedThemesSignal.asReadonly();

  constructor() {
    if (this.isBrowser) {
      this.loadSavedThemesList();
    }
  }

  saveTheme(theme: ThemeModel): boolean {
    if (!this.isBrowser) return false;

    try {
      const key: string = this.getThemeKey(theme.id);
      localStorage.setItem(key, JSON.stringify(theme));
      this.updateThemesList(theme);
      return true;
    } catch (error) {
      console.error('Failed to save theme:', error);
      return false;
    }
  }

  loadTheme(themeId: string): ThemeModel | null {
    if (!this.isBrowser) return null;

    try {
      const key: string = this.getThemeKey(themeId);
      const data: string | null = localStorage.getItem(key);

      if (!data) {
        return null;
      }

      const theme: ThemeModel = JSON.parse(data) as ThemeModel;

      theme.createdAt = new Date(theme.createdAt);
      theme.updatedAt = new Date(theme.updatedAt);

      return theme;
    } catch (error) {
      console.error('Failed to load theme:', error);
      return null;
    }
  }

  deleteTheme(themeId: string): boolean {
    if (!this.isBrowser) return false;

    try {
      const key: string = this.getThemeKey(themeId);
      localStorage.removeItem(key);
      this.removeFromThemesList(themeId);
      return true;
    } catch (error) {
      console.error('Failed to delete theme:', error);
      return false;
    }
  }

  getAllThemes(): ThemeMetadata[] {
    return this.savedThemesSignal();
  }

  isStorageAvailable(): boolean {
    if (!this.isBrowser) return false;

    try {
      const test: string = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  clearAll(): boolean {
    if (!this.isBrowser) return false;

    try {
      const themes: ThemeMetadata[] = this.getAllThemes();
      themes.forEach((theme: ThemeMetadata) => {
        localStorage.removeItem(this.getThemeKey(theme.id));
      });
      localStorage.removeItem(this.THEMES_KEY);
      this.savedThemesSignal.set([]);
      return true;
    } catch (error) {
      console.error('Failed to clear themes:', error);
      return false;
    }
  }

  exportAllThemes(): ThemeModel[] {
    const themes: ThemeMetadata[] = this.getAllThemes();
    return themes
      .map((metadata: ThemeMetadata) => this.loadTheme(metadata.id))
      .filter((theme: ThemeModel | null): theme is ThemeModel => theme !== null);
  }

  importThemes(themes: ThemeModel[]): { success: number; failed: number } {
    let success: number = 0;
    let failed: number = 0;

    themes.forEach((theme: ThemeModel) => {
      let themeToSave: ThemeModel = theme;
      if (this.loadTheme(theme.id)) {
        themeToSave = {
          ...theme,
          id: `${theme.id}_${Date.now()}`,
          name: `${theme.name} (Copy)`,
        };
      }

      if (this.saveTheme(themeToSave)) {
        success++;
      } else {
        failed++;
      }
    });

    return { success, failed };
  }

  private getThemeKey(themeId: string): string {
    return `${this.STORAGE_KEY}_theme_${themeId}`;
  }

  private updateThemesList(theme: ThemeModel): void {
    if (!this.isBrowser) return;

    const themes: ThemeMetadata[] = this.savedThemesSignal();
    const existing: number = themes.findIndex((t: ThemeMetadata) => t.id === theme.id);

    const metadata: ThemeMetadata = {
      id: theme.id,
      name: theme.name,
      createdAt: theme.createdAt,
      updatedAt: theme.updatedAt,
    };

    let updated: ThemeMetadata[];
    if (existing >= 0) {
      updated = [...themes];
      updated[existing] = metadata;
    } else {
      updated = [...themes, metadata];
    }

    this.savedThemesSignal.set(updated);
    localStorage.setItem(this.THEMES_KEY, JSON.stringify(updated));
  }

  private removeFromThemesList(themeId: string): void {
    if (!this.isBrowser) return;

    const themes: ThemeMetadata[] = this.savedThemesSignal();
    const updated: ThemeMetadata[] = themes.filter((t: ThemeMetadata) => t.id !== themeId);
    this.savedThemesSignal.set(updated);
    localStorage.setItem(this.THEMES_KEY, JSON.stringify(updated));
  }

  private loadSavedThemesList(): void {
    if (!this.isBrowser) return;

    try {
      const data: string | null = localStorage.getItem(this.THEMES_KEY);
      if (data) {
        const themes: ThemeMetadata[] = JSON.parse(data) as ThemeMetadata[];
        themes.forEach((theme: ThemeMetadata) => {
          theme.createdAt = new Date(theme.createdAt);
          theme.updatedAt = new Date(theme.updatedAt);
        });
        this.savedThemesSignal.set(themes);
      }
    } catch (error) {
      console.error('Failed to load themes list:', error);
      this.savedThemesSignal.set([]);
    }
  }
}
