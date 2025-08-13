// Generic sample component demonstrating API service usage patterns
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { 
    UserService,
    ProductService,
    OrderService,
    NotificationService,
    IUser,
    IProduct,
    IOrder
} from 'your-api-module';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
    @Input() userId: number;
    @Output() profileUpdated = new EventEmitter<IUser>();

    user: IUser;
    products: IProduct[] = [];
    orders: IOrder[] = [];
    isLoading = false;

    constructor(
        private userService: UserService,
        private productService: ProductService,
        private orderService: OrderService,
        private notificationService: NotificationService
    ) {}

    ngOnInit() {
        this.loadUserProfile();
        this.loadUserProducts();
        this.loadRecentOrders();
    }

    loadUserProfile() {
        this.isLoading = true;
        this.userService.GetProfile(this.userId).subscribe(
            user => {
                this.user = user;
                this.isLoading = false;
            },
            error => {
                this.notificationService.ShowError('Failed to load user profile');
                this.isLoading = false;
            }
        );
    }

    loadUserProducts() {
        this.productService.GetByUser(this.userId).subscribe(
            products => {
                this.products = products;
            }
        );
    }

    loadRecentOrders() {
        this.orderService.GetRecent(this.userId, 10).subscribe(
            orders => {
                this.orders = orders;
            }
        );
    }

    updateProfile(userData: IUser) {
        this.userService.UpdateProfile(this.userId, userData).subscribe(
            updatedUser => {
                this.user = updatedUser;
                this.profileUpdated.emit(updatedUser);
                this.notificationService.ShowSuccess('Profile updated successfully');
            },
            error => {
                this.notificationService.ShowError('Failed to update profile');
            }
        );
    }

    deleteUser() {
        if (confirm('Are you sure you want to delete this user?')) {
            this.userService.Delete(this.userId).subscribe(
                () => {
                    this.notificationService.ShowSuccess('User deleted successfully');
                }
            );
        }
    }

    refreshData() {
        this.userService.RefreshCache();
        this.productService.RefreshCache();
        this.loadUserProfile();
        this.loadUserProducts();
    }

    exportUserData() {
        this.userService.ExportData(this.userId).subscribe(
            data => {
                // Handle export
                this.notificationService.ShowInfo('Export completed');
            }
        );
    }
}
