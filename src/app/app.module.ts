import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { ListComponent } from './components/list/list.component';
import { CardComponent } from './components/card/card.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    ListComponent,
    CardComponent,
    LoginComponent,
    NavBarComponent,
    RegisterComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
