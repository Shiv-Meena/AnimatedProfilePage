const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    // iske mtlb jo element mein hmari website hai that is main usme locomotive lgana hai
    smooth: true
});
function firstpageanimation() {
    var tl = gsap.timeline();
    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 2,
        ease: Expo.easeInOut
    })
        .to(".boundingelem", {
            y: 0,
            ease: Expo.easeInOut,
            duration: 2,
            stagger: .2,
            delay: -1
            // stagger gives delay between the class elements
        })
        .from("#herofooter", {
            y: -10,
            opacity: 0,
            duration: 1.5,
            delay: -1,
            ease: Expo.easeInOut
        })


}
function circlemousefollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`
    })
}
// jb cursor move ho to jo minicricle banaya hai vo thoda pichke , max aur min skew set kr paye taki ekdum hi chapta na hojaye , jab mouse move ho to chapta ki value bde  aur jb mouse still ho to chapta hata lo matl normal circle hojaye timestamp 1:44:00 ( https://www.youtube.com/watch?v=InvSEpJUXu4 )

function circlechaptakro() {
    // define default scale value , at value 1 the circle will look like a normal circle and our circle will vary from .8 to 1.2 

    var xscale = 1;
    var yscale = 1;

    // xprev and yprev will store the initial value or coordinates of pointer
    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove", function (dets) {
        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;
        // clamp will round of the xdiff and ydiff value to the given range for eg 43 show up it will give ans as 1.2 because 1.2 is nearest to 43 whereas if -43 shows up it will round it of to .8 ,
        xscale = gsap.utils.clamp(.8, 1.2, xdiff);
        yscale = gsap.utils.clamp(.8, 1.2, ydiff);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circlemousefollower(xscale, yscale);

    });
}
circlechaptakro();
circlemousefollower();
firstpageanimation();


// teeno element ko select kr0, uske baad teeno par mousemove lagao, jab mousemove ho to ye pta kro ki mouse kaha par hai , jiska mtlb ki x and y positio pta kro , ab mouse ki x y position par us image ko show kro and us image ko move kro , move karte waqt rotate kro and jaise jaise mouse tez chale waise waise rotation bhi tez ho jaye

// for each isiliye lagaya kyunki saare elem pr kaam krna hai agar ni lgate to bas pehle wale pr lag jata , aisa smjho document queryselector all ek array jaisa structure hai jisko js mein nodelist kehte hai aur for each basically for loop hai jo har elem (cpp refrence lo to i) pe andar ki cheeze execute krega to basically (elem-> i) (for each->for)
document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diff1 = 0;
    elem.addEventListener("mousemove", function (details) {
        // console.log(dets.clientX,dets.clientY);
        var diff = details.clientY - elem.getBoundingClientRect().top;
        // getBoundingClientRect() is a function that gives all the detail of that div (in this case elem) like height , width , distance from top etc etc


        diff1 = details.clientX - rotate;
        rotate = details.clientX;

        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            duration: 0.5,
            top: diff,
            left: details.clientX,
            rotate: gsap.utils.clamp(-15, 15, diff1),
        })
    });
});

document.querySelectorAll(".elem").forEach(function (elem) {
    elem.addEventListener("mouseleave", function (details) {
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: .5,
        })
    });
});