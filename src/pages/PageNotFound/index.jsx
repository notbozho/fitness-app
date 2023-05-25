import React from 'react'
import { Link } from 'react-router-dom'

import CAT_404 from '../../assets/cat_404.jpg'

import './PageNotFound.css'

export default function PageNotFound() {
  return (
    <div className="pagenotfound-container">
      <img src={CAT_404} alt="404" />
      <h1>404</h1>
      <p>The page you&apos;re looking for doesn&apos;t exist :(</p>

      <Link to="/Login" className="home">
        Go to home
      </Link>
    </div>
  )
}
