import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-linked-list',
  templateUrl: './single-linked-list.component.html',
  styleUrls: ['./single-linked-list.component.scss']
})
export class SingleLinkedListComponent implements OnInit {

    linkedList = [];

    constructor() { }

    ngOnInit() {
        this.initList();
    }

    initList() {
        for (let x = 5; x <= 50; x = x + 5) {
            this.linkedList.push({
                value: x,
                link: {
                    value: x === 50 ? null : x + 5,
                    status: ''
                }
            });
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async start() {
        let prev = null;
        let current = null;
        let next = null;
        for (let index = 0; index < this.linkedList.length; index++) {
            prev = this.linkedList[index - 1] ? this.linkedList[index - 1] : null;
            current = this.linkedList[index];
            next = this.linkedList[index + 1] ? this.linkedList[index + 1] : null;
            await this.sleep(800);
            this.linkedList[index].link.value = prev ? prev.value : null;
            this.linkedList[index].link.status = 'ready';
        }
    }
}
