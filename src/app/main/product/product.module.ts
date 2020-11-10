import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';
import { TypeComponent } from './type/type.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryComponent } from './category/category.component';
import { NhaxuatbanComponent } from './nhaxuatban/nhaxuatban.component';

@NgModule({
  declarations: [ 
    OrderComponent,ProductComponent,TypeComponent, CategoryComponent, NhaxuatbanComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'order',
        component: OrderComponent,
      },
      {
        path: 'product',
        component: ProductComponent,
      },
      {
        path: 'type',
        component: TypeComponent,
      },
      {
        path: 'category',
        component: CategoryComponent,
      },
      {
        path: 'nhaxuatban',
        component: NhaxuatbanComponent,
      },
  ]),  
  ]
})
export class ProductModule { }
