import { useState, useEffect } from '@wordpress/element';

export const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth <= 768,
        isSmallMobile: window.innerWidth <= 480,
    });

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
                isMobile: window.innerWidth <= 768,
                isSmallMobile: window.innerWidth <= 480,
            });
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return screenSize;
};
