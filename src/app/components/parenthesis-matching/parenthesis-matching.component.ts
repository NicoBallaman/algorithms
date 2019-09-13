import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material';

@Component({
  selector: 'app-parenthesis-matching',
  templateUrl: './parenthesis-matching.component.html',
  styleUrls: ['./parenthesis-matching.component.scss']
})
export class ParenthesisMatchingComponent implements OnInit {

    verticalPosition: MatSnackBarVerticalPosition = 'top';
    functionsExamples = [
        '[ 1 + 2 - ( 5 * 5 ) - ( 5 / 2 ) ]',
        '( 1 + 2 -  { 5 / 2 } )',
        '[ 25 / { 25 * ( 25 - 350 ) } ]',
        '{ 85 - 251 + ( 55 * 2 ) }',
        '259 + ( 65 / 5 ) - [ 5 * 27 ]',
        '{ 256 * [ 25 - ( 6 * (24 - 19 ) ) + 52 ]',
        '[ ( 5 * 6 ) / [ { 14 * 2 } - { 52 / 6 } - 5 ] ]',
        '88 - { 5 - (85 * 593) }',
        '( 15 - ( ( 584 / 4 ) / 52 ) )',
        '[ 52 * { 526 / ( 52 * 6 ) } ]',
        '( [ 99 - 52 ] * [ 85 / 18 ] )',
        '[ { 52 * 859 } + ( 2 * { 52 - 6 } ) ]',
        '{ { 984 / 26 } - { 84 * { 259 + 452 } } }',
        '[ [ 854 - [ 25 * 9 ]] / [ 29 * 9 ] ]',
        '( [ 258 * 6 ] - [ 147 * 5 ] )',
        '( 50 * 56 ) - 2 { 95 / 5 } )',
        '{ 85 { 15 * 95 } - [ 59 - 48 } / 5 ]',
        '[ 8 * [ 859 - [ 48 * 4 ] - [ 48 / 5 ] + 59 ]',
        '{ 38 { 18 * 85 } - { 48 * { 18 - 95 } * 2 }',
        '( 17 - ( 48 * 9 ) / ( 38 * ( 48 / 4 ) - 9 )',
        '135 - ( 78 - { 48 / [ 48 + 485 } )',
        '{ 485 [ 48 - 849 } ]',
        '[ 384 / [ 185 - [ 485 / 6 ] * 2 ]',
        '( ( 485 / 9 ) * 12 ] - 846 )',
        '{ ( 185 - 9 ) + ( 451 / 486 } )',
        '( [ 185 * 956 ] / ( 485 - 1584 )',
        '[ ( 125 - { 48 * 48 ) ]',
        '{ [ 142 * 485 ] - ( 155 * 12 } }',
        '( 154 / [ - 1 * { 184 - 134 ] )',
        '[ { 264 * 7 } / { 15 * ( 154 / 6 ) ]',
    ];
    functionSelected = '';
    functionArray = [];
    functionValidators = [
        {
            open: '(',
            close: ')'
        },
        {
            open: '{',
            close: '}'
        },
        {
            open: '[',
            close: ']'
        }
    ];

    constructor(private snackBar: MatSnackBar) {
        this.getRandomFunction();
    }

    ngOnInit() {
    }

    getRandomFunction() {
        this.functionSelected = this.functionsExamples[Math.floor(Math.random() * this.functionsExamples.length)];
        this.functionArray = [];
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async checkFunction() {
        this.functionArray = [];
        let stack = [];
        if (this.functionSelected !== '') {
            for (let i = 0; i < this.functionSelected.length; i++) {
                const item = {
                    value: this.functionSelected.charAt(i),
                    color: '#cacaca',
                    active: false
                };
                if (this.functionSelected.charAt(i) !== ' ') {
                    this.functionArray.push(item);
                }
            }
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < this.functionArray.length; i++) {
                this.functionArray[i].color = '#252525';
                this.functionArray[i].active = true;
                await this.sleep(250);
                const validator = this.functionValidators.find(
                    x => x.open === this.functionArray[i].value || x.close === this.functionArray[i].value );
                if (validator) {
                    if (validator.open === this.functionArray[i].value ) { // OPEN: ADD IN STACK
                        stack.push(this.functionArray[i].value);
                        this.functionArray[i].color = '#3f51b5';
                    } else { // CLOSE: VALIDATE AND REMOVE ITEM OF STACK
                        const lastItem = stack[stack.length - 1];

                        if (lastItem === validator.open) {
                            stack.pop();
                            this.functionArray[i].color = '#3f51b5';
                        } else {
                            this.functionArray[i].color = '#dc3545';
                            this.showResult('This function isn\'t valid!');
                            return;
                        }
                    }
                }
                this.functionArray[i].active = false;
            }
            this.showResult('This function is valid!');
        }
    }

    showResult(message: string) {
        this.snackBar.open(message, 'X' , {
            duration: 3000,
            verticalPosition: this.verticalPosition
        });
    }
}
