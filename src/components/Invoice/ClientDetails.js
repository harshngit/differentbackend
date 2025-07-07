import { useContext } from "react";
import { State } from "../../context/stateContext";

export default function ClientDetails() {
  const { clientName, clientAddress,clientData } = useContext(State);

  return (
    <>
      <section className="mt-10">
        <h2 className="text-2xl uppercase font-bold mb-1">{clientData?.name}</h2>
        <h2 className="text-xl uppercase font-bold mb-1">{clientData?.companyName}</h2>
        <p>{clientData?.companyAddress}</p>
        <p>{clientData?.email}</p>
        <p>{clientData?.gstNo}</p>
      </section>
    </>
  );
}