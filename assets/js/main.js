function setColor(color) {
  document.documentElement.style.setProperty("--cc-primary_color", color);
}
function color1() {
  document.documentElement.style.setProperty("--cc-primary_color", "#138A23");
}
function color2() {
  document.documentElement.style.setProperty("--cc-primary_color", "#e4af12");
}
function color3() {
  document.documentElement.style.setProperty("--cc-primary_color", "#c026d3");
}
function color4() {
  document.documentElement.style.setProperty("--cc-primary_color", "#DC143C");
}
function color5() {
  document.documentElement.style.setProperty("--cc-primary_color", "#059669");
}
$(function () {
  $(document).ready(function () {
    $(document).on("click", ".color-boxed a", function () {
      $(".color-boxed a").removeClass("clr-active");
      $(this).addClass("clr-active");
    });
    $(document).on("click", ".global-color .setting-toggle", function () {
      $(".global-color").addClass("active");
    });
    $(document).on(
      "click",
      ".global-color .inner .overlay, .global-color .inner .global-color-option .close-settings-btn",
      function () {
        $(".global-color").removeClass("active");
      }
    );
  });
  $(document).ready(function () {
    var $overlay = $(".overlay"),
      $overlayTrigger = $(".setting-toggle span"),
      $overlayClose = $(".close-settings-btn"),
      openClass = "is-open";
    $overlayTrigger.on("click", function () {
      var num = ("0" + ($(this).index() + 1)).slice(-2);
      $(".overlay" + num).addClass(openClass);
      $overlayClose.addClass(openClass);
    });
    $overlayClose.on("click", function () {
      $overlayClose.removeClass(openClass);
      $overlay.removeClass(openClass);
    });
  });
});

