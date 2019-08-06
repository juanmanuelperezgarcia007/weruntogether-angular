import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart } from 'chart.js';
import { ForoService } from '../foro.service'
import { ReactiveFormsModule, FormGroup, Form, FormControl, Validators } from '@angular/forms'
@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.css']
})
export class ForoComponent implements OnInit {
  respuestasForm: FormGroup;

  chart: any

  AllPreguntas: any

  constructor(private ForoService: ForoService, private http: HttpClient) {

  }

  ngOnInit() {
    this.mostrarPost()
    this.respuestasForm = new FormGroup({


    })

  }
  mostrarPost() {
    this.ForoService.getAllQuestions()
      .then((res) => {
        this.AllPreguntas = res

      })

  }



}
