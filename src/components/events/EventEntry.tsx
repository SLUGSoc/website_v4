import type { EVENT } from "../../constants/interfaces";

export default function EventEntry({ event } : { event: EVENT }) {

    return (
        <p>{event.name}</p>
    )
}