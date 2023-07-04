# Cash Loans Management System

This repository contains the source code for the Cash Loans Management System, a web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The system is designed to facilitate the management of client information and loan records for a cash loans business.

Links: 

Github: https://github.com/MrShifu01/MicroFinance2

Render.com Server Deployment: https://microfinance-server.onrender.com/

Vercel Deployed: 

## Clone Repository

To clone this repository, run the following command:

```
git clone https://github.com/MrShifu01/MicroFinance2
```

## Installation

### Frontend

1. Navigate to the `client` directory:

```
cd client
```

2. Install the frontend dependencies:

```
npm install
```

### Backend

1. Navigate to the `api` directory:

```
cd api
```

2. Install the backend dependencies:

```
npm install
```

## Folder Structure

```
MicroFinance/
  ├── api/              # Backend server files
  ├── client/           # Frontend client files
  ├── api/server.js     # Main Express server file
  └── ...
```

## Usage

To run the frontend and backend, you will need two separate terminal windows.

### Frontend

1. In the `client` directory, start the frontend development server:

```
npm start
```

2. Open your browser and access the web app at `http://localhost:3000`.

### Backend

1. In the `api` directory, start the backend server:

```
npm start
```

2. The backend server will start running on `http://localhost:8000`.

## Modifying JWT Secret and MongoDB URL

To modify the JWT secret and MongoDB URL used in the application, follow these steps:

1. Navigate to the `api` directory.

2. Create a `.env` file.

3. Open the `.env` file and modify the following variables:

```
MONGO_URL=your-mongodb-url
JWT_SECRET=your-api-key
```

Make sure to replace `your-mongodb-url` with your actual MongoDB connection URL and `jwt secret` with the appropriate secret.

## Security Measures

The Cash Loans Management System implements the following security measures:

1. **Password Encryption**: User passwords are securely stored using bcrypt encryption.

2. **Authentication**: JSON Web Tokens (JWT) are used for authentication, ensuring secure access to the system's features.

3. **Helmet**: The Helmet middleware is used to set various HTTP headers, providing additional security against common vulnerabilities.

4. **CORS**: Cross-Origin Resource Sharing (CORS) is configured to restrict access to API routes and prevent unauthorized requests.

## Deployment

To deploy the Cash Loans Management System, follow these steps:

1. Choose a cloud platform like Vercel or Render.

2. Configure the deployment settings according to the chosen platform's documentation.

3. Set the appropriate environment variables, including the MongoDB URL and API keys, in the deployment platform's settings.

4. Build and deploy the frontend and backend to the chosen platform using the provided deployment commands or scripts.

5. Access the deployed application through the provided URL.

## Original Readme (From planning phase)

Below is the original readme content for the Cash Loans Management System. Please refer to it for additional information about the project:

---

# Web App Plan: Cash Loans Management System

## System Architecture

The Cash Loans Management System will be developed using the MERN (MongoDB, Express.js, React.js, Node.js) stack, along with additional libraries and tools to fulfill the specified requirements.

Choice of Architecture:
The choice of the MERN (MongoDB, Express.js, React.js, Node.js) stack for the Cash Loans Management System is motivated by several factors. 

1. **Full-stack JavaScript**: The MERN stack allows for a seamless development experience by using JavaScript as the primary language across the entire application stack. This ensures consistency, code reuse, and easier collaboration between front-end and back-end.

2. **Scalability and Performance**: MongoDB, as a NoSQL database, offers high scalability and flexibility, making it suitable for managing large amounts of client and loan data. Express.js and Node.js provide a non-blocking, event-driven architecture, enabling the system to handle concurrent requests efficiently and deliver optimal performance.

3. **Rich UI and Interactivity**: React.js is a powerful front-end library known for its component-based architecture and virtual DOM. It enables the creation of dynamic and interactive user interfaces, which is essential for providing a smooth and intuitive experience in the Cash Loans Management System.

### Deployment Strategy:
The application will be deployed using a cloud platform like Vercel and/or Render. They provide easy deployment and scalability, allowing the application to be accessible to users over the internet. By using a cloud platform, the deployment process is streamlined, and the application can handle a potentially large number of concurrent users.

### Front-end Framework and Styling:
For the front-end development, Create React App (CRA) will be used. CRA is a popular toolchain that sets up a React.js project with a pre-configured build process, development server, and optimized production build. It allows to quickly bootstrap the project without worrying about complex configuration details.

The application will utilize Material-UI, a widely adopted UI component library, for styling and UI components. Material-UI offers a rich set of pre-built components that follow the Material Design guidelines, resulting in a professional and consistent visual experience. The choice of Material-UI simplifies styling and ensures a modern and responsive design for the Cash Loans Management System.

Tailwind CSS will also be used for custom CSS styling. Tailwind CSS provides a utility-first approach, allowing for rapid development and easy customization. It offers a comprehensive set of utility classes that can be used to style components, providing flexibility and maintainability in styling the application.

Overall, the choice of Create React App, Material-UI, and Tailwind CSS for front-end development ensures a smooth development experience, a visually appealing and responsive user interface, and efficient styling capabilities in line with the requirements of the Cash Loans Management System.

### Front-end Architecture

