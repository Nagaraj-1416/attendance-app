const Table = ({ columns, data }) => {
    const hasActionColumn = columns.includes('Action');
  
    const renderActionColumn = (row) => {
      if (hasActionColumn) {
        return (
          <div className="flex items-center justify-center space-x-2">
            <button className="border border-blue-500 px-2 py-1 rounded-md text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300">
              Login
            </button>
            <button className="border border-red-500 px-2 py-1 rounded-md text-red-500 hover:bg-red-800 hover:text-white transition duration-300">
              Logout
            </button>
          </div>
        );
      }
      return null; // If "Action" column is not present, return null or an empty element
    };
  
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              {columns?.map((column, index) => (
                <th
                  key={index}
                  className={`p-2 text-center border-b border-black`}
                  style={{ backgroundColor: '#F6F6FE' }}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-200">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="p-2 text-center">
                    {column === 'Action' ? renderActionColumn(row) : row[column.toLowerCase()]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Table;
  