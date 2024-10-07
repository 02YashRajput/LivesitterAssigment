import React, { useEffect, useState } from 'react';
import VideoPlayer from './components/VideoPlayer'; // Importing the VideoPlayer component
import axios from 'axios'; // Importing axios for HTTP requests

function App() {
    // State variables
    const [overlays, setOverlays] = useState([]); // State to store overlays
    const [inputType, setInputType] = useState('text'); // State to track the type of overlay (text or image)
    const [inputContent, setInputContent] = useState(''); // State to track the content of the overlay

    // Function to add a new overlay
    const addOverlay = async () => {
        const newOverlay = {
            type: inputType, // 'text' or 'image'
            content: inputContent, // Text content or image URL
            x: 10, // Default positioning
            y: 10,
            width: '50px', // Default size
            height: '50px'
        };

        // Send a POST request to add the new overlay to the server
        const res = await axios.post("http://127.0.0.1:5000/", newOverlay);
        
        // Update the overlays state with the new overlay
        setOverlays([...overlays, res.data.overlay]);
        setInputContent(''); // Clear input after adding overlay
    };

    // Function to handle overlay removal
    const onClose = async (i) => {
        try {
            // Send a DELETE request to remove the overlay by its unique id
            await axios.delete(`http://127.0.0.1:5000/${overlays[i].id}`); // Adjust this URL to match your API
            console.log(i);
            // Filter out the removed overlay from the overlays array
            const newOverlays = overlays.filter((_, index) => i !== index);
            console.log(newOverlays);
            setOverlays(newOverlays); // Update the state with the new overlays array
        } catch (err) {
            console.error('Error deleting overlay:', err);
        }
    };

    // Effect to log the overlays state when it changes
    useEffect(() => {
        console.log(overlays);
    }, [overlays]);

    // Effect to fetch existing overlays from the server on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:5000");
                console.log(res.data);
                setOverlays(res.data); // Update state with fetched overlays
            } catch (err) {
                console.log(err);
            }
        };
        fetchData(); // Call the fetch function
    }, []); // Empty dependency array means this runs once on mount

    // Function to handle image uploads
    const handleImageUpload = (e) => {
        const file = e.target.files[0]; // Get the uploaded file
        if (file) {
            const reader = new FileReader(); // Create a FileReader to read the file
            reader.onloadend = () => {
                setInputContent(reader.result); // Store the Base64 string of the image
            };
            reader.readAsDataURL(file); // Convert image to Base64
        }
    };

    // Render the component
    return (
        <div className="App">
            <h1>Livestream with Draggable and Resizable Overlays</h1>
            
            {/* Video Player Component */}
            <VideoPlayer 
                rtspUrl="https://wv-cdn-00-00.wowza.com/72c348da-7ff8-4ca5-9af9-3adb8c792185/v-00f1ddac-f87d-4a26-b8c4-ddf72f1e0e66_original.mp4" 
                overlays={overlays} 
                setOverlays={setOverlays}  
                onClose={onClose} 
            />

            {/* Overlay Controls */}
            <form className="overlay-controls">
                <select value={inputType} onChange={(e) => setInputType(e.target.value)}>
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                </select>
                
                {/* Conditional rendering based on the input type */}
                {inputType === 'text' ? (
                    <input
                        type="text"
                        value={inputContent}
                        onChange={(e) => setInputContent(e.target.value)}
                        placeholder="Enter text"
                    />
                ) : (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload} // Handle image upload
                    />
                )}
                
                <button onClick={addOverlay}>Add Overlay</button> {/* Button to add overlay */}
            </form>
        </div>
    );
}

export default App; // Exporting the App component
