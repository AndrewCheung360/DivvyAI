"use client"
import React, { useRef, useState } from "react"

export default function GetAssignmentForm() {
    const [assignmentId, setAssignmentId] = useState<string>("");
    const [assignmentData, setAssignmentData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAssignmentId(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch(`/api/assignment/${assignmentId}?pdf=true`);
            if (!response.ok) {
                console.log("response not ok");
                throw new Error(`Error: ${response.statusText}`);
            }
            const file = await response.blob();
            const fileURL = window.URL.createObjectURL(file);
            console.log(`file data is ${file}`);
            console.log(`file url is ${fileURL}`);

            const link = document.createElement('a');
            link.href = fileURL;
            link.download = `assignment_${assignmentId}.pdf`; // Suggested file name
            link.click();
    
            console.log("File download started.");
            
            setAssignmentData(file);
            setError(null);
        } catch (err: any) {
            console.error("Error:", err.message);
            setError(err.message);
            setAssignmentData(null);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    value={assignmentId}
                    onChange={handleInputChange}
                    placeholder="Enter Assignment ID"
                    className="border p-2 rounded"
                />
                <button
                    type="submit"
                    className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Get Assignment
                </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {assignmentData && (
                <div className="mt-4">
                    <h3>Assignment Data:</h3>
                    <pre>{JSON.stringify(assignmentData, null, 2)}</pre>
                </div>
            )}
        </form>
    );
}