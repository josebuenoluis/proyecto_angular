import { Component, ElementRef, ViewChild } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Serializer } from '@angular/compiler';
import { IonRouterOutlet } from '@ionic/angular/standalone';
@Component({
  selector: 'app-create-document-component',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './create-document-component.component.html',
  styleUrls: ['./create-document-component.component.css'],
})
export class CreateDocumentComponentComponent {
  @ViewChild('quadro') table!: ElementRef;
  @ViewChild('quadroProduct') tableProduct!: ElementRef;
  @ViewChild('quadroSelect') tableSelect!: ElementRef;
  @ViewChild('searchInput') inputSearch!: ElementRef;
  rowsSelectedDocument: number[] = [];

  ngAfterViewInit(){
    let dateVenc = document.getElementById("data-venc") as HTMLInputElement;
    let dateStock = document.getElementById("data-stock") as HTMLInputElement;
    let currentDate = new Date().toISOString().substring(0, 10);
    dateVenc.value = currentDate;
    dateStock.value = currentDate;
  }

  clearTable() {
    const tableElement = this.table.nativeElement;
    const rows = tableElement.rows;
    while (rows.length > 2) {
      tableElement.deleteRow(1);
    }
    rows[1].cells[1].textContent = '0.00';
  }

  clearSelectTables() {
    let modalFade = document.querySelector(".modal-backdrop") as HTMLElement;
    document.querySelector("main")?.removeChild(modalFade);
    const tableSelect = this.tableSelect.nativeElement;
    const rowsSelect = tableSelect.rows;
    const tableProduct = this.tableProduct.nativeElement as HTMLTableElement;
    const rowsProduct = tableProduct.rows;
    while (rowsSelect.length > 2) {
      tableSelect.deleteRow(1);
    }
    rowsSelect[1].cells[1].textContent = '0.00';
    while (rowsProduct.length > 1) {
      tableProduct.deleteRow(1);
    }
    
    const searchInput = document.getElementById(
      'ref-add-product'
    ) as HTMLInputElement;
    searchInput.value = '';
  }

  calculateTotal() {
    let tableSelectHtml = this.tableSelect.nativeElement;
    let tbody = tableSelectHtml.querySelector('tbody');
    let tfoot = tableSelectHtml.querySelector('tfoot');
    let cellTotal = tfoot.querySelectorAll('tr')[0].cells[1];
    let rows = tbody.querySelectorAll('tr');
    let total = 0.0;
    for (let row = 0; row < rows.length; row++) {
      total += parseFloat(rows[row].cells[4].textContent);
    }
    cellTotal.textContent = total.toFixed(2);
  }

  productSearch() {
    let tableProduct = this.tableProduct.nativeElement;
    let tbody = tableProduct.querySelector('tbody');
    const searchInput = this.inputSearch.nativeElement;
    const inputValue = searchInput.value.toLowerCase();
    let rows = tbody.rows;
    for (let row = 0; row < rows.length; row++) {
      let rowProduct: HTMLTableRowElement = rows[row];
      let refRowProduct = rowProduct.cells[0].textContent?.toLowerCase() || '';
      if (!refRowProduct.includes(inputValue)) {
        rowProduct.style.display = 'none';
      } else {
        rowProduct.style.display = '';
      }
    }
  }

  saveProducts() {
    let tableSelectHtml = this.tableSelect.nativeElement;
    let tablaHTML = this.table.nativeElement;
    let tbody = tablaHTML.querySelector('tbody');
    const rows = tableSelectHtml.rows;
    const tbodyRows = tablaHTML.rows;
    for (let row = 1; row < rows.length - 1; row++) {
      let cellsSelected = rows[row].cells;
      let newRow = tbody.insertRow();
      newRow.onclick = (event: Event) => this.selectItem(event);
      let newCellIndex = document.createElement('th');
      newCellIndex.scope = 'row';
      newCellIndex.textContent = '';
      newRow.appendChild(newCellIndex);
      for (let cell = 0; cell < cellsSelected.length; cell++) {
        let newCell = document.createElement('td');
        if (!(rows[row].cells[cell].children[0] instanceof HTMLInputElement)) {
          if (cell >= 0 && cell < cellsSelected.length - 2) {
            newCell.textContent = rows[row].cells[cell].textContent;
          } else {
            newCell.textContent = ' ';
          }
        } else {
          const inputElement = rows[row].cells[cell].querySelector('input');
          if (inputElement) {
            newCell.textContent = inputElement.value;
          }
        }
        newRow.appendChild(newCell);
      }
    }

    for (let row = 1; row < tbodyRows.length - 1; row++) {
      let rowDocument = tbodyRows[row];
      rowDocument.cells[0].textContent = row.toString();
      let newCell = document.createElement('td');
      newCell.textContent = '';
      // Anadimos nueva celda del total
      // Debemos encontrar el total de la fila seleccionada
      // para este producto
      for (let rowSelect = 1; rowSelect < rows.length - 1; rowSelect++) {
        let refProductDocument = rowDocument.cells[1].textContent;
        let refProductSelect = rows[rowSelect].cells[0].textContent;
        if (refProductDocument == refProductSelect) {
          newCell.textContent = rows[rowSelect].cells[4].textContent;
          // Evaluar si ya existe una celda de total de producto
          // con la misma referencia de producto
          if (rowDocument.cells[7] == undefined) {
            rowDocument.appendChild(newCell);
          }
        }
      }
    }
    this.clearSelectTables();
    this.calculateTotal();
    this.calculateTotalTable();
  }

