
// Music toggle button control
let isMusicPlaying = false;
const audio = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicToggle");

function toggleMusic() {
    if (isMusicPlaying) {
        audio.pause();
        musicBtn.textContent = "🔊 Play Music";
        isMusicPlaying = false;
    } else {
        audio.muted = false;
        audio.play().catch(err => {
            console.log("Playback failed:", err);
        });
        musicBtn.textContent = "🔇 Mute Music";
        isMusicPlaying = true;
    }
}

musicBtn.addEventListener("click", toggleMusic);

// Also unmute on any page interaction
function unmuteOnInteraction() {
    if (audio && audio.muted && !isMusicPlaying) {
        audio.muted = false;
        audio.play().catch(err => console.log("Autoplay blocked:", err));
        musicBtn.textContent = "🔇 Mute Music";
        isMusicPlaying = true;
    }
}

document.addEventListener("click", unmuteOnInteraction);

// Cake cutting
function cutCake(){
document.getElementById("cakeMessage").innerHTML=
"🎉 Cake Cut! Make a Wish 💖";
launchFireworks();
}


// Love message
function showMessage(){
document.getElementById("loveMessage").style.display="block";
}


// Slideshow
let images=[
    "images/photo1.jpg",
    "images/photo2.webp",
    "images/photo3.jpg",
    "images/photo4.jpg"
];

let i=0;
let slide=document.getElementById("slide");

function changeSlide(){
    if(!slide) {
        console.error("Slide element not found");
        return;
    }
    
    slide.src=images[i];
    slide.style.display="block";
    
    slide.onload=function(){
        setTimeout(function(){
            i=(i+1)%images.length;
            changeSlide();
        },3000);
    };
    
    slide.onerror=function(){
        console.error("Error loading " + images[i]);
        i=(i+1)%images.length;
        changeSlide();
    };
}

// Only start slideshow if element exists
if(slide) {
    changeSlide();
}

// Fireworks
const canvas=document.getElementById("fireworks");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles=[];

function launchFireworks(){
canvas.style.display="block";
for(let i=0;i<100;i++){
particles.push({
x:canvas.width/2,
y:canvas.height/2,
vx:(Math.random()-0.5)*8,
vy:(Math.random()-0.5)*8,
life:100
});
}
}

function animate(){

    if(particles.length>0){
        requestAnimationFrame(animate);

        // wipe the canvas each frame so underlying background remains visible
        ctx.clearRect(0,0,canvas.width,canvas.height);

        particles.forEach((p,index)=>{

            p.x+=p.vx;
            p.y+=p.vy;
            p.life--;

            ctx.beginPath();
            ctx.arc(p.x,p.y,3,0,Math.PI*2);
            ctx.fillStyle="yellow";
            ctx.fill();

            if(p.life<=0){
                particles.splice(index,1);
            }
        });
    } else {
        canvas.style.display="none";
        ctx.clearRect(0,0,canvas.width,canvas.height);
    }
}


animate();
