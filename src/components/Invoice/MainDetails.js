import { useContext } from "react";
import { State } from "../../context/stateContext";

export default function MainDetails() {
  const { name, address } = useContext(State);

  return (
    <>
      <section className="flex flex-col items-end justify-end">
        <h2 className="font-bold text-lg uppercase mb-1">GRC Express and Logistics PVT LTD</h2>
        <p>Prem Nagar, Borivali(W), Mumbai</p>
        <p>Prem Nagar, Borivali(W), Mumbai</p>
      </section>
    </>
  );
}