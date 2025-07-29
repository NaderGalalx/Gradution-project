import { Routes } from '@angular/router';
import { AuthComponent } from './layout/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './layout/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StdrequestsComponent } from './components/stdrequests/stdrequests.component';
import { RequestWindowComponent } from './components/request-window/request-window.component';
import { AllRequestsComponent } from './components/all-requests/all-requests.component';
import { AcceptedrequestsComponent } from './components/acceptedrequests/acceptedrequests.component';
import { RejectedrequestsComponent } from './components/rejectedrequests/rejectedrequests.component';
import { auhGuard } from './core/guards/auh.guard';

export const routes: Routes = [
    {path:"" , redirectTo:"auth" , pathMatch:"full"},
    {path:"auth" , component:AuthComponent , children:[
        { path:"" , redirectTo:"login" , pathMatch:"full" },
        { path:"login"  , component:LoginComponent            , title:"تسجيل دخول" },
        { path:"forgetpass" , loadComponent:()=>import('./components/forgetpass/forgetpass.component').then((classes)=>classes.ForgetpassComponent)          , title:"تسجيل دخول | كلمة المرور" },
        { path:"verifypass/:email" , loadComponent:()=>import('./components/verifypass/verifypass.component').then((classes)=>classes.VerifypassComponent)   , title:"تسجيل دخول | كلمة المرور" },
        { path:"confirmpass/:email/:code" , loadComponent:()=>import('./components/confirmpass/confirmpass.component').then((classes)=>classes.ConfirmpassComponent)      , title:"تسجيل دخول |تغيير كلمة المرور" },
    ]},
        
    {path:"main" , component:MainComponent , canActivate:[auhGuard] ,
     children:[ 
        {path:"" , redirectTo:"dashboard" , pathMatch:"full"},
        {path:"dashboard"   , component:DashboardComponent   , title:"لوحة التحكم"},
        
        {path:"stdrequests" , component:StdrequestsComponent , children:[
            {path:"" , redirectTo:"allrequests" , pathMatch:"full"},
            {path:"allrequests"        , component:AllRequestsComponent        , title:" الطلبات"},

            // -------------------------------------------------------------->
            {path:"request/:id"        , component:RequestWindowComponent      , title:"تفاصيل الطلب"},
            {path:"acceptedrequests"   , component:AcceptedrequestsComponent   , title:"الطلبات المقبولة"},
            {path:"rejecredrequests"   , component:RejectedrequestsComponent   , title:"الطلبات المرفوضة"},
        ]},
        {path:"events"      , loadComponent:()=>import('./components/events/events.component').then((classes)=>classes.EventsComponent) , children:[
            {path:"",redirectTo:"allevents" , pathMatch:"full"},
            {path:"allevents"  , loadComponent:()=>import('./components/all-events/all-events.component').then((classes)=>classes.AllEventsComponent)  , title:"الفعاليات" },
            {path:"createvent" , loadComponent:()=>import('./components/create-event/create-event.component').then((classes)=>classes.CreateEventComponent), title:"إضافة فاعلية"},
            {path:"update-event/:event_id" , loadComponent:()=>import('./components/Update/update-event/update-event.component').then((classes)=>classes.UpdateEventComponent) , title:"تعديل فاعلية"},
        ]},
        {path:"news" , loadComponent:()=>import('./components/news/news.component').then(n=>n.NewsComponent) , children:[
            {path:"", redirectTo:"allnews" , pathMatch:"full" },
            {path:"allnews"    , loadComponent:()=>import('./components/allnews/allnews.component').then(n=>n.AllnewsComponent) , title:"الأخبار"},
            {path:"createnew"  , loadComponent:()=>import('./components/creat-new/creat-new.component').then(n=>n.CreatNewComponent) , title:"إضافة خبر"},
            {path:"update-new/:new_id" , loadComponent:()=>import('./components/Update/update-news/update-news.component').then(n=>n.UpdateNewsComponent) , title:"تعديل خبر"}
        ]},
        {path:"profile" , loadComponent:()=>import('./components/profile/profile.component').then(n=>n.ProfileComponent) , title:"الصفحة الشخصية"},
        {path:"manage-requests" , loadComponent:()=>import('./components/available-requests/available-requests.component').then(n=>n.AvailableRequestsComponent) , title:"الطلبات المتاحة"},
        {path:"create-request"  , loadComponent:()=>import('./components/create-request/create-request.component').then(n=>n.CreateRequestComponent) , title:"إضافة طلب" },
        {path:"update-request/:req_id"  , loadComponent:()=>import('./components/Update/update-request/update-request.component').then(n=>n.UpdateRequestComponent)     , title:"تعديل طلب" },
        {path:"upload"                  , loadComponent:()=>import('./components/upload/upload.component').then(n=>n.UploadComponent)           , title:"رفع الملفات" },

    ]}
];
