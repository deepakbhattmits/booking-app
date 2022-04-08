import {FC} from 'react';
interface Iprop
{
    [prop:string]:any
}
const Modal: FC<Iprop>=({size,className,show,setShow,children}): JSX.Element =>
{

    return <div className={`ui dimmer modals page  ${className}--backdrop  ${show? "fade active visible":"hidden"}`} onClick={(e) =>{
        e.stopPropagation();
        setShow();
    }}>
        <div className={`ui ${size} modal ${className}  ${show? "fade in active animating visible":"hidden"}`} style={{display: show? 'block':'none'}} onClick={(e) => {e.stopPropagation();}}>
            <div className={`icon modal--close`} title='Close' onClick={()=>setShow()}> <i className="icon close"/></div>
            {children}
        </div>
    </div>;
};
export default Modal;



