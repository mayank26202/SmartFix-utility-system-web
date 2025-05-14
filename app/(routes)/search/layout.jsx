import React from 'react'
import CategorySideBar from './_components/CategorySideBar'

function layout({ children }) {
  return (
    <div>
      {/* Category bar on mobile at top */}
      <div className="block md:hidden mt-25">
        <CategorySideBar />
      </div>

      {/* Grid layout for desktop */}
      <div className="grid grid-cols-1 md:grid-cols-4 mt-25">
        <div className="hidden md:block">
          <CategorySideBar />
        </div>
        <div className="md:col-span-3 px-2 md:px-4">
          {children}
        </div>
      </div>
    </div>
  )
}

export default layout
