/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
      },
      colors: {
        customBlue: "#16243D",
        customSpan: "#058FDD",
        customChooseBg: "#16243D",
        customCard: "#111D32",
        counterBg: "#005EC9",
        footer:"#17253D"
      },
      backgroundImage: {
        aboutleft: "url('/media/about/bg.jpg')",
        chooseImg: "url('/media/choose/rightimage.jpg')",
        bgStarted: "url('/media/getstarted/bg.jpg')",
        bgTestimonial: "url('/media/bg-testimonial.jpg')",
        bgFooter: "url('/media/footer.jpg')",
        bgFindAgent: "url('/media/findagent.jpg')",
        bgContact: "url('/media/bgContact.jpg')",
        bgcontactcard: "url('/media/contactcard.jpg')",

        bgContact1: "url('/media/bgContact1.jpg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
