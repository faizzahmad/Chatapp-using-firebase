import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Notifications() {
  return (
    <div>
        <ToastContainer position='bottom-right'/>
    </div>
  )
}