import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private ALTER_EGOS = ['jake epping'];

  constructor() { }

  isAlterEgoTaken(alterEgo): Observable<boolean> {
    const isTaken = this.ALTER_EGOS.includes(alterEgo);
    return of(isTaken).pipe(delay(400));  // result is piped so as to send it over after 400 ms
  }
}
