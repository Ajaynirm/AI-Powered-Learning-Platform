import React from 'react'

const Footer = () => {
  return (
    <>
        <div className='container-foot'>
        <footer className="footer footer-center bg-base-300 text-base-content p-4">
  <aside>
  <footer className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
  <p>
    Copyright © {new Date().getFullYear()} Ajay - All rights reserved.
  </p>
  <p>
    Licensed under <a href="https://opensource.org/licenses/MIT" className="underline hover:text-blue-500" target="_blank" rel="noopener noreferrer">MIT License</a>.
  </p>
</footer>

  </aside>
</footer>
        </div>
    </>
  )
}

export default Footer