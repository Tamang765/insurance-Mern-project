import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import teamReducer from "./slice/TeamSlice";
import blogReducer from "./slice/blogSlice";
import serviceReducer from "./slice/serviceSlice";
import aboutReducer from "./slice/aboutSlice";
import inquiryReducer from "./slice/inquirySlice";
import testimonialReducer from "./slice/TestimonialSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    team: teamReducer,
    blog: blogReducer,
    service: serviceReducer,
    aboutus: aboutReducer,
    inquiry: inquiryReducer,
    testimonial:testimonialReducer
  },
});
