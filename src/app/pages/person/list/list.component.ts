import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {PersonInterface} from "../../../models/person.interface";
import {ColDef, GridApi, ICellRendererParams} from "ag-grid-community";
import {BtnEditRenderer} from "../../../button-edit-render";
import {BtnViewRenderer} from "../../../button-view-render";
import {Router} from "@angular/router";
import {MainService} from "../../../services/main.service";
import {CalcAgePipe} from "../../../pipes/age.pipe";
import {MatSelectChange} from "@angular/material/select";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  editPersonId = 0;
  personForm!: FormGroup
  personSubscription!: Subscription
  persons: PersonInterface[] = []
  filteredPersons: PersonInterface[] = []
  public columnDefs: ColDef[] = [
    {
      field: "id",
      headerName: "شناسه"
    },
    {
      field: "firstName",
      headerName: "نام",
    },
    {
      field: "lastName",
      headerName: "نام خانوادگی",
      filter: 'agTextColumnFilter',
    },
    {
      field: "nationalId",
      headerName: "کد ملی",
      filter: 'agTextColumnFilter',
    },
    {
      field: "birthYear",
      headerName: "سال تولد",
      cellRenderer: (params: ICellRendererParams) => this.calcPipe.transform(params.value),
    },
    {
      field: "edit",
      headerName: "ویرایش",
      cellRenderer: BtnEditRenderer
    },
    {
      field: "view",
      headerName: "مشاهده",
      cellRenderer: BtnViewRenderer
    }
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    floatingFilter: true,
  };
  public gridOptions = {
    rowClass: 'my-green-class',
    defaultColDef: {
      editable: false,
      filter: true,
      floatingFilter: true,
      floatingFilterComponentParams: {suppressFilterButton: true},
    },
  }
  @ViewChild('content') content!: ElementRef;

  constructor(
    private toast: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private calcPipe: CalcAgePipe
  ) {
  }

  ngOnInit(){
    this.mainService.selectedPersonId.next(0)
    this.getPersonInfo()
    this.getPersonId()
    this.initPersonForm({
      id: 0,
      firstName: '',
      lastName: '',
      birthYear: 0,
      nationalId: ''
    })
  }
  onGridReady() {
    this.personSubscription = this.mainService.persons().subscribe(
      (response) => {
        this.persons = response
        this.filteredPersons = this.persons
        this.mainService.personList.next(this.persons)
      }
    )
  }

  ngOnDestroy() {
    // this.personSubscription.unsubscribe()
  }

  filterPersons($event: MatSelectChange) {
    this.filteredPersons = this.persons
    const id = $event.value
    switch (id) {
      case 1:
        this.filteredPersons = this.persons.filter(person => person.birthYear >= 2010)
        break;
      case 2:
        this.filteredPersons = this.persons.filter(person => person.birthYear >= 1995)
        break;
      case 3:
        this.filteredPersons = this.persons.filter(person => person.birthYear >= 1960)
        break;
      case 4:
        this.filteredPersons = this.persons.filter(person => person.birthYear < 1960)
        break;
    }
  }

  getPersonInfo() {
    this.mainService.selectedPerson.subscribe(
      (response) => {
        if (response.id > 0) {
          this.initPersonForm(response)
          this.scrollToBottom();
          this.editPersonId = response.id
        }
      }
    )
  }

  initPersonForm(personInfo: PersonInterface) {
    this.personForm = this.formBuilder.group({
      firstName: [personInfo.firstName, Validators.required],
      lastName: [personInfo.lastName, Validators.required],
      nationalId: [personInfo.nationalId, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    })
  }

  editPerson() {
    if (this.personForm.valid) {
      const index = this.persons.findIndex(person => person.id === this.editPersonId)
      this.filteredPersons[index].lastName = this.personForm.get('lastName')?.value
      this.filteredPersons[index].firstName = this.personForm.get('firstName')?.value
      this.filteredPersons[index].nationalId = this.personForm.get('nationalId')?.value
      this.toast.success('ویرایش با موفقیت انجام شد.')
    }
  }

  scrollToBottom = () => {
    const element = document.getElementById('content');
    if (element)
      element.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest'});
  }

  getPersonId() {
    this.mainService.selectedPersonId.subscribe(
      (response) => {
        if (response > 0) {
          this.router.navigate(['/person/view/' + response])
        }
      }
    )
  }
}
