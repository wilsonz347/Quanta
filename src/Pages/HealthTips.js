import React from 'react';

function HealthTips() {
  return (
    <div className="bg-[#33ccff] px-9 py-9 md:py-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-6">
          HEALTH TIPS & ARTICLES
        </h2>
        <p className="text-white text-lg mb-8">
          Explore our latest articles covering a wide range of topics, from self-care tips to disease prevention and wellness strategies.
        </p>

        <div className="space-y-4">
          {/* Article Cards with Updated Working Links */}
          <a 
            href="https://www.cdc.gov/flu/about/coldflu.html#:~:text=The%20signs%20and%20symptoms%20of,a%20runny%20or%20stuffy%20nose." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block bg-white rounded-lg p-4 hover:shadow-lg transition duration-300 cursor-pointer"
          >
            <h3 className="font-semibold text-lg text-gray-800">Common Cold vs. Flu: How to Tell the Difference</h3>
            <p className="text-gray-600 text-sm">Learn how to identify symptoms and when to seek medical attention.</p>
            <span className="text-blue-500 text-sm mt-2 inline-block">Read more →</span>
          </a>

          <a 
            href="https://www.sleepfoundation.org/sleep-hygiene" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block bg-white rounded-lg p-4 hover:shadow-lg transition duration-300 cursor-pointer"
          >
            <h3 className="font-semibold text-lg text-gray-800">The Importance of Sleep for Your Health</h3>
            <p className="text-gray-600 text-sm">Understand how sleep impacts your overall well-being and tips for rest.</p>
            <span className="text-blue-500 text-sm mt-2 inline-block">Read more →</span>
          </a>

          <a 
            href="https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/water/art-20044256" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block bg-white rounded-lg p-4 hover:shadow-lg transition duration-300 cursor-pointer"
          >
            <h3 className="font-semibold text-lg text-gray-800">Stay Hydrated: Why Water is Essential for Your Body</h3>
            <p className="text-gray-600 text-sm">Find out how dehydration affects your health and how much water you really need.</p>
            <span className="text-blue-500 text-sm mt-2 inline-block">Read more →</span>
          </a>

          <a 
            href="https://www.msdmanuals.com/home/fundamentals/making-the-most-of-health-care/when-to-see-a-doctor" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block bg-white rounded-lg p-4 hover:shadow-lg transition duration-300 cursor-pointer"
          >
            <h3 className="font-semibold text-lg text-gray-800">When to Visit a Doctor vs. When to Use Home Remedies</h3>
            <p className="text-gray-600 text-sm">A quick guide to knowing when medical help is necessary.</p>
            <span className="text-blue-500 text-sm mt-2 inline-block">Read more →</span>
          </a>
          </div>

       
      </div>
      
    </div>
  );
}

export default HealthTips; 