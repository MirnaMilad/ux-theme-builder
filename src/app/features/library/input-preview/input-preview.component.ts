import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-preview',
  imports: [FormsModule],
  templateUrl: './input-preview.component.html',
  styleUrl: './input-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPreviewComponent {
  textValue: string = '';
  emailValue: string = '';
  passwordValue: string = '';
  selectValue: string = '';
  textareaValue: string = '';
  searchValue: string = '';
  checkbox1: boolean = false;
  checkbox2: boolean = false;
  radioValue: string = '';
}
