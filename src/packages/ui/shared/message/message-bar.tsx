export function MessageBar({messages}: {messages: []}) {
    !messages.length && <div>"no message available"</div> 
    return (
        <section>
            {messages.map((msg, id) => (
                <messages messa />
            ))}
        </section>
    )
}