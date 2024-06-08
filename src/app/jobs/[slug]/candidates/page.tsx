import { Menu } from "@/components/Menu/Menu";
import { menuItems } from "@/components/Menu/menuItems";
import { DefaultLayout } from "@/layouts/DefaultLayout";
import { KanbanBoard } from "@/components/KanbanBoard";

export default function Page(): JSX.Element {
  return (
    <DefaultLayout leftSideBar={<Menu items={menuItems} />}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Desenvolvedor Java PL</h1>
        <KanbanBoard />
      </div>
    </DefaultLayout>
  );
}
