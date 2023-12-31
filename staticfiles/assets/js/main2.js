/**
* Template Name: Maxim
* Updated: Sep 18 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/maxim-free-onepage-bootstrap-theme/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

//Original JS
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

//JS for Camera
document.addEventListener('DOMContentLoaded', function () {
    var cameraFlag = 0;
    var cameraButton = document.getElementById('cameraButton');
    var cameraView = document.getElementById("cameraView");
    var aboutimg = document.getElementById("aboutImg");
    cameraButton.addEventListener('click', function () {
        if (cameraFlag == 0) {
            mainInit();
            cameraFlag = 1;
            aboutimg.style.display = "none";
        }
        else if (cameraFlag == 1) {
            takePic();
            cameraView.style.display = "none";
            aboutimg.style.display = "block";
            cameraFlag = 2;
        }
        else if (cameraFlag == 2) {
            cameraFlag = 1;
            cameraView.style.display = "block";
            aboutimg.style.display = "none";
        }
    });
});
function camInit(stream) {
    var cameraView = document.getElementById("cameraView");
    cameraView.srcObject = stream;
    cameraView.play();
    imageCapture = new ImageCapture(stream.getVideoTracks()[0]);
    console.log(imageCapture);
}

function takePic() {
    const img = document.getElementById("aboutImg");
    imageCapture.takePhoto()
        .then(blob => {
            window.URL.revokeObjectURL(img.src);
            let url = window.URL.createObjectURL(blob);
            img.src = url;
            console.log(url);
            // Assign the blob to the input tag
            const imageInput = document.getElementById("imageInput");
            imageInput.files[0] = new File([blob], "image.jpg");
        })
        .catch(error => console.log(error));
}

function camInitFailed(error) {
    console.log("get camera permission failed : ", error)
}
function mainInit() {
    // Check navigator media device available

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        // Navigator mediaDevices not supported
        alert("Media Device not supported")
        return;
    }

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(camInit)
        .catch(camInitFailed);
}

//JS for Pics to site
document.addEventListener('DOMContentLoaded', function () {
    const selectImageButton = document.getElementById('selectImageButton');
    const imageInput = document.getElementById('imageInput');
    const selectedImage = document.getElementById('aboutImg');

    let person_data = ['default', 'default ', 'default',];
    let music_data = ['Ballad', 'Ballad', 'Ballad'];
    const codes = {
        'GN0100': '발라드', 'GN0200': '아이돌', 'GN1500': 'OST', 'GN0300': '힙합',
        'GN0400':'RNB,소울', 'GN0700':'트로트', 'GN1600':'클래식', 'GN0600':'락', 'GN0500':'인디', 'GN1700':'재즈', 'GN1100':'일렉트로닉'}

    selectImageButton.addEventListener('click', function () {
        imageInput.click(); // Trigger the file input element
    });

    //JS for Pics to site
    imageInput.addEventListener('change', function () {
        const file = imageInput.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            selectedImage.src = url;
        }
    });

    //JS for uploading pics to server
    const uploadButton = document.getElementById('uploadButton');
    uploadButton.addEventListener('click', function () {
        const file = imageInput.files[0];
        if (file) {
            // Create a FormData object and append the file to it
            const formData = new FormData();
            formData.append('image', file);

            // Send the FormData to the server using fetch
            // 서버는 나중에 추가할 예정
            //const endpoint = 'http://3.39.71.38/ai_endpoint/'
            const endpoint = '/ai_endpoint/'
            fetch(endpoint, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    // Handle the response from the server
                    data.age = decodeURIComponent(JSON.parse('"' + data.age + '"'));
                    data.gender = decodeURIComponent(JSON.parse('"' + data.gender + '"'));
                    data.emotion = decodeURIComponent(JSON.parse('"' + data.emotion + '"'));
                    console.log(data)
                    var s = document.getElementById('age_p');
                    s.innerText = s.textContent = person_data[0] = data.age;
                    var l = document.getElementById('gender_p');
                    l.innerText = l.textContent = person_data[1] = data.gender;
                    var q = document.getElementById('emotion_p');
                    q.innerText = q.textContent = person_data[2]= data.emotion;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    });

    const datafield = document.getElementById('age_p')
    var config = { attributes: true, childList: true, subtree: true };

    var observer = new MutationObserver((list) => {
        //const endpoint = 'http://3.39.71.38/music_endpoint/'
        const endpoint = '/music_endpoint/'
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify({'data' : person_data}), // Convert the array to a JSON string
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the server
                for (let i = 0; i < 3; i++) {
                    music_data[i] = codes[data.data[i]];
                }
                console.log(music_data);
                console.log(codes);
                var s = document.getElementById('app_li');
                s.innerText = music_data[0];
                var l = document.getElementById('card_li');
                l.innerText = music_data[1];
                var q = document.getElementById('web_li');
                q.innerText = music_data[2];
                var j = 0;
                for (let container of ['app', 'card', 'web']) {
                    for (let i = 1; i < 4; i++) {
                        var appdiv = document.getElementById(container + i);
                        var texth4 = appdiv.querySelector(".portfolio-info h4");
                        texth4.textContent = data.songs[j][0][i - 1];
                        var textp = appdiv.querySelector(".portfolio-info p");
                        textp.textContent = data.songs[j][1][i - 1];
                        var imgs = appdiv.querySelector(".portfolio-wrap img")
                        imgs.src = data.songs[j][2][i - 1]
                    }
                    j++;
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
    observer.observe(datafield, config);
    
});

