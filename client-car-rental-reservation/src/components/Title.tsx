import React from 'react'

const Title = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="text-3xl font-bold py-7 text-center">
        {children}
    </div>
  )
}

export default Title