# Hux Ventures Contact Manager - Frontend
This repository contains the frontend for the Hux Ventures contact management application. The app is built with React and Tailwind CSS, providing a responsive and user-friendly interface for managing contacts.

## Features
+ User Authentication: Allows users to sign up, log in, and log out.
- Contact Management: Users can create, view, update, and delete contacts.
+ Responsive Design: The UI is fully responsive and optimized for different screen sizes.
- Protected Routes: Only authenticated users can access contact management features.
+ Tailwind CSS: The app uses a consistent black and blue theme across all pages.

## Tech Stack
+ React: For building the user interface.
- React Router: For handling page navigation and route protection.
+ Tailwind CSS: For styling and ensuring responsiveness.
- Axios: For making API requests.

## Project Structure

```bash
    hux-assessment-frontend/
    ├── src
    │   ├── components
            ├── ProtectedRoutes.js
    │   ├── pages
    │   │   ├── ContactsPage.js
    │   │   ├── ContactDetailPage.js
    │   │   ├── HomePage.js
    │   │   ├── LoginPage.js
    │   │   ├── SignUpPage.js
    │   │   ├── EditContactPage.js
    │   │   ├── CreateContactPage.js
    │   ├── utils
    │   │   └── utils.js
    │   ├── App.js
    │   ├── index.js
    │   ├── authContext.js
    ├── public
    │   ├── index.html
    │   └── ...
    └── README.md
```

## How to Run the Project
1. Clone the repository:

```bash
    git clone https://github.com/your-username/hux-assessment-frontend.git
```
2. Navigate to the project directory:

```bash
    cd hux-assessment-frontend
```
3. Install dependencies:

```bash
    npm install
```

4. Start the development server:

```bash
    npm start
```
The application will be available at http://localhost:3000.


## Usage
+ Sign Up: Create a new account to access the app.
- Log In: Log in with your credentials to manage your contacts.
+ Manage Contacts: Create, edit, delete, or view contacts. All contact data is securely managed and only accessible by authenticated users.

## License
This project is licensed under the MIT [License](https://).