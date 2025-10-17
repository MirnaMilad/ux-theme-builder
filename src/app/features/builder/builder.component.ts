import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { ThemeService } from '../../core/services/theme.service';
import { StorageService } from '../../core/services/storage.service';
import { ExportService } from '../../core/services/export.service';
import { ExportFormat, ThemeCategory, ThemeMetadata, ThemeModel } from '../../core/models/theme.model';
import { THEME_FORM_CONFIG } from '../../core/config/form-config.config';
import { FormFieldConfig } from '../../core/models/form-config.model';

@Component({
  selector: 'app-builder',
  imports: [FormFieldComponent, DatePipe],
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderComponent {
  private readonly themeService: ThemeService = inject(ThemeService);
  private readonly storageService: StorageService = inject(StorageService);
  private readonly exportService: ExportService = inject(ExportService);

  readonly currentTheme: Signal<ThemeModel> = this.themeService.theme$;
  readonly currentColors: Signal<Record<string, string>> = this.themeService.colors$;
  readonly currentTypography: Signal<Record<string, string>> = this.themeService.typography$;
  readonly currentSpacing: Signal<Record<string, string>> = this.themeService.spacing$;
  readonly currentRadius: Signal<Record<string, string>> = this.themeService.radius$;
  readonly exportFormat: typeof ExportFormat = ExportFormat;

  readonly savedThemes: Signal<ThemeMetadata[]> = this.storageService.savedThemes$;

  readonly colorFields: FormFieldConfig[] = THEME_FORM_CONFIG['colors'];
  readonly typographyFields: FormFieldConfig[] = THEME_FORM_CONFIG['typography'];
  readonly spacingFields: FormFieldConfig[] = THEME_FORM_CONFIG['spacing'];
  readonly radiusFields: FormFieldConfig[] = THEME_FORM_CONFIG['radius'];

  updateToken(category: ThemeCategory, key: string, value: string): void {
    this.themeService.updateToken(category, key, value);
  }

  updateThemeName(name: string): void {
    this.themeService.updateThemeName(name);
  }

  resetTheme(): void {
    if (confirm('Are you sure you want to reset to default theme? This will discard all changes.')) {
      this.themeService.resetTheme();
    }
  }

  saveTheme(): void {
    const theme: ThemeModel = this.themeService.getCurrentTheme();

    if (theme.id === 'default') {
      theme.id = `theme_${Date.now()}`;
    }

    const success: boolean = this.storageService.saveTheme(theme);

    if (success) {
      alert(`Theme "${theme.name}" saved successfully!`);
    } else {
      alert('Failed to save theme. Please try again.');
    }
  }

  loadSavedTheme(themeId: string): void {
    const theme: ThemeModel | null = this.storageService.loadTheme(themeId);

    if (theme) {
      this.themeService.loadTheme(theme);
    } else {
      alert('Failed to load theme.');
    }
  }

  deleteSavedTheme(themeId: string): void {
    if (confirm('Are you sure you want to delete this theme?')) {
      const success: boolean = this.storageService.deleteTheme(themeId);

      if (success) {
        alert('Theme deleted successfully!');
      } else {
        alert('Failed to delete theme.');
      }
    }
  }

  exportTheme(format: ExportFormat): void {
    const theme: ThemeModel = this.themeService.getCurrentTheme();
    this.exportService.exportTheme(theme, format);
  }
}
