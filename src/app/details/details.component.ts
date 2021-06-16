import { Component, OnInit, Output } from '@angular/core';
import * as Chartist from 'chartist';
import {Chart, ChartType} from 'chart.js'
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { Item, UserForm } from '../form/form.component';
import { EventEmitter } from '@angular/core';

// export class User{
//   constructor(
//     public id:number,
//     public name: string,
//     public salary: number,
//     public email: string
//   ){}
// }


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  // popoverMessage:string='Are you sure? Want to delete this Record'
  // confirmClicked:boolean= false;
  // cancelClicked:boolean= false;
  usedSpace:number=30;
  availableSpace:number=50;
  revenue:number=56907;
  time:number= 12;
  date:Date= new Date();

  
  chart=[];
  

  users= this.dataService.getData();
  // users =[
  //   new UserForm(1,"aravind","aravin@gmis.vom","4536","675675",[]),
  //   new UserForm(2,"arun","arun@gmis.vom","4536","9879",[]),
  //   new UserForm(3,"ashwin","ashwin@gmis.vom","4536","1231",[]),
  //   new UserForm(4,"kishore","kishore@gmis.vom","4536","54645",[])
  // ]

  filtered_users:UserForm[]=[]

  private _searchbox:string='';

  get searchbox(){
    return this._searchbox;
  }

  set searchbox(value:string){
    this._searchbox=value;
    this.filtered_users = this.filteredusers(value);
  }

  filteredusers(searchString:string){
    return this.users.filter(user=>(user.name.toLowerCase().indexOf
            (searchString.toLowerCase()) !==-1) || (user.emailId.toLowerCase().indexOf
            (searchString.toLowerCase()) !==-1))
  }


  
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  public barChartType:ChartType='line';
  public barChartLegend = true;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    
  ];

  constructor(
    private dataService:DataService,
    private router:Router
  ) { }

  onAddUser(event : any){
      this.router.navigate(['../userprofile'],{queryParams:{mode:'add'}});
  }
  onUpdateUser(user:UserForm){
      console.log(user);
      this.router.navigate(['../userprofile'],{queryParams:{mode:'update',id:user.id}})
  }

  popover(user:UserForm){
    var r = confirm("Are you sure? Want to delete this Record");
    if(r===true){
      this.onDeleteUser(user);
    }
    
  }

  onDeleteUser(user:UserForm){
    
    console.log("on delete user");
    
    this.dataService.removeData(user);
  }
  
  ngOnInit() {
      this.filtered_users= this.users;


  }
  

}

