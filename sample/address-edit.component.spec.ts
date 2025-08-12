import { AddressesService, AddressTypesService, AppScreenTextsService, ConstituentsService, ContactPointCategoryPurposesService, ContactPointPurposeMapsService, ContextInformationService, CountriesService, IFormattedAddress, IState, MenuItemsService, PostalCodeLookupsService, SalutationsService, SalutationTypesService, SecurityObjectPermissionsService, SecurityUserGroupsService, SERVER_TIME_ZONE, StatesService, UserPreferencesService } from 'tn-api';
import { AddressEditComponent } from './address-edit.component';
import { ConstituentSnapshotService } from '../../../shared/services/constituent-snapshot.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { APP_BASE_HREF } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AppLabelService } from '../../../core/services/app-label.service';
import { ConfirmService } from '../../../shared/components/confirm-modal/confirm.service';
import { DesignVariables } from '../../../shared/utils/DesignVariables';
import { NotificationService } from '@progress/kendo-angular-notification';
import { AppNotificationService } from '../../../core/services/app-notification.service';
import { EnvironmentServiceMock } from '../../../../testing/mocks/environment.service.mock';
import { EnvironmentService } from '../../../core/services/environment.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ConstituentMother } from '../../../../testing/object-mothers/crm/constituent-mother';
import { TessituraTextboxComponent } from '../../../shared/components/form-controls/tessitura-textbox.component';
import { TessituraDateComponent } from '../../../shared/components/form-controls/tessitura-date.component';
import { TessituraTextareaComponent } from '../../../shared/components/form-controls/tessitura-textarea.component';
import { TessituraSwitchComponent } from '../../../shared/components/form-controls/tessitura-switch.component';
import { TessituraSingleSelectDropdownComponent } from '../../../shared/components/form-controls/tessitura-singleselect-dropdown.component';
import { osbornFamilyDisplayNameMap } from '../../../../testing/object-mothers/crm/data/osbornDisplayNames';
import { AddressModel } from './address.model';
import { TessituraTokenDropdownComponent } from '../../../shared/components/form-controls/tessitura-token-dropdown.component';
import { AppMenuService } from '../../../core/services/app-menu-service';
import { TessituraMaskedComponent } from '../../../shared/components/form-controls/tessitura-masked.component';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { HistoryService } from '../../../core/services/history.service';
import { TessituraButtonComponent } from '../../../shared/components/form-controls/tessitura-button/tessitura-button.component';
import { LabelComponent } from '../../../shared/components/label/label.component';
import { TooltipDirective } from '@progress/kendo-angular-tooltip';
import { TessituraRadioButtonComponent } from '../../../shared/components/form-controls/tessitura-radio-button.component';
import { DefaultsService } from 'app/core/services/defaults.service';
import { MockPipe } from 'ng-mocks';
import { TessituraComponentDataTestIdPipe } from '../../../shared/pipes/data-testids/tessitura-component-data-testid.pipe';

