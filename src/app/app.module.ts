import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { FileSelectDirective } from 'ng2-file-upload';

import { AuthService } from './services/auth.service';
import { LocationService } from './services/location.service';
import { TripsService } from './services/trips.service';

import { AppComponent } from './app.component';
import { TripsPageComponent } from './pages/trips-page/trips-page.component';
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
import { NewtripComponent } from './components/newtrip/newtrip.component';
import { AddplaceComponent } from './components/addplace/addplace.component';
import { ExplorePageComponent } from './pages/explore-page/explore-page.component';
import { ExploreComponent } from './components/explore/explore.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  { path: '',  component: HomePageComponent, canActivate: [ InitAuthGuard ]},
  { path: 'trips',  component: TripsPageComponent, canActivate: [ RequireUserGuard ] },
  { path: 'explore',  component: ExplorePageComponent, canActivate: [ RequireUserGuard ] },
  { path: 'profile/:username',  component: ProfilePageComponent, canActivate: [ RequireUserGuard ]}
];

@NgModule({
  declarations: [
    AppComponent,
    TripsPageComponent,
    HomePageComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    MapComponent,
    NewtripComponent,
    AddplaceComponent,
    ExplorePageComponent,
    ExploreComponent,
    ProfilePageComponent,
    ProfileComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService,
    LocationService,
    TripsService,
    InitAuthGuard,
    RequireAnonGuard,
    RequireUserGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
