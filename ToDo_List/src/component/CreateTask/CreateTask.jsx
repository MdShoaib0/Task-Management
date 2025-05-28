// import React from 'react'
// import Buttons from './Buttons';

// function CreateTask() {

//     const [taskArray, setTaskArray] = useState([]);
    
//       const URL = "http://localhost:3000";
    
//       // Fetch tasks from backend
//       const renderTask = () => {
//         fetch(URL)
//           .then(response => response.json())
//           .then(data => setTaskArray(data))
//           .catch(error => console.error(error));
//       };
    
//       // Load tasks on mount
//       useEffect(() => {
//         renderTask();
//       }, []);

//   return (
//     <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12'>
//         {
//           taskArray.map((data, index) => {
//             return (
//               <div key={index} className='flex flex-col gap-2 bg-pink-400 rounded-2xl shadow-2xl shadow-slate-400 p-4'>
//                 <div className='flex justify-between'>
//                   <div className='flex flex-col gap-2'>
//                     <h1 className='text-2xl font-bold'>{data.title}</h1>
//                     <p className='font-medium'>{data.category}</p>
//                   </div>
//                   <div className='flex flex-col w-24'>
//                     <Buttons name="Complete" color="bg-emerald-500" active="bg-emerald-300"/>
//                   </div>
//                 </div>
//                 <p>{data.description}</p>
//               </div>
//             )
//           })
//         }
//       </div>
//   )
// }

// export default CreateTask