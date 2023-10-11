import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecipeCardComponent } from 'src/app/recipe-card/recipe-card.component';
import { RecipeFormComponent } from 'src/app/recipe-form/recipe-form.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  standalone: true,
  imports:[
    MatToolbarModule,
    RecipeCardComponent,
    RecipeFormComponent,
  ]
})
export class HomePageComponent {

  @ViewChild(RecipeCardComponent) private childCard!: RecipeCardComponent;

  constructor(public dialog:MatDialog){}

  //Open a Dialog modal 
  openRecipeForm(){
    const dialogRef = this.dialog.open(RecipeFormComponent);
    dialogRef.afterClosed().subscribe({
      next:(val) => {
        if(val){
          this.childCard.getListRecipe();
        }
      }
    });
  }
}
