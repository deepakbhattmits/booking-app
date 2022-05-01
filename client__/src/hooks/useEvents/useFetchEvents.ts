import {useState,useCallback,useEffect} from 'react';
interface IEvent{
    [props:string]:any
}
const useFetchEvents=() =>
{
    
    const [events,setEvents]=useState<IEvent[]>([]);
    const [isLoading,setIsLoading]=useState<boolean>(false);
    const fetchEvents=useCallback(async () =>{
        setIsLoading(true);
        const requestBody={
            query: `query fetchEvents {
                            events {
                                _id
                                title
                                price
                                description
                                date
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
            };
        const res=await fetch('http://localhost:4000/graphql',{
            method: "POST",
            body: JSON.stringify(requestBody),
            headers: {
                "Content-Type": "application/json",
            }
        });
        const resBody=await res.json();
        if(resBody?.data.events?.length) {
            setEvents(resBody?.data?.events);
        }
        setIsLoading(false);
    },[]);
        useEffect(() => {
       
        if(!events?.length) {   
            fetchEvents();        
          }  

    },[fetchEvents,events])
    return {
        isLoading,events,setEvents,setIsLoading
    }
    
}
export default useFetchEvents;
