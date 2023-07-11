import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {PersonInterface} from "../models/person.interface";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  selectedPersonId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  selectedPerson: BehaviorSubject<PersonInterface> = new BehaviorSubject<PersonInterface>({
    id: 0,
    firstName: '',
    lastName: '',
    birthYear: 0,
    nationalId: ''
  })
  personList = new BehaviorSubject<PersonInterface[]>([])

  constructor(private http: HttpClient) {
  }

  persons(): Observable<PersonInterface[]> {
    return this.http.get<PersonInterface[]>('/assets/mockData/persons.json')
  }
}
