
function load(key){
    try{return localStorage.getItem(key);} catch (err) {return null;}
}
function save(key,value){
    try{localStorage.setItem(key,value);}catch (err){}
}


document.querySelectorAll(".typing").forEach((line)=>{
    const n = line.textContent.trim().length;
    line.style.width =n+"ch";
    line.style.animation="type 3s steps(" + n + "),blink 0.7s step-end infinite";
    

});

function jaggedShape(w,h,rough,step){
    const points=[]
    const jag=()=>Math.random()*rough;

    for(let x=0; x<w;x+=step) points.push([x,jag()]);
    for(let y = 0; y<h;y+=step) points.push([w - jag(),y]);
    for(let x =w; x>0; y-=step) points.push([jag(),y]);

return "polygon("+points.map((p)=>p[0].toFixed(1)+"px"+p[1].toFixed(1)+"px").join(", ")+")";

}
function shapeRock(el){
    const w =el.offsetWidth;
    const h=el.offsetHeight;

    
if (el.matches("section")){
    el.style.setProperty("--rim", jaggedShape(w+28,h+28,14,18));
    el.style.setProperty("--chip",jaggedShape(w,h,5,26));
}else{
    el.style.setProperty("-chip",jaggedShape(w,h,4,20));
}

}

const rockWatcher = new ResizeObserver((entries)=>{
    entries.forEach((entry)=>shapeRock(entry.target));
});
document.querySelectorAll("section, .chip").forEach((el)=> rockWatcher.observe(el));


document.querySelectorAll("section").forEach((box)=>{
    box.addEventListener("mousemove",(e)=>{
        const rect = box.getBoundingClientRect();
        box.style.setProperty("--x",(e.clientX -rect.left)+"px");
        box.style.setProperty("--y",(e.clientY - rect.top)+"px");
    });

    box.addEventListener("mouseleave",()=>{
        box.style.setProperty("--y","-9999px");
    });
})


function makeSparkle(x,y,symbol,dx,dy,type){
    const s= document.createElement("span");
    s.className = type;
    s.textContent = symbol;
    s.style.left=x+"px"
    s.style.top = y+"px";
    s.style.setProperty("--dx",dx+"px");
    s.style.setProperty("--dy",dy+"px");
    document.body.appendChild(s);
    setTimeout(()=> s.remove(),800);
}


const cursor=document.getElementById("cursor");

document.addEventListener("mousemove",(e)=>{
    if (cursor){
        cursor.style.left = e.clientX+"px"
        cursor.style.top=e.clientY+"px"
    }
    if (Math.random() < 0.25){
        makeSparkle(e.clientX,e.clientY,"✦",0,25,"trail");
    }
});

document.addEventListener("click",(e)=>{
    for(let i = 0; i< 8;i++){
        makeSparkle(e.clientX,e.clientY,"✦",Math.random()*200 - 100,Math.random()*200-100,"burst");
    }
});


const themeBtn=document.getElementById("theme-btn");

if(load("theme")==="day"){
    document.body.classList.add("day");
}

if(themeBtn){
    themeBtn.addEventListener("click",()=>{
        document.body.classList.toggle("day");
        save("theme",document.body.classList.contains("day")? "day":"night");
        
    });
}

const star= document.getElementById("star");
const countText = document.getElementById("count");

if(star && countText){
    let count = Number(load("stars")) || 0;
    countText.textContent=count;

    star.addEventListener("click",()=>{
        count++;
        countText.textContent=count;
        save("stars",count);
    })
}

const croissant=document.getElementById("croissant");
const croissantMsg=document.getElementById("croissant-msg");
const croissantLines =[
"crumbs everywhere",
"buttery",
"ok that was a good flip",
"stop clicking me",
"flaky with almonds",
"this is a certified croissant-only zone"
];

if (croissant && croissantMsg){
    croissant.addEventListener("ciick",()=>{
        croissant.classList.add("spin");
        croisssantMsg.textContent = croissantLines[(Math.random()*croissant.length)];

    });

    croissant.addEventListener("animationend", ()=>{
        croissant.classList.remove("spin");
    });
}

const lightbox=document.getElementById("lightbox");
const lightboxImg=document.getElementById("lightbox-img");

