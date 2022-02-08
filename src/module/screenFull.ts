import "../styles/screenFull.scss";

const screenFull = () => {
    const TIME_OUT = 500 
    const body = document.querySelector('body')
    const sectionsQty = document.querySelectorAll('section').length
    let startFlag = true
    let initialScroll = window.scrollY
    let qty = 1,
    main: HTMLElement = null,
    next: HTMLElement = null,
    start: Boolean = false,
    mobile = window.innerWidth < 980,
    stickCurrent: null|HTMLElement = document.querySelector(`.stick[data-to="${qty}"]`) || null,
    lineActive: HTMLElement = document.querySelector(`.line-active`)

    const changeActiveStick = (qty2:number) => {
        if(qty2 == Number(stickCurrent.dataset.to)) return
        let stick: HTMLElement = document.querySelector(`.stick[data-to="${qty2}"]`)
        if(!stick) return
        if(stick) {
            stick.classList.add('active')
        }
        stickCurrent.classList.remove('active')
        stickCurrent = stick

        lineActive.style.transform = `translateX(${stick.offsetLeft + ((stick.offsetWidth / 2)/2)}px)`
        lineActive.style.transition = 'transform 0.5s'
        lineActive.style.width = `${stick.offsetWidth/2}px`
    }

    document.querySelectorAll('.stick').forEach(stick => {
        stick.addEventListener('click', (e) => {
            if (!(e.target instanceof HTMLElement)) {
                return;
            }
            if(!mobile) {
            const to = Number(e.target.parentElement.dataset.to)

            changeActiveStick(to)

            if (startFlag) {
                if(to == qty)return;

                for(let i = Number(to)+1; i <= sectionsQty;i++){
                    if(i == to || i == qty)continue;
                    document.querySelector<HTMLElement>(`section.s${i}`).style.display = "none"
                    document.querySelector<HTMLElement>(`section.s${i}`).style.transform = 'translateY(100vh)'
                }
                for(let i = 1; i < Number(to);i++){
                    if(i == to || i == qty)continue;
                    document.querySelector<HTMLElement>(`section.s${i}`).style.display = "none"
                    document.querySelector<HTMLElement>(`section.s${i}`).style.transform = 'translateY(-100vh)'
                }
                if(to == 1){
                    main = document.querySelector(`section.s${to}`)
                    next = document.querySelector(`section.s${to}`)
                    main.style.transform = 'translateY(0)'
                    document.querySelector<HTMLElement>(`section.s${qty}`).style.transform = 'translateY(100vh)'
                }else if (qty < to) {
                    next = document.querySelector(`section.s${to}`)
                    document.querySelector<HTMLElement>(`section.s${qty}`).style.transform = 'translateY(-100vh)'
                    main = document.querySelector(`section.s${to}`)
                    main.style.transform = 'translateY(0)'
                } else if (qty > 1) {
                    next = document.querySelector(`section.s${Number(to)}`)
                    document.querySelector<HTMLElement>(`section.s${qty}`).style.transform = 'translateY(100vh)'
                    main = document.querySelector(`section.s${to}`)
                    main.style.transform = 'translateY(0)'
                }

                next.style.visibility = 'visible'

                setTimeout(() => {
                    initialScroll = window.scrollY
                    startFlag = true
                    body.style.overflowY = 'scroll'
                    for(let i = 1; i <= sectionsQty;i++){
                        if(i == to || i == qty)continue;
                        document.querySelector<HTMLElement>(`section.s${i}`).style.display = "flex"
                    }
                }, TIME_OUT)

                qty = Number(to)
                startFlag = false
            }
            }else{
                const to = Number(e.target.parentElement.dataset.to)
                
                window.scrollTo({
                    top: document.querySelector<HTMLElement>(`section.s${to}`).offsetTop,
                    behavior: 'smooth'
                })
            }
        })  
    })

    window.addEventListener('scroll', () => {
        if(mobile)return;
        if (startFlag && start) {
            const scrollDown = window.scrollY >= initialScroll
            const scrollLimit = qty >= 1 && qty <= sectionsQty
            if (scrollLimit) {
                body.style.overflowY = 'hidden'
                if (scrollDown && qty < sectionsQty) {
                    main = document.querySelector(`section.s${qty}`)
                    next = document.querySelector(`section.s${qty + 1}`)
                    main.style.transform = 'translateY(-100vh)'
                    next.style.transform = 'translateY(0)'
                    next.style.visibility = 'visible'
                    qty++
                } else if (!scrollDown && qty > 1) {
                    main = document.querySelector(`section.s${qty - 1}`)
                    next = document.querySelector(`section.s${qty}`)
                    main.style.transform = 'translateY(0)'
                    next.style.transform = 'translateY(100vh)'
                    next.style.visibility = 'visible'
                    qty--
                }
            }

            changeActiveStick(qty)

            setTimeout(() => {
                initialScroll = window.scrollY
                startFlag = true
                body.style.overflowY = 'scroll'
            }, TIME_OUT)
            startFlag = false
    }else{
        start = true
    }
        window.scroll(0, window.screen.height)
    })

    window.addEventListener('resize', () => {
        mobile = window.innerWidth < 980
        if(mobile){
            for(let i = 1; i <= sectionsQty;i++){
                document.querySelector<HTMLElement>(`section.s${i}`).style.transform = 'translateY(0)'
            }
        }else{
            document.querySelector<HTMLElement>(`section.s1`).style.transform = 'translateY(0)'
            for(let i = 2; i <= sectionsQty;i++){
                document.querySelector<HTMLElement>(`section.s${i}`).style.transform = 'translateY(100vh)'
            }
            qty = 1,
            main = null
            next = null
            start = false
            changeActiveStick(qty)
        }
    });
}

export default screenFull