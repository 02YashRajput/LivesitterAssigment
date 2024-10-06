# Overlay Management API

This API allows you to create, retrieve, update, and delete overlays in a MongoDB database. It is built with Flask and uses PyMongo to interact with MongoDB.

## Base URL

http://localhost:5000/



## Overview

The Overlay Management API provides the following endpoints for managing overlays:

### Endpoints

#### 1. Create Overlay

**Endpoint:** `POST /`  
**Description:** Creates a new overlay.  

**Request Body:**

```json
{
    "x": int,         // x-coordinate of the overlay
    "y": int,         // y-coordinate of the overlay
    "width": int,     // width of the overlay
    "height": int,    // height of the overlay
    "type": str,      // type of the overlay
    "content": str    // content of the overlay
}
```
**Response:**

+ Success (201):
```json

{
    "message": "Overlay created",
    "overlay": {
        "x": int,
        "y": int,
        "width": int,
        "height": int,
        "type": str,
        "content": str,
        "id": "string" // ID of the created overlay
    }
}

```

+ Error (500):
```json

{
    "error": "Error message describing the issue"
}

```
#### 2. Get Overlays
**Endpoint:** `GET /`

**Description:** Retrieves all overlays.

**Response:**

+ Success (200):

```json

[
    {
        "x": int,
        "y": int,
        "width": int,
        "height": int,
        "type": str,
        "content": str,
        "id": "string" // ID of the overlay
    },
    ...
]
```
+ Error (500):

```json

{
    "error": "Error message describing the issue"
}
```
#### 3. Update Overlay
**Endpoint:** `PUT /`

**Description:** Updates an existing overlay.

**Request Body:**

```json

{
    "id": "string",    // ID of the overlay to update
    "x": int,          // (optional) new x-coordinate
    "y": int,          // (optional) new y-coordinate
    "width": int,      // (optional) new width
    "height": int,     // (optional) new height
    "type": str,       // (optional) new type
    "content": str     // (optional) new content
}
```
**Response:**

+ Success (200):

```json

{
    "message": "Overlay updated"
}
```

+ Error (400):

```json
{
    "error": "Missing overlay ID"
}
```
+ Error (404):

```json

{
    "message": "No overlay found with that ID"
}
```
+ Error (500):

```json

{
    "error": "Error message describing the issue"
}
```
#### 4. Delete Overlay

**Endpoint:** `DELETE /<string:overlay_id>`

**Description:** Deletes an existing overlay.

**Path Parameter:**

`overlay_id`: ID of the overlay to delete.

**Response:**

+ Success (200):

```json

{
    "message": "Overlay deleted"
}
```
+ Error (400):

```json

{
    "error": "Missing overlay ID"
}
```
+ Error (404):

```json

{
    "message": "No overlay found with that ID"
}
```