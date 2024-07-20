
import app from "../../assets/ic-app-store-mac.png"
import app2 from "../../assets/ic-app-store-mac.png"
import Linux from "../../assets/ic-linux.png"
import store from "../../assets/ic-play-store.png"
import window2 from "../../assets/ic-windows.png"
import { Link } from "react-router-dom"
function Download() {
  const cards = [
    { id: 1, image: app, title: "App Store", description: "Download on the" },
    { id: 2, image:app2, title: "Mac App Store", description: "Download on the"  },
    { id: 3, image:Linux, title: "Linux",  description: "Download on for" },
    { id: 4, image: store, title: "Play Store", description: "Download on the" },
    { id: 5, image: window2, title: "Windows store", description: "Download on the" },
  ];

  return (
    <div className="bg-custom-dark text-white px-4 py-8 md:px-8 md:py-12">
      <div className="container  simple w-full flex flex-col gap-[30px] items-center justify-center">
        <h1 className="text-5xl md:w-[80%] md:text-center w-full font-bold mb-8 text-center">
        Available on all your devices
        </h1>
        <p className="text-2xl md:w-[50%] md:text-center w-full font-normal mb-8 text-center">
        Download Simplenote for any device and stay in sync – all the time, everywhere.
        </p>
        <div className="cards grid grid-cols-1 md:grid-cols-2 pb-[20px] w-full  md:w-[60%] gap-[20px]">
          {cards.map((card, index) => (
            <div key={index} className='flex items-center  bg-custom-dark-2 rounded-[6px] p-2 shadow-lg border  border-gray-50 gap-[10px]'>
              <div className='flex items-center justify-start gap-[10px]'>
                <img src={card.image}className='w-[30px]'  alt={card.title} />   
              </div>
              <div className="text">   
             <span className='font-bold text-[16px]'>{card.description}</span>
              <p className='text-gray-400'>{card.title}</p>
              </div>
         
            </div>
          ))}
        </div>
<Link className="underline text-blue-800" >other downloads </Link>
      </div>
     
    </div>
  );
}

export default Download;
