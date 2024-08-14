import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-warning',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './warning.component.html',
  styleUrl: './warning.component.scss',
})
export class WarningComponent {}
