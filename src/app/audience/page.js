const audience = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-8/12 flex flex-col min-h-screen">
        <div className="h-6 w-full flex my-3">
          <textarea
            className="px-2 resize-none rounded w-full"
            placeholder="title"
          />
          <div className="px-2.5 pt-0.5 text-sm-white bg-sm-red rounded text-xs">
            save
          </div>
        </div>
        <div className="w-full h-96 rounded-lg bg-sm-grey" />
        <div className=" h-4 rounded-full my-4 bg-gradient-to-r from-sm-orange via-sm-red to-sm-blue" />
      </div>

      <div className="w-1/5 m-4 bg-sm-white p-3 rounded"></div>
    </div>
  );
};

export default audience;
