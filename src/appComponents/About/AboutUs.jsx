const AboutUs = () => {
  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-[#F0E5D8]">
      <div className="max-w-4xl w-full bg-white p-8 rounded-3xl shadow-lg mt-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-[#6E6876]">
          About Us
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Welcome to our BookStore! We are passionate about books and dedicated
          to providing our customers with a diverse selection of literature from
          all genres and authors. Whether you are a lifelong bookworm or just
          starting to explore the world of reading, we have something for
          everyone.
        </p>
        <h2 className="text-2xl font-bold text-[#6E6876] mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 mb-4">
          Our mission is to promote literacy and a love for reading within our
          community. We believe that books have the power to educate, inspire,
          and transform lives. Our goal is to make books accessible to everyone
          and to foster a community of readers who share our passion for
          literature.
        </p>
        <h2 className="text-2xl font-bold text-[#6E6876] mb-4">Our History</h2>
        <p className="text-lg text-gray-700 mb-4">
          Founded in 2024, our bookstore has grown from a small, independent
          shop to a beloved community institution. Over the years, we have
          expanded our collection, hosted countless author events, and built
          lasting relationships with our customers. We are proud of our history
          and excited about our future.
        </p>
        <h2 className="text-2xl font-bold text-[#6E6876] mb-4">Our Values</h2>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-4">
          <li className="mb-2">
            <strong>Customer Focus:</strong> We prioritize our customers needs
            and strive to provide exceptional service and a welcoming
            atmosphere.
          </li>
          <li className="mb-2">
            <strong>Diversity and Inclusion:</strong> We celebrate diversity and
            aim to include a wide range of voices and perspectives in our
            collection.
          </li>
          <li className="mb-2">
            <strong>Community Engagement:</strong> We believe in giving back to
            our community and actively participate in local events and
            initiatives.
          </li>
          <li className="mb-2">
            <strong>Sustainability:</strong> We are committed to environmentally
            friendly practices and work to reduce our ecological footprint.
          </li>
        </ul>
        <p className="text-lg text-gray-700 mb-4">
          Thank you for supporting our bookstore. We look forward to serving you
          and sharing our love for books with you.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
