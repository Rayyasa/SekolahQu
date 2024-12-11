interface RoleCardProps {
  role: string;
  title: string;
  data?: {
    data: Array<{
      role: string;
    }>;
  };
}

const RoleCard: React.FC<RoleCardProps> = ({ role, title, data }) => {
  const count = data?.data.filter((user) => user.role === role).length;
  return (
    <div className="flex flex-col bg-white border shadow-sm rounded-xl">
      <div className="px-5 py-10 flex justify-between gap-x-3">
        <div>
          <p className="text-lg uppercase tracking-wide text-gray-500">
            {title}
          </p>
          <div className="mt-1 flex items-center gap-x-2">
            <h3 className="text-xl sm:text-2xl font-medium text-gray-800">
              {count}
            </h3>
          </div>
        </div>
        <div className="flex-shrink-0 flex justify-center items-center p-5 bg-[#16ab39] text-white rounded-full">
          <svg
            className=""
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx={9} cy={7} r={4} />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
      </div>
      <a
        className="py-3 px-4 md:px-5 inline-flex justify-between items-center text-sm text-gray-600 border-t border-gray-200 hover:bg-gray-50 rounded-b-xl"
        href="#"
      >
        View More
        <svg
          className="flex-shrink-0 size-4"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </a>
    </div>
  );
};
export default RoleCard;