import { Menu } from "@/components/Menu/Menu";
import { menuItems } from "@/components/Menu/menuItems";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { SearchBar } from "@/components/SearchBar";
import { JobsList } from "@/components/JobsList";

export default function Page(): JSX.Element {
  const jobs = [
    {
      id: 1,
      title: "Desenvolvedor Java",
      type: "MEIO PERÍODO",
      salary: "R$3000 - R$5000",
      company: "Findev Inc.",
      location: "Franca, São Paulo",
      companyLogo: "https://via.placeholder.com/40",
    },
    {
      id: 2,
      title: "Desenvolvedor Spring Boot SR",
      type: "TEMPO INTEGRAL",
      salary: "R$6000 - R$7000",
      company: "Findev Inc.",
      location: "Franca, São Paulo",
      companyLogo: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      title: "Desenvolvedor Spring Boot SR",
      type: "TEMPO INTEGRAL",
      salary: "R$6000 - R$7000",
      company: "Findev Inc.",
      location: "Franca, São Paulo",
      companyLogo: "https://via.placeholder.com/40",
    },
    {
      id: 4,
      title: "Desenvolvedor Spring Boot SR",
      type: "TEMPO INTEGRAL",
      salary: "R$6000 - R$7000",
      company: "Findev Inc.",
      location: "Franca, São Paulo",
      companyLogo: "https://via.placeholder.com/40",
    },
    {
      id: 5,
      title: "Desenvolvedor Spring Boot SR",
      type: "TEMPO INTEGRAL",
      salary: "R$6000 - R$7000",
      company: "Findev Inc.",
      location: "Franca, São Paulo",
      companyLogo: "https://via.placeholder.com/40",
    },
  ];

  return (
    <DefaultLayout leftSideBar={<Menu items={menuItems} />}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Meus anúncios</h1>
        <SearchBar />
        <JobsList jobs={jobs} />
      </div>
    </DefaultLayout>
  );
}
