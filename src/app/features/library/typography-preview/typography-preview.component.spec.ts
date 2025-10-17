import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TypographyPreviewComponent } from './typography-preview.component';

describe('TypographyPreviewComponent', () => {
  let component: TypographyPreviewComponent;
  let fixture: ComponentFixture<TypographyPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypographyPreviewComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TypographyPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render typography title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('.typography-preview__title');
    expect(title?.textContent).toBe('Typography');
  });

  it('should render all heading levels', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const h1 = compiled.querySelector('.heading--1');
    const h6 = compiled.querySelector('.heading--6');
    expect(h1).toBeTruthy();
    expect(h6).toBeTruthy();
  });

  it('should render section titles', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const sectionTitles = compiled.querySelectorAll('.section-title');
    expect(sectionTitles.length).toBeGreaterThanOrEqual(4);
  });

  it('should render body text sizes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const textLg = compiled.querySelector('.text--lg');
    const textXs = compiled.querySelector('.text--xs');
    expect(textLg).toBeTruthy();
    expect(textXs).toBeTruthy();
  });

  it('should render font weights', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const normalText = compiled.querySelector('.text--normal');
    const boldText = compiled.querySelector('.text--bold');
    expect(normalText).toBeTruthy();
    expect(boldText).toBeTruthy();
  });

  it('should render code element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const code = compiled.querySelector('.code');
    expect(code).toBeTruthy();
    expect(code?.textContent).toContain('ThemeService');
  });

  it('should render code block', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const codeBlock = compiled.querySelector('.code-block');
    expect(codeBlock).toBeTruthy();
    expect(codeBlock?.textContent).toContain('function');
  });

  it('should have typography sections', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const sections = compiled.querySelectorAll('.typography-preview__section');
    expect(sections.length).toBe(4);
  });

  it('should render all 6 heading levels', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headings = compiled.querySelectorAll('.heading');
    expect(headings.length).toBe(6);
  });

  it('should display monospace content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const code = compiled.querySelector('.code');
    const codeBlock = compiled.querySelector('.code-block');
    expect(code).toBeTruthy();
    expect(codeBlock).toBeTruthy();
  });
});
