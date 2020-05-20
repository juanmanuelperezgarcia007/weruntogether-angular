
import { Component, OnInit } from '@angular/core';
import { RaceService } from '../carreras-service';
import { FormGroup, FormControl } from '@angular/forms';
import { ConstApp } from '../constantes/constApp';
import { Carrer } from '../models/carrer.model';
import { LocalstorageService } from '../localstorage.service';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.css']
})

export class CarrerasComponent implements OnInit {

  arraySinceDistance = ['5000', '10000', '15000', '21000'];
  arrayToDistance = ['10000', '15000', '21000', '42000'];
  typeCarrer = ['asfalto', 'tierra', 'obstaculos'];
  selectProvince = ConstApp.KEYPROVINCE;
  listFavorite: any;
  form: FormGroup;
  carrerasAll: any;

  msg = {
    tittle: ConstApp.TITTLECARRER,
    distmin: ConstApp.DISTMIN,
    distmax: ConstApp.DISMAX,
    carrer: ConstApp.TITTLECARRER,
    city: ConstApp.CYTY,
    province: ConstApp.PROVINCE,
    filter: ConstApp.FILTER,
    nameCarrer: ConstApp.NAME,
    distance: ConstApp.DISTANCE,
    typeCarrer: ConstApp.TYPECARRER,
    mindist: 'Selecciona tu distancia minima',
    maxdist: 'Selecciona tu distancia maxima',
    chooseTypeCarrer: 'Elije que tipo de carrera',
    chooseProvince: 'Seleciona tus provincia',
    inicialSesion: 'Inicia sesion',
    lookCarrer: 'para ver tus carreras favoritas.',
    noMatch: 'No hay resultados vuelve a realizar una busqueda'
  };
  noCarrer: boolean;

  constructor(
    private carrerasService: RaceService,
    private localstorageService: LocalstorageService,
    private commonService: CommonService) { }

  ngOnInit() {
    this.noCarrer = false;
    this.form = new FormGroup({
      min: new FormControl(''), max: new FormControl(''), type: new FormControl(''), date: new FormControl(''), city: new FormControl(''), province: new FormControl('')
    });
    this.listCarrerFavorite();
    this.showCarrers();
  }

  listCarrerFavorite() {
    const tokenUser = this.localstorageService.getLocalstorage('token');
    this.carrerasService.GetFavorite(tokenUser)
      .subscribe((carrerFavorites: Carrer[]) => {
        this.listFavorite = carrerFavorites;
        this.noCarrer = carrerFavorites.length === 0 ? true : false;
      });
  }

  isdeleteOrPost(id, e) {
    this.listCarrerFavorite();
    const isFavOrNotFav = this.isFavOrNotFav(id);
    if (isFavOrNotFav === true) {
      this.deleteCarrerFavorite(id, e);
    } else {
      this.postFavoritos(id, e);
    }
  }

  isFavOrNotFav(id) {
    let isFavOrNotFav;
    this.listFavorite.forEach(carrerFav => isFavOrNotFav = carrerFav.id_Carreras === id ? true : false);
    return isFavOrNotFav;
  }

  async deleteCarrerFavorite(pid, e) {
    const tokenUser = this.localstorageService.getLocalstorage('token');
    e.target.classList.replace('star--gold', 'star--black');
    await this.carrerasService.deleteFavorite(pid, tokenUser);
    this.listCarrerFavorite();
  }

  async postFavoritos(pid, e) {
    const tokenUser = this.localstorageService.getLocalstorage('token');
    e.target.classList.replace('star--black', 'star--gold');
    await this.carrerasService.postFavorite(pid, tokenUser);
    this.listCarrerFavorite();
  }

  showCarrers() {
    this.carrerasService.getAllCarreras()
      .then((carrers: Carrer[]) => this.carrerasAll = carrers);
  }

  getFiltersRace() {
    this.carrerasService.getFilters(this.form.value)
      .then((carrers: Carrer[]) => {
        this.carrerasAll = carrers;
        this.noCarrer = this.carrerasAll.length === 0 ? true : false;
      });
    this.form.reset();
  }

  onlyUsers() {
    return this.commonService.OnlyUsers();
  }

}
