import React from "react";
import axios from "axios";

const url =
  "https://api.sheety.co/421f49057d6beddcc5e8f3bb67232cca/menuHomemadeFresh/sheet1";

class App extends React.Component {
  state = {
    items: [
      {
        item: "Bun Bo Hue",
        price: 12,
        isVegetarian: false,
        category: "Mains",
      },
    ],
  };

  componentDidMount() {
    this.fetchItem();
  }

  fetchItem = () => {
    axios
      .get(url)
      .then((res) => {
        this.setState({
          items: res.data.sheet1,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { items } = this.state;

    const groupByDate = items.reduce((group, item) => {
      const { date } = item;
      group[date] = (group[date] || []).concat(item);
      return group;
    }, {});

    return (
      <body>
        <div class="bg-white shadow-md sticky top-0 z-10">
          <ul class="container px-6 py-8 mx-auto md:flex md:justify-between md:items-center">
            <li class="bg-green-600 inline-block px-4 py-2 m-2 rounded text-white">
              <a href="#menu">Menu</a>
            </li>

            <li class="inline-block px-4 py-2 m-2 hover:bg-green-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 rounded">
              <a href="#home">Home</a>
            </li>
            <li class="inline-block px-4 py-2 m-2 hover:bg-green-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 rounded">
              <a href="#story">Our Story</a>
            </li>
          </ul>
        </div>
        <section class="px-2 py-32 bg-gray-100 md:px-0" id="home">
          <div class="container items-center max-w-6xl px-8 mx-auto xl:px-5">
            <div class="flex flex-wrap items-center sm:-mx-3">
              <div class="w-full md:w-1/2 md:px-3">
                <div class="w-full pb-6 space-y-4 sm:max-w-md lg:max-w-lg lg:space-y-4 lg:pr-0 md:pb-0">
                  <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                    <h1 class=" logo">
                      &#127861;
                      <br />
                      Welcome to Mama Chef!
                    </h1>
                  </h1>
                  <p class="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl pt-8">
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
              <div class="w-full md:w-1/2">
                <div class="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
                  <img
                    alt="story"
                    src="https://live.staticflickr.com/65535/53344768336_6ffdecdf2c_b.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="px-2 py-32 bg-gray-50 md:px-0" id="story">
          <div class="container items-center max-w-6xl px-8 mx-auto xl:px-5">
            <div class="flex flex-wrap items-center sm:-mx-3">
              <div class="w-full md:w-1/2 md:px-3">
                <div class="w-full pb-6 space-y-4 sm:max-w-md lg:max-w-lg lg:space-y-4 lg:pr-0 md:pb-0">
                  <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                    <h2 class="text-4xl font-bold">
                      🌿 Discover Farm-to-Table Delights: Escondido's Culinary
                      Gem! 🌿
                    </h2>
                  </h1>
                  <p class="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
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
              <div class="w-full md:w-1/2">
                <div class="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
                  <img
                    alt="story"
                    src="https://live.staticflickr.com/65535/53343926767_050d206f6d_h.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="mt-8 bg-white" id="menu">
          <div class="mt-4 text-center">
            <h2 class="text-4xl font-bold">Our Menu</h2>
            <h3 class="speciality text-3xl font-bold">
              This week's Speciality
            </h3>
          </div>
          <div class="container w-full px-5 py-6 mx-auto">
            {Object.keys(groupByDate).map((date) => (
              <div key={date}>
                <h2 className="border-dashed border-2 border-green-600 h-10 flex items-center justify-center m-8 font-bold">
                  {date}
                </h2>

                <ul className="grid lg:grid-cols-4 gap-y-6 mb-4">
                  {groupByDate[date].map((item) => (
                    <li
                      className="max-w-xs mx-4 mb-2 shadow-lg relative"
                      key={item.item}
                    >
                      <div className="flex items-center justify-center">
                        <img
                          className="w-full h-52"
                          src={item.image}
                          alt="item"
                        ></img>
                      </div>
                      <div className="p-3 text-sm bg-yellow-600 text-white text-center">
                        {item.category}
                      </div>

                      <div class="px-6 py-4 h-36">
                        <div className="mb-3 text-lg text-center font-semibold tracking-tight text-green-600 uppercase">
                          {item.item}

                          {item.isVegetarian && <div className="v">Vegan</div>}
                        </div>
                      </div>
                      <div className="w-full absolute bottom-0 font-bold x-4 py-2 bg-green-600 text-green-50 text-center">
                        ${item.price}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
            The images depicted on the website is for illustrative purposes and
            should not be considered an exact representation of the actual
            product.
          </div>
        </footer>
      </body>
    );
  }
}

export default App;
