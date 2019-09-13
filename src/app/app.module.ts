import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material.module';
import { SearchComponent,
        SidenavComponent,
        SortComponent,
        ParenthesisMatchingComponent,
        StringPermutationComponent,
        PalindromicComponent } from './components/index.components';
import { FormsModule } from '@angular/forms';
import { DeviceDetectorModule } from 'ngx-device-detector';


@NgModule({
    declarations: [
        AppComponent,
        SearchComponent,
        SidenavComponent,
        SortComponent,
        ParenthesisMatchingComponent,
        StringPermutationComponent,
        PalindromicComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        AngularMaterialModule,
        DeviceDetectorModule.forRoot()
    ],
    entryComponents: [],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
