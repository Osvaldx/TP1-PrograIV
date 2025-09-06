import { Injectable } from '@angular/core';

export const MONTH_NAME = {
  '1': 'ene',
  '2': 'feb',
  '3': 'mar',
  '4': 'abr',
  '5': 'may',
  '6': 'jun',
  '7': 'jul',
  '8': 'agos',
  '9': 'sept',
  '10': 'oct',
  '11': 'nov',
  '12': 'dic',
}

@Injectable({
  providedIn: 'root'
})

export class DateTimeService {

  public getDate(d: string) {
    const date = new Date(d);

    const day = date.getUTCDay().toString();
    const month = (date.getUTCMonth() + 1).toString();
    const year = date.getFullYear().toString();
    
    const monthParse = MONTH_NAME[month as keyof typeof MONTH_NAME];
    const dateFormat = `${day} ${monthParse} ${year}`

    return dateFormat;
  }
}
