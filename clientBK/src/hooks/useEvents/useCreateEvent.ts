import {useState,useContext} from 'react';
import {AuthContext} from '../../context/auth-context/AuthContext'
import useFetchEvents from './useFetchEvents';
const useCreateEvent=() =>{
    
    const {authDetail}=useContext(AuthContext);
    const {events,setIsLoading,setEvents}=useFetchEvents();
    const [show,setShow]=useState<boolean>(false)
    const createEvent=async (inputs: any) =>
    {
         const {title, price, description,date}=inputs
        if(title?.length===0||price <= 0||date?.length===0||description?.length===0) {
            return;
        }
        setIsLoading(true);
        const requestBody={query:`mutation createEvent {
                                createEvent(title: "${title?.trim()}", description: "${description?.trim()}", price:${price}, date: "${date?.trim()}") {
                                        _id
                                        title
                                        date
                                        price
                                        description
                                           creator {
                                                    _id
                                                    email
                                                    createdEvents {
                                                        _id
                                                        title
                                                    }
                                                }
                                    }
                                }`
        }
        const res=await fetch('http://localhost:4000/graphql',{
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${authDetail?.token}`
      }
    });
        const resBody=await res.json();
        if(!!resBody) {
            setShow(false)
            setEvents([...events,resBody?.data?.createEvent])
            setIsLoading(false);
        }
    }
    return {
        show,createEvent,setShow
    }
    
}
export default useCreateEvent;
