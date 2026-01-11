
        // Initialize Splitting.js for text animation
        Splitting();

        // Three.js 3D Background Animation
        var renderer, scene, camera, circle, skelet, particle;
        
        function initThreeJS() {
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.autoClear = false;
            renderer.setClearColor(0x000000, 0.0);
            document.getElementById('canvas').appendChild(renderer.domElement);
            
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
            camera.position.z = 400;
            scene.add(camera);
            
            circle = new THREE.Object3D();
            skelet = new THREE.Object3D();
            particle = new THREE.Object3D();
            scene.add(circle);
            scene.add(skelet);
            scene.add(particle);
            
            var geometry = new THREE.TetrahedronGeometry(2, 0);
            var geom = new THREE.IcosahedronGeometry(7, 1);
            var geom2 = new THREE.IcosahedronGeometry(15, 1);
            
            var material = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                flatShading: true
            });
            
            for (var i = 0; i < 1000; i++) {
                var mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
                mesh.position.multiplyScalar(90 + (Math.random() * 700));
                mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
                particle.add(mesh);
            }
            
            var mat = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                flatShading: true
            });
            
            var mat2 = new THREE.MeshPhongMaterial({
                color: 0xffffff,
                wireframe: true,
                side: THREE.DoubleSide
            });
            
            var planet = new THREE.Mesh(geom, mat);
            planet.scale.x = planet.scale.y = planet.scale.z = 16;
            circle.add(planet);
            
            var planet2 = new THREE.Mesh(geom2, mat2);
            planet2.scale.x = planet2.scale.y = planet2.scale.z = 10;
            skelet.add(planet2);
            
            var ambientLight = new THREE.AmbientLight(0x999999);
            scene.add(ambientLight);
            
            var lights = [];
            lights[0] = new THREE.DirectionalLight(0xffffff, 1);
            lights[0].position.set(1, 0, 0);
            lights[1] = new THREE.DirectionalLight(0x11E8BB, 1);
            lights[1].position.set(0.75, 1, 0.5);
            lights[2] = new THREE.DirectionalLight(0x8200C9, 1);
            lights[2].position.set(-0.75, -1, 0.5);
            scene.add(lights[0]);
            scene.add(lights[1]);
            scene.add(lights[2]);
            
            window.addEventListener('resize', onThreeResize, false);
        }
        
        function onThreeResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        
        function animateThree() {
            requestAnimationFrame(animateThree);
            particle.rotation.x += 0.0000;
            particle.rotation.y -= 0.0040;
            circle.rotation.x -= 0.0020;
            circle.rotation.y -= 0.0030;
            skelet.rotation.x -= 0.0010;
            skelet.rotation.y += 0.0020;
            renderer.clear();
            renderer.render(scene, camera);
        }
        
        // Initialize Three.js
        initThreeJS();
        animateThree();

        // Animated Navigation
        const navLinks = document.querySelectorAll("nav li");
        const allATags = document.querySelectorAll("nav li a");
        const allIconTags = document.querySelectorAll("nav li a i");
        const light = document.querySelector("nav .spotLight");
        const header = document.getElementById('header');

        navLinks.forEach((link, index) => {
            link.addEventListener("click", (e) => {
                const aTag = link.lastElementChild;
                
                // Remove active class from all links
                allATags.forEach((a) => a.classList.remove("active"));
                allIconTags.forEach((i) => (i.style.transform = "scale(1)"));
                
                // Add active class to clicked link
                aTag.classList.add("active");

                // Move spotlight
                const theIndex = link.dataset.val;
                const spotlightPosition = 15 + theIndex * 73;
                light.style.left = `${spotlightPosition}px`;
                
                // Scale icon
                const icon = link.childNodes[1].childNodes[0];
                icon.style.transform = "scale(1.2)";
            });
        });

        // Scroll spy - update active nav based on scroll position
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const scrollPosition = window.scrollY + 100;

            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    allATags.forEach((a) => a.classList.remove("active"));
                    allIconTags.forEach((i) => (i.style.transform = "scale(1)"));
                    
                    if (navLinks[index]) {
                        const activeLink = navLinks[index].querySelector('a');
                        const activeIcon = navLinks[index].querySelector('i');
                        activeLink.classList.add("active");
                        activeIcon.style.transform = "scale(1.2)";
                        
                        const spotlightPosition = 15 + index * 73;
                        light.style.left = `${spotlightPosition}px`;
                    }
                }
            });

            // Header background on scroll
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Progress bar
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            document.querySelector('.progress-bar').style.width = scrolled + '%';
        });

        // Dark mode toggle
        const darkModeToggle = document.querySelector('.dark-mode-toggle');
        const body = document.body;

        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const icon = darkModeToggle.querySelector('i');
            
            if (body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('darkMode', 'disabled');
            }
        });

        // Check for saved dark mode preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            body.classList.add('dark-mode');
            darkModeToggle.querySelector('i').classList.remove('fa-moon');
            darkModeToggle.querySelector('i').classList.add('fa-sun');
        }

        // Contact form submission
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            e.target.reset();
        });

        // CV Download Button Functionality
        const cvButton = document.getElementById('button');
        cvButton.addEventListener('change', function() {
            if (this.checked) {
                // Wait for the full animation to complete (5 seconds)
                setTimeout(() => {
                    // Create a temporary link to trigger download
                    const link = document.createElement('a');
                    link.href = 'files/sayebs_cv.pdf';
                    link.download = 'MD_SAYEB_CV.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    // Reset button after download
                    setTimeout(() => {
                        this.checked = false;
                    }, 500);
                }, 5000); // 5 seconds - after all animations complete
            }
        });
