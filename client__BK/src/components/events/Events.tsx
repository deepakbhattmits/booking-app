import { FC, useState } from 'react'
import Modal from '../Modal'
import EventList from './EventList'
import LoadingSpinner from '../reusable/LoadingSpinner'
import useFetchEvents from '../../hooks/useEvents/useFetchEvents'
import useCreateEvent from '../../hooks/useEvents/useCreateEvent'
import useAuth from '../../hooks/useAuth/useAuth'
interface IEvent {
  [props: string]: any
}
const Events: FC = (): JSX.Element => {
  const { authDetail } = useAuth()
  const { isLoading, events, setIsLoading } = useFetchEvents()
  const { show, createEvent, setShow } = useCreateEvent()
  const [inputs, setInputs] = useState<IEvent>({
    title: '',
    description: '',
    price: 0,
    date: '',
    creatorId: '',
  })
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setInputs({ ...inputs, [name]: value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    const { title, price, description, date } = inputs
    if (
      title?.length === 0 ||
      price <= 0 ||
      date?.length === 0 ||
      description?.length === 0
    ) {
      return
    }
    createEvent(inputs)
  }

  return (
    <div className="events__page">
      {authDetail?.token ? (
        <div className="create__event--actions">
          <span>Share your own events</span>
          <button
            className="ui button violet"
            onClick={() => {
              setShow((prevState) => !prevState)
            }}
          >
            Create Event
          </button>
        </div>
      ) : null}
      <Modal
        show={show}
        setShow={setShow}
        size="mini"
        className="create__event--modal"
      >
        <div className="header">Create Event</div>
        <form className="ui form" onSubmit={handleSubmit}>
          <div className=" field">
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <input
              type="datetime-local"
              name="date"
              placeholder="Event date"
              onChange={handleChange}
            />
          </div>
          <div className=" field">
            <input
              type="number"
              name="price"
              placeholder="Event price"
              onChange={handleChange}
            />
          </div>
          <div className="field">
            {/* <input type='text' name='description' placeholder='Event description' onChange={handleChange} /> */}
            <textarea
              name="description"
              placeholder="Event description"
              onChange={handleChange}
            />
          </div>
          <div className="actions">
            <button type="submit" className="ui button violet">
              Confirm
            </button>
            <button type="reset" className="ui button violet">
              Reset
            </button>
          </div>
        </form>
      </Modal>
      <section className="events__section">
        {isLoading ? (
          <LoadingSpinner />
        ) : events?.length ? (
          <EventList events={events} />
        ) : (
          <span>No Events found please create some events</span>
        )}
      </section>
    </div>
  )
}
export default Events
