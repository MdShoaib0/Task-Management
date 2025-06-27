const gradients = {
  Fazar: 'from-blue-400 via-blue-600 to-indigo-500',
  Duhar: 'from-yellow-300 via-yellow-500 to-orange-500',
  Ashar: 'from-green-300 via-green-500 to-teal-500',
  Magrib: 'from-purple-400 via-pink-500 to-red-500',
  Esha: 'from-gray-600 via-gray-800 to-black',
};

// Reusable Prayer Card
function PrayerCard({ name, day, month, year, onClick }) {
  return (
    <div
      className={`w-full flex flex-col justify-center items-center bg-gradient-to-br ${gradients[name]} gap-6 p-6 rounded-3xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out`}
    >
      <p className='text-white text-3xl sm:text-4xl font-extrabold tracking-wide'>{name}</p>

      <div className='flex gap-6'>
        <div className="bg-white rounded-xl shadow py-3 px-4 w-28 text-center">
          <p className="text-lg font-semibold text-gray-800">Years</p>
          <p className="text-2xl font-bold text-blue-700">{year}</p>
        </div>
        <div className="bg-white rounded-xl shadow py-3 px-4 w-28 text-center">
          <p className="text-lg font-semibold text-gray-800">Months</p>
          <p className="text-2xl font-bold text-green-700">{month}</p>
        </div>
      </div>

      <button
        onClick={() => onClick(name)}
        className='mt-4 font-bold bg-white active:bg-slate-200 w-32 py-3 rounded-xl shadow-md active:scale-95 transition-all duration-300'
      >
        <span className="text font-bold text-gray-800">Days</span> <span className="text-rose-600">{day}</span>
      </button>
    </div>
  );
}

export default PrayerCard;