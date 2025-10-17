import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { PreviewComponent } from './preview.component';
import { ButtonPreviewComponent } from '../library/button-preview/button-preview.component';
import { CardPreviewComponent } from '../library/card-preview/card-preview.component';
import { InputPreviewComponent } from '../library/input-preview/input-preview.component';
import { TypographyPreviewComponent } from '../library/typography-preview/typography-preview.component';

describe('PreviewComponent', () => {
  let component: PreviewComponent;
  let fixture: ComponentFixture<PreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render preview header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.preview__title')?.textContent).toContain('Component Preview');
  });

  it('should render preview subtitle', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.preview__subtitle')?.textContent).toContain('See your theme in action');
  });

  it('should render all preview sections', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const sections = compiled.querySelectorAll('.preview__section');
    expect(sections.length).toBeGreaterThan(0);
  });

  it('should render typography preview component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-typography-preview')).toBeTruthy();
  });

  it('should render button preview component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-button-preview')).toBeTruthy();
  });

  it('should render card preview component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-card-preview')).toBeTruthy();
  });

  it('should render input preview component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-input-preview')).toBeTruthy();
  });

  it('should render color palette section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.color-palette')).toBeTruthy();
  });

  it('should render spacing scale section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.spacing-demo')).toBeTruthy();
  });

  it('should render border radius section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.radius-demo')).toBeTruthy();
  });

  it('should render color swatches', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const swatches = compiled.querySelectorAll('.color-swatch');
    expect(swatches.length).toBe(6); // Primary, Secondary, Success, Warning, Danger, Surface
  });

  it('should render spacing items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const spacingItems = compiled.querySelectorAll('.spacing-item');
    expect(spacingItems.length).toBe(6); // XS, SM, MD, LG, XL, 2XL
  });

  it('should render radius boxes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const radiusBoxes = compiled.querySelectorAll('.radius-box');
    expect(radiusBoxes.length).toBe(5); // SM, MD, LG, XL, Full
  });
});
