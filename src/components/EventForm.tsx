import { Form, Input, Button, DatePicker, Row, Select } from "antd"
import { Moment } from "moment"
import { useState } from "react"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { IEvent } from "../models/iEvent"
import { IUser } from "../models/IUser"
import { formatDate } from "../utils/date"
import { rules } from "../utils/rules"

interface EventFormProps {
    guests: IUser[],
    submit: (event: IEvent) => void
}

const EventForm: React.FC<EventFormProps> = ({ guests, submit }) => {

    const { user } = useTypedSelector(state => state.auth)

    const [event, setEvent] = useState<IEvent>({
        author: '',
        guest: '',
        date: '',
        description: ''
    })

    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent({ ...event, date: formatDate(date.toDate()) })
        }
    }

    const submitForm = () => {
        submit({...event, author: user.username})
    }

    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Event desription"
                name="desription"
                rules={[rules.required()]}
            >
                <Input
                    value={event.description}
                    onChange={(e) => setEvent({ ...event, description: e.target.value })}
                />
            </Form.Item>
            <Form.Item
                label="Select Date"
                name="date"
                rules={[rules.required(), rules.isDateAfter()]}
            >
                <DatePicker
                    onChange={(date: Moment | null) => selectDate(date)}
                />
            </Form.Item>
            <Form.Item
                label="Choose guest"
                name="guest"
            >
                <Select onChange={(guest: string) => setEvent({ ...event, guest })}>
                    {guests.map(guest => (
                        <Select.Option
                            key={guest.username}
                            value={guest.username}
                        >
                            {guest.username}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Row justify="end">
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add event
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    )
}

export default EventForm