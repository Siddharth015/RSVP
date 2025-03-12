const PopularGifts = () => {
    const gifts = [
      { title: "Photography Session", desc: "Professional photo session gift card." },
      { title: "Spa Package", desc: "Relaxation and wellness experiences." },
      { title: "Cooking Class", desc: "Interactive cooking experience." },
      { title: "Event Tickets", desc: "Concert or show tickets." },
    ];
  
    return (
      <section className="w-full py-20 bg-purple-100 text-center">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-gray-800">Popular Gift Suggestions</h2>
          <div className="flex flex-col md:flex-row justify-center mt-12 gap-8">
            {gifts.map((gift, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
                <h3 className="text-2xl font-semibold text-purple-700">{gift.title}</h3>
                <p className="text-gray-600 mt-4 text-lg">{gift.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default PopularGifts;
  