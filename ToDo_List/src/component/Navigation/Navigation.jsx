import { Link } from 'react-router';

function Navigation() {

  return (
    <div className='grid grid-cols-2 gap-8'>
      <Link className='text-white text-center font-bold py-4 bg-fuchsia-600 rounded-lg outline-none border-none shadow-lg cursor-pointer active:scale-97 transition-all duration-200' to="/prayer">Namaz</Link>
      <Link className='text-white text-center font-bold py-4 bg-rose-500 rounded-lg outline-none border-none shadow-lg cursor-pointer active:scale-97 transition-all duration-200' to="https://kabooter1.netlify.app/">Our Story</Link>
    </div>
  );

}

export default Navigation;