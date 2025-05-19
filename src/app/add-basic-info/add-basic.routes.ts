import { Route } from "@angular/router";
import { AddNewProductComponent } from "./add-new-product/add-new-product.component";
import { Page404Component } from "app/authentication/page404/page404.component";
import { AddNewMaterialComponent } from "./add-new-material/add-new-material.component";
import { AddNewMeasurementComponent } from "./add-new-measurement/add-new-measurement.component";
import { AddNewPortsComponent } from "./add-new-ports/add-new-ports.component";
import { AddAccountTypeComponent } from "./add-account-type/add-account-type.component";
import { ShowProductsComponent } from "./show-products/show-products.component";


export const ADD_BASIC_INFO_ROUTE: Route[] = [
  {
    path: "addProduct",
    component: AddNewProductComponent
  },
  {
    path:"addMaterial",
    component:AddNewMaterialComponent
  },
  {
    path:"addUnit",
    component:AddNewMeasurementComponent
  },
  {
    path:"addPort",
    component:AddNewPortsComponent
  },
  {
    path:"addAccount",
    component:AddAccountTypeComponent
  },
  {
    path:"showProduct",
    component:ShowProductsComponent
  },
  {
    path: "**",
    component:Page404Component
  }
];

