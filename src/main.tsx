import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import LoaderComponent from "./components/loaderComponents/LoaderComponent.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <>
          <LoaderComponent />
          <App />
      </>
  </StrictMode>,
)
