/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, useEffect, useRef } from 'react'
import Loading from '@/components/shared/Loading'
import AllRoutes from '@/components/route/AllRoutes'
import type { LayoutType } from '@/@types/theme'
import FeaturesGrid from './Home/components/FeaturesGrid'
import HeroSection from './Home/components/HeroSection'
import HomeFAQs from './Home/components/HomeFAQ';
import ContactForm from './Home/components/ContactForm'
import MainFooter from './Home/components/MainFooter';
import InfoSection from './Home/components/InfoSection';
interface ViewsProps {
    pageContainerType?: 'default' | 'gutterless' | 'contained'
    layout?: LayoutType
}


const Views = (props: ViewsProps) => {
    const contactRef = useRef(null);
    const aboutRef = useRef(null);
    const FqRef = useRef(null);
    const scrollToSection = (ref:any) => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        let lastScrollTop = 0; // Initialize lastScrollTop variable

        const handleScroll = () => {
            const hcf = document.querySelector(".hcf-profile");
            const scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;

            if (scrollTop > lastScrollTop) {
                if (hcf) {
                    hcf.classList.add("hcf-profile-fixed");
                }
            } else if (scrollTop < lastScrollTop) {
                if (hcf) {
                    hcf.classList.remove("hcf-profile-fixed");
                }
            }

            lastScrollTop = scrollTop;
        };


        // Add scroll event listener
        window.addEventListener("scroll", handleScroll);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const containerClass = props.pageContainerType === 'gutterless' ? 'no-gutters' : 'default-container';
    return (
        <Suspense fallback={<Loading loading={true} className="w-full" />}>
            <div className={containerClass}>
                <AllRoutes {...props} />
            </div>
            
        <div className=''>
        <HeroSection
						scrollToSection={scrollToSection}
						featuresRef={FqRef}
						contactRef={contactRef}
						aboutRef={aboutRef}
					/>
            <div className='!bg-[#eff6ff] relative'>
                <FeaturesGrid />
            </div>
            <div className='!bg-white relative' ref={aboutRef}>
                                    <InfoSection />
                                </div>
                                <div className='relative bg-white' ref={FqRef}>
                                    <HomeFAQs />
                                </div>
                                <div className='bg-white relative' ref={contactRef}>
                                    <ContactForm />
                                </div>
                                <div className='bg-white'>
                                    <MainFooter />
                                </div>
        </div>
        </Suspense>
    );

}

export default Views
