import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseModal } from '../reload-db/reload-db.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cron-job',
  templateUrl: './cron-job.component.html',
  styleUrls: ['./cron-job.component.scss']
})
export class CronJobComponent implements OnInit {
  isLoading: boolean = false;
  baseUrl: string = "";
  companyCode: string = "";
  dbName: string = "";
  constructor(private http: HttpClient,
              private router: ActivatedRoute
  ){
    this.companyCode = this.router.snapshot.queryParams['companyCode'];
    this.dbName = this.router.snapshot.queryParams["db"];
  }
  ngOnInit(): void {
     this.baseUrl = environment.baseURL;
     console.log(this.companyCode);
  }

  generateAttendance() {
    this.isLoading = true;
    this.http.get(this.baseUrl + `Job/generateAttendance/${this.companyCode}`).subscribe({
      next: (data: ResponseModal) => {
        if (data.responseBody) {
          alert("Attendance generated");
          this.isLoading = false;
        }
      }, 
      error: error => {
        console.log(error);
        this.isLoading = false;
      }
    })
  }

  yearlyLeaveGenerated() {
    this.isLoading = true;
    this.http.get(this.baseUrl + `Job/yearlyLeaveGenerate/${this.companyCode}`).subscribe({
      next: (data: ResponseModal) => {
        if (data.responseBody) {
          alert("Yearly Leave generated");
          this.isLoading = false;
        }
      }, 
      error: error => {
        console.log(error);
        this.isLoading = false;
      }
    })
  }
}
