
document.querySelectorAll("section").forEach((box)=>{
    box.addEventListener("mousemove",(e)=>{
        const rect=box.getBoundingClientRect();
        box.style.setProperty("--x",(e.clientX-rect.left)+"px");
        box.style.setProperty("--y",(e.clientY-rect.top)+"px");
    });
});

    const cursor=document.getElementById("cursor");
    document.addEventListener("mousemove",(e)=>{cursor.style.left=e.clientX+"px";cursor.style.top=e.clientY+"px";})

document.getElementById("theme-btn").addEventListener("click",()=>{
    document.body.classList.toggle("day");
});


let count=0;
document.getElementById("star").addEventListener("click",()=>{
    count++;
    document.getElementById("count").textContent=count;
});

const lightbox=document.getElementById("lightbox");
const lightboxImg=document.getElementById("lightbox-img");
document.querySelectorAll(".card").forEach((card)=>{
    card.addEventListener("click",()=>{
        lightboxImg.src=card.querySelector(".art").src;
        lightbox.classList.add("open");
    });
});
lightbox.addEventListener("click",()=>{
    lightbox.classList.remove("open");
});

const gallery =document.getElementById("gallery");
if (gallery){

const gallery=document.getElementById("gallery");
gallery.addEventListener("mousemove",(e)=>{
    const box=gallery.getBoundingClientRect();
    const x=(e.clientX - box.left)/box.width - 0.5;
    const y=(e.clientY - box.top)/box.height - 0.5;
    gallery.style.setProperty("--mx",x);
    gallery.style.setProperty("--my",y);
});
gallery.addEventListener("mouseleave",()=>{
    gallery.style.setProperty("--mx",0);
    gallery.style.setProperty("--my",0);
});
}

document.addEventListener("click",(e)=>{
    for(let i=0;i<6;i++){
        const s = document.createElement("span");
        s.className="burst";
        s.textContent="✨";
        s.style.left=e.clientX+"px";
        s.style.top=e.clientY+"px";
        s.style.setProperty("--dx",(Math.random() *200 - 100) + "px");
        s.style.setProperty("--dy",(Math.random() *200 - 100) + "px")
        document.body.appendChild(s);
        setTimeout(()=>s.remove(),600);
    }
});