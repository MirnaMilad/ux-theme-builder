import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card-preview',
  imports: [],
  templateUrl: './card-preview.component.html',
  styleUrl: './card-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPreviewComponent {}
