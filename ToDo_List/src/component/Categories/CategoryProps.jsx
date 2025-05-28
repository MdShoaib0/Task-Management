import React from 'react'

function CategoryProps({ name, color, activeColor, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`${color} text-white font-bold h-14 rounded-lg outline-none border-none shadow-xl shadow-gray-300 cursor-pointer active:${activeColor} active:scale-97 transition-all duration-200`}>
            {name}
        </button>
    )
}

export default CategoryProps