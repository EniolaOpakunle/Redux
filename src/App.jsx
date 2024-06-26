import React, { useEffect, useState } from "react";
import { fetchFaq } from "./Redux/FaqSlice";
import { useDispatch, useSelector } from "react-redux";
import logo from './assets/images/icon-star.svg'
import minus from './assets/images/icon-minus.svg'
import plus from './assets/images/icon-plus.svg'
import './App.css'

export default function App() {
  const dispatch = useDispatch();
  const faqs = useSelector((state) => state.faqs);
  const [activeIndex, setActiveIndex] = useState(null);
  useEffect(() => {
    dispatch(fetchFaq());
  }, [dispatch]);

  console.log(faqs.data);
  const data = faqs.data;
  const onItemClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
}

  return (
    <div>
      <div className="faq">
        <div className="d-flex div1">
          <div className="w-50 p-5 accordion">
            <p className="title">
              <img src={logo} alt="" /> <span>{data.title}</span>
            </p>
            <div>
              {data?.faqs?.map((val, index) => (
                <div key={index} className="accordion-item">
                  <div
                    className="accordion-title"
                    onClick={() => onItemClick(index)}
                  >
                    {val.question}
                    <img
                      src={activeIndex === index ? minus : plus}
                      alt=""
                      className="accordion-icon"
                    />
                  </div>
                  {activeIndex === index && (
                    <div className="accordion-content">
                      <p>{val.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="div2"></div>
      </div>
    </div>
  );
}
