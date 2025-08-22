import { MainLayout } from "../layouts/MainLayout";
import { BarrierCard, WeatherCard, ContactsCard, PlaygroundCard, PinGeneratorLink } from "../components";
import { useWeather, useBarrier } from "../hooks";

export function CommunityView() {
  const weatherData = useWeather();
  const barrierData = useBarrier();

  return (
    <MainLayout>
      <BarrierCard {...barrierData} />
      <PinGeneratorLink />
      <WeatherCard {...weatherData} />
      <ContactsCard />
      <PlaygroundCard />
    </MainLayout>
  );
}
