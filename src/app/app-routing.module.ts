import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SortComponent,
        SearchComponent,
        ParenthesisMatchingComponent,
        StringPermutationComponent,
        PalindromicComponent, 
        AnagramComponent,
        SingleLinkedListComponent} from './components/index.components';

const routes: Routes = [
    { path: '', component: SortComponent },
    { path: 'sort', component: SortComponent },
    { path: 'search', component: SearchComponent },
    { path: 'parenthesisMatching', component: ParenthesisMatchingComponent },
    { path: 'stringPermutation', component: StringPermutationComponent },
    { path: 'palindromic', component: PalindromicComponent },
    { path: 'anagram', component: AnagramComponent },
    { path: 'singleLinkedList', component: SingleLinkedListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