- **Front-end Framework**: React.js
- **UI Component Library**: Material-UI
- **Table Component**: Material React Table
- **State Management**: Redux with Redux Toolkit
- **Routing**: React Router
- **Date Formatting**: date-fns
- **Styling**: Tailwind CSS
- **Authentication**: Clerk (for login/sign-in methods)
- **HTTP Client**: Axios

### Back-end Architecture

- **Back-end Framework**: Node.js with Express.js
- **Database**: MongoDB
- **Object Modeling**: Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: HTTP Cookies for JWT and Helmet
- **Password Encryption**: bcrypt
- **CSV Data Import**: csv-parser
- **Middleware**: Cors, Body Parser, Cookie Parser
- **Environment Variables**: dotenv

## System Requirements Specification

The Cash Loans Management System is designed to facilitate the management of client information and loan records for a cash loans business. The system provides various features and user roles to ensure efficient loan management and data organization.

### User Roles

1. **Admin User**: Has full access to all system features, including client and loan management, data import/export, user management, and system settings.
2. **Non-Admin User**: Has restricted access and can only view the main table, loans table, and client profiles.

### Key Features

1. **Client Management**:
   - View all clients and their relevant details in a table.
   - Expand a client row to view their specific loans in an expanded slot.
   - Filter table data based on various criteria.
   - Search for clients using the search function.
   - Create new clients using a modal popup.
   - Edit client details using a modal popup.
   - Delete clients from the client profile page.

2. **Authentication and User Management**:
   - Support three methods of login/sign-in: Facebook, Google, and password-based login.
   - Use Clerk for authentication and user management.
   - Allow user registration with admin assignment.
   - Admin user can update browser data from the MongoDB, save to local storage, or delete from local storage.
   - Admin user can change user details and access other admin-specific features.

3. **Data Import and Export**:
   - Ability to load a CSV file with appropriate column and data to populate the MongoDB and display it on the frontend.

### Similar Software and Unique Selling Points

While there are other loan management systems available, the Cash Loans Management System differentiates itself in the following ways:

1. **User-Friendly Interface**: The system provides a user-friendly and intuitive interface, ensuring ease of use for both admin and non-admin users.
2. **Flexible Data Management**: The table component with filtering, search, and column customization options allows users to efficiently manage and analyze client and loan data.
3. **Authentication and User Management**: The system supports multiple login methods, user registration, and admin assignment, providing flexibility and security.
4. **CSV Data Import**: The ability to load CSV files simplifies data import, allowing for seamless integration with existing data sources.

## Functional Requirements

1. **User Registration and Login**:
   - Users can register with their email and password or choose to use Facebook or Google for login.
   - Users will be assigned a role (admin or non-admin) during registration.

2. **Client Management**:
   - Users can view a table listing all clients with relevant details.
   - Users can expand a client row to view their specific loans in an expanded slot.
   - Users can filter and search for clients using different criteria.
   - Admin users can create new clients using a modal popup.
   - Admin users can edit client details using a modal popup.
   - Admin users can delete clients from the client profile page.

3. **Non-Admin User Access**:
   - Non-admin users can view the main table, loans table, and client profiles.
   - Non-admin users do not have permission to perform any CRUD operations.

4. **Data Import**:
   - Admin users can import data from a CSV file, mapping the columns to the appropriate fields in the database.

5. **Admin Page**:
   - Admin users have access to an admin page for managing system settings and user-related operations.
   - Admin users can update browser data from the MongoDB, save to local storage, or delete from local storage.
   - Admin users can change user details, logout, and access other admin-specific features.

## Non-Functional Requirements

1. **Security**:
   - User passwords will be securely stored using bcrypt encryption.
   - Authentication will be implemented using JWT tokens.
   - Access to admin-specific features and data will be restricted to authenticated admin users.

2. **Performance**:
   - The application should load and display data efficiently, even with large datasets.
   - Data filtering, search, and sorting operations should be optimized for quick response times.

3. **Scalability**:
   - The system should be designed to handle a growing number of clients and loans without significant performance degradation.
   - Database indexing and optimization strategies should be implemented to ensure scalability.

4. **User Interface and Experience**:
   - The user interface should be intuitive, visually appealing, and responsive.
   - Table customization options should be easily accessible, allowing users to tailor the view to their preferences.

5. **Code Modularity and Maintainability**:
   - The codebase should follow best practices for modularity, maintainability, and scalability.
   - Clear documentation and comments should be provided to facilitate future development and maintenance.

## Five user stories for the Cash Loans Management System:

1. As an admin user, I want to be able to view a table of all clients with their relevant details, so that I can have a comprehensive overview of the client base.

2. As an admin user, I want to be able to create a new client by filling out a form in a modal popup, so that I can add new clients to the system easily.

3. As an admin user, I want to be able to edit the details of a client by opening a modal popup with pre-filled form fields, so that I can update client information accurately.

4. As an admin user, I want to be able to delete a client from the system, either directly from the main table or from the client profile page, so that I can remove irrelevant or duplicate client records.

5. As a non-admin user, I want to be able to view the main table of clients and their details, as well as the loans table and client profiles, so that I can access relevant information and track loan details for specific clients.
```