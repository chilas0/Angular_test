import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatChipInputEvent} from '@angular/material/chips';
import { DomSanitizer} from '@angular/platform-browser';
import { ServiceService } from '../shared/service.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';



@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
  standalone: true,
  imports:[
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class RecipeFormComponent {

  public preview: string = "";
  
  image: any ;
  public image1:any;

  form: FormGroup;
  
  keywords = [''];

  constructor(
    private fb:FormBuilder, 
    private sanitizer: DomSanitizer, 
    private service:ServiceService, 
    private dialogref:MatDialogRef<RecipeFormComponent>)
  {
    this.form = this.fb.group({
      title: '',
      description:'',
      image:null,
      ingredients: this.fb.array([
        this.fb.control(null)
      ]),
    });
  }

  get ingredients(): FormArray{
    return this.form.get('ingredients') as FormArray;
  }

  //Send data to json-server
  onFormSubmit(){
    if(this.form.valid){
      this.ingredients.removeAt(0);
      this.keywords.forEach(element => {
        this.ingredients.push(this.fb.control(element));
      });
      
      const formData = new FormData();
      formData.append('title', this.form.value['title']);
      formData.append('description', this.form.value['description']);
      formData.append('image',  this.preview);
      formData.append('ingredients', this.form.value['ingredients']);
      
      this.service.addRecipe(formData).subscribe({
        next : (val:any)=>{
          alert("Recipe added");
          this.dialogref.close(true);
        },
        error: (err:any)=>{
          alert(err);
        }
      })
    }
    
  }
  announcer = inject(LiveAnnouncer);

  //Remove keyword to mat-chip
  removeKeyword(keyword: string) {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword}`);
    }
  }

  //Add keyword in mat-chhip
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our keyword
    if (value) {
      this.keywords.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  //Get a image that was selected
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    this.image1 = event.target.files;
    this.extractBase64(file).then((image: any) => {
      this.preview = image.base;
    });
  }

  //Convert to base 64 the image
  extractBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      }
    } catch (e) {
      return null;
    }
  });
}
