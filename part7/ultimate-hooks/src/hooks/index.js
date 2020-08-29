import { useState, useEffect } from "react"
import axios from 'axios'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])  
    // ...
    useEffect(()=> {
        updateResources()
    }, [])

    const updateResources = () => {
        const request = axios.get(baseUrl)
        request.then(response => setResources(response.data))
    }

    const create = (resource) => {
      const response = axios.post(baseUrl, resource)
      response.then(() => updateResources())
    }
  
    const service = {
      create,
      
    }
  
    return [
      resources, service
    ]
  }