<script>
export default {
  layout: 'plain',
}
</script>

<template>
  <PageWrapper id="app" class="flex flex-col min-h-screen">
    <div id="welcome-template">
      <section class="showcase">
        <img
          class="absolute w-auto h-11 bottom-4 right-4"
          src="http://designcoder.test/assets/img/logo_prospectus.png"
        />
        <header>
          <!-- <h2 class="logo">Travel</h2> -->
          <svg
            class="text-white w-11 h-11"
            width="44"
            height="44"
            clip-rule="evenodd"
            fill-rule="evenodd"
            stroke-miterlimit="1.41421"
            viewBox="0 0 510 519"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
          >
            <path
              d="m254.926 65.236v.017c-50.825.089-91.978 28.371-91.978 63.248 0 34.936 41.29 63.252 92.222 63.252v-.018c50.818-.086 91.979-28.368 91.979-63.245 0-34.936-41.289-63.254-92.223-63.254z"
              fill-rule="nonzero"
            />
            <path
              d="m254.926 65.236v.017c-50.825.089-91.978 28.371-91.978 63.248 0 34.936 41.29 63.252 92.222 63.252v-.018c50.818-.086 91.979-28.368 91.979-63.245 0-34.936-41.289-63.254-92.223-63.254z"
              fill="none"
              stroke="#fefefe"
            />
            <path
              d="m257.641 215.522c-.911 0-1.805-.035-2.715-.049v.02c-.827.011-1.646.045-2.477.045-17.124 0-33.913-6.457-48.655-10.928-.02.115-.512 78.982-.512 78.982l3.376 218.938c.091 10.533 24.479 15.82 48.512 15.191v-.008c23.951.588 48.17-4.701 48.274-15.201l3.367-218.931s-.492-78.868-.513-78.981c-14.732 4.471-31.529 10.922-48.657 10.922z"
              fill-rule="nonzero"
            />
            <path
              d="m257.641 215.522c-.911 0-1.805-.035-2.715-.049v.02c-.827.011-1.646.045-2.477.045-17.124 0-33.913-6.457-48.655-10.928-.02.115-.512 78.982-.512 78.982l3.376 218.938c.091 10.533 24.479 15.82 48.512 15.191v-.008c23.951.588 48.17-4.701 48.274-15.201l3.367-218.931s-.492-78.868-.513-78.981c-14.732 4.471-31.529 10.922-48.657 10.922z"
              fill="none"
              stroke="#fefefe"
            />
            <path
              d="m378.058 126.641c0 27.817-19.805 52.419-50.176 67.476.199 23.143 1.341 163.495-.049 239.628 1.091 2.183 181.561-334.91 181.561-340.16h-142.117c6.685 10.334 10.781 21.004 10.781 33.056z"
              fill-rule="nonzero"
            />
            <path
              d="m378.058 126.641c0 27.817-19.805 52.419-50.176 67.476.199 23.143 1.341 163.495-.049 239.628 1.091 2.183 181.561-334.91 181.561-340.16h-142.117c6.685 10.334 10.781 21.004 10.781 33.056z"
              fill="none"
              stroke="#fefefe"
            />
            <path
              d="m155.439 77.421c21.845-20.467 56.944-33.75 96.542-33.75 1.071 0 2.127.048 3.189.069v-.019c.977-.021 1.954-.06 2.938-.06 39.605 0 74.706 13.278 96.546 33.745.989.021 154.802-.281 154.74-.459-10.032-14.445-107.77-73.074-251.22-76.106-1.091-.023-2.164-.01-3.248-.025v.015c-1.008.01-1.99.003-3.008.024-143.447 3.033-241.18 61.664-251.223 76.104-.058.181 153.76.478 154.744.462z"
              fill-rule="nonzero"
            />
            <path
              d="m155.439 77.421c21.845-20.467 56.944-33.75 96.542-33.75 1.071 0 2.127.048 3.189.069v-.019c.977-.021 1.954-.06 2.938-.06 39.605 0 74.706 13.278 96.546 33.745.989.021 154.802-.281 154.74-.459-10.032-14.445-107.77-73.074-251.22-76.106-1.091-.023-2.164-.01-3.248-.025v.015c-1.008.01-1.99.003-3.008.024-143.447 3.033-241.18 61.664-251.223 76.104-.058.181 153.76.478 154.744.462z"
              fill="none"
              stroke="#fefefe"
            />
            <path
              d="m182.219 194.132c-30.375-15.056-50.188-39.66-50.188-67.479 0-12.05 4.104-22.723 10.781-33.056h-142.117c0 5.255 180.481 342.349 181.574 340.155-1.402-76.132-.257-216.482-.05-239.62z"
              fill-rule="nonzero"
            />
            <path
              d="m182.219 194.132c-30.375-15.056-50.188-39.66-50.188-67.479 0-12.05 4.104-22.723 10.781-33.056h-142.117c0 5.255 180.481 342.349 181.574 340.155-1.402-76.132-.257-216.482-.05-239.62z"
              fill="none"
              stroke="#fefefe"
            />
          </svg>
          <div class="toggle" />
        </header>

        <video
          src="http://designcoder.test/assets/video/welcome.mp4"
          muted=""
          loop=""
          autoplay=""
        />

        <div class="overlay" />

        <div class="text">
          <h2>Never Stop</h2>
          <h3>Exploring The World</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          <a href="http://designcoder.test/demo/dashboard">Explore</a>
        </div>

        <ul class="social">
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.facebook.com/tolbert.design"
            >
              <img src="https://i.ibb.co/x7P24fL/facebook.png" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/victortolbert"
            >
              <img src="https://i.ibb.co/Wnxq2Nq/twitter.png" />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.instagram.com/victortolbert/"
            >
              <img src="https://i.ibb.co/ySwtH4B/instagram.png" />
            </a>
          </li>
        </ul>
      </section>

      <div class="menu">
        <ul>
          <li><a href="http://designcoder.test/demo/home">Home</a></li>
          <li><a href="http://designcoder.test/demo/news">News</a></li>
          <li>
            <a href="http://designcoder.test/demo/destination">Destination</a>
          </li>
          <li><a href="http://designcoder.test/demo/blog">Blog</a></li>
          <li><a href="http://designcoder.test/demo/contact">Contact</a></li>
        </ul>
      </div>
    </div>

    <!-- <script src="https://cdn.jwplayer.com/libraries/eVFvXVIt.js"></script> -->
    <!-- php $this->load->view('demo/patterns/footer_fixed') -->
    <!-- <script src="http://designcoder.test/assets/js/welcome.js"></script> -->
    <!-- https://www.pexels.com/video/aerial-view-of-beautiful-resort-2169880/ -->
    <!-- Video by Tom Fisk from Pexels -->
  </PageWrapper>
