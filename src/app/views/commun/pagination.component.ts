import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  template: ''
})
export abstract class PaginationComponent<T> {

    public pageSize: number = 5;
    public dataArrayPage: Array<T> = [];
    public paginationForm: FormGroup = this.formBuilder.group(
        {
        pageSize: new FormControl(2)
        }
    );
    public dataArray: Array<T> = new Array<T>();
    public dataCollectionSize: number = 0;
    public dataPage: number = 1;


    constructor(protected formBuilder: FormBuilder) { }

    public refresh(): void {
        this.pageSize = this.pageSizeFormControl.value;
        this.dataArrayPage = this.dataArray
          .slice((this.dataPage - 1) * this.pageSize, (this.dataPage - 1) * this.pageSize + this.pageSize);
        this.dataCollectionSize = this.dataArray.length;
    }

    public get pageSizeFormControl(): FormControl {
        return this.paginationForm.get('pageSize') as FormControl;
    }

}
