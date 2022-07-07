import {FC} from 'react';
interface IProp {
    [props:string]:any
}
const BookingListItem: FC<IProp>=({event,user,_id,handleCancelBooking}): JSX.Element =>{
    return <><div className="bookings__section--list--item">
         <div className="content" >
            <div className="header">{event?.title}</div>
            <div className="description">{event?.description}</div>
            <div className="price">{event?.price}</div>
            <div className="date">{new Date(event?.date)?.toLocaleDateString()}</div>
            <div className='creator'>{user?.email}</div>
        </div>
        <div className='events__section--list--item--actions'>
            
            <button className='ui button violet' onClick={()=>handleCancelBooking(_id)}>Cancel Booking</button>
        </div>
       
       
    </div></>;
}
export default BookingListItem;
