import React from 'react';
import { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


export const withSuspense = (Component) => {

    return (props) => {
        return <React.Suspense fallback={<div>Loading...</div>}> 
            <Component {...props} />
        </React.Suspense>

    }
}