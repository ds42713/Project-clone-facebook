import React from 'react'

import styles from '../../Auth.module.css'
import { Outlet } from 'react-router-dom'
export default function PublicLayOut() {
    return (
        <div className='container'>
            <div className='row align-items-center justify-content-center vh-100'>
                <div className='col-lg-7'>
                    <img
                        src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
                        className="w-50"
                        alt="fakebook-logo"
                    />
                    <h3 className={styles.h3}>
                        Facebook helps you connect and share with the people in your life.
                    </h3>
                </div>
                <div className='col-lg-5'>
                    <Outlet/>
                    <p className="pt-3 text-center">
                        <b>Create a Page</b> for a celebrity, band or business.
                    </p>
                </div>
            </div>
        </div>
    )
}
