import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './views'
import { Analytics } from '@vercel/analytics/react'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Analytics />
        {Router}
    </StrictMode>
)
