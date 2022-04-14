import Link from "next/link";

export default function Main() {
  return (
    <body>
      <nav class="fixed z-10 md:flex hidden w-full justify-center">
        <div class="my-8 flex w-2/2 justify-center rounded-full bg-th-background-secondary">
          <div class="flex items-center">
            <button class="m-2 bg-th-accent-light p-2 w-28 rounded-full border-2 border-th-accent-dark">Mint</button>
          </div>
          <ul class="items-center flex md:px-4">
            <li class="underline mx-3">
              <a href="collection"> How it works </a>
            </li>
            <li class="underline mx-3">
              <a href="#collection">Features</a>
            </li>
            <li class="underline mx-3">
              <a href="#collection">Pricing</a>
            </li>
          </ul>
        </div>
      </nav>

      <section class="lg:bg-coverart bg-coverart-small flex h-screen flex-col justify-center bg-cover px-4 pt-24 text-center md:mt-0 md:flex-row md:items-center md:justify-between md:px-12 md:text-left lg:px-12">
        <div class="flex justify-around md:mt-0 md:block md:flex-1"></div>
        <div class="flex justify-around md:mt-0 md:block md:flex-1"></div>
        <div class="md:mr-10 md:flex-1 md:max-w-xl bg-white bg-opacity-50 md:bg-opacity-0 p-10 rounded-3xl">
          <h1 class="font-pt-serif mb-7 text-5xl font-bold">
            Tales of Feather            
          </h1>
          <p class="font-pt-serif mb-7 font-normal">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            harum tempore consectetur voluptas, cumque nobis laboriosam
            voluptatem.
          </p>
          <div class="font-montserrat">
            <button class="mr-2 mb-2 rounded-full border-2 border-solid border-th-accent-dark bg-th-accent-light px-6 py-2 w-28">
              Mint
            </button>
          </div>
        </div>
      </section>

      <section
        name="collection"
        class="bg-th-background flex flex-col justify-center py-12"
      >
        <div>
          <h2 class="flex justify-center text-2xl md:text-4xl">Collection</h2>
        </div>
        <div class="flex w-full flex-col lg:flex-row">
          <div class="flex-1 flex flex-col mx-6 shadow-2xl relative bg-secondary rounded-2xl py-5 px-8 my-8">
            <h3 class="font-pt-serif font-normal text-2xl mb-4">The Good</h3>
            <div class="font-montserrat font-bold text-2xl mb-4">
              $25
              <span class="font-normal text-base"> / month</span>
            </div>

            <div class="flex">
              <img src="dist/assets/logos/CheckedBox.svg" alt="" class="mr-1" />
              <p>Benefit #1</p>
            </div>
            <div class="flex">
              <img src="dist/assets/logos/CheckedBox.svg" alt="" class="mr-1" />
              <p>Benefit #2</p>
            </div>
            <div class="flex">
              <img src="dist/assets/logos/CheckedBox.svg" alt="" class="mr-1" />
              <p>Benefit #3</p>
            </div>

            <button class=" border-2 border-solid border-black rounded-xl text-lg py-3 mt-4">
              Choose plan
            </button>
          </div>

          <div class="flex-1 flex flex-col mx-6 shadow-2xl relative bg-secondary rounded-2xl py-5 px-8 my-8">
            <h3 class="font-pt-serif font-normal text-2xl mb-4">The Bad</h3>
            <div class="font-montserrat font-bold text-2xl mb-4">
              $40
              <span class="font-normal text-base"> / month</span>
            </div>

            <div class="flex">
              <img src="dist/assets/logos/CheckedBox.svg" alt="" class="mr-1" />
              <p>Benefit #1</p>
            </div>
            <div class="flex">
              <img src="dist/assets/logos/CheckedBox.svg" alt="" class="mr-1" />
              <p>Benefit #2</p>
            </div>
            <div class="flex">
              <img src="dist/assets/logos/CheckedBox.svg" alt="" class="mr-1" />
              <p>Benefit #3</p>
            </div>

            <button class=" border-2 border-solid border-black rounded-xl text-lg py-3 mt-4">
              Choose plan
            </button>
          </div>

          <div class="flex-1 flex flex-col mx-6 shadow-xl relative bg-secondary rounded-2xl py-5 px-8 my-8">
            <h3 class="font-pt-serif font-normal text-2xl mb-4">The Ugly</h3>
            <div class="font-montserrat font-bold text-2xl mb-4">
              $50
              <span class="font-normal text-base"> / month</span>
            </div>

            <div class="flex">
              <img src="dist/assets/logos/CheckedBox.svg" alt="" class="mr-1" />
              <p>Benefit #1</p>
            </div>
            <div class="flex">
              <img src="dist/assets/logos/CheckedBox.svg" alt="" class="mr-1" />
              <p>Benefit #2</p>
            </div>
            <div class="flex">
              <img src="dist/assets/logos/CheckedBox.svg" alt="" class="mr-1" />
              <p>Benefit #3</p>
            </div>

            <button class=" border-2 border-solid border-black rounded-xl text-lg py-3 mt-4">
              Choose plan
            </button>
          </div>

          <div class="flex-1 flex flex-col mx-6 shadow-xl relative bg-secondary rounded-2xl py-5 px-8 my-8">
            <h3 class="font-pt-serif font-normal text-2xl mb-4">The Ugly</h3>
            <div class="font-montserrat font-bold text-2xl mb-4">
              $50
              <span class="font-normal text-base"> / month</span>
            </div>

            <div class="flex">
              <img src="dist/assets/logos/CheckedBox.svg" alt="" class="mr-1" />
              <p>Benefit #1</p>
            </div>
            <div class="flex">
              <img src="dist/assets/logos/CheckedBox.svg" alt="" class="mr-1" />
              <p>Benefit #2</p>
            </div>
            <div class="flex">
              <img src="dist/assets/logos/CheckedBox.svg" alt="" class="mr-1" />
              <p>Benefit #3</p>
            </div>

            <button class=" border-2 border-solid border-black rounded-xl text-lg py-3 mt-4">
              Choose plan
            </button>
          </div>

          <div class="flex-1 flex flex-col mx-6 shadow-xl relative bg-secondary rounded-2xl py-5 px-8 my-8">
            <h3 class="font-pt-serif font-normal text-2xl mb-4">The Ugly</h3>
            <div class="font-montserrat font-bold text-2xl mb-4">
              $50
              <span class="font-normal text-base"> / month</span>
            </div>

            <div class="flex">
              <img src="dist/assets/logos/CheckedBox.svg" alt="" class="mr-1" />
              <p>Benefit #1</p>
            </div>
            <div class="flex">
              <img src="dist/assets/logos/CheckedBox.svg" alt="" class="mr-1" />
              <p>Benefit #2</p>
            </div>
            <div class="flex">
              <img src="dist/assets/logos/CheckedBox.svg" alt="" class="mr-1" />
              <p>Benefit #3</p>
            </div>

            <button class=" border-2 border-solid border-black rounded-xl text-lg py-3 mt-4">
              Choose plan
            </button>
          </div>
        </div>
      </section>

      <section class="bg-black py-20">
        <div class="flex justify-center">
          <a href="#">
            <svg
              class="w-6 h-6 mx-4 text-white fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a href="#">
            <svg
              class="w-6 h-6 text-white fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </a>
        </div>

        <div class="text-white font-montserrat text-sm flex justify-center pt-4">
          © 2022 Tales of Feather
        </div>
      </section>
    </body>
  );
}
