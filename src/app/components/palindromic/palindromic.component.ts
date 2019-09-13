import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-palindromic',
  templateUrl: './palindromic.component.html',
  styleUrls: ['./palindromic.component.scss']
})
export class PalindromicComponent implements OnInit {

    str = '';
    lengthString = 4;
    values = [];
    palindromic = [];
    subsequences = [
        'adbbca',
        'adbgcfbea',
        'adbbcca',
        'pqrrqp',
    ];

    constructor() {
    }

    ngOnInit() {
    }

    getRandomString() {
        this.str = this.subsequences[Math.floor(Math.random() * this.subsequences.length)];
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async start() {
        this.getRandomString();
        this.values = await this.initArray(this.str);
        await this.getPalindromic(this.values);
        await this.buildPalindromic();
    }

    async initArray(str: string) {
        let arr = [];
        for (let i = 0; i < str.length; i++) {
            let temp = [];
            for (let j = 0; j < str.length; j++) {
                let item = {
                    value: 0,
                    xValue: str.charAt(j),
                    yValue: str.charAt(i),
                    xIndex: j,
                    yIndex: i,
                    check: true,
                    status: 'block'
                };
                if ( j >= i) {
                    item.check = false;
                    item.status = 'waiting';
                    if ( j === i) {
                        item.check = true;
                        item.value = 1;
                        item.status = 'start';
                    }
                }
                temp.push(item);
            }
            arr.push(temp);
        }
        return arr;
    }

    async getPalindromic(arr: any[]) {
        this.values = arr;
        let flagEnd = true;
        for (const row of this.values) {
            let nextRow = false;
            // tslint:disable-next-line:prefer-for-of
            for (let x = 0; x < row.length; x++) {
                if (!row[x].check) {
                    flagEnd = false;
                    if (nextRow) {
                        break;
                    }
                    row[x].status = 'active';
                    await this.sleep(5);
                    // await this.sleep(600);
                    row[x].status = 'block';
                    const element = row[x];
                    let tempValue = 0;
                    if (element.xValue === element.yValue) {
                        tempValue = 2 + this.values[element.yIndex + 1][element.xIndex - 1].value;
                    } else {
                        tempValue = Math.max(
                                        this.values[element.yIndex][element.xIndex - 1].value,
                                        this.values[element.yIndex + 1][element.xIndex].value
                                    );
                    }
                    row[x].value = tempValue;
                    row[x].check = true;
                    nextRow = true;
                }
            }
        }
        if (!flagEnd) {
            await this.getPalindromic(this.values);
        }
    }

    async buildPalindromic() {
        const lengthPalindromic: number = this.values[0][this.values[0].length - 1].value;
        this.palindromic = [];
        let col: number = this.values[0].length;
        let start = 0;
        let end = lengthPalindromic - 1;
        for (const row of this.values) {
            // tslint:disable-next-line:prefer-for-of
            for (let x = col - 1; x >= 0; x--) {
                if (end === start) { // last position
                    for (let j = x; j > 0; j--) {
                        if (row[j].xValue === row[j].yValue) {
                            this.palindromic[start] = row[j].xValue;
                            break;
                        }
                    }
                    return;
                } else {
                    if (row[x].xValue === row[x].yValue) {
                        this.palindromic[start] = row[x].xValue;
                        this.palindromic[end] = row[x].xValue;
                        start ++;
                        end --;
                        if ((end - start) < 0) {
                            return;
                        }
                    }
                }
                break;
            }
            col--;
        }


    }
}
