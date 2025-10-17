import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { BuilderComponent } from './builder.component';
import { ThemeService } from '../../core/services/theme.service';
import { StorageService } from '../../core/services/storage.service';
import { ExportService } from '../../core/services/export.service';
import { signal } from '@angular/core';
import { DEFAULT_THEME } from '../../core/config/theme.config';
import { ExportFormat } from '../../core/models/theme.model';

describe('BuilderComponent', () => {
  let component: BuilderComponent;
  let fixture: ComponentFixture<BuilderComponent>;
  let themeService: jasmine.SpyObj<ThemeService>;
  let storageService: jasmine.SpyObj<StorageService>;
  let exportService: jasmine.SpyObj<ExportService>;

  beforeEach(async () => {
    const themeServiceSpy = jasmine.createSpyObj('ThemeService', [
      'updateToken',
      'updateThemeName',
      'resetTheme',
      'getCurrentTheme',
      'loadTheme',
    ]);
    const storageServiceSpy = jasmine.createSpyObj('StorageService', ['saveTheme', 'loadTheme', 'deleteTheme']);
    const exportServiceSpy = jasmine.createSpyObj('ExportService', ['exportTheme']);

    // Add signal properties
    themeServiceSpy.theme$ = signal(DEFAULT_THEME);
    themeServiceSpy.colors$ = signal(DEFAULT_THEME.colors);
    themeServiceSpy.typography$ = signal(DEFAULT_THEME.typography);
    themeServiceSpy.spacing$ = signal(DEFAULT_THEME.spacing);
    themeServiceSpy.radius$ = signal(DEFAULT_THEME.radius);
    storageServiceSpy.savedThemes$ = signal([]);

    themeServiceSpy.getCurrentTheme.and.returnValue(DEFAULT_THEME);
    storageServiceSpy.saveTheme.and.returnValue(true);
    storageServiceSpy.loadTheme.and.returnValue(DEFAULT_THEME);
    storageServiceSpy.deleteTheme.and.returnValue(true);

    await TestBed.configureTestingModule({
      imports: [BuilderComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: ThemeService, useValue: themeServiceSpy },
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: ExportService, useValue: exportServiceSpy },
      ],
    }).compileComponents();

    themeService = TestBed.inject(ThemeService) as jasmine.SpyObj<ThemeService>;
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
    exportService = TestBed.inject(ExportService) as jasmine.SpyObj<ExportService>;

    fixture = TestBed.createComponent(BuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update token when updateToken is called', () => {
    component.updateToken('colors', 'primary', '#ff0000');
    expect(themeService.updateToken).toHaveBeenCalledWith('colors', 'primary', '#ff0000');
  });

  it('should update theme name when updateThemeName is called', () => {
    component.updateThemeName('New Theme');
    expect(themeService.updateThemeName).toHaveBeenCalledWith('New Theme');
  });

  it('should reset theme when resetTheme is called and confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.resetTheme();
    expect(themeService.resetTheme).toHaveBeenCalled();
  });

  it('should not reset theme when resetTheme is called and cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.resetTheme();
    expect(themeService.resetTheme).not.toHaveBeenCalled();
  });

  it('should save theme when saveTheme is called', () => {
    spyOn(window, 'alert');
    component.saveTheme();
    expect(themeService.getCurrentTheme).toHaveBeenCalled();
    expect(storageService.saveTheme).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(jasmine.stringContaining('saved successfully'));
  });

  it('should load theme when loadSavedTheme is called', () => {
    component.loadSavedTheme('theme-1');
    expect(storageService.loadTheme).toHaveBeenCalledWith('theme-1');
    expect(themeService.loadTheme).toHaveBeenCalledWith(DEFAULT_THEME);
  });

  it('should delete theme when deleteSavedTheme is called and confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'alert');
    component.deleteSavedTheme('theme-1');
    expect(storageService.deleteTheme).toHaveBeenCalledWith('theme-1');
    expect(window.alert).toHaveBeenCalledWith(jasmine.stringContaining('deleted successfully'));
  });

  it('should not delete theme when deleteSavedTheme is called and cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.deleteSavedTheme('theme-1');
    expect(storageService.deleteTheme).not.toHaveBeenCalled();
  });

  it('should export theme when exportTheme is called', () => {
    component.exportTheme(ExportFormat.JSON);
    expect(themeService.getCurrentTheme).toHaveBeenCalled();
    expect(exportService.exportTheme).toHaveBeenCalledWith(DEFAULT_THEME, ExportFormat.JSON);
  });

  it('should have form field configurations', () => {
    expect(component.colorFields).toBeDefined();
    expect(component.typographyFields).toBeDefined();
    expect(component.spacingFields).toBeDefined();
    expect(component.radiusFields).toBeDefined();
  });
});
