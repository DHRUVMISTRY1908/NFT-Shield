import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Head from "next/head";

export default function Example() {
  return (
    <>
      <Head>
        <title>NFT project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto p-5">
        {/* justify-around py-4 w-full fixed top-0 left-0 right-0 z-10 backdrop-filter backdrop-blur-sm */}
        <div className="md:flex md:flex-row md:justify-between text-center text-sm sm:text-base justify-around py-4 px-24 md:px-16 backdrop-filter backdrop-blur-sm fixed top-0 left-0 right-0 z-10">
          <div className="flex flex-row justify-center">
            <img
              src="https://gateway.pinata.cloud/ipfs/Qmb5kKCVBEq2sz6dwbuT7HSFU7iWJNyBwacHdx1KazVZjT"
              className="w-10 h-10 "
            />
            {/* <img src="../assets/logo2.png" className="w-10 h-10 " /> */}

            <h1 className="text-3xl ml-2 mt-1 font-semibold">NFT Shield</h1>
          </div>
          <div className="mt-2 space-x-10">
            <a
              href="#"
              className="hover:text-[#F44E77] font-semibold p-4 px-3 sm:px-4"
            >
              Home
            </a>
            <a
              href="/verify"
              className="hover:text-[#F44E77] font-semibold p-4 px-3 sm:px-4"
            >
              Verify NFT
            </a>
            <a
              href="./login"
              className="font-semibold bg-[#CAC7FF] text-[#16194F] border-solid border-2 border-[#16194F] hover:bg-[#16194F] hover:text-[#CAC7FF] p-3 px-10 sm:px-5 rounded-full"
            >
              Login
            </a>
          </div>
        </div>

        <div className="md:flex md:flex-row mt-20">
          <div className="md:w-2/5 flex flex-col justify-center items-center">
            <h2 className="font-serif text-5xl mb-4 text-center md:self-start md:text-left">
              Redefining your warranty card experience!
            </h2>
            <p className="tracking-wide text-center md:self-start md:text-left">
              Bringing the best out of warranty cards
            </p>
            <a
              href="#"
              className="font-semibold bg-[#16194F] rounded-full py-4 px-8 text-gray-50 text-xl md:self-start my-5 border-[#16194F] border-solid border-2 hover:bg-[#CAC7FF] hover:text-[#16194F]"
            >
              Try Now
            </a>
            {/* font-semibold bg-[#CAC7FF] text-[#16194F] border-solid border-2 border-[#16194F] hover:bg-[#16194F] hover:text-[#CAC7FF] p-3 px-10 sm:px-5 rounded-full */}
          </div>
          <div className="md:w-3/5">
            <img
              src="https://gateway.pinata.cloud/ipfs/QmUXKvw439gDdRoacXMYiuHmPH7zTTqAj4gzeH8YpZCQ3H"
              className="w-full"
            />
          </div>
        </div>

        <div className="my-20">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/5 flex flex-col justify-center items-center">
              <h2 className="font-serif text-5xl mb-4 text-center md:self-start md:text-left">
                NFT Shield
              </h2>
              <p className="tracking-wide text-center md:self-start md:text-left">
                A warranty card can now be given as a{" "}
                <b> smart digital token </b> on NFT Shield. This will enable
                warranty cards to be fraud-proof and publicly verifiable
                on-chain. Warranty Cards transition from being just a card for
                redeeming to an asset packed with utility.
              </p>
            </div>
            <div className="md:w-3/5 flex justify-center md:justify-end">
              <img
                src="https://gateway.pinata.cloud/ipfs/QmPEPnZczocSBMwTGT3pgrD4FtCVwy5EWcoRYeEsuWGuQQ"
                className=""
              />
            </div>
          </div>
        </div>

        <div className="my-20 mx-auto">
          <div className="md:w-2/5 flex flex-col justify-center items-center5">
            <h2 className="font-serif text-5xl mb-4 text-center md:self-start md:text-left">
              Why NFT Shield?
            </h2>
          </div>

          <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl class="grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                <div class="relative pl-16">
                  <dt class="text-base font-semibold leading-7 text-gray-900">
                    {/* <div class="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600"> */}
                    {/* <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
              </svg> */}
                    <img
                      src="https://gateway.pinata.cloud/ipfs/QmRSCt8zx9ztSSH233UGwsEJex8rHhULM8x9v2gFSVNg9c"
                      class=""
                    />
                    {/* </div> */}
                    Push to deploy
                  </dt>
                  <dd class="mt-2 text-base leading-7 text-gray-600">
                    Morbi viverra dui mi arcu sed. Tellus semper adipiscing
                    suspendisse semper morbi. Odio urna massa nunc massa.
                  </dd>
                </div>

                <div class="relative pl-16">
                  <dt class="text-base font-semibold leading-7 text-gray-900">
                    {/* <div class="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div> */}
                    <img
                      src="https://gateway.pinata.cloud/ipfs/QmXikgHVcfXuHyztxX8nW3yHtHfvyTFRoYZmLcijmZrD5A"
                      class=""
                    />
                    SSL certificates
                  </dt>
                  <dd class="mt-2 text-base leading-7 text-gray-600">
                    Sit quis amet rutrum tellus ullamcorper ultricies libero
                    dolor eget. Sem sodales gravida quam turpis enim lacus amet.
                  </dd>
                </div>

                <div class="relative pl-16">
                  <dt class="text-base font-semibold leading-7 text-gray-900">
                    <div class="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <svg
                        class="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                    </div>
                    Simple queues
                  </dt>
                  <dd class="mt-2 text-base leading-7 text-gray-600">
                    Quisque est vel vulputate cursus. Risus proin diam nunc
                    commodo. Lobortis auctor congue commodo diam neque.
                  </dd>
                </div>

                <div class="relative pl-16">
                  <dt class="text-base font-semibold leading-7 text-gray-900">
                    <div class="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <svg
                        class="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
                        />
                      </svg>
                    </div>
                    Advanced security
                  </dt>
                  <dd class="mt-2 text-base leading-7 text-gray-600">
                    Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt
                    mattis aliquet hac quis. Id hac maecenas ac donec pharetra
                    eget.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-gray-300 flex flex-col md:flex-row md:justify-between text-center py-5 text-sm">
          <div className="mb-4">
            <a href="#" className="mx-2.5">
              NFT Shield
            </a>
          </div>
          {/* <p>Developers: Krishi Chawda, Tanishka Borkar</p> */}
        </div>
      </div>
    </>
  );
}
