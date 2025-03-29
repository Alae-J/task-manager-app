import { useEffect, useRef, useState } from "react";

export const useOverflow = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (element) {
            setIsOverflowing(element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth);
        }
    }, []);

    return { ref, isOverflowing };
};
