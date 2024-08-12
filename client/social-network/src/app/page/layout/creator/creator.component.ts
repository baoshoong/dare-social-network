import {Component, ElementRef, ViewChild} from '@angular/core';
import {MaterialModule} from "../../../shared/material.module";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-creator',
  standalone: true,
  imports: [MaterialModule, FormsModule, NgIf],
  templateUrl: './creator.component.html',
  styleUrl: './creator.component.scss'
})
export class CreatorComponent {
  valueInput = '';
  valueDescription = '';

  imageSrc: string | ArrayBuffer | null | undefined = null;
  @ViewChild('fileInput') fileInput!: ElementRef;

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = e.target?.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  clearInputData(){
    this.valueInput = '';
    this.valueDescription = '';
    this.imageSrc = null;
  }
}
