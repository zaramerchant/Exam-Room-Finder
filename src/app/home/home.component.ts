import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


interface LocationRange {
  code: string;
  start: string;
  end: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  // styleUrl: './home.component.css'
})

export class HomeComponent{
  locationFound: string | null = null;
  fullName: string = '';
  fullNamePrint: string = '';
  selectedCourse: string = '';
  dataset: LocationRange[] = [];
  dataLoaded: boolean = false;  

  // private dataset: LocationRange[] = [
  //   { code: 'AB 2125', start: 'ABBASSI', end: 'DESAI, EESHA C' },
  //   { code: 'AB 2160', start: 'DESAI, PRATHAM N', end: 'KRISHNASWAMY' },
  //   { code: 'CI 212', start: 'KUMAR', end: 'MAHER' },
  //   { code: 'FH B3', start: 'MAHIDA', end: 'MINGGIA' },
  //   { code: 'FH B5', start: 'MINHAS CASTILLO', end: 'NGUYEN, ANDRE M' },
  //   { code: 'SC 135', start: 'NGUYEN, ANTHONY', end: 'TABETI' },
  //   { code: 'SEC 209', start: 'TAKAHASHI', end: 'WANG, HAOKUAN' },
  //   { code: 'CA A4', start: 'WANG, KEVIN', end: 'ZIRVI' }
  // ];

  // ngOnInit(): void {
  //   this.onCourseChange();
  // }

  constructor(private http: HttpClient) {}

  loadDataset(course: string): Observable<LocationRange[]> {
    const filePath = `assets/${course}.json`; 
    return this.http.get<LocationRange[]>(filePath);
  }


  onCourseChange(): void {
    if (this.selectedCourse) {
      this.loadDataset(this.selectedCourse).subscribe({
        next: (data) => {
          this.dataset = data;
          this.locationFound = null;  
        },
        error: () => {
          this.locationFound = 'Error loading course data';
        }
      });
    }
  }


  checkName(firstName: string, lastName: string, middleInitial?: string) {

    if (!firstName || !lastName) return;

    let location = '';

    if(!middleInitial){
      firstName = firstName.toUpperCase();
      lastName = lastName.toUpperCase();
      this.fullName = `${lastName}, ${firstName}`;
      this.fullNamePrint = `${firstName} ${lastName} `;
    }
    else{
      firstName = firstName.toUpperCase();
      lastName = lastName.toUpperCase();
      middleInitial = middleInitial.toUpperCase();
      this.fullName = `${lastName.toUpperCase()}, ${firstName.toUpperCase()}${middleInitial ? ' ' + middleInitial.toUpperCase() : ''}`;
      this.fullNamePrint = `${firstName.toUpperCase()}${middleInitial ? ' ' + middleInitial.toUpperCase() : ''} ${lastName.toUpperCase()}`;
    }
    
    this.locationFound = null; 

    for (let i = 0; i < this.dataset.length; i++) {
      if (this.fullName.localeCompare(this.dataset[i].end, 'en', { ignorePunctuation: true }) < 1) {
        this.locationFound = this.dataset[i].code;
        break; 
      }
    }
  
    //fullName.localeCompare(this.dataset[0].end, , ignorePunctuation) < 1
    // if (this.fullName.localeCompare(this.dataset[0].end,'en',{ignorePunctuation: true}) < 1) {
    //   location = this.dataset[0].code;
    // } 
    // else if (this.fullName.localeCompare(this.dataset[1].end,'en',{ignorePunctuation: true}) < 1) {
    //   location = this.dataset[1].code;
    // } 
    // else if (this.fullName.localeCompare(this.dataset[2].end,'en',{ignorePunctuation: true}) < 1) {
    //   location = this.dataset[2].code;
    // } 
    // else if (this.fullName.localeCompare(this.dataset[3].end,'en',{ignorePunctuation: true}) < 1) {
    //   location = this.dataset[3].code;
    // } 
    // else if (this.fullName.localeCompare(this.dataset[4].end,'en',{ignorePunctuation: true}) < 1) {
    //   location = this.dataset[4].code;
    // } 
    // else if (this.fullName.localeCompare(this.dataset[5].end,'en',{ignorePunctuation: true}) < 1) {
    //   location = this.dataset[5].code; 
    // } 
    // else if (this.fullName.localeCompare(this.dataset[6].end,'en',{ignorePunctuation: true}) < 1) {
    //   location = this.dataset[6].code; 
    // } 
    // else if (this.fullName.localeCompare(this.dataset[7].end,'en',{ignorePunctuation: true}) < 1) {
    //   location = this.dataset[7].code;
    // } 
    // else if (this.fullName.localeCompare(this.dataset[8].end,'en',{ignorePunctuation: true}) < 1) {
    //   location = this.dataset[8].code;
    // } 
    // else if (this.fullName.localeCompare(this.dataset[9].end,'en',{ignorePunctuation: true}) < 1) {
    //   location = this.dataset[9].code;
    // }
    // else{
    //   location = 'null';
    // }

    // if (location != null) {
    //   this.locationFound = location;
    // } else {
    //   this.locationFound = 'No matching location found';
    // }
  }
  resetFields(firstName: HTMLInputElement, lastName: HTMLInputElement, middleInitial: HTMLInputElement): void {
    firstName.value = '';
    lastName.value = '';
    middleInitial.value = '';
  }
}
