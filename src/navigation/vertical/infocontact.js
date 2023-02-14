export default [{
        title: 'Booking center',
        route: 'home-corporate-acount',
        icon: 'HomeIcon',
        meta: {
            requiresAuth: true,
            permission: '2',
        },
        children: [{
                title: 'Dispatch',
                route: 'reservations',
            },
            {
                title: 'Assign Driver',
                route: 'assign-driver',
            },
        ],
    },
    {
        title: 'Consult clients',
        icon: 'UserIcon',
        children: [{
                title: 'Corporate accounts',
                route: 'clients',
            },
            {
                title: 'Drivers',
                route: 'Drivers',
            },
            {
                title: 'Call/Chat center',
            },
        ],
    },
    {
        title: 'Reports',
        icon: 'CalendarIcon',
    },
    {
        title: 'Support',
        icon: 'SettingsIcon',
        children: [{
            title: 'Tickets',
        }, ],
    },
    {
        title: 'Billing',
        route: 'billing',
        icon: 'CreditCardIcon',
    },
    {
        title: 'Profile',
        route: 'profile',
        icon: 'UserIcon',
    },
]