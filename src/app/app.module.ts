import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HomeModule } from './home/home.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecordSessionComponent } from './record-session/record-session.component';
import { ViewReferenceComponent } from './view-reference/view-reference.component';
import { RecordResponseComponent } from './record-response/record-response.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
const firebaseConfig = {
  apiKey: "AIzaSyA928ZKSaKCr7ZCBJ8hP9s12VQdsvrQgq0",
  authDomain: "asl-lex.firebaseapp.com",
  databaseURL: "https://asl-lex.firebaseio.com",
  projectId: "asl-lex",
  storageBucket: "asl-lex.appspot.com",
  messagingSenderId: "901529002834"
};

@NgModule({
  declarations: [AppComponent, DashboardComponent, RecordSessionComponent, ViewReferenceComponent, RecordResponseComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
