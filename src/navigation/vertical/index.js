export default [{
        title: 'Dashboard corporative',
        route: 'corporate-acount',
        icon: 'HomeIcon',
        children: [{
                title: 'Create a patient',
                route: 'create-patient',
            },
            {
                title: 'Request a trip',
                route: 'request-service',
            },
            {
                title: 'Patients',
                route: 'all-patient',
            },
        ],
    },
    {
        title: 'Bookings',
        icon: 'MapPinIcon',
        route: 'bookings'
    },
    {
        title: 'Support',
        icon: 'SettingsIcon',
        children: [{
            title: 'Difficult cases',
        }, ],
    },
    {
        title: 'Billing',
        route: 'billing',
        icon: 'DollarSignIcon',
    },
    {
        title: 'Profile',
        route: 'profile',
        icon: 'UserIcon',
    },
]