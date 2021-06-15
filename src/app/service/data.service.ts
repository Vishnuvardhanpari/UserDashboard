import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { UserForm } from '../form/form.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  userFormList : UserForm[] = [];

  addData(form : UserForm){
      this.userFormList.push(form);
  }

  getData(): UserForm[] {
    return this.userFormList;
  }

  retrieveUserById(id : Number) : UserForm {
    var user = new UserForm(0,"","","","",[]);
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
        itm = form;
      }
    })
  }

}
