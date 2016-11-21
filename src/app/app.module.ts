import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutesModule } from './app-routes.module';

@NgModule({
  imports: [BrowserModule, AppRoutesModule],
  declarations: [AppComponent, HomeComponent],
  bootstrap: [AppComponent],
  providers: [Title]
})
export class AppModule { }
