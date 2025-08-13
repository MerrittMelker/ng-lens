import { Component, OnInit } from '@angular/core';
import {
    DashboardService,
    AnalyticsService,
    IDashboardData,
    IAnalytics
} from 'your-api-module';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    dashboardData: IDashboardData;
    analytics: IAnalytics;
    isLoading = true;

    constructor(
        private dashboardService: DashboardService,
        private analyticsService: AnalyticsService
    ) {}

    ngOnInit() {
        this.loadDashboard();
        this.loadAnalytics();
    }

    loadDashboard() {
        this.dashboardService.GetData().subscribe(data => {
            this.dashboardData = data;
            this.isLoading = false;
        });
    }

    loadAnalytics() {
        this.analyticsService.GetSummary().subscribe(analytics => {
            this.analytics = analytics;
        });
    }

    refreshData() {
        this.isLoading = true;
        this.dashboardService.RefreshCache();
        this.loadDashboard();
    }
}
