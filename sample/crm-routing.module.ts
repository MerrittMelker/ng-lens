import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CRMComponent } from './crm.component';
import { AddressesComponent } from './constituent-detail/addresses/addresses.component';
import { AddressEditComponent } from './constituent-detail/addresses/address-edit.component';
import { AliasesComponent } from './constituent-detail/aliases/aliases.component';
import { AliasEditComponent } from './constituent-detail/aliases/alias-edit.component';
import { AttendanceHistoryComponent } from './constituent-detail/attendancehistory/attendance-history.component';
import { AttributesComponent } from './constituent-detail/attributes/attributes.component';
import { AttributeEditComponent } from './constituent-detail/attributes/attribute-edit.component';
import { ConstituenciesComponent } from './constituent-detail/constituencies/constituencies.component';
import { ConstituencyEditComponent } from './constituent-detail/constituencies/constituency-edit.component';
import { ContactPermissionsComponent } from './constituent-detail/contactpermissions/contactpermissions.component';
import { ContactPointPurposesComponent } from './constituent-detail/contact-point-purposes/contact-point-purposes.component';
import { ConstituentSearchComponent } from './constituent-search/constituent-search.component';
import { ElectronicAddressesComponent } from './constituent-detail/electronicaddresses/electronicaddresses.component';
import { ElectronicAddressEditComponent } from './constituent-detail/electronicaddresses/electronicaddress-edit.component';
import { GiftAidDeclarationsComponent } from './constituent-detail/giftaiddeclarations/giftaiddeclarations.component';
import { GiftAidDeclarationEditComponent } from './constituent-detail/giftaiddeclarations/giftaiddeclaration-edit.component';
import { InterestsComponent } from './constituent-detail/interests/interests.component';
import { IssuesComponent } from './constituent-detail/issues/issues.component';
import { IssueEditComponent } from './constituent-detail/issues/issue-edit.component';
import { MembershipsComponent } from './constituent-detail/memberships/memberships.component';
import { PackageHistoryComponent } from './constituent-detail/packagehistory/packagehistory.component';
import { PhonesComponent } from './constituent-detail/phones/phones.component';
import { PhoneEditComponent } from './constituent-detail/phones/phone-edit.component';
import { RecognitionListingsComponent } from './constituent-detail/recognitionlistings/recognition-listings.component';
import { RecognitionListingEditComponent } from './constituent-detail/recognitionlistings/recognition-listing-edit.component';
import { RankingsComponent } from './constituent-detail/rankings/rankings.component';
import { RankingEditComponent } from './constituent-detail/rankings/ranking-edit.component';
import { RelationshipsComponent } from './constituent-detail/relationships/relationships.component';
import { SalutationsComponent } from './constituent-detail/salutations/salutations.component';
import { SalutationEditComponent } from './constituent-detail/salutations/salutation-edit.component';
import { SpecialActivitiesComponent } from './constituent-detail/specialactivities/specialactivities.component';
import { SpecialActivityEditComponent } from './constituent-detail/specialactivities/specialactivity-edit.component';
import { TicketHistoryComponent } from './constituent-detail/tickethistory/tickethistory.component';
import { WebLoginsComponent } from './constituent-detail/weblogins/weblogins.component';
import { WebLoginEditComponent } from './constituent-detail/weblogins/weblogin-edit.component';
import { WorkerQualificationsComponent } from './constituent-detail/workerqualifications/worker-qualifications.component';
import { WorkerQualificationEditComponent } from './constituent-detail/workerqualifications/worker-qualification-edit.component';
import { ConstituentDetailComponent } from './constituent-detail/constituent-detail.component';
import { AssetsComponent } from './constituent-detail/assets/assets.component';
import { AssetEditComponent } from './constituent-detail/assets/asset-edit.component';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate-guard.service';
import { ConstituentAuditComponent } from './constituent-detail/audit/constituent-audit.component';
import { ContactLogComponent } from './constituent-detail/contactlog/contact-log.component';
import { CreditCardsComponent } from './constituent-detail/creditcards/credit-cards.component';
import { DirectDebitsComponent } from './constituent-detail/directdebits/direct-debits.component';
import { DirectDebitEditComponent } from './constituent-detail/directdebits/direct-debit-edit.component';
import { DocumentsComponent } from './constituent-detail/documents/documents.component';
import { NotesComponent } from './constituent-detail/notes/notes.component';
import { NoteEditComponent } from './constituent-detail/notes/note-edit.component';
import { PhilanthropyComponent } from './constituent-detail/philanthropy/philanthropy.component';
import { PortfolioComponent } from './constituent-detail/portfolio/portfolio.component';
import { PlansComponent } from './constituent-detail/plans/plans.component';
import { PromotionsComponent } from './constituent-detail/promotions/promotions.component';
import { ResearchComponent } from './constituent-detail/research/research.component';
import { ResourceSchedulesComponent } from './constituent-detail/resourceschedules/resource-schedules.component';
import { ResourceWorkerTypesComponent } from './constituent-detail/resource-worker-types/resource-worker-types.component';
import { SchoolsComponent } from './constituent-detail/schools/schools.component';
import { SepaDirectsComponent } from './constituent-detail/sepa/sepa-directs.component';
import { SepaDirectEditComponent } from './constituent-detail/sepa/sepa-direct-edit.component';
import { WorkerSetupComponent } from './constituent-detail/workersetup/worker-setup.component';
import { ConstituentContributionsComponent } from './constituent-detail/constituent-contributions/constituent-contributions.component';
import { ResourceWorkerTypeEditComponent } from './constituent-detail/resource-worker-types/resource-worker-type-edit.component';
import { ResourceScheduleEditComponent } from './constituent-detail/resourceschedules/resource-schedule-edit.component';
import { ResourceSchedulesCalendarComponent } from './constituent-detail/resourceschedules/resource-schedules-calendar.component';
import { ResearchEntryEditComponent } from './constituent-detail/research/research-entry-edit.component';
import { CreditCardsEditComponent } from './constituent-detail/creditcards/credit-cards-edit.component';
import { TransactionHistoryComponent } from './constituent-detail/transactionhistory/transactionhistory.component';
import { PaymentHistoryComponent } from './constituent-detail/paymenthistory/paymenthistory.component';
import { WorkerEditComponent } from './constituent-detail/workersetup/worker-edit.component';
import { PhilanthropyEntryEditComponent } from './constituent-detail/philanthropy/philanthropyentry-edit.component';
import { PromotionEditComponent } from './constituent-detail/promotions/promotion-edit/promotion-edit.component';
import { PlannedGivingsComponent } from './constituent-detail/plannedgivings/plannedgivings.component';
import { PlannedGivingEditComponent } from './constituent-detail/plannedgivings/plannedgiving-edit.component';
import { ConstituentDashboardEditComponent } from './constituent-detail/constituent-dashboard/constituent-dashboard-edit.component';
import { DocumentsEditComponent } from './constituent-detail/documents/documents-edit.component';
import { ContactPointPurposesEditComponent } from './constituent-detail/contact-point-purposes/contact-point-purposes-edit.component';
import { ElevatedEventsComponent } from './constituent-detail/elevatedevents/elevatedevents.component';
import { ElevatedEventEditComponent } from './constituent-detail/elevatedevents/elevatedevent-edit.component';
import { AffiliationEditComponent } from './constituent-detail/relationships/affiliation-edit/affiliation-edit.component';
import { AssociationEditComponent } from './constituent-detail/relationships/association-edit/association-edit.component';
import { ConstituentOrdersComponent } from './constituent-detail/constituent-orders/constituent-orders.component';
import { PlanEditComponent } from './constituent-detail/plans/plan-edit.component';
import { GiftAidPaymentsComponent } from './constituent-detail/giftaids/gift-aid-payments.component';
import { ConstituentSearchContainerComponent } from '../shared/components/crm/constituent-search-container/constituent-search-container.component';
import { PlanStepsComponent } from './constituent-detail/plan-steps/plan-steps.component';
import { PlanStepEditComponent } from './constituent-detail/plan-steps/plan-step-edit.component';
import { CustomComponent } from './constituent-detail/custom/custom.component';
import { CustomEditComponent } from './constituent-detail/custom/custom-edit-component/custom-edit.component';
import { MembershipEditComponent } from './constituent-detail/memberships/membership-edit/membership-edit.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { CurrentBenefitsComponent } from './constituent-detail/current-benefits/current-benefits.component';
import { ConstituentStepsComponent } from './constituent-detail/constituent-steps/constituent-steps.component';
import { ConstituentStepEditComponent } from './constituent-detail/constituent-steps/constituent-step-edit.component';
import { SchoolEditComponent } from './constituent-detail/schools/school-edit.component';
import { BenefitHistoryComponent } from './constituent-detail/benefit-history/benefit-history.component';
import { MenuEntries } from '../core/domain/menu-entries';
import { ConstituentDashboardComponent } from './constituent-detail/constituent-dashboard/constituent-dashboard.component';
import { MembershipBenefitEditComponent } from './constituent-detail/memberships/membership-edit/membership-benefit-edit/membership-benefit-edit.component';
import { PosOrdersComponent } from './constituent-detail/pos-orders/pos-orders.component';
import { DigitalAddressesComponent } from './constituent-detail/digital-addresses/digital-addresses.component';
import { DigitalAddressEditComponent } from './constituent-detail/digital-addresses/digital-address-edit.component';
import { ConstituentPremiumsComponent } from './constituent-detail/constituent-premiums/constituent-premiums.component';
import { ConstituentPremiumEditComponent } from './constituent-detail/constituent-premiums/constituent-premium-edit.component';
import { GiftAidPaymentEditComponent } from './constituent-detail/giftaids/gift-aid-payment-edit/gift-aid-payment-edit.component';
import { AppLinkType } from '../core/domain/app-link-type';
import { CanActivateConstituentDetailGuard } from './constituent-detail/can-activate-constituent-detail-guard.service';
import { CsiComponent } from './csi/csi.component';
import { CsiEditComponent } from './csi/csi-edit.component';
import { MembershipHistoryComponent } from './constituent-detail/membership-history/membership-history.component';
import { ConstituentCharitableTaxReceiptComponent } from './constituent-detail/constituent-charitable-tax-receipts/constituent-charitable-tax-receipt.component';
import { ConstituentCharitableTaxReceiptEditComponent } from './constituent-detail/constituent-charitable-tax-receipts/constituent-charitable-tax-receipt-edit/constituent-charitable-tax-receipt-edit.component';
import { permissionsGuard } from '../core/guards/permissions.guard';
import { SchedulePurgeComponent } from './constituent-detail/schedule-purge/schedule-purge.component';
import { InactivateConstituentComponent } from './constituent-detail/inactivate-constituent/inactivate-constituent.component';
import { ChangeTypeComponent } from './constituent-detail/change-type/change-type.component';
import { ConvertToHouseholdComponent } from './constituent-detail/convert-to-household/convert-to-household.component';
import { ConvertToIndividualComponent } from './constituent-detail/convert-to-individual/convert-to-individual.component';
import { ConsituentIssueStepsComponent } from './constituent-detail/constituent-issue-steps/constituent-issue-steps.component';
import { ConsituentIssueStepsEditComponent } from './constituent-detail/constituent-issue-steps/constituent-issue-steps-edit.component';
import { SwapAffiliateComponent } from './constituent-detail/swap-affiliate/swap-affiliate.component';
import { ConstituentListsComponent } from './constituent-detail/constituent-lists/constituent-lists.component';
import { ConstituentContributionTabsComponent } from './constituent-detail/constituent-contributions/constituent-contribution-tabs/constituent-contribution-tabs.component';
import { ContributionTransactionsComponent } from './constituent-detail/constituent-contributions/constituent-contribution-tabs/contribution-transactions/contribution-transactions.component';
import { ContributionEditComponent } from './constituent-detail/constituent-contributions/constituent-contribution-tabs/contribution-edit/contribution-edit.component';
import { ContributionPaymentScheduleComponent } from './constituent-detail/constituent-contributions/constituent-contribution-tabs/contribution-payment-schedule/contribution-payment-schedule.component';
import { ContributionRestrictedScheduleComponent } from './constituent-detail/constituent-contributions/constituent-contribution-tabs/contribution-restricted-schedule/contribution-restricted-schedule.component';
import { ContributionCrediteesComponent } from './constituent-detail/constituent-contributions/constituent-contribution-tabs/contribution-creditees/contribution-creditees.component';
import { ContributionAcknowledgementsComponent } from './constituent-detail/constituent-contributions/constituent-contribution-tabs/contribution-acknowledgements/contribution-acknowledgements.component';
import { ContributionGiftAidComponent } from './constituent-detail/constituent-contributions/constituent-contribution-tabs/contribution-gift-aid/contribution-gift-aid.component';
import { PaymentDetailsComponent } from './constituent-detail/constituent-contributions/constituent-contribution-tabs/contribution-transactions/payment-details/payment-details.component';
import { GiftAidDetailsComponent } from './constituent-detail/constituent-contributions/constituent-contribution-tabs/contribution-gift-aid/gift-aid-details/gift-aid-details.component';
import { ConstituentOrderTabsComponent } from './constituent-detail/constituent-orders/constituent-order-tabs/constituent-order-tabs.component';
import { ConstituentOrderContributionsComponent } from './constituent-detail/constituent-orders/constituent-order-tabs/constituent-order-contributions/constituent-order-contributions.component';
import { ConstituentOrderFeesComponent } from './constituent-detail/constituent-orders/constituent-order-tabs/constituent-order-fees/constituent-order-fees.component';
import { ConstituentOrderPricingRulesComponent } from './constituent-detail/constituent-orders/constituent-order-tabs/constituent-order-pricing-rules/constituent-order-pricing-rules.component';
import { ConstituentOrderAdditionalFieldsComponent } from './constituent-detail/constituent-orders/constituent-order-tabs/constituent-order-additional-fields/constituent-order-additional-fields.component';
import { ContributionAdditionalFieldsComponent } from './constituent-detail/constituent-contributions/constituent-contribution-tabs/contribution-additional-fields/contribution-additional-fields.component';
import { ConstituentOrderDetailsComponent } from './constituent-detail/constituent-orders/constituent-order-tabs/constituent-order-details/constituent-order-details.component';
import { ConstituentOrderHistoryComponent } from './constituent-detail/constituent-orders/constituent-order-tabs/constituent-order-history/constituent-order-history.component';
import { ConstituentOrderMembershipsComponent } from './constituent-detail/constituent-orders/constituent-order-tabs/constituent-order-memberships/constituent-order-memberships.component';
import { ConstituentOrderPaymentDetailsComponent } from './constituent-detail/constituent-orders/constituent-order-tabs/constituent-order-history/constituent-order-payment-details/constituent-order-payment-details.component';
import { ConstituentOrderSurveyComponent } from './constituent-detail/constituent-orders/constituent-order-tabs/constituent-order-survey/constituent-order-survey.component';
import { ConstituentOrderLineItemsComponent } from './constituent-detail/constituent-orders/constituent-order-tabs/constituent-order-line-items/constituent-order-line-items.component';
import { ConstituentMergeComponent } from './constituent-detail/constituent-merge/constituent-merge.component';
import { ConstituentReportsComponent } from './constituent-detail/constituent-reports/constituent-reports.component';

