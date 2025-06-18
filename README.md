## REAL-TIME COLLABORATIVE DOCUMENT EDITOR

- COMPANY: CODTECH IT SOLUTIONS

- NAME: SHRUT JAIN

- INTERN ID: CT04DN362

- DOMAIN: FULL STACK WEB DEVELOPMENT

- DURATION: 4 WEEEKS

- MENTOR: NEELA SANTOSH

## Overview

**Real-Time Collaborative Document Editor** is a web-based application that enables multiple users to edit documents simultaneously while communicating via an integrated chat feature. Built with modern web technologies like HTML, CSS, and JavaScript, combined with the Socket.IO library for real-time bidirectional communication, the editor delivers a smooth and interactive user experience. Ideal for teams, students, or collaborative groups, it offers an intuitive interface to efficiently co-author documents in real-time. This application is designed to enhance productivity and streamline the collaborative process, making it easier for users to work together regardless of their physical location.

## Features

### 1. User Authentication  
Before accessing the editor, users are prompted to enter a custom username. This feature personalizes their presence in the collaborative environment and allows easy identification among participants. By requiring a username, the application fosters a sense of ownership and accountability, encouraging users to engage more actively in the collaborative process.

### 2. Real-Time Document Editing  
The core functionality of the application is its ability to allow multiple users to edit the same document simultaneously. Users see edits made by others immediately, ensuring the entire group works on the most current version of the document without conflicts. This real-time synchronization is crucial for effective collaboration, as it eliminates the confusion that can arise from version control issues.

### 3. Rich Text Formatting  
The editor includes a versatile toolbar that provides common text styling options such as bold, italic, underline, strikethrough, bulleted and numbered lists, image insertion, and hyperlinking. This rich text formatting capability allows users to create well-structured and visually appealing documents, enhancing the overall quality of the collaborative output.

### 4. Integrated Chat  
A built-in chat panel provides a seamless way to discuss document changes or share quick messages while editing. This feature helps maintain collaboration without needing external apps, allowing users to communicate effectively in real-time. The chat functionality is particularly useful for brainstorming sessions, quick feedback, and clarifying questions, making the editing process more dynamic and interactive.

### 5. Active Users List  
The application features a sidebar that displays the current list of connected users. This active users list fosters awareness of collaborators actively working in the document, creating a sense of community and teamwork. Users can see who is online, which encourages interaction and collaboration among team members.

### 6. Theme Customization  
The application supports multiple visual themes that users can select via a dropdown menu. This theme customization allows users to personalize their editing experience according to their preferences. User theme preferences are saved locally, ensuring consistency across sessions and enhancing user satisfaction.

### 7. Document Persistence  
All document changes are saved persistently to a MongoDB database, ensuring that data is retained and loaded whenever users reconnect. This feature is essential for maintaining continuity in collaborative work, as users can pick up right where they left off without losing any progress.

### 8. Responsive Design  
The application is designed to be responsive, ensuring that it works well on various devices, including desktops, tablets, and smartphones. This adaptability allows users to collaborate on documents from anywhere, making the editor a versatile tool for teamwork. The responsive design ensures that the user interface remains intuitive and accessible, regardless of the device being used.

## Technologies Used

- **HTML**: The foundation of the app's semantic layout and structure, providing a clear and organized framework for the content.
- **CSS**: Custom styling is applied using CSS to enhance the visual appeal of the application, including theme management and responsive design principles for a polished user interface.
- **JavaScript**: The application logic, including real-time messaging and document editing features, is implemented using JavaScript, allowing for dynamic interactions and updates.
- **Socket.IO**: This library facilitates real-time, bidirectional communication between the server and clients, allowing for instant updates to the document and chat messages. Socket.IO is crucial for maintaining a smooth collaborative experience.
- **MongoDB**: The database backend is used for persistent storage of the document content, ensuring that all changes are saved and retrievable.
- **Express**: The server framework is responsible for handling HTTP routes, serving static files, and managing user sessions, providing a robust backend for the application.
