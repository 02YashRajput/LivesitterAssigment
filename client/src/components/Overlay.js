import React, { useRef, useState, useEffect } from "react"; // Importing necessary hooks from React
import { IoIosClose } from "react-icons/io"; // Importing close icon
import { MdOutlineEdit } from "react-icons/md"; // Importing plus icon for adding images
import { Rnd } from "react-rnd"; // Importing Rnd for draggable and resizable overlays
import axios from "axios"; // Importing axios for making API requests

// Overlay functional component
const Overlay = ({ overlay, index, onClose, setOverlays }) => {
    const contentRef = useRef(null); // Reference to the content editable div
    const [edited, setEdited] = useState(false); // State to track if the overlay content is edited
    const [rnd, setRnd] = useState(() => ({
        id: overlay.id, // Overlay ID
        content: overlay.content, // Content of the overlay
        type: overlay.type, // Type of overlay (text or image)
        width: overlay.width, // Width of the overlay
        height: overlay.height + 20, // Height of the overlay (with padding)
        x: overlay.x, // X position of the overlay
        y: overlay.y, // Y position of the overlay
    }));

    let typingTimer; // Timer for managing typing delay
    const typingDelay = 1000; // Delay time in milliseconds (1 second)

    // Function to update overlay position on drag
    const setPositions = (e, direction) => {
        setRnd((prev) => ({
            ...prev,
            x: direction.x, // Update X position
            y: direction.y, // Update Y position
        }));
    };

    // Function to update overlay size on resize
    const setSize = (e, direction, ref, delta, position) => {
        setRnd((prev) => ({
            ...prev,
            width: parseInt(ref.style.width, 10), // Update width
            height: parseInt(ref.style.height, 10), // Update height
            ...position, // Maintain updated position
        }));
    };

    // Function to handle input changes in the content editable area
    const handleInput = (e) => {
        const { scrollHeight } = e.target; // Get the scroll height of the input
        setEdited(true); // Mark content as edited
        if (scrollHeight > rnd.height) { // If input exceeds current height
            setRnd((prev) => ({
                ...prev,
                height: scrollHeight + 20, // Adjust height accordingly
            }));
        }
    };

    // Effect to manage typing delay and update content after user stops typing
    useEffect(() => {
        const handleStopTyping = () => {
            if (edited) {
                setEdited(false); // Reset edited state
                setRnd((prev) => ({
                    ...prev,
                    content: contentRef.current.innerHTML, // Update content state
                }));
                console.log("Content updated after user stopped typing for 1 second.");
            }
        };

        const startTypingTimer = () => {
            clearTimeout(typingTimer); // Clear existing timer
            typingTimer = setTimeout(handleStopTyping, typingDelay); // Set new timer
        };

        if (contentRef.current) {
            contentRef.current.addEventListener("input", startTypingTimer); // Add event listener for input changes
        }

        return () => {
            if (contentRef.current) {
                contentRef.current.removeEventListener("input", startTypingTimer); // Clean up event listener on unmount
            }
            clearTimeout(typingTimer); // Clear timer on unmount
        };
    }, [edited]); // Depend on edited state

    // Function to update overlay data on the server
    const updateOverlay = async () => {
        try {
            const response = await axios.put('http://127.0.0.1:5000/', {
                id: rnd.id,
                x: rnd.x,
                y: rnd.y,
                width: rnd.width,
                height: rnd.height,
                type: rnd.type,
                content: rnd.content,
            });
            console.log(response.data); // Log the response data
        } catch (error) {
            console.error('Error updating overlay:', error.response?.data || error.message); // Log any errors
        }
    };

    // Effect to trigger updateOverlay when rnd changes
    useEffect(() => {
        updateOverlay();
    }, [rnd]); // Depend on rnd state

    // Function to handle overlay close action
    const handleClose = () => {
        onClose(index); // Call onClose with the index of the overlay
    };

    // Function to add an image to the overlay
    const addImage = async () => {
        const fileInput = document.createElement('input'); // Create a file input element
        fileInput.type = 'file'; // Set input type to file
        fileInput.accept = 'image/*'; // Accept only images
        fileInput.onchange = async (event) => {
            const file = event.target.files[0]; // Get the selected file
            if (file) {
                const reader = new FileReader(); // Create a FileReader to read the file
                reader.onloadend = () => {
                    const base64data = reader.result; // Get the Base64 encoded data
                    setRnd((prev) => ({
                        ...prev,
                        content: base64data, // Set the overlay content to the Base64 data
                        type: 'image', // Set the overlay type to image
                    }));
                };
                reader.readAsDataURL(file); // Read the file as a Data URL (Base64)
            }
        };
        fileInput.click(); // Trigger the file input click event
    };

    // Effect to update the overlays state with the current rnd state
    useEffect(() => {
        setOverlays((prev) => {
            const updatedOverlays = [...prev]; // Create a copy of the previous overlays
            updatedOverlays[index] = rnd; // Update the specific overlay at the index
            return updatedOverlays; // Return the updated overlays
        });
    }, [rnd]); // Depend on rnd state

    return (
        <Rnd
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", position: "relative", padding: "10px" }} // Styling for the Rnd component
            className="overlay" // CSS class for the overlay
            size={{ width: rnd.width, height: rnd.height }} // Set the size of the overlay
            position={{ x: rnd.x, y: rnd.y }} // Set the position of the overlay
            onDragStop={setPositions} // Handle drag stop
            onResizeStop={setSize} // Handle resize stop
        >
            {rnd.type === "image" ? ( // Conditional rendering based on overlay type
                <img
                    src={rnd.content} // Image source set to overlay content
                    alt="Overlay" // Alt text for the image
                    style={{ width: "100%", height: "auto", maxHeight: rnd.height - 20, objectFit: "contain" }} // Image styling
                />
            ) : (
                <div
                    ref={contentRef} // Reference for the content editable div
                    contentEditable // Make the div editable
                    suppressContentEditableWarning // Suppress warnings for content editable
                    style={{ width: "100%", height: "auto", outline: "none", cursor: "text", color: "white" }} // Styling for the editable div
                    onInput={handleInput} // Handle input changes
                >
                    {rnd.content} {/* Displays current content */}
                </div>
            )}
            <button
                style={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    cursor: "pointer",
                    backgroundColor: "transparent",
                    border: "none",
                    color: "white",
                    padding: "0px",
                    fontSize: "20px",
                    zIndex: "50",
                }}
                onClick={handleClose} // Close overlay when clicked
            >
                <IoIosClose /> {/* Close icon */}
            </button>
            {rnd.type === "image" && ( // If overlay type is image, show the add image button
                <button
                    onClick={addImage} // Trigger addImage function on click
                    style={{
                        position: "absolute",
                        bottom: "-10px",
                        right: "-10px",
                        cursor: "pointer",
                        backgroundColor: "transparent",
                        border: "none",
                        color: "white",
                        zIndex: "50",
                        fontSize: "15px",
                    }}
                >
                    <MdOutlineEdit style={{ color: "white" }} /> {/* Plus icon for adding image */}
                </button>
            )}
        </Rnd>
    );
};

export default Overlay; // Exporting the Overlay component for use in other parts of the application
