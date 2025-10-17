import { ChangeDetectionStrategy, Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { FormFieldConfig } from '../../../core/models/form-config.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  imports: [FormsModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent {
  config: InputSignal<FormFieldConfig> = input.required<FormFieldConfig>();
  value: InputSignal<string> = input.required<string>();
  valueChange: OutputEmitterRef<string> = output<string>();

  onValueChange(value: string): void {
    this.valueChange.emit(value);
  }
}
