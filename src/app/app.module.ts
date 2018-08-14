import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';
import { PrivatePageComponent } from './pages/private-page/private-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';

import { RequireAnonGuard } from './guards/require-anon.guard';
import { RequireUserGuard } from './guards/require-user.guard';
import { InitAuthGuard } from './guards/init-auth.guard';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [
  { path: '',  component: HomePageComponent, canActivate: [ InitAuthGuard ]},
  { path: 'private',  component: PrivatePageComponent, canActivate: [ RequireUserGuard ] },
];

@NgModule({
  declarations: [
    AppComponent,
    PrivatePageComponent,
    HomePageComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService,
    InitAuthGuard,
    RequireAnonGuard,
    RequireUserGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
