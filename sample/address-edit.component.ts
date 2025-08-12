import { ISelectOption, ISingleSelectSettings } from '../../../shared/Domain';
import {
    AddressesService,
    AddressTypesService,
    ContactPointCategoryPurposesService,
    ContactPointPurposeMapsService,
    CountriesService,
    IAddress,
    IAddressTypeSummary,
    IConstituentSnapshot,
    IContactPointPurposeMap,
    IContactPointPurposeSummary,
    ICountry,
    ICountrySummary,
    IFormattedAddress,
    ISalutationTypeSummary,
    IStateSummary,
    PostalCodeLookupsService,
    SalutationsService,
    StatesService,
} from 'tn-api';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router, RouterStateSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { DeactivationGuarded } from '../../../shared/guards/can-deactivate-guard.service';
import { combineLatest, forkJoin, Observable, Observer, of, Subject, Subscription } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { ConfirmService } from '../../../shared/components/confirm-modal/confirm.service';
import { DesignVariables } from '../../../shared/utils/DesignVariables';
import { ConstituentSnapshotService } from '../../../shared/services/constituent-snapshot.service';
import { BaseCrmEditComponent } from '../base-crm-edit.component';
import { UserSessionService } from '../../../core/services/user-session.service';
import { AddressModel } from './address.model';
import { DateFormatService } from '../../../core/services/date-format.service';
import { AppNotificationService } from '../../../core/services/app-notification.service';
import { HistoryService } from '../../../core/services/history.service';
import { DefaultsService } from '../../../core/services/defaults.service';

@Component({
    selector: 'app-address-edit',
    templateUrl: './address-edit.component.html',
    styleUrls: ['./address-edit.component.scss'],
})
export class AddressEditComponent extends BaseCrmEditComponent<IAddress> implements DeactivationGuarded {
    @Output() public hideModal = new EventEmitter<boolean>();
    @Input() public isModal = false;
    @Input() public addressId = -999;
    @Input() public constituentObservable: Observable<IConstituentSnapshot>;
    @ViewChild('editForm') editForm: NgForm;

