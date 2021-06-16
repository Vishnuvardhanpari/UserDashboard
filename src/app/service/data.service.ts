import { isNgTemplate } from '@angular/compiler';
import { newArray } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { UserForm } from '../form/form.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private fb:FormBuilder) { }

  userFormList : UserForm[] = [];

  addData(form : UserForm){
      this.userFormList.push(form);
  }

  getData(): UserForm[] {
    return this.userFormList;
  }

  retrieveUserById(id : Number) : UserForm {
    var user = new UserForm(0,"","","","",this.fb.array([]) as FormArray);
    this.userFormList.forEach(itm => {
      if(itm.id == id){
        user = itm;
      }
    });
    return user;
  }

  removeData(form : UserForm) {
    this.userFormList.splice(this.userFormList.indexOf(form),1);
  }


  editData(form : UserForm){
    this.userFormList.forEach(function(itm){
      if(itm.id == form.id){
        itm.name = form.name;
        itm.emailId = form.emailId;
        itm.contactNumber = form.contactNumber;
        itm.company = form.company;
      }
    })
  }

}
