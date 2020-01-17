import React from 'react';

import { 
    ListRounded as ListIcon, 
    FavoriteRounded as FavoriteIcon, 
    SettingsRounded as SettingsIcon,
    MapRounded as MapIcon,
} from '@material-ui/icons';

import Circles from './components/ContentPages/Circles/Circles';
import Favorites from './components/ContentPages/Favorites/Favorites';
import Settings from './components/ContentPages/Settings/Settings';
import Top from './components/ContentPages/Top/Top';
import Map from './components/ContentPages/Map/map';

const PAGES = [
    {
        title: 'トップ',
        label: 'Top',
        path: '/',
        exact: true,
        component: Top,
        searchable: false,
        editable: false,
    },
    {
        title: 'サークルリスト',
        label: 'Circles',
        path: '/circles',
        icon: (<ListIcon />),
        component: Circles,
        searchable: true,
        editable: false,
    },
    {
        title: 'サークル詳細',
        path: '/circles/:number',
        searchable: false,
        editable: true,
    },
    {
        title: 'サークル編集',
        path: '/circles/:number/edit',
        searchable: false,
        editable: false,
    },
    {
        title: 'お気に入り',
        label: 'Favorites',
        path: '/favorites',
        icon: (<FavoriteIcon />),
        component: Favorites,
        searchable: true,
        editable: false,
    },
    {
        title: 'マップ',
        label: 'Map',
        path: '/map',
        icon: (<MapIcon />),
        component: Map,
        searchable: false,
        editable: false,
    },
    {
        title: '設定',
        label: 'Settings',
        path: '/settings',
        icon: (<SettingsIcon />),
        component: Settings,
        searchable: false,
        editable: false,
    },
]

export default PAGES;
