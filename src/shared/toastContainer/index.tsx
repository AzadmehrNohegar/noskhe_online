import { Toast } from "@/components/toast";
import { useToastStore } from "@/store/toast";

function ToastContainer() {
  const { stack } = useToastStore();

  if (!stack.length) return null;

  return (
    <div className="toast toast-top toast-start w-full lg:w-1/3 z-[99999]">
      {stack.map((item, index) => (
        <Toast key={index} toast={item} index={index} />
      ))}
    </div>
  );
}

export { ToastContainer };
