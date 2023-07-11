import {Component} from "@angular/core";
import {MainService} from "./services/main.service";

@Component({
  selector: 'btn-view-renderer',
  template: `
    <button (click)="btnClickedHandler()" mat-raised-button color="primary">مشاهده</button>
  `,
  styles:[
    `.btn{color:red!important;}`
  ]
})
export class BtnViewRenderer {
  constructor(private mainService:MainService) {
  }
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler() {
    this.mainService.selectedPersonId.next(this.params.data.id)
  }
}
