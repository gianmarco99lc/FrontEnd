import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import BookIcon from '@mui/icons-material/Book';
import MapIcon from '@mui/icons-material/Map';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import SosIcon from '@mui/icons-material/Sos';

export const SidebarData = [
    {
        tittle: "Home",
        icon: <HomeIcon />,
        link: "/"
    },
    {
        tittle: "Usuarios",
        icon: <PeopleIcon />,
        link: "/usuarios"
    },
    {
        tittle: "Sentencias",
        icon: <BookIcon />,
        link: "/sentencias"
    },
    {
        tittle: "Zonas de seguridad",
        icon: <MapIcon />,
        link: "/zonasdeseguridad"
    },
    {
        tittle: "Puntos de control",
        icon: <ControlPointIcon />,
        link: "/puntosdecontrol"
    },
    {
        tittle: "Alertas",
        icon: <SosIcon />,
        link: "/alertas"
    }
]



