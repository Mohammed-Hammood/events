

import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectEvents, setEvents, useAppDispatch } from 'store';
import { Endpoints } from 'utils';


function useFetch() { 
    const { events } = useSelector(selectEvents);
    const firstLoad = useRef<boolean>(true);
    const [loading, setLoading] = useState<boolean>(events.length === 0);
    const [message, setMessage] = useState<null | { status: number, message: string }>(null);
    const url = Endpoints.getEvents;
    const dispatch = useAppDispatch();

    useEffect(() => {
        const sendRequest = async (url: string): Promise<void> => {
            setLoading(true);
            try {
                const req = await fetch(url);

                const res = await req.json();
                if (res && res.length > 0) {
                    dispatch(setEvents({ events: res }));
                }
            } catch (err: any) {
                setMessage({ status: err.status, message: err.message });
            } finally {
                setLoading(false);
            }
        }
        if (events.length === 0 && firstLoad.current) {
            setMessage(null);
            sendRequest(url);
            firstLoad.current = false;
        }
    }, [dispatch, url, loading, message, setLoading, events])
    return {
        loading,
        message,
        setLoading,
    }
}
export default useFetch;