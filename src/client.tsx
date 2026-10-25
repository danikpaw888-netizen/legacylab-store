import './styles.css';
import React from 'react';
import {hydrateRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import type {Bootstrap} from './shared';
const element=document.getElementById('root');
const data=document.getElementById('bootstrap');
if(element&&data){const bootstrap=JSON.parse(data.textContent||'{}') as Bootstrap;hydrateRoot(element,<BrowserRouter><App bootstrap={bootstrap}/></BrowserRouter>);}
