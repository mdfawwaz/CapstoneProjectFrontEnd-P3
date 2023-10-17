import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './loginpage/loginpage.component';
import { RegistrationPageComponent } from './registrationpage/registrationpage.component';
import { FormsModule } from '@angular/forms';
import { LocationComponent } from './location/location.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule } from '@angular/router';
import { SelectPageComponent } from './select-page/select-page.component';
import { ProductSelectionComponent } from './product-selection/product-selection.component';


@NgModule({
  declarations: 
  [
    AppComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    LocationComponent,
    SelectPageComponent,
    ProductSelectionComponent,
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
