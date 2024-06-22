import {useTranslation} from "next-i18next";
import {TimerContainer} from "./timer/container";
import {useEffect, useState} from "react";

const MainVideo = () => {
    const {t} = useTranslation()
    const [days, setDays] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(0);
    const [numbersShown, setNumbersShown] = useState<boolean>(false)

    const invasionDate = Date.parse("2022/02/24")
    const updateTimeout = 1000

    useEffect(() => {
        const interval = setInterval(() => {
            const timeSpent = new Date().getTime() - invasionDate

            const daysProtecting = Math.floor(timeSpent / (24 * 60 * 60 * 1000))
            const millisDiffWithoutDays = timeSpent - (daysProtecting * 24 * 60 * 60 * 1000)

            const hoursProtecting = millisDiffWithoutDays / (1000 * 60 * 60)
            const minutesProtecting = (hoursProtecting - Math.floor(hoursProtecting)) * 60 / 100 * 100
            const secondsProtecting = (minutesProtecting - Math.floor(minutesProtecting)) * 60 / 100 * 100

            setDays(daysProtecting)
            setHours(Math.floor(hoursProtecting))
            setMinutes(Math.floor(minutesProtecting))
            setSeconds(Math.floor(secondsProtecting))
            if (!numbersShown) {
                setNumbersShown(true)
            }
        }, updateTimeout);
        return () => {
            clearInterval(interval);
        };
    });


    return (
        <div className="video-container h-screen">
            <video className="video-bg" loop autoPlay={true} muted>
                <source src={'/videos/ukraine_army_tribute.mp4'} type="video/mp4"/>
            </video>
            <div
                className="video-overlay flex flex-col items-center inline-block align-middle m-auto justify-center py-8">
                <div className="text-center">
                    <h1 className="font-bold text-2xl lg:text-4xl mb-8 lg:mb-16">{t('main_page.heading_protecting_losses_forecast')}</h1>
                    <h2 className="text-4xl lg:text-8xl font-bold">{t('main_page.heading_protecting_the_world')}</h2>
                    <div className={numbersShown ? "transition-opacity ease-in duration-300 opacity-100" : "opacity-0 delay-0"}>
                        <TimerContainer days={days} hours={hours} minutes={minutes} seconds={seconds}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainVideo