import React from 'react';
import cloud from "../../assets/ic_cloud-sync.png"
import  stay from "../../assets/ic_tags.png"
import collab from "../../assets/ic_collaborate.png"
import back from "../../assets/ic_history.png"
import mark from "../../assets/ic_notes.png"
import Free from "../../assets/ic_info.png"
function Simple() {
  const cards = [
    { id: 1, image: cloud, title: "Use it everywhere", description: "Notes stay updated across all your devices, automatically and in real time. There’s no “sync” button: It just works." },
    { id: 2, image:stay, title: "Stay organized", description: "Add tags to find notes quickly with instant searching." },
    { id: 3, image:collab, title: "Collaboration", description: "Share a to-do list, post some instructions, or publish your notes online." },
    { id: 4, image: back, title: "Backup", description: "Notes are backed up with every change, so you can see what you noted last week or last month." },
    { id: 5, image: mark, title: "Markdown support", description: "Write, preview, and publish your notes in Markdown format." },
    { id: 6, image:Free, title: "Free", description: "Apps, backups, syncing, sharing – it’s all completely free." },
  ];

  return (
    <div className="bg-custom-dark text-white px-4 py-8 md:px-8 md:py-12">
      <div className="container simple w-full flex flex-col gap-[30px] items-center justify-center">
        <h1 className="text-4xl md:w-[50%] md:text-center w-full font-bold mb-8 text-center">
          Comprehensive underneath, simple on the surface
        </h1>
        <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-[30px]">
          {cards.map((card, index) => (
            <div key={index} className='flex p-1 flex-col shadow-lg gap-[10px]'>
              <div className='flex items-center justify-start gap-[10px]'>
                <img src={card.image} alt={card.title} />
                <span className='font-bold text-[20px]'>{card.title}</span>
              </div>
              <p className='text-gray-400'>{card.description}</p>
            </div>
          ))}
        </div>

      </div>
      <hr className='bg-white' />
    </div>
  );
}

export default Simple;
