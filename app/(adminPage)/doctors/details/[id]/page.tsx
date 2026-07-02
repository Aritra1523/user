import DoctorDetails from "@/components/admin/Doctor/DoctorDetails";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageProps) => {
  return <DoctorDetails id={params.id} />;
};

export default Page;