</template>

<style>
#welcome-template * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

#welcome-template header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 40px 100px;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#welcome-template header .logo {
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
}

#welcome-template .toggle {
  position: relative;
  width: 60px;
  height: 60px;
  background: url('http://designcoder.test/assets/img/menu.png');
  background-repeat: no-repeat;
  background-size: 30px;
  background-position: center;
  cursor: pointer;
}

#welcome-template .toggle.active {
  background: url('http://designcoder.test/assets/img/close.png');
  background-repeat: no-repeat;
  background-size: 25px;
  background-position: center;
  cursor: pointer;
}

#welcome-template .showcase {
  position: absolute;
  right: 0;
  width: 100%;
  min-height: 100vh;
  padding: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #111;
  transition: 0.5s;
  z-index: 2;
}

#welcome-template .showcase.active {
  right: 300px;
}

#welcome-template .showcase video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
}

#welcome-template .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #03a9f4;
  mix-blend-mode: overlay;
}

#welcome-template .text {
  position: relative;
  z-index: 10;
}

#welcome-template .text h2 {
  font-size: 5em;
  font-weight: 800;
  color: #fff;
  line-height: 1em;
  text-transform: uppercase;
}

#welcome-template .text h3 {
  font-size: 4em;
  font-weight: 700;
  color: #fff;
  line-height: 1em;
  text-transform: uppercase;
}

#welcome-template .text p {
  font-size: 1.1em;
  color: #fff;
  margin: 20px 0;
  font-weight: 400;
  max-width: 700px;
}

#welcome-template .text a {
  display: inline-block;
  font-size: 1em;
  background: #fff;
  padding: 10px 30px;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 500;
  margin-top: 10px;
  color: #111;
  letter-spacing: 2px;
  transition: 0.2s;
}

#welcome-template .text a:hover {
  letter-spacing: 6px;
}

#welcome-template .social {
  position: absolute;
  z-index: 10;
  bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#welcome-template .social li {
  list-style: none;
}

#welcome-template .social li a {
  display: inline-block;
  margin-right: 20px;
  filter: invert(1);
  transform: scale(0.5);
  transition: 0.5s;
}

#welcome-template .social li a:hover {
  transform: scale(0.5) translateY(-15px);
}

#welcome-template .menu {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#welcome-template .menu ul {
  position: relative;
}

#welcome-template .menu ul li {
  list-style: none;
}

#welcome-template .menu ul li a {
  text-decoration: none;
  font-size: 24px;
  color: #111;
}

#welcome-template .menu ul li a:hover {
  color: #03a9f4;
}

@media (max-width: 991px) {
  #welcome-template .showcase,
  #welcome-template .showcase header {
    padding: 40px;
  }

  #welcome-template .text h2 {
    font-size: 3em;
  }

  #welcome-template .text h3 {
    font-size: 2em;
  }
}
</style>
