import { CircularProgress } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

export default () =>{
    const loader = useSelector(state => state.components.showLoader)

    return (
        <>
        {loader && (
        <div className="loader">
            <CircularProgress color="inherit"/>
        </div>
        )}
        </>
    )
}