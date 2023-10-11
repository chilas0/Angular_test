import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../shared/service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css'],
  standalone: true,
  imports:[
    CommonModule,
    MatCardModule
  ]
})
export class RecipeCardComponent implements OnInit{

  public recipes: any = [];

  constructor(private service:ServiceService, private router: Router){}

  
  ngOnInit(): void{
    this.getListRecipe();
  }

  //Get all recipe that saved in json-server
  getListRecipe(){
    this.service.get().subscribe(
      resp => {
        this.recipes = resp;
      }
    )
  }

  //Redirect to view-detail
  viewRecipe(data:any){
    this.router.navigate(['/view-recipe', data]);
  }
}
