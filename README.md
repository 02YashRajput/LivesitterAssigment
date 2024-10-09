
  

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

ffmpeg  -probesize  100M  -analyzeduration  100M \

-i "rtsp://rtspstream:fc8470ae3dfc2a8d513877a79db41200@zephyr.rtsp.stream/movie" \

-c:v  libx264  -crf  20  -preset  fast \

-c:a aac -b:a 128k \

-f  hls \

-hls_time 10 -hls_list_size 0 \

-hls_segment_filename  "static/segment_%03d.ts" \

static/output.m3u8

```

1. ffmpeg:

  

	- The command-line tool used for processing video and audio files. FFmpeg can convert multimedia formats, stream media, and much more.

2. -probesize 100M:

  

	- This option sets the maximum number of bytes that FFmpeg will read from the input file for probing purposes (to identify the stream format). Increasing this value helps FFmpeg analyze more data from the stream, which can improve detection accuracy, especially for complex or variable bitrate streams.

3. -analyzeduration 100M:

  

	- Specifies the maximum duration (in microseconds) that FFmpeg will spend analyzing the input stream. A higher value allows FFmpeg to analyze more of the stream's initial data to better understand its characteristics. This can help when the stream has variable or non-standard properties.

4. -i:

  

	- This flag indicates the input file or stream. In this case, it's an RTSP (Real-Time Streaming Protocol) URL. The URL specifies where the video stream is being sourced from.

5. "rtsp://...":

  

	- The RTSP stream URL that provides the video source. It includes the protocol (rtsp://), a username and password (if required), and the address of the streaming server.

6. -c:v libx264:

  

	- Specifies the video codec to use for encoding the output video. libx264 is a widely used codec for encoding video into H.264 format, which is known for its good quality and compression efficiency.

7. -crf 20:

  

	- The Constant Rate Factor (CRF) value determines the quality of the output video. Lower values result in better quality, while higher values lead to lower quality. A value of 20 is generally considered to provide a good balance between quality and file size.

8. -preset fast:

  

	- This option specifies the encoding speed and compression efficiency. The fast preset will encode video faster, but may result in slightly larger file sizes compared to slower presets. Available options range from ultrafast (least efficient) to veryslow (most efficient).

9. -c:a aac:

  

	- Specifies the audio codec to use for encoding the output audio. aac (Advanced Audio Codec) is a common audio format used in streaming and is supported by most devices.

10. -b:a 128k:

  

	- Sets the audio bitrate to 128 kbps. This defines the amount of data processed per second of audio, which affects sound quality. A bitrate of 128 kbps is typically a good balance for streaming.

11. -f hls:

  

	- Specifies the output format. hls stands for HTTP Live Streaming, which is a popular streaming protocol used for delivering media over the internet.

12. -hls_time 10:

  

	-	Sets the target duration of each HLS segment to 10 seconds. HLS breaks the video into small chunks, or segments, which allows for adaptive streaming.

13. -hls_list_size 0:

  

	- This option controls the number of segments that are kept in the playlist. Setting it to 0 means that all segments will be kept in the playlist indefinitely. If set to a positive number, only that many segments will be retained.

14. -hls_segment_filename "static/segment_%03d.ts":

  

	- Specifies the naming convention for the output segment files. The pattern %03d means that segment files will be named with a three-digit number (e.g., segment_000.ts, segment_001.ts, etc.). The output will be saved in the static directory.

15. static/output.m3u8:

  

	- This is the output file name for the HLS playlist. The .m3u8 extension indicates that it's a UTF-8 encoded M3U playlist file, which is used by HLS to list the available video segments for streaming.

  
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