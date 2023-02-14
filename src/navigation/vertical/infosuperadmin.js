import { ROL_SUPER_ADMIN, ROL_ADMIN, ROL_CORPORATE_ACCOUNT, ROL_DISPATCH, ROL_CARE_COORDINATOR, ROL_PROVIDER_RELATIONS, ROL_HUMAN_RESOURCE, ROL_BILLING } from '@/@core/utils/rolesNames.js';

export default [{
        title: 'Booking center',
        route: 'home-corporate-acount',
        icon: 'HomeIcon',
        meta: {
            requiresAuth: true,
            role: ROL_SUPER_ADMIN,
            permission: null,
        },
        children: [{
                title: 'Dispatch',
                route: 'reservations',
                meta: {
                    requiresAuth: true,
                    role: ROL_SUPER_ADMIN,
                    permission: 'dispatch-board',
                },
            },
            {
                title: 'Book a Ride',
                route: 'book-a-ride',
                meta: {
                    requiresAuth: true,
                    role: ROL_SUPER_ADMIN,
                    permission: 'book-ride',
                },
            },
            {
                title: 'Assign Driver',
                route: 'assign-driver',
                meta: {
                    requiresAuth: true,
                    role: ROL_SUPER_ADMIN,
                    permission: 'assign-a-driver',
                },
            },
        ],
    },
    {
        title: 'Amera Users',
        route: 'assign-role',
        icon: 'UserCheckIcon',
        meta: {
            requiresAuth: true,
            role: ROL_SUPER_ADMIN,
            permission: 'see-the-list-of-users',
        },
    },
    {
        title: 'Providers',
        route: 'provider',
        icon: 'CheckSquareIcon',
        meta: {
            requiresAuth: true,
            role: ROL_SUPER_ADMIN,
            permission: null,
        },
    },
    {
        title: 'Drivers',
        route: 'second-page',
        icon: 'UserIcon',
        meta: {
            requiresAuth: true,
            role: ROL_SUPER_ADMIN,
            permission: null,
        },
        children: [{
                title: 'Drivers CNA',
                route: 'cna',
                meta: {
                    requiresAuth: true,
                    role: ROL_SUPER_ADMIN,
                    permission: 'see-the-list-of-cna',
                },
            },
            {
                title: 'CNA BT',
                route: 'bt',
                meta: {
                    requiresAuth: true,
                    role: ROL_SUPER_ADMIN,
                    permission: 'see-the-list-of-cna-bt',
                },
            },
            {
                title: 'Driver Provider',
                route: 'providers',
                meta: {
                    requiresAuth: true,
                    role: ROL_SUPER_ADMIN,
                    permission: 'see-the-list-of-providers',
                },
            },
            {
                title: 'Driver Documents',
                route: 'driverDocuments',
                meta: {
                    requiresAuth: true,
                    role: ROL_SUPER_ADMIN,
                    permission: 'list-driver-documents'
                },
            },
        ],
    },
    {
        title: 'Client',
        route: 'second-page',
        icon: 'UserIcon',
        meta: {
            requiresAuth: true,
            role: ROL_SUPER_ADMIN,
            permission: null,
        },
        children: [{
                title: 'Corporate accounts',
                route: 'clients',
                meta: {
                    requiresAuth: true,
                    role: ROL_SUPER_ADMIN,
                    permission: 'see-the-list-of-corporates',
                },
            },
            {
                title: 'SelfPays',
                route: 'all-selfpaids',
                meta: {
                    requiresAuth: true,
                    role: ROL_SUPER_ADMIN,
                    permission: 'see-the-list-of-selfpays',
                },
            },
        ],
    },
    {
        title: 'Reports',
        icon: 'CalendarIcon',
        meta: {
            requiresAuth: true,
            role: ROL_SUPER_ADMIN,
            permission: null,
        },
        children: [{
            title: 'Billing Export',
            route: 'billing-export',
            meta: {
                requiresAuth: true,
                role: ROL_SUPER_ADMIN,
                permission: 'billing-reporting',
            },
        }, ],
    },
    {
        title: 'Support',
        icon: 'SettingsIcon',
        meta: {
            requiresAuth: true,
            role: ROL_SUPER_ADMIN,
            permission: null,
        },
        children: [{
            title: 'Contact Information',
            route: 'information-contact',
            meta: {
                requiresAuth: true,
                role: ROL_SUPER_ADMIN,
                permission: null,
            },
        }, ],
    },
    {
        title: 'Billing',
        route: 'billing',
        icon: 'CreditCardIcon',
        meta: {
            requiresAuth: true,
            role: ROL_SUPER_ADMIN,
            permission: 'transactions-made',
        },
    },
    {
        title: 'Settings',
        icon: 'ClipboardIcon',
        meta: {
            requiresAuth: true,
            role: ROL_SUPER_ADMIN,
            permission: null,
        },
        children: [{
                title: 'Prices Selfpay',
                route: 'all-prices-selfpaids',
                meta: {
                    requiresAuth: true,
                    role: ROL_SUPER_ADMIN,
                    permission: null,
                },
            },
            {
                title: 'Prices Corp Acc',
                route: 'all-prices-corporate-account',
                meta: {
                    requiresAuth: true,
                    role: ROL_SUPER_ADMIN,
                    permission: null,
                },
            },
        ],
    },
    {
        title: 'Sms',
        route: 'sms_log',
        icon: 'CheckSquareIcon',
        meta: {
            requiresAuth: true,
            role: ROL_SUPER_ADMIN,
            permission: null,
        },
    },
    {
        title: 'Profile',
        route: 'profile',
        icon: 'UserIcon',
        meta: {
            requiresAuth: true,
            role: ROL_SUPER_ADMIN,
            permission: 'change-profile',
        },
    },
    {
        title: 'Bookings',
        icon: 'HomeIcon',
        route: 'bookings',
        meta: {
            requiresAuth: true,
            role: ROL_CORPORATE_ACCOUNT,
            permission: null,
        },
        children: [{
                title: 'Request a trip',
                route: 'request-service',
                meta: {
                    requiresAuth: true,
                    role: ROL_CORPORATE_ACCOUNT,
                    permission: null,
                },
            },
            {
                title: 'Bookings',
                route: 'bookings',
                meta: {
                    requiresAuth: true,
                    role: ROL_CORPORATE_ACCOUNT,
                    permission: null,
                },
            },
        ],
    },
    {
        title: 'Patients',
        icon: 'MapPinIcon',
        route: 'all-patient',
        meta: {
            requiresAuth: true,
            role: ROL_CORPORATE_ACCOUNT,
            permission: null,
        },
        children: [{
                title: 'Create a patient',
                route: 'create-patient',
                meta: {
                    requiresAuth: true,
                    role: ROL_CORPORATE_ACCOUNT,
                    permission: null,
                },
            },
            {
                title: 'Patients',
                route: 'all-patient',
                meta: {
                    requiresAuth: true,
                    role: ROL_CORPORATE_ACCOUNT,
                    permission: null,
                },
            },
        ],
    },
    {
        title: 'Billing',
        route: 'billing',
        icon: 'DollarSignIcon',
        meta: {
            requiresAuth: true,
            role: ROL_CORPORATE_ACCOUNT,
            permission: null,
        },
    },
    {
        title: 'Profile',
        route: 'profile',
        icon: 'UserIcon',
        meta: {
            requiresAuth: true,
            role: ROL_CORPORATE_ACCOUNT,
            permission: null,
        },
    },

]