import { MustMatch } from '../../../helpers/must-match.validator';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FileUpload } from 'primeng/fileupload';
import { FormBuilder, Validators} from '@angular/forms';
import { ApiService } from 'src/app/lib/api.service';
import 'rxjs/add/operator/takeUntil';
import { BaseComponent } from '../../../lib/base-component';
declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent extends BaseComponent implements OnInit {

  public categorys: any ;
  public Category: any;
  public totalRecords:any;
  public pageSize = 3;
  public page = 1;
  public uploadedFiles: any[] = [];
  public formsearch: any;
  public formdata: any;
  public doneSetupForm: any;  
  public showUpdateModal:any;
  public isCreate:any;
  submitted = false;
  @ViewChild(FileUpload, { static: false }) file_image: FileUpload;
  constructor(private fb: FormBuilder, injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this._api.get('/api/Category/get-all').takeUntil(this.unsubscribe).subscribe(data => {
      this.categorys = data;
    }); 
  }

  loadPage(page) { 
    this._api.post('/api/Category/search',{page: page, pageSize: this.pageSize}).takeUntil(this.unsubscribe).subscribe(res => {
      this.Category = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  } 

  search() { 
    this.page = 1;
    this.pageSize = 5;
    this._api.post('/api/Category/search',{page: this.page, pageSize: this.pageSize, ID_SO_VAN_BAN: this.formsearch.get('ID_SO_VAN_BAN').value}).takeUntil(this.unsubscribe).subscribe(res => {
      this.Category = res.data;
      this.totalRecords =  res.totalItems;
      this.pageSize = res.pageSize;
      });
  }

  pwdCheckValidator(control){
    var filteredStrings = {search:control.value, select:'@#!$%&*'}
    var result = (filteredStrings.select.match(new RegExp('[' + filteredStrings.search + ']', 'g')) || []).join('');
    if(control.value.length < 6 || !result){
        return {matkhau: true};
    }
  }

  get f() { return this.formdata.controls; }

  onSubmit(value) {
    this.submitted = true;
    if (this.formdata.invalid) {
      return;
    } 
    if(this.isCreate) { 
      
        let tmp = {
          IDCategory:value.IDCategory,
          NameCategory:value.NameCategory,
          Note:value.Note,
          Status:value.Status,                     
          };
        this._api.post('/api/Category/create-item',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Thêm thành công');
          this.search();
          this.closeModal();
          
      });
    } else { 
      
        let tmp = {
          IDCategory:value.IDCategory,
          NameCategory:value.NameCategory,
          Note:value.Note,
          Status:value.Status,       
          };
        this._api.post('/api/Category/update-acount',tmp).takeUntil(this.unsubscribe).subscribe(res => {
          alert('Cập nhật thành công');
          this.search();
          this.closeModal();
          });
      
    }
   
  } 

  onDelete(row) { 
    this._api.post('/api/Category/delete-category',{IDCategory:row.iDCategory}).takeUntil(this.unsubscribe).subscribe(res => {
      alert('Xóa thành công');
      this.search(); 
      });
  }

  Reset() {  
    this.Category = null;
    this.formdata = this.fb.group({
      'IDCategory': ['', Validators.required],
      'NameCategory': ['', Validators.required],
      'Note': ['', Validators.required],
      'Status': ['', Validators.required],
    } ); 
  }

  createModal() {
    this.doneSetupForm = false;
    this.showUpdateModal = true;
    this.isCreate = true;
    this.Category = null;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this.formdata = this.fb.group({
        'IDCategory': ['', Validators.required],
      'NameCategory': ['', Validators.required],
      'Note': ['', Validators.required],
      'Status': ['', Validators.required],
      });

      this.doneSetupForm = true;
    });
  }

  public openUpdateModal(row) {
    this.doneSetupForm = false;
    this.showUpdateModal = true; 
    this.isCreate = false;
    setTimeout(() => {
      $('#createUserModal').modal('toggle');
      this._api.get('/api/Category/get-by-id/'+ row.acountId).takeUntil(this.unsubscribe).subscribe((res:any) => {
        this.Category = res; 
          this.formdata = this.fb.group({
            'IDCategory': ['', Validators.required],
      'NameCategory': ['', Validators.required],
      'Note': ['', Validators.required],
      'Status': ['', Validators.required],
          
          }); 
          this.doneSetupForm = true;
        });  
    }, 700);
  }

  closeModal() {
    $('#createUserModal').closest('.modal').modal('hide');
  }
}
