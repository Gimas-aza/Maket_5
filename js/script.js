// Плавный скрол----------------------------------
document.querySelectorAll('a.nav__yakor').forEach(link => {

    link.addEventListener('click', function(e) {
        e.preventDefault();

        const href = this.getAttribute('href').substring(1);

        const scrollTarget = document.getElementById(href);

        const topOffset = 0; // если не нужен отступ сверху 
        // const topOffset = document.querySelector('.scrollto').offsetHeight;
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset;

        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});
// header------------------
document.querySelector("#lang").addEventListener("click", function() {
    this.classList.toggle("language__ru_active");
    document.querySelector(".select__body").classList.toggle("language_active");
});
document.querySelector("#lang_nav").addEventListener("click", function() {
    this.classList.toggle("language__ru_active");
    document.querySelector("#lang_body").classList.toggle("language_active");
});
// Адаптивное меню---------
document.querySelector(".burger-menu").addEventListener('click', function() {
    this.classList.toggle("menu-on");
    document.querySelector(".header__nav").classList.toggle("barMenuOn");
    document.querySelector(".icon-call-big").classList.toggle("call__up");
});
document.querySelector("#list").addEventListener("click", function() {
    this.classList.toggle("nav__list_active");
    document.querySelector(".list__body").classList.toggle('list__body_active');
});

let navigation = document.querySelector('.header'); // Инициализируем блок навигации

document.onscroll = function() {
    if ((window.pageYOffset + 50) >= navigation.offsetHeight) { // Если началась прокрутка, то...
        navigation.classList.add("sticky");
    } else { // Иначе...
        navigation.classList.remove("sticky");
    };
}
// ========================
// section2-------------------------------------
let sites = document.querySelector(".main__sites");
let krug = document.querySelector(".section2__popapKrug");
let popapNum = document.querySelectorAll(".main__sites-numder");
let popap = document.querySelector(".section2__popap");

let lock = false;
popapNum.forEach(e => {
    let x, y;

    e.addEventListener("mousemove", kord => {
        if (lock) {
            return
        }

        x = kord.pageX,
        y = kord.pageY;

        krug.style.cssText = `
            top: ${y - sites.offsetTop}px;
            left: ${x}px;
            display: flex;
        `;
    });

    e.addEventListener("mouseout", () => {
        if (lock) {
            return
        }

        krug.style.display = 'none';
    });

    e.addEventListener("click", function() {
        if (lock) return;
        if (popap != undefined) popap.remove();

        sites.insertAdjacentHTML("afterbegin", 
        `
            <div class="section2__popap" style="
                top: ${y - sites.offsetTop}px;
                left: ${x + 30}px;
            ">
                <div class="popap__title">
                    <h3 class="popap__title_h3">Участок №${e.innerHTML}</h3>
                    <h3 class="popap__title_h3">Свободен</h3>
                </div>
                <table class="popap__table">
                    <tr class="row">
                        <td class="columns_small">Площадь участка:</td>
                        <td class="columns_normal">3000 м2</td>
                    </tr>
                    <tr class="row">
                        <td class="columns_small">Площадь застройки:</td>
                        <td class="columns_normal">300 м2</td>
                    </tr>
                    <tr class="row">
                        <td class="columns_small">Адрес:</td>
                        <td class="columns_normal">Vainu tee 12</td>
                    </tr>
                    <tr class="row">
                        <td class="columns_small">Стоимость:</td>
                        <td class="columns_normal">350 000 €</td>
                    </tr>
                </table>
                <div class="popap__button-b"><a href="" class="popap__button button">Подробнее</a></div>
            </div>
        `);

        lock = true;
    });
});
document.addEventListener( 'click', function(event) {
    let eTarget = event.target;
    let noClose;

    if (eTarget.classList[0] != "main__sites-numder" || popap != null) {
        document.querySelectorAll(".section2__popap *").forEach(e => {
            // console.log(eTarget.className, " == ", e.className);

            if (eTarget.className == e.className || eTarget.className == "section2__popap"){
                noClose = true;
                return;
            }
        });
        if (noClose) return;
        
        if (popap != undefined) popap.remove();
        lock = false;
        krug.style.display = 'none';
    }
    popap = document.querySelector(".section2__popap");
});

// cloud----------------------------------------
let i_anime = document.querySelectorAll(".main__cloud");
let ia = [];
for ( i = 0; i < 9; i++ ) {
   ia.push( Math.round( Math.random() * 100 ));
}

setInterval(() => {
    let i = 0;
    i_anime.forEach((e) => {
        e.style.left = `${ia[i]}%`;
        ia[i] += 0.02;
        if (ia[i] >= 100) {
            ia[i] = -50;
            // e.style.left = "0";
        }
        i++;
    });
}, 10);

// section6-------------------------------------
let arowL = document.querySelector(".main__arowL"),
    arowR = document.querySelector(".main__arowR");

let text_bold = slideC => document.querySelector(`.section6__text:nth-child(${slideC})`),
    textLen = document.querySelectorAll(".section6__text").length,
    textLight = [
        "Новая широкая дорога",
        "Text 2",
        "Text 3",
        "Text 4",
        "Text 5",
        "Text 6",
        "Text 7",
        "Text 8",
        "Text 9",
        "Text 10",
        "Text 11",
        "Text 12",
        "Text 13",
    ];
let textCont = () => {
    document.querySelector(".main__text_regular").firstChild.nodeValue = text_bold(slideC).firstChild.nodeValue;
    document.querySelector(".main__text_light").firstChild.nodeValue = textLight[slideC - 1];

    let slideB_img = document.querySelector(".slider-block__img");

    slideB_img.src = `./img/jpeg/slaid${slideC}.jpg`;
    document.querySelector(".main__slider-block source").srcset = `./img/jpeg/slaid${slideC}.webp`;
}

let slideC = 1;


arowR.addEventListener("click", () => {
    text_bold(slideC).classList.remove("main__text_bold");

    if ( slideC >= textLen ) {
        text_bold(slideC = 1).classList.add("main__text_bold");
    } else {
        text_bold(++slideC).classList.add("main__text_bold");
    }

    textCont()
});
arowL.addEventListener("click", () => {
    text_bold(slideC).classList.remove("main__text_bold");

    if ( slideC <= 1 ) {
        text_bold(slideC = textLen).classList.add("main__text_bold");
    } else {
        text_bold(--slideC).classList.add("main__text_bold");
    }
    
    textCont()
});


// section12-------------------------------------
media();
window.addEventListener('resize', media);

function media() {
    let media_b = true;


    let block12 = document.querySelector(".section12__block"),
        img_b12 = document.querySelector(".section12__img-b"),
        block12_ti = document.querySelector(".section12__title");
    if (window.matchMedia("(max-width: 992px)").matches && media_b) 
    {
        img_b12.prepend(block12_ti);
        media_b = false;
    } else
    {
        block12.prepend(block12_ti);
        media_b = true;
    }
}