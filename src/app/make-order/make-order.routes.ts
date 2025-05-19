import { Route } from "@angular/router";
import { MakeOrderComponent } from "./make-order.component";
import { NotFoundError } from "rxjs";
import { Page404Component } from "app/authentication/page404/page404.component";
import { ShowOrdersComponent } from "./show-orders/show-orders.component";

export const ADD_Make_Order_ROUTES :Route[] = [
{
    path:'order',
    component:MakeOrderComponent
},
{
path:'showOrders',
component:ShowOrdersComponent 
},
{
    path:'**',
    component:Page404Component
}
]