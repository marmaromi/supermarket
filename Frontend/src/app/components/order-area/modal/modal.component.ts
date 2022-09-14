import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ProductsInCartModel } from 'src/app/models/products-in-cart-model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
    @ViewChild('htmlData') htmlData!: ElementRef;
    public productsInCart: ProductsInCartModel[] | null = null;
    public finalPrice: number;
    constructor(public modalRef: MdbModalRef<ModalComponent>, private authService: AuthService) { }

    ngOnInit(): void {
        this.finalPrice = this.productsInCart?.reduce((acc, curr) => acc + curr.totalProductPrice, 0);            
    }

    public openPDF(): void {
        let DATA: any = document.getElementById('htmlData');
        DATA.setAttribute('display', 'show');
        html2canvas(DATA).then((canvas) => {
            let fileWidth = 208;
            let fileHeight = (canvas.height * fileWidth) / canvas.width;
            const FILEURI = canvas.toDataURL('image/png');
            let PDF = new jsPDF('p', 'mm', 'a4');
            let position = 0;
            PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
            PDF.save('receipt.pdf');
        });
        DATA.setAttribute('display','hidden');

    }

}
