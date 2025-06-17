document.addEventListener("DOMContentLoaded", () => {
    const dialogBox = document.querySelector(".puppy-dialog");
    const nose = document.querySelector(".nose-hitbox");
    const music1 = document.getElementById("birthday-music-1");
    const music2 = document.getElementById("birthday-music-2");
    const step2 = document.getElementById("step2-scene");
    const step3 = document.getElementById("step3-scene");
    const step3music = document.getElementById("step3-music");

    // 🎵 Start Step 3 music early (low volume)
    step3music.muted = false;
    step3music.volume = 0.5;
    step3music.play().catch(e => console.warn("Step 3 music autoplay blocked", e));
    // 🐶 STEP 1 Dialog Sequence
    setTimeout(() => {
        dialogBox.textContent = "🎈 Hi, Prachi ! 🎉";
        dialogBox.style.opacity = 1;
    }, 3000);

    setTimeout(() => {
        dialogBox.textContent = "👉 Please! Press the glowing red dot 🎀";
    }, 6000);

    // 👉 Nose click triggers Step 2
    nose.addEventListener("click", () => {
        dialogBox.textContent = "🥰 Thank you! 💖";

        music1.volume = 0.25;// Reduce Step 1 music volume
        music1.play().then(() => {
            setTimeout(() => {
                if (!document.getElementById("wait-message")) {
                    const waitMsg = document.createElement("p");
                    waitMsg.textContent = "Wait for it... there’s more magic coming 🎁✨";
                    waitMsg.id = "wait-message";
                    Object.assign(waitMsg.style, {
                        position: "fixed",
                        bottom: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: "1.2rem",
                        color: "#82004d",
                        fontWeight: "bold",
                        backgroundColor: "rgba(255,255,255,0.8)",
                        padding: "10px 20px",
                        borderRadius: "10px",
                        zIndex: 999
                    });
                    document.body.appendChild(waitMsg);
                }
            }, 7000);
        }).catch(e => console.warn("Autoplay blocked", e));

        // 🪄 Step 2 Music
        music1.addEventListener("ended", () => {
            music2.volume = 0.25;// Set volume lower here (range is 0.0 to 1.0)
            music2.play();
        });

        music2.addEventListener("ended", () => {
            const waitMsg = document.getElementById("wait-message");
            if (waitMsg) waitMsg.remove();

            clearInterval(animationInterval);
            step2.style.display = "none";
            step3.style.display = "flex";
            step3.classList.add("fade-in-step3");

            launchStep3Decorations();
            const step3music = document.getElementById("step3-music");
            if (step3music) {
                step3music.play().catch(e => console.warn("Step 3 music autoplay failed", e));
            }
            //step3music.volume = 0.3;
            // let fadeIn = setInterval(() => {
            //   if (step3music.volume < 0.6) {
            //      step3music.volume = Math.min(step3music.volume + 0.02, 0.3);
            //    } else {
            //      clearInterval(fadeIn);
            //    }
            // }, 100);

            triggerStep3Animations();
        });

        // 🎉 Show Step 2
        setTimeout(() => {
            startFloatingHearts();
            createSparkles();

            // 🔇 Fade out Step 3 music smoothly before Step 2
            let fadeOut = setInterval(() => {
                if (step3music.volume > 0.05) {
                    step3music.volume = Math.max(step3music.volume - 0.02, 0.05);
                } else {
                    clearInterval(fadeOut);
                }
            }, 100);
            document.querySelector(".intro-screen").style.display = "none";
            step2.style.display = "flex";

            const centerPopper = document.getElementById("center-popper");
            const banner = document.querySelector(".birthday-banner");
            const cornerPoppers = document.querySelectorAll(".corner");

            centerPopper.style.display = "block";
            banner.style.display = "none";
            cornerPoppers.forEach(p => p.style.display = "none");

            setTimeout(() => {
                centerPopper.style.display = "none";
                banner.style.display = "block";
                cornerPoppers.forEach(p => p.style.display = "block");

                startStep2Loop();
            }, 4000);
        }, 1500);
    });

    // 🎀 Repeating Poppers
    let animationInterval;
    function startStep2Loop() {
        const banner = document.querySelector(".birthday-banner");
        const cornerPoppers = document.querySelectorAll(".corner");

        banner.classList.add("pop-animation");
        cornerPoppers.forEach(p => p.classList.add("pop-animation"));

        animationInterval = setInterval(() => {
            banner.classList.remove("pop-animation");
            cornerPoppers.forEach(p => p.classList.remove("pop-animation"));
            void banner.offsetWidth;
            cornerPoppers.forEach(p => void p.offsetWidth);
            banner.classList.add("pop-animation");
            cornerPoppers.forEach(p => p.classList.add("pop-animation"));
        }, 6000);
    }

    function startFloatingHearts() {
        const container = document.querySelector(".hearts-container");
        setInterval(() => {
            const heart = document.createElement("div");
            heart.classList.add("heart");
            heart.style.left = `${Math.random() * 100}%`;
            container.appendChild(heart);
            setTimeout(() => heart.remove(), 5000);
        }, 200);
    }

    function createSparkles(count = 60) {
        const container = document.querySelector(".sparkle-container");
        if (!container) return;

        setInterval(() => {
            const sparkle = document.createElement("div");
            sparkle.className = "sparkle";
            sparkle.style.left = Math.random() * 100 + "vw";
            sparkle.style.top = Math.random() * 100 + "vh";
            sparkle.style.animationDuration = (6 + Math.random() * 3) + "s";
            sparkle.style.opacity = 0.7 + Math.random() * 0.3;
            sparkle.style.width = sparkle.style.height = `${6 + Math.random() * 6}px`;
            container.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 10000);
        }, 150);
    }

    function triggerStep3Animations() {
        startPhotoSlideshow();

        const letterBox = document.querySelector(".letter-box");
        const originalHTML = `
            <h2 class="letter-heading">Happy Birthday, Mithi.🌸</h2>
            <div class="typewriter-text" id="letterText"></div>
            <div class="signature">Yours once and always<br>Shubham 💐</div>
        `;
        letterBox.innerHTML = originalHTML;

        const lines = [
            "Dear Prachi,\n",
            "",
            "On this special day, I just want you to know how much you mean to me. 💖\n",
            "I just want to say... thank you.",
            "Thank you for walking into my life and for letting me share a part of yours.\n",
            "Life is short - but in the time we were together, you made it feel beautiful in a way I can't put into words.\n",
            "One thing we will never change that I've always loved you. And I always will without any filters, without any conditions... just as you are.\n",
            "I miss u , miss your english correction.Sometimes I stop mid-sentence and think, Mithi would've rolled her eyes at this one.(Seriously though, I think of you very time I type 'less smaller' now.)\n",
            "Your smile brings warmth like sunlight, and your kindness is unmatched. 🌸\n",
            "From silly jokes to deep conversations, you make every moment brighter. ☀️\n",
            "I hope this birthday brings you as much happiness as you've brought to me.\n",
            "Thank you for every smile, every memory, every soft corner of your heart you let me see\n",
            "Always praying for your peace, your healing, your wins- even the small ones. And hoping, someday, when you look back, you remember not just the mess but the magic we created, in our broken ways.\n",
            "May life gift you everything you ever dreamed of - peace, love, books, travel, ....\n",
            "Stay magical.Stay Mithi. And please keep smiling cuz world is better when you smile - and so is my world.\n",
            "Keep blooming like your favorite flowers... 🌼🌷\n",

        ];

        const textEl = document.getElementById("letterText");
        let currentLine = 0;
        let currentChar = 0;

        function typeLine() {
            if (currentLine < lines.length) {
                const line = lines[currentLine];
                if (currentChar <= line.length) {
                    textEl.innerHTML = textEl.innerHTML.replace(/<br>$/, "") + line.charAt(currentChar);
                    currentChar++;
                } else {
                    textEl.innerHTML += "<br>";
                    currentLine++;
                    currentChar = 0;
                }
            } else {
                clearInterval(interval);
            }
        }

        textEl.innerHTML = "";
        const interval = setInterval(typeLine, 40);
    }


    // Animate photos
    document.querySelectorAll(".photo-collage img").forEach(img => {
        img.classList.add("photo-frame");
    });

    // Animate tuberose
    const flower = document.querySelector(".flower-divider");
    flower.classList.add("float-glow");
}
);
// ✨ STEP 3 ANIMATIONS
function launchStep3Decorations() {
    startPetalFall();
    startStars();
    startBubbleHearts();
}

