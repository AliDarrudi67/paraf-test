import {Component} from '@angular/core';
import {MainService} from "../../../services/main.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PersonInterface} from "../../../models/person.interface";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  personId = 0;
  personInfo: PersonInterface={
    id:0,
    firstName:'',
    lastName:'',
    birthYear:0,
    nationalId:''
  }
  personSubscription!: Subscription

  constructor(private mainService: MainService, private activatedRoute: ActivatedRoute,private router:Router) {
    this.personId = this.activatedRoute.snapshot.params['id']
  }

  ngOnInit(){
    this.getPersons()
  }

  getPersons() {
    this.personSubscription = this.mainService.persons().subscribe(
      (response) => {
        const index = response.findIndex(person => person.id === +this.personId)
        this.personInfo = response[index]
        this.mainService.personList.next(response)
      }
    )
  }

  ngOnDestroy() {
    this.personSubscription.unsubscribe()
  }
}
