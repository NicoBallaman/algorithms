import { Component, OnInit } from '@angular/core';

enum Status  {
    ordered,
    disordered,
    active
}

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})


export class SortComponent implements OnInit {

    lengthArray = 100;
    maxValueArray = 600;
    array = [];
    sorting = false;
    isSorted = false;

    ngOnInit() {
        this.fillArray();
    }

    fillArray() {
        this.array = [];
        for (let i = 0; i < this.lengthArray; i++) {
            this.array.push({
                value: this.getRandom(this.maxValueArray),
                status: Status.disordered
            });
        }
    }

    getRandom(max) {
        return Math.round(Math.random() * (max));
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /* BUBBLE SORT */

    async bubbleSort() {
        this.fillArray();
        this.sorting = true;
        for (let i = 0; i < this.array.length - 1; i++) {
          for (let j = 0; j < this.array.length - i - 1; j++) {
            this.array[j].status = 1; // Status.disordered;
            this.array[j + 1].status = 2; // Status.active;

            if (this.array[j + 1].value < this.array[j].value) {
              const temporaryValue = this.array[j + 1].value;
              this.array[j + 1].value = this.array[j].value;
              this.array[j].value = temporaryValue;
            }
            await this.sleep(20);
          }
        }
        this.isSorted = true;
        this.sorting = false;
    }

    /* BUBBLE SORT */

    /* MERGE SORT */

    async mergeSort() {
        this.sorting = true;
        this.fillArray();
        const n = this.array.length;
        await this.splitAndSort(this.array, 0 , n - 1);
        this.sorting = false;
    }

    async splitAndSort(arr: any[], left: number, right: number) {
        if (left < right) {
            // Encuentra el punto medio del vector.
            const middle = Math.floor((left + right) / 2);

            // Divide la primera y segunda mitad (llamada recursiva).
            await this.splitAndSort(arr, left, middle);
            await this.splitAndSort(arr, middle + 1, right);

            // Une las mitades.
            await this.merge(arr, left, middle, right);
        }
    }

    async merge(arr: any[], left: number, middle: number, right: number) {
        const n1: number = middle - left + 1;
        const n2: number = right - middle;
        const leftArray: any[] = [n1];
        const rightArray: any[] = [n2];
        let i = 0;
        let j = 0;
        for (i = 0; i < n1; i++) {
            leftArray[i] = arr[left + i];
        }
        for (j = 0; j < n2; j++) {
            rightArray[j] = arr[middle + j + 1];
        }
        i = 0;
        j = 0;
        let k = left;

        // Ordenamiento.
        while (i < n1 && j < n2) {
            await this.sleep(20);
            if (leftArray[i].value <= rightArray[j].value) {
                arr[k] = leftArray[i];
                i++;
            } else {
                arr[k] = rightArray[j];
                j++;
            }
            k++;
        }
        while (i < n1) {
            arr[k] = leftArray[i];
            i++;
            k++;
        }
        while (j < n2) {
            arr[k] = rightArray[j];
            j++;
            k++;
        }
    }

    /* END MERGE SORT */

    /* QUIK SORT */
    // tslint:disable-next-line:member-ordering
    lastElement = {};
    async quikSort() {
        this.fillArray();
        this.lastElement = this.array[0];
        this.array = await this.quik(this.array);
    }

    async quik(arr: any[]) {
        if (arr.length === 0) {
            return [];
        }
        const pivot = arr[0];
        let left = [];
        let right = [];
        for (let i = 1; i < arr.length; i++) {
            await this.sleep(10);
            if (arr[i].value >= pivot.value) {
                right.push(arr[i]);
            } else {
                left.push(arr[i]);
            }
        }
        this.array.find(x => x === pivot).status = 2;
        return [].concat(await this.quik(left), pivot, await this.quik(right));
    }

    /* END QUIK SORT */

    /* HEAP SORT */

    async heapSort() {
        this.fillArray();
        const n = this.array.length;
        await this.sort(this.array);
    }

    async sort(arr: any[]) {
        const n = arr.length;
        for (let i = n / 2 - 1; i >= 0; i--) {
            this.heapify(arr, n, i);
        }
        for (let i = n - 1; i >= 0; i--) {
            const temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            this.array = await this.heapify(arr, i, 0);
        }
    }

    async heapify(arr: any[], n: number, i: number) {
        let largest = i;
        const l = 2 * i + 1;
        const r = 2 * i + 2;
        if (l < n && arr[l].value > arr[largest].value) {
            largest = l;
        }
        if (r < n && arr[r].value > arr[largest].value) {
            largest = r;
        }
        if (largest !== i) {
            const swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;
            await this.heapify(arr, n, largest);
        } else {
            return arr;
        }
    }
    /* END HEAP SORT */


}

