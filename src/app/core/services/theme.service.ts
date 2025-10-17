import { Injectable, Signal, WritableSignal, computed, effect, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeCategory, ThemeModel } from '../models/theme.model';
import { DEFAULT_THEME } from '../config/theme.config';

/**
 * Central theme management service using Angular signals
 * Manages the current theme state and applies CSS variables dynamically
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platformId: object = inject(PLATFORM_ID);
  private readonly isBrowser: boolean = isPlatformBrowser(this.platformId);

  // Private writable signal
  private readonly themeSignal: WritableSignal<ThemeModel> = signal<ThemeModel>(this.deepClone(DEFAULT_THEME));

  // Public readonly computed signal
  readonly theme$: Signal<ThemeModel> = computed(() => this.themeSignal());

  // Individual category signals for optimized reactivity
  readonly colors$: Signal<Record<string, string>> = computed(() => this.themeSignal().colors);
  readonly typography$: Signal<Record<string, string>> = computed(() => this.themeSignal().typography);
  readonly spacing$: Signal<Record<string, string>> = computed(() => this.themeSignal().spacing);
  readonly radius$: Signal<Record<string, string>> = computed(() => this.themeSignal().radius);

  constructor() {
    // Automatically apply theme changes to CSS variables (browser only)
    effect(() => {
      if (this.isBrowser) {
        this.applyCSSVariables(this.theme$());
      }
    });
  }

  /**
   * Update a single token value
   */
  updateToken(category: ThemeCategory, key: string, value: string): void {
    this.themeSignal.update((theme: ThemeModel) => {
      const updated: ThemeModel = { ...theme };
      updated[category] = { ...updated[category], [key]: value };
      updated.updatedAt = new Date();
      return updated;
    });
  }

  /**
   * Update multiple tokens at once
   */
  updateTokens(category: ThemeCategory, tokens: Record<string, string>): void {
    this.themeSignal.update((theme: ThemeModel) => {
      const updated: ThemeModel = { ...theme };
      updated[category] = { ...updated[category], ...tokens };
      updated.updatedAt = new Date();
      return updated;
    });
  }

  /**
   * Load a complete theme
   */
  loadTheme(theme: ThemeModel): void {
    this.themeSignal.set({
      ...theme,
      updatedAt: new Date(),
    });
  }

  /**
   * Reset to default theme
   */
  resetTheme(): void {
    this.themeSignal.set(this.deepClone(DEFAULT_THEME));
  }

  /**
   * Update theme metadata (name)
   */
  updateThemeName(name: string): void {
    this.themeSignal.update((theme: ThemeModel) => ({
      ...theme,
      name,
      updatedAt: new Date(),
    }));
  }

  /**
   * Get current theme as a plain object (useful for export/save)
   */
  getCurrentTheme(): ThemeModel {
    return this.deepClone(this.theme$());
  }

  /**
   * Apply theme tokens as CSS custom properties to the document root
   */
  private applyCSSVariables(theme: ThemeModel): void {
    if (!this.isBrowser) return;

    const root: HTMLElement = document.documentElement;

    // Apply colors
    Object.entries(theme.colors).forEach(([key, value]: [string, string]) => {
      root.style.setProperty(`--color-${this.toKebabCase(key)}`, value);
    });

    // Apply typography
    Object.entries(theme.typography).forEach(([key, value]: [string, string]) => {
      root.style.setProperty(`--${this.toKebabCase(key)}`, value);
    });

    // Apply spacing
    Object.entries(theme.spacing).forEach(([key, value]: [string, string]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });

    // Apply radius
    Object.entries(theme.radius).forEach(([key, value]: [string, string]) => {
      root.style.setProperty(`--radius-${key}`, value);
    });
  }

  /**
   * Convert camelCase to kebab-case
   */
  private toKebabCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  /**
   * Deep clone an object
   */
  private deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }
}
