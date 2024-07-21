import React from 'react'

function Saying() {
    const texts=[
{
    description:"If you’re not using Simplenote, you’re missing out.",title:"TechCrunch"
},
{
    description:"If you’re looking for a cross-platform note-taking tool with just enough frills, it’s hard to look beyond Simplenote.",title:"MacWorld"
},
{  description:"If you want a truly distraction-free environment then you can’t do better than Simplenote for your note-taking needs.", title:"Zapier"}
    ]
    return (
        <div className="bg-custom-light text-custom-dark px-4 py-8 md:px-8 md:py-12">
          <div className="container border-b border-b-gray-500  simple w-full flex flex-col gap-[30px] items-center justify-center">
            <h1 className="text-5xl md:w-[80%] md:text-center w-full font-bold mb-8 text-center">
            What people are saying
            </h1>
            <div className="cards grid md:grid-cols-3 grid-cols-1 w-full gap-[20px] pb-[20px]">
              {texts.map((text, index) => (
                <div key={index} className='flex p-1 border-l border-gray-400 flex-col  gap-[10px]'>
                              <p className='text-black-400 w-[80%]'>{text.description}</p>
                    <i className='font-bold text-gray-500 text-[16px]'>{text.title}</i>

                </div>
              ))}
            </div>
    
          </div>
         
        </div>
      );
    }
export default Saying