$(function () {
  $(window)
    .scroll(function () {
      var windscroll = $(window).scrollTop();
      if (windscroll >= 0) {
        $(".page-section").each(function (i) {
          if ($(this).position().top <= windscroll - -1) {
            $(".scroll-nav .scroll-to.active").removeClass("active");
            $(".scroll-nav .scroll-to").eq(i).addClass("active");
            $(".scroll-nav-responsive a.active").removeClass("active");
            $(".scroll-nav-responsive a").eq(i).addClass("active");
          }
        });
      } else {
        $(".scroll-nav .scroll-to.active").removeClass("active");
        $(".scroll-nav .scroll-to:first").addClass("active");
        $(".scroll-nav-responsive a.active").removeClass("active");
        $(".scroll-nav-responsive a:first").addClass("active");
      }
      if (windscroll >= 0) {
        $(".scroll-to-page").each(function (i) {
          var wscrolldecress = windscroll + 1;
          if ($(this).position().top <= wscrolldecress - 0) {
            $(".scroll-nav .scroll-to.active").removeClass("active");
            $(".scroll-nav .scroll-to").eq(i).addClass("active");
            $(".scroll-nav-responsive a.active").removeClass("active");
            $(".scroll-nav-responsive a").eq(i).addClass("active");
          }
        });
      } else {
        $(".scroll-nav .scroll-to.active").removeClass("active");
        $(".scroll-nav .scroll-to:first").addClass("active");
        $(".scroll-nav-responsive a.active").removeClass("active");
        $(".scroll-nav-responsive a:first").addClass("active");
      }
    })
    .scroll();
  function scrollAnimations() {
    var defaults = {
      duration: 1.2,
      ease: "power4.out",
      animation: "fade_from_bottom",
      once: !1,
    };
    gsap.utils.toArray(".scroll-animation").forEach(function (box) {
      var gsap_obj = {};
      var settings = {
        duration: box.dataset.animationDuration || defaults.duration,
      };
      var animations = {
        fade_from_bottom: { y: 180, opacity: 0 },
        fade_from_top: { y: -180, opacity: 0 },
        fade_from_left: { x: -180, opacity: 0 },
        fade_from_right: { x: 180, opacity: 0 },
        fade_in: { opacity: 0 },
        rotate_up: { y: 180, rotation: 10, opacity: 0 },
      };
      var scroll_trigger = {
        scrollTrigger: {
          trigger: box,
          once: defaults.once,
          start: "top bottom+=20%",
          toggleActions: "play none none reverse",
          markers: !1,
        },
      };
      $.extend(gsap_obj, settings);
      $.extend(
        gsap_obj,
        animations[box.dataset.animation || defaults.animation]
      );
      $.extend(gsap_obj, scroll_trigger);
      gsap.from(box, gsap_obj);
    });
  }
  scrollAnimations();
  function buttonMoveAnimation() {
    $(".btn-hover").on("mouseenter", handleMouseMove);
    $(".btn-hover").on("mouseout", handleMouseOut);
    const all_btns = gsap.utils.toArray(".btn_wrapper");
    const all_btn_cirlce = gsap.utils.toArray(".btn-item");
    all_btns.forEach((btn, i) => {
      $(btn).mousemove(function (e) {
        parallaxIt.call(btn, e, all_btn_cirlce[i], 80);
      });
      $(btn).mouseleave(function (e) {
        gsap.to(all_btn_cirlce[i], 0.5, { x: 0, y: 0, ease: Power2.easeOut });
      });
    });
  }
  $(document).ready(function () {
    buttonMoveAnimation();
  });
});
function handleMouseMove(e) {
  var x = e.pageX - $(this).offset().left;
  var y = e.pageY - $(this).offset().top;
  $(this).find("span").css({ top: y, left: x });
}
function handleMouseOut(e) {
  var x = e.pageX - $(this).offset().left;
  var y = e.pageY - $(this).offset().top;
  $(this).find("span").css({ top: y, left: x });
}
function parallaxIt(e, target, movement) {
  var $this = $(this);
  var relX = e.pageX - $this.offset().left;
  var relY = e.pageY - $this.offset().top;
  gsap.to(target, 0.5, {
    x: ((relX - $this.width() / 2) / $this.width()) * movement,
    y: ((relY - $this.height() / 2) / $this.height()) * movement,
    ease: Power2.easeOut,
  });
}
function hoverEffect(element) {
  element.style.transform = "translateY(-4px)";
}
function hoverOutEffect(element) {
  element.style.transform = "translateY(0)";
}
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".cc-burger");
  const menuItems = document.querySelectorAll(".cc-menu-item p");
  let isOpen = !1;
  gsap.set(".cc-menu-item p", { y: 225 });
  const timeline = gsap.timeline({ paused: !0 });
  timeline.to(".cc-burger-overlay", {
    duration: 1.5,
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    ease: "power4.inOut",
  });
  timeline.to(
    ".cc-menu-item p",
    { duration: 1.5, y: 0, stagger: 0.2, ease: "power4.out" },
    "-=1"
  );
  timeline.to(
    "#active::after",
    { width: "100%", duration: 1, ease: "power4.out", delay: 0.5 },
    "<"
  );
  timeline.to(
    ".cc-sub-nav",
    { bottom: "10%", opacity: 1, duration: 0.5, delay: 0.5 },
    "<"
  );
  function toggleMenu() {
    if (isOpen) {
      timeline.reverse();
      toggleButton.classList.remove("active");
    } else {
      timeline.play();
      toggleButton.classList.add("active");
    }
    isOpen = !isOpen;
  }
  toggleButton.addEventListener("click", toggleMenu);
  menuItems.forEach(function (item) {
    item.addEventListener("click", function () {
      if (isOpen) {
        toggleMenu();
      }
    });
  });
});
var $mouse = { x: 0, y: 0 };
var $pos = { x: 0, y: 0 };
var $ratio = 0.15;
var cursor = document.querySelector(".cc-magic-cursor"),
  cursorScale = document.querySelectorAll(".cc-cursor-scale"),
  mouseX = 0,
  mouseY = 0;
