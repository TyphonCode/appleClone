"use client";
import {gsap} from 'gsap';
import {useEffect, useRef, useState} from 'react';


export default function ExpandNavbar(props) { 
    let [item, setItem] = useState(props.prop)
    let [render, setRender] = useState(false);
    let [scroll, setScroll] = useState(0);
    let [onPage, setOnPage] = useState(true);
    function ifScroll() { 
        if (window.scrollY > scroll) { 
            props.setHover(false);
        }
        setScroll(window.scrollY)
    }
    function change() {
        let el = document.getElementById("info")?.childNodes
        let delay = 0;
            try {
                for (var i = el.length-1; i >= 0; i--) {
                    gsap.to(el[i],  {opacity: 0, delay: delay, duration: 0.1})
                    delay += 0.03
                    if (i == 0) { 
                        gsap.to("#main", {height: 0, duration: 0.5, delay: delay, onComplete: () => {gsap.set("#blur", {height: 0});}})
                    }
                }
            } catch {console.log("error")}

        setRender(false);
    }
    useEffect(() => { 
        setScroll(window.scrollY)
        document.addEventListener("scroll", ifScroll)
        document.addEventListener("mouseleave", (e) => {
            change()
            setTimeout(() => {props.setShow(false)}, 1000)
        })
    },[])
    useEffect(() => {

        //Intial render, user moves onto navbar
        if (props.hover && !render && onPage) { 
            gsap.set("#blur", {height: "100vh"})
            gsap.fromTo("#main", {height: 0}, {height: "auto", duration: 0.2, onComplete: () => {gsap.set("#main", {height: document.getElementById("main")?.offsetHeight});}})
            let el = document.getElementById("info")?.getElementsByTagName("p")
            let delay = 0.01
            for (var i in el) { 
                if (typeof el[i] == 'object') { 
                    gsap?.fromTo(el[i], {opacity: 0}, {opacity: 1, duration: 0.3, delay: delay,})
                    delay += 0.03
                }
            }
            setRender(true);
        }
        //User moves off the navbar
        if (!props.hover && render) { 
            change()
        } 
        //If item changes and still on navbar
        if (props.hover && item != props.prop && render) { 
            gsap.to("#main", {height: "auto", duration: 0.3, onComplete: () => {gsap.set("#main", {height: document.getElementById("main")?.offsetHeight})}})
            let el = document.getElementById("info")?.getElementsByTagName("p")
            let delay = 0.1
            for (var i in el) { 
                if (typeof el[i] == 'object') { 
                    gsap?.fromTo(el[i], {opacity: 0}, {opacity: 1, duration: 0.3, delay: delay,})
                    delay += 0.03
               }
            }
            setItem(item);
        }
    },[props, setOnPage ])

    return (
        <div>
            <div id="main" className="h-0 z-40 relative w-full mt-2 text-neutral-50 bg-gray-500 font-xl">
                {props.prop == "Store" && 
                <div className='flex-col py-10 ml-[210px]'>
                    <ul className='text-xl' id="info">
                        <p className='text-sm pb-4'>Shop</p>
                        <p className='mb-1 font-semibold'>Shop the latest</p>
                        <p className='mb-1 font-semibold'>Mac</p>
                        <p className='mb-1 font-semibold'>iPad</p>
                        <p className='mb-1 font-semibold'>iPhone</p>
                        <p className='mb-1 font-semibold'>Apple Watch</p>
                        <p className='mb-1 font-semibold'>Accessories</p>
                    </ul>
                </div>
                }
                {props.prop == "Mac" && 
                <div className='flex-col py-10 ml-[210px]'>
                    <ul className='text-xl' id='info'>
                        <p className='text-sm pb-4'>Explore Mac</p>
                        <p className='mb-1 font-semibold'>MacBook Air</p>
                        <p className='mb-1 font-semibold'>MacBook Pro</p>
                        <p className='mb-1 font-semibold'>iMac</p>
                        <p className='mb-1 font-semibold'>Mac mini</p>
                        <p className='mb-1 font-semibold'>Mac Studio</p>
                        <p className='mb-1 font-semibold'>Mac Pro</p>
                        <p className='mb-1 font-semibold'>Displays</p>
                        <p className='font-semibold text-sm mt-4 mb-2'>Compare Mac</p>
                        <p className='font-semibold text-sm'>Mac Does That</p>
                    </ul>
                </div>}
                {props.prop == "iPad" && 
                <div className='flex-col py-10 ml-[210px]'>
                    <ul className='text-xl' id='info'>
                        <p className='text-sm pb-4'>Explore iPad</p>
                        <p className='mb-1 font-semibold'>Explore All iPad</p>
                        <p className='mb-1 font-semibold'>iPad Pro</p>
                        <p className='mb-1 font-semibold'>iPad Air</p>
                        <p className='mb-1 font-semibold'>iPad</p>
                        <p className='mb-1 font-semibold'>iPad mini</p>
                        <p className='mb-1 font-semibold'>Apple Pencil</p>
                        <p className='mb-1 font-semibold'>Keyboards</p>
                        <p className='font-semibold text-sm mt-4 mb-2'>Compare iPad</p>
                        <p className='font-semibold text-sm'>Why iPad</p>
                    </ul>
                </div>}
                {props.prop == "iPhone" && 
                <div className='flex-col py-10 ml-[210px]'>
                    <ul className='text-xl' id='info'>
                        <p className='text-sm pb-4'>Explore iPhone</p>
                        <p className='mb-1 font-semibold'>Explore all iPhone</p>
                        <p className='mb-1 font-semibold'>iPhone 14 Pro</p>
                        <p className='mb-1 font-semibold'>iPhone 14</p>
                        <p className='mb-1 font-semibold'>iPhone 13</p>
                        <p className='mb-1 font-semibold'>iPhone 12</p>
                        <p className='mb-1 font-semibold'>iPhone SE</p>  
                        <p className='font-semibold text-sm mt-4 mb-2'>Compare iPhone</p>
                        <p className='font-semibold text-sm'>Switch to iPhone</p>
                    </ul>
                </div>}
                {props.prop == "Watch" && 
                <div className='flex-col py-10 ml-[210px]'>
                    <ul className='text-xl' id='info'>
                        <p className='text-sm pb-4'>Explore Apple Watch</p>
                        <p className='mb-1 font-semibold'>Explore All Apple Watch</p>
                        <p className='mb-1 font-semibold'>Apple Watch Ultra</p>
                        <p className='mb-1 font-semibold'>Apple Watch Series 8</p>
                        <p className='mb-1 font-semibold'>Apple Watch SE</p>
                        <p className='mb-1 font-semibold'>Apple Watch Nike</p>
                        <p className='mb-1 font-semibold'>Apple Watch Hermes</p>
                        <p className='font-semibold text-sm mt-4 mb-2'>Compare Watch</p>
                        <p className='font-semibold text-sm'>Why Apple Watch</p>
                    </ul>
                </div>}
                {props.prop == "Airpods" && 
                <div className='flex-col py-10 ml-[210px]'>
                    <ul className='text-xl' id='info'>
                        <p className='text-sm pb-4'>Explore AirPods</p>
                        <p className='mb-1 font-semibold'>Explore All Airpods</p>
                        <p className='mb-1 font-semibold'>AirPods 2nd generation</p>
                        <p className='mb-1 font-semibold'>AirPods 3rd generation</p>
                        <p className='mb-1 font-semibold'>AirPods Pro 2nd generation</p>
                        <p className='mb-1 font-semibold'>AirPods Max</p>
                        <p className='text-sm font-semibold mt-4 mb-2'>Compare Watch</p>
                        <p className='text-sm font-semibold'>Why Apple Watch</p>
                    </ul>
                </div>}
                {props.prop == "TV" && 
                <div className='flex-col py-10 ml-[210px]'>
                    <ul className='text-xl' id='info'>
                        <p className='text-sm pb-4'>Explore TV & Home</p>
                        <p className='mb-1 font-semibold'>Explore TV & Home</p>
                        <p className='mb-1 font-semibold'>Apple TV 4K</p>
                        <p className='mb-1 font-semibold'>HomePod</p>
                        <p className='mb-1 font-semibold'>HomePod Mini</p>
                    </ul>
                </div>}
                {props.prop == "Entertainment" && 
                <div className='flex-col py-10 ml-[210px]'>
                    <ul className='text-xl' id='info'>
                        <p className='text-sm pb-4'>Explore Entertainment</p>
                        <p className='mb-1 font-semibold'>Explore Entertainment</p>
                        <p className='mb-1 font-semibold'>Apple One</p>
                        <p className='mb-1 font-semibold'>Apple TV+</p>
                        <p className='mb-1 font-semibold'>Apple Music</p>
                        <p className='mb-1 font-semibold'>Apple Arcade</p>
                        <p className='mb-1 font-semibold'>Apple Fitness+</p>
                        <p className='mb-1 font-semibold'>Apple News+</p>
                        <p className='mb-1 font-semibold'>Apple Podcasts</p>
                        <p className='mb-1 font-semibold'>Apple Books</p>
                        <p className='mb-1 font-semibold'>App Store</p>
                    </ul>
                </div>}
                {props.prop == "Accessories" && 
                <div className='flex-col py-10 ml-[210px]'>
                    <ul className='text-xl' id='info'>
                        <p className='text-sm pb-4'>Shop Accessories</p>
                        <p className='mb-1 font-semibold'>Shop All Accessories</p>
                        <p className='mb-1 font-semibold'>Mac</p>
                        <p className='mb-1 font-semibold'>iPad</p>
                        <p className='mb-1 font-semibold'>iPhone</p>
                        <p className='mb-1 font-semibold'>Apple Watch</p>
                        <p className='mb-1 font-semibold'>AirPods</p>
                        <p className='mb-1 font-semibold'>TV & Home</p>
                    </ul>
                </div>}
                {props.prop == "Support" && 
                <div className='flex-col py-10 ml-[210px]'>
                    <ul className='text-xl' id='info'>
                        <p className='text-sm pb-4'>Explore Support</p>
                        <p className='mb-1 font-semibold'>iPhone</p>
                        <p className='mb-1 font-semibold'>Mac</p>
                        <p className='mb-1 font-semibold'>iPad</p>
                        <p className='mb-1 font-semibold'>Watch</p>
                        <p className='mb-1 font-semibold'>AirPods</p>
                        <p className='mb-1 font-semibold'>Music</p>
                        <p className='mb-1 font-semibold'>TV</p>      
                        <p className='text-sm mt-4 font-semibold pb-4'>Explore Support</p>  
                    </ul>
                </div>}
                <div onMouseEnter={() => {props.setHover(false);}} id='blur' className='h-0 w-full z-0 backdrop-blur-sm absolute top-full'></div>
            </div>
        </div>
    )
}