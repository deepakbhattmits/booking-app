import {FC,useEffect,useContext,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../../context/auth-context';
import LoadingSpinner from '../reusable/LoadingSpinner';
import BookingList from './BookingList';
import useFetchBookings from '../../hooks/useBookings/useFetchBookings';
import useCancelBooking from '../../hooks/useBookings/useCancelBooking';
import BookingChart from './BookingChart';
const Bookings: FC=(): JSX.Element =>{
    const navigate=useNavigate();
    const {authDetail}=useContext(AuthContext);
  const [active,setActive]=useState<string>('list');
  const {isLoading,bookings,fetchBookings}=useFetchBookings();
  const {bookings:cancelBookings,handleCancelBooking}=useCancelBooking()
    useEffect(() =>{
        if(!authDetail?.token) {
     navigate('/auth')
   }
    },[authDetail,navigate]);
  useEffect(() =>{
    if(bookings?.length!==cancelBookings?.length||!bookings?.length) {
      fetchBookings()
    }
  },[bookings, cancelBookings, fetchBookings])
  return <div className='bookings__page'>
    <h2>Bookings</h2>
    {isLoading? <LoadingSpinner />:<>
     <div className="ui pointing secondary menu">
      <span className={`${active?.match(/list/i)?"active":""} item`} data-tab="list" onClick={ ()=>{setActive("list")}}>List</span>
  <span className={`${active?.match(/chart/i)?"active":""} item`} data-tab="chart" onClick={ ()=>{setActive('chart')}}>Chart</span>
</div>
    <div className={`ui  ${active?.match(/list/i)? "active":""} tab segment"`} data-tab="list">
{/* <LoadingSpinner /> */}
  {bookings?.length? <BookingList bookings={bookings} handleCancelBooking={handleCancelBooking} />:<span>No Bookings found please create some booking</span>}
</div>
<div className={`ui  ${active?.match(/chart/i)? "active":""} tab segment"`} data-tab="chart">
<BookingChart bookings={bookings} isLoading={isLoading}/>
</div></>}
   
        </div>
};
export default Bookings;
