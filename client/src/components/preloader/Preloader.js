import React from 'react'
import './Preloader.css'

export default function Preloader() {
  return (
    <div className="load-wrapper">
      <h1>Digital Contractor Loading...  </h1>
      <div className="preload">    
        <span class="loader-inner"></span>
      </div>
    </div>
    
  )
}

window.addEventListener("load", () => {
  const preload = document.querySelector('.load-wrapper')
  preload.classList.add('preload-finish')
})