const crmRoutes: Routes = [
    { path: 'portablesearch', component: ConstituentSearchContainerComponent },
    {
        path: '',
        component: CRMComponent,
        children: [
            {
                path: 'search',
                component: ConstituentSearchComponent,
                resolve: [permissionsGuard],
                data: { menuId: MenuEntries.ConstituentSearch, title: 'Constituent Search' },
            },
            { path: '', redirectTo: 'search', pathMatch: 'full' },
            {
                path: 'constituents/:constituentId',
                component: ConstituentDetailComponent,
                resolve: [permissionsGuard],
                data: { menuId: MenuEntries.ConstituentDetail },
                canActivate: [CanActivateConstituentDetailGuard],
                children: [
                    {
                        path: 'addresses',
                        component: AddressesComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Addresses },
                        children: [
                            {
                                path: ':id/edit',
                                component: AddressEditComponent,
                                resolve: [permissionsGuard],
                                data: { menuId: MenuEntries.Addresses },
                                canDeactivate: [CanDeactivateGuard],
                            },
                        ],
                    },
                    {
                        path: 'aliases',
                        component: AliasesComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Aliases, help: 'Constituents: Names: Alias' },
                        children: [
                            {
                                path: ':id/edit',
                                component: AliasEditComponent,
                                resolve: [permissionsGuard],
                                data: { menuId: MenuEntries.Aliases, help: 'Constituents: Names: Alias' },
                                canDeactivate: [CanDeactivateGuard],
                            },
                        ],
                    },
                    {
                        path: 'assets',
                        component: AssetsComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Assets },
                        children: [
                            {
                                path: ':id/edit',
                                component: AssetEditComponent,
                                resolve: [permissionsGuard],
                                data: { menuId: MenuEntries.Assets },
                                canDeactivate: [CanDeactivateGuard],
                            },
                        ],
                    },
                    {
                        path: 'attendancehistory',
                        component: AttendanceHistoryComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Attendance },
                    },
                    {
                        path: 'attributes',
                        component: AttributesComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Attributes },
                        children: [
                            {
                                path: ':id/edit',
                                component: AttributeEditComponent,
                                resolve: [permissionsGuard],
                                data: { menuId: MenuEntries.Attributes },
                                canDeactivate: [CanDeactivateGuard],
                            },
                        ],
                    },
                    {
                        path: 'audit',
                        component: ConstituentAuditComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.AccountAudit },
                    },
                    {
                        path: 'benefithistory',
                        component: BenefitHistoryComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.BenefitsHistory },
                    },
                    {
                        path: 'currentbenefits',
                        component: CurrentBenefitsComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Benefits },
                        children: [
                            {
                                path: ':levelBenefitId/edit',
                                component: MembershipBenefitEditComponent,
                                resolve: [permissionsGuard],
                                data: { menuId: MenuEntries.Benefits },
                                canDeactivate: [CanDeactivateGuard],
                            },
                        ],
                    },
                    {
                        path: 'constituencies',
                        component: ConstituenciesComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Constituencies },
                        children: [
                            {
                                path: ':id/edit',
                                component: ConstituencyEditComponent,
                                resolve: [permissionsGuard],
                                data: { menuId: MenuEntries.Constituencies },
                                canDeactivate: [CanDeactivateGuard],
                            },
                        ],
                    },
                    {
                        path: 'contributions',
                        component: ConstituentContributionsComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Contributions, help: 'Contribution Detail' },
                        children: [
                            {
                                path: 'app/:id/edit',
                                component: PageNotFoundComponent,
                                data: { appLinkType: AppLinkType.Contribution },
                            },
                            {
                                path: ':id',
                                component: ConstituentContributionTabsComponent,
                                resolve: [permissionsGuard],
                                data: { menuId: MenuEntries.ContributionDetails, idMustBeInteger: true },
                                children: [
                                    {
                                        path: 'edit',
                                        component: ContributionEditComponent,
                                        resolve: [permissionsGuard],
                                        canDeactivate: [CanDeactivateGuard],
                                        data: { menuId: MenuEntries.ContributionDetails },
                                    },
                                    {
                                        path: 'transactions',
                                        component: ContributionTransactionsComponent,
                                        resolve: [permissionsGuard],
                                        canDeactivate: [CanDeactivateGuard],
                                        data: { menuId: MenuEntries.ContributionDetails },
                                        children: [
                                            {
                                                path: ':id/:sequenceId',
                                                component: PaymentDetailsComponent,
                                                resolve: [permissionsGuard],
                                                canDeactivate: [CanDeactivateGuard],
                                                data: { menuId: MenuEntries.ContributionDetails },
                                            },
                                        ],
                                    },
                                    {
                                        path: 'paymentschedule',
                                        component: ContributionPaymentScheduleComponent,
                                        resolve: [permissionsGuard],
                                        canDeactivate: [CanDeactivateGuard],
                                        data: { menuId: MenuEntries.ContributionDetails },
                                    },
                                    {
                                        path: 'restrictedschedule',
                                        component: ContributionRestrictedScheduleComponent,
                                        resolve: [permissionsGuard],
                                        canDeactivate: [CanDeactivateGuard],
                                        data: { menuId: MenuEntries.ContributionDetails },
                                    },
                                    {
                                        path: 'creditees',
                                        component: ContributionCrediteesComponent,
                                        resolve: [permissionsGuard],
                                        canDeactivate: [CanDeactivateGuard],
                                        data: { menuId: MenuEntries.ContributionDetails },
                                    },
                                    {
                                        path: 'acknowledgements',
                                        component: ContributionAcknowledgementsComponent,
                                        resolve: [permissionsGuard],
                                        canDeactivate: [CanDeactivateGuard],
                                        data: { menuId: MenuEntries.ContributionDetails },
                                    },
                                    {
                                        path: 'additionalfields',
                                        component: ContributionAdditionalFieldsComponent,
                                        resolve: [permissionsGuard],
                                        canDeactivate: [CanDeactivateGuard],
                                        data: { menuId: MenuEntries.ContributionDetails, help: 'Contribution Detail' },
                                    },
                                    {
                                        path: 'giftaid',
                                        component: ContributionGiftAidComponent,
                                        resolve: [permissionsGuard],
                                        canDeactivate: [CanDeactivateGuard],
                                        data: { menuId: MenuEntries.ContributionDetails },
                                        children: [
                                            {
                                                path: ':id/sequence/:sequenceId/payment/:paymentId',
                                                component: GiftAidDetailsComponent,
                                                resolve: [permissionsGuard],
                                                canDeactivate: [CanDeactivateGuard],
                                                data: { menuId: MenuEntries.ContributionDetails },
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        path: 'contactlogs',
                        component: ContactLogComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.ContactLog, help: 'Constituents: Contacts: Contact Log' },
                    },
                    {
                        path: 'contactpermissions',
                        component: ContactPermissionsComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.ContactPermissions },
                        canDeactivate: [CanDeactivateGuard],
                    },
                    {
                        path: 'contactpointpurposes',
                        component: ContactPointPurposesComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.ContactPointPurposes },
                        children: [
                            {
                                path: 'edit',
                                component: ContactPointPurposesEditComponent,
                                resolve: [permissionsGuard],
                                data: { menuId: MenuEntries.ContactPointPurposes },
                                canDeactivate: [CanDeactivateGuard],
                            },
                        ],
                    },
                    {
                        path: 'creditcards',
                        component: CreditCardsComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.CreditCards },
                        children: [
                            {
                                path: ':id/edit',
                                component: CreditCardsEditComponent,
                                resolve: [permissionsGuard],
                                canDeactivate: [CanDeactivateGuard],
                                data: { menuId: MenuEntries.CreditCards },
                            },
                        ],
                    },
                    {
                        path: 'dashboard',
                        component: ConstituentDashboardComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.ConstituentDetail },
                        children: [
                            {
                                path: 'edit',
                                component: ConstituentDashboardEditComponent,
                                resolve: [permissionsGuard],
                                data: { menuId: MenuEntries.ConstituentDetail },
                                canDeactivate: [CanDeactivateGuard],
                            },
                        ],
                    },
                    {
                        path: 'directdebits',
                        component: DirectDebitsComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.DirectDebit },
                        children: [
                            {
                                path: ':id/edit',
                                component: DirectDebitEditComponent,
                                resolve: [permissionsGuard],
                                canDeactivate: [CanDeactivateGuard],
                                data: { menuId: MenuEntries.DirectDebit },
                            },
                        ],
                    },
                    {
                        path: 'documents',
                        component: DocumentsComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Documents },
                        children: [
                            {
                                path: ':id/edit',
                                component: DocumentsEditComponent,
                                resolve: [permissionsGuard],
                                data: { menuId: MenuEntries.Documents },
                                canDeactivate: [CanDeactivateGuard],
                            },
                        ],
                    },
                    {
                        path: 'emails',
                        component: ElectronicAddressesComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Emails },
                        children: [
                            {
                                path: ':id/edit',
                                component: ElectronicAddressEditComponent,
                                resolve: [permissionsGuard],
                                data: { menuId: MenuEntries.Emails },
                                canDeactivate: [CanDeactivateGuard],
                            },
                        ],
                    },
                    {
                        path: 'digitaladdresses',
                        component: DigitalAddressesComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.DigitalAddresses },
                        children: [
                            {
                                path: ':id/edit',
                                component: DigitalAddressEditComponent,
                                resolve: [permissionsGuard],
                                data: { menuId: MenuEntries.DigitalAddresses },
                                canDeactivate: [CanDeactivateGuard],
                            },
                        ],
                    },
                    {
                        path: 'events',
                        component: ElevatedEventsComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.FundraisingEvents },
                        children: [
                            {
                                path: ':id/edit',
                                component: ElevatedEventEditComponent,
                                resolve: [permissionsGuard],
                                canDeactivate: [CanDeactivateGuard],
                                data: { menuId: MenuEntries.FundraisingEvents },
                            },
                            {
                                path: ':id/edit/:guest',
                                component: ElevatedEventEditComponent,
                                resolve: [permissionsGuard],
                                canDeactivate: [CanDeactivateGuard],
                                data: { menuId: MenuEntries.FundraisingEvents },
                            },
                        ],
                    },
                    {
                        path: 'giftaiddeclarations',
                        component: GiftAidDeclarationsComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.GiftAidDeclarations },
                        children: [
                            {
                                path: ':id/edit',
                                component: GiftAidDeclarationEditComponent,
                                resolve: [permissionsGuard],
                                canDeactivate: [CanDeactivateGuard],
                                data: { menuId: MenuEntries.GiftAidDeclarations },
                            },
                        ],
                    },
                    {
                        path: 'giftaidpayments',
                        component: GiftAidPaymentsComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.GiftAidPayments },
                        children: [
                            {
                                path: ':sequenceId/:paymentId/edit',
                                component: GiftAidPaymentEditComponent,
                                resolve: [permissionsGuard],
                                canDeactivate: [CanDeactivateGuard],
                                data: { menuId: MenuEntries.GiftAidPayments },
                            },
                        ],
                    },
                    {
                        path: 'interests',
                        component: InterestsComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Interests },
                        canDeactivate: [CanDeactivateGuard],
                    },
                    {
                        path: 'issues',
                        component: IssuesComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.CustomerService },
                        children: [
                            {
                                path: ':id/edit',
                                component: IssueEditComponent,
                                resolve: [permissionsGuard],
                                data: { menuId: MenuEntries.CustomerService },
                                canDeactivate: [CanDeactivateGuard],
                            },
                        ],
                    },
                    {
                        path: 'memberships',
                        component: MembershipsComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.MembershipsDetails },
                        children: [
                            {
                                path: ':id/edit',
                                component: MembershipEditComponent,
                                resolve: [permissionsGuard],
                                canDeactivate: [CanDeactivateGuard],
                                data: { menuId: MenuEntries.MembershipsDetails },
                            },
                            {
                                path: ':id/benefits/:levelBenefitId/edit',
                                resolve: [permissionsGuard],
                                data: { menuId: MenuEntries.Benefits },
                                component: MembershipBenefitEditComponent,
                                canDeactivate: [CanDeactivateGuard],
                            },
                        ],
                    },
                    {
                        path: 'membershiphistory',
                        component: MembershipHistoryComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.MembershipHistory },
                        children: [
                            {
                                path: ':id/edit',
                                component: MembershipEditComponent,
                                resolve: [permissionsGuard],
                                canDeactivate: [CanDeactivateGuard],
                                data: { menuId: MenuEntries.MembershipHistory },
                            },
                        ],
                    },
                    {
                        path: 'notes',
                        component: NotesComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Notes },
                        children: [
                            {
                                path: ':id/edit',
                                component: NoteEditComponent,
                                resolve: [permissionsGuard],
                                canDeactivate: [CanDeactivateGuard],
                                data: { menuId: MenuEntries.Notes },
                            },
                        ],
                    },
                    {
                        path: 'orders',
                        component: ConstituentOrdersComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Orders, help: 'Order Details' },
                        children: [
                            {
                                path: 'app/:id/edit',
                                component: PageNotFoundComponent,
                                data: { appLinkType: AppLinkType.Order },
                            },
                            {
                                path: ':id',
                                component: ConstituentOrderTabsComponent,
                                resolve: [permissionsGuard],
                                data: { menuId: MenuEntries.ConstituentOrderTabs, help: 'Order Details' },
                                children: [
                                    {
                                        path: 'edit',
                                        component: ConstituentOrderDetailsComponent,
                                        resolve: [permissionsGuard],
                                        canDeactivate: [CanDeactivateGuard],
                                        data: { menuId: MenuEntries.ConstituentOrderTabs, help: 'Order Details' },
                                    },
                                    {
                                        path: 'line-items',
                                        component: ConstituentOrderLineItemsComponent,
                                        resolve: [permissionsGuard],
                                        canDeactivate: [CanDeactivateGuard],
                                        data: {
                                            menuId: MenuEntries.ConstituentOrderTabs,
                                            help: 'Orders: Order Details: Line Items',
                                        },
                                    },
                                    {
                                        path: 'contributions',
                                        component: ConstituentOrderContributionsComponent,
                                        resolve: [permissionsGuard],
                                        canDeactivate: [CanDeactivateGuard],
                                        data: {
                                            menuId: MenuEntries.ConstituentOrderTabs,
                                            help: 'Orders: Order Details: Contributions',
                                        },
                                    },
                                    {
                                        path: 'memberships',
                                        component: ConstituentOrderMembershipsComponent,
                                        resolve: [permissionsGuard],
                                        canDeactivate: [CanDeactivateGuard],
                                        data: {
                                            menuId: MenuEntries.ConstituentOrderTabs,
                                            help: 'Orders: Order Details: Memberships',
                                        },
                                    },
                                    {
                                        path: 'fees',
                                        component: ConstituentOrderFeesComponent,
                                        resolve: [permissionsGuard],
                                        canDeactivate: [CanDeactivateGuard],
                                        data: {
                                            menuId: MenuEntries.ConstituentOrderTabs,
                                            help: 'Orders: Order Details: Fees',
                                        },
                                    },
                                    {
                                        path: 'history',
                                        component: ConstituentOrderHistoryComponent,
                                        resolve: [permissionsGuard],
                                        canDeactivate: [CanDeactivateGuard],
                                        data: {
                                            menuId: MenuEntries.ConstituentOrderTabs,
                                            help: 'Orders: Order History',
                                        },
                                        children: [
                                            {
                                                path: ':id/:sequenceId',
                                                component: ConstituentOrderPaymentDetailsComponent,
                                                resolve: [permissionsGuard],
                                                canDeactivate: [CanDeactivateGuard],
                                                data: {
                                                    menuId: MenuEntries.ConstituentOrderTabs,
                                                    help: 'Orders: Order History',
                                                },
                                            },
                                        ],
                                    },
                                    {
                                        path: 'pricing-rules',
                                        component: ConstituentOrderPricingRulesComponent,
                                        resolve: [permissionsGuard],
                                        canDeactivate: [CanDeactivateGuard],
                                        data: {
                                            menuId: MenuEntries.ConstituentOrderTabs,
                                            help: 'Orders: Order Pricing Rules',
                                        },
                                    },
                                    {
                                        path: 'additional-fields',
                                        component: ConstituentOrderAdditionalFieldsComponent,
                                        resolve: [permissionsGuard],
                                        canDeactivate: [CanDeactivateGuard],
                                        data: {
                                            menuId: MenuEntries.ConstituentOrderTabs,
                                            help: 'Orders: Order Details: Custom Data',
                                        },
                                    },
                                    {
                                        path: 'survey',
                                        component: ConstituentOrderSurveyComponent,
                                        resolve: [permissionsGuard],
                                        canDeactivate: [CanDeactivateGuard],
                                        data: { menuId: MenuEntries.ConstituentOrderTabs, help: 'Orders: Survey' },
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        path: 'packagehistory',
                        component: PackageHistoryComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Packages },
                    },
                    {
                        path: 'payments',
                        component: PaymentHistoryComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Payments },
                        canDeactivate: [CanDeactivateGuard],
                    },
                    {
                        path: 'philanthropy',
                        component: PhilanthropyComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Philanthropy },
                        children: [
                            {
                                path: ':id/edit',
                                component: PhilanthropyEntryEditComponent,
                                resolve: [permissionsGuard],
                                canDeactivate: [CanDeactivateGuard],
                                data: { menuId: MenuEntries.Philanthropy },
                            },
                        ],
                    },
                    {
                        path: 'phones',
                        component: PhonesComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Phones },
                        children: [
                            {
                                path: ':id/edit',
                                component: PhoneEditComponent,
                                resolve: [permissionsGuard],
                                canDeactivate: [CanDeactivateGuard],
                                data: { menuId: MenuEntries.Phones },
                            },
                        ],
                    },
                    {
                        path: 'plannedgivings',
                        component: PlannedGivingsComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.PlannedGiving },
                        children: [
                            {
                                path: ':id/edit',
                                component: PlannedGivingEditComponent,
                                resolve: [permissionsGuard],
                                canDeactivate: [CanDeactivateGuard],
                                data: { menuId: MenuEntries.PlannedGiving },
                            },
                        ],
                    },
                    {
                        path: 'plans',
                        component: PlansComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.PlansDetail },
                        children: [
                            {
                                path: ':id/edit',
                                component: PlanEditComponent,
                                resolve: [permissionsGuard],
                                canDeactivate: [CanDeactivateGuard],
                                data: { menuId: MenuEntries.PlansDetail },
                            },
                        ],
                    },
                    {
                        path: 'plansteps',
                        component: PlanStepsComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.PlanSteps },
                        children: [
                            {
                                path: ':id/edit',
                                component: PlanStepEditComponent,
                                resolve: [permissionsGuard],
                                canDeactivate: [CanDeactivateGuard],
                                data: { menuId: MenuEntries.PlanSteps },
                            },
                        ],
                    },
                    {
                        path: 'portfolio',
                        component: PortfolioComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Portfolio },
                    },
                    {
                        path: 'premiums',
                        component: ConstituentPremiumsComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Premiums },
                        children: [
                            {
                                path: ':id/edit',
                                component: ConstituentPremiumEditComponent,
                                resolve: [permissionsGuard],
                                canDeactivate: [CanDeactivateGuard],
                                data: { menuId: MenuEntries.Premiums },
                            },
                        ],
                    },
                    {
                        path: 'recognitionlistings',
                        component: RecognitionListingsComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.RecognitionNames },
                        children: [
                            {
                                path: ':id/edit',
                                component: RecognitionListingEditComponent,
                                resolve: [permissionsGuard],
                                canDeactivate: [CanDeactivateGuard],
                                data: { menuId: MenuEntries.RecognitionNames },
                            },
                        ],
                    },
                    {
                        path: 'promotions',
                        component: PromotionsComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Promotions },
                        children: [
                            {
                                path: ':constituentId/:sourceId/edit',
                                component: PromotionEditComponent,
                                resolve: [permissionsGuard],
                                canDeactivate: [CanDeactivateGuard],
                                data: { menuId: MenuEntries.Promotions },
                            },
                        ],
                    },
                    {
                        path: 'purchasehistory',
                        component: PosOrdersComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Purchases },
                    },
                    {
                        path: 'rankings',
                        component: RankingsComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Rankings },
                        children: [
                            {
                                path: ':id/edit',
                                component: RankingEditComponent,
                                resolve: [permissionsGuard],
                                canDeactivate: [CanDeactivateGuard],
                                data: { menuId: MenuEntries.Rankings },
                            },
                        ],
                    },
                    {
                        path: 'relationships',
                        component: RelationshipsComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Relationships },
                        children: [
                            {
                                path: 'affiliation/:id/edit',
                                component: AffiliationEditComponent,
                                resolve: [permissionsGuard],
                                data: { menuId: MenuEntries.Relationships },
                                canDeactivate: [CanDeactivateGuard],
                            },
                            {
                                path: 'association/:id/edit',
                                component: AssociationEditComponent,
                                resolve: [permissionsGuard],
                                data: { menuId: MenuEntries.Relationships },
                                canDeactivate: [CanDeactivateGuard],
                            },
                        ],
                    },
                    {
                        path: 'research',
                        component: ResearchComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Research },
                        children: [
                            {
                                path: ':id/edit',
                                component: ResearchEntryEditComponent,
                                resolve: [permissionsGuard],
                                canDeactivate: [CanDeactivateGuard],
                                data: { menuId: MenuEntries.Research },
                            },
                        ],
                    },
                    {
                        path: 'resourceschedules',
                        component: ResourceSchedulesComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.ResourceSchedules },
                        children: [
                            {
                                path: 'calendar',
                                component: ResourceSchedulesCalendarComponent,
                                resolve: [permissionsGuard],
                                data: { menuId: MenuEntries.ResourceSchedules },
                            },
                            {
                                path: ':id/edit',
                                component: ResourceScheduleEditComponent,
                                resolve: [permissionsGuard],
                                canDeactivate: [CanDeactivateGuard],
                                data: { menuId: MenuEntries.ResourceSchedules },
                            },
                        ],
                    },
                    {
                        path: 'resourceworkertypes',
                        component: ResourceWorkerTypesComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.ResourceWorkerTypes },
                        children: [
                            {
                                path: ':id/edit',
                                component: ResourceWorkerTypeEditComponent,
                                resolve: [permissionsGuard],
                                canDeactivate: [CanDeactivateGuard],
                                data: { menuId: MenuEntries.ResourceWorkerTypes },
                            },
                        ],
                    },
                    {
                        path: 'salutations',
                        component: SalutationsComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Salutations },
                        children: [
                            {
                                path: ':id/edit',
                                component: SalutationEditComponent,
                                resolve: [permissionsGuard],
                                canDeactivate: [CanDeactivateGuard],
                                data: { menuId: MenuEntries.Salutations },
                            },
                        ],
                    },
                    {
                        path: 'schools',
                        component: SchoolsComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Schools },
                        children: [
                            {
                                path: ':id/edit',
                                component: SchoolEditComponent,
                                resolve: [permissionsGuard],
                                canDeactivate: [CanDeactivateGuard],
                                data: { menuId: MenuEntries.Salutations },
                            },
                        ],
                    },
                    {
                        path: 'sepa',
                        component: SepaDirectsComponent,
                        data: { menuId: MenuEntries.SEPA },
                        resolve: [permissionsGuard],
                        children: [
                            {
                                path: ':id/edit',
                                component: SepaDirectEditComponent,
                                resolve: [permissionsGuard],
                                data: { menuId: MenuEntries.SEPA },
                                canDeactivate: [CanDeactivateGuard],
                            },
                        ],
                    },
                    {
                        path: 'specialactivities',
                        component: SpecialActivitiesComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Activities },
                        children: [
                            {
                                path: ':id/edit',
                                component: SpecialActivityEditComponent,
                                resolve: [permissionsGuard],
                                data: { menuId: MenuEntries.Activities },
                                canDeactivate: [CanDeactivateGuard],
                            },
                        ],
                    },
                    {
                        path: 'tickethistory',
                        component: TicketHistoryComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Tickets },
                    },
                    {
                        path: 'transactions',
                        component: TransactionHistoryComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Transactions },
                        canDeactivate: [CanDeactivateGuard],
                    },
                    {
                        path: 'logins',
                        component: WebLoginsComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Logins },
                        children: [
                            {
                                path: ':id/edit',
                                component: WebLoginEditComponent,
                                resolve: [permissionsGuard],
                                canDeactivate: [CanDeactivateGuard],
                                data: { menuId: MenuEntries.Logins },
                            },
                        ],
                    },
                    {
                        path: 'workerqualifications',
                        component: WorkerQualificationsComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.ResourceQualifications },
                        children: [
                            {
                                path: ':id/edit',
                                component: WorkerQualificationEditComponent,
                                resolve: [permissionsGuard],
                                canDeactivate: [CanDeactivateGuard],
                                data: { menuId: MenuEntries.ResourceQualifications },
                            },
                        ],
                    },
                    {
                        path: 'workersetup',
                        component: WorkerSetupComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.WorkerSetup },
                        children: [
                            {
                                path: ':id/edit',
                                component: WorkerEditComponent,
                                resolve: [permissionsGuard],
                                canDeactivate: [CanDeactivateGuard],
                                data: { menuId: MenuEntries.WorkerSetup },
                            },
                        ],
                    },
                    {
                        path: 'custom/screens/:screenId',
                        component: CustomComponent,
                        data: {},
                        children: [
                            {
                                path: ':id/edit',
                                component: CustomEditComponent,
                                canDeactivate: [CanDeactivateGuard],
                            },
                        ],
                    },
                    {
                        path: 'custom/infomaker/:screenId',
                        component: PageNotFoundComponent,
                        data: {
                            appLinkType: AppLinkType.ConstituentInfomaker,
                            idParam: 'constituentId',
                            subIdParam: 'screenId',
                        },
                    },
                    {
                        path: 'constituentsteps',
                        component: ConstituentStepsComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.ConstituentSteps },
                        children: [
                            {
                                path: ':id/edit',
                                component: ConstituentStepEditComponent,
                                resolve: [permissionsGuard],
                                canDeactivate: [CanDeactivateGuard],
                                data: { menuId: MenuEntries.ConstituentSteps },
                            },
                        ],
                    },
                    {
                        path: 'charitabletaxreceipts',
                        component: ConstituentCharitableTaxReceiptComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.CharitableTaxReceipts },
                        children: [
                            {
                                path: ':id/edit',
                                component: ConstituentCharitableTaxReceiptEditComponent,
                                resolve: [permissionsGuard],
                                data: { menuId: MenuEntries.CharitableTaxReceipts },
                                canDeactivate: [CanDeactivateGuard],
                            },
                        ],
                    },
                    {
                        path: 'schedulepurge',
                        component: SchedulePurgeComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.SchedulePurge, help: 'Constituents: Overview' },
                    },
                    {
                        path: 'inactivate',
                        component: InactivateConstituentComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.Inactivate },
                    },
                    {
                        path: 'changetype',
                        component: ChangeTypeComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.ChangeType },
                    },
                    {
                        path: 'converttohousehold',
                        component: ConvertToHouseholdComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.ConvertToHousehold },
                    },
                    {
                        path: 'converttoindividual',
                        component: ConvertToIndividualComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.ConvertToIndividual },
                    },
                    {
                        path: 'merge',
                        component: ConstituentMergeComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.ManualConstituentMerge, help: 'Constituents: Merge Constituents' },
                    },
                    {
                        path: 'issuesteps',
                        component: ConsituentIssueStepsComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.IssueSteps, help: 'Constituents: Customer Service' },
                        children: [
                            {
                                path: ':id/edit',
                                component: ConsituentIssueStepsEditComponent,
                                resolve: [permissionsGuard],
                                data: { menuId: MenuEntries.IssueSteps },
                            },
                        ],
                    },
                    {
                        path: 'swapa1a2',
                        component: SwapAffiliateComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.SwapA1A2, help: 'Constituents: Swap A1/A2' },
                    },
                    {
                        path: 'constituentlists',
                        component: ConstituentListsComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.ConstituentLists, help: 'Constituent: Lists' },
                    },
                    {
                        path: 'reports/:id',
                        component: ConstituentReportsComponent,
                        resolve: [permissionsGuard],
                        data: { help: 'Constituent: Reports' },
                    },
                ],
            },
            {
                path: 'constituent-merge',
                loadChildren: () =>
                    import('./constituent-merge/constituent-merge.module').then((m) => m.ConstituentMergeModule),
            },
            {
                path: 'csi',
                component: CsiComponent,
                resolve: [permissionsGuard],
                data: { menuId: MenuEntries.ViewCSIs },
                children: [
                    {
                        path: ':id/edit',
                        component: CsiEditComponent,
                        resolve: [permissionsGuard],
                        data: { menuId: MenuEntries.ViewCSIs },
                    },
                ],
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(crmRoutes)],
    exports: [RouterModule],
})
export class CRMRoutingModule {}
