import React, { useContext, useEffect } from 'react'
import { userContext } from '../Context/ContextPage'
import myPhoto from "../img/my3.jpg";

const About = () => {
    const { theme, data, setData } = useContext(userContext);

    useEffect(() => {
        fetchData();
    }, []);



    return (
        <div>
            <div className={`  mainwrap flex flex-col  text-center pt-18 pb-20`}>
                <div className="top ">
                    <p className={`${theme ? "text-white" : "text-gray-800"}`}>My Intro</p>
                    <h2 className='text-purple-300 text-3xl'>About Me</h2>
                </div>

                <div className="wrap2 flex flex-col md:flex-row justify-evenly items-center  p-6 md:p-10">

                    <div className="left flex flex-col items-center p-4 md:p-6 rounded-2xl w-full md:w-1/2 mb-6 md:mb-0">
                        <img
                            className="w-60 sm:w-72 md:w-80 hover:scale-105 transition-all duration-500 ease-in-out rounded-3xl"
                            src={myPhoto}
                            alt="jignesh pic"
                        />
                    </div>


                    <div className="right p-4 md:p-10 w-full md:w-1/2">

                        <div className="topright flex flex-col sm:flex-row gap-5  flex-wrap justify-start">
                            <div
                                className={`${theme ? 'bg-gray-800' : 'bg-gray-50'
                                    } one w-full sm:w-1/4 p-4 rounded-2xl text-center`}
                            >
                                <i className="text-purple-400 text-3xl ri-user-community-fill"></i>
                                <p
                                    className={`${theme ? 'text-white' : 'text-black'
                                        } text-sm font-serif pb-1 pt-1`}
                                >
                                    Experience
                                </p>
                                <p className="text-gray-400 text-xs">0.6 Years Working</p>
                            </div>

                            <div
                                className={`${theme ? 'bg-gray-800' : 'bg-gray-50'
                                    } one w-full sm:w-1/4 p-4 rounded-2xl text-center`}
                            >
                                <i className="text-purple-400 text-3xl ri-handbag-fill"></i>
                                <p
                                    className={`${theme ? 'text-white' : 'text-black'
                                        } text-sm font-serif pb-1 pt-1`}
                                >
                                    Completed
                                </p>
                                <p className="text-gray-400 text-xs">4+ Projects</p>
                            </div>

                            <div
                                className={`${theme ? 'bg-gray-800' : 'bg-gray-50'
                                    } one w-full sm:w-1/4 p-4 rounded-2xl text-center`}
                            >
                                <i className="text-purple-400 text-3xl ri-customer-service-2-line"></i>
                                <p
                                    className={`${theme ? 'text-white' : 'text-black'
                                        } text-sm  font-serif pb-1 pt-1`}
                                >
                                    Support
                                </p>
                                <p className="text-gray-400 text-xs">Online 24/7</p>
                            </div>
                        </div>

                        {data.map((p) => (

                       <div key={p._id} className="wrap">
                            <p 
                                className={` ${theme ? 'text-white' : 'text-gray-950'
                                    } text-start p-2 font-serif mt-6`}
                            >{p.paragraph1}</p>
                            </div>
                        
                        ))}

                        <button
                            className={`${theme ? 'text-white' : 'text-gray-700'
                                } flex items-center justify-center mt-5 px-6 py-2 bg-purple-400 hover:bg-purple-500 rounded-3xl transition-all duration-300`}
                        >
                            Contact Me
                        </button>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default About
