import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(public dataService : DataService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private fb:FormBuilder) { }

    productForm: FormGroup = this.fb.group({
      companies: this.fb.array([]) ,
    });
  
    companies() : FormArray {
      // if(this.add){
        return this.productForm.get("companies") as FormArray
      // }
      // else{
      //   return this.companyNames;
      // }

    }
  
    newCompany(): FormGroup {
      return this.fb.group({
        companyName : '',
      })
    }
     
    addQuantity() {
      this.companies().push(this.newCompany());
    }
     
    removeQuantity(i:number) {
      this.companies().removeAt(i);
    }


  formGroup: FormGroup = new FormGroup({});
  

  nameValue : string = "";
  emailValue : string = "";
  salaryValue : string = "";
  contactNumValue : string = "";
  companyNames : FormArray = this.fb.array([]);

  add : boolean = false;
  id : Number = 0;

  addLabel : string ="";
 


  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params=>{
      console.log(params);

      if(params.get('mode')==="add"){
        this.add = true;
        this.addLabel = "Add";
        // this.items.push(this.item);
      }
      else {
        this.add = false;
        this.addLabel = "Update";
        this.id = Number(params.get('id'));
        var user = this.dataService.retrieveUserById(this.id);
        this.nameValue = user.name;
        this.emailValue = user.emailId;
        this.salaryValue = user.salary;
        this.contactNumValue = user.contactNumber;
        this.companyNames = user.company;
        // user.company.forEach(data =>{
        //   this.items.push(data);
        // })
        // this.items = user.company;
      }
    })
    
    this.addQuantity();
    this.formGroup = new FormGroup({
      Email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      PhoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(10), Validators.maxLength(10)
      ]),
      Name: new FormControl('', [
        Validators.required
      ]),
      Salary: new FormControl('', []),
      Company: new FormControl('', [])
    });
    
  }

  onSubmit(){
    console.log("update button");
    
    if(this.add)
    {
    this.dataService.addData(new UserForm(this.dataService.getData().length+1,this.nameValue,this.emailValue,this.salaryValue,this.contactNumValue,this.companies()));
    } 
    else
    {
      this.dataService.editData(new UserForm(this.id,this.nameValue,this.emailValue,this.salaryValue,this.contactNumValue,this.companies()));
    }
    
    
    this.router.navigate(['../dashboard'])
      console.log(this.dataService.getData());
  }

  // onAdd(){
  //   this.items.push(new Item(""));
  // }

  

}

export class UserForm {
   constructor(public id:Number,public name:string,
    public emailId:string,public salary : string ,
    public contactNumber : string,public company : FormArray){}

}

export class Item {
  constructor(public companyName : string){}

}
