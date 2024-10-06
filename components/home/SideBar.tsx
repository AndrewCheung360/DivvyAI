'use client'
import React, { useState, useEffect } from 'react'
import todoIcon from '../../public/todo.svg'
import Image from 'next/image'
import { Checkbox } from '@/components/ui/checkbox'
import chevronLeft from '../../public/chevron-left.svg'

// Helper function to format the date as MM/DD
const getFormattedDate = () => {
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0') // Months are zero-indexed
  const day = String(today.getDate()).padStart(2, '0')
  return `${month}/${day}`
}

type Todo = {
  id: number
  text: string
  isEditing: boolean
  isDeleting: boolean // New property to track deletion animation
}

export default function SideBar() {
  const [task, setTask] = useState<string>('')
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Task 1', isEditing: false, isDeleting: false },
    { id: 2, text: 'Task 2', isEditing: false, isDeleting: false },
  ])
  const [nextId, setNextId] = useState<number>(3) // Track the next ID to use
  const [nextTaskNum, setNextTaskNum] = useState<number>(3) // Track the next task number for "Task X"

  // Function to add a new task automatically
  const addTaskAutomatically = () => {
    setTodos(prevTodos => [
      ...prevTodos,
      { id: nextId, text: `Task ${nextTaskNum}`, isEditing: false, isDeleting: false },
    ])
    setNextId(prevId => prevId + 1) // Increment the next ID
    setNextTaskNum(prevTaskNum => prevTaskNum + 1) // Increment the next task number
  }

  // Automatically add tasks every 5 seconds
  useEffect(() => {
 
  }, [nextId, nextTaskNum]) // Dependency array ensures this runs when IDs and task numbers update

  // Delete task from the list when checkbox is checked
  const handleDeleteTask = (id: number) => {
    // Find the task and mark it as deleting
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, isDeleting: true } : todo
      )
    )

    // After the animation completes, remove the task
    setTimeout(() => {
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
    }, 300) // The timeout matches the duration of the animation
  }

  // Toggle editing state for a task
  const toggleEditTask = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    )
    setTodos(updatedTodos)
  }

  // Handle task text change
  const handleTaskTextChange = (id: number, newText: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    )
    setTodos(updatedTodos)
  }

  // Calculate the number of empty lines needed
  const emptyLines = 11 - todos.length > 0 ? 10 - todos.length : 0

  return (
    <div className="absolute top-0 w-full h-full">
      <div className="bg-white w-[78px] h-[88px] absolute z-10 left-[18%] flex justify-end items-center pr-5 rounded-r-[30px]">
        <div>
          <Image src={chevronLeft} alt="arrow icon" width={24} height={24} />
        </div>
      </div>
      <div className="h-full w-[20%] bg-white shadow-2xl rounded-b-[30px] flex flex-col gap-y-10">
        <div className="flex flex-row items-center w-full pl-8 pt-6 gap-x-4">
          <div>
            <Image src={todoIcon} alt="Todo Icon" width={30} height={30} />
          </div>
          <span className="text-[#141414] text-3xl font-semibold">
            {getFormattedDate()}'s Todos
          </span>
        </div>

        <div className="w-full h-full overflow-y-scroll flex flex-col px-8 gap-y-6">
          <div className="w-full flex flex-col gap-y-2">
            <div className="flex flex-row items-center gap-x-3">
              <button
                onClick={addTaskAutomatically}
                className="bg-[#141414] w-[18px] h-[18px] flex justify-center items-center rounded-[6px]"
              >
                <span className="text-white text-sm">+</span>
              </button>
              <input
                type="text"
                value={task}
                onChange={e => setTask(e.target.value)}
                placeholder="Add task"
                className="text-[#141414] text-sm placeholder:text-[#141414] focus:outline-none"
              />
            </div>
            <div className="h-[1px] bg-[#F4F4F4]" />
          </div>

          {todos.map(todo => (
            <div
              key={todo.id}
              className={`flex flex-col gap-y-2 transition-opacity duration-300 ${
                todo.isDeleting ? 'opacity-0' : ''
              }`}
            >
              <div className="flex flex-row items-center gap-x-4">
                <Checkbox onCheckedChange={() => handleDeleteTask(todo.id)} />

                {/* If task is being edited, render input. Otherwise, render text */}
                {todo.isEditing ? (
                  <input
                    type="text"
                    value={todo.text}
                    onChange={e => handleTaskTextChange(todo.id, e.target.value)}
                    onBlur={() => toggleEditTask(todo.id)} // Toggle edit mode when the user leaves the input
                    className="text-[#141414] text-sm placeholder:text-[#141414] focus:outline-none"
                  />
                ) : (
                  <span
                    className="text-[#141414] text-sm cursor-pointer"
                    onClick={() => toggleEditTask(todo.id)}
                  >
                    {todo.text}
                  </span>
                )}
              </div>
              <div className="h-[1px] bg-[#F4F4F4]" />
            </div>
          ))}

          <div className="h-[1px] bg-white" />

          {/* Render empty lines if todos are less than 11 */}
          {Array.from({ length: emptyLines }).map((_, index) => (
            <div key={todos.length + index} className="h-5">
              <div className="h-[1px] bg-[#F4F4F4]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
