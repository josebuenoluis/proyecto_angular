import { Routes } from '@angular/router';
import { AskPriceComponentComponent } from './ask.price.component/ask.price.component.component';
import { AskClientComponentComponent } from './ask-client-component/ask-client-component.component';
import { IndexComponentComponent } from './index-component/index-component.component';
import { AskArticleComponentComponent } from './ask-article-component/ask-article-component.component';
import { CreateDocumentComponentComponent } from './create-document-component/create-document-component.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path:'',component: IndexComponentComponent},
    {path: 'consultar-preço', component: AskPriceComponentComponent,canActivate : [authGuard]},
    {path: 'consultar-entidades',component: AskClientComponentComponent,canActivate : [authGuard]},
    {path: 'consultar-artigos', component : AskArticleComponentComponent,canActivate : [authGuard]},
    {path: 'criar-documento', component : CreateDocumentComponentComponent,canActivate : [authGuard]},
    {path:'login',component:LoginComponentComponent},
    { path: '**', component: NotFoundComponentComponent }
];