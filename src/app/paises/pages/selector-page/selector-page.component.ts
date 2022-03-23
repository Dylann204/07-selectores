import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaisSmall } from '../../interfaces/paises.interface';
import { PaisesService } from '../../services/paises.service';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [],
})
export class SelectorPageComponent implements OnInit {
  form: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
  });

  //Llenar Regiones
  regiones: string[] = [];
  paises: PaisSmall[] = [];
  frontera: PaisSmall[] = [];

  constructor(private fb: FormBuilder, private ps: PaisesService) {}

  ngOnInit(): void {
    this.regiones = this.ps.regiones;
    //Cuando cambie la region
    this.form
      .get('region')
      ?.valueChanges.pipe(
        tap((_) => {
          this.form.get('region')?.reset('');
        }),
        switchMap((region) => this.ps.getPaisesPorRegion(region))
      )
      .subscribe((paises) => {
        this.paises = paises;
      });

    //Cuando cambie el pais
    this.form.get('pais')?.valueChanges.subscribe((codigo) => {
      console.log(codigo);
    });
  }

  guardar() {
    console.log(this.form.value);
  }
}
