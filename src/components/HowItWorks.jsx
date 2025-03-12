const HowItWorks = () => {
    const steps = [
      { title: "Create Your Event", desc: "Register your event and get a unique link to share with guests." },
      { title: "Share The Link", desc: "Invite guests to fill out the gift form and RSVP." },
      { title: "Avoid Duplicates", desc: "Get instant notifications if a gift is already being brought." },
    ];
  
    return (
      <section className="w-full py-20 bg-white text-center">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-gray-800">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center mt-12 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-purple-50 p-8 rounded-lg shadow-md max-w-sm w-full">
                <h3 className="text-2xl font-semibold text-purple-700">{step.title}</h3>
                <p className="text-gray-600 mt-4 text-lg">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default HowItWorks;
  