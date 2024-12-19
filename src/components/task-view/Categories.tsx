import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"

type CategoriesProps = {
    categories: string[];
    taskCategory: string;
    setCategory: (category: string) => void;
}

export const Categeories = ({categories, taskCategory, setCategory} : CategoriesProps) => {
    return (
        <div className="flex flex-row items-center">
            <p className="w-1/5 text-gray-500">Tags</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{taskCategory}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 z-[1100]">
                <DropdownMenuLabel>Change tag</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={taskCategory}
                  onValueChange={setCategory}
                >
                  {categories.map((statusItem) => (
                    <DropdownMenuRadioItem key={statusItem} value={statusItem}>
                      {statusItem}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
    )
}
