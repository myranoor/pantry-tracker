## Overview
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

- Add Items: Add items to your inventory with a simple input form.
- Remove Items: Remove items from your inventory with a click of a button.
- Search/Filter: Find items in your inventory using the search functionality.
- Firestore Integration: Data is stored and managed using Firebase Firestore.

## Technologies Used
- Next.js: Framework for building the user interface.
- React: JavaScript library for building component-based UIs.
- Firebase Firestore: NoSQL database for storing and retrieving inventory data.
- Material-UI: UI library for React to style the application.


## Installation
To get started with Pantry Tracker, follow these steps:

1. Clone the repository:
   
   git clone https://github.com/your-username/pantry-tracker.git
   cd pantry-tracker
   
2. Install dependencies:
   
   npm install
   
3. Set up Firebase:

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Add a Firestore database to your project.
   - Obtain your Firebase configuration and add it to `firebase.js` in your project.

   
   // firebase.js
   import { initializeApp } from 'firebase/app';
   import { getFirestore } from 'firebase/firestore';

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };

   const app = initializeApp(firebaseConfig);
   export const firestore = getFirestore(app);
   ```

4. Run the development server:

   npm run dev
   

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

### Adding Items

1. Click the "Add New Item" button.
2. Enter the item name in the modal that appears.
3. Click "Add" to add the item to your inventory.

### Removing Items

1. Find the item you want to remove in the inventory list.
2. Click the "Remove" button next to the item to decrease its quantity or remove it completely if the quantity reaches zero.

### Searching/Filtering Items

1. Use the search input field at the top of the inventory list to filter items by name.
2. As you type, the inventory list will update to show only the items that match your search query.

## Styling

Styles for the application are managed in `globals.css`. You can customize the appearance by modifying the CSS classes defined there.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request with any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


