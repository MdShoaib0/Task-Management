import React, { useState, useEffect } from 'react';
import CategoryProps from '../Categories/CategoryProps';
import Buttons from '../CreateTask/Buttons';
import Navigation from '../Navigation/Navigation';
import { MdArrowDropDown } from "react-icons/md";

const URL = "http://localhost:3000";

function InputField() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [taskArray, setTaskArray] = useState([]);
  const [allTasks, setAllTasks] = useState([]);



  const Categories = [
    { name: "All", color: "bg-emerald-600", activeColor: "bg-emerald-500" },
    { name: "Normal", color: "bg-orange-600", activeColor: "bg-gray-500" },
    { name: "Must", color: "bg-pink-600", activeColor: "bg-pink-500" },
    { name: "Daily", color: "bg-purple-600", activeColor: "bg-purple-500" }
  ]

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setAllTasks(data);       // store full data
      setTaskArray(data);      // display all tasks by default
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };


  // Create task
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title.trim() || !category.trim() || !description.trim()) return;
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, description }),
      });
      const data = await response.json();
      console.log("Task created:", data);
      setTitle("");
      setCategory("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json();
      console.log("Deleted:", result);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const FilterTask = (categoryName) => {
    if (categoryName === "All") {
      setTaskArray(allTasks);
    } else {
      const filtered = allTasks.filter(task => task.category === categoryName);
      setTaskArray(filtered);
    }
  };


  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className='flex flex-col gap-16 py-12'>
      {/* Form */}
      <form onSubmit={handleCreateTask} className='flex flex-col gap-6'>
        <p className='text-xl text-pink-700 font-semibold'>Create your Task here..</p>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type='text'
          placeholder='Task Title'
          className='bg-white outline-none px-4 border-none h-14 rounded-lg shadow-lg'
        />

        <div className='relative w-full bg-white rounded-lg shadow-lg'>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='w-full h-14 px-4 pr-10 outline-none appearance-none bg-transparent'
          >
            <option value="">Categories</option>
            <option value="All">ALL</option>
            <option value="Normal">Normal</option>
            <option value="Must">Must</option>
            <option value="Daily">Daily</option>
          </select>
          <MdArrowDropDown size={27} className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Task Description'
          className='bg-white outline-none p-4 h-32 rounded-lg shadow-2xl mb-4'
        ></textarea>

        <CategoryProps name="Add Task" color="bg-red-600" activeColor="bg-red-500" />
      </form>

      {/* Static Components */}
      <div className='w-full grid grid-cols-2 gap-7'>
        {Categories.map((cat) => (
          <CategoryProps
            key={cat.name}
            name={cat.name}
            color={cat.color}
            activeColor={cat.activeColor}
            onClick={() => {
              FilterTask(cat.name);
            }}
          />
        ))}
      </div>
      <Navigation />

      {/* Task List */}
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12'>
        {taskArray.length > 0 ? taskArray.map((task, index) => (
          <div
            key={task._id || index}
            className='flex flex-col gap-2 bg-gradient-to-b from-emerald-200 to-emerald-600 rounded-3xl shadow-2xl shadow-slate-400 p-6'
          >
            <div className='flex justify-between'>
              <div className='flex flex-col gap-3'>
                <div className='flex items-center gap-2'>
                  <p className='w-9 h-9 flex justify-center items-center text-2xl font-bold rounded-full shadow bg-gradient-to-br from-blue-200 to-blue-600 text-white'>
                    {index + 1}
                  </p>
                  <p className='text-2xl font-bold'>{task.title}</p>
                </div>
                <p className='w-fit font-medium bg-pink-600 px-3 py-1 rounded-full text-white shadow cursor-pointer active:scale-95'>
                  {task.category}
                </p>
              </div>

              <div className='flex flex-col gap-1.5'>
                <Buttons name="Complete" color="bg-emerald-600" active="bg-emerald-400" />
                <Buttons name="Edit" color="bg-yellow-600" active="bg-yellow-400" />
                <Buttons
                  name="Delete"
                  color="bg-red-600"
                  active="bg-red-400"
                  onClick={() => handleDeleteTask(task._id)}
                />
              </div>
            </div>

            <p>{task.description}</p>
          </div>
        )) : (
          <p className='text-center text-gray-600 col-span-full'>No tasks available</p>
        )
        }
      </div>
    </div>
  );
}

export default InputField;