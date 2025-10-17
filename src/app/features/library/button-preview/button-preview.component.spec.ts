import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ButtonPreviewComponent } from './button-preview.component';

describe('ButtonPreviewComponent', () => {
  let component: ButtonPreviewComponent;
  let fixture: ComponentFixture<ButtonPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonPreviewComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render buttons title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('.button-preview__title');
    expect(title?.textContent).toBe('Buttons');
  });

  it('should render all button variants', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('.btn');
    expect(buttons.length).toBeGreaterThanOrEqual(8);
  });

  it('should render primary button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const primaryBtn = compiled.querySelector('.btn--primary');
    expect(primaryBtn).toBeTruthy();
    expect(primaryBtn?.textContent).toContain('Primary');
  });

  it('should render secondary button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const secondaryBtn = compiled.querySelector('.btn--secondary');
    expect(secondaryBtn).toBeTruthy();
  });

  it('should render success button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const successBtn = compiled.querySelector('.btn--success');
    expect(successBtn).toBeTruthy();
  });

  it('should render disabled button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const disabledBtn = compiled.querySelector('button[disabled]');
    expect(disabledBtn).toBeTruthy();
  });

  it('should render sizes subtitle', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const subtitle = compiled.querySelector('.button-preview__subtitle');
    expect(subtitle?.textContent).toBe('Sizes');
  });

  it('should render different button sizes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const smallBtn = compiled.querySelector('.btn--sm');
    const largeBtn = compiled.querySelector('.btn--lg');
    expect(smallBtn).toBeTruthy();
    expect(largeBtn).toBeTruthy();
  });

  it('should have proper button grid layout', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const grid = compiled.querySelector('.button-preview__grid');
    expect(grid).toBeTruthy();
  });
});
