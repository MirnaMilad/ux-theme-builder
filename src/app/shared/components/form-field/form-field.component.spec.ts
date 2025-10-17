import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { FormFieldComponent } from './form-field.component';
import { FormFieldConfig, FormFieldType } from '../../../core/models/form-config.model';

describe('FormFieldComponent', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;

  const mockColorConfig: FormFieldConfig = {
    key: 'primary',
    label: 'Primary Color',
    type: FormFieldType.COLOR,
    description: 'Main brand color',
  };

  const mockTextConfig: FormFieldConfig = {
    key: 'fontFamily',
    label: 'Font Family',
    type: FormFieldType.TEXT,
    placeholder: 'Enter font family',
  };

  const mockNumberConfig: FormFieldConfig = {
    key: 'fontSize',
    label: 'Font Size',
    type: FormFieldType.NUMBER,
    min: 10,
    max: 100,
    step: 1,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('config', mockColorConfig);
    fixture.componentRef.setInput('value', '#ff0000');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render color input for color type', () => {
    fixture.componentRef.setInput('config', mockColorConfig);
    fixture.componentRef.setInput('value', '#ff0000');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const colorInput = compiled.querySelector('input[type="color"]');
    expect(colorInput).toBeTruthy();
  });

  it('should render text input for text type', () => {
    fixture.componentRef.setInput('config', mockTextConfig);
    fixture.componentRef.setInput('value', 'Arial');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const textInput = compiled.querySelector('input[type="text"]');
    expect(textInput).toBeTruthy();
  });

  it('should render number input for number type', () => {
    fixture.componentRef.setInput('config', mockNumberConfig);
    fixture.componentRef.setInput('value', '16');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const numberInput = compiled.querySelector('input[type="number"]');
    expect(numberInput).toBeTruthy();
  });

  it('should display label', () => {
    fixture.componentRef.setInput('config', mockColorConfig);
    fixture.componentRef.setInput('value', '#ff0000');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const label = compiled.querySelector('.form-field__label');
    expect(label?.textContent).toContain('Primary Color');
  });

  it('should display description when provided', () => {
    fixture.componentRef.setInput('config', mockColorConfig);
    fixture.componentRef.setInput('value', '#ff0000');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const description = compiled.querySelector('.form-field__description');
    expect(description?.textContent).toContain('Main brand color');
  });

  it('should emit valueChange when input changes', () => {
    fixture.componentRef.setInput('config', mockTextConfig);
    fixture.componentRef.setInput('value', 'Arial');
    fixture.detectChanges();

    spyOn(component.valueChange, 'emit');

    component.onValueChange('Helvetica');

    expect(component.valueChange.emit).toHaveBeenCalledWith('Helvetica');
  });

  it('should have correct input value', () => {
    fixture.componentRef.setInput('config', mockTextConfig);
    fixture.componentRef.setInput('value', 'Arial');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const input = compiled.querySelector('input[type="text"]') as HTMLInputElement;
    expect(input.value).toBe('Arial');
  });

  it('should set min, max, and step for number inputs', () => {
    fixture.componentRef.setInput('config', mockNumberConfig);
    fixture.componentRef.setInput('value', '16');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const numberInput = compiled.querySelector('input[type="number"]') as HTMLInputElement;
    expect(numberInput.min).toBe('10');
    expect(numberInput.max).toBe('100');
    expect(numberInput.step).toBe('1');
  });
});
