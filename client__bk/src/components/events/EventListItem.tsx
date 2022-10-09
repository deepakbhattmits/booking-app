import { FC, useState, useContext } from 'react'
import Modal from '../Modal'
import { AuthContext } from '../../context/auth-context'
interface IProp {
  [props: string]: any
}
const EventListItem: FC<IProp> = ({
  title,
  price,
  description,
  date,
  _id,
  creator,
}): JSX.Element => {
  const { authDetail } = useContext(AuthContext)

  const [show, setShow] = useState(false)
  const onDetail = () => {
    setShow(true)
  }
  const bookEventHandler = async () => {
    if (
      !_id?.match(/^[0-9a-fA-F]{24}$/) ||
      !authDetail?.userId?.match(/^[0-9a-fA-F]{24}$/)
    ) {
      return false
    }
    const requestBody = {
      query: `mutation bookEvent {
  bookEvent(eventId: "${_id}") {
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
}
`,
    }
    const res = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authDetail?.token}`,
      },
    })
    const resBody = await res.json()
    if (!!resBody) {
      setShow(false)
    }
  }
  return (
    <>
      <div className="events__section--list--item">
        <div className="content">
          <div className="header">{title}</div>
          <div className="price">{price}</div>
          <div className="date">{new Date(date)?.toLocaleDateString()}</div>
        </div>
        <div className="events__section--list--item--actions">
          {authDetail?.userId === creator?._id ? (
            <span>You are the owner for this event</span>
          ) : (
            <button className="ui button violet" onClick={onDetail}>
              view details
            </button>
          )}
        </div>
      </div>
      <Modal
        show={show}
        setShow={setShow}
        size="mini"
        className="view__detail--modal"
      >
        <div className="header">View Details-{title}</div>
        <div className="ui list">
          <div className="item">
            <div className="content">
              <div className="description">{description}</div>
              <div className="price">{price}</div>
              <div className="date">{new Date(date)?.toLocaleDateString()}</div>
              <div className="creator">{creator?.email}</div>
            </div>
          </div>
        </div>
        <div className="actions">
          {authDetail?.token && (
            <button className="ui button violet" onClick={bookEventHandler}>
              Book
            </button>
          )}
          <button className="ui button violet" onClick={() => setShow(false)}>
            Cancel
          </button>
        </div>
      </Modal>
    </>
  )
}
export default EventListItem
