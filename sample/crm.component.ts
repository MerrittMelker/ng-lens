import { ConstituentNavigationComponent } from '../shell/constituent-navigation/constituent-navigation.component';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DesignVariables } from '../shared/utils/DesignVariables';
import { AppLinkService } from '../core/services/app-link.service';
import { HeaderCommunicationService } from '../shared/services/header-communication.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-crm',
    templateUrl: './crm.component.html',
    styleUrls: ['./crm.component.scss']
})
export class CRMComponent implements OnInit, OnDestroy {

    hideMenuPanel = false;
    headerHeight = '0px';
    @ViewChild('constituentNavigation', {static: true}) constituentNavigation: ConstituentNavigationComponent;
    private headerCommSubscription: Subscription;

    constructor(
        private router: Router,
        public appLinkService: AppLinkService,
        private headerCommunicationService: HeaderCommunicationService,
        public designVariables: DesignVariables) {

    }

    public ngOnInit() {
        this.headerCommSubscription = this.headerCommunicationService.collapsed$.subscribe(() => {
            this.hideMenuPanel = !this.hideMenuPanel;
        });
    }

    ngOnDestroy(): void {
        this.headerCommSubscription?.unsubscribe();
    }
}
