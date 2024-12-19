import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"

type StatusProps = {
    statuses: string[];
    taskStatus: string;
    setTaskStatus: (status: string) => void;
}

export const Status = ({statuses, taskStatus, setTaskStatus} : StatusProps) => {
    return (
        <div className="flex flex-row items-center">
            <p className="w-1/5 text-gray-500">Status</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{taskStatus}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 z-[1100]">
                <DropdownMenuLabel>Change status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={taskStatus}
                  onValueChange={setTaskStatus}
                >
                  {statuses.map((categoryItem) => (
                    <DropdownMenuRadioItem
                      key={categoryItem}
                      value={categoryItem}
                    >
                      {categoryItem}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
    )
}