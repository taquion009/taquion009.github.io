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
    mobile = window.innerWidth < 980

    const changeActiveStick = (qty2:number) => {
        const active = document.querySelector<HTMLElement>('.section-stick .stick.active')
        if(!active) return
        active.style.top = (62 + 30) * (qty2 - 1) + 'px'
    }

    const addStick = () => {
        const sectionStick = document.querySelector<HTMLElement>('.section-stick')
        if(!sectionStick) return
        let i = 1
        Array(sectionsQty)
        .fill(0)
        .forEach(() => {
            sectionStick.innerHTML = sectionStick.innerHTML + `<div data-to=${i} class="stick"></div>`
            i++
        })
    }

    addStick()
    changeActiveStick(qty)

    document.querySelectorAll('.stick').forEach(stick => {
        stick.addEventListener('click', (e) => {
            if (!(e.target instanceof HTMLButtonElement)) {
                return;
              }
            const to = Number(e.target.dataset.to)

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
                changeActiveStick(qty)
                startFlag = false
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
        }
    });
}

export default screenFull