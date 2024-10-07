# API Documentation

This API allows you to create, retrieve, update, and delete overlays in a MongoDB database. It is built with Flask and uses PyMongo to interact with MongoDB.

## Base URL

`http://localhost:5000/`

## Overview

The Overlay Management API provides the following endpoints for managing overlays and serving HLS streams:

### Endpoints

#### 1. Create Overlay

**Endpoint:** `POST /`

**Description:** Creates a new overlay.

-   **Request Body:**
    
    ```json
    {
    	"x": "int",
    	"y": "int",
    	"width": "int",
    	"height": "int",
    	"type": "str",
    	"content": "str"
    } 
    ```

-   **Response:**
    
    -   Success (201):
        
        ```json
        {
        	"message": "Overlay created",
        	"overlay": {
        		"x": "int",
        		"y": "int",
        		"width": "int",
        		"height": "int",
        		"type": "str",
        		"content": "str",
        		"id": "str"
        	}
        }
        ```

    -   Error (500):
        
        ```json
        {
        	"error": "Error message describing the issue"
        }
        ```

#### 2. Get Overlays

**Endpoint:** `GET /`

**Description:** Retrieves all overlays.

-   **Response:**
    
    -   Success (200):
        
        ```json
        [
        	{
        		"x": "int",
        		"y": "int",
        		"width": "int",
        		"height": "int",
        		"type": "str",
        		"content": "str",
        		"id": "str"
        	}
        ]
        ```

    -   Error (500):
        
        ```json
        {
        	"error": "Error message describing the issue"
        }
        ```

#### 3. Update Overlay

**Endpoint:** `PUT /`

**Description:** Updates an existing overlay.

-   **Request Body:**
    
    ```json
    {
    	"id": "str",
    	"x": "int",
    	"y": "int",
    	"width": "int",
    	"height": "int",
    	"type": "str",
    	"content": "str"
    }
    ```

-   **Response:**
    
    -   Success (200):
        
        ```json
        {
                "message": "Overlay updated"
        }
        ```

    -   Error (400):
        
        ```json
        {
        	"error": "Missing overlay ID"
        }
        ```

    -   Error (404):
        
        ```json
        {
        	"message": "No overlay found with that ID"
        }
        ```

    -   Error (500):
        
        ```json
        {
        	"error": "Error message describing the issue"
        }
        ```

#### 4. Delete Overlay

**Endpoint:** `DELETE /<string:overlay_id>`

**Description:** Deletes an existing overlay.

-   **Path Parameter:**
    
    `overlay_id`: ID of the overlay to delete.

-   **Response:**
    
    -   Success (200):
        
        ```json
        {
        	"message": "Overlay deleted"
        }
        ```

    -   Error (400):
        
        ```json
        {
        	"error": "Missing overlay ID"
        } 
        ```

    -   Error (404):
        
        ```json
        {
        	"message": "No overlay found with that ID"
        }
        ```

#### 5. Serve HLS Stream

**Endpoint:** `GET /stream`

**Description:** Serves the HLS stream.

-   **Response:**
    -   Success (200):
        
        The HLS stream file (`output.m3u8`) will be served.

#### 6. Redirect HLS Segment

**Endpoint:** `GET /<path:filename>`

**Description:** Redirects to the static directory for HLS segment files.

-   **Response:**
    
    -   Success (302): Redirects to the corresponding static file.

#### 7. Serve HLS Segment Files

**Endpoint:** `GET /static/<path:filename>`

**Description:** Serves HLS segment files (.ts).

-   **Response:**
    
    -   Success (200): Serves the requested HLS segment file.

