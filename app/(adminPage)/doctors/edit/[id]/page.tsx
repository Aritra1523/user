import EditDoctorForm from "@/components/admin/Doctor/EditDoctorForm";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageProps) => {
  return <EditDoctorForm id={params.id} />;
};

export default Page;