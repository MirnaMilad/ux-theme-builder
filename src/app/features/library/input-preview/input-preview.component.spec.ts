import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { InputPreviewComponent } from './input-preview.component';
import { FormsModule } from '@angular/forms';

describe('InputPreviewComponent', () => {
  let component: InputPreviewComponent;
  let fixture: ComponentFixture<InputPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputPreviewComponent, FormsModule],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(InputPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form inputs title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('.input-preview__title');
    expect(title?.textContent).toBe('Form Inputs');
  });

  it('should render text input', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const textInput = compiled.querySelector('input[type="text"]');
    expect(textInput).toBeTruthy();
  });

  it('should render email input', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const emailInput = compiled.querySelector('input[type="email"]');
    expect(emailInput).toBeTruthy();
  });

  it('should render password input', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const passwordInput = compiled.querySelector('input[type="password"]');
    expect(passwordInput).toBeTruthy();
  });

  it('should render select input', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const selectInput = compiled.querySelector('select');
    expect(selectInput).toBeTruthy();
  });

  it('should render textarea', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const textarea = compiled.querySelector('textarea');
    expect(textarea).toBeTruthy();
  });

  it('should render search input', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const searchInput = compiled.querySelector('input[type="search"]');
    expect(searchInput).toBeTruthy();
  });

  it('should render checkboxes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const checkboxes = compiled.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes.length).toBe(2);
  });

  it('should render radio buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const radios = compiled.querySelectorAll('input[type="radio"]');
    expect(radios.length).toBe(3);
  });

  it('should have form group layout', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const formGroups = compiled.querySelectorAll('.form-group');
    expect(formGroups.length).toBeGreaterThanOrEqual(6);
  });

  it('should render input labels', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const labels = compiled.querySelectorAll('.form-group__label');
    expect(labels.length).toBeGreaterThan(0);
  });
});
