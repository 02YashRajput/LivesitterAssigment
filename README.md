
# User Documentation

## 1. Fork and Clone the Repository
 1. **Fork the Repository**:  

-   Go to the repository URL and click on the **Fork** button to create a copy under your GitHub account.

  2. **Clone the Forked Repository**:

-   In your terminal, clone the repository to your local machine:
    
    ```bash
    git clone <your-forked-repository-url>
    ```
  3. **Navigate to the Project Directory**:

-   Change into the project directory:
    
    ```bash 
    cd <project-directory>
    ```
#### 2. Set Up the Client (React)

1.  **Navigate to the Client Directory**:
    
    ```bash
    cd client
    ```

2.  **Install Dependencies**:
    
	   ``` bash
	    npm install
	  ```
3.  **Start the Client**:
    
    -   Run the following command to start the React development server:
        
        ```bash
        npm start
        ```
  -   The client will typically be available at `http://localhost:3000`
 
 #### 3. Set Up the Server (Flask)

1.  **Navigate to the Server Directory**:
    
	   ```bash
	   cd server
    ```
		
2.  **Create a Virtual Environment**:
    
	   ```bash
	   python -m venv venv
    ```
3.  **Activate the Virtual Environment**:
    
    -   On macOS/Linux:
        
        ```bash
        source venv/bin/activate 
        ```
    -   On Windows:
        
        ```bash
        venv\Scripts\activate
        ```
    
 4.  **Install Python Dependencies**:
    
      ```bash
	   pip install -r requirements.txt
	    ```
5.  **Start the Server**:
    
    -   Run the following command to start the Flask server:
        
        ```bash
         flask run 
        ```
    -   The server will typically run on `http://127.0.0.1:5000`.
    