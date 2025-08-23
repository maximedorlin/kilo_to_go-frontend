// import UrlGuard from "@/lib/UrlGuard";
import EditConsumable, { Params } from "./EditConsumable";

const UpdateConsumable = async ({ params }: { params: Promise<Params> }) => {
  const resolvedParams = await params;
  return (
    // <UrlGuard permission="change_consumable">
      <EditConsumable params={resolvedParams} />
    // </UrlGuard>
  );
};

export default UpdateConsumable;
