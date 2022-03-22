import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [],
})
export class SelectorPageComponent implements OnInit {
  form: FormGroup = this.fb.group({
    region: ['', Validators.required],
  });

  //Llenar Regiones
  regiones: string[] = [];

  constructor(private fb: FormBuilder, private ps: PaisesService) {}

  ngOnInit(): void {
    this.regiones = this.ps.regiones;
  }

  guardar() {
    console.log(this.form.value);
  }
}