gsap.to({}, 0.06, {
  repeat: -1,
  onRepeat: function () {
    gsap.set(cursor, { css: { left: mouseX, top: mouseY } });
  },
});
window.addEventListener("mousemove", function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
window.addEventListener("mouseout", function (e) {
  if (
    e.clientX < 0 ||
    e.clientY < 0 ||
    e.clientX > window.innerWidth ||
    e.clientY > window.innerHeight
  ) {
    cursor.style.display = "none";
  }
});
window.addEventListener("mouseover", function (e) {
  cursor.style.display = "block";
});
cursorScale.forEach((link) => {
  link.addEventListener("mouseleave", () => {
    cursor.classList.remove("grow");
    cursor.classList.remove("grow-small");
  });
  link.addEventListener("mousemove", () => {
    cursor.classList.add("grow");
    if (link.classList.contains("small")) {
      cursor.classList.remove("grow");
      cursor.classList.add("grow-small");
    }
  });
});
$(document).ready(function () {
  efolio_cc_my_load();
});
function efolio_cc_preloader() {
  "use strict";
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
    navigator.userAgent
  );
  var preloader = $("#preloader");
  if (!isMobile) {
    setTimeout(function () {
      preloader.addClass("preloaded");
    }, 800);
    setTimeout(function () {
      preloader.remove();
    }, 2000);
  } else {
    preloader.remove();
  }
}
function efolio_cc_my_load() {
  "use strict";
  var speed = 500;
  setTimeout(function () {
    efolio_cc_preloader();
  }, speed);
}
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
const smoother = ScrollSmoother.create({
  content: "#cc-smooth-content",
  smooth: 3,
  normalizeScroll: !0,
  ignoreMobileResize: !0,
  prevantDefault: !0,
  effects: !0,
  ease: "power4.out",
  smoothTouch: 0.1,
});
smoother.effects("img", { speed: "1" });
const navItems = document.querySelectorAll(".scroll-to");
const sections = document.querySelectorAll("section");
const targeted = navItems.forEach((navItem, index) => {
  navItem.addEventListener("click", () => {
    const targetSelector = navItem.getAttribute("data-target");
    const index = [...sections].findIndex(
      (section) => section.id === targetSelector.substring(1)
    );
    smoother.scrollTo(sections[index], !0, "start");
  });
});
const menuItems1 = document.querySelectorAll(".menu li");
menuItems1.forEach((item) => {
  item.addEventListener("click", () => {
    menuItems1.forEach((menuItem) => menuItem.classList.remove("active"));
    item.classList.add("active");
  });
});
const menuItems = document.querySelectorAll(".menu .scroll-to");
window.addEventListener("scroll", navHighlighter);
function navHighlighter() {
  let scrollY = window.pageYOffset;
  menuItems.forEach((item) => {
    const sectionId = item.getAttribute("data-target");
    const targetSection = document.querySelector(sectionId);
    if (targetSection) {
      const sectionTop = targetSection.offsetTop - 50;
      const sectionHeight = targetSection.offsetHeight;
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        item.parentNode.classList.add("active");
      } else {
        item.parentNode.classList.remove("active");
      }
    }
  });
}
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");
const textArray = ["Web Developer.", "Web Designer.", "UI-UX Designer."];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;
function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}
function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});
document.addEventListener("DOMContentLoaded", function () {
  const textToShow = document.getElementById("textToShow");
  const texts = [
    "UI UX Designer",
    "Web Designer",
    "App Developer",
    "Game Developer",
    "Software Developer",
  ];
  let index = 0;
  function showNextText() {
    textToShow.textContent = texts[index];
    index = (index + 1) % texts.length;
  }
  function toggleAnimation() {
    textToShow.style.animation = "none";
    void textToShow.offsetWidth;
    textToShow.style.animation = null;
  }
  showNextText();
  toggleAnimation();
  setInterval(() => {
    showNextText();
    toggleAnimation();
  }, 3000);
});
("use strict");
var review = document.getElementById("review"),
  reviewDots = Array.prototype.slice.call(
    document.getElementById("review-dots").children
  ),
  reviewContent = Array.prototype.slice.call(
    document.getElementById("review-content").children
  ),
  reviewLeftArrow = document.getElementById("left-arrow"),
  reviewRightArrow = document.getElementById("right-arrow"),
  reviewSpeed = 4500,
  currentSlide = 0,
  currentActive = 0,
  reviewTimer,
  touchStartPos,
  touchEndPos,
  touchPosDiff,
  ignoreTouch = 30;