  selectItem(event: Event) {
    let rowSelect = (event.target as HTMLElement).closest(
      'tr'
    ) as HTMLTableRowElement;
    for (let cell = 0; cell < rowSelect.cells.length; cell++) {
      if (rowSelect.cells[cell].style.background != 'rgb(170, 190, 192)') {
        rowSelect.cells[cell].style.background = 'rgb(170, 190, 192)';
        if (this.rowsSelectedDocument.indexOf(rowSelect.rowIndex) == -1) {
          this.rowsSelectedDocument.push(rowSelect.rowIndex);
        }
      } else {
        rowSelect.cells[cell].style.background = '';
        if (this.rowsSelectedDocument.indexOf(rowSelect.rowIndex) != -1) {
          let positionRowSelect: number = this.rowsSelectedDocument.indexOf(
            rowSelect.rowIndex
          );
          this.rowsSelectedDocument.splice(positionRowSelect, 1);
        }
      }
    }
  }

  allProductTable() {
    let modalFade = document.querySelector(".modal-backdrop") as HTMLElement;
    if (modalFade) {
      const modalFadeCopy = modalFade.cloneNode(true) as HTMLElement;
      modalFade.remove();
      document.querySelector("main")?.appendChild(modalFadeCopy);

    }
    this.getProducts().then((response) => {
      let products = response[0].Table;
      let productTable = this.tableProduct.nativeElement;
      let tbody = productTable.querySelector("tbody");
      for (let item = 0; item < products.length; item++) {
        let newRow = tbody.insertRow();
        let cell1 = document.createElement('th');
        cell1.scope = 'col';
        newRow.appendChild(cell1);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);
        let cell5 = newRow.insertCell(4);

        cell1.textContent = products[item].KeyId;
        cell2.textContent = products[item].ShortName1;
        cell3.innerHTML = `<input type="number" value="0" min="0" class="form-control text-center">`;
        cell4.textContent = products[item].PurchasePrice;
        let button = document.createElement('button');
        button.onclick = (e) => this.selectProduct(e);
        button.className = 'btn border-0 btn-add-row m-0 p-0';
        button.id = 'add-product-' + products[item].KeyId;
        button.type = 'button';

        let icon = document.createElement('i');
        icon.className = 'bi bi-plus-circle text-success fs-3';
        button.appendChild(icon);
        cell5.appendChild(button);
      }
    });
  }

  calculateTotalTable() {
    let tableHTML = this.table.nativeElement;
    let tbody = tableHTML.querySelector('tbody');
    let tfoot = tableHTML.querySelector('tfoot');
    let cellTotal = tfoot.querySelectorAll('tr')[0].cells[1];
    let rows = tbody.querySelectorAll('tr');
    let total = 0.0;
    for (let row = 0; row < rows.length; row++) {
      total += parseFloat(rows[row].cells[7].textContent);
    }
    cellTotal.textContent = total.toFixed(2);
  }

  calculateTotalProduct(event: Event) {
    let tableSelectHtml = this.tableSelect.nativeElement;
    let tbody = tableSelectHtml.querySelector('tbody');
    const quantityInput = event.target as HTMLInputElement;
    const row = quantityInput.closest('tr') as HTMLTableRowElement;
    const price = row.cells[3].textContent;
    let quantity = parseInt(quantityInput.value);
    if (price) {
      let total = parseFloat(price) * quantity;
      row.cells[4].textContent = total.toFixed(2);
      this.calculateTotal();
    }
  }

  selectProduct(event: Event) {
    let tableSelectHtml = this.tableSelect.nativeElement;
    let tableProductHtml = this.tableProduct.nativeElement;
    let tbody = tableSelectHtml.querySelector('tbody');
    const button = event.target as HTMLElement;
    const row = button.closest('tr');
    if (row) {
      let clase = 'bi bi-dash-circle text-danger fs-3';
      const clonedRow = row.cloneNode(true) as HTMLTableRowElement;
      const lastCell = clonedRow.cells[clonedRow.cells.length - 1];
      const buttonElement = lastCell.querySelector('button') as HTMLElement;
      let existRow = tbody.querySelector('#' + buttonElement.id);
      if (existRow == null) {
        const priceText =
          clonedRow.cells[clonedRow.cells.length - 2].textContent;
        const price = priceText ? parseFloat(priceText) : 0;
        const quantityInput =
          clonedRow.cells[clonedRow.cells.length - 3].querySelector('input');
        if (quantityInput) {
          quantityInput.onchange = (e) => this.calculateTotalProduct(e);
        }
        const quantityText = quantityInput ? quantityInput.value : '0';
        const quantity = quantityText ? parseFloat(quantityText) : 0;
        let total = price * quantity;
        let cellTotal = document.createElement('td');
        cellTotal.textContent = total.toFixed(2);
        clonedRow.deleteCell(-1);
        clonedRow.appendChild(cellTotal);
        clonedRow.appendChild(lastCell);
        buttonElement.onclick = (e) => this.deleteProduct(e);
        const iconElement = buttonElement?.querySelector('i') as HTMLElement;
        iconElement.className = clase;
        tbody.appendChild(clonedRow);
        this.calculateTotal();
      }
    }
  }

  deleteProduct(event: Event) {
    let tableSelectHtml = this.tableSelect.nativeElement;
    let tableProductHtml = this.tableProduct.nativeElement;
    let tbody = tableSelectHtml.querySelector('tbody');
    const button = event.target as HTMLElement;
    const row = button.closest('tr');
    let position = row?.rowIndex;
    if (position) {
      position -= 1;
      tbody.deleteRow(position);
      this.calculateTotal();
    }
  }

  deleteRow() {
    let table = this.table.nativeElement;
    let tbody = table.querySelector('tbody');
    let selectedRows = this.rowsSelectedDocument.sort((rowA, rowB) => rowB - rowA);
    for (let rowIndex of selectedRows) {
      tbody.deleteRow(rowIndex - 1);
    }
    this.rowsSelectedDocument = [];
    this.calculateTotalTable();
  }

  getProducts(): Promise<any[]> {
    return fetch('http://localhost:5281/api/SalesDocument/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  getData(event: Event) {
    event.preventDefault();
    let dataForm: Object[] = [];
    let tablaHTML = this.table.nativeElement;
    const rows = tablaHTML.rows;
    const formElement = document.querySelector('form');
    if (formElement?.checkValidity()) {
      const formData = new FormData(formElement);
      formData.forEach((value, key) => {
        dataForm.push({ [key]: value });
      });

      if (tablaHTML) {
        let dataTable: Object[] = [];
        let headers: string[] = [];
        let headersHTML = tablaHTML.querySelectorAll('th');
        headersHTML.forEach((element: any) => {
          headers.push(element.textContent);
        });

        for (let row = 0; row < rows.length; row++) {
          let celdas = rows[row].cells;
          let datosFila: any = {};
          for (let cell = 0; cell < celdas.length; cell++) {
            if (celdas.length > 2) {
              datosFila[headers[cell]] = celdas[cell].innerText;
            } else {
              datosFila[celdas[cell].innerText] = celdas[cell + 1].innerText;
              break;
            }
          }
          dataTable.push(datosFila);
        }
        let table = { products: dataTable };
        dataForm.push(table);
      }

      if (dataForm) {
        if(rows.length > 2){

          fetch('http://localhost:5281/api/SalesDocument/create-document', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataForm),
        })
          .then((response) => response.json())
          .then((data) => {
            this.clearTable();
            location.reload();
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      } else {
        const alertContainer = document.querySelector(".alert-container") as HTMLElement;
        alertContainer.innerHTML = `
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
            Por favor, selecione um produto para continuar.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        `;
      }
    }
    } else {
      formElement!.reportValidity();
    }
  }
}

