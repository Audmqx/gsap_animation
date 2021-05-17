

//Oscillation 

function Osc(speed) {

    var frame = 0;                           // pseudo frame to enable animation

    this.current = function(x) {             // returns current sinus value
        frame += 0.005 * speed;              // value to tweak..
        return Math.sin(frame + x * speed);
    };
}



var img = new Image();
img.onload = waves;
img.src = "assets/img/bg2-scene1.png";


function waves() {
  var canvas = document.querySelector("canvas"),
      ctx = canvas.getContext("2d"),
      w = canvas.width,
      h = canvas.height;

  ctx.drawImage(this, 0, 0);

  var o1 = new Osc(0.05), o2 = new Osc(0.03), o3 = new Osc(0.06),  // osc. for vert
      o4 = new Osc(0.08), o5 = new Osc(0.04), o6 = new Osc(0.067), // osc. for hori
      
      // source grid lines
      x0 = 0, x1 = w * 0.25, x2 = w * 0.5, x3 = w * 0.75, x4 = w,
      y0 = 0, y1 = h * 0.25, y2 = h * 0.5, y3 = h * 0.75, y4 = h,
      
      // cache source widths/heights
      sw0 = x1, sw1 = x2 - x1, sw2 = x3 - x2, sw3 = x4 - x3,
      sh0 = y1, sh1 = y2 - y1, sh2 = y3 - y2, sh3 = y4 - y3,
      
      vcanvas = document.createElement("canvas"),  // off-screen canvas for 2. pass
      vctx = vcanvas.getContext("2d");

  vcanvas.width = w; vcanvas.height = h;           // set to same size as main canvas

  (function loop() {
    ctx.clearRect(0, 0, w, h);
    
    for (var y = 0; y < h; y++) {

      // segment positions
      var lx1 = x1 + o1.current(y * 0.2) * 2.5,
          lx2 = x2 + o2.current(y * 0.2) * 2,
          lx3 = x3 + o3.current(y * 0.2) * 1.5,

          // segment widths
          w0 = lx1,
          w1 = lx2 - lx1,
          w2 = lx3 - lx2,
          w3 =  x4 - lx3;

      // draw image lines
      ctx.drawImage(img, x0, y, sw0, 1, 0        , y, w0      , 1);
      ctx.drawImage(img, x1, y, sw1, 1, lx1 - 0.5, y, w1 + 0.5, 1);
      ctx.drawImage(img, x2, y, sw2, 1, lx2 - 0.5, y, w2 + 0.5, 1);
      ctx.drawImage(img, x3, y, sw3, 1, lx3 - 0.5, y, w3 + 0.5, 1);
    }

    // pass 1 done, copy to off-screen canvas:
    vctx.clearRect(0, 0, w, h);    // clear off-screen canvas (only if alpha)
    vctx.drawImage(canvas, 0, 0);
    ctx.clearRect(0, 0, w, h);     // clear main (onlyif alpha)

    for (var x = 0; x < w; x++) {
      var ly1 = y1 + o4.current(x * 0.32),
          ly2 = y2 + o5.current(x * 0.3) * 2,
          ly3 = y3 + o6.current(x * 0.4) * 1.5;

      ctx.drawImage(vcanvas, x, y0, 1, sh0, x, 0        , 1, ly1);
      ctx.drawImage(vcanvas, x, y1, 1, sh1, x, ly1 - 0.5, 1, ly2 - ly1 + 0.5);
      ctx.drawImage(vcanvas, x, y2, 1, sh2, x, ly2 - 0.5, 1, ly3 - ly2 + 0.5);
      ctx.drawImage(vcanvas, x, y3, 1, sh3, x, ly3 - 0.5, 1,  y4 - ly3 + 0.5);
    }

    requestAnimationFrame(loop);
  })();
}

//Gsap animation

const runStart = () => {
    console.log("Scene - 2");
    document.getElementById("el1").src = "assets/img/el1-scene2.png";
    document.getElementById("el2").src = "assets/img/el2-scene2.png";
    document.getElementById("el1").style.zIndex = "6";
    let element1 = document.getElementById("el1");
    element1.classList.add("soft-light");

}

const runComplete = () => {
  console.log("finito");
    img.src = "assets/img/bg1-scene2.png";
    document.getElementById("oscillator").style.zIndex = "5";
    document.getElementById("oscillator").classList.add("left-scene-2");
    document.getElementById("el2").classList.remove("screen");
}

let i = 0;
const runUpdate = () => {
}

function scene_n1 () {
  const scene1 = gsap.timeline({
    onComplete: runComplete,
    onUpdate: runUpdate
  });

  scene1
    .set('.wrapper :nth-child(4)', {
      x:100,
      y:150
    })
    .to('.wrapper :nth-child(1)', {
      duration: 5,
      opacity: 1,
      scale: 1.7,
      ease: Power3.easeOut
     },"myLabel")
    .to('.wrapper :nth-child(4)', {
      y: -250,
      x: -107,
      scale:1,
      rotate:0,
      duration: 5,
      ease: Power3.easeOut
     },
      '-=5',
      "myLabel")
    .to('.wrapper :nth-child(5)', {
      y: 20,
      x: 20,
      duration: 5,
      ease: Power3.easeOut
     },"myLabel")
    .to('.wrapper :nth-child(6)', {
      y: -30,
      x: 100,
      duration: 3,
     },"myLabel",'-=8');
return scene1;
}

function entracte_n1 () {
  const entracte1 = gsap.timeline({

  });
  
  entracte1
  .to('.wrapper',{
    opacity:0,
    duration:0.3,
    delay:4
  })  
}

function scene_n2 (){
  const scene2 = gsap.timeline({
    onStart: runStart
  });

  scene2
  .to('.wrapper',{
    opacity:1
  }) 
  .to('.wrapper :nth-child(1)', {
    scale:2.2,
    duration:5
  },'0')
  .to('.wrapper :nth-child(4)', {
      duration: 4,
      zIndex:6,
      scale:1.4,
      y:-700,
      x:-50,
      repeat:1,
      ease: Power1.easeOut,
      yoyo: true,
      yoyoEase: 'none'
     },'0')
  .to('.wrapper :nth-child(3)', {
      zIndex:7
     },'0')
  .fromTo('.wrapper :nth-child(5)', {
      zIndex:8,
      y:400
     },
     {
      y:500,
      rotate:5,
      duration:5,
      // ease: Power3.easeInOut,
     },'0');

return scene2;
}

let master = gsap.timeline ()
.add(scene_n1())
.add(entracte_n1(),"<0.2")
.add(scene_n2()); // overlap slightly

//Particules de feu 

particlesJS("particles-js", {
  particles: {
    number: { value: 400, density: { enable: true, value_area: 3000 } },
    color: { value: "#fc0000" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 3 },
      image: { src: "img/github.svg", width: 100, height: 100 }
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 2,
      random: true,
      anim: { enable: true, speed: 5, size_min: 0, sync: false }
    },
    line_linked: {
      enable: false,
      distance: 500,
      color: "#ffffff",
      opacity: 0.4,
      width: 2
    },
    move: {
      enable: true,
      speed: 7.8914764163227265,
      direction: "top",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: false, mode: "bubble" },
      onclick: { enable: false, mode: "repulse" },
      resize: true
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 0.5 } },
      bubble: { distance: 400, size: 4, duration: 0.3, opacity: 1, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 }
    }
  },
  retina_detect: true
});