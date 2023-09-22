interface Share {
  $id: string;
  Name: string;
  Units: number;
  Rate: number;
  Ref_Id: string;
  Type: String;
}
interface ShareProps {
  data: Share[];
}
export default function Share({ data }: ShareProps) {
  return (
    <>
      {" "}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border border-gray-300">Name</th>
            <th className="py-2 px-4 border border-gray-300">Units</th>
            <th className="py-2 px-4 border border-gray-300">Rate</th>
            <th className="py-2 px-4 border border-gray-300">Type</th>
            <th className="py-2 px-4 border border-gray-300">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.$id}>
              <td className="py-2 px-4 border border-gray-300">{item.Name}</td>
              <td className="py-2 px-4 border border-gray-300">{item.Units}</td>
              <td className="py-2 px-4 border border-gray-300">{item.Rate}</td>

              <td className="py-2 px-4 border border-gray-300">{item.Type}</td>
              <td className="py-2 px-4 border border-gray-300">
                {item.Rate * item.Units}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
