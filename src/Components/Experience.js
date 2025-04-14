import React, { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import LiIcon from './LiIcon'

const Details = ({position, company, companyLink, time, address, work}) => {
    const ref = useRef(null);

    return <li ref={ref} className="my-8 first:mt-0 last:mb-0 w-[60%] m-auto flex flex-col justify-between md:w-[80%]">

        <LiIcon reference={ref} />
        <motion.div
        initial={{y:50}}
        whileInView={{y:0}}
        transition={{duration:0.5, type:'spring'}}>
            <h3 className='capitalize font-bold text-2xl sm:text-xl xs:text-lg'>
                {position}&nbsp;<a href={companyLink} target="_blank" className='text-[#20a53f] capitalize' rel="noreferrer">@{company}</a>
            </h3>

            <span className='capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm'>
                {time} | {address}
            </span>

            <p className='font-medium w-full md:text-sm'>
                {work}
            </p>
        </motion.div>
    </li>
}

const Experience = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll(
        {
            target: ref,
            offset: ["start end", "center start"]
        }
    )
    return (
        <>
       
        <div className='pt-24 pb-10'>
            <h2 className='font-bold text-3xl md:text-8xl mb-32 w-full text-center md:mb-16'>
                Experience
            </h2>

            <div ref={ref} className='w-[75%] mx-auto relative lg:w-[90%] md:w-full'> 
                <motion.div
                style={{scaleY: scrollYProgress}} 
                className='absolute left-9 top-0 w-[4px] h-full bg-[#000000] origin-top md:w-[4px] md:left-[30px] xs:left-[20px]'/>

                <ul className='w-full flex flex-col items-start justify-between ml-4 xs:ml-2'>
                    <Details 
                    position="Senior Software Developer"
                    companyLink="https://www.aggrandizeventure.com/"
                    company="Aggrandize Venture Pvt Ltd"
                    time="Aug 2023 - Still Now"
                    address="Chennai - 600001, Tamil Nadu India"
                    work="Designed and developed a responsive and user-friendly interface using React.js, enabling users to efficiently manage logistics operations. Experienced in managing and executing diverse logistics projects, including Shipping ERP, Custom House Agent, CRM, and NVOCC operations. Demonstrated ability to streamline processes, enhance efficiency, and ensure compliance with industry regulations." />

                    <Details 
                    position="Associate Software Developer"
                    companyLink="https://www.prowesstics.com/"
                    company="Prowesstics IT Service"
                    time="Aug 2021 - Aug 2023"
                    address="Chennai - 600029, Tamil Nadu India"
                    work="Identified web-based user interactions and developed highly responsive user interface components via React concepts. Translated design and wireframes into high-quality code and wrote application interface code via JavaScripts following ReactJs workflows
" />

                    {/* <Details 
                    position="Junior Software Developer"
                    companyLink="https://www.bluebase.in/"
                    company="BlueBase Software Solution Pvt Ltd"
                    time="Feb 2021 - Jul 2021"
                    address="Chennai - 600032, Tamilnadu, India"
                    work="Developed native Android applications and frameworks using Java. Defined and implemented robust app architectures and complex user interfaces" />            */}

                    <Details 
                    position="Intern Software Developer"
                    companyLink="https://shiash.com/"
                    company="Shi#ash Info Solution"
                    time="Nev 2020 - Jan 2021"
                    address="Chennai - 600119, Tamilnadu, India"
                    work="Java developer intern include understanding and learning the function of new computer applications" />
                </ul>
            </div>
        </div>
        </>
    )
}

export default Experience