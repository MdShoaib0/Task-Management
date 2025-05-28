import React from 'react';

function Buttons(props) {
  const { name, color, active, onClick } = props;

  return (
    <div>
      <button
        onClick={onClick}
        className={`w-21 h-8 font-medium rounded-lg outline-none border-none shadow shadow-black text-white cursor-pointer 
          ${color} 
          active:${active}
          active:scale-97 
          transition-all duration-200`}
      >
        {name}
      </button>
    </div>
  );
}

export default Buttons;
