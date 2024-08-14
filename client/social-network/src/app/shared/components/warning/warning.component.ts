import { Component, Inject  } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-warning',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './warning.component.html',
  styleUrl: './warning.component.scss',
})
export class WarningComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
