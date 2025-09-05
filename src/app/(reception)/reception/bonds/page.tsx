import BondTable, { Bond } from "@/components/table/BondTable";

const bondsData: Bond[] = [
  {
    id: "#1254",
    name: "Premium Package",
    discipline: "Operation",
    services: "Surgery",
    sessions: 5,
    price: "$250",
    status: "Active",
  },
  {
    id: "#1255",
    name: "Standard Package",
    discipline: "Operation",
    services: "Surgery",
    sessions: 5,
    price: "$200",
    status: "Active",
  },
  {
    id: "#1256",
    name: "Trial Package",
    discipline: "Operation",
    services: "Surgery",
    sessions: 5,
    price: "$100",
    status: "Inactive",
  },
];

export default function ParentPage() {
  return <BondTable data={bondsData} />;
}
