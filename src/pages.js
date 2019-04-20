import React from 'react';

import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import Circles from './components/ContentPages/Circles/Circles';
import Favorites from './components/ContentPages/Favorites/Favorites';
import Settings from './components/ContentPages/Settings/Settings';

const PAGES = [
    {
        label: 'Circles',
        path: '/circles',
        icon: (<RestoreIcon />),
        component: Circles 
    },
    {
        label: 'Favorites',
        path: '/favorites',
        icon: (<FavoriteIcon />),
        component: Favorites,
    },
    {
        label: 'Settings',
        path: '/settings',
        icon: (<LocationOnIcon/>),
        component: Settings
    },
]

export default PAGES;
