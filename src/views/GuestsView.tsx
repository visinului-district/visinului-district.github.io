import { MainLayout } from "../layouts/MainLayout";
import { BarrierCard } from "../components";
import { useBarrier } from "../hooks";

export function GuestsView() {
  const barrierData = useBarrier();

  return (
    <MainLayout>
      <BarrierCard {...barrierData} />
    </MainLayout>
  );
}
