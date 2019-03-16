import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, Form, FormControl, Validators } from '@angular/forms'
import { PostService } from '../post.service'

declare var google;


@Component({
  selector: 'app-weruntogether',
  templateUrl: './weruntogether.component.html',
  styleUrls: ['./weruntogether.component.css']
})
export class WeruntogetherComponent implements OnInit {
  // FORMULARIOS
  formBuscador: FormGroup;
  formPost: FormGroup;

  // MAPAS DE GOOGLES

  @ViewChild('googleMap') gMap: any
  map: any
  markers: any[] = []
  directionsService: any
  directionsDisplay: any
  latitude: any
  longitud: any
  coords: any
  AllPost: any
  image:any
  UsuarioPost: any
  fk_usuarios: any
  posicionLatitude:number
  posicionLongitude:number

  constructor(private postService: PostService, private router:Router) {
    


  }

  ngOnInit() {
    

    this.image =`https://maps.googleapis.com/maps/api/staticmap?center=${this.latitude},${this.longitud}&zoom=16&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C${this.latitude},${this.longitud}&key=AIzaSyCsfD7R9a5zeVCisKnbWYbfKBh5lYpZC28`
    
   


  

    // FORMULARIO BUSCADOR

    this.formBuscador = new FormGroup({

      buscadorDia: new FormControl(''),
      buscadorDistancia: new FormControl(''),

    })

    // FORMULARIO POST
    this.formPost = new FormGroup({

      formularioDia: new FormControl(''),
      formularioHora: new FormControl(''),
      formularioDistancia: new FormControl(''),
      formularioMensaje: new FormControl(''),

    })


    // googleMAPAS
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.coords = position.coords
        this.posicionLatitude=position.coords.latitude
        this.posicionLongitude=position.coords.longitude
        // PINTAR POST
      this.mostrarPost()
      }, this.showError)

     
    } else {
      console.log('La liamos')
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition.bind(this), this.showError)
    } else {
      console.log('No funciono')
    }
    
  }


  // GOOGLE MAPAS
  showPosition(position) {
    
    this.loadMap(position)
  }

  loadMap(position) {
    this.directionsService = new google.maps.DirectionsService()
    this.directionsDisplay = new google.maps.DirectionsRenderer()

    let propsMap = {
      center: new google.maps.LatLng(position.coords.latitude,
        position.coords.longitude),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.HYBRID //TERRAIN, SATELLITE, ROAD MAP
    }
    this.map = new google.maps.Map(this.gMap.nativeElement, propsMap)

    this.directionsDisplay.setMap(this.map)

    let marker = new google.maps.Marker({
      position: propsMap.center,
      map: this.map,
      title: 'soy YO'
    })
    this.markers.push(marker)
    // marker.setMap(this.map)

    google.maps.event.addListener(this.map, 'click', (event) => {
      let latM = event.latLng.lat()
      let lngM = event.latLng.lng()
      let m = new google.maps.Marker({
        position: new google.maps.LatLng(latM, lngM),
        map: this.map,
        title: 'Nuevo producto',
        animation: google.maps.Animation.DROP
      })
      this.markers.push(m)
    })
    let options={
      componentRestrictions:{country:"es"}
    }
    let input = document.getElementById('inputPlace')
    let autocomplete = new google.maps.places.Autocomplete(input,options)

    autocomplete.setFields(['address_components', 'geometry', 'icon', 'name'])

    let self = this

    autocomplete.addListener('place_changed', () => {
      let place = autocomplete.getPlace()
      let latp = place.geometry.location.lat()
      let lngP = place.geometry.location.lng()
      
      self.map.setCenter(place.geometry.location)
      let m = new google.maps.Marker({
        position: place.geometry.location,
        map: self.map,

      })
      this.latitude = latp
      this.longitud = lngP

    })

  }

  showError(error) {
    console.log(error.code)
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log('el usuario no quiere ser localizado')
        break
      case error.POSITION_UNAVAILABLE:
        console.log('No se ha podido recuperar la posicion')
        break
      case error.TIMEOUT:
        console.log('Se a tardado demasiado en recuperar la localizacion')
      case error.UNKNOWN_ERROR:
        console.log('Error desconocido')
    }
  }

  deleteMarkers() {
    this.markers.forEach(item => {
      item.setMap(null)
    })



  }
  //  NUEVO POST
  guardarNewPost() {
    
    console.log('entra en werun')
    this.postService.agregarPost(

      this.formPost.value.formularioDia,
      this.formPost.value.formularioHora,
      this.formPost.value.formularioDistancia,
      this.formPost.value.formularioMensaje,
      this.latitude,
      this.longitud


    ).then((res) => {
      this.mostrarPost()

      console.log(res)
    })
  }



  // MOSTRAR POSTS

  mostrarPost() {
    
    this.postService.getAllPost(
      this.posicionLatitude,
      this.posicionLongitude
    
    )
      .then((res) => {
      
        console.log(res)
        this.AllPost = res
      })

  }

   // BUSCAR POST DISTANCIA

  filtrarDistancia(){
    this.postService.filtersDistance(
      this.formBuscador.value.buscadorDistancia,
    ).then((res)=>{
      this.AllPost=res
      console.log(this.AllPost)
    })
  }

  filtrarDia(){
   console.log( this.formBuscador.value)
    this.postService.filtersDate(
      this.formBuscador.value.buscadorDia,
    ).then((res)=>{
      this.AllPost=res
      console.log(this.AllPost)
    })
  }

  deletePost(pid){
    console.log(pid)
    this.postService.borrarPost(pid).then((res)=>{
      console.log(res)
      
      this.mostrarPost()
      alert('Evento borrado')
    })
  }


}

