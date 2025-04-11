import { DropdownMenu } from './dropdown-menu';
import { DropdownMenuTrigger } from './dropdown-menu';
import { DropdownMenuContent } from './dropdown-menu';
import { DropdownMenuRadioGroup } from './dropdown-menu';
import { DropdownMenuRadioItem } from './dropdown-menu';

const selectDropdown = () => {
  <DropdownMenu>
    <DropdownMenuTrigger className="p-1 border rounded-sm border-blue-950">
      Languages
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
        <DropdownMenuRadioItem value="top">English</DropdownMenuRadioItem>
        <DropdownMenuRadioItem value="bottom">Deutsch</DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>;
};

export default selectDropdown;
