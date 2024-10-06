'use client'
import React, {useState} from 'react'
import todoIcon from '../../public/todo.svg'
import Image from 'next/image'
import { Checkbox } from '@/components/ui/checkbox'
import chevronLeft from '../../public/chevron-left.svg'

export default function SideBar() {
    const [task, setTask] = useState<string>('')
    const [todos, setTodos] = useState<string[]>(["Task 1", "Task 2", "Task 3", "Task 4", "Task 5"])

    // Add task to the list
    const handleAddTask = () => {
        if (task.trim()) {
            setTodos([...todos, task])
            setTask('') // Clear the input after adding
        }
    }

    // Calculate the number of empty lines needed
    const emptyLines = 11 - todos.length > 0 ? 10 - todos.length : 0

    return (
        <div className = "absolute w-full h-[98%]">
            <div className = "bg-white w-[78px] h-[88px] absolute z-10 left-[18%] flex justify-end items-center pr-5 rounded-r-[30px]">
                <div>
                    <Image src = {chevronLeft} alt = "arrow icon" width = {24} height = {24}/>
                </div>
            </div>
            <div className="h-full w-[20%] bg-white rounded-b-[30px] flex flex-col gap-y-10">
            <div className="flex flex-row items-center w-full pl-8 pt-6 gap-x-4">
                <div>
                    <Image src={todoIcon} alt="Todo Icon" width={24} height={27}/>
                </div>
                <span className="text-[#141414] text-2xl font-semibold">
                    10/5's Todos
                </span>
            </div>

            <div className="w-full h-full overflow-y-scroll flex flex-col px-8 gap-y-6">
                <div className="w-full flex flex-col gap-y-2">
                    <div className="flex flex-row items-center gap-x-3">
                        <button 
                            onClick={handleAddTask} 
                            className="bg-[#141414] w-[18px] h-[18px] flex justify-center items-center rounded-[6px]"
                        >
                            <span className="text-white text-sm">+</span>
                        </button>
                        <input 
                            type="text" 
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            placeholder="Add task" 
                            className="text-[#141414] text-sm placeholder:text-[#141414] focus:outline-none"
                        />
                    </div>
                    <div className="h-[1px] bg-[#F4F4F4]"/>
                </div>

                {todos.map((todo, index) => (
                    <div key={index} className="flex flex-col gap-y-2">
                        <div className="flex flex-row items-center gap-x-4">
                            <Checkbox/>
                            <span className="text-[#141414] text-sm">{todo}</span>
                        </div>
                        <div className="h-[1px] bg-[#F4F4F4]"/>
                    </div>
                ))}

                <div className="h-[1px] bg-white"/>

                {/* Render empty lines if todos are less than 11 */}
                {Array.from({ length: emptyLines }).map((_, index) => (
                    <div key={todos.length + index} className="h-5">
                        <div className="h-[1px] bg-[#F4F4F4]"/>
                    </div>
                ))}
            </div>
        </div>

        </div>
        
    )
}
