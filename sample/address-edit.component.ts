// Generic sample component demonstrating complex API service usage
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
    ProductService,
    CategoryService,
    InventoryService,
    ReviewService,
    PricingService,
    ShippingService,
    IProduct,
    ICategory,
    IInventoryItem,
    IReview,
    IPricing
} from 'your-api-module';
import { Observable, forkJoin } from 'rxjs';

@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent implements OnInit {
    @Input() productId: number = -1;
    @Output() productSaved = new EventEmitter<IProduct>();
    @ViewChild('editForm') editForm: NgForm;

    product: IProduct = { Id: -1 };
    categories: ICategory[] = [];
    inventory: IInventoryItem;
    reviews: IReview[] = [];
    pricing: IPricing;
    isLoading = false;
    isNewProduct = false;

    constructor(
        private productService: ProductService,
        private categoryService: CategoryService,
        private inventoryService: InventoryService,
        private reviewService: ReviewService,
        private pricingService: PricingService,
        private shippingService: ShippingService
    ) {}

    ngOnInit() {
        this.isNewProduct = this.productId === -1;
        this.loadInitialData();

        if (!this.isNewProduct) {
            this.loadExistingProduct();
        }
    }

    loadInitialData() {
        forkJoin([this.categoryService.GetAll(), this.pricingService.GetDefaults()]).subscribe(
            ([categories, defaultPricing]) => {
                this.categories = categories;
                this.pricing = defaultPricing;
            }
        );
    }

    loadExistingProduct() {
        this.isLoading = true;

        forkJoin([
            this.productService.GetById(this.productId),
            this.inventoryService.GetByProduct(this.productId),
            this.reviewService.GetByProduct(this.productId),
            this.pricingService.GetByProduct(this.productId),
        ]).subscribe(
            ([product, inventory, reviews, pricing]) => {
                this.product = product;
                this.inventory = inventory;
                this.reviews = reviews;
                this.pricing = pricing;
                this.isLoading = false;
            },
            () => {
                this.isLoading = false;
            }
        );
    }

    saveProduct() {
        if (!this.editForm.valid) {
            return;
        }

        const saveOperation = this.isNewProduct
            ? this.productService.Create(this.product)
            : this.productService.Update(this.productId, this.product);

        saveOperation.subscribe((savedProduct) => {
            this.updateInventory(savedProduct.Id);
            this.updatePricing(savedProduct.Id);
            this.productSaved.emit(savedProduct);
        });
    }

    updateInventory(productId: number) {
        if (this.inventory) {
            this.inventoryService.Update(productId, this.inventory).subscribe();
        }
    }

    updatePricing(productId: number) {
        if (this.pricing) {
            this.pricingService.Update(productId, this.pricing).subscribe();
        }
    }

    deleteProduct() {
        if (confirm('Delete this product?')) {
            this.productService.Delete(this.productId).subscribe(() => {
                this.inventoryService.Remove(this.productId);
                this.reviewService.DeleteByProduct(this.productId);
            });
        }
    }

    calculateShipping() {
        this.shippingService.Calculate(this.product).subscribe((cost) => {
            this.product.ShippingCost = cost;
        });
    }

    refreshCategories() {
        this.categoryService.RefreshCache().subscribe((categories) => {
            this.categories = categories;
        });
    }

    validateProduct() {
        return this.productService.Validate(this.product).subscribe((isValid) => {
            if (!isValid) {
                console.log('Product validation failed');
            }
        });
    }
}
