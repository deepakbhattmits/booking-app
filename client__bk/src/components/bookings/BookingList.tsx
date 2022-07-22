import {FC} from 'react';
import BookingListItem from './BookingListItem';
interface IProp {
    [props:string]:any
}
const BookingList: FC<IProp>=({bookings,handleCancelBooking}): JSX.Element =>
{
    return <>
        <h2> Booking : {bookings?.length} booking{bookings?.length>1? "s.":"."}</h2>
        <div className="ui list bookings__section--list">
        {bookings?.map(({user,event,createdAt,updatedAt,_id}: IProp) =>
            <BookingListItem key={_id} _id={_id} user={user} event={event} updatedAt={updatedAt} createdAt={createdAt} handleCancelBooking={handleCancelBooking} />
        )}
    </div></>;
}
export default BookingList;
