

export function Catalog(){
    return(
       <section className="w-screen h-screen bg-green-200   px-[4rem] "     >
        
        <section className="w-auto h-auto bg-orange-300 grid grid-cols-4 py-10 gap-8 ">
        <article className=" bg-red-400 w-full h-[70vh]">
        </article>
        <article className=" bg-red-400 w-full h-[70vh]">
        </article>
        <article className=" bg-red-400 w-full h-[70vh]">
        </article>
        <article className=" bg-red-400 w-full h-[70vh]">
        </article>
        <article className=" bg-red-400 w-full h-[70vh]">
        </article>

        </section>
       </section>
    )
}


/**
 * 
 * <Header></Header>

<section class="h-auto w-full flex items-center justify-center relative py-16">
    <div class="relative w-full bg-amber-200 max-w-4xl h-96 overflow-hidden rounded-lg shadow-md">
        <div id="slider" class="flex transition-transform duration-700 ease-in-out" style="width: 300%;">
            <img src="/images/slide1.jpg" alt="Slide 1" class="w-full h-96 object-cover flex-shrink-0" />
            <img src="/images/slide2.jpg" alt="Slide 2" class="w-full h-96 object-cover flex-shrink-0" />
            <img src="/images/slide3.jpg" alt="Slide 3" class="w-full h-96 object-cover flex-shrink-0" />
        </div>
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            <span class="w-3 h-3 bg-white rounded-full opacity-70" id="dot0"></span>
            <span class="w-3 h-3 bg-white rounded-full opacity-50" id="dot1"></span>
            <span class="w-3 h-3 bg-white rounded-full opacity-50" id="dot2"></span>
        </div>
      
    </div>
</section>

 <script  >
            let current = 0;
            const slides = 3;
            const slider = document.getElementById('slider');
            const dots = [0,1,2]
                .map(i => document.getElementById(`dot${i}`))
                .filter((dot): dot is HTMLElement => dot !== null);
            function showSlide(idx: number) {
                if (!slider) return;
                slider.style.transform = `translateX(-${idx * 100}%)`;
                dots.forEach((dot, i) => dot.style.opacity = i === idx ? "0.7" : "0.5");
            }
            setInterval(() => {
                current = (current + 1) % slides;
                showSlide(current);
            }, 3500);
            showSlide(current);
 </script>
 
 */