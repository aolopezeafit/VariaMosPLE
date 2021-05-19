import { ProductLine } from "./ProductLine";


export class Project {
  name: string = "My Project";
  enable: boolean = false;
  productLines: ProductLine[] = [];

  constructor(name: string) {
    this.name = name;
  }
}
