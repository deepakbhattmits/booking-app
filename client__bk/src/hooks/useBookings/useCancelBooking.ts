import {useContext} from 'react';
import {AuthContext} from '../../context/auth-context';
import useFetchBookings from './useFetchBookings'
const useCancelBooking=() =>{
    
    const {authDetail}=useContext(AuthContext);
    const {bookings,setBookings,setIsLoading,isLoading}=useFetchBookings()
     const handleCancelBooking=async (_id: string) =>{
        setIsLoading(true);
      if( !_id?.match(/^[0-9a-fA-F]{24}$/)) {
            return;
        }
        const requestBody={query:`mutation cancelBooking($_id:ID!) {
                                           cancelBooking(bookingId: $_id) {
                                              _id 
                                            }
                                          }`
          ,variables: {_id}
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
         const updatedBookings=bookings?.filter((booking) =>booking._id!==resBody?.data?.cancelBooking?._id)

        setBookings(updatedBookings)
        setIsLoading(false);
   
    }

    return {
        isLoading,bookings,handleCancelBooking
    }
    
}
export default useCancelBooking;
