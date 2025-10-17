import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonPreviewComponent } from '../library/button-preview/button-preview.component';
import { CardPreviewComponent } from '../library/card-preview/card-preview.component';
import { InputPreviewComponent } from '../library/input-preview/input-preview.component';
import { TypographyPreviewComponent } from '../library/typography-preview/typography-preview.component';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-preview',
  imports: [ButtonPreviewComponent, CardPreviewComponent, InputPreviewComponent, TypographyPreviewComponent],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewComponent {
  private readonly themeService: ThemeService = inject(ThemeService);
}
