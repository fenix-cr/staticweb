import Vue from 'vue'
import VueRouter from 'vue-router'
// import { canNavigate } from '@/libs/acl/routeProtection'
// import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior() {
        return {
            x: 0,
            y: 0
        }
    },
    routes: [{
            path: '/home-admin',
            name: 'home-admin',
            component: () =>
                import('@/views/Pages/admin/HomeAdmin.vue'),
            meta: {
                requiresAuth: true,
                rol: [1],
                permission: null,
                pageTitle: 'Home Admin',
                breadcrumb: [{
                    text: 'Home Admin',
                    active: true,
                }, ],

            },
        },


        /***************** INITIO  OPTIONS CORPORATE ACCOUNTS       **********************/

        {
            path: '/home-corporate-account',
            name: 'home-corporate-account',
            component: () =>
                import('@/views/Pages/HomeCorporateAcount.vue'),
            meta: {
                pageTitle: 'Welcome to Corporate Account',
                breadcrumb: [{
                    text: 'Home Corporate Account',
                    active: true,
                }, ],
                requiresAuth: true,
                rol: [3],
                permission: null,
            },
        },
        {
            path: '/home-user',
            name: 'home-user',
            component: () =>
                import('@/views/Pages/HomeUser.vue'),
            meta: {
                pageTitle: 'Welcome',
                breadcrumb: [{
                    text: 'Home Account',
                    active: true,
                }, ],
                requiresAuth: true,
                rol: null,
                permission: 'home-normal-user',                
            },
        },
        {
            path: '/all-patient',
            name: 'all-patient',
            component: () =>
                import('@/views/Pages/ListPacientes.vue'),
            meta: {
                pageTitle: 'Patient List',
                requiresAuth: true,
                rol: [3],
                permission: null,
            },
        },
        {
            path: '/create-patient',
            name: 'create-patient',
            component: () =>
                import('@/views/Pages/CreatePatient.vue'),
            meta: {
                pageTitle: 'Create Patient',
                requiresAuth: true,
                rol: [1, 3],
                permission: null,
            },
        },
        {
            path: '/request-service',
            name: 'request-service',
            component: () =>
                import('@/views/Pages/RequestService.vue'),
            meta: {
                pageTitle: 'Request service',
                requiresAuth: true,
                rol: [3],
                permission: null,
            },
        },
        {
            path: '/details-booking',
            name: 'details-booking',
            component: () =>
                import('@/views/Pages/admin/DetailsBooking'),
            meta: {
                pageTitle: 'Details booking',
                requiresAuth: true,
                rol: [1,3],
                permission: 'details-booking',
            },
        },
        {
            path: '/details-booking',
            name: 'details-booking-notes',
            component: () =>
                import('@/views/Pages/admin/DetailsBooking'),
            meta: {
                pageTitle: 'Details booking',
                requiresAuth: true,
                rol: [1,3],
                permission: 'details-booking',
            },
        },
        {
            path: '/details-invoice',
            name: 'details-invoice',
            component: () =>
                import('@/views/Pages/admin/DetailsInvoice'),
            meta: {
                pageTitle: 'Details invoice',
                requiresAuth: true,
                rol: [1],
                permission: null,
            },
        },
        {
            path: '/details-billing',
            name: 'details-billing',
            component: () =>
                import('@/views/Pages/admin/BillingExport'),
            meta: {
                pageTitle: 'Details booking',
                requiresAuth: true,
                rol: [1],
                permission: null,
            },
        },
        {
            path: '/billing-export',
            name: 'billing-export',
            component: () =>
                import('@/views/Pages/admin/ReservationBilling'),
            meta: {
                pageTitle: 'Billing Export',
                requiresAuth: true,
                rol: [1],
                permission: 'billing-reporting',
            },
        },
        {
            path: '/book-a-ride',
            name: 'book-a-ride',
            component: () =>
                import('@/views/Pages/BookingARide.vue'),
            meta: {
                pageTitle: 'Request service',
                requiresAuth: true,
                rol: [1],
                permission: 'book-ride',
            },
        },
        {
            path: '/all-prices-corporate-account/:ca_id?',
            name: 'all-prices-corporate-account',
            component: () =>
                import('@/views/Pages/PricesCorporateAccount/ListPricesCorporateAccount.vue'),
            meta: {
                pageTitle: 'Prices Corporate Account',
                requiresAuth: true,
                rol: [1],
                permission: null,
            },
        },
        {
            path: '/form-prices-corporate-account/:id',
            name: 'form-prices-corporate-account',
            props: true,
            component: () =>
                import('@/views/Pages/PricesCorporateAccount/FormPricesCorporateAccount.vue'),
            meta: {
                requiresAuth: true,
                rol: [1],
                permission: null,
            },
        },
        /***************** END OPTIONS CORPORATE ACCOUNTS  *******************/

        /************ INITIO TRIPS ****************/

        {
            path: '/trips',
            name: 'trips',
            component: () =>
                import('@/views/Pages/admin/Trips.vue'),
            meta: {
                pageTitle: 'Trips',
                requiresAuth: true,
                rol: [1],
                permission: null,
            },
        },
        {
            path: '/trips/reservation-in-progress',
            name: 'reservation-in-progress',
            component: () =>
                import('@/views/Pages/admin/BookedTrips.vue'),
            meta: {
                pageTitle: 'Reservation in progress',
                requiresAuth: true,
                rol: [1],
                permission: null,
            },
        },
        {
            path: '/trips/canceled-reservations',
            name: 'canceled-reservations',
            component: () =>
                import('@/views/Pages/admin/CanceledReservations.vue'),
            meta: {
                pageTitle: 'Canceled reservations',
                requiresAuth: true,
                rol: [1],
                permission: null,
            },
        },
        {
            path: '/trips/reservations-to-accept',
            name: 'reservation-to-accepted',
            component: () =>
                import('@/views/Pages/admin/ReservationToAccept.vue'),
            meta: {
                pageTitle: 'Reservations to accept',
                requiresAuth: true,
                rol: [1],
                permission: null,
            },
        },
        {
            path: '/trips/reservation-to-accepted/:id/details',
            name: 'details-reservation',
            props: true,
            component: () =>
                import('@/views/Pages/admin/DetailsReservation.vue'),
            meta: {
                pageTitle: 'Reservation details',
                requiresAuth: true,
                rol: [1,3],
                permission: 'edit-booking',
            },
        },
        {
            path: '/trips/reservation-to-cancel',
            name: 'reservation-to-cancel',
            component: () =>
                import('@/views/Pages/admin/ReservationToCancel.vue'),
            meta: {
                pageTitle: 'Reservation to cancel',
                requiresAuth: true,
                rol: [1],
                permission: null,
            },
        },
        {
            path: '/trips/completed-trips',
            name: 'completed-trips',
            component: () =>
                import('@/views/Pages/admin/ReservationCompleted.vue'),
            meta: {
                pageTitle: 'Reservation completed',
                requiresAuth: true,
                rol: [1],
                permission: null,
            },
        },
        {
            path: '/trips/reservations',
            name: 'reservations',
            component: () =>
                import('@/views/Pages/admin/Reservations.vue'),
            meta: {
                pageTitle: 'Reservations',
                requiresAuth: true,
                rol: [1],
                permission: 'dispatch-board',
            },
        },
        {
            path: '/sms_log',
            name: 'sms_log',
            component: () =>
                import('@/views/Pages/admin/SmsLog.vue'),
            meta: {
                pageTitle: 'SmsLog',
                requiresAuth: true,
                rol: [1],
                permission: null,
            },
        },


        /******************** END RUTAS OF TRIPS       ************************/


        /*********** INFO SELFPAY **********/

        {
            path: '/all-selfpaids',
            name: 'all-selfpaids',
            component: () =>
                import('@/views/Pages/admin/AllSelfpaid.vue'),
            meta: {
                pageTitle: 'All Selfpays',
                requiresAuth: true,
                rol: [1],
                permission: 'see-the-list-of-selfpays',
            },
        },
        {
            path: '/create-selfpaid',
            name: 'create-selfpaid',
            component: () =>
                import('@/views/Pages/admin/CreateSelfPaid.vue'),
            meta: {
                pageTitle: 'Create Selfpay',
                requiresAuth: true,
                rol: [1],
                permission: 'create-selfpay',
            },
        },

        {
            path: '/all-selfpaids/:client_id/details',
            name: 'details-selfpaids',
            component: () =>
                import('@/views/Pages/admin/DetailsSelfpaid.vue'),
            meta: {
                pageTitle: 'SelfPay Details',
                requiresAuth: true,
                rol: [1],
                permission: 'details-selfpay',
            },
        },
        {
            path: '/selfpaid-payment-method/:client_id',
            name: 'selfpaid-payment-method',
            component: () =>
                import('@/views/Pages/admin/PaymentMethodSelfPaid.vue'),
            meta: {
                pageTitle: 'SelfPay Payment Method',
                requiresAuth: true,
                rol: [1],
                permission: null,
            },
        },
        {
            path: '/all-prices-selfpaids',
            name: 'all-prices-selfpaids',
            component: () =>
                import('@/views/Pages/PricesSelfPay/ListPricesSelfPay.vue'),
            meta: {
                pageTitle: 'Prices Selfpay',
                requiresAuth: true,
                rol: [1],
                permission: null,
            },
        },
        {
            path: '/form-prices-selfpaids/:id',
            name: 'form-prices-selfpaids',
            props: true,
            component: () =>
                import('@/views/Pages/PricesSelfPay/FormPricesSelfPay.vue'),
            meta: {
                requiresAuth: true,
                rol: [1],
                permission: null,
            },
        },


        //Rutas para booking

        /*************** INITIO RUTA PARA BOOKING  *******************/
        {
            path: '/booking',
            name: 'booking-and-tracking',
            component: () =>
                import('@/views/Pages/admin/BookingAndTracking.vue'),
            meta: {
                pageTitle: 'Assign Driver',
                requiresAuth: true,
                rol: [1],
                permission: null,
            },
        },
        {
            path: '/booking/approve-drivers',
            name: 'approve-drivers',
            component: () =>
                import('@/views/Pages/admin/ApproveDrivers.vue'),
            meta: {
                pageTitle: 'Approved drivers',
                requiresAuth: true,
                rol: [1],
                permission: 'see-list-approve-drivers',
            },
        },
        {
            path: '/booking/add-driver/',
            name: 'add-driver',
            props: true,
            component: () =>
                import('@/views/Pages/admin/AddDriver.vue'),
            meta: {
                pageTitle: 'Add Driver',
                requiresAuth: true,
                rol: [1],
                permission: 'onboarding-new-drivers',
            },
        },
        {
            path: '/booking/assign-driver',
            name: 'assign-driver',
            component: () =>
                import('@/views/Pages/admin/AssignDriver.vue'),
            meta: {
                pageTitle: 'Assign driver',
                requiresAuth: true,
                rol: [1],
                permission: 'assign-a-driver',
            },
        },
        {
            path: '/booking/assign-driver/details-assign-driver/:id/:edit_booking?',
            name: 'details-assign-driver',
            props: true,
            component: () =>
                import('@/views/Pages/admin/DetailsAssignDriver.vue'),
            meta: {
                pageTitle: 'Details assign driver',
                requiresAuth: true,
                rol: [1],
                permission: 'assign-a-driver',
            },
        },
        {
            path: '/booking/approve-drivers/:id/details/:tabvehicle?',
            name: 'details-driver-view',
            props: true,
            component: () =>
                import('@/views/Pages/admin/DetailsDriver.vue'),
            meta: {
                pageTitle: 'Driver details',
                requiresAuth: true,
                rol: [1],
                permission: 'edit-driver',
            },
        },
        {
            path: '/my-bookings',
            name: 'bookings',
            props: true,
            component: () =>
                import('@/views/Pages/BookingCA.vue'),
            meta: {
                pageTitle: 'Bookings',
                requiresAuth: true,
                rol: [3],
                permission: null,
            },
        },

        /*************** END RUTA PARA BOOKING   *******************/
        /*************** Proverdes super admin   *******************/

        {
            path: '/providers',
            name: 'provider',
            component: () =>
                import('@/views/Pages/admin/AdminProviders.vue'),
            meta: {
                pageTitle: 'Providers',
                requiresAuth: true,
                rol: [1],
                permission: null,
            },
        }, {
            path: '/add-provider',
            name: 'add-provider',
            component: () =>
                import('@/views/Pages/admin/AddProvider.vue'),
            meta: {
                pageTitle: 'Add Provider',
                requiresAuth: true,
                rol: [1],
                permission: null,
            },
        }, {
            path: '/provider-details/:id',
            name: 'provider-details',
            component: () =>
                import('@/views/Pages/admin/ProviderDetails.vue'),
            meta: {
                pageTitle: 'Provider Detail',
                requiresAuth: true,
                rol: [1],
                permission: null,
            },
        },


        /*************** End providers super admin   *******************/


        //Rutas para opción del admin ver clientes

        /*************** INITIO RUTA PARA CLIENT PROVED   *******************/
        {
            path: '/clients/drivers',
            name: 'Drivers',
            props: true,
            component: () =>
                import('@/views/Pages/admin/Drivers.vue'),
            meta: {
                pageTitle: 'Drivers',
                requiresAuth: true,
                rol: [1],
                permission: null,
            },
        },
        {
            path: '/clients/drivers/cna',
            name: 'cna',
            props: true,
            component: () =>
                import('@/views/Pages/admin/CMA.vue'),
            meta: {
                pageTitle: 'CNA',
                requiresAuth: true,
                rol: [1],
                permission: 'see-the-list-of-cna',
            },
        },
        {
            path: '/clients/drivers/cna/bt',
            name: 'bt',
            props: true,
            component: () =>
                import('@/views/Pages/admin/Bt.vue'),
            meta: {
                pageTitle: 'CNA BT',
                requiresAuth: true,
                rol: [1],
                permission: 'see-the-list-of-cna-bt',
            },
        },
        {
            path: '/clients/drivers/providers',
            name: 'providers',
            props: true,
            component: () =>
                import('@/views/Pages/admin/Providers.vue'),
            meta: {
                pageTitle: 'Providers',
                requiresAuth: true,
                rol: [1],
                permission: 'see-the-list-of-providers',
            },
        },
        {
            path: '/clients/drivers/documentExpirey',
            name: 'driverDocuments',
            props: true,
            component: () =>
                import ('@/views/Pages/admin/DocumentExpirey.vue'),
            meta: {
                pageTitle: 'Driver Documents',
                requiresAuth: true,
                rol: [1],
                permission: 'list-driver-documents'
            },
        },
        {
            path: '/clients/providers/:driver_id/details-provider',
            name: 'details-provider',
            props: true,
            component: () =>
                import('@/views/Pages/admin/DetailsProviders.vue'),
            meta: {
                pageTitle: 'Details provider',
                requiresAuth: true,
                rol: [1],
                permission: null,
            },
        },
        /*************** END RUTA PARA CLIENTE PROVEEDOR   *******************/

        /*************** INITIO RUTA PARA CLIENT CORPORATE ACCOUNT   *******************/
        {
            path: '/clients/corporate-account',
            name: 'clients',
            component: () =>
                import('@/views/Pages/admin/Clients.vue'),
            meta: {
                pageTitle: 'Corporate account',
                requiresAuth: true,
                rol: [1],
                permission: 'see-the-list-of-corporates',
            },
        },
        {
            path: '/clients/create-account',
            name: 'create-client',
            component: () =>
                import('@/views/Pages/admin/CreateClient.vue'),
            meta: {
                pageTitle: 'Create corporate account',
                requiresAuth: true,
                rol: [1],
                permission: 'create-corporate-account',
            },
        },
        {
            path: '/clients/contracts-fees',
            name: 'contracts-fees',
            component: () =>
                import('@/views/Pages/admin/CAContractFees.vue'),
            meta: {
                pageTitle: 'CA Contracts',
                requiresAuth: true,
                rol: [1],
                permission: null,
            },
        },
        {
            path: '/clients/corporate-account/details/:id',
            name: 'details-corporate-account',
            props: true,
            component: () =>
                import('@/views/Pages/admin/DetailsClientsCorporateAccount.vue'),
            meta: {
                pageTitle: 'Corporate account details',
                requiresAuth: true,
                rol: [1],
                permission: 'details-corporate-accounts',
            },
        },

        {
            path: '/clients/contract-fees/details/:id',
            name: 'details-contract-fees',
            props: true,
            component: () =>
                import('@/views/Pages/admin/DetailsContractFees.vue'),
            meta: {
                pageTitle: 'Contract fees details',
                requiresAuth: true,
                rol: [1],
                permission: null,
            },
        },

        /*************** END RUTA PARA CLIENT CORPORATE ACCOUNT   *******************/


        {
            path: '/reports',
            name: 'reports',
            component: () =>
                import('@/views/Pages/admin/Reports.vue'),
            meta: {
                pageTitle: 'Reports',
                requiresAuth: true,
                rol: [1],
                permission: null,
            },
        },

        /*************** INITIO ROUTE FOR REGISTERS  *******************/
        {
            path: '/register',
            name: 'register',
            component: () =>
                import('@/views/Pages/Register.vue'),
            meta: {
                layout: 'full',
            },
        },
        {
            path: '/create-admin',
            name: 'create-admin',
            component: () =>
                import('@/views/Pages/superadmin/FormAdmin.vue'),
            meta: {
                pageTitle: 'Create admin Account',
                requiresAuth: true,
                rol: [1],
                permission: 'create-user',
            },
        },
        {
            path: '/edit-admin/',
            name: 'edit-admin',
            component: () =>
                import('@/views/Pages/superadmin/FormAdmin.vue'),
            meta: {
                pageTitle: 'Edit admin Account',
                requiresAuth: true,
                rol: [1],
                permission: 'edit-user',
            },
        },
        {
            path: '/change-password-admin/',
            name: 'change-password-admin',
            component: () =>
                import('@/views/Pages/superadmin/FormChangePassword.vue'),
            meta: {
                pageTitle: 'Change password admin Account',
                requiresAuth: true,
                rol: [1],
                permission: null,
            },
        },
        {
            path: '/assign-role',
            name: 'assign-role',
            component: () =>
                import('@/views/Pages/superadmin/AssignRoleUser.vue'),
            meta: {
                pageTitle: 'Amera Users',
                requiresAuth: true,
                rol: [1],
                permission: 'see-the-list-of-users',
            },
        },
        {
            path: '/information-contact',
            name: 'information-contact',
            component: () =>
                import('@/views/Pages/admin/ContactInformation.vue'),
            meta: {
                pageTitle: 'Contact Information',
                requiresAuth: true,
                rol: [1],
                permission: null,
            },
        },

        /*************** END ROUTE FOR REGISTERS   *******************/
        {
            path: '/forgot-password',
            name: 'forgot-password',
            component: () =>
                import('@/views/Pages/ForgotPassword.vue'),
            meta: {
                layout: 'full',
            },
        },

        {
            path: '/profile',
            name: 'profile',
            component: () =>
                import('@/views/Pages/profile/Profile.vue'),
            meta: {
                requiresAuth: true,
                rol: [1,3],
                permission:'change-profile',
            },
        },
        {
            path: '/profile/:client_id',
            name: 'profile-patient',
            props: true,
            component: () =>
                import('@/views/Pages/profile/ProfilePatient.vue'),
            meta: {
                rol: [1,3],
                requiresAuth: true,
            },
        },

        /******************   Billings       ****************************/

        {
            path: '/billing',
            name: 'billing',
            component: () =>
                import('@/views/Pages/Billing.vue'),
            meta: {
                requiresAuth: true,
                rol: [1,3],
                permission: 'billing-reporting',
            },
        },
        {
            path: '/billing/transactions-made',
            name: 'TransactionsMade',
            component: () =>
                import('@/views/Pages/Billings/TransactionsMade.vue'),
            meta: {
                pageTitle: 'Transactions made',
                requiresAuth: true,
                permission: null,
            },
        },
        {
            path: '/billing/transactions-made/:id/details',
            name: 'TransactionsMade details',
            component: () =>
                import('@/views/Pages/Billings/DetailsTransactions.vue'),
            meta: {
                pageTitle: 'Transactions made details',
                requiresAuth: true,
                permission: null,
            },
        },
        {
            path: '/billing/payments-made',
            name: 'PaymentsMade',
            component: () =>
                import('@/views/Pages/Billings/PaymentsMade.vue'),
            meta: {
                pageTitle: 'Payments made',
                requiresAuth: true,
                permission: null,
            },
        },
        {
            path: '/billing/payments-to-be-made',
            name: 'PaymentsToBeMade',
            component: () =>
                import('@/views/Pages/Billings/PaymentsToBeMade.vue'),
            meta: {
                pageTitle: 'Payments To Be Made',
                requiresAuth: true,
                permission: null,
            },
        },
        {
            path: '/billing/refused-payments',
            name: 'RefusedPayments',
            component: () =>
                import('@/views/Pages/Billings/RefusedPayments.vue'),
            meta: {
                pageTitle: 'Refused payments',
                requiresAuth: true,
                permission: null,
            },
        },
        {
            path: '/billing/payment',
            name: 'Payments',
            component: () =>
                import('@/views/Pages/Billings/Payments.vue'),
            meta: {
                pageTitle: 'Payment',
                requiresAuth: true,
                permission: null,
            },
        },

        /************************ End Billing **********************************/
        {
            path: '/terms-of-service',
            name: 'terms-of-service',
            component: () =>
                import('@/views/Pages/TermsOfService.vue'),
            meta: {
                //requiresAuth: false,
                layout: 'full',
                rol: [1,2,3,4,5],
                permission: null,
                requiresAuth: false,
                // pageTitle: 'Terms of Service',
                breadcrumb: [{
                    text: 'terms-of-service',
                    active: true,
                }, ],
            },
        },
        {
            path: '/legal-agreements',
            name: 'legal-agreements',
            component: () =>
                import('@/views/Pages/LegalAgreements.vue'),
            meta: {
                //requiresAuth: false,
                layout: 'full',
                rol: [1,2,3,4,5],
                permission: null,
                requiresAuth: false,
                // pageTitle: 'Terms of Service',
                breadcrumb: [{
                    text: 'terms-of-service',
                    active: true,
                }, ],
            },
        },
        {
            path: '/bookingquery',
            name: 'bookingquery',
            component: () =>
                import('@/views/bookingquery.vue'),
            meta: {
                //requiresAuth: false,
                layout: 'full',
                // pageTitle: 'Terms of Service',
                breadcrumb: [{
                    text: 'bookingquery',
                    active: true,
                }, ],
            },
        },
        {
            path: '/',
            name: 'login',
            component: () =>
                import('@/views/Login.vue'),
            meta: {
                layout: 'full',
                // // resource: 'Auth',
                // // redirectIfLoggedIn: false,
                breadcrumb: [{
                    text: 'Login',
                    active: true,
                }, ],
            },
        },
        {
            path: '/error-404',
            name: 'error-404',
            component: () =>
                import('@/views/error/Error404.vue'),
            meta: {
                layout: 'full',
            },
        },
        {
            path: '/not-authorized',
            name: 'not-authorized',
            component: () =>
                import('@/views/Pages/NotAuthorized.vue'),
            meta: {
                layout: 'full',
            },
        },
        {
            path: '*',
            redirect: 'error-404',
        },

        /******************   Drivers work cities       ****************************/

        {
            path: '/all-drivers-work-cities',
            name: 'all-drivers-work-cities',
            component: () =>
                import('@/views/Pages/DriverWorkCities/ListDriverWorkCity.vue'),
            meta: {
                pageTitle: 'Drivers work cities',
                permission: null,

            },
        },
        {
            path: '/form-drivers-work-cities/:id',
            name: 'form-drivers-work-cities',
            props: true,
            component: () =>
                import('@/views/Pages/DriverWorkCities/FormDriverWorkCity.vue'),
            meta: {
                requiresAuth: true,
                rol: [1],
                permission: null,
            },
        },

        /******************   End Drivers work cities       ****************************/
    ],
})

// router.beforeEach((to, _, next) => {
//   const isLoggedIn = isUserLoggedIn()
//
//   if (!canNavigate(to)) {
//     // Redirect to login if not logged in
//     if (!isLoggedIn) return next({ name: 'login' })
//
//     // If logged in => not authorized
//     return next({ name: 'not-authorized' })
//   }
//
//   // Redirect if logged in
//   if (to.meta.redirectIfLoggedIn && isLoggedIn) {
//     const userData = getUserData()
//     next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
//   }
//
//   return next()
// })

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
    // Remove initial loading
    const appLoading = document.getElementById('loading-bg')
    if (appLoading) {
        appLoading.style.display = 'none'
    }
})

export default router