const EmptyState = () => {
  return (
    <main id="content">
      <div className="text-center py-10 px-4 sm:px-6 lg:px-8 m-auto w-1/2 h-full my-48">
        <h1 className="block text-7xl font-bold text-gray-800 sm:text-9xl">
          403
        </h1>
        <p className="mt-3 text-gray-600 dark:text-neutral-400">
          Oops, sesuatu yang salah telah terjadi
        </p>
        <p className="text-gray-700 dark:text-neutral-400">
          Data Tidak Ada
        </p>
      </div>
    </main>
  );
};

export default EmptyState;