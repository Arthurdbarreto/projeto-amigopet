import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/models';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule, TableModule, ButtonModule, InputTextModule,
    InputTextarea, InputNumberModule, DialogModule, ConfirmDialogModule,
    ToastModule, FormsModule, ReactiveFormsModule
  ],
  providers: [ConfirmationService, MessageService],
  template: `
    <div class="amigopet-page">
      <section class="module-hero module-hero--product">
        <div class="module-hero__copy">
          <span class="module-eyebrow"><i class="pi pi-shopping-bag"></i> Produtos</span>
          <h1>Gerenciamento de Produtos</h1>
          <p>Controle itens, precos e estoque com uma visao mais clara dos produtos da loja.</p>
        </div>
        <img src="assets/images/produtos-img.jpeg" alt="Produtos AmigoPet" />
      </section>

      <div class="amigopet-card">
        <div class="module-toolbar">
          <div>
            <span class="module-eyebrow"><i class="pi pi-box"></i> Estoque e produtos</span>
            <h2>Produtos cadastrados</h2>
          </div>
          <button pButton label="Novo Produto" icon="pi pi-plus" (click)="openNew()"></button>
        </div>

        <p-table [value]="products()" [rows]="10" [paginator]="true" [loading]="loading()" responsiveLayout="scroll">
          <ng-template pTemplate="header">
            <tr>
              <th>Nome</th>
              <th>Descricao</th>
              <th>Estoque</th>
              <th>Preco</th>
              <th style="width: 10rem">Acoes</th>
            </tr>
          </ng-template>
          <ng-template pTemplate="body" let-product>
            <tr>
              <td><i class="pi pi-shopping-bag table-icon"></i>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td [ngClass]="{'text-red-500 font-bold': product.stock < 10}">
                <i class="pi pi-box table-icon"></i>{{ product.stock }}
              </td>
              <td>{{ product.price | currency:'BRL' }}</td>
              <td>
                <div class="flex gap-2">
                  <button pButton icon="pi pi-pencil" class="p-button-text" (click)="editProduct(product)"></button>
                  <button pButton icon="pi pi-trash" class="p-button-text p-button-danger" (click)="deleteProduct(product)"></button>
                </div>
              </td>
            </tr>
          </ng-template>
          <ng-template pTemplate="emptymessage">
            <tr>
              <td colspan="5">
                <div class="empty-state">
                  <i class="pi pi-shopping-bag"></i>
                  <strong>Nenhum produto cadastrado ainda</strong>
                  <span>Adicione produtos para acompanhar precos e estoque.</span>
                </div>
              </td>
            </tr>
          </ng-template>
        </p-table>
      </div>

      <p-dialog [(visible)]="productDialog" [style]="{width: '450px'}" [header]="product.id ? 'Editar Produto' : 'Novo Produto'" [modal]="true" styleClass="p-fluid">
        <ng-template pTemplate="content">
          <form [formGroup]="productForm">
            <div class="field mb-3">
              <label for="name">Nome</label>
              <input type="text" pInputText id="name" formControlName="name" required />
            </div>
            <div class="field mb-3">
              <label for="description">Descricao</label>
              <textarea pInputTextarea id="description" formControlName="description" rows="3"></textarea>
            </div>
            <div class="field mb-3 grid">
              <div class="col-6">
                <label for="stock">Estoque</label>
                <p-inputNumber id="stock" formControlName="stock" [showButtons]="true" [min]="0"></p-inputNumber>
              </div>
              <div class="col-6">
                <label for="price">Preco</label>
                <p-inputNumber id="price" formControlName="price" mode="currency" currency="BRL" locale="pt-BR"></p-inputNumber>
              </div>
            </div>
          </form>
        </ng-template>

        <ng-template pTemplate="footer">
          <button pButton label="Cancelar" icon="pi pi-times" class="p-button-text" (click)="hideDialog()"></button>
          <button pButton label="Salvar" icon="pi pi-check" [disabled]="productForm.invalid" (click)="saveProduct()"></button>
        </ng-template>
      </p-dialog>

      <p-confirmDialog [style]="{width: '450px'}"></p-confirmDialog>
      <p-toast></p-toast>
    </div>
  `
})
export class ProductComponent implements OnInit {
  private productService = inject(ProductService);
  private fb = inject(FormBuilder);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  products = signal<Product[]>([]);
  loading = signal(false);
  productDialog = false;
  product: Partial<Product> = {};

  productForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]]
  });

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading.set(true);
    this.productService.getAll().subscribe({
      next: (res) => {
        this.products.set(res.products);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  openNew() {
    this.product = {};
    this.productForm.reset({ price: 0, stock: 0 });
    this.productDialog = true;
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productForm.patchValue(product as any);
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir ${product.name}?`,
      header: 'Confirmar Exclusao',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.delete(product.id!).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto excluido' });
            this.loadProducts();
          }
        });
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
  }

  saveProduct() {
    const data = this.productForm.value as Product;
    if (this.product.id) {
      this.productService.update(this.product.id, data).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto atualizado' });
          this.loadProducts();
          this.hideDialog();
        }
      });
    } else {
      this.productService.create(data).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Produto criado' });
          this.loadProducts();
          this.hideDialog();
        }
      });
    }
  }
}
