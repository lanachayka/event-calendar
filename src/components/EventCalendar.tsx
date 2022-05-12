import { Calendar } from "antd"
import { Moment } from "moment";
import { IEvent } from "../models/iEvent"
import { formatDate } from "../utils/date";

interface EventCalendarProps {
  events: IEvent[]
}

const EventCalendar: React.FC<EventCalendarProps> = ({ events }) => {
  
  function dateCellRender(value: Moment) {
    const formatedDate = formatDate(value.toDate())
    const currentDayEvents = events.filter(ev => ev.date === formatedDate)
    return (
      <div>
        {currentDayEvents.map((ev, index) => (
          <div key={index}>{ev.description}</div>
        ))}
      </div>
    );
  }

  return (
    <Calendar dateCellRender={dateCellRender}/>
  )
}

export default EventCalendar