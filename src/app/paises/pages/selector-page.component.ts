import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from '../paises.service';
import { PaisSmall, Pais } from '../interfaces/pais';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.formBuilder.group({
    
    region: ['',Validators.required],
    pais: ['',Validators.required],
    frontera:['',Validators.required]
  }); 
  
//   llenar selectores  

regiones  : string[] = [];
paises    : PaisSmall[]=[];
fronteras : string [] =[] ;

  constructor(private formBuilder : FormBuilder,
              private paisesService:PaisesService) { }

  ngOnInit(): void {

    this.regiones = this.paisesService.regiones;

    //cuando cambia el continente

    this.miFormulario.get('region')?.valueChanges
    .pipe(
      tap(( _ ) => this.miFormulario.get('pais')?.reset('')),  // tap dispara un efecto secundario
      switchMap(region=>this.paisesService.getPaisesByRegion(region))  )
    .subscribe(paises => this.paises =paises
    )
    
    //cuando cambia el pais

    

    this.miFormulario.get('pais')?.valueChanges
    .pipe(
      switchMap(codigo => this.paisesService.getFronteraByCode(codigo))
    )
    .subscribe(pais =>{
    
    // console.log(pais)

    
      this.fronteras =pais?.borders || []
debugger
      console.log(this.fronteras)
      
    } 
    )


  }

  guardar(){
console.log(this.miFormulario.value);

  }

}
