import { Component, OnInit, Output } from '@angular/core';
import * as Chartist from 'chartist';
import {Chart, ChartType} from 'chart.js'
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { UserForm } from '../form/form.component';
import { EventEmitter } from '@angular/core';

export class User{
  constructor(
    public id:number,
    public name: string,
    public salary: number,
    public email: string
  ){}
}


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  popoverMessage:string='Are you sure? Want to delete this Record'
  confirmClicked:boolean= false;
  cancelClicked:boolean= false;
  usedSpace:number=30;
  availableSpace:number=50;
  revenue:number=56907;
  time:number= 12;
  date:Date= new Date();

  searchbox:string='';
  chart=[];
  constructor(
    private dataService:DataService,
    private router:Router
  ) { }

  users= this.dataService.getData();
  
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

  onAddUser(event : any){
      this.router.navigate(['../userprofile'],{queryParams:{mode:'add'}});
  }
  onUpdateUser(user:UserForm){
      console.log(user);
      this.router.navigate(['../userprofile'],{queryParams:{mode:'update',id:user.id}})
  }
  onDeleteUser(user:UserForm){
    
    console.log("on delete user");
    
    this.dataService.removeData(user);
    
    
  }
  
  ngOnInit() {
      


  }
  

}

