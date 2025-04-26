import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

const sharedRoutes: Routes = [
    {
        key: 'homePage',
        path: `/shared-home`, // Publicly accessible home page
        component: lazy(() => import('@/views')),
        authority: [], // No specific authority, accessible to everyone
    },
   
]

export default sharedRoutes