    model: AddressModel; // TODO - Delete if not using model
    addressTypeSummaries: IAddressTypeSummary[];
    salutationTypeSummaries: ISalutationTypeSummary[];
    countrySummaries: ICountrySummary[];
    stateSummaries: IStateSummary[];
    filteredStateSummaries: IStateSummary[];
    contactPoints: IContactPointPurposeSummary[];
    selectedPurposeSummaries: IContactPointPurposeSummary[] = [];
    monthsOptions: any[] = [];
    selectedMonths: ISelectOption[] = [];
    monthsList: any[] = [];
    streetOrder: number[] = [];
    radioButtonsModel: string;
    useStreet3 = '';
    addressLoaded = false;
    address: IAddress = { Id: -999 };
    requiredCity: boolean;
    requiredPostalCode: boolean;
    useStateField: string;
    postalCodeMask: string;
    // could use this input if we could figure out how to uppercase characters as they were typed
    //editMaskRules: { [key: string]: RegExp } = {a: /[0-9 A-Z]/, A: /[0-9A-Z]/, L: /[A-Za-z]/};
    selectedCountry: ICountry;
    settingsForSingle: ISingleSelectSettings;
    isoForSelectedCountry: string;
    postalCodeLength: number;
    paramSnapshotSubscription: Subscription;
    backText = 'Back to Addresses';
    countriesWithShortenedStateCodes = ['USA', 'AUS'];
    private initialContactPointPurposeMaps: IContactPointPurposeMap[] = [];
    private postalCodeChangeSubject: Subject<string> = new Subject<string>();
    private newState: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private title: Title,
        private addressesService: AddressesService,
        private addresstypesService: AddressTypesService,
        private countriesService: CountriesService,
        private statesService: StatesService,
        private postalCodeLookupsService: PostalCodeLookupsService,
        private confirmService: ConfirmService,
        private constituentSnapshotService: ConstituentSnapshotService,
        private salutationsService: SalutationsService,
        private defaultsService: DefaultsService,
        private dateFormatService: DateFormatService,
        private contactPointCategoryPurposesService: ContactPointCategoryPurposesService,
        private contactPointPurposeMapsService: ContactPointPurposeMapsService,
        userSessionService: UserSessionService,
        appNotificationService: AppNotificationService,
        public designVariables: DesignVariables,
        private historyService: HistoryService
    ) {
        super(userSessionService, appNotificationService, route);
        this.settingsForSingle = {
            modelIsIdProperty: false,
            canSelectInactiveItems: false,
        };
        this.subscribed.add(
            this.postalCodeChangeSubject
                .pipe(debounceTime(400))
                .subscribe((value: string) => this.postalCodeLookup(value))
        );
    }

    get headerText(): string {
        return this.entity?.Id === -999
            ? 'Adding New Address'
            : `${this.getEditingOrViewing()} Address: ${this.entity?.AddressType?.Description}`;
    }

    onInit() {
        if (this.historyService.getPreviousRoute().includes('dashboard')) {
            this.backText = 'Back to Overview';
        } else {
            this.backText = 'Back to Addresses';
        }

        const params$: Observable<Params> = this.isModal ? of({ id: this.addressId }) : this.route.params;
        const constituentSnapshot$ = this.isModal
            ? this.constituentObservable
            : this.constituentSnapshotService.snapshot$;

        this.subscribed.add(
            combineLatest([params$, constituentSnapshot$]).subscribe(
                async ([params, constituentSnapshot]) => {
                    await this.onSnapshotOrParamChange(params, constituentSnapshot);
                    try {
                        if (this.entity.Id === -999) {
                            this.title.setTitle('Constituents - Addresses - Adding');
                            const countryData: ICountry = await this.countriesService.GetDefault().toPromise();
                            this.entity.Country = {
                                Id: countryData.Id,
                                Description: countryData.Description,
                                Inactive: countryData.Inactive,
                            };
                            this.selectedCountry = countryData;
                            this.radioButtonsModel = 'Y';
                        } else {
                            const [address, purposeMaps] = await forkJoin([
                                this.addressesService.Get(this.entity.Id),
                                this.contactPointPurposeMapsService.GetAll(null, null, this.entity.Id, -1),
                            ]).toPromise();
                            this.entity = address;
                            this.initialContactPointPurposeMaps = purposeMaps;
                            this.selectedCountry = await this.countriesService.Get(this.entity.Country.Id).toPromise();
                            this.selectedPurposeSummaries = this.initialContactPointPurposeMaps.map((x) => x.Purpose);
                            this.title.setTitle(
                                `Constituents - Addresses - ${this.getEditingOrViewing()} ${this.entity.Description}`
                            );
                        }
                        this.monthsOptions = this.getMonthsOptions();
                        this.salutationsService
                            .GetAll(
                                this.entity.Id === -999 ? this.constituentSnapshot.Id : this.entity.Constituent.Id,
                                false
                            )
                            .subscribe((salutationSummaries) => {
                                this.salutationTypeSummaries = [];
                                for (const sal of salutationSummaries) {
                                    const salType = sal.SalutationType;
                                    salType.Description += ' - ' + sal.EnvelopeSalutation1;
                                    this.salutationTypeSummaries.push(salType);
                                }
                            });
                        this.statesService.GetSummaries().subscribe((stateSummaries) => {
                            if (this.countriesWithShortenedStateCodes.includes(this.isoForSelectedCountry)) {
                                stateSummaries.forEach(
                                    (state) => (state.Description = state.Description + ` (${state.StateCode})`)
                                );
                            }
                            this.stateSummaries = stateSummaries;
                            this.setCountryRules(this.selectedCountry);
                        });
                        this.model = this.constructModel(this.entity);
                        if (!this.isEntityConstituentAffiliated()) {
                            this.router.navigate(['.'], { relativeTo: this.route.parent }).then();
                            return;
                        }
                        if (this.entity.Id !== -999) {
                            this.setupDateData();
                        }
                        this.addressLoaded = true;
                    } catch (error) {
                        this.appNotificationService.error(error);
                    }
                },
                (error) => {
                    this.appNotificationService.error(error);
                }
            )
        );

        forkJoin([
            this.addresstypesService.GetSummaries(),
            this.countriesService.GetSummaries(),
            this.contactPointCategoryPurposesService.GetAll('', null, [['ContactPointCategory.Id', '-1']]),
            this.defaultsService.getValues(
                'ADDRESS_USE_STREET3,ADDRESS_STREET_ORDER',
                [null, null],
                ['string', 'string']
            ),
        ]).subscribe(
            ([addressTypeSummaries, countrySummaries, contactPointCategoryPurposes, addressSystemDefaults]) => {
                this.addressTypeSummaries = addressTypeSummaries;
                this.countrySummaries = countrySummaries;
                this.contactPoints = contactPointCategoryPurposes.map((x) => x.Purpose);
                this.streetOrder = Array.from(addressSystemDefaults[1]).map(Number);
                this.useStreet3 = addressSystemDefaults[0];
            },
            (errors) => {
                this.appNotificationService.error(errors);
            }
        );
    }

    cancel(reload: boolean = false) {
        if (this.isModal) {
            this.hideModal.emit(reload);
            return;
        }

        if (this.historyService.getPreviousRoute().includes('dashboard')) {
            this.router.navigate([`/crm/constituents/${this.constituentSnapshot.Id}/dashboard`]).then();
        } else {
            if (reload) {
                this.router
                    .navigate([`/crm/constituents/${this.constituentSnapshot.Id}/addresses`], {
                        state: { reload: true },
                    })
                    .then();
            } else {
                this.router.navigate([`/crm/constituents/${this.constituentSnapshot.Id}/addresses`]).then();
            }
        }
    }

    updateStreet1(street1: string) {
        this.entity.Street1 = street1;
    }

    addressAutoFormatted(address: IFormattedAddress) {
        this.entity.Street1 = address.Street1;
        this.entity.Street2 = address.Street2;
        this.entity.Street3 = address?.Street3 ?? '';
        this.entity.City = address.City;
        this.entity.State = address.State;
        this.entity.PostalCode = address.PostalCode;
        this.entity.Country = address.Country;
    }

    saveConfirmed(observer: Observer<boolean> = null, isNavToGrid: boolean = false) {
        if (!this.editForm.valid) {
            this.appNotificationService.error('Please provide values for all the required properties.');
            if (observer) {
                observer.next(false);
            }
            return;
        }
        this.createOrUpdate().subscribe(
            () => {
                if (!observer) {
                    this.cancel(true);
                    return;
                }

                if (isNavToGrid) {
                    observer.next(false);
                    this.cancel(true);
                    return;
                }

                observer.next(true);
            },
            (error) => {
                this.appNotificationService.error(error);
                if (observer) {
                    observer.next(false);
                }
            }
        );
    }

    canDeactivate(
        currentRoute: ActivatedRouteSnapshot,
        nextState?: RouterStateSnapshot
    ): boolean | Observable<boolean> | Promise<boolean> {
        if (!this.editForm || this.editForm.submitted || !this.editForm.dirty || this.isModal) {
            return true;
        }
        const isNavToGrid = nextState && nextState.url.endsWith('addresses');
        return new Observable((observer: Observer<boolean>) => {
            this.confirmService.navigate('Address: ' + this.entity.Description).subscribe((action) => {
                if (action === 'confirmed') {
                    this.saveConfirmed(observer, isNavToGrid);
                } else if (action === 'rejected') {
                    observer.next(true);
                } else if (action === 'canceled') {
                    observer.next(false);
                }
            });
        });
    }

    deleteAddress(entity: IAddress) {
        this.confirmService.delete('Address: ' + entity.Description).subscribe((confirmed) => {
            if (confirmed) {
                this.addressesService.Delete(entity.Id).subscribe(
                    () => {
                        this.appNotificationService.success('Address has been deleted.');
                        this.editForm.form.markAsPristine();
                        this.cancel(true);
                    },
                    (error) => {
                        if (
                            error.error.includes(
                                'Database reference constraint check failed. Please check that the referenced table id is correct and the corresponding value exists in the database.\\nForeign Key Error: \\"FK_T_CHARITABLE_TAX_RECEIPT_NUMBER_T_ADDRESS\\"'
                            )
                        ) {
                            this.appNotificationService.error(
                                'The postal address is linked to a tax receipt.  It can be inactivated, but cannot be deleted.'
                            );
                        } else {
                            this.appNotificationService.error(error);
                        }
                    }
                );
            }
        });
    }

    countryChanged(): void {
        if (this.entity.Country != null) {
            this.countriesService.Get(this.entity.Country.Id).subscribe((country) => {
                this.setCountryRules(country);

                if (this.useStateField === 'N' || this.useStateField === 'O') {
                    this.entity.State = null;
                }
            });
        }
    }

    onPostalCodeChanged(value: string): void {
        this.entity.PostalCode = value;
        if (value == null || value.length < this.postalCodeLength) {
            return;
        }
        this.postalCodeChangeSubject.next(value);
    }

    private filterStatesByCountry(countryId: number): void {
        this.filteredStateSummaries = this.stateSummaries.filter((x) => x.Country.Id === countryId);
    }

    private setCountryRules(country: ICountry) {
        this.filterStatesByCountry(country.Id);
        this.requiredCity = country.RequireCity;
        this.requiredPostalCode = country.RequirePostalCode;
        this.useStateField = country.UseStateField;
        this.postalCodeMask = country.PostalCodeEditString;
        this.isoForSelectedCountry = country.IsoAlpha3Code;
        this.postalCodeLength =
            country.PostalCodeValidLengths != null
                ? Math.min.apply(
                      null,
                      country.PostalCodeValidLengths.split(',').map((x) => +x)
                  )
                : 0;
        this.postalCodeLength = this.postalCodeLength === 0 ? 4 : this.postalCodeLength;
    }

    private setupDateData() {
        if (this.model.Address.StartDate && this.model.Address.EndDate) {
            this.radioButtonsModel = 'R';
            this.selectedMonths = [];
        } else if (this.model.Address.Months && this.model.Address.Months === 'YYYYYYYYYYYY') {
            this.radioButtonsModel = 'Y';
            this.selectedMonths = [];
        } else if (this.model.Address.Months) {
            this.radioButtonsModel = 'M';
            this.selectedMonths = this.setSelectedMonthsOptions(this.model.Address.Months);
        } else {
            this.radioButtonsModel = '';
        }
    }

    private setSelectedMonthsOptions(months: string): ISelectOption[] {
        if (months && months.length === 12) {
            const m = months.split('');
            const p: ISelectOption[] = [];
            const monthList = this.monthsList;
            for (let i = 0; i < m.length; i++) {
                if (m[i] === 'Y') {
                    p.push({
                        Id: monthList[i].month,
                        Description: monthList[i].monthNameShort,
                    });
                }
            }
            return p;
        }
        return null;
    }

    private buildMonthsString(): string {
        let s = '';
        this.monthsOptions.forEach((x) => {
            if (this.selectedMonths && this.selectedMonths.find((y) => y.Id === x.Id)) {
                s += 'Y';
            } else {
                s += 'N';
            }
        });
        return s;
    }

    private getMonthsOptions(): ISelectOption[] {
        this.monthsList = this.dateFormatService.getMonthsOfYear();
        return this.monthsList.map((x) => {
            const s: ISelectOption = { Id: x.month, Description: x.monthNameShort };
            return s;
        });
    }

    private setDateDataOnSave() {
        if (this.radioButtonsModel === 'R' && this.entity.StartDate && this.entity.EndDate) {
            this.entity.Months = 'NNNNNNNNNNNN';
        } else if (this.radioButtonsModel === 'M') {
            this.entity.StartDate = null;
            this.entity.EndDate = null;
        } else {
            this.entity.StartDate = null;
            this.entity.EndDate = null;
            this.entity.Months = 'YYYYYYYYYYYY';
        }
    }

    private createOrUpdate(): Observable<IAddress> {
        this.entity.PostalCode = this.stripPostalCodeFormatting(this.entity.PostalCode);
        this.entity.Months = this.buildMonthsString();
        this.setDateDataOnSave();
        const shouldCreate = this.entity.Id === -999;
        const saveObs = shouldCreate
            ? this.addressesService.Create(this.entity)
            : this.addressesService.Update(this.entity.Id, this.entity);

        return saveObs.pipe(
            switchMap((updatedAddress) => {
                const obs: Observable<any>[] = [];
                obs.push(of(updatedAddress));
                this.selectedPurposeSummaries
                    .filter(
                        (x) =>
                            this.initialContactPointPurposeMaps.findIndex(
                                (purposeMap) => purposeMap.Purpose.Id === x.Id
                            ) === -1
                    )
                    .forEach((selectedPurposeSummary) => {
                        const contactPointPurposeMap = {
                            Purpose: selectedPurposeSummary,
                            ContactPoint: { Id: updatedAddress.Id },
                            ContactPointCategory: { Id: -1 },
                        } as IContactPointPurposeMap;
                        obs.push(this.contactPointPurposeMapsService.Create(contactPointPurposeMap));
                    });
                this.initialContactPointPurposeMaps
                    .filter(
                        (x) =>
                            this.selectedPurposeSummaries.findIndex(
                                (purposeSummary) => purposeSummary.Id === x.Purpose.Id
                            ) === -1
                    )
                    .forEach((purposeMap) => {
                        obs.push(this.contactPointPurposeMapsService.Delete(purposeMap.Id));
                    });
                return forkJoin(obs);
            }),
            map((returnValues) => {
                this.constituentSnapshotService.reloadConstituentSnapshot();
                this.editForm.form.markAsPristine();
                this.address = returnValues[0];
                this.appNotificationService.success(
                    `Address ${returnValues[0].Description} successfully ${shouldCreate ? 'created' : 'updated'}.`
                );
                return returnValues[0];
            })
        );
    }

    private constructModel(address: IAddress): AddressModel {
        return new AddressModel(address, this.getEntityConstituentDisplayName());
    }

    private stripPostalCodeFormatting(code: string) {
        return code?.split('-')?.join('');
    }

    private postalCodeLookup(value: string): void {
        this.postalCodeLookupsService.GetResults(value, this.entity.Country.Id.toString()).subscribe((lookups) => {
            if (!lookups || lookups.length === 0) {
                return;
            }
            const lookup = lookups[0];

            if (
                this.useStateField &&
                this.entity.State == null &&
                (this.entity.City == null || this.entity.City.trim() === '')
            ) {
                this.entity.State = this.stateSummaries.find((x) => x.StateCode === lookup.Locale);
                this.entity.City = lookup.City;
            } else {
                const newState = this.stateSummaries.find((x) => x.StateCode === lookup.Locale);
                const newStateDescription = newState == null ? '(none)' : newState.Description;
                if (
                    (this.entity.State && this.entity.State?.StateCode !== newState.StateCode) ||
                    this.entity.City !== lookup.City
                ) {
                    this.confirmService
                        .yesNo('Update city to ' + lookup.City + ' and locale to ' + newStateDescription + '?')
                        .subscribe((confirmed) => {
                            if (confirmed) {
                                this.entity.State = newState;
                                this.entity.City = lookup.City;
                            }
                        });
                }
            }
        });
    }
}
