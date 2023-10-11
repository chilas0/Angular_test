export interface RecipeModel{
    id:number,
    title:string | null,
    description:string,
    image: Blob;
    ingredients:string
}