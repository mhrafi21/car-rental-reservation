import React from "react";
import DefaultContainer from "../components/DefaultContainer";
import team1 from "../../src/assets/images/team1.jpg";
import team2 from "../../src/assets/images/team2.jpg";
import team3 from "../../src/assets/images/team3.jpg";

const AboutUs: React.FC = () => {
  return (
    <div>
      <DefaultContainer>
        <div className=" py-10">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="text-gray-600">
              Get to know more about our company and team.
            </p>
          </header>

          {/* Company History */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">Our History</h2>
            <p className="text-gray-700 leading-relaxed">
              Founded in 2010, our company has grown to become one of the most
              trusted car rental services in the industry. Our mission is to
              provide customers with the best vehicles at competitive prices,
              while our vision is to expand our reach globally, making car
              rentals accessible to everyone.
            </p>
          </section>

          {/* Our Team */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-8">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <img
                  src={team1}
                  alt="Team Member"
                  className="rounded-md mx-auto mb-4"
                />
                <h3 className="text-xl font-bold">John Doe</h3>
                <p className="text-gray-600">CEO & Founder</p>
              </div>
              <div className="text-center">
                <img
                  src={team2}
                  alt="Team Member"
                  className="rounded-md mx-auto mb-4"
                />
                <h3 className="text-xl font-bold">Jane Smith</h3>
                <p className="text-gray-600">Chief Operations Officer</p>
              </div>
              <div className="text-center">
                <img
                  src={team3}
                  alt="Team Member"
                  className="rounded-md mx-auto mb-4"
                />
                <h3 className="text-xl font-bold">Robert Brown</h3>
                <p className="text-gray-600">Head of Customer Service</p>
              </div>
            </div>
          </section>

          {/* Our Fleet */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">Our Fleet</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We offer a diverse range of vehicles to meet your needs, from
              economy cars for budget-conscious customers to luxury vehicles for
              those seeking premium comfort. We also have SUVs for adventurous
              trips and family vacations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <img
                  src="https://via.placeholder.com/300x200"
                  alt="Economy Car"
                  className="rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold">Economy</h3>
                <p className="text-gray-600">
                  Affordable and fuel-efficient cars.
                </p>
              </div>
              <div className="text-center">
                <img
                  src="https://via.placeholder.com/300x200"
                  alt="Luxury Car"
                  className="rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold">Luxury</h3>
                <p className="text-gray-600">
                  Premium vehicles for ultimate comfort.
                </p>
              </div>
              <div className="text-center">
                <img
                  src="https://via.placeholder.com/300x200"
                  alt="SUV"
                  className="rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold">SUV</h3>
                <p className="text-gray-600">
                  Spacious and perfect for family trips.
                </p>
              </div>
            </div>
          </section>

          {/* Values & Commitment */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold mb-4">
              Our Values & Commitment
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We are committed to delivering the highest level of customer
              service. Sustainability is also at the core of our operations; we
              aim to reduce our environmental impact by offering eco-friendly
              vehicle options and adopting green practices in our daily
              operations.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-gray-100 p-8 rounded-lg">
            <h2 className="text-3xl font-semibold mb-4 text-center">
              Contact Us
            </h2>
            <p className="text-gray-700 text-center mb-4">
              We'd love to hear from you! Reach out to us with any questions or
              inquiries.
            </p>
            <div className="text-center">
              <p className="text-gray-600">Phone: (123) 456-7890</p>
              <p className="text-gray-600">Email: support@carrental.com</p>
              <p className="text-gray-600">
                Address: 123 Main Street, Anytown, USA
              </p>
            </div>
          </section>
        </div>
      </DefaultContainer>
    </div>
  );
};

export default AboutUs;
