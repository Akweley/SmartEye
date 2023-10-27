const About = () => {
  return (
    <div className="flex flex-col gap-20 lg:px-8 w-full p-20 justify-center items-center text-center glassmorph hover:bg-opacity-10 rounded-lg">
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-white text-4xl font-bold ml-20">Who Are We</h3>
        <div className=" p-12  mr-16 text-left w-3/5 bg-white rounded-lg border border-gray-100 shadow glassmorph">
          <p className="">
            <span className="font-bold">VerifyEd&#8482;</span> is a
            decentralized application (DApp) that leverages blockchain
            technology to allow school administrators to upload the transcripts
            of final-year university students. It empowers students seeking
            admission to validate the credibility of their transcripts submitted
            as part of their school applications.
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-white text-4xl font-bold ml-20">Our Mission</h3>
        <div className=" p-12  mr-16 text-left w-3/5 bg-white rounded-lg border border-gray-100 shadow glassmorph">
          <p className="mt-4 ">
            At the heart of <span className="font-bold">VerifyEd&#8482;</span>{" "}
            is a commitment to transparency, security, and ease of access. We
            strive to empower both students and academic institutions by
            providing a seamless platform for transcript verification.{" "}
            <span className="font-bold ">
              Our mission is to make the journey to higher education smoother
              and more trustworthy.{" "}
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-white text-4xl font-bold ml-20">What we Offer</h3>
        <div className=" p-12  mr-16 text-left w-3/5 bg-white rounded-lg border border-gray-100 shadow glassmorph">
          <p className="mt-4 ">
            <span className="font-bold ">For School Administrators:</span>{" "}
            <span className="font-bold">VerifyEd&#8482;</span> allows school
            administrators to effortlessly upload final-year university
            transcripts onto our secure blockchain platform, ensuring the
            integrity and accessibility of academic records.
          </p>

          <p className="mt-4 ">
            <span className="font-bold ">For Students:</span> We believe that
            you should have the final say in who gets to access your academic
            records. With <span className="font-bold">VerifyEd&#8482;</span>,
            you have the power to approve the schools you've applied to, giving
            them secure and convenient access to your transcripts
          </p>

          <p className="mt-4 ">
            <span className="font-bold ">For Educational Institutions:</span>{" "}
            <span className="font-bold">VerifyEd&#8482;</span> simplifies the
            process of verifying student transcripts. By collaborating with
            students and ensuring their consent, schools can efficiently
            validate the academic records they receive, making admissions
            smoother and more transparent.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
