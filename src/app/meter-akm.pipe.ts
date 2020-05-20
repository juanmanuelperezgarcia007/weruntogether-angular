import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'meterAkm'
})


export class MeterAkmPipe implements PipeTransform {
  data: any;

  transform(value: any, args?: any): any {
    this.data = value;
    this.data = this.data / 1000;
    return this.data;
  }

}
