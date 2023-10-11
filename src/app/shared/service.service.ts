import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeModel } from '../Models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  //Create a recipe in json-server 
  addRecipe(data: FormData):Observable<any>{
    const datas:RecipeModel = {
      id: 0,
      title:  data.get('title') as string,
      description: data.get('description') as string,
      image: data.get('image') as Blob,
      ingredients: data.get('ingredients') as string,
    };
    
    return this.http.post<RecipeModel>("http://localhost:3000/recipe", datas);
  }

  //It get all recipes
  get(){
    return this.http.get<RecipeModel>("http://localhost:3000/recipe");
  }

  //It get a recipe 
  getRecipe(id:number){
    return this.http.get<RecipeModel>(`http://localhost:3000/recipe/${id}`);
  }
}
