import {Component} from "@angular/core";
import {MainService} from "./services/main.service";

@Component({
  selector: 'btn-edit-renderer',
  template: `
    <button (click)="btnClickedHandler()" mat-raised-button color="primary">ویرایش</button>
  `,
  styles:[
    `.btn{color:red!important;}`
  ]
})
export class BtnEditRenderer {
  constructor(private mainService:MainService) {
  }
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler() {
    this.mainService.selectedPerson.next(this.params.data)
  }
}
