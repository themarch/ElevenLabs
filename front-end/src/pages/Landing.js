function Landing() {
    return (
        <div className="landing w-full flex md:h-[410px] h-[66vh] relative flex-col md:flex-row">
            <div className="flex flex-col lg:flex-row md:flex-row items-center justify-center">
                <div className="flex items-center ml-auto mr-auto">
                    <h1 className="text-2xl pl-8 pr-8 font-semibold lg:ml-16 text-white mt-24 md:mt-0 text-center md:w-[500px] md:text-4xl lg:text-5xl lg:w-[600px]"> Nous affichons bien plus que des astronautes </h1>
                </div>
                <div className="md:top-11 md:right-24 mt-12 ml-auto mr-auto lg:ml-24">
                    <img alt="wilson" className="md:w-72 md:h-72 w-40 h-40" src="wilson.png" />
                </div>
            </div>
            <div className="background absolute top-0 bottom-0 right-0 left-0 mix-blend-multiply">
            </div>
        </div>
    )
}

export default Landing