import { Button, Layout, Row, Modal } from "antd"
import EventCalendar from "../components/EventCalendar"
import { useEffect, useState } from "react"
import EventForm from "../components/EventForm"
import { useActions } from "../hooks/useActions"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { IEvent } from "../models/iEvent"

const Event: React.FC = () => {

    const [modalVisible, setModalVisible] = useState(false)

    const { fetchGuests, createEvent, fetchEvents } = useActions()
    const {user} = useTypedSelector(state => state.auth)
    
    useEffect(() => {
        fetchGuests()
        fetchEvents(user.username)
    }, [])

    const addNewEvent = (event: IEvent) => {
        setModalVisible(false)
        createEvent(event)
    }
    
    const { guests, events } = useTypedSelector(state => state.event)

    return (
        <Layout>
            <EventCalendar events={events} />
            <Row justify="center">
                <Button onClick={() => setModalVisible(true)}>
                    Add Event
                </Button>
            </Row>
            <Modal
                title="Add Event"
                visible={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false) }
            >
                <EventForm guests={guests} submit={addNewEvent}/>
            </Modal>
        </Layout>
       
    )
}

export default Event