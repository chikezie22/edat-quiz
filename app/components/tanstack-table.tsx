"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

// Type definition for leaderboard entry
interface LeaderboardEntry {
  rank: number;
  subRank: number;
  schoolName: string;
  score: number;
}

// Sample data matching your image
const data: LeaderboardEntry[] = [
  { rank: 1, subRank: 2, schoolName: "Royal Group of Schools", score: 10893 },
  { rank: 1, subRank: 2, schoolName: "Royal Group of Schools", score: 10893 },
  { rank: 1, subRank: 2, schoolName: "Royal Group of Schools", score: 10893 },
  { rank: 1, subRank: 2, schoolName: "Royal Group of Schools", score: 10893 },
  { rank: 1, subRank: 2, schoolName: "Royal Group of Schools", score: 10893 },
  { rank: 1, subRank: 2, schoolName: "Royal Group of Schools", score: 10893 },
  { rank: 1, subRank: 2, schoolName: "Royal Group of Schools", score: 10893 },
];

// Column definitions
const columns: ColumnDef<LeaderboardEntry>[] = [
  {
    accessorKey: "rank",
    header: "Rank",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 px-4">
        <span className="text-gray-700 font-medium">{row.original.rank}</span>
        <span className="text-gray-700 font-medium">
          {row.original.subRank}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "schoolName",
    header: "School Name",
    cell: ({ getValue }) => (
      <div className="px-4 text-gray-700">{getValue() as string}</div>
    ),
  },
  {
    accessorKey: "score",
    header: () => <div className="text-right">Score</div>,
    cell: ({ getValue }) => (
      <div className="px-4 text-gray-700 font-medium text-right">
        {getValue() as number}
      </div>
    ),
  },
];

export default function LeaderboardTable() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="rounded-2xl overflow-hidden shadow-lg">
        <table className="w-full">
          <thead className="bg-edat-primary ">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-white font-semibold lg:text-lg"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white">
            {table.getRowModel().rows.map((row, index) => (
              <tr
                key={row.id}
                className={`
                  border-b border-gray-200 last:border-b-0
                  hover:bg-gray-50 transition-colors
                  ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                `}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-edat-primary lg:px-8 lg:py-6 p-4">
        <p className="font-sf-pro lg:text-2xl font-semibold ">
          Machine’s Rationale for Question 7: “Advance Solid State Batteries”-
          Failed To apply simple Logic
        </p>
      </div>
    </div>
  );
}
