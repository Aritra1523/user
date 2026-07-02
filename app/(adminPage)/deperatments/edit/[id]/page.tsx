import DepartmentEdit from "@/components/admin/department/DepartmentEdit";

interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params }: Props) {
  return <DepartmentEdit id={params.id} />;
}