describe('AddressEditComponent', () => {

    let component: AddressEditComponent;
    let fixture: ComponentFixture<AddressEditComponent>;
    let el: Element;
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AddressEditComponent,
                TessituraMaskedComponent,
                TessituraTextboxComponent,
                TessituraDateComponent,
                TessituraTokenDropdownComponent,
                TessituraTextareaComponent,
                TessituraSwitchComponent,
                TessituraSingleSelectDropdownComponent,
                PageLayoutComponent,
                TessituraButtonComponent,
                TessituraRadioButtonComponent,
                TooltipDirective,
                LabelComponent],
            imports: [FormsModule, RouterTestingModule, HttpClientTestingModule, MockPipe(TessituraComponentDataTestIdPipe)],
            providers: [
                {provide: APP_BASE_HREF, useValue: '/'},
                {provide: EnvironmentService, useClass: EnvironmentServiceMock}, {provide: SERVER_TIME_ZONE, useValue: 'America/Denver'},
                {provide: ActivatedRoute, useValue: {data: of({menuId: 1}), parent: {snapshot: {params: {constituentId: '1006'}}}, params: of()}},
                AppLabelService,
                AddressesService,
                AddressTypesService,
                SalutationTypesService,
                CountriesService,
                StatesService,
                ConstituentsService,
                HistoryService,
                AppMenuService,
                ConstituentSnapshotService,
                UserPreferencesService,
                ContextInformationService,
                DesignVariables,
                SecurityObjectPermissionsService,
                SecurityUserGroupsService,
                AppScreenTextsService,
                ConfirmService,
                NotificationService,
                AppNotificationService,
                SalutationsService,
                DefaultsService,
                ContactPointCategoryPurposesService,
                ContactPointPurposeMapsService,
                HttpTestingController,
                MenuItemsService,
                PostalCodeLookupsService
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AddressEditComponent);
        component = fixture.componentInstance;
        component.setObjectPermissions({HasCreateRights: true, HasDeleteRights: true, HasEditRights: true, HasViewRights: true, Id: 1});
        component.entity = {Id: -999, Constituent: ConstituentMother.osbornFamily, EditIndicator: true};
        component.model = {
            Address: component.entity,
            ConstituentDisplayName: osbornFamilyDisplayNameMap[1006]
        } as AddressModel; // TODO - Delete if not using model
        component.constituentSnapshot = ConstituentMother.osbornFamily;
        component.addressLoaded = true;
        fixture.detectChanges();
        el = fixture.nativeElement;
    });
    it('should be created', () => {
        expect(component).toBeTruthy();
        expect(el.innerHTML).toContain('Adding New Address');
        expect(el.innerHTML).toContain('OWNED BY: Osborn Family');
        component.entity.Id = 10;
        fixture.detectChanges();
        expect(el.innerHTML).toContain('Editing Address:');
        expect(el.innerHTML).toContain('OWNED BY: Osborn Family');
    });
    it('should enable disable actions buttons based on constituent active status', () => {
        expect(component).toBeTruthy();
        expect(component.canEdit()).toBeTruthy();
        const p = el.querySelector('button#save-and-close') as HTMLButtonElement;
        expect(p.textContent).toContain('Save & close');
        expect(p.disabled).toBeFalsy();
        component.constituentSnapshot = ConstituentMother.inactiveOsbornFamily;
        fixture.detectChanges();
        expect(p.disabled).toBeTruthy();
    });
    it('should enable disable action buttons based on entity edit indicator', () => {
        expect(component).toBeTruthy();
        expect(component.canEdit()).toBeTruthy();
        const p = el.querySelector('button#save-and-close') as HTMLButtonElement;
        expect(p.textContent).toContain('Save & close');
        expect(p.disabled).toBeFalsy();
        component.entity.EditIndicator = false;
        fixture.detectChanges();
        expect(p.disabled).toBeTruthy();
    });
    it('should enable disable action buttons based on constituent protection type', () => {
        expect(component).toBeTruthy();
        expect(component.canEdit()).toBeTruthy();
        const p = el.querySelector('button#save-and-close') as HTMLButtonElement;
        expect(p.textContent).toContain('Save & close');
        expect(p.disabled).toBeFalsy();
        component.constituentSnapshot = ConstituentMother.protectedOsbornFamily;
        fixture.detectChanges();
        expect(p.disabled).toBeTruthy();
    });
    it('should enable disable action buttons based on object permissions', () => {
        expect(component).toBeTruthy();
        expect(component.canEdit()).toBeTruthy();
        const p = el.querySelector('button#save-and-close') as HTMLButtonElement;
        expect(p.textContent).toContain('Save & close');
        expect(p.disabled).toBeFalsy();
        component.setObjectPermissions({Id: 1, HasCreateRights: false, HasEditRights: true, HasDeleteRights: true, HasViewRights: true});
        fixture.detectChanges();
        expect(p.disabled).toBeTruthy();
    });
    it('should auto format address', () => {
        const mockState: IState = { Id: 1, Description: 'Mock State' };
        const mockAddress: IFormattedAddress = {
            Street1: '123 Main St',
            Street2: 'Apt 4B',
            Street3: 'Street3',
            City: 'Mock City',
            State: mockState,
            PostalCode: '12345',
            Country: { Id: 1, Description: 'Mock Country' }
        };

        component.addressAutoFormatted(mockAddress);

        expect(component.entity.Street1).toBe(mockAddress.Street1);
        expect(component.entity.Street2).toBe(mockAddress.Street2);
        expect(component.entity.Street3).toBe(mockAddress.Street3);
        expect(component.entity.City).toBe(mockAddress.City);
        expect(component.entity.State).toBe(mockAddress.State);
        expect(component.entity.PostalCode).toBe(mockAddress.PostalCode);
        expect(component.entity.Country).toBe(mockAddress.Country);
    });
});
