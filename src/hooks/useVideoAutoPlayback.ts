//playa video ako je u viewportu


import {RefObject, useEffect, useRef} from 'react';

export const useVideoAutoPlayback = (options: IntersectionObserverInit): [RefObject<HTMLElement>, RefObject<HTMLVideoElement>] => {
    const containerRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const cb: IntersectionObserverCallback = (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) videoRef.current?.play();
        else videoRef.current?.pause();
    };

    useEffect(() => {
        if (IntersectionObserver === null || IntersectionObserver === undefined)
            return () => {
            };

        const observer = new IntersectionObserver(cb, options);
        const current = containerRef.current;

        if (current) observer.observe(current);

        return () => {
            if (current) observer.unobserve(current);
        };
    }, [containerRef, options]);

    return [containerRef, videoRef];
};