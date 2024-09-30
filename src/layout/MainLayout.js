import React from 'react'
import Navbar from '../navigation/Navbar'
import Footer from '../navigation/Footer'

export default function MainLayout({ children }) {
    return (
        <div>
            <Navbar />
            {children}
            
        </div>
    )
}
