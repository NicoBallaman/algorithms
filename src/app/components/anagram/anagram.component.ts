import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anagram',
  templateUrl: './anagram.component.html',
  styleUrls: ['./anagram.component.scss']
})
export class AnagramComponent implements OnInit {
    // STATUS
    // 0 inactive
    // 1 active
    // 2 match
    // 3 don't match

    lettersMatch = 0;
    lettersDontMatch = 0;
    str1 = [
        { value: 'H', status: 'inactive' },
        { value: 'E', status: 'inactive' },
        { value: 'L', status: 'inactive' },
        { value: 'L', status: 'inactive' },
        { value: 'O', status: 'inactive' }
    ];

    str2 = [
        { value: 'B', status: 'inactive' },
        { value: 'I', status: 'inactive' },
        { value: 'L', status: 'inactive' },
        { value: 'L', status: 'inactive' },
        { value: 'O', status: 'inactive' },
        { value: 'N', status: 'inactive' }
    ];

    constructor() { }

    ngOnInit() {
    }

    initStr() {
        this.str1 = [
            { value: 'H', status: 'inactive' },
            { value: 'E', status: 'inactive' },
            { value: 'L', status: 'inactive' },
            { value: 'L', status: 'inactive' },
            { value: 'O', status: 'inactive' }
        ];
        this.str2 = [
            { value: 'B', status: 'inactive' },
            { value: 'I', status: 'inactive' },
            { value: 'L', status: 'inactive' },
            { value: 'L', status: 'inactive' },
            { value: 'I', status: 'inactive' },
            { value: 'O', status: 'inactive' },
            { value: 'N', status: 'inactive' }
        ];
    }

    async start() {
        this.initStr();
        this.lettersMatch = 0;
        this.lettersDontMatch = 0;
        // tslint:disable-next-line:prefer-for-of
        for (let x = 0; x < this.str1.length; x++) {
            const char = this.str1[x];
            this.str1[x].status = 'active';
            await this.sleep(1000);
            if (this.str2.find(y => y.value === char.value && y.status !== 'match')) {
                this.str1[x].status = 'match';
                this.str2.find(y => y.value === char.value && y.status !== 'match').status = 'match';
                this.lettersMatch++;
            } else {
                this.str1[x].status = 'dontmatch';
                this.lettersDontMatch ++;
            }
        }
        // tslint:disable-next-line:prefer-for-of
        for (let x = 0; x < this.str2.length; x++) {
            if (this.str2[x].status === 'inactive') {
                this.str2[x].status = 'active';
                await this.sleep(1000);
                this.lettersDontMatch ++;
                this.str2[x].status = 'dontmatch';
            }
        }

    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
