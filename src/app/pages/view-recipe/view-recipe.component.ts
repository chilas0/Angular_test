import { Component, OnInit, ViewChild, ElementRef,Renderer2   } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeModel } from 'src/app/Models/recipe.model';
import { ServiceService } from 'src/app/shared/service.service';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import {MatToolbarModule} from '@angular/material/toolbar';


@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css'],
  standalone: true,
  imports:[
    MatCardModule,
    CommonModule,
    MatCheckboxModule,
    FormsModule,
    MatToolbarModule
  ]
})

export class ViewRecipeComponent implements OnInit {

  public recipe: any ;
  public ingredients: any = [];
  @ViewChild('element') myElement!: ElementRef;

  constructor(private route: ActivatedRoute, private service:ServiceService, private renderer: Renderer2 ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id']; 
      this.getRecipe(id);
    });
  }

  selected(event:any){
    this.renderer.selectRootElement(this.myElement.nativeElement.style.textDecoration = 'line-through');
  }
  
  //Get a recipe for id
  getRecipe(id: number){
    this.service.getRecipe(id).subscribe(
      (resp) => {
        this.recipe = resp;
      }
    )
  }
  
}
