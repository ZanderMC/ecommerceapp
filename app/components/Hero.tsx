'use client'

import { useEffect, useState } from 'react'

const slides = [
    { src: '/public/img1.jpeg', alt: 'Slide1' },
//    { src: '/public/img2.jpeg', alt: 'Slide2' },
 ]

export function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const interval = window.setInterval(() => {
            setCurrentSlide((current) => (current + 1) % slides.length)
        }, 3500)

        return () => window.clearInterval(interval)
    }, [])

    return (
        <section className="relative flex h-auto w-full items-center justify-center py-16">
            <div className="relative h-96 w-full max-w-4xl overflow-hidden rounded-lg bg-amber-200 shadow-md">
                <div
                    className="flex h-full transition-transform duration-700 ease-in-out"
                    style={{
                        width: `${slides.length * 100}%`,
                        transform: `translateX(-${currentSlide * (100 / slides.length)}%)`,
                    }}
                >
                    {slides.map((slide) => (
                        <img
                            key={slide.src}
                            src={slide.src}
                            alt={slide.alt}
                            className="h-96 shrink-0 object-cover"
                            style={{ width: `${100 / slides.length}%` }}
                        />
                    ))}
                </div>
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                    {slides.map((slide, index) => (
                        <button
                            key={slide.src}
                            type="button"
                            aria-label={`Go to ${slide.alt}`}
                            aria-current={currentSlide === index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-3 w-3 rounded-full bg-white transition-opacity cursor-pointer ${
                                currentSlide === index ? 'opacity-70' : 'opacity-50'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}