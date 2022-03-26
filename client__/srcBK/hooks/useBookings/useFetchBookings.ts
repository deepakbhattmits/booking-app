import {useState,useCallback,useEffect,useContext} from 'react';
import {AuthContext} from '../../context/auth-context';
interface IBooking{
    [props:string]:any
}
const useFetchBookings=() =>{
    
    const {authDetail}=useContext(AuthContext);
    const [bookings,setBookings]=useState<IBooking[]>([]);
    const [isLoading,setIsLoading]=useState<boolean>(false);
    const fetchBookings=useCallback(async () =>{
        setIsLoading(true);
        const requestBody={
            query: `query fetchBookings {
                            bookings {
                              _id
                              createdAt
                              updatedAt
                              event {
                                _id
                                title
                                price
                                description
                                date
                                creator {
                                  _id
                                  email
                                  createdEvents {
                                    title
                                  }
                                }
                              }
                              user {
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
                "Authorization":`Bearer ${authDetail?.token}`
            }
        });
         const resBody=await res.json();
      if(resBody?.data.bookings?.length) {
            setBookings(resBody?.data?.bookings);
        }
        setIsLoading(false);
    },[authDetail]);
      useEffect(() =>
    {
         if(!bookings?.length) {       
        fetchBookings()
          }
    },[fetchBookings,bookings])
    return {
        isLoading,bookings,setBookings,setIsLoading,fetchBookings
    }
    
}
export default useFetchBookings;
