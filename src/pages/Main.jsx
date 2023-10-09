import React from "react";

const Main = () => {
  return (
    <div className="container mx-auto p-8 w-full h-full">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          HIGH-LEVEL SUMMARY
        </h2>
        <p className="text-xl text-center">
          The study of wildland fires has become increasingly important in
          recent decades, impacting parameters such as the environment, climate
          change, economics, and natural resources. According to National
          Geographic, 85 to 90 percent of fires are human-caused, with burning
          trash, discarded cigarettes, and arson being among the leading causes.
          Consequently, our mission is focused on predicting the areas most at
          risk of fire based on well-established historical data provided by
          MODIS available in the Fire Information for Resource Management System
          (FIRMS) as an input of an artificial intelligence algorithm. The
          result will be an easy-to-access website where users can select a
          calendar date in the future and visualize if they or their family
          members could be in an area at risk. This website will serve to make
          strategic decisions for local governments in order to reduce the
          impact of wildfires.
        </p>
      </section>
    </div>
  );
};

export default Main;
