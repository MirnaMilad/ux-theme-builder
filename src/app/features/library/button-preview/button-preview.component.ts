import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-button-preview',
  imports: [],
  templateUrl: './button-preview.component.html',
  styleUrl: './button-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonPreviewComponent {}
