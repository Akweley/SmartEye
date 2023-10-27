// import { ThreeDots } from "react-loader-spinner";

const FullPageLoader = () => {
  return (
    <div className="h-screen w-screen grid place-items-center">
      <div className="flex w-full justify-center">
        {/* <ThreeDots
          height="100"
          width="100"
          radius="9"
          color="#f620e5"
          ariaLabel="three-dots-loading"
          visible={true}
          wrapperClass="w-full justify-center"
        /> */}
      </div>
    </div>
  );
};

export default FullPageLoader;
