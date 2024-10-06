"use client"
import React, { useState } from "react";
import AddAssignmentModal from '../add-assignment-modal/AddAssignmentModal';
import { Event } from "@/components/home/Scheduler";

type AddButtonProps = {
    events: Event[];
    setEvents: React.Dispatch<React.SetStateAction<any[]>>;
};

export default function AddButton({events, setEvents}: AddButtonProps) {
    // State to manage modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to toggle the modal visibility
    const handleButtonClick = () => {
        setIsModalOpen(true); // Show the modal when button is clicked
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal when needed (e.g., after adding an assignment or clicking a close button)
    };

    return (
        <>
            {/* The Add Assignment Button */}
            <button
                className="w-[262px] h-[66px] bg-[#141414] rounded-[50px] flex justify-center items-center border-2 border-[#141414] gap-x-3 transition-transform duration-200 hover:scale-110 hover:cursor-pointer group"
                onClick={handleButtonClick} // Trigger modal opening on click
            >
                <span className="text-white text-2xl font-light">+</span>
                <span className="text-white text-lg font-light">Add assignment</span>
            </button>

            {/* Conditionally render the modal */}
            {isModalOpen && (
                <AddAssignmentModal onClose={handleCloseModal} events={events} setEvents={setEvents} />
            )}
        </>
    );
}