window.onload = function () {
  function playSlide(slide) {
    for (var k = 0; k < reviewDots.length; k++) {
      reviewContent[k].classList.remove("active");
      reviewContent[k].classList.remove("inactive");
      reviewDots[k].classList.remove("active");
    }
    if (slide < 0) {
      slide = currentSlide = reviewContent.length - 1;
    }
    if (slide > reviewContent.length - 1) {
      slide = currentSlide = 0;
    }
    if (currentActive != currentSlide) {
      reviewContent[currentActive].classList.add("inactive");
    }
    reviewContent[slide].classList.add("active");
    reviewDots[slide].classList.add("active");
    currentActive = currentSlide;
    clearTimeout(reviewTimer);
    reviewTimer = setTimeout(function () {
      playSlide((currentSlide += 1));
    }, reviewSpeed);
  }
  reviewLeftArrow.addEventListener("click", function () {
    playSlide((currentSlide -= 1));
  });
  reviewRightArrow.addEventListener("click", function () {
    playSlide((currentSlide += 1));
  });
  for (var l = 0; l < reviewDots.length; l++) {
    reviewDots[l].addEventListener("click", function () {
      playSlide((currentSlide = reviewDots.indexOf(this)));
    });
  }
  playSlide(currentSlide);
  document.addEventListener("keyup", function (e) {
    switch (e.keyCode) {
      case 37:
        reviewLeftArrow.click();
        break;
      case 39:
        reviewRightArrow.click();
        break;
      default:
        break;
    }
  });
  review?.addEventListener("touchstart", function (e) {
    touchStartPos = e.changedTouches[0].clientX;
  });
  review?.addEventListener("touchend", function (e) {
    touchEndPos = e.changedTouches[0].clientX;
    touchPosDiff = touchStartPos - touchEndPos;
    if (touchPosDiff > 0 + ignoreTouch) {
      reviewLeftArrow.click();
    } else if (touchPosDiff < 0 - ignoreTouch) {
      reviewRightArrow.click();
    } else {
      return;
    }
  });
};
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("review-dots").classList.remove("hidden");
  document.getElementById("right-arrow").classList.remove("hidden");
  document.getElementById("left-arrow").classList.remove("hidden");
});

document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("upload-attachment");
  const uploadedFilesContainer = document.getElementById("uploaded-files");
  fileInput.addEventListener("change", handleFileUpload);
  function handleFileUpload() {
    uploadedFilesContainer.innerHTML = "";
    Array.from(fileInput.files).forEach((file) => {
      const fileItem = document.createElement("div");
      fileItem.classList.add("file-item");
      const fileName = document.createElement("span");
      fileName.textContent = file.name;
      const removeIcon = document.createElement("i");
      removeIcon.classList.add("las", "la-times");
      removeIcon.addEventListener("click", () => removeFile(file));
      fileItem.appendChild(fileName);
      fileItem.appendChild(removeIcon);
      uploadedFilesContainer.appendChild(fileItem);
    });
  }
  function removeFile(file) {
    const dataTransfer = new DataTransfer();
    Array.from(fileInput.files).forEach((f) => {
      if (f !== file) {
        dataTransfer.items.add(f);
      }
    });
    fileInput.files = dataTransfer.files;
    handleFileUpload();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector(".custom-form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!validateForm()) {
      return !1;
    }
    clearForm();
    showSuccessMessage();
  });
  function validateForm() {
    var fullNameInput = document.getElementById("full-name");
    var emailInput = document.getElementById("email");
    var organizationInput = document.getElementById("organization-name");
    var servicesInput = document.getElementById("looking-services");
    var phoneInput = document.getElementById("phone-number");
    var budgetInput = document.getElementById("budget");
    var messageInput = document.getElementById("message");
    if (fullNameInput.value.trim() === "") {
      alert("Please enter your full name.");
      return !1;
    }
    if (emailInput.value.trim() === "") {
      alert("Please enter your email.");
      return !1;
    } else if (!isValidEmail(emailInput.value.trim())) {
      alert("Please enter a valid email address.");
      return !1;
    }
    if (organizationInput.value.trim() === "") {
      alert("Please enter the name of your organization.");
      return !1;
    }
    if (servicesInput.value.trim() === "") {
      alert("Please enter the services you are looking for.");
      return !1;
    }
    if (
      phoneInput.value.trim() !== "" &&
      !isValidPhoneNumber(phoneInput.value.trim())
    ) {
      alert("Please enter a valid phone number (11 digits).");
      return !1;
    }
    if (
      budgetInput.value.trim() !== "" &&
      isNaN(parseFloat(budgetInput.value.trim()))
    ) {
      alert("Please enter a valid budget.");
      return !1;
    }
    if (messageInput.value.trim() === "") {
      alert("Please enter your message.");
      return !1;
    }
    return !0;
  }
  function clearForm() {
    var inputs = form.querySelectorAll("input, textarea");
    inputs.forEach(function (input) {
      if (input.type !== "file") {
        input.value = "";
      }
    });
    document.getElementById("uploaded-files").innerHTML = "";
  }
  function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  function isValidPhoneNumber(phoneNumber) {
    var phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phoneNumber);
  }
  function showSuccessMessage() {
    var successMessage = document.querySelector(".alert-success");
    successMessage.style.display = "block";
    setTimeout(function () {
      successMessage.style.display = "none";
    }, 10000);
  }
});
