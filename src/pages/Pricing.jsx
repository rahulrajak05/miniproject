import React from "react";
import RiseON from "../assets/riseON.png";


const Pricing = () => {
  return (
    <div className="bg-white text-gray-800 font-sans">
      <div className="flex justify-center items-center">
        <img
            src={RiseON}
            alt="ON Icon"
            style={{ height: '200px' }}
            />
        </div>



      <main className="py-16 px-4">
        <section className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Empowering Your Career, One Profile at a Time.</h2>
          {/* <p className="text-gray-600 mb-12">Everything you need, nothing you don’t.</p> */}
        </section>

        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {/* Starter Plan */}
          <div className="border rounded-2xl shadow-sm p-8 text-center">
            <h3 className="text-2xl font-semibold mb-2">Starter</h3>
            <p className="text-gray-500 mb-4">For small teams getting started</p>
            <div className="text-4xl font-bold mb-6">₹0 <span className="text-base font-medium text-gray-500">/month</span></div>
            <ul className="text-gray-600 mb-6 space-y-2">
              <li>✔ 10 users included</li>
              <li>✔ Basic support</li>
              <li>✔ AI insights</li>
            </ul>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">Start for Free</button>
          </div>

          {/* Growth Plan */}
          <div className="border-2 border-blue-600 rounded-2xl shadow-md p-8 text-center bg-blue-50">
            <h3 className="text-2xl font-semibold mb-2 text-blue-700">Growth</h3>
            <p className="text-blue-600 mb-4">Ideal for growing businesses</p>
            <div className="text-4xl font-bold text-blue-700 mb-6">₹4,999 <span className="text-base font-medium">/month</span></div>
            <ul className="text-blue-800 mb-6 space-y-2">
              <li>✔ 50 users</li>
              <li>✔ Priority support</li>
              <li>✔ Custom reports</li>
            </ul>
            <button className="bg-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-800">Get Started</button>
          </div>

          {/* Enterprise Plan */}
          <div className="border rounded-2xl shadow-sm p-8 text-center">
            <h3 className="text-2xl font-semibold mb-2">Enterprise</h3>
            <p className="text-gray-500 mb-4">Best for large organizations</p>
            <div className="text-2xl font-bold mb-6">Custom Pricing</div>
            <ul className="text-gray-600 mb-6 space-y-2">
              <li>✔ Unlimited users</li>
              <li>✔ Dedicated support</li>
              <li>✔ Onboarding & training</li>
            </ul>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">Contact Sales</button>
          </div>
        </section>
      </main>

      
    </div>
  );
};

export default Pricing;
