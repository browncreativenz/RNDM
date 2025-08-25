 const IMAGES = [                                      // Add paths to all the images in the assets folder
    'assets/img1.jpg',
    'assets/img2.jpg',
    'assets/img3.jpg',
    'assets/img4.png',
    'assets/img5.png', 
    'assets/img6.png', 
    'assets/img7.png', 
    'assets/img8.jpg',
    'assets/img9.jpg',
    'assets/img10.jpg',
    'assets/img11.jpg',
    'assets/img12.jpg',
    'assets/img13.jpg',
    'assets/img14.jpg',
    'assets/img15.jpg',
    'assets/img16.jpg',
    'assets/img17.jpg', 
    'assets/img18.jpg',
    'assets/img19.png',
    'assets/img20.png',
    'assets/img21.jpg',
    'assets/img22.jpg',
    'assets/img23.jpg',
    'assets/img24.jpg',
    'assets/img25.jpg', 
    'assets/img26.jpg', 
    'assets/img27.jpg', 
    'assets/img28.jpg',
    'assets/img29.png',
    'assets/img30.png',
    'assets/img31.jpg',
    'assets/img32.jpg',
    'assets/img33.jpg',
    'assets/img34.png',
    'assets/img35.png',
    'assets/img36.jpg',
    'assets/img37.jpg',
    'assets/img38.jpg',
    'assets/img39.jpg',
    'assets/img40.png'  
  ];

  const PALETTES = {                                                // Customise color schemes by "mood"
    acid: ['#ff00ff','#00ffff'],
    vivid: ['#be4ff1','#00ff84'],
    future: ['#ff0033','#00bfff'],
    mellow: ['#644fda','#e9f3a7'],
    fire: ['#ff3f1a','#97d6df'],
    greenaf: ['#014131','#c8ffc8','#ff3c42'],  
    blurple: ['#ffb901','#583dfa','#bfc3ff'],
    fluro: ['#3cff00'],
    earthensky: ['#004eff', '#c2b49f'],
    olive: ['#92c28d', '#816d98'],
    greenout: ['#437057', '#97B067'],
    dreampunk: ['#7700a6', '#fe00fe' ],  
    cyberpunk: ['#FCEE0C', '#03D8F3']  
  };

  const MASKS = [                                                   // Add paths to all the svg masks in the masks folder
    'masks/mask1.svg',
    'masks/mask2.svg',
    'masks/mask3.svg',
    'masks/mask4.svg',
    'masks/mask5.svg',
    'masks/mask6.svg',
    'masks/mask7.svg',
    'masks/mask8.svg',
    'masks/mask9.svg',
    'masks/mask10.svg',
    'masks/mask11.svg',
    'masks/mask12.svg',
    'masks/mask13.svg',
    'masks/mask14.svg',
    'masks/mask15.svg'  
  ];

  const SHAPE_BLEND_MODES = ['screen','multiply'];                  // Blend modes for shape objects
  const IMAGE_BLEND_MODES = [                                       // Blend mode for images
    'normal','multiply','screen','overlay','darken',
    'lighten','color-dodge','color-burn','hard-light',
    'soft-light','difference','exclusion','saturation'
  ];

  const NUM_SHAPES = 6;                                             // Number of shapes rendered to screen
  const NUM_IMAGES = 6;                                             // Number of images rendered to screen

  const rand=(min,max)=>Math.random()*(max-min)+min;
  const pick=arr=>arr[Math.floor(Math.random()*arr.length)];

  function createShape(colours) {
    const el = document.createElement('div');
    el.classList.add('element');
    const w=rand(2,100),h=rand(2,100);
    el.style.width=w+'vw';
    el.style.height=h+'vh';
    el.style.left=rand(0,100-w)+'vw';
    el.style.top=rand(0,100-h)+'vh';
    el.style.background=pick(colours);
    el.style.mixBlendMode=pick(SHAPE_BLEND_MODES);
    return el;
  }

function createMaskedImage() {
  const el = document.createElement('div');
  el.classList.add('element');
  const src = pick(IMAGES), mask = pick(MASKS);
  const w = rand(30,100), h = rand(30,100);
  el.style.width = w+'vw';
  el.style.height = h+'vh';
  el.style.left = rand(0,100-w)+'vw';
  el.style.top = rand(0,100-h)+'vh';
  el.style.backgroundImage = `url(${src})`;
  el.style.backgroundSize = 'cover';

                                                                    // Randomize both vertical and horizontal alignment
  const vertical = pick(['top','center','bottom']);
  const horizontal = pick(['left','center','right']);
  el.style.backgroundPosition = `${vertical} ${horizontal}`;

  el.style.webkitMaskImage = `url(${mask})`;
  el.style.maskImage = `url(${mask})`;
  el.style.webkitMaskSize = 'contain';
  el.style.maskSize = 'contain';
  el.style.webkitMaskRepeat = 'no-repeat';
  el.style.maskRepeat = 'no-repeat';
  el.style.mixBlendMode = pick(IMAGE_BLEND_MODES);
  return el;
}

  function generate() {
    const art=document.getElementById('art-container');
    art.innerHTML='';
    const colours = PALETTES[pick(Object.keys(PALETTES))];
    for(let i=0;i<NUM_SHAPES;i++){ art.appendChild(createShape(colours)); }
    for(let i=0;i<NUM_IMAGES;i++){ art.appendChild(createMaskedImage()); }
  }

                                                                    // Fade using overlay instead of fading artwork itself
  function startLoop(){
    const overlay=document.getElementById('fade-overlay');
    generate();                                                     // draw a new piece
    overlay.style.opacity=0;                                        // fade IN

    setTimeout(()=>{
      overlay.style.opacity=1;                                      // fade OUT
      setTimeout(()=>{
        generate();                                                 // regenerate in background
        startLoop();                                                // loop again
      },2000);
    },20000);
  }

  startLoop();                                                      // Never let the suits get you dowm

// Request immersive fullscreen after first user interaction
function requestFullscreen() {
    const el = document.documentElement;
    if (el.requestFullscreen) {
        el.requestFullscreen();
    } else if (el.webkitRequestFullscreen) { // Safari
        el.webkitRequestFullscreen();
    } else if (el.msRequestFullscreen) { // IE/Edge
        el.msRequestFullscreen();
    }
}

document.addEventListener('click', () => {
    requestFullscreen();
}, { once: true });