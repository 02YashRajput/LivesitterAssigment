
  

# User Documentation

  

## 1. Fork and Clone the Repository

1.  **Fork the Repository**:

  

- Go to the repository URL and click on the **Fork** button to create a copy under your GitHub account.

  

2.  **Clone the Forked Repository**:

  

- In your terminal, clone the repository to your local machine:

```bash

git clone <your-forked-repository-url>

```

3.  **Navigate to the Project Directory**:

  

- Change into the project directory:

```bash

cd <LivesitterAssigment>

```

## 2. Set Up the Client (React)

  

1.  **Navigate to the Client Directory**:

```bash

cd client

```

  

2.  **Install Dependencies**:

``` bash

npm install

```

3.  **Start the Client**:

- Run the following command to start the React development server:

```bash

npm start

```

- The client will typically be available at `http://localhost:3000`

## 3. Set Up the Server (Flask)

  

1.  **Navigate to the Server Directory**:

```bash

cd server

```

2.  **Create a Virtual Environment**:

```bash

python -m venv venv

```

3.  **Activate the Virtual Environment**:

- On macOS/Linux:

```bash

source venv/bin/activate

```

- On Windows:

```bash

venv\Scripts\activate

```

4.  **Install Python Dependencies**:

```bash

pip install -r requirements.txt

```

5.  **Start the Server**:

- Run the following command to start the Flask server:

```bash

python app.py

```

- The server will typically run on `http://127.0.0.1:5000`.
## 4. Inputting the RTSP URL with `ffmpeg`

To process an RTSP stream using `ffmpeg`, you can use the following command in your terminal: 
```bash 
ffmpeg -analyzeduration 10000000 -probesize 10000000 -i "rtsp://rtspstream:36db633d016c43cca6ab857176ae6417@zephyr.rtsp.stream/pattern" \ -c:v copy -c:a aac -hls_time 10 -hls_list_size 0 -f hls static/output.m3u8
```
### Explanation of the Command:

-   `-analyzeduration 10000000`: Sets the duration for analyzing the input stream (in microseconds).
-   `-probesize 10000000`: Sets the maximum size of the probe (in bytes) used to detect the input format.
-   `-i "rtsp://...`: Specifies the RTSP URL for the input stream.
-   `-c:v copy`: Copies the video codec without re-encoding.
-   `-c:a aac`: Encodes the audio to AAC.
-   `-hls_time 10`: Sets the segment duration for HLS output to 10 seconds.
-   `-hls_list_size 0`: Sets the playlist size to unlimited.
-   `-f hls`: Specifies the output format as HLS.
-   `static/output.m3u8`: The output file where the HLS playlist will be saved.

Make sure to replace the RTSP URL in the command with your desired stream URL before running the command.


## 5. Manage Overlays in Livestream Application

This document provides an overview of managing overlays in the livestream application using React. The application allows users to add, edit, and delete overlays (text or images) that can be positioned and resized on a video stream.


### Table of Contents

1.  [Introduction](#introduction)
2.  [Components](#components)
    -   [App Component](#app-component)
    -   [Video Player Component](#video-player-component)
    -   [Overlay Component](#overlay-component)
3.  [State Management](#state-management)
4.  [Adding Overlays](#adding-overlays)
5.  [Editing Overlays](#editing-overlays)
6.  [Deleting Overlays](#deleting-overlays)
7.  [Image Uploads](#image-uploads)
8.  [Styling Overlays](#styling-overlays)
9.  [Server Integration](#server-integration)

### Introduction

The application allows users to overlay text and images on a video stream. Users can interact with the overlays to move, resize, and delete them as needed.

### Components

#### App Component

The main component that handles the creation and management of overlays. It includes:

-   State variables for managing overlays, input types, and content.
-   Functions for adding, deleting, and fetching overlays from the server.
-   A form for user input to create overlays.

##### Key Functions

-   `addOverlay()`: Adds a new overlay to the state and sends it to the server.
-   `onClose()`: Removes an overlay based on its index.
-   `handleImageUpload()`: Converts uploaded images to Base64 format.

#### Video Player Component

This component displays the video stream and renders the overlays on top of it, ensuring the overlays are correctly positioned and visible.

#### Overlay Component

This component represents individual overlays. It allows users to edit the content, move, and resize the overlays.

##### Key Functions

-   `setPositions()`: Updates the overlay's position when dragged.
-   `setSize()`: Updates the overlay's size when resized.
-   `handleInput()`: Manages input changes in editable overlays.
-   `updateOverlay()`: Sends updated overlay data to the server.

### State Management

The application uses React's `useState` and `useEffect` hooks for state management. The `overlays` state holds the current overlays, while the `inputType` and `inputContent` states manage the input for new overlays.

### Adding Overlays

Users can add overlays by selecting the type (text or image) and entering the content. When an overlay is added, it is sent to the server via a POST request, and the state is updated.

### Editing Overlays

Overlays are editable via a content-editable div. Changes are captured in real-time, and updates are sent to the server after a delay when the user stops typing.

### Deleting Overlays

Users can delete overlays using a close button on each overlay. This triggers a DELETE request to the server to remove the overlay from the database.

### Image Uploads

Users can upload images to use as overlays. Uploaded images are converted to Base64 strings and stored in the overlay's content state.

### Styling Overlays

Overlays are styled using inline styles and CSS properties. The `Rnd` component from the `react-rnd` library allows for drag-and-drop functionality and resizing capabilities.

### Server Integration

The application communicates with a backend server via Axios for managing overlays. The following endpoints are used:

-   **GET** `/`: Fetch existing overlays.
-   **POST** `/`: Add a new overlay.
-   **DELETE** `/:id`: Remove an overlay by ID.
-   **PUT** `/`: Update overlay data.