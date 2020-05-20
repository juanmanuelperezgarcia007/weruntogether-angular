import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'province'
})
export class ProvincePipe implements PipeTransform {
  data: string;
  transform(value: any, args?: any): any {

    switch (value) {
      case 'AB':
        this.data = 'Albacete';
        break;
      case 'A':
        this.data = 'Alava';
        break;
      case 'AL':
        this.data = 'Alicante';
        break;
      case 'AS':
        this.data = 'Asturias';
        break;
      case 'AV':
        this.data = 'Avila';
        break;
      case 'BA':
        this.data = 'Badajoz';
        break;
      case 'BU':
        this.data = 'Burgos';
        break;
      case 'CC':
        this.data = 'Caceres';
        break;
      case 'CA':
        this.data = 'Cadiz';
        break;
      case 'CT':
        this.data = 'Cantabria';
        break;
      case 'CS':
        this.data = 'Castellon';
        break;
      case 'Ce':
        this.data = 'Ceuta';
        break;
      case 'CR':
        this.data = 'Ciudad Real';
        break;
      case 'CO':
        this.data = 'Cordoba';
        break;
      case 'CU':
        this.data = 'Cuenca';
        break;
      case 'Pi':
        this.data = 'Formentera';
        break;
      case 'Fu':
        this.data = 'Fuerteventura';
        break;
      case 'Gc':
        this.data = 'Gran Canaria';
        break;
      case 'GI':
        this.data = 'Girona';
        break;
      case 'GR':
        this.data = 'Granada';
        break;
      case 'GU':
        this.data = 'Guadalajara';
        break;
      case 'GK':
        this.data = 'Guipuzcoa';
        break;
      case 'H':
        this.data = 'Huelva';
        break;
      case 'HU':
        this.data = 'Huesca';
        break;
      case 'J':
        this.data = 'Jaen';
        break;
      case 'C':
        this.data = 'La Coruña';
        break;
      case 'Ri':
        this.data = 'La rioja';
        break;
      case 'Lp':
        this.data = 'Las Palmas';
        break;
      case 'Lz':
        this.data = 'Lanzarote';
        break;
      case 'LE':
        this.data = 'Leon';
        break;
      case 'L':
        this.data = 'Lerida';
        break;
      case 'LU':
        this.data = 'Lugo';
        break;
      case 'M':
        this.data = 'Madrid';
        break;
      case 'Ma':
        this.data = 'Mallorca';
        break;
      case 'MG':
        this.data = 'Malaga';
        break;
      case 'Me':
        this.data = 'Menorca';
        break;
      case 'MU':
        this.data = 'Murcia';
        break;
      case 'NA':
        this.data = 'Navarra';
        break;
      case 'OU':
        this.data = 'Ourense';
        break;
      case 'P':
        this.data = 'Palencia';
        break;
      case 'PO':
        this.data = 'Pontevedra';
        break;
      case 'SA':
        this.data = 'Salamanca';
        break;
      case 'SG':
        this.data = 'Segovia';
        break;
      case 'SE':
        this.data = 'Sevilla';
        break;
      case 'SO':
        this.data = 'Soria';
        break;
      case 'TE':
        this.data = 'Teruel';
        break;
      case 'T':
        this.data = 'Tarragona';
        break;
      case 'Tf':
        this.data = 'Tenerife';
        break;
      case 'TO':
        this.data = 'Toledo';
        break;
      case 'V':
        this.data = 'Valencia';
        break;
      case 'VA':
        this.data = 'Valladolid';
        break;
      case 'VI':
        this.data = 'Vizcaya';
        break;
      case 'Z':
        this.data = 'Zamora';
        break;
      case 'ZA':
        this.data = 'Zaragoza';
        break;
    }
    return this.data;
  }

}
