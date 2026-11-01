
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
    for (let x = w; x > 0; x -= step) points.push([x, h - jag()]);
    for (let y=h;y>0;y-=step) points.push([jag(),y]);

return "polygon("+points.map((p)=>p[0].toFixed(1)+"px "+p[1].toFixed(1)+"px ").join(", ")+")";

}
function shapeRock(el){
    const w =el.offsetWidth;
    const h=el.offsetHeight;

    
if (el.matches("section")){
    el.style.setProperty("--rim", jaggedShape(w+28,h+28,14,18));
    el.style.setProperty("--chip",jaggedShape(w,h,5,26));
}else{
    el.style.setProperty("--chip",jaggedShape(w,h,4,20));
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
        box.style.setProperty("--x","-9999px");
    });
})



const termForm = document.getElementById("term-form");
const termInput = document.getElementById("term-input");
const termOutput = document.getElementById("term-output");

const commands ={
    help: "commands: whoami, hobbies, projects, starbie, sudo, theme, roll, cd projects, matrix, clear",
    whoami:"hannah:student,coder,future ethical hacker",
    hobbies: "doodling, reading, python, tiny origami",
    projects:"check the projects tab ;)",
    starbie:"GAME CHILD: a XIAO ESP32-C3 in a knockoff game console",
    sudo:"nice try. permission denied."
};
function termPrint(text){
    const line = document.createElement("p");
    line.textContent=text;
    termOutput.appendChild(line);
    termOutput.scrollTop = termOutput.scrollHeight;
}

if(termForm){
    const history=[];
    let historyPos =0;

    termForm.addEventListener("submit",()=>{
        history.push(termInput.dataset.last);
        historyPos=history.length;
    });

    termInput.addEventListener("keydown",(e)=>{
        termInput.dataset.last = termInput.value || termInput.dataset.last;
        if (e.key === "ArrowUp" && historyPos >0){
            historyPos--;
            termInput.value = history[historyPos];
            e.preventDefault();
        }
    });
}

if (termForm){
    termForm.addEventListener("submit",(e)=>{
        e.preventDefault();
        const cmd = termInput.value.trim().toLowerCase();
        termInput.value = "";
        if (cmd === "") return;

        termPrint("$ "+cmd);

        if (cmd ==="clear"){
            termOutput.innerHTML="";

        }else if (cmd==="theme"){
            document.body.classList.toggle("day");
            save("theme",document.body.classList.contains("day")? "day":"night");
            termPrint("switched the lights ✦");

        }else if (cmd==="roll"){
            termPrint("you rolled a "+(Math.floor(Math.random()*6)+1));

        }else if (cmd === "cd projects"){
            termPrint("opening projects...");
            setTimeout(()=>{window.location.href="projects.html";},600);
        }else if (cmd ==="matrix"){
            termPrint("wake up...");
            startMatrix();
        }else{
            termPrint(commands[cmd] || "command not found: "+cmd);
        }
    });
}


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
    croissant.addEventListener("click",()=>{
        croissant.classList.add("spin");
        croissantMsg.textContent = croissantLines[Math.floor(Math.random()* croissantLines.length)]

    });

    croissant.addEventListener("animationend", ()=>{ /* chec k this apajiwdniwndiw niwqdwbeud9uew9*/
        croissant.classList.remove("spin");
    });
}

const lightbox=document.getElementById("lightbox");
const lightboxImg=document.getElementById("lightbox-img");

if(lightbox && lightboxImg){
    document.querySelectorAll(".card").forEach((card)=>{
        const art = card.querySelector(".art");
        if (!art) return;
card.addEventListener("click",()=>{
    lightboxImg.src=art.src;
    lightbox.classList.add("open");
})
        
    })

    lightbox.addEventListener("click",()=>{
        lightbox.classList.remove("open");
    })
}

const gallery = document.getElementById("gallery");

if (gallery){
    let x=0
    let y=0
    let waiting=false;

    gallery.addEventListener("mousemove",(e)=>{
        const box = gallery.getBoundingClientRect();
        x = (e.clientX - box.left)/box.width - 0.5;
        y=(e.clientY - box.top)/box.height-0.5;


if (!waiting){
    waiting=true;
    requestAnimationFrame(()=>{
        gallery.style.setProperty("--mx",x);
        gallery.style.setProperty("--my",y);
        waiting=false;
    })
}

    });

gallery.addEventListener("mouseleave",()=>{
    gallery.style.setProperty("--mx",0)
    gallery.style.setProperty("--my",0)
})

}


const randomBtn=document.getElementById("random-site")

if(randomBtn){
    randomBtn.addEventListener("click",()=>{
        const links=document.querySelectorAll("a.link-card")
            const pick = links[Math.floor(Math.random()*links.length)];
            window.open(pick.href,"_blank");
        
    })
}



function startMatrix(){
    const canvas = document.createElement("canvas");
    canvas.id="matrix";
    document.body.appendChild(canvas);

    const ctx=canvas.getContext("2d");
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

    const size=18;
    const columns = Math.floor(canvas.width/size);
    const drops = new Array(columns).fill(0);
    const letters = "1010ハックする、ただし倫理的に★HANNAH☆";

    function draw(){
        ctx.fillStyle="rgba(0, 0, 0, 0.08)";
        ctx.fillRect(0, 0, canvas.width,canvas.height);

        ctx.fillStyle="#8ff0c4";
        ctx.font=size+"px VT323";

        drops.forEach((y, i)=>{
            const letter=letters[Math.floor(Math.random()*letters.length)];
            ctx.fillText(letter, i*size, y*size);

            if (y*size>canvas.height && Math.random()>0.97)drops[i] = 0;
            drops[i]++;
        });
    }
requestAnimationFrame(()=>canvas.classList.add("on"));
const timer = setInterval(draw,40);

setTimeout(()=>{
    canvas.classList.remove("on");
    setTimeout(()=>{
        clearInterval(timer);
        canvas.remove();
    },500);
},5000);


    }



const konami=["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
let konamiStep=0;

document.addEventListener("keydown",(e)=>{
    if (e.key === konami[konamiStep]){
        konamiStep++;
        if (konamiStep === konami.length){
            document.body.classList.add("glitched");
            setTimeout(()=>document.body.classList.remove("glitched"),1500);
            konamiStep=0;
        }
    }else{
        konamiStep=0;
    }
});


const tessBox = document.getElementById("tess-box");
const tessName = document.getElementById("tess-name");
const patterns = [
  ["tess-triangles", "triangles"],
  ["tess-pinwheel", "pinwheel"],
  ["tess-checker", "checkerboard"],
  ["tess-zigzag", "zigzag"]
];
let tessIndex = 0;

if (tessBox && tessName) {
  tessBox.addEventListener("click", () => {
    tessBox.classList.add("folding");

 setTimeout(() => {
      tessBox.classList.remove(patterns[tessIndex][0]);
      tessIndex = (tessIndex + 1) % patterns.length;
      tessBox.classList.add(patterns[tessIndex][0]);
      tessName.textContent = "pattern: " + patterns[tessIndex][1];
    }, 200);
  });

  tessBox.addEventListener("animationend", () => {
    tessBox.classList.remove("folding");
  });
}