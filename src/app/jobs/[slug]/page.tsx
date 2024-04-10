import { Menu } from "@/components/Menu/Menu";
import { menuItems } from "@/components/Menu/menuItems";
import { DefaultLayout } from "@/layouts/DefaultLayout";

export default function Page(): JSX.Element {
  return (
    <DefaultLayout leftSideBar={<Menu items={menuItems} />}>
      Teste
    </DefaultLayout>
  );
}
