import { Injectable } from '@angular/core';
import { ExportFormat, ThemeModel } from '../models/theme.model';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  exportTheme(theme: ThemeModel, format: ExportFormat): void {
    let content: string;
    let filename: string;
    let mimeType: string;

    switch (format) {
      case ExportFormat.JSON:
        content = this.exportAsJSON(theme);
        filename = `${this.sanitizeFilename(theme.name)}.json`;
        mimeType = 'application/json';
        break;

      case ExportFormat.CSS:
        content = this.exportAsCSS(theme);
        filename = `${this.sanitizeFilename(theme.name)}.css`;
        mimeType = 'text/css';
        break;

      case ExportFormat.SCSS:
        content = this.exportAsSCSS(theme);
        filename = `${this.sanitizeFilename(theme.name)}.scss`;
        mimeType = 'text/scss';
        break;

      default:
        throw new Error(`Unsupported export format: ${format}`);
    }

    this.downloadFile(content, filename, mimeType);
  }

  private exportAsJSON(theme: ThemeModel): string {
    return JSON.stringify(theme, null, 2);
  }

  private exportAsCSS(theme: ThemeModel): string {
    const lines: string[] = [
      '/**',
      ` * ${theme.name}`,
      ` * Generated on ${new Date().toISOString()}`,
      ' * by UX Theme Builder',
      ' */',
      '',
      ':root {',
      '  /* Colors */',
    ];

    Object.entries(theme.colors).forEach(([key, value]: [string, string]) => {
      lines.push(`  --color-${this.toKebabCase(key)}: ${value};`);
    });

    lines.push('', '  /* Typography */');

    Object.entries(theme.typography).forEach(([key, value]: [string, string]) => {
      lines.push(`  --${this.toKebabCase(key)}: ${value};`);
    });

    lines.push('', '  /* Spacing */');

    Object.entries(theme.spacing).forEach(([key, value]: [string, string]) => {
      lines.push(`  --spacing-${key}: ${value};`);
    });

    lines.push('', '  /* Border Radius */');

    Object.entries(theme.radius).forEach(([key, value]: [string, string]) => {
      lines.push(`  --radius-${key}: ${value};`);
    });

    lines.push('}');

    return lines.join('\n');
  }

  private exportAsSCSS(theme: ThemeModel): string {
    const lines: string[] = [
      '//',
      `// ${theme.name}`,
      `// Generated on ${new Date().toISOString()}`,
      '// by UX Theme Builder',
      '//',
      '',
      '// Colors',
    ];

    Object.entries(theme.colors).forEach(([key, value]: [string, string]) => {
      lines.push(`$color-${this.toKebabCase(key)}: ${value};`);
    });

    lines.push('', '// Color map');
    lines.push('$colors: (');
    Object.entries(theme.colors).forEach(([key, value]: [string, string], index: number, arr: [string, string][]) => {
      const comma: string = index < arr.length - 1 ? ',' : '';
      lines.push(`  '${this.toKebabCase(key)}': ${value}${comma}`);
    });
    lines.push(');');

    lines.push('', '// Typography');

    Object.entries(theme.typography).forEach(([key, value]: [string, string]) => {
      lines.push(`$${this.toKebabCase(key)}: ${value};`);
    });

    lines.push('', '// Typography map');
    lines.push('$typography: (');
    Object.entries(theme.typography).forEach(
      ([key, value]: [string, string], index: number, arr: [string, string][]) => {
        const comma: string = index < arr.length - 1 ? ',' : '';
        lines.push(`  '${this.toKebabCase(key)}': ${value}${comma}`);
      }
    );
    lines.push(');');

    lines.push('', '// Spacing');

    Object.entries(theme.spacing).forEach(([key, value]: [string, string]) => {
      lines.push(`$spacing-${key}: ${value};`);
    });

    lines.push('', '// Spacing map');
    lines.push('$spacing: (');
    Object.entries(theme.spacing).forEach(([key, value]: [string, string], index: number, arr: [string, string][]) => {
      const comma: string = index < arr.length - 1 ? ',' : '';
      lines.push(`  '${key}': ${value}${comma}`);
    });
    lines.push(');');

    lines.push('', '// Border Radius');

    Object.entries(theme.radius).forEach(([key, value]: [string, string]) => {
      lines.push(`$radius-${key}: ${value};`);
    });

    lines.push('', '// Radius map');
    lines.push('$radius: (');
    Object.entries(theme.radius).forEach(([key, value]: [string, string], index: number, arr: [string, string][]) => {
      const comma: string = index < arr.length - 1 ? ',' : '';
      lines.push(`  '${key}': ${value}${comma}`);
    });
    lines.push(');');

    lines.push('', '// Complete theme map');
    lines.push('$theme: (');
    lines.push('  colors: $colors,');
    lines.push('  typography: $typography,');
    lines.push('  spacing: $spacing,');
    lines.push('  radius: $radius');
    lines.push(');');

    return lines.join('\n');
  }

  private downloadFile(content: string, filename: string, mimeType: string): void {
    const blob: Blob = new Blob([content], { type: mimeType });
    const url: string = URL.createObjectURL(blob);

    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  }

  private toKebabCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  private sanitizeFilename(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
