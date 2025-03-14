
export function useEnterSubmit(formRef: React.RefObject<HTMLFormElement>) {
    function handleEnterSubmit(event: React.KeyboardEvent<HTMLFormElement>) {
        // check if the key is Enter
        if (event.key === 'Enter' && event.metaKey) {
            event.preventDefault();
            formRef.current ? formRef.current.requestSubmit() : null;
        }
    }
    return {handleEnterSubmit}
}