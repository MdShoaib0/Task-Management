import React from 'react'

function CategoryProps({ name, color, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`${color} text-white font-bold h-14 rounded-lg outline-none border-none shadow-lg cursor-pointer active:scale-97 transition-all duration-300`}>
            {name}
        </button>
    )
}

export default CategoryProps