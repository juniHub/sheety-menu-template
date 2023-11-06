import React from 'react'
import axios from 'axios'


const url = 'https://api.sheety.co/421f49057d6beddcc5e8f3bb67232cca/menuHomemadeFresh/sheet1';
	

class App extends React.Component
{
 
  state = {
    items: [
      {
        item:
          "Bun Bo Hue",
        price: 12,
        isVegetarian: false,
        category: "Mains"
      }
    ],
    
  };

  componentDidMount() {
    this.fetchItem();
  }


   fetchItem = () => {
    axios.get(url)
      .then((res) => {

          
          this.setState(
          {
            items: res.data.sheet1,
           
          },
         
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  
 
  render ()
  {
   
    const { items } = this.state;

    const groupByDate = items.reduce((group, item) => {
      const { date } = item;
      group[date] = (group[date] || []).concat(item);
      return group;
    }, {});
     
    
    return (
     
    <body className="container m-auto p-8 dark:text-gray-400">
                   
      <header className="m-auto p-8">
      <h1 className="logo text-center">&#127861;<br/>Homemade Fresh Meal!</h1>
			<p className="capitalize text-center text-lg pt-8">Discover our exquisite homemade menu, crafted with fresh and organic ingredients hand-picked from local farmer markets. We offer the convenience of delivery within a 3-mile radius for orders exceeding $50 or easy pick-up at our Mission-Ash location in Escondido, CA (92027). Simply select your favorites from our menu and kindly notify us one day in advance. Thank you for choosing us</p>
      <p className="capitalize text-center text-lg pt-6 font-bold">
      Operating Hours: We're open every Saturday from 8:00 AM to 10:00 PM.
      <br/>

      Contact Number: You can reach us at 760-638-3143.
      <br/>

      Payment Options: We accept Zelle and Cash only.
      <br/>

       Eco-Friendly Packaging: Our to-go boxes are crafted with care using beautiful handcrafted, recycled materials.
</p>
        
      </header>

      <main className="m-auto p-8">
              
        <div className="flex flex-wrap -mx-2 mb-8">
				  <div className="w-full px-2">

          {Object.keys(groupByDate).map((date) => (
            
            <div key={date}>
              <h3 className="border-dashed border-2 border-green-600 h-12 flex items-center justify-center">{date}</h3>
              
              <ul className="p-4">
                {groupByDate[date].map((item) => (
                 
                <li className="p-4 text-lg" key={item.item}>
								    <div className="flex items-center justify-center font-bold">{item.item}
                                        
                    {item.isVegetarian && <div className="v">Vegan</div>}
                    
                    </div>
                    <div className="flex items-center justify-center">{item.category}</div>
								   
															
								    <div className="price flex items-center justify-center">${item.price}</div>
                    <div className="flex items-center justify-center">
                    <img className="rounded-lg" src={item.image} alt="item" height="500" width="500"></img>
                    </div>
                
							  </li>

               ))}
              </ul>
         </div>
          
        ))}


				</div>
			</div>
   
      </main>
        <footer className="m-auto p-8">
          <div className="text-center p-2">
            Made with ❤ by <a target="_blank" rel="noreferrer" href="https://hellojuninguyen.netlify.app/">juniNguyen.</a>
            <br/>
            The images depicted on the website is for illustrative purposes and should not be considered an exact representation of the actual product.
            </div>
        </footer>
           </body>
    );
  }
}

export default App;