import React, { useEffect, useState } from "react";
import { MENU_CSV_URL } from "./config";
import sampleMenu from "./data/sampleMenu";
import { groupByDate, loadMenu } from "./lib/menu";

function MenuItem({ item }) {
  // A dish without a photo, or whose photo fails to load, shows a plain panel instead of a broken image.
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = item.image && !imageFailed;

  return (
    <li className="max-w-xs mx-4 mb-2 shadow-lg relative">
      <div className="flex items-center justify-center">
        {showImage ? (
          <img
            className="w-full h-52 object-cover"
            src={item.image}
            alt={item.item}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="w-full h-52 bg-gray-100 flex items-center justify-center text-5xl" aria-hidden="true">
            &#127861;
          </div>
        )}
      </div>
      {item.category && (
        <div className="p-3 text-sm bg-yellow-600 text-white text-center">
          {item.category}
        </div>
      )}

      <div className="px-6 py-4 h-36">
        <div className="mb-3 text-lg text-center font-semibold tracking-tight text-green-600 uppercase">
          {item.item}

          {item.isVegetarian && <div className="v">Vegetarian</div>}
        </div>
      </div>
      {item.price && (
        <div className="w-full absolute bottom-0 font-bold x-4 py-2 bg-green-600 text-green-50 text-center">
          ${item.price}
        </div>
      )}
    </li>
  );
}

function Menu() {
  // "loading" until the sheet answers, then "ready" or "error".
  const [status, setStatus] = useState(MENU_CSV_URL ? "loading" : "ready");
  const [items, setItems] = useState(MENU_CSV_URL ? [] : sampleMenu);

  useEffect(() => {
    if (!MENU_CSV_URL) return undefined;
    let cancelled = false;
    loadMenu(MENU_CSV_URL)
      .then((loaded) => {
        if (cancelled) return;
        setItems(loaded);
        setStatus("ready");
      })
      .catch((error) => {
        console.error(error);
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "loading") {
    return <p className="text-center py-12" role="status">Loading this week's menu...</p>;
  }
  if (status === "error") {
    return (
      <p className="text-center py-12" role="alert">
        Sorry, the menu could not be loaded right now. Please try again later or give us a call.
      </p>
    );
  }
  if (items.length === 0) {
    return <p className="text-center py-12">The menu for this week has not been posted yet.</p>;
  }

  return groupByDate(items).map((group) => (
    <div key={group.date}>
      {group.date && (
        <h3 className="border-dashed border-2 border-green-600 h-10 flex items-center justify-center m-8 font-bold">
          {group.date}
        </h3>
      )}

      <ul className="grid lg:grid-cols-4 gap-y-6 mb-4">
        {group.items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  ));
}

function App() {
  return (
    <div>
        <div className="bg-white shadow-md sticky top-0 z-10">
          <ul className="container px-6 py-8 mx-auto md:flex md:justify-between md:items-center">
            <li className="bg-green-600 inline-block px-4 py-2 m-2 rounded text-white">
              <a href="#menu">Menu</a>
            </li>

            <li className="inline-block px-4 py-2 m-2 hover:bg-green-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 rounded">
              <a href="#home">Home</a>
            </li>
            <li className="inline-block px-4 py-2 m-2 hover:bg-green-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 rounded">
              <a href="#story">Our Story</a>
            </li>
          </ul>
        </div>
        <section className="px-2 py-32 bg-gray-100 md:px-0" id="home">
          <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
            <div className="flex flex-wrap items-center sm:-mx-3">
              <div className="w-full md:w-1/2 md:px-3">
                <div className="w-full pb-6 space-y-4 sm:max-w-md lg:max-w-lg lg:space-y-4 lg:pr-0 md:pb-0">
                  <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                    <span className="logo block">
                      &#127861;
                      <br />
                      Welcome to Mama Chef!
                    </span>
                  </h1>
                  <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl pt-8">
                    Discover our exquisite homemade menu, crafted with fresh and
                    organic ingredients hand-picked from local farmer markets.
                    We offer the convenience of delivery within a 3-mile radius
                    for orders exceeding $50 or easy pick-up at our Mission-Ash
                    location in Escondido, CA (92027).
                  </p>
                  <p className="capitalize text-center text-lg pt-6 font-bold">
                    Operating Hours: We're open every Friday and Saturday from
                    8:00 AM to 10:00 PM.
                    <br />
                    Contact Number: You can reach us at 760-638-3143.
                    <br />
                    Payment Options: We accept Zelle and Cash only.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
                  <img
                    alt="A homemade dish from the menu"
                    src="https://live.staticflickr.com/65535/53344768336_6ffdecdf2c_b.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-2 py-32 bg-gray-50 md:px-0" id="story">
          <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
            <div className="flex flex-wrap items-center sm:-mx-3">
              <div className="w-full md:w-1/2 md:px-3">
                <div className="w-full pb-6 space-y-4 sm:max-w-md lg:max-w-lg lg:space-y-4 lg:pr-0 md:pb-0">
                  <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                    🌿 Discover Farm-to-Table Delights: Escondido's Culinary
                    Gem! 🌿
                  </h2>
                  <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                    🍽️ Handpicked from local markets, our menu showcases
                    Escondido's bounty—fresh, organic, and exquisite.
                    <br />
                    🚗 Free delivery (3-mile radius, $50+ orders) or pick up at
                    Mission-Ash, Escondido, CA (92027).
                    <br />
                    📆 Select favorites, notify us a day ahead, and savor the
                    goodness crafted just for you.
                    <br />
                    🌿 Eco-Friendly Packaging: Our To-Go Boxes are crafted with
                    care using beautiful handcrafted, recycled materials.
                    <br />
                    🌟 Farm-to-Table Delights—where local flavors meet culinary
                    excellence. Thank you for choosing us! 🌟
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
                  <img
                    alt="Fresh ingredients from the local market"
                    src="https://live.staticflickr.com/65535/53343926767_050d206f6d_h.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-white" id="menu">
          <div className="mt-4 text-center">
            <h2 className="text-4xl font-bold">Our Menu</h2>
            <p className="speciality text-3xl font-bold">
              This week's Speciality
            </p>
          </div>
          <div className="container w-full px-5 py-6 mx-auto">
            <Menu />
          </div>
        </section>

        <footer className="m-auto p-8">
          <div className="text-center p-2">
            Made with ❤ by{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://hellojuninguyen.netlify.app/"
            >
              juniNguyen.
            </a>
            <br />
            The images on this website are for illustrative purposes and
            should not be considered an exact representation of the actual
            product.
          </div>
        </footer>
    </div>
  );
}

export default App;