// 🌸 Petal Falling
function startPetalFall() {
    const container = document.createElement("div");
    container.className = "petal-container";
    document.getElementById("step3-scene").appendChild(container);

    setInterval(() => {
        const petal = document.createElement("div");
        petal.className = "petal";
        petal.style.left = Math.random() * 100 + "vw";
        container.appendChild(petal);
        setTimeout(() => petal.remove(), 10000);
    }, 500);
}

// ✨ Star Twinkles
function startStars() {
    const container = document.createElement("div");
    container.className = "star-container";
    document.getElementById("step3-scene").appendChild(container);

    for (let i = 0; i < 50; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = Math.random() * 100 + "vw";
        star.style.top = Math.random() * 100 + "vh";
        container.appendChild(star);
    }
}

// 💖 Bubble Hearts (gentle burst)
function startBubbleHearts() {
    const scene = document.getElementById("step3-scene");
    setInterval(() => {
        const heart = document.createElement("div");
        heart.className = "bubble-heart";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.bottom = "0";
        scene.appendChild(heart);
        setTimeout(() => heart.remove(), 6000);
    }, 700);
}
// 🎞️ Step 3 Slideshow Logic
function startPhotoSlideshow() {
    const images = document.querySelectorAll(".slideshow-image");
    let current = 0;

    setInterval(() => {
        images[current].classList.remove("active");
        current = (current + 1) % images.length;
        images[current].classList.add("active");
    }, 8000); // 4 seconds per slide
}
