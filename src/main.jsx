import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Testimonials from './pages/Testimonials';
import Hero from './pages/Hero';
import EventList from './pages/EventList';
import EventDetails from './pages/EventDetails';
import Qrcode from './pages/Qrcode';
import Chatbit from './pages/Chatbit';
import Footer from './components/Footer';
import Ticketsell from './pages/Ticketsell';
import MintNFT from './pages/MintNFT';
import Ticket from './pages/Ticket';
import Teams from './pages/Teams';
import './index.css';
import WaitlistPage from './pages/WaitingList';
import QuantumTicketResale from './pages/QuantamTicketResale';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "discover",
    element: <Discover />,
  },
  {
    path: "testimonials",
    element: <Testimonials />,
  },
  {
    path: "qrcode",
    element: <Qrcode />,
  },
  {
    path: "ticket",
    element: <Ticket />,
  },
  {
    path: "Teams",
    element: <Teams />,
  },
  {
    path: "Ticketsell",
    element: <Ticketsell />
  },
  {
    path: "hero",
    element: <Hero />,
  },
  {
    path: "event",
    element: <EventList />,
  },
  {
    path: "mint",
    element: <MintNFT />,
  },
  
  {
    path: "event-details",
    element: <EventDetails />,
  },
  {
    path: "chatbit",
    element: <Chatbit />,
  },

  {
    path: "waiting",
    element: <WaitlistPage />
  },

  {
    path: "resell",
    element: <QuantumTicketResale />
  },

  {
    path: "*",
    element: <Footer />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>
);