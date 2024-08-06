"use client"; // The `’use client’` directive indicates that this is a client-side component
import { useState, useEffect } from 'react';
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material';
import { firestore } from '@/app/firebase'; // import statement
import {
  collection,
  doc,
  getDocs,
  query as firestoreQuery,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import './globals.css'; // Import your global styles

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [query, setQuery] = useState(''); // State for search query

  // Function to fetch inventory data from Firestore
  const updateInventory = async () => {
    const snapshot = firestoreQuery(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
  };

  // Function to add an item to Firestore
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  // Function to remove an item from Firestore
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  // Fetch data when the component mounts
  useEffect(() => {
    updateInventory();
  }, []);

  // Functions to manage the modal state
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Filter inventory based on search query
  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      justifyContent={'center'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Box width="100%" display={'flex'} flexDirection={'column'} gap={2} alignItems="center">
        <Button variant="contained" onClick={handleOpen}>
          Add New Item
        </Button>
        <TextField
          id="search"
          label="Search Items"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ maxWidth: '600px', margin: '0 auto' }}
        />
        <Box className="inventory-container">
          <Box className="header-box">
            <Typography variant={'h4'} color={'#333'} textAlign={'center'}>
              Inventory Items
            </Typography>
          </Box>
          <Stack width="100%" maxHeight="300px" spacing={2} sx={{ overflowY: 'auto' }}>
            {filteredInventory.map(({ name, quantity }) => (
              <Box
                key={name}
                className="inventory-item-box"
              >
                <Typography variant={'h5'} color={'#333'}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography variant={'h6'} color={'#333'}>
                  Quantity: {quantity}
                </Typography>
                <Button variant="contained" onClick={() => removeItem(name)}>
                  Remove
                </Button>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
