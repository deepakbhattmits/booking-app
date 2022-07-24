import {FC} from 'react';
import EventListItem from './EventListItem';
interface IProp {
    [props:string]:any
}
const EventList: FC<IProp>=({events}): JSX.Element => <>
    <h2> Event : {events?.length} event{ events?.length>1? "s.":"."}</h2>
        <div className="ui list events__section--list">
            {events?.map(({title,price,description,date,_id,creator}:IProp) =>
                <EventListItem key={_id} _id={_id} title={title} price={price} description={description} date={date} creator={creator}/>
                )}    
        </div></>
export default EventList;
