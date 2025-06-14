const Footer = () => {
  const btnNames = [
    "Best Sellers",
    "Gift Ideas",
    "New Releases",
    "Today's Deals",
    "Customer Service",
  ];

  const contactInfo = {
    name: "Ahmed Fouad",
    email: "a.fouad.zizo@gmail.com",
    phone: "01011820991",
    address: "1200 buildings - Borg Al-Arab City - Egypt"
  };

  return (
    <div className="bg-[#2b2a29] min-h-[17rem] mt-10 text-center pt-8">
      <p className="font-[1000] text-white text-3xl">Welcome to Our Store</p>
      
      {/* Contact Information */}
      <div className="text-white text-sm mt-6 space-y-2">
        <p>Name: {contactInfo.name}</p>
        <p>Email: {contactInfo.email}</p>
        <p>Phone: {contactInfo.phone}</p>
        <p>Address: {contactInfo.address}</p>
      </div>

      {/* Newsletter Subscription */}
      <div className="mt-6">
        <input
          placeholder="Your Email"
          className="text-white border-b outline-none w-[60%] mt-3 bg-transparent"
        />
        <button className="ml-[-70px] outline-none text-[#f26522] text-xs font-bold uppercase hover:text-white cursor-pointer">
          Subscribe
        </button>
      </div>

      {/* Navigation Links */}
      <div className="text-white text-xs mt-6">
        {btnNames.map((btn) => (
          <button
            key={btn}
            className="mt-4 mx-3 hover:text-orange-500 cursor-pointer duration-700"
          >
            {btn}
          </button>
        ))}
      </div>

      {/* Copyright */}
      <div className="mt-6 pb-4">
        <span className="text-white text-xs">
          © {new Date().getFullYear()} All Rights Reserved. Design by{" "}
        </span>
        <span className="text-white duration-700 cursor-pointer hover:text-[#f26522] text-xs">
          Ahmed Fouad
        </span>
      </div>
    </div>
  );
};

export default Footer;
