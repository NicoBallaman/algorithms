import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-string-permutation',
  templateUrl: './string-permutation.component.html',
  styleUrls: ['./string-permutation.component.scss']
})
export class StringPermutationComponent implements OnInit {
    displayedColumns: string[] = ['Item'];
    data =  [];

    str = '';
    lengthString = 4;

    constructor() {
        this.getRandomString();
    }

    ngOnInit() {
    }

    getRandomString() {
        this.data = [];
        this.str = Math.random().toString(36).substr(2, this.lengthString).toUpperCase();
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async startPermutation() {
        this.data = [];
        const temp = await this.generatePermutation(this.str);
        for (let index = 0; index < temp.length; index++) {
            await this.sleep(250);
            this.data.push(temp[index]);
        }


    }

    generatePermutation(str: string) {
        if (str.length === 1) {
            return [str];
        }
        let all = [];
        for (let i = 0; i < str.length; i++) {
            const currentLetter = str[i];
            const remainingLetters = str.slice(0, i) + str.slice(i + 1);
            const permsOfRemainingLetters = this.generatePermutation(remainingLetters);
            permsOfRemainingLetters.forEach(subPerm => {
                all.push(currentLetter + subPerm);
            });
        }
        return all;
    }

}
