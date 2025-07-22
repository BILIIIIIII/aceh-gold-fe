import React from "react";
import { steps } from "../lib/constants";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="my-16 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Bagaimana Cara Kerjanya?
        </h2>
        <div className="max-w-2xl mx-auto">
          <ol className="space-y-4">
            {steps.map((step, index) => (
              <li key={index} className="flex items-start">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-lg">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
