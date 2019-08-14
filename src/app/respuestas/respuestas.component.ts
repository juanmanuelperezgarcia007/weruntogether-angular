import { Component, OnInit } from '@angular/core';

import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ForoService } from '../foro.service'
import { FormGroup, FormControl } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-respuestas',
  templateUrl: './respuestas.component.html',
  styleUrls: ['./respuestas.component.css']
})
export class RespuestasComponent implements OnInit {
  // VARIABLES
  noMostrarToken = false
  allComentForo: any
  pregunta: any
  allDato: any
  allDato1: any
  allDato2: any
  allDato3: any
  AllPreguntaOpcion: any
  AllPreguntaOpcion1: any
  respuestasForm: FormGroup;
  tokenUsuario: any
  chart: any
  AllPreguntasId: number
  mostrar = true
  noMostrar = false
  AllPregunta: any
  AllPreguntaOpcion2: any
  AllPreguntaOpcion3: any
  allDatos: any

  // GRAFICA

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = []
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(0, 230, 255, 0.3)', 'rgba(0,255,0,255)', 'rgba(0,0,255,0.3)', 'rgb(241, 118, 16)'],
    },
  ];


  constructor(private ForoService: ForoService, private activatedRoute: ActivatedRoute) {
    this.pieChartLegend = false
    this.activatedRoute.params.subscribe(params =>
      this.AllPreguntasId = params.id)


  }

  ngOnInit() {
    this.tokenUsuario = localStorage.getItem('token')
    this.mostrarPostId(this.AllPreguntasId)
    this.respuestasForm = new FormGroup({
      opciones: new FormControl('')

    })


  }
  // grafica
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {

  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {

  }


  mostrarPostId(pAllPreguntasId) {

    this.ForoService.getPregunta(this.AllPreguntasId)
      .then((res) => {


        this.AllPregunta = res
        this.pregunta = this.AllPregunta[0].pregunta

        this.AllPreguntaOpcion = this.AllPregunta[0].opcion1
        this.AllPreguntaOpcion1 = this.AllPregunta[0].opcion2
        this.AllPreguntaOpcion2 = this.AllPregunta[0].opcion3

        this.AllPreguntaOpcion3 = this.AllPregunta[0].opcion4

        this.pieChartLabels.push(this.AllPreguntaOpcion)
        this.pieChartLabels.push(this.AllPreguntaOpcion1)
        this.pieChartLabels.push(this.AllPreguntaOpcion2)

        if (this.AllPreguntaOpcion3 != null)
          this.pieChartLabels.push(this.AllPreguntaOpcion3)





      })

  }

  guardarRespuestas(e) {
    this.ForoService.saveRespuesta(
      this.respuestasForm.value.opciones,
      this.AllPreguntasId).then((res) => {
        alert('Tu votacion se a realizado correctamente')

        this.cargarDatos()
        this.toggleMostrar()
        this.toggleMostrarToken(this.tokenUsuario)
        this.paintForo()

      })

  }

  cargarDatos() {
    this.ForoService.loadData(

      this.AllPreguntasId).then((res) => {

        this.allDatos = res

        this.allDato = this.allDatos[0].contador

        this.allDato = this.allDatos[0].contador
        this.allDato1 = this.allDatos[1].contador
        this.allDato2 = this.allDatos[2].contador
        this.allDato3 = this.allDatos[3].contador

        this.pieChartData.push(this.allDato)
        this.pieChartData.push(this.allDato1)
        this.pieChartData.push(this.allDato2)
        this.pieChartData.push(this.allDato3)

      })
  }

  toggleMostrar() {
    this.mostrar = !this.mostrar
    this.noMostrar = !this.noMostrar

  }
  toggleMostrarToken(ptokenUsuario) {
    if (this.tokenUsuario == null) {

    } else {
      this.noMostrarToken = !this.noMostrarToken
    }
  }

  saveComentario(value) {

    this.tokenUsuario = localStorage.getItem('token')
    this.AllPreguntasId
    this.ForoService.guardarComentario(this.tokenUsuario, value, this.AllPreguntasId).then((res) => {
      this.paintForo()
      alert('Comentario publicado')
    })

  }

  paintForo() {
    this.ForoService.pintarComentariosForo(this.AllPreguntasId).then((res) => {
      this.allComentForo = res

    })
  }
}
