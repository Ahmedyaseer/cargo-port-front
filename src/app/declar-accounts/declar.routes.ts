import { Route } from "@angular/router";
import { DeclarAccountComponent } from "./declar-account/declar-account.component";
import { Page404Component } from "app/authentication/page404/page404.component";

export const DECLAR_ROUTES:Route[]  = [
    {
        path:'account',
        component:DeclarAccountComponent
    },
    {
        path:'**',
        component:Page404Component
    }
]