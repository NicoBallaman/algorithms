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
import { AnagramComponent } from './components/anagram/anagram.component';
import { SingleLinkedListComponent } from './components/single-linked-list/single-linked-list.component';


@NgModule({
    declarations: [
        AppComponent,
        SearchComponent,
        SidenavComponent,
        SortComponent,
        ParenthesisMatchingComponent,
        StringPermutationComponent,
        PalindromicComponent,
        AnagramComponent,
        SingleLinkedListComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        AngularMaterialModule
    ],
    entryComponents: [],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
