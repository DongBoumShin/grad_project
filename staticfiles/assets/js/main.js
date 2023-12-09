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
    const uploadButton = document.getElementById('uploadButton');
    let tracker = 0;
    function do_this() {
        takePic();
        console.log("has run for ", tracker);
        tracker += 1;
        uploadButton.click();
    };
    let intervalID;
    cameraButton.addEventListener('click', function () {
        if (cameraFlag == 0) {
            mainInit();
            cameraFlag = 1;
            aboutimg.style.display = "none";
            intervalID = setInterval(do_this, 100);
        }
        else if (cameraFlag == 1) {
            takePic();
            //cameraView.style.display = "none";
            //aboutimg.style.display = "block";
            cameraFlag = 2;
            clearInterval(intervalID);
        }
        else if (cameraFlag == 2) {
            cameraFlag = 1;
            //cameraView.style.display = "block";
            //aboutimg.style.display = "none";
            intervalID = setInterval(do_this, 100);
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

            // Create a new File object
            const file = new File([blob], "image.jpg");

            // Create a new FileList object with the updated file
            const fileList = new DataTransfer();
            fileList.items.add(file);

            // Assign the new FileList to the input tag
            const imageInput = document.getElementById("imageInput");
            imageInput.files = fileList.files;
        })
        .catch(error => console.log(error));
}

function camInitFailed(error) {
    console.log("get camera permission failed : ", error);
    alert("get camera permission failed : ");
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
        'GN0400': 'RNB,소울', 'GN0700': '트로트', 'GN1600': '클래식', 'GN0600': '락', 'GN0500': '인디', 'GN1700': '재즈', 'GN1100': '일렉트로닉'
    }
    const age_comments = {
        'ybs': '20대 정도로 보이시는군요.', 'obs': '40대 이상의 장년으로 보이십니다.',
        'tens': '젊은 십대!', 'unknown': '얼굴을 식별할 수 없었거나, 나이를 예측하지 못했습니다.'
    }
    const gender_comments = {
        'women': '여성으로 보이시네요.', 'men': '남성으로 보이십니다.', 'unknown': '얼굴을 식별할 수 없었거나, 성별을 예측하지 못했습니다.'
    }
    const emo_comments = {
        'unknown': '얼굴을 식별할 수 없었거나, 감정을 예측하지 못했습니다.',
        'angry': '조금 화가 나신 것 같습니다.',
        'disgusting': '이런, 많이 역겨우신 것 같네요!',
        'fear': '무서워 할 것 없습니다!',
        'happy': '당신이 기쁘다니 저희도 기쁘네요!',
        'neutral': '엄격, 근엄, 진지하게. 아니라면 그냥 피곤하신 건가요?',
        'sad': '슬퍼하지 말아요',
        'surprise': '서프라이즈!'
    }

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
        console.log(file);
        if (file) {
            // Create a FormData object and append the file to it
            const formData = new FormData();
            formData.append('image', file);
            console.log(formData);
            // Send the FormData to the server using fetch
            //const endpoint = 'http://3.39.71.38/ai_endpoint/'
            const endpoint = '/ai_endpoint/'
            fetch(endpoint, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    // Handle the response from the server
                    console.log(data)
                    
                    var l = document.getElementById('gender_p');
                    person_data[1] = data.gender
                    l.innerText = l.textContent = gender_comments[data.gender];
                    var q = document.getElementById('emotion_p');
                    person_data[2] = data.emotion
                    q.innerText = q.textContent = emo_comments[data.emotion];
                    var s = document.getElementById('age_p');
                    person_data[0] = data.age
                    s.innerText = s.textContent = age_comments[data.age];
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
                        if (imgs && imgs.style) {
                            imgs.style.width = imgs.style.height = '400px';
                        }
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

