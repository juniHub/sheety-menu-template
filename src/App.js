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

    const groupByCategory = items.reduce((group, item) => {
      const { category } = item;
      group[category] = (group[category] || []).concat(item);
      return group;
    }, {});
     
    
    return (
     
    <body className="container m-auto p-8 dark:text-gray-400">
                   
      <header className="m-auto p-8">
      <h1 className="logo text-center">&#127861;<br/>Homemade Fresh Meal!</h1>
			<p className="capitalize text-center text-lg pt-8">Our homemade menu is fresh and organic hand-picked from local farmer markets and can be ready to be delivered within 10 miles or pick-up. Just pick what you like here and let us know one day in advance. Thank you!</p>
        
      </header>

      <main className="m-auto p-8">
              
        <div className="flex flex-wrap -mx-2 mb-8">
				  <div className="w-full px-2">

          {Object.keys(groupByCategory).map((category) => (
            
            <div key={category}>
              <h3 className="border-dashed border-2 border-green-600 h-12 flex items-center justify-center">{category}</h3>
              
              <ul className="p-4">
                {groupByCategory[category].map((item) => (
                 
                <li className="p-4 text-lg" key={item.item}>
								    <div className="flex items-center justify-center">{item.item}
                    
                    {item.isVegetarian && <div className="v">V</div>}
                    </div>
								   
															
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
            Made with TailwindCSS by <a target="_blank" rel="noreferrer" href="https://hellojuninguyen.netlify.app/">juniNguyen.</a>
            </div>
        </footer>
           </body>
    );
  }
}

export default App;