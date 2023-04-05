import { Component, OnInit ,ViewChild,ElementRef } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,ReactiveFormsModule,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from 'src/app/shared/service/general.service';


@Component({
  selector: 'app-general-setting',
  templateUrl: './general-setting.component.html',
  styleUrls: ['./general-setting.component.css']
})
export class GeneralSettingComponent implements OnInit {
  Url='http://localhost:7070/'
  newImageArray:any=[]
  fourcards:FormGroup | any;
  @ViewChild('fileSelect') fileSelect:ElementRef|any

  constructor(private _FormBuilder:FormBuilder , private _General:GeneralService) { 
    this.myFormModel()
  }

  ngOnInit(): void {
  }




  myFormModel(){
    this.fourcards=this._FormBuilder.group({
      Headingone: new FormControl ('',[Validators.required,Validators.minLength(2),Validators.maxLength(100)]),
      descriptionone: new FormControl ('',[Validators.required,Validators.minLength(2),Validators.maxLength(100)]),
      HeadingTwo: new FormControl ('',[Validators.required,Validators.minLength(2),Validators.maxLength(100)]),
      descriptionTwo: new FormControl ('',[Validators.required,Validators.minLength(2),Validators.maxLength(100)]),
      HeadingThree: new FormControl ('',[Validators.required,Validators.minLength(2),Validators.maxLength(100)]),
      descriptionThree: new FormControl ('',[Validators.required,Validators.minLength(2),Validators.maxLength(100)]),
      HeadingFour: new FormControl ('',[Validators.required,Validators.minLength(2),Validators.maxLength(100)]),
      descriptionFour: new FormControl ('',[Validators.required,Validators.minLength(2),Validators.maxLength(100)])
    })
  }


  Submitmyform(){
    let FormValue = this.fourcards.value;
    this._General.FourCardApi(FormValue).subscribe((resfrombackend)=>{
      resfrombackend;
      this.fourcards.reset();
    })


   
    let  MultipartFormData=new FormData();
    MultipartFormData.append('Headingone',this.fourcards.get('Headingone').value);
    MultipartFormData.append(' descriptionone', this.fourcards.get(' descriptionone').value);
    MultipartFormData.append('HeadingTwo', this.fourcards.get('HeadingTwo').value);
    MultipartFormData.append('descriptionTwo', this.fourcards.get('descriptionTwo').value);
    // MultipartFormData.append('Category', this.formproduct.get('Category').value);
    MultipartFormData.append('HeadingThree', this.fourcards.get('HeadingThree').value);
    MultipartFormData.append('descriptionThree', this.fourcards.get('descriptionThree').value);
    // MultipartFormData.append('ProductMaterial', this.formproduct.get('ProductMaterial').value);
    MultipartFormData.append('HeadingFour', this.fourcards.get('HeadingFour').value);
    MultipartFormData.append('descriptionFour', this.fourcards.get('descriptionFour').value);
    
    this.newImageArray.forEach((imagedata:any)=>{
  MultipartFormData.append('images',imagedata);
    
    })




    
    this._General.FourCardApi(MultipartFormData).subscribe((res:any)=>{
      res;
   
      this.fourcards.reset()
      
      this.fileSelect.nativeElement.value=null
      this.newImageArray=[]
    
    
    })
  
  }

 
   

}
