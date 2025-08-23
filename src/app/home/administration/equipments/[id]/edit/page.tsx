import UrlGuard from "@/lib/UrlGuard";
import EditEquipment, { Params } from "./EditEquipment";

const UpdateEquipment = async ({ params }: { params: Promise<Params> }) => {
  const resolvedParams = await params;
  return (
    <UrlGuard permission="change_equipment">
      <EditEquipment params={resolvedParams} />
    </UrlGuard>
  );
};

export default UpdateEquipment;
