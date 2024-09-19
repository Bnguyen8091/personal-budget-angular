import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ArticleComponent } from './article/article.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { P404Component } from './p404/p404.component';
import { HeroModule } from './hero/hero.module';
import { BreadcrumbsModule } from './breadcrumbs/breadcrumbs.module';
import { ContactComponent } from './contact/contact.component';
import { D3ChartComponent } from './d3-chart/d3-chart.component';
import { DataService } from './data.service';

// Define routes if needed
const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'article', component: ArticleComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: P404Component },
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FooterComponent,
    HomepageComponent,
    ArticleComponent,
    AboutComponent,
    LoginComponent,
    P404Component,
    ContactComponent,
    D3ChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HeroModule, // Import HeroModule
    RouterModule.forRoot(routes), // Ensure routes are defined
    BreadcrumbsModule // Import BreadcrumbsModule
  ],
  providers: [
    provideClientHydration(),
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
