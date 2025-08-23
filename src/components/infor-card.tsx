import { motion } from "framer-motion";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export const InfoCard = ({
  icon: Icon,
  title,
  value,
  color = "blue",
}: {
  icon: React.ComponentType<any>;
  title: string;
  value: string;
  color?:
    | "blue"
    | "green"
    | "red"
    | "yellow"
    | "indigo"
    | "purple"
    | "pink"
    | "orange"
    | "amber";
}) => (
  <motion.div
    variants={itemVariants}
    className={`bg-gradient-to-br from-${color}-50 to-white p-5 rounded-xl border border-${color}-100 shadow-sm hover:shadow-md transition-shadow`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="flex items-center mb-4">
      <div className={`p-2 rounded-lg bg-${color}-100`}>
        <Icon className={`text-${color}-600`} size={20} />
      </div>
      <h3 className="font-medium text-gray-700 ml-3">{title}</h3>
    </div>
    <p className={`text-xl font-bold text-${color}-800 pl-11`}>
      {value || "-"}
    </p>
  </motion.div>
);

export const DetailItem = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: any;
  icon?: React.ComponentType<any>;
}) => (
  <div className="mb-6">
    <div className="flex items-center gap-2">
      {Icon && <Icon className="h-4 w-4 text-gray-500" />}
      <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </h3>
    </div>
    <p className="text-base font-medium mt-1 text-gray-800">{value || "-"}</p>
  </div>
);
