import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import HomePage from "./pages/Home/HomePage.tsx";
import Inscription from './pages/Inscription/Inscription.tsx';
import Login from './pages/Login/Login.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/inscription",
        element: <Inscription />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

const client = new ApolloClient({
  uri: `http://localhost:${import.meta.env.VITE_GATEWAY_PORT}/api`,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
    <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>,
)
