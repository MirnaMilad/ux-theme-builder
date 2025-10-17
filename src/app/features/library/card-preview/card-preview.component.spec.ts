import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { CardPreviewComponent } from './card-preview.component';

describe('CardPreviewComponent', () => {
  let component: CardPreviewComponent;
  let fixture: ComponentFixture<CardPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPreviewComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(CardPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render cards title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('.card-preview__title');
    expect(title?.textContent).toBe('Cards');
  });

  it('should render multiple card variants', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.card');
    expect(cards.length).toBe(3);
  });

  it('should render simple card', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cardTitle = compiled.querySelector('.card__title');
    expect(cardTitle?.textContent).toContain('Simple Card');
  });

  it('should render interactive card with badge', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const interactiveCard = compiled.querySelector('.card--interactive');
    const badge = interactiveCard?.querySelector('.card__badge');
    expect(interactiveCard).toBeTruthy();
    expect(badge?.textContent).toBe('New');
  });

  it('should render card with footer', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const footer = compiled.querySelector('.card__footer');
    expect(footer).toBeTruthy();
  });

  it('should render card action button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const actionBtn = compiled.querySelector('.card__action');
    expect(actionBtn).toBeTruthy();
    expect(actionBtn?.textContent).toBe('Learn More');
  });

  it('should render elevated card', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const elevatedCard = compiled.querySelector('.card--elevated');
    expect(elevatedCard).toBeTruthy();
  });

  it('should have card grid layout', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const grid = compiled.querySelector('.card-preview__grid');
    expect(grid).toBeTruthy();
  });

  it('should render card headers', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headers = compiled.querySelectorAll('.card__header');
    expect(headers.length).toBe(3);
  });

  it('should render card bodies', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const bodies = compiled.querySelectorAll('.card__body');
    expect(bodies.length).toBe(3);
  });
});
