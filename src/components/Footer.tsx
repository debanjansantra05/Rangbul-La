'use client';

import {
  Mail,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";

import {
  FaInstagram,
  FaDribbble,
  FaFacebook,
} from "react-icons/fa";

const data = {
  facebookLink: "https://facebook.com/rangbulla",
  instaLink: "https://www.instagram.com/rangbul_la?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  dribbbleLink: "#",

  contact: {
    email: "rangbulla123@gmail.com",
    phone: "+91 8250475874",
    address: "Hill Cart Rd, Rangbull, West Bengal, India - 734209",
  },

  company: {
    name: "Rangbul La",
    description:
      "A boutique sustainable homestay in Darjeeling offering soulful mountain escapes.",
  },
};

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="flex flex-col md:flex-row justify-between gap-12">

          {/* LEFT */}
          <div>
            <h2 className="text-3xl font-semibold">
              {data.company.name}
            </h2>

            <p className="text-white/70 mt-4 max-w-md leading-7">
              {data.company.description}
            </p>

            <div className="flex gap-5 mt-6">

              <a
                href={data.facebookLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="h-5 w-5 hover:text-white/70 transition" />
              </a>

              <a
                href={data.instaLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="h-5 w-5 hover:text-white/70 transition" />
              </a>

              <a
                href={data.dribbbleLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaDribbble className="h-5 w-5 hover:text-white/70 transition" />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="h-5 w-5 hover:text-white/70 transition" />
              </a>

            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-5">

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5" />
              <span>{data.contact.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5" />
              <span>{data.contact.phone}</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5" />
              <span>{data.contact.address}</span>
            </div>

          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-white/50">
          © 2026 Rangbul La. All rights reserved.
        </div>

      </div>
    </footer>
  );
}